"use server";
import Link from "next/link";
import Button from "~/app/_components/Button.component";
import FlowLayout from "~/app/_components/FlowLayout";

export default async function NoProvider() {
  return (
    <FlowLayout backUrl="">
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <h2 className="text-xl">No provider found!</h2>
        <p className="text-center">
          Unfortunately, we couldn&apos;t find a provider for you.
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
