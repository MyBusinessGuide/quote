"use server";
import { api } from "~/trpc/server";
import Tenure from "./_Tenure";

export default async function TenurePage() {
  const data = await api.tenure.getAll.query();

  return <Tenure initialData={data} />;
}
