"use client";
import { AppProvider } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";
import { Inter } from "next/font/google";
import "@shopify/polaris/build/esm/styles.css";
import { LinkLikeComponent } from "@shopify/polaris/build/ts/src/utilities/link";
import { useRef } from "react";
import NextLink from "next/link";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const Link: LinkLikeComponent = ({ children, url = "", ...rest }) => {
  const ref = useRef<any>();

  return (
    <NextLink
      href={url}
      // @ts-expect-error legacy type cannot be properly typed
      ref={ref}
      {...rest}
    >
      {children}
    </NextLink>
  );
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} text-primary-900`}>
        <AppProvider linkComponent={Link} i18n={enTranslations}>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
