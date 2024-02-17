"use server";
import { api } from "~/trpc/server";
import Turnover from "./_components/_Turnover";

export default async function TurnoverLayout() {
  const data = await api.annualTurnoverGBP.getAll.query();

  return <Turnover initialData={data} />;
}
