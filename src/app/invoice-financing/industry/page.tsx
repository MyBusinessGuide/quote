"use server";

import { api } from "~/trpc/server";
import Industry from "./_components/_Industry";
import { unstable_noStore } from "next/cache";

export default async function IndustryPage() {
  unstable_noStore();
  const data = await api.industry.getAll.query();

  return <Industry initialData={data} />;
}
