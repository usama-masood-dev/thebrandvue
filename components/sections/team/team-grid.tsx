"use client";

import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";
import type { TeamMemberCardViewModel } from "@/lib/wordpress/mappers/team";
import { TeamCard } from "./team-card";

type TeamGridProps = {
  members: TeamMemberCardViewModel[];
};

function getGridLayoutClass(count: number): string {
  if (count === 1) {
    return "mx-auto w-full max-w-[20rem] sm:max-w-xs";
  }
  if (count === 2) {
    return "sm:grid-cols-2 lg:mx-auto lg:max-w-3xl";
  }
  return "sm:grid-cols-2 lg:grid-cols-3";
}

export function TeamGrid({ members }: TeamGridProps) {
  return (
    <StaggerChildren
      className={`mt-10 grid w-full grid-cols-1 items-stretch gap-4 sm:mt-14 sm:gap-5 md:gap-6 lg:mt-16 lg:gap-7 ${getGridLayoutClass(members.length)}`}
      stagger={0.08}
    >
      {members.map((member) => (
        <StaggerItem key={member.id} className="h-full min-w-0">
          <TeamCard member={member} />
        </StaggerItem>
      ))}
    </StaggerChildren>
  );
}
