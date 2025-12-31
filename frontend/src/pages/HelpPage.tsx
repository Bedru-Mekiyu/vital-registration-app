import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useToast } from '@/hooks/use-toast';
import { 
  Search, 
  MessageCircle, 
  Phone, 
  Mail, 
  FileText, 
  HelpCircle,
  Clock,
  ArrowRight,
  ChevronRight,
  Book,
  Video,
  Download,
  Shield,
  Users
} from 'lucide-react';

const HelpPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const handleLiveChat = () => {
    toast({
      title: "Live Chat",
      description: "Opening live chat support...",
    });
    // In production: integrate with live chat service (e.g., Intercom, Zendesk)
  };

  const handlePhoneCall = () => {
    window.location.href = 'tel:+25111XXXXXXX';
  };

  const handleEmailSupport = () => {
    window.location.href = 'mailto:support@ethiopia.gov.et?subject=Support Request';
  };

  const handleGuideClick = (guideTitle: string) => {
    toast({
      title: "Guide Access",
      description: `Opening ${guideTitle}...`,
    });
    // In production: navigate to guide page or download file
  };

  const faqCategories = [
    {
      title: 'Birth Registration',
      questions: [
        {
          q: 'How long does birth registration take?',
          a: 'Birth registration typically takes 3-5 business days for processing. If registered within 30 days of birth, the service is free of charge.'
        },
        {
          q: 'What documents do I need for birth registration?',
          a: 'You need: hospital birth record, parent identification documents, and marriage certificate (if applicable). All documents must be original or certified copies.'
        },
        {
          q: 'Can I register a birth that occurred outside Ethiopia?',
          a: 'Yes, births occurring outside Ethiopia can be registered through our consular services. Additional documentation from the birth country may be required.'
        }
      ]
    },
    {
      title: 'Certificate Verification',
      questions: [
        {
          q: 'How can I verify a certificate\'s authenticity?',
          a: 'You can verify certificates using the QR code scanner or by entering the certificate number on our verification page. Verification is instant and free.'
        },
        {
          q: 'What information is shown during verification?',
          a: 'Verification shows: certificate validity, issue date, issuing authority, holder name, and certificate type. No sensitive personal information is displayed publicly.'
        },
        {
          q: 'Can I verify certificates offline?',
          a: 'Offline verification is possible through QR codes using our mobile app when you have the certificate physically present.'
        }
      ]
    },
    {
      title: 'Digital Services',
      questions: [
        {
          q: 'Is my personal data secure?',
          a: 'Yes, we use bank-level encryption and blockchain technology to protect your data. All information is stored securely and accessed only by authorized personnel.'
        },
        {
          q: 'Can I access services in my local language?',
          a: 'Yes, our platform supports multiple languages including Amharic, Oromo, Tigrinya, and English. You can switch languages using the language selector.'
        },
        {
          q: 'How do I create an account?',
          a: 'Click "Login" in the top navigation, provide your email, verify your identity, and create a secure password.'
        }
      ]
    }
  ];

  const contactMethods = [
    {
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      icon: MessageCircle,
      action: 'Start Chat',
      available: '24/7',
      color: 'bg-primary text-primary-foreground'
    },
    {
      title: 'Phone Support',
      description: 'Call our dedicated support line',
      icon: Phone,
      action: '+251-11-XXX-XXXX',
      available: '8 AM - 6 PM',
      color: 'bg-secondary text-secondary-foreground'
    },
    {
      title: 'Email Support',
      description: 'Send us a detailed inquiry',
      icon: Mail,
      action: 'support@ethiopia.gov.et',
      available: '24-48 hours',
      color: 'bg-accent text-accent-foreground'
    }
  ];

  const guides = [
    {
      title: 'Birth Registration Guide',
      description: 'Complete step-by-step process for registering births',
      duration: '5 min read',
      type: 'Guide',
      icon: FileText
    },
    {
      title: 'Certificate Verification Tutorial',
      description: 'Learn how to verify any government certificate',
      duration: '3 min read',
      type: 'Video',
      icon: Video
    },
    {
      title: 'Account Setup Walkthrough',
      description: 'Setting up your digital government account',
      duration: '7 min read',
      type: 'Guide',
      icon: Book
    },
    {
      title: 'Mobile App User Manual',
      description: 'Using our mobile app for offline services',
      duration: '10 min read',
      type: 'Download',
      icon: Download
    }
  ];

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      faq => 
        faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-muted/30">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-background/20 border border-background/30 rounded-full px-6 py-3 mb-8">
            <HelpCircle className="w-5 h-5" />
            <span className="font-medium">Support Center</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            How Can We Help?
          </h1>
          
          <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
            Find answers to common questions or get in touch with our support team
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary-foreground/60 w-5 h-5 z-10" />
            <Input
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6 text-lg bg-white/90 dark:bg-card border-white/20 text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>
      </section>

      {/* Quick Help Cards */}
      <section className="py-16 -mt-10 relative z-10">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 ${method.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <CardTitle className="text-xl">{method.title}</CardTitle>
                    <CardDescription>{method.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="mb-4">
                      <div className="font-semibold text-primary">{method.action}</div>
                      <div className="text-sm text-muted-foreground flex items-center justify-center gap-1 mt-1">
                        <Clock className="w-3 h-3" />
                        {method.available}
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        if (index === 0) handleLiveChat();
                        else if (index === 1) handlePhoneCall();
                        else if (index === 2) handleEmailSupport();
                      }}
                    >
                      Contact Now
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">Quick answers to common questions</p>
          </div>

          <div className="max-w-4xl mx-auto">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((category, categoryIndex) => (
                <div key={categoryIndex} className="mb-8">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    {category.title}
                  </h3>
                  <Card>
                    <CardContent className="p-0">
                      <Accordion type="single" collapsible className="w-full">
                        {category.questions.map((faq, faqIndex) => (
                          <AccordionItem key={faqIndex} value={`item-${categoryIndex}-${faqIndex}`}>
                            <AccordionTrigger className="px-6 py-4 text-left">
                              {faq.q}
                            </AccordionTrigger>
                            <AccordionContent className="px-6 pb-4">
                              <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                </div>
              ))
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No results found</h3>
                  <p className="text-muted-foreground">Try adjusting your search terms or browse our categories above.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Guides Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">User Guides & Resources</h2>
            <p className="text-lg text-muted-foreground">Detailed guides to help you get started</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guides.map((guide, index) => {
              const IconComponent = guide.icon;
              return (
                <Card 
                  key={index} 
                  className="group cursor-pointer hover:shadow-lg transition-all"
                  onClick={() => handleGuideClick(guide.title)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg group-hover:text-primary transition-colors">
                            {guide.title}
                          </CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {guide.type}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{guide.duration}</span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{guide.description}</p>
                    <Button 
                      variant="ghost" 
                      className="w-full mt-4 justify-start p-0 h-auto"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleGuideClick(guide.title);
                      }}
                    >
                      Read Guide
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground border-0">
            <CardContent className="py-12 text-center">
              <Users className="w-16 h-16 mx-auto mb-6 opacity-80" />
              <h2 className="text-3xl font-bold mb-4">Still need help?</h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Our dedicated support team is available to assist you with any questions or issues you may have.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-background text-primary hover:bg-background/90"
                  onClick={handleLiveChat}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Start Live Chat
                </Button>
                <Button 
                  variant="outline" 
                  className="border-background/30 text-primary-foreground hover:bg-background/10"
                  onClick={handleEmailSupport}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Send Email
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default HelpPage;
