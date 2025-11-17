
"use client";

import { useState } from "react";
import { QrScanner } from "@/components/medcare/qr-scanner";
import { PatientProfile } from "@/components/medcare/patient-profile";
import { MedicationSchedule } from "@/components/medcare/medication-schedule";
import { SymptomChecker } from "@/components/medcare/symptom-checker";
import { DoctorPortal } from "@/components/medcare/doctor-portal";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const [isProfileVisible, setProfileVisible] = useState(false);

  const renderPatientView = () => (
    <>
      <PatientProfile />
      <MedicationSchedule />
      <SymptomChecker />
    </>
  );

  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-background p-4 sm:p-8 font-body">
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-6">
        {isProfileVisible ? (
          renderPatientView()
        ) : (
          <>
            <QrScanner onScanSuccess={() => setProfileVisible(true)} />
            <div className="relative flex justify-center">
                <Separator className="absolute top-1/2 w-full" />
                <span className="relative bg-background px-4 text-sm text-muted-foreground z-10">OR</span>
            </div>
            <DoctorPortal />
          </>
        )}
      </div>
    </main>
  );
}
