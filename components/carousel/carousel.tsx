"use client";

import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const defaultOptions: EmblaOptionsType = {
  loop: true,
  align: "start",
};

type CarouselContextValue = {
  emblaRef: ReturnType<typeof useEmblaCarousel>[0];
  emblaApi: EmblaCarouselType | undefined;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  scrollPrev: () => void;
  scrollNext: () => void;
};

const CarouselContext = createContext<CarouselContextValue | null>(null);

export function useCarousel() {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within <Carousel>");
  }
  return context;
}

type CarouselProps = {
  children: ReactNode;
  options?: EmblaOptionsType;
};

export function Carousel({ children, options }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { ...defaultOptions, ...options },
    [],
  );
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateScrollState = useCallback((api: EmblaCarouselType) => {
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    updateScrollState(emblaApi);
    emblaApi.on("select", updateScrollState);
    emblaApi.on("reInit", updateScrollState);

    return () => {
      emblaApi.off("select", updateScrollState);
      emblaApi.off("reInit", updateScrollState);
    };
  }, [emblaApi, updateScrollState]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <CarouselContext.Provider
      value={{
        emblaRef,
        emblaApi,
        canScrollPrev,
        canScrollNext,
        scrollPrev,
        scrollNext,
      }}
    >
      {children}
    </CarouselContext.Provider>
  );
}

type CarouselViewportProps = {
  children: ReactNode;
  className?: string;
};

export function CarouselViewport({ children, className }: CarouselViewportProps) {
  const { emblaRef } = useCarousel();

  return (
    <div ref={emblaRef} className={mergeClass("overflow-hidden", className)}>
      {children}
    </div>
  );
}

type CarouselContainerProps = {
  children: ReactNode;
  className?: string;
};

export function CarouselContainer({
  children,
  className,
}: CarouselContainerProps) {
  return (
    <div className={mergeClass("flex touch-pan-y", className)}>{children}</div>
  );
}

type CarouselSlideProps = {
  children: ReactNode;
  className?: string;
  basisClassName?: string;
};

export function CarouselSlide({
  children,
  className,
  basisClassName = "basis-full",
}: CarouselSlideProps) {
  return (
    <div
      className={mergeClass(
        "min-w-0 shrink-0 grow-0",
        basisClassName,
        className,
      )}
    >
      {children}
    </div>
  );
}

type CarouselControlsProps = {
  className?: string;
  prevLabel?: string;
  nextLabel?: string;
};

export function CarouselControls({
  className,
  prevLabel = "Previous slide",
  nextLabel = "Next slide",
}: CarouselControlsProps) {
  const { canScrollPrev, canScrollNext, scrollPrev, scrollNext } =
    useCarousel();

  return (
    <div className={mergeClass("flex gap-2", className)}>
      <button
        type="button"
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        aria-label={prevLabel}
        className="rounded-full border border-surface-gray/40 px-4 py-2 text-sm text-accent transition-colors hover:border-accent hover:text-accent-hover disabled:cursor-not-allowed disabled:opacity-40"
      >
        Prev
      </button>
      <button
        type="button"
        onClick={scrollNext}
        disabled={!canScrollNext}
        aria-label={nextLabel}
        className="rounded-full border border-surface-gray/40 px-4 py-2 text-sm text-accent transition-colors hover:border-accent hover:text-accent-hover disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}

function mergeClass(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
