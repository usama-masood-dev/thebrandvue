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
              <div className="relative z-10 flex min-h-[min(100vh,920px)] flex-col items-center justify-center px-4 pb-20 pt-[5.5rem] sm:px-6 sm:pb-24 sm:pt-32 md:pt-36 lg:pt-40">
                <div className="mx-auto flex w-full max-w-2xl flex-col items-center px-1 text-center sm:px-2">
                  <p className="max-w-[18rem] text-[0.7rem] font-semibold uppercase leading-relaxed tracking-[0.14em] text-white/90 sm:max-w-md sm:text-xs md:text-sm">
                    {slide.eyebrow}
                  </p>
                  <h1 className="mt-4 max-w-[20rem] font-display text-balance text-[1.65rem] font-semibold leading-[1.2] text-white sm:mt-5 sm:max-w-xl sm:text-3xl md:text-4xl lg:text-[2.75rem] lg:leading-[1.18]">
                    {slide.title}
                  </h1>
                  <p className="mt-4 max-w-[18rem] text-pretty text-sm leading-relaxed text-white/90 sm:mt-5 sm:max-w-lg md:text-base">
                    {slide.description}
                  </p>
                  <div className="mt-6 flex w-full max-w-sm flex-col items-stretch gap-3 sm:mt-8 sm:max-w-none sm:flex-row sm:items-center sm:justify-center sm:gap-4">
                    <Link
                      href={slide.primaryCta.href}
                      className="inline-flex w-full items-center justify-center rounded-full bg-white px-5 py-3 text-center text-[0.7rem] font-bold uppercase leading-snug tracking-wider text-accent transition-colors hover:bg-white/90 sm:w-auto sm:min-w-[200px] sm:px-6 sm:text-xs md:text-sm"
                    >
                      {slide.primaryCta.label}
                    </Link>
                    {slide.secondaryCta ? (
                      <Link
                        href={slide.secondaryCta.href}
                        className="inline-flex w-full items-center justify-center rounded-full border border-white/80 bg-accent px-5 py-3 text-center text-[0.7rem] font-bold uppercase leading-snug tracking-wider text-white transition-colors hover:bg-accent-hover sm:w-auto sm:min-w-[200px] sm:px-6 sm:text-xs md:text-sm"
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

      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2 sm:bottom-8">
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
      className={`absolute top-1/2 z-20 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 min-[480px]:flex sm:size-11 md:size-12 ${
        direction === "prev" ? "left-2 sm:left-4 md:left-6" : "right-2 sm:right-4 md:right-6"
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
