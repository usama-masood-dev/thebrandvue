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
import type { TeamMemberCardViewModel } from "@/lib/wordpress/mappers/team";
import { TeamCard } from "./team-card";

type TeamCarouselProps = {
  members: TeamMemberCardViewModel[];
  /** One compact horizontal card per swipe (mobile) */
  compact?: boolean;
  className?: string;
};

/** Slide width per breakpoint: peek on mobile, 2-up tablet, 3-up desktop */
const SLIDE_BASIS_DESKTOP =
  "basis-[min(100%,20rem)] pl-3 max-[380px]:basis-[92%] sm:basis-1/2 sm:pl-4 md:pl-5 lg:basis-1/3";

const SLIDE_BASIS_MOBILE = "basis-[92%] pl-3 max-[380px]:basis-[88%]";

export function TeamCarousel({
  members,
  compact = false,
  className,
}: TeamCarouselProps) {
  const slideBasis = compact ? SLIDE_BASIS_MOBILE : SLIDE_BASIS_DESKTOP;
  const fadeInClass = compact
    ? `mt-8 w-full min-w-0 ${className ?? ""}`
    : `mt-10 w-full min-w-0 sm:mt-14 lg:mt-16 ${className ?? ""}`;

  return (
    <FadeIn className={fadeInClass.trim()}>
      <Carousel options={{ loop: false, align: "start", containScroll: "trimSnaps" }}>
        <div className="relative w-full min-w-0 -mx-1 px-1 sm:mx-0 sm:px-2">
          <CarouselViewport className="overflow-hidden">
            <CarouselContainer className="-ml-3 items-stretch sm:-ml-4 md:-ml-5">
              {members.map((member) => (
                <CarouselSlide
                  key={member.id}
                  basisClassName={slideBasis}
                  className="flex min-w-0"
                >
                  <div className="flex h-full w-full min-w-0 max-w-full">
                    <TeamCard member={member} compact={compact} />
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
  const label = direction === "prev" ? "Previous team members" : "Next team members";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={`absolute top-[calc(50%-2.75rem)] z-10 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-surface-dark/90 text-white shadow-md backdrop-blur-sm transition-colors hover:border-accent/50 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30 md:flex md:size-11 ${
        direction === "prev"
          ? "left-0 md:-left-3 lg:-left-5"
          : "right-0 md:-right-3 lg:-right-5"
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
          aria-label={`Go to team slide ${index + 1}`}
          onClick={() => emblaApi?.scrollTo(index)}
          className={`size-2.5 shrink-0 rounded-full p-0 transition-colors sm:size-3 ${
            index === selectedIndex
              ? "bg-accent"
              : "bg-white/30 hover:bg-white/50"
          }`}
        />
      ))}
    </div>
  );
}
