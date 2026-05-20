import { getPortfolios } from "./api";
import { resolvePortfolioGalleries } from "./mappers";
import {
  mapPortfoliosToCards,
  type PortfolioCardViewModel,
} from "./mappers/portfolio";

export async function getPortfoliosForSection(): Promise<PortfolioCardViewModel[]> {
  try {
    const data = await getPortfolios({ portfoliosFirst: 24 });
    const portfoliosWithGalleries = await resolvePortfolioGalleries(
      data.portfolios.nodes,
    );
    return mapPortfoliosToCards(portfoliosWithGalleries);
  } catch (error) {
    console.error("[getPortfoliosForSection]", error);
    return [];
  }
}
