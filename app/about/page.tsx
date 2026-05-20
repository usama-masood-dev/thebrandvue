import type { Metadata } from "next";
import { InnerPageLayout } from "@/components/layout/inner-page-layout";
import { AboutPageContent } from "@/components/pages/about-page-content";
import { aboutPageContent } from "@/lib/content/about-page";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "About",
  description: aboutPageContent.description,
};

export default function AboutPage() {
  return (
    <InnerPageLayout>
      <AboutPageContent />
    </InnerPageLayout>
  );
}
