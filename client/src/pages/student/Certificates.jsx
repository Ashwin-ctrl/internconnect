import { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import api from '../../utils/api';
import { Award, Download, ExternalLink } from 'lucide-react';

const Certificates = () => {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/certificates/my').then(r => { setCerts(r.data.certificates); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const handleDownload = async (id) => {
    try {
      const res = await api.get(`/certificates/${id}/download`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement('a');
      a.href = url;
      a.download = `InternConnect_Certificate.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) { console.error(err); }
  };

  return (
    <DashboardLayout title="My Certificates" subtitle="View and download your internship completion certificates">
      {loading ? (
        <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" /></div>
      ) : certs.length === 0 ? (
        <div className="glass-card p-16 text-center">
          <Award size={48} className="text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No certificates yet</h3>
          <p className="text-gray-500">Complete an internship to earn your first certificate!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {certs.map(cert => (
            <div key={cert._id} className="glass-card overflow-hidden hover:border-primary-500/30 transition-all">
              {}
              <div className="p-6 bg-gradient-to-br from-primary-600/15 to-violet-600/10 border-b border-white/5 text-center">
                <Award size={40} className="text-primary-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white">{cert.internshipTitle}</h3>
                <p className="text-sm text-gray-400 mt-1">at {cert.companyName}</p>
              </div>
              <div className="p-5 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Duration</span>
                  <span className="text-gray-300">{cert.duration}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Issued</span>
                  <span className="text-gray-300">{new Date(cert.issuedAt).toLocaleDateString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Certificate ID</span>
                  <span className="text-gray-300 font-mono text-xs">{cert.certificateId?.substring(0, 12)}...</span>
                </div>
                <div className="flex gap-2 pt-2">
                  <button onClick={() => handleDownload(cert._id)}
                    className="btn-primary flex-1 text-sm flex items-center justify-center gap-2 py-2">
                    <Download size={14} /> Download PDF
                  </button>
                  <a href={`/verify/${cert.certificateId}`} target="_blank"
                    className="btn-secondary text-sm flex items-center justify-center gap-2 px-4 py-2">
                    <ExternalLink size={14} /> Verify
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default Certificates;
