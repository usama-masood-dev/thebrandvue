import { Plus_Jakarta_Sans, Sora } from "next/font/google";

/** Body, navigation, UI */
export const fontSans = Plus_Jakarta_Sans({
  variable: "--font-brand-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/** Headlines & display text */
export const fontDisplay = Sora({
  variable: "--font-brand-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const fontClassNames = `${fontSans.variable} ${fontDisplay.variable}`;
