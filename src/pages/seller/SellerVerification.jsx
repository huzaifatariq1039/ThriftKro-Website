import { ScanLine, AlertTriangle } from 'lucide-react';

export default function SellerVerification() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[18px] font-bold text-charcoal">AI Verification</h2>
          <p className="text-[13px] text-text-muted mt-1">Track the authentication status of your uploaded items</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#EAEAEA] p-12 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-surface rounded-2xl flex items-center justify-center mb-4 relative">
          <ScanLine className="w-8 h-8 text-text-muted" />
          <div className="absolute top-0 right-0 w-3 h-3 bg-blue-500 rounded-full ring-2 ring-white animate-pulse" />
        </div>
        <h3 className="text-[15px] font-bold text-charcoal mb-2">No active scans</h3>
        <p className="text-[13px] text-text-secondary max-w-sm mb-6">Items uploaded will appear here while our AI verifies brand authenticity and condition grading.</p>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
        <AlertTriangle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
        <div className="text-[13px] text-blue-800">
          <p className="font-semibold mb-1">How AI Verification Works</p>
          <p className="opacity-90 leading-relaxed">Our models analyze stitching, tags, and material patterns against our database of verified authentic items. Scans typically take less than 2 minutes.</p>
        </div>
      </div>
    </div>
  );
}
