"use client";

import Nav from "../_components/Nav.component";
import Footer from "../_components/Footer.component";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body className="flex min-h-screen flex-col justify-between text-primary-900">
      <Nav />
      {children}
      <Footer />
    </body>
  );
}
