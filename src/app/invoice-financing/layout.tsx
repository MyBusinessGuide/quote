import "~/styles/globals.css";

import { Inter } from "next/font/google";

import Nav from "../_components/Nav.component";
import Footer from "../_components/Footer.component";

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
    <body
      className={`font-sans ${inter.variable} flex min-h-screen flex-col justify-between text-primary-900`}
    >
      <Nav />
      {children}
      <Footer />
    </body>
  );
}
