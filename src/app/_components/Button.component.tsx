import { ComponentProps } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "../_utils/cn";
import { Loader2 } from "lucide-react";

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
    disabled: {
      true: "bg-primary-disabled cursor-not-allowed",
      false: "",
    },
    loading: {
      true: "flex justify-center items-center",
      false: "",
    },
  },
  defaultVariants: {
    variant: "primary",
    fullWidth: false,
  },
});

type ButtonVariant = VariantProps<typeof buttonVariant>;
type ButtonProps = {
  loading?: boolean;
} & ComponentProps<"button"> &
  ButtonVariant;

export default function Button({
  children,
  variant,
  fullWidth,
  className,
  disabled,
  loading,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={cn(
        buttonVariant({
          variant,
          fullWidth,
          disabled: disabled || loading,
          loading,
        }),
        className,
      )}
      {...rest}
    >
      {loading ? <Loader2 className="animate-spin" /> : children}
    </button>
  );
}
