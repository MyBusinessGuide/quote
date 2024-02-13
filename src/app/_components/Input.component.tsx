"use client";
import { cva } from "class-variance-authority";
import { ComponentProps } from "react";
import { cn } from "../_utils/cn";

const inputVariants = cva("border-b-1 py-2 text-lg", {
  variants: {
    error: {
      true: "border-red-500",
      false: "border-primary-200",
    },
  },
});

type InputProps = {
  id: string | number;
  label: string;
  error?: string;
  required?: boolean;
} & ComponentProps<"input">;

export default function Input({
  id,
  label,
  required,
  error,
  ...props
}: InputProps) {
  return (
    <div className="flex w-full flex-col">
      <label className=" font-medium text-primary-900" htmlFor={id}>
        {label} {required && "*"}
      </label>
      <input
        {...props}
        id={id}
        className={cn(inputVariants({ error: !!error }))}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
