"use client";
import { cva } from "class-variance-authority";
import { ComponentProps } from "react";
import { cn } from "../_utils/cn";
import { UseFormRegisterReturn } from "react-hook-form";

const inputVariants = cva("border-b-1 py-2 text-lg bg-transparent", {
  variants: {
    disabled: {
      true: "text-gray-600",
      false: "text-primary-900",
    },
    error: {
      true: "border-red-500",
      false: "border-primary-200",
    },
  },
  defaultVariants: {
    disabled: false,
    error: false,
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
  className,
  disabled,
  ...props
}: InputProps) {
  return (
    <div className={cn("flex w-full flex-col", className)}>
      <label className=" font-medium text-primary-900" htmlFor={id}>
        {label} {required && "*"}
      </label>
      <input
        disabled={disabled}
        {...register}
        {...props}
        id={id}
        className={cn(inputVariants({ error: !!error, disabled }))}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
