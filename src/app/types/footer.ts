export interface FooterContact {
  label: string;
  value: string;
}

export interface FooterSocial {
  name: string;
  icon: string;
  url: string;
}

export interface FooterData {
  heading: {
    line1: string;
    line2: string;
  };
  logo: string;
  contact: {
    email: FooterContact;
    phone: FooterContact;
  };
  social: FooterSocial[];
  servicesHeading: string;
  services: string[];
  copyright: string;
}
