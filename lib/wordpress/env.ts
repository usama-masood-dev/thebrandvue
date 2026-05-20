function requireEnv(name: string, value: string | undefined): string {
  if (!value?.trim()) {
    throw new Error(
      `Missing required environment variable: ${name}. Add it to .env.local (see .env.example).`,
    );
  }
  return value.trim().replace(/\/$/, "");
}

function parseSiteOrigin(name: string, value: string): string {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" && url.protocol !== "http:") {
      throw new Error("URL must use http or https");
    }
    return url.origin;
  } catch {
    throw new Error(
      `Invalid ${name}: "${value}". Expected a full URL (e.g. https://dev.thebrandvue.com).`,
    );
  }
}

/** Keeps the full endpoint path (e.g. /graphql) — do not reduce to origin only. */
function parseGraphqlEndpoint(name: string, value: string): string {
  try {
    const url = new URL(value.trim());
    if (url.protocol !== "https:" && url.protocol !== "http:") {
      throw new Error("URL must use http or https");
    }
    return url.toString().replace(/\/$/, "");
  } catch {
    throw new Error(
      `Invalid ${name}: "${value}". Expected the full GraphQL URL (e.g. https://dev.thebrandvue.com/graphql).`,
    );
  }
}

let cached: { wpSiteUrl: string; wpGraphqlUrl: string; wpHostname: string } | null =
  null;

export function getWordPressEnv() {
  if (cached) return cached;

  const wpSiteUrl = parseSiteOrigin(
    "NEXT_PUBLIC_WP_URL",
    requireEnv("NEXT_PUBLIC_WP_URL", process.env.NEXT_PUBLIC_WP_URL),
  );

  const wpGraphqlUrl = parseGraphqlEndpoint(
    "WP_GRAPHQL_URL",
    requireEnv("WP_GRAPHQL_URL", process.env.WP_GRAPHQL_URL),
  );

  cached = {
    wpSiteUrl,
    wpGraphqlUrl,
    wpHostname: new URL(wpSiteUrl).hostname,
  };

  return cached;
}
