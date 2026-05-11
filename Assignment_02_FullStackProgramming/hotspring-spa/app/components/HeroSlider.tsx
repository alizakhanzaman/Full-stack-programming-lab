'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const slides = [
  {
    id: 1,
    title: 'Barrier Reef 158 Jet',
    subtitle: 'TV-Stereo - Home Theater Super Spa',
    description: 'Extra Large and Deep  8 Person\n158 Jet Supper Spa, TV-Home Theater Spa System,',
    price: '$4899.00',
    cta: 'More Details',
    href: '/products/1',
    bg: 'from-blue-900 via-blue-700 to-cyan-500',
  },
  {
    id: 2,
    title: '5-7 Person Corner Spa',
    subtitle: 'Premium Hydrotherapy',
    description: 'Advanced jet system for the ultimate relaxation experience.',
    price: '$3499.00',
    cta: 'More Details',
    href: '/products/2',
    bg: 'from-teal-900 via-teal-700 to-emerald-500',
  },
  {
    id: 3,
    title: 'TV Theater Spa',
    subtitle: 'Entertainment Meets Relaxation',
    description: 'Built-in TV and stereo system for the ultimate backyard entertainment.',
    price: '$5299.00',
    cta: 'Shop Now',
    href: '/products/4',
    bg: 'from-indigo-900 via-purple-700 to-blue-500',
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section className="relative overflow-hidden" aria-label="Featured products slideshow">
      <div className={`bg-gradient-to-r ${slide.bg} transition-all duration-700`}>
        <div className="max-w-5xl mx-auto px-4 py-12 md:py-20 grid md:grid-cols-2 gap-8 items-center min-h-[360px]">
          {/* Text */}
          <div className="text-white">
            <h2 className="text-2xl md:text-4xl font-bold text-red-400 leading-tight mb-2">
              {slide.title}
            </h2>
            <h3 className="text-lg md:text-2xl font-semibold mb-3">{slide.subtitle}</h3>
            <p className="text-sm opacity-80 mb-4 whitespace-pre-line">{slide.description}</p>
            <p className="text-3xl font-bold mb-5">{slide.price}</p>
            <Link
              href={slide.href}
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 uppercase tracking-wide transition-colors"
            >
              {slide.cta}
            </Link>
          </div>
          {/* Visual placeholder */}
          <div className="flex items-center justify-center">
            <div className="w-64 h-48 md:w-80 md:h-60 bg-white/10 rounded-xl border-2 border-white/20 flex items-center justify-center">
              <span className="text-8xl">🛁</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
            className={`w-3 h-3 rounded-full transition-colors ${i === current ? 'bg-white' : 'bg-white/40'}`}
          />
        ))}
      </div>
    </section>
  );
}
