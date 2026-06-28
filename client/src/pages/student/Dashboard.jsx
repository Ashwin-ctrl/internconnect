import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import StatCard from '../../components/shared/StatCard';
import StatusBadge from '../../components/shared/StatusBadge';
import api from '../../utils/api';
import { FileText, ClipboardList, Award, TrendingUp, Search, ArrowRight } from 'lucide-react';

const StudentDashboard = () => {
  const { user } = useSelector(s => s.auth);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/students/progress').then(r => { setStats(r.data.stats); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return (
    <DashboardLayout title="Dashboard">
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    </DashboardLayout>
  );

  return (
    <DashboardLayout title={`Welcome back, ${user?.name?.split(' ')[0]}`} subtitle="Here's your internship journey overview">
      {}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard icon={FileText} label="Applications" value={stats?.totalApplications || 0} color="blue" sub={`${stats?.selectedApplications || 0} selected`} />
        <StatCard icon={ClipboardList} label="Assignments" value={`${stats?.submittedAssignments || 0}/${stats?.totalAssignments || 0}`} color="primary" sub={`${stats?.assignmentCompletion || 0}% done`} />
        <StatCard icon={Award} label="Completed" value={stats?.completedInternships || 0} color="green" sub="Internships" />
        <StatCard icon={TrendingUp} label="Profile" value={`${stats?.profileCompletion || 0}%`} color="amber" sub="Completion" />
      </div>

      {}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Progress Overview</h3>
          <div className="space-y-5">
            {[
              { label: 'Profile Completion', pct: stats?.profileCompletion || 0, color: 'from-amber-500 to-orange-500' },
              { label: 'Assignment Progress', pct: stats?.assignmentCompletion || 0, color: 'from-primary-600 to-violet-500' },
            ].map(({ label, pct, color }) => (
              <div key={label}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-300">{label}</span>
                  <span className="text-white font-semibold">{pct}%</span>
                </div>
                <div className="progress-bar">
                  <div className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-1000`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Skills</h3>
          {stats?.skills?.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {stats.skills.map((skill, i) => (
                <span key={i} className="px-3 py-1.5 rounded-lg bg-primary-600/20 text-primary-300 text-sm border border-primary-500/20">{skill}</span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">Add skills in your <Link to="/student/profile" className="text-primary-400">profile</Link></p>
          )}
        </div>
      </div>

      {}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { to: '/student/internships', icon: Search, label: 'Find Internships', desc: 'Browse opportunities' },
            { to: '/student/applications', icon: FileText, label: 'My Applications', desc: 'Track status' },
            { to: '/student/certificates', icon: Award, label: 'Certificates', desc: 'View & download' },
          ].map(({ to, icon: Icon, label, desc }) => (
            <Link key={to} to={to} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-primary-500/30 hover:bg-white/10 transition-all group">
              <div className="w-10 h-10 rounded-lg bg-primary-600/20 flex items-center justify-center">
                <Icon size={18} className="text-primary-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-white">{label}</div>
                <div className="text-xs text-gray-500">{desc}</div>
              </div>
              <ArrowRight size={14} className="text-gray-600 group-hover:text-primary-400 transition-colors" />
            </Link>
          ))}
        </div>
      </div>

      {}
      {stats?.recentApplications?.length > 0 && (
        <div className="glass-card p-6 mt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Recent Applications</h3>
            <Link to="/student/applications" className="text-sm text-primary-400 hover:text-primary-300">View all →</Link>
          </div>
          <div className="space-y-3">
            {stats.recentApplications.map((app, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/3 border border-white/5">
                <div>
                  <div className="text-sm text-white font-medium">{app.internshipId?.title || 'Internship'}</div>
                  <div className="text-xs text-gray-500">{new Date(app.appliedAt).toLocaleDateString()}</div>
                </div>
                <StatusBadge status={app.status} />
              </div>
            ))}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default StudentDashboard;
