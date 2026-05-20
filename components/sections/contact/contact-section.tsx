"use client";

import { FadeIn } from "@/components/motion/fade-in";
import { ContactForm } from "./contact-form";
import { ContactInfoPanel } from "./contact-info-panel";

type ContactSectionProps = {
  standalone?: boolean;
};

export function ContactSection({ standalone = false }: ContactSectionProps) {
  return (
    <section
      id={standalone ? undefined : "contact"}
      className={`relative overflow-x-clip ${
        standalone
          ? "px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-14"
          : "bg-surface-gray-soft py-12 sm:py-16 lg:py-24"
      }`}
      aria-labelledby={standalone ? undefined : "contact-heading"}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-surface-gray/25 to-transparent" />

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn y={20}>
          <div className="overflow-hidden rounded-2xl border border-surface-gray/15 bg-surface-white shadow-[0_24px_64px_-32px_rgba(5,8,14,0.2)] sm:rounded-3xl">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-stretch">
              <ContactInfoPanel compact={standalone} />
              <ContactForm />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
