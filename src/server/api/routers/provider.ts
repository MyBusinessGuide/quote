import { TRPCError } from "@trpc/server";
import { endOfMonth, startOfMonth } from "date-fns";
import { and, desc, eq, gte, lte } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  insertProviderSchema,
  lead,
  leadProviderConnection,
  providerBid,
  providers,
  users,
} from "~/server/db/schema";

export const providerRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const data = await ctx.db
        .select()
        .from(providers)
        .where(eq(providers.id, input.id))
        .limit(1);

      if (data.length === 0)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Provider not found",
        });

      return data[0]!;
    }),
  edit: publicProcedure
    .input(insertProviderSchema.merge(z.object({ id: z.number() })))
    .mutation(async ({ ctx, input }) => {
      const data = await ctx.db
        .update(providers)
        .set(input)
        .where(eq(providers.id, input.id))
        .returning();

      if (data.length === 0)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Provider not found",
        });

      return data[0]!;
    }),
  create: publicProcedure
    .input(insertProviderSchema)
    .mutation(async ({ ctx, input }) => {
      const data = await ctx.db.insert(providers).values(input).returning();

      return data[0]!;
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.select().from(providers);
  }),
  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(providers)
        .where(eq(providers.id, input.id))
        .returning();
    }),
  getProviderBids: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const providerBids = await ctx.db
        .select()
        .from(providerBid)
        .where(eq(providerBid.providerId, input.id));

      const response = await Promise.all(
        providerBids.map(async (providerBid) => {
          const leads = await ctx.db
            .select({
              id: lead.id,
              companyName: lead.companyName,
              amountGBP: lead.amountGBP,
            })
            .from(leadProviderConnection)
            .innerJoin(lead, eq(lead.id, leadProviderConnection.leadId))
            .where(eq(leadProviderConnection.providerBidId, providerBid.id));

          return {
            providerBid,
            leads,
          };
        }),
      );

      return response;
    }),
  getReport: publicProcedure
    .input(z.object({ providerId: z.number(), date: z.date().optional() }))
    .query(async ({ ctx, input }) => {
      return ctx.db
        .select({
          id: leadProviderConnection.id,
          companyName: lead.companyName,
          amountGBP: providerBid.amountGBP,
          date: leadProviderConnection.dateCreated,
          officerName: users.name,
          leadCode: leadProviderConnection.leadCode,
        })
        .from(leadProviderConnection)
        .leftJoin(
          providerBid,
          eq(providerBid.id, leadProviderConnection.providerBidId),
        )
        .leftJoin(lead, eq(lead.id, leadProviderConnection.leadId))
        .leftJoin(users, eq(users.id, lead.userId))
        .where(
          and(
            eq(providerBid.providerId, input.providerId),
            input.date
              ? gte(
                  leadProviderConnection.dateCreated,
                  startOfMonth(input.date),
                )
              : undefined,
            input.date
              ? lte(leadProviderConnection.dateCreated, endOfMonth(input.date))
              : undefined,
          ),
        )
        .orderBy(desc(leadProviderConnection.dateCreated));
    }),
});
