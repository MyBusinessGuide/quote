"use server";
import { X } from "lucide-react";
import Link from "next/link";
import Button from "~/app/_components/Button.component";
import FlowLayout from "~/app/_components/FlowLayout";

export default async function Error() {
  return (
    <FlowLayout backUrl="">
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <div className="border- flex items-center justify-center rounded-full border-2 border-red-700 p-2 text-red-700">
          <X className="stroke-2" />
        </div>
        <h2 className="text-xl">Something went wrong!</h2>
        <p className="text-center">
          Unfortunately we were unable to process your request. Please try again
          or contact us for assistance.
        </p>
        <Link href="turnover" className="w-full">
          <Button variant="outline" fullWidth className="mt-8">
            Try again
          </Button>
        </Link>
      </div>
    </FlowLayout>
  );
}
