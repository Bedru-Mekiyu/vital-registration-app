import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import FileUpload from '@/components/FileUpload';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

// Import individual service forms
import BirthRegistrationForm from './BirthRegistration';

const ServiceForm = () => {
  const { serviceType } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine service type from URL path or params
  const currentServiceType = serviceType || location.pathname.replace('/', '');
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ name: string; url: string; size: number }>>([]);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  const serviceConfig = {
    birth: {
      title: 'Birth Registration',
      description: 'Register a new birth and obtain official birth certificate',
      totalSteps: 4,
      requiredDocuments: [
        'Hospital birth record or medical certificate',
        'Parents\' identification documents',
        'Marriage certificate (if applicable)',
        'Witness identification'
      ]
    },
    marriage: {
      title: 'Marriage Registration',
      description: 'Register marriage and obtain marriage certificate',
      totalSteps: 3,
      requiredDocuments: [
        'Valid IDs of both parties',
        'Witnesses identification',
        'Divorce decree (if previously married)',
        'Medical certificates'
      ]
    },
    divorce: {
      title: 'Divorce Registration',
      description: 'Process divorce documentation with legal verification',
      totalSteps: 3,
      requiredDocuments: [
        'Court divorce decree',
        'Original marriage certificate',
        'Valid IDs of both parties',
        'Asset documentation'
      ]
    },
    death: {
      title: 'Death Registration',
      description: 'Register death and manage estate documentation',
      totalSteps: 3,
      requiredDocuments: [
        'Medical death certificate',
        'ID of deceased person',
        'Family member identification',
        'Hospital/medical records'
      ]
    },
    adoption: {
      title: 'Adoption Services',
      description: 'Complete adoption process with court approvals',
      totalSteps: 4,
      requiredDocuments: [
        'Court adoption order',
        'Home study report',
        'Background check certificates',
        'Financial statements'
      ]
    }
  };

  const config = serviceConfig[serviceType as keyof typeof serviceConfig];

  if (!config) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <Header />
        <main className="container mx-auto px-4 lg:px-8 py-16">
          <Card>
            <CardContent className="p-8 text-center">
              <h1 className="text-2xl font-bold mb-4">Service Not Found</h1>
              <p className="text-muted-foreground mb-6">
                The requested service type is not available.
              </p>
              <Button onClick={() => navigate('/services')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Services
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  const handleFilesUploaded = (files: Array<{ name: string; url: string; size: number }>) => {
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const handleSubmit = async (formData: any) => {
    if (!user) return;

    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('events')
        .insert([{
          event_type: serviceType as any,
          applicant_id: user.id,
          status: 'pending',
          event_data: formData,
          file_attachments: uploadedFiles
        }]);

      if (error) throw error;

      toast({
        title: "Application Submitted! 🎉",
        description: `Your ${config.title.toLowerCase()} application has been submitted for review.`,
      });

      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: "Submission Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // For birth registration, use the existing component
  if (serviceType === 'birth') {
    return <BirthRegistrationForm />;
  }

  // Generic form for other services
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <main className="container mx-auto px-4 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button variant="ghost" onClick={() => navigate('/services')} className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Services
            </Button>
            
            <h1 className="text-3xl font-bold mb-2">{config.title}</h1>
            <p className="text-muted-foreground">{config.description}</p>
          </div>

          {/* Progress */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium">Step {currentStep} of {config.totalSteps}</span>
                <span className="text-sm text-muted-foreground">
                  {Math.round((currentStep / config.totalSteps) * 100)}% Complete
                </span>
              </div>
              <Progress value={(currentStep / config.totalSteps) * 100} />
            </CardContent>
          </Card>

          {/* Form Content */}
          <Card>
            <CardHeader>
              <CardTitle>
                {currentStep === 1 && 'Personal Information'}
                {currentStep === 2 && 'Required Documents'}
                {currentStep === 3 && 'Review & Submit'}
              </CardTitle>
              <CardDescription>
                {currentStep === 1 && 'Enter the required personal information'}
                {currentStep === 2 && 'Upload all required supporting documents'}
                {currentStep === 3 && 'Review your application before submission'}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {currentStep === 1 && (
                <div className="space-y-4">
                  <p className="text-center text-muted-foreground">
                    This service form is currently under development. 
                    Please use the Birth Registration form as a reference for the complete implementation.
                  </p>
                  {/* Placeholder for service-specific form fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Full Name</label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="Enter full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Date</label>
                      <input 
                        type="date" 
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-4">Required Documents</h3>
                    <ul className="space-y-2 mb-6">
                      {config.requiredDocuments.map((doc, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-success" />
                          {doc}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <FileUpload 
                    onFilesUploaded={handleFilesUploaded}
                    userId={user?.id || ''}
                    maxFiles={10}
                  />

                  {uploadedFiles.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Uploaded Files ({uploadedFiles.length})</h4>
                      <div className="space-y-2">
                        {uploadedFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                            <span className="text-sm">{file.name}</span>
                            <CheckCircle className="w-4 h-4 text-success" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Application Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div>Service Type: {config.title}</div>
                      <div>Uploaded Documents: {uploadedFiles.length} files</div>
                      <div>Status: Ready for submission</div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">What happens next?</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Your application will be reviewed by authorized personnel</li>
                      <li>• You'll receive notifications about status updates</li>
                      <li>• Processing typically takes 3-10 business days</li>
                      <li>• You can track progress in your dashboard</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                {currentStep < config.totalSteps ? (
                  <Button
                    onClick={() => setCurrentStep(Math.min(config.totalSteps, currentStep + 1))}
                    disabled={currentStep === 2 && uploadedFiles.length === 0}
                  >
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleSubmit({})}
                    disabled={isSubmitting || uploadedFiles.length === 0}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ServiceForm;
