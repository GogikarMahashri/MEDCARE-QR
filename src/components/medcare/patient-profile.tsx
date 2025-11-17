"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { User, Cake, VenetianMask, Droplets, HeartPulse, ClipboardList, Phone, Mail, Stethoscope, Hospital, CalendarDays, Edit, Save, Upload } from "lucide-react";
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const patientImage = PlaceHolderImages.find(p => p.id === 'patient-photo');

const InfoItem = ({ icon: Icon, label, value, isEditing, onChange, name }: { icon: React.ElementType, label: string, value: string, isEditing: boolean, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, name: string }) => (
  <div className="flex items-start gap-3">
    <Icon className="w-4 h-4 text-primary mt-3 shrink-0" />
    <div className="flex flex-col w-full">
      <Label htmlFor={name} className="text-xs text-muted-foreground">{label}</Label>
      {isEditing ? (
        <Input
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className="h-8 text-sm"
        />
      ) : (
        <span className="text-sm font-medium h-8 flex items-center">{value || '-'}</span>
      )}
    </div>
  </div>
);

export function PatientProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [patientData, setPatientData] = useState({
    name: "Jane Doe",
    patientId: "MCQR-12345",
    age: "72 Years",
    gender: "Female",
    bloodGroup: "O+",
    healthDiseases: "Hypertension, Diabetes",
    symptoms: "Mild headache, Fatigue",
    contactNumber: "+1 234 567 890",
    email: "jane.doe@email.com",
    doctorName: "Dr. Emily Carter",
    hospitalName: "City General Hospital",
    lastConsultation: "2024-05-15",
    nextConsultation: "2024-08-15",
    avatar: patientImage?.imageUrl,
    avatarFallback: "JD"
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPatientData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        setPatientData(prev => ({ ...prev, avatar: loadEvent.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full p-1">
      <Card className="w-full">
        <CardHeader className="flex flex-col sm:flex-row items-center gap-4 space-y-0 pb-4">
          <div className="relative">
            <Avatar className="h-20 w-20 border-2 border-primary">
              {patientData.avatar && <AvatarImage data-ai-hint={patientImage?.imageHint} src={patientData.avatar} alt="Patient Photo" />}
              <AvatarFallback>{patientData.avatarFallback}</AvatarFallback>
            </Avatar>
            {isEditing && (
              <>
                <Button
                  size="icon"
                  className="absolute bottom-0 right-0 h-7 w-7 rounded-full"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-4 w-4" />
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleAvatarChange}
                  accept="image/*"
                />
              </>
            )}
          </div>
          <div className="flex-grow text-center sm:text-left">
            {isEditing ? (
              <Input name="name" value={patientData.name} onChange={handleInputChange} className="font-headline text-2xl" placeholder="Full Name" />
            ) : (
              <CardTitle className="font-headline text-2xl">{patientData.name}</CardTitle>
            )}
            <p className="text-muted-foreground">Patient ID: {patientData.patientId}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsEditing(!isEditing)} className="shrink-0">
            {isEditing ? <Save className="w-5 h-5" /> : <Edit className="w-5 h-5" />}
            <span className="sr-only">{isEditing ? 'Save' : 'Edit'}</span>
          </Button>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-6">
            <InfoItem icon={Cake} label="Age" value={patientData.age} isEditing={isEditing} onChange={handleInputChange} name="age" />
            <InfoItem icon={VenetianMask} label="Gender" value={patientData.gender} isEditing={isEditing} onChange={handleInputChange} name="gender" />
            <InfoItem icon={Droplets} label="Blood Group" value={patientData.bloodGroup} isEditing={isEditing} onChange={handleInputChange} name="bloodGroup" />
            <InfoItem icon={HeartPulse} label="Health Diseases" value={patientData.healthDiseases} isEditing={isEditing} onChange={handleInputChange} name="healthDiseases" />
            <InfoItem icon={ClipboardList} label="Symptoms" value={patientData.symptoms} isEditing={isEditing} onChange={handleInputChange} name="symptoms" />
          </div>

          <Separator />
          
          <div>
            <h3 className="text-sm font-semibold mb-4 text-primary">Contact Information</h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-6">
              <InfoItem icon={Phone} label="Contact Number" value={patientData.contactNumber} isEditing={isEditing} onChange={handleInputChange} name="contactNumber" />
              <InfoItem icon={Mail} label="Email" value={patientData.email} isEditing={isEditing} onChange={handleInputChange} name="email" />
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-sm font-semibold mb-4 text-primary">Other Details</h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-6">
              <InfoItem icon={Stethoscope} label="Doctor's Name" value={patientData.doctorName} isEditing={isEditing} onChange={handleInputChange} name="doctorName" />
              <InfoItem icon={Hospital} label="Hospital Name" value={patientData.hospitalName} isEditing={isEditing} onChange={handleInputChange} name="hospitalName" />
              <InfoItem icon={CalendarDays} label="Last Consultation" value={patientData.lastConsultation} isEditing={isEditing} onChange={handleInputChange} name="lastConsultation" />
              <InfoItem icon={CalendarDays} label="Next Consultation" value={patientData.nextConsultation} isEditing={isEditing} onChange={handleInputChange} name="nextConsultation" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
