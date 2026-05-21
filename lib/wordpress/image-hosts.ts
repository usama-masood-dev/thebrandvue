/**
 * Hostnames allowed for next/image when loading WordPress media.
 * CMS often returns absolute URLs on the WP host (e.g. cms.thebrandvue.com)
 * even when the marketing site runs on another domain (e.g. thebrandvue.com).
 */
export function getWordPressImageHostnames(): string[] {
  const hosts = new Set<string>();

  const wpUrl = process.env.NEXT_PUBLIC_WP_URL?.trim();
  if (wpUrl) {
    try {
      hosts.add(new URL(wpUrl).hostname);
    } catch {
      /* ignore */
    }
  }

  const graphqlUrl = process.env.WP_GRAPHQL_URL?.trim();
  if (graphqlUrl) {
    try {
      hosts.add(new URL(graphqlUrl).hostname);
    } catch {
      /* ignore */
    }
  }

  const extra = process.env.WORDPRESS_MEDIA_HOSTNAMES?.trim();
  if (extra) {
    for (const part of extra.split(",")) {
      const host = part.trim();
      if (host) hosts.add(host);
    }
  }

  if (hosts.size === 0) {
    hosts.add("cms.thebrandvue.com");
  }

  return [...hosts];
}
