"use client";

import { FadeIn } from "@/components/motion/fade-in";
import { ceoMessageContent } from "@/lib/content/ceo-message";
import { CeoPortrait } from "./ceo-portrait";

function QuoteIcon() {
  return (
    <svg
      className="size-8 text-accent sm:size-10 md:size-12"
      viewBox="0 0 48 48"
      fill="currentColor"
      aria-hidden
    >
      <path d="M14 10c-4.5 0-8 3.5-8 8 0 6 5 10 8 14-1.5 1-3 2-5 2v4c4 0 8-3 10-7 2-4 3-8 3-12 0-5-4-9-8-9zm22 0c-4.5 0-8 3.5-8 8 0 6 5 10 8 14-1.5 1-3 2-5 2v4c4 0 8-3 10-7 2-4 3-8 3-12 0-5-4-9-8-9z" />
    </svg>
  );
}

type CeoMessageSectionProps = {
  standalone?: boolean;
};

export function CeoMessageSection({ standalone = false }: CeoMessageSectionProps) {
  const {
    eyebrow,
    title,
    titleAccent,
    image,
    quote,
    paragraphs,
    signature,
  } = ceoMessageContent;

  return (
    <section
      id={standalone ? undefined : "about"}
      className={`relative overflow-x-clip bg-surface-white ${
        standalone ? "py-10 sm:py-14 lg:py-16" : "py-12 sm:py-16 lg:py-28"
      }`}
      aria-labelledby={standalone ? undefined : "ceo-message-heading"}
    >
      <div
        className="pointer-events-none absolute -right-24 top-0 size-48 rounded-full bg-accent-soft blur-3xl sm:size-72"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-0 size-40 rounded-full bg-surface-gray-soft blur-3xl sm:size-56"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div
          className={`grid grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-2 lg:items-center lg:gap-14 xl:gap-20 ${
            standalone ? "lg:items-start" : ""
          }`}
        >
          {!standalone ? (
            <header className="order-1 min-w-0 lg:col-start-1 lg:row-start-1">
              <FadeIn y={16}>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-surface-gray sm:text-xs sm:tracking-[0.2em]">
                  {eyebrow}
                </p>
                <h2
                  id="ceo-message-heading"
                  className="mt-2 font-display text-[1.65rem] font-semibold leading-tight text-surface-dark sm:mt-3 sm:text-3xl md:text-4xl lg:text-[2.5rem] lg:leading-[1.15]"
                >
                  {title}{" "}
                  <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
                    {titleAccent}
                  </span>
                </h2>
              </FadeIn>
            </header>
          ) : null}

          <div
            className={`min-w-0 ${
              standalone
                ? "order-1 lg:col-start-1 lg:row-start-1"
                : "order-2 lg:col-start-1 lg:row-start-2"
            }`}
          >
            <CeoPortrait src={image.src} alt={image.alt} />
          </div>

          <div
            className={`flex min-w-0 flex-col justify-center ${
              standalone
                ? "order-2 lg:col-start-2 lg:row-start-1"
                : "order-3 lg:col-start-2 lg:row-span-2 lg:row-start-1"
            }`}
          >
            <FadeIn delay={0.05}>
              <QuoteIcon />
            </FadeIn>

            <FadeIn delay={0.1} className="mt-4 sm:mt-6">
              <p className="text-pretty text-base font-medium leading-relaxed text-surface-dark sm:text-lg md:text-xl">
                {quote}
              </p>
            </FadeIn>

            <FadeIn delay={0.18} className="mt-4 sm:mt-6">
              <p className="text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base md:text-[1.05rem]">
                {paragraphs[0].before}
                <strong className="font-semibold text-surface-dark">
                  {paragraphs[0].emphasis}
                </strong>
                {paragraphs[0].after}
              </p>
            </FadeIn>

            <FadeIn delay={0.26} className="mt-4 sm:mt-5">
              <p className="text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base md:text-[1.05rem]">
                {paragraphs[1]}
              </p>
            </FadeIn>

            <FadeIn
              delay={0.34}
              className="mt-8 border-t border-surface-gray-soft pt-6 sm:mt-10 sm:pt-8"
            >
              <div className="flex flex-col gap-3 min-[400px]:flex-row min-[400px]:items-center min-[400px]:gap-5 sm:gap-6">
                <p
                  className="font-display text-xl italic text-accent sm:text-2xl md:text-[1.65rem]"
                  aria-hidden
                >
                  {signature.name.split(" ")[0]}
                </p>
                <div
                  className="hidden h-10 w-px shrink-0 bg-surface-gray/40 min-[400px]:block"
                  aria-hidden
                />
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-surface-dark sm:text-sm">
                    {signature.name}
                  </p>
                  <p className="mt-0.5 text-[0.65rem] font-medium uppercase tracking-[0.16em] text-surface-gray sm:mt-1 sm:text-xs sm:tracking-[0.18em]">
                    {signature.role}
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
