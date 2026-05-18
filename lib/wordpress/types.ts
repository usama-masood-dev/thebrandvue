export type WpImage = {
  sourceUrl: string;
  altText: string | null;
};

export type WpImageField = {
  node: WpImage | null;
} | null;

export type GalleryImageRef = {
  id: string;
};

export type PortfolioDetails = {
  clientName: string | null;
  projectUrl: string | null;
  completionDate: string | null;
  featuredProject: boolean | null;
  galleryImages: GalleryImageRef[] | null;
};

export type Portfolio = {
  id: string;
  title: string | null;
  slug: string | null;
  content: string | null;
  featuredImage: WpImageField;
  portfolioDetails: PortfolioDetails | null;
};

export type TestimonialDetails = {
  clientName: string | null;
  companyName: string | null;
  rating: number | null;
  clientPhoto: WpImageField;
};

export type Testimonial = {
  id: string;
  title: string | null;
  slug: string | null;
  content: string | null;
  testimonialDetails: TestimonialDetails | null;
};

/** Repeater — enable in ACF/WPGraphQL when ready */
export type TeamSocialLink = {
  platform: string | null;
  url: string | null;
};

export type TeamDetails = {
  position: string | null;
  bio: string | null;
  photo: WpImageField;
  socialLinks?: TeamSocialLink[] | null;
};

export type TeamMember = {
  id: string;
  title: string | null;
  slug: string | null;
  teamDetails: TeamDetails | null;
};

export type ServiceDetails = {
  description: string | null;
  linkUrl: string | null;
  icon: WpImageField;
};

export type Service = {
  id: string;
  title: string | null;
  slug: string | null;
  serviceDetails: ServiceDetails | null;
};

export type MediaItem = {
  databaseId: number;
  sourceUrl: string;
  altText: string | null;
};

export type ResolvedGalleryImage = WpImage & {
  databaseId: number;
};

export type PortfolioWithResolvedGallery = Portfolio & {
  portfolioDetails: (PortfolioDetails & {
    resolvedGalleryImages: ResolvedGalleryImage[];
  }) | null;
};

export type HomePageData = {
  portfolios: { nodes: Portfolio[] };
  testimonials: { nodes: Testimonial[] };
  teams: { nodes: TeamMember[] };
  services: { nodes: Service[] };
};

export type MediaItemsByIdsData = {
  mediaItems: { nodes: MediaItem[] };
};
