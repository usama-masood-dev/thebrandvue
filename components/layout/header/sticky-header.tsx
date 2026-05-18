import { HeaderCta } from "./header-cta";
import { HeaderLogo } from "./header-logo";
import { HeaderMobileMenu, HeaderNavDesktop } from "./header-nav";
import { HeaderActions, HeaderCenter, HeaderShell } from "./header-shell";
import { mainNavItems } from "@/lib/navigation/main-nav";

type StickyHeaderProps = {
  visible?: boolean;
  className?: string;
};

/** Solid sticky header — appears on scroll */
export function StickyHeader({ visible = false, className }: StickyHeaderProps) {
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-surface-gray/20 bg-white/95 shadow-sm backdrop-blur-md transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      } ${className ?? ""}`}
    >
      <HeaderShell className="relative py-3 lg:py-3.5">
        <HeaderLogo />
        <HeaderCenter>
          <HeaderNavDesktop items={mainNavItems} />
        </HeaderCenter>
        <HeaderActions>
          <HeaderCta />
          <HeaderMobileMenu items={mainNavItems} />
        </HeaderActions>
      </HeaderShell>
    </header>
  );
}
