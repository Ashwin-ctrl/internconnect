import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError } from '../features/auth/authSlice';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector(s => s.auth);

  useEffect(() => {
    if (user) {
      const paths = { student: '/student/dashboard', company: '/company/dashboard', admin: '/admin/dashboard' };
      navigate(paths[user.role] || '/');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (error) { toast.error(error); dispatch(clearError()); }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(form));
  };

  const demoAccounts = [
    { label: 'Student', email: 'student@demo.com', password: 'Student@123', color: 'emerald' },
    { label: 'Admin', email: 'admin@internconnect.com', password: 'Admin@123', color: 'amber' },
    { label: 'Company', email: 'techcorp@demo.com', password: 'Company@123', color: 'blue' },
  ];

  return (
    <div className="min-h-screen flex" style={{ background: 'linear-gradient(135deg, #0a0a0f 0%, #0f0c29 60%, #1a1040 100%)' }}>
      {}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 flex flex-col items-center justify-center p-16 text-center">
          {}
          <div className="absolute top-20 left-20 w-64 h-64 bg-primary-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-violet-600/20 rounded-full blur-3xl" />
          <div className="relative z-10">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-600 to-violet-600 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-primary-900/50 animate-glow">
              <span className="text-white font-black text-3xl">IC</span>
            </div>
            <h1 className="text-5xl font-black text-white mb-4 leading-tight">
              Intern<span className="gradient-text">Connect</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed max-w-md">
              The centralized platform connecting students with opportunities, companies with talent, and dreams with reality.
            </p>
            <div className="grid grid-cols-3 gap-4 mt-12">
              {[['500+', 'Students'], ['100+', 'Companies'], ['1K+', 'Internships']].map(([num, label]) => (
                <div key={label} className="glass-card p-4 text-center">
                  <div className="text-2xl font-bold gradient-text">{num}</div>
                  <div className="text-xs text-gray-500 mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Welcome back</h2>
            <p className="text-gray-400">Sign in to your InternConnect account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                <input type="email" required value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="input-field pl-10" placeholder="you@example.com" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                <input type={showPass ? 'text' : 'password'} required value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  className="input-field pl-10 pr-10" placeholder="••••••••" />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 py-3">
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <><span>Sign In</span><ArrowRight size={16} /></>
              )}
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary-400 hover:text-primary-300 font-medium">Create one</Link>
          </p>

          {}
          <div className="mt-8 p-4 rounded-xl border border-white/5 bg-white/3">
            <p className="text-xs text-gray-500 text-center mb-3 font-medium uppercase tracking-wider">Quick Demo Access</p>
            <div className="space-y-2">
              {demoAccounts.map(({ label, email, password, color }) => (
                <button key={label}
                  onClick={() => setForm({ email, password })}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs border border-${color}-500/20 bg-${color}-500/5 hover:bg-${color}-500/10 transition-colors`}>
                  <span className={`font-semibold text-${color}-400`}>{label}</span>
                  <span className="text-gray-500 ml-2">{email}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
