import Image from "next/image";
import type { TeamMemberCardViewModel } from "@/lib/wordpress/mappers/team";

type TeamCardProps = {
  member: TeamMemberCardViewModel;
  /** Horizontal, shorter card for mobile carousel */
  compact?: boolean;
};

export function TeamCard({ member, compact = false }: TeamCardProps) {
  if (compact) {
    return (
      <article className="group flex h-full max-h-[8.75rem] w-full min-w-0 flex-row items-stretch overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] transition-[border-color,box-shadow] duration-300 hover:border-accent/35 sm:rounded-2xl">
        <div className="relative aspect-square h-full w-[34%] min-w-[6.5rem] max-w-[7.5rem] shrink-0 overflow-hidden rounded-l-xl bg-surface-dark-soft">
          {member.photoUrl ? (
            <Image
              src={member.photoUrl}
              alt={member.photoAlt}
              fill
              sizes="120px"
              className="object-cover object-top"
            />
          ) : (
            <div className="flex size-full items-center justify-center bg-gradient-to-br from-surface-dark via-surface-dark-soft to-surface-dark">
              <span className="flex size-10 items-center justify-center rounded-full border border-accent/30 bg-accent/10 font-display text-sm font-semibold text-accent">
                {member.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </span>
            </div>
          )}
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-center px-3 py-2.5">
          <h3 className="font-display text-sm font-semibold leading-snug text-white">
            {member.name}
          </h3>
          <p className="mt-0.5 text-[0.6rem] font-semibold uppercase leading-snug tracking-[0.1em] text-accent">
            {member.position}
          </p>
          <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-white/70">
            {member.bio}
          </p>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex h-full w-full min-w-0 flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] transition-[border-color,box-shadow,transform] duration-300 hover:border-accent/35 hover:shadow-[0_20px_40px_-24px_rgba(7,188,174,0.35)] sm:rounded-2xl sm:hover:-translate-y-1">
      <div className="relative aspect-[3/4] w-full shrink-0 overflow-hidden bg-surface-dark-soft sm:aspect-[4/5]">
        <div
          className="pointer-events-none absolute -inset-px z-10 bg-gradient-to-b from-accent/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden
        />
        {member.photoUrl ? (
          <Image
            src={member.photoUrl}
            alt={member.photoAlt}
            fill
            sizes="(max-width: 480px) 90vw, (max-width: 768px) 45vw, 320px"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-gradient-to-br from-surface-dark via-surface-dark-soft to-surface-dark">
            <span className="flex size-16 items-center justify-center rounded-full border border-accent/30 bg-accent/10 font-display text-xl font-semibold text-accent sm:size-20 sm:text-2xl">
              {member.name
                .split(" ")
                .map((part) => part[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </span>
          </div>
        )}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-surface-dark/70 to-transparent"
          aria-hidden
        />
      </div>

      <div className="flex min-h-[9.5rem] flex-1 flex-col p-4 sm:min-h-[10rem] sm:p-5 md:p-6">
        <h3 className="font-display text-base font-semibold leading-snug text-white sm:text-lg md:text-xl">
          {member.name}
        </h3>
        <p className="mt-1.5 text-[0.65rem] font-semibold uppercase leading-snug tracking-[0.12em] text-accent sm:text-xs sm:tracking-[0.14em]">
          {member.position}
        </p>
        <p className="mt-2.5 line-clamp-4 flex-1 text-[0.8125rem] leading-relaxed text-white/70 sm:mt-3 sm:line-clamp-3 sm:text-sm">
          {member.bio}
        </p>
      </div>
    </article>
  );
}
