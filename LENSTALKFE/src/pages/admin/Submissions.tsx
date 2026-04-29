import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useApi } from '../../hooks/useApi';
import { ContactSubmission } from '../../types';
import { format } from 'date-fns';
import { Trash2, Eye, Mail, Phone, Building, X, MessageSquare, Calendar, UserCheck, Zap, Search } from 'lucide-react';

const Submissions = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'new' | 'read' | 'replied' | 'archived'>('all');

  const { data: submissions, pagination, loading, update, remove } = useApi<ContactSubmission>('submissions', {
    page: currentPage,
    limit: 10,
    search: searchQuery,
    status: filterStatus === 'all' ? undefined : filterStatus,
    sort: '-createdAt'
  });

  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);

  const statusConfig = {
    new: { label: 'New', color: 'bg-blue-50', text: 'text-blue-600', icon: '●' },
    read: { label: 'Read', color: 'bg-cyan-50', text: 'text-cyan-600', icon: '👁' },
    replied: { label: 'Replied', color: 'bg-green-50', text: 'text-green-600', icon: '✓' },
    archived: { label: 'Archived', color: 'bg-ink/5', text: 'text-ink/40', icon: '×' },
  };

  const handleStatusChange = async (id: string, status: ContactSubmission['status']) => {
    await update(id, { status });
    if (selectedSubmission?.id === id) {
      setSelectedSubmission(prev => prev ? { ...prev, status } : null);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this submission?')) {
      await remove(id);
      if (selectedSubmission?.id === id) setSelectedSubmission(null);
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8">
        <div className="space-y-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-ink mb-2">Submissions</h1>
            <p className="text-ink/40 font-medium">Manage and track all contact form inquiries.</p>
          </div>

          <div className="relative max-w-md group">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-ink/20 group-focus-within:text-cyan-800 transition-colors">
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder="Search by name, email..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
              className="w-full bg-white border border-ink/5 rounded-2xl pl-12 pr-6 py-4 focus:outline-none focus:border-cyan-800 shadow-sm transition-all text-sm font-medium"
            />
          </div>
        </div>

        <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-ink/5 overflow-x-auto self-start xl:self-end">
          {(['all', 'new', 'read', 'replied', 'archived'] as const).map((status) => (
            <button
              key={status}
              onClick={() => {
                setFilterStatus(status);
                setCurrentPage(1);
              }}
              className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${filterStatus === status
                ? 'bg-cyan-800 text-white shadow-lg shadow-cyan-800/20'
                : 'text-ink/40 hover:text-ink'
                }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm border border-ink/5 overflow-hidden relative min-h-[400px]">
        {loading && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-cyan-800/20 border-t-cyan-800 rounded-full animate-spin" />
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-ink/5 text-ink/40 text-[10px] font-black uppercase tracking-[0.2em]">
                <th className="px-8 py-5">Client Info</th>
                <th className="px-8 py-5">Interest</th>
                <th className="px-8 py-5">Message Preview</th>
                <th className="px-8 py-5 text-center">Status</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/5">
              {submissions.length === 0 && !loading ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center">
                    <div className="text-ink/20 font-black uppercase tracking-[0.2em] text-sm">No submissions found</div>
                  </td>
                </tr>
              ) : (
                submissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-ink/[0.01] transition-colors group">
                    <td className="px-8 py-4 whitespace-nowrap">
                      <div className="font-bold text-ink">{sub.name}</div>
                      <div className="text-[10px] text-ink/40 font-medium">{sub.email}</div>
                    </td>
                    <td className="px-8 py-4 whitespace-nowrap">
                      <span className="inline-block px-2 py-0.5 bg-cyan-50 text-cyan-800 rounded-md text-[9px] font-black uppercase tracking-wider mb-1">
                        {sub.service}
                      </span>
                      {sub.company && <div className="text-[10px] text-ink/40 truncate max-w-[150px]">{sub.company}</div>}
                    </td>
                    <td className="px-8 py-4 max-w-xs">
                      <p className="text-xs text-ink/60 truncate italic">
                        "{sub.message}"
                      </p>
                    </td>
                    <td className="px-8 py-4 text-center">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${statusConfig[sub.status].color} ${statusConfig[sub.status].text}`}>
                        <span className="mr-1.5 leading-none">{statusConfig[sub.status].icon}</span>
                        {statusConfig[sub.status].label}
                      </span>
                    </td>
                    <td className="px-8 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setSelectedSubmission(sub)}
                          className="p-2 text-cyan-800 hover:bg-cyan-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(sub.id!)}
                          className="p-2 text-red-500/40 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
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

        {/* Pagination Footer */}
        {pagination.pages > 1 && (
          <div className="px-8 py-6 bg-ink/[0.02] border-t border-ink/5 flex items-center justify-between">
            <div className="text-[10px] font-black text-ink/40 uppercase tracking-widest">
              Showing page {pagination.page} of {pagination.pages} ({pagination.total} total)
            </div>
            <div className="flex items-center gap-2">
              <button
                disabled={pagination.page === 1}
                onClick={() => handlePageChange(pagination.page - 1)}
                className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-ink hover:text-cyan-800 disabled:opacity-30 disabled:hover:text-ink transition-colors"
              >
                Previous
              </button>

              <div className="flex items-center gap-1">
                {[...Array(pagination.pages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    className={`w-8 h-8 rounded-lg text-[10px] font-black transition-all ${pagination.page === i + 1
                      ? 'bg-cyan-800 text-white shadow-lg shadow-cyan-800/20'
                      : 'text-ink/40 hover:bg-ink/5 hover:text-ink'
                      }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                disabled={pagination.page === pagination.pages}
                onClick={() => handlePageChange(pagination.page + 1)}
                className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-ink hover:text-cyan-800 disabled:opacity-30 disabled:hover:text-ink transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Details Modal */}
      {selectedSubmission && createPortal(
        <div className="fixed inset-0 w-screen h-screen z-[9999] flex items-center justify-center bg-ink/60 backdrop-blur-md p-4 md:p-6 overflow-y-auto">
          <div className="bg-parchment w-full max-w-2xl rounded-[2.5rem] shadow-2xl my-auto overflow-hidden border border-white/20">
            {/* Modal Header */}
            <div className="bg-ink p-10 text-white relative">
              <button
                onClick={() => setSelectedSubmission(null)}
                className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
              <div className="flex items-center gap-2 text-[#FFD600] text-[10px] font-black uppercase tracking-[0.2em] mb-3">
                <UserCheck size={14} />
                Submission Detail
              </div>
              <h2 className="text-4xl font-display font-bold leading-tight">{selectedSubmission.name}</h2>
              <p className="text-white/60 mt-2 flex items-center gap-2 font-medium text-sm">
                <Calendar size={14} />
                {format(new Date(selectedSubmission.createdAt!), 'MMMM dd, yyyy • hh:mm a')}
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-10 space-y-8">
              {/* Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-ink/30">Email Address</label>
                  <a href={`mailto:${selectedSubmission.email}`} className="flex items-center gap-3 font-bold text-ink hover:text-cyan-800 transition-colors">
                    <Mail size={16} className="text-cyan-800" />
                    {selectedSubmission.email}
                  </a>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-ink/30">Phone Number</label>
                  <a href={`tel:${selectedSubmission.phone}`} className="flex items-center gap-3 font-bold text-ink hover:text-cyan-800 transition-colors">
                    <Phone size={16} className="text-cyan-800" />
                    {selectedSubmission.phone || 'Not provided'}
                  </a>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-ink/30">Requested Service</label>
                  <div className="flex items-center gap-3 font-bold text-ink">
                    <Zap size={16} className="text-cyan-800" />
                    {selectedSubmission.service}
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-ink/30">Company / Organization</label>
                  <div className="flex items-center gap-3 font-bold text-ink">
                    <Building size={16} className="text-cyan-800" />
                    {selectedSubmission.company || 'Personal Project'}
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="bg-white/50 border border-ink/5 rounded-3xl p-8 space-y-3 shadow-inner">
                <label className="text-[10px] font-black uppercase tracking-widest text-ink/30 flex items-center gap-2">
                  <MessageSquare size={14} />
                  Client Message
                </label>
                <p className="text-ink/80 leading-relaxed font-medium">
                  "{selectedSubmission.message}"
                </p>
              </div>

              {/* Status Management */}
              <div className="pt-4 border-t border-ink/5">
                <label className="text-[10px] font-black uppercase tracking-widest text-ink/30 mb-4 block">Update Tracking Status</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {(['new', 'read', 'replied', 'archived'] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(selectedSubmission.id!, status)}
                      className={`py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedSubmission.status === status
                        ? `${statusConfig[status].color} ${statusConfig[status].text} ring-2 ring-inset ring-current shadow-lg`
                        : 'bg-white border border-ink/5 text-ink/40 hover:bg-ink/5'
                        }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-10 py-6 bg-ink/[0.02] border-t border-ink/5 flex justify-end">
              <button
                onClick={() => setSelectedSubmission(null)}
                className="px-10 py-4 bg-ink text-white rounded-full text-xs font-black uppercase tracking-widest hover:bg-cyan-800 transition-all shadow-xl shadow-ink/10"
              >
                Close View
              </button>
            </div>
          </div>
        </div>,
        document.getElementById('modal-root')!
      )}
    </div>
  );
};

export default Submissions;
