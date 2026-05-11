export default function BrandBanner() {
  const brands = [
    { name: 'Save $1000s on Top Spa Brands', bg: 'bg-yellow-400', text: 'text-gray-900', large: true },
    { name: 'Oceanic Spa', bg: 'bg-white', text: 'text-blue-700', large: false },
    { name: 'Caldera Spas', bg: 'bg-white', text: 'text-orange-600', large: false },
    { name: 'Island Spas', bg: 'bg-white', text: 'text-green-700', large: false },
  ];

  return (
    <section className="border border-gray-200 rounded overflow-hidden" aria-label="Brand partners">
      <div className="grid grid-cols-2 md:grid-cols-4">
        {brands.map((brand) => (
          <a
            key={brand.name}
            href="#"
            className={`${brand.bg} ${brand.text} flex items-center justify-center p-4 min-h-[80px] hover:opacity-80 transition-opacity border-r border-gray-200 last:border-r-0`}
          >
            <span className={`font-bold text-center ${brand.large ? 'text-sm' : 'text-base italic'}`}>
              {brand.name}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
