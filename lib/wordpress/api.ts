import { fetchGraphQL } from "./client";
import { CACHE_TAGS } from "./cache-tags";
import { resolvePortfolioGalleries } from "./mappers";
import {
  HOME_PAGE_QUERY,
  type HomePageQueryVariables,
} from "./queries/home";
import {
  PORTFOLIO_BY_SLUG_QUERY,
  PORTFOLIOS_QUERY,
  type PortfolioBySlugData,
  type PortfolioBySlugVariables,
  type PortfoliosData,
  type PortfoliosQueryVariables,
} from "./queries/portfolios";
import {
  SERVICE_BY_SLUG_QUERY,
  SERVICES_QUERY,
  type ServiceBySlugData,
  type ServiceBySlugVariables,
  type ServicesData,
  type ServicesQueryVariables,
} from "./queries/services";
import type { Service } from "./types";
import {
  TESTIMONIALS_QUERY,
  type TestimonialsData,
  type TestimonialsQueryVariables,
} from "./queries/testimonials";
import {
  TEAMS_QUERY,
  type TeamsData,
  type TeamsQueryVariables,
} from "./queries/teams";
import type {
  HomePageData,
  Portfolio,
  PortfolioWithResolvedGallery,
} from "./types";

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

export async function getPortfolios(
  variables: PortfoliosQueryVariables = {},
): Promise<PortfoliosData> {
  return fetchGraphQL<PortfoliosData>(PORTFOLIOS_QUERY, {
    variables,
    tags: [CACHE_TAGS.wordpress, CACHE_TAGS.portfolios],
  });
}

export async function getPortfolioBySlug(slug: string): Promise<Portfolio | null> {
  const data = await fetchGraphQL<PortfolioBySlugData>(PORTFOLIO_BY_SLUG_QUERY, {
    variables: { slug } satisfies PortfolioBySlugVariables,
    tags: [CACHE_TAGS.wordpress, CACHE_TAGS.portfolios],
  });

  return data.portfolio;
}

export async function getServices(
  variables: ServicesQueryVariables = {},
): Promise<ServicesData> {
  return fetchGraphQL<ServicesData>(SERVICES_QUERY, {
    variables,
    tags: [CACHE_TAGS.wordpress, CACHE_TAGS.services],
  });
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const data = await fetchGraphQL<ServiceBySlugData>(SERVICE_BY_SLUG_QUERY, {
    variables: { slug } satisfies ServiceBySlugVariables,
    tags: [CACHE_TAGS.wordpress, CACHE_TAGS.services],
  });

  return data.service;
}

export async function getTestimonials(
  variables: TestimonialsQueryVariables = {},
): Promise<TestimonialsData> {
  return fetchGraphQL<TestimonialsData>(TESTIMONIALS_QUERY, {
    variables,
    tags: [CACHE_TAGS.wordpress, CACHE_TAGS.testimonials],
  });
}

export async function getTeams(
  variables: TeamsQueryVariables = {},
): Promise<TeamsData> {
  return fetchGraphQL<TeamsData>(TEAMS_QUERY, {
    variables,
    tags: [CACHE_TAGS.wordpress, CACHE_TAGS.teams],
  });
}
