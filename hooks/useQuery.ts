'use client';
import { useState } from 'react';
import { queryMemories } from '../lib/api';

interface Result { id: string; text: string }

export default function useQueryResults() {
  const [results, setResults] = useState<Result[]>([]);
  const query = (text: string) => {
    if (!text) return;
    queryMemories(text).then(setResults).catch(() => {});
  };
  return { results, query };
}
