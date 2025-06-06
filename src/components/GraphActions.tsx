
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Brain, Sparkles, MessageSquare, Search } from 'lucide-react';

interface GraphActionsProps {
  selectedNodes: string[];
  onAction: (action: string, query?: string) => void;
}

const GraphActions: React.FC<GraphActionsProps> = ({ selectedNodes, onAction }) => {
  const [customQuery, setCustomQuery] = useState('');

  const quickActions = [
    {
      key: 'summarize',
      label: 'Summarize Selection',
      icon: <Brain className="w-4 h-4" />,
      disabled: selectedNodes.length === 0
    },
    {
      key: 'connections',
      label: 'Find Connections',
      icon: <Sparkles className="w-4 h-4" />,
      disabled: selectedNodes.length < 2
    },
    {
      key: 'insights',
      label: 'Generate Insights',
      icon: <MessageSquare className="w-4 h-4" />,
      disabled: selectedNodes.length === 0
    }
  ];

  const handleCustomQuery = () => {
    if (customQuery.trim()) {
      onAction('custom', customQuery);
      setCustomQuery('');
    }
  };

  return (
    <div className="bg-slate-800 border border-slate-600 rounded-lg p-4 space-y-4">
      <div className="flex items-center gap-2">
        <Brain className="w-4 h-4 text-blue-400" />
        <h3 className="text-sm font-medium text-white">Graph Actions</h3>
      </div>

      {selectedNodes.length > 0 && (
        <div className="text-xs text-slate-400">
          {selectedNodes.length} node{selectedNodes.length !== 1 ? 's' : ''} selected
        </div>
      )}

      {/* Quick Actions */}
      <div className="space-y-2">
        {quickActions.map((action) => (
          <Button
            key={action.key}
            variant="ghost"
            size="sm"
            disabled={action.disabled}
            onClick={() => onAction(action.key)}
            className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-700 disabled:opacity-50"
          >
            {action.icon}
            <span className="ml-2">{action.label}</span>
          </Button>
        ))}
      </div>

      {/* Custom Query */}
      <div className="space-y-2">
        <div className="flex gap-2">
          <Input
            placeholder="Ask about your memories..."
            value={customQuery}
            onChange={(e) => setCustomQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleCustomQuery()}
            className="flex-1 bg-slate-700 border-slate-600 text-white placeholder-slate-400"
          />
          <Button
            onClick={handleCustomQuery}
            disabled={!customQuery.trim()}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Search className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GraphActions;
