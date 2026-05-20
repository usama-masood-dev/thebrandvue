import type { Metadata } from "next";
import { InnerPageLayout } from "@/components/layout/inner-page-layout";
import { PortfolioPageContent } from "@/components/pages/portfolio-page-content";
import { portfolioPageContent } from "@/lib/content/portfolio-page";
import { getPortfoliosForSection } from "@/lib/wordpress/get-portfolios-for-section";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Portfolio",
  description: portfolioPageContent.description,
};

export default async function PortfolioPage() {
  const projects = await getPortfoliosForSection();

  return (
    <InnerPageLayout>
      <PortfolioPageContent projects={projects} />
    </InnerPageLayout>
  );
}
