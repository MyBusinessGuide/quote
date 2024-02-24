import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { providers } from "~/server/db/schema";

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
});
