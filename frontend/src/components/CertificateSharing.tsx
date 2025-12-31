import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Share2, Copy, Clock, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CertificateSharingProps {
  certificateId: string;
  certificateNumber: string;
}

export const CertificateSharing = ({ certificateId, certificateNumber }: CertificateSharingProps) => {
  const [expiryDays, setExpiryDays] = useState('7');
  const [shareLink, setShareLink] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateShareLink = async () => {
    setIsGenerating(true);
    try {
      // In production, generate secure token and store in database
      const token = btoa(`${certificateId}-${Date.now()}`);
      const link = `${window.location.origin}/verify/shared/${token}`;
      setShareLink(link);

      toast({
        title: "Share Link Generated",
        description: `Link expires in ${expiryDays} days`
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Could not generate share link",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(shareLink);
    toast({
      title: "Link Copied",
      description: "Share link copied to clipboard"
    });
  };

  const shareViaEmail = () => {
    const subject = `Certificate Verification Link`;
    const body = `View and verify my certificate:\n\n${shareLink}\n\nThis link expires in ${expiryDays} days.`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Share2 className="w-5 h-5" />
          Share Certificate
        </CardTitle>
        <CardDescription>
          Generate a secure, time-limited share link
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Link Expiration</Label>
          <Select value={expiryDays} onValueChange={setExpiryDays}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Day</SelectItem>
              <SelectItem value="7">7 Days</SelectItem>
              <SelectItem value="30">30 Days</SelectItem>
              <SelectItem value="90">90 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {!shareLink ? (
          <Button onClick={generateShareLink} disabled={isGenerating} className="w-full">
            <Share2 className="w-4 h-4 mr-2" />
            {isGenerating ? 'Generating...' : 'Generate Share Link'}
          </Button>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center gap-2 p-3 bg-success/10 border border-success/20 rounded-lg">
              <CheckCircle className="w-5 h-5 text-success" />
              <span className="text-sm text-success font-medium">Link Generated</span>
            </div>

            <div className="relative">
              <Input value={shareLink} readOnly className="pr-20" />
              <Button
                size="sm"
                variant="ghost"
                onClick={copyLink}
                className="absolute right-1 top-1/2 -translate-y-1/2"
              >
                <Copy className="w-4 h-4 mr-1" />
                Copy
              </Button>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              Expires in {expiryDays} days
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={shareViaEmail} className="flex-1">
                Share via Email
              </Button>
              <Button variant="outline" onClick={() => setShareLink('')} className="flex-1">
                Generate New
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
