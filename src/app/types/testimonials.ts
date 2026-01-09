export interface Testimonial {
  id: number;
  clientName: string;
  testimonial: string;
}

export interface TestimonialsData {
  heading: string;
  subheading: string;
  testimonials: Testimonial[];
}