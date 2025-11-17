"use server";

import OpenAI from 'openai';
import { z } from 'zod';

const AnalyzeSymptomsOutputSchema = z.object({
  possibleConditions: z
    .array(z.string())
    .describe(
      'A list of possible medical conditions or suggested over-the-counter solutions for the symptoms. This list is not exhaustive and is intended to provide possible causes for the patient to consider with their healthcare provider.'
    ),
});
export type AnalyzeSymptomsOutput = z.infer<typeof AnalyzeSymptomsOutputSchema>;

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const getSystemPrompt = (symptoms: string) => `You are a safe medical-information assistant for a Symptom Checker.
When the user enters symptoms, respond in the structured format below.
Do NOT give a diagnosis. Use phrases like ‘possible conditions may include…’.
Do NOT prescribe restricted medications.
Use only over-the-counter examples when appropriate and include safety notes.

For simple symptoms, you can provide a direct suggestion. Here are some examples:
- If symptoms include "fever", one of the suggestions should be "For fever, you could consider taking Paracetamol. Please follow package instructions and consult a doctor if fever persists."
- If symptoms include "cold" or "runny nose", one of the suggestions should be "For cold symptoms, an antihistamine like Cetirizine might help. Always check with a pharmacist for suitability."
- If symptoms include "cough", one of the suggestions should be "For a cough, a syrup like Benadryl cough formula could provide relief. Ensure it is suitable for your type of cough."

For more complex symptoms, list possible conditions.

Symptoms: ${symptoms}

Format your response as a JSON object with a single field called "possibleConditions", which is a JSON array of strings. Each string should be a possible medical condition or a suggested solution. Do not include any explanation or introductory text in your response, only the JSON object.`;


export async function analyzeSymptomsAction(symptoms: string): Promise<AnalyzeSymptomsOutput> {
  if (!symptoms || symptoms.length < 3) {
    throw new Error("Please describe your symptoms in more detail.");
  }
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OpenAI API key is not configured.");
  }

  try {
    const prompt = getSystemPrompt(symptoms);

    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      response_format: { type: "json_object" },
      messages: [{ role: "system", content: prompt }],
    });

    if (!completion.choices[0].message.content) {
      throw new Error("Received an empty response from the AI.");
    }

    const data = JSON.parse(completion.choices[0].message.content);

    // Validate with Zod
    const validated = AnalyzeSymptomsOutputSchema.parse(data);

    return validated;
  } catch (error) {
    console.error("Symptom analysis error:", error);
    throw new Error("Sorry, we couldn't analyze your symptoms at this time. Please check your API key or try again later.");
  }
}
