import Link from "next/link";
import { headerCta } from "@/lib/navigation/main-nav";
import type { HeaderTheme } from "./header-nav";

type HeaderCtaProps = {
  theme?: HeaderTheme;
  className?: string;
};

export function HeaderCta({ theme = "default", className }: HeaderCtaProps) {
  const isOverlay = theme === "overlay";

  return (
    <Link
      href={headerCta.href}
      className={`hidden shrink-0 rounded-md px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors sm:inline-flex lg:px-5 lg:py-3 lg:text-[13px] ${
        isOverlay
          ? "bg-white text-accent hover:bg-white/90"
          : "bg-accent text-white hover:bg-accent-hover"
      } ${className ?? ""}`}
    >
      {headerCta.label}
    </Link>
  );
}
