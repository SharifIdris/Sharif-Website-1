
"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Bot, Briefcase, ShieldCheck, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

const projectCategories = [
  {
    name: "AI & Development",
    icon: <Bot className="h-6 w-6 text-primary" />,
    projects: [
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
        title: "Cybersecurity News Aggregator",
        description: "A web app that aggregates the latest news and articles on cybersecurity from various sources, using tags for easy filtering. Helps security professionals stay updated.",
        techStack: ["Next.js", "Contentful", "GraphQL", "Vercel"],
        liveUrl: "#",
        githubUrl: "#",
        imageUrl: "https://placehold.co/600x400.png",
        imageHint: "cybersecurity news",
      },
    ]
  },
  {
    name: "Virtual Assistant Projects",
    icon: <Briefcase className="h-6 w-6 text-primary" />,
    projects: [
      {
        title: "Automated Client Onboarding",
        description: "An internal tool designed to automate the client onboarding process, from initial contact to project setup. Reduces manual data entry and ensures a smooth start for every client.",
        techStack: ["React", "Node.js", "Supabase", "Trello API", "SendGrid"],
        liveUrl: "#",
        githubUrl: "#",
        imageUrl: "https://placehold.co/600x400.png",
        imageHint: "client onboarding",
      },
    ]
  },
  {
    name: "Data Science Projects",
    icon: <BarChart3 className="h-6 w-6 text-primary" />,
    projects: [
       {
        title: "Sentiment Analysis Dashboard",
        description: "A dashboard that visualizes customer feedback sentiment from multiple sources. Helps businesses quickly gauge public opinion and identify areas for improvement.",
        techStack: ["Python", "Flask", "Plotly", "Pandas", "NLTK"],
        liveUrl: "#",
        githubUrl: "#",
        imageUrl: "https://placehold.co/600x400.png",
        imageHint: "data dashboard",
      },
       {
        title: "Sales Forecasting Model",
        description: "A machine learning model that predicts future sales based on historical data, seasonality, and marketing spend. Built to help optimize inventory and budget planning.",
        techStack: ["Jupyter", "Scikit-learn", "TensorFlow", "Matplotlib"],
        liveUrl: "#",
        githubUrl: "#",
        imageUrl: "https://placehold.co/600x400.png",
        imageHint: "sales chart",
      },
    ]
  },
   {
    name: "Cybersecurity Projects",
    icon: <ShieldCheck className="h-6 w-6 text-primary" />,
    projects: [
        {
        title: "Network Vulnerability Scanner",
        description: "A command-line tool that scans a local network for open ports and known vulnerabilities. Developed to help administrators identify and patch security weaknesses.",
        techStack: ["Python", "Nmap", "Socket"],
        liveUrl: "#",
        githubUrl: "#",
        imageUrl: "https://placehold.co/600x400.png",
        imageHint: "network security",
      },
    ]
  },
];

const ProjectCard = ({ project }: { project: typeof projectCategories[0]['projects'][0] }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
     <div
      className="relative h-80 w-full cursor-pointer group [perspective:1000px]"
      onClick={() => setIsFlipped(!isFlipped)}
    >
        <Card
            className={cn(
            "absolute inset-0 h-full w-full transform-gpu border-border/70 bg-card/50 transition-all duration-700 [transform-style:preserve-3d] group-hover:-translate-y-1 group-hover:shadow-2xl group-hover:shadow-primary/20",
            isFlipped && "[transform:rotateY(180deg)]"
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
                    <CardTitle className="font-headline text-xl text-white drop-shadow-glow-primary">{project.title}</CardTitle>
                </div>
                 <div className="absolute bottom-6 right-6">
                    <p className="text-xs text-white/80">Click for details</p>
                </div>
            </div>

            {/* Back of the card */}
            <div className="absolute inset-0 flex flex-col rounded-lg bg-card/80 p-6 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                <CardHeader className="p-4">
                    <CardTitle className="font-headline text-xl text-primary drop-shadow-glow-primary">{project.title}</CardTitle>
                    <CardDescription className="pt-2 text-foreground/80">{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow p-4">
                     <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                            <Badge key={tech} variant="secondary" className="bg-primary/10 text-primary">{tech}</Badge>
                        ))}
                    </div>
                </CardContent>
                <CardFooter className="p-4">
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
  );
};

export default function Projects() {
  return (
    <section id="projects" className="py-24 sm:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl drop-shadow-glow-primary">
            MVP Project Showcase
          </h2>
          <p className="mt-4 text-lg leading-8 text-foreground/70">
            Exploring ideas and building functional solutions across different domains.
          </p>
        </div>
        <div className="mx-auto mt-16 w-full max-w-4xl">
          <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
            {projectCategories.map((category, index) => (
              <AccordionItem key={category.name} value={`item-${index}`} className="border-border/50">
                <AccordionTrigger className="py-6 text-lg hover:no-underline">
                  <div className="flex items-center gap-4">
                    {category.icon}
                    <span className="font-headline text-xl text-primary drop-shadow-glow-primary">{category.name}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-8">
                  {category.projects.length > 0 ? (
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                      {category.projects.map((project) => (
                        <ProjectCard key={project.title} project={project} />
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-foreground/70">
                      Projects in this category are coming soon. Stay tuned!
                    </p>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
