import { contactSectionContent } from "@/lib/content/contact-section";
import { BriefcaseIcon, EnvelopeIcon, MapPinIcon } from "./contact-icons";

type ContactInfoPanelProps = {
  compact?: boolean;
};

export function ContactInfoPanel({ compact = false }: ContactInfoPanelProps) {
  const { eyebrow, title, titleLine2, description, channels } =
    contactSectionContent;
  return (
    <div className="flex h-full flex-col bg-surface-dark px-5 py-7 text-white sm:px-8 sm:py-10 lg:px-10 lg:py-12">
      {!compact ? (
        <div>
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-surface-gray sm:text-xs">
            {eyebrow}
          </p>
          <h2
            id="contact-heading"
            className="mt-3 font-display text-2xl font-semibold leading-tight sm:text-3xl lg:text-[2rem] lg:leading-[1.2]"
          >
            {title}
            <br />
            {titleLine2}
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/75 sm:text-[0.9375rem]">
            {description}
          </p>
        </div>
      ) : (
        <div>
          <h2 className="font-display text-lg font-semibold leading-tight sm:text-xl">
            Get in touch
          </h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-white/75">
            {description}
          </p>
        </div>
      )}

      <ul className={compact ? "mt-6 space-y-5 sm:mt-8" : "mt-8 space-y-6 sm:mt-10"}>
        {channels.map((channel) => (
          <li key={channel.id} className="flex gap-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-accent">
              {channel.id === "office" ? (
                <MapPinIcon className="size-5" />
              ) : channel.id === "careers" ? (
                <EnvelopeIcon className="size-5" />
              ) : (
                <BriefcaseIcon className="size-5" />
              )}
            </span>
            <div className="min-w-0">
              <p className="font-display text-sm font-semibold text-white sm:text-base">
                {channel.label}
              </p>
              {"email" in channel && channel.email ? (
                <a
                  href={`mailto:${channel.email}`}
                  className="mt-1 block text-sm text-white/70 transition-colors hover:text-accent"
                >
                  {channel.email}
                </a>
              ) : null}
              {"phone" in channel && channel.phone ? (
                <a
                  href={channel.phoneHref ?? `tel:${channel.phone.replace(/\s/g, "")}`}
                  className="mt-0.5 block text-sm text-white/70 transition-colors hover:text-accent"
                  {...(channel.phoneHref
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {channel.phone}
                </a>
              ) : null}
              {"address" in channel && channel.address ? (
                <p className="mt-1 text-sm leading-relaxed text-white/70">
                  {channel.address}
                </p>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
