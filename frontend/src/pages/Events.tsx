import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Baby, Heart, UserX, Skull, UserPlus, ArrowRight, Clock, FileText, Users } from 'lucide-react';

const Events = () => {
  const navigate = useNavigate();

  const eventTypes = [
    {
      id: 'birth',
      title: 'Birth Registration',
      description: 'Register the birth of a child and obtain an official birth certificate',
      icon: Baby,
      color: 'bg-blue-100 text-blue-800',
      requirements: ['Hospital birth record', 'Parent identification', 'Marriage certificate (if applicable)'],
      processingTime: '3-5 business days',
      fee: 'Free for first 30 days'
    },
    {
      id: 'marriage',
      title: 'Marriage Registration',
      description: 'Register your marriage and obtain an official marriage certificate',
      icon: Heart,
      color: 'bg-pink-100 text-pink-800',
      requirements: ['Valid IDs of both parties', 'Witnesses', 'Divorce decree (if previously married)'],
      processingTime: '2-3 business days',
      fee: '500 ETB'
    },
    {
      id: 'divorce',
      title: 'Divorce Registration',
      description: 'Register your divorce and obtain official documentation',
      icon: UserX,
      color: 'bg-orange-100 text-orange-800',
      requirements: ['Court decree', 'Marriage certificate', 'Valid IDs'],
      processingTime: '5-7 business days',
      fee: '300 ETB'
    },
    {
      id: 'death',
      title: 'Death Registration',
      description: 'Register the death of a family member and obtain a death certificate',
      icon: Skull,
      color: 'bg-gray-100 text-gray-800',
      requirements: ['Medical death certificate', 'ID of deceased', 'Family member ID'],
      processingTime: '1-2 business days',
      fee: 'Free'
    },
    {
      id: 'adoption',
      title: 'Adoption Services',
      description: 'Process legal adoption and obtain adoption certificates',
      icon: UserPlus,
      color: 'bg-purple-100 text-purple-800',
      requirements: ['Court adoption order', 'Home study report', 'Background checks'],
      processingTime: '10-15 business days',
      fee: '1000 ETB'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">Life Event Registration</h1>
            <p className="text-lg text-muted-foreground">
              Register important life events and obtain official certificates
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 lg:px-8 py-12">
        {/* Event Types Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {eventTypes.map((event) => {
            const IconComponent = event.icon;
            return (
              <Card key={event.id} className="hover:shadow-glow transition-all duration-300 cursor-pointer group">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-hero rounded-xl flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl group-hover:text-primary transition-colors">
                          {event.title}
                        </CardTitle>
                        <Badge className={event.color}>
                          {event.id}
                        </Badge>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-6">
                    {event.description}
                  </CardDescription>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm text-foreground mb-2 flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Required Documents
                      </h4>
                      <ul className="space-y-1">
                        {event.requirements.map((req, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-sm text-foreground mb-1 flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          Processing Time
                        </h4>
                        <p className="text-sm text-muted-foreground">{event.processingTime}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-foreground mb-1">
                          Fee
                        </h4>
                        <p className="text-sm text-muted-foreground">{event.fee}</p>
                      </div>
                    </div>
                  </div>

                  <Button 
                    className="w-full mt-6 btn-primary"
                    onClick={() => navigate(`/events/${event.id}`)}
                  >
                    Start Registration
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Process Overview */}
        <Card className="bg-white/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-center">How It Works</CardTitle>
            <CardDescription className="text-center">
              Simple steps to register your life events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">1</span>
                </div>
                <h3 className="font-semibold mb-2">Choose Event Type</h3>
                <p className="text-sm text-muted-foreground">
                  Select the type of life event you want to register
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">2</span>
                </div>
                <h3 className="font-semibold mb-2">Fill Application</h3>
                <p className="text-sm text-muted-foreground">
                  Complete the online form with required information
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">3</span>
                </div>
                <h3 className="font-semibold mb-2">Submit Documents</h3>
                <p className="text-sm text-muted-foreground">
                  Upload required documents for verification
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">4</span>
                </div>
                <h3 className="font-semibold mb-2">Receive Certificate</h3>
                <p className="text-sm text-muted-foreground">
                  Get your official certificate once approved
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Help Section */}
        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
          <p className="text-muted-foreground mb-6">
            Our support team is available to assist you with your registration
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" onClick={() => navigate('/help')}>
              <Users className="w-4 h-4 mr-2" />
              Contact Support
            </Button>
            <Button variant="outline" onClick={() => navigate('/faq')}>
              <FileText className="w-4 h-4 mr-2" />
              View FAQ
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Events;
