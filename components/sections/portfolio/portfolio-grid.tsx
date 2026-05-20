"use client";

import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";
import type { PortfolioCardViewModel } from "@/lib/wordpress/mappers/portfolio";
import { PortfolioCard } from "./portfolio-card";

type PortfolioGridProps = {
  projects: PortfolioCardViewModel[];
};

export function PortfolioGrid({ projects }: PortfolioGridProps) {
  return (
    <StaggerChildren
      className="grid items-stretch gap-5 sm:grid-cols-2 sm:gap-6 lg:gap-7 xl:grid-cols-3"
      stagger={0.08}
    >
      {projects.map((project) => (
        <StaggerItem key={project.id} className="h-full">
          <PortfolioCard project={project} />
        </StaggerItem>
      ))}
    </StaggerChildren>
  );
}
