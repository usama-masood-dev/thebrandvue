import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/footer";
import { NavigationProvider } from "@/components/layout/navigation/navigation-provider";
import { WhatsAppChatWidget } from "@/components/layout/whatsapp-chat-widget";
import { getNavItems } from "@/lib/navigation/get-nav-items";
import { brandFavicon, BRAND_NAME, BRAND_DESCRIPTION } from "@/lib/brand";
import { fontClassNames } from "@/lib/brand/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: BRAND_NAME,
    template: `%s | ${BRAND_NAME}`,
  },
  description: BRAND_DESCRIPTION,
  icons: {
    icon: [{ url: brandFavicon.src, type: "image/png" }],
    shortcut: [{ url: brandFavicon.src, type: "image/png" }],
    apple: [{ url: brandFavicon.src, type: "image/png" }],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navItems = await getNavItems();

  return (
    <html lang="en" id="top" className={`${fontClassNames} h-full antialiased scroll-smooth`}>
      <body className="flex min-h-full flex-col font-sans">
        <NavigationProvider items={navItems}>
          <div className="flex-1">{children}</div>
          <SiteFooter />
          <WhatsAppChatWidget />
        </NavigationProvider>
      </body>
    </html>
  );
}
