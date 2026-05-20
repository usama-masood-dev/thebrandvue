"use client";

import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import type { TestimonialVideoMedia } from "@/lib/wordpress/mappers/testimonials";

type TestimonialVideoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  media: TestimonialVideoMedia;
  clientName: string;
};

export function TestimonialVideoModal({
  isOpen,
  onClose,
  media,
  clientName,
}: TestimonialVideoModalProps) {
  const titleId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === "undefined") return null;

  const embedSrc =
    media.provider === "file"
      ? media.embedUrl
      : `${media.embedUrl}${media.embedUrl.includes("?") ? "&" : "?"}autoplay=1`;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-surface-dark/88 backdrop-blur-sm"
        aria-label="Close video"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 w-full max-w-4xl"
      >
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-surface-dark shadow-2xl">
          <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3 sm:px-5">
            <p
              id={titleId}
              className="font-display text-sm font-semibold text-white sm:text-base"
            >
              Video review — {clientName}
            </p>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-accent/50 hover:bg-white/10"
              aria-label="Close video player"
            >
              <svg
                className="size-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="relative aspect-video w-full bg-black">
            {media.provider === "file" ? (
              <video
                key={embedSrc}
                className="size-full"
                src={embedSrc}
                controls
                playsInline
                autoPlay
                poster={media.posterUrl ?? undefined}
              />
            ) : (
              <iframe
                key={embedSrc}
                src={embedSrc}
                title={`Video review from ${clientName}`}
                className="size-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
