import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ImageUpload from '@/components/ImageUpload';
import DiagnosisResult from '@/components/DiagnosisResult';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

// Mock diagnosis data
const mockDiagnosis = {
  disease: "Early Blight",
  confidence: 87,
  severity: 'medium' as const,
  description: "Early blight is a common fungal disease that affects tomato and potato plants. It typically appears as dark, circular spots with concentric rings on older leaves.",
  symptoms: [
    "Dark brown to black circular spots on leaves",
    "Concentric rings (target-like pattern) in spots",
    "Yellow halo around spots",
    "Leaves turning yellow and dropping",
    "Stem lesions near soil line"
  ],
  treatment: {
    immediate: [
      "Remove and destroy affected leaves immediately",
      "Improve air circulation around plants",
      "Apply copper-based fungicide spray",
      "Avoid overhead watering"
    ],
    preventive: [
      "Plant resistant varieties when available",
      "Rotate crops annually",
      "Mulch around plants to reduce soil splash",
      "Water at soil level, not on leaves",
      "Maintain proper plant spacing"
    ],
    chemicals: [
      {
        name: "Copper Sulfate",
        dosage: "2-3 grams per liter of water",
        when: "Early morning or evening, every 7-10 days"
      },
      {
        name: "Mancozeb",
        dosage: "2.5 grams per liter of water",
        when: "Spray every 10-14 days during humid conditions"
      }
    ]
  },
  affectedArea: 25,
  timeToRecover: "2-3 weeks with proper treatment"
};

const CameraPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showDiagnosis, setShowDiagnosis] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async (file: File) => {
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    setShowDiagnosis(true);
    toast({
      title: "Analysis Complete",
      description: "Disease identified with 87% confidence",
      variant: "default",
    });
  };

  const handleFeedback = (helpful: boolean) => {
    toast({
      title: "Thank you!",
      description: helpful ? "Your feedback helps us improve" : "We'll work on improving our accuracy",
      variant: "default",
    });
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <Button 
            onClick={() => navigate('/')} 
            variant="ghost" 
            size="sm"
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Disease Detection</h1>
            <p className="text-muted-foreground">Upload or capture images of your crops for AI analysis</p>
          </div>
        </div>

        {!showDiagnosis ? (
          <div className="space-y-6">
            <Card className="p-6">
              <ImageUpload
                onImageSelect={handleImageSelect}
                onAnalyze={handleAnalyze}
              />
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">Photography Tips for Best Results</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium">✅ Do:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Take photos in natural daylight</li>
                    <li>• Focus on the affected leaf/area</li>
                    <li>• Keep the camera steady</li>
                    <li>• Fill the frame with the leaf</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">❌ Avoid:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Blurry or dark images</li>
                    <li>• Too much background</li>
                    <li>• Extreme close-ups</li>
                    <li>• Multiple diseases in one photo</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        ) : (
          <DiagnosisResult
            diagnosis={mockDiagnosis}
            imageUrl={imagePreview}
            onFeedback={handleFeedback}
          />
        )}

        {!showDiagnosis && (
          <div className="text-center mt-8">
            <div className="flex gap-4 justify-center">
              <Button 
                onClick={() => navigate('/voice')} 
                variant="voice" 
                size="lg"
              >
                🎙️ Switch to Voice
              </Button>
              <Button 
                onClick={() => navigate('/markets')} 
                variant="outline" 
                size="lg"
              >
                📊 View Market Prices
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CameraPage;