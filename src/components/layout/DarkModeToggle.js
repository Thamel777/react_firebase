import { Switch } from '@headlessui/react';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';

function DarkModeToggle({ enabled, onChange }) {
  return (
    <Switch
      checked={enabled}
      onChange={onChange}
      className={`group relative inline-flex h-10 w-20 items-center rounded-full px-1 transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
        enabled
          ? 'bg-slate-900/90 text-amber-300'
          : 'bg-white/90 text-slate-600 shadow-inner'
      }`}
    >
      <span className="sr-only">Toggle dark mode</span>
      <span
        className={`flex h-8 w-8 transform items-center justify-center rounded-full bg-white shadow-md ring-1 ring-black/5 transition duration-300 ${
          enabled ? 'translate-x-10 bg-slate-800 text-amber-300' : 'translate-x-0 text-slate-500'
        }`}
      >
        {enabled ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
      </span>
    </Switch>
  );
}

export default DarkModeToggle;
