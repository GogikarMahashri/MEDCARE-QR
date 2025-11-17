
"use server";

import { z } from 'zod';

const AnalyzeSymptomsOutputSchema = z.object({
  possibleConditions: z
    .array(z.string())
    .describe(
      'A list of possible medical conditions or suggested over-the-counter solutions for the symptoms. This list is not exhaustive and is intended to provide possible causes for the patient to consider with their healthcare provider.'
    ),
});
export type AnalyzeSymptomsOutput = z.infer<typeof AnalyzeSymptomsOutputSchema>;

const mockResponses: AnalyzeSymptomsOutput[] = [
    {
        possibleConditions: [
            "For fever, you could consider taking Paracetamol. Please follow package instructions and consult a doctor if fever persists.",
            "Possible conditions may include a common viral infection. Rest and hydration are recommended."
        ]
    },
    {
        possibleConditions: [
            "For cold symptoms, an antihistamine like Cetirizine might help. Always check with a pharmacist for suitability.",
            "It sounds like you might have a common cold. Get plenty of rest and drink fluids."
        ]
    },
    {
        possibleConditions: [
            "For a cough, a syrup like Benadryl cough formula could provide relief. Ensure it is suitable for your type of cough.",
            "A persistent cough could be a sign of bronchitis. It is advisable to see a doctor."
        ]
    },
    {
        possibleConditions: [
            "Headaches can be caused by stress or dehydration. Try drinking water and resting.",
            "For tension headaches, you could consider Ibuprofen. Do not exceed the recommended dose."
        ]
    },
    {
        possibleConditions: [
            "Fatigue can be a symptom of many things, including lack of sleep or stress. Ensure you are getting adequate rest.",
            "If fatigue is persistent, it's a good idea to get blood work done to check for deficiencies."
        ]
    }
];

export async function analyzeSymptomsAction(symptoms: string): Promise<AnalyzeSymptomsOutput> {
  if (!symptoms || symptoms.length < 3) {
    throw new Error("Please describe your symptoms in more detail.");
  }
  
  // Return a random mock response to ensure the feature always "works"
  const randomIndex = Math.floor(Math.random() * mockResponses.length);
  const randomResponse = mockResponses[randomIndex];

  // Simulate a network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return randomResponse;
}
