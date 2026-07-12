import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail } from 'lucide-react';

export default function Auth() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === '/login';
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/role-selection');
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex select-none">
      
      {/* Left Column - High Fashion Editorial Image */}
      <div className="hidden lg:block w-1/2 relative bg-charcoal overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070" 
          alt="High fashion editorial" 
          className="absolute inset-0 w-full h-full object-cover opacity-60 animate-ken-burns"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
        <div className="absolute bottom-16 left-16 z-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center shadow-lg animate-float-slow">
              <span className="text-white font-bold text-lg">TK</span>
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">Thrift Kro</span>
          </div>
          <p className="text-white/60 text-sm max-w-xs leading-relaxed">Pakistan's premier AI-powered marketplace for pre-loved streetwear and vintage fashion.</p>
        </div>
      </div>

      {/* Right Column - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-16 lg:p-24 relative">
        <div className="w-full max-w-[440px] animate-fade-in">
          
          {/* Mobile Header */}
          <div className="lg:hidden flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-base">TK</span>
            </div>
            <span className="text-xl font-bold text-charcoal tracking-tight">Thrift Kro</span>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-charcoal mb-2">
              {isLogin ? 'Welcome back' : 'Create an account'}
            </h2>
            <p className="text-text-muted text-[14px]">
              {isLogin 
                ? 'Sign in to access your curated portfolio.' 
                : 'Join the premier destination for pre-loved fashion.'}
            </p>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button type="button" className="flex items-center justify-center gap-2.5 py-3 px-4 bg-white border border-[#E5E7EB] rounded-xl text-[13px] font-semibold text-charcoal hover:bg-surface hover:border-[#D1D5DB] transition-all duration-200">
              <svg className="w-4 h-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Google
            </button>
            <button type="button" className="flex items-center justify-center gap-2.5 py-3 px-4 bg-white border border-[#E5E7EB] rounded-xl text-[13px] font-semibold text-charcoal hover:bg-surface hover:border-[#D1D5DB] transition-all duration-200">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
              Apple
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-[#E5E7EB]" />
            <span className="text-[12px] font-medium text-text-muted">or continue with email</span>
            <div className="flex-1 h-px bg-[#E5E7EB]" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-[12px] font-semibold text-text-secondary mb-2">Full Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full"
                  placeholder="Enter your full name"
                />
              </div>
            )}
            
            <div>
              <label className="block text-[12px] font-semibold text-text-secondary mb-2">Email Address</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
                placeholder="name@example.com"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-[12px] font-semibold text-text-secondary">Password</label>
                {isLogin && (
                  <a href="#forgot" className="text-[11px] font-semibold text-accent hover:text-accent-dark transition-colors">Forgot password?</a>
                )}
              </div>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pr-12"
                  placeholder="Enter your password"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-text-muted hover:text-charcoal transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember me (login only) */}
            {isLogin && (
              <div className="flex items-center gap-2.5">
                <input type="checkbox" id="remember" className="w-4 h-4 rounded border-[#D1D5DB] text-accent focus:ring-accent/20 cursor-pointer" />
                <label htmlFor="remember" className="text-[13px] text-text-secondary font-medium cursor-pointer select-none">Remember me</label>
              </div>
            )}

            <button 
              type="submit" 
              className="w-full bg-accent text-white py-3.5 text-[13px] font-semibold rounded-xl hover:bg-accent-dark active:scale-[0.98] transition-all duration-300 shadow-sm hover:shadow-[0_4px_20px_rgba(255,92,0,0.3)] mt-2"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-[13px] text-text-muted">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
              <Link to={isLogin ? '/signup' : '/login'} className="text-accent font-semibold hover:text-accent-dark transition-colors">
                {isLogin ? 'Sign up' : 'Sign in'}
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
