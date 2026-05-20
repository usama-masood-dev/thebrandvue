import { siteSocialLinks } from "@/lib/content/site-contact";

export const footerContent = {
  cta: {
    label: "Get in Touch",
    href: "/contact",
  },
  tagline: "Join us on an epic journey of innovation",
  copyright: "Copyright © 2026. Brand Vue. All Rights Reserved.",
  linkGroups: [
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Our Process", href: "/about#process" },
        { label: "Team", href: "/team" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Work",
      links: [
        { label: "Home", href: "/" },
        { label: "Services", href: "/services" },
        { label: "Portfolio", href: "/portfolio" },
        { label: "Clients", href: "/clients" },
      ],
    },
  ],
  legalLinks: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
  socialLinks: siteSocialLinks,
} as const;
