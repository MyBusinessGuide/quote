"use client";
import * as RadioGroupRadix from "@radix-ui/react-radio-group";
import RadioButton, { TRadioButton } from "./RadioButton.component";

export type RadioGroupProps = {
  items: TRadioButton[];
  onValueChange: (value: string) => void;
  value?: string;
};

export default function RadioGroup({
  items,
  onValueChange,
  value,
}: RadioGroupProps) {
  return (
    <RadioGroupRadix.Root
      onValueChange={onValueChange}
      value={value}
      className="flex w-full flex-col gap-4"
    >
      {items.map((item) => (
        <RadioButton
          key={item.value}
          {...item}
          fullWidth
          selected={value === item.value}
        />
      ))}
    </RadioGroupRadix.Root>
  );
}
