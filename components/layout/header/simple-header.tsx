import { HeaderCta } from "./header-cta";
import { HeaderLogo } from "./header-logo";
import { HeaderMobileMenu, HeaderNavDesktop } from "./header-nav";
import { HeaderActions, HeaderCenter, HeaderShell } from "./header-shell";
import { useNavigation } from "@/components/layout/navigation/navigation-provider";

type SimpleHeaderProps = {
  className?: string;
  hidden?: boolean;
};

/** Transparent header over hero slider — overlay theme (white nav) */
export function SimpleHeader({ className, hidden }: SimpleHeaderProps) {
  const navItems = useNavigation();

  return (
    <header
      className={`absolute inset-x-0 top-0 z-40 transition-opacity duration-300 ${
        hidden ? "pointer-events-none opacity-0" : "opacity-100"
      } ${className ?? ""}`}
    >
      <HeaderShell className="py-3 sm:py-4 lg:py-5">
        <HeaderLogo variant="dark" />
        <HeaderCenter>
          <HeaderNavDesktop items={navItems} theme="overlay" />
        </HeaderCenter>
        <HeaderActions>
          <HeaderCta theme="overlay" />
          <HeaderMobileMenu items={navItems} theme="overlay" />
        </HeaderActions>
      </HeaderShell>
    </header>
  );
}
