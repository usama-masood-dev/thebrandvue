"use client";

import Image from "next/image";
import { useState } from "react";
import type { TestimonialMedia } from "@/lib/wordpress/mappers/testimonials";
import { TestimonialVideoModal } from "./testimonial-video-modal";

type TestimonialMediaProps = {
  media: TestimonialMedia;
  clientName: string;
};

export function TestimonialMediaBlock({ media, clientName }: TestimonialMediaProps) {
  const badge =
    media.kind === "video"
      ? "Video"
      : media.kind === "image"
        ? "Review"
        : null;

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-surface-gray-soft">
      {badge ? (
        <span className="absolute left-3 top-3 z-10 rounded-full bg-surface-dark/75 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
          {badge}
        </span>
      ) : null}

      {media.kind === "video" ? (
        <VideoMedia media={media} clientName={clientName} />
      ) : null}
      {media.kind === "image" ? (
        <ImageMedia media={media} />
      ) : null}
      {media.kind === "placeholder" ? (
        <PlaceholderMedia name={clientName} />
      ) : null}
    </div>
  );
}

function VideoMedia({
  media,
  clientName,
}: {
  media: Extract<TestimonialMedia, { kind: "video" }>;
  clientName: string;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const poster = media.posterUrl ?? media.thumbnailUrl ?? null;

  return (
    <>
      {poster ? (
        // eslint-disable-next-line @next/next/no-img-element -- external YouTube/Vimeo poster URLs
        <img
          src={poster}
          alt=""
          className="size-full object-cover"
        />
      ) : (
        <div className="size-full bg-gradient-to-br from-surface-dark-soft to-surface-dark" />
      )}
      <div className="absolute inset-0 bg-surface-dark/25" aria-hidden />
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="absolute left-1/2 top-1/2 z-10 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-surface-dark shadow-lg transition-transform hover:scale-105 hover:bg-accent-light sm:size-16"
        aria-label={`Play video review from ${clientName}`}
      >
        <svg className="ml-0.5 size-6 sm:size-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M8 5v14l11-7z" />
        </svg>
      </button>

      <TestimonialVideoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        media={media}
        clientName={clientName}
      />
    </>
  );
}

function ImageMedia({
  media,
}: {
  media: Extract<TestimonialMedia, { kind: "image" }>;
}) {
  return (
    <Image
      src={media.imageUrl}
      alt={media.imageAlt}
      fill
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 480px"
      className="object-cover object-center"
    />
  );
}

function PlaceholderMedia({ name }: { name: string }) {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-surface-dark-soft to-surface-gray-soft text-surface-gray">
      <div className="flex size-14 items-center justify-center rounded-full border border-surface-gray/30 bg-white/80">
        <svg
          className="size-7 text-accent"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 0115 0"
          />
        </svg>
      </div>
      <p className="text-xs font-medium">{name}</p>
    </div>
  );
}
