import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import VoiceInput from '@/components/VoiceInput';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const VoicePage: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [response, setResponse] = useState('');
  const navigate = useNavigate();

  const handleTranscription = (text: string) => {
    setTranscription(text);
    // Here you would typically send the transcription to your AI service
    // For now, we'll simulate a response
    if (text.toLowerCase().includes('disease')) {
      setResponse('I can help you identify crop diseases! Please describe the symptoms you\'re seeing or upload a photo of the affected crop.');
    } else if (text.toLowerCase().includes('price')) {
      setResponse('I can show you current market prices! Which crop are you interested in selling?');
    } else if (text.length > 10) {
      setResponse('Thank you for your question! I\'m analyzing your query and will provide recommendations shortly.');
    }
  };

  const toggleListening = () => {
    setIsListening(!isListening);
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
            <h1 className="text-3xl font-bold text-foreground">Voice Assistant</h1>
            <p className="text-muted-foreground">Ask questions about your crops in natural language</p>
          </div>
        </div>

        <div className="grid gap-6">
          <Card className="p-6">
            <VoiceInput
              onTranscription={handleTranscription}
              isListening={isListening}
              onToggleListening={toggleListening}
            />
          </Card>

          {response && (
            <Card className="p-6 bg-accent/10 border-accent/30">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-accent/20">
                  <MessageCircle className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">AI Response</h3>
                  <p className="text-muted-foreground">{response}</p>
                </div>
              </div>
            </Card>
          )}

          <Card className="p-6">
            <h3 className="font-semibold mb-4">Quick Commands</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2">🌱 Crop Health</h4>
                <p className="text-sm text-muted-foreground">
                  "My wheat leaves have brown spots"
                </p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2">💰 Market Prices</h4>
                <p className="text-sm text-muted-foreground">
                  "What's the price of rice today?"
                </p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2">🌾 Farming Tips</h4>
                <p className="text-sm text-muted-foreground">
                  "When should I harvest my corn?"
                </p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2">🌧️ Weather Advice</h4>
                <p className="text-sm text-muted-foreground">
                  "Should I water my crops today?"
                </p>
              </div>
            </div>
          </Card>

          <div className="text-center">
            <div className="flex gap-4 justify-center">
              <Button 
                onClick={() => navigate('/camera')} 
                variant="camera" 
                size="lg"
              >
                📷 Switch to Camera
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
        </div>
      </div>
    </div>
  );
};

export default VoicePage;