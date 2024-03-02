import SessionProvider from "~/SessionProvider";
import { getServerAuthSession } from "~/server/auth";
import { TRPCReactProvider } from "~/trpc/react";
import { GoogleTagManager } from "@next/third-parties/google";
import { env } from "~/env";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();
  return (
    <html lang="en">
      <SessionProvider session={session}>
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <GoogleTagManager gtmId={env.NEXT_PUBLIC_GTM} />
      </SessionProvider>
    </html>
  );
}
