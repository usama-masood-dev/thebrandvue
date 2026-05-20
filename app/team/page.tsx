import type { Metadata } from "next";
import { InnerPageLayout } from "@/components/layout/inner-page-layout";
import { TeamPageContent } from "@/components/pages/team-page-content";
import { teamPageContent } from "@/lib/content/team-page";
import { getTeamForSection } from "@/lib/wordpress/get-team-for-section";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Team",
  description: teamPageContent.description,
};

export default async function TeamPage() {
  const members = await getTeamForSection();

  return (
    <InnerPageLayout>
      <TeamPageContent members={members} />
    </InnerPageLayout>
  );
}
