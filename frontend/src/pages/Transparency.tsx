import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  Eye, 
  BarChart3, 
  FileText, 
  Users, 
  Clock,
  CheckCircle,
  TrendingUp,
  Globe,
  Download,
  ExternalLink,
  AlertCircle,
  Calendar
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const Transparency = () => {
  const stats = [
    {
      title: 'Total Certificates Issued',
      value: '1,847,392',
      change: '+12.3%',
      period: 'Last 30 days',
      icon: FileText,
      color: 'text-primary'
    },
    {
      title: 'Average Processing Time',
      value: '2.3 days',
      change: '-18.2%',
      period: 'Improvement',
      icon: Clock,
      color: 'text-success'
    },
    {
      title: 'User Satisfaction',
      value: '94.7%',
      change: '+2.1%',
      period: 'Last quarter',
      icon: Users,
      color: 'text-trust'
    },
    {
      title: 'System Uptime',
      value: '99.94%',
      change: '+0.02%',
      period: 'Last 30 days',
      icon: Shield,
      color: 'text-accent'
    }
  ];

  const serviceMetrics = [
    { name: 'Birth Registration', completed: 87, pending: 13, averageTime: '2.1 days' },
    { name: 'Marriage Registration', completed: 92, pending: 8, averageTime: '1.8 days' },
    { name: 'Death Registration', completed: 95, pending: 5, averageTime: '1.2 days' },
    { name: 'Divorce Registration', completed: 89, pending: 11, averageTime: '3.4 days' },
    { name: 'Adoption Services', completed: 76, pending: 24, averageTime: '8.7 days' }
  ];

  const budgetData = [
    { category: 'Technology Infrastructure', amount: '45.2M ETB', percentage: 35 },
    { category: 'Staff & Operations', amount: '38.7M ETB', percentage: 30 },
    { category: 'Digital Literacy Programs', amount: '25.8M ETB', percentage: 20 },
    { category: 'Security & Compliance', amount: '19.3M ETB', percentage: 15 }
  ];

  const reports = [
    {
      title: 'Annual Performance Report 2024',
      description: 'Comprehensive overview of all government digital services performance',
      date: 'March 2024',
      size: '2.3 MB',
      type: 'PDF'
    },
    {
      title: 'Quarterly Security Assessment',
      description: 'Independent security audit and compliance verification report',
      date: 'February 2024',
      size: '1.8 MB',
      type: 'PDF'
    },
    {
      title: 'User Satisfaction Survey Results',
      description: 'Detailed analysis of citizen feedback and service improvements',
      date: 'January 2024',
      size: '1.2 MB',
      type: 'PDF'
    },
    {
      title: 'Digital Inclusion Progress Report',
      description: 'Rural access expansion and multi-language service delivery',
      date: 'December 2023',
      size: '1.9 MB',
      type: 'PDF'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="py-20 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 border border-white/30 rounded-full px-6 py-3 mb-8">
            <Eye className="w-5 h-5" />
            <span className="font-medium">Government Transparency</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Open Government Data
          </h1>
          
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Promoting transparency, accountability, and citizen trust through open access to 
            government service data, performance metrics, and operational insights.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="hero-button">
              <BarChart3 className="w-4 h-4 mr-2" />
              View Live Dashboard
            </Button>
            <Button className="hero-button-secondary">
              <Download className="w-4 h-4 mr-2" />
              Download Reports
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 -mt-10 relative z-10">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index} className="glass-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 bg-muted rounded-lg flex items-center justify-center`}>
                        <IconComponent className={`w-6 h-6 ${stat.color}`} />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        Live
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-sm text-muted-foreground">{stat.title}</h3>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-success font-medium">{stat.change}</span>
                        <span className="text-muted-foreground">{stat.period}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Service Completion Rates
                </CardTitle>
                <CardDescription>
                  Real-time completion rates for all life event services
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {serviceMetrics.map((service, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{service.name}</span>
                      <div className="text-sm text-muted-foreground">
                        {service.completed}% completed
                      </div>
                    </div>
                    <Progress value={service.completed} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Avg: {service.averageTime}</span>
                      <span>{service.pending}% pending</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-trust" />
                  Budget Allocation 2024
                </CardTitle>
                <CardDescription>
                  Transparent breakdown of government digital service spending
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {budgetData.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm">{item.category}</span>
                      <span className="text-primary font-semibold">{item.amount}</span>
                    </div>
                    <Progress value={item.percentage} className="h-2" />
                    <div className="text-xs text-muted-foreground text-right">
                      {item.percentage}% of total budget
                    </div>
                  </div>
                ))}
                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center font-semibold">
                    <span>Total Budget</span>
                    <span className="text-primary">129.0M ETB</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-accent" />
                Public Reports & Documents
              </CardTitle>
              <CardDescription>
                Download official reports, audits, and performance assessments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reports.map((report, index) => (
                  <Card key={index} className="border-border hover:shadow-medium transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-primary" />
                          <Badge variant="outline">{report.type}</Badge>
                        </div>
                        <div className="text-xs text-muted-foreground">{report.size}</div>
                      </div>
                      <h3 className="font-semibold mb-2">{report.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{report.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {report.date}
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="w-3 h-3 mr-1" />
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Open Data Initiative</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our commitment to transparency includes making government data openly accessible 
              to researchers, journalists, and citizens for analysis and accountability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="feature-card">
              <CardHeader className="text-center">
                <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Public API Access</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-muted-foreground">
                  Access aggregated, anonymized data through our public APIs for research and analysis.
                </p>
                <Button variant="outline" className="w-full">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  API Documentation
                </Button>
              </CardContent>
            </Card>

            <Card className="feature-card">
              <CardHeader className="text-center">
                <Shield className="w-12 h-12 text-trust mx-auto mb-4" />
                <CardTitle>Privacy Protection</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-muted-foreground">
                  All public data is carefully anonymized and aggregated to protect individual privacy.
                </p>
                <Button variant="outline" className="w-full">
                  <FileText className="w-4 h-4 mr-2" />
                  Privacy Policy
                </Button>
              </CardContent>
            </Card>

            <Card className="feature-card">
              <CardHeader className="text-center">
                <AlertCircle className="w-12 h-12 text-accent mx-auto mb-4" />
                <CardTitle>Report Issues</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-muted-foreground">
                  Found an issue with government services? Report it directly for investigation.
                </p>
                <Button variant="outline" className="w-full">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Submit Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <Card className="bg-gradient-hero text-white border-0">
            <CardContent className="py-12 text-center">
              <Eye className="w-16 h-16 mx-auto mb-6 opacity-80" />
              <h2 className="text-3xl font-bold mb-4">Have Questions About Our Data?</h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                We believe in complete transparency. If you have questions about our data, 
                methodology, or would like additional information, please reach out.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="hero-button">
                  <FileText className="w-4 h-4 mr-2" />
                  Request Data
                </Button>
                <Button className="hero-button-secondary">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Contact Transparency Office
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Transparency;
