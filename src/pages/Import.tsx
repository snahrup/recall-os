import React, { useRef, useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Upload } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const Import = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const { data, error } = await supabase.storage
        .from('chat-exports')
        .upload(`exports/${Date.now()}-${file.name}`, file);

      if (error) {
        console.error('Upload failed', error.message);
        alert(`Upload failed: ${error.message}`);
      } else {
        alert('File uploaded. Processing will begin shortly.');
        await supabase.functions.invoke('process-export', {
          body: { path: data?.path },
        });
      }
    } catch (err) {
      console.error('Upload error', err);
      alert('Upload failed');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-slate-900 text-white p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Import Data</h1>
          <p className="text-slate-400">Add conversations or files to your memory graph</p>
        </div>
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Upload className="w-5 h-5 text-green-400" />
              Import Options
            </CardTitle>
            <CardDescription className="text-slate-400">
              Choose how you'd like to bring in new data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <input
              type="file"
              accept=".zip"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="h-20 bg-gray-600 hover:bg-gray-700 flex flex-col items-center justify-center"
                disabled={uploading}
              >
                <MessageSquare className="w-6 h-6 mb-2" />
                {uploading ? 'Uploading...' : 'Import ChatGPT Export (.zip)'}
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
    </Layout>
  );
};

export default Import;
