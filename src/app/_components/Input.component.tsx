"use client";
import { cva } from "class-variance-authority";
import { ComponentProps } from "react";
import { cn } from "../_utils/cn";
import { UseFormRegisterReturn } from "react-hook-form";

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
  register?: UseFormRegisterReturn;
} & ComponentProps<"input">;

export default function Input({
  id,
  label,
  required,
  error,
  register,
  ...props
}: InputProps) {
  return (
    <div className="flex w-full flex-col">
      <label className=" font-medium text-primary-900" htmlFor={id}>
        {label} {required && "*"}
      </label>
      <input
        {...register}
        {...props}
        id={id}
        className={cn(inputVariants({ error: !!error }))}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
