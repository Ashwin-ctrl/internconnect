import { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import StatusBadge from '../../components/shared/StatusBadge';
import api from '../../utils/api';
import { Users, Mail, Phone, GraduationCap, FileText, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';

const Applicants = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    api.get('/applications/company').then(r => { setApps(r.data.applications); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/applications/${id}/status`, { status });
      setApps(apps.map(a => a._id === id ? { ...a, status } : a));
      toast.success(`Status updated to ${status}`);
    } catch (err) { toast.error('Failed'); }
  };

  const filtered = filter === 'all' ? apps : apps.filter(a => a.status === filter);

  return (
    <DashboardLayout title="Applicants" subtitle="Review and manage internship applicants">
      <div className="flex flex-wrap gap-2 mb-6">
        {['all', 'Applied', 'Under Review', 'Selected', 'Rejected', 'Completed'].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === s ? 'bg-primary-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/5'}`}>
            {s === 'all' ? 'All' : s}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" /></div>
      ) : filtered.length === 0 ? (
        <div className="glass-card p-16 text-center"><Users size={48} className="text-gray-600 mx-auto mb-4" /><h3 className="text-lg text-white font-semibold mb-2">No applicants</h3></div>
      ) : (
        <div className="space-y-4">
          {filtered.map(app => (
            <div key={app._id} className="glass-card p-5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-600 to-violet-500 flex items-center justify-center text-lg font-bold text-white flex-shrink-0">
                  {app.studentId?.name?.[0]?.toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base font-semibold text-white">{app.studentId?.name}</h3>
                      <p className="text-xs text-gray-400 mt-0.5">Applied for: {app.internshipId?.title}</p>
                    </div>
                    <StatusBadge status={app.status} />
                  </div>

                  <div className="flex flex-wrap gap-3 mt-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><Mail size={11} />{app.studentId?.email}</span>
                    {app.studentId?.phone && <span className="flex items-center gap-1"><Phone size={11} />{app.studentId.phone}</span>}
                    {app.studentId?.college && <span className="flex items-center gap-1"><GraduationCap size={11} />{app.studentId.college}</span>}
                  </div>

                  {app.studentId?.skills?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {app.studentId.skills.slice(0, 6).map(s => <span key={s} className="text-xs px-2 py-0.5 rounded bg-primary-600/15 text-primary-300">{s}</span>)}
                    </div>
                  )}

                  {app.coverLetter && <p className="text-xs text-gray-400 mt-3 italic p-2 rounded bg-white/3">"{app.coverLetter}"</p>}

                  {app.studentId?.resume && (
                    <a href={`http://localhost:5000${app.studentId.resume}`} target="_blank"
                      className="inline-flex items-center gap-1.5 text-xs text-primary-400 mt-2 hover:underline">
                      <FileText size={12} /> View Resume <ExternalLink size={10} />
                    </a>
                  )}

                  <div className="flex flex-wrap gap-2 mt-4">
                    {['Under Review', 'Selected', 'Rejected', 'Completed'].map(s => (
                      <button key={s} onClick={() => updateStatus(app._id, s)} disabled={app.status === s}
                        className={`text-xs px-3 py-1.5 rounded-lg transition-all ${app.status === s ? 'bg-white/5 text-gray-600 cursor-not-allowed' :
                          s === 'Selected' ? 'btn-success text-xs' : s === 'Rejected' ? 'btn-danger text-xs' :
                          s === 'Completed' ? 'bg-purple-600/80 hover:bg-purple-500 text-white' : 'btn-secondary text-xs'}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default Applicants;
