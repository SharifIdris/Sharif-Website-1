
"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { cn } from "@/lib/utils";

const projects = [
  {
    title: "AI-Powered Task Manager",
    description: "A smart task management application that uses natural language processing to categorize and prioritize tasks automatically. Built to streamline productivity for small teams.",
    techStack: ["Next.js", "TypeScript", "Firebase", "Genkit", "Tailwind CSS"],
    liveUrl: "#",
    githubUrl: "#",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "task manager",
  },
  {
    title: "Automated Client Onboarding",
    description: "An internal tool designed to automate the client onboarding process, from initial contact to project setup. Reduces manual data entry and ensures a smooth start for every client.",
    techStack: ["React", "Node.js", "Supabase", "Trello API", "SendGrid"],
    liveUrl: "#",
    githubUrl: "#",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "client onboarding",
  },
  {
    title: "Cybersecurity News Aggregator",
    description: "A web app that aggregates the latest news and articles on cybersecurity from various sources, using tags for easy filtering. Helps security professionals stay updated.",
    techStack: ["Next.js", "Contentful", "GraphQL", "Vercel"],
    liveUrl: "#",
    githubUrl: "#",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "cybersecurity news",
  },
];

export default function Projects() {
  const [flippedCard, setFlippedCard] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    setFlippedCard(flippedCard === index ? null : index);
  };

  return (
    <section id="projects" className="py-24 sm:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl drop-shadow-glow-primary">
            MVP Project Showcase
          </h2>
          <p className="mt-4 text-lg leading-8 text-foreground/70">
            Exploring ideas and building functional solutions. Click a card for details.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-none grid-cols-1 gap-8 sm:mt-20 lg:grid-cols-3 [perspective:1000px]">
          {projects.map((project, index) => (
             <div
              key={index}
              className="relative h-96 w-full cursor-pointer"
              onClick={() => handleCardClick(index)}
            >
                <Card
                    className={cn(
                    "absolute inset-0 h-full w-full transform-gpu border-border/70 bg-card/50 transition-transform duration-700 [transform-style:preserve-3d]",
                    flippedCard === index && "[transform:rotateY(180deg)]"
                    )}
                >
                    {/* Front of the card */}
                    <div className="absolute inset-0 [backface-visibility:hidden]">
                        <Image 
                            src={project.imageUrl} 
                            alt={project.title}
                            data-ai-hint={project.imageHint}
                            width={600}
                            height={400}
                            className="h-full w-full rounded-lg object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-lg" />
                        <div className="absolute bottom-0 left-0 p-6">
                            <CardTitle className="font-headline text-xl text-white">{project.title}</CardTitle>
                        </div>
                         <div className="absolute bottom-6 right-6">
                            <p className="text-xs text-white/80">Click to see more</p>
                        </div>
                    </div>

                    {/* Back of the card */}
                    <div className="absolute inset-0 flex flex-col rounded-lg bg-card/80 p-6 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                        <CardHeader>
                            <CardTitle className="font-headline text-xl text-primary">{project.title}</CardTitle>
                            <CardDescription className="pt-2 text-foreground/80">{project.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                             <div className="flex flex-wrap gap-2">
                                {project.techStack.map((tech) => (
                                    <Badge key={tech} variant="secondary" className="bg-primary/10 text-primary">{tech}</Badge>
                                ))}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <div className="flex gap-4">
                            <Button variant="outline" asChild onClick={(e) => e.stopPropagation()}>
                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                                </a>
                            </Button>
                            <Button variant="outline" asChild onClick={(e) => e.stopPropagation()}>
                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                <Github className="mr-2 h-4 w-4" /> GitHub
                                </a>
                            </Button>
                            </div>
                        </CardFooter>
                    </div>
                </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
