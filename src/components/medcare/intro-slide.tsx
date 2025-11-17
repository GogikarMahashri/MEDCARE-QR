import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Stethoscope } from "lucide-react";
import { QrCodeWithAnimation } from "./qr-code-icon";

export function IntroSlide({ onScanComplete }: { onScanComplete: () => void }) {
  return (
    <div className="w-full p-1">
      <Card className="w-full overflow-hidden">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-4xl font-bold tracking-tight">MedCare QR</CardTitle>
          <CardDescription>Your personal health at a scan.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-8 p-6 md:p-10">
          <div onClick={onScanComplete} className="cursor-pointer">
            <QrCodeWithAnimation />
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-around gap-8 w-full max-w-md">
            <div className="flex flex-col items-center gap-2 text-center">
              <User className="w-12 h-12 text-primary" />
              <span className="text-sm font-semibold">Patient's Profile</span>
              <p className="text-xs text-muted-foreground max-w-[150px]">Quick access to your medical history.</p>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <Stethoscope className="w-12 h-12 text-primary" />
              <span className="text-sm font-semibold">Doctor's Dashboard</span>
              <p className="text-xs text-muted-foreground max-w-[150px]">Secure portal for health providers.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
