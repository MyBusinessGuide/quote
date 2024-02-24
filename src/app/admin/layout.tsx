"use client";
import { AppProvider } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

import "@shopify/polaris/build/esm/styles.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} text-primary-900`}>
        <AppProvider i18n={enTranslations}>{children}</AppProvider>
      </body>
    </html>
  );
}
