export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

/** Primary navigation — refined labels from legacy Elemonter menu */
export const mainNavItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "#services",
    children: [
      { label: "Web Development", href: "#services" },
      { label: "Digital Marketing", href: "#services" },
      { label: "View All Services", href: "#services" },
    ],
  },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Clients", href: "#clients" },
  { label: "Team", href: "#team" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const headerCta = {
  label: "Schedule a Call",
  href: "#contact",
} as const;
