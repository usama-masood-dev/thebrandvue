import { InnerPageShell } from "@/components/pages/inner-page-shell";
import { TeamSection } from "@/components/sections/team";
import { teamPageContent } from "@/lib/content/team-page";
import type { TeamMemberCardViewModel } from "@/lib/wordpress/mappers/team";

type TeamPageContentProps = {
  members: TeamMemberCardViewModel[];
};

export function TeamPageContent({ members }: TeamPageContentProps) {
  const { eyebrow, title, titleAccent, description } = teamPageContent;

  return (
    <InnerPageShell hero={{ eyebrow, title, titleAccent, description }} fullBleed>
      {members.length > 0 ? (
        <TeamSection members={members} standalone />
      ) : (
        <p className="px-4 py-16 text-center text-white/70 sm:px-6">
          Team profiles are coming soon.
        </p>
      )}
    </InnerPageShell>
  );
}
