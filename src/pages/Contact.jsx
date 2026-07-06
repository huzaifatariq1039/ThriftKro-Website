import { Mail, MessageSquare, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen bg-surface py-20 lg:py-28">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16 animate-slide-up">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal tracking-tight mb-4">Get in Touch</h1>
          <p className="text-[15px] text-text-secondary leading-relaxed">
            Have a question about an order, our AI verification process, or how escrow works? Our support team is here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-2xl elevation-1 flex items-start gap-4 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-accent-dark" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-charcoal mb-1">Email Us</h3>
                <p className="text-[13px] text-text-muted mb-2">We typically reply within 24 hours.</p>
                <a href="mailto:support@thriftkro.com" className="text-[13px] font-semibold text-charcoal hover:text-accent-dark transition-colors">support@thriftkro.com</a>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl elevation-1 flex items-start gap-4 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center shrink-0">
                <MessageSquare className="w-5 h-5 text-accent-dark" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-charcoal mb-1">Live Chat</h3>
                <p className="text-[13px] text-text-muted mb-2">Available Mon-Fri, 9am - 5pm PKT.</p>
                <button className="text-[13px] font-semibold text-charcoal hover:text-accent-dark transition-colors">Start Chat</button>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl elevation-1 flex items-start gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-accent-dark" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-charcoal mb-1">Office</h3>
                <p className="text-[13px] text-text-muted leading-relaxed">
                  Tech Park, Block B<br />
                  Lahore, Pakistan
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 sm:p-10 rounded-2xl elevation-2 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-xl font-bold text-charcoal mb-8">Send a Message</h2>
              
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[11px] font-bold text-text-muted uppercase tracking-wider mb-2">First Name</label>
                    <input type="text" className="w-full px-4 py-3 bg-surface rounded-xl border border-transparent focus:bg-white focus:border-border focus:outline-none focus:ring-1 focus:ring-accent transition-all text-sm" placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-text-muted uppercase tracking-wider mb-2">Last Name</label>
                    <input type="text" className="w-full px-4 py-3 bg-surface rounded-xl border border-transparent focus:bg-white focus:border-border focus:outline-none focus:ring-1 focus:ring-accent transition-all text-sm" placeholder="Doe" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-[11px] font-bold text-text-muted uppercase tracking-wider mb-2">Email Address</label>
                  <input type="email" className="w-full px-4 py-3 bg-surface rounded-xl border border-transparent focus:bg-white focus:border-border focus:outline-none focus:ring-1 focus:ring-accent transition-all text-sm" placeholder="john@example.com" />
                </div>
                
                <div>
                  <label className="block text-[11px] font-bold text-text-muted uppercase tracking-wider mb-2">Subject</label>
                  <select className="w-full px-4 py-3 bg-surface rounded-xl border border-transparent focus:bg-white focus:border-border focus:outline-none focus:ring-1 focus:ring-accent transition-all text-sm text-text-secondary appearance-none">
                    <option>Order Issue</option>
                    <option>AI Verification Inquiry</option>
                    <option>Escrow Payment</option>
                    <option>General Question</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-[11px] font-bold text-text-muted uppercase tracking-wider mb-2">Message</label>
                  <textarea rows="5" className="w-full px-4 py-3 bg-surface rounded-xl border border-transparent focus:bg-white focus:border-border focus:outline-none focus:ring-1 focus:ring-accent transition-all text-sm resize-none" placeholder="How can we help you?"></textarea>
                </div>
                
                <button type="submit" className="btn-primary w-full sm:w-auto">Send Message</button>
              </form>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
