import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const tenureRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.tenure_yrs.findMany();
  }),
});
