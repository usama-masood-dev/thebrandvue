import { NextResponse } from "next/server";
import {
  getPortfolios,
  getServices,
  getTeams,
  getTestimonials,
} from "@/lib/wordpress/api";
import { getWordPressEnv } from "@/lib/wordpress/env";
import { getWordPressImageHostnames } from "@/lib/wordpress/image-hosts";
import { resolvePortfolioGalleries } from "@/lib/wordpress/mappers";
import { mapPortfoliosToCards } from "@/lib/wordpress/mappers/portfolio";
import { mapServicesToCards } from "@/lib/wordpress/mappers/services";
import { mapTeamMembersToCards } from "@/lib/wordpress/mappers/team";
import { mapTestimonialsToCards } from "@/lib/wordpress/mappers/testimonials";

export const dynamic = "force-dynamic";

/** CMS check after deploy — GET /api/cms-health */
export async function GET() {
  try {
    const env = getWordPressEnv();

    const [servicesData, portfoliosData, testimonialsData, teamsData] =
      await Promise.all([
        getServices({ servicesFirst: 12 }),
        getPortfolios({ portfoliosFirst: 12 }),
        getTestimonials({ testimonialsFirst: 12 }),
        getTeams({ teamsFirst: 12 }),
      ]);

    const portfoliosWithGalleries = await resolvePortfolioGalleries(
      portfoliosData.portfolios.nodes,
    );

    const services = mapServicesToCards(servicesData.services.nodes);
    const portfolios = mapPortfoliosToCards(portfoliosWithGalleries);
    const testimonials = mapTestimonialsToCards(
      testimonialsData.testimonials.nodes,
    );
    const team = mapTeamMembersToCards(teamsData.teams.nodes);

    return NextResponse.json({
      ok: true,
      wpSiteUrl: env.wpSiteUrl,
      wpGraphqlUrl: env.wpGraphqlUrl,
      imageHostnames: getWordPressImageHostnames(),
      imageUnoptimized: process.env.NEXT_IMAGE_UNOPTIMIZED === "1",
      counts: {
        servicesRaw: servicesData.services.nodes.length,
        servicesMapped: services.length,
        portfoliosRaw: portfoliosData.portfolios.nodes.length,
        portfoliosMapped: portfolios.length,
        testimonialsRaw: testimonialsData.testimonials.nodes.length,
        testimonialsMapped: testimonials.length,
        teamRaw: teamsData.teams.nodes.length,
        teamMapped: team.length,
      },
      samples: {
        service: services[0]?.title ?? null,
        portfolio: portfolios[0]?.title ?? null,
        testimonial: testimonials[0]?.clientName ?? null,
        teamMember: team[0]?.name ?? null,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      {
        ok: false,
        error: message,
        env: {
          hasNextPublicWpUrl: Boolean(process.env.NEXT_PUBLIC_WP_URL?.trim()),
          hasWpGraphqlUrl: Boolean(process.env.WP_GRAPHQL_URL?.trim()),
          nextPublicWpUrl: process.env.NEXT_PUBLIC_WP_URL ?? null,
          wpGraphqlUrl: process.env.WP_GRAPHQL_URL ?? null,
        },
        imageHostnames: getWordPressImageHostnames(),
      },
      { status: 500 },
    );
  }
}
