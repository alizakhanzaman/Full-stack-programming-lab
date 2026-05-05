type Product = {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
      <img
        src={product.image || 'https://via.placeholder.com/300x200?text=No+Image'}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex flex-col flex-grow">
        <span className="text-xs text-blue-500 font-semibold uppercase tracking-wide">
          {product.category}
        </span>
        <h3 className="text-lg font-bold text-gray-800 mt-1">{product.name}</h3>
        <p className="text-sm text-gray-500 mt-1 flex-grow">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-green-600">
            Rs. {product.price.toLocaleString()}
          </span>
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}