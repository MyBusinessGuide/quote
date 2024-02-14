import { z } from "zod";
import { env } from "~/env";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { Company, CompanyAPISearchResponse } from "~/types/companyApi.types";

export const companyApiRouter = createTRPCRouter({
  searchCompany: publicProcedure.input(z.string()).query(async ({ input }) => {
    const url = new URL(
      "https://api.company-information.service.gov.uk/search/companies",
    );

    url.searchParams.append("q", input);

    const response = await fetch(url.href, {
      headers: {
        Authorization: `Basic ${env.COMPANY_API_KEY}==`,
      },
    });

    if (response.status === 404) return [] as Company[];
    if (!response.ok) throw new Error("Failed to fetch companies");
    const data = (await response.json()) as CompanyAPISearchResponse;
    return data.items;
  }),
});
