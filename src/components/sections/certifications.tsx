
"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Certification } from "@/content/certifications";


type CertificationsProps = {
  certifications: Certification[];
}

export default function Certifications({ certifications }: CertificationsProps) {
  const [flippedCard, setFlippedCard] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    setFlippedCard(flippedCard === index ? null : index);
  };
  
  // Display only the first 4 certifications
  const displayedCertifications = certifications.slice(0, 4);

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
          {displayedCertifications.map((cert, index) => (
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
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center [backface-visibility:hidden] overflow-hidden rounded-lg">
                    <Image 
                        src={cert.imageUrl} 
                        alt={cert.name}
                        data-ai-hint={cert.imageHint}
                        width={300}
                        height={300}
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4 text-left">
                        <p className="font-headline text-lg font-bold text-white drop-shadow-glow-primary">{cert.issuer}</p>
                        <p className="text-white/80 text-sm">{cert.name}</p>
                    </div>
                </div>

                {/* Back of the card */}
                <div className="absolute inset-0 flex flex-col rounded-lg bg-card/80 p-6 [transform:rotateY(180deg)] [backface-visibility:hidden] overflow-y-auto">
                   <h3 className="font-headline text-lg font-bold text-primary text-left mb-2">{cert.name}</h3>
                   <p className="text-sm text-foreground/80 text-left">{cert.description}</p>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
