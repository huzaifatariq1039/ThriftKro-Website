import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Lock, Fingerprint, ShieldCheck, ChevronRight } from 'lucide-react';

function Toggle({ on, onChange }) {
  return (
    <button
      onClick={onChange}
      className={`toggle-switch ${on ? 'on' : 'off'}`}
      aria-pressed={on}
    />
  );
}

function SecurityRow({ icon, label, sub, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white hover:bg-[#F7F4EF] transition-colors"
      style={{ boxShadow: '0 0 0 1px rgba(26,17,8,0.06)' }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ background: '#FFF3E0' }}
      >
        <span style={{ color: '#FF5C00' }}>{icon}</span>
      </div>
      <div className="flex-1 text-left">
        <p className="font-bold text-sm" style={{ color: '#1A1108' }}>{label}</p>
        {sub && <p className="text-xs" style={{ color: 'rgba(26,17,8,0.5)' }}>{sub}</p>}
      </div>
      <ChevronRight size={18} style={{ color: 'rgba(26,17,8,0.3)' }} />
    </button>
  );
}

const defaultPrefs = {
  twoFactor: false,
  biometric: false,
  hideActivity: false,
  dataSharing: true,
  savePayment: true,
};

export default function BuyerPrivacy() {
  const [prefs, setPrefs] = useState(defaultPrefs);

  const toggle = (key) => setPrefs(prev => ({ ...prev, [key]: !prev[key] }));

  const toggles = [
    ['twoFactor', 'Two-factor authentication', 'Extra security on login'],
    ['biometric', 'Biometric login', 'Use fingerprint / face'],
    ['hideActivity', 'Hide activity status', "Don't show when you're online"],
    ['dataSharing', 'Data sharing', 'Personalized recommendations'],
    ['savePayment', 'Save payment info', 'For faster checkout'],
  ];

  return (
    <div className="min-h-screen pt-[68px]" style={{ background: '#FBF9F8' }}>
      <div className="max-w-3xl mx-auto px-6 sm:px-8 py-8 animate-fade-in">
        <Link
          to="/account"
          className="flex items-center gap-2 text-sm font-semibold mb-4"
          style={{ color: 'rgba(26,17,8,0.6)' }}
        >
          <ArrowLeft size={16} /> Back
        </Link>

        <h1
          className="font-extrabold mb-8"
          style={{ fontSize: 30, letterSpacing: '-0.03em', color: '#1A1108' }}
        >
          Privacy & Security
        </h1>

        {/* Toggles */}
        <div className="space-y-3 mb-6">
          {toggles.map(([key, label, desc]) => (
            <div
              key={key}
              className="flex items-center gap-4 p-4 rounded-2xl bg-white"
              style={{ boxShadow: '0 0 0 1px rgba(26,17,8,0.06)' }}
            >
              <div className="flex-1">
                <p className="font-bold text-sm" style={{ color: '#1A1108' }}>
                  {label}
                </p>
                <p className="text-xs" style={{ color: 'rgba(26,17,8,0.5)' }}>
                  {desc}
                </p>
              </div>
              <Toggle on={prefs[key]} onChange={() => toggle(key)} />
            </div>
          ))}
        </div>

        {/* Account Security section */}
        <span
          className="text-[10px] font-bold tracking-[0.1em] uppercase block mb-3"
          style={{
            color: 'rgba(26,17,8,0.4)',
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          Account security
        </span>
        <div className="space-y-3">
          <SecurityRow
            icon={<Lock size={18} />}
            label="Change password"
            onClick={() => {}}
          />
          <SecurityRow
            icon={<Fingerprint size={18} />}
            label="Manage devices"
            sub="3 active"
            onClick={() => {}}
          />
          <SecurityRow
            icon={<ShieldCheck size={18} />}
            label="Login activity"
            onClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
}
