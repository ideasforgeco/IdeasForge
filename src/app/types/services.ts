export interface Service {
  id: number;
  name: string;
  description: string;
  detailedDescription: string;
  icons: string[];
}

export interface ServicesData {
  heading: string;
  subheading: string;
  services: Service[];
}
