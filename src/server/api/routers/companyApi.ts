import { z } from "zod";
import { env } from "~/env";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  CompanyApiGetOfficersResponse,
  Officer,
} from "~/types/companyApiGetOfficers.types";
import {
  Company,
  CompanyAPISearchCompanyResponse,
} from "~/types/companyApiSearchCompany.types";

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
    const data = (await response.json()) as CompanyAPISearchCompanyResponse;
    return data.items;
  }),
  getOfficers: publicProcedure
    .input(z.object({ companyNumber: z.string() }))
    .query(async ({ input }) => {
      const url = `https://api.company-information.service.gov.uk/company/${input.companyNumber}/officers`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Basic ${env.COMPANY_API_KEY}==`,
        },
      });

      if (response.status === 404) return [] as Officer[];
      if (!response.ok) throw new Error("Failed to fetch officers");
      const data = (await response.json()) as CompanyApiGetOfficersResponse;
      return data.items;
    }),
});
