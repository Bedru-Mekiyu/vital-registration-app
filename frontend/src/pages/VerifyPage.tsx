import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  QrCode, 
  Search, 
  Shield, 
  CheckCircle, 
  FileText, 
  Calendar, 
  User,
  MapPin,
  Clock,
  AlertCircle,
  Download,
  Camera
} from "lucide-react";

const VerifyPage = () => {
  const [verificationMethod, setVerificationMethod] = useState<"qr" | "manual">("qr");
  const [certificateNumber, setCertificateNumber] = useState("");
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setVerificationResult({
        status: "verified",
        certificateType: "Birth Certificate",
        certificateNumber: "BC-2024-001234",
        personName: "John Michael Doe",
        dateOfBirth: "January 15, 2024",
        placeOfBirth: "Addis Ababa, Ethiopia",
        registrationDate: "January 20, 2024",
        issueDate: "January 22, 2024",
        issuer: "Addis Ababa City Administration",
        parentNames: {
          father: "Robert John Doe",
          mother: "Mary Jane Smith"
        },
        blockchainHash: "0x1a2b3c4d5e6f...",
        lastVerified: new Date().toISOString()
      });
      setIsLoading(false);
    }, 2000);
  };

  const resetVerification = () => {
    setVerificationResult(null);
    setCertificateNumber("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-muted/30 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center space-x-3 mb-6">
            <div className="p-3 bg-gradient-hero rounded-xl">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <span className="font-display text-2xl font-bold text-primary">
              Certificate Verification
            </span>
          </div>
          <h1 className="font-display text-4xl font-bold text-foreground mb-4">
            Verify Digital Certificates
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Instantly verify the authenticity of government-issued digital certificates 
            using QR codes or certificate numbers.
          </p>
        </div>

        {!verificationResult ? (
          <div className="space-y-8">
            {/* Verification Method Selector */}
            <div className="flex justify-center animate-scale-in">
              <div className="bg-muted rounded-xl p-1 flex">
                <button
                  onClick={() => setVerificationMethod("qr")}
                  className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${
                    verificationMethod === "qr"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <QrCode className="h-4 w-4 mr-2 inline" />
                  QR Code Scan
                </button>
                <button
                  onClick={() => setVerificationMethod("manual")}
                  className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${
                    verificationMethod === "manual"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Search className="h-4 w-4 mr-2 inline" />
                  Manual Entry
                </button>
              </div>
            </div>

            {/* Verification Form */}
            <Card className="max-w-2xl mx-auto shadow-elegant animate-fade-in-up">
              <CardHeader>
                <CardTitle className="text-center">
                  {verificationMethod === "qr" ? "Scan QR Code" : "Enter Certificate Details"}
                </CardTitle>
                <CardDescription className="text-center">
                  {verificationMethod === "qr" 
                    ? "Position the QR code within the camera frame to verify instantly"
                    : "Enter the certificate number to verify its authenticity"
                  }
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                {verificationMethod === "qr" ? (
                  <div className="space-y-6">
                    {/* QR Scanner Placeholder */}
                    <div className="aspect-square max-w-sm mx-auto bg-muted/50 border-2 border-dashed border-muted-foreground/30 rounded-xl flex flex-col items-center justify-center">
                      <Camera className="h-16 w-16 text-muted-foreground mb-4" />
                      <p className="text-sm text-muted-foreground text-center">
                        QR Code scanner would appear here
                      </p>
                      <Button variant="secondary" className="mt-4">
                        Open Camera
                      </Button>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">
                        Or switch to manual entry if you don't have access to a camera
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleVerification} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="certificateNumber">Certificate Number</Label>
                      <div className="relative">
                        <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="certificateNumber"
                          placeholder="e.g., BC-2024-001234"
                          className="pl-10"
                          value={certificateNumber}
                          onChange={(e) => setCertificateNumber(e.target.value)}
                          required
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Enter the complete certificate number as shown on your document
                      </p>
                    </div>

                    <Button 
                      type="submit" 
                      variant="hero" 
                      size="lg" 
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent mr-2" />
                          Verifying...
                        </>
                      ) : (
                        <>
                          <Shield className="h-4 w-4 mr-2" />
                          Verify Certificate
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>

            {/* Info Cards */}
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <Card className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 bg-success/10 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-success" />
                    </div>
                    <h3 className="font-semibold">Instant Verification</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Get immediate results with blockchain-backed certificate authenticity
                  </p>
                </CardContent>
              </Card>

              <Card className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold">Secure & Trusted</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    All verifications are secured with government-grade encryption
                  </p>
                </CardContent>
              </Card>

              <Card className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 bg-secondary/10 rounded-lg">
                      <Clock className="h-5 w-5 text-secondary" />
                    </div>
                    <h3 className="font-semibold">24/7 Available</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Verify certificates anytime, anywhere with our global service
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          /* Verification Results */
          <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
            {/* Status Header */}
            <Card className="border-success/50 bg-success/5">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-success/20 rounded-full">
                    <CheckCircle className="h-8 w-8 text-success" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">Certificate Verified</h2>
                    <p className="text-muted-foreground">
                      This certificate is authentic and valid
                    </p>
                  </div>
                  <Badge variant="default" className="bg-success text-success-foreground">
                    Verified ✓
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Certificate Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Certificate Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Certificate Type</Label>
                    <p className="text-lg font-semibold">{verificationResult.certificateType}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Certificate Number</Label>
                    <p className="text-lg font-mono">{verificationResult.certificateNumber}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Full Name</Label>
                    <p className="text-lg font-semibold">{verificationResult.personName}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Date of Birth</Label>
                    <p className="text-lg">{verificationResult.dateOfBirth}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Place of Birth</Label>
                    <p className="text-lg">{verificationResult.placeOfBirth}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Issuing Authority</Label>
                    <p className="text-lg">{verificationResult.issuer}</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <Label className="text-sm font-medium text-muted-foreground mb-2 block">Parent Information</Label>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs text-muted-foreground">Father's Name</Label>
                      <p className="font-medium">{verificationResult.parentNames.father}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Mother's Name</Label>
                      <p className="font-medium">{verificationResult.parentNames.mother}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <Label className="text-xs text-muted-foreground">Registration Date</Label>
                    <p>{verificationResult.registrationDate}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Issue Date</Label>
                    <p>{verificationResult.issueDate}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Last Verified</Label>
                    <p>Just now</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" onClick={resetVerification}>
                Verify Another Certificate
              </Button>
              <Button variant="secondary">
                <Download className="h-4 w-4 mr-2" />
                Download Verification Report
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyPage;