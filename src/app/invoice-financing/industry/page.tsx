"use server";

import { api } from "~/trpc/server";
import Industry from "./_components/_Industry";

export default async function IndustryPage() {
  const data = await api.industry.getAll.query();

  return <Industry initialData={data} />;
}
