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
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center p-6 relative select-none overflow-hidden">
      {/* Decorative Aurora Glow Elements for 2026 Modern Aesthetic */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-accent/8 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-accent/4 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Auth Card Container - Premium Glassmorphism */}
      <div className="w-full max-w-[440px] bg-white/70 backdrop-blur-xl rounded-3xl border border-charcoal/5 p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.03)] relative z-10 animate-fade-in">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-xl bg-accent text-white font-black flex items-center justify-center shadow-md shadow-accent/15">
              TK
            </div>
            <span className="text-base font-black text-charcoal tracking-tight uppercase">Thrift Kro</span>
          </div>
          <h2 className="text-2xl font-black text-charcoal uppercase tracking-tight leading-none mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-xs text-text-secondary font-medium tracking-wide">
            {isLogin 
              ? 'Enter your credentials to access your store portal' 
              : 'Join the premier pre-loved streetwear community'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-1.5 pl-1">Full Name</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-muted/65">
                  <User className="w-4 h-4" />
                </span>
                <input 
                  type="text" 
                  required
                  className="w-full pl-11 pr-4 py-3 bg-white border border-border/50 rounded-2xl focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/5 transition-all text-sm font-medium text-charcoal placeholder-text-muted/40"
                  placeholder="John Doe"
                />
              </div>
            </div>
          )}
          
          <div>
            <label className="block text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-1.5 pl-1">Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-muted/65">
                <Mail className="w-4 h-4" />
              </span>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-border/50 rounded-2xl focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/5 transition-all text-sm font-medium text-charcoal placeholder-text-muted/40"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5 pl-1">
              <label className="block text-[11px] font-bold text-text-secondary uppercase tracking-wider">Password</label>
              {isLogin && (
                <a href="#forgot" className="text-[10px] font-bold text-accent uppercase tracking-wider hover:underline">Forgot?</a>
              )}
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-muted/65">
                <Lock className="w-4 h-4" />
              </span>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-border/50 rounded-2xl focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/5 transition-all text-sm font-medium text-charcoal placeholder-text-muted/40"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-accent text-white py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-charcoal hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 shadow-md shadow-accent/10 mt-6"
          >
            {isLogin ? 'Login to Portal' : 'Create Account'}
          </button>
        </form>

        {/* Footer switch links */}
        <div className="mt-8 text-center pt-6 border-t border-border/40">
          <p className="text-xs text-text-secondary font-medium tracking-wide">
            {isLogin ? "Don't have a seller or buyer account? " : "Already have a registered account? "}
            <Link to={isLogin ? '/signup' : '/login'} className="text-accent font-bold hover:underline transition-colors uppercase tracking-wider">
              {isLogin ? 'Sign up' : 'Login'}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

