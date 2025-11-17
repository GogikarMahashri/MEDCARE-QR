
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, QrCode } from "lucide-react";

export function QrScanner({ onScanSuccess }: { onScanSuccess: () => void }) {
  const [isScanning, setIsScanning] = useState(false);
  const [isScanned, setIsScanned] = useState(false);

  const handleScan = () => {
    if (isScanning || isScanned) return;

    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setIsScanned(true);
      setTimeout(() => {
        onScanSuccess();
      }, 1500);
    }, 2000);
  };

  return (
    <div className="w-full p-1">
      <Card className="w-full overflow-hidden">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">MedCare QR Scan</CardTitle>
          <CardDescription>Scan the patient's QR code to view their profile.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-6 p-8">
          <div
            className="relative w-64 h-64 rounded-lg bg-secondary flex items-center justify-center cursor-pointer overflow-hidden"
            onClick={handleScan}
          >
            {isScanned ? (
              <div className="flex flex-col items-center gap-2 text-primary animate-appear">
                <CheckCircle className="w-20 h-20" />
                <p className="font-semibold text-lg">Scanned Successfully</p>
              </div>
            ) : (
              <>
                <QrCode className="w-48 h-48 text-muted-foreground" />
                {isScanning && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute top-0 h-1 w-full bg-primary/50 shadow-[0_0_10px_theme(colors.primary)] animate-scan-line"></div>
                  </div>
                )}
                {!isScanning && (
                   <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <p className="text-white font-bold">Click to Scan</p>
                   </div>
                )}
              </>
            )}
          </div>
          <p className="text-sm text-muted-foreground text-center max-w-xs">
            {isScanned
              ? "Redirecting to patient profile..."
              : isScanning
              ? "Scanning... Please hold the QR code steady."
              : "Position the QR code inside the frame to scan it."}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
