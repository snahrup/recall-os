import { google } from 'googleapis';
import type { OAuth2Client } from 'google-auth-library';

export async function listMessages(auth: OAuth2Client, userId = 'me') {
  const gmail = google.gmail({ version: 'v1', auth });
  const res = await gmail.users.messages.list({ userId, maxResults: 100 });
  return res.data.messages || [];
}

export async function getMessage(auth: OAuth2Client, messageId: string, userId = 'me') {
  const gmail = google.gmail({ version: 'v1', auth });
  const res = await gmail.users.messages.get({ userId, id: messageId, format: 'full' });
  return res.data;
}

export async function listContacts(auth: OAuth2Client) {
  const people = google.people({ version: 'v1', auth });
  const res = await people.people.connections.list({
    resourceName: 'people/me',
    pageSize: 100,
    personFields: 'names,emailAddresses',
  });
  return res.data.connections || [];
}
