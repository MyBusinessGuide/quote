import { and, eq, is, isNull, ne, or } from "drizzle-orm";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import {
  leadCode,
  leadProviderConnection,
  providerBid,
} from "~/server/db/schema";

export const providerBidRouter = createTRPCRouter({
  getAllWhereProvider: protectedProcedure
    .input(
      z.object({
        providerId: z.number(),
        leadId: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db
        .select({
          id: providerBid.id,
          amountGBP: providerBid.amountGBP,
          leadCode: providerBid.leadCode,
        })
        .from(providerBid)
        .leftJoin(
          leadProviderConnection,
          and(
            eq(leadProviderConnection.providerBidId, providerBid.id),
            eq(leadProviderConnection.leadId, input.leadId),
          ),
        )
        .where(
          and(
            eq(providerBid.providerId, input.providerId),
            or(
              ne(leadProviderConnection.leadId, input.leadId),
              isNull(leadProviderConnection.leadId),
            ),
          ),
        )
        .groupBy(providerBid.id);
    }),
  get: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return (
        await ctx.db
          .select()
          .from(providerBid)
          .where(eq(providerBid.id, input.id))
      )[0];
    }),

  create: protectedProcedure
    .input(
      z.object({
        amountGBP: z.number(),
        providerId: z.number(),
        leadCode: z.enum(leadCode.enumValues),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(providerBid).values(input);
    }),

  update: protectedProcedure
    .input(
      z.object({
        providerBidId: z.number(),
        amountGBP: z.number(),
        providerId: z.number(),
        leadCode: z.enum(leadCode.enumValues),
      }),
    )
    .mutation(async ({ ctx, input: { providerBidId, ...values } }) => {
      return await ctx.db
        .update(providerBid)
        .set(values)
        .where(eq(providerBid.id, providerBidId));
    }),

  delete: protectedProcedure
    .input(
      z.object({
        providerBidId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input: { providerBidId } }) => {
      return await ctx.db
        .delete(providerBid)
        .where(eq(providerBid.id, providerBidId));
    }),
});
