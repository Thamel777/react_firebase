import { memo } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  ArrowPathRoundedSquareIcon,
  PencilSquareIcon,
  SparklesIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline';
import DarkModeToggle from './DarkModeToggle';

const navItems = [
  {
    name: 'Home',
    to: '/',
    icon: PencilSquareIcon,
    match: (path) => path === '/' || path === '/write',
  },
  {
    name: 'Read',
    to: '/read',
    icon: Squares2X2Icon,
    match: (path) => path.startsWith('/read'),
  },
  {
    name: 'Update',
    to: '/updateread',
    icon: ArrowPathRoundedSquareIcon,
    match: (path) => path.startsWith('/update'),
  },
];

function AppLayout({ isDarkMode, onToggleDarkMode }) {
  const location = useLocation();

  return (
    <div className="relative min-h-screen overflow-hidden text-slate-900 transition-colors duration-500 dark:text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 dark:from-slate-900 dark:via-slate-950 dark:to-black" />
      <div className="pointer-events-none absolute inset-0 bg-grid-slate bg-[length:32px_32px] opacity-60 mix-blend-soft-light dark:opacity-20" />

      <div className="relative flex min-h-screen flex-col">
        <header className="border-b border-white/40 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50 dark:border-white/10 dark:bg-slate-900/50">
          <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
            <div className="flex items-center gap-3">
              <SparklesIcon className="h-9 w-9 text-primary" aria-hidden="true" />
              <div>
                <p className="text-lg font-semibold tracking-tight">Fruit Inventory</p>
              </div>
            </div>

            <nav className="hidden items-center gap-2 rounded-full bg-white/80 px-2 py-1 shadow-soft transition dark:bg-slate-900/70 md:flex">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.match(location.pathname);
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition duration-200 ${
                      isActive
                        ? 'bg-slate-900 text-white shadow shadow-black/20 dark:bg-white dark:text-slate-900'
                        : 'text-slate-600 hover:bg-slate-200/80 dark:text-slate-300 dark:hover:bg-white/10'
                    }`}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {item.name}
                  </NavLink>
                );
              })}
            </nav>

            <div className="flex items-center gap-3">
              <DarkModeToggle enabled={isDarkMode} onChange={onToggleDarkMode} />
            </div>
          </div>

          <div className="mt-3 flex items-center justify-center gap-4 px-4 pb-4 md:hidden">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.match(location.pathname);
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={`flex flex-col items-center rounded-2xl px-3 py-2 text-xs font-medium transition ${
                    isActive
                      ? 'bg-slate-900 text-white shadow shadow-black/20 dark:bg-white dark:text-slate-900'
                      : 'text-slate-600 hover:bg-slate-200/80 dark:text-slate-300 dark:hover:bg-white/10'
                  }`}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                  {item.name}
                </NavLink>
              );
            })}
          </div>
        </header>

        <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-10 sm:px-6">
          <Outlet />
        </main>

        <footer className="border-t border-white/40 bg-white/60 py-6 text-center text-xs text-slate-500 backdrop-blur dark:border-white/10 dark:bg-slate-900/40 dark:text-slate-400">
          By Nimsara Thamel · {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  );
}

export default memo(AppLayout);
