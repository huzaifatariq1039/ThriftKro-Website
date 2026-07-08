import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShieldCheck, Shirt, Handshake, ArrowLeft } from 'lucide-react';

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
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col md:flex-row">
      {/* Back Button */}
      <Link 
        to="/" 
        className="absolute top-8 left-8 z-50 flex items-center gap-2 text-xs font-semibold text-charcoal/60 hover:text-charcoal transition-colors bg-white px-4 py-2.5 rounded-full border border-border/40 shadow-sm"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to Home
      </Link>

      {/* Left Column: Visual Panel (Desktop only) */}
      <div className="hidden md:flex md:w-1/2 bg-charcoal relative overflow-hidden flex-col justify-between p-16 text-white select-none">
        {/* Background Decorative Overlay */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1200')] bg-cover bg-center opacity-25 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-charcoal via-charcoal/90 to-transparent"></div>

        {/* Content (Z-indexed above overlays) */}
        <div className="relative z-10">
          <Link to="/" className="text-3xl font-extrabold tracking-tight text-white hover:text-accent transition-colors">
            Thrift Kro
          </Link>
        </div>

        <div className="relative z-10 max-w-md">
          <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1] mb-6">
            The Hub of Pakistan's <span className="text-accent">Streetwear</span> Revolution.
          </h2>
          <p className="text-white/70 text-sm leading-relaxed mb-8">
            Join thousands of buyers and sellers using Pakistan's first AI-powered preloved streetwear platform. Authentic items, escrow payments, and virtual fits.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3.5 bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-sm">
              <div className="w-10 h-10 rounded-xl bg-accent/20 text-accent flex items-center justify-center shrink-0">
                <Shirt className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">AI Virtual Try-On</h4>
                <p className="text-[11px] text-white/55 mt-0.5">See how streetwear fits you instantly before purchasing.</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-sm">
              <div className="w-10 h-10 rounded-xl bg-accent/20 text-accent flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">AI Condition Verification</h4>
                <p className="text-[11px] text-white/55 mt-0.5">Automated authentication, condition grading, and tag detection.</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-sm">
              <div className="w-10 h-10 rounded-xl bg-accent/20 text-accent flex items-center justify-center shrink-0">
                <Handshake className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">Escrow Payment Protection</h4>
                <p className="text-[11px] text-white/55 mt-0.5">Funds are secured safely in escrow until the item arrives as described.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-[11px] text-white/40 font-medium">
          © {new Date().getFullYear()} Thrift Kro Platform. All rights reserved.
        </div>
      </div>

      {/* Right Column: Form Container */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-16 pt-24 md:pt-16 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile logo only */}
          <div className="md:hidden text-center mb-8">
            <Link to="/" className="text-3xl font-extrabold tracking-tight text-charcoal">
              Thrift Kro
            </Link>
          </div>

          <h3 className="text-3xl font-extrabold text-charcoal tracking-tight mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h3>
          <p className="text-sm text-text-secondary mb-8 font-medium">
            {isLogin 
              ? 'Enter your details to access your account.' 
              : 'Join the revolution of circular fashion.'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-widest text-text-muted mb-2">Full Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-[#F9FAFB] border border-border/80 px-4 py-3.5 text-sm focus:outline-none focus:border-accent focus:bg-white transition-all rounded-xl focus:ring-4 focus:ring-accent/10 font-medium text-charcoal placeholder-text-muted/60"
                  placeholder="John Doe"
                />
              </div>
            )}
            
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-text-muted mb-2">Email Address</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#F9FAFB] border border-border/80 px-4 py-3.5 text-sm focus:outline-none focus:border-accent focus:bg-white transition-all rounded-xl focus:ring-4 focus:ring-accent/10 font-medium text-charcoal placeholder-text-muted/60"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-[11px] font-bold uppercase tracking-widest text-text-muted">Password</label>
                {isLogin && (
                  <a href="#forgot" className="text-[11px] font-bold text-accent hover:underline">Forgot?</a>
                )}
              </div>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#F9FAFB] border border-border/80 px-4 py-3.5 text-sm focus:outline-none focus:border-accent focus:bg-white transition-all rounded-xl focus:ring-4 focus:ring-accent/10 font-medium text-charcoal placeholder-text-muted/60"
                placeholder="••••••••"
              />
            </div>

            <button type="submit" className="w-full bg-accent text-white py-4 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-charcoal hover:scale-[1.02] active:scale-[0.98] transition-all mt-6 shadow-lg shadow-accent/10">
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-text-secondary">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <Link to={isLogin ? '/signup' : '/login'} className="text-accent font-bold hover:underline transition-colors">
                {isLogin ? 'Sign up' : 'Login'}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

