"use client";

import { FadeIn } from "@/components/motion/fade-in";
import { teamSectionContent } from "@/lib/content/team-section";
import type { TeamMemberCardViewModel } from "@/lib/wordpress/mappers/team";
import { TeamCarousel } from "./team-carousel";
import { TeamGrid } from "./team-grid";

type TeamSectionProps = {
  members: TeamMemberCardViewModel[];
  /** Used on /team — skips section header (page hero above) */
  standalone?: boolean;
};

export function TeamSection({ members, standalone = false }: TeamSectionProps) {
  if (members.length === 0) return null;

  const { eyebrow, title, titleAccent, description, gridMaxCount } =
    teamSectionContent;
  const useDesktopCarousel = members.length > gridMaxCount;

  return (
    <section
      id={standalone ? undefined : "team"}
      className={`relative overflow-x-clip bg-surface-dark ${
        standalone ? "py-10 sm:py-14 lg:py-16" : "py-12 sm:py-20 lg:py-28"
      }`}
      aria-labelledby={standalone ? undefined : "team-heading"}
    >
      <div
        className="pointer-events-none absolute -left-20 top-1/4 size-48 rounded-full bg-accent/10 blur-3xl sm:size-80"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-0 size-40 rounded-full bg-accent/5 blur-3xl sm:size-64"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {!standalone ? (
          <div className="mx-auto w-full max-w-2xl px-1 text-center sm:px-0">
            <FadeIn y={16}>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-surface-gray sm:text-xs sm:tracking-[0.2em]">
                {eyebrow}
              </p>
              <h2
                id="team-heading"
                className="mt-3 font-display text-[1.65rem] font-semibold leading-tight text-white sm:text-4xl lg:text-[2.5rem] lg:leading-[1.15]"
              >
                {title}{" "}
                <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
                  {titleAccent}
                </span>
              </h2>
              <p className="mt-3 text-pretty text-sm leading-relaxed text-white/75 sm:mt-4 sm:text-base md:text-lg">
                {description}
              </p>
            </FadeIn>
          </div>
        ) : null}

        {/* Mobile: always carousel (compact cards) — saves vertical space */}
        <TeamCarousel
          members={members}
          compact
          className={standalone ? "mt-0 md:hidden" : "md:hidden"}
        />

        {/* Tablet+: grid when few members, carousel when many */}
        <div className="hidden md:block">
          {useDesktopCarousel ? (
            <TeamCarousel members={members} />
          ) : (
            <TeamGrid members={members} />
          )}
        </div>
      </div>
    </section>
  );
}
