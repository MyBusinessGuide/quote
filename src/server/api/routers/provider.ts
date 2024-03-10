import { TRPCError } from "@trpc/server";
import { endOfMonth, startOfMonth } from "date-fns";
import { and, desc, eq, gte, lte } from "drizzle-orm";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import {
  insertProviderSchema,
  lead,
  leadProviderConnection,
  providerBid,
  providers,
  service,
  users,
} from "~/server/db/schema";

export const providerRouter = createTRPCRouter({
  get: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const data = await ctx.db
        .select({
          provider: providers,
          service: service.name,
        })
        .from(providers)
        .innerJoin(service, eq(providers.serviceId, service.id))
        .where(eq(providers.id, input.id))
        .limit(1);

      if (data.length === 0)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Provider not found",
        });

      return data[0]!;
    }),
  edit: protectedProcedure
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
  create: protectedProcedure
    .input(insertProviderSchema)
    .mutation(async ({ ctx, input }) => {
      const data = await ctx.db.insert(providers).values(input).returning();

      return data[0]!;
    }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.select().from(providers);
  }),
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(providers)
        .where(eq(providers.id, input.id))
        .returning();
    }),
  getProviderBids: protectedProcedure
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
              amountGBP: leadProviderConnection.amountGBP,
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
  getReport: protectedProcedure
    .input(z.object({ providerId: z.number(), date: z.date().optional() }))
    .query(async ({ ctx, input }) => {
      return ctx.db
        .select({
          id: leadProviderConnection.id,
          companyName: lead.companyName,
          amountGBP: leadProviderConnection.amountGBP,
          date: leadProviderConnection.dateCreated,
          officerName: users.name,
          leadCode: leadProviderConnection.leadCode,
          leadId: lead.id,
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
