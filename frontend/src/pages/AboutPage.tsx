import { useTranslation } from 'react-i18next';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, Globe, Award, Zap, Heart } from "lucide-react";

export default function AboutPage() {
  const { t } = useTranslation();

  const stats = [
    { number: "10M+", label: "Citizens Served", icon: Users },
    { number: "99.9%", label: "Uptime", icon: Zap },
    { number: "11", label: "Languages", icon: Globe },
    { number: "ISO 27001", label: "Certified", icon: Award },
  ];

  const values = [
    {
      icon: Shield,
      title: "Security First",
      description: "Built with bank-level security and international standards including OWASP Top 10 and ISO/IEC 27001."
    },
    {
      icon: Users,
      title: "Citizen-Centric",
      description: "Designed with Ethiopian citizens at the center, ensuring accessibility and ease of use for all."
    },
    {
      icon: Globe,
      title: "Multilingual",
      description: "Supporting all major Ethiopian languages with proper RTL and LTR text rendering."
    },
    {
      icon: Heart,
      title: "Transparency",
      description: "Open, transparent processes with immutable audit logs and public verification systems."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="outline" className="mb-4">
            About Our Platform
          </Badge>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
            Building Digital Trust for Ethiopia
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            We're revolutionizing how Ethiopians interact with government services through 
            secure, accessible, and transparent digital infrastructure that respects our 
            cultural diversity and sovereignty.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center bg-gradient-card border-0 shadow-card">
                <CardContent className="pt-6">
                  <stat.icon className="h-8 w-8 mx-auto mb-4 text-primary" />
                  <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-card border-0 shadow-elegant">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-3xl font-display font-bold mb-6 text-center">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                To provide every Ethiopian citizen with secure, accessible, and efficient 
                digital identity services that preserve our cultural heritage while embracing 
                modern technology. We believe that digital transformation should empower 
                communities, not replace them.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                By combining blockchain technology, multilingual support, and world-class 
                security standards, we're creating a platform that serves as a bridge between 
                traditional civic processes and the digital future.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-center mb-12">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="bg-card/50 border-border/50 hover:bg-card/80 transition-all duration-300">
                <CardContent className="p-6">
                  <value.icon className="h-10 w-10 text-primary mb-4" />
                  <h3 className="font-semibold mb-3">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-display font-bold mb-8">
            Built by Ethiopians, for Ethiopians
          </h2>
          <Card className="bg-gradient-card border-0 shadow-elegant">
            <CardContent className="p-8">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our team combines deep understanding of Ethiopian culture and governance 
                with cutting-edge technology expertise. We work closely with government 
                agencies, civil society organizations, and communities across all regions 
                to ensure our platform serves everyone equitably.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}