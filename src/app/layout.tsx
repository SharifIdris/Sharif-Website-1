import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "Sharif's Digital Hub",
  description: "Portfolio for Angole Sharif Abubakar - Virtual Assistant, AI Expert, and Developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const faviconSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:hsl(195, 100%, 50%);stop-opacity:1" />
          <stop offset="100%" style="stop-color:hsl(276, 90%, 60%);stop-opacity:1" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="45" fill="none" stroke="url(#grad)" stroke-width="5" />
      <path d="M25 35 C20 40, 20 60, 25 65" stroke="url(#grad)" stroke-width="4" fill="none" />
      <circle cx="25" cy="35" r="3" fill="url(#grad)" />
      <circle cx="25" cy="65" r="3" fill="url(#grad)" />
      <path d="M75 35 C80 40, 80 60, 75 65" stroke="url(#grad)" stroke-width="4" fill="none" />
      <circle cx="75" cy="35" r="3" fill="url(#grad)" />
      <circle cx="75" cy="65" r="3" fill="url(#grad)" />
      <text 
        x="50" 
        y="60" 
        font-family="Space Grotesk, sans-serif" 
        font-size="36" 
        fill="url(#grad)"
        text-anchor="middle" 
        font-weight="bold"
      >
        SDH
      </text>
    </svg>
  `;
  const faviconDataUrl = `data:image/svg+xml;base64,${btoa(faviconSvg)}`;

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="icon" href={faviconDataUrl} type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased selection:bg-accent selection:text-accent-foreground">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
