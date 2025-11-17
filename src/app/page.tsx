
"use client";

import { useState } from "react";
import { QrScanner } from "@/components/medcare/qr-scanner";
import { PatientProfile } from "@/components/medcare/patient-profile";
import { MedicationSchedule } from "@/components/medcare/medication-schedule";
import { SymptomChecker } from "@/components/medcare/symptom-checker";
import { DoctorPortal } from "@/components/medcare/doctor-portal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, CalendarClock, Stethoscope, BriefcaseMedical } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [view, setView] = useState("qr"); // 'qr' or 'patient'

  if (view === "qr") {
    return (
      <main className="flex min-h-screen w-full flex-col items-center bg-background p-4 sm:p-8 font-body">
        <div className="w-full max-w-4xl mx-auto flex flex-col gap-6">
          <QrScanner onScanSuccess={() => setView("patient")} />
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full py-6 text-lg">
                <BriefcaseMedical className="mr-2" /> Physician Portal
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="font-headline text-2xl">Physician Portal</DialogTitle>
              </DialogHeader>
              <DoctorPortal />
            </DialogContent>
          </Dialog>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-background p-4 sm:p-8 font-body">
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-6">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4 h-auto">
            <TabsTrigger value="profile" className="flex flex-col h-auto gap-1 py-2">
              <User />
              Profile
            </TabsTrigger>
            <TabsTrigger value="schedule" className="flex flex-col h-auto gap-1 py-2">
              <CalendarClock />
              Schedule
            </TabsTrigger>
            <TabsTrigger value="checker" className="flex flex-col h-auto gap-1 py-2">
              <Stethoscope />
              Checker
            </TabsTrigger>
            <TabsTrigger value="doctor" className="flex flex-col h-auto gap-1 py-2">
              <BriefcaseMedical />
              Doctor
            </TabsTrigger>
          </TabsList>
          <TabsContent value="profile" className="mt-6">
            <PatientProfile />
          </TabsContent>
          <TabsContent value="schedule" className="mt-6">
            <MedicationSchedule />
          </TabsContent>
          <TabsContent value="checker" className="mt-6">
            <SymptomChecker />
          </TabsContent>
          <TabsContent value="doctor" className="mt-6">
            <DoctorPortal />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
