"use client";

import { useEffect, useState } from "react";
import Button from "./_components/Button.component";
import RadioGroup, {
  RadioGroupProps,
} from "./_components/RadioGroup/RadioGroup.component";
import Input from "./_components/Input.component";

const items: RadioGroupProps["items"] = [
  { label: "Sole Trader", value: "sole-trader" },
  { label: "Limited Company", value: "limited-company" },
  { label: "Partnership", value: "partnership" },
];

export default function Home() {
  const [value, setValue] = useState("");

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-evenly p-4">
      <div className="text-primary-700 flex w-full flex-col gap-8">
        <p className="text-center">Whats is your company type?</p>
        <RadioGroup items={items} value={value} onValueChange={setValue} />
      </div>

      <Button variant={"primary"} fullWidth disabled={!value}>
        Next
      </Button>
    </main>
  );
}
