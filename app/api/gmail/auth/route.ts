import { NextRequest, NextResponse } from 'next/server';
import { generateAuthUrl } from '@/integrations/gmail/oauth';

export async function GET(req: NextRequest) {
  const scopes = [
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/contacts.readonly',
  ];
  const url = generateAuthUrl(scopes);
  return NextResponse.json({ url });
}
