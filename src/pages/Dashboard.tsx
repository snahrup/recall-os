
import React, { useState, useCallback } from 'react';
import {
  ReactFlow,
  Node,
  Edge,
  addEdge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Connection,
  Panel,
  NodeTypes,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Search, Upload, MessageSquare, Brain, Settings, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import CustomNode, { CustomNodeData } from '@/components/CustomNode';
import TimeFilter from '@/components/TimeFilter';
import GraphActions from '@/components/GraphActions';

const nodeTypes: NodeTypes = {
  custom: CustomNode,
};

const initialNodes: Node<CustomNodeData>[] = [
  {
    id: '1',
    type: 'custom',
    position: { x: 400, y: 300 },
    data: { 
      label: 'Knowledge graph', 
      type: 'topic',
      snippet: 'Building a personal memory engine with graph visualization...',
      timestamp: 'March 15, 2025',
      tags: ['memory', 'graph', 'ai'],
      conversationCount: 8
    }
  },
  {
    id: '2',
    type: 'custom',
    position: { x: 600, y: 200 },
    data: { 
      label: 'AI Agent', 
      type: 'tool',
      snippet: 'Discussed creating autonomous agents for memory retrieval...',
      timestamp: 'March 12, 2025',
      tags: ['ai', 'automation'],
      conversationCount: 3
    }
  },
  {
    id: '3',
    type: 'custom',
    position: { x: 200, y: 400 },
    data: { 
      label: 'Recall', 
      type: 'conversation',
      snippet: 'Long conversation about building Recall OS features...',
      timestamp: 'March 10, 2025',
      tags: ['recall', 'features'],
      conversationCount: 15
    }
  },
  {
    id: '4',
    type: 'custom',
    position: { x: 500, y: 500 },
    data: { 
      label: 'Special report', 
      type: 'bookmark',
      snippet: 'Bookmarked insights about vector databases comparison...',
      timestamp: 'March 8, 2025',
      tags: ['research', 'vectors'],
      conversationCount: 1
    }
  },
  {
    id: '5',
    type: 'custom',
    position: { x: 800, y: 350 },
    data: { 
      label: 'Telegram bot', 
      type: 'tool',
      snippet: 'Building a bot for automated memory ingestion...',
      timestamp: 'March 5, 2025',
      tags: ['bot', 'automation'],
      conversationCount: 5
    }
  },
  {
    id: '6',
    type: 'custom',
    position: { x: 700, y: 450 },
    data: { 
      label: 'GPT for sites', 
      type: 'topic',
      snippet: 'Website integration strategies for AI assistants...',
      timestamp: 'March 3, 2025',
      tags: ['integration', 'web'],
      conversationCount: 2
    }
  }
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', style: { stroke: '#64748b' } },
  { id: 'e1-3', source: '1', target: '3', style: { stroke: '#64748b' } },
  { id: 'e1-4', source: '1', target: '4', style: { stroke: '#64748b' } },
  { id: 'e2-5', source: '2', target: '5', style: { stroke: '#64748b' } },
  { id: 'e2-6', source: '2', target: '6', style: { stroke: '#64748b' } }
];

const Dashboard = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<CustomNodeData>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleTimeRangeChange = (range: string) => {
    console.log('Time range changed to:', range);
    // TODO: Filter nodes based on time range
  };

  const handleGraphAction = (action: string, query?: string) => {
    console.log('Graph action:', action, query);
    // TODO: Implement LLM-powered actions
  };

  const onSelectionChange = useCallback((params: any) => {
    const selectedNodeIds = params.nodes.map((node: Node) => node.id);
    setSelectedNodes(selectedNodeIds);
  }, []);

  return (
    <div className="h-screen bg-slate-900 flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col">
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-6 h-6 text-blue-400" />
            <h1 className="text-lg font-semibold text-white">Recall OS</h1>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <Input
              placeholder="Search memories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-700 border-slate-600 text-white placeholder-slate-400"
            />
          </div>
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-700">
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
            <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-700">
              <Brain className="w-4 h-4 mr-2" />
              Graph
            </Button>
            <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-700">
              <MessageSquare className="w-4 h-4 mr-2" />
              Review
            </Button>
            <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-700">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>

          <div className="mt-8">
            <h3 className="text-sm font-medium text-slate-400 mb-2">Recent Activity</h3>
            <div className="space-y-1 ml-2">
              <div className="text-sm text-slate-300 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                AI Agent Conversations
              </div>
              <div className="text-sm text-slate-300 flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                Memory Graph Updates
              </div>
              <div className="text-sm text-slate-300 flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                New Tool Integrations
              </div>
            </div>
          </div>
        </nav>

        <div className="p-4 border-t border-slate-700">
          <Button className="w-full bg-blue-600 hover:bg-blue-700">
            <Upload className="w-4 h-4 mr-2" />
            Import Conversations
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Controls Panel */}
        <div className="p-4 bg-slate-800 border-b border-slate-700">
          <TimeFilter onTimeRangeChange={handleTimeRangeChange} />
        </div>

        {/* Graph and Actions */}
        <div className="flex-1 flex">
          {/* React Flow */}
          <div className="flex-1 relative">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onSelectionChange={onSelectionChange}
              nodeTypes={nodeTypes}
              className="bg-slate-900"
              fitView
            >
              <Background color="#475569" />
              <Controls className="bg-slate-800 border-slate-600" />
              <MiniMap 
                nodeColor="#1e293b"
                className="bg-slate-800 border border-slate-600"
              />
              <Panel position="top-right" className="bg-slate-800 border border-slate-600 rounded p-2">
                <div className="text-white text-sm">
                  {nodes.length} memories
                </div>
              </Panel>
            </ReactFlow>
          </div>

          {/* Actions Panel */}
          <div className="w-80 p-4 bg-slate-900">
            <GraphActions 
              selectedNodes={selectedNodes}
              onAction={handleGraphAction}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
