"use client";

import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { generateLinkedInIntro } from "@/ai/flows/personalized-linkedin-intro";
import { Loader2, Copy, Check } from "lucide-react";

const formSchema = z.object({
  linkedInProfile: z.string().min(50, {
    message: "Profile information must be at least 50 characters.",
  }),
});

type LinkedInConnectProps = {
  children: ReactNode;
  websiteContent: string;
};

export function LinkedInConnect({ children, websiteContent }: LinkedInConnectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedIntro, setGeneratedIntro] = useState("");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      linkedInProfile: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setGeneratedIntro("");
    try {
      const result = await generateLinkedInIntro({
        websiteContent,
        linkedInProfile: values.linkedInProfile,
      });
      setGeneratedIntro(result.introduction);
    } catch (error) {
      console.error("Error generating intro:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate introduction. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedIntro);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetState = () => {
      form.reset();
      setGeneratedIntro("");
      setIsLoading(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
        setIsOpen(open)
        if (!open) {
            resetState();
        }
    }}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="font-headline text-primary">Personalized Intro Generator</DialogTitle>
          <DialogDescription>
            Generate a custom LinkedIn connection request message based on your profile.
          </DialogDescription>
        </DialogHeader>
        {generatedIntro ? (
            <div className="space-y-4">
                <p className="text-sm font-medium">Here is your personalized introduction:</p>
                <div className="relative rounded-md border bg-muted/50 p-4">
                    <p className="text-foreground/90">{generatedIntro}</p>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="absolute top-2 right-2 h-7 w-7"
                        onClick={handleCopy}
                    >
                        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                    </Button>
                </div>
                <DialogFooter>
                    <Button variant="secondary" onClick={resetState}>Generate another</Button>
                    <DialogClose asChild>
                        <Button>Close</Button>
                    </DialogClose>
                </DialogFooter>
            </div>
        ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="linkedInProfile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your LinkedIn Profile Information</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Paste your LinkedIn 'About' section or a brief summary of your profile here..."
                      className="min-h-[150px]"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Generate Intro
              </Button>
            </DialogFooter>
          </form>
        </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
