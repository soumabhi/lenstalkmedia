import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useApi, uploadFile } from '../../hooks/useApi';
import { Campaign } from '../../types';
import { Plus, Trash2, Edit2, X, Image as ImageIcon, Video as VideoIcon, Upload } from 'lucide-react';

const CampaignManager = () => {
  const { data: campaigns, add, update, remove } = useApi<Campaign>('campaigns');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Campaign, 'id'>>({
    title: '',
    slug: '',
    clientName: '',
    description: '',
    category: 'Social Media Campaigns',
    feedImages: [],
    reelUrls: [],
    staticPosts: [],
    thumbnailUrl: '',
    order: 0,
    published: true
  });

  // Temp fields for adding URLs one at a time
  const [tempFeedUrl, setTempFeedUrl] = useState('');
  const [tempReelUrl, setTempReelUrl] = useState('');
  const [tempPostUrl, setTempPostUrl] = useState('');
  
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'thumbnailUrl' | 'feedImages' | 'staticPosts') => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const url = await uploadFile(file);
      if (field === 'thumbnailUrl') {
        setFormData({ ...formData, thumbnailUrl: url });
      } else {
        setFormData({ ...formData, [field]: [...formData[field], url] });
      }
    } catch (err) {
      alert('Failed to upload file');
    } finally {
      setIsUploading(false);
      // Reset input
      e.target.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const slug = formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const data = { ...formData, slug };

    if (editingId) {
      await update(editingId, data);
      setEditingId(null);
    } else {
      await add({ ...data, order: campaigns.length + 1 });
      setIsAdding(false);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '', slug: '', clientName: '', description: '',
      category: 'Social Media Campaigns', feedImages: [], reelUrls: [],
      staticPosts: [], thumbnailUrl: '', order: 0, published: true
    });
    setTempFeedUrl('');
    setTempReelUrl('');
    setTempPostUrl('');
  };

  const startEdit = (campaign: Campaign) => {
    setEditingId(campaign.id!);
    setFormData({
      title: campaign.title,
      slug: campaign.slug,
      clientName: campaign.clientName,
      description: campaign.description,
      category: campaign.category,
      feedImages: campaign.feedImages || [],
      reelUrls: campaign.reelUrls || [],
      staticPosts: campaign.staticPosts || [],
      thumbnailUrl: campaign.thumbnailUrl,
      order: campaign.order,
      published: campaign.published
    });
  };

  const addUrl = (field: 'feedImages' | 'reelUrls' | 'staticPosts', url: string) => {
    if (!url.trim()) return;
    setFormData({ ...formData, [field]: [...formData[field], url.trim()] });
  };

  const removeUrl = (field: 'feedImages' | 'reelUrls' | 'staticPosts', index: number) => {
    setFormData({ ...formData, [field]: formData[field].filter((_, i) => i !== index) });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-ink mb-2">Campaign Manager</h1>
          <p className="text-ink/40 font-medium">Manage campaign portfolios with feeds, reels, and static posts.</p>
        </div>
        <button
          onClick={() => { setIsAdding(true); resetForm(); }}
          className="bg-cyan-800 text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-ink transition-all"
        >
          <Plus size={20} /> Add Campaign
        </button>
      </div>

      {/* Form Modal */}
      {(isAdding || editingId) && createPortal(
        <div className="fixed inset-0 w-screen h-screen z-[9999] flex items-center justify-center bg-ink/60 backdrop-blur-md p-4 md:p-6 overflow-y-auto">
          <div className="bg-parchment w-full max-w-3xl rounded-[2rem] p-10 shadow-2xl my-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-display font-bold text-ink">{editingId ? 'Edit Campaign' : 'Add New Campaign'}</h2>
              <button onClick={() => { setIsAdding(false); setEditingId(null); resetForm(); }} className="text-ink/20 hover:text-ink">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className={`space-y-6 transition-opacity duration-300 ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-ink">Campaign Title</label>
                  <input
                    required
                    disabled={isUploading}
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-ink/5 border border-ink/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-800 disabled:cursor-not-allowed"
                    placeholder="e.g. NIF Global Bhubaneswar"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-ink">Client Name</label>
                  <input
                    required
                    disabled={isUploading}
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    className="w-full bg-ink/5 border border-ink/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-800 disabled:cursor-not-allowed"
                    placeholder="e.g. NIF Global"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-ink">Category</label>
                  <select
                    disabled={isUploading}
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as Campaign['category'] })}
                    className="w-full bg-ink/5 border border-ink/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-800 disabled:cursor-not-allowed"
                  >
                    <option value="Social Media Campaigns">Social Media Campaigns</option>
                    <option value="Video Ads">Video Ads</option>
                    <option value="Documentary">Documentary</option>
                    <option value="Influencer">Influencer</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-ink">Thumbnail Image</label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'thumbnailUrl')}
                      disabled={isUploading}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                    />
                    <div className="w-full bg-ink/5 border border-ink/5 rounded-2xl px-6 py-4 flex items-center justify-between">
                      <span className="text-ink/60 truncate mr-2">
                        {formData.thumbnailUrl ? 'Image Selected' : 'Choose an image...'}
                      </span>
                      <Upload size={18} className={isUploading ? 'animate-bounce text-cyan-800' : 'text-ink/40'} />
                    </div>
                  </div>
                  {formData.thumbnailUrl && (
                    <img src={formData.thumbnailUrl} alt="Thumbnail preview" className="w-16 h-16 object-cover rounded-lg mt-2" />
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-ink">Description</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full bg-ink/5 border border-ink/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-800 resize-none"
                  placeholder="Campaign description..."
                />
              </div>

              {/* Feed Images */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-ink">Feed Images</label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'feedImages')}
                    disabled={isUploading}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
                  />
                  <div className="w-full bg-ink/5 border border-ink/5 rounded-2xl px-6 py-3 flex items-center justify-center gap-2 hover:bg-ink/10 transition-colors">
                    <Upload size={18} className={isUploading ? 'animate-bounce text-cyan-800' : 'text-ink/60'} />
                    <span className="font-bold text-ink/60">Upload Feed Image</span>
                  </div>
                </div>
                {formData.feedImages.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.feedImages.map((url, i) => (
                      <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-ink/10 group">
                        <img src={url} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        <button
                          type="button"
                          onClick={() => removeUrl('feedImages', i)}
                          className="absolute inset-0 bg-red/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Reel URLs */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-ink">Reel URLs (Instagram / YouTube)</label>
                <div className="flex gap-2">
                  <input
                    value={tempReelUrl}
                    onChange={(e) => setTempReelUrl(e.target.value)}
                    className="flex-1 bg-ink/5 border border-ink/5 rounded-2xl px-6 py-3 focus:outline-none focus:border-cyan-800"
                    placeholder="Reel URL..."
                  />
                  <button
                    type="button"
                    onClick={() => { addUrl('reelUrls', tempReelUrl); setTempReelUrl(''); }}
                    className="bg-cyan-800 text-white px-4 py-3 rounded-2xl font-bold hover:bg-ink transition-all"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                {formData.reelUrls.length > 0 && (
                  <div className="space-y-2 mt-2">
                    {formData.reelUrls.map((url, i) => (
                      <div key={i} className="flex items-center gap-2 bg-ink/5 rounded-xl px-4 py-2 text-sm">
                        <VideoIcon size={14} className="text-ink/40 shrink-0" />
                        <span className="text-ink/60 truncate flex-1">{url}</span>
                        <button type="button" onClick={() => removeUrl('reelUrls', i)} className="text-red hover:text-red/80">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Static Posts */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-ink">Static Posts (Upload Images)</label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'staticPosts')}
                    disabled={isUploading}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
                  />
                  <div className="w-full bg-ink/5 border border-ink/5 rounded-2xl px-6 py-3 flex items-center justify-center gap-2 hover:bg-ink/10 transition-colors">
                    <Upload size={18} className={isUploading ? 'animate-bounce text-cyan-800' : 'text-ink/60'} />
                    <span className="font-bold text-ink/60">Upload Static Post</span>
                  </div>
                </div>
                {formData.staticPosts.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.staticPosts.map((url, i) => (
                      <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-ink/10 group">
                        <img src={url} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        <button
                          type="button"
                          onClick={() => removeUrl('staticPosts', i)}
                          className="absolute inset-0 bg-red/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="campaign-published"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="w-5 h-5 accent-cyan-800"
                />
                <label htmlFor="campaign-published" className="text-sm font-bold text-ink">Published</label>
              </div>

              <button
                type="submit"
                className="w-full bg-cyan-800 text-white rounded-full py-5 font-bold text-lg hover:bg-ink transition-all"
              >
                {editingId ? 'Save Changes' : 'Create Campaign'}
              </button>
            </form>
          </div>
        </div>,
        document.getElementById('modal-root')!
      )}

      {/* Campaign cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.sort((a, b) => a.order - b.order).map((campaign) => (
          <div key={campaign.id} className="bg-white rounded-3xl shadow-sm border border-ink/5 overflow-hidden group">
            <div className="aspect-video bg-ink/5 relative">
              <img src={campaign.thumbnailUrl} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <div className="absolute top-4 right-4 flex gap-2 transition-opacity">
                <button onClick={() => startEdit(campaign)} className="p-2 bg-white rounded-full text-ink hover:text-cyan-800 shadow-lg">
                  <Edit2 size={16} />
                </button>
                <button onClick={() => remove(campaign.id!)} className="p-2 bg-white rounded-full text-ink hover:text-red-500 shadow-lg">
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${campaign.published ? 'bg-cyan-800 text-white' : 'bg-ink/40 text-white'}`}>
                  {campaign.published ? 'Published' : 'Draft'}
                </span>
              </div>
            </div>
            <div className="p-6">
              <span className="text-cyan-800 font-bold text-[10px] uppercase tracking-widest">{campaign.category}</span>
              <h3 className="font-bold text-ink">{campaign.title}</h3>
              <p className="text-ink/40 text-xs mt-1">{campaign.clientName}</p>
              <div className="flex items-center gap-3 mt-3 text-xs text-ink/30">
                <span className="flex items-center gap-1"><ImageIcon size={12} /> {campaign.feedImages?.length || 0} feeds</span>
                <span className="flex items-center gap-1"><VideoIcon size={12} /> {campaign.reelUrls?.length || 0} reels</span>
                <span className="flex items-center gap-1"><ImageIcon size={12} /> {campaign.staticPosts?.length || 0} posts</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {campaigns.length === 0 && (
        <div className="text-center py-16">
          <p className="text-ink/30 text-lg">No campaigns yet. Add your first campaign to get started.</p>
        </div>
      )}
    </div>
  );
};

export default CampaignManager;
