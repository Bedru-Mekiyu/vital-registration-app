import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, FileArchive } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import JSZip from 'jszip';

interface Certificate {
  id: string;
  certificate_number: string;
  certificate_type: string;
  holder_name: string;
}

interface BulkDownloadProps {
  certificates: Certificate[];
}

export const BulkDownload = ({ certificates }: BulkDownloadProps) => {
  const [selectedCerts, setSelectedCerts] = useState<string[]>([]);
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();

  const toggleCertificate = (id: string) => {
    setSelectedCerts(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedCerts.length === certificates.length) {
      setSelectedCerts([]);
    } else {
      setSelectedCerts(certificates.map(c => c.id));
    }
  };

  const downloadBulk = async () => {
    if (selectedCerts.length === 0) {
      toast({
        title: "No Certificates Selected",
        description: "Please select at least one certificate to download",
        variant: "destructive"
      });
      return;
    }

    setIsDownloading(true);
    try {
      const zip = new JSZip();
      
      // Add selected certificates to ZIP
      for (const certId of selectedCerts) {
        const cert = certificates.find(c => c.id === certId);
        if (cert) {
          // In production, generate actual PDF
          const content = `Certificate: ${cert.certificate_type}\nNumber: ${cert.certificate_number}\nHolder: ${cert.holder_name}`;
          zip.file(`${cert.certificate_number}.txt`, content);
        }
      }

      // Generate and download ZIP
      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `certificates-${new Date().toISOString().split('T')[0]}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Download Complete",
        description: `Downloaded ${selectedCerts.length} certificates`
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Failed to create certificate archive",
        variant: "destructive"
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileArchive className="w-5 h-5" />
          Bulk Download
        </CardTitle>
        <CardDescription>
          Select multiple certificates to download as ZIP archive
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between pb-4 border-b">
          <div className="flex items-center gap-2">
            <Checkbox
              checked={selectedCerts.length === certificates.length}
              onCheckedChange={toggleAll}
            />
            <span className="text-sm font-medium">
              Select All ({selectedCerts.length}/{certificates.length})
            </span>
          </div>
          <Button
            onClick={downloadBulk}
            disabled={isDownloading || selectedCerts.length === 0}
          >
            <Download className="w-4 h-4 mr-2" />
            {isDownloading ? 'Preparing...' : 'Download ZIP'}
          </Button>
        </div>

        <div className="space-y-2 max-h-64 overflow-y-auto">
          {certificates.map(cert => (
            <div
              key={cert.id}
              className="flex items-center gap-2 p-3 border rounded-lg hover:bg-muted/50"
            >
              <Checkbox
                checked={selectedCerts.includes(cert.id)}
                onCheckedChange={() => toggleCertificate(cert.id)}
              />
              <div className="flex-1">
                <p className="font-medium text-sm capitalize">{cert.certificate_type}</p>
                <p className="text-xs text-muted-foreground">{cert.certificate_number}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
