"use client";

import { useState } from "react";
import { PatientProfile } from "@/components/medcare/patient-profile";
import { MedicationSchedule } from "@/components/medcare/medication-schedule";
import { SymptomChecker } from "@/components/medcare/symptom-checker";
import { QrScanner } from "@/components/medcare/qr-scanner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, CalendarClock, Stethoscope, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import { DoctorPortal } from "@/components/medcare/doctor-portal";

type View = "scanner" | "profile" | "schedule" | "checker" | "doctor";

const NavButton = ({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ElementType;
  label: string;
}) => (
  <Button
    variant="ghost"
    className={cn(
      "flex flex-col items-center h-auto gap-1 text-muted-foreground hover:text-primary",
      active && "bg-primary/10 text-primary rounded-lg"
    )}
    onClick={onClick}
  >
    <Icon className="w-6 h-6" />
    <span className="text-xs font-semibold">{label}</span>
  </Button>
);

export default function Home() {
  const [activeView, setActiveView] = useState<View>("scanner");

  const renderContent = () => {
    switch (activeView) {
      case "scanner":
        return <QrScanner onScanSuccess={() => setActiveView("profile")} />;
      case "profile":
        return <PatientProfile />;
      case "schedule":
        return <MedicationSchedule />;
      case "checker":
        return <SymptomChecker />;
      case "doctor":
        return <DoctorPortal />;
      default:
        return <QrScanner onScanSuccess={() => setActiveView("profile")} />;
    }
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-background p-4 sm:p-8 font-body">
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-4">
        {activeView !== "scanner" && (
          <Card>
            <CardContent className="p-2">
              <div className="flex justify-around items-center">
                <NavButton
                  active={activeView === "profile"}
                  onClick={() => setActiveView("profile")}
                  icon={User}
                  label="Profile"
                />
                <NavButton
                  active={activeView === "schedule"}
                  onClick={() => setActiveView("schedule")}
                  icon={CalendarClock}
                  label="Schedule"
                />
                <NavButton
                  active={activeView === "checker"}
                  onClick={() => setActiveView("checker")}
                  icon={Stethoscope}
                  label="Checker"
                />
                <NavButton
                  active={activeView === "doctor"}
                  onClick={() => setActiveView("doctor")}
                  icon={Briefcase}
                  label="Doctor"
                />
              </div>
            </CardContent>
          </Card>
        )}
        
        {renderContent()}
      </div>
    </main>
  );
}
