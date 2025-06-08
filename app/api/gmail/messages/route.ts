import { NextRequest, NextResponse } from 'next/server';
import { getOAuthClient } from '@/integrations/gmail/oauth';
import { listMessages } from '@/integrations/gmail/api';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { tokens } = body;
  if (!tokens) {
    return NextResponse.json({ error: 'Missing tokens' }, { status: 400 });
  }
  const client = getOAuthClient();
  client.setCredentials(tokens);
  const messages = await listMessages(client);
  return NextResponse.json({ messages });
}
