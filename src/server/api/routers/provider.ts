import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { insertProviderSchema, providers } from "~/server/db/schema";

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
});
