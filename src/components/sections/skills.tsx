import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { SkillCategory } from "@/content/skills";

type SkillsProps = {
  skillCategories: SkillCategory[];
};

export default function Skills({ skillCategories }: SkillsProps) {
  if (!skillCategories || skillCategories.length === 0) {
    return null;
  }
  
  return (
    <section id="skills" className="py-24 sm:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl drop-shadow-glow-primary">
            Technical Skillset
          </h2>
          <p className="mt-4 text-lg leading-8 text-foreground/70">
            A snapshot of my capabilities across different domains, continuously growing.
          </p>
        </div>
        <div className="mx-auto mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:max-w-none">
          {skillCategories.map((category) => (
            <Card key={category.title} className="transform-gpu border-border/70 bg-card/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20">
              <CardHeader className="flex-row items-center gap-4">
                {category.icon}
                <CardTitle className="font-headline text-xl text-primary">{category.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-2">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="mb-2 flex justify-between">
                      <span className="text-sm font-medium text-foreground/90">{skill.name}</span>
                      <span className="text-sm font-medium text-foreground/70">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2 [&>div]:bg-primary" />
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
