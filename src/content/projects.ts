import type { ReactNode } from "react";

export type Project = {
  title: string;
  description: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
  imageUrl: string;
  imageHint: string;
};

export type ProjectCategory = {
  name: string;
  icon: ReactNode;
  projects: Project[];
};
