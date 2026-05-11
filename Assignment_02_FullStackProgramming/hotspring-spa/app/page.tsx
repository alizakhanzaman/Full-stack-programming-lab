import HeroSlider from './components/HeroSlider';
import ProductCard from './components/ProductCard';
import BrandBanner from './components/BrandBanner';
import { products } from './data/products';

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <section className="max-w-5xl mx-auto px-4 mt-6" aria-label="Featured categories">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <article className="bg-gradient-to-br from-gray-800 to-gray-600 text-white p-6 min-h-[140px] flex flex-col justify-end">
            <div className="text-4xl mb-2 opacity-60">🛁</div>
            <h3 className="text-lg font-bold">5-7 PERSON SPA</h3>
            <p className="text-xs opacity-70 mt-1">Premium spa experience for the whole family with advanced jet systems.</p>
          </article>
          <article className="bg-gradient-to-br from-blue-900 to-blue-700 text-white p-6 min-h-[140px] flex flex-col justify-end">
            <div className="text-4xl mb-2 opacity-60">📺</div>
            <h3 className="text-lg font-bold">TV THEATER SPA</h3>
            <p className="text-xs opacity-70 mt-1">Built-in entertainment system for ultimate backyard luxury.</p>
          </article>
          <article className="bg-red-600 text-white p-6 min-h-[140px] flex flex-col justify-center items-center text-center">
            <p className="text-6xl font-black leading-none">SAVE</p>
            <p className="text-6xl font-black leading-none">50%</p>
            <p className="text-xs opacity-80 mt-2">Limited time offer on selected spa models.</p>
          </article>
        </div>
      </section>
      <section className="max-w-5xl mx-auto px-4 mt-8 mb-6" aria-labelledby="new-products-heading">
        <div className="bg-white border border-gray-200 p-4">
          <h2 id="new-products-heading" className="text-base font-bold text-gray-800 border-b-2 border-gray-300 pb-2 mb-4 uppercase tracking-wide">
            New Products
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} id={product.id} name={product.name} description={product.description} price={product.price} originalPrice={product.originalPrice} />
            ))}
          </div>
        </div>
      </section>
      <section className="max-w-5xl mx-auto px-4 mb-8">
        <BrandBanner />
      </section>
    </>
  );
}
