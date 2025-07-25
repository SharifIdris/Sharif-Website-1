import Image from "next/image";

export default function Photo() {
  return (
    <section id="photo" className="py-24 sm:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl drop-shadow-glow-primary">
            Meet Sharif
          </h2>
          <p className="mt-4 text-lg leading-8 text-foreground/70">
            The person behind the code and the strategy.
          </p>
        </div>
        <div className="mt-16 flex justify-center">
          <div className="relative w-80 h-[28rem] rounded-lg border-2 border-primary/50 p-2 shadow-2xl shadow-primary/20 drop-shadow-glow-primary">
            <Image
              src="https://placehold.co/400x500.png"
              alt="A professional photo of Angole Sharif Abubakar"
              data-ai-hint="professional portrait"
              width={400}
              height={500}
              className="rounded-md object-cover w-full h-full"
            />
             <div className="absolute -bottom-4 -right-4 bg-background p-4 rounded-lg border border-border/50">
                <p className="font-headline text-primary text-lg">Angole Sharif</p>
                <p className="text-foreground/80 text-sm">Tech Enthusiast & Problem Solver</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
