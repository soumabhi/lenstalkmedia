import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useApi, uploadFile } from '../../hooks/useApi';
import { BlogPost } from '../../types';
import { Plus, Trash2, Edit2, X, FileText, Globe, Eye, Upload } from 'lucide-react';
import { format } from 'date-fns';

const BlogManager = () => {
  const { data: posts, loading, add, update, remove } = useApi<BlogPost>('blog_posts');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<BlogPost, 'id'>>({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    featuredImage: '',
    author: 'Lenstalk Team',
    category: 'Strategy',
    tags: [],
    publishedAt: new Date().toISOString(),
    published: true
  });

  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const url = await uploadFile(file);
      setFormData({ ...formData, featuredImage: url });
    } catch (err) {
      alert('Failed to upload file');
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const slug = formData.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    const data = { ...formData, slug };
    
    if (editingId) {
      await update(editingId, data);
      setEditingId(null);
    } else {
      await add(data);
      setIsAdding(false);
    }
    setFormData({ title: '', slug: '', content: '', excerpt: '', featuredImage: '', author: 'Lenstalk Team', category: 'Strategy', tags: [], publishedAt: new Date().toISOString(), published: true });
  };

  const startEdit = (post: BlogPost) => {
    setEditingId(post.id || (post as any)._id);
    setFormData({
      title: post.title,
      slug: post.slug,
      content: post.content,
      excerpt: post.excerpt,
      featuredImage: post.featuredImage,
      author: post.author,
      category: post.category,
      tags: post.tags,
      publishedAt: post.publishedAt || (post as any).createdAt,
      published: post.published
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-display font-black text-ink mb-2 uppercase tracking-tight">Blog Posts</h1>
          <p className="text-ink/40 font-medium tracking-wide">Write and manage agency insights.</p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-red text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-ink transition-all shadow-xl shadow-red/20 active:scale-95"
        >
          <Plus size={18} strokeWidth={3} /> New Article
        </button>
      </div>

      {/* Articles List */}
      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-ink/5 border border-ink/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-ink/5 text-ink/40 text-[10px] font-black uppercase tracking-[0.2em]">
                <th className="px-10 py-6">Article</th>
                <th className="px-10 py-6">Category</th>
                <th className="px-10 py-6">Date</th>
                <th className="px-10 py-6">Status</th>
                <th className="px-10 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/5">
              {posts.map((post) => (
                <tr key={post.id || (post as any)._id} className="hover:bg-ink/[0.01] transition-colors group">
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-6">
                      <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-lg group-hover:scale-105 transition-transform duration-500">
                        <img src={post.featuredImage} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div>
                        <div className="font-black text-ink text-lg leading-tight mb-1">{post.title}</div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-ink/30">By {post.author}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <span className="px-4 py-1.5 bg-red/5 rounded-full text-[10px] font-black uppercase tracking-widest text-red">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-10 py-8 text-sm font-bold text-ink/40">
                    {format(new Date(post.publishedAt || (post as any).createdAt), 'MMM dd, yyyy')}
                  </td>
                  <td className="px-10 py-8">
                    <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${post.published ? 'text-green-500' : 'text-ink/20'}`}>
                      <div className={`w-2 h-2 rounded-full ${post.published ? 'bg-green-500' : 'bg-ink/20 shadow-sm'}`} />
                      {post.published ? 'Published' : 'Draft'}
                    </div>
                  </td>
                  <td className="px-10 py-8 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button 
                        onClick={() => startEdit(post)} 
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-ink/5 text-ink/20 hover:bg-red hover:text-white transition-all shadow-sm"
                        title="Edit Article"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => remove(post.id || (post as any)._id!)} 
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-ink/5 text-ink/20 hover:bg-ink hover:text-white transition-all shadow-sm"
                        title="Delete Article"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {posts.length === 0 && !loading && (
          <div className="p-32 text-center">
            <div className="w-20 h-20 bg-ink/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText size={32} className="text-ink/10" />
            </div>
            <div className="text-ink/20 font-black uppercase tracking-[0.2em] text-sm">No articles found</div>
            <button onClick={() => setIsAdding(true)} className="mt-4 text-red font-bold hover:underline">Create your first post</button>
          </div>
        )}
      </div>

      {/* Form Modal */}
      {(isAdding || editingId) && createPortal(
        <div className="fixed inset-0 w-screen h-screen z-[9999] flex items-center justify-center bg-ink/60 backdrop-blur-md p-4 md:p-6 animate-in fade-in duration-300 overflow-y-auto">
          <div className="bg-parchment w-full max-w-5xl rounded-[3rem] p-12 shadow-2xl my-auto border border-white/20 relative">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-display font-black text-ink uppercase tracking-tight">{editingId ? 'Edit Article' : 'New Article'}</h2>
                <div className="h-1 w-20 bg-red mt-2 rounded-full" />
              </div>
              <button 
                onClick={() => { setIsAdding(false); setEditingId(null); }} 
                className="w-12 h-12 flex items-center justify-center rounded-full bg-ink/5 text-ink/20 hover:bg-red hover:text-white transition-all"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className={`space-y-10 transition-all duration-500 ${isUploading ? 'opacity-40 pointer-events-none grayscale' : ''}`}>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-ink/40 ml-4">Article Title</label>
                <input
                  required
                  disabled={isUploading}
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-white border-2 border-ink/5 rounded-3xl px-8 py-6 focus:outline-none focus:border-red text-2xl font-black text-ink transition-all shadow-sm disabled:cursor-not-allowed"
                  placeholder="The Art of Visual Excellence..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-ink/40 ml-4">Category</label>
                  <select
                    disabled={isUploading}
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-white border-2 border-ink/5 rounded-2xl px-8 py-5 focus:outline-none focus:border-red font-bold text-ink appearance-none shadow-sm disabled:cursor-not-allowed"
                  >
                    <option value="Strategy">Strategy</option>
                    <option value="Creative">Creative</option>
                    <option value="Influencer">Influencer</option>
                    <option value="Production">Production</option>
                    <option value="News">Agency News</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-ink/40 ml-4">Author</label>
                  <input
                    disabled={isUploading}
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full bg-white border-2 border-ink/5 rounded-2xl px-8 py-5 focus:outline-none focus:border-red font-bold text-ink shadow-sm disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-ink/40 ml-4">Featured Image</label>
                <div className="relative group">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    disabled={isUploading}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
                  />
                  <div className={`w-full bg-white border-2 border-dashed border-ink/10 rounded-3xl p-8 flex flex-col items-center justify-center gap-4 group-hover:border-red/30 transition-all ${isUploading ? 'opacity-50' : ''}`}>
                    {formData.featuredImage ? (
                      <div className="relative w-full h-48 rounded-2xl overflow-hidden">
                        <img src={formData.featuredImage} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-ink/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-white font-black uppercase tracking-widest text-xs">Change Image</span>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="w-16 h-16 bg-red/5 rounded-2xl flex items-center justify-center text-red">
                          <Upload size={32} />
                        </div>
                        <div className="text-center">
                          <div className="font-black text-ink uppercase tracking-widest text-xs mb-1">Click to upload</div>
                          <div className="text-[10px] text-ink/30 font-bold uppercase tracking-widest">PNG, JPG up to 10MB</div>
                        </div>
                      </>
                    )}
                  </div>
                  {isUploading && (
                    <div className="absolute inset-0 bg-parchment/80 backdrop-blur-sm rounded-3xl flex items-center justify-center z-20">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-4 border-red/20 border-t-red rounded-full animate-spin" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-ink">Uploading...</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-ink/40 ml-4">Short Excerpt</label>
                <textarea
                  required
                  disabled={isUploading}
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full bg-white border-2 border-ink/5 rounded-3xl px-8 py-6 focus:outline-none focus:border-red resize-none font-bold text-ink shadow-sm disabled:cursor-not-allowed"
                  rows={2}
                  placeholder="A high-impact summary for the grid view..."
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-ink/40 ml-4">Full Content (Markdown Supported)</label>
                <textarea
                  required
                  disabled={isUploading}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full bg-white border-2 border-ink/5 rounded-3xl px-8 py-8 focus:outline-none focus:border-red resize-none font-mono text-sm shadow-sm disabled:cursor-not-allowed"
                  rows={12}
                  placeholder="### The Story Begins..."
                />
              </div>

              <div className="flex items-center gap-4 ml-4">
                <div className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    id="published"
                    disabled={isUploading}
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-8 bg-ink/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-500"></div>
                  <label htmlFor="published" className="ml-3 text-[10px] font-black uppercase tracking-[0.2em] text-ink">Published Status</label>
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full bg-red text-white rounded-full py-6 font-black text-xl uppercase tracking-[0.2em] hover:bg-ink transition-all shadow-2xl shadow-red/20 active:scale-[0.98]"
                >
                  {editingId ? 'Update Masterpiece' : 'Release to World'}
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

export default BlogManager;
