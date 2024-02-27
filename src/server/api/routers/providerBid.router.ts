import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { leadCode, providerBid } from "~/server/db/schema";

export const providerBidRouter = createTRPCRouter({
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

  create: publicProcedure
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

  update: publicProcedure
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

  delete: publicProcedure
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
