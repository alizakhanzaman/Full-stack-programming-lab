import Link from "next/link";

export default function Home() {
  return (
    <div className="text-center mt-10">
      <h2 className="text-5xl font-bold text-red-700 mb-4">Welcome to Desi Chaska</h2>
      <p className="text-gray-600 text-lg mb-2">🍝 Authentic Pakistani flavors since 2026</p>
      <p className="text-gray-500 mb-8 max-w-xl mx-auto">
        From aromatic biryanis to creamy gravies, we bring the heart of Pakistan
        straight to your table. Fresh ingredients, traditional recipes.
      </p>
      <div className="flex justify-center gap-4 flex-wrap">
        <Link href="/menu" className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 font-semibold transition">
          View Our Menu
        </Link>
        <Link href="/about" className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 font-semibold transition">
          Our Story
        </Link>
        <Link href="/contact" className="bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-800 font-semibold transition">
          Reserve a Table
        </Link>
      </div>

      <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-3xl mb-2">🍕</p>
          <h3 className="font-bold text-black">Biryani</h3>
          <p className="text-gray-500 text-sm mt-1">Yummy, fresh, and cooked to perfection</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-3xl mb-2">🍝</p>
          <h3 className="font-bold text-black">Gravy Dishes</h3>
          <p className="text-gray-500 text-sm mt-1">Tender chicken or beefin a rich, creamy sauce</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-3xl mb-2">🍮</p>
          <h3 className="font-bold text-black">Desserts</h3>
          <p className="text-gray-500 text-sm mt-1">A creamy rice pudding or falooda sweetened with milk, sugar, and nuts</p>
        </div>
      </div>
    </div>
  );
}