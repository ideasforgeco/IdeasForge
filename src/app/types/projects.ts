export interface Project {
  id: number;
  name: string;
  description: string;
  image: string;
  tags: string[];
}

export interface ProjectsData {
  heading: {
    part1: string;
    part2: string;
  };
  subheading: string;
  projects: Project[];
}