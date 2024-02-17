"use server";
import FlowLayout from "~/app/_components/FlowLayout";
import { api } from "~/trpc/server";
import Turnover from "./page";

export default async function TurnoverLayout() {
  const data = await api.annualTurnoverGBP.getAll.query();

  return (
    <FlowLayout backUrl="">
      <div className="w-full">
        <h2 className="mb-8 text-center text-lg text-primary">
          What&apos;s your annual turnover?
        </h2>
        <Turnover initialData={data} />
      </div>
    </FlowLayout>
  );
}
