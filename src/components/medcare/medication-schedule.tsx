
"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Bell, Zap, Vibrate, Sunrise, Sun, Moon, Pill, Square, BellRing, Phone, Check } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";

const TrianglePill = () => (
    <svg width="16" height="16" viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-primary-foreground/70">
        <path d="M50 15 L95 85 L5 85 Z" />
    </svg>
);

const MedicationItem = ({ id, name, dosage, shape, colorClass, taken, onToggle }: { id: string, name: string, dosage: string, shape: 'oval' | 'circle' | 'triangle' | 'square', colorClass: string, taken: boolean, onToggle: (id: string) => void }) => {
  const getShapeStyles = () => {
    switch(shape) {
      case 'oval':
        return { borderRadius: '50px' };
      case 'circle':
        return { borderRadius: '9999px' };
      case 'triangle':
        return { borderRadius: '4px', clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', width: '28px', height: '28px', paddingTop: '4px' };
      case 'square':
        return { borderRadius: '4px' };
      default:
        return {};
    }
  }

  const renderIcon = () => {
    if (shape === 'triangle') {
        return <TrianglePill />;
    }
    if (shape === 'square') {
        return <Square className="w-4 h-4 text-primary-foreground/70" />;
    }
    return <Pill className="w-4 h-4 text-primary-foreground/70" />;
  }

  return (
    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary/50">
      <div className="flex items-center gap-3">
        <Badge 
          className={`w-10 h-10 ${colorClass} flex items-center justify-center border-2 border-primary-foreground/20`}
          style={getShapeStyles()}
        >
          {renderIcon()}
        </Badge>
        <div>
          <p className={cn("font-medium", { "line-through text-muted-foreground": taken })}>{name}</p>
          <p className={cn("text-xs text-muted-foreground", { "line-through": taken })}>{dosage}</p>
        </div>
      </div>
      <Checkbox
        id={`med-${id}`}
        checked={taken}
        onCheckedChange={() => onToggle(id)}
        className="w-5 h-5"
      />
    </div>
  )
}

const ScheduleSection = ({ icon: Icon, title, children }: { icon: React.ElementType, title: string, children: React.ReactNode }) => (
  <div>
    <div className="flex items-center gap-2 mb-2">
      <Icon className="w-5 h-5 text-primary" />
      <h4 className="font-semibold text-foreground">{title}</h4>
    </div>
    <div className="flex flex-col gap-1 pl-4 border-l-2 border-primary/20 ml-2.5">
      {children}
    </div>
  </div>
);

type Medication = {
    id: string;
    name: string;
    dosage: string;
    shape: 'oval' | 'circle' | 'triangle' | 'square';
    colorClass: string;
    taken: boolean;
};

const initialMedications = {
    morning: [
        { id: 'lisinopril', name: "Lisinopril", dosage: "10mg", shape: "oval", colorClass: "bg-blue-300", taken: false },
        { id: 'metformin', name: "Metformin", dosage: "500mg", shape: "oval", colorClass: "bg-red-300", taken: false },
    ],
    afternoon: [
        { id: 'aspirin', name: "Aspirin", dosage: "81mg", shape: "square", colorClass: "bg-yellow-300", taken: false },
    ],
    night: [
        { id: 'atorvastatin', name: "Atorvastatin", dosage: "20mg", shape: "triangle", colorClass: "bg-purple-300", taken: false },
    ]
};

export function MedicationSchedule() {
  const [reminderSettings, setReminderSettings] = useState({
    sound: true,
    flash: false,
    vibrate: true,
  });
  const [isFlashing, setIsFlashing] = useState(false);
  const [customerCareReminder, setCustomerCareReminder] = useState(false);
  const [medications, setMedications] = useState(initialMedications);

  const { toast } = useToast();

  const handleToggleMedication = (id: string) => {
    const newMedications = { ...medications };
    for (const time of Object.keys(newMedications) as Array<keyof typeof newMedications>) {
        const medIndex = newMedications[time].findIndex(m => m.id === id);
        if (medIndex !== -1) {
            const med = newMedications[time][medIndex];
            newMedications[time][medIndex] = { ...med, taken: !med.taken };
            if (!med.taken) {
                 toast({
                    description: `${med.name} marked as taken.`,
                 });
            }
            break;
        }
    }
    setMedications(newMedications);
  };

  const playSound = () => {
    try {
      const audio = new Audio("data:audio/mp3;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGlicmFzaW9uIST+BwARUAAAAgAAAAA=");
      audio.play().catch(e => console.error("Audio play failed:", e));
    } catch(e) {
      console.error("Could not play sound", e)
    }
  };

  const triggerFlash = () => {
    setIsFlashing(true);
    setTimeout(() => {
      setIsFlashing(false);
    }, 300); // Duration of the flash animation
  };

  const handleReminderChange = (type: keyof typeof reminderSettings, checked: boolean) => {
    setReminderSettings(prev => ({ ...prev, [type]: checked }));
    
    if (checked) {
      if (type === 'sound') {
        playSound();
      }
      if (type === 'vibrate') {
        if ('vibrate' in navigator) {
          navigator.vibrate(200); // Vibrate for 200ms
        } else {
          toast({
            description: "Vibration is not supported on this device.",
          });
        }
      }
      if (type === 'flash') {
        triggerFlash();
      }
    }
  };


  return (
    <div className="w-full p-1">
       <div className={cn('screen-flash', { 'active': isFlashing })} />
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Today's Medication Schedule</CardTitle>
          <CardDescription>Your daily pill organizer and reminders.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div>
            <h3 className="text-sm font-semibold mb-3 text-primary">Reminder Settings</h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-around p-3 rounded-lg bg-secondary">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  <span className="text-sm">Sound</span>
                  <Switch 
                    id="sound-reminder" 
                    checked={reminderSettings.sound}
                    onCheckedChange={(checked) => handleReminderChange('sound', checked)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  <span className="text-sm">Flash</span>
                  <Switch 
                    id="flash-reminder" 
                    checked={reminderSettings.flash}
                    onCheckedChange={(checked) => handleReminderChange('flash', checked)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Vibrate className="w-5 h-5" />
                  <span className="text-sm">Vibrate</span>
                  <Switch 
                    id="vibrate-reminder" 
                    checked={reminderSettings.vibrate}
                    onCheckedChange={(checked) => handleReminderChange('vibrate', checked)}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center space-x-2">
                  <BellRing className="h-5 w-5 text-primary"/>
                  <div>
                    <Label htmlFor="call-reminder">Customer Care Reminders</Label>
                    <p className="text-xs text-muted-foreground">
                      Enable automated reminder calls.
                    </p>
                  </div>
                </div>
                <Switch
                  id="call-reminder"
                  checked={customerCareReminder}
                  onCheckedChange={setCustomerCareReminder}
                />
              </div>

               <div className="rounded-lg border p-3">
                <h3 className="text-sm font-semibold mb-3 text-primary">Support</h3>
                <div className="space-y-2">
                  <Label htmlFor="customer-care">Customer Care No.</Label>
                  <div className="relative flex items-center">
                    <Phone className="absolute left-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="customer-care"
                      type="tel"
                      readOnly
                      value="+1 800 123 4567"
                      className="pl-10 bg-secondary"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="grid md:grid-cols-3 gap-6">
            <ScheduleSection icon={Sunrise} title="Morning">
              {medications.morning.map(med => (
                  <MedicationItem key={med.id} {...med} onToggle={handleToggleMedication} />
              ))}
            </ScheduleSection>
            <ScheduleSection icon={Sun} title="Afternoon">
              {medications.afternoon.map(med => (
                  <MedicationItem key={med.id} {...med} onToggle={handleToggleMedication} />
              ))}
            </ScheduleSection>
            <ScheduleSection icon={Moon} title="Night">
              {medications.night.map(med => (
                  <MedicationItem key={med.id} {...med} onToggle={handleToggleMedication} />
              ))}
            </ScheduleSection>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

    