'use client';
import Link from 'next/link';
import { useState } from 'react';
import { cn } from '../lib/utils';

const items = [
  { href: '/graph', label: 'Graph' },
  { href: '/memories', label: 'Memories' },
  { href: '/query', label: 'Search' },
  { href: '/import', label: 'Import' },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <aside className={cn('bg-sidebar w-56 shrink-0 border-r border-border', collapsed && 'w-14') }>
      <div className="flex items-center justify-between p-4">
        <span className="font-bold">Recall</span>
        <button onClick={() => setCollapsed(!collapsed)} className="text-muted-foreground">{collapsed ? '>' : '<'}</button>
      </div>
      <nav className="px-2">
        {items.map((item) => (
          <Link key={item.href} href={item.href} className="block py-2 px-3 rounded-md hover:bg-accent">
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
