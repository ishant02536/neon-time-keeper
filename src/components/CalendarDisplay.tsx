
import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';

const CalendarDisplay = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return {
      dayName: date.toLocaleDateString('en-US', { weekday: 'long' }),
      month: date.toLocaleDateString('en-US', { month: 'long' }),
      day: date.getDate(),
      year: date.getFullYear(),
    };
  };

  const { dayName, month, day, year } = formatDate(currentDate);

  return (
    <div className="bg-black/80 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center gap-2 mb-4">
        <CalendarIcon className="text-green-400" size={20} />
        <h3 className="text-lg font-semibold text-green-400">Calendar</h3>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-green-400 mb-1">{dayName}</div>
        <div className="text-lg text-gray-300">{month} {day}, {year}</div>
        <div className="text-4xl font-bold text-green-400 mt-2 digital-glow">{day}</div>
      </div>
    </div>
  );
};

export default CalendarDisplay;
