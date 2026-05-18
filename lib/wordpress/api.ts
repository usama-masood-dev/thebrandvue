import { fetchGraphQL } from "./client";
import { CACHE_TAGS } from "./cache-tags";
import { resolvePortfolioGalleries } from "./mappers";
import {
  HOME_PAGE_QUERY,
  type HomePageQueryVariables,
} from "./queries/home";
import type { HomePageData, PortfolioWithResolvedGallery } from "./types";

export type HomePageContent = HomePageData & {
  portfoliosWithGalleries: PortfolioWithResolvedGallery[];
};

export async function getHomePageContent(
  variables: HomePageQueryVariables = {},
): Promise<HomePageContent> {
  const data = await fetchGraphQL<HomePageData>(HOME_PAGE_QUERY, {
    variables,
    tags: [
      CACHE_TAGS.wordpress,
      CACHE_TAGS.portfolios,
      CACHE_TAGS.testimonials,
      CACHE_TAGS.teams,
      CACHE_TAGS.services,
    ],
  });

  const portfoliosWithGalleries = await resolvePortfolioGalleries(
    data.portfolios.nodes,
  );

  return {
    ...data,
    portfoliosWithGalleries,
  };
}
