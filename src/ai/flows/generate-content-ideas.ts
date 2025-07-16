'use server';

/**
 * @fileOverview Generates branded content ideas based on the provided festival, brand, and insight.
 *
 * - generateContentIdeas - A function that generates content ideas.
 * - GenerateContentIdeasInput - The input type for the generateContentIdeas function.
 * - GenerateContentIdeasOutput - The return type for the generateContentIdeas function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateContentIdeasInputSchema = z.object({
  festival: z.string().describe('The festival or special day.'),
  brand: z.string().describe('The brand name.'),
  insight: z.string().describe('The insight about the target audience.'),
});
export type GenerateContentIdeasInput = z.infer<typeof GenerateContentIdeasInputSchema>;

const GenerateContentIdeasOutputSchema = z.object({
  idea: z.string().describe('The generated content idea.'),
  format: z.string().describe('The format of the content (e.g., video, image, text).'),
  visualCue: z.string().describe('A visual cue for the content.'),
  copyLine: z.string().describe('A copy line for the content.'),
  rationale: z
    .string()
    .describe('An explanation of how the idea connects the festival, brand, and insight, and which technique (Contrast, Harmony, or Subversion) was used.'),
});
export type GenerateContentIdeasOutput = z.infer<typeof GenerateContentIdeasOutputSchema>;

export async function generateContentIdeas(input: GenerateContentIdeasInput): Promise<GenerateContentIdeasOutput> {
  return generateContentIdeasFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateContentIdeasPrompt',
  input: {schema: GenerateContentIdeasInputSchema},
  output: {schema: GenerateContentIdeasOutputSchema},
  prompt: `You are a creative marketing expert. Generate a branded content idea based on the provided festival, brand, and insight.

  Festival: {{{festival}}}
  Brand: {{{brand}}}
  Insight: {{{insight}}}

  The content idea should connect a festival emotion or ritual to a brand tension or benefit using one of these three techniques: Contrast, Harmony, or Subversion.

  Return the idea, format, visual cue, copy line, and a rationale. The rationale must explain the connection and explicitly state which technique (Contrast, Harmony, or Subversion) was used.
  `,
});

const generateContentIdeasFlow = ai.defineFlow(
  {
    name: 'generateContentIdeasFlow',
    inputSchema: GenerateContentIdeasInputSchema,
    outputSchema: GenerateContentIdeasOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
