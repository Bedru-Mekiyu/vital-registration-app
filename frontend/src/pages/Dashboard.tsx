import { Routes, Route } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  FileText, 
  Shield, 
  Settings, 
  Bell, 
  Plus,
  Download,
  Eye,
  Calendar,
  Award,
  Users,
  FileImage,
  CalendarDays
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const DashboardOverview = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const userName = user?.user_metadata?.first_name || user?.email?.split('@')[0] || 'User';
  
  const handleViewCertificate = (certId: string, certType: string) => {
    toast({
      title: "Opening Certificate",
      description: `Viewing ${certType} details...`,
    });
    // Navigate to certificate detail view
    console.log('View certificate:', certId);
  };
  
  const handleDownloadCertificate = (certId: string, certType: string) => {
    toast({
      title: "Download Started",
      description: `Downloading ${certType}...`,
    });
    // Simulate download
    console.log('Download certificate:', certId);
  };
  const recentCertificates = [
    { id: "1", type: "Birth Certificate", name: "John Doe Jr.", date: "2024-01-15", status: "Verified" },
    { id: "2", type: "Marriage Certificate", name: "John & Jane Doe", date: "2024-01-10", status: "Processing" },
    { id: "3", type: "Death Certificate", name: "Robert Doe Sr.", date: "2024-01-05", status: "Verified" },
  ];

  const quickActions = [
    { icon: Plus, label: "Register Birth", href: "/dashboard/register/birth", color: "text-blue-600" },
    { icon: FileText, label: "Register Marriage", href: "/dashboard/register/marriage", color: "text-green-600" },
    { icon: Shield, label: "Register Death", href: "/dashboard/register/death", color: "text-purple-600" },
    { icon: FileImage, label: "Manage Documents", href: "/documents", color: "text-cyan-600" },
    { icon: CalendarDays, label: "Schedule Appointment", href: "/appointments", color: "text-violet-600" },
    { icon: Users, label: "View Family Tree", href: "/dashboard/family", color: "text-orange-600" },
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="animate-fade-in">
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">
          Welcome back, {userName}
        </h1>
        <p className="text-muted-foreground">
          Manage your vital records and civic engagement from your secure dashboard.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="animate-scale-in">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Certificates</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>
        
        <Card className="animate-scale-in" style={{ animationDelay: "0.1s" }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verified Events</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              100% verification rate
            </p>
          </CardContent>
        </Card>

        <Card className="animate-scale-in" style={{ animationDelay: "0.2s" }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Civic Points</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,450</div>
            <p className="text-xs text-muted-foreground">
              +150 this week
            </p>
          </CardContent>
        </Card>

        <Card className="animate-scale-in" style={{ animationDelay: "0.3s" }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Actions</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Requires attention
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <Card className="animate-fade-in-up">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Register new events or manage existing records
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action, index) => (
                <Link key={action.label} to={action.href} className="block">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start h-auto py-4 hover:bg-accent/50"
                  >
                    <action.icon className={`h-5 w-5 mr-3 ${action.color}`} />
                    <span>{action.label}</span>
                  </Button>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recent Certificates */}
        <div className="lg:col-span-2">
          <Card className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <CardHeader>
              <CardTitle>Recent Certificates</CardTitle>
              <CardDescription>
                Your latest registered vital events and their status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCertificates.map((cert, index) => (
                  <div 
                    key={cert.id} 
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/30 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{cert.type}</p>
                        <p className="text-sm text-muted-foreground">{cert.name}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{cert.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={cert.status === "Verified" ? "default" : "secondary"}>
                        {cert.status}
                      </Badge>
                      <div className="flex space-x-1">
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-8 w-8"
                          onClick={() => handleViewCertificate(cert.id, cert.type)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-8 w-8"
                          onClick={() => handleDownloadCertificate(cert.id, cert.type)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t">
                <Link to="/dashboard/certificates">
                  <Button variant="outline" className="w-full">
                    View All Certificates
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-muted/30">
      <Routes>
        <Route path="/" element={<DashboardOverview />} />
        {/* Add more dashboard routes here as needed */}
      </Routes>
    </div>
  );
};

export default Dashboard;