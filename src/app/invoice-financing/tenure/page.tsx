"use client";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import RadioGroup from "~/app/_components/RadioGroup/RadioGroup.component";
import useInvoiceFinancing from "~/app/_hooks/useInvoiceFinancing";

export default function Tenure() {
  const router = useRouter();
  const { data, error, isLoading } = api.tenure.getAll.useQuery();
  const { values, setValue } = useInvoiceFinancing();

  const onValueChange = (value: string) => {
    setValue("tenureId", Number(value));
    router.push("/invoice-financing/success");
  };

  const items = data?.map((item) => ({
    label: item.label,
    value: item.id,
  }));

  if (data && items)
    return (
      <div className="w-full">
        <h2 className="mb-8 text-center text-lg text-primary">
          How long have you been trading?
        </h2>
        <RadioGroup
          items={items}
          onValueChange={onValueChange}
          value={values.tenureId?.toString()}
        />
      </div>
    );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
}
