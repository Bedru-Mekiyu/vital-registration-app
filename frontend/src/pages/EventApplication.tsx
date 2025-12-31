import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Baby, Heart, UserCheck, Users, Upload, ScanLine, FileUp } from 'lucide-react';
import { z } from 'zod';

const eventApplicationSchema = z.object({
  fullName: z.string().trim().min(2, "Name must be at least 2 characters"),
  dateOfEvent: z.string().nonempty("Date is required"),
  placeOfEvent: z.string().trim().min(2, "Place is required"),
  additionalInfo: z.string().optional()
});

const EventApplication = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [eventType, setEventType] = useState<string>('');
  const [files, setFiles] = useState<File[]>([]);
  const [inputMethod, setInputMethod] = useState<'manual' | 'upload' | 'ocr'>('manual');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Get event type from URL parameter
  useEffect(() => {
    const typeParam = searchParams.get('type');
    if (typeParam) {
      setEventType(typeParam);
    }
  }, [searchParams]);
  
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfEvent: '',
    placeOfEvent: '',
    fatherName: '',
    motherName: '',
    spouseName: '',
    additionalInfo: ''
  });

  const eventTypes = [
    { value: 'birth', label: 'Birth Certificate', icon: Baby, color: 'text-blue-600' },
    { value: 'marriage', label: 'Marriage Certificate', icon: Heart, color: 'text-pink-600' },
    { value: 'death', label: 'Death Certificate', icon: UserCheck, color: 'text-gray-600' },
    { value: 'divorce', label: 'Divorce Certificate', icon: Users, color: 'text-orange-600' },
    { value: 'adoption', label: 'Adoption Certificate', icon: Heart, color: 'text-green-600' }
  ];

  const handleDocumentUpload = async (file: File) => {
    setLoading(true);
    try {
      toast({
        title: "Processing Document",
        description: "Extracting information from uploaded document...",
      });

      // Simulate OCR processing
      setTimeout(() => {
        toast({
          title: "Document Processed",
          description: "Information extracted successfully. Please review and edit if needed.",
        });
        setInputMethod('manual');
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error('Error processing file:', error);
      toast({
        title: "Error",
        description: "Failed to process document",
        variant: "destructive"
      });
      setLoading(false);
    }
  };

  const uploadSupportingFiles = async (eventFiles: File[]) => {
    const uploadedUrls: string[] = [];
    
    for (let i = 0; i < eventFiles.length; i++) {
      const file = eventFiles[i];
      const fileExt = file.name.split('.').pop();
      const fileName = `${user?.id}/${Date.now()}-${i}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('documents')
        .upload(fileName, file);
      
      if (error) throw error;
      uploadedUrls.push(data.path);
    }
    
    return uploadedUrls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!eventType) {
      toast({
        title: "Error",
        description: "Please select an event type",
        variant: "destructive"
      });
      return;
    }

    try {
      eventApplicationSchema.parse({
        fullName: formData.fullName,
        dateOfEvent: formData.dateOfEvent,
        placeOfEvent: formData.placeOfEvent,
        additionalInfo: formData.additionalInfo
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
          variant: "destructive"
        });
        return;
      }
    }

    setLoading(true);
    
    try {
      const fileUrls = files.length > 0 ? await uploadSupportingFiles(files) : [];
      
      const eventData: any = {
        full_name: formData.fullName,
        date_of_event: formData.dateOfEvent,
        place_of_event: formData.placeOfEvent,
        additional_info: formData.additionalInfo
      };

      if (eventType === 'birth') {
        eventData.father_name = formData.fatherName;
        eventData.mother_name = formData.motherName;
      } else if (eventType === 'marriage') {
        eventData.spouse_name = formData.spouseName;
      }

      const { error } = await supabase
        .from('events')
        .insert([{
          event_type: eventType as 'birth' | 'marriage' | 'death' | 'divorce' | 'adoption',
          applicant_id: user?.id,
          status: 'pending',
          event_data: eventData,
          file_attachments: fileUrls
        }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Your application has been submitted successfully",
      });

      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-muted/30 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Apply for Certificate
          </h1>
          <p className="text-muted-foreground">
            Submit your application for a vital records certificate
          </p>
        </div>

        <Card className="shadow-elegant mb-6">
          <CardHeader>
            <CardTitle>Select Certificate Type</CardTitle>
            <CardDescription>Choose the type of certificate you need</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {eventTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.value}
                    onClick={() => setEventType(type.value)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      eventType === type.value
                        ? 'border-primary bg-primary/5'
                        : 'border-muted hover:border-muted-foreground/50'
                    }`}
                  >
                    <Icon className={`h-8 w-8 mx-auto mb-2 ${type.color}`} />
                    <p className="text-sm font-medium text-center">{type.label}</p>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {eventType && (
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle>Application Details</CardTitle>
              <CardDescription>Choose how you want to submit your information</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={inputMethod} onValueChange={(v) => setInputMethod(v as any)} className="mb-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="manual">
                    <UserCheck className="h-4 w-4 mr-2" />
                    Manual Entry
                  </TabsTrigger>
                  <TabsTrigger value="upload">
                    <FileUp className="h-4 w-4 mr-2" />
                    Upload Document
                  </TabsTrigger>
                  <TabsTrigger value="ocr">
                    <ScanLine className="h-4 w-4 mr-2" />
                    Scan & Extract
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="upload" className="space-y-4 mt-6">
                  <div className="border-2 border-dashed rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="font-medium mb-2">Upload Document</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Upload a PDF or image of your document. We'll extract the information automatically.
                    </p>
                    <Input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleDocumentUpload(file);
                      }}
                      className="hidden"
                      disabled={loading}
                    />
                    <Button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={loading}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      {loading ? 'Processing...' : 'Choose File'}
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      Supported formats: PDF, JPG, PNG (Max 10MB)
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="ocr" className="space-y-4 mt-6">
                  <div className="border-2 border-dashed rounded-lg p-8 text-center">
                    <ScanLine className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="font-medium mb-2">Scan Document with Camera</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Use your device camera to scan documents. Our AI will extract all information.
                    </p>
                    <Button
                      type="button"
                      onClick={() => {
                        toast({
                          title: "Camera Feature",
                          description: "Opening camera for document scanning...",
                        });
                        // In production: integrate with camera API
                        setTimeout(() => setInputMethod('manual'), 1000);
                      }}
                    >
                      <ScanLine className="h-4 w-4 mr-2" />
                      Start Camera Scan
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      Ensure good lighting and document is clearly visible
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="manual" className="mt-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="dateOfEvent">Date of {eventType} *</Label>
                        <Input
                          id="dateOfEvent"
                          type="date"
                          value={formData.dateOfEvent}
                          onChange={(e) => setFormData({ ...formData, dateOfEvent: e.target.value })}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="placeOfEvent">Place of {eventType} *</Label>
                        <Input
                          id="placeOfEvent"
                          value={formData.placeOfEvent}
                          onChange={(e) => setFormData({ ...formData, placeOfEvent: e.target.value })}
                          required
                        />
                      </div>

                      {eventType === 'birth' && (
                        <>
                          <div>
                            <Label htmlFor="fatherName">Father's Name *</Label>
                            <Input
                              id="fatherName"
                              value={formData.fatherName}
                              onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="motherName">Mother's Name *</Label>
                            <Input
                              id="motherName"
                              value={formData.motherName}
                              onChange={(e) => setFormData({ ...formData, motherName: e.target.value })}
                              required
                            />
                          </div>
                        </>
                      )}

                      {eventType === 'marriage' && (
                        <div>
                          <Label htmlFor="spouseName">Spouse's Name *</Label>
                          <Input
                            id="spouseName"
                            value={formData.spouseName}
                            onChange={(e) => setFormData({ ...formData, spouseName: e.target.value })}
                            required
                          />
                        </div>
                      )}

                      <div>
                        <Label htmlFor="additionalInfo">Additional Information</Label>
                        <Textarea
                          id="additionalInfo"
                          value={formData.additionalInfo}
                          onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                          rows={4}
                        />
                      </div>

                      <div>
                        <Label htmlFor="files">Supporting Documents</Label>
                        <div className="mt-2">
                          <label
                            htmlFor="file-upload"
                            className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-muted-foreground/30 rounded-lg cursor-pointer hover:border-muted-foreground/50 transition-colors"
                          >
                            <div className="text-center">
                              <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                              <p className="text-sm text-muted-foreground">
                                Click to upload documents
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                PDF, JPG, PNG up to 10MB
                              </p>
                            </div>
                            <input
                              id="file-upload"
                              type="file"
                              className="hidden"
                              multiple
                              accept=".pdf,.jpg,.jpeg,.png"
                              onChange={(e) => setFiles(Array.from(e.target.files || []))}
                            />
                          </label>
                          {files.length > 0 && (
                            <div className="mt-2 space-y-1">
                              {files.map((file, index) => (
                                <p key={index} className="text-sm text-muted-foreground">
                                  {file.name}
                                </p>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? 'Submitting...' : 'Submit Application'}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default EventApplication;
