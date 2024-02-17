import FlowLayout from "~/app/_components/FlowLayout";

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FlowLayout backUrl="industry" className="flex min-h-[50vh] flex-col gap-2">
      {children}
    </FlowLayout>
  );
}
