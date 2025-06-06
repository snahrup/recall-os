
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Filter } from 'lucide-react';

interface TimeFilterProps {
  onTimeRangeChange: (range: string) => void;
}

const TimeFilter: React.FC<TimeFilterProps> = ({ onTimeRangeChange }) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const timeRanges = [
    { key: 'all', label: 'All Time' },
    { key: 'week', label: 'This Week' },
    { key: 'month', label: 'This Month' },
    { key: 'quarter', label: 'This Quarter' },
    { key: 'year', label: 'This Year' }
  ];

  const handleFilterChange = (range: string) => {
    setActiveFilter(range);
    onTimeRangeChange(range);
  };

  return (
    <div className="flex items-center gap-2 mb-4">
      <Calendar className="w-4 h-4 text-slate-400" />
      <span className="text-sm text-slate-400">Time Range:</span>
      {timeRanges.map((range) => (
        <Button
          key={range.key}
          variant={activeFilter === range.key ? "default" : "ghost"}
          size="sm"
          onClick={() => handleFilterChange(range.key)}
          className={`h-7 px-2 text-xs ${
            activeFilter === range.key 
              ? 'bg-blue-600 text-white' 
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
