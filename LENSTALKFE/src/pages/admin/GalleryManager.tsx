import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useApi, uploadFile } from '../../hooks/useApi';
import { GalleryItem } from '../../types';
import { Plus, Trash2, Edit2, X, Image as ImageIcon, Video as VideoIcon, Upload, Link as LinkIcon } from 'lucide-react';

const GalleryManager = () => {
  const { data: items, add, update, remove } = useApi<GalleryItem>('gallery');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [videoMode, setVideoMode] = useState<'upload' | 'link'>('link');
  const [formData, setFormData] = useState<Omit<GalleryItem, 'id'>>({
    title: '',
    category: 'Photos',
    type: 'image',
    mediaUrl: '',
    thumbnailUrl: '',
    order: 0,
    published: true
  });

  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'mediaUrl' | 'thumbnailUrl') => {
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
      await add({ ...formData, order: items.length + 1 });
      setIsAdding(false);
    }
    setFormData({ title: '', category: 'Photos', type: 'image', mediaUrl: '', thumbnailUrl: '', order: 0, published: true });
  };

  const startEdit = (item: GalleryItem) => {
    setEditingId(item.id!);
    // Check if the current mediaUrl looks like an external link
    const isLink = item.mediaUrl.startsWith('http') && !item.mediaUrl.includes('firebasestorage') && !item.mediaUrl.includes('/uploads/');
    setVideoMode(isLink ? 'link' : 'upload');
    setFormData({
      title: item.title,
      category: item.category,
      type: item.type,
      mediaUrl: item.mediaUrl,
      thumbnailUrl: item.thumbnailUrl || '',
      order: item.order,
      published: item.published
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-ink mb-2">Portfolio Gallery</h1>
          <p className="text-ink/40 font-medium">Manage images and videos in your portfolio.</p>
        </div>
        <button
          onClick={() => {
            setIsAdding(true);
            setVideoMode('link');
          }}
          className="bg-cyan-800 text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-ink transition-all"
        >
          <Plus size={20} /> Add New Item
        </button>
      </div>

      {/* Form Modal */}
      {(isAdding || editingId) && createPortal(
        <div className="fixed inset-0 w-screen h-screen z-[9999] flex items-center justify-center bg-ink/60 backdrop-blur-md p-4 md:p-6 overflow-y-auto">
          <div className="bg-parchment w-full max-w-2xl rounded-[2rem] p-10 shadow-2xl my-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-display font-bold text-ink">{editingId ? 'Edit Item' : 'Add New Item'}</h2>
              <button onClick={() => { setIsAdding(false); setEditingId(null); }} className="text-ink/20 hover:text-ink">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className={`space-y-6 transition-opacity duration-300 ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-ink">Title</label>
                <input
                  required
                  disabled={isUploading}
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-ink/5 border border-ink/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-800 disabled:cursor-not-allowed"
                  placeholder="Item title"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-ink">Category</label>
                  <select
                    disabled={isUploading}
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-ink/5 border border-ink/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-800 disabled:cursor-not-allowed"
                  >
                    <option value="Photos">Photos</option>
                    <option value="Reels & Videos">Reels & Videos</option>
                    <option value="Campaigns">Campaigns</option>
                    <option value="Behind the Scenes">Behind the Scenes</option>
                    <option value="Client Work">Client Work</option>
                    <option value="Events">Events</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-ink">Type</label>
                  <select
                    disabled={isUploading}
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as 'image' | 'video' })}
                    className="w-full bg-ink/5 border border-ink/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-800 disabled:cursor-not-allowed"
                  >
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                  </select>
                </div>
              </div>

              {formData.type === 'video' && (
                <div className="flex bg-ink/5 p-1 rounded-xl w-fit">
                  <button
                    type="button"
                    disabled={isUploading}
                    onClick={() => setVideoMode('link')}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${videoMode === 'link' ? 'bg-cyan-800 text-white' : 'text-ink/60'} disabled:cursor-not-allowed`}
                  >
                    Video Link
                  </button>
                  <button
                    type="button"
                    disabled={isUploading}
                    onClick={() => setVideoMode('upload')}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${videoMode === 'upload' ? 'bg-cyan-800 text-white' : 'text-ink/60'} disabled:cursor-not-allowed`}
                  >
                    Upload Video
                  </button>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-ink">
                  {formData.type === 'image' ? 'Image Upload' : videoMode === 'upload' ? 'Video Upload' : 'Video Link (YouTube/Instagram)'}
                </label>
                {formData.type === 'video' && videoMode === 'link' ? (
                  <div className="relative">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-ink/30">
                      <LinkIcon size={18} />
                    </div>
                    <input
                      required
                      disabled={isUploading}
                      value={formData.mediaUrl}
                      onChange={(e) => setFormData({ ...formData, mediaUrl: e.target.value })}
                      className="w-full bg-ink/5 border border-ink/5 rounded-2xl pl-14 pr-6 py-4 focus:outline-none focus:border-cyan-800 disabled:cursor-not-allowed"
                      placeholder="Paste YouTube or Instagram link here"
                    />
                  </div>
                ) : (
                  <div className="relative">
                    <input
                      type="file"
                      accept={formData.type === 'video' ? 'video/*' : 'image/*'}
                      onChange={(e) => handleFileUpload(e, 'mediaUrl')}
                      disabled={isUploading}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                    />
                    <div className={`w-full bg-ink/5 border border-ink/5 rounded-2xl px-6 py-4 flex items-center justify-between ${isUploading ? 'opacity-50' : ''}`}>
                      <span className="text-ink/60 truncate mr-2">
                        {formData.mediaUrl ? 'File Selected' : 'Choose a file...'}
                      </span>
                      <Upload size={18} className={isUploading ? 'animate-bounce text-cyan-800' : 'text-ink/40'} />
                    </div>
                  </div>
                )}
              </div>

              {formData.type === 'video' && (
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-ink">Thumbnail Upload (Required for Video)</label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'thumbnailUrl')}
                      disabled={isUploading}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                    />
                    <div className={`w-full bg-ink/5 border border-ink/5 rounded-2xl px-6 py-4 flex items-center justify-between ${isUploading ? 'opacity-50' : ''}`}>
                      <span className="text-ink/60 truncate mr-2">
                        {formData.thumbnailUrl ? 'Image Selected' : 'Choose an image...'}
                      </span>
                      <Upload size={18} className={isUploading ? 'animate-bounce text-cyan-800' : 'text-ink/40'} />
                    </div>
                  </div>
                </div>
              )}

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
                {isUploading ? 'Processing...' : (editingId ? 'Save Changes' : 'Create Item')}
              </button>
            </form>
          </div>
        </div>,
        document.getElementById('modal-root')!
      )}

      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.sort((a, b) => a.order - b.order).map((item) => (
          <div key={item.id} className="bg-white rounded-3xl shadow-sm border border-ink/5 overflow-hidden group">
            <div className="aspect-square bg-ink/5 relative">
              <img
                src={item.type === 'video' ? item.thumbnailUrl : item.mediaUrl}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 right-4 flex gap-2 transition-opacity">
                <button onClick={() => startEdit(item)} className="p-2 bg-white rounded-full text-ink hover:text-cyan-800 shadow-lg">
                  <Edit2 size={16} />
                </button>
                <button onClick={() => remove(item.id!)} className="p-2 bg-white rounded-full text-ink hover:text-red-500 shadow-lg">
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${item.published ? 'bg-cyan-800 text-white' : 'bg-ink/40 text-white'}`}>
                  {item.published ? 'Published' : 'Draft'}
                </span>
              </div>
              {item.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur flex items-center justify-center text-white border border-white/20">
                    <VideoIcon size={24} />
                  </div>
                </div>
              )}
            </div>
            <div className="p-6">
              <span className="text-cyan-800 font-bold text-[10px] uppercase tracking-widest">{item.category}</span>
              <h3 className="font-bold text-ink truncate">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryManager;
