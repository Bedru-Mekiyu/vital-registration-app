import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Cookie, Shield, Settings, CheckCircle, Info } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const CookiesPage = () => {
  const { toast } = useToast();
  const [preferences, setPreferences] = useState({
    necessary: true, // Always enabled
    functional: true,
    analytics: false,
    marketing: false,
  });

  const handleSavePreferences = () => {
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
    toast({
      title: "Preferences Saved",
      description: "Your cookie preferences have been updated successfully.",
    });
  };

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(allAccepted);
    localStorage.setItem('cookiePreferences', JSON.stringify(allAccepted));
    toast({
      title: "All Cookies Accepted",
      description: "You have accepted all cookies.",
    });
  };

  const cookieTypes = [
    {
      id: 'necessary',
      title: 'Necessary Cookies',
      description: 'These cookies are essential for the website to function properly. They enable basic functions like page navigation and access to secure areas.',
      icon: Shield,
      alwaysOn: true,
    },
    {
      id: 'functional',
      title: 'Functional Cookies',
      description: 'These cookies enable enhanced functionality and personalization, such as language preferences and user settings.',
      icon: Settings,
      alwaysOn: false,
    },
    {
      id: 'analytics',
      title: 'Analytics Cookies',
      description: 'These cookies help us understand how visitors interact with the website by collecting and reporting information anonymously.',
      icon: Info,
      alwaysOn: false,
    },
    {
      id: 'marketing',
      title: 'Marketing Cookies',
      description: 'These cookies are used to track visitors across websites to display relevant advertisements and campaigns.',
      icon: CheckCircle,
      alwaysOn: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 border border-white/30 rounded-full px-6 py-3 mb-8">
            <Cookie className="w-5 h-5" />
            <span className="font-medium">Cookie Policy</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Cookie Policy
          </h1>
          
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Learn how we use cookies and manage your preferences to ensure 
            transparency and control over your data.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 -mt-10 relative z-10">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          {/* Cookie Preferences */}
          <Card className="feature-card-premium mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Manage Cookie Preferences
              </CardTitle>
              <CardDescription>
                Control which types of cookies you allow on this website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {cookieTypes.map((cookie) => {
                const IconComponent = cookie.icon;
                return (
                  <div key={cookie.id} className="flex items-start justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{cookie.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {cookie.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      {cookie.alwaysOn ? (
                        <span className="text-xs text-muted-foreground">Always On</span>
                      ) : (
                        <Switch
                          checked={preferences[cookie.id as keyof typeof preferences]}
                          onCheckedChange={(checked) => 
                            setPreferences(prev => ({ ...prev, [cookie.id]: checked }))
                          }
                        />
                      )}
                    </div>
                  </div>
                );
              })}

              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
                <Button onClick={handleSavePreferences} className="flex-1">
                  Save Preferences
                </Button>
                <Button onClick={handleAcceptAll} variant="outline" className="flex-1">
                  Accept All Cookies
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Policy Details */}
          <Card className="feature-card-premium">
            <CardHeader>
              <CardTitle>What Are Cookies?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="text-muted-foreground mb-4">
                  Cookies are small text files that are placed on your computer or mobile device when you visit a website. 
                  They are widely used to make websites work more efficiently and provide information to website owners.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3">How We Use Cookies</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success mt-1 flex-shrink-0" />
                    <span><strong>Authentication:</strong> To keep you logged in and remember your session</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success mt-1 flex-shrink-0" />
                    <span><strong>Preferences:</strong> To remember your language, theme, and other settings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success mt-1 flex-shrink-0" />
                    <span><strong>Security:</strong> To protect against fraudulent activity and enhance security</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success mt-1 flex-shrink-0" />
                    <span><strong>Analytics:</strong> To understand how visitors use our website and improve services</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3">Your Rights</h3>
                <p className="text-muted-foreground mb-4">
                  You have the right to:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Accept or reject non-essential cookies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Change your cookie preferences at any time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Delete cookies from your browser</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Request information about the cookies we use</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3">Third-Party Cookies</h3>
                <p className="text-muted-foreground mb-4">
                  We may use third-party services that set cookies on your device. These services help us 
                  analyze website traffic, provide social media features, and display relevant advertisements. 
                  Third-party cookies are subject to the respective privacy policies of these external services.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3">Managing Cookies</h3>
                <p className="text-muted-foreground mb-4">
                  Most web browsers allow you to control cookies through their settings. However, limiting 
                  cookies may impact your experience and functionality of the website. You can also use the 
                  cookie preference manager above to control which types of cookies we use.
                </p>
              </div>

              <div className="bg-muted/50 p-6 rounded-lg border border-border">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Info className="w-4 h-4 text-primary" />
                  Last Updated
                </h3>
                <p className="text-sm text-muted-foreground">
                  This Cookie Policy was last updated on January 15, 2025. We may update this policy 
                  from time to time. Please check this page regularly for updates.
                </p>
              </div>

              <div className="pt-6 border-t">
                <p className="text-sm text-muted-foreground text-center">
                  For more information about how we handle your data, please read our{' '}
                  <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a> and{' '}
                  <a href="/terms" className="text-primary hover:underline">Terms of Service</a>.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default CookiesPage;
