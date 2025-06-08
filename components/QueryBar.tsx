'use client';
import { useState } from 'react';
import useQueryResults from '../hooks/useQuery';

export default function QueryBar() {
  const [text, setText] = useState('');
  const { results, query } = useQueryResults();
  return (
    <div className="w-full max-w-xl">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && query(text)}
        placeholder="Ask anything..."
        className="w-full px-4 py-2 rounded-md bg-input text-sm"
      />
      <ul className="mt-4 space-y-2">
        {results.map((r) => (
          <li key={r.id} className="p-2 bg-card rounded">
            {r.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
