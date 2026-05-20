export type NavChildItem = {
  label: string;
  href: string;
  /** Styled as the footer row (e.g. "All services") */
  viewAll?: boolean;
};

export type NavItem = {
  label: string;
  href: string;
  children?: NavChildItem[];
};
