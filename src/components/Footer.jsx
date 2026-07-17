import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ background: '#1A1108' }} className="text-white/40 relative">
      {/* Accent gradient top border */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-accent to-transparent opacity-40" />
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-8 mb-12">
          {/* Brand Col */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <img src="/Thrift kro.png" alt="Thrift Kro" className="h-10 w-10 rounded-xl object-cover transition-transform duration-300 group-hover:scale-105" />
              <div>
                <span className="text-[17px] font-bold text-white tracking-tight block leading-none">Thrift Kro</span>
                <span
                  className="text-[9px] tracking-[0.2em] uppercase text-white/40 font-medium"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  AI Marketplace
                </span>
              </div>
            </Link>
            <p className="text-[13px] leading-relaxed max-w-xs text-white/50">
              Pakistan's premier AI-powered pre-loved fashion marketplace. We ensure authenticity and condition so you can shop with zero risk.
            </p>
          </div>
          
          {/* Links Cols */}
          {[
            {
              title: 'Shop',
              links: [
                { name: 'Discover', path: '/marketplace' },
                { name: 'Trending', path: '/marketplace' },
                { name: 'Virtual Try-On', path: '/vto' },
                { name: 'Search', path: '/search' }
              ]
            },
            {
              title: 'Sell',
              links: [
                { name: 'Seller Dashboard', path: '/seller' },
                { name: 'How It Works', path: '/about' },
                { name: 'AI Verification', path: '/about' },
                { name: 'Escrow Payouts', path: '/about' }
              ]
            },
            {
              title: 'Support',
              links: [
                { name: 'About Us', path: '/about' },
                { name: 'Contact Us', path: '/contact' },
                { name: 'My Account', path: '/account' },
                { name: 'Help Center', path: '/contact' }
              ]
            }
          ].map((col) => (
            <div key={col.title}>
              <h4
                className="text-[10px] font-bold text-white tracking-[0.15em] uppercase mb-6"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {col.title}
              </h4>
              <ul className="space-y-3.5">
                {col.links.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-[13px] text-white/50 hover:text-white transition-colors duration-200">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-white/[0.08] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-white/40">© {new Date().getFullYear()} Thrift Kro. All rights reserved.</p>
          <div className="flex items-center gap-3">
            {[
              { 
                name: 'Instagram', 
                icon: () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              },
              { 
                name: 'Twitter', 
                icon: () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
              },
              { name: 'TikTok', icon: null },
            ].map((social) => (
              <a
                key={social.name}
                href="#"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300"
                title={social.name}
              >
                {social.icon ? (
                  <social.icon className="w-4 h-4" />
                ) : (
                  <span className="text-[10px] font-bold">{social.name.substring(0, 2)}</span>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
