'use server';

/**
 * @fileOverview This file defines a Genkit flow for analyzing patient symptoms using AI.
 *
 * analyzeSymptoms - An exported function that takes patient symptoms as input and returns an analysis of possible conditions.
 * AnalyzeSymptomsInput - The input type for the analyzeSymptoms function, representing the patient's description of symptoms.
 * AnalyzeSymptomsOutput - The output type for the analyzeSymptoms function, providing a list of possible conditions.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeSymptomsInputSchema = z.string().describe('The patient-provided description of symptoms.');
export type AnalyzeSymptomsInput = z.infer<typeof AnalyzeSymptomsInputSchema>;

const AnalyzeSymptomsOutputSchema = z.object({
  possibleConditions: z
    .array(z.string())
    .describe(
      'A list of possible medical conditions that could be causing the symptoms. This list is not exhaustive and is intended to provide possible causes for the patient to consider with their healthcare provider.'
    ),
});
export type AnalyzeSymptomsOutput = z.infer<typeof AnalyzeSymptomsOutputSchema>;

export async function analyzeSymptoms(input: AnalyzeSymptomsInput): Promise<AnalyzeSymptomsOutput> {
  return analyzeSymptomsFlow(input);
}

const analyzeSymptomsPrompt = ai.definePrompt({
  name: 'analyzeSymptomsPrompt',
  input: {schema: AnalyzeSymptomsInputSchema},
  output: {schema: AnalyzeSymptomsOutputSchema},
  prompt: `You are a medical assistant. Given the following description of symptoms, provide a list of possible medical conditions that could be causing the symptoms.

Symptoms: {{{$input}}}

This list is not exhaustive and is intended to provide possible causes for the patient to consider with their healthcare provider.

Format your response as a JSON object with a single field called "possibleConditions", which is a JSON array of strings. Each string should be a possible medical condition. Do not include any explanation or introductory text in your response, only the JSON object.
`,
});

const analyzeSymptomsFlow = ai.defineFlow(
  {
    name: 'analyzeSymptomsFlow',
    inputSchema: AnalyzeSymptomsInputSchema,
    outputSchema: AnalyzeSymptomsOutputSchema,
  },
  async input => {
    const {output} = await analyzeSymptomsPrompt(input);
    return output!;
  }
);
