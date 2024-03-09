import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const serviceRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.service.findMany();
  }),
});
