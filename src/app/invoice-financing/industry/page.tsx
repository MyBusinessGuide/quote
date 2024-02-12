"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import RadioGroup from "~/app/_components/RadioGroup/RadioGroup.component";

export default function Industry() {
  const [selectedValue, setSelectedValue] = useState<string | undefined>();
  const router = useRouter();
  const { data, error, isLoading } = api.industry.getAll.useQuery();

  const { mutate } = api.lead.patch.useMutation({
    onSuccess: () => router.push("/invoice-financing/turnover"),
    onError: (error) => console.error(error),
  });

  const onValueChange = (value: string) => {
    setSelectedValue(value);

    mutate({
      industryId: parseInt(value),
    });
  };

  const items = data?.map((item) => ({
    label: item.label,
    value: item.id,
  }));

  if (data && items)
    return (
      <div className="w-full">
        <h2 className="mb-8 text-center text-lg text-primary">
          What's your industry?
        </h2>
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
