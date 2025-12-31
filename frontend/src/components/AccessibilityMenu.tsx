import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Eye, Type, MousePointer, Accessibility } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export function AccessibilityMenu() {
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [largerCursor, setLargerCursor] = useState(false);

  const applySettings = () => {
    document.documentElement.style.fontSize = `${fontSize}%`;
    
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }

    if (reducedMotion) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }

    if (largerCursor) {
      document.body.style.cursor = 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\' viewBox=\'0 0 32 32\'%3E%3Cpath fill=\'black\' d=\'M0 0l32 12-12 8-4 12z\'/%3E%3C/svg%3E"), auto';
    } else {
      document.body.style.cursor = 'auto';
    }

    // Save preferences
    localStorage.setItem('accessibility', JSON.stringify({
      fontSize,
      highContrast,
      reducedMotion,
      largerCursor
    }));
  };

  // Load saved preferences on mount
  useState(() => {
    const saved = localStorage.getItem('accessibility');
    if (saved) {
      const prefs = JSON.parse(saved);
      setFontSize(prefs.fontSize || 100);
      setHighContrast(prefs.highContrast || false);
      setReducedMotion(prefs.reducedMotion || false);
      setLargerCursor(prefs.largerCursor || false);
    }
  });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="h-9 px-2">
          <Accessibility className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <Card className="border-0 shadow-none">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Accessibility className="h-5 w-5" />
              Accessibility Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Font Size */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Type className="h-4 w-4" />
                Font Size: {fontSize}%
              </Label>
              <Slider
                value={[fontSize]}
                onValueChange={(value) => setFontSize(value[0])}
                min={80}
                max={150}
                step={10}
                className="w-full"
              />
            </div>

            {/* High Contrast */}
            <div className="flex items-center justify-between">
              <Label htmlFor="high-contrast" className="flex items-center gap-2 cursor-pointer">
                <Eye className="h-4 w-4" />
                High Contrast
              </Label>
              <Switch
                id="high-contrast"
                checked={highContrast}
                onCheckedChange={setHighContrast}
              />
            </div>

            {/* Reduced Motion */}
            <div className="flex items-center justify-between">
              <Label htmlFor="reduced-motion" className="flex items-center gap-2 cursor-pointer">
                <MousePointer className="h-4 w-4" />
                Reduce Motion
              </Label>
              <Switch
                id="reduced-motion"
                checked={reducedMotion}
                onCheckedChange={setReducedMotion}
              />
            </div>

            {/* Larger Cursor */}
            <div className="flex items-center justify-between">
              <Label htmlFor="larger-cursor" className="flex items-center gap-2 cursor-pointer">
                <MousePointer className="h-4 w-4" />
                Larger Cursor
              </Label>
              <Switch
                id="larger-cursor"
                checked={largerCursor}
                onCheckedChange={setLargerCursor}
              />
            </div>

            <Button onClick={applySettings} className="w-full">
              Apply Settings
            </Button>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
}
