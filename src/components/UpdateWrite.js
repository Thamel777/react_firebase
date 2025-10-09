import { useEffect, useState } from 'react';
import { get, getDatabase, ref, set } from 'firebase/database';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import app from '../firebaseConfig';
import Spinner from './ui/Spinner';

function UpdateWrite() {
  const navigate = useNavigate();
  const { firebaseId } = useParams();

  const [fruitName, setFruitName] = useState('');
  const [fruitDefinition, setFruitDefinition] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const db = getDatabase(app);
        const dbRef = ref(db, `nature/fruits/${firebaseId}`);
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          const targetObject = snapshot.val();
          setFruitName(targetObject.fruitName ?? '');
          setFruitDefinition(targetObject.fruitDefinition ?? '');
        } else {
          toast.error('Unable to find this fruit.');
        }
      } catch (error) {
        toast.error(error?.message ?? 'Failed to load fruit details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [firebaseId]);

  const overwriteData = async (event) => {
    event.preventDefault();
    if (!fruitName.trim() || !fruitDefinition.trim()) {
      toast.error('Both fields are required.');
      return;
    }

    try {
      setIsUpdating(true);
      const db = getDatabase(app);
      const newDocRef = ref(db, `nature/fruits/${firebaseId}`);
      await set(newDocRef, {
        fruitName: fruitName.trim(),
        fruitDefinition: fruitDefinition.trim(),
        updatedAt: Date.now(),
      });
      toast.success('Fruit updated successfully!');
      navigate('/updateread');
    } catch (error) {
      toast.error(error?.message ?? 'Update failed.');
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <section className="mx-auto w-full max-w-3xl">
        <div className="glass-card p-12">
          <Spinner label="Loading fruit details…" />
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-3xl">
      <div className="glass-card p-8 sm:p-12">
        <div className="flex flex-col gap-3">
          <span className="card-subtitle">Edit entry</span>
          <h1 className="card-title">Update fruit details</h1>
        </div>

        <form className="mt-8 flex flex-col gap-6" onSubmit={overwriteData}>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-600 dark:text-slate-300" htmlFor="edit-fruit-name">
              Fruit name
            </label>
            <input
              id="edit-fruit-name"
              type="text"
              value={fruitName}
              onChange={(event) => setFruitName(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-base text-slate-900 shadow-inner transition placeholder:text-slate-400 focus:border-update focus:outline-none focus:ring-2 focus:ring-update/40 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100"
              placeholder="Fruit name"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-600 dark:text-slate-300" htmlFor="edit-fruit-definition">
              Description
            </label>
            <textarea
              id="edit-fruit-definition"
              rows={3}
              value={fruitDefinition}
              onChange={(event) => setFruitDefinition(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-base text-slate-900 shadow-inner transition placeholder:text-slate-400 focus:border-update focus:outline-none focus:ring-2 focus:ring-update/40 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100"
              placeholder="Helpful description or context"
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              className={`btn-update w-full sm:w-auto ${isUpdating ? 'pointer-events-none opacity-80' : ''}`}
              disabled={isUpdating}
            >
              {isUpdating ? 'Updating…' : 'Save changes'}
            </button>

            <div className="flex flex-wrap gap-3">
              <button type="button" className="btn-danger" onClick={() => navigate('/updateread')}>
                Cancel
              </button>
              <button type="button" className="btn-navigate" onClick={() => navigate('/read')}>
                View list
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default UpdateWrite;