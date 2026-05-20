import { InnerPageShell } from "@/components/pages/inner-page-shell";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { clientsPageContent } from "@/lib/content/clients-page";
import type { TestimonialCardViewModel } from "@/lib/wordpress/mappers/testimonials";

type ClientsPageContentProps = {
  testimonials: TestimonialCardViewModel[];
};

export function ClientsPageContent({ testimonials }: ClientsPageContentProps) {
  const { eyebrow, title, titleAccent, titleSuffix, description } =
    clientsPageContent;

  return (
    <InnerPageShell
      hero={{ eyebrow, title, titleAccent, titleSuffix, description }}
      fullBleed
    >
      {testimonials.length > 0 ? (
        <TestimonialsSection testimonials={testimonials} standalone />
      ) : (
        <p className="px-4 py-16 text-center text-white/70 sm:px-6">
          Client stories will appear here once published.
        </p>
      )}
    </InnerPageShell>
  );
}
