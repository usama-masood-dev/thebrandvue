import { getTeams } from "./api";
import {
  mapTeamMembersToCards,
  type TeamMemberCardViewModel,
} from "./mappers/team";

export async function getTeamForSection(): Promise<TeamMemberCardViewModel[]> {
  try {
    const data = await getTeams({ teamsFirst: 24 });
    return mapTeamMembersToCards(data.teams.nodes);
  } catch (error) {
    console.error("[getTeamForSection]", error);
    return [];
  }
}
