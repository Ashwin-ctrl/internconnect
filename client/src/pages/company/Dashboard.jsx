import { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import StatCard from '../../components/shared/StatCard';
import api from '../../utils/api';
import { Building2, Users, ClipboardList, Award } from 'lucide-react';

const CompanyDashboard = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [intRes, appRes, asgRes] = await Promise.all([
          api.get('/internships/company/mine'),
          api.get('/applications/company'),
          api.get('/assignments/company'),
        ]);
        const internships = intRes.data.internships;
        const apps = appRes.data.applications;
        setStats({
          totalInternships: internships.length,
          activeInternships: internships.filter(i => i.status === 'active').length,
          totalApplicants: apps.length,
          selectedApplicants: apps.filter(a => a.status === 'Selected').length,
          completedInterns: apps.filter(a => a.status === 'Completed').length,
          totalAssignments: asgRes.data.assignments.length,
          recentApplicants: apps.slice(0, 5),
        });
      } catch (err) { console.error(err); }
      setLoading(false);
    };
    fetchAll();
  }, []);

  if (loading) return <DashboardLayout title="Dashboard"><div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" /></div></DashboardLayout>;

  return (
    <DashboardLayout title="Company Dashboard" subtitle="Overview of your internship listings and applicants">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard icon={Building2} label="Listings" value={stats.totalInternships} color="primary" sub={`${stats.activeInternships} active`} />
        <StatCard icon={Users} label="Applicants" value={stats.totalApplicants} color="blue" sub={`${stats.selectedApplicants} selected`} />
        <StatCard icon={ClipboardList} label="Assignments" value={stats.totalAssignments} color="amber" />
        <StatCard icon={Award} label="Completed" value={stats.completedInterns} color="green" sub="Interns" />
      </div>

      {stats.recentApplicants?.length > 0 && (
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Applicants</h3>
          <div className="space-y-3">
            {stats.recentApplicants.map(app => (
              <div key={app._id} className="flex items-center justify-between p-3 rounded-lg bg-white/3 border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-600 to-violet-500 flex items-center justify-center text-xs font-bold text-white">
                    {app.studentId?.name?.[0]?.toUpperCase()}
                  </div>
                  <div>
                    <div className="text-sm text-white font-medium">{app.studentId?.name}</div>
                    <div className="text-xs text-gray-500">{app.internshipId?.title} • {new Date(app.appliedAt).toLocaleDateString()}</div>
                  </div>
                </div>
                <span className={`badge ${app.status === 'Applied' ? 'badge-applied' : app.status === 'Selected' ? 'badge-selected' : 'badge-review'}`}>{app.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default CompanyDashboard;
