import { SERVICE_DETAILS_FIELDS } from "./fragments";
import type { Service } from "../types";

export const SERVICE_NODE_FIELDS = /* GraphQL */ `
  id
  title
  slug
  content
  serviceDetails {
    ${SERVICE_DETAILS_FIELDS}
  }
`;

export const SERVICES_QUERY = /* GraphQL */ `
  query Services($servicesFirst: Int = 24) {
    services(
      first: $servicesFirst
      where: { status: PUBLISH, orderby: { field: DATE, order: DESC } }
    ) {
      nodes {
        ${SERVICE_NODE_FIELDS}
      }
    }
  }
`;

export const SERVICE_BY_SLUG_QUERY = /* GraphQL */ `
  query ServiceBySlug($slug: ID!) {
    service(id: $slug, idType: SLUG) {
      ${SERVICE_NODE_FIELDS}
    }
  }
`;

export type ServicesQueryVariables = {
  servicesFirst?: number;
};

export type ServicesData = {
  services: { nodes: Service[] };
};

export type ServiceBySlugVariables = {
  slug: string;
};

export type ServiceBySlugData = {
  service: Service | null;
};
