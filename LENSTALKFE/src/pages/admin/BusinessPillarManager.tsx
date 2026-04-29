import React, { useState } from 'react';
import { useApi } from '../../hooks/useApi';
import { BusinessPillar } from '../../types';
import { Plus, Trash2, Edit2, X, Eye, EyeOff } from 'lucide-react';

const BusinessPillarManager = () => {
  const { data: pillars, add, update, remove } = useApi<BusinessPillar>('business_pillars');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<BusinessPillar, 'id'>>({
    title: '',
    subtitle: '',
    description: '',
    icon: '',
    color: '#0e7490',
    order: 0,
    published: true
  });

  const colorOptions = [
    { label: 'Cyan', hex: '#0e7490' },
    { label: 'Orange', hex: '#ea580c' },
    { label: 'Black', hex: '#000000' },
    { label: 'Red', hex: '#dc2626' },
    { label: 'Green', hex: '#16a34a' },
    { label: 'Purple', hex: '#9333ea' },
    { label: 'Blue', hex: '#2563eb' }
  ];

  const getColorClass = (hex: string) => {
    const colorMap: { [key: string]: string } = {
      '#0e7490': 'bg-cyan-800',
      '#ea580c': 'bg-orange-500',
      '#000000': 'bg-black',
      '#dc2626': 'bg-red-500',
      '#16a34a': 'bg-green-500',
      '#9333ea': 'bg-purple-500',
      '#2563eb': 'bg-blue-500'
    };
    return colorMap[hex] || 'bg-cyan-800';
  };

  const getTextColor = (hex: string) => {
    return hex === '#ea580c' ? 'text-orange-900' : 'text-white';
  };

  const getTextColorBg = (hex: string) => {
    return hex === '#ea580c' ? 'text-ink' : 'text-white';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await update(editingId, formData);
      setEditingId(null);
    } else {
      await add({ ...formData, order: pillars.length + 1 });
      setIsAdding(false);
    }
    resetForm();
  };

  const startEdit = (pillar: BusinessPillar) => {
    setEditingId(pillar.id!);
    setFormData({
      title: pillar.title,
      subtitle: pillar.subtitle,
      description: pillar.description,
      icon: pillar.icon,
      color: pillar.color,
      order: pillar.order,
      published: pillar.published ?? true
    });
  };

  const togglePublish = async (pillar: BusinessPillar) => {
    await update(pillar.id!, { ...pillar, published: !(pillar.published ?? true) });
  };

  const resetForm = () => {
    setFormData({
      title: '',
      subtitle: '',
      description: '',
      icon: '',
      color: '#0e7490',
      order: 0,
      published: true
    });
    setEditingId(null);
    setIsAdding(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-ink mb-2">Business Pillars</h1>
          <p className="text-ink/40 font-medium">Manage your three business verticals.</p>
        </div>
        <button
          onClick={() => { setIsAdding(true); setEditingId(null); }}
          className="bg-cyan-800 text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-ink transition-all"
        >
          <Plus size={20} /> Add Pillar
        </button>
      </div>

      {/* Pillars Table */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-ink/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-ink/5 text-ink/40 text-xs font-bold uppercase tracking-widest">
                <th className="px-8 py-4">Title</th>
                <th className="px-8 py-4">Subtitle</th>
                <th className="px-8 py-4">Description</th>
                <th className="px-8 py-4">Color</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/5">
              {pillars.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-8 py-12 text-center text-ink/40 font-medium">
                    No pillars yet. Add one to get started.
                  </td>
                </tr>
              ) : (
                pillars.map((pillar) => (
                  <tr key={pillar.id} className="hover:bg-ink/[0.02] transition-colors">
                    <td className="px-8 py-6 font-bold text-ink">{pillar.title}</td>
                    <td className="px-8 py-6 text-ink/60">{pillar.subtitle}</td>
                    <td className="px-8 py-6 text-sm text-ink/60 line-clamp-1">{pillar.description}</td>
                    <td className="px-8 py-6">
                      <div className={`w-8 h-8 rounded-lg ${getColorClass(pillar.color)}`} />
                    </td>
                    <td className="px-8 py-6">
                      <button
                        onClick={() => togglePublish(pillar)}
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                          pillar.published ?? true
                            ? 'bg-green-50 text-green-700 hover:bg-green-100'
                            : 'bg-ink/5 text-ink/40 hover:bg-ink/10'
                        }`}
                      >
                        {pillar.published ?? true ? (
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
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => startEdit(pillar)}
                          className="p-2 text-ink/40 hover:text-cyan-800 transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm('Delete this pillar?')) {
                              remove(pillar.id!);
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
      {(isAdding || editingId) && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-ink/60 backdrop-blur-md p-4 md:p-6">
          <div className="bg-parchment w-full max-w-2xl rounded-[2rem] p-10 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-display font-bold text-ink">{editingId ? 'Edit Pillar' : 'Add Pillar'}</h2>
              <button onClick={resetForm} className="text-ink/20 hover:text-ink">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-ink">Main Title</label>
                <input
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-ink/5 border border-ink/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-800"
                  placeholder="e.g., Content Creation"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-ink">Subtitle</label>
                <input
                  required
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full bg-ink/5 border border-ink/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-800"
                  placeholder="e.g., Short tagline"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-ink">Description</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-ink/5 border border-ink/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-800 resize-none"
                  placeholder="Pillar description"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-ink">Icon (Lucide Icon Name)</label>
                <input
                  required
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="w-full bg-ink/5 border border-ink/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-800"
                  placeholder="e.g., Rocket, Users, Camera"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-ink">Color</label>
                <div className="grid grid-cols-4 gap-3">
                  {colorOptions.map((option) => (
                    <button
                      key={option.hex}
                      type="button"
                      onClick={() => setFormData({ ...formData, color: option.hex })}
                      className={`h-12 rounded-2xl transition-all border-2 ${
                        formData.color === option.hex
                          ? 'border-ink ring-2 ring-offset-2 ring-cyan-800'
                          : 'border-ink/10'
                      }`}
                      style={{ backgroundColor: option.hex }}
                      title={option.label}
                    />
                  ))}
                </div>
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
                    Publish this pillar on the website
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
                  {editingId ? 'Update' : 'Create'} Pillar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Pillars Grid Preview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pillars.sort((a, b) => a.order - b.order).filter(p => p.published ?? true).map((pillar) => (
          <div key={pillar.id} className={`p-6 rounded-3xl border border-ink/10 overflow-hidden ${getColorClass(pillar.color)}`}>
            <div className="relative z-10">
              <span className={`text-xs font-bold uppercase tracking-widest block mb-2 ${getTextColor(pillar.color)}`}>
                {pillar.subtitle}
              </span>
              <h3 className={`text-2xl font-display font-bold mb-3 ${getTextColorBg(pillar.color)}`}>
                {pillar.title}
              </h3>
              <p className={`text-sm leading-relaxed line-clamp-3 ${pillar.color === '#ea580c' ? 'text-ink/80' : 'text-white/80'}`}>
                {pillar.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusinessPillarManager;
