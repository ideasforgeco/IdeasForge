export interface ProcessCard {
  icon: string;
  title: string;
  description: string;
}

export interface ProcessData {
  heading: {
    part1: string;
    part2: string;
  };
  subheading: string;
  cards: ProcessCard[];
}
