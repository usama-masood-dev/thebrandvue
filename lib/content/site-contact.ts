/** Canonical contact & social URLs (from previous site) */
export const siteContact = {
  email: "info@thebrandvue.com",
  phone: "+92 333 4398684",
  phoneTel: "+923334398684",
  whatsapp: {
    /** E.164 without + for wa.me */
    number: "923334398684",
    shortLink: "https://wa.link/ysae7h",
    defaultMessage:
      "Hi *TheBrandVue*! I need more info about TheBrandVue https://thebrandvue.com/",
  },
  office: "Karachi, Pakistan",
  siteUrl: "https://thebrandvue.com",
} as const;

export const siteSocialLinks = [
  {
    id: "facebook" as const,
    label: "Facebook",
    href: "https://www.facebook.com/thebrandvue?mibextid=ZbWKwL",
  },
  {
    id: "instagram" as const,
    label: "Instagram",
    href: "https://www.instagram.com/thebrandvue?igsh=MTdmbDlzN2NhNHpjYQ==",
  },
  {
    id: "linkedin" as const,
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/thebrandvue/",
  },
  {
    id: "whatsapp" as const,
    label: "WhatsApp",
    href: siteContact.whatsapp.shortLink,
  },
] as const;

export function buildWhatsAppChatUrl(message = siteContact.whatsapp.defaultMessage) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${siteContact.whatsapp.number}?text=${text}`;
}
