import { NextRequest, NextResponse } from 'next/server';
import { getOAuthClient } from '@/integrations/gmail/oauth';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');
  if (!code) {
    return NextResponse.json({ error: 'Missing code' }, { status: 400 });
  }
  const client = getOAuthClient();
  const { tokens } = await client.getToken(code);
  return NextResponse.json(tokens);
}
