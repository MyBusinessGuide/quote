export default function CompanyListItemSkeleton() {
  return (
    <li className="flex animate-pulse items-center justify-between py-2 pr-4">
      <div className="flex w-full flex-col gap-1">
        <div className=" h-5 w-[70%] rounded-lg bg-gray-300" />
        <div className=" h-3 w-[50%] rounded-lg bg-gray-300" />
      </div>
      <div className="h-5 w-5 rounded-full bg-gray-300 " />
    </li>
  );
}
