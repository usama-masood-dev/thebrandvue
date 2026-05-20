import { getPortfolioBySlug, getPortfolios } from "./api";
import { resolvePortfolioGalleries } from "./mappers";
import {
  mapPortfolioToCaseStudy,
  type PortfolioCaseStudyViewModel,
} from "./mappers/portfolio";

export async function getPortfolioCaseStudy(
  slug: string,
): Promise<PortfolioCaseStudyViewModel | null> {
  try {
    const portfolio = await getPortfolioBySlug(slug);
    if (!portfolio) return null;

    const [withGallery] = await resolvePortfolioGalleries([portfolio]);
    return mapPortfolioToCaseStudy(withGallery);
  } catch (error) {
    console.error("[getPortfolioCaseStudy]", error);
    return null;
  }
}

export async function getAllPortfolioSlugs(): Promise<string[]> {
  try {
    const data = await getPortfolios({ portfoliosFirst: 24 });
    return data.portfolios.nodes
      .map((node) => node.slug?.trim())
      .filter((value): value is string => Boolean(value));
  } catch (error) {
    console.error("[getAllPortfolioSlugs]", error);
    return [];
  }
}
