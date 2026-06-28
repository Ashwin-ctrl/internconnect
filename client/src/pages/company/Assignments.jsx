import { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import StatusBadge from '../../components/shared/StatusBadge';
import api from '../../utils/api';
import { Plus, X, Save, FileText, CheckCircle, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const CompanyAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ internshipId: '', title: '', description: '', deadline: '' });
  const [submissions, setSubmissions] = useState({});
  const [viewingSub, setViewingSub] = useState(null);

  const fetchData = async () => {
    try {
      const [asgRes, intRes] = await Promise.all([
        api.get('/assignments/company'),
        api.get('/internships/company/mine')
      ]);
      setAssignments(asgRes.data.assignments);
      setInternships(intRes.data.internships);
    } catch (err) { console.error(err); }
    setLoading(false);
  };
  useEffect(() => { fetchData(); }, []);

  const handleCreate = async () => {
    if (!form.internshipId || !form.title || !form.deadline) return toast.error('Required fields missing');
    try {
      await api.post('/assignments', form);
      toast.success('Assignment created!');
      setShowForm(false); setForm({ internshipId: '', title: '', description: '', deadline: '' });
      fetchData();
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
  };

  const fetchSubmissions = async (id) => {
    try {
      const r = await api.get(`/assignments/${id}/submissions`);
      setSubmissions(prev => ({ ...prev, [id]: r.data.submissions }));
    } catch (err) { console.error(err); }
  };

  const handleReview = async (subId, status, feedback, score) => {
    try {
      await api.put(`/assignments/submissions/${subId}`, { status, feedback, score });
      toast.success('Reviewed successfully');
      setViewingSub(null);
      fetchData();
    } catch (err) { toast.error('Failed'); }
  };

  return (
    <DashboardLayout title="Assignments" subtitle="Manage tasks for your interns">
      <button onClick={() => setShowForm(true)} className="btn-primary flex items-center gap-2 mb-6"><Plus size={16} /> Create Assignment</button>

      {showForm && (
        <div className="glass-card p-6 mb-6 animate-slide-up">
          <div className="flex justify-between mb-4"><h3 className="text-lg font-semibold text-white">New Assignment</h3><button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-white"><X size={18}/></button></div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="text-xs text-gray-400 mb-1 block">Internship *</label>
              <select className="input-field" value={form.internshipId} onChange={e => setForm({ ...form, internshipId: e.target.value })}>
                <option value="">Select an internship</option>
                {internships.map(i => <option key={i._id} value={i._id}>{i.title}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Title *</label>
              <input className="input-field" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Deadline *</label>
              <input type="date" className="input-field" value={form.deadline} onChange={e => setForm({ ...form, deadline: e.target.value })} />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs text-gray-400 mb-1 block">Description</label>
              <textarea className="input-field h-24" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
            </div>
          </div>
          <button onClick={handleCreate} className="btn-primary mt-4">Create</button>
        </div>
      )}

      {loading ? <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" /></div> : (
        <div className="space-y-4">
          {assignments.map(a => (
            <div key={a._id} className="glass-card p-5">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-base font-semibold text-white">{a.title}</h3>
                  <p className="text-xs text-gray-500">{a.internshipId?.title} • Due: {new Date(a.deadline).toLocaleDateString()}</p>
                </div>
                <button onClick={() => fetchSubmissions(a._id)} className="btn-secondary text-xs px-3 py-1">View Submissions</button>
              </div>
              <p className="text-sm text-gray-400 mb-4">{a.description}</p>
              
              {submissions[a._id] && (
                <div className="mt-4 p-4 bg-white/5 rounded-xl border border-white/5 space-y-3">
                  <h4 className="text-sm font-medium text-white mb-2">Submissions ({submissions[a._id].length})</h4>
                  {submissions[a._id].length === 0 ? <p className="text-xs text-gray-500">No submissions yet.</p> : (
                    submissions[a._id].map(sub => (
                      <div key={sub._id} className="flex justify-between items-center p-2 rounded-lg bg-white/5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary-600/30 flex items-center justify-center text-xs font-bold text-white">{sub.studentId?.name?.[0]}</div>
                          <div>
                            <div className="text-sm text-white font-medium">{sub.studentId?.name}</div>
                            <div className="text-xs text-gray-500">{new Date(sub.submittedAt).toLocaleString()}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <StatusBadge status={sub.status} />
                          <button onClick={() => setViewingSub(sub)} className="text-primary-400 hover:text-primary-300 text-xs">Review</button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          ))}
          {assignments.length === 0 && !showForm && <div className="text-center py-10 text-gray-500">No assignments created.</div>}
        </div>
      )}

      {}
      {viewingSub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="glass-card w-full max-w-lg p-6 animate-slide-up">
            <div className="flex justify-between mb-4"><h3 className="text-lg font-semibold text-white">Review Submission</h3><button onClick={() => setViewingSub(null)} className="text-gray-400 hover:text-white"><X size={18}/></button></div>
            <div className="mb-4">
              <p className="text-sm text-gray-300">Student: <span className="text-white">{viewingSub.studentId?.name}</span></p>
              {viewingSub.note && <p className="text-sm text-gray-400 mt-2 bg-white/5 p-2 rounded">Note: {viewingSub.note}</p>}
            </div>
            {viewingSub.files?.length > 0 && (
              <div className="mb-4">
                <p className="text-xs text-gray-400 mb-2">Files:</p>
                <div className="flex flex-wrap gap-2">
                  {viewingSub.files.map((f, i) => (
                    <a key={i} href={`http://localhost:5000${f.path}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 rounded-lg text-sm text-primary-400 hover:bg-white/10"><FileText size={14}/>{f.originalname}</a>
                  ))}
                </div>
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-400 block mb-1">Score (optional)</label>
                <input type="number" id="reviewScore" defaultValue={viewingSub.score || ''} className="input-field" placeholder="0-100" />
              </div>
              <div>
                <label className="text-xs text-gray-400 block mb-1">Feedback</label>
                <textarea id="reviewFeedback" defaultValue={viewingSub.feedback || ''} className="input-field h-20" placeholder="Great job..." />
              </div>
              <div className="flex gap-3">
                <button onClick={() => handleReview(viewingSub._id, 'Approved', document.getElementById('reviewFeedback').value, document.getElementById('reviewScore').value)} className="btn-success flex-1 flex justify-center items-center gap-2"><CheckCircle size={16}/> Approve</button>
                <button onClick={() => handleReview(viewingSub._id, 'Reviewed', document.getElementById('reviewFeedback').value, document.getElementById('reviewScore').value)} className="btn-outline flex-1">Mark Reviewed</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default CompanyAssignments;
