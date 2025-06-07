
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { ChatMessage, ChatSession } from '@/types/chat';

export const useChatHistory = () => {
  return useQuery({
    queryKey: ['chat-history'],
    queryFn: async (): Promise<ChatMessage[]> => {
      const { data, error } = await supabase
        .from('chat_history')
        .select('*')
        .order('timestamp', { ascending: false });

      if (error) {
        throw new Error(`Failed to fetch chat history: ${error.message}`);
      }

      return data || [];
    },
  });
};

export const useChatSessions = () => {
  return useQuery({
    queryKey: ['chat-sessions'],
    queryFn: async (): Promise<ChatSession[]> => {
      const { data, error } = await supabase
        .from('chat_history')
        .select(`
          session_id,
          title,
          timestamp,
          created_at
        `)
        .order('timestamp', { ascending: false });

      if (error) {
        throw new Error(`Failed to fetch chat sessions: ${error.message}`);
      }

      // Group by session_id and aggregate
      const sessionMap = new Map<string, ChatSession>();
      
      data?.forEach(message => {
        const existing = sessionMap.get(message.session_id);
        if (!existing) {
          sessionMap.set(message.session_id, {
            session_id: message.session_id,
            title: message.title,
            message_count: 1,
            last_message_at: message.timestamp,
            first_message_at: message.timestamp
          });
        } else {
          existing.message_count++;
          if (message.timestamp > existing.last_message_at) {
            existing.last_message_at = message.timestamp;
          }
          if (message.timestamp < existing.first_message_at) {
            existing.first_message_at = message.timestamp;
          }
        }
      });

      return Array.from(sessionMap.values());
    },
  });
};

export const useChatMessagesBySession = (sessionId: string) => {
  return useQuery({
    queryKey: ['chat-messages', sessionId],
    queryFn: async (): Promise<ChatMessage[]> => {
      const { data, error } = await supabase
        .from('chat_history')
        .select('*')
        .eq('session_id', sessionId)
        .order('message_index', { ascending: true });

      if (error) {
        throw new Error(`Failed to fetch messages for session ${sessionId}: ${error.message}`);
      }

      return data || [];
    },
    enabled: !!sessionId,
  });
};
