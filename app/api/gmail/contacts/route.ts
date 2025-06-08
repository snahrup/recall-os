import { NextRequest, NextResponse } from 'next/server';
import { getOAuthClient } from '@/integrations/gmail/oauth';
import { listContacts } from '@/integrations/gmail/api';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { tokens } = body;
  if (!tokens) {
    return NextResponse.json({ error: 'Missing tokens' }, { status: 400 });
  }
  const client = getOAuthClient();
  client.setCredentials(tokens);
  const contacts = await listContacts(client);
  return NextResponse.json({ contacts });
}
