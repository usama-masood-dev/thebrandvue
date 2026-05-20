import Image from "next/image";
import Link from "next/link";
import type { PortfolioCardViewModel } from "@/lib/wordpress/mappers/portfolio";

type PortfolioCardProps = {
  project: PortfolioCardViewModel;
};

export function PortfolioCard({ project }: PortfolioCardProps) {
  return (
    <article
      className={`group relative flex h-full min-h-[22rem] flex-col overflow-hidden rounded-2xl border bg-white shadow-[0_16px_40px_-28px_rgba(5,8,14,0.18)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgba(5,8,14,0.22)] sm:min-h-[24rem] ${
        project.isFeatured
          ? "border-accent/45 ring-2 ring-accent/15"
          : "border-surface-gray/20 hover:border-accent/35"
      }`}
    >
      <Link href={project.href} className="flex h-full flex-col">
        <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-surface-dark-soft">
          {project.isFeatured ? (
            <span className="absolute left-3 top-3 z-20 rounded-full bg-accent px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-surface-dark shadow-sm">
              Featured
            </span>
          ) : null}

          {project.imageUrl ? (
            <Image
              src={project.imageUrl}
              alt={project.imageAlt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
          ) : (
            <div className="flex size-full items-center justify-center bg-gradient-to-br from-surface-dark via-surface-dark-soft to-surface-dark">
              <span className="font-display text-lg font-semibold text-white/80">
                {project.title}
              </span>
            </div>
          )}

          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface-dark/55 via-transparent to-transparent opacity-80"
            aria-hidden
          />
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-surface-gray">
            {project.clientName ? <span>{project.clientName}</span> : null}
            {project.clientName && project.completedYear ? (
              <span className="text-surface-gray/50" aria-hidden>
                ·
              </span>
            ) : null}
            {project.completedYear ? <span>{project.completedYear}</span> : null}
          </div>

          <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-surface-dark sm:text-xl">
            {project.title}
          </h3>

          <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
            {project.excerpt}
          </p>

          <p className="mt-4 text-sm font-semibold text-accent transition-colors group-hover:text-accent-hover">
            View case study
            <span className="ml-1 inline-block transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </p>
        </div>
      </Link>
    </article>
  );
}
