import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const industryRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.industry.findMany();
  }),
});
