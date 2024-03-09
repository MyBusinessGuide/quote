import FlowLayout from "~/app/_components/FlowLayout";

export default function TurnoverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FlowLayout>
      <div className="w-full">
        <h2 className="mb-8 text-center text-lg text-primary">
          What&apos;s your annual turnover?
        </h2>
        {children}
      </div>
    </FlowLayout>
  );
}
