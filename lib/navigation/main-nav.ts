export type { NavChildItem, NavItem } from "./nav-types";
export { buildMainNavItems } from "./build-nav";

import { buildMainNavItems } from "./build-nav";
import type { NavItem } from "./nav-types";

/** Fallback when CMS services are unavailable */
export const mainNavItems: NavItem[] = buildMainNavItems([]);

export const headerCta = {
  label: "Schedule a Call",
  href: "/#contact",
} as const;
