import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Mail, Lock, Eye, EyeOff, ArrowLeft, Loader2 } from 'lucide-react';
import './admin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both your admin email and password.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();

      if (res.ok) {
        if (data.role === 'admin') {
          login(data);
          navigate('/admin');
        } else {
          setError('Access denied. This account does not possess administrator credentials.');
        }
      } else {
        setError(data.message || 'Invalid administrator credentials');
      }
    } catch (err) {
      setError('Network connection failed. Please ensure the backend server is running.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-[#090d16] text-slate-100 px-[16px] py-[40px]">
      <div className="relative w-full max-w-[460px] bg-[#0f172a] border border-[#1e293b] rounded-[24px] p-[36px] sm:p-[44px] shadow-2xl">
        <div className="flex flex-col items-center text-center mb-[32px]">
          <div className="w-[56px] h-[56px] rounded-[16px] bg-[#ae3f4f] flex items-center justify-center text-white shadow-lg shadow-[#ae3f4f]/30 mb-[16px]">
            <ShieldCheck size={30} />
          </div>

          <h1 className="text-[26px] sm:text-[30px] font-black tracking-tight text-white leading-tight">
            SHOOZ Admin
          </h1>
          <p className="text-[14px] text-slate-400 mt-[6px]">
            Sign in to access your store's administrative console
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-[24px] p-[16px] rounded-[12px] bg-red-500/10 border border-red-500/20 text-red-300 text-[13px] flex items-start gap-[12px]">
            <span className="w-[8px] h-[8px] rounded-full bg-red-400 mt-[6px] shrink-0" />
            <p className="leading-snug">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-[20px]">
          <div>
            <label className="block text-[12px] font-bold uppercase tracking-wider text-slate-300 mb-[8px]">
              Admin Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-[16px] flex items-center pointer-events-none text-slate-400">
                <Mail size={18} />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@shooz.com"
                className="w-full bg-[#090d16] border border-[#1e293b] rounded-[12px] pl-[46px] pr-[16px] h-[48px] text-[15px] text-white placeholder-slate-500 focus:outline-none focus:border-[#ae3f4f] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-bold uppercase tracking-wider text-slate-300 mb-[8px]">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-[16px] flex items-center pointer-events-none text-slate-400">
                <Lock size={18} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#090d16] border border-[#1e293b] rounded-[12px] pl-[46px] pr-[46px] h-[48px] text-[15px] text-white placeholder-slate-500 focus:outline-none focus:border-[#ae3f4f] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-[16px] flex items-center text-slate-400 hover:text-white transition-colors cursor-pointer"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-[24px] bg-[#ae3f4f] hover:bg-[#963442] text-white font-bold text-[15px] h-[48px] rounded-[12px] shadow-sm transition-all flex items-center justify-center gap-[8px] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin text-white" />
                <span>Authenticating...</span>
              </>
            ) : (
              <span>Sign In to Dashboard</span>
            )}
          </button>
        </form>

        <div className="mt-[32px] pt-[24px] border-t border-[#1e293b] text-center">
          <Link
            to="/"
            className="text-[13px] font-bold text-slate-400 hover:text-white transition-colors inline-flex items-center gap-[8px]"
          >
            <ArrowLeft size={16} /> Back to Shooz Storefront
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
