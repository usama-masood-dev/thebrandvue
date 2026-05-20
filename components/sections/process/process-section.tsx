"use client";

import { FadeIn } from "@/components/motion/fade-in";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";
import { processSectionContent } from "@/lib/content/process-section";
import { ProcessStep } from "./process-step";

type ProcessSectionProps = {
  standalone?: boolean;
};

export function ProcessSection({ standalone = false }: ProcessSectionProps) {
  const { eyebrow, title, titleAccent, steps } = processSectionContent;

  return (
    <section
      id="process"
      className={`relative overflow-x-clip bg-surface-dark ${
        standalone ? "py-10 sm:py-14 lg:py-16" : "py-12 sm:py-16 lg:py-28"
      }`}
      aria-labelledby={standalone ? undefined : "process-heading"}
    >
      <div
        className="pointer-events-none absolute -left-24 top-1/3 size-56 rounded-full bg-accent/10 blur-3xl sm:size-80"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-0 size-48 rounded-full bg-accent/5 blur-3xl sm:size-64"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn y={16}>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-surface-gray sm:text-xs sm:tracking-[0.2em]">
              {eyebrow}
            </p>
            <h2
              id={standalone ? undefined : "process-heading"}
              className="mt-2 font-display text-[1.65rem] font-semibold leading-tight text-white sm:mt-3 sm:text-3xl md:text-4xl lg:text-[2.5rem] lg:leading-[1.15]"
            >
              {title}{" "}
              <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
                {titleAccent}
              </span>
            </h2>
          </FadeIn>
        </div>

        <div className="relative mt-10 sm:mt-12 lg:mt-16">
          <div
            className="pointer-events-none absolute inset-x-[10%] top-12 hidden h-px bg-gradient-to-r from-transparent via-accent/45 to-transparent lg:block"
            aria-hidden
          />

          <StaggerChildren
            stagger={0.12}
            className="grid list-none grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-4 xl:gap-5"
            role="list"
          >
            {steps.map((step, index) => (
              <StaggerItem key={step.number} className="min-w-0" role="listitem">
                <ProcessStep step={step} index={index} total={steps.length} />
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </div>
    </section>
  );
}
