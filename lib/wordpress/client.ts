import { WORDPRESS_REVALIDATE_SECONDS } from "./config";
import { getWordPressEnv } from "./env";
import type { CacheTag } from "./cache-tags";
import { CACHE_TAGS } from "./cache-tags";

export type GraphQLErrorItem = {
  message: string;
  locations?: Array<{ line: number; column: number }>;
  path?: Array<string | number>;
};

export type GraphQLResponse<T> = {
  data?: T;
  errors?: GraphQLErrorItem[];
};

export class WordPressGraphQLError extends Error {
  readonly errors: GraphQLErrorItem[];

  constructor(errors: GraphQLErrorItem[]) {
    super(errors.map((e) => e.message).join("; "));
    this.name = "WordPressGraphQLError";
    this.errors = errors;
  }
}

export type FetchGraphQLOptions = {
  variables?: Record<string, unknown>;
  /** Override default revalidate from WORDPRESS_REVALIDATE_SECONDS */
  revalidate?: number | false;
  tags?: CacheTag[];
};

function shouldBypassWordPressCache(): boolean {
  return (
    process.env.NODE_ENV === "development" ||
    process.env.WORDPRESS_CACHE_BYPASS === "1"
  );
}

export async function fetchGraphQL<T>(
  query: string,
  options: FetchGraphQLOptions = {},
): Promise<T> {
  const { wpGraphqlUrl } = getWordPressEnv();
  const { variables, revalidate = WORDPRESS_REVALIDATE_SECONDS, tags } =
    options;
  const cacheTags = tags ?? [CACHE_TAGS.wordpress];
  const bypassCache = shouldBypassWordPressCache();

  const response = await fetch(wpGraphqlUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query, variables }),
    ...(bypassCache
      ? { cache: "no-store" as const }
      : {
          next: {
            revalidate: revalidate === false ? undefined : revalidate,
            tags: cacheTags,
          },
        }),
  });

  if (!response.ok) {
    throw new Error(
      `WordPress GraphQL request failed: ${response.status} ${response.statusText}`,
    );
  }

  const contentType = response.headers.get("content-type") ?? "";
  const rawBody = await response.text();

  if (!contentType.includes("application/json")) {
    throw new Error(
      `WordPress GraphQL returned non-JSON (${contentType || "unknown"}). Check WP_GRAPHQL_URL.`,
    );
  }

  let json: GraphQLResponse<T>;
  try {
    json = JSON.parse(rawBody) as GraphQLResponse<T>;
  } catch {
    throw new Error(
      "WordPress GraphQL response was not valid JSON. Check WP_GRAPHQL_URL.",
    );
  }

  if (json.errors?.length) {
    throw new WordPressGraphQLError(json.errors);
  }

  if (json.data === undefined) {
    throw new Error("WordPress GraphQL response contained no data.");
  }

  return json.data;
}
