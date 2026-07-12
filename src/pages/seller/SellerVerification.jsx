import { ScanLine, AlertTriangle, Camera, Cpu, CheckCircle, ArrowRight } from 'lucide-react';

export default function SellerVerification() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[18px] font-bold text-charcoal">AI Verification</h2>
          <p className="text-[13px] text-text-muted mt-1">Track the authentication status of your uploaded items</p>
        </div>
      </div>

      {/* 3-Step Process Diagram */}
      <div className="bg-white rounded-2xl border border-[#EAEAEA] p-6 sm:p-8">
        <h3 className="text-[13px] font-bold text-charcoal mb-6">How Verification Works</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: Camera, title: 'Upload Photos', desc: 'Upload clear flat-lay images of your garment, tags, and stitching details.', color: 'text-accent bg-accent-ultralight' },
            { icon: Cpu, title: 'AI Analysis', desc: 'Our models analyze patterns, tags, and material against verified databases.', color: 'text-blue-500 bg-blue-50' },
            { icon: CheckCircle, title: 'Get Certified', desc: 'Items that pass receive a Verified Authentic badge, boosting buyer trust.', color: 'text-emerald-500 bg-emerald-50' },
          ].map((step, idx) => (
            <div key={idx} className="relative flex flex-col items-center text-center p-6 bg-surface rounded-2xl border border-border/30 group hover:border-accent/20 hover:shadow-sm transition-all duration-300">
              <div className={`w-12 h-12 rounded-xl ${step.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <step.icon className="w-5 h-5" />
              </div>
              <h4 className="text-[13px] font-bold text-charcoal mb-1.5">{step.title}</h4>
              <p className="text-[11px] text-text-muted leading-relaxed">{step.desc}</p>
              {idx < 2 && (
                <ArrowRight className="hidden sm:block absolute -right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-border z-10" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#EAEAEA] overflow-hidden">
        <div className="empty-state">
          <div className="empty-state-icon relative">
            <ScanLine className="w-8 h-8 text-text-muted" />
            <div className="absolute top-0 right-0 w-3 h-3 bg-blue-500 rounded-full ring-2 ring-white animate-pulse" />
          </div>
          <h3>No active scans</h3>
          <p>Items uploaded will appear here while our AI verifies brand authenticity and condition grading.</p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
        <AlertTriangle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
        <div className="text-[13px] text-blue-800">
          <p className="font-semibold mb-1">Processing Time</p>
          <p className="opacity-90 leading-relaxed">Scans typically complete in under 2 minutes. Complex items with multiple tags may take slightly longer.</p>
        </div>
      </div>
    </div>
  );
}
