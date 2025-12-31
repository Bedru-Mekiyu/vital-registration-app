import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, Ear, Hand, Keyboard, Monitor, Users } from 'lucide-react';

const AccessibilityPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-muted/30 py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 rounded-full px-4 py-2 text-sm font-medium mb-6">
              <Users className="w-4 h-4" />
              Digital Inclusion
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Accessibility Statement
            </h1>
            <p className="text-xl text-muted-foreground">
              Ensuring equal access to government services for all Ethiopian citizens
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Accessibility Features */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    Visual Accessibility
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      High contrast color schemes
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Scalable fonts and UI elements
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Screen reader compatibility
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Alternative text for images
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Keyboard className="w-5 h-5" />
                    Keyboard Navigation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Full keyboard navigation support
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Visible focus indicators
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Logical tab order
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Keyboard shortcuts available
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Ear className="w-5 h-5" />
                    Audio & Hearing
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Closed captions for videos
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Visual alerts and notifications
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Text alternatives for audio
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Sign language interpreter support
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Standards & Support */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Monitor className="w-5 h-5" />
                    Technical Standards
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Our platform complies with international accessibility standards:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</li>
                    <li>• Section 508 compliance</li>
                    <li>• Ethiopian Disability Standards</li>
                    <li>• Mobile accessibility best practices</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Hand className="w-5 h-5" />
                    Assistive Technology
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Compatible with popular assistive technologies:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• JAWS screen reader</li>
                    <li>• NVDA screen reader</li>
                    <li>• Dragon voice recognition</li>
                    <li>• Switch navigation devices</li>
                    <li>• Magnification software</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-primary">Accessibility Support</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Need assistance or have accessibility concerns?
                  </p>
                  <div className="bg-primary/5 p-4 rounded-lg">
                    <p className="font-medium">Accessibility Help Desk</p>
                    <p className="text-sm text-muted-foreground">Email: accessibility@gov.et</p>
                    <p className="text-sm text-muted-foreground">Phone: +251-11-XXX-XXXX</p>
                    <p className="text-sm text-muted-foreground">Available: 24/7</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Commitment */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Our Commitment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                The Ethiopian Government is committed to ensuring that all citizens, regardless of ability, 
                can access and use our digital services. We continuously work to improve accessibility 
                through user feedback, regular audits, and updates to meet evolving standards and needs.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityPage;
