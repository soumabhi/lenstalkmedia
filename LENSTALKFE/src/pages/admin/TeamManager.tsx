import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useApi, uploadFile } from '../../hooks/useApi';
import { TeamMember } from '../../types';
import { Plus, Trash2, Edit2, X, Linkedin, Instagram, Twitter, Upload } from 'lucide-react';

const TeamManager = () => {
  const { data: members, add, update, remove } = useApi<TeamMember>('team');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<TeamMember, 'id'>>({
    name: '',
    role: '',
    photoUrl: '',
    bio: '',
    socials: { linkedin: '', instagram: '', twitter: '' },
    order: 0
  });

  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const url = await uploadFile(file);
      setFormData({ ...formData, photoUrl: url });
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
      await add({ ...formData, order: members.length + 1 });
      setIsAdding(false);
    }
    setFormData({ name: '', role: '', photoUrl: '', bio: '', socials: { linkedin: '', instagram: '', twitter: '' }, order: 0 });
  };

  const startEdit = (m: TeamMember) => {
    setEditingId(m.id!);
    setFormData({
      name: m.name,
      role: m.role,
      photoUrl: m.photoUrl,
      bio: m.bio || '',
      socials: m.socials || { linkedin: '', instagram: '', twitter: '' },
      order: m.order
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-ink mb-2">Team Members</h1>
          <p className="text-ink/40 font-medium">The creative minds behind Lenstalk Media.</p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-cyan-800 text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-ink transition-all"
        >
          <Plus size={20} /> Add Member
        </button>
      </div>

      {/* Form Modal */}
      {(isAdding || editingId) && createPortal(
        <div className="fixed inset-0 w-screen h-screen z-[9999] flex items-center justify-center bg-ink/60 backdrop-blur-md p-4 md:p-6 overflow-y-auto">
          <div className="bg-parchment w-full max-w-2xl rounded-[2rem] p-10 shadow-2xl my-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-display font-bold text-ink">{editingId ? 'Edit Member' : 'Add Member'}</h2>
              <button onClick={() => { setIsAdding(false); setEditingId(null); }} className="text-ink/20 hover:text-ink">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className={`space-y-6 transition-opacity duration-300 ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-ink">Full Name</label>
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
                  <label className="text-xs font-bold uppercase tracking-widest text-ink">Role / Position</label>
                  <input
                    required
                    disabled={isUploading}
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full bg-ink/5 border border-ink/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-800 disabled:cursor-not-allowed"
                    placeholder="Creative Director"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-ink">Photo Upload</label>
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
                      {formData.photoUrl ? 'Photo Selected' : 'Choose Photo...'}
                    </span>
                    <Upload size={18} className={isUploading ? 'animate-bounce text-cyan-800' : 'text-ink/40'} />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-ink">Bio (Optional)</label>
                <textarea
                  disabled={isUploading}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full bg-ink/5 border border-ink/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-800 resize-none disabled:cursor-not-allowed"
                  rows={3}
                  placeholder="Short introduction..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-ink">LinkedIn</label>
                  <input
                    disabled={isUploading}
                    value={formData.socials?.linkedin}
                    onChange={(e) => setFormData({ ...formData, socials: { ...formData.socials!, linkedin: e.target.value } })}
                    className="w-full bg-ink/5 border border-ink/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-800 disabled:cursor-not-allowed"
                    placeholder="URL"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-ink">Instagram</label>
                  <input
                    disabled={isUploading}
                    value={formData.socials?.instagram}
                    onChange={(e) => setFormData({ ...formData, socials: { ...formData.socials!, instagram: e.target.value } })}
                    className="w-full bg-ink/5 border border-ink/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-800 disabled:cursor-not-allowed"
                    placeholder="URL"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-ink">Twitter/X</label>
                  <input
                    disabled={isUploading}
                    value={formData.socials?.twitter}
                    onChange={(e) => setFormData({ ...formData, socials: { ...formData.socials!, twitter: e.target.value } })}
                    className="w-full bg-ink/5 border border-ink/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-800 disabled:cursor-not-allowed"
                    placeholder="URL"
                  />
                </div>
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
                {isUploading ? 'Processing...' : (editingId ? 'Save Changes' : 'Add Member')}
              </button>
            </form>
          </div>
        </div>,
        document.getElementById('modal-root')!
      )}

      {/* Team Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {members.sort((a, b) => a.order - b.order).map((member) => (
          <div key={member.id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-ink/5 group relative">
            <div className="aspect-[4/5] bg-ink/5 overflow-hidden">
              <img src={member.photoUrl} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
            </div>
            <div className="p-6">
              <h3 className="font-bold text-ink text-lg">{member.name}</h3>
              <p className="text-xs text-cyan-800 font-bold uppercase tracking-widest mb-4">{member.role}</p>
              
              <div className="flex items-center gap-3">
                {member.socials?.linkedin && <Linkedin size={16} className="text-ink/20 hover:text-cyan-800 cursor-pointer" />}
                {member.socials?.instagram && <Instagram size={16} className="text-ink/20 hover:text-cyan-800 cursor-pointer" />}
                {member.socials?.twitter && <Twitter size={16} className="text-ink/20 hover:text-cyan-800 cursor-pointer" />}
              </div>
            </div>

            <div className="absolute top-4 right-4 flex gap-2 transition-opacity">
              <button onClick={() => startEdit(member)} className="p-2 bg-white rounded-full text-ink hover:text-cyan-800 shadow-lg">
                <Edit2 size={16} />
              </button>
              <button onClick={() => remove(member.id!)} className="p-2 bg-white rounded-full text-ink hover:text-red-500 shadow-lg">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamManager;
