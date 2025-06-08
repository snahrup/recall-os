import useMemories from '../hooks/useMemories';
import MemoryCard from './MemoryCard';

export default function MemoryList() {
  const { memories } = useMemories();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {memories.map((m) => (
        <MemoryCard key={m.id} memory={m} />
      ))}
    </div>
  );
}
