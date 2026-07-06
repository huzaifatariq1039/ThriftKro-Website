import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white/40 border-t border-black/10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-8 mb-12">
          {/* Brand Col */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <img src="/Thrift kro.png" alt="Thrift Kro" className="h-10 w-10 rounded-xl object-cover transition-transform duration-300 group-hover:scale-105" />
              <div>
                <span className="text-[17px] font-bold text-white tracking-tight block leading-none">Thrift Kro</span>
                <span className="text-[9px] tracking-[0.2em] uppercase text-white/40 font-medium">AI Marketplace</span>
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
                { name: 'All Pieces', path: '/' },
                { name: 'New Arrivals', path: '/' },
                { name: 'Streetwear', path: '/' },
                { name: 'Vintage', path: '/' }
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
              <h4 className="text-[12px] font-bold text-white tracking-[0.15em] uppercase mb-6">{col.title}</h4>
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
          <div className="flex items-center gap-6">
            {['Instagram', 'Twitter', 'TikTok'].map((social) => (
              <a key={social} href="#" className="text-[12px] text-white/40 hover:text-white transition-colors uppercase tracking-wider font-medium">
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
