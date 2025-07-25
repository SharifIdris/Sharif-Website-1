import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const skillCategories = [
    {
        title: "Virtual Assistance",
        skills: [
            { name: "Automation & Task Flow", level: 85 },
            { name: "Content Management", level: 80 },
            { name: "AI Tools for Assistance", level: 90 },
            { name: "Structured Data Organization", level: 80 },
            { name: "Professional Communication Aids", level: 85 },
        ]
    },
    {
        title: "AI Development & Integration",
        skills: [
            { name: "AI Platforms (ChatGPT, Gemini)", level: 90 },
            { name: "Workflow Automation (n8n, Bolt)", level: 80 },
            { name: "AI Debugging / Integration", level: 70 },
            { name: "Local AI Tools (LM Studio)", level: 60 },
            { name: "Creative AI (Clones, Branding)", level: 80 },
        ]
    },
    {
        title: "Data Analysis (Junior)",
        skills: [
            { name: "Data Cleaning", level: 75 },
            { name: "Data Visualization", level: 65 },
            { name: "Basic Analysis", level: 65 },
            { name: "Learning Python Tools", level: 65 },
            { name: "Workflow Tracking (n8n)", level: 70 },
        ]
    },
    {
        title: "Cybersecurity (Junior)",
        skills: [
            { name: "Security Lifecycle Knowledge", level: 60 },
            { name: "Recon Tools (Nmap, Wireshark)", level: 60 },
            { name: "Exploitation Tools (Metasploit)", level: 50 },
            { name: "Secure Dev Practices", level: 70 },
            { name: "Threat Awareness", level: 60 },
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
            A snapshot of my capabilities across different domains.
          </p>
        </div>
        <div className="mx-auto mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:max-w-none">
          {skillCategories.map((category) => (
            <Card key={category.title} className="border-border/70 bg-card/50">
              <CardHeader>
                <CardTitle className="font-headline text-xl text-primary">{category.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="mb-2 flex justify-between">
                      <span className="text-sm font-medium text-foreground/90">{skill.name}</span>
                      <span className="text-sm font-medium text-foreground/70">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2 [&>div]:bg-accent" />
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
