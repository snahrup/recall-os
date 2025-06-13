
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

interface TimeFilterProps {
  value: string;
  onChange: (range: string) => void;
}

const TimeFilter: React.FC<TimeFilterProps> = ({ value, onChange }) => {
  const timeRanges = [
    { key: 'all', label: 'All Time' },
    { key: 'week', label: 'This Week' },
    { key: 'month', label: 'This Month' },
    { key: 'quarter', label: 'This Quarter' },
    { key: 'year', label: 'This Year' }
  ];

  const handleFilterChange = (range: string) => {
    onChange(range);
  };

  return (
    <div className="flex items-center gap-2">
      <Calendar className="w-4 h-4 text-slate-400" />
      <span className="text-sm text-slate-400">Time Range:</span>
      {timeRanges.map((range) => (
        <Button
          key={range.key}
          variant={value === range.key ? "default" : "ghost"}
          size="sm"
          onClick={() => handleFilterChange(range.key)}
          className={`h-7 px-2 text-xs ${
            value === range.key
              ? 'bg-gray-600 text-white'
              : 'text-slate-400 hover:text-white hover:bg-slate-700'
          }`}
        >
          {range.label}
        </Button>
      ))}
    </div>
  );
};

export default TimeFilter;
