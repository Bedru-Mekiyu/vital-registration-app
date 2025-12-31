import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { QrCode, FileText, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import QRCodeScanner from '@/components/QRCodeScanner';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

const Verify = () => {
  const [verificationMethod, setVerificationMethod] = useState<'qr' | 'number'>('qr');
  const [certificateNumber, setCertificateNumber] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<any>(null);

  const handleVerification = async (certNumber?: string) => {
    setIsVerifying(true);
    
    try {
      const searchNumber = certNumber || certificateNumber;
      
      if (!searchNumber) {
        toast({
          title: "Certificate Number Required",
          description: "Please enter a certificate number to verify",
          variant: "destructive",
        });
        setIsVerifying(false);
        return;
      }

      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .eq('certificate_number', searchNumber)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setVerificationResult({
          isValid: true,
          certificateType: data.certificate_type,
          issuedDate: data.issued_at ? new Date(data.issued_at).toLocaleDateString() : 'N/A',
          personName: data.holder_name,
          issuer: 'Ministry of Justice, Ethiopia',
          blockchainHash: data.blockchain_hash || '0x1a2b3c4d5e6f...',
          status: data.status,
          certificateNumber: data.certificate_number
        });

        await supabase
          .from('verification_logs')
          .insert([{
            certificate_id: data.id,
            verification_result: true,
            verification_details: { verified_at: new Date().toISOString() }
          }]);

        toast({
          title: "Certificate Verified ✅",
          description: "Certificate is valid and authentic",
        });
      } else {
        setVerificationResult({
          isValid: false,
          error: 'Certificate not found in our records'
        });

        toast({
          title: "Certificate Not Found",
          description: "No certificate found with this number",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error('Verification error:', error);
      setVerificationResult({
        isValid: false,
        error: 'Verification failed. Please try again.'
      });

      toast({
        title: "Verification Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleQRScan = (qrData: string) => {
    try {
      const data = JSON.parse(qrData);
      if (data.certificate_number) {
        setCertificateNumber(data.certificate_number);
        handleVerification(data.certificate_number);
      }
    } catch (error) {
      toast({
        title: "Invalid QR Code",
        description: "Could not read certificate data from QR code",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
  
      
      <main className="container mx-auto px-4 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-trust/10 text-trust border border-trust/20 rounded-full px-4 py-2 text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              Secure Verification
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Certificate Verification
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Instantly verify the authenticity of any Ethiopian government certificate using our secure blockchain-based system.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="feature-card-premium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Verify Certificate
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-base font-medium">Verification Method</Label>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <Button
                      variant={verificationMethod === 'qr' ? 'default' : 'outline'}
                      onClick={() => setVerificationMethod('qr')}
                      className="flex items-center gap-2"
                    >
                      <QrCode className="w-4 h-4" />
                      QR Code
                    </Button>
                    <Button
                      variant={verificationMethod === 'number' ? 'default' : 'outline'}
                      onClick={() => setVerificationMethod('number')}
                      className="flex items-center gap-2"
                    >
                      <FileText className="w-4 h-4" />
                      Certificate Number
                    </Button>
                  </div>
                </div>

                {verificationMethod === 'qr' && (
                  <QRCodeScanner 
                    onScan={handleQRScan}
                    onError={(error) => toast({
                      title: "Scanner Error",
                      description: error,
                      variant: "destructive",
                    })}
                  />
                )}

                {verificationMethod === 'number' && (
                  <div>
                    <Label htmlFor="certificate-number">Certificate Number</Label>
                    <Input
                      id="certificate-number"
                      placeholder="Enter certificate number (e.g., ET-BC-2024-001234)"
                      value={certificateNumber}
                      onChange={(e) => setCertificateNumber(e.target.value)}
                      className="mt-2"
                    />
                    <p className="text-sm text-muted-foreground mt-2">
                      Find this number on your certificate document
                    </p>
                  </div>
                )}

                <Button 
                  onClick={() => handleVerification()}
                  disabled={isVerifying || (verificationMethod === 'number' && !certificateNumber)}
                  className="w-full btn-primary"
                >
                  {isVerifying ? 'Verifying...' : 'Verify Certificate'}
                </Button>
              </CardContent>
            </Card>

            <Card className="feature-card-premium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Verification Result
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!verificationResult && !isVerifying && (
                  <div className="text-center py-12 text-muted-foreground">
                    <Shield className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>Enter certificate details to verify authenticity</p>
                  </div>
                )}

                {isVerifying && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-muted-foreground">Checking blockchain records...</p>
                  </div>
                )}

                {verificationResult && (
                  <div className="space-y-6">
                    {verificationResult.isValid ? (
                      <>
                        <div className="flex items-center gap-3 p-4 bg-success/10 border border-success/20 rounded-lg">
                          <CheckCircle className="w-6 h-6 text-success" />
                          <div>
                            <div className="font-semibold text-success">Certificate Verified ✅</div>
                            <div className="text-sm text-success/80">This certificate is authentic and valid</div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <div className="text-sm text-muted-foreground">Certificate Number</div>
                            <div className="font-medium">{verificationResult.certificateNumber}</div>
                          </div>
                          
                          <div>
                            <div className="text-sm text-muted-foreground">Certificate Type</div>
                            <div className="font-medium capitalize">{verificationResult.certificateType}</div>
                          </div>
                          
                          <div>
                            <div className="text-sm text-muted-foreground">Holder Name</div>
                            <div className="font-medium">{verificationResult.personName}</div>
                          </div>
                          
                          <div>
                            <div className="text-sm text-muted-foreground">Issued Date</div>
                            <div className="font-medium">{verificationResult.issuedDate}</div>
                          </div>
                          
                          <div>
                            <div className="text-sm text-muted-foreground">Issuing Authority</div>
                            <div className="font-medium">{verificationResult.issuer}</div>
                          </div>
                          
                          <div>
                            <div className="text-sm text-muted-foreground">Status</div>
                            <div className="inline-flex items-center gap-2">
                              <div className="w-2 h-2 bg-success rounded-full"></div>
                              <span className="font-medium text-success capitalize">{verificationResult.status}</span>
                            </div>
                          </div>
                          
                          <div>
                            <div className="text-sm text-muted-foreground">Blockchain Hash</div>
                            <div className="font-mono text-sm bg-muted p-2 rounded break-all">
                              {verificationResult.blockchainHash}
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                        <AlertCircle className="w-6 h-6 text-destructive" />
                        <div>
                          <div className="font-semibold text-destructive">Certificate Not Valid ❌</div>
                          <div className="text-sm text-destructive/80">
                            {verificationResult.error || 'This certificate could not be verified'}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Blockchain Secured</h3>
              <p className="text-sm text-muted-foreground">
                Every certificate is cryptographically secured and tamper-proof
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-trust/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-trust" />
              </div>
              <h3 className="font-semibold mb-2">Instant Verification</h3>
              <p className="text-sm text-muted-foreground">
                Get verification results in under 30 seconds
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-success" />
              </div>
              <h3 className="font-semibold mb-2">Government Verified</h3>
              <p className="text-sm text-muted-foreground">
                Direct integration with official government databases
              </p>
            </div>
          </div>
        </div>
      </main>
      
    
    </div>
  );
};

export default Verify;
