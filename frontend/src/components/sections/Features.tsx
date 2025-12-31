import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Shield, 
  Smartphone, 
  Globe, 
  Clock, 
  Users,
  CheckCircle2,
  ArrowRight,
  QrCode,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";

export const Features = () => {
  const features = [
    {
      icon: FileText,
      title: "Digital Certificates",
      description: "Instantly downloadable, QR-verified certificates for all your vital events",
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950/20"
    },
    {
      icon: Shield,
      title: "Blockchain Security",
      description: "Immutable records anchored to blockchain for ultimate security and verification",
      color: "text-green-600", 
      bgColor: "bg-green-50 dark:bg-green-950/20"
    },
    {
      icon: Smartphone,
      title: "Mobile Accessible",
      description: "Access services via SMS/USSD on any phone, even without internet",
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950/20"
    },
    {
      icon: Globe,
      title: "Multilingual Support",
      description: "Available in 11+ Ethiopian languages with RTL support",
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-950/20"
    },
    {
      icon: Clock,
      title: "Real-time Processing",
      description: "Instant approvals and notifications through automated workflows",
      color: "text-cyan-600",
      bgColor: "bg-cyan-50 dark:bg-cyan-950/20"
    },
    {
      icon: Users,
      title: "Family Tree Management",
      description: "Automatic relationship mapping and family history tracking",
      color: "text-pink-600",
      bgColor: "bg-pink-50 dark:bg-pink-950/20"
    }
  ];

  const services = [
    { name: "Birth Registration", count: "250K+ registered" },
    { name: "Marriage Certificates", count: "180K+ issued" },
    { name: "Death Certificates", count: "95K+ processed" },
    { name: "Adoption Records", count: "15K+ managed" },
    { name: "Divorce Documentation", count: "25K+ certified" },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <div className="inline-flex items-center space-x-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Zap className="h-4 w-4" />
            <span>Platform Features</span>
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Modern Government Services
            <span className="block text-primary">Built for Citizens</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Experience the future of civic engagement with secure, efficient, and accessible digital services designed for every Ethiopian citizen.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative bg-card border rounded-2xl p-8 shadow-card hover:shadow-elegant transition-all duration-500 hover:-translate-y-2 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`inline-flex p-3 rounded-xl ${feature.bgColor} mb-6`}>
                <feature.icon className={`h-6 w-6 ${feature.color}`} />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
            </div>
          ))}
        </div>

        {/* Services Stats */}
        <div className="bg-gradient-card border rounded-3xl p-8 lg:p-12 animate-fade-in-up">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Trusted by Millions
                <span className="block text-primary">Across Ethiopia</span>
              </h3>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Join over a million citizens who have digitized their vital records and streamlined their government interactions through our secure platform.
              </p>
              <Link to="/auth/register">
                <Button variant="hero" size="lg" className="group">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
            
            <div className="space-y-4">
              {services.map((service, index) => (
                <div
                  key={service.name}
                  className="flex items-center justify-between p-4 bg-background/50 rounded-xl border animate-slide-in-right"
                  style={{ animationDelay: `${1 + index * 0.1}s` }}
                >
                  <div className="flex items-center space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-success" />
                    <span className="font-medium text-foreground">{service.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground font-medium">{service.count}</span>
                </div>
              ))}
              
              <div className="mt-8 p-6 bg-primary/10 rounded-xl border-2 border-primary/20">
                <div className="flex items-center space-x-3 mb-2">
                  <QrCode className="h-5 w-5 text-primary" />
                  <span className="font-semibold text-primary">QR Verification</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  All certificates include secure QR codes for instant verification by any institution worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};