import { getServiceBySlug, getServices } from "./api";
import {
  mapServiceToDetail,
  type ServiceDetailViewModel,
} from "./mappers/services";

export async function getServiceDetail(
  slug: string,
): Promise<ServiceDetailViewModel | null> {
  try {
    const service = await getServiceBySlug(slug);
    if (!service) return null;
    return mapServiceToDetail(service);
  } catch (error) {
    console.error("[getServiceDetail]", error);
    return null;
  }
}

export async function getAllServiceSlugs(): Promise<string[]> {
  try {
    const data = await getServices({ servicesFirst: 48 });
    const seen = new Set<string>();

    for (const node of data.services.nodes) {
      const slug = node.slug?.trim();
      if (slug) seen.add(slug);
    }

    return [...seen];
  } catch (error) {
    console.error("[getAllServiceSlugs]", error);
    return [];
  }
}
