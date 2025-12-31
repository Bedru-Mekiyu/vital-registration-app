import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, HelpCircle, FileText, Shield, Smartphone, Globe } from 'lucide-react';

const FAQPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const faqCategories = [
    {
      id: 'general',
      title: 'General Questions',
      icon: HelpCircle,
      faqs: [
        {
          q: 'What is the National Life-Events & Civic Engagement Platform?',
          a: 'This is a comprehensive digital platform for Ethiopian citizens to register vital life events (birth, marriage, death, divorce, adoption), access government services, and manage official certificates online.'
        },
        {
          q: 'Who can use this platform?',
          a: 'All Ethiopian citizens and residents can use this platform. You need to create an account with a valid email address and complete identity verification.'
        },
        {
          q: 'Is this platform free to use?',
          a: 'Yes, basic services including registration and certificate access are free. Some premium services may have nominal fees.'
        },
        {
          q: 'What languages are supported?',
          a: 'The platform supports multiple Ethiopian languages including Amharic, Oromo, Tigrinya, and English. You can change the language using the language selector in the navigation.'
        }
      ]
    },
    {
      id: 'registration',
      title: 'Birth & Event Registration',
      icon: FileText,
      faqs: [
        {
          q: 'How do I register a birth?',
          a: 'Navigate to Services → Birth Registration, fill out the form with required details, upload supporting documents (hospital birth record, parent IDs), and submit. Processing typically takes 3-5 business days.'
        },
        {
          q: 'What documents are needed for birth registration?',
          a: 'You need: (1) Hospital birth record or midwife attestation, (2) Both parents\' identification documents, (3) Marriage certificate (if applicable). All documents must be original or certified copies.'
        },
        {
          q: 'Can I register a birth that occurred many years ago?',
          a: 'Yes, late registrations are accepted. Additional verification may be required including witness statements and supporting documentation.'
        },
        {
          q: 'How long does processing take?',
          a: 'Standard processing takes 3-5 business days. Late registrations or complex cases may take 7-14 days. You\'ll receive notifications about your application status.'
        },
        {
          q: 'Can I upload documents instead of typing everything?',
          a: 'Yes! You can upload images or PDFs of documents, and our OCR system will extract the information automatically. You can then review and edit before submission.'
        }
      ]
    },
    {
      id: 'certificates',
      title: 'Certificates & Verification',
      icon: Shield,
      faqs: [
        {
          q: 'How do I download my certificate?',
          a: 'Go to Dashboard, find your issued certificate, and click the Download button. Certificates are provided in PDF format with embedded QR codes for verification.'
        },
        {
          q: 'How can I verify a certificate\'s authenticity?',
          a: 'Use the Certificate Verification page to enter the certificate number or scan the QR code. The system will instantly confirm validity and display certificate details.'
        },
        {
          q: 'What is the QR code on certificates?',
          a: 'The QR code contains encrypted certificate information and verification URL. Anyone can scan it to verify authenticity without needing internet access at the time of scanning.'
        },
        {
          q: 'Can I get a physical copy of my certificate?',
          a: 'Digital certificates are legally valid. Physical copies can be requested through your nearest Vital Records office for an additional fee.'
        },
        {
          q: 'What if I lose my certificate?',
          a: 'Don\'t worry! All certificates are stored securely in your account. You can download a new copy anytime from your Dashboard at no cost.'
        }
      ]
    },
    {
      id: 'technical',
      title: 'Technical Support',
      icon: Smartphone,
      faqs: [
        {
          q: 'Is my data secure on this platform?',
          a: 'Yes. We use bank-level encryption (256-bit SSL), blockchain anchoring for certificates, and comply with international data protection standards. Your data is stored in secure government servers.'
        },
        {
          q: 'Can I use this platform on my mobile phone?',
          a: 'Absolutely! The platform is fully responsive and works on all devices. We also have a dedicated mobile app for iOS and Android.'
        },
        {
          q: 'What browsers are supported?',
          a: 'We support all modern browsers including Chrome, Firefox, Safari, and Edge. For best experience, use the latest browser version.'
        },
        {
          q: 'What if I forget my password?',
          a: 'Click "Forgot Password" on the login page. You\'ll receive a password reset link via email. Make sure to use the email address associated with your account.'
        },
        {
          q: 'Can I access the platform offline?',
          a: 'Some features like viewing saved certificates work offline. However, submission and real-time verification require internet connection.'
        }
      ]
    },
    {
      id: 'services',
      title: 'Services & Features',
      icon: Globe,
      faqs: [
        {
          q: 'What services are available on the platform?',
          a: 'Birth registration, marriage registration, death registration, divorce registration, adoption registration, certificate verification, family tree visualization, appointment scheduling, and document management.'
        },
        {
          q: 'Can I schedule an appointment with a government office?',
          a: 'Yes! Use the Appointment Scheduling feature to book appointments at your nearest office. You can select date, time, and service type.'
        },
        {
          q: 'How does the Family Tree feature work?',
          a: 'The system automatically builds your family tree based on your registered certificates (birth, marriage, etc.). You can visualize relationships and export the tree.'
        },
        {
          q: 'What are Civic Points and Rewards?',
          a: 'You earn points for completing your profile, registering events on time, and engaging with civic services. Points can be redeemed for priority processing or service fee waivers.'
        },
        {
          q: 'Can institutions verify certificates through the platform?',
          a: 'Yes. Authorized institutions (hospitals, courts, schools) can request verification through the Institutional Portal with proper consent from the certificate holder.'
        }
      ]
    }
  ];

  const allFAQs = faqCategories.flatMap(category => 
    category.faqs.map(faq => ({ ...faq, category: category.title, categoryId: category.id }))
  );

  const filteredFAQs = searchQuery.trim() 
    ? allFAQs.filter(faq => 
        faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const getFilteredCategoriesForTab = (tabId: string) => {
    if (tabId === 'all') {
      return searchQuery.trim() ? faqCategories.filter(cat => 
        cat.faqs.some(faq => 
          faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.a.toLowerCase().includes(searchQuery.toLowerCase())
        )
      ) : faqCategories;
    }
    
    const category = faqCategories.find(c => c.id === tabId);
    if (!category) return [];
    
    if (searchQuery.trim()) {
      const filteredFaqs = category.faqs.filter(faq =>
        faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return filteredFaqs.length > 0 ? [{ ...category, faqs: filteredFaqs }] : [];
    }
    
    return [category];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-muted/30">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-background/20 border border-background/30 rounded-full px-6 py-3 mb-8">
            <HelpCircle className="w-5 h-5" />
            <span className="font-medium">Frequently Asked Questions</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            How Can We Help You?
          </h1>
          
          <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
            Find answers to the most common questions about our services
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search frequently asked questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6 text-lg bg-background/10 border-background/20 text-foreground placeholder:text-muted-foreground"
            />
          </div>
          
          {searchQuery && (
            <div className="max-w-2xl mx-auto mt-4">
              <Badge variant="secondary" className="text-sm">
                {filteredFAQs.length} result{filteredFAQs.length !== 1 ? 's' : ''} found
              </Badge>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 -mt-10 relative z-10">
        <div className="container mx-auto px-4 lg:px-8">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-8">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="registration">Registration</TabsTrigger>
              <TabsTrigger value="certificates">Certificates</TabsTrigger>
              <TabsTrigger value="technical">Technical</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
            </TabsList>

            {['all', 'general', 'registration', 'certificates', 'technical', 'services'].map(tabId => (
              <TabsContent key={tabId} value={tabId}>
                <div className="space-y-8">
                  {getFilteredCategoriesForTab(tabId).map((category) => {
                    const IconComponent = category.icon;
                    return (
                      <div key={category.id}>
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                          <IconComponent className="w-6 h-6 text-primary" />
                          {category.title}
                        </h2>
                        <Card>
                          <CardContent className="p-0">
                            <Accordion type="single" collapsible className="w-full">
                              {category.faqs.map((faq, index) => (
                                <AccordionItem key={index} value={`${category.id}-${index}`}>
                                  <AccordionTrigger className="px-6 py-4 text-left hover:bg-muted/50">
                                    <span className="font-medium">{faq.q}</span>
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
                    );
                  })}
                  
                  {getFilteredCategoriesForTab(tabId).length === 0 && (
                    <Card className="text-center py-12">
                      <CardContent>
                        <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">No results found</h3>
                        <p className="text-muted-foreground">
                          Try adjusting your search terms or browse other categories.
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Still Need Help Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/help" className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              Visit Help Center
            </a>
            <a href="/contact" className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-lg hover:bg-muted transition-colors">
              Contact Support
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;
