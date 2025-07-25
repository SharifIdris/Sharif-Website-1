import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "John Doe",
    title: "CEO, Startup Inc.",
    quote: "Sharif's expertise in AI and automation was a game-changer for our team. He streamlined our workflows and boosted our productivity by at least 30%. Highly recommended!",
    avatarUrl: "https://placehold.co/100x100.png",
    avatarHint: "man portrait",
  },
  {
    name: "Jane Smith",
    title: "Founder, Creative Solutions",
    quote: "As a non-technical founder, I was struggling to get my MVP off the ground. Sharif not only built a functional and beautiful prototype in record time but also taught me how to manage it. A true partner.",
    avatarUrl: "https://placehold.co/100x100.png",
    avatarHint: "woman portrait",
  },
  {
    name: "Samuel Lee",
    title: "Marketing Director, Tech Corp.",
    quote: "The custom AI tools Sharif developed for our content pipeline have saved us countless hours. His ability to understand our needs and translate them into a technical solution is unparalleled.",
    avatarUrl: "https://placehold.co/100x100.png",
    avatarHint: "person smiling",
  },
];

const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
        stars.push(<Star key={i} className="h-5 w-5 fill-accent text-accent" />);
    }
    return stars;
};

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 sm:py-32 bg-background/80">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl drop-shadow-glow-primary">
            What My Clients Are Saying
          </h2>
          <p className="mt-4 text-lg leading-8 text-foreground/70">
            Trusted by founders, CEOs, and marketing leaders.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-none grid-cols-1 gap-8 sm:mt-20 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="flex flex-col transform-gpu border-border/70 bg-card/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20">
                <CardContent className="flex flex-grow flex-col justify-between p-6">
                    <blockquote className="text-foreground/80 italic">"{testimonial.quote}"</blockquote>
                    <div className="mt-6 flex items-center gap-4">
                        <Avatar>
                            <AvatarImage src={testimonial.avatarUrl} alt={testimonial.name} data-ai-hint={testimonial.avatarHint} />
                            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold text-primary">{testimonial.name}</p>
                            <p className="text-sm text-foreground/70">{testimonial.title}</p>
                        </div>
                    </div>
                     <div className="mt-4 flex">
                        {renderStars(5)}
                    </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
