
import React, { useState } from 'react';
import { ReactFlow, Node, Edge, Background, Controls } from '@xyflow/react';
import { CustomNodeData } from '@/components/CustomNode';
import CustomNode from '@/components/CustomNode';
import NodeHoverCard from '@/components/NodeHoverCard';
import GraphActions from '@/components/GraphActions';
import TimeFilter from '@/components/TimeFilter';
import Layout from '@/components/Layout';
import '@xyflow/react/dist/style.css';

const nodeTypes = {
  custom: CustomNode,
};

type CustomNode = Node<CustomNodeData>;

const Dashboard = () => {
  const [nodes, setNodes] = useState<CustomNode[]>([
    {
      id: '1',
      type: 'custom',
      position: { x: 250, y: 25 },
      data: {
        label: 'Vector Databases',
        type: 'topic',
        snippet: 'Exploration of vector database technologies for AI applications',
        timestamp: '2024-01-15',
        tags: ['AI', 'Database', 'Vector'],
        conversationCount: 5
      }
    },
    {
      id: '2',
      type: 'custom',
      position: { x: 100, y: 125 },
      data: {
        label: 'Pinecone',
        type: 'tool',
        snippet: 'Vector database service with real-time updates',
        timestamp: '2024-01-16',
        tags: ['Vector', 'Cloud'],
        conversationCount: 3
      }
    },
    {
      id: '3',
      type: 'custom',
      position: { x: 400, y: 125 },
      data: {
        label: 'Embedding Models',
        type: 'conversation',
        snippet: 'Discussion about text-embedding-3-small vs other models',
        timestamp: '2024-01-17',
        tags: ['Embeddings', 'OpenAI'],
        conversationCount: 2
      }
    },
    {
      id: '4',
      type: 'custom',
      position: { x: 250, y: 225 },
      data: {
        label: 'RAG Architecture',
        type: 'bookmark',
        snippet: 'Retrieval Augmented Generation implementation patterns',
        timestamp: '2024-01-18',
        tags: ['RAG', 'Architecture'],
        conversationCount: 4
      }
    }
  ]);

  const [edges, setEdges] = useState<Edge[]>([
    {
      id: 'e1-2',
      source: '1',
      target: '2',
      type: 'smoothstep',
      style: { stroke: '#64748b' }
    },
    {
      id: 'e1-3',
      source: '1',
      target: '3',
      type: 'smoothstep',
      style: { stroke: '#64748b' }
    },
    {
      id: 'e1-4',
      source: '1',
      target: '4',
      type: 'smoothstep',
      style: { stroke: '#64748b' }
    }
  ]);

  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);
  const [timeFilter, setTimeFilter] = useState('all');

  const handleNodesChange = (changes: any) => {
    console.log('Nodes changed:', changes);
  };

  const handleEdgesChange = (changes: any) => {
    console.log('Edges changed:', changes);
  };

  const handleNodeClick = (event: React.MouseEvent, node: CustomNode) => {
    setSelectedNodes(prev => 
      prev.includes(node.id) 
        ? prev.filter(id => id !== node.id)
        : [...prev, node.id]
    );
  };

  return (
    <Layout>
      <div className="h-full relative">
        <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-center">
          <TimeFilter value={timeFilter} onChange={setTimeFilter} />
          <GraphActions 
            selectedNodes={selectedNodes}
            onClearSelection={() => setSelectedNodes([])}
          />
        </div>

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={handleNodesChange}
          onEdgesChange={handleEdgesChange}
          onNodeClick={handleNodeClick}
          nodeTypes={nodeTypes}
          className="bg-slate-900"
          fitView
        >
          <Background color="#374151" />
          <Controls className="bg-slate-800 border-slate-600" />
        </ReactFlow>
      </div>
    </Layout>
  );
};

export default Dashboard;
