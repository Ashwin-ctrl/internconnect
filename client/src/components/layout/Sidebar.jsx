import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../../features/auth/authSlice';
import {
  LayoutDashboard, User, Search, FileText, ClipboardList,
  MessageSquare, Award, Building2, Users, Settings,
  ChevronRight, LogOut, Bell
} from 'lucide-react';

const studentNav = [
  { to: '/student/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/student/profile', icon: User, label: 'My Profile' },
  { to: '/student/internships', icon: Search, label: 'Find Internships' },
  { to: '/student/applications', icon: FileText, label: 'Applications' },
  { to: '/student/assignments', icon: ClipboardList, label: 'Assignments' },
  { to: '/student/discussions', icon: MessageSquare, label: 'Discussions' },
  { to: '/student/certificates', icon: Award, label: 'Certificates' },
];

const companyNav = [
  { to: '/company/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/company/internships', icon: Building2, label: 'My Listings' },
  { to: '/company/applicants', icon: Users, label: 'Applicants' },
  { to: '/company/assignments', icon: ClipboardList, label: 'Assignments' },
  { to: '/company/certificates', icon: Award, label: 'Certificates' },
];

const adminNav = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/users', icon: Users, label: 'Users' },
  { to: '/admin/internships', icon: Building2, label: 'Internships' },
  { to: '/admin/discussions', icon: MessageSquare, label: 'Forum' },
  { to: '/admin/reports', icon: FileText, label: 'Reports' },
];

const Sidebar = () => {
  const { user } = useSelector(s => s.auth);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navItems = user?.role === 'student' ? studentNav
    : user?.role === 'company' ? companyNav : adminNav;

  const roleLabel = { student: 'Student', company: 'Company', admin: 'Administrator' };
  const roleColor = { student: 'text-primary-400', company: 'text-blue-400', admin: 'text-amber-400' };

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/login');
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-64 z-40 flex flex-col"
      style={{ background: 'linear-gradient(180deg, #0f0c29 0%, #13102a 100%)', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
      {}
      <div className="p-6 border-b border-white/5">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-600 to-violet-600 flex items-center justify-center shadow-lg shadow-primary-900/50">
            <span className="text-white font-bold text-sm">IC</span>
          </div>
          <div>
            <div className="font-bold text-white text-sm leading-none">InternConnect</div>
            <div className={`text-xs mt-0.5 ${roleColor[user?.role]}`}>{roleLabel[user?.role]}</div>
          </div>
        </Link>
      </div>

      {}
      <div className="p-4 mx-3 my-3 rounded-xl bg-white/5 border border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-600 to-violet-500 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
            {user?.name?.[0]?.toUpperCase()}
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold text-white truncate">{user?.name}</div>
            <div className="text-xs text-gray-500 truncate">{user?.email}</div>
          </div>
        </div>
      </div>

      {}
      <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
        {navItems.map(({ to, icon: Icon, label }) => {
          const active = location.pathname === to;
          return (
            <Link key={to} to={to}
              className={active ? 'sidebar-item-active' : 'sidebar-item'}>
              <Icon size={18} className={active ? 'text-primary-400' : ''} />
              <span className="text-sm">{label}</span>
              {active && <ChevronRight size={14} className="ml-auto text-primary-400" />}
            </Link>
          );
        })}
      </nav>

      {}
      <div className="px-3 py-4 border-t border-white/5 space-y-0.5">
        <button onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all duration-200 text-sm">
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
