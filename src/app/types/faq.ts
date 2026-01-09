export interface FAQ {
  id: number;
  question: string;
  answer: string;
}

export interface FAQData {
  badge: string;
  heading: {
    line1: string;
    line2: string;
  };
  subheading: string;
  faqs: FAQ[];
}
