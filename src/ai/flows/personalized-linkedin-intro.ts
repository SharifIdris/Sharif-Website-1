'use server';

/**
 * @fileOverview An AI agent that generates personalized LinkedIn introduction messages.
 *
 * - generateLinkedInIntro - A function that generates personalized LinkedIn introduction messages.
 * - GenerateLinkedInIntroInput - The input type for the generateLinkedInIntro function.
 * - GenerateLinkedInIntroOutput - The return type for the generateLinkedInIntro function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateLinkedInIntroInputSchema = z.object({
  websiteContent: z.string().describe('The content of the website.'),
  linkedInProfile: z.string().describe('The LinkedIn profile information of the user.'),
});
export type GenerateLinkedInIntroInput = z.infer<typeof GenerateLinkedInIntroInputSchema>;

const GenerateLinkedInIntroOutputSchema = z.object({
  introduction: z.string().describe('The personalized LinkedIn introduction message.'),
});
export type GenerateLinkedInIntroOutput = z.infer<typeof GenerateLinkedInIntroOutputSchema>;

export async function generateLinkedInIntro(input: GenerateLinkedInIntroInput): Promise<GenerateLinkedInIntroOutput> {
  return generateLinkedInIntroFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateLinkedInIntroPrompt',
  input: {schema: GenerateLinkedInIntroInputSchema},
  output: {schema: GenerateLinkedInIntroOutputSchema},
  prompt: `You are an AI assistant that specializes in generating personalized LinkedIn introduction messages.

  Based on the website content and the user's LinkedIn profile information, create a personalized introduction message that the user can use to connect with the website owner on LinkedIn.

  Website Content: {{{websiteContent}}}
  LinkedIn Profile: {{{linkedInProfile}}}

  Introduction:`, // No Handlebars `{{media url=...}}` syntax here since we are dealing with textual data.
});

const generateLinkedInIntroFlow = ai.defineFlow(
  {
    name: 'generateLinkedInIntroFlow',
    inputSchema: GenerateLinkedInIntroInputSchema,
    outputSchema: GenerateLinkedInIntroOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
