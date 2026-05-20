import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InnerPageLayout } from "@/components/layout/inner-page-layout";
import { ServiceDetailContent } from "@/components/services/service-detail-content";
import {
  getAllServiceSlugs,
  getServiceDetail,
} from "@/lib/wordpress/get-service-by-slug";

export const revalidate = 60;

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceDetail(slug);

  if (!service) {
    return { title: "Service not found" };
  }

  return {
    title: service.title,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = await getServiceDetail(slug);

  if (!service) {
    notFound();
  }

  return (
    <InnerPageLayout>
      <ServiceDetailContent service={service} />
    </InnerPageLayout>
  );
}
