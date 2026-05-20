import type { Service } from "../types";

export type ServiceCardViewModel = {
  id: string;
  title: string;
  slug: string;
  description: string;
  href: string;
  iconUrl: string | null;
  iconAlt: string;
};

export type ServiceDetailViewModel = ServiceCardViewModel & {
  contentHtml: string;
  isExternalLink: boolean;
};

function stripHtml(value: string): string {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function resolveServiceHref(
  linkUrl: string | null | undefined,
  slug: string | null | undefined,
): string {
  const trimmed = linkUrl?.trim();
  if (trimmed) {
    if (/^https?:\/\//i.test(trimmed)) return trimmed;
    if (trimmed.startsWith("/")) return trimmed;
    return `/${trimmed.replace(/^\/+/, "")}`;
  }
  if (slug?.trim()) return `/services/${slug.trim()}`;
  return "/services";
}

function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

function buildDescription(service: Service): string {
  const raw = service.serviceDetails?.description?.trim() ?? "";
  const fromDetails = raw ? stripHtml(raw) : "";
  if (fromDetails) return fromDetails;

  const fromContent = stripHtml(service.content?.trim() ?? "");
  if (fromContent) return fromContent.slice(0, 320);

  return "Explore how we help brands grow with strategy, design, and technology.";
}

export function mapServiceToCard(service: Service): ServiceCardViewModel | null {
  const title = service.title?.trim();
  const slug = service.slug?.trim();
  if (!title || !slug) return null;

  const icon = service.serviceDetails?.icon?.node;
  const href = resolveServiceHref(service.serviceDetails?.linkUrl, slug);

  return {
    id: service.id,
    title,
    slug,
    description: buildDescription(service),
    href,
    iconUrl: icon?.sourceUrl ?? null,
    iconAlt: icon?.altText?.trim() || title,
  };
}

export function mapServiceToDetail(service: Service): ServiceDetailViewModel | null {
  const card = mapServiceToCard(service);
  if (!card) return null;

  const postContent = service.content?.trim() ?? "";
  const detailsHtml = service.serviceDetails?.description?.trim() ?? "";
  /** Prefer post body; ACF description is used for cards only when post is empty */
  const contentHtml = postContent || detailsHtml;

  return {
    ...card,
    contentHtml,
    isExternalLink: isExternalHref(card.href),
  };
}

export function mapServicesToCards(services: Service[]): ServiceCardViewModel[] {
  const seen = new Set<string>();

  return services
    .map(mapServiceToCard)
    .filter((card): card is ServiceCardViewModel => {
      if (!card) return false;
      if (seen.has(card.slug)) return false;
      seen.add(card.slug);
      return true;
    });
}
