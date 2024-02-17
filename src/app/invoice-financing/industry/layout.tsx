"use server";

import FlowLayout from "~/app/_components/FlowLayout";
import { api } from "~/trpc/server";
import Industry from "./page";

export default async function IndustryPage() {
  const data = await api.industry.getAll.query();

  return (
    <FlowLayout backUrl="/invoice-financing/turnover">
      <div className="w-full">
        <h2 className="mb-8 text-center text-lg text-primary">
          What&apos;s your industry?
        </h2>
        <Industry initialData={data} />
      </div>
    </FlowLayout>
  );
}
