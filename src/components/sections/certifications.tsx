
"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Certification } from "@/content/certifications";
import { CheckCircle } from "lucide-react";


type CertificationsProps = {
  certifications: Certification[];
}

export default function Certifications({ certifications }: CertificationsProps) {
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
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="mx-auto mt-16 w-full max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-4xl"
        >
          <CarouselContent>
            {certifications.map((cert, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 group">
                <div className="p-1">
                   <div
                    className="relative h-72 w-full [perspective:1000px] transition-transform duration-300 ease-in-out group-hover:scale-105"
                    >
                    <div
                        className={cn(
                        "absolute inset-0 h-full w-full transform-gpu transition-all duration-700 [transform-style:preserve-3d]",
                        flippedCard === index && "[transform:rotateY(180deg)]"
                        )}
                    >
                        {/* Front of the card */}
                        <div 
                            className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center text-center [backface-visibility:hidden] overflow-hidden rounded-lg drop-shadow-glow-primary"
                            onClick={() => handleCardClick(index)}
                        >
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
                        <div
                            className="absolute inset-0 flex cursor-pointer flex-col rounded-lg bg-card/80 p-6 [transform:rotateY(180deg)] [backface-visibility:hidden] overflow-y-auto"
                            onClick={() => handleCardClick(index)}
                        >
                            <div className="flex items-center justify-center gap-2 mb-2">
                                {cert.icon}
                                <h3 className="font-headline text-lg font-bold text-primary text-center">{cert.name}</h3>
                            </div>
                            <ul className="space-y-2 text-left">
                                {cert.description.split('\n').map((item, i) => (
                                <li key={i} className="flex items-start">
                                    <CheckCircle className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-accent" />
                                    <span className="text-sm text-foreground/80">{item}</span>
                                </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
