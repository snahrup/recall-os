
export interface ChatMessage {
  message_id: string;
  session_id: string;
  title: string | null;
  role: string;
  content: string;
  message_index: number;
  timestamp: string;
  created_at: string;
  images?: string[];
  image_urls?: string[];
}

export interface ChatSession {
  session_id: string;
  title: string | null;
  message_count: number;
  last_message_at: string;
  first_message_at: string;
  preview_image?: string;
  has_images?: boolean;
}

export interface MemoryItem {
  id: string;
  title: string;
  content: string;
  type: 'conversation' | 'document' | 'note' | 'bookmark';
  timestamp: string;
  tags: string[];
  images?: string[];
  thumbnail?: string;
  metadata?: Record<string, any>;
}
