import { MoveLeft, X } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

type FlowLayoutProps = {
  children: ReactNode;
  backUrl: string;
};

export default function FlowLayout({ children, backUrl }: FlowLayoutProps) {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center gap-2 md:p-6">
      <div className="flex w-full flex-1 justify-between p-4 ">
        <Link href={backUrl}>
          <MoveLeft className="text-primary-800" />
        </Link>
        <h1 className="text-lg font-medium text-primary-800">
          Your Invoice Finance Quote
        </h1>
        <Link href="/">
          <X className="text-primary-800" />
        </Link>
      </div>
      <div className="w-full max-w-md p-4">{children}</div>
      <div className="w-full flex-[2]"></div>
    </div>
  );
}
