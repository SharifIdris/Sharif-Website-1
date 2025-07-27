
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
    {
      name: "Okello Ivan",
      title: "Senior Entrepreneur",
      quote: "Working with Sharif has been an absolute game-changer. His ability to blend technical precision with creative problem-solving consistently elevates every project. Whether it’s streamlining workflows with AI tools or crafting intuitive digital solutions, his dedication and adaptability shine through. A true asset to any team.",
      avatarUrl: "https://images.ctfassets.net/hk8kaeaoi9ri/7aNc1DiVTRr4ULiyoN4uBi/04a3981a12a166ac6c0de166337a6d10/Agentic.jpeg",
      avatarHint: "okello portrait",
    },
     {
      name: "Joan Karungi",
      title: "Founder, Afro-Designs",
      quote: "Sharif's virtual assistance was pivotal in organizing our digital workspace. His mastery of Notion and Google Workspace brought much-needed structure to our team, improving our productivity tenfold. He's reliable, proactive, and a pleasure to work with.",
      avatarUrl: "https://placehold.co/100x100.png",
      avatarHint: "joan portrait",
    },
     {
      name: "David L.",
      title: "Tech Startup CEO",
      quote: "The MVP Sharif developed for us was delivered incredibly fast and was exactly what we needed to secure our first round of funding. His AI-powered approach to development is both innovative and efficient.",
      avatarUrl: "https://placehold.co/100x100.png",
      avatarHint: "david portrait",
    }
];

const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
        stars.push(<Star key={i} className="h-4 w-4 fill-accent text-accent" />);
    }
    return stars;
};

export default function Testimonials() {
  if (!testimonials || testimonials.length === 0) {
    return null; // Don't render the section if there are no testimonials
  }

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
                    <div className="flex-grow">
                         <blockquote className="text-foreground/80 italic text-sm">"{testimonial.quote}"</blockquote>
                    </div>
                    <div className="mt-6 flex items-center gap-4">
                        <Avatar className="h-10 w-10 border-2 border-primary/50">
                            <AvatarImage src={testimonial.avatarUrl} alt={testimonial.name} data-ai-hint={testimonial.avatarHint} />
                            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold text-primary text-sm">{testimonial.name}</p>
                            <p className="text-xs text-foreground/70">{testimonial.title}</p>
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
