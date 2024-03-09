import FlowLayout from "~/app/_components/FlowLayout";

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <FlowLayout backUrl="company">{children}</FlowLayout>;
}
