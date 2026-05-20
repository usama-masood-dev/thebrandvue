import { TESTIMONIAL_DETAILS_FIELDS } from "./fragments";
import type { Testimonial } from "../types";

export const TESTIMONIALS_QUERY = /* GraphQL */ `
  query Testimonials($testimonialsFirst: Int = 12) {
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
  }
`;

export type TestimonialsQueryVariables = {
  testimonialsFirst?: number;
};

export type TestimonialsData = {
  testimonials: { nodes: Testimonial[] };
};
