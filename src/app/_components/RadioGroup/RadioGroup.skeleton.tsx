export default function RadioGroupSkeleton() {
  return (
    <div className="flex w-full flex-col gap-4">
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <div className="h-12 w-full animate-pulse rounded-3xl bg-gray-300" />
        ))}
    </div>
  );
}
