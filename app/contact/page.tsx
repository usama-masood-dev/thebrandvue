import type { Metadata } from "next";
import { InnerPageLayout } from "@/components/layout/inner-page-layout";
import { ContactPageContent } from "@/components/pages/contact-page-content";
import { contactPageContent } from "@/lib/content/contact-page";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Contact",
  description: contactPageContent.description,
};

export default function ContactPage() {
  return (
    <InnerPageLayout>
      <ContactPageContent />
    </InnerPageLayout>
  );
}
