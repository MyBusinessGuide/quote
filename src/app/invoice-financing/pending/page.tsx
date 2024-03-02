"use server";
import Link from "next/link";
import Button from "~/app/_components/Button.component";
import FlowLayout from "~/app/_components/FlowLayout";

export default async function Pending() {
  return (
    <FlowLayout backUrl="">
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <h2 className="text-xl">Looking for a provider!</h2>
        <p className="text-center">
          We are currently looking for a provider to help with your invoice.
          Once we find one, they'll reach out.
        </p>
        <Link href="turnover" className="w-full">
          <Button variant="outline" fullWidth className="mt-8">
            Done
          </Button>
        </Link>
      </div>
    </FlowLayout>
  );
}
