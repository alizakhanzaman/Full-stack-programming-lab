import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-red-700 text-white px-6 py-5 flex items-center justify-between shadow-lg">
      <div>
        <h1 className="text-2xl font-bold">Desi Chaska</h1>
        <p className="text-xs text-red-200">Authentic Pakistani Cuisine</p>
      </div>
      <nav className="flex gap-8 text-sm font-medium">
        <Link href="/" className="hover:text-yellow-300 transition">Home</Link>
        <Link href="/about" className="hover:text-yellow-300 transition">About</Link>
        <Link href="/contact" className="hover:text-yellow-300 transition">Contact</Link>
        <Link href="/menu" className="hover:text-yellow-300 transition">Menu</Link>
      </nav>
    </header>
  );
}