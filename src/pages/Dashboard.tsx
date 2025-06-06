
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
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Search, Upload, MessageSquare, Brain, Settings, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'default',
    position: { x: 400, y: 300 },
    data: { label: 'Knowledge graph' },
    style: { backgroundColor: '#1e293b', color: '#fff', border: '1px solid #475569' }
  },
  {
    id: '2',
    type: 'default',
    position: { x: 600, y: 200 },
    data: { label: 'AI Agent' },
    style: { backgroundColor: '#1e293b', color: '#fff', border: '1px solid #475569' }
  },
  {
    id: '3',
    type: 'default',
    position: { x: 200, y: 400 },
    data: { label: 'Recall' },
    style: { backgroundColor: '#1e293b', color: '#fff', border: '1px solid #475569' }
  },
  {
    id: '4',
    type: 'default',
    position: { x: 500, y: 500 },
    data: { label: 'Special report' },
    style: { backgroundColor: '#1e293b', color: '#fff', border: '1px solid #475569' }
  },
  {
    id: '5',
    type: 'default',
    position: { x: 800, y: 350 },
    data: { label: 'Telegram bot' },
    style: { backgroundColor: '#1e293b', color: '#fff', border: '1px solid #475569' }
  },
  {
    id: '6',
    type: 'default',
    position: { x: 700, y: 450 },
    data: { label: 'GPT for sites' },
    style: { backgroundColor: '#1e293b', color: '#fff', border: '1px solid #475569' }
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
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [searchQuery, setSearchQuery] = useState('');

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

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
              placeholder="Search"
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
            <h3 className="text-sm font-medium text-slate-400 mb-2">Productivity</h3>
            <div className="space-y-1 ml-2">
              <div className="text-sm text-slate-300 flex items-center gap-2">
                <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                AI Agent Chatbot + L...
              </div>
              <div className="text-sm text-slate-300">
                March 2025: Detailed Recall...
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
      <div className="flex-1 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
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
              1 / 10
            </div>
          </Panel>
        </ReactFlow>
      </div>
    </div>
  );
};

export default Dashboard;
