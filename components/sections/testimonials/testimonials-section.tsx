"use client";

import { FadeIn } from "@/components/motion/fade-in";
import { testimonialsSectionContent } from "@/lib/content/testimonials-section";
import type { TestimonialCardViewModel } from "@/lib/wordpress/mappers/testimonials";
import { TestimonialsCarousel } from "./testimonials-carousel";

type TestimonialsSectionProps = {
  testimonials: TestimonialCardViewModel[];
  standalone?: boolean;
};

export function TestimonialsSection({
  testimonials,
  standalone = false,
}: TestimonialsSectionProps) {
  if (testimonials.length === 0) return null;

  const { eyebrow, title, titleAccent, titleSuffix, description } =
    testimonialsSectionContent;

  return (
    <section
      id={standalone ? undefined : "clients"}
      className={`relative overflow-x-clip ${
        standalone
          ? "bg-surface-dark py-10 sm:py-14 lg:py-16"
          : "overflow-hidden bg-surface-white py-16 sm:py-20 lg:py-28"
      }`}
      aria-labelledby={standalone ? undefined : "testimonials-heading"}
    >
      <div
        className="pointer-events-none absolute -right-20 top-0 size-72 rounded-full bg-accent-soft blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-0 size-56 rounded-full bg-surface-gray-soft blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {!standalone ? (
          <div className="mx-auto max-w-2xl text-center">
            <FadeIn y={16}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-surface-gray">
                {eyebrow}
              </p>
              <h2
                id="testimonials-heading"
                className="mt-3 font-display text-3xl font-semibold leading-tight text-surface-dark sm:text-4xl lg:text-[2.5rem] lg:leading-[1.15]"
              >
                {title}{" "}
                <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
                  {titleAccent}
                </span>{" "}
                {titleSuffix}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                {description}
              </p>
            </FadeIn>
          </div>
        ) : null}

        <TestimonialsCarousel
          testimonials={testimonials}
          className={standalone ? "mt-0" : undefined}
        />
      </div>
    </section>
  );
}
