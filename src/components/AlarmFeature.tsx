
import React, { useState, useEffect } from 'react';
import { Clock, Plus, Trash2, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Alarm {
  id: string;
  time: string;
  label: string;
  isActive: boolean;
  hasTriggered: boolean;
}

const AlarmFeature = () => {
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [newAlarmTime, setNewAlarmTime] = useState('');
  const [newAlarmLabel, setNewAlarmLabel] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const currentTimeString = currentTime.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    });

    alarms.forEach(alarm => {
      if (alarm.isActive && !alarm.hasTriggered && alarm.time === currentTimeString) {
        // Trigger alarm
        setAlarms(prev => prev.map(a => 
          a.id === alarm.id ? { ...a, hasTriggered: true } : a
        ));
        
        // Play alarm sound (browser notification)
        if (Notification.permission === 'granted') {
          new Notification(`Alarm: ${alarm.label}`, {
            body: `Time: ${alarm.time}`,
            icon: '/favicon.ico'
          });
        }
        
        // Visual/audio feedback
        alert(`🔔 Alarm: ${alarm.label}\nTime: ${alarm.time}`);
      }
    });
  }, [currentTime, alarms]);

  const addAlarm = () => {
    if (newAlarmTime && newAlarmLabel) {
      const newAlarm: Alarm = {
        id: Date.now().toString(),
        time: newAlarmTime,
        label: newAlarmLabel,
        isActive: true,
        hasTriggered: false
      };
      setAlarms([...alarms, newAlarm]);
      setNewAlarmTime('');
      setNewAlarmLabel('');
    }
  };

  const deleteAlarm = (id: string) => {
    setAlarms(alarms.filter(alarm => alarm.id !== id));
  };

  const toggleAlarm = (id: string) => {
    setAlarms(alarms.map(alarm =>
      alarm.id === id 
        ? { ...alarm, isActive: !alarm.isActive, hasTriggered: false }
        : alarm
    ));
  };

  // Request notification permission on component mount
  useEffect(() => {
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div className="bg-black/80 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="text-green-400" size={20} />
        <h3 className="text-lg font-semibold text-green-400">Alarms</h3>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <Input
            type="time"
            value={newAlarmTime}
            onChange={(e) => setNewAlarmTime(e.target.value)}
            className="bg-gray-800 border-gray-600 text-green-400"
          />
          <Input
            type="text"
            placeholder="Alarm label"
            value={newAlarmLabel}
            onChange={(e) => setNewAlarmLabel(e.target.value)}
            className="bg-gray-800 border-gray-600 text-green-400"
          />
          <Button onClick={addAlarm} className="bg-green-600 hover:bg-green-700">
            <Plus size={16} className="mr-2" />
            Add
          </Button>
        </div>

        <div className="space-y-2">
          {alarms.map(alarm => (
            <div key={alarm.id} className="flex items-center justify-between p-3 bg-gray-800 rounded border border-gray-600">
              <div className="flex items-center gap-3">
                <Bell 
                  className={`${alarm.isActive ? 'text-green-400' : 'text-gray-500'} ${alarm.hasTriggered ? 'animate-pulse' : ''}`} 
                  size={16} 
                />
                <div>
                  <div className={`font-mono ${alarm.isActive ? 'text-green-400' : 'text-gray-500'}`}>
                    {alarm.time}
                  </div>
                  <div className="text-xs text-gray-400">{alarm.label}</div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => toggleAlarm(alarm.id)}
                  className={`${alarm.isActive ? 'border-green-400 text-green-400' : 'border-gray-500 text-gray-500'}`}
                >
                  {alarm.isActive ? 'ON' : 'OFF'}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => deleteAlarm(alarm.id)}
                  className="border-red-400 text-red-400 hover:bg-red-400 hover:text-black"
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
          ))}
          
          {alarms.length === 0 && (
            <div className="text-center text-gray-500 py-4">
              No alarms set
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlarmFeature;
