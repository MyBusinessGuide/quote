"use client";
import { ComponentProps } from "react";

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
      <label className="text-primary-900 text-sm" htmlFor={id}>
        {label} {required && "*"}
      </label>
      <input {...props} id={id} className="border-b-1 py-2 " />
    </div>
  );
}
