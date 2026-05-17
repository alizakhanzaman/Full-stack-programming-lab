import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAF6F0] flex items-center justify-center text-center px-4">
      <div>
        <div className="font-display text-[120px] font-bold text-[#F07B1D] leading-none opacity-20">404</div>
        <h1 className="font-display text-4xl font-bold text-[#2C2C2C] mt-4 mb-3">Page Not Found</h1>
        <p className="text-gray-500 mb-8 max-w-md">
          The page you're looking for seems to have wandered off into the workshop. Let's get you back on track.
        </p>
        <div className="flex gap-3 justify-center">
          <Link href="/" className="bg-[#F07B1D] hover:bg-[#D4620A] text-white px-8 py-3 font-bold uppercase tracking-wider text-sm transition-colors">
            Back to Home
          </Link>
          <Link href="/products" className="border-2 border-[#2C2C2C] text-[#2C2C2C] hover:bg-[#2C2C2C] hover:text-white px-8 py-3 font-bold uppercase tracking-wider text-sm transition-colors">
            Shop Products
          </Link>
        </div>
      </div>
    </div>
  );
}
