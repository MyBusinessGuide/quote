import FlowLayout from "~/app/_components/FlowLayout";

export default function TenureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FlowLayout currentPage="tenure" backUrl="company">
      <div className="w-full">
        <h2 className="mb-8 text-center text-lg text-primary">
          How long have you been trading?
        </h2>
        {children}
      </div>
    </FlowLayout>
  );
}
