import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface VoiceInputProps {
  onTranscription: (text: string) => void;
  isListening: boolean;
  onToggleListening: () => void;
}

const VoiceInput: React.FC<VoiceInputProps> = ({
  onTranscription,
  isListening,
  onToggleListening,
}) => {
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(true);
  const recognition = useRef<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setIsSupported(false);
      return;
    }

    const SpeechRecognitionClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    recognition.current = new SpeechRecognitionClass();
    
    recognition.current.continuous = true;
    recognition.current.interimResults = true;
    recognition.current.lang = 'en-US';

    recognition.current.onresult = (event) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      const fullTranscript = finalTranscript + interimTranscript;
      setTranscript(fullTranscript);
      onTranscription(fullTranscript);
    };

    recognition.current.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      toast({
        title: "Voice Input Error",
        description: "There was an issue with voice recognition. Please try again.",
        variant: "destructive",
      });
    };

    recognition.current.onend = () => {
      if (isListening) {
        recognition.current?.start();
      }
    };

    return () => {
      recognition.current?.stop();
    };
  }, [onTranscription, isListening, toast]);

  useEffect(() => {
    if (isListening && recognition.current) {
      recognition.current.start();
    } else if (!isListening && recognition.current) {
      recognition.current.stop();
    }
  }, [isListening]);

  const handleToggleListening = async () => {
    if (!isSupported) {
      toast({
        title: "Not Supported",
        description: "Speech recognition is not supported in this browser.",
        variant: "destructive",
      });
      return;
    }

    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      onToggleListening();
    } catch (error) {
      toast({
        title: "Microphone Access",
        description: "Please allow microphone access to use voice input.",
        variant: "destructive",
      });
    }
  };

  if (!isSupported) {
    return (
      <Card className="p-6 text-center">
        <Volume2 className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
        <p className="text-muted-foreground">
          Voice input is not supported in this browser. Please use a modern browser with speech recognition support.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Button
          onClick={handleToggleListening}
          variant={isListening ? "destructive" : "voice"}
          size="hero"
          className="animate-pulse-slow"
        >
          {isListening ? (
            <>
              <MicOff className="h-8 w-8" />
              Stop Listening
            </>
          ) : (
            <>
              <Mic className="h-8 w-8" />
              Start Voice Input
            </>
          )}
        </Button>
      </div>

      {transcript && (
        <Card className="p-6 bg-gradient-card">
          <h3 className="text-lg font-semibold mb-3 text-foreground">Live Transcription:</h3>
          <p className="text-muted-foreground leading-relaxed">{transcript}</p>
        </Card>
      )}

      <div className="text-center text-sm text-muted-foreground">
        <p>🎙️ Speak clearly in English. Ask about crop diseases, market prices, or farming advice.</p>
      </div>
    </div>
  );
};

export default VoiceInput;