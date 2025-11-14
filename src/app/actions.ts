"use server";
import { analyzeSymptoms, type AnalyzeSymptomsOutput } from "@/ai/flows/analyze-symptoms";

export async function analyzeSymptomsAction(symptoms: string): Promise<AnalyzeSymptomsOutput> {
  if (!symptoms || symptoms.length < 10) {
    throw new Error("Please describe your symptoms in more detail (at least 10 characters).");
  }
  try {
    const result = await analyzeSymptoms(symptoms);
    return result;
  } catch (error) {
    console.error("Error in analyzeSymptomsAction:", error);
    throw new Error("Sorry, we couldn't analyze your symptoms at this time. Please try again later.");
  }
}
