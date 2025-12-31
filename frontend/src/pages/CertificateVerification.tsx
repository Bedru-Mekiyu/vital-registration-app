import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Search, Shield, CheckCircle, XCircle, FileText, Calendar, User, MapPin } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface VerificationResult {
  valid: boolean;
  certificate: {
    certificate_number: string;
    certificate_type: string;
    holder_name: string;
    issued_at: string;
    status: string;
    certificate_data: any;
  } | null;
  message: string;
}

const CertificateVerification = () => {
  const { toast } = useToast();
  const [certificateNumber, setCertificateNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);

  const verifyCertificate = async () => {
    if (!certificateNumber.trim()) {
      toast({
        title: "Error",
        description: "Please enter a certificate number",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      // Log the verification attempt
      await supabase
        .from('verification_logs')
        .insert({
          certificate_id: certificateNumber,
          verification_result: false, // Will be updated below
          verifier_ip: 'unknown', // In a real app, you'd get the actual IP
          verification_details: {
            timestamp: new Date().toISOString(),
            user_agent: navigator.userAgent
          }
        });

      // Check if certificate exists and is valid
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .eq('certificate_number', certificateNumber)
        .eq('status', 'pending')
        .single();

      if (error || !data) {
        setResult({
          valid: false,
          certificate: null,
          message: 'Certificate not found or not issued yet'
        });
      } else {
        setResult({
          valid: true,
          certificate: data,
          message: 'Certificate is valid and verified'
        });

        // Update verification log
        await supabase
          .from('verification_logs')
          .update({ 
            verification_result: true,
            certificate_id: data.id 
          })
          .eq('certificate_id', certificateNumber);
      }
    } catch (error) {
      console.error('Error verifying certificate:', error);
      toast({
        title: "Error",
        description: "Failed to verify certificate",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      verifyCertificate();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Certificate Verification
            </h1>
            <p className="text-muted-foreground">
              Verify the authenticity of Ethiopian vital records certificates
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Verify Certificate
              </CardTitle>
              <CardDescription>
                Enter the certificate number to verify its authenticity
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="certificate-number">Certificate Number</Label>
                <Input
                  id="certificate-number"
                  placeholder="e.g., BC-2024-001234"
                  value={certificateNumber}
                  onChange={(e) => setCertificateNumber(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="mt-1"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Certificate numbers are in the format: TYPE-YEAR-NUMBER
                </p>
              </div>
              
              <Button 
                onClick={verifyCertificate} 
                disabled={loading || !certificateNumber.trim()}
                className="w-full"
              >
                <Search className="h-4 w-4 mr-2" />
                {loading ? 'Verifying...' : 'Verify Certificate'}
              </Button>
            </CardContent>
          </Card>

          {result && (
            <Card className="animate-fade-in">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  {result.valid ? (
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  ) : (
                    <XCircle className="h-8 w-8 text-red-600" />
                  )}
                  <div>
                    <h3 className="font-semibold text-lg">
                      {result.valid ? 'Valid Certificate' : 'Invalid Certificate'}
                    </h3>
                    <p className="text-muted-foreground">{result.message}</p>
                  </div>
                </div>

                {result.valid && result.certificate && (
                  <div className="space-y-4 pt-4 border-t">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Type</p>
                          <p className="font-medium capitalize">
                            {result.certificate.certificate_type} Certificate
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Holder</p>
                          <p className="font-medium">{result.certificate.holder_name}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Issued Date</p>
                          <p className="font-medium">
                            {new Date(result.certificate.issued_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Status</p>
                          <Badge variant="default">{result.certificate.status}</Badge>
                        </div>
                      </div>
                    </div>

                    {result.certificate.certificate_data && (
                      <Alert>
                        <Shield className="h-4 w-4" />
                        <AlertDescription>
                          This certificate has been verified as authentic and issued by 
                          the Ethiopian Government Vital Records Department.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                )}

                {!result.valid && (
                  <Alert variant="destructive">
                    <XCircle className="h-4 w-4" />
                    <AlertDescription>
                      This certificate could not be verified. Please check the certificate 
                      number and try again, or contact the issuing authority if you believe 
                      this is an error.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          )}

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              For additional verification or assistance, contact the Ethiopian 
              Vital Records Department at <strong>+251-11-XXX-XXXX</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateVerification;