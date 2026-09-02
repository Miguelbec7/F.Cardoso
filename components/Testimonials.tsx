import { getTestimonials } from "@/lib/testimonials";
import { getSiteSettings } from "@/lib/settings";
import { TestimonialsCarousel } from "./TestimonialsCarousel";

export function Testimonials() {
  const testimonials = getTestimonials();
  const { redesSociais } = getSiteSettings();

  return <TestimonialsCarousel testimonials={testimonials} redesSociais={redesSociais} />;
}
