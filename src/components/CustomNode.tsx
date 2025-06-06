
import React, { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { MessageSquare, Brain, Bot, Bookmark } from 'lucide-react';
import NodeHoverCard from './NodeHoverCard';

export interface CustomNodeData {
  label: string;
  type: 'topic' | 'tool' | 'conversation' | 'bookmark';
  snippet?: string;
  timestamp?: string;
  tags?: string[];
  conversationCount?: number;
}

const CustomNode: React.FC<NodeProps<CustomNodeData>> = ({ id, data }) => {
  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'topic':
        return <div className="w-2 h-2 bg-blue-400 rounded-full" />;
      case 'tool':
        return <Bot className="w-3 h-3 text-purple-400" />;
      case 'conversation':
        return <MessageSquare className="w-3 h-3 text-green-400" />;
      case 'bookmark':
        return <Bookmark className="w-3 h-3 text-pink-400" />;
      default:
        return <Brain className="w-3 h-3 text-blue-400" />;
    }
  };

  const getNodeStyles = (type: string) => {
    const baseStyles = "px-3 py-2 rounded-lg border text-xs font-medium transition-all duration-200 hover:scale-105 cursor-pointer";
    switch (type) {
      case 'topic':
        return `${baseStyles} bg-blue-900/50 border-blue-500/50 text-blue-200`;
      case 'tool':
        return `${baseStyles} bg-purple-900/50 border-purple-500/50 text-purple-200`;
      case 'conversation':
        return `${baseStyles} bg-green-900/50 border-green-500/50 text-green-200`;
      case 'bookmark':
        return `${baseStyles} bg-pink-900/50 border-pink-500/50 text-pink-200`;
      default:
        return `${baseStyles} bg-slate-700 border-slate-500 text-slate-200`;
    }
  };

  return (
    <NodeHoverCard 
      nodeData={{
        id,
        label: data.label,
        type: data.type,
        snippet: data.snippet,
        timestamp: data.timestamp,
        tags: data.tags,
        conversationCount: data.conversationCount
      }}
    >
      <div className={getNodeStyles(data.type)}>
        <Handle
          type="target"
          position={Position.Top}
          className="w-2 h-2 bg-slate-500 border-slate-400"
        />
        <div className="flex items-center gap-2">
          {getNodeIcon(data.type)}
          <span className="max-w-24 truncate">{data.label}</span>
        </div>
        <Handle
          type="source"
          position={Position.Bottom}
          className="w-2 h-2 bg-slate-500 border-slate-400"
        />
      </div>
    </NodeHoverCard>
  );
};

export default memo(CustomNode);
