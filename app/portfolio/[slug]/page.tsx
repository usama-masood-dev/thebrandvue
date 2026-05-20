import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InnerPageLayout } from "@/components/layout/inner-page-layout";
import { CaseStudyContent } from "@/components/portfolio/case-study-content";
import {
  getAllPortfolioSlugs,
  getPortfolioCaseStudy,
} from "@/lib/wordpress/get-portfolio-by-slug";

export const revalidate = 60;

type PortfolioPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllPortfolioSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PortfolioPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPortfolioCaseStudy(slug);

  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: project.title,
    description: project.excerpt,
  };
}

export default async function PortfolioCaseStudyPage({ params }: PortfolioPageProps) {
  const { slug } = await params;
  const project = await getPortfolioCaseStudy(slug);

  if (!project) {
    notFound();
  }

  return (
    <InnerPageLayout>
      <CaseStudyContent project={project} />
    </InnerPageLayout>
  );
}
