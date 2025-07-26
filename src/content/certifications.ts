import type { ReactNode } from "react";

export type Certification = {
  issuer: string;
  name: string;
  icon: ReactNode;
  description: string;
  imageUrl: string;
  imageHint: string;
};
