import { siteContact } from "@/lib/content/site-contact";

export const contactSectionContent = {
  eyebrow: "Let's talk",
  title: "Want to hire us?",
  titleLine2: "Let's build together",
  description:
    "Join us on an epic journey of innovation. Reach out for business inquiries, partnerships, or careers — we usually respond within 24 hours.",
  channels: [
    {
      id: "business",
      label: "Business",
      email: siteContact.email,
      phone: siteContact.phone,
      phoneHref: siteContact.whatsapp.shortLink,
    },
    {
      id: "careers",
      label: "Careers",
      email: siteContact.email,
    },
    {
      id: "office",
      label: "Office",
      address: siteContact.office,
    },
  ],
  form: {
    title: "Request a Proposal",
    submitLabel: "Send Request",
    budgetOptions: [
      { value: "", label: "Select estimated budget" },
      { value: "under-5k", label: "Under $5,000" },
      { value: "5k-15k", label: "$5,000 – $15,000" },
      { value: "15k-50k", label: "$15,000 – $50,000" },
      { value: "50k-plus", label: "$50,000+" },
      { value: "undisclosed", label: "Prefer not to say" },
    ],
    fields: {
      name: "Full Name",
      email: "Email Address",
      phone: "Phone Number",
      budget: "Estimated Budget",
      requirements: "Requirements",
      requirementsPlaceholder: "Tell us about your requirements",
    },
  },
  successMessage:
    "Thank you! We received your request and will get back to you within 24 hours.",
} as const;
