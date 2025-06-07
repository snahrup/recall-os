
import React, { useState } from 'react';
import { Calendar, Filter, Tag, Edit, Pin, RotateCcw, Trash2, MessageSquare, FileText, Mail, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/Layout';

const Review = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [selectedTag, setSelectedTag] = useState('all');
  const [sourceType, setSourceType] = useState('all');

  const memoryCards = [
    {
      id: 1,
      timestamp: '2025-03-15 14:30',
      source: 'GPT Chat',
      sourceIcon: MessageSquare,
      title: 'Knowledge Graph Architecture',
      content: 'Discussed implementing a personal memory engine using React Flow for visualization. Key points: node types (topics, tools, conversations), time-based filtering, and LLM-powered graph actions...',
      tags: ['memory', 'graph', 'ai', 'react-flow'],
      connections: ['AI Agent', 'Vector DB'],
      expanded: false
    },
    {
      id: 2,
      timestamp: '2025-03-12 09:15',
      source: 'Sticky Note',
      sourceIcon: Bookmark,
      title: 'Vector Database Comparison',
      content: 'pgvector vs Weaviate vs Pinecone analysis. pgvector wins for simplicity with Supabase integration. Weaviate good for complex schemas. Pinecone best for scale but expensive...',
      tags: ['vectors', 'database', 'comparison'],
      connections: ['Knowledge Graph', 'Supabase'],
      expanded: false
    },
    {
      id: 3,
      timestamp: '2025-03-10 16:45',
      source: 'Email',
      sourceIcon: Mail,
      title: 'Recall OS Feature Discussion',
      content: 'Long conversation about building Recall OS features. Memory snapshots, auto-clustering, semantic search, and integration with various data sources...',
      tags: ['recall', 'features', 'planning'],
      connections: ['Memory Engine', 'AI Tools'],
      expanded: false
    },
    {
      id: 4,
      timestamp: '2025-03-08 11:20',
      source: 'Document',
      sourceIcon: FileText,
      title: 'Telegram Bot Integration',
      content: 'Building a bot for automated memory ingestion. Webhook setup, message parsing, automatic tagging, and connection to the main memory graph...',
      tags: ['bot', 'automation', 'telegram'],
      connections: ['Memory Import', 'Workflow'],
      expanded: false
    }
  ];

  const trendingTags = [
    { name: 'memory', count: 23, trend: 'up' },
    { name: 'ai', count: 18, trend: 'up' },
    { name: 'graph', count: 15, trend: 'stable' },
    { name: 'vectors', count: 12, trend: 'up' },
    { name: 'automation', count: 8, trend: 'down' }
  ];

  const reviewSuggestions = [
    'Merge 2 similar nodes: "GPT for sites" and "GPT agents"?',
    'Memory with low clarity flagged: "Vector embeddings" needs review',
    'Highly connected topic "AI Tools" might need subcategorization'
  ];

  const toggleExpand = (id: number) => {
    // Implementation for expanding/collapsing memory cards
    console.log('Toggle expand for memory:', id);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-slate-900 text-white p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Memory Review</h1>
        <p className="text-slate-400">Linear reflection layer of your memory timeline</p>
      </div>

      {/* Filter Bar */}
      <Card className="bg-slate-800 border-slate-700 mb-6">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-400" />
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32 bg-slate-700 border-slate-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-slate-400" />
              <Select value={selectedTag} onValueChange={setSelectedTag}>
                <SelectTrigger className="w-40 bg-slate-700 border-slate-600">
                  <SelectValue placeholder="Filter by tag" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  <SelectItem value="all">All Tags</SelectItem>
                  <SelectItem value="memory">Memory</SelectItem>
                  <SelectItem value="ai">AI</SelectItem>
                  <SelectItem value="vectors">Vectors</SelectItem>
                  <SelectItem value="automation">Automation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <Select value={sourceType} onValueChange={setSourceType}>
                <SelectTrigger className="w-40 bg-slate-700 border-slate-600">
                  <SelectValue placeholder="Source type" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  <SelectItem value="all">All Sources</SelectItem>
                  <SelectItem value="chat">Chat Log</SelectItem>
                  <SelectItem value="doc">Document</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="sticky">Sticky Note</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Timeline Feed */}
        <div className="lg:col-span-3 space-y-4">
          {memoryCards.map((memory) => (
            <Card key={memory.id} className="bg-slate-800 border-slate-700">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <memory.sourceIcon className="w-5 h-5 text-blue-400" />
                    <div>
                      <CardTitle className="text-white text-lg">{memory.title}</CardTitle>
                      <CardDescription className="text-slate-400">
                        {memory.timestamp} • {memory.source}
                      </CardDescription>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => toggleExpand(memory.id)}
                    className="text-slate-400 hover:text-white"
                  >
                    {memory.expanded ? 'Collapse' : 'Expand'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 mb-4 leading-relaxed">
                  {memory.expanded ? memory.content : `${memory.content.substring(0, 200)}...`}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {memory.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-600 text-blue-100 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Connections */}
                {memory.connections.length > 0 && (
                  <div className="mb-4">
                    <p className="text-slate-400 text-sm mb-2">Connected to:</p>
                    <div className="flex gap-2">
                      {memory.connections.map((connection, index) => (
                        <span key={index} className="px-2 py-1 bg-slate-600 text-slate-300 text-xs rounded">
                          {connection}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                    <Pin className="w-3 h-3 mr-1" />
                    Pin to Graph
                  </Button>
                  <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                    <RotateCcw className="w-3 h-3 mr-1" />
                    Re-tag
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                    <Trash2 className="w-3 h-3 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Trending Tags */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white text-lg">Trending Tags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {trendingTags.map((tag, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-slate-300">{tag.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-sm">{tag.count}</span>
                    <div className={`w-2 h-2 rounded-full ${
                      tag.trend === 'up' ? 'bg-green-400' : 
                      tag.trend === 'down' ? 'bg-red-400' : 'bg-slate-400'
                    }`} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Review Suggestions */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white text-lg">Review Suggestions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {reviewSuggestions.map((suggestion, index) => (
                <div key={index} className="p-3 bg-slate-700 rounded border border-slate-600">
                  <p className="text-slate-300 text-sm mb-2">{suggestion}</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" className="text-blue-400 hover:text-blue-300 text-xs">
                      Review
                    </Button>
                    <Button size="sm" variant="ghost" className="text-slate-400 hover:text-slate-300 text-xs">
                      Dismiss
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Review;
