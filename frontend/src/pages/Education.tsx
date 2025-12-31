import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { GraduationCap, BookOpen, Users, Award, Video, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Education = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <main className="container mx-auto px-4 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 rounded-full px-4 py-2 text-sm font-medium mb-6">
              <GraduationCap className="w-4 h-4" />
              Digital Literacy
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Education Hub
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Learn how to use government digital services, understand your rights, 
              and become digitally empowered as an Ethiopian citizen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="feature-card-premium group cursor-pointer">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>Getting Started</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center mb-4">
                  Learn the basics of using government digital services
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                  <li>• Creating your account</li>
                  <li>• Navigating the platform</li>
                  <li>• Basic security practices</li>
                  <li>• Understanding your rights</li>
                </ul>
                <Button variant="outline" className="w-full">
                  Start Learning
                </Button>
              </CardContent>
            </Card>

            <Card className="feature-card-premium group cursor-pointer">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <FileText className="w-8 h-8 text-success" />
                </div>
                <CardTitle>Life Events Registration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center mb-4">
                  Master the process of registering major life events
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                  <li>• Birth registration process</li>
                  <li>• Marriage documentation</li>
                  <li>• Certificate verification</li>
                  <li>• Document requirements</li>
                </ul>
                <Button variant="outline" className="w-full">
                  Learn Process
                </Button>
              </CardContent>
            </Card>

            <Card className="feature-card-premium group cursor-pointer">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-trust/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-8 h-8 text-trust" />
                </div>
                <CardTitle>Digital Citizenship</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center mb-4">
                  Become a confident digital citizen of Ethiopia
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                  <li>• Digital rights and responsibilities</li>
                  <li>• Privacy and security</li>
                  <li>• Civic engagement online</li>
                  <li>• Fighting misinformation</li>
                </ul>
                <Button variant="outline" className="w-full">
                  Explore Path
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <Card className="feature-card-premium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="w-5 h-5" />
                  Video Tutorials
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { title: 'How to Register a Birth Certificate', duration: '5 min', views: '12K views' },
                  { title: 'Certificate Verification Step-by-Step', duration: '3 min', views: '8K views' },
                  { title: 'Understanding Your Digital Rights', duration: '7 min', views: '15K views' },
                  { title: 'Marriage Registration Complete Guide', duration: '8 min', views: '6K views' },
                ].map((video, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 cursor-pointer">
                    <div>
                      <h4 className="font-medium text-sm">{video.title}</h4>
                      <p className="text-xs text-muted-foreground">{video.duration} • {video.views}</p>
                    </div>
                    <Button size="sm" variant="ghost">
                      Watch
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="feature-card-premium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Community Learning
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Discussion Forums</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Connect with other citizens, ask questions, and share experiences
                  </p>
                  <Button variant="outline" className="w-full">
                    Join Discussions
                  </Button>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Local Ambassadors</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get help from trained community volunteers in your area
                  </p>
                  <Button variant="outline" className="w-full">
                    Find Ambassador
                  </Button>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Workshops & Events</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Attend in-person and virtual learning sessions
                  </p>
                  <Button variant="outline" className="w-full">
                    View Events
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="feature-card-premium">
            <CardHeader>
              <CardTitle>Multi-Language Learning</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                All educational content is available in multiple Ethiopian languages to ensure 
                accessibility for all citizens, regardless of their preferred language.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {[
                  { name: 'English', flag: '🇺🇸' },
                  { name: 'አማርኛ', flag: '🇪🇹' },
                  { name: 'Afaan Oromoo', flag: '🇪🇹' },
                  { name: 'ትግርኛ', flag: '🇪🇹' },
                  { name: 'Somali', flag: '🇪🇹' },
                  { name: 'Afar', flag: '🇪🇹' },
                ].map((lang, index) => (
                  <div key={index} className="text-center p-3 border border-border rounded-lg hover:bg-muted/50 cursor-pointer">
                    <div className="text-2xl mb-2">{lang.flag}</div>
                    <div className="text-sm font-medium">{lang.name}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Education;
