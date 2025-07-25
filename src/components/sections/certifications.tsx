import { Badge } from "@/components/ui/badge";
import { Award, ShieldCheck, DatabaseZap } from "lucide-react";

const certifications = [
  {
    issuer: "ALX Africa",
    name: "Cybersecurity",
    icon: <ShieldCheck className="mr-2 h-4 w-4" />,
  },
  {
    issuer: "ALX Africa",
    name: "Data Science",
    icon: <DatabaseZap className="mr-2 h-4 w-4" />,
  },
  {
    issuer: "CISCO",
    name: "Ethical Hacking",
    icon: <ShieldCheck className="mr-2 h-4 w-4" />,
  },
  {
    issuer: "Virtual Assistant",
    name: "Certified Expert",
    icon: <Award className="mr-2 h-4 w-4" />,
  },
];

export default function Certifications() {
  return (
    <section id="certifications" className="bg-background/80 py-24 sm:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl drop-shadow-glow-primary">
            Continuous Learning & Certifications
          </h2>
          <p className="mt-4 text-lg leading-8 text-foreground/70">
            Committed to advancing my technical knowledge and staying at the forefront of technology.
          </p>
        </div>
        <div className="mt-16 flex flex-wrap justify-center gap-4">
          {certifications.map((cert) => (
            <Badge key={`${cert.issuer}-${cert.name}`} variant="outline" className="transform-gpu cursor-default border-accent/50 bg-accent/10 px-4 py-2 text-base text-accent transition-all hover:bg-accent/20 hover:shadow-lg hover:shadow-accent/10">
              {cert.icon}
              <span className="font-medium">{cert.issuer}:</span>&nbsp;{cert.name}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
}
