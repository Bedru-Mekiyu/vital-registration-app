import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Clock, MessageSquare, HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from 'zod';

const contactSchema = z.object({
  fullName: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().min(1, "Phone is required").max(20),
  subject: z.string().trim().min(1, "Subject is required").max(200),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(1000)
});

export default function ContactPage() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      
      // Validate form data
      contactSchema.parse(formData);
      
      // Simulate sending message (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message Sent!",
        description: "We've received your message and will respond within 24 hours.",
      });
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to send message. Please try again.",
          variant: "destructive"
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone Support",
      details: ["+251-11-123-4567", "+251-91-234-5678"],
      hours: "Mon-Fri 8:00-17:00"
    },
    {
      icon: Mail,
      title: "Email Support",
      details: ["support@civicplatform.gov.et", "technical@civicplatform.gov.et"],
      hours: "24/7 Response"
    },
    {
      icon: MapPin,
      title: "Main Office",
      details: ["Ministry of Digital Transformation", "Addis Ababa, Ethiopia"],
      hours: "Mon-Fri 8:00-17:00"
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      details: ["Available on this website", "Multilingual support"],
      hours: "Mon-Fri 8:00-20:00"
    }
  ];

  const faqs = [
    {
      question: "How do I register for the platform?",
      answer: "Click 'Get Started' and follow the registration process. You'll need a valid email and phone number."
    },
    {
      question: "Which documents can I register?",
      answer: "Birth certificates, marriage certificates, death certificates, divorce certificates, and adoption papers."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we use bank-level security with encryption and comply with international standards like ISO 27001."
    },
    {
      question: "Can I access services in my local language?",
      answer: "Yes, we support all major Ethiopian languages including Amharic, Oromo, Tigrinya, and more."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="outline" className="mb-4">
            Get in Touch
          </Badge>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
            We're Here to Help
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Have questions about our services? Need technical support? 
            Our multilingual team is ready to assist you.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-card border-0 shadow-elegant">
              <CardHeader>
                <CardTitle className="text-2xl font-display">Send us a message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName" className="text-sm font-medium mb-2 block">Full Name</Label>
                    <Input 
                      id="fullName"
                      placeholder="Your full name" 
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="bg-input text-foreground"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium mb-2 block">Email</Label>
                    <Input 
                      id="email"
                      type="email" 
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-input text-foreground"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium mb-2 block">Phone Number</Label>
                    <Input 
                      id="phone"
                      placeholder="+251-XX-XXX-XXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="bg-input text-foreground"
                    />
                  </div>
                  <div>
                    <Label htmlFor="subject" className="text-sm font-medium mb-2 block">Subject</Label>
                    <Input 
                      id="subject"
                      placeholder="How can we help?"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="bg-input text-foreground"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="message" className="text-sm font-medium mb-2 block">Message</Label>
                  <Textarea 
                    id="message"
                    placeholder="Please describe your question or issue in detail..." 
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-input text-foreground"
                  />
                </div>
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <Card key={index} className="bg-card/50 border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <info.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">{info.title}</h3>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-sm text-muted-foreground mb-1">
                          {detail}
                        </p>
                      ))}
                      <div className="flex items-center mt-2">
                        <Clock className="h-3 w-3 text-muted-foreground mr-1" />
                        <span className="text-xs text-muted-foreground">{info.hours}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mt-16">
          <Card className="bg-gradient-card border-0 shadow-elegant">
            <CardHeader>
              <CardTitle className="text-2xl font-display flex items-center">
                <HelpCircle className="h-6 w-6 mr-2 text-primary" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="space-y-3">
                    <h3 className="font-semibold text-primary">{faq.question}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Emergency Contact */}
        <section className="mt-8">
          <Card className="bg-destructive/5 border-destructive/20">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="font-semibold text-destructive mb-2">Emergency Support</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  For urgent issues affecting your legal documents or identity verification
                </p>
                <Button 
                  variant="outline" 
                  className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                  onClick={() => window.location.href = 'tel:+251119114357'}
                >
                  Call Emergency Line: +251-11-911-HELP
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}