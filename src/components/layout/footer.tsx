
import { Github, Linkedin, Twitter, ArrowUp } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { ContactForm } from "../contact-form";

const socialLinks = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/angole-sharif-abubakar/", name: "LinkedIn" },
  { icon: Github, href: "https://github.com/SharifIdris", name: "GitHub" },
  { icon: Twitter, href: "https://x.com/Sharifidris82", name: "Twitter" },
];

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-border/50 bg-background/80">
      <div className="container mx-auto px-4 py-16 md:px-6">
        <div className="grid gap-12 md:grid-cols-2">
            <div>
                 <h3 className="font-headline text-3xl font-bold text-primary drop-shadow-glow-primary">
                    Get in Touch
                </h3>
                <p className="mt-4 text-foreground/70">
                    Have a project in mind, want to collaborate, or just want to say hello?
                    <br />
                    Fill out the form or email me directly at <a href="mailto:sharifidris8@gmail.com" className="font-semibold text-primary underline-offset-4 hover:underline">sharifidris8@gmail.com</a>.
                </p>
                 <div className="mt-8">
                   <ContactForm />
                </div>
            </div>
             <div className="flex flex-col items-center justify-center gap-8 rounded-lg border border-border/50 bg-card/50 p-8 text-center transform-gpu transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20">
                <div>
                    <h4 className="font-headline text-2xl font-bold text-primary drop-shadow-glow-primary">
                    Connect on Socials
                    </h4>
                    <p className="mt-2 text-foreground/70">
                    Follow my work and thoughts on tech and development.
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    {socialLinks.map((link) => (
                    <Button key={link.name} variant="outline" size="icon" asChild>
                        <a href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.name}>
                        <link.icon className="h-5 w-5 text-foreground/80 transition-colors hover:text-primary hover:drop-shadow-glow-primary" />
                        </a>
                    </Button>
                    ))}
                </div>
            </div>
        </div>
        <div className="mt-16 border-t border-border/30 pt-8 flex justify-between items-center text-sm text-foreground/60">
          <p>&copy; {new Date().getFullYear()} Angole Sharif Abubakar. All rights reserved.</p>
           <a href="#about" className="group flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors">
              Back to Top
              <ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-1" />
           </a>
        </div>
      </div>
    </footer>
  );
}
