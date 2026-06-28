import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ArrowRight, Search, ClipboardList, Award, MessageSquare, BarChart3, Shield, Sparkles, Zap } from 'lucide-react';

const Landing = () => {
  const { user } = useSelector(s => s.auth);
  const dashPath = user ? ({ student: '/student/dashboard', company: '/company/dashboard', admin: '/admin/dashboard' }[user.role]) : null;

  const features = [
    { icon: Search, title: 'Discover Internships', desc: 'Browse curated opportunities from top companies with smart filters.' },
    { icon: ClipboardList, title: 'Track Progress', desc: 'Monitor your skill development, assignments, and internship milestones.' },
    { icon: Award, title: 'Earn Certificates', desc: 'Get verified PDF certificates with QR code validation on completion.' },
    { icon: MessageSquare, title: 'Discussion Forum', desc: 'Engage with peers, ask questions, and share resources.' },
    { icon: BarChart3, title: 'Analytics Dashboard', desc: 'Rich charts and insights for students, companies, and admins.' },
    { icon: Shield, title: 'Role-Based Access', desc: 'Secure platform with Student, Company, and Admin roles.' },
  ];

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0a0a0f 0%, #0f0c29 50%, #0a0a1a 100%)' }}>
      {}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5" style={{ background: 'rgba(10,10,15,0.8)', backdropFilter: 'blur(16px)' }}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-violet-600 flex items-center justify-center">
              <span className="text-white font-bold text-xs">IC</span>
            </div>
            <span className="font-bold text-white">InternConnect</span>
          </Link>
          <div className="flex items-center gap-3">
            {user ? (
              <Link to={dashPath} className="btn-primary text-sm px-5 py-2">Dashboard <ArrowRight size={14} className="inline ml-1" /></Link>
            ) : (
              <>
                <Link to="/login" className="btn-secondary text-sm px-5 py-2">Sign In</Link>
                <Link to="/register" className="btn-primary text-sm px-5 py-2">Get Started</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-600/10 border border-primary-500/20 text-primary-400 text-xs font-medium mb-6">
            <Sparkles size={12} /> Internship & Skill Development Portal
          </div>
          <h1 className="text-6xl font-black text-white leading-tight mb-6">
            Connect. Learn.<br /><span className="gradient-text">Grow Together.</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            A centralized platform where students discover internships, companies find talent, and everyone grows together through the complete internship lifecycle.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link to="/register" className="btn-primary text-base px-8 py-3.5 flex items-center gap-2 shadow-xl shadow-primary-900/40">
              Start Your Journey <ArrowRight size={18} />
            </Link>
            <Link to="/login" className="btn-secondary text-base px-8 py-3.5">
              Sign In
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-6 mt-16 max-w-lg mx-auto">
            {[['500+', 'Students'], ['100+', 'Companies'], ['1K+', 'Certificates']].map(([n, l]) => (
              <div key={l} className="text-center">
                <div className="text-3xl font-black gradient-text">{n}</div>
                <div className="text-xs text-gray-500 mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Everything you need</h2>
            <p className="text-gray-400 text-lg">A complete ecosystem for internship management & skill development</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="glass-card p-7 group hover:bg-white/10 hover:border-primary-500/30 transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-primary-600/20 flex items-center justify-center mb-5 group-hover:bg-primary-600/30 transition-colors">
                  <Icon size={22} className="text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Built for everyone</h2>
            <p className="text-gray-400 text-lg">Three tailored experiences, one powerful platform</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { role: 'Student', color: 'primary', features: ['Search & apply for internships', 'Submit assignments', 'Track progress & skills', 'Download certificates'] },
              { role: 'Company', color: 'blue', features: ['Post internship listings', 'Review applications', 'Assign tasks & evaluate', 'Issue certificates'] },
              { role: 'Admin', color: 'amber', features: ['Manage all users', 'Approve listings', 'Monitor platform', 'Generate reports'] },
            ].map(({ role, color, features }) => (
              <div key={role} className="glass-card p-8 text-center">
                <div className={`w-14 h-14 rounded-2xl bg-${color}-600/20 flex items-center justify-center mx-auto mb-5`}>
                  <Zap size={24} className={`text-${color}-400`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{role}</h3>
                <ul className="space-y-2.5 text-sm text-gray-400 text-left">
                  {features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className={`text-${color}-400 mt-0.5`}>✓</span>{f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center glass-card p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/10 to-violet-600/10" />
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to get started?</h2>
            <p className="text-gray-400 mb-8">Join InternConnect today and take the first step towards your dream career.</p>
            <Link to="/register" className="btn-primary text-base px-10 py-3.5 inline-flex items-center gap-2">
              Create Free Account <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {}
      <footer className="border-t border-white/5 py-8 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-primary-600 to-violet-600 flex items-center justify-center">
              <span className="text-white font-bold text-[10px]">IC</span>
            </div>
            <span className="text-sm text-gray-500">InternConnect © 2026</span>
          </div>
          <div className="text-sm text-gray-600">Built with ❤️ for students & companies</div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
