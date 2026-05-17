'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getProduct } from '@/lib/api';
import useCartStore from '@/lib/store';
import { useAuth } from '@/lib/AuthContext';
import toast from 'react-hot-toast';
import { FiShoppingCart, FiHeart, FiMinus, FiPlus, FiStar, FiPackage, FiTruck, FiRefreshCw } from 'react-icons/fi';

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const { addItem, openCart } = useCartStore();
  const { user } = useAuth();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    // Always fetch by ID directly
    getProduct(id)
      .then((res) => setProduct(res.data.data))
      .catch(() => toast.error('Product not found'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    addItem(product, qty);
    toast.success(`"${product.name}" added to cart!`);
    openCart();
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF6F0]">
      <div className="animate-spin w-12 h-12 border-4 border-[#F07B1D] border-t-transparent rounded-full" />
    </div>
  );

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-2xl font-display font-bold text-gray-400 mb-4">Product not found</p>
        <Link href="/products" className="text-[#F07B1D] hover:underline">Back to Products</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAF6F0]">
      {/* Breadcrumb */}
      <div className="bg-white border-b py-3">
        <div className="max-w-7xl mx-auto px-4 text-sm text-gray-500">
          <Link href="/" className="hover:text-[#F07B1D]">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="hover:text-[#F07B1D]">Products</Link>
          <span className="mx-2">/</span>
          <span className="text-[#2C2C2C] font-medium">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 shadow-sm">
          {/* Image */}
          <div>
            <div className="bg-gray-50 overflow-hidden" style={{ aspectRatio: '1/1' }}>
              <img
                src={product.mainImage || 'https://via.placeholder.com/600x600'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Info */}
          <div>
            {product.category && (
              <p className="text-xs text-[#F07B1D] uppercase tracking-widest font-bold mb-2">{product.category.name}</p>
            )}
            <h1 className="font-display text-3xl font-bold text-[#2C2C2C] mb-3">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {Array(5).fill(0).map((_, i) => (
                  <FiStar key={i} size={14} className={i < Math.round(product.rating || 0) ? 'text-[#F07B1D] fill-current' : 'text-gray-300'} />
                ))}
              </div>
              <span className="text-sm text-gray-400">({product.numReviews || 0} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-4">
              <span className="font-display text-3xl font-bold text-[#2C2C2C]">£{product.price?.toFixed(2)}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <>
                  <span className="text-lg text-gray-400 line-through">£{product.originalPrice.toFixed(2)}</span>
                  <span className="bg-[#F07B1D] text-white text-xs font-bold px-2 py-0.5">-{product.discount}%</span>
                </>
              )}
            </div>

            <p className="text-gray-600 text-sm leading-relaxed mb-6">{product.shortDescription || product.description}</p>

            {/* Details */}
            <div className="grid grid-cols-2 gap-3 text-sm mb-6">
              {product.material && <div><span className="font-bold text-[#2C2C2C]">Material: </span><span className="text-gray-500">{product.material}</span></div>}
              {product.color && <div><span className="font-bold text-[#2C2C2C]">Color: </span><span className="text-gray-500">{product.color}</span></div>}
              <div>
                <span className="font-bold text-[#2C2C2C]">Stock: </span>
                <span className={product.stock > 0 ? 'text-green-600' : 'text-red-500'}>
                  {product.stock > 0 ? `${product.stock} Available` : 'Out of Stock'}
                </span>
              </div>
            </div>

            {/* Qty & Add to Cart */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center border border-gray-300">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 hover:bg-gray-50">
                  <FiMinus size={14} />
                </button>
                <span className="px-4 py-2 font-bold min-w-[40px] text-center">{qty}</span>
                <button onClick={() => setQty(Math.min(product.stock, qty + 1))} className="px-3 py-2 hover:bg-gray-50">
                  <FiPlus size={14} />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 bg-[#F07B1D] hover:bg-[#D4620A] disabled:bg-gray-300 text-white py-3 font-bold uppercase tracking-wider text-sm transition-colors flex items-center justify-center gap-2"
              >
                <FiShoppingCart size={16} />
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
              <button className="p-3 border border-gray-300 hover:border-[#F07B1D] hover:text-[#F07B1D] transition-colors">
                <FiHeart size={18} />
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 text-xs text-gray-500 text-center border-t pt-4">
              <div className="flex flex-col items-center gap-1"><FiTruck className="text-[#F07B1D]" size={20} /><span>Free Shipping over £200</span></div>
              <div className="flex flex-col items-center gap-1"><FiPackage className="text-[#F07B1D]" size={20} /><span>Handcrafted Quality</span></div>
              <div className="flex flex-col items-center gap-1"><FiRefreshCw className="text-[#F07B1D]" size={20} /><span>30-Day Returns</span></div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white mt-6 shadow-sm">
          <div className="flex border-b">
            {['description', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-bold uppercase tracking-wide transition-colors ${activeTab === tab ? 'border-b-2 border-[#F07B1D] text-[#F07B1D]' : 'text-gray-500 hover:text-[#2C2C2C]'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="p-8">
            {activeTab === 'description' && (
              <p className="text-gray-600 leading-relaxed max-w-3xl">{product.description}</p>
            )}
            {activeTab === 'reviews' && (
              <div>
                {(!product.reviews || product.reviews.length === 0) && (
                  <p className="text-gray-400 mb-6">No reviews yet. Be the first!</p>
                )}
                <div className="space-y-4 mb-8">
                  {product.reviews?.map((r, i) => (
                    <div key={i} className="border-b pb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-8 h-8 bg-[#F07B1D] rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {r.name?.[0]}
                        </div>
                        <div>
                          <p className="font-bold text-sm">{r.name}</p>
                          <div className="flex">
                            {Array(5).fill(0).map((_, j) => (
                              <FiStar key={j} size={12} className={j < r.rating ? 'text-[#F07B1D] fill-current' : 'text-gray-300'} />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm">{r.comment}</p>
                    </div>
                  ))}
                </div>
                {!user && (
                  <p className="text-sm text-gray-500">
                    <Link href="/auth" className="text-[#F07B1D] hover:underline">Login</Link> to write a review.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}