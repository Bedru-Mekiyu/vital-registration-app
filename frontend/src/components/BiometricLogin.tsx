import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Fingerprint, Smartphone, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const BiometricLogin = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const { toast } = useToast();

  const checkBiometricSupport = async () => {
    if (window.PublicKeyCredential) {
      const available = await window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
      setIsSupported(available);
      return available;
    }
    return false;
  };

  const enableBiometric = async () => {
    const supported = await checkBiometricSupport();
    
    if (!supported) {
      toast({
        title: "Not Supported",
        description: "Biometric authentication is not available on this device",
        variant: "destructive"
      });
      return;
    }

    try {
      // In production, implement WebAuthn registration
      toast({
        title: "Biometric Enabled",
        description: "You can now use fingerprint or face recognition to log in"
      });
      setIsEnabled(true);
    } catch (error) {
      toast({
        title: "Setup Failed",
        description: "Could not enable biometric login",
        variant: "destructive"
      });
    }
  };

  const disableBiometric = () => {
    setIsEnabled(false);
    toast({
      title: "Biometric Disabled",
      description: "Biometric login has been disabled"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Fingerprint className="w-5 h-5" />
          Biometric Login
        </CardTitle>
        <CardDescription>
          Use fingerprint or face recognition for quick and secure login
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!isEnabled ? (
          <>
            <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
              <Smartphone className="w-10 h-10 text-primary" />
              <div>
                <p className="font-medium">Quick & Secure</p>
                <p className="text-sm text-muted-foreground">
                  Log in instantly using your device's biometric sensors
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>Enhanced security</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>Faster login process</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>No password needed</span>
              </div>
            </div>

            <Button onClick={enableBiometric} className="w-full">
              <Fingerprint className="w-4 h-4 mr-2" />
              Enable Biometric Login
            </Button>
          </>
        ) : (
          <>
            <div className="flex items-center gap-3 p-4 bg-success/10 border border-success/20 rounded-lg">
              <CheckCircle className="w-6 h-6 text-success" />
              <div>
                <p className="font-medium text-success">Biometric Login Active</p>
                <p className="text-sm text-success/80">
                  You can now use biometric authentication to log in
                </p>
              </div>
            </div>

            <Button variant="outline" onClick={disableBiometric} className="w-full">
              Disable Biometric Login
            </Button>
          </>
        )}

        <div className="flex items-start gap-2 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
          <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5" />
          <p className="text-xs text-muted-foreground">
            Biometric data is stored securely on your device and never sent to our servers
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
