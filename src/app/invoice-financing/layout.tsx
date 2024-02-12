import { ReactNode } from "react";

export default function FlowLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex h-full w-full max-w-md flex-1 flex-col items-center justify-center gap-12">
      {children}
    </div>
  );
}
