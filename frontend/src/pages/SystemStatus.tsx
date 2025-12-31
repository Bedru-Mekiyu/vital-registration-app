import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, XCircle, Activity, Clock, Zap } from "lucide-react";

export default function SystemStatus() {
  const services = [
    {
      name: "API Gateway",
      status: "operational",
      uptime: "99.99%",
      responseTime: "45ms",
      lastIncident: "None in last 90 days"
    },
    {
      name: "Certificate Issuance",
      status: "operational",
      uptime: "99.98%",
      responseTime: "120ms",
      lastIncident: "None in last 90 days"
    },
    {
      name: "Verification Service",
      status: "operational",
      uptime: "100%",
      responseTime: "35ms",
      lastIncident: "None in last 90 days"
    },
    {
      name: "Document Storage",
      status: "operational",
      uptime: "99.97%",
      responseTime: "80ms",
      lastIncident: "Minor delay on 2024-01-10"
    },
    {
      name: "Authentication",
      status: "operational",
      uptime: "99.99%",
      responseTime: "25ms",
      lastIncident: "None in last 90 days"
    },
    {
      name: "Blockchain Anchoring",
      status: "degraded",
      uptime: "99.95%",
      responseTime: "350ms",
      lastIncident: "Performance degradation (investigating)"
    },
    {
      name: "Email Notifications",
      status: "operational",
      uptime: "99.96%",
      responseTime: "150ms",
      lastIncident: "None in last 30 days"
    },
    {
      name: "SMS Notifications",
      status: "operational",
      uptime: "99.94%",
      responseTime: "200ms",
      lastIncident: "None in last 30 days"
    }
  ];

  const incidents = [
    {
      date: "2024-01-15",
      title: "Blockchain Anchoring - Performance Degradation",
      status: "investigating",
      severity: "minor",
      updates: [
        { time: "14:30 UTC", message: "We're investigating increased latency in blockchain anchoring" },
        { time: "14:15 UTC", message: "Some users may experience delays in certificate verification" }
      ]
    },
    {
      date: "2024-01-10",
      title: "Document Storage - Brief Delay",
      status: "resolved",
      severity: "minor",
      updates: [
        { time: "11:45 UTC", message: "Issue resolved. All systems operating normally" },
        { time: "11:20 UTC", message: "Document uploads experiencing 30-second delays" }
      ]
    }
  ];

  const metrics = [
    { label: "Overall Uptime (30 days)", value: "99.98%", icon: CheckCircle, color: "text-green-600" },
    { label: "Active Users", value: "47,329", icon: Activity, color: "text-blue-600" },
    { label: "Avg Response Time", value: "67ms", icon: Zap, color: "text-yellow-600" },
    { label: "Incidents (30 days)", value: "2", icon: AlertTriangle, color: "text-orange-600" }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "operational":
        return <Badge className="bg-green-600"><CheckCircle className="w-3 h-3 mr-1" />Operational</Badge>;
      case "degraded":
        return <Badge className="bg-yellow-600"><AlertTriangle className="w-3 h-3 mr-1" />Degraded</Badge>;
      case "outage":
        return <Badge className="bg-red-600"><XCircle className="w-3 h-3 mr-1" />Outage</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="w-8 h-8 text-primary" />
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <CheckCircle className="w-3 h-3 mr-1" />
              All Systems Operational
            </Badge>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            System Status
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl">
            Real-time status and performance monitoring of all CivicConnect services and infrastructure.
          </p>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <metric.icon className={`w-5 h-5 ${metric.color}`} />
                    <span className="text-2xl font-bold">{metric.value}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">{metric.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Status */}
      <section className="pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Service Status</CardTitle>
              <CardDescription>Current status of all platform services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {services.map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="min-w-[200px]">
                        <h3 className="font-semibold">{service.name}</h3>
                        <p className="text-sm text-muted-foreground">{service.lastIncident}</p>
                      </div>
                      <div className="hidden md:flex gap-8 flex-1">
                        <div>
                          <div className="text-xs text-muted-foreground">Uptime</div>
                          <div className="font-medium">{service.uptime}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Response Time</div>
                          <div className="font-medium">{service.responseTime}</div>
                        </div>
                      </div>
                    </div>
                    {getStatusBadge(service.status)}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Recent Incidents */}
      <section className="pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Recent Incidents</CardTitle>
              <CardDescription>History of service incidents and their resolutions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {incidents.map((incident, index) => (
                  <div key={index} className="border-l-4 border-l-yellow-500 pl-4 py-2">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">{incident.title}</h3>
                        <div className="flex items-center gap-3 mt-1">
                          <Badge variant={incident.status === "resolved" ? "default" : "secondary"}>
                            {incident.status}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{incident.date}</span>
                        </div>
                      </div>
                      <Badge variant="outline" className="capitalize">{incident.severity}</Badge>
                    </div>
                    <div className="mt-4 space-y-2">
                      {incident.updates.map((update, idx) => (
                        <div key={idx} className="flex gap-3 text-sm">
                          <Clock className="w-4 h-4 text-muted-foreground mt-0.5" />
                          <div>
                            <span className="font-medium">{update.time}</span>
                            <span className="text-muted-foreground"> - {update.message}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <Card className="bg-gradient-to-br from-primary/10 to-secondary/10">
            <CardContent className="p-8 text-center">
              <h2 className="font-display text-2xl font-bold mb-4">Get Status Updates</h2>
              <p className="text-muted-foreground mb-6">
                Subscribe to receive real-time notifications about system status and incidents
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 border rounded-lg"
                />
                <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90">
                  Subscribe
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}