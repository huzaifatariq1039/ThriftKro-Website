import { ShieldCheck, Sparkles, Lock, Recycle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] pt-20">
      {/* Hero */}
      <section className="bg-charcoal text-white py-24 sm:py-32 relative overflow-hidden select-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-[1000px] mx-auto px-6 text-center animate-slide-up relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-accent text-[12px] font-semibold uppercase tracking-wider mb-4">Our Manifesto</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-none">
            Redefining <span className="text-accent">Thrift</span> in Pakistan
          </h1>
          <p className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            Thrift Kro is Pakistan's first AI-powered marketplace for pre-loved fashion. We eliminate the risk of online thrifting through advanced AI verification and secure escrow payments.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 lg:py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: ShieldCheck, title: "AI Authenticity", desc: "Our proprietary AI scans listed images to verify brand authenticity and grade conditions." },
            { icon: Lock, title: "Escrow Protected", desc: "We hold your payment securely until you receive the item and confirm its condition." },
            { icon: Sparkles, title: "Virtual Try-On", desc: "Upload a photo and preview how the garment fits before making a purchase." },
            { icon: Recycle, title: "Sustainable Living", desc: "By choosing pre-loved, you are extending the lifecycle of garments and reducing waste." }
          ].map((feature, i) => (
            <div 
              key={i} 
              className="bg-white p-8 rounded-2xl border border-[#EAEAEA] hover:shadow-lg hover:border-accent/20 transition-all duration-300 animate-fade-up" 
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="w-12 h-12 bg-accent-ultralight text-accent rounded-2xl flex items-center justify-center mb-6">
                <feature.icon className="w-5 h-5" />
              </div>
              <h3 className="text-[15px] font-bold text-charcoal mb-2">{feature.title}</h3>
              <p className="text-[13px] text-text-secondary leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story / Vision */}
      <section className="py-16 lg:py-24 max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7 space-y-6">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-ultralight text-accent text-[11px] font-semibold uppercase tracking-wider">How We Work</span>
            <h2 className="text-3xl font-bold text-charcoal tracking-tight leading-none mt-3">The Thrift Kro Vision</h2>
            <div className="space-y-4 text-sm text-text-secondary leading-relaxed font-medium">
              <p>
                Buying second-hand clothing online has always been a gamble. Misrepresented condition, counterfeit drops, and transaction scams have kept many from embracing sustainable fashion.
              </p>
              <p>
                We built Thrift Kro to solve this. By integrating cutting-edge Computer Vision and AI, we automatically verify and score the condition of every listed item.
              </p>
              <p>
                Coupled with our strict Escrow payment system, we ensure that buyers only pay for exactly what was advertised, and sellers are protected from fraudulent returns.
              </p>
            </div>
            <div className="pt-2">
              <Link to="/seller" className="btn-accent py-3.5 text-[13px]">Start Selling Now</Link>
            </div>
          </div>
          <div className="md:col-span-5 aspect-[4/5] bg-white border border-[#EAEAEA] p-4 rounded-2xl overflow-hidden select-none">
            <img src="/images/hoodie.png" alt="Thrift Kro Vision" className="w-full h-full object-contain drop-shadow-xl hover:scale-105 transition-transform duration-700" />
          </div>
        </div>
      </section>
    </div>
  );
}
