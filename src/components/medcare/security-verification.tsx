"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { User, Key, Camera, Upload, AlertCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

export function SecurityVerification({ onVerified }: { onVerified: () => void }) {
  const [step, setStep] = useState(1);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (step === 1) {
      const getCameraPermission = async () => {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            console.error('Camera API not supported in this browser.');
            setHasCameraPermission(false);
            toast({
              variant: 'destructive',
              title: 'Camera Not Supported',
              description: 'Your browser does not support camera access, which is required for face recognition.',
            });
            return;
        }
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          setHasCameraPermission(true);

          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error('Error accessing camera:', error);
          setHasCameraPermission(false);
          toast({
            variant: 'destructive',
            title: 'Camera Access Denied',
            description: 'Please enable camera permissions in your browser settings for face recognition.',
          });
        }
      };

      getCameraPermission();
      
      return () => {
          if (videoRef.current && videoRef.current.srcObject) {
              const stream = videoRef.current.srcObject as MediaStream;
              stream.getTracks().forEach(track => track.stop());
          }
      }
    }
  }, [step, toast]);

  const handleFaceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate face recognition
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
    }, 1500);
  };
  
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login verification
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Verification Successful",
        description: "Access granted to the Physician Portal.",
      });
      onVerified();
    }, 1500);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <form onSubmit={handleFaceSubmit} className="space-y-4">
            <p className="text-center text-sm text-muted-foreground">Please verify your identity using face recognition.</p>
            <div className="relative w-full aspect-video bg-secondary rounded-md overflow-hidden flex items-center justify-center">
              <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
              {hasCameraPermission === false && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white p-4">
                    <Camera className="w-12 h-12 mb-4" />
                    <p className="text-center">Camera access is required. Please grant permission in your browser.</p>
                </div>
              )}
            </div>

            {hasCameraPermission === false && (
                <Alert variant="destructive">
                    <AlertTitle>Camera Access Required</AlertTitle>
                    <AlertDescription>
                        Please allow camera access to use this feature. You can also upload an image.
                    </AlertDescription>
                </Alert>
            )}
            
            <div className="flex items-center gap-2">
                <Button type="button" variant="outline" className="w-full" asChild>
                    <Label htmlFor="upload-image">
                        <Upload className="mr-2" /> Upload Image
                    </Label>
                </Button>
                <Input id="upload-image" type="file" accept="image/*" className="hidden" />
                <Button type="submit" className="w-full" disabled={isLoading || hasCameraPermission === false}>
                    {isLoading ? <Loader2 className="animate-spin" /> : <Camera className="mr-2" />}
                    Verify Face
                </Button>
            </div>
          </form>
        );
      case 2:
        return (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <p className="text-center text-sm text-muted-foreground">Final step: Please enter your login credentials.</p>
            <div className="space-y-2">
              <Label htmlFor="loginId"><User className="inline-block mr-2" />Login ID</Label>
              <Input id="loginId" placeholder="e.g., DR_SMITH_123" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password"><Key className="inline-block mr-2" />Password</Label>
              <Input id="password" type="password" placeholder="••••••••" required />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin" /> : null}
              Login & Access Portal
            </Button>
            <Button variant="link" onClick={() => setStep(1)} className="w-full">Back to Face Recognition</Button>
          </form>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
        <Card>
            <CardHeader>
                <CardTitle className="text-xl text-center">Physician Verification</CardTitle>
                <CardDescription className="text-center">
                    Step {step} of 2: {step === 1 ? 'Face Recognition' : 'Credential Login'}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {renderStep()}
            </CardContent>
        </Card>
    </div>
  );
}