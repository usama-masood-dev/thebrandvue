import type { Metadata } from "next";
import { InnerPageLayout } from "@/components/layout/inner-page-layout";
import { ServicesPageContent } from "@/components/services/services-page-content";
import { servicesPageContent } from "@/lib/content/services-page";
import { getServicesForSection } from "@/lib/wordpress/get-services-for-section";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Services",
  description: servicesPageContent.description,
};

export default async function ServicesPage() {
  const services = await getServicesForSection();

  return (
    <InnerPageLayout>
      <ServicesPageContent services={services} />
    </InnerPageLayout>
  );
}
