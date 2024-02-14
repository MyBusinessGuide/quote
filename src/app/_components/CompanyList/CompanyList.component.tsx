import { cn } from "~/app/_utils/cn";
import CompanyListItem, {
  CompanyListItemProps,
} from "./CompanyListItem.component";
import CompanyListItemSkeleton from "./CompanyListItem.skeleton";

type CompanyListProps = {
  items: CompanyListItemProps[];
  isLoading?: boolean;
  className?: string;
  selectedId?: string;
  onItemClick: (id: string) => void;
  error?: string;
  numOfLoadingItems?: number;
};

export default function CompanyList({
  items,
  className,
  isLoading,
  selectedId,
  onItemClick,
  error,
  numOfLoadingItems = 6,
}: CompanyListProps) {
  if (error)
    return <div className=" w-full text-center text-red-700 ">{error}</div>;

  if (isLoading)
    return (
      <ul className="flex max-h-[30vh] flex-col overflow-y-auto">
        {[...(Array(numOfLoadingItems) as number[])].map((_, index) => (
          <CompanyListItemSkeleton key={`itemSkeleton${index}`} />
        ))}
      </ul>
    );

  if (items.length === 0)
    return <div className="text-center">No items found</div>;

  return (
    <ul className={cn("max-h-[30vh] overflow-y-auto", className)}>
      {items.map((item) => (
        <button
          className="w-full text-start"
          onClick={() => onItemClick(item.id)}
          key={item.id}
        >
          <CompanyListItem {...item} selected={item.id == selectedId} />
        </button>
      ))}
    </ul>
  );
}
