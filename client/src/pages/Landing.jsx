import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  ArrowRight, Search, ClipboardList, Award, MessageSquare,
  BarChart3, Shield, Sparkles, Zap, Target, TrendingUp,
  GitBranch, BookOpen, CheckCircle2, Star,
} from 'lucide-react';

const Landing = () => {
  const { user } = useSelector(s => s.auth);
  const dashPath = user ? ({ student: '/student/dashboard', company: '/company/dashboard', admin: '/admin/dashboard' }[user.role]) : null;

  const pipeline = [
    { label: 'Discover', icon: Search, color: '#7c3aed' },
    { label: 'Gap Analysis', icon: Target, color: '#8b5cf6' },
    { label: 'Prepare', icon: BookOpen, color: '#6366f1' },
    { label: 'Apply', icon: ArrowRight, color: '#3b82f6' },
    { label: 'Complete Tasks', icon: ClipboardList, color: '#06b6d4' },
    { label: 'Build Portfolio', icon: Star, color: '#10b981' },
    { label: 'Get Certified', icon: Award, color: '#f59e0b' },
  ];

  const features = [
    {
      icon: Target,
      title: 'Career Readiness Score',
      desc: 'Know exactly how ready you are: "You are 78% ready for this MERN Stack Internship." See what to improve.',
      color: 'text-primary-400',
      bg: 'rgba(124,58,237,0.15)',
    },
    {
      icon: TrendingUp,
      title: 'Intelligent Fit Scores',
      desc: 'Every internship card shows your match score, matched skills ✓, and missing skills ⚠ — then recommends a roadmap.',
      color: 'text-blue-400',
      bg: 'rgba(59,130,246,0.15)',
    },
    {
      icon: GitBranch,
      title: 'Transparent Application Pipeline',
      desc: 'Track your journey: Applied → Shortlisted → Assessment → Interview → Selected. See how many times your resume was viewed.',
      color: 'text-cyan-400',
      bg: 'rgba(6,182,212,0.15)',
    },
    {
      icon: BookOpen,
      title: 'Skill Gap Roadmap',
      desc: 'Missing a skill? Get a personalized week-by-week learning roadmap to close the gap and go from 72% → 94% readiness.',
      color: 'text-violet-400',
      bg: 'rgba(139,92,246,0.15)',
    },
    {
      icon: ClipboardList,
      title: 'Real-World Assignments',
      desc: 'Complete actual tasks assigned by companies during your internship. Build provable experience, not just theoretical knowledge.',
      color: 'text-amber-400',
      bg: 'rgba(245,158,11,0.15)',
    },
    {
      icon: Award,
      title: 'Verified Certificates',
      desc: 'Earn QR-verified PDF certificates on completion. Each certificate links to a live verification page for employers.',
      color: 'text-emerald-400',
      bg: 'rgba(16,185,129,0.15)',
    },
  ];

  const roles = [
    {
      role: 'Student',
      color: 'primary',
      emoji: '🎓',
      features: [
        'Personalized career readiness score',
        'Fit scores for every internship',
        'Skill gap analysis & roadmaps',
        'Transparent application pipeline',
        'Real assignment submission',
        'Verified portfolio & certificates',
      ],
    },
    {
      role: 'Company',
      color: 'blue',
      emoji: '🏢',
      features: [
        'Post and manage internship listings',
        'Applicants ranked by skill match %',
        'Skill distribution analytics',
        'Application pipeline management',
        'Assign real-world tasks',
        'Issue verified certificates',
      ],
    },
    {
      role: 'Admin',
      color: 'amber',
      emoji: '🛡',
      features: [
        'Manage all users & verifications',
        'Approve internship listings',
        'Platform-wide analytics',
        'Discussion moderation',
        'Certificate oversight',
        'Comprehensive reporting',
      ],
    },
  ];

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0a0a0f 0%, #0f0c29 50%, #0a0a1a 100%)' }}>
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5"
        style={{ background: 'rgba(10,10,15,0.85)', backdropFilter: 'blur(20px)' }}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-violet-600 flex items-center justify-center shadow-lg shadow-primary-900/50">
              <span className="text-white font-black text-xs">IC</span>
            </div>
            <span className="font-bold text-white">InternConnect</span>
          </Link>
          <div className="flex items-center gap-3">
            {user ? (
              <Link to={dashPath} className="btn-primary text-sm px-5 py-2">
                Dashboard <ArrowRight size={14} className="inline ml-1" />
              </Link>
            ) : (
              <>
                <Link to="/login" className="btn-secondary text-sm px-5 py-2">Sign In</Link>
                <Link to="/register" className="btn-primary text-sm px-5 py-2">Get Started</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-36 pb-24 px-6 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-primary-600/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-600/8 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-semibold"
            style={{ background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.25)', color: '#c4b5fd' }}>
            <Sparkles size={12} /> The Career Readiness Engine for Interns
          </div>

          <h1 className="text-6xl md:text-7xl font-black text-white leading-[1.05] mb-6">
            From Skill Gaps<br />
            <span className="gradient-text">to Career Wins.</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-4 leading-relaxed">
            InternConnect doesn't just help you find internships — it tells you <strong className="text-white">how ready you are</strong>, shows you
            <strong className="text-white"> exactly what to learn</strong>, tracks your journey, and builds your <strong className="text-white">verified portfolio</strong>.
          </p>
          <p className="text-base text-gray-500 mb-10">
            The career operating system built for students who want more than a job board.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link to="/register" className="btn-primary text-base px-8 py-3.5 flex items-center gap-2 shadow-xl shadow-primary-900/50">
              Start Your Career Journey <ArrowRight size={18} />
            </Link>
            <Link to="/login" className="btn-secondary text-base px-8 py-3.5">
              Sign In
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-8 mt-16 max-w-sm mx-auto">
            {[['500+', 'Students'], ['100+', 'Companies'], ['1K+', 'Certificates']].map(([n, l]) => (
              <div key={l} className="text-center">
                <div className="text-3xl font-black gradient-text">{n}</div>
                <div className="text-xs text-gray-500 mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Pipeline Flow */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-white mb-3">The Better Internship Model</h2>
            <p className="text-gray-400">Not just "Find → Apply". A complete career development lifecycle.</p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-3">
            {pipeline.map(({ label, icon: Icon, color }, i) => (
              <div key={label} className="flex items-center gap-3">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform hover:-translate-y-1"
                    style={{ background: `${color}20`, border: `1px solid ${color}40`, boxShadow: `0 0 20px ${color}15` }}>
                    <Icon size={22} style={{ color }} />
                  </div>
                  <span className="text-xs text-gray-400 text-center font-medium max-w-[70px] leading-tight">{label}</span>
                </div>
                {i < pipeline.length - 1 && (
                  <div className="flex flex-col items-center mb-5">
                    <div className="w-6 h-px" style={{ background: 'rgba(124,58,237,0.3)' }} />
                    <div className="w-1.5 h-1.5 rounded-full -ml-1" style={{ background: 'rgba(124,58,237,0.5)' }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Readiness Score Demo */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-8 md:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/5 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6">
                <Target size={18} className="text-primary-400" />
                <span className="text-sm font-semibold text-primary-300">Career Readiness Engine — Live Preview</span>
              </div>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">MERN Stack Developer</h3>
                  <p className="text-gray-400 text-sm mb-6">TechCorp Solutions · 3 Months · ₹18,000/mo</p>

                  <div className="space-y-2 mb-6">
                    {[
                      { skill: 'React.js', status: 'matched' },
                      { skill: 'Node.js', status: 'matched' },
                      { skill: 'MongoDB', status: 'matched' },
                      { skill: 'Docker', status: 'missing' },
                      { skill: 'REST APIs', status: 'partial' },
                    ].map(({ skill, status }) => (
                      <div key={skill} className="flex items-center justify-between p-2.5 rounded-lg"
                        style={{
                          background: status === 'matched' ? 'rgba(16,185,129,0.08)' : status === 'missing' ? 'rgba(245,158,11,0.08)' : 'rgba(59,130,246,0.08)',
                          border: `1px solid ${status === 'matched' ? 'rgba(16,185,129,0.2)' : status === 'missing' ? 'rgba(245,158,11,0.2)' : 'rgba(59,130,246,0.2)'}`,
                        }}>
                        <span className="text-sm text-white">{skill}</span>
                        <span className="text-xs font-semibold"
                          style={{ color: status === 'matched' ? '#6ee7b7' : status === 'missing' ? '#fde68a' : '#93c5fd' }}>
                          {status === 'matched' ? '✓ Strong' : status === 'missing' ? '⚠ Missing' : '~ Intermediate'}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 rounded-xl mb-4"
                    style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}>
                    <p className="text-xs text-amber-300 font-semibold">Suggested next steps:</p>
                    <ul className="mt-1 space-y-1 text-xs text-gray-400">
                      <li>• Study Docker fundamentals (5 days)</li>
                      <li>• Build a containerized Node.js app</li>
                    </ul>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="relative mb-4" style={{ width: 160, height: 160 }}>
                    <svg width="160" height="160" style={{ transform: 'rotate(-90deg)' }}>
                      <circle cx="80" cy="80" r="64" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="12" />
                      <circle cx="80" cy="80" r="64" fill="none" stroke="#f59e0b" strokeWidth="12"
                        strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 64}`}
                        strokeDashoffset={`${2 * Math.PI * 64 * 0.22}`}
                        style={{ filter: 'drop-shadow(0 0 8px rgba(245,158,11,0.5))' }} />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-black text-white">78%</span>
                      <span className="text-xs text-amber-400 font-semibold">Ready</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 text-center mb-2">After learning Docker:</p>
                  <span className="text-2xl font-black text-emerald-400">→ 94% Ready</span>
                  <div className="mt-4 w-full">
                    <button className="btn-primary w-full py-2.5 text-sm flex items-center justify-center gap-2">
                      <TrendingUp size={14} /> Improve My Match
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-white mb-3">Everything you need to succeed</h2>
            <p className="text-gray-400 text-lg">A complete ecosystem — not just a job board</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc, color, bg }, i) => (
              <div key={i} className="glass-card p-6 group hover:border-white/15 transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all"
                  style={{ background: bg }}>
                  <Icon size={22} className={color} />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Role Cards */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-white mb-3">Built for everyone</h2>
            <p className="text-gray-400 text-lg">Three tailored experiences, one powerful platform</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {roles.map(({ role, color, emoji, features: roleFeatures }) => (
              <div key={role} className="glass-card p-8">
                <div className="text-4xl mb-4">{emoji}</div>
                <h3 className="text-xl font-bold text-white mb-5">{role}</h3>
                <ul className="space-y-3">
                  {roleFeatures.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-400">
                      <CheckCircle2 size={14} className={`text-${color}-400 mt-0.5 flex-shrink-0`} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center glass-card p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/10 to-violet-600/8 pointer-events-none" />
          <div className="relative z-10">
            <Sparkles size={32} className="text-primary-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-3">Ready to take control of your career?</h2>
            <p className="text-gray-400 mb-8 text-lg">
              Join InternConnect and start your journey from skill gaps to career wins.
            </p>
            <Link to="/register" className="btn-primary text-base px-10 py-3.5 inline-flex items-center gap-2 shadow-xl shadow-primary-900/40">
              Create Free Account <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-primary-600 to-violet-600 flex items-center justify-center">
              <span className="text-white font-bold text-[10px]">IC</span>
            </div>
            <span className="text-sm text-gray-500">InternConnect © 2026</span>
          </div>
          <div className="text-sm text-gray-600">The Career Readiness Engine</div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
