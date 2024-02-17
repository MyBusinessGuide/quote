import FlowLayout from "~/app/_components/FlowLayout";

export default function ThankYou() {
  return (
    <FlowLayout backUrl="">
      <div className="flex h-full flex-col items-center justify-center">
        <h2 className="text-lg text-primary">Thank you for your application</h2>
        <p className="text-center text-sm">We will be in touch shortly</p>
      </div>
    </FlowLayout>
  );
}
