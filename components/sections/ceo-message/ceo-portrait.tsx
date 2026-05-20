"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "motion/react";

type CeoPortraitProps = {
  src: string;
  alt: string;
  className?: string;
};

export function CeoPortrait({ src, alt, className }: CeoPortraitProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -28 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-64px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className={`relative mx-auto w-full min-w-0 max-w-[16.5rem] min-[380px]:max-w-[18rem] sm:max-w-[20rem] lg:mx-0 lg:max-w-[22rem] ${className ?? ""}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-1.5 rounded-[1.2rem] bg-gradient-to-br from-accent/35 via-accent-light/15 to-transparent opacity-80 blur-md sm:-inset-2 sm:rounded-[1.35rem]"
        aria-hidden
        animate={{ opacity: [0.65, 0.9, 0.65] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-accent/30 bg-surface-dark shadow-[0_20px_40px_-20px_rgba(5,8,14,0.5)] sm:rounded-2xl sm:shadow-[0_24px_48px_-24px_rgba(5,8,14,0.55)] lg:max-h-[28rem]">
        <motion.div
          className="absolute inset-x-0 top-0 z-10 h-1 bg-gradient-to-r from-accent via-accent-light to-accent/40"
          aria-hidden
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          style={{ transformOrigin: "left" }}
        />
        {!hasError ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 640px) 75vw, (max-width: 1024px) 320px, 352px"
            className="object-cover object-[center_18%] sm:object-[center_20%] lg:object-top"
            onError={() => setHasError(true)}
          />
        ) : (
          <PortraitPlaceholder name={alt} />
        )}
        <motion.div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface-dark/50 via-transparent to-transparent"
          aria-hidden
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
        />
      </div>
    </motion.div>
  );
}

function PortraitPlaceholder({ name }: { name: string }) {
  return (
    <div className="flex aspect-[4/5] flex-col items-center justify-center gap-3 bg-gradient-to-br from-surface-dark via-surface-dark-soft to-surface-dark px-6 text-center">
      <div className="flex size-16 items-center justify-center rounded-full border border-accent/35 bg-accent/10 sm:size-20">
        <svg
          className="size-8 text-accent sm:size-10"
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
      <p className="text-sm text-surface-gray">Portrait unavailable</p>
      <p className="max-w-[12rem] text-xs text-surface-gray/80">{name}</p>
    </div>
  );
}
