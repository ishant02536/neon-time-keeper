
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import WorldClock from './WorldClock';
import CalendarDisplay from './CalendarDisplay';
import CustomTimeSettings from './CustomTimeSettings';
import AlarmFeature from './AlarmFeature';

const DigitalClock = () => {
  const [time, setTime] = useState(new Date());
  const [customTime, setCustomTime] = useState<Date | null>(null);
  const [activeMode, setActiveMode] = useState<'main' | 'world' | 'calendar' | 'custom' | 'alarm'>('main');

  useEffect(() => {
    if (!customTime) {
      const timer = setInterval(() => {
        setTime(new Date());
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [customTime]);

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const displayTime = customTime || time;

  const renderActiveComponent = () => {
    switch (activeMode) {
      case 'world':
        return <WorldClock />;
      case 'calendar':
        return <CalendarDisplay />;
      case 'custom':
        return <CustomTimeSettings onTimeChange={setCustomTime} />;
      case 'alarm':
        return <AlarmFeature />;
      default:
        return (
          <div className="bg-black rounded-lg p-8 shadow-2xl border border-gray-700">
            <div className="text-6xl md:text-8xl font-mono text-green-400 tracking-widest digital-glow text-center">
              {formatTime(displayTime)}
            </div>
            <div className="text-center mt-4 text-gray-400 text-sm uppercase tracking-wider">
              {customTime ? 'Custom Time' : 'Digital Clock'}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
      {/* Header with Creator Credit */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse digital-glow-text">
          Made by Isha Tiwari
        </h1>
        <div className="mt-2 h-1 w-32 mx-auto bg-gradient-to-r from-green-400 to-blue-500 rounded-full"></div>
      </div>

      {/* Navigation */}
      <div className="mb-6 flex flex-wrap gap-2 justify-center">
        <Button
          onClick={() => setActiveMode('main')}
          variant={activeMode === 'main' ? 'default' : 'outline'}
          className={activeMode === 'main' ? 'bg-green-600' : 'border-green-400 text-green-400'}
        >
          Main Clock
        </Button>
        <Button
          onClick={() => setActiveMode('world')}
          variant={activeMode === 'world' ? 'default' : 'outline'}
          className={activeMode === 'world' ? 'bg-green-600' : 'border-green-400 text-green-400'}
        >
          World Clock
        </Button>
        <Button
          onClick={() => setActiveMode('calendar')}
          variant={activeMode === 'calendar' ? 'default' : 'outline'}
          className={activeMode === 'calendar' ? 'bg-green-600' : 'border-green-400 text-green-400'}
        >
          Calendar
        </Button>
        <Button
          onClick={() => setActiveMode('custom')}
          variant={activeMode === 'custom' ? 'default' : 'outline'}
          className={activeMode === 'custom' ? 'bg-green-600' : 'border-green-400 text-green-400'}
        >
          Custom Time
        </Button>
        <Button
          onClick={() => setActiveMode('alarm')}
          variant={activeMode === 'alarm' ? 'default' : 'outline'}
          className={activeMode === 'alarm' ? 'bg-green-600' : 'border-green-400 text-green-400'}
        >
          Alarms
        </Button>
      </div>

      {/* Active Component */}
      <div className="w-full max-w-4xl">
        {renderActiveComponent()}
      </div>

      {/* Footer */}
      <div className="mt-6 text-center text-gray-500 text-xs">
        Current Time: {formatTime(time)} {customTime && '(Real Time)'}
      </div>
    </div>
  );
};

export default DigitalClock;
