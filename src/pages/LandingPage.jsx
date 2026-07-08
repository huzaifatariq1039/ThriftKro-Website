import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { Star, ShieldCheck, Shirt, Handshake } from 'lucide-react';

export default function LandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroProducts = products.slice(0, 5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroProducts.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [heroProducts.length]);

  return (
    <div className="min-h-screen bg-white">
      {/* Top Header / Branding - Minimal */}
      <header className="absolute top-0 left-0 right-0 z-50">
        <div className="max-w-6xl mx-auto px-12 lg:px-24 py-8 flex justify-between items-center">
          <div className="font-sans text-3xl font-extrabold tracking-tight text-charcoal">Thrift Kro</div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-48 pb-32 px-12 lg:px-24 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Side: Tagline & CTAs */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left justify-center mx-auto w-full">
          <h1 className="font-sans font-extrabold text-6xl sm:text-7xl lg:text-[85px] xl:text-[100px] text-charcoal tracking-tight mb-6 leading-[1.05] py-2">
            Try kro.<br />
            Buy kro.<br />
            <span className="text-accent">Thrift kro.</span>
          </h1>
          <p className="text-[13px] sm:text-sm text-text-secondary max-w-sm mb-8 leading-relaxed font-medium">
            Pakistan's first AI-powered preloved streetwear marketplace. Secure escrow payments, virtual try-on, and authentic vintage.
          </p>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <Link to="/login" className="btn-accent text-white px-10 py-4 text-sm tracking-wide shadow-xl shadow-accent/20 hover:scale-105 transition-transform">
              Login
            </Link>
            <Link to="/signup" className="btn-outline px-10 py-4 text-sm tracking-wide bg-white hover:bg-charcoal hover:text-white transition-all">
              Sign Up
            </Link>
          </div>
        </div>

        {/* Right Side: Product Slideshow (Floating Images) */}
        <div className="w-full relative flex justify-center mt-12 lg:mt-0 lg:translate-x-[8%] pr-[5%] lg:pr-0">
          <div className="w-full max-w-sm sm:max-w-lg lg:max-w-[500px] xl:max-w-[560px]">
            <div className="flex items-center justify-center lg:justify-end mb-6 px-4">
              <div className="flex gap-2">
                {heroProducts.map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${currentSlide === idx ? 'bg-accent w-5' : 'bg-border'}`}
                  />
                ))}
              </div>
            </div>
            
            <div className="relative aspect-square sm:aspect-[4/5] group cursor-pointer flex justify-center items-center">
              {heroProducts.map((product, idx) => (
                <div 
                  key={product.id}
                  className={`absolute inset-0 transition-opacity duration-1000 flex flex-col items-center justify-center ${currentSlide === idx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
                >
                  <div className="relative w-full flex-1 flex justify-center items-center">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-contain drop-shadow-2xl transition-transform duration-[2000ms] group-hover:scale-105" 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Top Ranked Stores */}
      <section className="py-48 bg-surface-raised overflow-hidden border-t border-b border-border/30">
        <div className="max-w-6xl mx-auto px-12 lg:px-24">
          <div className="text-center mb-24">
            <h2 className="text-sm font-bold tracking-[0.2em] text-accent uppercase mb-3">Community Favorites</h2>
            <h3 className="text-4xl sm:text-5xl font-extrabold text-charcoal tracking-tight">Top Ranked Stores</h3>
          </div>
        </div>
          
        <div className="relative w-full overflow-hidden py-8">
          <div className="flex animate-marquee gap-8 px-4 w-max">
            {/* Double array for seamless loop */}
            {[
              'RetroVault', 'DenimCulture', 'StreetArchive', 'KickVault', 'HypeBeastPk', 'VintageVibe',
              'RetroVault', 'DenimCulture', 'StreetArchive', 'KickVault', 'HypeBeastPk', 'VintageVibe'
            ].map((store, idx) => (
              <div key={idx} className="w-[300px] bg-white p-8 rounded-3xl border border-border/50 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center cursor-pointer shrink-0 group">
                <div className="w-20 h-20 rounded-full bg-charcoal text-white flex items-center justify-center text-2xl font-bold mb-6 group-hover:bg-accent transition-colors">
                  {store.substring(0, 2).toUpperCase()}
                </div>
                <h4 className="text-xl font-bold text-charcoal mb-2">{store}</h4>
                <div className="flex items-center gap-1 text-accent mb-4">
                  {[1,2,3,4,5].map(star => <Star key={`${idx}-${star}`} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">Curated vintage and premium streetwear. Verified authenticity.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-48 bg-white">
        <div className="max-w-6xl mx-auto px-12 lg:px-24">
          <div className="text-center mb-28">
            <h2 className="text-sm font-bold tracking-[0.2em] text-accent uppercase mb-3">Why Thrift Kro?</h2>
            <h3 className="text-4xl sm:text-5xl font-extrabold text-charcoal tracking-tight">Powered by Technology</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            <div className="flex flex-col items-center text-center p-8 rounded-3xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-transparent hover:border-border/50 bg-white group cursor-default">
              <div className="w-20 h-20 bg-accent-ultralight text-accent rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                <Shirt className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-charcoal mb-4">Virtual Try-On</h4>
              <p className="text-base text-text-secondary leading-relaxed">Upload a photo of yourself and see exactly how the garment fits before you buy, powered by our advanced AI VTON model.</p>
            </div>

            <div className="flex flex-col items-center text-center p-8 rounded-3xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-transparent hover:border-border/50 bg-white group cursor-default">
              <div className="w-20 h-20 bg-accent-ultralight text-accent rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                <ShieldCheck className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-charcoal mb-4">AI Verification</h4>
              <p className="text-base text-text-secondary leading-relaxed">Our AI automatically detects garment defects, verifies tags, and ensures authentic vintage condition to protect buyers.</p>
            </div>

            <div className="flex flex-col items-center text-center p-8 rounded-3xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-transparent hover:border-border/50 bg-white group cursor-default">
              <div className="w-20 h-20 bg-accent-ultralight text-accent rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                <Handshake className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-charcoal mb-4">Price Negotiation</h4>
              <p className="text-base text-text-secondary leading-relaxed">Found something you love? Make an offer directly to the seller using our secure built-in escrow and bidding system.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Vision */}
      <section className="py-40 lg:py-56 bg-charcoal text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=2000')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-sm font-bold tracking-[0.2em] text-accent uppercase mb-6">Our Vision</h2>
          <h3 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-8 leading-tight">
            Revolutionizing the overall online shopping experience.
          </h3>
          <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed mb-12">
            We believe that buying preloved fashion should be as seamless, safe, and technologically advanced as buying retail. We are building the future of circular fashion in Pakistan.
          </p>
          <Link to="/signup" className="inline-block bg-accent text-white px-12 py-4 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-charcoal transition-all shadow-xl">
            Join The Revolution
          </Link>
        </div>
      </section>
    </div>
  );
}
