import Link from "next/link";
import { HeaderLogo } from "@/components/layout/header/header-logo";
import { BRAND_NAME, BRAND_TAGLINE } from "@/lib/brand";
import { contactSectionContent } from "@/lib/content/contact-section";
import { footerContent } from "@/lib/content/footer";
import { FooterSocialLinks } from "./footer-social-links";

function FooterLinkColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/90">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-white/65 transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  const { cta, tagline, copyright, linkGroups, legalLinks, socialLinks } =
    footerContent;
  const businessChannel = contactSectionContent.channels.find(
    (c) => c.id === "business",
  );
  const officeChannel = contactSectionContent.channels.find(
    (c) => c.id === "office",
  );

  return (
    <footer
      className="relative overflow-x-clip border-t border-white/10 bg-surface-dark text-white"
      role="contentinfo"
    >
      <div
        className="pointer-events-none absolute -left-24 top-0 size-64 rounded-full bg-accent/8 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-0 size-48 rounded-full bg-accent/5 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-12">
          <div className="min-w-0 sm:col-span-2 lg:col-span-4">
            <HeaderLogo variant="dark" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
              {BRAND_TAGLINE}. {tagline}.
            </p>
            <Link
              href={cta.href}
              className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-surface-dark transition-colors hover:bg-accent-light"
            >
              {cta.label}
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:col-span-2 lg:col-span-4">
            {linkGroups.map((group) => (
              <FooterLinkColumn
                key={group.title}
                title={group.title}
                links={group.links}
              />
            ))}
          </div>

          <div className="min-w-0 sm:col-span-2 lg:col-span-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/90">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-white/65">
              {businessChannel && "email" in businessChannel ? (
                <li>
                  <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-surface-gray">
                    Email
                  </span>
                  <a
                    href={`mailto:${businessChannel.email}`}
                    className="mt-0.5 inline-block transition-colors hover:text-accent"
                  >
                    {businessChannel.email}
                  </a>
                </li>
              ) : null}
              {businessChannel && "phone" in businessChannel ? (
                <li>
                  <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-surface-gray">
                    Phone
                  </span>
                  <a
                    href={
                      businessChannel.phoneHref ??
                      `tel:${businessChannel.phone.replace(/\s/g, "")}`
                    }
                    className="mt-0.5 inline-block transition-colors hover:text-accent"
                    {...(businessChannel.phoneHref
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {businessChannel.phone}
                  </a>
                </li>
              ) : null}
              {officeChannel && "address" in officeChannel ? (
                <li>
                  <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-surface-gray">
                    Office
                  </span>
                  <span className="mt-0.5 block leading-relaxed">
                    {officeChannel.address}
                  </span>
                </li>
              ) : null}
            </ul>

            <div className="mt-8">
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/90">
                Follow us
              </h3>
              <div className="mt-4">
                <FooterSocialLinks links={socialLinks} />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between lg:mt-14">
          <p className="text-xs text-white/50">{copyright}</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-xs text-white/50 transition-colors hover:text-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="#top"
                className="text-xs text-white/50 transition-colors hover:text-accent"
              >
                Back to top
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
