import type { TeamMember } from "../types";

export type TeamMemberCardViewModel = {
  id: string;
  name: string;
  position: string;
  bio: string;
  photoUrl: string | null;
  photoAlt: string;
};

function stripHtml(value: string): string {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function mapTeamMemberToCard(
  member: TeamMember,
): TeamMemberCardViewModel | null {
  const name = member.title?.trim();
  const details = member.teamDetails;
  if (!name || !details) return null;

  const position = details.position?.trim() || "Team member";
  const rawBio =
    stripHtml(details.bio?.trim() ?? "") ||
    stripHtml(member.slug?.replace(/-/g, " ") ?? "");

  const photo = details.photo?.node;

  return {
    id: member.id,
    name,
    position,
    bio: rawBio || `Part of the team driving results at The Brand Vue.`,
    photoUrl: photo?.sourceUrl ?? null,
    photoAlt: photo?.altText?.trim() || name,
  };
}

export function mapTeamMembersToCards(
  members: TeamMember[],
): TeamMemberCardViewModel[] {
  return members
    .map(mapTeamMemberToCard)
    .filter((card): card is TeamMemberCardViewModel => card !== null);
}
