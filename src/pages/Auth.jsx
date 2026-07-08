import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Lock, ShieldCheck } from 'lucide-react';

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
      {/* Decorative Glow Elements */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Back Button */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-charcoal/60 hover:text-charcoal transition-all bg-white px-4 py-2.5 rounded-2xl border border-border/40 shadow-sm hover:-translate-y-0.5"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to Home
      </Link>

      {/* Auth Card Container */}
      <div className="w-full max-w-[480px] bg-white rounded-3xl border border-border/40 p-8 sm:p-10 shadow-lg relative z-10 animate-fade-in">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-xl bg-accent text-white font-black flex items-center justify-center shadow-sm shadow-accent/20">
              TK
            </div>
            <span className="text-lg font-black text-charcoal tracking-tight uppercase">Thrift Kro</span>
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
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-text-secondary mb-2 pl-1">Full Name</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-muted">
                  <User className="w-4 h-4" />
                </span>
                <input 
                  type="text" 
                  required
                  className="w-full pl-11 pr-4 py-3.5 text-xs font-bold bg-[#F9FAFB] border border-border/50 rounded-2xl focus:bg-white focus:border-charcoal focus:outline-none focus:ring-1 focus:ring-charcoal transition-all text-charcoal uppercase tracking-wider"
                  placeholder="John Doe"
                />
              </div>
            </div>
          )}
          
          <div>
            <label className="block text-[10px] font-extrabold uppercase tracking-wider text-text-secondary mb-2 pl-1">Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-muted">
                <Mail className="w-4 h-4" />
              </span>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 text-xs font-bold bg-[#F9FAFB] border border-border/50 rounded-2xl focus:bg-white focus:border-charcoal focus:outline-none focus:ring-1 focus:ring-charcoal transition-all text-charcoal"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2 pl-1">
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-text-secondary">Password</label>
              {isLogin && (
                <a href="#forgot" className="text-[10px] font-extrabold text-accent uppercase tracking-wider hover:underline">Forgot?</a>
              )}
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-muted">
                <Lock className="w-4 h-4" />
              </span>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 text-xs font-bold bg-[#F9FAFB] border border-border/50 rounded-2xl focus:bg-white focus:border-charcoal focus:outline-none focus:ring-1 focus:ring-charcoal transition-all text-charcoal"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button type="submit" className="w-full btn-primary py-4 mt-6 text-xs shadow-md shadow-accent/5">
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

