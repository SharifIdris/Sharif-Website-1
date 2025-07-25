import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Briefcase, Bot, Code, BarChart3, ShieldCheck, CheckCircle } from "lucide-react";

const serviceCategories = [
  {
    icon: <Briefcase className="h-8 w-8 text-accent drop-shadow-glow-accent" />,
    title: "Virtual Assistant Services",
    subtitle: "Helping entrepreneurs and teams stay organized, responsive, and efficient.",
    items: [
      "Calendar & Email Management",
      "Task Coordination using Notion, Trello, Google Workspace",
      "Meeting Setup & Follow-Ups",
      "Document Structuring & Proposal Drafting",
      "Client Support & Messaging Automation (ChatGPT, Gemini)",
      "Workspace Setup for startups and teams",
    ],
  },
  {
    icon: <Bot className="h-8 w-8 text-accent drop-shadow-glow-accent" />,
    title: "AI Tools & Automation Services",
    subtitle: "Solving repetitive tasks with smart, AI-powered workflows.",
    items: [
      "AI Workflow Building with n8n, Contentful, Notion",
      "Prompt Engineering for Branding & Content",
      "AI Chatbot Customization & Deployment",
      "AI Debugging Tools for Development",
      "Local AI Setup using LM Studio & Bolt.diy",
      "Blog Automation & Content Pipelines",
    ],
  },
  {
    icon: <Code className="h-8 w-8 text-accent drop-shadow-glow-accent" />,
    title: "Web Development Services",
    subtitle: "From MVPs to scalable systems — fast, functional, and user-focused.",
    items: [
      "Front-End Development (React, Next.js, TypeScript)",
      "Backend Integration (Firebase, Supabase, Bolt.diy)",
      "Portfolio & CMS Setup (Netlify CMS, Contentful)",
      "Role-Based Dashboards & Custom UI/UX",
      "Website Redesign & Optimization",
      "OAuth & Secure Auth Integration",
    ],
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-accent drop-shadow-glow-accent" />,
    title: "Data Science Foundations",
    subtitle: "Exploring data to unlock insights and support decisions.",
    items: [
      "Data Cleaning & Preprocessing",
      "Data Visualization (Matplotlib, Seaborn, Spreadsheets)",
      "Dashboard Prototyping",
      "AI-enhanced data exploration",
      "ALX Program Learnings & Application",
    ],
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-accent drop-shadow-glow-accent" />,
    title: "Cybersecurity Foundations",
    subtitle: "Building awareness around digital safety and ethical hacking.",
    items: [
      "Understanding Cybersecurity Lifecycle",
      "Basic Reconnaissance (Nmap, Wireshark)",
      "Introduction to Exploitation Tools (Metasploit)",
      "Secure App Practices with Firebase & Docker",
      "OAuth Setup & Role-Based Access Control",
      "CISCO Training Integration",
    ],
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-background/80 py-24 sm:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl drop-shadow-glow-primary">
            How I Can Help You Work Smarter
          </h2>
          <p className="mt-4 text-lg leading-8 text-foreground/70">
            I combine digital organization, AI fluency, and development skills to deliver solutions that matter.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-4xl">
          <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
            {serviceCategories.map((category, index) => (
              <AccordionItem key={category.title} value={`item-${index}`} className="mb-4 rounded-lg border border-border/70 bg-card/50 px-6 shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-accent/10">
                <AccordionTrigger className="py-6 text-left hover:no-underline">
                  <div className="flex items-center gap-4">
                    {category.icon}
                    <div className="flex flex-col">
                        <h3 className="font-headline text-xl text-primary">{category.title}</h3>
                        <p className="text-sm text-foreground/70 mt-1">{category.subtitle}</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <ul className="ml-4 list-none space-y-2">
                    {category.items.map((item) => (
                      <li key={item} className="flex items-start">
                        <CheckCircle className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-accent" />
                        <span className="text-foreground/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}