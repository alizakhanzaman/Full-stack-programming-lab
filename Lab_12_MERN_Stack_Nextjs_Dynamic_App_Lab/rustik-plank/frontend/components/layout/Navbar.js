'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import useCartStore from '@/lib/store';
import {
  FiShoppingCart, FiUser, FiSearch, FiMenu, FiX, FiHeart, FiChevronDown
} from 'react-icons/fi';

const categories = [
  { name: 'Beds', href: '/products?category=beds' },
  { name: 'Bookcases', href: '/products?category=bookcases' },
  { name: 'Cabinets', href: '/products?category=cabinets' },
  { name: 'Boxes', href: '/products?category=boxes' },
  { name: 'Chairs', href: '/products?category=chairs' },
  { name: 'Tables', href: '/products?category=tables' },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const { count, toggleCart } = useCartStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      {/* Top bar */}
      <div className="bg-[#2C2C2C] text-white text-xs py-1.5 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <span>Free shipping on orders over £200</span>
          <div className="flex gap-4">
            <Link href="/about" className="hover:text-[#F07B1D] transition-colors">About Us</Link>
            <Link href="/blog" className="hover:text-[#F07B1D] transition-colors">Blog</Link>
            <Link href="/contact" className="hover:text-[#F07B1D] transition-colors">Contact Us</Link>
            {user ? (
              <>
                <Link href="/account" className="hover:text-[#F07B1D] transition-colors">My Account</Link>
                <button onClick={logout} className="hover:text-[#F07B1D] transition-colors">Logout</button>
              </>
            ) : (
              <Link href="/auth" className="hover:text-[#F07B1D] transition-colors">Login / Register</Link>
            )}
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#F07B1D] rotate-45 flex items-center justify-center">
                <span className="text-white font-bold text-xs -rotate-45">RP</span>
              </div>
              <div>
                <div className="font-display text-2xl font-bold text-[#2C2C2C] leading-none">Rustik Plank</div>
                <div className="text-[9px] text-[#8B6043] uppercase tracking-widest font-body">Furniture</div>
              </div>
            </div>
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-xl hidden md:block">
            <form action="/products" method="GET" className="relative">
              <input
                type="text"
                name="search"
                placeholder="Search for furniture..."
                className="w-full border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:border-[#F07B1D] pr-12"
              />
              <button type="submit" className="absolute right-0 top-0 h-full px-4 bg-[#F07B1D] text-white hover:bg-[#D4620A] transition-colors">
                <FiSearch size={16} />
              </button>
            </form>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button onClick={() => setSearchOpen(!searchOpen)} className="md:hidden p-2 hover:text-[#F07B1D] transition-colors">
              <FiSearch size={20} />
            </button>
            {user ? (
              <Link href="/account" className="p-2 hover:text-[#F07B1D] transition-colors relative group">
                <FiUser size={20} />
                <span className="hidden md:block text-xs absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-gray-500 group-hover:text-[#F07B1D]">Account</span>
              </Link>
            ) : (
              <Link href="/auth" className="p-2 hover:text-[#F07B1D] transition-colors">
                <FiUser size={20} />
              </Link>
            )}
            <Link href="/wishlist" className="p-2 hover:text-[#F07B1D] transition-colors hidden md:block">
              <FiHeart size={20} />
            </Link>
            <button onClick={toggleCart} className="p-2 hover:text-[#F07B1D] transition-colors relative">
              <FiShoppingCart size={20} />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#F07B1D] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {count}
                </span>
              )}
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2">
              {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        {searchOpen && (
          <div className="md:hidden px-4 pb-3">
            <form action="/products" method="GET">
              <div className="relative">
                <input type="text" name="search" placeholder="Search..." className="w-full border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:border-[#F07B1D] pr-12" />
                <button type="submit" className="absolute right-0 top-0 h-full px-4 bg-[#F07B1D] text-white">
                  <FiSearch size={16} />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Category nav */}
        <nav className="border-t border-gray-100 hidden md:block">
          <div className="max-w-7xl mx-auto px-4">
            <ul className="flex items-center gap-0">
              <li>
                <Link href="/products" className="px-4 py-3 text-sm font-bold text-white bg-[#F07B1D] block uppercase tracking-wide hover:bg-[#D4620A] transition-colors">
                  All Products
                </Link>
              </li>
              {categories.map((cat) => (
                <li key={cat.name}>
                  <Link href={cat.href} className="px-4 py-3 text-sm text-[#2C2C2C] block uppercase tracking-wide hover:text-[#F07B1D] transition-colors font-medium">
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li className="ml-auto">
                <Link href="/products?special=true" className="px-4 py-3 text-sm font-bold text-[#F07B1D] block uppercase tracking-wide hover:text-[#D4620A] transition-colors">
                  ★ Sale
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4">
            <ul className="space-y-2">
              <li><Link href="/products" className="block py-2 font-bold text-[#F07B1D] uppercase text-sm" onClick={() => setMobileOpen(false)}>All Products</Link></li>
              {categories.map((cat) => (
                <li key={cat.name}>
                  <Link href={cat.href} className="block py-2 text-sm uppercase text-[#2C2C2C] hover:text-[#F07B1D]" onClick={() => setMobileOpen(false)}>{cat.name}</Link>
                </li>
              ))}
              <li className="border-t pt-2 mt-2">
                <Link href="/about" className="block py-2 text-sm text-gray-600" onClick={() => setMobileOpen(false)}>About</Link>
                <Link href="/contact" className="block py-2 text-sm text-gray-600" onClick={() => setMobileOpen(false)}>Contact</Link>
                {!user && <Link href="/auth" className="block py-2 text-sm text-gray-600" onClick={() => setMobileOpen(false)}>Login / Register</Link>}
              </li>
            </ul>
          </div>
        )}
      </header>
    </>
  );
}
