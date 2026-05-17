import Link from 'next/link';
import { FiFacebook, FiTwitter, FiInstagram, FiYoutube, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-[#2C2C2C] text-gray-300">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 bg-[#F07B1D] rotate-45 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-xs -rotate-45">RP</span>
            </div>
            <span className="font-display text-xl font-bold text-white">Rustik Plank</span>
          </div>
          <p className="text-sm leading-relaxed mb-4">
            Handcrafted furniture made from reclaimed and sustainably sourced wood. 
            Each piece tells a story.
          </p>
          <div className="flex gap-3">
            {[FiFacebook, FiTwitter, FiInstagram, FiYoutube].map((Icon, i) => (
              <a key={i} href="#" className="w-8 h-8 bg-gray-700 hover:bg-[#F07B1D] flex items-center justify-center transition-colors">
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        {/* My Account */}
        <div>
          <h4 className="text-white font-bold uppercase text-sm tracking-wider mb-4 border-b border-gray-600 pb-2">My Account</h4>
          <ul className="space-y-2 text-sm">
            {['Your Account', 'Orders History', 'Addresses', 'Your Account', 'Information'].map((item, i) => (
              <li key={i}>
                <Link href="/account" className="hover:text-[#F07B1D] transition-colors">› {item}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Help & More */}
        <div>
          <h4 className="text-white font-bold uppercase text-sm tracking-wider mb-4 border-b border-gray-600 pb-2">Help & More</h4>
          <ul className="space-y-2 text-sm">
            {[
              { label: 'Delivery Information', href: '/delivery' },
              { label: 'Return Policy', href: '/returns' },
              { label: 'Search Terms', href: '/search' },
              { label: 'Specials', href: '/products?special=true' },
              { label: 'Suppliers', href: '/suppliers' },
              { label: 'Manufacturers', href: '/manufacturers' },
            ].map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="hover:text-[#F07B1D] transition-colors">› {item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-bold uppercase text-sm tracking-wider mb-4 border-b border-gray-600 pb-2">Contact Us</h4>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <FiMapPin className="text-[#F07B1D] mt-0.5 flex-shrink-0" />
              <span>42 Reclaimed Road, London, UK EC1A 1BB</span>
            </div>
            <div className="flex items-center gap-2">
              <FiPhone className="text-[#F07B1D] flex-shrink-0" />
              <span>+44 207 123 4567</span>
            </div>
            <div className="flex items-center gap-2">
              <FiMail className="text-[#F07B1D] flex-shrink-0" />
              <span>hello@rustikplank.com</span>
            </div>
          </div>
          <div className="mt-4">
            <h5 className="text-white text-sm font-bold mb-2">Newsletter</h5>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-gray-700 border border-gray-600 px-3 py-2 text-sm focus:outline-none focus:border-[#F07B1D] text-white"
              />
              <button className="bg-[#F07B1D] hover:bg-[#D4620A] text-white px-4 py-2 text-sm transition-colors">
                GO
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-gray-500">
          <span>© 2024 Rustik Plank Furniture. All Rights Reserved.</span>
          <div className="flex gap-4">
            <Link href="/terms" className="hover:text-[#F07B1D]">Terms & Conditions</Link>
            <Link href="/sitemap" className="hover:text-[#F07B1D]">Sitemap</Link>
            <Link href="/contact" className="hover:text-[#F07B1D]">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
