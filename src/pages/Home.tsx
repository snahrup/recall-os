
import React from 'react';
import { Brain, TrendingUp, MessageSquare, Upload, Search, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ImageDisplay from '@/components/ImageDisplay';

const Home = () => {
  const memoryStats = [
    { label: 'Total Memories', value: '156', icon: Brain },
    { label: 'Active Topics', value: '23', icon: TrendingUp },
    { label: 'Conversations', value: '89', icon: MessageSquare },
    { label: 'Recent Imports', value: '12', icon: Upload }
  ];

  const memorySnapshots = [
    {
      title: 'AI Agents in March',
      summary: 'Deep dive into autonomous agents, tool usage patterns, and memory retrieval strategies.',
      tags: ['ai', 'agents', 'automation'],
      conversations: 8,
      imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400'
    },
    {
      title: 'Vector DB Research',
      summary: 'Comparison of pgvector, Weaviate, and Pinecone for semantic search implementations.',
      tags: ['vectors', 'database', 'search'],
      conversations: 5,
      imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400'
    },
    {
      title: 'Recall OS Development',
      summary: 'Building a personal memory engine with graph visualization and LLM integration.',
      tags: ['recall', 'memory', 'graph'],
      conversations: 15,
      imageUrl: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400'
    }
  ];

  const recentEntries = [
    { title: 'Knowledge graph visualization', time: '2 hours ago', type: 'conversation' },
    { title: 'Telegram bot integration', time: '5 hours ago', type: 'tool' },
    { title: 'Vector embedding strategies', time: '1 day ago', type: 'topic' }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Your Memory Command Center</h1>
        <p className="text-slate-400">Overview of your evolving knowledge graph and recent activity</p>
      </div>

      {/* Memory Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {memoryStats.map((stat, index) => (
          <Card key={index} className="bg-slate-800 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
                <stat.icon className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Memory Snapshots */}
        <div className="lg:col-span-2">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-400" />
                Memory Snapshots
              </CardTitle>
              <CardDescription className="text-slate-400">
                Auto-generated clusters from your conversations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {memorySnapshots.map((snapshot, index) => (
                <div key={index} className="p-4 bg-slate-700 rounded-lg border border-slate-600">
                  <div className="flex gap-4">
                    {snapshot.imageUrl && (
                      <div className="flex-shrink-0">
                        <ImageDisplay 
                          src={snapshot.imageUrl} 
                          size="small" 
                          alt={snapshot.title}
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-2">{snapshot.title}</h3>
                      <p className="text-slate-300 text-sm mb-3">{snapshot.summary}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          {snapshot.tags.map((tag, tagIndex) => (
                            <span key={tagIndex} className="px-2 py-1 bg-blue-600 text-blue-100 text-xs rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <span className="text-slate-400 text-xs">{snapshot.conversations} conversations</span>
                      </div>
                      <div className="mt-3 flex gap-2">
                        <Button size="sm" variant="ghost" className="text-blue-400 hover:text-blue-300">
                          View Graph
                        </Button>
                        <Button size="sm" variant="ghost" className="text-slate-400 hover:text-slate-300">
                          Review
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Import Panel */}
          <Card className="bg-slate-800 border-slate-700 mt-6">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Upload className="w-5 h-5 text-green-400" />
                Import Content
              </CardTitle>
              <CardDescription className="text-slate-400">
                Add new memories to your knowledge graph
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button className="h-20 bg-blue-600 hover:bg-blue-700 flex flex-col items-center justify-center">
                  <MessageSquare className="w-6 h-6 mb-2" />
                  Import Conversations
                  <span className="text-xs opacity-75">OpenAI JSON format</span>
                </Button>
                <div className="h-20 border-2 border-dashed border-slate-600 rounded-lg flex flex-col items-center justify-center text-slate-400 hover:border-slate-500 transition-colors cursor-pointer">
                  <Upload className="w-6 h-6 mb-2" />
                  Drag & Drop Files
                  <span className="text-xs">.md, .txt, .json, images</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
                  Connect Gmail
                </Button>
                <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
                  Connect Notion
                </Button>
                <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
                  Connect Telegram
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Memory Entries */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentEntries.map((entry, index) => (
                <div key={index} className="flex items-center justify-between p-2 hover:bg-slate-700 rounded">
                  <div>
                    <p className="text-white text-sm font-medium">{entry.title}</p>
                    <p className="text-slate-400 text-xs">{entry.time}</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-slate-600 text-slate-300 rounded">
                    {entry.type}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="ghost" size="sm" className="w-full justify-start text-slate-300 hover:text-white">
                <Brain className="w-4 h-4 mr-2" />
                Summarize last 24h
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start text-slate-300 hover:text-white">
                <TrendingUp className="w-4 h-4 mr-2" />
                Most active topic
              </Button>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <Input 
                  placeholder="Search memories..."
                  className="pl-10 bg-slate-700 border-slate-600 text-white placeholder-slate-400 h-8"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
