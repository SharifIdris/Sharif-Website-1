import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "AI-Powered Task Manager",
    description: "A smart task management application that uses natural language processing to categorize and prioritize tasks automatically. Built to streamline productivity for small teams.",
    techStack: ["Next.js", "TypeScript", "Firebase", "ChatGPT API", "Tailwind CSS"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Automated Client Onboarding System",
    description: "An internal tool designed to automate the client onboarding process, from initial contact to project setup. Reduces manual data entry and ensures a smooth start for every client.",
    techStack: ["React", "Node.js", "Supabase", "Trello API", "SendGrid"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Cybersecurity News Aggregator",
    description: "A web app that aggregates the latest news and articles on cybersecurity from various sources, using tags for easy filtering. Helps security professionals stay updated.",
    techStack: ["Next.js", "Contentful", "GraphQL", "Vercel"],
    liveUrl: "#",
    githubUrl: "#",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 sm:py-32">
       <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl drop-shadow-glow-primary">
            MVP Project Showcase
          </h2>
          <p className="mt-4 text-lg leading-8 text-foreground/70">
            Exploring ideas and building functional solutions. Here are some of my recent projects.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-none grid-cols-1 gap-8 sm:mt-20 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.title} className="flex flex-col transform-gpu border-border/70 bg-card/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10">
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
                  <Button variant="outline" asChild>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" /> GitHub
                    </a>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}