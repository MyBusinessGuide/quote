"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import RadioGroup from "~/app/_components/RadioGroup/RadioGroup.component";

export default function Tenure() {
  const [selectedValue, setSelectedValue] = useState<string | undefined>();
  const router = useRouter();
  const { data, error, isLoading } = api.tenure.getAll.useQuery();

  const onValueChange = (value: string) => {
    setSelectedValue(value);

    // set value in zustand
  };

  const items = data?.map((item) => ({
    label: item.label,
    value: item.id,
  }));

  if (data && items)
    return (
      <div className="w-full">
        <h1 className="mb-8 text-center text-lg text-primary">
          How long have you been trading?
        </h1>
        <RadioGroup
          items={items}
          onValueChange={onValueChange}
          value={selectedValue}
        />
      </div>
    );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
}
