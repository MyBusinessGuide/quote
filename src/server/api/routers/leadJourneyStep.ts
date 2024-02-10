import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { leadJourneyStep } from "~/server/db/schema";

export const leadJourneyStepRouter = createTRPCRouter({
  getBySlug: publicProcedure
    .input(
      z.object({
        slug: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const nextStep = alias(leadJourneyStep, "next_step");
      const a = await ctx.db
        .select({
          nextStepSlug: nextStep.slug,
          leadJourneyPage: leadJourneyStep.leadJourneyPage,
        })
        .from(leadJourneyStep)
        .leftJoin(nextStep, eq(leadJourneyStep.nextJourneyStepId, nextStep.id))
        .where(eq(leadJourneyStep.slug, input.slug))
        .limit(1);
      if (!a) throw new TRPCError({ code: "NOT_FOUND" });
      return a[0];
    }),
});
