import { VariantProps, cva } from "class-variance-authority";
import { cn } from "~/app/_utils/cn";

const companyListItemVariants = cva(
  "h-5 w-5 rounded-full border-1 border-primary transition-colors",
  {
    variants: {
      selected: {
        true: " bg-primary-500",
        false: "",
      },
    },
    defaultVariants: {
      selected: false,
    },
  },
);

export type CompanyListItemProps = {
  id: string;
  title: string;
  subtitle: string;
  className?: string;
} & VariantProps<typeof companyListItemVariants>;

export default function CompanyListItem({
  title,
  subtitle,
  selected,
  className,
}: CompanyListItemProps) {
  return (
    <li
      className={cn(
        "flex items-center justify-between border-b border-primary-100 py-2 pr-4 ",
        className,
      )}
    >
      <div className="flex-1">
        <h5>{title}</h5>
        <h6 className="mt-1 text-sm font-medium">{subtitle}</h6>
      </div>
      <div className={cn(companyListItemVariants({ selected }))} />
    </li>
  );
}
