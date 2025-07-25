"use client";

import { LinkedInConnect } from '@/components/linkedin-connect';
import { Button } from '@/components/ui/button';
import { ArrowRight, Download } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import Image from "next/image";
import { HeroData } from '@/content/hero';

type HeroProps = {
  heroData: HeroData | null;
}

export default function Hero({ heroData }: HeroProps) {
    const bio = `I’m Angole Sharif Abubakar — a Certified Virtual Assistant, AI Tools Expert, and early-stage Developer with a passion for building efficient, tech-driven solutions. I help individuals, startups, and small businesses work smarter by combining digital organization, automation, and fast MVP development.`;

    const fullBio = `I’m Angole Sharif Abubakar — a Certified Virtual Assistant, AI Tools Expert, and early-stage Developer with a passion for building efficient, tech-driven solutions. I help individuals, startups, and small businesses work smarter by combining digital organization, automation, and fast MVP development.

What sets me apart is my unique blend of virtual assistance, AI fluency, and full-stack development skills. Alongside managing calendars, communications, and task workflows with tools like Notion, ChatGPT, Trello, and Google Workspace, I also create Minimum Viable Products (MVPs) using technologies like: TypeScript, Next.js, React, Firebase, Supabase, Contentful.

Whether it’s setting up a client management system, building an internal tool, or automating operations with AI — I deliver quick, functional, and scalable solutions.

I’m currently pursuing a Bachelor of Science in Computer Science at Busitema University, and advancing my technical knowledge through ALX Africa’s Cybersecurity and Data Science programs, alongside CISCO’s Ethical Hacking training.

At the end of the day, my mission is to grow into a Data Scientist with a strong foundation in Cybersecurity — capable of analyzing complex data, protecting digital infrastructure, and building secure, data-powered systems.

My work as a Virtual Assistant and Developer is already helping me live that passion — by solving problems, optimizing systems, and building tools that matter.

Let’s connect if you're hiring, collaborating, or passionate about AI, cybersecurity, or product development.`;


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
                <Button size="lg" variant="outline" className="group">
                    Download CV <Download className="ml-2 h-5 w-5 transition-transform group-hover:scale-110" />
                </Button>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-80 h-[28rem] rounded-lg border-2 border-primary/50 p-2 shadow-2xl shadow-primary/20 drop-shadow-glow-primary">
                <Image
                  src={heroData?.imageUrl || "https://placehold.co/400x500.png"}
                  alt="A professional photo of Angole Sharif Abubakar"
                  data-ai-hint={heroData?.imageHint || "professional portrait"}
                  width={400}
                  height={500}
                  priority
                  className="rounded-md object-cover w-full h-full"
                />
                 <div className="absolute -bottom-4 -right-4 bg-background p-4 rounded-lg border border-border/50">
                    <p className="font-headline text-primary text-lg drop-shadow-glow-primary">Angole Sharif</p>
                    <p className="text-foreground/80 text-sm">Tech Enthusiast & Problem Solver</p>
                </div>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
}
