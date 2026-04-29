import React from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Image, 
  FileText, 
  Users, 
  MessageSquare, 
  LogOut, 
  ChevronRight,
  MonitorPlay,
  UserCheck,
  Briefcase,
  Zap,
  Layers,
  Workflow,
  BarChart3,
  Film
} from 'lucide-react';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('lenstalk_admin_token');
    navigate('/admin/login');
  };

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Hero Slides', path: '/admin/hero', icon: MonitorPlay },
    { name: 'Portfolio Gallery', path: '/admin/gallery', icon: Image },
    { name: 'Company Stats', path: '/admin/stats', icon: BarChart3 },
    { name: 'Campaigns', path: '/admin/campaigns', icon: Film },
    { name: 'Blog Posts', path: '/admin/blog', icon: FileText },
    { name: 'Client Logos', path: '/admin/clients', icon: Briefcase },
    { name: 'Testimonials', path: '/admin/testimonials', icon: MessageSquare },
    { name: 'Team Members', path: '/admin/team', icon: Users },
    { name: 'Submissions', path: '/admin/submissions', icon: UserCheck },
  ];

  return (
    <div className="h-screen bg-parchment flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 bg-[#1A2B5E] border-r border-[#FFD600]/20 flex flex-col h-full shrink-0">
        <div className="p-8 border-b border-[#FFD600]/20">
          <Link to="/" className="text-xl font-display font-bold tracking-tighter text-white">
            LENSTALK<span className="text-[#FFD600]">ADMIN</span>
          </Link>
        </div>

        <nav className="flex-grow p-6 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between p-4 rounded-2xl transition-all group ${
                  isActive 
                    ? 'bg-[#FFD600] text-[#1A2B5E] shadow-lg shadow-[#FFD600]/20' 
                    : 'text-white/60 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon size={20} />
                  <span className="font-bold text-sm">{item.name}</span>
                </div>
                <ChevronRight size={16} className={`transition-transform ${isActive ? 'translate-x-1' : 'opacity-0 group-hover:opacity-100'}`} />
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-[#FFD600]/20">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-4 rounded-2xl text-[#FF2D6B] font-bold text-sm hover:bg-[#FF2D6B]/10 transition-all"
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area - Scrollable */}
      <main className="flex-grow h-full overflow-y-auto p-10">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
