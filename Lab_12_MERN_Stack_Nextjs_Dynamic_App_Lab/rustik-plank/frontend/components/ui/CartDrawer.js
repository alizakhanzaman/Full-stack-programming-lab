'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useCartStore from '@/lib/store';
import { FiX, FiTrash2, FiMinus, FiPlus, FiShoppingBag } from 'react-icons/fi';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, total, count } = useCartStore();

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-50" onClick={closeCart} />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl transform transition-transform duration-300 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-[#FAF6F0]">
          <h2 className="font-display text-lg font-bold text-[#2C2C2C] flex items-center gap-2">
            <FiShoppingBag className="text-[#F07B1D]" />
            Your Cart ({count})
          </h2>
          <button onClick={closeCart} className="p-1 hover:text-[#F07B1D] transition-colors">
            <FiX size={22} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <FiShoppingBag className="mx-auto text-gray-300 mb-3" size={48} />
              <p className="text-gray-500 font-body">Your cart is empty</p>
              <button onClick={closeCart} className="mt-4 text-sm text-[#F07B1D] hover:underline">Continue Shopping</button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item._id} className="flex gap-3 border-b pb-4">
                <div className="w-18 h-18 flex-shrink-0 bg-gray-100 overflow-hidden" style={{ width: 72, height: 72 }}>
                  {item.mainImage && (
                    <img src={item.mainImage} alt={item.name} className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-body text-sm font-bold text-[#2C2C2C] truncate">{item.name}</p>
                  <p className="text-[#F07B1D] font-bold text-sm">£{item.price.toFixed(2)}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="w-6 h-6 border border-gray-300 flex items-center justify-center hover:border-[#F07B1D] hover:text-[#F07B1D] transition-colors">
                      <FiMinus size={10} />
                    </button>
                    <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="w-6 h-6 border border-gray-300 flex items-center justify-center hover:border-[#F07B1D] hover:text-[#F07B1D] transition-colors">
                      <FiPlus size={10} />
                    </button>
                    <button onClick={() => removeItem(item._id)} className="ml-auto text-gray-400 hover:text-red-500 transition-colors">
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t p-4 space-y-3 bg-[#FAF6F0]">
            <div className="flex justify-between items-center font-bold text-[#2C2C2C]">
              <span className="font-body text-base">Subtotal</span>
              <span className="font-display text-lg text-[#F07B1D]">£{total.toFixed(2)}</span>
            </div>
            <p className="text-xs text-gray-500">Shipping & taxes calculated at checkout</p>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full bg-[#F07B1D] hover:bg-[#D4620A] text-white text-center py-3 font-bold uppercase text-sm tracking-wider transition-colors"
            >
              Proceed to Checkout
            </Link>
            <Link
              href="/products"
              onClick={closeCart}
              className="block w-full border-2 border-[#2C2C2C] text-[#2C2C2C] hover:bg-[#2C2C2C] hover:text-white text-center py-3 font-bold uppercase text-sm tracking-wider transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
