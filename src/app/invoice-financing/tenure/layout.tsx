"use server";
import FlowLayout from "~/app/_components/FlowLayout";
import { api } from "~/trpc/server";
import Tenure from "./page";

export default async function TenurePage() {
  const data = await api.tenure.getAll.query();

  return (
    <FlowLayout backUrl="company">
      <div className="w-full">
        <h2 className="mb-8 text-center text-lg text-primary">
          How long have you been trading?
        </h2>
        <Tenure initialData={data} />
      </div>
    </FlowLayout>
  );
}
