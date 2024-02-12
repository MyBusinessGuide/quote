import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { lead } from "~/server/db/schema";

export const leadRouter = createTRPCRouter({
  patch: publicProcedure
    .input(
      z.object({
        companyTypeId: z.number().optional(),
        companyName: z.string().optional(),
        annualTurnoverGBPId: z.number().optional(),
        industryId: z.number().optional(),
        tenureYrsId: z.number().optional(),
        submitted: z.boolean().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.update(lead).set(input).where(eq(lead.id, 1));
    }),
});
