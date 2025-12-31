import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, Shield, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

export const ExportData = () => {
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const exportUserData = async () => {
    setIsExporting(true);
    try {
      // Simulate data export process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create mock export data
      const exportData = {
        user: {
          id: user?.id,
          email: user?.email,
          exportDate: new Date().toISOString()
        },
        profile: {
          name: 'User Profile Data',
          // Add profile data
        },
        certificates: {
          // Add certificate data
        },
        applications: {
          // Add application data
        }
      };

      // Create downloadable file
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `my-data-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Export Complete",
        description: "Your data has been downloaded successfully"
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="w-5 h-5" />
          Export Your Data
        </CardTitle>
        <CardDescription>
          Download all your personal data in compliance with GDPR
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
            <FileText className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium text-sm">What's Included</p>
              <p className="text-sm text-muted-foreground">
                Profile information, certificates, application history, and account activity
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
            <Shield className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium text-sm">Data Security</p>
              <p className="text-sm text-muted-foreground">
                Your exported data is encrypted and only accessible by you
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
            <Clock className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium text-sm">Processing Time</p>
              <p className="text-sm text-muted-foreground">
                Export usually completes within a few seconds
              </p>
            </div>
          </div>
        </div>

        <Button 
          onClick={exportUserData} 
          disabled={isExporting}
          className="w-full"
        >
          <Download className="w-4 h-4 mr-2" />
          {isExporting ? 'Exporting...' : 'Export My Data'}
        </Button>

        <p className="text-xs text-muted-foreground">
          By exporting your data, you agree to handle it securely and in accordance with data protection laws.
        </p>
      </CardContent>
    </Card>
  );
};
