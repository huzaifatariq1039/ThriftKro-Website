import { Mail, MessageSquare, MapPin, Send } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] pt-28 pb-24">
      <div className="max-w-[1100px] mx-auto px-6 sm:px-12 animate-fade-in">
        
        {/* Title */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-ultralight text-accent mb-5">
            <MessageSquare className="w-4 h-4" />
            <span className="text-[12px] font-semibold uppercase tracking-wider">Support Center</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-charcoal tracking-tight mb-4 animate-slide-up">Get In Touch</h1>
          <p className="text-[14px] text-text-secondary leading-relaxed">
            Have questions about our AI verification or Escrow payments? Send us a message and our team will get back to you shortly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Info Details Cards */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {[
              { icon: Mail, label: 'Email Us', val: 'support@thriftkro.com', sub: '24/7 Response time', action: 'mailto:support@thriftkro.com' },
              { icon: MessageSquare, label: 'Live Chat', val: 'Start Live Chat', sub: 'Mon-Fri, 9am-6pm PST', action: '#' },
              { icon: MapPin, label: 'Office Address', val: 'Tech Park, DHA, Lahore', sub: 'Visitor by appointment', action: null },
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-[#EAEAEA] flex items-start gap-4 hover:shadow-md hover:border-accent/20 transition-all duration-300">
                <div className="w-11 h-11 bg-accent-ultralight rounded-xl text-accent flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-1">{item.label}</h3>
                  {item.action ? (
                    <a href={item.action} className="text-[14px] font-semibold text-charcoal hover:text-accent block transition-colors">
                      {item.val}
                    </a>
                  ) : (
                    <p className="text-[14px] font-semibold text-charcoal">{item.val}</p>
                  )}
                  <p className="text-[11px] text-text-muted mt-0.5">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl border border-[#EAEAEA]">
            <h2 className="text-[16px] font-semibold text-charcoal mb-6 pb-4 border-b border-[#F0F0F0]">Send us a message</h2>
            
            <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-semibold text-text-secondary mb-2">First Name</label>
                  <input type="text" placeholder="John" className="w-full" required />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-text-secondary mb-2">Last Name</label>
                  <input type="text" placeholder="Doe" className="w-full" required />
                </div>
              </div>
              
              <div>
                <label className="block text-[12px] font-semibold text-text-secondary mb-2">Email Address</label>
                <input type="email" placeholder="john@example.com" className="w-full" required />
              </div>
              
              <div>
                <label className="block text-[12px] font-semibold text-text-secondary mb-2">Subject</label>
                <select className="w-full" required>
                  <option>Order Issue</option>
                  <option>AI Verification Inquiry</option>
                  <option>Escrow Payment</option>
                  <option>General Question</option>
                </select>
              </div>

              <div>
                <label className="block text-[12px] font-semibold text-text-secondary mb-2">Message</label>
                <textarea rows="4" placeholder="How can we help you?" className="w-full" required></textarea>
              </div>

              <button type="submit" className="btn-accent w-full sm:w-auto py-3 px-8 text-[13px] tracking-wide flex items-center justify-center gap-2">
                <Send className="w-4 h-4" /> Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
