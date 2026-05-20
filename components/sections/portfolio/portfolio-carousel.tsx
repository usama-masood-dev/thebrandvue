"use client";

import {
  Carousel,
  CarouselContainer,
  CarouselSlide,
  CarouselViewport,
  useCarousel,
} from "@/components/carousel";
import { useEffect, useState } from "react";
import { FadeIn } from "@/components/motion/fade-in";
import type { PortfolioCardViewModel } from "@/lib/wordpress/mappers/portfolio";
import { PortfolioCard } from "./portfolio-card";

type PortfolioCarouselProps = {
  projects: PortfolioCardViewModel[];
};

const SLIDE_BASIS =
  "basis-[92%] pl-4 max-[380px]:basis-[88%] sm:basis-1/2 sm:pl-5 lg:basis-1/3";

export function PortfolioCarousel({ projects }: PortfolioCarouselProps) {
  return (
    <FadeIn className="mt-10 w-full min-w-0 sm:mt-12 lg:mt-14">
      <Carousel options={{ loop: false, align: "start", containScroll: "trimSnaps" }}>
        <div className="relative w-full min-w-0 px-1 sm:px-2">
          <CarouselViewport className="overflow-hidden">
            <CarouselContainer className="-ml-4 items-stretch sm:-ml-5">
              {projects.map((project) => (
                <CarouselSlide
                  key={project.id}
                  basisClassName={SLIDE_BASIS}
                  className="flex min-w-0"
                >
                  <div className="flex h-full w-full min-w-0">
                    <PortfolioCard project={project} />
                  </div>
                </CarouselSlide>
              ))}
            </CarouselContainer>
          </CarouselViewport>

          <CarouselArrows />
        </div>
        <CarouselDots />
      </Carousel>
    </FadeIn>
  );
}

function CarouselArrows() {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } = useCarousel();

  return (
    <>
      <Arrow direction="prev" onClick={scrollPrev} disabled={!canScrollPrev} />
      <Arrow direction="next" onClick={scrollNext} disabled={!canScrollNext} />
    </>
  );
}

function Arrow({
  direction,
  onClick,
  disabled,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
}) {
  const label =
    direction === "prev" ? "Previous projects" : "Next projects";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={`absolute top-[calc(50%-3rem)] z-10 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border border-surface-gray/30 bg-white text-surface-dark shadow-md transition-colors hover:border-accent/40 hover:text-accent disabled:cursor-not-allowed disabled:opacity-35 md:flex md:size-11 ${
        direction === "prev" ? "-left-1 lg:-left-5" : "-right-1 lg:-right-5"
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
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        )}
      </svg>
    </button>
  );
}

function CarouselDots() {
  const { emblaApi } = useCarousel();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  if (scrollSnaps.length <= 1) return null;

  return (
    <div className="mt-6 flex flex-wrap justify-center gap-2 sm:mt-8">
      {scrollSnaps.map((_, index) => (
        <button
          key={index}
          type="button"
          aria-label={`Go to project slide ${index + 1}`}
          onClick={() => emblaApi?.scrollTo(index)}
          className={`size-2.5 shrink-0 rounded-full p-0 transition-colors sm:size-3 ${
            index === selectedIndex
              ? "bg-accent"
              : "bg-surface-gray/35 hover:bg-surface-gray/55"
          }`}
        />
      ))}
    </div>
  );
}
