import { TRPCError } from "@trpc/server";
import { and, desc, eq, max, not } from "drizzle-orm";
import { z } from "zod";
import { sendEmail } from "~/lib/email";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  LeadCodeValuesEnum,
  lead,
  leadProviderConnection,
  providerBid,
  users,
} from "~/server/db/schema";
import ProviderConnectionEmail from "../../../../emails/ProviderConnectedLead.email";
import { render } from "@react-email/render";

const categorizeUserSchema = z.object({
  tenureYrsId: z.union([
    z.literal(1),
    z.literal(2),
    z.literal(3),
    z.literal(4),
  ]),
  turnoverId: z.union([
    z.literal(1),
    z.literal(2),
    z.literal(3),
    z.literal(4),
    z.literal(5),
  ]),
});

const categorizeUser = async (tenureYrsId: number, turnoverId: number) => {
  const parsedValues = await categorizeUserSchema.safeParseAsync({
    tenureYrsId,
    turnoverId,
  });

  if (!parsedValues.success) {
    return null;
  }

  switch (parsedValues.data.turnoverId) {
    case 1:
      return ("A" + parsedValues.data.tenureYrsId) as "A1" | "A2" | "A3" | "A4";
    case 2:
      return ("B" + parsedValues.data.tenureYrsId) as "B1" | "B2" | "B3" | "B4";
    case 3:
      return ("C" + parsedValues.data.tenureYrsId) as "C1" | "C2" | "C3" | "C4";
    case 4:
      return ("D" + parsedValues.data.tenureYrsId) as "D1" | "D2" | "D3" | "D4";
    default:
      return ("E" + parsedValues.data.tenureYrsId) as "E1" | "E2" | "E3" | "E4";
  }
};

export const leadRouter = createTRPCRouter({
  post: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        phoneNumber: z.string().min(1),
        fullName: z.string().min(1),
        companyName: z.string(),
        annualTurnoverGBPId: z.number(),
        industryId: z.number(),
        tenureYrsId: z.number(),
        address: z.string().optional(),
        postalCode: z.string().optional(),
        companyType: z.string().optional(),
        companyStatus: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const foundUsers = await ctx.db
        .select({
          id: users.id,
        })
        .from(users)
        .where(eq(users.email, input.email))
        .limit(1);

      let userId: number;
      if (foundUsers.length === 0) {
        userId =
          (
            await ctx.db
              .insert(users)
              .values({
                email: input.email,
                phoneNumber: input.phoneNumber,
                name: input.fullName,
              })
              .returning({ id: users.id })
          )[0]?.id || 1;
      } else {
        userId = foundUsers[0]?.id ?? 1;
      }

      const leadCode = await categorizeUser(
        input.tenureYrsId,
        input.annualTurnoverGBPId,
      );

      if (!leadCode)
        throw new TRPCError({
          code: "UNPROCESSABLE_CONTENT",
          message: "Lead cannot be categorized.",
        });

      const insertedLead = await ctx.db
        .insert(lead)
        .values({
          userId,
          companyName: input.companyName,
          annualTurnoverGBPId: input.annualTurnoverGBPId,
          industryId: input.industryId,
          tenureYrsId: input.tenureYrsId,
          address: input.address,
          postalCode: input.postalCode,
          companyType: input.companyType,
          companyStatus: input.companyStatus,
          leadCode: leadCode,
        })
        .returning();

      if (insertedLead.length === 0) {
        return { error: "Lead not inserted" } as const;
      }

      const maxProvider = await ctx.db
        .select({
          id: providerBid.id,
          amount_gbp: max(providerBid.amountGBP),
        })
        .from(providerBid)
        .where(eq(providerBid.leadCode, leadCode))
        .groupBy(providerBid.id)
        .orderBy(desc(providerBid.amountGBP))
        .limit(1);

      if (maxProvider.length === 0) {
        return { error: "No provider found" } as const;
      }

      await ctx.db.insert(leadProviderConnection).values({
        leadId: insertedLead[0]!.id,
        providerBidId: maxProvider[0]!.id,
      });

      sendEmail({
        to: input.email,
        subject: "[BUSINESS NAME] is looking for Invoice Financing",
        html: render(
          ProviderConnectionEmail({
            providerName: "Provider",
            fullName: input.fullName,
            quoteDate: new Date().toDateString(),
            loanAmount: "£" + maxProvider[0]!.amount_gbp,
            turnover: input.annualTurnoverGBPId.toString(),
            tenure: input.tenureYrsId.toString(),
            industry: input.industryId.toString(),
            companyName: input.companyName,
            phoneNumber: input.phoneNumber,
            customerEmail: input.email,
            winningBidAmount: "£123",
          }),
        ),
      });

      return { error: null };
    }),
  getWhereLeadId: publicProcedure
    .input(
      z.object({
        leadCode: z.nativeEnum(LeadCodeValuesEnum),
        providerBidId: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db
        .select({
          id: lead.id,
          companyName: lead.companyName,
          fullName: users.name,
        })
        .from(lead)
        .innerJoin(users, eq(lead.userId, users.id))
        .innerJoin(
          leadProviderConnection,
          eq(leadProviderConnection.leadId, lead.id),
        )
        .where(
          and(
            eq(lead.leadCode, input.leadCode),
            not(eq(leadProviderConnection.providerBidId, input.providerBidId)),
          ),
        );
    }),
  connectProviderBid: publicProcedure
    .input(z.object({ leadId: z.number(), providerBidId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(leadProviderConnection).values(input);
    }),
});
