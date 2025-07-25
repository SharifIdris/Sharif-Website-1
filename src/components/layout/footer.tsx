import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const socialLinks = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/angole-sharif-abubakar/", name: "LinkedIn" },
  { icon: Github, href: "https://github.com/SharifIdris", name: "GitHub" },
  { icon: Twitter, href: "https://x.com/Sharifidris82", name: "Twitter" },
];

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-border/50 bg-background/80">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="text-center md:text-left">
            <h3 className="font-headline text-2xl font-bold text-primary drop-shadow-glow-primary">
              Let's Connect
            </h3>
            <p className="mt-2 text-foreground/70">
              Hiring, collaborating, or just passionate about tech? Reach out!
            </p>
             <div className="mt-4 flex items-center justify-center gap-2 text-foreground/80 md:justify-start">
                <Mail className="h-5 w-5" />
                <a href="mailto:sharifidris8@gmail.com" className="hover:text-primary">sharifidris8@gmail.com</a>
            </div>
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
        <div className="mt-8 border-t border-border/30 pt-8 text-center text-sm text-foreground/60">
          <p>&copy; {new Date().getFullYear()} Angole Sharif Abubakar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
