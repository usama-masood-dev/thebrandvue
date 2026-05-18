/** Default ISR revalidate interval (seconds) for WordPress fetches. */
export const WORDPRESS_REVALIDATE_SECONDS = Number.parseInt(
  process.env.WORDPRESS_REVALIDATE_SECONDS ?? "3600",
  10,
);
