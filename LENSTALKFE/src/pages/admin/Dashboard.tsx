import React from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import { ContactSubmission, HeroSlide, GalleryItem, BlogPost, Service, TeamMember, Testimonial, CompanyStats, BusinessPillar, ProcessStep, Campaign, ClientLogo } from '../../types';
import { 
  Users, 
  MessageSquare, 
  Image as ImageIcon, 
  FileText,
  ArrowUpRight,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Zap,
  Layers,
  Workflow,
  BarChart3,
  Film,
  Briefcase
} from 'lucide-react';
import { format } from 'date-fns';

const Dashboard = () => {
  const { data: submissions } = useApi<ContactSubmission>('submissions');
  const { data: slides } = useApi<HeroSlide>('hero');
  const { data: gallery } = useApi<GalleryItem>('gallery');
  const { data: posts } = useApi<BlogPost>('blog_posts');
  const { data: team } = useApi<TeamMember>('team');
  const { data: testimonials } = useApi<Testimonial>('testimonials');
  const { data: stats } = useApi<CompanyStats>('company_stats');
  const { data: campaigns } = useApi<Campaign>('campaigns');
  const { data: clients } = useApi<ClientLogo>('clients');

  const newSubmissions = submissions.filter(s => s.status === 'new').length;

  const contentStats = [
    { 
      name: 'Hero Slides', 
      value: slides.length, 
      icon: ImageIcon, 
      color: 'text-blue-800',
      bg: 'bg-blue-50',
      published: slides.filter(s => s.published ?? true).length 
    },
    { 
      name: 'Blog Posts', 
      value: posts.length, 
      icon: FileText, 
      color: 'text-purple-800',
      bg: 'bg-purple-50',
      published: posts.filter(p => p.published ?? true).length 
    },
    { 
      name: 'Gallery Items', 
      value: gallery.length, 
      icon: ImageIcon, 
      color: 'text-green-800',
      bg: 'bg-green-50',
      published: gallery.filter(g => g.published ?? true).length 
    },
    { 
      name: 'Team Members', 
      value: team.length, 
      icon: Users, 
      color: 'text-cyan-800',
      bg: 'bg-cyan-50',
      published: team.filter(t => t.published ?? true).length 
    },
    { 
      name: 'Testimonials', 
      value: testimonials.length, 
      icon: MessageSquare, 
      color: 'text-pink-800',
      bg: 'bg-pink-50',
      published: testimonials.filter(t => t.published ?? true).length 
    },
    { 
      name: 'Campaigns', 
      value: campaigns.length, 
      icon: Film, 
      color: 'text-red-800',
      bg: 'bg-red-50',
      published: campaigns.filter(c => c.published ?? true).length 
    },
    { 
      name: 'Clients', 
      value: clients.length, 
      icon: Briefcase, 
      color: 'text-teal-800',
      bg: 'bg-teal-50',
      published: clients.filter(c => c.published ?? true).length 
    },
    { 
      name: 'Statistics', 
      value: stats.length, 
      icon: BarChart3, 
      color: 'text-lime-800',
      bg: 'bg-lime-50',
      published: stats.filter(s => s.published ?? true).length 
    },
  ];

  const submissionStats = [
    { 
      label: 'New Submissions', 
      count: newSubmissions, 
      icon: AlertCircle, 
      color: 'text-blue-800',
      bg: 'bg-blue-50'
    },
    { 
      label: 'Total Submissions', 
      count: submissions.length, 
      icon: MessageSquare, 
      color: 'text-cyan-800',
      bg: 'bg-cyan-50'
    },
    { 
      label: 'Replied', 
      count: submissions.filter(s => s.status === 'replied').length, 
      icon: CheckCircle, 
      color: 'text-green-800',
      bg: 'bg-green-50'
    },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-display font-bold text-ink mb-2">Welcome back, Admin</h1>
        <p className="text-ink/40 font-medium">Here's what's happening with Lenstalk Media today.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {submissionStats.map((stat) => (
          <div key={stat.label} className="bg-white p-8 rounded-3xl shadow-sm border border-ink/5">
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-6`}>
              <stat.icon size={24} />
            </div>
            <div className="text-3xl font-bold text-ink mb-1">{stat.count}</div>
            <div className="text-sm font-bold text-ink/40 uppercase tracking-widest">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Submissions */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-ink/5 overflow-hidden">
        <div className="p-8 border-b border-ink/5 flex items-center justify-between">
          <h2 className="text-xl font-display font-bold text-ink">Recent Submissions</h2>
          <Link to="/admin/submissions" className="text-cyan-800 font-bold text-sm flex items-center gap-1 hover:underline">
            View All <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-ink/5 text-ink/40 text-xs font-bold uppercase tracking-widest">
                <th className="px-8 py-4">Name</th>
                <th className="px-8 py-4">Service</th>
                <th className="px-8 py-4">Date</th>
                <th className="px-8 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/5">
              {submissions.slice(0, 1).map((sub) => (
                <tr key={sub.id} className="hover:bg-ink/[0.02] transition-colors">
                  <td className="px-8 py-6">
                    <div className="font-bold text-ink">{sub.name}</div>
                    <div className="text-xs text-ink/40">{sub.email}</div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-cyan-50 text-cyan-800 rounded-full text-xs font-bold">
                      {sub.service}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-sm text-ink/60">
                    {sub.createdAt ? format(new Date(sub.createdAt), 'MMM dd, yyyy') : 'N/A'}
                  </td>
                  <td className="px-8 py-6">
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${
  sub.status === 'new' 
    ? 'bg-blue-50 text-blue-700'
    : sub.status === 'read'
    ? 'bg-cyan-50 text-cyan-700'
    : sub.status === 'replied'
    ? 'bg-green-50 text-green-700'
    : 'bg-gray-50 text-gray-600'
}`}>
  {sub.status ? sub.status.charAt(0).toUpperCase() + sub.status.slice(1) : 'Unknown'}
</span>
                  </td>
                </tr>
              ))}
              {submissions.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-8 py-12 text-center text-ink/40 font-medium">
                    No submissions yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Content Overview */}
      <div>
        <h2 className="text-xl font-display font-bold text-ink mb-6">Content Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contentStats.map((item) => (
            <div key={item.name} className="bg-white p-6 rounded-3xl shadow-sm border border-ink/5 hover:shadow-md transition-all">
              <div className={`w-10 h-10 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center mb-4`}>
                <item.icon size={20} />
              </div>
              <div className="text-2xl font-bold text-ink mb-1">{item.value}</div>
              <div className="text-xs font-bold text-ink/40 uppercase tracking-widest mb-2">{item.name}</div>
              <div className="text-xs text-ink/60">
                <span className="font-bold text-green-700">{item.published}</span> published
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default Dashboard;
