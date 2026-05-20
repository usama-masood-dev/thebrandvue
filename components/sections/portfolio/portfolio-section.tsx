"use client";

import Link from "next/link";
import { FadeIn } from "@/components/motion/fade-in";
import { portfolioSectionContent } from "@/lib/content/portfolio-section";
import type { PortfolioCardViewModel } from "@/lib/wordpress/mappers/portfolio";
import { PortfolioCarousel } from "./portfolio-carousel";

type PortfolioSectionProps = {
  projects: PortfolioCardViewModel[];
};

export function PortfolioSection({ projects }: PortfolioSectionProps) {
  if (projects.length === 0) return null;

  const { eyebrow, title, titleAccent, description, cta } = portfolioSectionContent;

  return (
    <section
      id="portfolio"
      className="relative overflow-x-clip bg-surface-white py-12 sm:py-16 lg:py-28"
      aria-labelledby="portfolio-heading"
    >
      <div
        className="pointer-events-none absolute -right-20 top-0 size-48 rounded-full bg-accent-soft blur-3xl sm:size-72"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-0 size-40 rounded-full bg-surface-gray-soft blur-3xl sm:size-56"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn y={16}>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-surface-gray sm:text-xs sm:tracking-[0.2em]">
              {eyebrow}
            </p>
            <h2
              id="portfolio-heading"
              className="mt-2 font-display text-[1.65rem] font-semibold leading-tight text-surface-dark sm:mt-3 sm:text-3xl md:text-4xl lg:text-[2.5rem] lg:leading-[1.15]"
            >
              {title}{" "}
              <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
                {titleAccent}
              </span>
            </h2>
            <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground sm:mt-4 sm:text-base md:text-lg">
              {description}
            </p>
          </FadeIn>
        </div>

        <PortfolioCarousel projects={projects} />

        <FadeIn delay={0.2} className="mt-10 flex justify-center sm:mt-12">
          <Link
            href={cta.href}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-surface-dark transition-colors hover:bg-accent-light"
          >
            {cta.label}
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
