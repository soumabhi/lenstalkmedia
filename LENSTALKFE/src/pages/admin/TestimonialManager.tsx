import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useApi, uploadFile } from '../../hooks/useApi';
import { Testimonial } from '../../types';
import { Plus, Trash2, Edit2, X, Quote, Upload } from 'lucide-react';

const TestimonialManager = () => {
  const { data: testimonials, add, update, remove } = useApi<Testimonial>('testimonials');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Testimonial, 'id'>>({
    name: '',
    role: '',
    company: '',
    content: '',
    avatarUrl: '',
    rating: 5,
    order: 0
  });

  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const url = await uploadFile(file);
      setFormData({ ...formData, avatarUrl: url });
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
      await add({ ...formData, order: testimonials.length + 1 });
      setIsAdding(false);
    }
    setFormData({ name: '', role: '', company: '', content: '', avatarUrl: '', rating: 5, order: 0 });
  };

  const startEdit = (t: Testimonial) => {
    setEditingId(t.id!);
    setFormData({
      name: t.name,
      role: t.role,
      company: t.company,
      content: t.content,
      avatarUrl: t.avatarUrl || '',
      rating: t.rating,
      order: t.order
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-ink mb-2">Testimonials</h1>
          <p className="text-ink/40 font-medium">What clients say about Lenstalk Media.</p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-cyan-800 text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-ink transition-all"
        >
          <Plus size={20} /> Add Testimonial
        </button>
      </div>

      {/* Form Modal */}
      {(isAdding || editingId) && createPortal(
        <div className="fixed inset-0 w-screen h-screen z-[9999] flex items-center justify-center bg-ink/60 backdrop-blur-md p-4 md:p-6 overflow-y-auto">
          <div className="bg-parchment w-full max-w-2xl rounded-[2rem] p-10 shadow-2xl my-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-display font-bold text-ink">{editingId ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
              <button onClick={() => { setIsAdding(false); setEditingId(null); }} className="text-ink/20 hover:text-ink">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className={`space-y-6 transition-opacity duration-300 ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-ink">Client Name</label>
                  <input
                    required
                    disabled={isUploading}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-ink/5 border border-ink/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-800 disabled:cursor-not-allowed"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-ink">Role / Designation</label>
                  <input
                    required
                    disabled={isUploading}
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full bg-ink/5 border border-ink/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-800 disabled:cursor-not-allowed"
                    placeholder="Marketing Manager"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-ink">Company</label>
                  <input
                    required
                    disabled={isUploading}
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-ink/5 border border-ink/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-800 disabled:cursor-not-allowed"
                    placeholder="Brand Name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-ink">Rating (1-5)</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    disabled={isUploading}
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                    className="w-full bg-ink/5 border border-ink/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-800 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-ink">Avatar Upload</label>
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
                      {formData.avatarUrl ? 'Avatar Selected' : 'Choose Photo...'}
                    </span>
                    <Upload size={18} className={isUploading ? 'animate-bounce text-cyan-800' : 'text-ink/40'} />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-ink">Testimonial Content</label>
                <textarea
                  required
                  disabled={isUploading}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full bg-ink/5 border border-ink/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-800 resize-none disabled:cursor-not-allowed"
                  rows={4}
                  placeholder="What did they say about us?"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="published"
                  disabled={isUploading}
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="w-5 h-5 accent-cyan-800 disabled:cursor-not-allowed"
                />
                <label htmlFor="published" className="text-sm font-bold text-ink">Published</label>
              </div>

              <button
                type="submit"
                disabled={isUploading}
                className="w-full bg-cyan-800 text-white rounded-full py-5 font-bold text-lg hover:bg-ink transition-all disabled:bg-ink/20 disabled:cursor-not-allowed"
              >
                {isUploading ? 'Processing...' : (editingId ? 'Save Changes' : 'Add Testimonial')}
              </button>
            </form>
          </div>
        </div>,
        document.getElementById('modal-root')!
      )}

      {/* Testimonials List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((t) => (
          <div key={t.id} className="bg-white rounded-[2rem] p-8 shadow-sm border border-ink/5 relative group">
            <Quote className="text-cyan-800/20 absolute top-8 right-8" size={40} />
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-ink/5 overflow-hidden">
                {t.avatarUrl ? (
                  <img src={t.avatarUrl} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-ink/20 font-bold text-xl">
                    {t.name.charAt(0)}
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-bold text-ink">{t.name}</h3>
                <p className="text-xs text-ink/40 font-medium">{t.role}, {t.company}</p>
              </div>
            </div>
            <p className="text-ink/60 leading-relaxed italic mb-6">"{t.content}"</p>
            <div className="flex items-center gap-1 text-yellow-callout">
              {[...Array(t.rating)].map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>

            <div className="absolute top-4 right-4 flex gap-2 transition-opacity">
              <button onClick={() => startEdit(t)} className="p-2 bg-white rounded-full text-ink hover:text-cyan-800 shadow-lg">
                <Edit2 size={16} />
              </button>
              <button onClick={() => remove(t.id!)} className="p-2 bg-white rounded-full text-ink hover:text-red-500 shadow-lg">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialManager;
