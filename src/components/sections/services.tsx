import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bot, Code, Briefcase } from "lucide-react";

const services = [
  {
    icon: <Briefcase className="h-10 w-10 text-accent drop-shadow-glow-accent" />,
    title: "Virtual Assistant",
    description: "Expert management of calendars, communications, and task workflows using tools like Notion, Trello, and Google Workspace to keep you organized and productive.",
  },
  {
    icon: <Bot className="h-10 w-10 text-accent drop-shadow-glow-accent" />,
    title: "AI Automation",
    description: "Leveraging AI tools like ChatGPT to automate operations, build internal tools, and create efficient, intelligent workflows for your business.",
  },
  {
    icon: <Code className="h-10 w-10 text-accent drop-shadow-glow-accent" />,
    title: "Web Development",
    description: "Creating fast, functional, and scalable Minimum Viable Products (MVPs) using modern technologies like Next.js, React, and Firebase/Supabase.",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-background/80 py-24 sm:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl drop-shadow-glow-primary">
            How I Can Help You Work Smarter
          </h2>
          <p className="mt-4 text-lg leading-8 text-foreground/70">
            I combine digital organization, AI fluency, and development skills to deliver solutions that matter.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-none grid-cols-1 gap-8 sm:mt-20 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.title} className="transform-gpu border-border/70 bg-card/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/10">
              <CardHeader className="items-center text-center">
                <div className="mb-4">{service.icon}</div>
                <CardTitle className="font-headline text-xl text-primary">{service.title}</CardTitle>
                <CardDescription className="pt-2 text-foreground/80">{service.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
