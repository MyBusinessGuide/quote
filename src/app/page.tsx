"use client";

import { useEffect, useState } from "react";
import Button from "./_components/Button.component";
import RadioGroup, {
  RadioGroupProps,
} from "./_components/RadioGroup/RadioGroup.component";

const items: RadioGroupProps["items"] = [
  { label: "Sole Trader", value: "sole-trader" },
  { label: "Limited Company", value: "limited-company" },
  { label: "Partnership", value: "partnership" },
];

export default function Home() {
  const [value, setValue] = useState("");

  useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <main className="flex flex-1 flex-col items-center justify-evenly p-4">
      <RadioGroup items={items} value={value} onValueChange={setValue} />

      <Button variant={"primary"} fullWidth disabled={!value}>
        Next
      </Button>
    </main>
  );
}
