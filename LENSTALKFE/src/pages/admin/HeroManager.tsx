import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useApi, uploadFile } from '../../hooks/useApi';
import { HeroSlide } from '../../types';
import { Plus, Trash2, Edit2, Save, X, MoveUp, MoveDown, Upload } from 'lucide-react';

const HeroManager = () => {
  const { data: slides, add, update, remove } = useApi<HeroSlide>('hero');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<HeroSlide, 'id'>>({
    title: '',
    subtitle: '',
    category: '',
    imageUrl: '',
    videoUrl: '',
    ctaText: '',
    ctaLink: '',
    order: 0
  });

  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'imageUrl' | 'videoUrl') => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const url = await uploadFile(file);
      setFormData({ ...formData, [field]: url });
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
      await add({ ...formData, order: slides.length + 1 });
      setIsAdding(false);
    }
    setFormData({ title: '', subtitle: '', imageUrl: '', videoUrl: '', ctaText: '', ctaLink: '', order: 0 });
  };

  const startEdit = (slide: HeroSlide) => {
    setEditingId((slide as any)._id || slide.id!);
    setFormData({
      title: slide.title,
      subtitle: slide.subtitle,
      category: slide.category || '',
      imageUrl: slide.imageUrl || '',
      videoUrl: slide.videoUrl || '',
      ctaText: slide.ctaText || '',
      ctaLink: slide.ctaLink || '',
      order: slide.order
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-ink mb-2">Hero Slides</h1>
          <p className="text-ink/40 font-medium">Manage the main carousel on the home page.</p>
        </div>
        <div className="flex items-center gap-4">

          <button
            onClick={() => setIsAdding(true)}
            className="bg-cyan-800 text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-ink transition-all"
          >
            <Plus size={20} /> Add New Slide
          </button>
        </div>
      </div>

      {/* Form Modal */}
      {(isAdding || editingId) && createPortal(
        <div className="fixed inset-0 w-screen h-screen z-[9999] flex items-center justify-center bg-ink/60 backdrop-blur-md p-4 md:p-6 overflow-y-auto">
          <div className="bg-parchment w-full max-w-2xl rounded-[2rem] p-10 shadow-2xl my-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-display font-bold text-ink">{editingId ? 'Edit Slide' : 'Add New Slide'}</h2>
              <button onClick={() => { setIsAdding(false); setEditingId(null); }} className="text-ink/20 hover:text-ink">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className={`space-y-6 transition-opacity duration-300 ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-ink">Headline</label>
                <input
                  required
                  disabled={isUploading}
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-ink/5 border border-ink/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-800 disabled:cursor-not-allowed"
                  placeholder="Main heading text"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-ink">Subheadline</label>
                <textarea
                  required
                  disabled={isUploading}
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full bg-ink/5 border border-ink/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-800 resize-none disabled:cursor-not-allowed"
                  rows={3}
                  placeholder="Subtext below heading"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-ink">Category / Label</label>
                <input
                  disabled={isUploading}
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-ink/5 border border-ink/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-800 disabled:cursor-not-allowed"
                  placeholder="e.g. FESTIVAL, AGENCY, PRODUCTION"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-ink">Image Upload</label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'imageUrl')}
                      disabled={isUploading}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                    />
                    <div className={`w-full bg-ink/5 border border-ink/5 rounded-2xl px-6 py-4 flex items-center justify-between ${isUploading ? 'opacity-50' : ''}`}>
                      <span className="text-ink/60 truncate mr-2">
                        {formData.imageUrl ? 'Image Selected' : 'Choose Image...'}
                      </span>
                      <Upload size={18} className={isUploading ? 'animate-bounce text-cyan-800' : 'text-ink/40'} />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-ink">Video Upload (Optional)</label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => handleFileUpload(e, 'videoUrl')}
                      disabled={isUploading}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                    />
                    <div className={`w-full bg-ink/5 border border-ink/5 rounded-2xl px-6 py-4 flex items-center justify-between ${isUploading ? 'opacity-50' : ''}`}>
                      <span className="text-ink/60 truncate mr-2">
                        {formData.videoUrl ? 'Video Selected' : 'Choose Video...'}
                      </span>
                      <Upload size={18} className={isUploading ? 'animate-bounce text-cyan-800' : 'text-ink/40'} />
                    </div>
                  </div>
                </div>
              </div>


              <button
                type="submit"
                disabled={isUploading}
                className="w-full bg-cyan-800 text-white rounded-full py-5 font-bold text-lg hover:bg-ink transition-all disabled:bg-ink/20 disabled:cursor-not-allowed"
              >
                {isUploading ? 'Processing...' : (editingId ? 'Save Changes' : 'Create Slide')}
              </button>
            </form>
          </div>
        </div>,
        document.getElementById('modal-root')!
      )}

      {/* Slides List */}
      <div className="grid grid-cols-1 gap-6">
        {slides.sort((a, b) => a.order - b.order).map((slide) => (
          <div key={slide.id} className="bg-white p-6 rounded-3xl shadow-sm border border-ink/5 flex items-center gap-6">
            <div className="w-32 h-20 rounded-xl overflow-hidden bg-ink/5 shrink-0">
              {slide.imageUrl && <img src={slide.imageUrl} className="w-full h-full object-cover" referrerPolicy="no-referrer" />}
            </div>
            <div className="flex-grow">
              <h3 className="font-bold text-ink">{slide.title}</h3>
              <p className="text-xs text-ink/40 line-clamp-1">{slide.subtitle}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => startEdit(slide)} className="p-2 text-ink/20 hover:text-cyan-800 transition-colors">
                <Edit2 size={18} />
              </button>
              <button onClick={() => remove((slide as any)._id || slide.id!)} className="p-2 text-ink/20 hover:text-red-500 transition-colors">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
        {slides.length === 0 && (
          <div className="bg-white p-20 rounded-[3rem] border border-dashed border-ink/10 text-center text-ink/20 font-bold uppercase tracking-widest">
            No slides added yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroManager;
