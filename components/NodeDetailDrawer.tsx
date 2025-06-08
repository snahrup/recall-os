'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useNodeDrawer } from '../hooks/useGraph';

export default function NodeDetailDrawer() {
  const { selected, close } = useNodeDrawer();
  return (
    <AnimatePresence>
      {selected && (
        <motion.aside
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'tween' }}
          className="fixed right-0 top-0 w-80 h-full bg-popover shadow-lg p-4 overflow-auto"
        >
          <button className="mb-4" onClick={close}>Close</button>
          <pre className="whitespace-pre-wrap text-sm">{selected.text}</pre>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
