import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, Copy, Check, Lock, Zap, Globe, Shield } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function APIDocumentation() {
  const { toast } = useToast();
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
    toast({ title: "Copied to clipboard" });
  };

  const endpoints = [
    {
      method: "GET",
      path: "/api/v1/certificates/{id}",
      description: "Retrieve certificate details",
      auth: "Bearer Token",
      response: `{
  "id": "uuid",
  "certificate_number": "BC-2024-000001",
  "type": "birth",
  "holder_name": "John Doe",
  "issued_at": "2024-01-15T10:00:00Z",
  "status": "issued",
  "qr_code_url": "https://..."
}`
    },
    {
      method: "POST",
      path: "/api/v1/verification",
      description: "Verify certificate authenticity",
      auth: "API Key",
      response: `{
  "valid": true,
  "certificate": {...},
  "blockchain_verified": true,
  "verification_timestamp": "2024-01-15T10:00:00Z"
}`
    },
    {
      method: "POST",
      path: "/api/v1/events",
      description: "Create new event application",
      auth: "OAuth 2.0",
      response: `{
  "id": "uuid",
  "status": "pending",
  "tracking_number": "EVT-2024-123456",
  "estimated_completion": "2024-01-20T10:00:00Z"
}`
    },
    {
      method: "GET",
      path: "/api/v1/webhooks",
      description: "List configured webhooks",
      auth: "Bearer Token",
      response: `[
  {
    "id": "uuid",
    "url": "https://your-app.com/webhook",
    "events": ["certificate.issued", "application.approved"],
    "active": true
  }
]`
    }
  ];

  const sdks = [
    { name: "JavaScript/Node.js", icon: "🟨", version: "v2.1.0", install: "npm install civicconnect-sdk" },
    { name: "Python", icon: "🐍", version: "v2.0.5", install: "pip install civicconnect" },
    { name: "Java", icon: "☕", version: "v1.9.2", install: "maven dependency" },
    { name: "PHP", icon: "🐘", version: "v1.8.0", install: "composer require civicconnect/sdk" },
    { name: "Ruby", icon: "💎", version: "v1.7.1", install: "gem install civicconnect" },
    { name: ".NET/C#", icon: "⚡", version: "v2.0.0", install: "dotnet add package CivicConnect" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <Badge variant="outline" className="mb-4">
            <Code className="w-3 h-3 mr-1" />
            Developer API
          </Badge>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            API Documentation
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl">
            Build powerful integrations with our RESTful API. Access vital records data, 
            verification services, and real-time webhooks with enterprise-grade reliability.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Button size="lg">
              <Lock className="w-4 h-4 mr-2" />
              Get API Key
            </Button>
            <Button variant="outline" size="lg">
              View Postman Collection
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-primary">99.99%</div>
                <div className="text-sm text-muted-foreground">API Uptime</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-primary">&lt;100ms</div>
                <div className="text-sm text-muted-foreground">Avg Response</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-primary">10M+</div>
                <div className="text-sm text-muted-foreground">API Calls/Day</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Support</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="endpoints" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
              <TabsTrigger value="authentication">Authentication</TabsTrigger>
              <TabsTrigger value="sdks">SDKs & Libraries</TabsTrigger>
              <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
            </TabsList>

            <TabsContent value="endpoints" className="space-y-6">
              {endpoints.map((endpoint, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Badge variant={endpoint.method === "GET" ? "default" : "secondary"}>
                          {endpoint.method}
                        </Badge>
                        <code className="text-sm">{endpoint.path}</code>
                      </div>
                      <Badge variant="outline">
                        <Shield className="w-3 h-3 mr-1" />
                        {endpoint.auth}
                      </Badge>
                    </div>
                    <CardDescription>{endpoint.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Response Example</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(endpoint.response, `endpoint-${index}`)}
                        >
                          {copied === `endpoint-${index}` ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                      <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                        <code className="text-xs">{endpoint.response}</code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="authentication" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Authentication Methods</CardTitle>
                  <CardDescription>
                    We support multiple authentication methods to fit your integration needs
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <Lock className="w-4 h-4 text-primary" />
                        API Key Authentication
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Simple and fast for server-to-server communication
                      </p>
                      <pre className="bg-muted p-3 rounded text-xs overflow-x-auto">
{`curl -X GET "https://api.civicconnect.gov/v1/certificates/123" \\
  -H "X-API-Key: your_api_key_here"`}
                      </pre>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <Globe className="w-4 h-4 text-primary" />
                        OAuth 2.0
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Industry-standard for user-authorized access
                      </p>
                      <pre className="bg-muted p-3 rounded text-xs overflow-x-auto">
{`curl -X GET "https://api.civicconnect.gov/v1/user/profile" \\
  -H "Authorization: Bearer access_token_here"`}
                      </pre>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-primary" />
                        JWT Tokens
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Stateless authentication with embedded claims
                      </p>
                      <pre className="bg-muted p-3 rounded text-xs overflow-x-auto">
{`curl -X GET "https://api.civicconnect.gov/v1/events" \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."`}
                      </pre>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Rate Limits</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between p-3 bg-muted rounded">
                      <span className="font-medium">Free Tier</span>
                      <span className="text-muted-foreground">1,000 requests/hour</span>
                    </div>
                    <div className="flex justify-between p-3 bg-muted rounded">
                      <span className="font-medium">Professional</span>
                      <span className="text-muted-foreground">10,000 requests/hour</span>
                    </div>
                    <div className="flex justify-between p-3 bg-muted rounded">
                      <span className="font-medium">Enterprise</span>
                      <span className="text-muted-foreground">Unlimited</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sdks" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Official SDKs & Libraries</CardTitle>
                  <CardDescription>
                    Use our official SDKs for faster integration and better developer experience
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {sdks.map((sdk, index) => (
                      <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{sdk.icon}</span>
                            <div>
                              <h3 className="font-semibold">{sdk.name}</h3>
                              <Badge variant="outline" className="text-xs">{sdk.version}</Badge>
                            </div>
                          </div>
                        </div>
                        <code className="text-xs bg-muted px-3 py-2 rounded block">
                          {sdk.install}
                        </code>
                        <div className="mt-3 flex gap-2">
                          <Button size="sm" variant="outline">Documentation</Button>
                          <Button size="sm" variant="ghost">GitHub</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Start Example</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                    <code className="text-sm">{`// JavaScript/Node.js Example
const CivicConnect = require('civicconnect-sdk');

const client = new CivicConnect({
  apiKey: 'your_api_key_here',
  environment: 'production'
});

// Verify a certificate
const result = await client.certificates.verify({
  certificateNumber: 'BC-2024-000001'
});

console.log(result.valid); // true
console.log(result.certificate); // certificate details`}</code>
                  </pre>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="webhooks" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Webhook Events</CardTitle>
                  <CardDescription>
                    Receive real-time notifications when events occur in the system
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { event: "certificate.issued", desc: "Fired when a certificate is issued" },
                      { event: "application.submitted", desc: "New application received" },
                      { event: "application.approved", desc: "Application approved by admin" },
                      { event: "application.rejected", desc: "Application rejected" },
                      { event: "verification.completed", desc: "Certificate verification completed" },
                      { event: "document.uploaded", desc: "New supporting document uploaded" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                        <Badge variant="secondary" className="mt-1">{item.event}</Badge>
                        <p className="text-sm text-muted-foreground flex-1">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Webhook Payload Example</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                    <code className="text-xs">{`{
  "event": "certificate.issued",
  "timestamp": "2024-01-15T10:00:00Z",
  "data": {
    "certificate_id": "uuid",
    "certificate_number": "BC-2024-000001",
    "type": "birth",
    "holder_name": "John Doe",
    "issued_at": "2024-01-15T10:00:00Z"
  },
  "signature": "sha256_signature_for_verification"
}`}</code>
                  </pre>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Support Section */}
      <section className="pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <Card className="bg-gradient-to-br from-primary/10 to-secondary/10">
            <CardContent className="p-8">
              <div className="text-center">
                <h2 className="font-display text-2xl font-bold mb-4">Need Help?</h2>
                <p className="text-muted-foreground mb-6">
                  Our developer support team is here to help you integrate quickly
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button>Contact Developer Support</Button>
                  <Button variant="outline">Join Discord Community</Button>
                  <Button variant="ghost">View Code Examples</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}