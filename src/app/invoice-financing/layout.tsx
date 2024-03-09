"use client";

import Nav from "../_components/Nav.component";
import Footer from "../_components/Footer.component";
import { useSearchParams } from "next/navigation";
import { z } from "zod";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount");

  useEffect(() => {
    const homeURL = "https://frank-autonomy-789529.framer.app/";
    if (!amount) window.open(homeURL, "_self");

    const validation = z.coerce.number().min(1).safeParse(amount);
    if (!validation.success) window.open(homeURL, "_self");
  }, [amount]);

  return (
    <body className="flex min-h-screen flex-col justify-between text-primary-900">
      <Nav />
      {children}
      <Footer />
    </body>
  );
}
