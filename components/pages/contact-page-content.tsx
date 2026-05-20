import { InnerPageShell } from "@/components/pages/inner-page-shell";
import { ContactSection } from "@/components/sections/contact";
import { contactPageContent } from "@/lib/content/contact-page";

export function ContactPageContent() {
  const { eyebrow, title, description } = contactPageContent;

  return (
    <InnerPageShell hero={{ eyebrow, title, description }} fullBleed>
      <ContactSection standalone />
    </InnerPageShell>
  );
}
