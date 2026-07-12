import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

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
