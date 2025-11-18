
"use client";

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { Loader2, UserCheck, ShieldCheck, Camera, Upload } from 'lucide-react';

export function SecurityVerification({ onVerificationSuccess }: { onVerificationSuccess: () => void }) {
  const [step, setStep] = useState(1); // 1 for face, 2 for ID
  const [isLoading, setIsLoading] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [isVerifyingFace, setIsVerifyingFace] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (step === 1) {
      const getCameraPermission = async () => {
        try {
          // Only request permission if it hasn't been determined yet
          if (hasCameraPermission === null) {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            setHasCameraPermission(true);
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
            }
          }
        } catch (error) {
          console.error('Error accessing camera:', error);
          setHasCameraPermission(false);
          toast({
            variant: 'destructive',
            title: 'Camera Access Denied',
            description: 'Please enable camera permissions in your browser to use face verification.',
          });
        }
      };
      getCameraPermission();
    } else {
      // Stop camera stream when moving to step 2
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
    }
  }, [step, hasCameraPermission, toast]);

  const handleFaceVerification = async () => {
    setIsVerifyingFace(true);
    // Simulate verification
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsVerifyingFace(false);
    toast({
      title: 'Face Verified',
      description: 'Step 1 complete. Please proceed to ID verification.',
    });
    setStep(2);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      // Simulate upload and verification
      handleFaceVerification();
    }
  };

  const handleIdVerification = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    // Simulate ID verification
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    toast({
      title: 'Verification Successful',
      description: 'Access granted. Redirecting to dashboard.',
    });
    onVerificationSuccess();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Security Verification</CardTitle>
        <CardDescription>Please complete the steps to access patient data.</CardDescription>
      </CardHeader>
      <CardContent>
        {step === 1 && (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <UserCheck className="w-6 h-6 text-primary" />
              <h3 className="text-lg font-semibold">Step 1: Face Recognition</h3>
            </div>
            
            <div className="p-4 bg-secondary rounded-lg flex flex-col items-center">
                <video ref={videoRef} className="w-full aspect-video rounded-md bg-black" autoPlay muted playsInline />
                {hasCameraPermission === false && (
                    <Alert variant="destructive" className="mt-4">
                        <AlertTitle>Camera Access Required</AlertTitle>
                        <AlertDescription>
                            Please allow camera access to use this feature, or upload a photo.
                        </AlertDescription>
                    </Alert>
                )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={handleFaceVerification} disabled={isVerifyingFace || hasCameraPermission === false} className="w-full">
                {isVerifyingFace ? <Loader2 className="animate-spin" /> : <Camera />}
                {isVerifyingFace ? 'Verifying...' : 'Verify with Camera'}
              </Button>
              <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="w-full">
                <Upload />
                Upload Photo
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handleIdVerification} className="space-y-6 animate-appear">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-primary" />
              <h3 className="text-lg font-semibold">Step 2: Login ID Verification</h3>
            </div>

            <div className="space-y-2">
              <Label htmlFor="loginId">Patient or Physician ID</Label>
              <Input id="loginId" placeholder="Enter your ID" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password / PIN</Label>
              <Input id="password" type="password" placeholder="Enter your password or PIN" required />
            </div>

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? <Loader2 className="animate-spin" /> : null}
              {isLoading ? 'Verifying...' : 'Complete Verification'}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
