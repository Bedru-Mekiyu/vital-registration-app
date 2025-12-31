import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Bell, Mail, MessageSquare, Smartphone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const NotificationPreferences = () => {
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    statusUpdates: true,
    reminderAlerts: true,
    marketingEmails: false,
    securityAlerts: true,
    systemUpdates: true
  });
  const { toast } = useToast();

  const handleToggle = (key: keyof typeof preferences) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const savePreferences = () => {
    toast({
      title: "Preferences Saved",
      description: "Your notification preferences have been updated"
    });
  };

  const notificationChannels = [
    {
      key: 'emailNotifications' as const,
      icon: Mail,
      label: 'Email Notifications',
      description: 'Receive updates via email'
    },
    {
      key: 'smsNotifications' as const,
      icon: MessageSquare,
      label: 'SMS Notifications',
      description: 'Receive text message alerts'
    },
    {
      key: 'pushNotifications' as const,
      icon: Smartphone,
      label: 'Push Notifications',
      description: 'Browser and mobile app notifications'
    }
  ];

  const notificationTypes = [
    {
      key: 'statusUpdates' as const,
      label: 'Application Status Updates',
      description: 'Get notified when your application status changes'
    },
    {
      key: 'reminderAlerts' as const,
      label: 'Reminder Alerts',
      description: 'Reminders for pending actions and deadlines'
    },
    {
      key: 'marketingEmails' as const,
      label: 'Marketing Communications',
      description: 'News, tips, and service updates'
    },
    {
      key: 'securityAlerts' as const,
      label: 'Security Alerts',
      description: 'Important security-related notifications'
    },
    {
      key: 'systemUpdates' as const,
      label: 'System Updates',
      description: 'Platform maintenance and new features'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Notification Preferences
        </CardTitle>
        <CardDescription>
          Customize how and when you receive notifications
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-medium">Notification Channels</h3>
          {notificationChannels.map((channel) => {
            const Icon = channel.icon;
            return (
              <div key={channel.key} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <Label htmlFor={channel.key} className="font-medium cursor-pointer">
                      {channel.label}
                    </Label>
                    <p className="text-sm text-muted-foreground">{channel.description}</p>
                  </div>
                </div>
                <Switch
                  id={channel.key}
                  checked={preferences[channel.key]}
                  onCheckedChange={() => handleToggle(channel.key)}
                />
              </div>
            );
          })}
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Notification Types</h3>
          {notificationTypes.map((type) => (
            <div key={type.key} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <Label htmlFor={type.key} className="font-medium cursor-pointer">
                  {type.label}
                </Label>
                <p className="text-sm text-muted-foreground">{type.description}</p>
              </div>
              <Switch
                id={type.key}
                checked={preferences[type.key]}
                onCheckedChange={() => handleToggle(type.key)}
              />
            </div>
          ))}
        </div>

        <Button onClick={savePreferences} className="w-full">
          Save Preferences
        </Button>
      </CardContent>
    </Card>
  );
};
