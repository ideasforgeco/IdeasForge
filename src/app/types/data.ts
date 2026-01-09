export interface HeroHeading {
  line1: string;
  line2: string;
}

export interface HeroStats {
  projects: number;
  industries: number;
  satisfaction: number;
}

export interface HeroButtons {
  primary: string;
  secondary: string;
}

export interface HeroData {
  heading: HeroHeading;
  carouselTexts: string[];
  subheading: string;
  stats: HeroStats;
  buttons: HeroButtons;
}
