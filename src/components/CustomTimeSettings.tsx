
import React, { useState, useEffect } from 'react';
import { Settings, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface CustomTimeSettingsProps {
  onTimeChange: (customTime: Date | null) => void;
}

const CustomTimeSettings = ({ onTimeChange }: CustomTimeSettingsProps) => {
  const [customTime, setCustomTime] = useState('');
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [currentCustomTime, setCurrentCustomTime] = useState<Date | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isCustomMode && currentCustomTime) {
      timer = setInterval(() => {
        const newTime = new Date(currentCustomTime.getTime() + 1000);
        setCurrentCustomTime(newTime);
        onTimeChange(newTime);
      }, 1000);
    } else {
      onTimeChange(null);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isCustomMode, currentCustomTime, onTimeChange]);

  const handleSetCustomTime = () => {
    if (customTime) {
      const [hours, minutes, seconds] = customTime.split(':').map(Number);
      if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59 && seconds >= 0 && seconds <= 59) {
        const now = new Date();
        const customDateTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, seconds);
        setCurrentCustomTime(customDateTime);
        setIsCustomMode(true);
      }
    }
  };

  const handleToggleMode = () => {
    setIsCustomMode(!isCustomMode);
    if (isCustomMode) {
      setCurrentCustomTime(null);
    }
  };

  return (
    <div className="bg-black/80 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center gap-2 mb-4">
        <Settings className="text-green-400" size={20} />
        <h3 className="text-lg font-semibold text-green-400">Custom Time</h3>
      </div>
      <div className="space-y-4">
        <div className="flex gap-2">
          <Input
            type="time"
            step="1"
            value={customTime}
            onChange={(e) => setCustomTime(e.target.value)}
            className="bg-gray-800 border-gray-600 text-green-400"
            placeholder="HH:MM:SS"
          />
          <Button 
            onClick={handleSetCustomTime}
            className="bg-green-600 hover:bg-green-700"
          >
            Set
          </Button>
        </div>
        <Button
          onClick={handleToggleMode}
          variant="outline"
          className="w-full border-green-400 text-green-400 hover:bg-green-400 hover:text-black"
        >
          {isCustomMode ? (
            <>
              <Pause size={16} className="mr-2" />
              Stop Custom Time
            </>
          ) : (
            <>
              <Play size={16} className="mr-2" />
              Use Real Time
            </>
          )}
        </Button>
        {isCustomMode && currentCustomTime && (
          <div className="text-center text-green-400 font-mono text-sm">
            Custom: {currentCustomTime.toLocaleTimeString()}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomTimeSettings;
