import Link from "next/link";
import { InnerPageShell } from "@/components/pages/inner-page-shell";
import type { ServiceDetailViewModel } from "@/lib/wordpress/mappers/services";

type ServiceDetailContentProps = {
  service: ServiceDetailViewModel;
};

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export function ServiceDetailContent({ service }: ServiceDetailContentProps) {
  const html = service.contentHtml.trim();
  const plainBody = stripHtml(html);
  const plainDescription = service.description.trim();
  const hasHtmlBody = plainBody.length > 0;

  return (
    <InnerPageShell
      hero={{
        eyebrow: "Services",
        title: service.title,
      }}
      fullBleed
    >
      <article className="overflow-x-clip bg-surface-white pb-12 pt-8 sm:pb-16 sm:pt-10 lg:pb-20 lg:pt-12">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/services"
            className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-surface-gray transition-colors hover:text-accent"
          >
            <span aria-hidden>←</span>
            All services
          </Link>

          <div className="mx-auto mt-8 max-w-3xl lg:mt-10">
            {hasHtmlBody ? (
              <div
                className="prose-portfolio prose-service min-w-0 break-words"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            ) : (
              <p className="text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                {plainDescription}
              </p>
            )}
          </div>

          <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-3 sm:mt-12 sm:flex-row sm:flex-wrap">
            <Link
              href="/contact"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-7 py-3 text-sm font-bold uppercase tracking-wider text-surface-dark transition-colors hover:bg-accent-light sm:min-w-[14rem]"
            >
              Discuss your project
            </Link>
            {service.isExternalLink ? (
              <a
                href={service.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-surface-gray/25 px-7 py-3 text-sm font-bold uppercase tracking-wider text-surface-dark transition-colors hover:border-accent/40 hover:text-accent sm:min-w-[14rem]"
              >
                Learn more
              </a>
            ) : null}
          </div>
        </div>
      </article>
    </InnerPageShell>
  );
}
