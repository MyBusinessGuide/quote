"use server";
import { api } from "~/trpc/server";
import Tenure from "./_components/_Tenure";
import { unstable_noStore } from "next/cache";

export default async function TenurePage() {
  unstable_noStore();
  const data = await api.tenure.getAll.query();

  return <Tenure initialData={data} />;
}
