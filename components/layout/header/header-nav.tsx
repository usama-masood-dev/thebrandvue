"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { NavItem } from "@/lib/navigation/main-nav";

export type HeaderTheme = "default" | "overlay";

function navLinkClass(isActive: boolean, theme: HeaderTheme) {
  if (theme === "overlay") {
    return isActive
      ? "bg-white text-accent"
      : "text-white/90 hover:text-white";
  }
  return isActive
    ? "bg-accent text-white"
    : "text-surface-gray hover:text-accent";
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
  const isOverlay = theme === "overlay";

  return (
    <div className="relative lg:hidden">
      <button
        type="button"
        className={`inline-flex items-center justify-center rounded-lg p-2 ${
          isOverlay ? "text-white" : "text-accent"
        }`}
        aria-expanded={mobileOpen}
        aria-controls="mobile-nav"
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
        onClick={() => setMobileOpen((v) => !v)}
      >
        <MenuIcon open={mobileOpen} />
      </button>

      {mobileOpen ? (
        <div
          id="mobile-nav"
          className={`absolute inset-x-0 top-full border-t px-4 py-4 shadow-lg ${
            isOverlay
              ? "border-white/10 bg-surface-dark"
              : "border-surface-gray/25 bg-white"
          }`}
        >
          <ul className="flex flex-col gap-1">
            {items.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`block rounded-lg px-3 py-2.5 text-sm font-semibold uppercase tracking-wide ${
                    isOverlay
                      ? "text-white hover:bg-white/10"
                      : "text-surface-gray hover:bg-accent-soft hover:text-accent"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
                {item.children?.map((child) => (
                  <Link
                    key={child.label}
                    href={child.href}
                    className={`block rounded-lg py-2 pl-6 pr-3 text-sm ${
                      isOverlay
                        ? "text-white/80 hover:text-white"
                        : "text-surface-gray hover:text-accent"
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {child.label}
                  </Link>
                ))}
              </li>
            ))}
          </ul>
        </div>
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

  return (
    <div
      className="relative"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      <Link
        href={item.href}
        className={`inline-flex items-center gap-1 rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-colors xl:px-3.5 xl:text-[13px] ${
          isOverlay
            ? "text-white/90 hover:text-white"
            : "text-surface-gray hover:text-accent"
        }`}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {item.label}
        <ChevronDown
          className={isOverlay ? "text-white/70" : "text-surface-gray"}
        />
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
                className={`block px-4 py-2.5 text-sm transition-colors ${
                  isOverlay
                    ? "text-white/90 hover:bg-white/10 hover:text-white"
                    : "text-surface-gray hover:bg-accent-soft hover:text-accent"
                }`}
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
      className={`size-3.5 ${className ?? ""}`}
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
