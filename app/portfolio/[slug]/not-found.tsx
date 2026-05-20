import Link from "next/link";
import { InnerPageLayout } from "@/components/layout/inner-page-layout";

export default function PortfolioNotFound() {
  return (
    <InnerPageLayout>
      <div className="flex min-h-[60vh] flex-col items-center justify-center bg-surface-white px-4 py-12 text-center">
        <h1 className="font-display text-3xl font-semibold text-surface-dark">
          Project not found
        </h1>
        <p className="mt-3 max-w-md text-muted-foreground">
          This case study may have been removed or the link is incorrect.
        </p>
        <Link
          href="/portfolio"
          className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wider text-surface-dark transition-colors hover:bg-accent-light"
        >
          View portfolio
        </Link>
      </div>
    </InnerPageLayout>
  );
}
