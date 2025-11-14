import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { User, Cake, VenetianMask, Droplets, HeartPulse, ClipboardList, Phone, Mail, Stethoscope, Hospital, CalendarDays } from "lucide-react";

const patientImage = PlaceHolderImages.find(p => p.id === 'patient-photo');

const InfoItem = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: string }) => (
  <div className="flex items-start gap-3">
    <Icon className="w-4 h-4 text-primary mt-1 shrink-0" />
    <div className="flex flex-col">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  </div>
);

export function PatientProfileSlide() {
  return (
    <div className="w-full p-1">
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-4">
          <Avatar className="h-20 w-20 border-2 border-primary">
            {patientImage && <AvatarImage data-ai-hint={patientImage.imageHint} src={patientImage.imageUrl} alt="Patient Photo" />}
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="font-headline text-2xl">Jane Doe</CardTitle>
            <p className="text-muted-foreground">Patient ID: MCQR-12345</p>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-6">
            <InfoItem icon={Cake} label="Age" value="72 Years" />
            <InfoItem icon={VenetianMask} label="Gender" value="Female" />
            <InfoItem icon={Droplets} label="Blood Group" value="O+" />
            <InfoItem icon={HeartPulse} label="Health Diseases" value="Hypertension, Diabetes" />
            <InfoItem icon={ClipboardList} label="Symptoms" value="Mild headache, Fatigue" />
          </div>

          <Separator />
          
          <div>
            <h3 className="text-sm font-semibold mb-4 text-primary">Contact Information</h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-6">
              <InfoItem icon={Phone} label="Contact Number" value="+1 234 567 890" />
              <InfoItem icon={Mail} label="Email" value="jane.doe@email.com" />
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-sm font-semibold mb-4 text-primary">Other Details</h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-6">
              <InfoItem icon={Stethoscope} label="Doctor's Name" value="Dr. Emily Carter" />
              <InfoItem icon={Hospital} label="Hospital Name" value="City General Hospital" />
              <InfoItem icon={CalendarDays} label="Last Consultation" value="2024-05-15" />
              <InfoItem icon={CalendarDays} label="Next Consultation" value="2024-08-15" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
