
"use client";

import { useState } from "react";
import { LinkedInConnect } from '@/components/linkedin-connect';
import { Button } from '@/components/ui/button';
import { ArrowRight, Download } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import Image from "next/image";
import { HeroData } from '@/content/hero';
import { cn } from "@/lib/utils";
import { Card } from "../ui/card";


type HeroProps = {
  heroData: HeroData | null;
}

export default function Hero({ heroData }: HeroProps) {
    const [isFlipped, setIsFlipped] = useState(false);

    const bio = `I’m Angole Sharif Abubakar — a Certified Virtual Assistant, AI Tools Expert, and early-stage Developer with a passion for building efficient, tech-driven solutions. I help individuals, startups, and small businesses work smarter by combining digital organization, automation, and fast MVP development.`;

    const fullBio = `I’m Angole Sharif Abubakar, a Certified Virtual Assistant and AI Tools Expert with a strong passion for digital efficiency, productivity, and tech-powered problem-solving. I help individuals and businesses work smarter by combining human-centered support with powerful tools like Notion, ChatGPT, Trello, Canva, and Google Workspace.

What sets me apart is my unique blend of administrative precision, AI fluency, and technical curiosity. I’m not only experienced in managing virtual operations, but also actively building my foundation in the world of cybersecurity and data science.

I’m currently studying Computer Science at Busitema University, while enrolled in professional tracks with ALX Africa (Cybersecurity & Data Science) and CISCO’s Ethical Hacking program. This learning journey is part of a bigger mission.

My long-term vision is clear: to evolve into a Data Scientist enriched with cybersecurity expertise, someone who can protect digital systems, analyze complex data, and drive intelligent, secure decision-making across industries.

Currently, my work as a Virtual Assistant enables me to live out my passion every day by solving problems, staying organized, automating tasks, and supporting the businesses of tomorrow.

Let’s connect if you’re hiring, collaborating, or passionate about technology, security, or AI-powered productivity.`;

  const backContent = `I’m Angole Sharif Abubakar — a Certified Virtual Assistant and AI Tools Expert with a strong passion for digital efficiency, productivity, and tech-powered problem solving. I help individuals and businesses work smarter by combining human-centered support with powerful tools like Notion, ChatGPT, Trello, Canva, and Google Workspace.

What sets me apart is my unique blend of administrative precision, AI fluency, and technical curiosity. I’m not only experienced in managing virtual operations, but also actively building my foundation in the world of cybersecurity and data science.

I’m currently studying Computer Science at Busitema University, while enrolled in professional tracks with ALX Africa (Cybersecurity & Data Science) and CISCO’s Ethical Hacking program. This learning journey is part of a bigger mission.

My long-term vision is clear: to evolve into a Data Scientist enriched with cybersecurity expertise — someone who can protect digital systems, analyze complex data, and drive intelligent, secure decision-making across industries.

Currently, my work as a Virtual Assistant enables me to live out my passion every day by solving problems, staying organized, automating tasks, and supporting the businesses of tomorrow.

Let’s connect if you’re hiring, collaborating, or passionate about technology, security, or AI-powered productivity.`;


  return (
    <section id="about" className="relative overflow-hidden bg-background py-24 sm:py-32">
        <div 
            aria-hidden="true" 
            className="absolute -top-48 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl"
        >
            <div 
                className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] opacity-20"
                style={{
                    clipPath: 'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64.3%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 1.4% 98.2%, 8.2% 91.8%, 14.7% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                }}
            />
        </div>
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="max-w-3xl">
              <h1 className="font-headline text-4xl font-bold tracking-tight text-primary drop-shadow-glow-primary sm:text-6xl">
                Angole Sharif Abubakar
              </h1>
              <div className="mt-4 text-2xl font-semibold text-foreground/90 sm:text-3xl h-10 sm:h-auto">
                <TypeAnimation
                  sequence={[
                    'Certified Virtual Assistant',
                    2000,
                    'AI Tools Expert',
                    2000,
                    'Data Science Enthusiast',
                    2000,
                    'Aspiring Cybersecurity Professional',
                    2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                  cursor={true}
                  className="drop-shadow-glow-primary"
                />
              </div>
              <p className="mt-6 text-lg leading-8 text-foreground/80">
                {bio}
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <LinkedInConnect websiteContent={fullBio}>
                    <Button size="lg" className="group">
                        Connect on LinkedIn
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                </LinkedInConnect>
                <a href="/AngoleSharifAbubakar.pdf" download>
                  <Button size="lg" variant="outline" className="group">
                      Download CV <Download className="ml-2 h-5 w-5 transition-transform group-hover:scale-110" />
                  </Button>
                </a>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end [perspective:1000px]">
                <div
                    className={cn(
                        "relative w-80 h-[28rem] cursor-pointer transition-transform duration-700 [transform-style:preserve-3d]",
                        isFlipped && "[transform:rotateY(180deg)]"
                    )}
                    onClick={() => setIsFlipped(!isFlipped)}
                >
                    {/* Front of the card */}
                    <Card className="absolute inset-0 h-full w-full border-2 border-primary/50 p-2 shadow-2xl shadow-primary/20 drop-shadow-glow-primary [backface-visibility:hidden]">
                        <Image
                            src={heroData?.imageUrl || "https://placehold.co/400x500.png"}
                            alt="A professional photo of Angole Sharif Abubakar"
                            data-ai-hint={heroData?.imageHint || "professional portrait"}
                            width={400}
                            height={500}
                            priority
                            className="rounded-md object-cover w-full h-full"
                        />
                         <div className="absolute bottom-4 right-4 text-white/90 text-xs bg-black/50 p-1 rounded-md">Click to learn more</div>
                    </Card>

                    {/* Back of the card */}
                    <Card className="absolute inset-0 h-full w-full flex flex-col rounded-lg bg-card/95 p-4 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                       <h3 className="text-center font-headline text-lg font-bold text-primary drop-shadow-glow-primary mb-2 flex-shrink-0">
                            About Me
                        </h3>
                        <div className="overflow-y-auto flex-grow">
                          <p className="text-sm text-foreground/80 whitespace-pre-wrap">
                              {backContent}
                          </p>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
