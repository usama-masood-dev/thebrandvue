"use client";

import Link from "next/link";
import { FadeIn } from "@/components/motion/fade-in";
import { servicesSectionContent } from "@/lib/content/services-section";
import type { ServiceCardViewModel } from "@/lib/wordpress/mappers/services";
import { ServicesCarousel } from "./services-carousel";
import { ServicesGrid } from "./services-grid";

type ServicesSectionProps = {
  services: ServiceCardViewModel[];
};

export function ServicesSection({ services }: ServicesSectionProps) {
  const { eyebrow, title, titleAccent, description, gridMaxCount, cta } =
    servicesSectionContent;
  const useCarousel = services.length > gridMaxCount;

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-surface-dark py-16 sm:py-20 lg:py-28"
      aria-labelledby="services-heading"
    >
      <div
        className="pointer-events-none absolute -left-20 top-1/4 size-80 rounded-full bg-accent/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-0 size-64 rounded-full bg-accent/5 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn y={16}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-surface-gray">
              {eyebrow}
            </p>
            <h2
              id="services-heading"
              className="mt-3 font-display text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-[2.5rem] lg:leading-[1.15]"
            >
              {title}{" "}
              <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
                {titleAccent}
              </span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/75 sm:text-lg">
              {description}
            </p>
          </FadeIn>
        </div>

        {useCarousel ? (
          <ServicesCarousel services={services} />
        ) : (
          <div className="mt-12 sm:mt-14 lg:mt-16">
            <ServicesGrid services={services} />
          </div>
        )}

        <FadeIn delay={0.2} className="mt-12 flex justify-center sm:mt-14">
          <Link
            href={cta.href}
            className="inline-flex items-center justify-center rounded-full bg-accent px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-surface-dark transition-colors hover:bg-accent-light"
          >
            {cta.label}
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
