
"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Bot, Code, BarChart3, ShieldCheck, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const serviceCategories = [
  {
    icon: <Briefcase className="h-16 w-16 text-primary drop-shadow-glow-primary" />,
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
    icon: <Bot className="h-16 w-16 text-primary drop-shadow-glow-primary" />,
    title: "AI Tools & Automation",
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
    icon: <Code className="h-16 w-16 text-primary drop-shadow-glow-primary" />,
    title: "Web Development",
    subtitle: "From MVPs to scalable systems — fast, functional, and user-focused.",
    items: [
      "Development Powered by AI Tools",
      "Front-End Development (React, Next.js, TypeScript)",
      "Backend Integration (Firebase, Supabase, Bolt.diy)",
      "Portfolio & CMS Setup (Netlify CMS, Contentful)",
      "Role-Based Dashboards & Custom UI/UX",
      "Website Redesign & Optimization",
      "OAuth & Secure Auth Integration",
    ],
  },
  {
    icon: <BarChart3 className="h-16 w-16 text-primary drop-shadow-glow-primary" />,
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
    icon: <ShieldCheck className="h-16 w-16 text-primary drop-shadow-glow-primary" />,
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
  const [flippedCard, setFlippedCard] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    setFlippedCard(flippedCard === index ? null : index);
  };

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
        <div className="mx-auto mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 [perspective:1000px]">
          {serviceCategories.map((category, index) => (
             <div
              key={index}
              className="relative h-96 w-full cursor-pointer group"
              onClick={() => handleCardClick(index)}
            >
              <Card
                className={cn(
                  "absolute inset-0 h-full w-full transform-gpu border-border/70 bg-card/50 transition-all duration-700 [transform-style:preserve-3d] group-hover:-translate-y-1 group-hover:shadow-2xl group-hover:shadow-primary/20",
                  flippedCard === index && "[transform:rotateY(180deg)]"
                )}
              >
                {/* Front of the card */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center [backface-visibility:hidden]">
                  {category.icon}
                  <h3 className="mt-4 font-headline text-2xl font-bold text-primary">{category.title}</h3>
                   <p className="mt-auto text-xs text-foreground/60 w-full">Click to see details</p>
                </div>

                {/* Back of the card */}
                <div className="absolute inset-0 flex flex-col justify-center rounded-lg bg-card/80 p-6 [transform:rotateY(180deg)] [backface-visibility:hidden] overflow-y-auto">
                   <h3 className="font-headline text-xl font-bold text-primary text-center mb-2 flex-shrink-0">{category.title}</h3>
                   <p className="text-sm text-foreground/70 text-center mb-4 flex-shrink-0">{category.subtitle}</p>
                   <ul className="space-y-2 text-left">
                    {category.items.map((item) => (
                      <li key={item} className="flex items-start">
                        <CheckCircle className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-accent" />
                        <span className="text-sm text-foreground/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
