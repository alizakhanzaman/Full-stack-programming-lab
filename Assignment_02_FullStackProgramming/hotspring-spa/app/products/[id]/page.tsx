'use client';
import { useState } from 'react';
import Link from 'next/link';
import { products } from '../../data/products';
import BrandBanner from '../../components/BrandBanner';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === Number(params.id)) || products[0];
  const [activeTab, setActiveTab] = useState('details');
  const [qty, setQty] = useState(1);
  const [totalPrice, setTotalPrice] = useState(650);

  const tabs = ['Details', 'Quick Specs', 'Accessories', 'Reviews', 'Q & A'];

  return (
    <div className="max-w-5xl mx-auto px-4 py-4">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-xs text-gray-500 mb-3">
        <ol className="flex items-center gap-1">
          <li><Link href="/" className="text-red-600 hover:underline">Home</Link></li>
          <li>›</li>
          <li><Link href="/category" className="text-red-600 hover:underline">Products</Link></li>
          <li>›</li>
          <li>{product.name}</li>
        </ol>
      </nav>

      <h1 className="text-lg font-bold text-gray-800 mb-4">
        Emerald Bay XL TV DVD Stereo Hot Tub with 90 Jets
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Left: Images + Specs */}
        <div className="md:col-span-2 space-y-4">
          {/* Product image */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <div className="border border-gray-200 bg-gray-50 aspect-square flex items-center justify-center text-8xl mb-3">
                🛁
              </div>
              <div className="flex gap-2">
                {[1,2,3,4].map((i) => (
                  <button key={i} className="w-16 h-16 border-2 border-gray-200 hover:border-red-500 bg-gray-50 flex items-center justify-center text-2xl transition-colors">
                    🛁
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-1 text-center">Roll over image to zoom in</p>
            </div>

            {/* Details column */}
            <div>
              {/* Rating */}
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-yellow-400">{'★★★★☆'}</div>
                <span className="text-xs text-red-600 hover:underline cursor-pointer">(14 reviews)</span>
              </div>
              <p className="text-xs text-gray-500 line-through mb-0.5">Retail Price: $2199.00</p>
              <p className="text-xs text-gray-600 font-semibold mb-1">Sale price</p>
              <p className="text-2xl font-bold text-red-600 mb-1">${product.price.toLocaleString()}.00</p>
              <p className="text-xs text-red-500 hover:underline cursor-pointer mb-3">Low Price Guarantee</p>

              <dl className="text-xs space-y-1.5 mb-4">
                <div className="grid grid-cols-2 gap-1">
                  <dt className="font-semibold text-gray-700">Size/Seating Capacity</dt>
                  <dd className="text-gray-600">77&quot;, 77&quot;, 32&quot; / 6 Persons</dd>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <dt className="font-semibold text-gray-700">Seating Design</dt>
                  <dd className="text-gray-600">Bucket, Lounge, Chair, Bench</dd>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <dt className="font-semibold text-gray-700">Water Capacity / Dry Weight</dt>
                  <dd className="text-gray-600">305 Gallons / 573 lbs</dd>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <dt className="font-semibold text-gray-700">Number of Pumps</dt>
                  <dd className="text-gray-600">2 X 5HP</dd>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <dt className="font-semibold text-gray-700">Electrical</dt>
                  <dd className="text-gray-600">5.5 KW Heavy Heater, 220V, 50 amp /ETL Certificate</dd>
                </div>
              </dl>

              <p className="text-xs text-green-600 font-semibold mb-3">✓ In Stock (available)</p>

              <div className="flex items-center gap-2 mb-3">
                <label htmlFor="qty" className="text-xs font-semibold">Qty:</label>
                <input
                  id="qty"
                  type="number"
                  min="1"
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                  className="w-16 border border-gray-300 px-2 py-1 text-xs text-center"
                />
              </div>
              <button
                type="button"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 uppercase text-sm tracking-wide transition-colors flex items-center justify-center gap-2"
              >
                <span>🛒</span> ADD TO CART
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div>
            <div className="flex border-b border-gray-200 overflow-x-auto" role="tablist">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={activeTab === tab.toLowerCase().replace(' ', '-')}
                  onClick={() => setActiveTab(tab.toLowerCase().replace(' ', '-'))}
                  className={`px-4 py-2 text-xs font-semibold whitespace-nowrap border-t border-x border-gray-200 -mb-px transition-colors ${
                    activeTab === tab.toLowerCase().replace(' ', '-')
                      ? 'bg-white text-gray-800 border-b-white'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="border border-t-0 border-gray-200 p-4" role="tabpanel">
              {activeTab === 'details' || activeTab === 'details' ? (
                <div className="text-xs text-gray-600 leading-relaxed space-y-3">
                  <p className="font-semibold">Product Details</p>
                  <p>Energy Star Rated - No</p>
                  <h2 className="font-bold text-gray-800 text-sm">Emerald Bay XL TV DVD Stereo Hot Tub with 90 Jets</h2>
                  <p>The Hottub B22CS30SNS stain</p>
                  <p>
                    This is a premium quality hot tub featuring advanced jet systems, built-in TV and DVD entertainment,
                    and stereo sound. The Emerald Bay XL offers an extraordinary hydrotherapy experience with 90 precision
                    jets designed to target key muscle groups for total body relief and relaxation.
                  </p>
                  <p>
                    With seating for up to 6 persons and a spacious interior featuring bucket seats, lounge seating,
                    standard chairs, and bench seating, this spa accommodates a variety of users and preferences.
                    The heavy-duty 5.5 KW heater ensures rapid heating and consistent temperature maintenance even in
                    colder climates.
                  </p>
                  <p>
                    The entertainment package includes a weatherproof flat-screen TV, DVD player, and premium stereo
                    system with Bluetooth connectivity. Transform your backyard into a resort-style retreat with this
                    flagship HotSpring spa model.
                  </p>
                </div>
              ) : activeTab === 'quick-specs' ? (
                <dl className="text-xs grid grid-cols-2 gap-3">
                  <div><dt className="font-semibold">Model</dt><dd>B22CS30SNS</dd></div>
                  <div><dt className="font-semibold">Dimensions</dt><dd>77&quot; × 77&quot; × 32&quot;</dd></div>
                  <div><dt className="font-semibold">Jets</dt><dd>90 Jets</dd></div>
                  <div><dt className="font-semibold">Capacity</dt><dd>6 Persons</dd></div>
                </dl>
              ) : (
                <p className="text-xs text-gray-500">Content coming soon.</p>
              )}
            </div>
          </div>

          {/* Related */}
          <div>
            <h2 className="text-sm font-bold text-gray-800 mb-3 border-b border-gray-200 pb-2">
              Customers Who Viewed This Item Also
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {products.slice(0, 4).map((p) => (
                <Link key={p.id} href={`/products/${p.id}`} className="flex items-center gap-2 hover:bg-gray-50 p-2 rounded border border-gray-100">
                  <div className="w-12 h-12 bg-gray-100 flex items-center justify-center text-2xl">🛁</div>
                  <div className="text-xs">
                    <p className="text-red-600 font-bold">$2,549.15</p>
                    <p className="text-gray-600 leading-tight text-xs">Stainless Spa Model</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Price Calculator */}
        <aside aria-label="Price calculator">
          <div className="border border-gray-200 p-4 bg-white sticky top-4">
            <h2 className="text-sm font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">
              Price Calculator
            </h2>
            <div className="space-y-3">
              {[
                'Interior Color',
                'Outside Shell Color',
                'Circulation Pump',
                'Polar Foam',
                'Cover / Steps',
                'Extra Filter Sets',
                'Deluxe Cover Lifter',
                'Salt Water Sanitation System',
                'TV/DVD/Entertainment',
                'Backyard Delivery',
                'Jets',
                'Perimeter Lighting',
                'Premium Popup Speakers',
                'Waterfall',
                'Spa Surround',
              ].map((option) => (
                <div key={option}>
                  <label className="text-xs text-gray-600 block mb-0.5">{option}:</label>
                  <select className="w-full border border-gray-300 px-2 py-1 text-xs focus:outline-none focus:border-red-500">
                    <option>-- Select --</option>
                    <option>Standard</option>
                    <option>Premium (+$200)</option>
                    <option>Deluxe (+$500)</option>
                  </select>
                </div>
              ))}
              <div>
                <label htmlFor="calc-qty" className="text-xs text-gray-600 block mb-0.5">Quantity:</label>
                <input
                  id="calc-qty"
                  type="number"
                  min="1"
                  defaultValue="1"
                  className="w-full border border-gray-300 px-2 py-1 text-xs"
                />
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-200">
              <p className="text-sm font-bold text-gray-800 flex justify-between">
                Total Price: <span className="text-red-600">${totalPrice.toLocaleString()}.00</span>
              </p>
            </div>
            <button
              type="button"
              className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 uppercase text-sm tracking-wide transition-colors flex items-center justify-center gap-2"
            >
              🛒 ADD TO CART
            </button>

            <div className="mt-4">
              <h3 className="text-xs font-bold text-gray-700 mb-2">Download Resources</h3>
              <ul className="text-xs space-y-1">
                <li><a href="#" className="text-red-600 hover:underline">📄 Full Line Brochure</a></li>
                <li><a href="#" className="text-red-600 hover:underline">📄 Owner&apos;s Manual</a></li>
                <li><a href="#" className="text-red-600 hover:underline">📄 Specifications Sheet</a></li>
              </ul>
            </div>
          </div>
        </aside>
      </div>

      <div className="mt-8 mb-4">
        <BrandBanner />
      </div>
    </div>
  );
}
