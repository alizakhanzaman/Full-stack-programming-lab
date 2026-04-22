export default function About() {
  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-4xl font-bold text-red-700 mb-4">Our Story</h1>
      <p className="text-white-700 text-base leading-relaxed mb-4">
        Desi Chaska was founded in 2026 by Aliza Zaman, who moved from Pakistan
        to share the true taste of Pakistani cuisine with the world. Every recipe has
        been passed down through generations.
      </p>
      <p className="text-white-700 text-base leading-relaxed mb-4">
        We use only the freshest locally sourced ingredients combined with imported
        Pakistani staples: aromatic spices, fresh herbs, and traditional cooking oils.
      </p>
      <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded mt-6">
        <p className="text-red-700 font-semibold">Our Mission</p>
        <p className="text-gray-600 text-sm mt-1">
          To serve every guest like family and deliver an authentic Pakistani dining
          experience in every bite.
        </p>
      </div>
    </div>
  );
}