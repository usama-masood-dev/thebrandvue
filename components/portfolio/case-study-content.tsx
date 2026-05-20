import Image from "next/image";
import Link from "next/link";
import { InnerPageShell } from "@/components/pages/inner-page-shell";
import type { PortfolioCaseStudyViewModel } from "@/lib/wordpress/mappers/portfolio";

type CaseStudyContentProps = {
  project: PortfolioCaseStudyViewModel;
};

export function CaseStudyContent({ project }: CaseStudyContentProps) {
  const metaParts = [project.clientName, project.completedYear].filter(Boolean);

  return (
    <InnerPageShell
      hero={{
        eyebrow: "Portfolio",
        title: project.title,
        description: project.excerpt ?? undefined,
      }}
      fullBleed
    >
      <article className="bg-surface-white pb-16 pt-10 sm:pb-20 sm:pt-12 lg:pb-24">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-semibold text-surface-gray transition-colors hover:text-accent"
          >
            <span aria-hidden>←</span>
            Back to portfolio
          </Link>

          {metaParts.length > 0 || project.isFeatured ? (
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {project.isFeatured ? (
                <span className="rounded-full bg-accent px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-surface-dark">
                  Featured
                </span>
              ) : null}
              {metaParts.length > 0 ? (
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-surface-gray">
                  {metaParts.join(" · ")}
                </p>
              ) : null}
            </div>
          ) : null}

          {project.imageUrl ? (
            <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-surface-gray/15 bg-surface-dark-soft shadow-[0_24px_48px_-28px_rgba(5,8,14,0.25)] sm:mt-12">
              <Image
                src={project.imageUrl}
                alt={project.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-cover"
                priority
              />
            </div>
          ) : null}

          {project.contentHtml ? (
            <div
              className="prose-portfolio mt-10 max-w-3xl sm:mt-12"
              dangerouslySetInnerHTML={{ __html: project.contentHtml }}
            />
          ) : null}

          {project.galleryImages.length > 0 ? (
            <ul className="mt-12 grid list-none grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-6">
              {project.galleryImages.map((image, index) => (
                <li
                  key={`${image.sourceUrl}-${index}`}
                  className="relative aspect-[4/3] overflow-hidden rounded-xl border border-surface-gray/15 bg-surface-gray-soft"
                >
                  <Image
                    src={image.sourceUrl}
                    alt={image.altText}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover"
                  />
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-12 flex flex-wrap gap-4 sm:mt-14">
            <Link
              href="/contact"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wider text-surface-dark transition-colors hover:bg-accent-light"
            >
              Start a similar project
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-surface-gray/30 px-6 py-3 text-sm font-bold uppercase tracking-wider text-surface-dark transition-colors hover:border-accent/50 hover:text-accent"
            >
              More work
            </Link>
          </div>
        </div>
      </article>
    </InnerPageShell>
  );
}
