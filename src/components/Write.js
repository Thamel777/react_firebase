import { useState } from 'react';
import { getDatabase, push, ref, set } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import app from '../firebaseConfig';

function Write() {
  const navigate = useNavigate();

  const [fruitName, setFruitName] = useState('');
  const [fruitDefinition, setFruitDefinition] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const resetForm = () => {
    setFruitName('');
    setFruitDefinition('');
  };

  const handleSave = async (event) => {
    event.preventDefault();
    if (!fruitName.trim() || !fruitDefinition.trim()) {
      toast.error('Please provide both a fruit name and a description.');
      return;
    }

    try {
      setIsSaving(true);
      const db = getDatabase(app);
      const newDocRef = push(ref(db, 'nature/fruits'));
      await set(newDocRef, {
        fruitName: fruitName.trim(),
        fruitDefinition: fruitDefinition.trim(),
        createdAt: Date.now(),
      });
      toast.success('Fruit saved successfully!');
      resetForm();
    } catch (error) {
      toast.error(error?.message ?? 'Unable to save right now.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="mx-auto w-full max-w-3xl">
      <div className="glass-card p-8 sm:p-12">
        <div className="flex flex-col gap-3">
          <span className="card-subtitle">New Entry</span>
          <h1 className="card-title">Log fresh fruit inventory</h1>
        </div>

        <form className="mt-8 flex flex-col gap-6" onSubmit={handleSave}>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-600 dark:text-slate-300" htmlFor="fruit-name">
                Fruit name
              </label>
              <input
                id="fruit-name"
                type="text"
                value={fruitName}
                onChange={(event) => setFruitName(event.target.value)}
                placeholder="e.g. Honeycrisp Apple"
                className="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-base text-slate-900 shadow-inner transition placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-600 dark:text-slate-300" htmlFor="fruit-definition">
                Short description
              </label>
              <input
                id="fruit-definition"
                type="text"
                value={fruitDefinition}
                onChange={(event) => setFruitDefinition(event.target.value)}
                placeholder="Crisp, sweet, great for snacks"
                className="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-base text-slate-900 shadow-inner transition placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              className={`btn-primary w-full sm:w-auto ${isSaving ? 'pointer-events-none opacity-80' : ''}`}
              disabled={isSaving}
            >
              {isSaving ? 'Saving…' : 'Save fruit'}
            </button>

            <div className="flex flex-wrap gap-3">
              <button type="button" className="btn-navigate" onClick={() => navigate('/read')}>
                Go to Read view
              </button>
              <button type="button" className="btn-update" onClick={() => navigate('/updateread')}>
                Manage inventory
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Write;