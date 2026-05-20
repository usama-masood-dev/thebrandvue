import Link from "next/link";
import type { ReactNode } from "react";
import { PageHero } from "@/components/pages/page-hero";

export type InnerPageHeroContent = {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  titleSuffix?: string;
  description?: string;
};

type InnerPageShellProps = {
  hero: InnerPageHeroContent;
  children: ReactNode;
  /** Full-width sections below the hero (team grid, contact card, etc.) */
  fullBleed?: boolean;
};

/** Shared visual shell for inner pages: dark hero + consistent body spacing */
export function InnerPageShell({
  hero,
  children,
  fullBleed = false,
}: InnerPageShellProps) {
  return (
    <div className="min-w-0 bg-surface-dark">
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        titleAccent={hero.titleAccent}
        titleSuffix={hero.titleSuffix}
        description={hero.description}
        theme="dark"
      />
      {fullBleed ? (
        children
      ) : (
        <section className="relative overflow-x-clip py-12 sm:py-16 lg:py-20">
          <div
            className="pointer-events-none absolute -left-20 top-0 size-48 rounded-full bg-accent/10 blur-3xl sm:size-72"
            aria-hidden
          />
          <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </section>
      )}
    </div>
  );
}

export function InnerPageCta({ href, label }: { href: string; label: string }) {
  return (
    <div className="mt-12 flex justify-center sm:mt-14 lg:mt-16">
      <Link
        href={href}
        className="inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-surface-dark transition-colors hover:bg-accent-light"
      >
        {label}
      </Link>
    </div>
  );
}
