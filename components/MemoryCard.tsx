import { MotionProps, motion } from 'framer-motion';
import { format } from 'date-fns';

interface Memory {
  id: string;
  title: string;
  snippet: string;
  tags: string[];
  createdAt: string;
}

export default function MemoryCard({ memory }: { memory: Memory } & MotionProps) {
  return (
    <motion.div
      layout
      className="bg-card p-4 rounded-lg shadow hover:shadow-lg transition-shadow"
    >
      <h3 className="font-semibold mb-2">{memory.title}</h3>
      <p className="text-sm text-muted-foreground line-clamp-3 mb-2">
        {memory.snippet}
      </p>
      <div className="flex flex-wrap gap-2 text-xs mb-2">
        {memory.tags.map((t) => (
          <span key={t} className="bg-accent px-2 py-0.5 rounded">
            {t}
          </span>
        ))}
      </div>
      <span className="text-xs text-muted-foreground">
        {format(new Date(memory.createdAt), 'PPP')}
      </span>
    </motion.div>
  );
}
