import { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import StatusBadge from '../../components/shared/StatusBadge';
import api from '../../utils/api';
import { FileText, Building2, Calendar } from 'lucide-react';

const Applications = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    api.get('/applications/my').then(r => { setApps(r.data.applications); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const filtered = filter === 'all' ? apps : apps.filter(a => a.status === filter);

  const counts = { all: apps.length, Applied: apps.filter(a => a.status === 'Applied').length, 'Under Review': apps.filter(a => a.status === 'Under Review').length,
    Selected: apps.filter(a => a.status === 'Selected').length, Rejected: apps.filter(a => a.status === 'Rejected').length, Completed: apps.filter(a => a.status === 'Completed').length };

  return (
    <DashboardLayout title="My Applications" subtitle="Track the status of your internship applications">
      {}
      <div className="flex flex-wrap gap-2 mb-6">
        {['all', 'Applied', 'Under Review', 'Selected', 'Rejected', 'Completed'].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === s ? 'bg-primary-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/5'}`}>
            {s === 'all' ? 'All' : s} ({counts[s] || 0})
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" /></div>
      ) : filtered.length === 0 ? (
        <div className="glass-card p-16 text-center">
          <FileText size={48} className="text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No applications</h3>
          <p className="text-gray-500">You haven't applied to any internships yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map(app => (
            <div key={app._id} className="glass-card p-5 flex items-center gap-5 hover:border-primary-500/20 transition-all">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-600/30 to-violet-600/20 flex items-center justify-center text-lg font-bold text-primary-400 flex-shrink-0">
                {app.internshipId?.companyId?.companyName?.[0] || 'C'}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-white truncate">{app.internshipId?.title || 'Internship'}</h3>
                <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                  <span className="flex items-center gap-1"><Building2 size={11} />{app.internshipId?.companyId?.companyName || ''}</span>
                  <span className="flex items-center gap-1"><Calendar size={11} />{new Date(app.appliedAt).toLocaleDateString('en-IN')}</span>
                </div>
                {app.companyFeedback && <p className="text-xs text-gray-400 mt-2 italic">"{app.companyFeedback}"</p>}
              </div>
              <StatusBadge status={app.status} />
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default Applications;
