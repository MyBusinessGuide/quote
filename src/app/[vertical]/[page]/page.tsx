import { ReactNode } from "react";
import Turnover from "~/app/_components/JourneyPages/Turnover.page";
import { LeadJourneyPage } from "~/server/db/schema";
import { api } from "~/trpc/server";

type LeadJourneyStepProps = {
  params: {
    vertical: string;
    page: string;
  };
};

export default async function LeadJourneyStep({
  params: { page },
}: LeadJourneyStepProps) {
  const data = await api.leadJourneyStep.getBySlug.query({
    slug: page,
  });

  if (data) {
    const pages: { [key in LeadJourneyPage]: ReactNode } = {
      VERTICAL_AMOUNT: "Vertical Amount",
      COMPANY_NAME: "Company Name",
      ANNUAL_TURNOVER: <Turnover nextStepSlug={data.nextStepSlug} />,
      INDUSTRY: "Industry",
      TENURE: "Tenure",
      COMPANY_API: "Company API",
      SUMMARY: "Summary",
    };

    return (
      <div className="mx-auto flex h-full w-full max-w-md flex-1 flex-col items-center justify-center gap-12">
        {pages[data.leadJourneyPage]}
      </div>
    );
  }

  return <div>Error</div>;
}
