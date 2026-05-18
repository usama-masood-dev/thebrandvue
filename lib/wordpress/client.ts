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

export async function fetchGraphQL<T>(
  query: string,
  options: FetchGraphQLOptions = {},
): Promise<T> {
  const { wpGraphqlUrl } = getWordPressEnv();
  const { variables, revalidate = WORDPRESS_REVALIDATE_SECONDS, tags } =
    options;

  const response = await fetch(wpGraphqlUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query, variables }),
    next: {
      revalidate: revalidate === false ? undefined : revalidate,
      tags: tags ?? [CACHE_TAGS.wordpress],
    },
  });

  if (!response.ok) {
    throw new Error(
      `WordPress GraphQL request failed: ${response.status} ${response.statusText}`,
    );
  }

  const json = (await response.json()) as GraphQLResponse<T>;

  if (json.errors?.length) {
    throw new WordPressGraphQLError(json.errors);
  }

  if (json.data === undefined) {
    throw new Error("WordPress GraphQL response contained no data.");
  }

  return json.data;
}
