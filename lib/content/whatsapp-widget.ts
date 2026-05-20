import { BRAND_NAME } from "@/lib/brand";
import { buildWhatsAppChatUrl } from "@/lib/content/site-contact";

export const whatsappWidgetContent = {
  greeting: `Hello, welcome to **${BRAND_NAME}**`,
  prompt: "Can we help you?",
  openChatLabel: "Open Chat",
  fabLabel: "Chat on WhatsApp",
  headerTitle: BRAND_NAME,
  chatUrl: buildWhatsAppChatUrl(),
} as const;
