"use client";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { VariantProps, cva } from "class-variance-authority";
import { ComponentProps } from "react";
import { cn } from "~/app/_utils/cn";

const radioButtonVariant = cva(
  "rounded-3xl py-3 px-10 cursor-pointer bg-primary-50 border-primary text-primary",
  {
    variants: {
      selected: {
        true: "font-semibold border-2",
        false: "border-1 ",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      selected: false,
      fullWidth: false,
    },
  },
);

export type TRadioButton = {
  label: string;
  value: string;
};

type RadioButtonProps = TRadioButton &
  ComponentProps<typeof RadioGroup.Item> &
  VariantProps<typeof radioButtonVariant>;

export default function RadioButton({
  label,
  value,
  selected,
  className,
  fullWidth,
  ...rest
}: RadioButtonProps) {
  return (
    <RadioGroup.Item
      id={value}
      value={value}
      {...rest}
      className={cn(radioButtonVariant({ selected, fullWidth }), className)}
    >
      {label}
    </RadioGroup.Item>
  );
}
