import { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import StatusBadge from '../../components/shared/StatusBadge';
import api from '../../utils/api';
import { Upload, ClipboardList, Clock, FileText, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitId, setSubmitId] = useState(null);
  const [note, setNote] = useState('');
  const [files, setFiles] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchData = () => {
    api.get('/assignments/student').then(r => { setAssignments(r.data.assignments); setLoading(false); }).catch(() => setLoading(false));
  };
  useEffect(fetchData, []);

  const handleSubmit = async (assignmentId) => {
    setSubmitting(true);
    const fd = new FormData();
    fd.append('note', note);
    if (files) Array.from(files).forEach(f => fd.append('files', f));
    try {
      await api.post(`/assignments/${assignmentId}/submit`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      toast.success('Submitted!');
      setSubmitId(null); setNote(''); setFiles(null);
      fetchData();
    } catch (err) { toast.error(err.response?.data?.message || 'Submission failed'); }
    setSubmitting(false);
  };

  return (
    <DashboardLayout title="My Assignments" subtitle="View and submit your assigned tasks">
      {loading ? (
        <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" /></div>
      ) : assignments.length === 0 ? (
        <div className="glass-card p-16 text-center">
          <ClipboardList size={48} className="text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No assignments yet</h3>
          <p className="text-gray-500">You'll see tasks here once a company assigns them to you.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {assignments.map(a => {
            const isPast = new Date(a.deadline) < new Date();
            const sub = a.submission;
            return (
              <div key={a._id} className="glass-card p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-base font-semibold text-white">{a.title}</h3>
                    <p className="text-xs text-gray-500">{a.companyId?.companyName} • {a.internshipId?.title}</p>
                  </div>
                  <StatusBadge status={sub?.status || (isPast ? 'Overdue' : 'Pending')} />
                </div>
                <p className="text-sm text-gray-400 mb-3">{a.description}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                  <span className="flex items-center gap-1"><Clock size={12} /> Due: {new Date(a.deadline).toLocaleDateString('en-IN')}</span>
                  {sub?.score !== null && sub?.score !== undefined && (
                    <span className="text-primary-400">Score: {sub.score}/{a.maxScore || 100}</span>
                  )}
                </div>
                {sub?.feedback && <p className="text-xs text-gray-400 mb-3 italic p-2 rounded bg-white/3">Feedback: "{sub.feedback}"</p>}

                {sub?.files?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {sub.files.map((f, i) => (
                      <a key={i} href={`http://localhost:5000${f.path}`} target="_blank"
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 text-xs text-gray-300 hover:text-primary-400">
                        <FileText size={12} /> {f.originalname}
                      </a>
                    ))}
                  </div>
                )}

                {submitId === a._id ? (
                  <div className="mt-3 p-4 rounded-xl bg-white/3 border border-white/5 space-y-3">
                    <textarea className="input-field h-20 resize-none text-sm" placeholder="Notes (optional)" value={note} onChange={e => setNote(e.target.value)} />
                    <div>
                      <label className="btn-secondary text-sm cursor-pointer inline-flex items-center gap-2">
                        <Upload size={14} /> Choose Files
                        <input type="file" className="hidden" multiple onChange={e => setFiles(e.target.files)} />
                      </label>
                      {files && <span className="text-xs text-gray-400 ml-3">{files.length} file(s)</span>}
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setSubmitId(null)} className="btn-secondary text-sm px-4">Cancel</button>
                      <button onClick={() => handleSubmit(a._id)} disabled={submitting} className="btn-primary text-sm px-4 flex items-center gap-2">
                        {submitting ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />} Submit
                      </button>
                    </div>
                  </div>
                ) : (
                  <button onClick={() => setSubmitId(a._id)} className="btn-outline text-sm px-4 py-1.5">
                    {sub ? 'Resubmit' : 'Submit Assignment'}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </DashboardLayout>
  );
};

export default Assignments;
