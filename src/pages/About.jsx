import { ShieldCheck, Sparkles, Lock, Recycle } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-charcoal text-white py-20 lg:py-32">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 text-center animate-slide-up">
          <h1 className="font-sans font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-6">
            Redefining <span className="text-accent">Thrift</span> in Pakistan
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            Thrift Kro is Pakistan's first AI-powered marketplace for pre-loved fashion. We eliminate the risk of online thrifting through advanced AI verification and secure escrow payments.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 lg:py-28 bg-surface">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { icon: ShieldCheck, title: "AI Authenticity", desc: "Our proprietary AI scans images to verify brand authenticity and assess condition." },
              { icon: Lock, title: "Escrow Protected", desc: "We hold your payment securely until you receive the item and confirm its condition." },
              { icon: Sparkles, title: "Virtual Try-On", desc: "Upload a photo and see how the garment fits before making a purchase." },
              { icon: Recycle, title: "Sustainable Fashion", desc: "By choosing pre-loved, you're extending the lifecycle of garments and reducing waste." }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl elevation-1 animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="w-12 h-12 bg-surface rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-charcoal" />
                </div>
                <h3 className="text-lg font-semibold text-charcoal mb-3">{feature.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-charcoal mb-6">The Thrift Kro Vision</h2>
            <div className="space-y-4 text-[15px] text-text-secondary leading-relaxed">
              <p>
                Buying second-hand clothing online has always been a gamble. Misrepresented condition, fake items, and scams have kept many from embracing sustainable fashion.
              </p>
              <p>
                We built Thrift Kro to solve this. By integrating cutting-edge Computer Vision and AI, we automatically grade the condition of every listed item.
              </p>
              <p>
                Coupled with our strict Escrow payment system, we ensure that buyers only pay for exactly what was advertised, and sellers are protected from fraudulent returns.
              </p>
            </div>
          </div>
          <div className="aspect-[4/5] bg-surface rounded-2xl overflow-hidden elevation-2">
            <img src="/images/hoodie.png" alt="Thrift Kro Vision" className="w-full h-full object-cover opacity-80 mix-blend-multiply" />
          </div>
        </div>
      </section>
    </div>
  );
}
