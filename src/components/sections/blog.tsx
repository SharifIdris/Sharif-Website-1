
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { BlogPost } from "@/content/blog-posts";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

type BlogProps = {
  blogPosts: BlogPost[];
}

const BlogPostDialog = ({ post }: { post: BlogPost }) => {
  return (
    <DialogContent className="max-w-3xl">
      <DialogHeader>
        <DialogTitle className="font-headline text-2xl text-primary drop-shadow-glow-primary">{post.title}</DialogTitle>
      </DialogHeader>
      <ScrollArea className="max-h-[70vh] pr-4">
        <div className="space-y-4">
          <div className="relative h-64 w-full">
            <Image 
              src={post.imageUrl} 
              alt={post.title}
              data-ai-hint={post.imageHint}
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary">{tag}</Badge>
            ))}
          </div>
          <div className="prose prose-invert max-w-none text-foreground/80">
            {post.content ? documentToReactComponents(post.content) : <p>{post.excerpt}</p>}
          </div>
        </div>
      </ScrollArea>
    </DialogContent>
  );
};


export default function Blog({ blogPosts }: BlogProps) {
  // Display only the 3 most recent posts
  const recentPosts = blogPosts.slice(0, 3);

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
          {recentPosts.map((post) => (
            <Dialog key={post.title}>
              <DialogTrigger asChild>
                <Card className="flex cursor-pointer flex-col transform-gpu overflow-hidden border-border/70 bg-card/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20">
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
                  </CardContent>
                  <CardFooter className="mt-auto flex justify-between items-center px-6 pb-6">
                    <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary">{tag}</Badge>
                        ))}
                    </div>
                    <Button variant="link" className="p-0 text-primary">
                        Read More
                    </Button>
                  </CardFooter>
                </Card>
              </DialogTrigger>
              <BlogPostDialog post={post} />
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
}
