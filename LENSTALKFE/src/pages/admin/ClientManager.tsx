import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useApi, uploadFile } from '../../hooks/useApi';
import { ClientLogo } from '../../types';
import { Plus, Trash2, Edit2, X, ExternalLink, Upload, Eye, EyeOff } from 'lucide-react';

const ClientManager = () => {
  const { data: clients, add, update, remove } = useApi<ClientLogo>('clients');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<ClientLogo, 'id'>>({
    name: '',
    logoUrl: '',
    websiteUrl: '',
    order: 0,
    published: true
  });

  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const url = await uploadFile(file);
      setFormData({ ...formData, logoUrl: url });
    } catch (err) {
      alert('Failed to upload file');
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await update(editingId, formData);
      setEditingId(null);
    } else {
      await add({ ...formData, order: clients.length + 1 });
      setIsAdding(false);
    }
    resetForm();
  };

  const startEdit = (client: ClientLogo) => {
    setEditingId(client.id!);
    setFormData({
      name: client.name,
      logoUrl: client.logoUrl,
      websiteUrl: client.websiteUrl || '',
      order: client.order,
      published: client.published ?? true
    });
  };

  const togglePublish = async (client: ClientLogo) => {
    await update(client.id!, { ...client, published: !(client.published ?? true) });
  };

  const resetForm = () => {
    setFormData({ name: '', logoUrl: '', websiteUrl: '', order: 0, published: true });
    setEditingId(null);
    setIsAdding(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-ink mb-2">Client Logos</h1>
          <p className="text-ink/40 font-medium">Manage the brands you've worked with.</p>
        </div>
        <button
          onClick={() => { setIsAdding(true); setEditingId(null); }}
          className="bg-cyan-800 text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-ink transition-all"
        >
          <Plus size={20} /> Add Client
        </button>
      </div>

      {/* Clients Table */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-ink/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-ink/5 text-ink/40 text-xs font-bold uppercase tracking-widest">
                <th className="px-8 py-4">Logo</th>
                <th className="px-8 py-4">Client Name</th>
                <th className="px-8 py-4">Website</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4">Order</th>
                <th className="px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/5">
              {clients.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-8 py-12 text-center text-ink/40 font-medium">
                    No clients yet. Add one to get started.
                  </td>
                </tr>
              ) : (
                clients.map((client) => (
                  <tr key={client.id} className="hover:bg-ink/[0.02] transition-colors">
                    <td className="px-8 py-6">
                      <div className="h-10 w-20 flex items-center justify-center bg-ink/5 rounded-lg overflow-hidden">
                        <img 
                          src={client.logoUrl} 
                          alt={client.name} 
                          className="h-full w-full object-contain" 
                          referrerPolicy="no-referrer" 
                        />
                      </div>
                    </td>
                    <td className="px-8 py-6 font-bold text-ink">{client.name}</td>
                    <td className="px-8 py-6">
                      {client.websiteUrl ? (
                        <a 
                          href={client.websiteUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-cyan-800 text-sm font-bold flex items-center gap-1 hover:underline"
                        >
                          Visit <ExternalLink size={14} />
                        </a>
                      ) : (
                        <span className="text-ink/40 text-sm">—</span>
                      )}
                    </td>
                    <td className="px-8 py-6">
                      <button
                        onClick={() => togglePublish(client)}
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                          client.published ?? true
                            ? 'bg-green-50 text-green-700 hover:bg-green-100'
                            : 'bg-ink/5 text-ink/40 hover:bg-ink/10'
                        }`}
                      >
                        {client.published ?? true ? (
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
                    <td className="px-8 py-6 text-sm text-ink/60">{client.order}</td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => startEdit(client)}
                          className="p-2 text-ink/40 hover:text-cyan-800 transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm('Delete this client?')) {
                              remove(client.id!);
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
              <h2 className="text-2xl font-display font-bold text-ink">{editingId ? 'Edit Client' : 'Add Client'}</h2>
              <button onClick={resetForm} className="text-ink/20 hover:text-ink">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className={`space-y-6 transition-opacity duration-300 ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-ink">Client Name</label>
                <input
                  required
                  disabled={isUploading}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-ink/5 border border-ink/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-800 disabled:cursor-not-allowed"
                  placeholder="Brand Name"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-ink">Logo Upload</label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    disabled={isUploading}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                  />
                  <div className={`w-full bg-ink/5 border border-ink/5 rounded-2xl px-6 py-4 flex items-center justify-between ${isUploading ? 'opacity-50' : ''}`}>
                    <span className="text-ink/60 truncate mr-2">
                      {formData.logoUrl ? 'Logo Selected' : 'Choose Logo...'}
                    </span>
                    <Upload size={18} className={isUploading ? 'animate-bounce text-cyan-800' : 'text-ink/40'} />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-ink">Website URL (Optional)</label>
                <input
                  disabled={isUploading}
                  value={formData.websiteUrl}
                  onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                  className="w-full bg-ink/5 border border-ink/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-800 disabled:cursor-not-allowed"
                  placeholder="https://..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-ink">Publish Status</label>
                <div className="flex items-center gap-4 p-4 bg-ink/5 rounded-2xl">
                  <input
                    type="checkbox"
                    id="published"
                    disabled={isUploading}
                    checked={formData.published ?? true}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="rounded cursor-pointer disabled:cursor-not-allowed"
                  />
                  <label htmlFor="published" className="text-sm font-bold text-ink cursor-pointer">
                    Publish this client on the website
                  </label>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  disabled={isUploading}
                  onClick={resetForm}
                  className="flex-1 bg-ink/5 text-ink px-6 py-4 rounded-full font-bold hover:bg-ink/10 transition-all disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                >
                  {editingId ? 'Update' : 'Add'} Client
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

export default ClientManager;
