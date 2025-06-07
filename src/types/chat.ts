
export interface ChatMessage {
  message_id: string;
  session_id: string;
  title: string | null;
  role: string;
  content: string;
  message_index: number;
  timestamp: string;
  created_at: string;
}

export interface ChatSession {
  session_id: string;
  title: string | null;
  message_count: number;
  last_message_at: string;
  first_message_at: string;
}
