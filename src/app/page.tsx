"use client";

import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { IntroSlide } from "@/components/medcare/intro-slide";
import { PatientProfileSlide } from "@/components/medcare/patient-profile-slide";
import { MedicationScheduleSlide } from "@/components/medcare/medication-schedule-slide";
import { SymptomCheckerSlide } from "@/components/medcare/symptom-checker-slide";

export default function Home() {
  const [api, setApi] = useState<CarouselApi>();

  const handleScanComplete = () => {
    if (api) {
      api.scrollTo(1); // Navigate to the PatientProfileSlide (index 1)
    }
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 sm:p-8 font-body">
      <div className="w-full max-w-4xl mx-auto">
        <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
          <CarouselContent>
            <CarouselItem>
              <IntroSlide onScanComplete={handleScanComplete} />
            </CarouselItem>
            <CarouselItem>
              <PatientProfileSlide />
            </CarouselItem>
            <CarouselItem>
              <MedicationScheduleSlide />
            </CarouselItem>
            <CarouselItem>
              <SymptomCheckerSlide />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="absolute left-[-30px] sm:left-[-50px] top-1/2 -translate-y-1/2" />
          <CarouselNext className="absolute right-[-30px] sm:right-[-50px] top-1/2 -translate-y-1/2" />
        </Carousel>
      </div>
    </main>
  );
}
