"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { HeaderCta } from "./header-cta";
import type { NavItem } from "@/lib/navigation/main-nav";

export type HeaderTheme = "default" | "overlay";

/** Light header → dark text. Dark/hero header → light text. */
function getNavTheme(theme: HeaderTheme) {
  if (theme === "overlay") {
    return {
      link: "text-white/90 hover:text-white",
      linkActive: "bg-white text-accent",
      dropdown: "text-white/90 hover:text-white",
      dropdownChild:
        "text-white/90 hover:bg-white/10 hover:text-white",
      chevron: "text-white/70",
      menuLabel: "text-white/80",
      menuClose: "text-white hover:bg-white/10",
      hamburger: "text-white",
      mobileLink: "text-white hover:bg-white/10",
      mobileChild: "text-white/85 hover:bg-white/10 hover:text-white",
    };
  }
  return {
    link: "text-surface-dark hover:text-accent",
    linkActive: "bg-accent text-white",
    dropdown: "text-surface-dark hover:text-accent",
    dropdownChild:
      "text-surface-dark/85 hover:bg-accent-soft hover:text-accent",
    chevron: "text-surface-dark/55",
    menuLabel: "text-surface-dark/70",
    menuClose: "text-surface-dark hover:bg-accent-soft",
    hamburger: "text-surface-dark",
    mobileLink: "text-surface-dark hover:bg-accent-soft hover:text-accent",
    mobileChild:
      "text-surface-dark/80 hover:bg-accent-soft hover:text-accent",
  };
}

function navLinkClass(isActive: boolean, theme: HeaderTheme) {
  const styles = getNavTheme(theme);
  return isActive ? styles.linkActive : styles.link;
}

type HeaderNavDesktopProps = {
  items: NavItem[];
  theme?: HeaderTheme;
  className?: string;
};

export function HeaderNavDesktop({
  items,
  theme = "default",
  className,
}: HeaderNavDesktopProps) {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href;

  return (
    <nav
      className={`hidden items-center gap-1 lg:flex xl:gap-2 ${className ?? ""}`}
      aria-label="Main navigation"
    >
      {items.map((item) =>
        item.children?.length ? (
          <NavDropdown
            key={item.label}
            item={item}
            theme={theme}
            open={openDropdown === item.label}
            onOpen={() => setOpenDropdown(item.label)}
            onClose={() => setOpenDropdown(null)}
          />
        ) : (
          <Link
            key={item.label}
            href={item.href}
            className={`rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-colors xl:px-3.5 xl:text-[13px] ${navLinkClass(isActive(item.href), theme)}`}
          >
            {item.label}
          </Link>
        ),
      )}
    </nav>
  );
}

type HeaderMobileMenuProps = {
  items: NavItem[];
  theme?: HeaderTheme;
};

export function HeaderMobileMenu({
  items,
  theme = "default",
}: HeaderMobileMenuProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const pathname = usePathname();
  const isOverlay = theme === "overlay";

  const closeMenu = useCallback(() => {
    setMobileOpen(false);
    setExpandedItem(null);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeMenu]);

  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  const panelBg = isOverlay ? "bg-surface-dark" : "bg-white";
  const borderClass = isOverlay ? "border-white/10" : "border-surface-gray/20";
  const nav = getNavTheme(theme);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className={`inline-flex size-10 items-center justify-center rounded-lg ${nav.hamburger}`}
        aria-expanded={mobileOpen}
        aria-controls="mobile-nav-panel"
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
        onClick={() => setMobileOpen((open) => !open)}
      >
        <MenuIcon open={mobileOpen} />
      </button>

      {mobileOpen ? (
        <>
          <button
            type="button"
            aria-label="Close menu backdrop"
            className="fixed inset-0 z-[60] bg-black/55 backdrop-blur-[2px] lg:hidden"
            onClick={closeMenu}
          />
          <nav
            id="mobile-nav-panel"
            className={`fixed inset-x-0 top-0 z-[70] flex max-h-[100dvh] flex-col shadow-xl lg:hidden ${panelBg}`}
            aria-label="Mobile navigation"
          >
            <div
              className={`flex shrink-0 items-center justify-between border-b px-4 py-3 sm:px-6 ${borderClass}`}
            >
              <span
                className={`text-sm font-semibold uppercase tracking-wider ${nav.menuLabel}`}
              >
                Menu
              </span>
              <button
                type="button"
                onClick={closeMenu}
                aria-label="Close menu"
                className={`inline-flex size-10 items-center justify-center rounded-lg ${nav.menuClose}`}
              >
                <MenuIcon open />
              </button>
            </div>

            <ul className="flex-1 overflow-y-auto overscroll-contain px-4 py-3 sm:px-6">
              {items.map((item) => {
                const hasChildren = Boolean(item.children?.length);
                const isExpanded = expandedItem === item.label;

                return (
                  <li
                    key={item.label}
                    className={`border-b last:border-0 ${borderClass}`}
                  >
                    {hasChildren ? (
                      <>
                        <button
                          type="button"
                          className={`flex w-full items-center justify-between rounded-lg px-3 py-3.5 text-left text-sm font-semibold uppercase tracking-wide ${nav.mobileLink}`}
                          aria-expanded={isExpanded}
                          onClick={() =>
                            setExpandedItem(isExpanded ? null : item.label)
                          }
                        >
                          {item.label}
                          <ChevronDown
                            className={`size-4 transition-transform ${
                              isExpanded ? "rotate-180" : ""
                            } ${nav.chevron}`}
                          />
                        </button>
                        {isExpanded ? (
                          <ul className="pb-2 pl-2">
                            {item.children!.map((child) => (
                              <li key={child.label}>
                                <Link
                                  href={child.href}
                                  className={`block rounded-lg px-3 py-2.5 text-sm ${nav.mobileChild}`}
                                  onClick={closeMenu}
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className={`block rounded-lg px-3 py-3.5 text-sm font-semibold uppercase tracking-wide ${nav.mobileLink}`}
                        onClick={closeMenu}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>

            <div
              className={`shrink-0 border-t px-4 py-4 sm:px-6 ${borderClass}`}
            >
              <HeaderCta theme={theme} mobile />
            </div>
          </nav>
        </>
      ) : null}
    </div>
  );
}

function NavDropdown({
  item,
  theme,
  open,
  onOpen,
  onClose,
}: {
  item: NavItem;
  theme: HeaderTheme;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const isOverlay = theme === "overlay";
  const nav = getNavTheme(theme);

  return (
    <div
      className="relative"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      <Link
        href={item.href}
        className={`inline-flex items-center gap-1 rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-colors xl:px-3.5 xl:text-[13px] ${nav.dropdown}`}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {item.label}
        <ChevronDown className={nav.chevron} />
      </Link>
      {open ? (
        <ul
          className={`absolute left-0 top-full z-50 mt-1 min-w-[220px] rounded-xl border py-2 shadow-lg ${
            isOverlay
              ? "border-white/10 bg-surface-dark"
              : "border-surface-gray/25 bg-white"
          }`}
          role="menu"
        >
          {item.children!.map((child) => (
            <li key={child.label} role="none">
              <Link
                href={child.href}
                role="menuitem"
                className={`block px-4 py-2.5 text-sm transition-colors ${nav.dropdownChild}`}
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      className={`size-3.5 shrink-0 ${className ?? ""}`}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      className="size-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden
    >
      {open ? (
        <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
      ) : (
        <>
          <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
        </>
      )}
    </svg>
  );
}
