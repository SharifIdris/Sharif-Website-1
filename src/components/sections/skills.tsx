import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Briefcase, Bot, BarChart3, ShieldCheck } from "lucide-react";

const skillCategories = [
    {
        title: "Virtual Assistance",
        icon: <Briefcase className="h-8 w-8 text-accent" />,
        skills: [
            { name: "Automation & Task Flow", level: 85 },
            { name: "Content Management", level: 80 },
            { name: "AI Tools for Assistance", level: 90 },
            { name: "Data Organization", level: 80 },
            { name: "Professional Communication", level: 85 },
        ]
    },
    {
        title: "AI & Development",
        icon: <Bot className="h-8 w-8 text-accent" />,
        skills: [
            { name: "AI Platforms (ChatGPT, Gemini)", level: 90 },
            { name: "Workflow Automation (n8n, Bolt)", level: 80 },
            { name: "AI Integration & Debugging", level: 70 },
            { name: "Local AI Tools (LM Studio)", level: 60 },
            { name: "Full-Stack Development", level: 75 },
        ]
    },
    {
        title: "Data Analysis",
        icon: <BarChart3 className="h-8 w-8 text-accent" />,
        skills: [
            { name: "Data Cleaning & Preprocessing", level: 75 },
            { name: "Data Visualization", level: 65 },
            { name: "Dashboard Prototyping", level: 65 },
            { name: "Python for Data Science", level: 65 },
            { name: "AI-Enhanced Analysis", level: 70 },
        ]
    },
    {
        title: "Cybersecurity",
        icon: <ShieldCheck className="h-8 w-8 text-accent" />,
        skills: [
            { name: "Security Lifecycle Knowledge", level: 60 },
            { name: "Recon Tools (Nmap, Wireshark)", level: 60 },
            { name: "Intro to Exploitation (Metasploit)", level: 50 },
            { name: "Secure App Practices", level: 70 },
            { name: "Threat & Vulnerability Awareness", level: 60 },
        ]
    }
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 sm:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl drop-shadow-glow-primary">
            Technical Skillset
          </h2>
          <p className="mt-4 text-lg leading-8 text-foreground/70">
            A snapshot of my capabilities across different domains, continuously growing.
          </p>
        </div>
        <div className="mx-auto mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:max-w-none">
          {skillCategories.map((category) => (
            <Card key={category.title} className="transform-gpu border-border/70 bg-card/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10">
              <CardHeader className="flex-row items-center gap-4">
                {category.icon}
                <CardTitle className="font-headline text-xl text-primary">{category.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-2">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="mb-2 flex justify-between">
                      <span className="text-sm font-medium text-foreground/90">{skill.name}</span>
                      <span className="text-sm font-medium text-foreground/70">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2 [&>div]:bg-primary" />
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
