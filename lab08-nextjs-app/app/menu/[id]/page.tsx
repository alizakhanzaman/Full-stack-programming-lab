import { products } from "@/app/data/products";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function MenuItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = products.find((p) => p.id === Number(id));

  if (!item) notFound();

  return (
    <div className="max-w-xl mx-auto mt-10">
      <Link href="/menu" className="text-red-600 hover:underline text-sm mb-6 inline-block">
        ← Back to Menu
      </Link>
      <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-red-500">
        <p className="text-6xl mb-4">{item.emoji}</p>
        <span className="text-xs bg-red-100 text-red-600 font-semibold px-2 py-0.5 rounded-full">
          {item.category}
        </span>
        <h1 className="text-3xl font-bold text-gray-800 mt-3 mb-3">{item.title}</h1>
        <p className="text-gray-600 text-base leading-relaxed mb-6">{item.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-green-600">${item.price}</span>
          <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 font-semibold transition">
            🛒 Order Now
          </button>
        </div>
      </div>
    </div>
  );
}