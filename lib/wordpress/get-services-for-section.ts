import { fallbackServices } from "@/lib/content/fallback-services";
import { getServices } from "./api";
import {
  mapServicesToCards,
  type ServiceCardViewModel,
} from "./mappers/services";

export async function getServicesForSection(): Promise<ServiceCardViewModel[]> {
  try {
    const data = await getServices({ servicesFirst: 12 });
    const cards = mapServicesToCards(data.services.nodes);

    if (cards.length === 0) {
      console.warn(
        "[getServicesForSection] No published services returned from WordPress; using fallback.",
      );
      return fallbackServices;
    }

    return cards;
  } catch (error) {
    console.error("[getServicesForSection]", error);
    return fallbackServices;
  }
}
