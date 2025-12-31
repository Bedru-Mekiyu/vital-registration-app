import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, CheckCircle, Users, Award } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

export const Hero = () => {
  const stats = [
    { icon: Users, label: "Citizens Served", value: "1.2M+" },
    { icon: Shield, label: "Secure Certificates", value: "500K+" },
    { icon: CheckCircle, label: "Verified Events", value: "850K+" },
    { icon: Award, label: "Institutional Partners", value: "2,500+" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-accent/50 to-muted">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/95 z-10" />

      <div className="relative z-20 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Shield className="h-4 w-4" />
                <span>Government Verified Platform</span>
              </div>
              
              <h1 className="font-display text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Your Digital Gateway to
                <span className="bg-gradient-hero bg-clip-text text-transparent block">
                  Civic Services
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                Securely register vital life events, access digital certificates, and engage with government services through our trusted national platform.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/auth/register">
                <Button variant="hero" size="lg" className="group">
                  Get Started Today
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/verify">
                <Button variant="civic" size="lg">
                  Verify Certificate
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 pt-8 border-t border-muted">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>GDPR Compliant</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>ISO 27001 Certified</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>Blockchain Verified</span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="bg-card border rounded-2xl p-6 shadow-card hover:shadow-elegant transition-all duration-300 hover:transform hover:scale-105"
                style={{ animationDelay: `${0.5 + index * 0.1}s` }}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="font-display text-2xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-10 w-20 h-20 bg-primary/10 rounded-full animate-pulse" />
      <div className="absolute bottom-32 left-10 w-16 h-16 bg-secondary/10 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
    </section>
  );
};