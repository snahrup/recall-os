import React, { useState, useEffect } from 'react';
import { ReactFlow, Node, Edge, Background, Controls, type NodeChange, type EdgeChange } from '@xyflow/react';
import { CustomNodeData } from '@/components/CustomNode';
import CustomNode from '@/components/CustomNode';
import GraphActions from '@/components/GraphActions';
import TimeFilter from '@/components/TimeFilter';
import Layout from '@/components/Layout';
import { useChatHistory, useChatSessions } from '@/hooks/useChatHistory';
import { Button } from '@/components/ui/button';
import { RefreshCw, MessageSquare } from 'lucide-react';
import '@xyflow/react/dist/style.css';

const nodeTypes = {
  custom: CustomNode,
};

type CustomNodeType = Node<CustomNodeData>;

const Dashboard = () => {
  const { data: chatHistory, isLoading: chatLoading, refetch: refetchChat } = useChatHistory();
  const { data: chatSessions, isLoading: sessionsLoading } = useChatSessions();

  const [nodes, setNodes] = useState<CustomNodeType[]>([
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
        conversationCount: 5,
        imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400'
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
        conversationCount: 3,
        images: [
          'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400',
          'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400'
        ]
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
        conversationCount: 4,
        imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400'
      }
    }
  ]);

  const generateEdgesFromTags = (list: CustomNodeType[]): Edge[] => {
    const autoEdges: Edge[] = [];
    for (let i = 0; i < list.length; i++) {
      for (let j = i + 1; j < list.length; j++) {
        const tagsA = list[i].data.tags || [];
        const tagsB = list[j].data.tags || [];
        if (tagsA.some(tag => tagsB.includes(tag))) {
          autoEdges.push({
            id: `e-${list[i].id}-${list[j].id}`,
            source: list[i].id,
            target: list[j].id,
            type: 'smoothstep',
            style: { stroke: '#64748b' }
          });
        }
      }
    }
    return autoEdges;
  };

  const [edges, setEdges] = useState<Edge[]>(generateEdgesFromTags(nodes));

  useEffect(() => {
    setEdges(generateEdgesFromTags(nodes));
  }, [nodes]);

  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);
  const [timeFilter, setTimeFilter] = useState('all');

  const handleNodesChange = (changes: NodeChange[]) => {
    console.log('Nodes changed:', changes);
  };

  const handleEdgesChange = (changes: EdgeChange[]) => {
    console.log('Edges changed:', changes);
  };

  const handleNodeClick = (event: React.MouseEvent, node: Node) => {
    setSelectedNodes(prev => 
      prev.includes(node.id) 
        ? prev.filter(id => id !== node.id)
        : [...prev, node.id]
    );
  };

  const handleGraphAction = (action: string, query?: string) => {
    console.log('Graph action:', action, query);
    // Implement graph actions here
  };

  const generateNodesFromChatHistory = () => {
    if (!chatSessions || chatSessions.length === 0) return;

    const chatNodes: CustomNodeType[] = chatSessions.map((session, index) => ({
      id: `chat-${session.session_id}`,
      type: 'custom',
      position: { x: 600 + (index % 3) * 150, y: 50 + Math.floor(index / 3) * 100 },
      data: {
        label: session.title || `Chat ${session.session_id.slice(0, 8)}`,
        type: 'conversation' as const,
        snippet: `${session.message_count} messages`,
        timestamp: session.last_message_at,
        tags: ['Chat', 'History'],
        conversationCount: session.message_count
      }
    }));

    setNodes(prev => [...prev.filter(node => !node.id.startsWith('chat-')), ...chatNodes]);
  };

  return (
    <Layout>
      <div className="h-full relative">
        <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <TimeFilter value={timeFilter} onChange={setTimeFilter} />
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => refetchChat()}
                disabled={chatLoading}
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${chatLoading ? 'animate-spin' : ''}`} />
                Refresh Chat
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={generateNodesFromChatHistory}
                disabled={sessionsLoading || !chatSessions}
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Load Chat History ({chatSessions?.length || 0})
              </Button>
            </div>
          </div>
          <GraphActions 
            selectedNodes={selectedNodes}
            onAction={handleGraphAction}
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

        {chatLoading && (
          <div className="absolute bottom-4 left-4 bg-slate-800 border border-slate-600 rounded px-3 py-2 text-slate-300 text-sm">
            Loading chat history...
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
