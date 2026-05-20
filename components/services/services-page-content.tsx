import { InnerPageCta, InnerPageShell } from "@/components/pages/inner-page-shell";
import { ServicesGrid } from "@/components/sections/services/services-grid";
import { servicesPageContent } from "@/lib/content/services-page";
import type { ServiceCardViewModel } from "@/lib/wordpress/mappers/services";

type ServicesPageContentProps = {
  services: ServiceCardViewModel[];
};

export function ServicesPageContent({ services }: ServicesPageContentProps) {
  const { eyebrow, title, titleAccent, description, cta } = servicesPageContent;

  return (
    <InnerPageShell hero={{ eyebrow, title, titleAccent, description }}>
      {services.length > 0 ? (
        <ServicesGrid services={services} />
      ) : (
        <p className="text-center text-white/70">
          No services are published yet. Please check back soon.
        </p>
      )}
      <InnerPageCta href={cta.href} label={cta.label} />
    </InnerPageShell>
  );
}
