import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { createChatCompletion, type ChatCompletionMessage } from '@/integrations/openai/api';
import type { ChatMessage } from '@/types/chat';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const [memorySnippets, setMemorySnippets] = useState<ChatMessage[]>([]);
  const { toast } = useToast();

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setThinking(true);

    try {
      const { data: memories } = await supabase
        .from('chat_history')
        .select('*')
        .ilike('content', `%${input}%`)
        .order('timestamp', { ascending: false })
        .limit(5);

      setMemorySnippets(memories || []);

      const openaiMessages: ChatCompletionMessage[] = [
        ...messages,
        userMessage,
        {
          role: 'system',
          content: `Use the following memories to inform your answer:\n${memories?.map(m => `- ${m.content}`).join('\n') || ''}`,
        },
      ].map(m => ({ role: m.role, content: m.content }));

      const response = await createChatCompletion(openaiMessages);
      const assistantMessage: Message = {
        role: 'assistant',
        content: response,
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      const error = err as Error;
      toast({ title: 'Error', description: error.message });
    } finally {
      setThinking(false);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col h-full">
        <ScrollArea className="flex-1 p-4 space-y-4">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`p-2 rounded ${m.role === 'user' ? 'bg-gray-600 text-white self-end' : 'bg-slate-700 text-slate-100'} max-w-lg`}
            >
              {m.content}
            </div>
          ))}
        </ScrollArea>
        <div className="p-4 border-t border-slate-700 flex gap-2">
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Ask your memories..."
            className="flex-1 bg-slate-700 border-slate-600 text-white"
          />
          <Button onClick={sendMessage} disabled={!input.trim() || thinking}>
            Send
          </Button>
        </div>
      </div>
      {thinking && (
        <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-slate-200 z-50">
          <div className="text-lg mb-4 animate-pulse">Searching your memories...</div>
          <div className="max-h-60 w-3/4 overflow-y-auto space-y-2">
            {memorySnippets.map(mem => (
              <div key={mem.message_id} className="bg-slate-800 p-2 rounded text-sm">
                {mem.content.slice(0, 100)}
              </div>
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Chat;
