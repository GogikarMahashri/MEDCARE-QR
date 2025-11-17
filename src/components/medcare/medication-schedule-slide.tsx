import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Bell, Zap, Vibrate, Sunrise, Sun, Moon, Pill } from "lucide-react";

const TrianglePill = () => (
    <svg width="16" height="16" viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-primary-foreground/70">
        <path d="M50 15 L95 85 L5 85 Z" />
    </svg>
);


const MedicationItem = ({ name, dosage, shape, colorClass }: { name: string, dosage: string, shape: 'oval' | 'circle' | 'triangle', colorClass: string }) => {
  const getShapeStyles = () => {
    switch(shape) {
      case 'oval':
        return { borderRadius: '50px' };
      case 'circle':
        return { borderRadius: '9999px' };
      case 'triangle':
        return { borderRadius: '4px', clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', width: '28px', height: '28px', paddingTop: '4px' };
      default:
        return {};
    }
  }

  const renderIcon = () => {
    if (shape === 'triangle') {
        return <TrianglePill />;
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
          <p className="font-medium">{name}</p>
          <p className="text-xs text-muted-foreground">{dosage}</p>
        </div>
      </div>
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


export function MedicationScheduleSlide() {
  return (
    <div className="w-full p-1">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Today's Medication Schedule</CardTitle>
          <CardDescription>Your daily pill organizer and reminders.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div>
            <h3 className="text-sm font-semibold mb-3 text-primary">Reminder Settings</h3>
            <div className="flex items-center justify-around p-3 rounded-lg bg-secondary">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                <span className="text-sm">Sound</span>
                <Switch id="sound-reminder" defaultChecked />
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                <span className="text-sm">Flash</span>
                <Switch id="flash-reminder" />
              </div>
              <div className="flex items-center gap-2">
                <Vibrate className="w-5 h-5" />
                <span className="text-sm">Vibrate</span>
                <Switch id="vibrate-reminder" defaultChecked />
              </div>
            </div>
          </div>

          <Separator />

          <div className="grid md:grid-cols-3 gap-6">
            <ScheduleSection icon={Sunrise} title="Morning">
              <MedicationItem name="Lisinopril" dosage="10mg" shape="oval" colorClass="bg-blue-300" />
              <MedicationItem name="Metformin" dosage="500mg" shape="oval" colorClass="bg-red-300" />
            </ScheduleSection>
            <ScheduleSection icon={Sun} title="Afternoon">
              <MedicationItem name="Aspirin" dosage="81mg" shape="circle" colorClass="bg-yellow-300" />
            </ScheduleSection>
            <ScheduleSection icon={Moon} title="Night">
              <MedicationItem name="Atorvastatin" dosage="20mg" shape="triangle" colorClass="bg-purple-300" />
            </ScheduleSection>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
