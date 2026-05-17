'use client';
import Link from 'next/link';
import { FiHeart } from 'react-icons/fi';

export default function WishlistPage() {
  return (
    <div className="min-h-screen bg-[#FAF6F0] flex items-center justify-center">
      <div className="text-center bg-white p-12 shadow-sm max-w-md">
        <FiHeart className="mx-auto text-[#F07B1D] mb-4" size={48} />
        <h2 className="font-display text-2xl font-bold text-[#2C2C2C] mb-3">Your Wishlist</h2>
        <p className="text-gray-500 mb-6 text-sm">
          Save your favourite pieces here. Login to sync your wishlist across devices.
        </p>
        <div className="flex gap-3 justify-center">
          <Link href="/products" className="bg-[#F07B1D] text-white px-6 py-3 font-bold uppercase text-sm hover:bg-[#D4620A] transition-colors">
            Browse Products
          </Link>
          <Link href="/auth" className="border-2 border-[#2C2C2C] text-[#2C2C2C] px-6 py-3 font-bold uppercase text-sm hover:bg-[#2C2C2C] hover:text-white transition-colors">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
