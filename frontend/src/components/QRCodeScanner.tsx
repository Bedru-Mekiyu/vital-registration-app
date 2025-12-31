import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, Upload } from 'lucide-react';

interface QRCodeScannerProps {
  onScan: (data: string) => void;
  onError: (error: string) => void;
}

const QRCodeScanner = ({ onScan, onError }: QRCodeScannerProps) => {
  const [scanning, setScanning] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Simulate QR code scanning from image
    // In production, you'd use a library like jsQR or qr-scanner
    setTimeout(() => {
      onScan(JSON.stringify({
        certificate_number: 'BC-2024-001234'
      }));
    }, 1000);
  };

  const startCamera = async () => {
    try {
      setScanning(true);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      const video = document.createElement('video');
      video.srcObject = stream;
      video.play();

      // Create canvas for QR detection
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      const checkForQR = async () => {
        if (!video.videoWidth || !video.videoHeight) {
          requestAnimationFrame(checkForQR);
          return;
        }

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context?.drawImage(video, 0, 0, canvas.width, canvas.height);

        // In production, use a QR detection library like jsQR
        // For now, simulate detection after 3 seconds
        setTimeout(() => {
          stream.getTracks().forEach(track => track.stop());
          setScanning(false);
          onScan('{"certificate_number":"BC-2025-001234"}');
        }, 3000);
      };

      video.onloadedmetadata = () => {
        checkForQR();
      };
    } catch (error) {
      setScanning(false);
      onError("Camera access denied or not available. Please use image upload instead.");
    }
  };

  return (
    <div className="space-y-4">
      <div className="aspect-square bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
        {!scanning ? (
          <div className="text-center p-8">
            <Camera className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-sm text-muted-foreground mb-4">
              Scan QR code or upload image
            </p>
            <div className="flex flex-col gap-2">
              <Button onClick={startCamera} variant="outline">
                <Camera className="w-4 h-4 mr-2" />
                Start Camera
              </Button>
              <label htmlFor="qr-upload">
                <Button variant="outline" className="w-full" asChild>
                  <span>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Image
                  </span>
                </Button>
              </label>
              <input
                id="qr-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-sm text-muted-foreground">Scanning...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRCodeScanner;
