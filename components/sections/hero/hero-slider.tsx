"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import type { HeroSlide } from "@/lib/content/hero-slides";

type HeroSliderProps = {
  slides: HeroSlide[];
};

export function HeroSlider({ slides }: HeroSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 30 },
    [Autoplay({ delay: 7000, stopOnInteraction: false })],
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  return (
    <section
      id="home"
      className="relative min-h-[min(100vh,920px)] w-full"
      aria-label="Hero"
    >
      <div ref={emblaRef} className="h-full overflow-hidden">
        <div className="flex h-full">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="relative min-h-[min(100vh,920px)] w-full min-w-0 shrink-0 grow-0 basis-full"
            >
              <Image
                src={slide.image}
                alt=""
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0 bg-surface-dark"
                style={{ opacity: "var(--hero-overlay-opacity, 0.82)" }}
                aria-hidden
              />
              <div className="relative z-10 flex min-h-[min(100vh,920px)] flex-col items-center justify-center px-4 pb-16 pt-28 sm:px-6 sm:pt-32 lg:pt-36">
                <div className="mx-auto flex w-full max-w-2xl flex-col items-center text-center">
                  <p className="max-w-md text-xs font-semibold uppercase tracking-[0.18em] text-white/90 sm:text-sm">
                    {slide.eyebrow}
                  </p>
                  <h1 className="mt-5 max-w-xl font-display text-balance text-3xl font-semibold leading-[1.2] text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.18]">
                    {slide.title}
                  </h1>
                  <p className="mt-5 max-w-lg text-pretty text-sm leading-relaxed text-white/90 sm:text-base">
                    {slide.description}
                  </p>
                  <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                    <Link
                      href={slide.primaryCta.href}
                      className="inline-flex min-w-[200px] items-center justify-center rounded-full bg-white px-6 py-3 text-xs font-bold uppercase tracking-wider text-accent transition-colors hover:bg-white/90 sm:text-sm"
                    >
                      {slide.primaryCta.label}
                    </Link>
                    {slide.secondaryCta ? (
                      <Link
                        href={slide.secondaryCta.href}
                        className="inline-flex min-w-[200px] items-center justify-center rounded-full border border-white/80 bg-accent px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-accent-hover sm:text-sm"
                      >
                        {slide.secondaryCta.label}
                      </Link>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <HeroArrow direction="prev" onClick={scrollPrev} />
      <HeroArrow direction="next" onClick={scrollNext} />

      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`size-2.5 rounded-full transition-colors ${
              index === selectedIndex
                ? "bg-white"
                : "bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

function HeroArrow({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  const label = direction === "prev" ? "Previous slide" : "Next slide";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`absolute top-1/2 z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:size-12 ${
        direction === "prev" ? "left-3 sm:left-6" : "right-3 sm:right-6"
      }`}
    >
      <svg
        className="size-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden
      >
        {direction === "prev" ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5l7 7-7 7"
          />
        )}
      </svg>
    </button>
  );
}
