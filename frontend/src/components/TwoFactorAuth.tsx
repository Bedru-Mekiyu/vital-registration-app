import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, Smartphone, Mail, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const TwoFactorAuth = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [step, setStep] = useState<'setup' | 'verify' | 'complete'>('setup');
  const { toast } = useToast();

  const enableSMS = () => {
    toast({
      title: "SMS Verification",
      description: "Verification code sent to your phone"
    });
    setStep('verify');
  };

  const enableEmail = () => {
    toast({
      title: "Email Verification",
      description: "Verification code sent to your email"
    });
    setStep('verify');
  };

  const verifyCode = () => {
    if (verificationCode.length === 6) {
      setIsEnabled(true);
      setStep('complete');
      toast({
        title: "2FA Enabled",
        description: "Two-factor authentication is now active"
      });
    } else {
      toast({
        title: "Invalid Code",
        description: "Please enter a valid 6-digit code",
        variant: "destructive"
      });
    }
  };

  const disable2FA = () => {
    setIsEnabled(false);
    setStep('setup');
    toast({
      title: "2FA Disabled",
      description: "Two-factor authentication has been disabled"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Two-Factor Authentication
        </CardTitle>
        <CardDescription>
          Add an extra layer of security to your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!isEnabled && step === 'setup' && (
          <Tabs defaultValue="sms">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="sms">SMS</TabsTrigger>
              <TabsTrigger value="email">Email</TabsTrigger>
            </TabsList>
            <TabsContent value="sms" className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                <Smartphone className="w-10 h-10 text-primary" />
                <div>
                  <p className="font-medium">SMS Verification</p>
                  <p className="text-sm text-muted-foreground">
                    Receive codes via text message
                  </p>
                </div>
              </div>
              <Button onClick={enableSMS} className="w-full">
                Enable SMS 2FA
              </Button>
            </TabsContent>
            <TabsContent value="email" className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                <Mail className="w-10 h-10 text-primary" />
                <div>
                  <p className="font-medium">Email Verification</p>
                  <p className="text-sm text-muted-foreground">
                    Receive codes via email
                  </p>
                </div>
              </div>
              <Button onClick={enableEmail} className="w-full">
                Enable Email 2FA
              </Button>
            </TabsContent>
          </Tabs>
        )}

        {step === 'verify' && (
          <div className="space-y-4">
            <Label>Enter Verification Code</Label>
            <Input
              placeholder="Enter 6-digit code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              maxLength={6}
            />
            <Button onClick={verifyCode} className="w-full">
              Verify & Enable
            </Button>
          </div>
        )}

        {isEnabled && step === 'complete' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-success/10 border border-success/20 rounded-lg">
              <CheckCircle className="w-6 h-6 text-success" />
              <div>
                <p className="font-medium text-success">2FA Enabled</p>
                <p className="text-sm text-success/80">
                  Your account is now protected with two-factor authentication
                </p>
              </div>
            </div>
            <Button variant="destructive" onClick={disable2FA} className="w-full">
              Disable 2FA
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
