import { TEAM_DETAILS_FIELDS } from "./fragments";
import type { TeamMember } from "../types";

export const TEAMS_QUERY = /* GraphQL */ `
  query Teams($teamsFirst: Int = 24) {
    teams(first: $teamsFirst, where: { status: PUBLISH, orderby: { field: DATE, order: DESC } }) {
      nodes {
        id
        title
        slug
        teamDetails {
          ${TEAM_DETAILS_FIELDS}
        }
      }
    }
  }
`;

export type TeamsQueryVariables = {
  teamsFirst?: number;
};

export type TeamsData = {
  teams: { nodes: TeamMember[] };
};
