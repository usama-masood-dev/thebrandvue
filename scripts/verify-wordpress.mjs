/**
 * Full WordPress GraphQL + ACF smoke test.
 * Run: node --env-file=.env.local scripts/verify-wordpress.mjs
 */

const wpGraphqlUrl = process.env.WP_GRAPHQL_URL;
const wpSiteUrl = process.env.NEXT_PUBLIC_WP_URL;

const WP_IMAGE_FIELDS = `
  sourceUrl
  altText
`;

const PORTFOLIO_DETAILS_FIELDS = `
  clientName
  projectUrl
  completionDate
  featuredProject
  galleryImages { id }
`;

const TESTIMONIAL_DETAILS_FIELDS = `
  clientName
  companyName
  rating
  videoUrl
  clientPhoto { node { ${WP_IMAGE_FIELDS} } }
`;

const TEAM_DETAILS_FIELDS = `
  position
  bio
  photo { node { ${WP_IMAGE_FIELDS} } }
`;

const SERVICE_DETAILS_FIELDS = `
  description
  linkUrl
  icon { node { ${WP_IMAGE_FIELDS} } }
`;

if (!wpGraphqlUrl || !wpSiteUrl) {
  console.error(
    "Missing WP_GRAPHQL_URL or NEXT_PUBLIC_WP_URL. Use: node --env-file=.env.local scripts/verify-wordpress.mjs",
  );
  process.exit(1);
}

const query = /* GraphQL */ `
  query VerifyCmsFull {
    services(first: 3) {
      nodes {
        title
        slug
        serviceDetails { ${SERVICE_DETAILS_FIELDS} }
      }
    }
    portfolios(first: 3) {
      nodes {
        title
        slug
        featuredImage { node { ${WP_IMAGE_FIELDS} } }
        portfolioDetails { ${PORTFOLIO_DETAILS_FIELDS} }
      }
    }
    testimonials(first: 3) {
      nodes {
        title
        content
        testimonialDetails { ${TESTIMONIAL_DETAILS_FIELDS} }
      }
    }
    teams(first: 3) {
      nodes {
        title
        teamDetails { ${TEAM_DETAILS_FIELDS} }
      }
    }
  }
`;

let response;
try {
  response = await fetch(wpGraphqlUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ query }),
  });
} catch (error) {
  console.error("Could not reach WordPress GraphQL:", error.message);
  process.exit(1);
}

const contentType = response.headers.get("content-type") ?? "";
const rawBody = await response.text();

if (!contentType.includes("application/json")) {
  console.error("WordPress did not return JSON.");
  console.error("URL:", wpGraphqlUrl, "Status:", response.status);
  console.error(rawBody.slice(0, 300));
  process.exit(1);
}

const json = JSON.parse(rawBody);

if (!response.ok || json.errors?.length) {
  console.error("GraphQL errors:");
  console.error(JSON.stringify(json.errors, null, 2));
  process.exit(1);
}

const { services, portfolios, testimonials, teams } = json.data;

function row(label, ok, detail = "") {
  const mark = ok ? "OK" : "MISSING";
  console.log(`  [${mark}] ${label}${detail ? ` — ${detail}` : ""}`);
}

console.log("\nWordPress GraphQL OK");
console.log("Site:", wpSiteUrl);
console.log("GraphQL:", wpGraphqlUrl);

console.log("\nServices:", services.nodes.length);
for (const s of services.nodes) {
  const d = s.serviceDetails;
  row("title", Boolean(s.title));
  row("description", Boolean(d?.description?.trim()));
  row("linkUrl", Boolean(d?.linkUrl?.trim()), d?.linkUrl ?? "");
  row("icon", Boolean(d?.icon?.node?.sourceUrl), d?.icon?.node?.sourceUrl ?? "no image");
}

console.log("\nPortfolios:", portfolios.nodes.length);
for (const p of portfolios.nodes) {
  const d = p.portfolioDetails;
  row("title", Boolean(p.title));
  row("featuredImage", Boolean(p.featuredImage?.node?.sourceUrl));
  row("clientName", Boolean(d?.clientName?.trim()));
  row("projectUrl", Boolean(d?.projectUrl?.trim()));
  row("completionDate", Boolean(d?.completionDate?.trim()));
  row("featuredProject", d?.featuredProject != null, String(d?.featuredProject));
  row(
    "galleryImages",
    (d?.galleryImages?.length ?? 0) > 0,
    `${d?.galleryImages?.length ?? 0} ids`,
  );
}

console.log("\nTestimonials:", testimonials.nodes.length);
for (const t of testimonials.nodes) {
  const d = t.testimonialDetails;
  row("clientName", Boolean(d?.clientName?.trim()));
  row("companyName", Boolean(d?.companyName?.trim()));
  row("rating", d?.rating != null, String(d?.rating));
  row("videoUrl", Boolean(d?.videoUrl?.trim()));
  row("clientPhoto", Boolean(d?.clientPhoto?.node?.sourceUrl));
  row("quote (content)", Boolean(t.content?.trim()));
}

console.log("\nTeam:", teams.nodes.length);
for (const m of teams.nodes) {
  const d = m.teamDetails;
  row("name (title)", Boolean(m.title));
  row("position", Boolean(d?.position?.trim()));
  row("bio", Boolean(d?.bio?.trim()));
  row("photo", Boolean(d?.photo?.node?.sourceUrl));
}

console.log("\nAll CPT queries succeeded. Review [MISSING] rows for empty ACF fields.\n");
