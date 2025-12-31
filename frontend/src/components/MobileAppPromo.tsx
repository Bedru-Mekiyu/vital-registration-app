import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Smartphone, Download, Apple } from 'lucide-react';

export const MobileAppPromo = () => {
  return (
    <Card className="bg-gradient-hero text-white border-0">
      <CardHeader className="text-center">
        <Smartphone className="w-16 h-16 mx-auto mb-4" />
        <CardTitle className="text-2xl text-white">Download Our Mobile App</CardTitle>
        <CardDescription className="text-white/90">
          Access government services on the go with our native mobile applications
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button 
            variant="secondary" 
            className="h-16 flex items-center justify-center gap-3"
            onClick={() => window.open('https://apps.apple.com', '_blank')}
          >
            <Apple className="w-8 h-8" />
            <div className="text-left">
              <div className="text-xs">Download on the</div>
              <div className="text-sm font-semibold">App Store</div>
            </div>
          </Button>
          
          <Button 
            variant="secondary" 
            className="h-16 flex items-center justify-center gap-3"
            onClick={() => window.open('https://play.google.com', '_blank')}
          >
            <Download className="w-8 h-8" />
            <div className="text-left">
              <div className="text-xs">Get it on</div>
              <div className="text-sm font-semibold">Google Play</div>
            </div>
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center pt-6 border-t border-white/20">
          <div>
            <div className="text-2xl font-bold">4.8★</div>
            <div className="text-xs text-white/80">App Rating</div>
          </div>
          <div>
            <div className="text-2xl font-bold">500K+</div>
            <div className="text-xs text-white/80">Downloads</div>
          </div>
          <div>
            <div className="text-2xl font-bold">Offline</div>
            <div className="text-xs text-white/80">Mode</div>
          </div>
        </div>

        <ul className="space-y-2 text-sm text-white/90">
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
            Offline access to your certificates
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
            Push notifications for status updates
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
            Biometric authentication support
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
            QR code scanning with camera
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};
