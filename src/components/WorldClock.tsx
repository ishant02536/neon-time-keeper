
import React, { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';

interface TimeZone {
  name: string;
  timezone: string;
  label: string;
}

const timeZones: TimeZone[] = [
  { name: 'Local', timezone: Intl.DateTimeFormat().resolvedOptions().timeZone, label: 'Local Time' },
  { name: 'UTC', timezone: 'UTC', label: 'UTC' },
  { name: 'New York', timezone: 'America/New_York', label: 'New York' },
  { name: 'London', timezone: 'Europe/London', label: 'London' },
  { name: 'Tokyo', timezone: 'Asia/Tokyo', label: 'Tokyo' },
  { name: 'Sydney', timezone: 'Australia/Sydney', label: 'Sydney' },
];

const WorldClock = () => {
  const [times, setTimes] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const updateTimes = () => {
      const newTimes: { [key: string]: string } = {};
      const now = new Date();
      
      timeZones.forEach(tz => {
        try {
          const timeString = now.toLocaleTimeString('en-US', {
            timeZone: tz.timezone,
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          });
          const dateString = now.toLocaleDateString('en-US', {
            timeZone: tz.timezone,
            month: 'short',
            day: 'numeric'
          });
          newTimes[tz.name] = `${timeString} - ${dateString}`;
        } catch (error) {
          newTimes[tz.name] = 'Invalid timezone';
        }
      });
      
      setTimes(newTimes);
    };

    updateTimes();
    const timer = setInterval(updateTimes, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-black/80 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center gap-2 mb-4">
        <Globe className="text-green-400" size={20} />
        <h3 className="text-lg font-semibold text-green-400">World Clock</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {timeZones.map(tz => (
          <div key={tz.name} className="flex justify-between items-center text-sm">
            <span className="text-gray-300">{tz.label}:</span>
            <span className="text-green-400 font-mono">{times[tz.name]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorldClock;
