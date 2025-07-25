import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { blogPosts } from "@/content/blog-posts";

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
            <Card key={post.title} className="flex flex-col transform-gpu overflow-hidden border-border/70 bg-card/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20">
              <CardHeader className="p-0">
                 <Image 
                    src={post.imageUrl} 
                    alt={post.title}
                    data-ai-hint={post.imageHint}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover"
                />
              </CardHeader>
              <CardContent className="p-6 flex-grow">
                <CardTitle className="font-headline text-xl text-primary">{post.title}</CardTitle>
                <CardDescription className="pt-2 text-foreground/80">{post.excerpt}</CardDescription>
              </CardContent>
              <CardFooter className="mt-auto flex justify-between items-center px-6 pb-6">
                <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary">{tag}</Badge>
                    ))}
                </div>
                <Button variant="ghost" size="icon" className="group -mr-2">
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
