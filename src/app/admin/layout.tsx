"use client";
import { AppProvider, Frame, Navigation, TopBar } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";
import { Inter } from "next/font/google";
import "@shopify/polaris/build/esm/styles.css";
import { LinkLikeComponent } from "@shopify/polaris/build/ts/src/utilities/link";
import { useRef, useState } from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { api } from "~/trpc/react";

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
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const session = useSession();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  if (!session.data) return <NextLink href="/api/auth/signin">Log in</NextLink>;

  const sideNavMarkup = (
    <Navigation location="/admin" onDismiss={() => setIsSideNavOpen(false)}>
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
  );
  return (
    <body className={`font-sans ${inter.variable} text-primary-900`}>
      <AppProvider linkComponent={Link} i18n={enTranslations}>
        <Frame
          topBar={
            <TopBar
              showNavigationToggle
              onNavigationToggle={() => {
                setIsSideNavOpen((prev) => !prev);
              }}
              userMenu={
                <TopBar.UserMenu
                  actions={[
                    {
                      items: [
                        { content: "Log out", onAction: () => signOut() },
                      ],
                    },
                  ]}
                  name="Admin"
                  initials="A"
                  open={userMenuOpen}
                  onToggle={() => setUserMenuOpen((open) => !open)}
                />
              }
            />
          }
          showMobileNavigation={isSideNavOpen}
          navigation={sideNavMarkup}
        >
          {children}
        </Frame>
      </AppProvider>
    </body>
  );
}
