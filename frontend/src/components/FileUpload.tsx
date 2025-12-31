import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Upload, X, FileIcon, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface FileUploadProps {
  onFilesUploaded: (files: Array<{ name: string; url: string; size: number }>) => void;
  userId: string;
  maxFiles?: number;
}

const FileUpload = ({ onFilesUploaded, userId, maxFiles = 5 }: FileUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length + selectedFiles.length > maxFiles) {
      toast({
        title: "Too many files",
        description: `You can only upload up to ${maxFiles} files`,
        variant: "destructive",
      });
      return;
    }
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const uploadFiles = async () => {
    if (selectedFiles.length === 0) return;

    setUploading(true);
    const uploadedFiles: Array<{ name: string; url: string; size: number }> = [];

    try {
      for (const file of selectedFiles) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${userId}/${Date.now()}.${fileExt}`;

        const { error: uploadError, data } = await supabase.storage
          .from('documents')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('documents')
          .getPublicUrl(fileName);

        uploadedFiles.push({
          name: file.name,
          url: publicUrl,
          size: file.size,
        });
      }

      onFilesUploaded(uploadedFiles);
      setSelectedFiles([]);
      
      toast({
        title: "Files uploaded successfully",
        description: `${uploadedFiles.length} file(s) uploaded`,
      });
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card className="border-2 border-dashed p-8 text-center">
        <input
          type="file"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          id="file-upload"
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          disabled={uploading}
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-sm font-medium mb-1">Click to upload files</p>
          <p className="text-xs text-muted-foreground">
            PDF, JPG, PNG, DOC up to 10MB (Max {maxFiles} files)
          </p>
        </label>
      </Card>

      {selectedFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Selected Files ({selectedFiles.length})</h4>
          {selectedFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-muted rounded-lg"
            >
              <div className="flex items-center gap-2">
                <FileIcon className="w-4 h-4" />
                <span className="text-sm">{file.name}</span>
                <span className="text-xs text-muted-foreground">
                  ({(file.size / 1024).toFixed(1)} KB)
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFile(index)}
                disabled={uploading}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
          
          <Button
            onClick={uploadFiles}
            disabled={uploading}
            className="w-full"
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Upload {selectedFiles.length} File(s)
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
