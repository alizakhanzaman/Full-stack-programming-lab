'use client';
import Link from 'next/link';

export default function TopBar() {
  return (
    <div className="bg-gray-100 border-b border-gray-200 text-xs py-1">
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
        <p className="text-gray-600">
          Call for Customer support:{' '}
          <a href="tel:02038989565" className="text-red-600 font-semibold hover:underline">
            020 38989565
          </a>
        </p>
        <nav className="flex items-center gap-4">
          <Link href="/account" className="text-gray-600 hover:text-red-600">My Account</Link>
          <span className="text-gray-300">|</span>
          <Link href="/wishlist" className="text-gray-600 hover:text-red-600">Wishlist</Link>
          <span className="text-gray-300">|</span>
          <Link href="/checkout" className="text-gray-600 hover:text-red-600">To Checkout</Link>
        </nav>
      </div>
    </div>
  );
}
