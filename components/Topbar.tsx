'use client';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

export default function Topbar() {
  const { theme, setTheme } = useTheme();
  return (
    <header className="h-14 border-b border-border flex items-center justify-end px-4 gap-4">
      <button
        aria-label="Toggle theme"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="p-2 rounded hover:bg-accent"
      >
        {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
      </button>
    </header>
  );
}
