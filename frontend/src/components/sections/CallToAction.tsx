import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, CheckCircle, Users } from "lucide-react";
import { Link } from "react-router-dom";

export const CallToAction = () => {
  const benefits = [
    "Instant digital certificate access",
    "Blockchain-verified authenticity", 
    "Multi-language support",
    "24/7 availability",
    "Government-grade security",
    "Mobile accessibility"
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_80%,rgba(120,119,198,0.1),transparent_50%)] bg-[radial-gradient(circle_at_80%_20%,rgba(120,198,121,0.1),transparent_50%)]" />
      
      <div className="relative container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="mb-12 animate-fade-in">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Users className="h-4 w-4" />
              <span>Join 1.2M+ Citizens</span>
            </div>
            
            <h2 className="font-display text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Ready to Digitize Your
              <span className="block bg-gradient-hero bg-clip-text text-transparent">
                Civic Life?
              </span>
            </h2>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-8">
              Join millions of Ethiopians who have already transformed how they interact with government services. 
              Experience the future of civic engagement with secure, instant, and accessible digital certificates.
            </p>

            {/* Benefits Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12 max-w-2xl mx-auto">
              {benefits.map((benefit, index) => (
                <div 
                  key={benefit}
                  className="flex items-center space-x-2 text-sm animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                  <span className="text-muted-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12 animate-scale-in">
            <Link to="/auth/register">
              <Button variant="hero" size="xl" className="group shadow-glow">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/verify">
              <Button variant="civic" size="xl">
                <Shield className="h-5 w-5 mr-2" />
                Verify Certificate
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-border/50">
            <div className="text-center animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <div className="font-display text-3xl font-bold text-primary mb-2">1.2M+</div>
              <div className="text-sm text-muted-foreground">Citizens Registered</div>
            </div>
            <div className="text-center animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <div className="font-display text-3xl font-bold text-secondary mb-2">500K+</div>
              <div className="text-sm text-muted-foreground">Certificates Issued</div>
            </div>
            <div className="text-center animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <div className="font-display text-3xl font-bold text-success mb-2">2,500+</div>
              <div className="text-sm text-muted-foreground">Partner Institutions</div>
            </div>
            <div className="text-center animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
              <div className="font-display text-3xl font-bold text-warning mb-2">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime Guarantee</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};