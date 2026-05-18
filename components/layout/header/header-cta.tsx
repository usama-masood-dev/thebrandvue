import Link from "next/link";
import { headerCta } from "@/lib/navigation/main-nav";
import type { HeaderTheme } from "./header-nav";

type HeaderCtaProps = {
  theme?: HeaderTheme;
  className?: string;
  /** Show in mobile drawer (full width) */
  mobile?: boolean;
};

export function HeaderCta({
  theme = "default",
  className,
  mobile = false,
}: HeaderCtaProps) {
  const isOverlay = theme === "overlay";

  return (
    <Link
      href={headerCta.href}
      className={`shrink-0 rounded-md px-4 py-2.5 text-center text-xs font-bold uppercase tracking-wider transition-colors sm:text-sm lg:px-5 lg:py-3 lg:text-[13px] ${
        mobile
          ? "inline-flex w-full justify-center py-3.5"
          : "hidden lg:inline-flex"
      } ${
        isOverlay
          ? "bg-white text-accent hover:bg-white/90"
          : "bg-accent text-white hover:bg-accent-hover"
      } ${className ?? ""}`}
    >
      {headerCta.label}
    </Link>
  );
}
