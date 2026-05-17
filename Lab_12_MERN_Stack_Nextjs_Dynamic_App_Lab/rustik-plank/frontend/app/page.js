'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getProducts } from '@/lib/api';
import ProductCard from '@/components/ui/ProductCard';
import HeroSlider from '@/components/ui/HeroSlider';

export default function HomePage() {
  const [featured, setFeatured] = useState([]);
  const [special, setSpecial] = useState([]);
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    getProducts({ featured: true, limit: 4 }).then(r => setFeatured(r.data.data || []));
    getProducts({ special: true, limit: 4 }).then(r => setSpecial(r.data.data || []));
    getProducts({ popular: true, limit: 4 }).then(r => setPopular(r.data.data || []));
  }, []);

  return (
    <div>
      <HeroSlider />

      {/* Buy Online Banner */}
      <section className="bg-[#F5F0E8] py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white border-l-4 border-[#F07B1D] px-8 py-6">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Available on select products</p>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-[#2C2C2C]">Now Available In Our Store System</h3>
            </div>
            <div className="text-right">
              <div className="font-display text-3xl font-bold text-[#F07B1D]">Buy Online</div>
              <div className="text-sm font-bold uppercase tracking-widest text-[#2C2C2C]">Pick Up In Store</div>
              <Link href="/products" className="inline-block mt-2 bg-[#F07B1D] text-white text-xs font-bold uppercase tracking-wider px-5 py-2 hover:bg-[#D4620A] transition-colors">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Hot Deals */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-[#2C2C2C] mb-8">Hot Deal</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative overflow-hidden group" style={{ minHeight: 260 }}>
              <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80" alt="Sale" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" style={{ minHeight: 260 }} />
              <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-8">
                <h3 className="font-display text-white text-2xl font-bold mb-1">Reclaimed and Hand Crafted</h3>
                <div className="text-[#F07B1D] font-display text-4xl font-bold">Sale Off</div>
                <div className="text-white font-bold text-5xl font-display">50%</div>
                <Link href="/products?special=true" className="mt-3 inline-block bg-[#F07B1D] text-white text-xs font-bold uppercase tracking-wider px-5 py-2 transition-all w-fit">Shop Now</Link>
              </div>
            </div>
            <div className="relative overflow-hidden group" style={{ minHeight: 260 }}>
              <img src="https://images.unsplash.com/photo-1503602642458-232111445657?w=600&q=80" alt="Elite Collection" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" style={{ minHeight: 260 }} />
              <div className="absolute inset-0 bg-black/30 flex flex-col justify-start p-8">
                <h3 className="font-display text-white text-2xl font-bold mb-1">Elite Collection</h3>
                <div className="text-white text-sm">B&B Design Furniture</div>
                <div className="mt-auto">
                  <div className="inline-flex items-center justify-center bg-[#F07B1D] text-white rounded-full w-16 h-16 font-display font-bold text-sm text-center leading-tight">Sale<br/>35%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured / Special / Popular */}
      <section className="py-14 bg-[#FAF6F0]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              { title: 'Featured', items: featured, href: '/products?featured=true' },
              { title: 'Special', items: special, href: '/products?special=true' },
              { title: 'Popular', items: popular, href: '/products?popular=true' },
            ].map(({ title, items, href }) => (
              <div key={title}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-xl font-bold text-[#2C2C2C]">{title}</h2>
                  <Link href={href} className="text-xs text-[#F07B1D] uppercase tracking-wide hover:underline font-bold">See All</Link>
                </div>
                <div className="space-y-3">
                  {items.length === 0 ? (
                    <p className="text-gray-400 text-sm">Loading...</p>
                  ) : (
                    items.map((p) => <ProductCard key={p._id} product={p} />)
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collections */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-center text-[#2C2C2C] mb-8">Our Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: 'Chairs Collection', href: '/products?category=chairs', img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80' },
              { name: 'Beds Collection', href: '/products?category=beds', img: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400&q=80' },
              { name: 'Tables Collection', href: '/products?category=tables', img: 'https://images.unsplash.com/photo-1537726235470-8504e3beef77?w=400&q=80' },
            ].map((col) => (
              <Link key={col.name} href={col.href} className="group relative overflow-hidden block" style={{ height: 200 }}>
                <img src={col.img} alt={col.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/40 flex items-end p-5">
                  <h3 className="font-display text-white text-xl font-bold uppercase tracking-wide">{col.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Product Spotlight */}
      <section className="py-14 bg-[#FAF6F0]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&q=80" alt="Featured" className="w-full object-cover shadow-lg" style={{ maxHeight: 400 }} />
              <div className="absolute -bottom-4 -right-4 bg-white p-4 shadow-lg border-l-4 border-[#F07B1D]">
                <div className="text-xs text-gray-400 uppercase tracking-wide">Our Price</div>
                <div className="font-display text-3xl font-bold text-[#F07B1D]">£129<span className="text-base">.99</span></div>
              </div>
            </div>
            <div>
              <p className="text-xs text-[#F07B1D] uppercase tracking-widest font-bold mb-2">Featured Product</p>
              <h2 className="font-display text-4xl font-bold text-[#2C2C2C] mb-4">Artisan Lounge Chair</h2>
              <p className="text-gray-600 leading-relaxed mb-6">Handcrafted from reclaimed oak, this lounge chair brings warmth and character to any living space. Each piece is unique with natural wood grain patterns.</p>
              <Link href="/products" className="inline-block bg-[#F07B1D] hover:bg-[#D4620A] text-white font-bold uppercase tracking-wider px-8 py-3 transition-colors">
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}