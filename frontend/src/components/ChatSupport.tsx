import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, X, Send, Minimize2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const ChatSupport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{ text: string; sender: 'user' | 'agent'; time: string }>>([
    { text: 'Hello! How can I help you today?', sender: 'agent', time: new Date().toLocaleTimeString() }
  ]);
  const { toast } = useToast();

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      text: message,
      sender: 'user' as const,
      time: new Date().toLocaleTimeString()
    };

    setMessages([...messages, newMessage]);
    setMessage('');

    // Simulate agent response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: 'Thank you for your message. An agent will respond shortly.',
        sender: 'agent',
        time: new Date().toLocaleTimeString()
      }]);
    }, 1000);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg z-50"
        size="icon"
      >
        <MessageSquare className="w-6 h-6" />
      </Button>
    );
  }

  if (isMinimized) {
    return (
      <Button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-6 right-6 rounded-full shadow-lg z-50"
        variant="secondary"
      >
        <MessageSquare className="w-5 h-5 mr-2" />
        Live Chat
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-xl z-50 flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
        <CardTitle className="flex items-center gap-2 text-lg">
          <MessageSquare className="w-5 h-5" />
          Live Support
        </CardTitle>
        <div className="flex gap-2">
          <Button size="icon" variant="ghost" onClick={() => setIsMinimized(true)}>
            <Minimize2 className="w-4 h-4" />
          </Button>
          <Button size="icon" variant="ghost" onClick={() => setIsOpen(false)}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-4 space-y-4 overflow-hidden">
        <div className="flex-1 overflow-y-auto space-y-3">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  msg.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                <p className="text-xs opacity-70 mt-1">{msg.time}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <Button size="icon" onClick={sendMessage}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
