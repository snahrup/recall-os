import fs from 'fs';
import path from 'path';
import unzipper from 'unzipper';
import { supabase } from '../src/integrations/supabase/client';

/**
 * Process a ChatGPT export zip file and import messages into Supabase.
 * Usage: ts-node scripts/processChatExport.ts path/to/chatgpt_export.zip
 */
async function main() {
  const zipPath = process.argv[2];
  if (!zipPath) {
    console.error('Usage: ts-node processChatExport.ts <export.zip>');
    process.exit(1);
  }

  const directory = await unzipper.Open.file(zipPath);
  const convEntry = directory.files.find(f => f.path.endsWith('conversations.json'));
  if (!convEntry) {
    console.error('conversations.json not found in zip');
    process.exit(1);
  }

  const json = await convEntry.buffer();
  const conversations = JSON.parse(json.toString());

  for (const convo of conversations) {
    const sessionId = convo.id;
    const title = convo.title;
    const mapping = convo.mapping || {};
    const messages = Object.values(mapping) as any[];
    messages.sort((a, b) => (a.message?.create_time || 0) - (b.message?.create_time || 0));

    let index = 0;
    for (const node of messages) {
      const msg = node.message;
      if (!msg || !msg.content || !msg.content.parts) continue;
      const { error } = await supabase.from('chat_history').insert({
        session_id: sessionId,
        message_id: msg.id,
        message_index: index++,
        role: msg.author.role,
        content: msg.content.parts.join('\n'),
        title,
        timestamp: new Date(msg.create_time * 1000).toISOString(),
      });
      if (error) {
        console.error('Failed to insert message', error.message);
      }
    }
  }

  for (const file of directory.files) {
    if (file.type === 'File' && file.path.startsWith('shared/')) {
      const ext = path.extname(file.path);
      const { error } = await supabase.storage
        .from('chat-assets')
        .upload(file.path.replace(/^shared\//, ''), await file.buffer(), { upsert: true });
      if (error) {
        console.error(`Failed to upload ${file.path}:`, error.message);
      }
    }
  }

  console.log('Import complete');
}

main();
