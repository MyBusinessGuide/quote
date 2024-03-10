import FlowLayout from "~/app/_components/FlowLayout";

export default function IndustryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FlowLayout currentPage="industry" backUrl="turnover">
      <div className="w-full">
        <h2 className="mb-8 text-center text-lg text-primary">
          What&apos;s your industry?
        </h2>
        {children}
      </div>
    </FlowLayout>
  );
}
