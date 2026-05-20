import type { ReactNode } from "react";
import { StickyHeader } from "@/components/layout/header";
import { SITE_HEADER_OFFSET_CLASS } from "@/components/layout/header/header-shell";

type InnerPageLayoutProps = {
  children: ReactNode;
};

/** Standard layout for inner pages: fixed header + main cleared below it */
export function InnerPageLayout({ children }: InnerPageLayoutProps) {
  return (
    <>
      <StickyHeader visible />
      <main className={SITE_HEADER_OFFSET_CLASS}>{children}</main>
    </>
  );
}
