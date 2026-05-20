import { InnerPageCta, InnerPageShell } from "@/components/pages/inner-page-shell";
import { PortfolioGrid } from "@/components/sections/portfolio";
import { portfolioPageContent } from "@/lib/content/portfolio-page";
import type { PortfolioCardViewModel } from "@/lib/wordpress/mappers/portfolio";

type PortfolioPageContentProps = {
  projects: PortfolioCardViewModel[];
};

export function PortfolioPageContent({ projects }: PortfolioPageContentProps) {
  const { eyebrow, title, titleAccent, description, cta } = portfolioPageContent;

  return (
    <InnerPageShell hero={{ eyebrow, title, titleAccent, description }}>
      {projects.length > 0 ? (
        <PortfolioGrid projects={projects} />
      ) : (
        <p className="text-center text-white/70">
          No portfolio projects are published yet.
        </p>
      )}
      <InnerPageCta href={cta.href} label={cta.label} />
    </InnerPageShell>
  );
}
