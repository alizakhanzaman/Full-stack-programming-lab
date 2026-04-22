import Link from "next/link";
import { products } from "@/app/data/products";

export default function ProductList() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-red-700 mb-2">Our Menu</h2>
      <p className="text-gray-500 mb-8">Fresh ingredients, authentic recipes 🇮🇹</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((item) => (
          <div key={item.id}
            className="bg-white rounded-xl shadow p-5 flex flex-col justify-between hover:shadow-lg transition border-t-4 border-red-500">
            <div>
              <p className="text-4xl mb-3">{item.emoji}</p>
              <span className="text-xs bg-red-100 text-red-600 font-semibold px-2 py-0.5 rounded-full">
                {item.category}
              </span>
              <h3 className="text-lg font-bold text-gray-800 mt-2 mb-1">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.description}</p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="text-green-600 font-bold text-lg">${item.price}</span>
              <Link href={`/menu/${item.id}`}
                className="bg-red-600 text-white text-sm px-4 py-1.5 rounded-lg hover:bg-red-700 transition">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}