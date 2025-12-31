import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, FileCheck, Lock, Globe, Award, Download, CheckCircle } from "lucide-react";

export default function Compliance() {
  const certifications = [
    {
      name: "ISO/IEC 27001:2013",
      category: "Information Security",
      status: "Certified",
      validUntil: "December 2025",
      description: "International standard for information security management systems",
      badge: "🔒",
      auditor: "BSI Group"
    },
    {
      name: "SOC 2 Type II",
      category: "Security & Availability",
      status: "Certified",
      validUntil: "June 2025",
      description: "Security, availability, and confidentiality controls",
      badge: "✓",
      auditor: "Deloitte"
    },
    {
      name: "GDPR Compliant",
      category: "Data Protection",
      status: "Compliant",
      validUntil: "Ongoing",
      description: "European Union data protection regulation compliance",
      badge: "🇪🇺",
      auditor: "Internal + External Audit"
    },
    {
      name: "ISO 27017:2015",
      category: "Cloud Security",
      status: "Certified",
      validUntil: "December 2025",
      description: "Cloud-specific information security controls",
      badge: "☁️",
      auditor: "BSI Group"
    },
    {
      name: "ISO 27018:2019",
      category: "Cloud Privacy",
      status: "Certified",
      validUntil: "December 2025",
      description: "Protection of personal data in cloud computing",
      badge: "🔐",
      auditor: "BSI Group"
    },
    {
      name: "PCI DSS Level 1",
      category: "Payment Security",
      status: "Certified",
      validUntil: "August 2025",
      description: "Payment Card Industry Data Security Standard",
      badge: "💳",
      auditor: "Qualified Security Assessor"
    }
  ];

  const frameworks = [
    {
      name: "NIST Cybersecurity Framework",
      description: "Comprehensive risk-based approach to cybersecurity",
      implemented: true
    },
    {
      name: "OWASP Top 10",
      description: "Protection against most critical web application security risks",
      implemented: true
    },
    {
      name: "CIS Critical Security Controls",
      description: "Prioritized set of actions for cyber defense",
      implemented: true
    },
    {
      name: "Ethiopian Data Protection Law",
      description: "Full compliance with national data protection regulations",
      implemented: true
    }
  ];

  const practices = [
    {
      icon: Shield,
      title: "Data Encryption",
      description: "AES-256 encryption at rest, TLS 1.3 in transit"
    },
    {
      icon: Lock,
      title: "Access Controls",
      description: "Role-based access control (RBAC) and multi-factor authentication"
    },
    {
      icon: FileCheck,
      title: "Regular Audits",
      description: "Quarterly internal audits and annual external assessments"
    },
    {
      icon: Globe,
      title: "Secure Infrastructure",
      description: "Multi-region deployment with DDoS protection and WAF"
    }
  ];

  const documents = [
    "Information Security Policy",
    "Data Processing Agreement (DPA)",
    "Privacy Impact Assessment",
    "Business Continuity Plan",
    "Incident Response Plan",
    "Vendor Security Assessment"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <Badge variant="outline" className="mb-4">
            <Shield className="w-3 h-3 mr-1" />
            Security & Compliance
          </Badge>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Compliance & Certifications
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl">
            CivicConnect maintains the highest standards of security, privacy, and compliance 
            to protect citizen data and meet international regulatory requirements.
          </p>
        </div>
      </section>

      {/* Trust Metrics */}
      <section className="pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6 text-center">
                <Award className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">6+</div>
                <div className="text-sm text-muted-foreground">Certifications</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">100%</div>
                <div className="text-sm text-muted-foreground">Compliant</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <FileCheck className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">Annual</div>
                <div className="text-sm text-muted-foreground">External Audits</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Lock className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-sm text-muted-foreground">Security Monitoring</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="font-display text-3xl font-bold mb-2">Active Certifications</h2>
            <p className="text-muted-foreground">
              Our commitment to security and compliance is validated by leading certification bodies
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{cert.badge}</span>
                      <div>
                        <CardTitle className="text-lg">{cert.name}</CardTitle>
                        <Badge variant="outline" className="mt-1">{cert.category}</Badge>
                      </div>
                    </div>
                    <Badge className="bg-green-600">{cert.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{cert.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <span className="text-muted-foreground">Valid Until: </span>
                      <span className="font-medium">{cert.validUntil}</span>
                    </div>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Auditor: </span>
                    <span className="font-medium">{cert.auditor}</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    <Download className="w-4 h-4 mr-2" />
                    Download Certificate
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security Frameworks */}
      <section className="pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Security Frameworks</CardTitle>
              <CardDescription>
                Industry-standard frameworks we implement and follow
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {frameworks.map((framework, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 border rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">{framework.name}</h3>
                      <p className="text-sm text-muted-foreground">{framework.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Security Practices */}
      <section className="pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="font-display text-3xl font-bold mb-2">Security Practices</h2>
            <p className="text-muted-foreground">
              Comprehensive security measures protecting your data at every level
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {practices.map((practice, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <practice.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{practice.title}</h3>
                  <p className="text-sm text-muted-foreground">{practice.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation */}
      <section className="pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Documentation</CardTitle>
              <CardDescription>
                Access our security and compliance documentation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-3">
                {documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <FileCheck className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">{doc}</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact */}
      <section className="pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <Card className="bg-gradient-to-br from-primary/10 to-secondary/10">
            <CardContent className="p-8 text-center">
              <h2 className="font-display text-2xl font-bold mb-4">Need Compliance Information?</h2>
              <p className="text-muted-foreground mb-6">
                Our security team is available to answer questions about our compliance posture
              </p>
              <Button size="lg">Contact Security Team</Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}