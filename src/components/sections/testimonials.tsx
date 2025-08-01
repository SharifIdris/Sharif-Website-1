
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/content/testimonials";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';


// IMPORTANT: This is the new, dedicated Formspree endpoint for testimonials.
const TESTIMONIAL_FORM_ENDPOINT = "https://formspree.io/f/myzpjzbd";


const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
        stars.push(<Star key={i} className={cn("h-4 w-4", i < rating ? "fill-accent text-accent" : "text-muted-foreground")} />);
    }
    return stars;
};

const testimonialFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  title: z.string().min(2, "Title or Company must be at least 2 characters."),
  quote: z.string().min(10, "Testimonial must be at least 10 characters.").max(300, "Testimonial cannot exceed 300 characters."),
  rating: z.number().min(1, "Please select a rating.").max(5),
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
            rating: 0,
        },
    });

    async function onSubmit(values: z.infer<typeof testimonialFormSchema>) {
        setIsLoading(true);

        try {
            const response = await fetch(TESTIMONIAL_FORM_ENDPOINT, {
                method: "POST",
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                 toast({
                    title: "Testimonial Submitted!",
                    description: `Thank you, ${values.name}. Your feedback is valuable to me.`,
                });
                form.reset();
                setIsOpen(false);
            } else {
                toast({
                    variant: "destructive",
                    title: "Submission Error",
                    description: "Failed to send your testimonial. Please try again later.",
                });
            }
        } catch (error) {
            console.error("Error submitting testimonial:", error);
            toast({
                variant: "destructive",
                title: "Submission Error",
                description: "There was a network problem. Please check your connection and try again.",
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
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                       </div>
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
                                            maxLength={300}
                                            disabled={isLoading}
                                        />
                                    </FormControl>
                                     <div className="text-right text-xs text-muted-foreground">
                                        {field.value?.length || 0} / 300
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="rating"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Your Rating</FormLabel>
                                    <FormControl>
                                        <div className="flex items-center gap-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star
                                                    key={star}
                                                    className={cn(
                                                        "h-6 w-6 cursor-pointer transition-colors",
                                                        field.value >= star
                                                            ? "text-accent fill-accent"
                                                            : "text-muted-foreground"
                                                    )}
                                                    onClick={() => field.onChange(star)}
                                                />
                                            ))}
                                        </div>
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

type TestimonialsProps = {
    testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  if (!testimonials || testimonials.length === 0) {
    return (
        <section id="testimonials" className="py-24 sm:py-32 bg-background/80">
            <div className="container mx-auto px-4 md:px-6 text-center">
                 <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl drop-shadow-glow-primary">
                    What My Clients Are Saying
                </h2>
                <p className="mt-4 text-lg leading-8 text-foreground/70">
                    Be the first to share your experience!
                </p>
                <div className="mt-12">
                    <TestimonialDialog />
                </div>
            </div>
        </section>
    )
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
        <Carousel
          opts={{
            align: "start",
          }}
          className="mx-auto mt-16 w-full max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-4xl"
        >
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.name} className="md:basis-1/2 lg:basis-1/3">
                 <div className="p-1 h-full">
                    <Card className="flex h-full flex-col transform-gpu border-border/70 bg-card/50">
                        <CardContent className="flex flex-grow flex-col justify-between p-6">
                            <div className="text-foreground/80 italic text-sm prose prose-invert max-w-none">
                                {testimonial.quote ? documentToReactComponents(testimonial.quote) : ''}
                            </div>
                            <div className="mt-6">
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-12 w-12 border-2 border-primary/50">
                                        <AvatarImage src={testimonial.avatarUrl} alt={testimonial.name} data-ai-hint={testimonial.avatarHint} />
                                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold text-primary">{testimonial.name}</p>
                                        <p className="text-sm text-foreground/70">{testimonial.title}</p>
                                    </div>
                                </div>
                                <div className="mt-4 flex">
                                    {renderStars(testimonial.rating)}
                                </div>
                            </div>
                    </CardContent>
                    </Card>
                 </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="mt-12 text-center">
            <TestimonialDialog />
        </div>
      </div>
    </section>
  );
}

    