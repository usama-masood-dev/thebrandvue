import { parseVideoUrl } from "@/lib/video/parse-video-url";
import type { Testimonial } from "../types";

export type TestimonialImageMedia = {
  kind: "image";
  imageUrl: string;
  imageAlt: string;
};

export type TestimonialVideoMedia = {
  kind: "video";
  provider: "youtube" | "vimeo" | "file";
  embedUrl: string;
  posterUrl: string | null;
  thumbnailUrl?: string;
};

export type TestimonialPlaceholderMedia = {
  kind: "placeholder";
};

export type TestimonialMedia =
  | TestimonialImageMedia
  | TestimonialVideoMedia
  | TestimonialPlaceholderMedia;

export type TestimonialCardViewModel = {
  id: string;
  quote: string;
  clientName: string;
  companyName: string | null;
  rating: number;
  media: TestimonialMedia;
};

function stripHtml(value: string): string {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function clampRating(rating: number | null | undefined): number {
  if (rating == null || Number.isNaN(rating)) return 5;
  return Math.min(5, Math.max(1, Math.round(rating)));
}

function resolveMedia(
  details: NonNullable<Testimonial["testimonialDetails"]>,
  clientName: string,
): TestimonialMedia {
  const photo = details.clientPhoto?.node;
  const posterUrl = photo?.sourceUrl ?? null;
  const photoAlt = photo?.altText?.trim() || clientName;

  const videoUrl = details.videoUrl?.trim();
  if (videoUrl) {
    const parsed = parseVideoUrl(videoUrl);
    if (parsed) {
      if (parsed.provider === "youtube") {
        return {
          kind: "video",
          provider: "youtube",
          embedUrl: parsed.embedUrl,
          posterUrl: posterUrl ?? parsed.thumbnailUrl,
          thumbnailUrl: parsed.thumbnailUrl,
        };
      }
      if (parsed.provider === "vimeo") {
        return {
          kind: "video",
          provider: "vimeo",
          embedUrl: parsed.embedUrl,
          posterUrl,
        };
      }
      return {
        kind: "video",
        provider: "file",
        embedUrl: parsed.embedUrl,
        posterUrl,
      };
    }
  }

  if (photo?.sourceUrl) {
    return {
      kind: "image",
      imageUrl: photo.sourceUrl,
      imageAlt: photoAlt,
    };
  }

  return { kind: "placeholder" };
}

export function mapTestimonialToCard(
  testimonial: Testimonial,
): TestimonialCardViewModel | null {
  const details = testimonial.testimonialDetails;
  const clientName = details?.clientName?.trim();
  if (!details || !clientName) return null;

  const rawQuote =
    stripHtml(testimonial.content?.trim() ?? "") ||
    stripHtml(testimonial.title?.trim() ?? "");

  return {
    id: testimonial.id,
    quote: rawQuote || "A wonderful experience working with The Brand Vue team.",
    clientName,
    companyName: details.companyName?.trim() || null,
    rating: clampRating(details.rating),
    media: resolveMedia(details, clientName),
  };
}

export function mapTestimonialsToCards(
  testimonials: Testimonial[],
): TestimonialCardViewModel[] {
  return testimonials
    .map(mapTestimonialToCard)
    .filter((card): card is TestimonialCardViewModel => card !== null);
}
