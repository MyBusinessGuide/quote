import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const annualTurnoverGBPRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.annualTurnoverGBP.findMany();
  }),
});
