'use client';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getProducts, getCategories } from '@/lib/api';
import ProductCard from '@/components/ui/ProductCard';
import { FiFilter, FiGrid, FiList, FiChevronDown } from 'react-icons/fi';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const page = searchParams.get('page') || '1';
  const search = searchParams.get('search') || '';
  const categoryFilter = searchParams.get('category') || '';
  const sort = searchParams.get('sort') || '-createdAt';
  const featured = searchParams.get('featured') || '';
  const special = searchParams.get('special') || '';
  const popular = searchParams.get('popular') || '';

  useEffect(() => {
    getCategories().then((res) => setCategories(res.data.data || []));
  }, []);

  useEffect(() => {
    setLoading(true);
    // Find category id by slug
    const fetchProducts = async () => {
      try {
        const params = { page, sort, limit: 12 };
        if (search) params.search = search;
        if (featured) params.featured = featured;
        if (special) params.special = special;
        if (popular) params.popular = popular;
        // Category filter by name matching (simplified - in real app use category ID)
        const res = await getProducts(params);
        setProducts(res.data.data || []);
        setPagination(res.data.pagination || {});
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [page, search, categoryFilter, sort, featured, special, popular]);

  const updateFilter = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    params.delete('page');
    router.push(`/products?${params.toString()}`);
  };

  const sortOptions = [
    { label: 'Newest', value: '-createdAt' },
    { label: 'Price: Low to High', value: 'price' },
    { label: 'Price: High to Low', value: '-price' },
    { label: 'Name A-Z', value: 'name' },
  ];

  return (
    <div className="min-h-screen bg-[#FAF6F0]">
      {/* Page Header */}
      <div className="bg-[#2C2C2C] text-white py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="font-display text-4xl font-bold mb-2">
            {featured === 'true' ? 'Featured Products' :
             special === 'true' ? 'Special Offers' :
             popular === 'true' ? 'Popular Products' :
             search ? `Search: "${search}"` : 'All Products'}
          </h1>
          <nav className="text-sm text-gray-400">
            <a href="/" className="hover:text-[#F07B1D]">Home</a>
            <span className="mx-2">/</span>
            <span className="text-white">Products</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className={`w-64 flex-shrink-0 hidden md:block`}>
            {/* Categories */}
            <div className="bg-white p-5 mb-4 shadow-sm">
              <h3 className="font-display font-bold text-[#2C2C2C] text-lg mb-4 border-b border-gray-100 pb-2">Categories</h3>
              <ul className="space-y-1">
                <li>
                  <a href="/products" className={`block py-1.5 px-2 text-sm hover:text-[#F07B1D] hover:bg-orange-50 transition-colors ${!categoryFilter ? 'text-[#F07B1D] font-bold' : 'text-gray-600'}`}>
                    All Products
                  </a>
                </li>
                {categories.map((cat) => (
                  <li key={cat._id}>
                    <a
                      href={`/products?category=${cat.slug}`}
                      className={`block py-1.5 px-2 text-sm hover:text-[#F07B1D] hover:bg-orange-50 transition-colors ${categoryFilter === cat.slug ? 'text-[#F07B1D] font-bold bg-orange-50' : 'text-gray-600'}`}
                    >
                      › {cat.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Filter by type */}
            <div className="bg-white p-5 mb-4 shadow-sm">
              <h3 className="font-display font-bold text-[#2C2C2C] text-lg mb-4 border-b border-gray-100 pb-2">Filter By</h3>
              <div className="space-y-2">
                {[
                  { label: 'Featured', param: 'featured' },
                  { label: 'Special / Sale', param: 'special' },
                  { label: 'Popular', param: 'popular' },
                ].map((f) => (
                  <label key={f.param} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={searchParams.get(f.param) === 'true'}
                      onChange={(e) => updateFilter(f.param, e.target.checked ? 'true' : '')}
                      className="accent-[#F07B1D] w-4 h-4"
                    />
                    <span className="text-sm text-gray-600 group-hover:text-[#F07B1D] transition-colors">{f.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white px-4 py-3 mb-4 flex items-center justify-between shadow-sm">
              <p className="text-sm text-gray-500">
                {loading ? 'Loading...' : `${pagination.total || products.length} products found`}
              </p>
              <div className="flex items-center gap-3">
                <label className="text-sm text-gray-500 hidden md:block">Sort by:</label>
                <select
                  value={sort}
                  onChange={(e) => updateFilter('sort', e.target.value)}
                  className="text-sm border border-gray-200 px-3 py-1.5 focus:outline-none focus:border-[#F07B1D]"
                >
                  {sortOptions.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Grid */}
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Array(6).fill(0).map((_, i) => (
                  <div key={i} className="bg-white animate-pulse" style={{ height: 280 }} />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="bg-white p-16 text-center">
                <p className="text-gray-400 font-display text-2xl mb-2">No products found</p>
                <p className="text-gray-400 text-sm mb-6">Try adjusting your filters</p>
                <a href="/products" className="inline-block bg-[#F07B1D] text-white px-6 py-2 font-bold uppercase text-sm hover:bg-[#D4620A] transition-colors">
                  Clear Filters
                </a>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => updateFilter('page', p.toString())}
                    className={`w-9 h-9 text-sm font-bold transition-colors ${Number(page) === p ? 'bg-[#F07B1D] text-white' : 'bg-white text-[#2C2C2C] hover:bg-[#F07B1D] hover:text-white border border-gray-200'}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
