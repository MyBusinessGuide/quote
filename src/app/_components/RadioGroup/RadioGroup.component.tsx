"use client";
import * as RadioGroupRadix from "@radix-ui/react-radio-group";
import RadioButton, { TRadioButton } from "./RadioButton.component";

export type RadioGroupItem = TRadioButton;
export type RadioGroupProps = {
  items: RadioGroupItem[];
  onValueChange: (value: string) => void;
  value?: string | number;
};

export default function RadioGroup({
  items,
  onValueChange,
  value,
}: RadioGroupProps) {
  return (
    <RadioGroupRadix.Root
      onValueChange={onValueChange}
      value={value?.toString()}
      className="flex w-full flex-col gap-4"
    >
      {items.map((item) => (
        <RadioButton
          key={item.value}
          value={item.value}
          label={item.label}
          fullWidth
          selected={value == item.value}
        />
      ))}
    </RadioGroupRadix.Root>
  );
}
