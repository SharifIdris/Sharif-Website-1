import type { ReactNode } from "react";
import type { Document } from "@contentful/rich-text-types";

export type Project = {
  title: string;
  description: Document | null;
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
