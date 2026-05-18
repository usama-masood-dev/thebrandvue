export const CACHE_TAGS = {
  wordpress: "wordpress",
  portfolios: "portfolios",
  testimonials: "testimonials",
  teams: "teams",
  services: "services",
  media: "media",
} as const;

export type CacheTag = (typeof CACHE_TAGS)[keyof typeof CACHE_TAGS];
