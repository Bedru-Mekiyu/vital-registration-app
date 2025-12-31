import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Eye, Lock, UserCheck, Database, Globe } from "lucide-react";

export default function PrivacyPage() {
  const { t } = useTranslation();

  const principles = [
    {
      icon: Shield,
      title: "Data Protection",
      description: "We implement bank-level security measures to protect your personal information."
    },
    {
      icon: Eye,
      title: "Transparency",
      description: "We clearly explain what data we collect, how we use it, and who we share it with."
    },
    {
      icon: Lock,
      title: "Access Control",
      description: "Strict access controls ensure only authorized personnel can view your data."
    },
    {
      icon: UserCheck,
      title: "User Rights",
      description: "You have the right to access, correct, or delete your personal information."
    },
    {
      icon: Database,
      title: "Data Sovereignty",
      description: "Your data is stored within Ethiopian borders unless you consent otherwise."
    },
    {
      icon: Globe,
      title: "International Standards",
      description: "We comply with GDPR principles and international privacy frameworks."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="outline" className="mb-4">
            Privacy Policy
          </Badge>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
            Your Privacy Matters
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            We are committed to protecting your privacy and ensuring the security 
            of your personal information. This policy explains our practices in detail.
          </p>
          <p className="text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 pb-16">
        {/* Privacy Principles */}
        <section className="mb-12">
          <h2 className="text-2xl font-display font-bold mb-8 text-center">
            Our Privacy Principles
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {principles.map((principle, index) => (
              <Card key={index} className="bg-gradient-card border-0 shadow-card">
                <CardContent className="p-6 text-center">
                  <principle.icon className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">{principle.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {principle.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Detailed Sections */}
        <div className="space-y-8">
          <Card className="bg-gradient-card border-0 shadow-elegant">
            <CardHeader>
              <CardTitle>1. Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Personal Information</h4>
                <p className="text-muted-foreground text-sm">
                  We collect information you provide directly, such as your name, email address, 
                  phone number, date of birth, and other identity verification details required 
                  for government services.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Usage Information</h4>
                <p className="text-muted-foreground text-sm">
                  We automatically collect information about how you use our platform, 
                  including access logs, IP addresses, and device information for security purposes.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Biometric Data</h4>
                <p className="text-muted-foreground text-sm">
                  With your explicit consent, we may collect biometric identifiers for 
                  enhanced security and identity verification purposes.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-elegant">
            <CardHeader>
              <CardTitle>2. How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>• Provide and maintain government services</li>
                <li>• Verify your identity and prevent fraud</li>
                <li>• Process your applications and requests</li>
                <li>• Send you important notifications and updates</li>
                <li>• Improve our services and user experience</li>
                <li>• Comply with legal obligations and government regulations</li>
                <li>• Maintain security and prevent unauthorized access</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-elegant">
            <CardHeader>
              <CardTitle>3. Information Sharing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                We do not sell your personal information. We may share your information only in these circumstances:
              </p>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>• With government agencies as required by law</li>
                <li>• With authorized institutions for service delivery</li>
                <li>• With your explicit consent</li>
                <li>• For legitimate security and fraud prevention</li>
                <li>• With service providers under strict confidentiality agreements</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-elegant">
            <CardHeader>
              <CardTitle>4. Your Rights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground mb-4">
                You have the following rights regarding your personal information:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Access Rights</h4>
                  <p className="text-xs text-muted-foreground">
                    Request access to your personal data
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Correction Rights</h4>
                  <p className="text-xs text-muted-foreground">
                    Request correction of inaccurate data
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Deletion Rights</h4>
                  <p className="text-xs text-muted-foreground">
                    Request deletion of your data (where legally permitted)
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Portability Rights</h4>
                  <p className="text-xs text-muted-foreground">
                    Request a copy of your data in a portable format
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-elegant">
            <CardHeader>
              <CardTitle>5. Data Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                We implement comprehensive security measures including:
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• End-to-end encryption for data transmission</li>
                <li>• Advanced encryption for data at rest</li>
                <li>• Multi-factor authentication systems</li>
                <li>• Regular security audits and assessments</li>
                <li>• Strict access controls and monitoring</li>
                <li>• Compliance with ISO 27001 standards</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-elegant">
            <CardHeader>
              <CardTitle>6. Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                For privacy-related questions or to exercise your rights, contact our Data Protection Officer:
              </p>
              <div className="space-y-2 text-sm">
                <p><strong>Email:</strong> privacy@civicplatform.gov.et</p>
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