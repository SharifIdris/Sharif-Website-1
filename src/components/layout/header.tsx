"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, CodeXml } from "lucide-react";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
];

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
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <CodeXml className="h-6 w-6 text-primary drop-shadow-glow-primary" />
          <span className="font-headline text-xl font-bold text-primary">
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
                    <CodeXml className="h-6 w-6 text-primary drop-shadow-glow-primary" />
                    <span className="font-headline text-xl font-bold text-primary">
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
