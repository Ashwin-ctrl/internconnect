import { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import api from '../../utils/api';
import { Award, CheckCircle, Search, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';

const CompanyCertificates = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(null);

  const fetchData = () => {
    api.get('/applications/company').then(r => { 
      setApps(r.data.applications.filter(a => a.status === 'Completed')); 
      setLoading(false); 
    }).catch(() => setLoading(false));
  };
  useEffect(fetchData, []);

  const handleGenerate = async (appId) => {
    setGenerating(appId);
    try {
      const r = await api.post(`/certificates/${appId}/generate`);
      toast.success(r.data.message || 'Certificate generated successfully!');
      
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to generate certificate');
    }
    setGenerating(null);
  };

  return (
    <DashboardLayout title="Certificates" subtitle="Issue certificates to interns who have completed their programs">
      {loading ? <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" /></div> : apps.length === 0 ? (
        <div className="glass-card p-16 text-center">
          <Award size={48} className="text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No completed internships</h3>
          <p className="text-gray-500">Mark an applicant as 'Completed' to issue a certificate.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map(app => (
            <div key={app._id} className="glass-card p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-600 to-violet-500 flex items-center justify-center text-white font-bold">{app.studentId?.name?.[0]}</div>
                  <div>
                    <h3 className="text-base font-semibold text-white">{app.studentId?.name}</h3>
                    <p className="text-xs text-gray-500">{app.studentId?.email}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-300">Internship: <span className="font-semibold">{app.internshipId?.title}</span></p>
                  <p className="text-xs text-gray-500">Duration: {app.internshipId?.duration}</p>
                </div>
              </div>
              <button onClick={() => handleGenerate(app._id)} disabled={generating === app._id} className="btn-primary w-full flex justify-center items-center gap-2">
                {generating === app._id ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Award size={16} />}
                Generate Certificate
              </button>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default CompanyCertificates;
