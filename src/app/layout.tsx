import SessionProvider from "~/SessionProvider";
import { getServerAuthSession } from "~/server/auth";
import { TRPCReactProvider } from "~/trpc/react";
import { GoogleTagManager } from "@next/third-parties/google";
import { env } from "~/env";
import { Inter } from "next/font/google";
import "~/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "My Business Guide",
  description: "Connecting SMEs with the best providers in the market.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();
  return (
    <html lang="en" className={`font-sans ${inter.variable} `}>
      <SessionProvider session={session}>
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <GoogleTagManager gtmId={env.NEXT_PUBLIC_GTM} />
      </SessionProvider>
    </html>
  );
}
