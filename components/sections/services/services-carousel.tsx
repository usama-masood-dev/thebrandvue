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
import type { ServiceCardViewModel } from "@/lib/wordpress/mappers/services";
import { ServiceCard } from "./service-card";

type ServicesCarouselProps = {
  services: ServiceCardViewModel[];
};

export function ServicesCarousel({ services }: ServicesCarouselProps) {
  return (
    <FadeIn className="mt-12 sm:mt-14 lg:mt-16">
      <Carousel options={{ loop: false, align: "start", containScroll: "trimSnaps" }}>
        <div className="relative">
          <CarouselViewport className="mx-0">
            <CarouselContainer className="-ml-4 items-stretch sm:-ml-5">
              {services.map((service) => (
                <CarouselSlide
                  key={service.id}
                  basisClassName="basis-full pl-4 sm:basis-1/2 sm:pl-5 lg:basis-1/3"
                  className="flex"
                >
                  <div className="flex h-full w-full min-w-0">
                    <ServiceCard service={service} />
                  </div>
                </CarouselSlide>
              ))}
            </CarouselContainer>
          </CarouselViewport>

          <ServicesCarouselArrows />
        </div>
        <ServicesCarouselDots />
      </Carousel>
    </FadeIn>
  );
}

function ServicesCarouselArrows() {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } = useCarousel();

  return (
    <>
      <CarouselArrow
        direction="prev"
        onClick={scrollPrev}
        disabled={!canScrollPrev}
      />
      <CarouselArrow
        direction="next"
        onClick={scrollNext}
        disabled={!canScrollNext}
      />
    </>
  );
}

function CarouselArrow({
  direction,
  onClick,
  disabled,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
}) {
  const label =
    direction === "prev" ? "Previous services" : "Next services";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={`absolute top-1/2 z-10 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-surface-dark/80 text-white backdrop-blur-sm transition-colors hover:border-accent/50 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30 sm:flex sm:size-11 ${
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

function ServicesCarouselDots() {
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
    <div className="mt-8 flex justify-center gap-2">
      {scrollSnaps.map((_, index) => (
        <button
          key={index}
          type="button"
          aria-label={`Go to services slide ${index + 1}`}
          onClick={() => emblaApi?.scrollTo(index)}
          className={`size-2.5 rounded-full transition-colors ${
            index === selectedIndex
              ? "bg-accent"
              : "bg-white/30 hover:bg-white/50"
          }`}
        />
      ))}
    </div>
  );
}
