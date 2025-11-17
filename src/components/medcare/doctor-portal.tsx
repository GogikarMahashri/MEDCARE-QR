
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { PlusCircle, QrCode, Trash2, Pill } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

type Medication = {
  name: string;
  type: string;
  pillShape: string;
  dosage: string;
  frequency: string;
  imageUrl: string;
};

export function DoctorPortal() {
  const [medications, setMedications] = useState<Medication[]>([
    { name: "", type: "Pill", pillShape: "Circle", dosage: "", frequency: "", imageUrl: "" },
  ]);
  const [qrCode, setQrCode] = useState("");
  const [date, setDate] = useState<Date>();

  const addMedication = () => {
    setMedications([
      ...medications,
      { name: "", type: "Pill", pillShape: "Circle", dosage: "", frequency: "", imageUrl: "" },
    ]);
  };

  const removeMedication = (index: number) => {
    const newMedications = medications.filter((_, i) => i !== index);
    setMedications(newMedications);
  };

  const handleMedicationChange = (
    index: number,
    field: keyof Medication,
    value: string
  ) => {
    const newMedications = [...medications];
    newMedications[index][field] = value;
    setMedications(newMedications);
  };
  
  const generateQrCode = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would gather form data and send it to a QR code generation service.
    // For this prototype, we'll just display a placeholder.
    setQrCode("https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=PatientData");
  };

  return (
    <div className="w-full p-1">
      <Card className="w-full">
        <Accordion type="single" collapsible>
          <AccordionItem value="doctor-portal">
            <AccordionTrigger className="p-6 hover:no-underline">
              <div className="flex flex-col items-start space-y-1.5">
                <CardTitle className="font-headline text-2xl">Physician Portal</CardTitle>
                <CardDescription>
                  Create a new treatment plan for your patient.
                </CardDescription>
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-6 pt-0">
              <form onSubmit={generateQrCode} className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">New Treatment Plan</CardTitle>
                    <CardDescription>All fields are required to generate the QR code.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-md font-semibold mb-4 text-primary">Patient Details</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="patient-name">Patient Name</Label>
                          <Input id="patient-name" placeholder="e.g., Jane Doe" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="gender">Gender</Label>
                            <Select>
                              <SelectTrigger id="gender">
                                <SelectValue placeholder="Select gender" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="age">Age</Label>
                            <Input id="age" type="number" placeholder="e.g., 45" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="blood-group">Blood Group</Label>
                          <Input id="blood-group" placeholder="e.g., O+" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="health-issue">Health Issue</Label>
                          <Textarea id="health-issue" placeholder="e.g., Hypertension, Type 2 Diabetes" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-md font-semibold mb-4 text-primary">Doctor's Details</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="doctor-name">Doctor's Name</Label>
                          <Input id="doctor-name" placeholder="e.g., Dr. John Smith" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="hospital-name">Hospital Name</Label>
                          <Input id="hospital-name" placeholder="e.g., General Hospital" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-md font-semibold mb-4 text-primary">Medications</h3>
                      <div className="space-y-6">
                        {medications.map((med, index) => (
                          <Card key={index} className="bg-secondary/50 p-4">
                            <CardHeader className="flex flex-row items-center justify-between p-0 pb-4">
                               <CardTitle className="text-lg">Medication #{index + 1}</CardTitle>
                               <Button type="button" variant="ghost" size="icon" onClick={() => removeMedication(index)}>
                                 <Trash2 className="h-4 w-4" />
                               </Button>
                            </CardHeader>
                            <CardContent className="space-y-4 p-0">
                              <div className="space-y-2">
                                <Label>Name</Label>
                                <Input 
                                  placeholder="e.g., Lisinopril" 
                                  value={med.name}
                                  onChange={(e) => handleMedicationChange(index, 'name', e.target.value)}
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label>Type</Label>
                                  <Select value={med.type} onValueChange={(value) => handleMedicationChange(index, 'type', value)}>
                                    <SelectTrigger>
                                      <div className="flex items-center gap-2">
                                        <Pill className="h-4 w-4" />
                                        <SelectValue placeholder="Select type" />
                                      </div>
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Pill">Pill</SelectItem>
                                      <SelectItem value="Tablet">Tablet</SelectItem>
                                      <SelectItem value="Capsule">Capsule</SelectItem>
                                      <SelectItem value="Syrup">Syrup</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label>Pill Shape</Label>
                                  <Select value={med.pillShape} onValueChange={(value) => handleMedicationChange(index, 'pillShape', value)}>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select shape" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Circle">Circle</SelectItem>
                                      <SelectItem value="Oval">Oval</SelectItem>
                                      <SelectItem value="Triangle">Triangle</SelectItem>
                                      <SelectItem value="Square">Square</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label>Dosage</Label>
                                <Input 
                                  placeholder="e.g., 10mg Tablet" 
                                  value={med.dosage}
                                  onChange={(e) => handleMedicationChange(index, 'dosage', e.target.value)}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Frequency & Instructions</Label>
                                 <Input 
                                  placeholder="e.g., Once daily with breakfast" 
                                  value={med.frequency}
                                  onChange={(e) => handleMedicationChange(index, 'frequency', e.target.value)}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Image URL (Optional)</Label>
                                <Input 
                                  placeholder="https://example.com/image.png" 
                                  value={med.imageUrl}
                                  onChange={(e) => handleMedicationChange(index, 'imageUrl', e.target.value)}
                                />
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                        <Button type="button" variant="outline" onClick={addMedication} className="w-full">
                          <PlusCircle className="mr-2 h-4 w-4" />
                          Add Medication
                        </Button>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-md font-semibold mb-4 text-primary">Next Consultation Date</h3>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </CardContent>
                </Card>
                
                <Button type="submit" className="w-full">
                  <QrCode className="mr-2 h-4 w-4" />
                  Generate QR Code
                </Button>
              </form>

              {qrCode && (
                <div className="mt-8 flex flex-col items-center gap-4">
                  <h3 className="text-lg font-semibold">Generated QR Code</h3>
                  <img src={qrCode} alt="Generated QR Code" className="w-40 h-40" />
                  <p className="text-sm text-muted-foreground">Patient can scan this code.</p>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
    </div>
  );
}
