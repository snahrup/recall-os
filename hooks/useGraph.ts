'use client';
import { useEffect } from 'react';
import { create } from 'zustand';
import { getGraphNodes } from '../lib/api';

type Node = { id: string; text: string };
interface State {
  nodes: Node[];
  selected: Node | null;
  setSelected: (n: Node | null) => void;
}

export const useGraph = create<State>((set) => ({
  nodes: [],
  selected: null,
  setSelected: (n) => set({ selected: n }),
}));

export const useGraphNodes = () => useGraph((s) => s.nodes);

export function useGraphData() {
  useEffect(() => {
    getGraphNodes().then((data) => useGraph.setState({ nodes: data }));
  }, []);
}

export function useNodeDrawer() {
  const selected = useGraph((s) => s.selected);
  const setSelected = useGraph((s) => s.setSelected);
  const close = () => setSelected(null);
  return { selected, close };
}
