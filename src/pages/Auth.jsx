import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { products } from '../data/products';

export default function Auth() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === '/login';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/role-selection');
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* ─── Left Panel — Gradient Visual ─── */}
      <div
        className="hidden md:flex flex-col justify-between p-12"
        style={{ background: 'linear-gradient(160deg, #FF5722, #FF8A50)' }}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <img src="/Thrift kro.png" alt="Thrift Kro" className="h-10 w-10 rounded-xl object-cover" />
          <span className="text-[17px] font-extrabold tracking-tight text-white">Thrift Kro</span>
        </Link>

        {/* Tagline */}
        <div>
          <h2
            className="font-extrabold text-white"
            style={{ fontSize: 44, lineHeight: 1, letterSpacing: '-0.03em' }}
          >
            Your next favorite fit is waiting.
          </h2>
          <p className="mt-4 text-white/70 max-w-sm text-sm">
            Join thousands thrifting the smart way across Pakistan.
          </p>
        </div>

        {/* Product avatars */}
        <div className="flex -space-x-3">
          {products.slice(0, 4).map(p => (
            <img
              key={p.id}
              src={p.image}
              alt=""
              className="w-12 h-12 rounded-full object-cover border-2 border-white/40"
            />
          ))}
        </div>
      </div>

      {/* ─── Right Panel — Auth Form ─── */}
      <div
        className="flex flex-col justify-center px-8 md:px-16 py-12"
        style={{ background: '#FBF9F8' }}
      >
        {/* Mobile logo */}
        <div className="md:hidden mb-8">
          <Link to="/" className="flex items-center gap-2.5">
            <img src="/Thrift kro.png" alt="Thrift Kro" className="h-9 w-9 rounded-xl object-cover" />
            <span className="text-[17px] font-extrabold tracking-tight" style={{ color: '#1A1108' }}>
              Thrift Kro
            </span>
          </Link>
        </div>

        {/* Label */}
        <span
          className="text-[10px] font-bold tracking-[0.1em] uppercase"
          style={{
            color: 'rgba(26,17,8,0.4)',
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          BUYER ACCOUNT
        </span>

        {/* Heading */}
        <h2
          className="font-extrabold mt-2 mb-1"
          style={{ fontSize: 34, letterSpacing: '-0.03em', color: '#1A1108' }}
        >
          {isLogin ? 'Welcome back' : 'Create your account'}
        </h2>
        <p className="text-sm mb-8" style={{ color: 'rgba(26,17,8,0.55)' }}>
          {isLogin ? 'Log in to continue.' : 'Sign up to start in seconds.'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">

          {/* Name field (signup only) */}
          {!isLogin && (
            <div>
              <label
                className="text-[10px] font-bold tracking-[0.1em] uppercase block mb-2"
                style={{
                  color: 'rgba(26,17,8,0.4)',
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                Full name
              </label>
              <input
                type="text"
                className="w-full"
                placeholder="Your name"
                required
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label
              className="text-[10px] font-bold tracking-[0.1em] uppercase block mb-2"
              style={{
                color: 'rgba(26,17,8,0.4)',
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full"
              placeholder="you@email.com"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label
              className="text-[10px] font-bold tracking-[0.1em] uppercase block mb-2"
              style={{
                color: 'rgba(26,17,8,0.4)',
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pr-12"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPass(v => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
                style={{ color: 'rgba(26,17,8,0.4)' }}
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Confirm Password (signup only) */}
          {!isLogin && (
            <div>
              <label
                className="text-[10px] font-bold tracking-[0.1em] uppercase block mb-2"
                style={{
                  color: 'rgba(26,17,8,0.4)',
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                Confirm password
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  className="w-full pr-12"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(v => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  style={{ color: 'rgba(26,17,8,0.4)' }}
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-4 rounded-xl font-extrabold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90"
            style={{ background: '#FF5C00' }}
          >
            {isLogin ? 'Log In' : 'Create Account'} <ArrowRight size={18} />
          </button>

          {/* OR divider */}
          <div className="flex items-center gap-3 py-1">
            <div className="flex-1 h-px" style={{ background: 'rgba(26,17,8,0.1)' }} />
            <span
              className="text-xs"
              style={{
                color: 'rgba(26,17,8,0.4)',
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              OR
            </span>
            <div className="flex-1 h-px" style={{ background: 'rgba(26,17,8,0.1)' }} />
          </div>

          {/* Google Button */}
          <button
            type="button"
            onClick={() => navigate('/role-selection')}
            className="w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 bg-white transition-all hover:opacity-80"
            style={{ boxShadow: '0 0 0 1px rgba(26,17,8,0.12)', color: '#1A1108' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
            </svg>
            Continue with Google
          </button>

          {/* Toggle login/signup */}
          <p className="text-center text-sm pt-2" style={{ color: 'rgba(26,17,8,0.55)' }}>
            {isLogin ? "New to Thrift Kro?" : 'Already have an account?'}{' '}
            <Link
              to={isLogin ? '/signup' : '/login'}
              className="font-extrabold"
              style={{ color: '#FF5C00' }}
            >
              {isLogin ? 'Sign up' : 'Log in'}
            </Link>
          </p>

          {/* Back to role select */}
          <Link
            to="/role-selection"
            className="w-full text-center text-sm font-semibold block"
            style={{ color: 'rgba(26,17,8,0.4)' }}
          >
            ← Choose a different role
          </Link>
        </form>
      </div>
    </div>
  );
}
