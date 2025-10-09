import { useEffect, useState } from 'react';
import { get, getDatabase, ref } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import app from '../firebaseConfig';
import Spinner from './ui/Spinner';

function Read() {
  const navigate = useNavigate();

  const [fruitArray, setFruitArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const db = getDatabase(app);
      const dbRef = ref(db, 'nature/fruits');
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const formatted = Object.entries(data)
          .map(([id, value]) => ({ id, ...value }))
          .sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0));
        setFruitArray(formatted);
        toast.success('Inventory refreshed.');
      } else {
        setFruitArray([]);
        toast('No fruits tracked yet — add your first one!', { icon: '🍓' });
      }
    } catch (error) {
      toast.error(error?.message ?? 'Unable to load fruits.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="mx-auto w-full max-w-5xl">
      <div className="glass-card p-8 sm:p-12">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl space-y-3">
            <span className="card-subtitle">Overview</span>
            <h1 className="card-title">Current fruit inventory</h1>
          </div>
          <button
            type="button"
            className={`btn-navigate w-full sm:w-auto ${isLoading ? 'pointer-events-none opacity-80' : ''}`}
            onClick={fetchData}
            disabled={isLoading}
          >
            {isLoading ? 'Refreshing…' : 'Refresh list'}
          </button>
        </div>

        <div className="mt-10">
          {isLoading ? (
            <Spinner label="Fetching fruits…" />
          ) : fruitArray.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300/80 bg-white/70 p-10 text-center text-sm text-slate-500 shadow-inner dark:border-slate-700/60 dark:bg-slate-900/50 dark:text-slate-300">
              No fruits to display yet. Use the Home screen to add your first entry.
            </div>
          ) : (
            <div className="overflow-hidden rounded-3xl border border-white/70 bg-white/90 shadow-soft dark:border-white/10 dark:bg-slate-900/70">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
                  <thead className="bg-slate-50/80 text-left text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:bg-slate-900/60 dark:text-slate-400">
                    <tr>
                      <th scope="col" className="px-6 py-4">ID</th>
                      <th scope="col" className="px-6 py-4">Fruit</th>
                      <th scope="col" className="px-6 py-4">Description</th>
                      <th scope="col" className="px-6 py-4">Last Updated</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-sm text-slate-700 dark:divide-slate-800 dark:text-slate-200">
                    {fruitArray.map((fruit) => (
                      <tr
                        key={fruit.id}
                        className="transition-colors hover:bg-slate-100/70 dark:hover:bg-white/5"
                      >
                        <td className="whitespace-nowrap px-6 py-4 font-semibold text-slate-500 dark:text-slate-400">
                          {fruit.id.slice(0, 8)}
                        </td>
                        <td className="px-6 py-4 text-base font-medium text-slate-900 dark:text-slate-100">
                          {fruit.fruitName}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                          {fruit.fruitDefinition}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-xs text-slate-500 dark:text-slate-400">
                          {fruit.createdAt
                            ? new Date(fruit.createdAt).toLocaleString()
                            : 'moments ago'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button type="button" className="btn-primary" onClick={() => navigate('/')}>Add more fruit</button>
          <button type="button" className="btn-update" onClick={() => navigate('/updateread')}>
            Manage entries
          </button>
        </div>
      </div>
    </section>
  );
}

export default Read;