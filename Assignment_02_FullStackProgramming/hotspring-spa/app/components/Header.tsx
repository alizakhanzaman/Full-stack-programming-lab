'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [cartCount] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      {/* Logo + Cart Row */}
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex flex-col leading-none">
          <span className="text-3xl font-black tracking-tight text-gray-900">
            HOTSPRING<sup className="text-sm font-normal">®</sup>
          </span>
          <span className="text-red-600 text-sm font-semibold tracking-wider">Portable Spas</span>
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="text-red-600 border-b-2 border-red-600 pb-0.5">HOME</Link>
          <Link href="/category" className="text-gray-700 hover:text-red-600 transition-colors">PRODUCTS</Link>
          <Link href="/category?offer=true" className="text-gray-700 hover:text-red-600 transition-colors">SPECIAL OFFERS</Link>
          <Link href="/contact" className="text-gray-700 hover:text-red-600 transition-colors">CONTACT</Link>
        </nav>

        {/* Cart */}
        <Link
          href="/cart"
          className="hidden md:flex items-center gap-2 border border-gray-300 px-3 py-2 hover:border-red-500 transition-colors"
        >
          <span className="text-xl">🛒</span>
          <span className="text-xs text-gray-600">
            My Cart: <span className="font-bold">{cartCount} Items</span>
          </span>
        </Link>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2 text-gray-600"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className="text-2xl">{mobileMenuOpen ? '✕' : '☰'}</span>
        </button>
      </div>

      {/* Red search bar */}
      <div className="bg-red-600">
        <div className="max-w-5xl mx-auto px-4 py-2 flex items-center gap-2">
          {/* Desktop nav items */}
          <div className="hidden md:flex items-center gap-4 mr-4">
            <Link href="/category" className="text-white text-sm font-semibold hover:underline">CATEGORY</Link>
            <span className="text-red-300">|</span>
            <Link href="/category?filter=brand" className="text-white text-sm font-semibold hover:underline">BRAND</Link>
            <span className="text-red-300">|</span>
            <Link href="/about" className="text-white text-sm font-semibold hover:underline">INFO</Link>
          </div>
          {/* Search */}
          <div className="flex flex-1">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
              className="flex-1 px-3 py-2 text-sm text-gray-800 outline-none border-0"
              aria-label="Search products"
            />
            <button className="bg-gray-700 hover:bg-gray-900 text-white px-5 py-2 text-sm font-bold uppercase transition-colors">
              SEARCH
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-white border-t border-gray-200 px-4 py-3 flex flex-col gap-3 text-sm font-medium">
          <Link href="/" className="text-red-600" onClick={() => setMobileMenuOpen(false)}>HOME</Link>
          <Link href="/category" className="text-gray-700" onClick={() => setMobileMenuOpen(false)}>PRODUCTS</Link>
          <Link href="/category?offer=true" className="text-gray-700" onClick={() => setMobileMenuOpen(false)}>SPECIAL OFFERS</Link>
          <Link href="/contact" className="text-gray-700" onClick={() => setMobileMenuOpen(false)}>CONTACT</Link>
          <Link href="/cart" className="text-gray-700" onClick={() => setMobileMenuOpen(false)}>MY CART ({cartCount})</Link>
          <Link href="/account" className="text-gray-700" onClick={() => setMobileMenuOpen(false)}>MY ACCOUNT</Link>
        </nav>
      )}
    </header>
  );
}
