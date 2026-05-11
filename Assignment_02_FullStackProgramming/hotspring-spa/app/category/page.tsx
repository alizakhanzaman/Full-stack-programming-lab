'use client';
import { useState } from 'react';
import Link from 'next/link';
import ProductCard from '../components/ProductCard';
import BrandBanner from '../components/BrandBanner';
import { products } from '../data/products';

const filters = {
  capacity: ['2 - 4 PEOPLE', '5 - 7 PEOPLE', '8 PEOPLE AND MORE'],
  sizes: ['5 - 6  FEET LONG', '6 - 7  FEET LONG', '7 - 8  FEET LONG', '8 FEET TO LARGE SIZE'],
  type: ['PLUG AND PLAY 110 VOLT', 'TV - STERIO SPAS', 'CORNER SPAS', 'PORTABLE SPAS', 'DEEPER SPAS'],
  price: ['UNDER $3,000', '$3,000 TO 4,000', '$4,000 TO 5,000', '$5,000 TO 6,000', '$6,000 +'],
};

export default function CategoryPage() {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-4">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-xs text-gray-500 mb-4">
        <ol className="flex items-center gap-1">
          <li><Link href="/" className="text-red-600 hover:underline">Home</Link></li>
          <li className="text-gray-400">›</li>
          <li className="text-gray-700">Category</li>
        </ol>
      </nav>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Filters */}
        <aside className="md:w-56 flex-shrink-0" aria-label="Shopping filters">
          <h2 className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">Shopping Options</h2>

          {Object.entries(filters).map(([group, items]) => (
            <div key={group} className="mb-4">
              <h3 className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2 border-b border-gray-200 pb-1">
                {group === 'capacity' ? 'Seating Capacity'
                  : group === 'sizes' ? 'Choose Sizes'
                  : group === 'type' ? 'Spas by Type'
                  : 'Price Ranges From'}
              </h3>
              <ul className="space-y-1">
                {items.map((item) => (
                  <li key={item}>
                    <button
                      type="button"
                      onClick={() => toggleFilter(item)}
                      className={`flex items-center gap-2 text-xs w-full text-left py-0.5 transition-colors ${
                        activeFilters.includes(item) ? 'text-red-600 font-semibold' : 'text-gray-600 hover:text-red-600'
                      }`}
                    >
                      <span className="text-red-600 text-xs">›</span>
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>

        {/* Product Grid */}
        <section className="flex-1" aria-label="Product listings">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-base font-bold text-gray-800">Top Product Listing</h1>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <span>{products.length} Item(s)</span>
              <label htmlFor="show-count" className="ml-4">Show</label>
              <select id="show-count" className="border border-gray-300 px-2 py-1 text-xs">
                <option>9</option>
                <option>18</option>
                <option>36</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                description={product.description}
                price={product.price}
                originalPrice={product.originalPrice}
              />
            ))}
          </div>

          {/* Related Products */}
          <div className="mt-10">
            <h2 className="text-sm font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">
              Customers Who Viewed This Item Also
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {products.slice(0, 4).map((p) => (
                <Link key={p.id} href={`/products/${p.id}`} className="flex items-center gap-2 hover:bg-gray-50 p-2 rounded">
                  <div className="w-12 h-12 bg-gray-100 flex items-center justify-center text-2xl flex-shrink-0">🛁</div>
                  <div className="text-xs">
                    <p className="text-red-600 font-bold">$2,549.15</p>
                    <p className="text-gray-600 leading-tight">Bosch 22 Cu. Ft Stainless Refrigerator</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Brand Banner */}
      <div className="mt-8 mb-4">
        <BrandBanner />
      </div>
    </div>
  );
}
