import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Auth() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === '/login';
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login/signup logic
    navigate('/role-selection');
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6">
      <Link to="/" className="text-3xl font-extrabold tracking-tight text-charcoal mb-12">
        Thrift Kro
      </Link>
      
      <div className="bg-white p-10 sm:p-12 rounded-3xl shadow-xl border border-border max-w-md w-full">
        <h2 className="text-3xl font-extrabold text-charcoal tracking-tight mb-2">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p className="text-sm text-text-secondary mb-8 font-medium">
          {isLogin 
            ? 'Enter your details to access your account.' 
            : 'Join the revolution of circular fashion.'}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {!isLogin && (
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-text-muted mb-2">Full Name</label>
              <input 
                type="text" 
                required
                className="w-full bg-surface border border-border px-4 py-3 text-sm focus:outline-none focus:border-charcoal transition-colors rounded-xl"
                placeholder="John Doe"
              />
            </div>
          )}
          
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-widest text-text-muted mb-2">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-surface border border-border px-4 py-3 text-sm focus:outline-none focus:border-charcoal transition-colors rounded-xl"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-widest text-text-muted mb-2">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-surface border border-border px-4 py-3 text-sm focus:outline-none focus:border-charcoal transition-colors rounded-xl"
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="w-full bg-accent text-white py-4 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-charcoal transition-colors mt-4">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-text-secondary">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <Link to={isLogin ? '/signup' : '/login'} className="text-accent font-bold hover:underline">
              {isLogin ? 'Sign up' : 'Login'}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
