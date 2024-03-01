"use client";
import { AppProvider, Frame, Navigation } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";
import { Inter } from "next/font/google";
import "@shopify/polaris/build/esm/styles.css";
import { LinkLikeComponent } from "@shopify/polaris/build/ts/src/utilities/link";
import { useRef } from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} text-primary-900`}>
        <AppProvider linkComponent={Link} i18n={enTranslations}>
          <Frame
            navigation={
              <Navigation location="/admin">
                <Navigation.Section
                  items={[
                    {
                      url: "/admin/providers",
                      label: "Providers",
                      selected: pathname.startsWith("/admin/providers"),
                    },
                    {
                      url: "/admin/leads",
                      label: "Leads",
                      selected: pathname.startsWith("/admin/leads"),
                    },
                  ]}
                />
              </Navigation>
            }
          >
            {children}
          </Frame>
        </AppProvider>
      </body>
    </html>
  );
}
