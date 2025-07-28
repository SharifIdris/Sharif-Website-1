
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
];

function Logo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className="h-10 w-10 text-primary"
    >
      <defs>
        <linearGradient id="grad-header" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor: 'hsl(var(--primary))'}} />
          <stop offset="100%" style={{stopColor: 'hsl(var(--accent))'}} />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="45" fill="none" stroke="url(#grad-header)" strokeWidth="5" />
      <path d="M25 35 C20 40, 20 60, 25 65" stroke="url(#grad-header)" strokeWidth="4" fill="none" />
      <circle cx="25" cy="35" r="3" fill="url(#grad-header)" />
      <circle cx="25" cy="65" r="3" fill="url(#grad-header)" />
      <path d="M75 35 C80 40, 80 60, 75 65" stroke="url(#grad-header)" strokeWidth="4" fill="none" />
      <circle cx="75" cy="35" r="3" fill="url(#grad-header)" />
      <circle cx="75" cy="65" r="3" fill="url(#grad-header)" />
      <text 
        x="50" 
        y="60" 
        fontFamily="Space Grotesk, sans-serif" 
        fontSize="36" 
        fill="url(#grad-header)"
        textAnchor="middle" 
        fontWeight="bold"
      >
        SDH
      </text>
    </svg>
  );
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NavContent = () => (
    <>
      {navLinks.map((link) => (
        <Button key={link.href} variant="link" asChild>
          <a
            href={link.href}
            onClick={() => setIsSheetOpen(false)}
            className="text-foreground/80 transition-colors hover:text-primary hover:drop-shadow-glow-primary"
          >
            {link.label}
          </a>
        </Button>
      ))}
    </>
  );

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "border-b border-border/50 bg-background/80 backdrop-blur-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
          <span className="font-headline text-xl font-bold text-primary drop-shadow-glow-primary">
            Sharif's Digital Hub
          </span>
        </Link>
        <nav className="hidden items-center gap-4 md:flex">
          <NavContent />
        </nav>
        <div className="md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col items-start gap-4 p-4">
                 <Link href="/" onClick={() => setIsSheetOpen(false)} className="flex items-center gap-2 mb-4">
                    <Logo />
                    <span className="font-headline text-xl font-bold text-primary drop-shadow-glow-primary">
                        Sharif's Digital Hub
                    </span>
                 </Link>
                <NavContent />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
