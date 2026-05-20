import type { Metadata } from "next";
import { InnerPageLayout } from "@/components/layout/inner-page-layout";
import { ClientsPageContent } from "@/components/pages/clients-page-content";
import { clientsPageContent } from "@/lib/content/clients-page";
import { getTestimonialsForSection } from "@/lib/wordpress/get-testimonials-for-section";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Clients",
  description: clientsPageContent.description,
};

export default async function ClientsPage() {
  const testimonials = await getTestimonialsForSection();

  return (
    <InnerPageLayout>
      <ClientsPageContent testimonials={testimonials} />
    </InnerPageLayout>
  );
}
