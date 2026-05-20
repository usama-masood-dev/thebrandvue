"use client";

import { HeaderCta } from "./header-cta";
import { HeaderLogo } from "./header-logo";
import { HeaderMobileMenu, HeaderNavDesktop } from "./header-nav";
import { HeaderActions, HeaderCenter, HeaderShell } from "./header-shell";
import { useNavigation } from "@/components/layout/navigation/navigation-provider";

type StickyHeaderProps = {
  visible?: boolean;
  className?: string;
};

/** Solid sticky header — appears on scroll */
export function StickyHeader({ visible = false, className }: StickyHeaderProps) {
  const navItems = useNavigation();

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 overflow-visible border-b border-surface-gray/25 bg-surface-white/98 text-surface-dark shadow-sm backdrop-blur-md transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      } ${className ?? ""}`}
    >
      <HeaderShell className="py-2.5 sm:py-3 lg:py-3.5">
        <HeaderLogo />
        <HeaderCenter>
          <HeaderNavDesktop items={navItems} />
        </HeaderCenter>
        <HeaderActions>
          <HeaderCta />
          <HeaderMobileMenu items={navItems} />
        </HeaderActions>
      </HeaderShell>
    </header>
  );
}
