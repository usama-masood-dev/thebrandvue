import { fallbackServices } from "@/lib/content/fallback-services";
import { getServicesForSection } from "@/lib/wordpress/get-services-for-section";
import { buildMainNavItems } from "./build-nav";
import type { NavItem } from "./nav-types";

export async function getNavItems(): Promise<NavItem[]> {
  try {
    const services = await getServicesForSection();
    const list = services.length > 0 ? services : fallbackServices;
    return buildMainNavItems(list);
  } catch (error) {
    console.error("[getNavItems]", error);
    return buildMainNavItems(fallbackServices);
  }
}
