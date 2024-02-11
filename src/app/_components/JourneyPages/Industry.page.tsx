"use client";
import { useState } from "react";
import RadioGroup, { RadioGroupItem } from "../RadioGroup/RadioGroup.component";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

const items: RadioGroupItem[] = [
  {
    label: "Less than £85,000",
    value: "less-than-85000",
  },
  { label: "£85,000 - £150,000", value: "85000-150000" },
  { label: "£150,000 - £250,000", value: "150000-250000" },
  { label: "£250,000 - £500,000", value: "250000-500000" },
  { label: "£500,000 - £1,000,000", value: "500000-1000000" },
  { label: "More than £1,000,000", value: "more-than-1000000" },
];

type IndustryProps = {
  nextStepSlug: string | null;
};

export default function Industry({ nextStepSlug }: IndustryProps) {
  const [selectedValue, setSelectedValue] = useState<string | undefined>();
  const router = useRouter();
  const { data, error, isLoading } = api.industry.getAll.useQuery();

  const onValueChange = (value: string) => {
    setSelectedValue(value);

    // set value in zustand
    if (!nextStepSlug) return;
    setTimeout(() => router.push(nextStepSlug), 0);
  };

  const items = data?.map((item) => ({
    label: item.label,
    value: item.id,
  }));

  if (data && items)
    return (
      <div className="w-full">
        <h1 className="mb-8 text-center text-lg text-primary">
          What's your industry?
        </h1>
        <RadioGroup
          items={items}
          onValueChange={onValueChange}
          value={selectedValue}
        />
        {/* <Link href={`${nextStepSlug}`} className="w-full">
        <Button variant={"primary"} fullWidth>
          Next
        </Button>
      </Link> */}
      </div>
    );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
}
