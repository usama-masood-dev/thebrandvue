"use client";

import Image from "next/image";
import Link from "next/link";
import type { ServiceCardViewModel } from "@/lib/wordpress/mappers/services";

type ServiceCardProps = {
  service: ServiceCardViewModel;
};

function ServiceIconFallback({ title }: { title: string }) {
  return (
    <div
      className="flex size-12 items-center justify-center rounded-xl bg-accent/15 text-accent sm:size-14"
      aria-hidden
    >
      <svg
        className="size-6 sm:size-7"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
        />
      </svg>
      <span className="sr-only">{title}</span>
    </div>
  );
}

export function ServiceCard({ service }: ServiceCardProps) {
  const isExternal = /^https?:\/\//i.test(service.href);

  return (
    <article
      className="group relative flex h-full min-h-[20rem] flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-[border-color,background-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-accent/35 hover:bg-white/[0.07] hover:shadow-[0_20px_40px_-24px_rgba(7,188,174,0.35)] sm:min-h-[22rem] sm:p-7"
    >
      <div
        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:inset-x-7"
        aria-hidden
      />

      <div className="mb-5 flex items-start justify-between gap-4">
        {service.iconUrl ? (
          <div className="relative size-12 shrink-0 overflow-hidden rounded-xl bg-accent/10 p-2 sm:size-14">
            <Image
              src={service.iconUrl}
              alt={service.iconAlt}
              fill
              sizes="56px"
              className="object-contain object-center"
            />
          </div>
        ) : (
          <ServiceIconFallback title={service.title} />
        )}
      </div>

      <h3 className="font-display text-xl font-semibold leading-snug text-white sm:text-[1.35rem]">
        {service.title}
      </h3>

      <p className="mt-3 line-clamp-4 flex-1 text-sm leading-relaxed text-white/70 sm:text-[0.95rem]">
        {service.description}
      </p>

      <Link
        href={service.href}
        {...(isExternal
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-accent transition-colors hover:text-accent-light"
      >
        Learn more
        <svg
          className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 8h10M9 4l4 4-4 4"
          />
        </svg>
      </Link>
    </article>
  );
}
