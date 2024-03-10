"use server";
import Button from "~/app/_components/Button.component";
import FlowLayout from "~/app/_components/FlowLayout";
import { env } from "~/env";

export default async function Pending() {
  return (
    <FlowLayout>
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <h2 className="text-xl">Looking for a provider!</h2>
        <p className="text-center">
          We are currently looking for a provider to help with your invoice.
          Once we find one, they&apos;ll reach out.
        </p>
        <a href={env.NEXT_PUBLIC_LANDING_URL} className="w-full">
          <Button variant="outline" fullWidth className="mt-8">
            Done
          </Button>
        </a>
      </div>
    </FlowLayout>
  );
}
