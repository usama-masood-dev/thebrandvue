import {
  PORTFOLIO_DETAILS_FIELDS,
  SERVICE_DETAILS_FIELDS,
  TEAM_DETAILS_FIELDS,
  TESTIMONIAL_DETAILS_FIELDS,
  WP_IMAGE_FIELDS,
} from "./fragments";

export const HOME_PAGE_QUERY = /* GraphQL */ `
  query HomePageContent($portfoliosFirst: Int = 20, $testimonialsFirst: Int = 20, $teamsFirst: Int = 20, $servicesFirst: Int = 20) {
    portfolios(first: $portfoliosFirst, where: { status: PUBLISH, orderby: { field: DATE, order: DESC } }) {
      nodes {
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
      }
    }
    testimonials(first: $testimonialsFirst, where: { status: PUBLISH, orderby: { field: DATE, order: DESC } }) {
      nodes {
        id
        title
        slug
        content
        testimonialDetails {
          ${TESTIMONIAL_DETAILS_FIELDS}
        }
      }
    }
    teams(first: $teamsFirst, where: { status: PUBLISH, orderby: { field: DATE, order: DESC } }) {
      nodes {
        id
        title
        slug
        teamDetails {
          ${TEAM_DETAILS_FIELDS}
        }
      }
    }
    services(first: $servicesFirst, where: { status: PUBLISH, orderby: { field: DATE, order: DESC } }) {
      nodes {
        id
        title
        slug
        serviceDetails {
          ${SERVICE_DETAILS_FIELDS}
        }
      }
    }
  }
`;

export type HomePageQueryVariables = {
  portfoliosFirst?: number;
  testimonialsFirst?: number;
  teamsFirst?: number;
  servicesFirst?: number;
};
