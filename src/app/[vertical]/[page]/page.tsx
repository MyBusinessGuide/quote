import Link from "next/link";
import { ReactNode } from "react";
import Button from "~/app/_components/Button.component";
import { LeadJourneyPage } from "~/server/db/schema";
import { api } from "~/trpc/server";

const pages: { [key in LeadJourneyPage]: ReactNode } = {
  VERTICAL_AMOUNT: "Vertical Amount",
  COMPANY_NAME: "Company Name",
  ANNUAL_TURNOVER: "Annual Turnover",
  INDUSTRY: "Industry",
  TENURE: "Tenure",
  COMPANY_API: "Company API",
  SUMMARY: "Summary",
};
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

  if (data)
    return (
      <div className="mx-auto flex h-full w-full max-w-md flex-col items-center justify-center gap-12 p-12">
        {pages[data.leadJourneyPage]}
        <Link href={`${data.nextStepSlug}`} className="w-full">
          <Button variant={"primary"} fullWidth>
            Next
          </Button>
        </Link>
      </div>
    );

  return <div>Error</div>;
}
