
import React from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Clock, Tag, Eye, BookOpen, Flag } from 'lucide-react';

interface NodeData {
  id: string;
  label: string;
  type: 'topic' | 'tool' | 'conversation' | 'bookmark';
  snippet?: string;
  timestamp?: string;
  tags?: string[];
  conversationCount?: number;
}

interface NodeHoverCardProps {
  nodeData: NodeData;
  children: React.ReactNode;
}

const NodeHoverCard: React.FC<NodeHoverCardProps> = ({ nodeData, children }) => {
  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'topic':
        return <div className="w-3 h-3 bg-blue-400 rounded-full" />;
      case 'tool':
        return <div className="w-3 h-3 bg-purple-400 rounded-full" />;
      case 'conversation':
        return <MessageSquare className="w-3 h-3 text-green-400" />;
      case 'bookmark':
        return <div className="w-3 h-3 bg-pink-400 rounded-full" />;
      default:
        return <div className="w-3 h-3 bg-gray-400 rounded-full" />;
    }
  };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        {children}
      </HoverCardTrigger>
      <HoverCardContent className="w-80 bg-slate-800 border-slate-600 text-white p-4">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-center gap-2">
            {getNodeIcon(nodeData.type)}
            <h3 className="font-semibold text-sm">{nodeData.label}</h3>
          </div>

          {/* Snippet */}
          {nodeData.snippet && (
            <div className="text-xs text-slate-300 bg-slate-700 p-2 rounded">
              "{nodeData.snippet}"
            </div>
          )}

          {/* Metadata */}
          <div className="space-y-1 text-xs text-slate-400">
            {nodeData.timestamp && (
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{nodeData.timestamp}</span>
              </div>
            )}
            
            {nodeData.conversationCount && (
              <div className="flex items-center gap-1">
                <MessageSquare className="w-3 h-3" />
                <span>{nodeData.conversationCount} conversations</span>
              </div>
            )}

            {nodeData.tags && nodeData.tags.length > 0 && (
              <div className="flex items-center gap-1 flex-wrap">
                <Tag className="w-3 h-3" />
                {nodeData.tags.map((tag, index) => (
                  <span key={index} className="bg-blue-600 px-1 py-0.5 rounded text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-1 pt-2 border-t border-slate-600">
            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs hover:bg-slate-700">
              <Eye className="w-3 h-3 mr-1" />
              View
            </Button>
            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs hover:bg-slate-700">
              <BookOpen className="w-3 h-3 mr-1" />
              Summarize
            </Button>
            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs hover:bg-slate-700">
              <Flag className="w-3 h-3 mr-1" />
              Flag
            </Button>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default NodeHoverCard;
