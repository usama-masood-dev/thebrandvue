export const WP_IMAGE_FIELDS = `
  sourceUrl
  altText
`;

export const PORTFOLIO_DETAILS_FIELDS = `
  clientName
  projectUrl
  completionDate
  featuredProject
  galleryImages {
    id
  }
`;

export const TESTIMONIAL_DETAILS_FIELDS = `
  clientName
  companyName
  rating
  clientPhoto {
    node {
      ${WP_IMAGE_FIELDS}
    }
  }
`;

export const TEAM_DETAILS_FIELDS = `
  position
  bio
  photo {
    node {
      ${WP_IMAGE_FIELDS}
    }
  }
`;

export const SERVICE_DETAILS_FIELDS = `
  description
  linkUrl
  icon {
    node {
      ${WP_IMAGE_FIELDS}
    }
  }
`;
