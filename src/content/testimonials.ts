import { Document } from "@contentful/rich-text-types";

export type Testimonial = {
  name: string;
  title: string;
  quote: Document | null;
  avatarUrl: string;
  avatarHint: string;
};
