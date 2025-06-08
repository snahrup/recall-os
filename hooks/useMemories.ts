'use client';
import { useEffect, useState } from 'react';
import { getMemories } from '../lib/api';

interface Memory {
  id: string;
  title: string;
  snippet: string;
  tags: string[];
  createdAt: string;
}

export default function useMemories() {
  const [memories, setMemories] = useState<Memory[]>([]);
  useEffect(() => {
    getMemories().then(setMemories).catch(() => {});
  }, []);
  return { memories };
}
