import { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import StatusBadge from '../../components/shared/StatusBadge';
import api from '../../utils/api';
import { Search, MapPin, Clock, IndianRupee, Calendar, Send, X, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const Internships = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ domain: '', duration: '' });
  const [applyModal, setApplyModal] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [applying, setApplying] = useState(false);

  const fetchInternships = () => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (filters.domain) params.set('domain', filters.domain);
    if (filters.duration) params.set('duration', filters.duration);
    api.get(`/internships?${params}`).then(r => { setInternships(r.data.internships); setLoading(false); }).catch(() => setLoading(false));
  };

  useEffect(() => { fetchInternships(); }, []);

  const handleSearch = (e) => { e.preventDefault(); fetchInternships(); };

  const handleApply = async () => {
    setApplying(true);
    try {
      await api.post(`/internships/${applyModal._id}/apply`, { coverLetter });
      toast.success('Applied successfully!');
      setApplyModal(null);
      setCoverLetter('');
    } catch (err) { toast.error(err.response?.data?.message || 'Failed to apply'); }
    setApplying(false);
  };

  return (
    <DashboardLayout title="Find Internships" subtitle="Browse and apply for exciting opportunities">
      {}
      <form onSubmit={handleSearch} className="glass-card p-4 mb-6">
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input className="input-field pl-10 py-2.5" placeholder="Search by title, skill, or keyword..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <select className="input-field w-auto min-w-[140px] py-2.5" value={filters.domain} onChange={e => setFilters({ ...filters, domain: e.target.value })}>
            <option value="">All Domains</option>
            {['Web Development', 'Artificial Intelligence', 'Data Science', 'Design', 'Mobile Development', 'DevOps'].map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <select className="input-field w-auto min-w-[130px] py-2.5" value={filters.duration} onChange={e => setFilters({ ...filters, duration: e.target.value })}>
            <option value="">Any Duration</option>
            {['1 Month', '2 Months', '3 Months', '4 Months', '6 Months'].map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <button type="submit" className="btn-primary py-2.5 px-5 flex items-center gap-2"><Search size={14} /> Search</button>
        </div>
      </form>

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" /></div>
      ) : internships.length === 0 ? (
        <div className="glass-card p-16 text-center">
          <Search size={48} className="text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No internships found</h3>
          <p className="text-gray-500">Try adjusting your filters or check back later.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-5">
          {internships.map(intern => (
            <div key={intern._id} className="glass-card p-6 hover:border-primary-500/30 transition-all duration-300 hover:-translate-y-0.5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600/30 to-violet-600/20 flex items-center justify-center text-sm font-bold text-primary-400">
                    {intern.companyId?.companyName?.[0] || 'C'}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">{intern.title}</h3>
                    <p className="text-xs text-gray-400">{intern.companyId?.companyName}</p>
                  </div>
                </div>
                <StatusBadge status={intern.status} />
              </div>

              <p className="text-sm text-gray-400 mb-4 line-clamp-2">{intern.description}</p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {intern.skillsRequired?.slice(0, 4).map(s => (
                  <span key={s} className="text-xs px-2 py-0.5 rounded bg-primary-600/15 text-primary-300 border border-primary-500/15">{s}</span>
                ))}
                {intern.skillsRequired?.length > 4 && <span className="text-xs text-gray-500">+{intern.skillsRequired.length - 4}</span>}
              </div>

              <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 flex-wrap">
                <span className="flex items-center gap-1"><MapPin size={12} />{intern.location || 'Remote'}</span>
                <span className="flex items-center gap-1"><Clock size={12} />{intern.duration}</span>
                <span className="flex items-center gap-1"><IndianRupee size={12} />{intern.stipend ? `₹${intern.stipend.toLocaleString()}/mo` : 'Unpaid'}</span>
                <span className="flex items-center gap-1"><Calendar size={12} />{new Date(intern.deadline).toLocaleDateString('en-IN')}</span>
              </div>

              <button onClick={() => setApplyModal(intern)} className="btn-primary w-full py-2 text-sm flex items-center justify-center gap-2">
                <Send size={14} /> Apply Now
              </button>
            </div>
          ))}
        </div>
      )}

      {}
      {applyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="glass-card w-full max-w-lg p-6 border border-white/10 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Apply for {applyModal.title}</h3>
              <button onClick={() => setApplyModal(null)} className="text-gray-400 hover:text-white"><X size={18} /></button>
            </div>
            <p className="text-sm text-gray-400 mb-1">at {applyModal.companyId?.companyName}</p>
            <p className="text-xs text-gray-500 mb-4">Your resume from your profile will be attached automatically.</p>
            <label className="text-sm text-gray-300 block mb-1.5">Cover Letter (Optional)</label>
            <textarea className="input-field h-32 resize-none mb-4" value={coverLetter} onChange={e => setCoverLetter(e.target.value)}
              placeholder="Why are you interested in this internship?" />
            <div className="flex gap-3">
              <button onClick={() => setApplyModal(null)} className="btn-secondary flex-1">Cancel</button>
              <button onClick={handleApply} disabled={applying} className="btn-primary flex-1 flex items-center justify-center gap-2">
                {applying ? <Loader2 size={16} className="animate-spin" /> : <Send size={14} />} Submit Application
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Internships;
