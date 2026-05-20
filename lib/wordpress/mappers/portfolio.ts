import type { Portfolio, PortfolioWithResolvedGallery } from "../types";

export type PortfolioCardViewModel = {
  id: string;
  title: string;
  slug: string;
  clientName: string | null;
  excerpt: string;
  imageUrl: string | null;
  imageAlt: string;
  href: string;
  isFeatured: boolean;
  completedYear: string | null;
};

export type PortfolioCaseStudyViewModel = {
  id: string;
  title: string;
  slug: string;
  clientName: string | null;
  completedYear: string | null;
  isFeatured: boolean;
  excerpt: string;
  contentHtml: string;
  imageUrl: string | null;
  imageAlt: string;
  projectUrl: string | null;
  galleryImages: { sourceUrl: string; altText: string }[];
};

function stripHtml(value: string): string {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function parseCompletedYear(completionDate: string | null | undefined): string | null {
  if (!completionDate?.trim()) return null;
  const year = completionDate.trim().slice(0, 4);
  return /^\d{4}$/.test(year) ? year : completionDate.trim();
}

function resolvePortfolioImage(
  portfolio: Portfolio,
  gallery?: { sourceUrl: string; altText: string | null }[],
): { url: string | null; alt: string } {
  const title = portfolio.title?.trim() ?? "Project";
  const featured = portfolio.featuredImage?.node;
  if (featured?.sourceUrl) {
    return {
      url: featured.sourceUrl,
      alt: featured.altText?.trim() || title,
    };
  }

  const firstGallery = gallery?.[0];
  if (firstGallery?.sourceUrl) {
    return {
      url: firstGallery.sourceUrl,
      alt: firstGallery.altText?.trim() || title,
    };
  }

  return { url: null, alt: title };
}

function buildExcerpt(portfolio: Portfolio): string {
  const fromContent = stripHtml(portfolio.content?.trim() ?? "");
  if (fromContent) return fromContent.slice(0, 160);
  const client = portfolio.portfolioDetails?.clientName?.trim();
  if (client) return `A digital project delivered for ${client}.`;
  return "Explore how we partnered to deliver measurable results.";
}

export function sortPortfoliosFeaturedFirst<T extends { isFeatured: boolean }>(
  items: T[],
): T[] {
  return [...items].sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
}

function getResolvedGalleryForImage(
  portfolio: Portfolio | PortfolioWithResolvedGallery,
): { sourceUrl: string; altText: string | null }[] | undefined {
  const details = portfolio.portfolioDetails;
  if (!details || !("resolvedGalleryImages" in details)) return undefined;
  return details.resolvedGalleryImages;
}

export function mapPortfolioToCard(
  portfolio: Portfolio | PortfolioWithResolvedGallery,
): PortfolioCardViewModel | null {
  const title = portfolio.title?.trim();
  const slug = portfolio.slug?.trim();
  if (!title || !slug) return null;

  const details = portfolio.portfolioDetails;
  const isFeatured = details?.featuredProject === true;
  const { url, alt } = resolvePortfolioImage(
    portfolio,
    getResolvedGalleryForImage(portfolio),
  );

  return {
    id: portfolio.id,
    title,
    slug,
    clientName: details?.clientName?.trim() ?? null,
    excerpt: buildExcerpt(portfolio),
    imageUrl: url,
    imageAlt: alt,
    href: `/portfolio/${slug}`,
    isFeatured,
    completedYear: parseCompletedYear(details?.completionDate),
  };
}

export function mapPortfoliosToCards(
  portfolios: (Portfolio | PortfolioWithResolvedGallery)[],
): PortfolioCardViewModel[] {
  const cards = portfolios
    .map(mapPortfolioToCard)
    .filter((card): card is PortfolioCardViewModel => card !== null);

  return sortPortfoliosFeaturedFirst(cards);
}

export function mapPortfolioToCaseStudy(
  portfolio: PortfolioWithResolvedGallery,
): PortfolioCaseStudyViewModel | null {
  const title = portfolio.title?.trim();
  const slug = portfolio.slug?.trim();
  if (!title || !slug) return null;

  const details = portfolio.portfolioDetails;
  const gallery =
    details?.resolvedGalleryImages.map((image) => ({
      sourceUrl: image.sourceUrl,
      altText: image.altText?.trim() || title,
    })) ?? [];

  const { url, alt } = resolvePortfolioImage(portfolio, gallery);

  return {
    id: portfolio.id,
    title,
    slug,
    clientName: details?.clientName?.trim() ?? null,
    completedYear: parseCompletedYear(details?.completionDate),
    isFeatured: details?.featuredProject === true,
    excerpt: buildExcerpt(portfolio),
    contentHtml: portfolio.content?.trim() ?? "",
    imageUrl: url,
    imageAlt: alt,
    projectUrl: details?.projectUrl?.trim() ?? null,
    galleryImages: gallery,
  };
}
