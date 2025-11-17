"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Volume2, Send, Bot, AlertCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { analyzeSymptomsAction } from "@/app/actions";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import type { AnalyzeSymptomsOutput } from "@/ai/flows/analyze-symptoms";
import { Badge } from "../ui/badge";

const symptomSchema = z.object({
  symptoms: z.string().min(10, { message: "Please describe your symptoms in at least 10 characters." }),
});

const medicationScheduleText = "Your morning medication is one 10mg Lisinopril tablet and one 500mg Metformin tablet. Your afternoon medication is one 81mg Aspirin tablet. Your night medication is one 20mg Atorvastatin capsule. Please consult your doctor for any changes.";

export function SymptomChecker() {
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalyzeSymptomsOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof symptomSchema>>({
    resolver: zodResolver(symptomSchema),
    defaultValues: {
      symptoms: "",
    },
  });

  const handleSpeak = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(medicationScheduleText);
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance);
    } else {
      toast({
        variant: "destructive",
        title: "Unsupported Browser",
        description: "Your browser does not support the voice assistant feature.",
      });
    }
  };

  const onSubmit = async (values: z.infer<typeof symptomSchema>) => {
    setIsLoading(true);
    setAnalysisResult(null);
    try {
      const result = await analyzeSymptomsAction(values.symptoms);
      setAnalysisResult(result);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: errorMessage,
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full p-1">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Tools & Assistance</CardTitle>
          <CardDescription>Voice help and symptom analysis powered by AI.</CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-8">
          {/* Voice Assistant */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold flex items-center gap-2"><Volume2 className="w-5 h-5 text-primary" /> Voice Assistant</h3>
            <p className="text-sm text-muted-foreground">
              Press the button to hear your medication schedule for today.
            </p>
            <Button onClick={handleSpeak}>
              <Volume2 className="mr-2 h-4 w-4" />
              Read Schedule Aloud
            </Button>
          </div>

          <Separator orientation="vertical" className="hidden md:block" />
          <Separator orientation="horizontal" className="md:hidden" />

          {/* Symptom Checker */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold flex items-center gap-2"><Bot className="w-5 h-5 text-primary" /> Symptom Checker</h3>
            <p className="text-sm text-muted-foreground">
              Describe your symptoms below, and our AI will provide a list of possible conditions for you to discuss with your doctor.
            </p>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="symptoms"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., 'I have a persistent cough, a slight fever, and feel very tired.'"
                          className="resize-none"
                          {...field}
                          rows={4}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="mr-2 h-4 w-4" />
                  )}
                  Analyze Symptoms
                </Button>
              </form>
            </Form>
            
            {analysisResult && (
              <div className="mt-4 p-4 bg-secondary rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-primary" />
                  Possible Conditions
                </h4>
                <p className="text-xs text-muted-foreground mb-3">This is not a medical diagnosis. Please consult a healthcare professional.</p>
                <div className="flex flex-wrap gap-2">
                  {analysisResult.possibleConditions.map((condition, index) => (
                    <Badge key={index} variant="outline" className="text-sm bg-background">
                      {condition}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
