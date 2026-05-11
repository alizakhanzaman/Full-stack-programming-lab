'use client';
import { useState } from 'react';
import Link from 'next/link';

interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
}

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([
    { id: 1, name: 'XS SCYBA X SERIES 119', price: 500, qty: 1 },
    { id: 2, name: 'XS SCYBA X SET+ES 119', price: 500, qty: 2 },
  ]);

  const updateQty = (id: number, qty: number) => {
    if (qty < 1) return;
    setItems((prev) => prev.map((item) => item.id === id ? { ...item, qty } : item));
  };

  const removeItem = (id: number) => setItems((prev) => prev.filter((item) => item.id !== id));

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="max-w-5xl mx-auto px-4 py-4">
      <nav aria-label="Breadcrumb" className="text-xs text-gray-500 mb-4">
        <ol className="flex items-center gap-1">
          <li><Link href="/" className="text-red-600 hover:underline">Home</Link></li>
          <li>›</li>
          <li>Shopping Cart</li>
        </ol>
      </nav>

      <h1 className="text-xl font-bold text-gray-800 mb-6">Shopping Cart</h1>

      {items.length === 0 ? (
        <div className="bg-white border border-gray-200 p-10 text-center">
          <p className="text-4xl mb-4">🛒</p>
          <p className="text-gray-600 mb-4">Your cart is empty.</p>
          <Link href="/category" className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 uppercase text-xs tracking-wide transition-colors inline-block">
            CONTINUE SHOPPING
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {/* Cart items */}
          <section className="md:col-span-2" aria-label="Cart items">
            <div className="bg-white border border-gray-200">
              <table className="w-full text-xs">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">PRODUCT</th>
                    <th className="text-center px-3 py-3 font-semibold text-gray-700">QTY</th>
                    <th className="text-right px-4 py-3 font-semibold text-gray-700">PRICE</th>
                    <th className="text-right px-4 py-3 font-semibold text-gray-700">SUBTOTAL</th>
                    <th className="px-2 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-4 flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 flex items-center justify-center text-2xl">🛁</div>
                        <div>
                          <Link href={`/products/${item.id}`} className="font-semibold text-gray-800 hover:text-red-600">{item.name}</Link>
                        </div>
                      </td>
                      <td className="px-3 py-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-6 h-6 border border-gray-300 hover:border-red-500 flex items-center justify-center font-bold">−</button>
                          <span className="w-8 text-center font-semibold">{item.qty}</span>
                          <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-6 h-6 border border-gray-300 hover:border-red-500 flex items-center justify-center font-bold">+</button>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-right text-red-600 font-semibold">${item.price.toFixed(2)}</td>
                      <td className="px-4 py-4 text-right font-bold">${(item.price * item.qty).toFixed(2)}</td>
                      <td className="px-2 py-4">
                        <button onClick={() => removeItem(item.id)} aria-label="Remove item" className="text-gray-400 hover:text-red-600 transition-colors font-bold">✕</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-between items-center px-4 py-3 bg-gray-50">
                <Link href="/category" className="text-xs text-red-600 hover:underline font-semibold">← Continue Shopping</Link>
                <button type="button" className="bg-gray-600 hover:bg-gray-700 text-white text-xs font-bold py-2 px-4 uppercase tracking-wide transition-colors">
                  UPDATE CART
                </button>
              </div>
            </div>
          </section>

          {/* Order summary */}
          <aside className="bg-white border border-gray-200 p-4 h-fit" aria-label="Order summary">
            <h2 className="text-sm font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">Order Summary</h2>
            <dl className="text-xs space-y-2 mb-4">
              <div className="flex justify-between">
                <dt className="text-gray-600">Subtotal</dt>
                <dd className="font-semibold">${subtotal.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-600">Shipping</dt>
                <dd className="font-semibold text-green-600">Free</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-600">Tax (8%)</dt>
                <dd className="font-semibold">${tax.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-2 mt-2">
                <dt className="font-bold text-gray-800">Total</dt>
                <dd className="font-bold text-red-600 text-sm">${total.toFixed(2)}</dd>
              </div>
            </dl>
            <Link
              href="/checkout"
              className="block w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 uppercase text-xs tracking-wide transition-colors text-center"
            >
              PROCEED TO CHECKOUT
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
