import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Shield, 
  Users, 
  Heart, 
  UserCheck, 
  Baby, 
  Search,
  Download,
  Clock,
  CheckCircle,
  Globe,
  Smartphone,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

const ServicesPage = () => {
  const vitalRecordsServices = [
    {
      id: "birth",
      title: "Birth Certificate",
      description: "Register and obtain official birth certificates with QR verification",
      icon: Baby,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      features: ["Digital QR verification", "Instant processing", "Mobile accessible"],
      processing: "1-2 business days"
    },
    {
      id: "marriage",
      title: "Marriage Certificate",
      description: "Register marriages and obtain legally recognized certificates",
      icon: Heart,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      features: ["Joint application", "Religious & civil recognition", "Family tree integration"],
      processing: "2-3 business days"
    },
    {
      id: "death",
      title: "Death Certificate",
      description: "Register deaths and obtain official documentation",
      icon: UserCheck,
      color: "text-gray-600",
      bgColor: "bg-gray-50",
      features: ["Medical verification", "Legal documentation", "Estate proceedings"],
      processing: "1-2 business days"
    },
    {
      id: "divorce",
      title: "Divorce Certificate",
      description: "Legal divorce documentation with court verification",
      icon: Users,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      features: ["Court integration", "Legal compliance", "Privacy protection"],
      processing: "3-5 business days"
    },
    {
      id: "adoption",
      title: "Adoption Certificate",
      description: "Adoption documentation with full legal recognition",
      icon: Heart,
      color: "text-green-600",
      bgColor: "bg-green-50",
      features: ["Court approval", "Background checks", "Family integration"],
      processing: "7-14 business days"
    }
  ];

  const digitalServices = [
    {
      title: "Certificate Verification",
      description: "Verify any certificate using QR codes or certificate numbers",
      icon: Shield,
      link: "/verify"
    },
    {
      title: "Document Download",
      description: "Access and download your certificates anytime, anywhere",
      icon: Download,
      link: "/dashboard"
    },
    {
      title: "Family Tree",
      description: "Visualize and manage your family relationships automatically",
      icon: Users,
      link: "/dashboard"
    },
    {
      title: "Status Tracking",
      description: "Track the progress of your applications in real-time",
      icon: Clock,
      link: "/dashboard"
    }
  ];

  const accessChannels = [
    {
      title: "Web Platform",
      description: "Full-featured web application accessible from any device",
      icon: Globe,
      features: ["Multi-language support", "Dark/Light mode", "Accessibility compliant"]
    },
    {
      title: "Mobile Access",
      description: "Responsive design optimized for smartphones and tablets",
      icon: Smartphone,
      features: ["Touch-friendly interface", "Offline capabilities", "Push notifications"]
    },
    {
      title: "USSD Services",
      description: "Access basic services via simple phone codes",
      icon: Search,
      features: ["No smartphone required", "Works on any phone", "Quick verification"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 text-sm font-medium">
              Digital Life Events Platform
            </Badge>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6">
              Comprehensive
              <span className="text-gradient bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {" "}Civic Services
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Access all vital records services, from birth to marriage certificates, 
              with secure digital verification and seamless government integration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth/register">
                <Button size="lg" className="min-w-[200px]">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/verify">
                <Button variant="outline" size="lg" className="min-w-[200px]">
                  Verify Certificate
                  <Shield className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Vital Records Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              Vital Records Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Complete lifecycle documentation with digital verification and government-grade security.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vitalRecordsServices.map((service, index) => (
              <Card key={service.id} className="group hover:shadow-lg transition-all duration-300 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <div className={`w-12 h-12 ${service.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                    <service.icon className={`h-6 w-6 ${service.color}`} />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Processing: {service.processing}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-foreground">Key Features:</h4>
                    <ul className="space-y-1">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-3 w-3 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link to={`/event-application?type=${service.id}`} className="block">
                    <Button className="w-full group-hover:shadow-md transition-shadow">
                      Register {service.title}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Services */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              Digital Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Modern digital tools to manage, verify, and access your vital records with ease.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {digitalServices.map((service, index) => (
              <Link key={service.title} to={service.link}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 group animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardHeader className="text-center pb-2">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <service.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">{service.description}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Access Channels */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              Multiple Access Channels
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Access our services through various channels designed for your convenience and accessibility needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {accessChannels.map((channel, index) => (
              <Card key={channel.title} className="text-center hover:shadow-lg transition-shadow animate-fade-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <channel.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{channel.title}</CardTitle>
                  <CardDescription>{channel.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {channel.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of citizens who have already digitized their vital records 
              with our secure, government-approved platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth/register">
                <Button size="lg" className="min-w-[200px]">
                  Create Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/verify">
                <Button variant="outline" size="lg" className="min-w-[200px]">
                  Verify Certificate
                  <Shield className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">Certificates Issued</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Support</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">11</div>
                <div className="text-sm text-muted-foreground">Languages</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;