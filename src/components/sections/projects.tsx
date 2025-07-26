
"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project, ProjectCategory } from "@/content/projects";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";


const ProjectCard = ({ project }: { project: Project }) => {
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
            "absolute inset-0 h-full w-full transform-gpu border-border/70 bg-card/50 transition-all duration-700 [transform-style:preserve-3d]",
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
            <div className="absolute inset-0 flex flex-col rounded-lg bg-card/80 p-4 [transform:rotateY(180deg)] [backface-visibility:hidden] overflow-y-auto">
                <CardHeader className="p-2">
                    <CardTitle className="font-headline text-lg text-primary drop-shadow-glow-primary">{project.title}</CardTitle>
                    <CardDescription className="pt-1 text-xs text-foreground/80">
                        {project.description ? documentToReactComponents(project.description) : 'No description available.'}
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow p-2">
                     <div className="flex flex-wrap gap-1">
                        {project.techStack.map((tech) => (
                            <Badge key={tech} variant="secondary" className="bg-primary/10 text-primary text-xs">{tech}</Badge>
                        ))}
                    </div>
                </CardContent>
                <CardFooter className="p-2 mt-auto">
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

type ProjectsProps = {
  projectCategories: ProjectCategory[];
}

export default function Projects({ projectCategories }: ProjectsProps) {
  const [openCategory, setOpenCategory] = useState<string | null>(projectCategories.length > 0 ? projectCategories[0].name : null);

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
