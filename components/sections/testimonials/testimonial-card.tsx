import type { TestimonialCardViewModel } from "@/lib/wordpress/mappers/testimonials";
import { TestimonialMediaBlock } from "./testimonial-media";
import { TestimonialStars } from "./testimonial-stars";

type TestimonialCardProps = {
  testimonial: TestimonialCardViewModel;
};

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <article className="flex h-full min-h-[24rem] flex-col rounded-2xl border border-surface-gray/20 bg-white p-5 shadow-[0_16px_40px_-28px_rgba(5,8,14,0.18)] transition-shadow hover:shadow-[0_20px_48px_-24px_rgba(5,8,14,0.22)] sm:min-h-[26rem] sm:p-6">
      <TestimonialMediaBlock
        media={testimonial.media}
        clientName={testimonial.clientName}
      />

      <div className="mt-5 flex flex-1 flex-col sm:mt-6">
        <TestimonialStars rating={testimonial.rating} />

        <blockquote className="mt-4 flex-1">
          <p className="line-clamp-4 text-sm leading-relaxed text-surface-dark/90 sm:text-[0.95rem]">
            &ldquo;{testimonial.quote}&rdquo;
          </p>
        </blockquote>

        <footer className="mt-5 border-t border-surface-gray-soft pt-4">
          <p className="font-display text-base font-semibold text-surface-dark sm:text-lg">
            {testimonial.clientName}
          </p>
          {testimonial.companyName ? (
            <p className="mt-0.5 text-xs font-medium uppercase tracking-[0.14em] text-surface-gray sm:text-[0.7rem]">
              {testimonial.companyName}
            </p>
          ) : null}
        </footer>
      </div>
    </article>
  );
}
