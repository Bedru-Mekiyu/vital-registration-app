import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Scale, Shield, AlertTriangle } from "lucide-react";

export default function TermsPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="outline" className="mb-4">
            Terms of Service
          </Badge>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
            Terms of Service
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            These terms govern your use of the National Life-Events & Civic Engagement Platform. 
            Please read them carefully.
          </p>
          <p className="text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 pb-16">
        {/* Key Points */}
        <section className="mb-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: FileText, title: "Legal Agreement", desc: "Binding terms of use" },
              { icon: Scale, title: "User Rights", desc: "Your rights and obligations" },
              { icon: Shield, title: "Data Protection", desc: "How we protect your information" },
              { icon: AlertTriangle, title: "Important Notices", desc: "Critical information" }
            ].map((item, index) => (
              <Card key={index} className="bg-gradient-card border-0 shadow-card text-center">
                <CardContent className="p-6">
                  <item.icon className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Terms Content */}
        <div className="space-y-8">
          <Card className="bg-gradient-card border-0 shadow-elegant">
            <CardHeader>
              <CardTitle>1. Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                By accessing and using the National Life-Events & Civic Engagement Platform, 
                you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to these terms, you should not use this platform.
              </p>
              <p className="text-sm text-muted-foreground">
                These terms constitute a legal agreement between you and the Ethiopian Government 
                through the Ministry of Digital Transformation.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-elegant">
            <CardHeader>
              <CardTitle>2. Platform Description</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                This platform provides digital services for:
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                <li>• Registration of life events (birth, marriage, death, divorce, adoption)</li>
                <li>• Digital certificate issuance and verification</li>
                <li>• Access to government civic services</li>
                <li>• Identity verification and authentication</li>
                <li>• Document management and storage</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-elegant">
            <CardHeader>
              <CardTitle>3. User Registration and Account</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Eligibility</h4>
                <p className="text-sm text-muted-foreground">
                  You must be at least 18 years old or have legal guardian consent to use this platform. 
                  You must provide accurate and complete information during registration.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Account Security</h4>
                <p className="text-sm text-muted-foreground">
                  You are responsible for maintaining the confidentiality of your account credentials 
                  and for all activities that occur under your account.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Verification Requirements</h4>
                <p className="text-sm text-muted-foreground">
                  Identity verification may be required for certain services. You agree to provide 
                  authentic documentation as requested.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-elegant">
            <CardHeader>
              <CardTitle>4. Acceptable Use Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Permitted Uses</h4>
                <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                  <li>• Legitimate government service requests</li>
                  <li>• Personal document management</li>
                  <li>• Identity verification purposes</li>
                  <li>• Accessing civic engagement features</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Prohibited Activities</h4>
                <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                  <li>• Providing false or misleading information</li>
                  <li>• Attempting to access unauthorized areas</li>
                  <li>• Interfering with platform security measures</li>
                  <li>• Using the platform for illegal activities</li>
                  <li>• Sharing account credentials with others</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-elegant">
            <CardHeader>
              <CardTitle>5. Data and Privacy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Your privacy is important to us. Our collection, use, and protection of your 
                personal information is governed by our Privacy Policy, which is incorporated 
                into these terms by reference.
              </p>
              <div>
                <h4 className="font-semibold mb-2">Data Sovereignty</h4>
                <p className="text-sm text-muted-foreground">
                  Your data is stored within Ethiopian borders unless you provide explicit 
                  consent for international processing.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Government Access</h4>
                <p className="text-sm text-muted-foreground">
                  As a government platform, your information may be accessed by authorized 
                  government agencies as required by Ethiopian law.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-elegant">
            <CardHeader>
              <CardTitle>6. Service Availability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                While we strive for maximum uptime, we cannot guarantee uninterrupted service. 
                The platform may be temporarily unavailable due to:
              </p>
              <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                <li>• Scheduled maintenance</li>
                <li>• Technical difficulties</li>
                <li>• Force majeure events</li>
                <li>• Security incidents</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-elegant">
            <CardHeader>
              <CardTitle>7. Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                The Ethiopian Government provides this platform "as is" without warranties 
                of any kind. We are not liable for any damages arising from your use of the platform, 
                except as required by Ethiopian law.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-elegant">
            <CardHeader>
              <CardTitle>8. Governing Law and Disputes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                These terms are governed by Ethiopian law. Any disputes will be resolved 
                through Ethiopian courts or alternative dispute resolution mechanisms 
                as provided by law.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-elegant">
            <CardHeader>
              <CardTitle>9. Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                We may modify these terms at any time. Changes will be posted on this page 
                with an updated effective date. Continued use of the platform after changes 
                constitutes acceptance of the new terms.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-elegant">
            <CardHeader>
              <CardTitle>10. Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                For questions about these terms, contact us:
              </p>
              <div className="space-y-2 text-sm">
                <p><strong>Email:</strong> legal@civicplatform.gov.et</p>
                <p><strong>Phone:</strong> +251-11-123-4567</p>
                <p><strong>Address:</strong> Ministry of Digital Transformation, Addis Ababa, Ethiopia</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}