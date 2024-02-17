"use server";
import { api } from "~/trpc/server";
import Turnover from "./_components/_Turnover";
import { unstable_noStore } from "next/cache";

export default async function TurnoverLayout() {
  unstable_noStore();
  const data = await api.annualTurnoverGBP.getAll.query();

  return <Turnover initialData={data} />;
}
