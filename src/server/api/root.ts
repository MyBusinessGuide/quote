import { leadJourneyStepRouter } from "~/server/api/routers/leadJourneyStep";
import { createTRPCRouter } from "~/server/api/trpc";
import { annualTurnoverGBPRouter } from "./routers/annualTurnoverGBP";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  leadJourneyStep: leadJourneyStepRouter,
  annualTurnoverGBP: annualTurnoverGBPRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
