
"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Bot, Briefcase, ShieldCheck, BarChart3, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const projectCategories = [
  {
    name: "AI & Development",
    icon: <Bot className="h-8 w-8 text-primary" />,
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
    icon: <Briefcase className="h-8 w-8 text-primary" />,
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
    icon: <BarChart3 className="h-8 w-8 text-primary" />,
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
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
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
      className="relative h-64 w-full cursor-pointer group [perspective:1000px]"
      onClick={(e) => {
        e.stopPropagation(); // Prevent category card click when flipping project card
        setIsFlipped(!isFlipped)
      }}
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
                <div className="absolute bottom-0 left-0 p-4">
                    <CardTitle className="font-headline text-lg text-white drop-shadow-glow-primary">{project.title}</CardTitle>
                </div>
                 <div className="absolute bottom-4 right-4">
                    <p className="text-xs text-white/80">Click for details</p>
                </div>
            </div>

            {/* Back of the card */}
            <div className="absolute inset-0 flex flex-col rounded-lg bg-card/80 p-4 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                <CardHeader className="p-2">
                    <CardTitle className="font-headline text-lg text-primary drop-shadow-glow-primary">{project.title}</CardTitle>
                    <CardDescription className="pt-1 text-xs text-foreground/80">{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow p-2">
                     <div className="flex flex-wrap gap-1">
                        {project.techStack.map((tech) => (
                            <Badge key={tech} variant="secondary" className="bg-primary/10 text-primary text-xs">{tech}</Badge>
                        ))}
                    </div>
                </CardContent>
                <CardFooter className="p-2">
                    <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild onClick={(e) => e.stopPropagation()}>
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-1 h-3 w-3" /> Live
                        </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild onClick={(e) => e.stopPropagation()}>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-1 h-3 w-3" /> GitHub
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
  const [openCategory, setOpenCategory] = useState<string | null>(projectCategories[0].name);

  const handleCategoryClick = (categoryName: string) => {
    setOpenCategory(openCategory === categoryName ? null : categoryName);
  };

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
        <div className="mx-auto mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:max-w-none">
            {projectCategories.map((category) => {
              const isOpen = openCategory === category.name;
              return (
              <Card 
                key={category.name} 
                className={cn(
                  "flex flex-col transform-gpu border-border/70 bg-card/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20 cursor-pointer",
                   isOpen ? "row-span-2" : ""
                  )}
                onClick={() => handleCategoryClick(category.name)}
              >
                <CardHeader className="flex-row items-center justify-between gap-4 p-6">
                  <div className="flex items-center gap-4">
                    {category.icon}
                    <CardTitle className="font-headline text-2xl text-primary drop-shadow-glow-primary">{category.name}</CardTitle>
                  </div>
                  <ChevronDown className={cn("h-6 w-6 text-primary transition-transform duration-300", isOpen && "rotate-180")} />
                </CardHeader>
                {isOpen && (
                  <CardContent className="flex-grow p-6 pt-0">
                    {category.projects.length > 0 ? (
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        {category.projects.map((project) => (
                          <ProjectCard key={project.title} project={project} />
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-foreground/70">
                        Projects in this category are coming soon. Stay tuned!
                      </p>
                    )}
                  </CardContent>
                )}
              </Card>
            )})}
        </div>
      </div>
    </section>
  );
}
