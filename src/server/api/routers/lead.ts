import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { lead, users } from "~/server/db/schema";

export const leadRouter = createTRPCRouter({
  post: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        phoneNumber: z.string().min(1),
        fullName: z.string().min(1),
        companyName: z.string(),
        annualTurnoverGBPId: z.number(),
        industryId: z.number(),
        tenureYrsId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const foundUsers = await ctx.db
        .select({
          id: users.id,
        })
        .from(users)
        .where(eq(users.email, input.email))
        .limit(1);

      let userId: number;
      if (foundUsers.length === 0) {
        userId =
          (
            await ctx.db
              .insert(users)
              .values({
                email: input.email,
                phoneNumber: input.phoneNumber,
                name: input.fullName,
              })
              .returning({ id: users.id })
          )[0]?.id ?? 1;
      } else {
        userId = foundUsers[0]?.id ?? 1;
      }
      return await ctx.db.insert(lead).values({
        userId,
        companyName: input.companyName,
        annualTurnoverGBPId: input.annualTurnoverGBPId,
        industryId: input.industryId,
        tenureYrsId: input.tenureYrsId,
      });
    }),
});
