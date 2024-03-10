"use client";
import { sendGTMEvent } from "@next/third-parties/google";
import { Check } from "lucide-react";
import Button from "~/app/_components/Button.component";
import FlowLayout from "~/app/_components/FlowLayout";
import { env } from "~/env";

export default async function ThankYou() {
  return (
    <FlowLayout currentPage="thank_you">
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <div className="flex items-center justify-center rounded-full border-2 border-primary p-2 text-primary">
          <Check className="stroke-2" />
        </div>
        <h2 className="text-xl">Great news, all done!</h2>
        <p className="text-center">
          We’ve passed your details onto our experts that are ready to help you.
          They should be in touch shortly.
        </p>
        <a href={env.NEXT_PUBLIC_LANDING_URL} className="w-full">
          <Button
            variant="outline"
            fullWidth
            className="mt-8"
            onClick={() =>
              sendGTMEvent({
                event: "invoice_finance_end_quote_done",
                value: "invoice_finance_end_quote_done",
              })
            }
          >
            Done
          </Button>
        </a>
      </div>
    </FlowLayout>
  );
}
