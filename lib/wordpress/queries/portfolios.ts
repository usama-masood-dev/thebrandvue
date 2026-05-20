import {
  PORTFOLIO_DETAILS_FIELDS,
  WP_IMAGE_FIELDS,
} from "./fragments";
import type { Portfolio } from "../types";

export const PORTFOLIO_NODE_FIELDS = /* GraphQL */ `
  id
  title
  slug
  content
  featuredImage {
    node {
      ${WP_IMAGE_FIELDS}
    }
  }
  portfolioDetails {
    ${PORTFOLIO_DETAILS_FIELDS}
  }
`;

export const PORTFOLIOS_QUERY = /* GraphQL */ `
  query Portfolios($portfoliosFirst: Int = 24) {
    portfolios(
      first: $portfoliosFirst
      where: { status: PUBLISH, orderby: { field: DATE, order: DESC } }
    ) {
      nodes {
        ${PORTFOLIO_NODE_FIELDS}
      }
    }
  }
`;

export const PORTFOLIO_BY_SLUG_QUERY = /* GraphQL */ `
  query PortfolioBySlug($slug: ID!) {
    portfolio(id: $slug, idType: SLUG) {
      ${PORTFOLIO_NODE_FIELDS}
    }
  }
`;

export type PortfoliosQueryVariables = {
  portfoliosFirst?: number;
};

export type PortfoliosData = {
  portfolios: { nodes: Portfolio[] };
};

export type PortfolioBySlugVariables = {
  slug: string;
};

export type PortfolioBySlugData = {
  portfolio: Portfolio | null;
};
