
"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Award, ShieldCheck, DatabaseZap } from "lucide-react";
import { cn } from "@/lib/utils";

const certifications = [
  {
    issuer: "ALX Africa",
    name: "Cybersecurity",
    icon: <ShieldCheck className="h-12 w-12 text-primary drop-shadow-glow-primary" />,
    description: "Completed an intensive program covering network security, ethical hacking, and threat analysis to build a strong foundation in protecting digital assets.",
  },
  {
    issuer: "ALX Africa",
    name: "Data Science",
    icon: <DatabaseZap className="h-12 w-12 text-primary drop-shadow-glow-primary" />,
    description: "Gained practical experience in data analysis, machine learning, and visualization techniques to extract insights and drive data-informed decisions.",
  },
  {
    issuer: "CISCO",
    name: "Ethical Hacking",
    icon: <ShieldCheck className="h-12 w-12 text-primary drop-shadow-glow-primary" />,
    description: "Learned to identify and exploit vulnerabilities in a controlled environment, mastering the tools and methodologies used to secure modern networks.",
  },
  {
    issuer: "Virtual Assistant",
    name: "Certified Expert",
    icon: <Award className="h-12 w-12 text-primary drop-shadow-glow-primary" />,
    description: "Mastered advanced skills in administrative support, client management, and automation to provide exceptional virtual assistance and streamline business operations.",
  },
];

export default function Certifications() {
  const [flippedCard, setFlippedCard] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    setFlippedCard(flippedCard === index ? null : index);
  };

  return (
    <section id="certifications" className="py-24 sm:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl drop-shadow-glow-primary">
            Continuous Learning & Certifications
          </h2>
          <p className="mt-4 text-lg leading-8 text-foreground/70">
            Committed to advancing my technical knowledge. Click a card to learn more.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 [perspective:1000px]">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="relative h-64 w-full cursor-pointer group"
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
                  {cert.icon}
                  <p className="mt-4 font-headline text-lg font-bold text-primary">{cert.issuer}</p>
                  <p className="text-foreground/80">{cert.name}</p>
                </div>

                {/* Back of the card */}
                <div className="absolute inset-0 flex flex-col justify-center rounded-lg bg-card/80 p-6 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                   <h3 className="font-headline text-lg font-bold text-primary text-center mb-2">{cert.name}</h3>
                   <p className="text-sm text-foreground/80 text-center">{cert.description}</p>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
