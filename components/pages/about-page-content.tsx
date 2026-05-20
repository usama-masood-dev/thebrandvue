import { InnerPageShell } from "@/components/pages/inner-page-shell";
import { CeoMessageSection } from "@/components/sections/ceo-message";
import { ProcessSection } from "@/components/sections/process";
import { aboutPageContent } from "@/lib/content/about-page";

export function AboutPageContent() {
  const { eyebrow, title, titleAccent, description } = aboutPageContent;

  return (
    <InnerPageShell hero={{ eyebrow, title, titleAccent, description }} fullBleed>
      <CeoMessageSection standalone />
      <ProcessSection standalone />
    </InnerPageShell>
  );
}
