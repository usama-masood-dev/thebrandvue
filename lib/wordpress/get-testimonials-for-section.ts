import { getTestimonials } from "./api";
import {
  mapTestimonialsToCards,
  type TestimonialCardViewModel,
} from "./mappers/testimonials";

export async function getTestimonialsForSection(): Promise<
  TestimonialCardViewModel[]
> {
  try {
    const data = await getTestimonials({ testimonialsFirst: 12 });
    return mapTestimonialsToCards(data.testimonials.nodes);
  } catch (error) {
    console.error("[getTestimonialsForSection]", error);
    return [];
  }
}
