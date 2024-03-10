"use client";
import { MoveLeft, X } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "../_utils/cn";
import { sendGTMEvent } from "@next/third-parties/google";
import { env } from "~/env";

type FlowLayoutProps = {
  children: ReactNode;
  backUrl?: string;
  className?: string;
  currentPage: string;
};

export default async function FlowLayout({
  children,
  backUrl,
  className,
  currentPage,
}: FlowLayoutProps) {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center gap-2 md:p-6">
      <div className="flex w-full flex-1 justify-between p-4 ">
        {backUrl ? (
          <Link
            href={backUrl}
            onClick={() =>
              sendGTMEvent({
                event: `invoice_finance_${currentPage}_back`,
                value: `invoice_finance_${currentPage}_back`,
              })
            }
          >
            <MoveLeft className="text-primary-800" />
          </Link>
        ) : (
          <div />
        )}
        <h1 className="text-lg font-medium text-primary-800">
          Your Invoice Finance Quote
        </h1>
        <a
          href={env.NEXT_PUBLIC_LANDING_URL}
          onClick={() =>
            sendGTMEvent({
              event: `invoice_finance_${currentPage}_exit`,
              value: `invoice_finance_${currentPage}_exit`,
            })
          }
        >
          <X className="text-primary-800" />
        </a>
      </div>
      <div className={cn("w-full max-w-lg p-8", className)}>{children}</div>
      <div className="w-full flex-[2]"></div>
    </div>
  );
}
