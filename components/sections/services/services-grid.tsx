"use client";

import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";
import type { ServiceCardViewModel } from "@/lib/wordpress/mappers/services";
import { ServiceCard } from "./service-card";

type ServicesGridProps = {
  services: ServiceCardViewModel[];
};

export function ServicesGrid({ services }: ServicesGridProps) {
  return (
    <StaggerChildren
      className={`grid items-stretch gap-5 sm:grid-cols-2 sm:gap-6 lg:gap-7 ${
        services.length <= 2
          ? "lg:mx-auto lg:max-w-3xl lg:grid-cols-2"
          : "lg:grid-cols-3"
      }`}
      stagger={0.08}
    >
      {services.map((service) => (
        <StaggerItem key={service.id} className="h-full">
          <ServiceCard service={service} />
        </StaggerItem>
      ))}
    </StaggerChildren>
  );
}
