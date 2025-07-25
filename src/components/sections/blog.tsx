import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const blogPosts = [
  {
    title: "5 AI Tools to Supercharge Your Productivity",
    excerpt: "Discover how to leverage the latest AI tools to automate tasks, save time, and focus on what truly matters in your business.",
    tags: ["AI", "Productivity"],
    date: "October 26, 2023",
  },
  {
    title: "The First 90 Days in Cybersecurity: A Rookie's Journey",
    excerpt: "A transparent look at the challenges and triumphs of breaking into the cybersecurity field, with key takeaways for aspiring professionals.",
    tags: ["Cybersecurity", "Career"],
    date: "September 15, 2023",
  },
  {
    title: "Why Your Next Project Should Be an MVP",
    excerpt: "Learn how building a Minimum Viable Product can validate your ideas faster, reduce risk, and set the foundation for a successful product.",
    tags: ["MVPs", "Development", "Startups"],
    date: "August 02, 2023",
  },
];

export default function Blog() {
  return (
    <section id="blog" className="py-24 sm:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl drop-shadow-glow-primary">
            From the Blog
          </h2>
          <p className="mt-4 text-lg leading-8 text-foreground/70">
            Sharing insights on AI, cybersecurity, product development, and more.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-none grid-cols-1 gap-8 sm:mt-20 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Card key={post.title} className="flex flex-col transform-gpu border-border/70 bg-card/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10">
              <CardHeader>
                <CardTitle className="font-headline text-xl text-primary">{post.title}</CardTitle>
                <CardDescription className="pt-2 text-foreground/80">{post.excerpt}</CardDescription>
              </CardHeader>
              <CardFooter className="mt-auto flex justify-between items-center">
                <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary">{tag}</Badge>
                    ))}
                </div>
                <Button variant="ghost" size="icon" className="group">
                    <ArrowRight className="h-5 w-5 text-primary/70 transition-transform group-hover:text-primary group-hover:translate-x-1" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
