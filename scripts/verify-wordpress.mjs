/**
 * Smoke-test WordPress GraphQL from the CLI.
 * Run: node --env-file=.env.local scripts/verify-wordpress.mjs
 */

const wpGraphqlUrl = process.env.WP_GRAPHQL_URL;
const wpSiteUrl = process.env.NEXT_PUBLIC_WP_URL;

if (!wpGraphqlUrl || !wpSiteUrl) {
  console.error(
    "Missing WP_GRAPHQL_URL or NEXT_PUBLIC_WP_URL. Use: node --env-file=.env.local scripts/verify-wordpress.mjs",
  );
  process.exit(1);
}

const query = /* GraphQL */ `
  query VerifyCms {
    portfolios(first: 1) { nodes { title } }
    testimonials(first: 1) { nodes { title } }
    teams(first: 1) { nodes { title } }
    services(first: 1) { nodes { title } }
  }
`;

const response = await fetch(wpGraphqlUrl, {
  method: "POST",
  headers: { "Content-Type": "application/json", Accept: "application/json" },
  body: JSON.stringify({ query }),
});

const json = await response.json();

if (!response.ok || json.errors?.length) {
  console.error("WordPress GraphQL verification failed.");
  console.error(JSON.stringify(json, null, 2));
  process.exit(1);
}

console.log("WordPress GraphQL OK");
console.log("Site:", wpSiteUrl);
console.log("GraphQL:", wpGraphqlUrl);
console.log(JSON.stringify(json.data, null, 2));
