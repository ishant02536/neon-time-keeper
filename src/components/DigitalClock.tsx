
import React, { useState, useEffect } from 'react';

const DigitalClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-black rounded-lg p-8 shadow-2xl border border-gray-700">
        <div className="text-6xl md:text-8xl font-mono text-green-400 tracking-widest digital-glow">
          {formatTime(time)}
        </div>
        <div className="text-center mt-4 text-gray-400 text-sm uppercase tracking-wider">
          Digital Clock
        </div>
      </div>
    </div>
  );
};

export default DigitalClock;
