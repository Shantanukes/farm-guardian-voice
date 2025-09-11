import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, CheckCircle, Info, ExternalLink, ThumbsUp, ThumbsDown } from 'lucide-react';

interface DiagnosisData {
  disease: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high';
  description: string;
  symptoms: string[];
  treatment: {
    immediate: string[];
    preventive: string[];
    chemicals: { name: string; dosage: string; when: string }[];
  };
  affectedArea: number;
  timeToRecover: string;
}

interface DiagnosisResultProps {
  diagnosis: DiagnosisData;
  imageUrl?: string;
  onFeedback: (helpful: boolean) => void;
}

const DiagnosisResult: React.FC<DiagnosisResultProps> = ({ 
  diagnosis, 
  imageUrl, 
  onFeedback 
}) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'warning';
      default:
        return 'success';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high':
        return <AlertTriangle className="h-5 w-5" />;
      case 'medium':
        return <Info className="h-5 w-5" />;
      default:
        return <CheckCircle className="h-5 w-5" />;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-success';
    if (confidence >= 60) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-2">Disease Analysis Complete</h2>
        <p className="text-muted-foreground">AI-powered crop health assessment</p>
      </div>

      {imageUrl && (
        <Card className="p-4">
          <img
            src={imageUrl}
            alt="Analyzed crop"
            className="w-full h-48 object-cover rounded-lg"
          />
        </Card>
      )}

      <Card className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              {getSeverityIcon(diagnosis.severity)}
              <h3 className="text-2xl font-bold text-foreground">{diagnosis.disease}</h3>
            </div>
            <Badge variant={getSeverityColor(diagnosis.severity) as any} className="w-fit">
              {diagnosis.severity.toUpperCase()} SEVERITY
            </Badge>
          </div>
          
          <div className="text-right space-y-2">
            <div className="text-sm text-muted-foreground">Confidence Score</div>
            <div className={`text-2xl font-bold ${getConfidenceColor(diagnosis.confidence)}`}>
              {diagnosis.confidence}%
            </div>
            <Progress value={diagnosis.confidence} className="w-24" />
          </div>
        </div>

        <p className="text-muted-foreground mb-6">{diagnosis.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              🔍 Identified Symptoms
            </h4>
            <ul className="space-y-2">
              {diagnosis.symptoms.map((symptom, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-primary">•</span>
                  {symptom}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              📊 Impact Assessment
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Affected Area:</span>
                <span className="font-medium">{diagnosis.affectedArea}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Recovery Time:</span>
                <span className="font-medium">{diagnosis.timeToRecover}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-destructive/5 border-destructive/20">
        <h4 className="font-semibold mb-4 flex items-center gap-2 text-destructive">
          🚨 Immediate Action Required
        </h4>
        <ul className="space-y-2">
          {diagnosis.treatment.immediate.map((action, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <span className="text-destructive font-bold">→</span>
              {action}
            </li>
          ))}
        </ul>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h4 className="font-semibold mb-4 flex items-center gap-2">
            🛡️ Preventive Measures
          </h4>
          <ul className="space-y-2">
            {diagnosis.treatment.preventive.map((measure, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <span className="text-success">✓</span>
                {measure}
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-6">
          <h4 className="font-semibold mb-4 flex items-center gap-2">
            💊 Chemical Treatment
          </h4>
          <div className="space-y-3">
            {diagnosis.treatment.chemicals.map((chemical, index) => (
              <div key={index} className="p-3 bg-muted/50 rounded-lg">
                <div className="font-medium">{chemical.name}</div>
                <div className="text-sm text-muted-foreground">{chemical.dosage}</div>
                <div className="text-xs text-muted-foreground mt-1">Apply: {chemical.when}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6 bg-accent/10 border-accent/30">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-full bg-accent/20">
            💡
          </div>
          <div>
            <h4 className="font-semibold mb-2">Expert Recommendation</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Based on the analysis, we recommend immediate treatment to prevent spread. 
              Monitor your crop daily and consider consulting with a local agricultural expert.
            </p>
            <Button variant="outline" size="sm">
              <ExternalLink className="h-4 w-4" />
              Find Local Experts
            </Button>
          </div>
        </div>
      </Card>

      <Card className="p-6 text-center">
        <h4 className="font-semibold mb-3">Was this diagnosis helpful?</h4>
        <div className="flex justify-center gap-4">
          <Button 
            onClick={() => onFeedback(true)} 
            variant="success" 
            size="lg"
          >
            <ThumbsUp className="h-5 w-5" />
            Yes, Helpful
          </Button>
          <Button 
            onClick={() => onFeedback(false)} 
            variant="outline" 
            size="lg"
          >
            <ThumbsDown className="h-5 w-5" />
            Not Helpful
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default DiagnosisResult;