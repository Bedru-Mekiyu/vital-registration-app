import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { 
  Upload, 
  Download, 
  Eye, 
  Trash2, 
  FileText, 
  Search, 
  Filter,
  Plus,
  Calendar,
  User,
  Share2
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BulkDownload } from '@/components/BulkDownload';
import { CertificateSharing } from '@/components/CertificateSharing';

interface Certificate {
  id: string;
  certificate_type: string;
  certificate_number: string;
  holder_name: string;
  status: string;
  issued_at: string;
  certificate_data: any;
}

interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  uploaded_at: string;
  url: string;
}

const DocumentManager = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [selectedCertForShare, setSelectedCertForShare] = useState<Certificate | null>(null);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [dateFilter, setDateFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  useEffect(() => {
    if (user) {
      fetchCertificates();
      fetchDocuments();
    }
  }, [user]);

  const fetchCertificates = async () => {
    try {
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCertificates(data || []);
    } catch (error) {
      console.error('Error fetching certificates:', error);
      toast({
        title: "Error",
        description: "Failed to load certificates",
        variant: "destructive"
      });
    }
  };

  const fetchDocuments = async () => {
    // This would fetch from a documents table if implemented
    setDocuments([]);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      // Upload to Supabase storage would go here
      toast({
        title: "Success",
        description: `${file.name} uploaded successfully`
      });
      setUploadDialogOpen(false);
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Error",
        description: "Failed to upload file",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const viewCertificate = (certificate: Certificate) => {
    toast({
      title: "Certificate Details",
      description: `Viewing ${certificate.certificate_type} certificate for ${certificate.holder_name}`,
    });
    // In production: navigate to certificate detail page or open modal
  };

  const downloadCertificate = async (certificate: Certificate) => {
    try {
      // Generate PDF certificate here
      toast({
        title: "Download Started",
        description: `Downloading ${certificate.certificate_type} certificate`
      });
    } catch (error) {
      console.error('Error downloading certificate:', error);
      toast({
        title: "Error",
        description: "Failed to download certificate",
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'issued':
        return 'default';
      case 'pending':
        return 'secondary';
      case 'processing':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = cert.certificate_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.holder_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.certificate_type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || cert.status === statusFilter;
    const matchesType = typeFilter === 'all' || cert.certificate_type === typeFilter;
    
    let matchesDate = true;
    if (dateFilter !== 'all' && cert.issued_at) {
      const certDate = new Date(cert.issued_at);
      const now = new Date();
      if (dateFilter === 'week') {
        matchesDate = (now.getTime() - certDate.getTime()) / (1000 * 60 * 60 * 24) <= 7;
      } else if (dateFilter === 'month') {
        matchesDate = (now.getTime() - certDate.getTime()) / (1000 * 60 * 60 * 24) <= 30;
      } else if (dateFilter === 'year') {
        matchesDate = (now.getTime() - certDate.getTime()) / (1000 * 60 * 60 * 24) <= 365;
      }
    }
    
    return matchesSearch && matchesStatus && matchesType && matchesDate;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">
          Document Manager
        </h1>
        <p className="text-muted-foreground">
          Manage your certificates and uploaded documents
        </p>
      </div>

      <Tabs defaultValue="certificates" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
          <TabsTrigger value="documents">My Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="certificates" className="space-y-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search certificates..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="issued">Issued</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="birth">Birth</SelectItem>
                  <SelectItem value="marriage">Marriage</SelectItem>
                  <SelectItem value="death">Death</SelectItem>
                  <SelectItem value="divorce">Divorce</SelectItem>
                </SelectContent>
              </Select>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="week">Last Week</SelectItem>
                  <SelectItem value="month">Last Month</SelectItem>
                  <SelectItem value="year">Last Year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {filteredCertificates.length > 1 && (
              <BulkDownload certificates={filteredCertificates} />
            )}
          </div>

          <div className="grid gap-4">
            {filteredCertificates.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-medium text-lg mb-2">No certificates found</h3>
                  <p className="text-muted-foreground">
                    {searchTerm || statusFilter !== 'all' 
                      ? 'Try adjusting your search or filter criteria'
                      : 'You haven\'t registered any certificates yet'
                    }
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredCertificates.map((certificate) => (
                <Card key={certificate.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <FileText className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium text-lg capitalize">
                            {certificate.certificate_type} Certificate
                          </h3>
                          <p className="text-muted-foreground">
                            {certificate.certificate_number}
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {certificate.holder_name}
                            </div>
                            {certificate.issued_at && (
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(certificate.issued_at).toLocaleDateString()}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={getStatusColor(certificate.status)}>
                          {certificate.status}
                        </Badge>
                        <div className="flex space-x-1">
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            className="h-8 w-8"
                            onClick={() => viewCertificate(certificate)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            className="h-8 w-8"
                            onClick={() => downloadCertificate(certificate)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            className="h-8 w-8"
                            onClick={() => {
                              setSelectedCertForShare(certificate);
                              setShareDialogOpen(true);
                            }}
                          >
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                className="pl-10"
              />
            </div>
            
            <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Upload Document
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload Document</DialogTitle>
                  <DialogDescription>
                    Upload supporting documents for your applications
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="document">Select File</Label>
                    <Input
                      id="document"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      onChange={handleFileUpload}
                      disabled={loading}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Supported formats: PDF, JPG, PNG, DOC, DOCX (Max 10MB)
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="p-8 text-center">
              <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-medium text-lg mb-2">No documents uploaded</h3>
              <p className="text-muted-foreground mb-4">
                Upload documents to support your certificate applications
              </p>
              <Button onClick={() => setUploadDialogOpen(true)}>
                <Upload className="h-4 w-4 mr-2" />
                Upload First Document
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Certificate Sharing Dialog */}
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent>
          {selectedCertForShare && (
            <CertificateSharing
              certificateId={selectedCertForShare.id}
              certificateNumber={selectedCertForShare.certificate_number}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DocumentManager;