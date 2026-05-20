import type { ServiceCardViewModel } from "@/lib/wordpress/mappers/services";

/** Used when WordPress is unreachable or returns no published services */
export const fallbackServices: ServiceCardViewModel[] = [
  {
    id: "fallback-web-development",
    title: "Web Development",
    slug: "web-development",
    description:
      "Fast, responsive, conversion-optimized websites built with cutting-edge technology.",
    href: "/services/web-development",
    iconUrl: null,
    iconAlt: "Web Development",
  },
  {
    id: "fallback-digital-marketing",
    title: "Digital Marketing",
    slug: "digital-marketing",
    description:
      "SEO, PPC, and social media campaigns that drive measurable ROI and sustainable growth.",
    href: "/services/digital-marketing",
    iconUrl: null,
    iconAlt: "Digital Marketing",
  },
];
