import { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import StatusBadge from '../../components/shared/StatusBadge';
import api from '../../utils/api';
import { Building2, CheckCircle, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminInternships = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const fetchData = () => { api.get('/admin/internships').then(r => { setInternships(r.data.internships); setLoading(false); }).catch(() => setLoading(false)); };
  useEffect(fetchData, []);

  const handleApprove = async (id, approve) => {
    try {
      await api.put(`/admin/internships/${id}/approve`, { isApprovedByAdmin: approve });
      toast.success(approve ? 'Approved' : 'Rejected');
      fetchData();
    } catch (err) { toast.error('Failed'); }
  };

  const filtered = filter === 'all' ? internships : filter === 'pending' ? internships.filter(i => !i.isApprovedByAdmin) : internships.filter(i => i.isApprovedByAdmin);

  return (
    <DashboardLayout title="Internship Listings" subtitle="Review and approve company internship posts">
      <div className="flex gap-2 mb-6">
        {['all', 'pending', 'approved'].map(s => (
          <button key={s} onClick={() => setFilter(s)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === s ? 'bg-primary-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>
            <span className="capitalize">{s}</span>
          </button>
        ))}
      </div>

      {loading ? <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" /></div> : (
        <div className="space-y-4">
          {filtered.map(i => (
            <div key={i._id} className="glass-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-base font-semibold text-white">{i.title}</h3>
                  <StatusBadge status={i.isApprovedByAdmin ? 'active' : 'pending'} />
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                  <Building2 size={14}/> {i.companyId?.companyName} • Posted {new Date(i.createdAt).toLocaleDateString()}
                </div>
                <p className="text-sm text-gray-400 line-clamp-2">{i.description}</p>
              </div>
              <div className="flex md:flex-col gap-2 shrink-0">
                {!i.isApprovedByAdmin ? (
                  <>
                    <button onClick={() => handleApprove(i._id, true)} className="btn-success flex items-center justify-center gap-2 text-sm py-2 px-4"><CheckCircle size={14}/> Approve</button>
                    <button onClick={() => handleApprove(i._id, false)} className="btn-danger flex items-center justify-center gap-2 text-sm py-2 px-4"><XCircle size={14}/> Reject</button>
                  </>
                ) : (
                  <button onClick={() => handleApprove(i._id, false)} className="btn-secondary flex items-center justify-center gap-2 text-sm py-2 px-4"><XCircle size={14}/> Revoke Approval</button>
                )}
              </div>
            </div>
          ))}
          {filtered.length === 0 && <div className="text-center py-10 text-gray-500">No internships found.</div>}
        </div>
      )}
    </DashboardLayout>
  );
};

export default AdminInternships;
