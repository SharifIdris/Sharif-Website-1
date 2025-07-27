
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, MessageSquarePlus, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";


// This is the same Formspree endpoint from your contact form.
// You might want to create a separate one for testimonials later.
const FORM_ENDPOINT = "https://formspree.io/f/mzzvravr"; 


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

const testimonialFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  title: z.string().min(2, "Title or Company must be at least 2 characters."),
  quote: z.string().min(10, "Testimonial must be at least 10 characters."),
});


const TestimonialDialog = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { toast } = useToast();

    const form = useForm<z.infer<typeof testimonialFormSchema>>({
        resolver: zodResolver(testimonialFormSchema),
        defaultValues: {
            name: "",
            title: "",
            quote: "",
        },
    });

    async function onSubmit(values: z.infer<typeof testimonialFormSchema>) {
        setIsLoading(true);
        try {
            const response = await fetch(FORM_ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  ...values,
                  _subject: `New Testimonial from ${values.name}`,
                }),
            });

            if (!response.ok) {
                throw new Error("Form submission failed.");
            }
            
            toast({
                title: "Testimonial Submitted!",
                description: `Thank you, ${values.name}. Your feedback is valuable to me.`,
            });
            form.reset();
            setIsOpen(false);
        } catch (error) {
            console.error("Error submitting testimonial:", error);
            toast({
                variant: "destructive",
                title: "Submission Error",
                description: "Failed to send your testimonial. Please try again later.",
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="group">
                    Leave a Review
                    <MessageSquarePlus className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="font-headline text-primary drop-shadow-glow-primary">Share Your Experience</DialogTitle>
                    <DialogDescription>
                        Your feedback helps me grow and helps others understand my work.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Your Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., Jane Doe" {...field} disabled={isLoading} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Your Title / Company</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., CEO at Innovate Inc." {...field} disabled={isLoading} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="quote"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Testimonial</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Share your thoughts on our collaboration..."
                                            className="min-h-[100px]"
                                            {...field}
                                            disabled={isLoading}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit" disabled={isLoading} className="w-full">
                                {isLoading ? (
                                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</>
                                ) : (
                                    <><Send className="mr-2 h-4 w-4" /> Submit Review</>
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
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
        <div className="mt-12 text-center">
            <TestimonialDialog />
        </div>
      </div>
    </section>
  );
}
