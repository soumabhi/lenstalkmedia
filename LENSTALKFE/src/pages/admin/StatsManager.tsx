import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useApi } from '../../hooks/useApi';
import { CompanyStats } from '../../types';
import { Plus, Trash2, Edit2, X, Eye, EyeOff } from 'lucide-react';

const StatsManager = () => {
  const { data: stats, add, update, remove } = useApi<CompanyStats>('company_stats');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<CompanyStats, 'id'>>({
    value: '',
    suffix: '',
    label: '',
    order: 0,
    published: true
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await update(editingId, formData);
      setEditingId(null);
    } else {
      await add({ ...formData, order: stats.length + 1 });
      setIsAdding(false);
    }
    resetForm();
  };

  const startEdit = (stat: CompanyStats) => {
    setEditingId(stat.id!);
    setFormData({
      value: stat.value,
      suffix: stat.suffix,
      label: stat.label,
      order: stat.order,
      published: stat.published ?? true
    });
  };

  const togglePublish = async (stat: CompanyStats) => {
    await update(stat.id!, { ...stat, published: !stat.published });
  };

  const resetForm = () => {
    setFormData({ value: '', suffix: '', label: '', order: 0, published: true });
    setEditingId(null);
    setIsAdding(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-ink mb-2">Company Statistics</h1>
          <p className="text-ink/40 font-medium">Manage your company statistics and achievements.</p>
        </div>
        <button
          onClick={() => { setIsAdding(true); setEditingId(null); }}
          className="bg-cyan-800 text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-ink transition-all"
        >
          <Plus size={20} /> Add Statistic
        </button>
      </div>

      {/* Stats Table */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-ink/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-ink/5 text-ink/40 text-xs font-bold uppercase tracking-widest">
                <th className="px-8 py-4">Value</th>
                <th className="px-8 py-4">Label</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4">Order</th>
                <th className="px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/5">
              {stats.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-12 text-center text-ink/40 font-medium">
                    No statistics yet. Add one to get started.
                  </td>
                </tr>
              ) : (
                stats.map((stat) => (
                  <tr key={stat.id} className="hover:bg-ink/[0.02] transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-baseline gap-2">
                        <span className="font-bold text-2xl text-ink">{stat.value}</span>
                        <span className="text-sm text-ink/60">{stat.suffix}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 font-bold text-ink">{stat.label}</td>
                    <td className="px-8 py-6">
                      <button
                        onClick={() => togglePublish(stat)}
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold transition-all ${stat.published ?? true
                          ? 'bg-green-50 text-green-700 hover:bg-green-100'
                          : 'bg-ink/5 text-ink/40 hover:bg-ink/10'
                          }`}
                      >
                        {stat.published ?? true ? (
                          <>
                            <Eye size={14} /> Published
                          </>
                        ) : (
                          <>
                            <EyeOff size={14} /> Hidden
                          </>
                        )}
                      </button>
                    </td>
                    <td className="px-8 py-6 text-sm text-ink/60">{stat.order}</td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => startEdit(stat)}
                          className="p-2 text-ink/40 hover:text-cyan-800 transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm('Delete this statistic?')) {
                              remove(stat.id!);
                            }
                          }}
                          className="p-2 text-ink/40 hover:text-red-500 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Form Modal */}
      {(isAdding || editingId) && createPortal(
        <div className="fixed inset-0 w-screen h-screen z-[9999] flex items-center justify-center bg-ink/60 backdrop-blur-md p-4 md:p-6 overflow-y-auto">
          <div className="bg-parchment w-full max-w-md rounded-[2rem] p-10 shadow-2xl my-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-display font-bold text-ink">{editingId ? 'Edit Statistic' : 'Add Statistic'}</h2>
              <button onClick={resetForm} className="text-ink/20 hover:text-ink">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-ink">Value</label>
                <input
                  required
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  className="w-full bg-ink/5 border border-ink/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-800"
                  placeholder="e.g., 200"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-ink">Suffix (Optional)</label>
                <input
                  value={formData.suffix}
                  onChange={(e) => setFormData({ ...formData, suffix: e.target.value })}
                  className="w-full bg-ink/5 border border-ink/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-800"
                  placeholder="e.g., +"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-ink">Label</label>
                <input
                  required
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  className="w-full bg-ink/5 border border-ink/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-800"
                  placeholder="e.g., Happy Clients"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-ink">Publish Status</label>
                <div className="flex items-center gap-4 p-4 bg-ink/5 rounded-2xl">
                  <input
                    type="checkbox"
                    id="published"
                    checked={formData.published ?? true}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="rounded cursor-pointer"
                  />
                  <label htmlFor="published" className="text-sm font-bold text-ink cursor-pointer">
                    Publish this statistic on the website
                  </label>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-ink/5 text-ink px-6 py-4 rounded-full font-bold hover:bg-ink/10 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-cyan-800 text-white px-6 py-4 rounded-full font-bold hover:bg-ink transition-all"
                >
                  {editingId ? 'Update' : 'Create'} Statistic
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.getElementById('modal-root')!
      )}
    </div>
  );
};

export default StatsManager;
