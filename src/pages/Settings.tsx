
import React, { useState } from 'react';
import { Settings as SettingsIcon, Database, Brain, Shield, Zap, FlaskConical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Layout from '@/components/Layout';

const Settings = () => {
  const [vectorDB, setVectorDB] = useState('supabase');
  const [embeddingModel, setEmbeddingModel] = useState('openai');
  const [dailySummary, setDailySummary] = useState(true);
  const [autoCluster, setAutoCluster] = useState(false);
  const [memoryScoring, setMemoryScoring] = useState(true);

  const connectedServices = [
    { name: 'Gmail', status: 'connected', icon: '📧' },
    { name: 'Notion', status: 'disconnected', icon: '📝' },
    { name: 'Telegram', status: 'connected', icon: '💬' },
    { name: 'GitHub', status: 'disconnected', icon: '🐙' }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-slate-900 text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-slate-400">Configure how Recall OS behaves, connects, and grows</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Data Sources & Imports */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Database className="w-5 h-5 text-blue-400" />
              Data Sources & Imports
            </CardTitle>
            <CardDescription className="text-slate-400">
              Manage connections and import preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* OAuth Connections */}
            <div>
              <Label className="text-white text-sm font-medium mb-3 block">Connected Services</Label>
              <div className="space-y-3">
                {connectedServices.map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-700 rounded border border-slate-600">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{service.icon}</span>
                      <span className="text-white">{service.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded ${
                        service.status === 'connected' 
                          ? 'bg-green-600 text-green-100' 
                          : 'bg-slate-600 text-slate-300'
                      }`}>
                        {service.status}
                      </span>
                      <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                        {service.status === 'connected' ? 'Disconnect' : 'Connect'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="bg-slate-600" />

            {/* Import Preferences */}
            <div>
              <Label className="text-white text-sm font-medium mb-3 block">Import Preferences</Label>
              <div className="space-y-3">
                <div>
                  <Label className="text-slate-300 text-sm">Default tags for new files</Label>
                  <Input 
                    placeholder="e.g. imported, unprocessed"
                    className="mt-1 bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div>
                  <Label className="text-slate-300 text-sm">Split strategy</Label>
                  <Select defaultValue="paragraph">
                    <SelectTrigger className="mt-1 bg-slate-700 border-slate-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="paragraph">By paragraph</SelectItem>
                      <SelectItem value="sentence">By sentence</SelectItem>
                      <SelectItem value="semantic">Semantic chunks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Memory Engine Config */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-400" />
              Memory Engine
            </CardTitle>
            <CardDescription className="text-slate-400">
              Configure vector database and AI models
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-white text-sm font-medium mb-3 block">Vector Database</Label>
              <Select value={vectorDB} onValueChange={setVectorDB}>
                <SelectTrigger className="bg-slate-700 border-slate-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  <SelectItem value="supabase">pgvector (Supabase)</SelectItem>
                  <SelectItem value="weaviate">Weaviate</SelectItem>
                  <SelectItem value="pinecone">Pinecone</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-white text-sm font-medium mb-3 block">Embedding Model</Label>
              <Select value={embeddingModel} onValueChange={setEmbeddingModel}>
                <SelectTrigger className="bg-slate-700 border-slate-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  <SelectItem value="openai">OpenAI text-embedding-3-small</SelectItem>
                  <SelectItem value="openai-large">OpenAI text-embedding-3-large</SelectItem>
                  <SelectItem value="huggingface">HuggingFace BERT</SelectItem>
                  <SelectItem value="local">Local Sentence Transformers</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-white text-sm font-medium mb-3 block">Chunking Settings</Label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-slate-300 text-sm">Chunk size</Label>
                  <Input 
                    type="number" 
                    defaultValue="1000"
                    className="mt-1 bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div>
                  <Label className="text-slate-300 text-sm">Overlap</Label>
                  <Input 
                    type="number" 
                    defaultValue="200"
                    className="mt-1 bg-slate-700 border-slate-600 text-white"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Storage */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-400" />
              Privacy & Storage
            </CardTitle>
            <CardDescription className="text-slate-400">
              Control your data and privacy settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-white text-sm font-medium mb-3 block">Data Storage</Label>
              <Select defaultValue="local">
                <SelectTrigger className="bg-slate-700 border-slate-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  <SelectItem value="local">Local + Supabase</SelectItem>
                  <SelectItem value="cloud">Cloud only</SelectItem>
                  <SelectItem value="hybrid">Hybrid approach</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-white text-sm font-medium">Keep raw data</Label>
                <p className="text-slate-400 text-xs">Store original files alongside embeddings</p>
              </div>
              <Switch checked={true} />
            </div>

            <div className="space-y-3">
              <Button variant="outline" className="w-full border-slate-600 text-slate-300">
                Export All Data
              </Button>
              <Button variant="destructive" className="w-full">
                Delete All Data
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Assistant Behavior */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              Assistant Behavior
            </CardTitle>
            <CardDescription className="text-slate-400">
              Customize how your AI assistant behaves
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-white text-sm font-medium mb-3 block">System Prompt</Label>
              <textarea 
                className="w-full h-24 p-3 bg-slate-700 border border-slate-600 rounded text-white text-sm resize-none"
                placeholder="You are a helpful AI assistant for memory recall..."
                defaultValue="You are a helpful AI assistant specialized in memory recall and knowledge management. You help users find connections between ideas, summarize conversations, and discover insights from their personal knowledge graph."
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-white text-sm font-medium">Daily summary email</Label>
                <p className="text-slate-400 text-xs">Get a recap of your memory activity</p>
              </div>
              <Switch checked={dailySummary} onCheckedChange={setDailySummary} />
            </div>

            <div>
              <Label className="text-white text-sm font-medium mb-3 block">Assistant Tone</Label>
              <Select defaultValue="helpful">
                <SelectTrigger className="bg-slate-700 border-slate-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  <SelectItem value="helpful">Helpful & Professional</SelectItem>
                  <SelectItem value="casual">Casual & Friendly</SelectItem>
                  <SelectItem value="concise">Concise & Direct</SelectItem>
                  <SelectItem value="detailed">Detailed & Analytical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Experimental Labs */}
        <Card className="bg-slate-800 border-slate-700 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <FlaskConical className="w-5 h-5 text-orange-400" />
              Experimental Labs
            </CardTitle>
            <CardDescription className="text-slate-400">
              Try out cutting-edge features (may be unstable)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex items-center justify-between p-4 bg-slate-700 rounded border border-slate-600">
                <div>
                  <Label className="text-white text-sm font-medium">Auto-summarizer</Label>
                  <p className="text-slate-400 text-xs">Generate daily memory summaries</p>
                </div>
                <Switch checked={dailySummary} onCheckedChange={setDailySummary} />
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-700 rounded border border-slate-600">
                <div>
                  <Label className="text-white text-sm font-medium">Auto-clustering</Label>
                  <p className="text-slate-400 text-xs">Automatically group related memories</p>
                </div>
                <Switch checked={autoCluster} onCheckedChange={setAutoCluster} />
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-700 rounded border border-slate-600">
                <div>
                  <Label className="text-white text-sm font-medium">Memory scoring</Label>
                  <p className="text-slate-400 text-xs">Track frequency + recency scores</p>
                </div>
                <Switch checked={memoryScoring} onCheckedChange={setMemoryScoring} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </Layout>
  );
};

export default Settings;
