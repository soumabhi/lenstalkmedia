import React, { useState } from 'react';
import { useApi } from '../../hooks/useApi';
import { Service } from '../../types';
import { Plus, Trash2, Edit2, X, Eye, EyeOff } from 'lucide-react';

const ServiceManager = () => {
  const { data: services, add, update, remove } = useApi<Service>('services');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Service, 'id'>>({
    title: '',
    description: '',
    icon: '',
    order: 0,
    published: true
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await update(editingId, formData);
      setEditingId(null);
    } else {
      await add({ ...formData, order: services.length + 1 });
      setIsAdding(false);
    }
    resetForm();
  };

  const startEdit = (service: Service) => {
    setEditingId(service.id!);
    setFormData({
      title: service.title,
      description: service.description,
      icon: service.icon,
      order: service.order,
      published: service.published ?? true
    });
  };

  const togglePublish = async (service: Service) => {
    await update(service.id!, { ...service, published: !(service.published ?? true) });
  };

  const resetForm = () => {
    setFormData({ title: '', description: '', icon: '', order: 0, published: true });
    setEditingId(null);
    setIsAdding(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-ink mb-2">Services</h1>
          <p className="text-ink/40 font-medium">Manage your service offerings.</p>
        </div>
        <button
          onClick={() => { setIsAdding(true); setEditingId(null); }}
          className="bg-cyan-800 text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-ink transition-all"
        >
          <Plus size={20} /> Add Service
        </button>
      </div>

      {/* Services Table */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-ink/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-ink/5 text-ink/40 text-xs font-bold uppercase tracking-widest">
                <th className="px-8 py-4">Title</th>
                <th className="px-8 py-4">Description</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4">Order</th>
                <th className="px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/5">
              {services.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-12 text-center text-ink/40 font-medium">
                    No services yet. Add one to get started.
                  </td>
                </tr>
              ) : (
                services.map((service) => (
                  <tr key={service.id} className="hover:bg-ink/[0.02] transition-colors">
                    <td className="px-8 py-6 font-bold text-ink">{service.title}</td>
                    <td className="px-8 py-6 text-sm text-ink/60 line-clamp-1 max-w-xs">{service.description}</td>
                    <td className="px-8 py-6">
                      <button
                        onClick={() => togglePublish(service)}
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                          service.published ?? true
                            ? 'bg-green-50 text-green-700 hover:bg-green-100'
                            : 'bg-ink/5 text-ink/40 hover:bg-ink/10'
                        }`}
                      >
                        {service.published ?? true ? (
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
                    <td className="px-8 py-6 text-sm text-ink/60">{service.order}</td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => startEdit(service)}
                          className="p-2 text-ink/40 hover:text-cyan-800 transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm('Delete this service?')) {
                              remove(service.id!);
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
              <h2 className="text-2xl font-display font-bold text-ink">{editingId ? 'Edit Service' : 'Add Service'}</h2>
              <button onClick={resetForm} className="text-ink/20 hover:text-ink">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-ink">Service Title</label>
                <input
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-ink/5 border border-ink/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-800"
                  placeholder="e.g., Brand Strategy"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-ink">Description</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-ink/5 border border-ink/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-800 resize-none"
                  placeholder="Service description"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-ink">Icon Name (Lucide Icon)</label>
                <input
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="w-full bg-ink/5 border border-ink/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-800"
                  placeholder="e.g., Rocket, Users, Camera"
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
                    Publish this service on the website
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
                  {editingId ? 'Update' : 'Create'} Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceManager;
