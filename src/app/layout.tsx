import { getServerSession } from "next-auth";
import SessionProvider from "~/SessionProvider";
import { getServerAuthSession } from "~/server/auth";
import { TRPCReactProvider } from "~/trpc/react";

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
      </SessionProvider>
    </html>
  );
}
