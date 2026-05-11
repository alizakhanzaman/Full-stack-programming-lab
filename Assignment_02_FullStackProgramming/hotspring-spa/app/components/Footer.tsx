'use client';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Contact */}
        <section aria-label="Contact information">
          <h3 className="text-white font-bold uppercase text-xs tracking-widest mb-4 border-b border-gray-600 pb-2">
            Contact Us
          </h3>
          <address className="not-italic text-xs leading-6 space-y-1">
            <p>yoursitename.com</p>
            <p>CALL 24/7: 888-201-8899</p>
            <p>Your Address: Street</p>
            <p>State &amp; Zip Code</p>
            <p>City &amp; Country</p>
            <p>
              Email:{' '}
              <a href="mailto:servicemail@yoursitename.com" className="text-red-400 hover:underline">
                servicemail@yoursitename.com
              </a>
            </p>
          </address>
          {/* Social icons */}
          <div className="flex gap-2 mt-3">
            {['Twitter', 'Facebook', 'LinkedIn', 'Google+', 'YouTube', 'Pinterest'].map((s) => (
              <a
                key={s}
                href="#"
                aria-label={s}
                className="w-7 h-7 bg-gray-600 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors text-xs"
              >
                {s[0]}
              </a>
            ))}
          </div>
        </section>

        {/* Information */}
        <nav aria-label="Information links">
          <h3 className="text-white font-bold uppercase text-xs tracking-widest mb-4 border-b border-gray-600 pb-2">
            Information
          </h3>
          <ul className="text-xs space-y-2">
            {[
              { label: 'About Us', href: '/about' },
              { label: 'Customer Service', href: '/contact' },
              { label: 'Privacy Policy', href: '/privacy' },
              { label: 'Site Map', href: '/sitemap' },
              { label: 'Search Terms', href: '/search' },
              { label: 'Contact Us', href: '/contact' },
              { label: 'About Us', href: '/about' },
            ].map((link) => (
              <li key={link.label + link.href}>
                <Link href={link.href} className="hover:text-red-400 transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* My Account */}
        <nav aria-label="Account links">
          <h3 className="text-white font-bold uppercase text-xs tracking-widest mb-4 border-b border-gray-600 pb-2">
            My Account
          </h3>
          <ul className="text-xs space-y-2">
            <li><Link href="/login" className="hover:text-red-400 transition-colors">Sign In</Link></li>
            <li><Link href="/cart" className="hover:text-red-400 transition-colors">View Cart</Link></li>
            <li><Link href="/account" className="hover:text-red-400 transition-colors">My Wishlist</Link></li>
          </ul>
        </nav>

        {/* Newsletter */}
        <section aria-label="Newsletter signup">
          <h3 className="text-white font-bold uppercase text-xs tracking-widest mb-4 border-b border-gray-600 pb-2">
            Signup for a Newsletter
          </h3>
          <p className="text-xs mb-2">Sign up for our newsletter:</p>
          <form onSubmit={(e) => e.preventDefault()} className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              aria-label="Newsletter email"
              className="flex-1 px-2 py-1.5 text-xs text-gray-800 outline-none"
            />
            <button type="submit" className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 text-xs font-bold uppercase transition-colors">
              Go
            </button>
          </form>
          <div className="mt-4">
            <p className="text-xs text-gray-400 mb-2 uppercase font-semibold">Payment Solutions</p>
            <div className="flex gap-1 flex-wrap">
              {['Visa', 'MC', 'Amex', 'PayPal', 'Disc'].map((p) => (
                <span key={p} className="bg-white text-gray-700 text-xs px-2 py-0.5 rounded font-bold">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="border-t border-gray-700 py-4 text-center text-xs text-gray-500">
        © 2014 Hottubspaservice.com. All Rights Reserved.
      </div>
    </footer>
  );
}
