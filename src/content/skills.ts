import type { ReactNode } from "react";

export type Skill = {
  name: string;
  level: number;
};

export type SkillCategory = {
  title: string;
  icon: ReactNode;
  skills: Skill[];
};
