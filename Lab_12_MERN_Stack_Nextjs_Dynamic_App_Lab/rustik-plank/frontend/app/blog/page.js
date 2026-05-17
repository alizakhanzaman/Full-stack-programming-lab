import Link from 'next/link';

export const metadata = { title: 'Blog — Rustik Plank' };

const posts = [
  { slug: 'caring-for-reclaimed-wood', title: 'How to Care for Reclaimed Wood Furniture', date: 'May 2, 2024', category: 'Tips & Care', img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80', excerpt: 'Reclaimed wood furniture is beautiful and unique, but it requires special care to maintain its character and longevity. Here\'s our complete guide.' },
  { slug: 'spring-collection-2024', title: 'Introducing Our Spring 2024 Collection', date: 'April 15, 2024', category: 'New Arrivals', img: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&q=80', excerpt: 'Spring is the season of renewal, and our new collection reflects that spirit with lighter tones and organic silhouettes.' },
  { slug: 'sustainable-sourcing', title: 'Our Commitment to Sustainable Sourcing', date: 'March 28, 2024', category: 'Behind the Scenes', img: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=600&q=80', excerpt: 'Discover how we source our reclaimed timber responsibly and why sustainable sourcing is at the heart of everything we do.' },
  { slug: 'interior-design-trends', title: 'Interior Design Trends for 2024', date: 'March 10, 2024', category: 'Design', img: 'https://images.unsplash.com/photo-1537726235470-8504e3beef77?w=600&q=80', excerpt: 'From biophilic design to warm minimalism, discover the interior trends that are shaping homes in 2024 and how wood furniture fits in.' },
  { slug: 'meet-the-craftsmen', title: 'Meet the Craftsmen Behind Every Piece', date: 'February 22, 2024', category: 'Behind the Scenes', img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80', excerpt: 'Our team of 12 craftspeople bring decades of combined experience to every joint, surface, and finish. Meet the people behind your furniture.' },
  { slug: 'wood-types-guide', title: 'A Guide to Our Wood Types', date: 'February 5, 2024', category: 'Tips & Care', img: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=600&q=80', excerpt: 'Oak, walnut, teak, pine — each species has its own personality. We break down our most popular wood types so you can choose wisely.' },
];

export default function BlogPage() {
  const [featured, ...rest] = posts;
  return (
    <div className="min-h-screen bg-[#FAF6F0]">
      {/* Header */}
      <div className="bg-[#2C2C2C] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="font-display text-4xl font-bold mb-2">Journal</h1>
          <p className="text-gray-400">Stories, tips, and inspiration from Rustik Plank</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Featured Post */}
        <div className="bg-white shadow-sm mb-10 grid grid-cols-1 md:grid-cols-2 overflow-hidden group">
          <div className="overflow-hidden" style={{ maxHeight: 340 }}>
            <img src={featured.img} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="p-10 flex flex-col justify-center">
            <span className="inline-block bg-[#F07B1D] text-white text-xs font-bold px-3 py-1 uppercase tracking-wide mb-4 w-fit">{featured.category}</span>
            <h2 className="font-display text-3xl font-bold text-[#2C2C2C] mb-3 leading-tight">{featured.title}</h2>
            <p className="text-gray-500 text-sm mb-1">{featured.date}</p>
            <p className="text-gray-600 leading-relaxed mb-6">{featured.excerpt}</p>
            <Link href={`/blog/${featured.slug}`} className="inline-block bg-[#F07B1D] hover:bg-[#D4620A] text-white font-bold uppercase tracking-wider px-6 py-3 text-sm transition-colors w-fit">
              Read More
            </Link>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post) => (
            <div key={post.slug} className="bg-white shadow-sm overflow-hidden group hover:shadow-md transition-shadow">
              <div className="overflow-hidden" style={{ height: 200 }}>
                <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <span className="text-xs text-[#F07B1D] font-bold uppercase tracking-wide">{post.category}</span>
                <h3 className="font-display text-lg font-bold text-[#2C2C2C] mt-1 mb-2 leading-tight">{post.title}</h3>
                <p className="text-xs text-gray-400 mb-3">{post.date}</p>
                <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="text-xs font-bold uppercase tracking-wider text-[#F07B1D] hover:text-[#D4620A] transition-colors border border-[#F07B1D] hover:bg-[#F07B1D] hover:text-white px-4 py-1.5 inline-block transition-all">
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
