import { createTRPCRouter } from "~/server/api/trpc";
import { annualTurnoverGBPRouter } from "./routers/annualTurnoverGBP";
import { industryRouter } from "./routers/industry";
import { tenureRouter } from "./routers/tenure";
import { leadRouter } from "./routers/lead";
import { companyApiRouter } from "./routers/companyApi";
import { providerRouter } from "./routers/provider";
import { providerBidRouter } from "./routers/providerBid.router";
import { serviceRouter } from "./routers/service.router";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  annualTurnoverGBP: annualTurnoverGBPRouter,
  industry: industryRouter,
  tenure: tenureRouter,
  lead: leadRouter,
  companyApi: companyApiRouter,
  provider: providerRouter,
  providerBid: providerBidRouter,
  service: serviceRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
