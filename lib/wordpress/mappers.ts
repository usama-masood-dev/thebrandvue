import { fetchGraphQL } from "./client";
import { CACHE_TAGS } from "./cache-tags";
import { MEDIA_ITEMS_BY_IDS_QUERY } from "./queries/media";
import type {
  GalleryImageRef,
  MediaItem,
  MediaItemsByIdsData,
  Portfolio,
  PortfolioWithResolvedGallery,
  ResolvedGalleryImage,
} from "./types";

export function collectGalleryImageIds(portfolios: Portfolio[]): number[] {
  const ids = new Set<number>();

  for (const portfolio of portfolios) {
    for (const image of portfolio.portfolioDetails?.galleryImages ?? []) {
      const id = Number.parseInt(image.id, 10);
      if (!Number.isNaN(id)) ids.add(id);
    }
  }

  return [...ids];
}

export async function fetchMediaItemsByIds(
  ids: number[],
): Promise<Map<number, MediaItem>> {
  if (ids.length === 0) return new Map();

  const data = await fetchGraphQL<MediaItemsByIdsData>(
    MEDIA_ITEMS_BY_IDS_QUERY,
    {
      variables: { ids: ids.map(String), first: ids.length },
      tags: [CACHE_TAGS.media],
    },
  );

  return new Map(
    data.mediaItems.nodes.map((item) => [item.databaseId, item]),
  );
}

export function resolveGalleryImages(
  galleryImages: GalleryImageRef[] | null | undefined,
  mediaById: Map<number, MediaItem>,
): ResolvedGalleryImage[] {
  if (!galleryImages?.length) return [];

  const resolved: ResolvedGalleryImage[] = [];

  for (const ref of galleryImages) {
    const databaseId = Number.parseInt(ref.id, 10);
    if (Number.isNaN(databaseId)) continue;

    const media = mediaById.get(databaseId);
    if (!media?.sourceUrl) continue;

    resolved.push({
      databaseId,
      sourceUrl: media.sourceUrl,
      altText: media.altText,
    });
  }

  return resolved;
}

export async function resolvePortfolioGalleries(
  portfolios: Portfolio[],
): Promise<PortfolioWithResolvedGallery[]> {
  const mediaById = await fetchMediaItemsByIds(
    collectGalleryImageIds(portfolios),
  );

  return portfolios.map((portfolio) => {
    const details = portfolio.portfolioDetails;
    if (!details) {
      return { ...portfolio, portfolioDetails: null };
    }

    return {
      ...portfolio,
      portfolioDetails: {
        ...details,
        resolvedGalleryImages: resolveGalleryImages(
          details.galleryImages,
          mediaById,
        ),
      },
    };
  });
}

export function filterFeaturedPortfolios(portfolios: Portfolio[]): Portfolio[] {
  return portfolios.filter(
    (p) => p.portfolioDetails?.featuredProject === true,
  );
}
