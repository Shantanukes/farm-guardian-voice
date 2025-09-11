import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Camera, Upload, X, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  onAnalyze: (file: File) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect, onAnalyze }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid File",
        description: "Please select an image file.",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast({
        title: "File Too Large",
        description: "Please select an image smaller than 10MB.",
        variant: "destructive",
      });
      return;
    }

    setSelectedImage(file);
    onImageSelect(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleCameraCapture = () => {
    if (fileInputRef.current) {
      fileInputRef.current.setAttribute('capture', 'environment');
      fileInputRef.current.click();
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.removeAttribute('capture');
      fileInputRef.current.click();
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    try {
      await onAnalyze(selectedImage);
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze the image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="hidden"
      />

      {!selectedImage ? (
        <Card
          className="border-2 border-dashed border-border hover:border-primary/50 transition-colors cursor-pointer"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={handleUploadClick}
        >
          <div className="p-12 text-center space-y-6">
            <div className="flex justify-center space-x-4">
              <div className="p-4 rounded-full bg-primary/10">
                <Upload className="h-8 w-8 text-primary" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Upload Crop Image</h3>
              <p className="text-muted-foreground mb-4">
                Drag and drop an image of your crop leaf, or click to browse
              </p>
              <p className="text-sm text-muted-foreground">
                Supports JPG, PNG, WebP (max 10MB)
              </p>
            </div>
          </div>
        </Card>
      ) : (
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Selected Image</h3>
              <Button onClick={clearImage} variant="ghost" size="sm">
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {previewUrl && (
              <div className="relative">
                <img
                  src={previewUrl}
                  alt="Selected crop"
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            )}

            <div className="flex gap-3">
              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                variant="camera"
                size="lg"
                className="flex-1"
              >
                {isAnalyzing ? (
                  <>
                    <AlertCircle className="h-5 w-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    🔍 Analyze for Diseases
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button
          onClick={handleCameraCapture}
          variant="camera"
          size="xl"
          className="w-full"
        >
          <Camera className="h-6 w-6" />
          Take Photo
        </Button>
        
        <Button
          onClick={handleUploadClick}
          variant="outline"
          size="xl"
          className="w-full"
        >
          <Upload className="h-6 w-6" />
          Upload Image
        </Button>
      </div>

      <div className="text-center text-sm text-muted-foreground">
        <p>📸 For best results, capture a clear image of the affected leaf in good lighting</p>
      </div>
    </div>
  );
};

export default ImageUpload;