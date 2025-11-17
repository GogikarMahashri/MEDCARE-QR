"use client";

import { useState } from "react";
import { PatientProfile } from "@/components/medcare/patient-profile";
import { MedicationSchedule } from "@/components/medcare/medication-schedule";
import { SymptomChecker } from "@/components/medcare/symptom-checker";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, CalendarClock, Stethoscope, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 sm:p-8 font-body">
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-4">
        <PatientProfile />
        <MedicationSchedule />
        <SymptomChecker />
      </div>
    </main>
  );
}