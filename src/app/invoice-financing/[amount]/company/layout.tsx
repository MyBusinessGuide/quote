import FlowLayout from "~/app/_components/FlowLayout";

export default function CompanyLayout({
  children,
  params: { amount },
}: {
  children: React.ReactNode;
  params: { amount: string };
}) {
  return (
    <FlowLayout backUrl="industry" className="flex min-h-[50vh] flex-col gap-2">
      {children}
    </FlowLayout>
  );
}
