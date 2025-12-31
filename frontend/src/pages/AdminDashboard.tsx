// AdminDashboard.tsx

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Users,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  Shield,
  Building,
  Eye,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PendingEvent {
  id: string;
  event_type: string;
  status: string;
  created_at: string;
  event_data: any;
  applicant_id: string;
}

const AdminDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string>("");
  const [pendingEvents, setPendingEvents] = useState<PendingEvent[]>([]);
  const [stats, setStats] = useState({
    totalApplications: 0,
    pendingReview: 0,
    approved: 0,
    rejected: 0,
  });

  useEffect(() => {
    loadAdminData();
  }, [user]);

  const loadAdminData = async () => {
    if (!user) return;

    try {
      // Get user role
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("user_id", user.id)
        .maybeSingle(); // safer than single()

      if (profileError) {
        throw profileError;
      }

      if (
        !profile ||
        !["national_admin", "regional_admin", "clerk", "auditor"].includes(
          profile.role
        )
      ) {
        toast({
          title: "Access Denied",
          description: "You don't have admin privileges",
          variant: "destructive",
        });
        navigate("/dashboard");
        return;
      }

      setUserRole(profile.role);

      // Get pending events
      const { data: events, error: eventsError } = await supabase
        .from("events")
        .select("*")
        .eq("status", "pending")
        .order("created_at", { ascending: false });

      if (eventsError) throw eventsError;
      setPendingEvents(events || []);

      // Get statistics
      const { data: allEvents, error: allEventsError } = await supabase
        .from("events")
        .select("status");

      if (allEventsError) throw allEventsError;

      if (allEvents) {
        setStats({
          totalApplications: allEvents.length,
          pendingReview: allEvents.filter((e) => e.status === "pending").length,
          approved: allEvents.filter((e) => e.status === "approved").length,
          rejected: allEvents.filter((e) => e.status === "rejected").length,
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApproval = async (eventId: string, approve: boolean) => {
    try {
      const { error } = await supabase
        .from("events")
        .update({
          status: approve ? "approved" : "rejected",
          approved_by: user?.id,
          approved_at: new Date().toISOString(),
        })
        .eq("id", eventId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Application ${
          approve ? "approved" : "rejected"
        } successfully`,
      });

      loadAdminData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-muted/30 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="font-display text-3xl font-bold text-foreground">
              Admin Dashboard
            </h1>
          </div>
          <p className="text-muted-foreground">
            Role:{" "}
            <Badge variant="secondary">
              {userRole ? userRole.replace("_", " ").toUpperCase() : "UNKNOWN"}
            </Badge>
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Applications
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.totalApplications}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Review
              </CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingReview}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.approved}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Rejected</CardTitle>
              <XCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.rejected}</div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Applications */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Applications</CardTitle>
          </CardHeader>
          <CardContent>
            {pendingEvents.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No pending applications
              </p>
            ) : (
              <div className="space-y-4">
                {pendingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline">
                          {event.event_type.toUpperCase()}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {new Date(event.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="font-medium">
                        {event.event_data?.full_name || "N/A"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {event.event_data?.place_of_event || "N/A"}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          // TODO: view details
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="default"
                        onClick={() => handleApproval(event.id, true)}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleApproval(event.id, false)}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
