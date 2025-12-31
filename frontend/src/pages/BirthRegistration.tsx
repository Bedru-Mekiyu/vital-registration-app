import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import FileUpload from '@/components/FileUpload';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { z } from 'zod';

const birthFormSchema = z.object({
  childFullName: z.string().min(2, 'Name must be at least 2 characters'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  placeOfBirth: z.string().min(2, 'Place of birth is required'),
  motherFullName: z.string().min(2, 'Mother\'s name is required'),
  fatherFullName: z.string().min(2, 'Father\'s name is required'),
  gender: z.enum(['male', 'female', 'other']),
});

const BirthRegistrationForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ name: string; url: string; size: number }>>([]);
  const [formData, setFormData] = useState({
    childFullName: '',
    dateOfBirth: '',
    placeOfBirth: '',
    motherFullName: '',
    fatherFullName: '',
    gender: 'male',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const totalSteps = 3;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    }
  };

  const validateStep1 = () => {
    try {
      birthFormSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path[0]) newErrors[err.path[0] as string] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleNext = () => {
    if (currentStep === 1 && !validateStep1()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly",
        variant: "destructive",
      });
      return;
    }
    setCurrentStep(prev => Math.min(totalSteps, prev + 1));
  };

  const handleFilesUploaded = (files: Array<{ name: string; url: string; size: number }>) => {
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const handleSubmit = async () => {
    if (!user || uploadedFiles.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please upload required documents before submitting",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('events')
        .insert([{
          event_type: 'birth',
          applicant_id: user.id,
          status: 'pending',
          event_data: formData,
          file_attachments: uploadedFiles
        }]);

      if (error) throw error;

      toast({
        title: "Application Submitted Successfully! 🎉",
        description: "Your birth registration application has been submitted for review.",
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

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <main className="container mx-auto px-4 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Button variant="ghost" onClick={() => navigate('/services')} className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Services
            </Button>
            
            <h1 className="text-3xl font-bold mb-2">Birth Registration</h1>
            <p className="text-muted-foreground">Register a new birth and obtain official birth certificate</p>
          </div>

          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium">Step {currentStep} of {totalSteps}</span>
                <span className="text-sm text-muted-foreground">
                  {Math.round((currentStep / totalSteps) * 100)}% Complete
                </span>
              </div>
              <Progress value={(currentStep / totalSteps) * 100} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                {currentStep === 1 && 'Child & Parent Information'}
                {currentStep === 2 && 'Upload Documents'}
                {currentStep === 3 && 'Review & Submit'}
              </CardTitle>
              <CardDescription>
                {currentStep === 1 && 'Enter all required information about the child and parents'}
                {currentStep === 2 && 'Upload hospital birth record and identification documents'}
                {currentStep === 3 && 'Review your application before final submission'}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {currentStep === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="childFullName">Child's Full Name *</Label>
                    <Input
                      id="childFullName"
                      name="childFullName"
                      value={formData.childFullName}
                      onChange={handleInputChange}
                      placeholder="Enter child's full name"
                    />
                    {errors.childFullName && <p className="text-xs text-destructive">{errors.childFullName}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                    <Input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                    />
                    {errors.dateOfBirth && <p className="text-xs text-destructive">{errors.dateOfBirth}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender *</Label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-md"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="placeOfBirth">Place of Birth *</Label>
                    <Input
                      id="placeOfBirth"
                      name="placeOfBirth"
                      value={formData.placeOfBirth}
                      onChange={handleInputChange}
                      placeholder="Hospital/City"
                    />
                    {errors.placeOfBirth && <p className="text-xs text-destructive">{errors.placeOfBirth}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="motherFullName">Mother's Full Name *</Label>
                    <Input
                      id="motherFullName"
                      name="motherFullName"
                      value={formData.motherFullName}
                      onChange={handleInputChange}
                      placeholder="Enter mother's full name"
                    />
                    {errors.motherFullName && <p className="text-xs text-destructive">{errors.motherFullName}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fatherFullName">Father's Full Name *</Label>
                    <Input
                      id="fatherFullName"
                      name="fatherFullName"
                      value={formData.fatherFullName}
                      onChange={handleInputChange}
                      placeholder="Enter father's full name"
                    />
                    {errors.fatherFullName && <p className="text-xs text-destructive">{errors.fatherFullName}</p>}
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <FileUpload 
                    onFilesUploaded={handleFilesUploaded}
                    userId={user?.id || ''}
                    maxFiles={10}
                  />
                  
                  {uploadedFiles.length > 0 && (
                    <div className="bg-muted p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Uploaded: {uploadedFiles.length} file(s)</h4>
                    </div>
                  )}
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="bg-muted p-6 rounded-lg space-y-3">
                    <h3 className="font-semibold text-lg mb-4">Application Summary</h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div><strong>Child's Name:</strong></div>
                      <div>{formData.childFullName}</div>
                      <div><strong>Date of Birth:</strong></div>
                      <div>{formData.dateOfBirth}</div>
                      <div><strong>Place of Birth:</strong></div>
                      <div>{formData.placeOfBirth}</div>
                      <div><strong>Mother's Name:</strong></div>
                      <div>{formData.motherFullName}</div>
                      <div><strong>Father's Name:</strong></div>
                      <div>{formData.fatherFullName}</div>
                      <div><strong>Documents:</strong></div>
                      <div>{uploadedFiles.length} file(s) uploaded</div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1 || isSubmitting}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                {currentStep < totalSteps ? (
                  <Button onClick={handleNext}>
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
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

export default BirthRegistrationForm;
