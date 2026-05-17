import Link from 'next/link';

export const metadata = { title: 'About Us — Rustik Plank' };

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative bg-[#2C2C2C] text-white py-24 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80"
          alt="Workshop"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <p className="text-[#F07B1D] uppercase tracking-widest text-sm font-bold mb-3">Our Story</p>
          <h1 className="font-display text-5xl font-bold mb-4">Handcrafted With Passion</h1>
          <p className="text-gray-300 text-lg max-w-xl mx-auto">
            Every piece of furniture we make is a testament to the beauty of reclaimed wood and artisan craftsmanship.
          </p>
        </div>
      </div>

      {/* Story */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[#F07B1D] uppercase tracking-widest text-xs font-bold mb-2">Since 2008</p>
            <h2 className="font-display text-4xl font-bold text-[#2C2C2C] mb-4">The Rustik Plank Story</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Founded in 2008 by master carpenter James Harwood, Rustik Plank began as a small workshop in East London 
              with a single mission: to rescue beautiful old wood from demolition sites and turn it into furniture that 
              would last generations.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              What started as a one-man operation has grown into a team of 12 passionate craftspeople, all sharing the 
              same respect for natural materials and traditional joinery techniques.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Today, every piece we create still carries that original spirit — honest materials, honest work, 
              and furniture with a story to tell.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <img src="https://images.unsplash.com/photo-1503602642458-232111445657?w=400&q=80" alt="Workshop" className="w-full h-48 object-cover" />
            <img src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&q=80" alt="Crafting" className="w-full h-48 object-cover mt-6" />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-[#FAF6F0]">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="section-title center font-display text-3xl font-bold text-center text-[#2C2C2C] mb-10">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🌲', title: 'Sustainability', desc: 'We source 90% of our wood from reclaimed and salvaged timber, giving old wood a beautiful new life instead of sending it to landfill.' },
              { icon: '🔨', title: 'Craftsmanship', desc: 'Every joint, every surface, every finish is done by hand in our East London workshop. We take pride in the details others might overlook.' },
              { icon: '♾️', title: 'Longevity', desc: 'We build furniture to last a lifetime — and beyond. Our pieces are designed to be repaired, refinished, and passed down through generations.' },
            ].map((v) => (
              <div key={v.title} className="bg-white p-8 text-center shadow-sm">
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="font-display text-xl font-bold text-[#2C2C2C] mb-3">{v.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 bg-[#2C2C2C] text-white">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { num: '15+', label: 'Years Experience' },
            { num: '2,400+', label: 'Pieces Made' },
            { num: '12', label: 'Craftspeople' },
            { num: '98%', label: 'Happy Customers' },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-display text-4xl font-bold text-[#F07B1D] mb-1">{s.num}</div>
              <div className="text-gray-300 text-sm uppercase tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-[#2C2C2C] mb-4">Ready to Find Your Perfect Piece?</h2>
          <p className="text-gray-500 mb-8">Browse our full collection of handcrafted furniture.</p>
          <Link href="/products" className="inline-block bg-[#F07B1D] hover:bg-[#D4620A] text-white font-bold uppercase tracking-wider px-10 py-4 text-sm transition-colors">
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  );
}
