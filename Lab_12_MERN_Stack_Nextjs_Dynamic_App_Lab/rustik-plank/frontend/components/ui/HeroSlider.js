'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const slides = [
  {
    title: 'Reclaimed & Hand Crafted',
    subtitle: 'Premium Wood Furniture',
    desc: 'Each piece uniquely crafted from sustainably sourced reclaimed wood.',
    cta: 'Shop Now',
    href: '/products',
    img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80',
    badge: 'New Collection',
  },
  {
    title: 'Elite Furniture Collection',
    subtitle: 'B&B Design Furniture',
    desc: 'Discover our exclusive range of handmade wooden masterpieces.',
    cta: 'Explore',
    href: '/products?featured=true',
    img: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1200&q=80',
    badge: 'Sale 35% Off',
  },
  {
    title: 'Natural Wood Beauty',
    subtitle: 'Artisan Craftsmanship',
    desc: 'Transform your living space with authentic handcrafted furniture.',
    cta: 'View Collection',
    href: '/products',
    img: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=1200&q=80',
    badge: 'Free Shipping',
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  return (
    <section className="relative overflow-hidden" style={{ height: '520px' }}>
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          <img src={slide.img} alt={slide.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 w-full">
              <div className={`max-w-xl transition-all duration-700 ${i === current ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}>
                <span className="inline-block bg-[#F07B1D] text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 mb-4">
                  {slide.badge}
                </span>
                <p className="text-white/70 font-body uppercase tracking-widest text-sm mb-2">{slide.subtitle}</p>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-white/80 text-base mb-8 leading-relaxed">{slide.desc}</p>
                <Link
                  href={slide.href}
                  className="inline-block bg-[#F07B1D] hover:bg-white hover:text-[#F07B1D] text-white font-bold uppercase tracking-widest px-8 py-3 text-sm transition-all duration-200"
                >
                  {slide.cta}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Controls */}
      <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-[#F07B1D] text-white p-3 transition-all duration-200 backdrop-blur-sm">
        <FiChevronLeft size={20} />
      </button>
      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-[#F07B1D] text-white p-3 transition-all duration-200 backdrop-blur-sm">
        <FiChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all duration-300 ${i === current ? 'w-8 h-2 bg-[#F07B1D]' : 'w-2 h-2 bg-white/50 hover:bg-white'}`}
          />
        ))}
      </div>
    </section>
  );
}
