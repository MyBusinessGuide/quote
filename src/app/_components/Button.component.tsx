import { ComponentProps } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "../_utils/cn";
import { Loader2 } from "lucide-react";

const buttonVariant = cva("rounded-3xl cursor-pointer", {
  variants: {
    variant: {
      primary: "bg-primary text-white py-3 px-10",
      underline: "underline",
      outline: "border border-primary text-primary py-3 px-10",
    },
    fullWidth: {
      true: "w-full",
      false: "",
    },
    disabled: {
      true: "",
      false: "",
    },
    loading: {
      true: "flex justify-center items-center",
      false: "",
    },
  },
  compoundVariants: [
    {
      disabled: true,
      variant: "primary",
      class: "bg-primary-disabled cursor-not-allowed",
    },
  ],
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
          disabled: disabled ?? loading,
          loading,
        }),
        className,
      )}
      disabled={disabled ?? loading}
      {...rest}
    >
      {loading ? <Loader2 className="animate-spin" /> : children}
    </button>
  );
}
