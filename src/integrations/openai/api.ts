export interface ChatCompletionMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

const API_URL = 'https://api.openai.com/v1/chat/completions';

function getApiKey(): string {
  // Support both Vite and Next.js env vars
  return (
    (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_OPENAI_API_KEY) ||
    (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_OPENAI_API_KEY) ||
    ''
  );
}

export async function createChatCompletion(
  messages: ChatCompletionMessage[],
  model = 'gpt-3.5-turbo'
): Promise<string> {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('OpenAI API key is not configured');
  }

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ model, messages }),
  });

  if (!res.ok) {
    throw new Error('Failed to fetch from OpenAI');
  }

  const json = await res.json();
  return json.choices?.[0]?.message?.content ?? '';
}
