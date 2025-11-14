'use client';

import { CheckCircle, QrCode } from "lucide-react";
import { useEffect, useState } from "react";

export const QrCodeWithAnimation = () => {
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanned(true);
      setTimeout(() => setScanned(false), 1000);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-32 h-32 flex items-center justify-center">
      <QrCode className="w-full h-full text-foreground/80" />
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-md">
        <div className="absolute top-0 left-0 w-full h-[3px] bg-primary/70 shadow-[0_0_10px_theme(colors.primary)] animate-scan-line rounded-full" />
      </div>
      {scanned && (
        <div className="absolute inset-0 flex items-center justify-center bg-primary/10 backdrop-blur-sm rounded-lg">
          <CheckCircle className="w-16 h-16 text-primary animate-appear" />
        </div>
      )}
    </div>
  );
};
