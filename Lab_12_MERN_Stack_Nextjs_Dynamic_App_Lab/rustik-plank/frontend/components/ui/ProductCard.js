'use client';
import Link from 'next/link';
import toast from 'react-hot-toast';
import useCartStore from '@/lib/store';
import { FiShoppingCart, FiHeart, FiEye } from 'react-icons/fi';

export default function ProductCard({ product }) {
  const { addItem, openCart } = useCartStore();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addItem(product);
    toast.success(`"${product.name}" added to cart!`);
    openCart();
  };

  return (
    <div className="product-card group relative bg-white border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Badges */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
        {product.discount > 0 && (
          <span className="bg-[#F07B1D] text-white text-xs font-bold px-2 py-0.5 uppercase">
            -{product.discount}%
          </span>
        )}
        {product.isSpecial && !product.discount && (
          <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 uppercase">Sale</span>
        )}
        {product.isNew && (
          <span className="bg-green-500 text-white text-xs font-bold px-2 py-0.5 uppercase">New</span>
        )}
      </div>

      {/* Image */}
      <Link href={`/products/${product.slug || product._id}`}>
        <div className="relative overflow-hidden bg-gray-50" style={{ paddingTop: '100%' }}>
          {product.mainImage ? (
            <img
              src={product.mainImage}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-300">
              <span className="text-4xl">🪑</span>
            </div>
          )}
          {/* Hover overlay */}
          <div className="product-overlay absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 flex items-center justify-center gap-3">
            <button
              onClick={handleAddToCart}
              className="bg-white hover:bg-[#F07B1D] hover:text-white text-[#2C2C2C] p-2.5 shadow-md transition-all duration-200 transform hover:scale-110"
              title="Add to Cart"
            >
              <FiShoppingCart size={16} />
            </button>
            <Link
              href={`/products/${product.slug || product._id}`}
              className="bg-white hover:bg-[#F07B1D] hover:text-white text-[#2C2C2C] p-2.5 shadow-md transition-all duration-200 transform hover:scale-110"
              title="View Details"
            >
              <FiEye size={16} />
            </Link>
            <button
              className="bg-white hover:bg-[#F07B1D] hover:text-white text-[#2C2C2C] p-2.5 shadow-md transition-all duration-200 transform hover:scale-110"
              title="Wishlist"
            >
              <FiHeart size={16} />
            </button>
          </div>
        </div>
      </Link>

      {/* Info */}
      <div className="p-3">
        {product.category && (
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">{product.category.name}</p>
        )}
        <Link href={`/products/${product.slug || product._id}`}>
          <h3 className="font-body text-sm font-bold text-[#2C2C2C] hover:text-[#F07B1D] transition-colors leading-tight truncate">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-gray-400 mt-0.5 truncate">{product.shortDescription || product.material}</p>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-[#2C2C2C]">£{product.price.toFixed(2)}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-gray-400 line-through">£{product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            className="text-xs bg-[#F07B1D] hover:bg-[#D4620A] text-white px-3 py-1.5 uppercase tracking-wide font-bold transition-colors"
          >
            Detail
          </button>
        </div>
      </div>
    </div>
  );
}
