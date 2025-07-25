
export type BlogPost = {
  title: string;
  excerpt: string;
  tags: string[];
  date: string;
  imageUrl: string;
  imageHint: string;
};

export const blogPosts: BlogPost[] = [
  {
    title: "5 AI Tools to Supercharge Your Productivity",
    excerpt: "Discover how to leverage the latest AI tools to automate tasks, save time, and focus on what truly matters in your business.",
    tags: ["AI", "Productivity"],
    date: "October 26, 2023",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "ai productivity",
  },
  {
    title: "The First 90 Days in Cybersecurity: A Rookie's Journey",
    excerpt: "A transparent look at the challenges and triumphs of breaking into the cybersecurity field, with key takeaways for aspiring professionals.",
    tags: ["Cybersecurity", "Career"],
    date: "September 15, 2023",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "cybersecurity journey",
  },
  {
    title: "Why Your Next Project Should Be an MVP",
    excerpt: "Learn how building a Minimum Viable Product can validate your ideas faster, reduce risk, and set the foundation for a successful product.",
    tags: ["MVPs", "Development", "Startups"],
    date: "August 02, 2023",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "product development",
  },
];
