import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

export const VoiceCommands = () => {
  const [isListening, setIsListening] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast({
        title: "Not Supported",
        description: "Voice commands are not supported in your browser",
        variant: "destructive"
      });
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      toast({
        title: "Listening...",
        description: "Say a command like 'Go to dashboard' or 'Verify certificate'"
      });
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      handleVoiceCommand(transcript);
    };

    recognition.onerror = () => {
      setIsListening(false);
      toast({
        title: "Error",
        description: "Could not understand the command",
        variant: "destructive"
      });
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleVoiceCommand = (command: string) => {
    if (command.includes('dashboard')) {
      navigate('/dashboard');
      toast({ title: "Navigating to Dashboard" });
    } else if (command.includes('verify')) {
      navigate('/verify');
      toast({ title: "Navigating to Verification" });
    } else if (command.includes('profile')) {
      navigate('/profile');
      toast({ title: "Navigating to Profile" });
    } else if (command.includes('document')) {
      navigate('/documents');
      toast({ title: "Navigating to Documents" });
    } else if (command.includes('help')) {
      navigate('/help');
      toast({ title: "Navigating to Help" });
    } else {
      toast({
        title: "Command not recognized",
        description: "Try: 'Go to dashboard', 'Verify certificate', 'Open profile'",
        variant: "destructive"
      });
    }
  };

  return (
    <Button
      onClick={startListening}
      variant={isListening ? "destructive" : "outline"}
      size="icon"
      className="fixed bottom-6 left-6 rounded-full shadow-lg z-50"
      title="Voice Commands"
    >
      {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
    </Button>
  );
};
