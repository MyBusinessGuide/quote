import { ComponentProps } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "../_utils/cn";

const buttonVariant = cva("rounded-3xl py-3 px-10 cursor-pointer", {
  variants: {
    variant: {
      primary: "bg-primary text-white",
      secondary: "bg-primary-50 text-primary border-1 border-primary",
    },
    fullWidth: {
      true: "w-full",
      false: "",
    },
  },
  defaultVariants: {
    variant: "primary",
    fullWidth: false,
  },
});

type ButtonVariant = VariantProps<typeof buttonVariant>;
type ButtonProps = {} & ComponentProps<"button"> & ButtonVariant;

export default function Button({
  children,
  variant,
  fullWidth,
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariant({ variant, fullWidth }), className)}
      {...rest}
    >
      {children}
    </button>
  );
}
