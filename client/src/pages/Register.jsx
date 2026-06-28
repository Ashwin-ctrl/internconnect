import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearError } from '../features/auth/authSlice';
import { Eye, EyeOff, Mail, Lock, User, Building2, Phone, GraduationCap, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

const Register = () => {
  const [role, setRole] = useState('student');
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', college: '', companyName: '' });
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
    if (form.password.length < 6) return toast.error('Password must be at least 6 characters');
    dispatch(register({ ...form, role }));
  };

  const set = (k, v) => setForm({ ...form, [k]: v });

  return (
    <div className="min-h-screen flex" style={{ background: 'linear-gradient(135deg, #0a0a0f 0%, #0f0c29 60%, #1a1040 100%)' }}>
      {}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 flex flex-col items-center justify-center p-16 text-center">
          <div className="absolute top-32 left-16 w-72 h-72 bg-primary-600/15 rounded-full blur-3xl" />
          <div className="absolute bottom-16 right-16 w-56 h-56 bg-violet-600/15 rounded-full blur-3xl" />
          <div className="relative z-10">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-600 to-violet-600 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-primary-900/50 animate-glow">
              <span className="text-white font-black text-3xl">IC</span>
            </div>
            <h1 className="text-5xl font-black text-white mb-4">Join <span className="gradient-text">InternConnect</span></h1>
            <p className="text-gray-400 text-lg leading-relaxed max-w-md">
              Start your journey today. Connect with top companies, track your growth, and earn certifications.
            </p>
            <div className="mt-12 space-y-3 text-left max-w-sm mx-auto">
              {['Discover internship opportunities', 'Track skills & progress', 'Earn verified certificates'].map((t, i) => (
                <div key={i} className="flex items-center gap-3 text-gray-300 text-sm">
                  <div className="w-5 h-5 rounded-full bg-primary-600/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-400 text-xs">✓</span>
                  </div>
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
          <p className="text-gray-400 mb-6">Choose your role and get started</p>

          {}
          <div className="flex bg-white/5 rounded-xl p-1 mb-6 border border-white/10">
            {[{ id: 'student', label: 'Student', icon: GraduationCap }, { id: 'company', label: 'Company', icon: Building2 }].map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => setRole(id)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${role === id ? 'bg-primary-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}>
                <Icon size={16} />{label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-300 mb-1.5 block">Full Name</label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                <input type="text" required value={form.name} onChange={e => set('name', e.target.value)}
                  className="input-field pl-10" placeholder={role === 'student' ? 'John Doe' : 'Contact Person'} />
              </div>
            </div>

            {role === 'company' && (
              <div>
                <label className="text-sm font-medium text-gray-300 mb-1.5 block">Company Name</label>
                <div className="relative">
                  <Building2 size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input type="text" required value={form.companyName} onChange={e => set('companyName', e.target.value)}
                    className="input-field pl-10" placeholder="TechCorp Inc." />
                </div>
              </div>
            )}

            {role === 'student' && (
              <div>
                <label className="text-sm font-medium text-gray-300 mb-1.5 block">College / University</label>
                <div className="relative">
                  <GraduationCap size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input type="text" value={form.college} onChange={e => set('college', e.target.value)}
                    className="input-field pl-10" placeholder="MIT, IIT Delhi..." />
                </div>
              </div>
            )}

            <div>
              <label className="text-sm font-medium text-gray-300 mb-1.5 block">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                <input type="email" required value={form.email} onChange={e => set('email', e.target.value)}
                  className="input-field pl-10" placeholder="you@example.com" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-300 mb-1.5 block">Phone</label>
              <div className="relative">
                <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)}
                  className="input-field pl-10" placeholder="+91 9876543210" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-300 mb-1.5 block">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                <input type={showPass ? 'text' : 'password'} required value={form.password}
                  onChange={e => set('password', e.target.value)}
                  className="input-field pl-10 pr-10" placeholder="Min 6 characters" />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 py-3 mt-2">
              {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : <><span>Create Account</span><ArrowRight size={16} /></>}
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-400 hover:text-primary-300 font-medium">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
