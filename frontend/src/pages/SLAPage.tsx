import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Shield, Zap, TrendingUp, Award } from "lucide-react";

export default function SLAPage() {
  const commitments = [
    {
      metric: "System Availability",
      target: "99.9%",
      actual: "99.98%",
      icon: CheckCircle,
      color: "text-green-600",
      description: "Monthly uptime guarantee for all core services"
    },
    {
      metric: "API Response Time",
      target: "<200ms",
      actual: "67ms",
      icon: Zap,
      color: "text-yellow-600",
      description: "95th percentile response time for API requests"
    },
    {
      metric: "Certificate Issuance",
      target: "<2 hours",
      actual: "45 min",
      icon: Clock,
      color: "text-blue-600",
      description: "Average time from approval to certificate issuance"
    },
    {
      metric: "Support Response",
      target: "<4 hours",
      actual: "1.5 hours",
      icon: Shield,
      color: "text-purple-600",
      description: "Initial response time for critical support tickets"
    }
  ];

  const tiers = [
    {
      name: "Standard",
      uptime: "99.5%",
      support: "Business hours",
      response: "8 hours",
      features: [
        "Email support",
        "Community forum access",
        "Standard SLA",
        "Monthly reports"
      ]
    },
    {
      name: "Professional",
      uptime: "99.9%",
      support: "24/5",
      response: "4 hours",
      features: [
        "Priority email & chat",
        "Phone support",
        "Enhanced SLA",
        "Weekly reports",
        "Dedicated account manager"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      uptime: "99.95%",
      support: "24/7",
      response: "1 hour",
      features: [
        "24/7 priority support",
        "Dedicated hotline",
        "Custom SLA",
        "Real-time monitoring",
        "Dedicated success team",
        "Quarterly business reviews"
      ]
    }
  ];

  const compensationTable = [
    { uptime: "< 99.9%", credit: "10%" },
    { uptime: "< 99.5%", credit: "25%" },
    { uptime: "< 99.0%", credit: "50%" },
    { uptime: "< 95.0%", credit: "100%" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <Badge variant="outline" className="mb-4">
            <Award className="w-3 h-3 mr-1" />
            Service Level Agreement
          </Badge>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Service Commitments
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl">
            We guarantee reliable, high-performance service with transparent SLAs 
            backed by our commitment to excellence and service credits.
          </p>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {commitments.map((commitment, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <commitment.icon className={`w-8 h-8 ${commitment.color}`} />
                    <Badge variant="outline" className="bg-green-50">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Exceeding
                    </Badge>
                  </div>
                  <h3 className="font-semibold mb-2">{commitment.metric}</h3>
                  <div className="space-y-1 mb-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Target:</span>
                      <span className="font-medium">{commitment.target}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Actual:</span>
                      <span className="font-bold text-primary">{commitment.actual}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{commitment.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Tiers */}
      <section className="pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold mb-4">Service Level Tiers</h2>
            <p className="text-muted-foreground">
              Choose the SLA tier that matches your organization's needs
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {tiers.map((tier, index) => (
              <Card key={index} className={tier.popular ? "border-primary shadow-lg scale-105" : ""}>
                {tier.popular && (
                  <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-medium rounded-t-lg">
                    Most Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  <CardDescription className="space-y-2 mt-4">
                    <div className="flex justify-between">
                      <span>Uptime SLA:</span>
                      <span className="font-bold text-foreground">{tier.uptime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Support:</span>
                      <span className="font-bold text-foreground">{tier.support}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Response:</span>
                      <span className="font-bold text-foreground">{tier.response}</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {tier.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Credits */}
      <section className="pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Service Credit Policy</CardTitle>
              <CardDescription>
                If we don't meet our SLA commitments, you're eligible for service credits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-semibold">Monthly Uptime</th>
                      <th className="text-left p-3 font-semibold">Service Credit</th>
                      <th className="text-left p-3 font-semibold">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {compensationTable.map((row, index) => (
                      <tr key={index} className="border-b hover:bg-accent/50">
                        <td className="p-3 font-mono">{row.uptime}</td>
                        <td className="p-3">
                          <Badge variant="secondary">{row.credit}</Badge>
                        </td>
                        <td className="p-3 text-sm text-muted-foreground">
                          Credit applied to next month's invoice
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <p className="text-sm">
                  <strong>Note:</strong> Service credits are calculated based on the percentage of the 
                  monthly service fee. Planned maintenance windows are excluded from uptime calculations.
                  Credits must be requested within 30 days of the incident.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Maintenance Windows */}
      <section className="pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Planned Maintenance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium mb-1">Regular Maintenance</h4>
                    <p className="text-sm text-muted-foreground">
                      Scheduled every Sunday 02:00-04:00 UTC
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium mb-1">Emergency Maintenance</h4>
                    <p className="text-sm text-muted-foreground">
                      Critical security updates applied immediately with notification
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium mb-1">Notification</h4>
                    <p className="text-sm text-muted-foreground">
                      72-hour advance notice for planned maintenance
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Incident Response</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-medium mb-2">Response Times by Severity</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between p-2 bg-red-50 rounded">
                      <span className="text-sm font-medium">Critical</span>
                      <span className="text-sm">15 minutes</span>
                    </div>
                    <div className="flex justify-between p-2 bg-orange-50 rounded">
                      <span className="text-sm font-medium">High</span>
                      <span className="text-sm">1 hour</span>
                    </div>
                    <div className="flex justify-between p-2 bg-yellow-50 rounded">
                      <span className="text-sm font-medium">Medium</span>
                      <span className="text-sm">4 hours</span>
                    </div>
                    <div className="flex justify-between p-2 bg-green-50 rounded">
                      <span className="text-sm font-medium">Low</span>
                      <span className="text-sm">8 hours</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Exclusions */}
      <section className="pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>SLA Exclusions</CardTitle>
              <CardDescription>
                The following circumstances are excluded from SLA calculations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {[
                  "Scheduled maintenance windows with proper notification",
                  "Issues caused by customer's infrastructure or code",
                  "Third-party service provider failures beyond our control",
                  "Force majeure events (natural disasters, war, etc.)",
                  "DDoS attacks or other malicious activities",
                  "Customer-requested emergency changes",
                  "Beta or preview features explicitly marked as such"
                ].map((exclusion, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-muted-foreground mt-1">•</span>
                    <span className="text-sm">{exclusion}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}