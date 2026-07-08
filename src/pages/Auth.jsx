import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { User, Mail, Lock } from 'lucide-react';

export default function Auth() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === '/login';
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/role-selection');
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center p-6 relative select-none">
      {/* Auth Card Container - Minimal & Clean */}
      <div className="w-full max-w-[420px] bg-white rounded-2xl border border-[#EAEAEA] p-8 sm:p-10 shadow-[0_4px_20px_rgba(0,0,0,0.015)] relative z-10">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#121212] text-white font-bold flex items-center justify-center text-sm shadow-sm">
              TK
            </div>
            <span className="text-sm font-extrabold text-[#121212] tracking-wider uppercase">Thrift Kro</span>
          </div>
          <h2 className="text-xl font-extrabold text-[#121212] tracking-tight leading-none mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-xs text-[#888888] font-medium leading-relaxed">
            {isLogin 
              ? 'Access the premium streetwear portal' 
              : 'Join the premier pre-loved streetwear community'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-[10px] font-bold text-[#888888] uppercase tracking-wider mb-1.5 pl-1">Full Name</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4 stroke-[1.5]" />
                </span>
                <input 
                  type="text" 
                  required
                  className="w-full pl-11 pr-4 py-3 bg-[#F3F4F6] border-0 focus:ring-1 focus:ring-[#121212] rounded-xl focus:bg-white focus:outline-none transition-all text-sm font-medium text-[#121212] placeholder-slate-400"
                  placeholder="John Doe"
                />
              </div>
            </div>
          )}
          
          <div>
            <label className="block text-[10px] font-bold text-[#888888] uppercase tracking-wider mb-1.5 pl-1">Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4 stroke-[1.5]" />
              </span>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-[#F3F4F6] border-0 focus:ring-1 focus:ring-[#121212] rounded-xl focus:bg-white focus:outline-none transition-all text-sm font-medium text-[#121212] placeholder-slate-400"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5 pl-1">
              <label className="block text-[10px] font-bold text-[#888888] uppercase tracking-wider">Password</label>
              {isLogin && (
                <a href="#forgot" className="text-[10px] font-bold text-slate-500 uppercase tracking-wider hover:text-[#FF5C00] transition-colors">Forgot?</a>
              )}
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4 stroke-[1.5]" />
              </span>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-[#F3F4F6] border-0 focus:ring-1 focus:ring-[#121212] rounded-xl focus:bg-white focus:outline-none transition-all text-sm font-medium text-[#121212] placeholder-slate-400"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-[#121212] text-white py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#2A2A2A] active:scale-[0.98] transition-all duration-300 mt-6 shadow-sm"
          >
            {isLogin ? 'Login to Portal' : 'Create Account'}
          </button>
        </form>

        {/* Footer switch links */}
        <div className="mt-8 text-center pt-6 border-t border-[#EAEAEA]">
          <p className="text-xs text-[#888888] font-medium tracking-wide">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <Link to={isLogin ? '/signup' : '/login'} className="text-[#121212] font-bold hover:text-[#FF5C00] transition-colors uppercase tracking-wider">
              {isLogin ? 'Sign up' : 'Login'}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

