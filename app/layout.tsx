import type { Metadata } from "next";
import { brandFavicon, BRAND_NAME, BRAND_TAGLINE } from "@/lib/brand";
import { fontClassNames } from "@/lib/brand/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: BRAND_NAME,
    template: `%s | ${BRAND_NAME}`,
  },
  description: BRAND_TAGLINE,
  icons: {
    icon: [{ url: brandFavicon.src, type: "image/png" }],
    shortcut: [{ url: brandFavicon.src, type: "image/png" }],
    apple: [{ url: brandFavicon.src, type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontClassNames} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
