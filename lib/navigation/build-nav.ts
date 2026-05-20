import type { ServiceCardViewModel } from "@/lib/wordpress/mappers/services";
import { SERVICES_NAV_PREVIEW_MAX } from "./nav-config";
import type { NavChildItem, NavItem } from "./nav-types";

const VIEW_ALL_SERVICES: NavChildItem = {
  label: "All services",
  href: "/services",
  viewAll: true,
};

function buildServiceNavChildren(
  services: ServiceCardViewModel[],
): NavChildItem[] {
  const preview = services.slice(0, SERVICES_NAV_PREVIEW_MAX).map((service) => ({
    label: service.title,
    href: service.href,
  }));

  if (preview.length === 0) return [];

  return [...preview, VIEW_ALL_SERVICES];
}

export function buildMainNavItems(services: ServiceCardViewModel[]): NavItem[] {
  const serviceChildren = buildServiceNavChildren(services);
  const hasDropdown = serviceChildren.length > 1;

  return [
    { label: "Home", href: "/" },
    {
      label: "Services",
      href: "/services",
      children: hasDropdown ? serviceChildren : undefined,
    },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Clients", href: "/clients" },
    { label: "Team", href: "/team" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];
}
