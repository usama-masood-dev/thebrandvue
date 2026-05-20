import { HomeHeader } from "@/components/layout/header";
import { CeoMessageSection } from "@/components/sections/ceo-message";
import { HeroSlider } from "@/components/sections/hero";
import { PortfolioSection } from "@/components/sections/portfolio";
import { ContactSection } from "@/components/sections/contact";
import { ProcessSection } from "@/components/sections/process";
import { ServicesSection } from "@/components/sections/services";
import { TeamSection } from "@/components/sections/team";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { heroSlides } from "@/lib/content/hero-slides";
import { getPortfoliosForSection } from "@/lib/wordpress/get-portfolios-for-section";
import { getServicesForSection } from "@/lib/wordpress/get-services-for-section";
import { getTeamForSection } from "@/lib/wordpress/get-team-for-section";
import { getTestimonialsForSection } from "@/lib/wordpress/get-testimonials-for-section";

/** Re-fetch CMS content on the home page (seconds). Override via env at fetch layer. */
export const revalidate = 60;

export default async function Home() {
  const [services, portfolios, testimonials, team] = await Promise.all([
    getServicesForSection(),
    getPortfoliosForSection(),
    getTestimonialsForSection(),
    getTeamForSection(),
  ]);

  return (
    <>
      <HomeHeader />
      <HeroSlider slides={heroSlides} />
      <CeoMessageSection />
      <ServicesSection services={services} />
      <PortfolioSection projects={portfolios} />
      <ProcessSection />
      <TestimonialsSection testimonials={testimonials} />
      <TeamSection members={team} />
      <ContactSection />
    </>
  );
}
  