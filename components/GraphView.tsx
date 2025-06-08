'use client';
import { useGraph, useGraphData } from '../hooks/useGraph';

export default function GraphView() {
  const { nodes } = useGraph();
  useGraphData();
  return (
    <div className="h-full flex items-center justify-center border border-dashed rounded-lg">
      {/* Placeholder for graph component */}
      <span className="text-muted-foreground">Graph with {nodes.length} nodes</span>
    </div>
  );
}
