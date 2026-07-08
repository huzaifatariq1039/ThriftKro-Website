import { Mail, MessageSquare, MapPin, Send } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] pt-28 pb-24">
      <div className="max-w-[1100px] mx-auto px-6 sm:px-12 animate-fade-in">
        
        {/* Title */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-[0.25em] text-accent uppercase mb-3 block flex items-center justify-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5" /> Support Center
          </span>
          <h1 className="font-sans font-black text-3xl sm:text-4xl text-charcoal tracking-tight uppercase leading-none mb-4 animate-slide-up">Get In Touch</h1>
          <p className="text-sm text-text-secondary leading-relaxed font-medium">
            Have questions about our AI verification or Escrow payments? Send us a message and our support team will get back to you shortly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Info Details Cards */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {[
              { icon: Mail, label: 'Email Us', val: 'support@thriftkro.com', sub: '24/7 Response time', action: 'mailto:support@thriftkro.com' },
              { icon: MessageSquare, label: 'Live Chat', val: 'Start Live Chat', sub: 'Mon-Fri, 9am-6pm PST', action: '#' },
              { icon: MapPin, label: 'Office Address', val: 'Tech Park, DHA, Lahore', sub: 'Visitor by appointment', action: null },
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-3xl border border-border/40 shadow-sm flex items-start gap-4 hover:-translate-y-0.5 transition-all">
                <div className="w-11 h-11 bg-accent-ultralight rounded-xl text-accent flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider">{item.label}</h3>
                  {item.action ? (
                    <a href={item.action} className="text-sm font-extrabold text-charcoal hover:text-accent mt-1 block uppercase tracking-wide transition-colors">
                      {item.val}
                    </a>
                  ) : (
                    <p className="text-sm font-extrabold text-charcoal mt-1 uppercase tracking-wide">{item.val}</p>
                  )}
                  <p className="text-[10px] text-text-muted mt-0.5 font-bold uppercase tracking-wider">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-border/40 shadow-sm">
            <h2 className="text-sm font-bold tracking-widest text-charcoal uppercase mb-6 pb-4 border-b border-border/60">Send Message</h2>
            
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-extrabold text-text-secondary uppercase tracking-wider mb-2">First Name</label>
                  <input type="text" placeholder="John" className="w-full" required />
                </div>
                <div>
                  <label className="block text-[10px] font-extrabold text-text-secondary uppercase tracking-wider mb-2">Last Name</label>
                  <input type="text" placeholder="Doe" className="w-full" required />
                </div>
              </div>
              
              <div>
                <label className="block text-[10px] font-extrabold text-text-secondary uppercase tracking-wider mb-2">Email Address</label>
                <input type="email" placeholder="john@example.com" className="w-full" required />
              </div>
              
              <div>
                <label className="block text-[10px] font-extrabold text-text-secondary uppercase tracking-wider mb-2">Subject</label>
                <select className="w-full" required>
                  <option>Order Issue</option>
                  <option>AI Verification Inquiry</option>
                  <option>Escrow Payment</option>
                  <option>General Question</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-extrabold text-text-secondary uppercase tracking-wider mb-2">Message</label>
                <textarea rows="4" placeholder="How can we help you?" className="w-full" required></textarea>
              </div>

              <button type="submit" className="btn-primary w-full sm:w-auto py-3.5 px-8 text-xs tracking-widest flex items-center justify-center gap-2 shadow-sm">
                <Send className="w-4 h-4" /> Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
