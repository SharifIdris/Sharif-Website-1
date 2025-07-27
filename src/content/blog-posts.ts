import type { Document } from "@contentful/rich-text-types";

export type BlogPost = {
  title: string;
  excerpt: string;
  tags: string[];
  imageUrl: string;
  imageHint: string;
  content: Document | null;
};
