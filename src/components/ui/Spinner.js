function Spinner({ label = 'Loading data…' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12 text-slate-500 dark:text-slate-400">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-slate-300 border-t-transparent dark:border-slate-700 dark:border-t-primary" />
      {label ? <p className="text-sm font-medium tracking-wide">{label}</p> : null}
    </div>
  );
}

export default Spinner;
