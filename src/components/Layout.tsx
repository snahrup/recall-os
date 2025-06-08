
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Brain,
  Home,
  MessageSquare,
  Settings,
  Search,
  Upload,
  ChevronsLeft,
  ChevronsRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const [collapsed, setCollapsed] = React.useState(true);

  const toggleCollapsed = () => setCollapsed((c) => !c);

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Chat', href: '/chat', icon: MessageSquare },
    { name: 'Graph', href: '/graph', icon: Brain },
    { name: 'Review', href: '/review', icon: MessageSquare },
    { name: 'Settings', href: '/settings', icon: Settings }
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="h-screen bg-slate-900 flex">
      {/* Sidebar */}
      <div
        className={`${
          collapsed ? 'w-16' : 'w-64'
        } bg-slate-800 border-r border-slate-700 flex flex-col transition-all duration-300`}
      >
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <Link to="/" className="flex items-center gap-2">
              <Brain className="w-6 h-6 text-blue-400" />
              {!collapsed && (
                <h1 className="text-lg font-semibold text-white">Recall OS</h1>
              )}
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleCollapsed}
            >
              {collapsed ? <ChevronsRight /> : <ChevronsLeft />}
            </Button>
          </div>
          {!collapsed && (
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <Input
                placeholder="Search memories..."
                className="pl-10 bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:ring-blue-600"
              />
            </div>
          )}
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {navigation.map((item) => (
              <Link key={item.name} to={item.href}>
                <Button
                  variant="ghost"
                  className={`w-full ${collapsed ? 'justify-center' : 'justify-start'} ${
                    isActive(item.href)
                      ? 'bg-slate-700 text-white'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700 transition-colors duration-200'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {!collapsed && <span className="ml-2">{item.name}</span>}
                </Button>
              </Link>
            ))}
          </div>

          {!collapsed && (
            <div className="mt-8">
              <h3 className="text-sm font-medium text-slate-400 mb-2">Recent Activity</h3>
              <div className="space-y-1 ml-2">
                <div className="text-sm text-slate-300 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  AI Agent Conversations
                </div>
                <div className="text-sm text-slate-300 flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  Memory Graph Updates
                </div>
                <div className="text-sm text-slate-300 flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  New Tool Integrations
                </div>
              </div>
            </div>
          )}
        </nav>

        <div className="p-4 border-t border-slate-700">
          <Link to="/import">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 justify-center transition-colors duration-200">
              <Upload className="w-4 h-4" />
              {!collapsed && <span className="ml-2">Import Conversations</span>}
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default Layout;
