import ProductCard from './components/ProductCard';

async function getProducts() {
  try {
    const res = await fetch('http://127.0.0.1:5000/api/products', {
      cache: 'no-store'
    });
    
    if (!res.ok) {
      console.error('Response not ok:', res.status);
      return [];
    }
    
    const data = await res.json();
    console.log('Fetched data:', data); // debug
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Fetch error:', error);
    return [];
  }
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-gray-100">

      {/* Header */}
      <header className="bg-blue-700 text-white py-5 px-8 shadow-md">
        <h1 className="text-3xl font-bold">🛒 ShopWithAliza</h1>
        <p className="text-sm mt-1 text-blue-200">Your one-stop ecommerce store</p>
      </header>

      {/* Products Grid */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          Featured Products
        </h2>

        {products.length === 0 ? (
          <p className="text-red-500 font-medium">
            ⚠️ No products found. Make sure backend is running on port 5000.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product: any) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 text-center py-5 mt-10">
        <p>© 2025 ShopWithAliza. All rights reserved.</p>
      </footer>

    </main>
  );
}