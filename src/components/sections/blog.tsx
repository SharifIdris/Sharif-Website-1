
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { BlogPost } from "@/content/blog-posts";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from '@contentful/rich-text-types';

const richTextOptions = {
  renderNode: {
    [BLOCKS.HEADING_1]: (node: any, children: any) => <h1 className="text-3xl font-bold mt-8 mb-4 font-headline text-primary drop-shadow-glow-primary">{children}</h1>,
    [BLOCKS.HEADING_2]: (node: any, children: any) => <h2 className="text-2xl font-bold mt-6 mb-3 font-headline text-primary">{children}</h2>,
    [BLOCKS.HEADING_3]: (node: any, children: any) => <h3 className="text-xl font-bold mt-4 mb-2 font-headline text-primary">{children}</h3>,
    [BLOCKS.PARAGRAPH]: (node: any, children: any) => <p className="mb-4 leading-relaxed text-foreground/80">{children}</p>,
    [BLOCKS.UL_LIST]: (node: any, children: any) => <ul className="list-disc list-inside mb-4 pl-4 space-y-2 text-foreground/80">{children}</ul>,
    [BLOCKS.OL_LIST]: (node: any, children: any) => <ol className="list-decimal list-inside mb-4 pl-4 space-y-2 text-foreground/80">{children}</ol>,
    [BLOCKS.LIST_ITEM]: (node: any, children: any) => <li>{children}</li>,
    [BLOCKS.QUOTE]: (node: any, children: any) => <blockquote className="border-l-4 border-accent pl-4 italic my-4 text-foreground/90">{children}</blockquote>,
    [INLINES.HYPERLINK]: (node: any, children: any) => <a href={node.data.uri} className="text-primary underline-offset-4 hover:underline" target="_blank" rel="noopener noreferrer">{children}</a>,
  },
};


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
          <div className="prose prose-invert max-w-none">
            {post.content ? documentToReactComponents(post.content, richTextOptions) : <p>{post.excerpt}</p>}
          </div>
        </div>
      </ScrollArea>
    </DialogContent>
  );
};


export default function Blog({ blogPosts }: BlogProps) {

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
        <Carousel
          opts={{
            align: "start",
          }}
          className="mx-auto mt-16 w-full max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-4xl"
        >
          <CarouselContent>
          {blogPosts.map((post) => (
            <CarouselItem key={post.title} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Dialog>
                <DialogTrigger asChild>
                  <Card className="flex h-full cursor-pointer flex-col transform-gpu overflow-hidden border-border/70 bg-card/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20">
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
                      <div className="mt-2 flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary">{tag}</Badge>
                          ))}
                      </div>
                    </CardContent>
                    <CardFooter className="mt-auto flex justify-end items-center px-6 pb-6">
                      <Button variant="link" className="p-0 text-primary">
                          Read More
                      </Button>
                    </CardFooter>
                  </Card>
                </DialogTrigger>
                <BlogPostDialog post={post} />
                </Dialog>
              </div>
            </CarouselItem>
          ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
