import "~/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import Nav from "./_components/Nav.component";
import Footer from "./_components/Footer.component";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Ba Ba Bills",
  description: "Connecting SMEs with the best providers in the market.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <TRPCReactProvider>
        <body
          className={`font-sans ${inter.variable} flex min-h-screen flex-col`}
        >
          <Nav />
          {children}
          <Footer />
        </body>
      </TRPCReactProvider>
    </html>
  );
}
