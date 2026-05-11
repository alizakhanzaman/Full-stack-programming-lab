import Link from 'next/link';

interface ProductCardProps {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image?: string;
}

export default function ProductCard({ id, name, description, price, originalPrice, image }: ProductCardProps) {
  return (
    <article className="bg-white border border-gray-200 p-3 hover:shadow-lg transition-shadow duration-200 flex flex-col">
      <Link href={`/products/${id}`} className="block mb-3">
        <div className="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
          {image ? (
            <img src={image} alt={name} className="w-full h-full object-contain" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <span className="text-5xl">🛁</span>
            </div>
          )}
        </div>
      </Link>

      <div className="flex-1 flex flex-col">
        <h3 className="text-xs font-semibold text-gray-800 mb-1">
          <Link href={`/products/${id}`} className="hover:text-red-600 transition-colors">
            {name}
          </Link>
        </h3>
        <p className="text-xs text-gray-500 mb-2 line-clamp-2 flex-1">{description}</p>

        <div className="mb-2">
          {originalPrice && (
            <span className="text-xs text-gray-400 line-through mr-2">${originalPrice.toFixed(2)}</span>
          )}
          <span className="text-red-600 font-bold text-base">${price.toFixed(2)}</span>
        </div>

        <button
          type="button"
          className="w-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2 px-3 uppercase tracking-wide transition-colors flex items-center justify-center gap-2 mb-2"
        >
          <span>🛒</span> ADD TO CART
        </button>

        <div className="flex gap-3 text-xs">
          <button type="button" className="text-red-600 hover:underline">ADD TO WISH LIST</button>
          <span className="text-gray-300">|</span>
          <Link href={`/products/${id}`} className="text-red-600 hover:underline">MORE DETAILS</Link>
        </div>
      </div>
    </article>
  );
}
