'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import useCartStore from '@/lib/store';
import { useAuth } from '@/lib/AuthContext';
import { createOrder } from '@/lib/api';
import toast from 'react-hot-toast';
import { FiLock, FiCheck } from 'react-icons/fi';

export default function CheckoutPage() {
  const { items, total, clearCart } = useCartStore();
  const { user } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [orderDone, setOrderDone] = useState(null);

  const [shipping, setShipping] = useState({
    street: '', city: '', state: '', zip: '', country: 'UK',
  });
  const [payment, setPayment] = useState({ method: 'card', cardNumber: '', expiry: '', cvv: '' });

  if (!user) {
    return (
      <div className="min-h-screen bg-[#FAF6F0] flex items-center justify-center">
        <div className="text-center bg-white p-12 shadow-sm max-w-md">
          <FiLock className="mx-auto text-[#F07B1D] mb-4" size={48} />
          <h2 className="font-display text-2xl font-bold mb-3">Login Required</h2>
          <p className="text-gray-500 mb-6">Please login to proceed to checkout</p>
          <Link href="/auth" className="bg-[#F07B1D] text-white px-8 py-3 font-bold uppercase tracking-wider hover:bg-[#D4620A] transition-colors inline-block">
            Login / Register
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0 && !orderDone) {
    return (
      <div className="min-h-screen bg-[#FAF6F0] flex items-center justify-center">
        <div className="text-center bg-white p-12 shadow-sm max-w-md">
          <h2 className="font-display text-2xl font-bold mb-3">Your cart is empty</h2>
          <Link href="/products" className="bg-[#F07B1D] text-white px-8 py-3 font-bold uppercase tracking-wider hover:bg-[#D4620A] transition-colors inline-block mt-4">
            Shop Now
          </Link>
        </div>
      </div>
    );
  }

  if (orderDone) {
    return (
      <div className="min-h-screen bg-[#FAF6F0] flex items-center justify-center">
        <div className="text-center bg-white p-12 shadow-sm max-w-lg">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiCheck className="text-green-500" size={40} />
          </div>
          <h2 className="font-display text-3xl font-bold text-[#2C2C2C] mb-2">Order Placed!</h2>
          <p className="text-gray-500 mb-2">Thank you for your purchase.</p>
          <p className="text-sm text-gray-400 mb-6">Order #: <strong>{orderDone.orderNumber}</strong></p>
          <div className="flex gap-3 justify-center">
            <Link href="/account/orders" className="bg-[#F07B1D] text-white px-6 py-3 font-bold uppercase text-sm hover:bg-[#D4620A] transition-colors">
              View Orders
            </Link>
            <Link href="/products" className="border-2 border-[#2C2C2C] text-[#2C2C2C] px-6 py-3 font-bold uppercase text-sm hover:bg-[#2C2C2C] hover:text-white transition-colors">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const shippingCost = total >= 200 ? 0 : 9.99;
  const tax = total * 0.2;
  const grandTotal = total + shippingCost + tax;

  const handlePlaceOrder = async () => {
    setSubmitting(true);
    try {
      const orderItems = items.map((i) => ({
        product: i._id,
        name: i.name,
        image: i.mainImage,
        price: i.price,
        quantity: i.quantity,
      }));
      const res = await createOrder({
        items: orderItems,
        shippingAddress: shipping,
        paymentMethod: payment.method,
        itemsPrice: total,
        shippingPrice: shippingCost,
        taxPrice: tax,
        totalPrice: grandTotal,
      });
      clearCart();
      setOrderDone(res.data.data);
      toast.success('Order placed successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to place order');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="font-display text-3xl font-bold text-[#2C2C2C] mb-8">Checkout</h1>

        {/* Steps */}
        <div className="flex items-center gap-4 mb-8">
          {[1, 2].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= s ? 'bg-[#F07B1D] text-white' : 'bg-gray-200 text-gray-500'}`}>{s}</div>
              <span className={`text-sm font-medium ${step >= s ? 'text-[#2C2C2C]' : 'text-gray-400'}`}>
                {s === 1 ? 'Shipping' : 'Payment'}
              </span>
              {s < 2 && <div className="w-12 h-0.5 bg-gray-200 ml-2" />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <div className="bg-white p-8 shadow-sm">
                <h2 className="font-display text-xl font-bold mb-6">Shipping Address</h2>
                <div className="grid grid-cols-1 gap-4">
                  <input placeholder="Street Address" value={shipping.street} onChange={(e) => setShipping({ ...shipping, street: e.target.value })} className="border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-[#F07B1D]" required />
                  <div className="grid grid-cols-2 gap-4">
                    <input placeholder="City" value={shipping.city} onChange={(e) => setShipping({ ...shipping, city: e.target.value })} className="border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-[#F07B1D]" required />
                    <input placeholder="State / County" value={shipping.state} onChange={(e) => setShipping({ ...shipping, state: e.target.value })} className="border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-[#F07B1D]" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input placeholder="Postcode" value={shipping.zip} onChange={(e) => setShipping({ ...shipping, zip: e.target.value })} className="border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-[#F07B1D]" required />
                    <input placeholder="Country" value={shipping.country} onChange={(e) => setShipping({ ...shipping, country: e.target.value })} className="border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-[#F07B1D]" />
                  </div>
                </div>
                <button onClick={() => { if (!shipping.street || !shipping.city || !shipping.zip) return toast.error('Please fill shipping details'); setStep(2); }} className="mt-6 bg-[#F07B1D] hover:bg-[#D4620A] text-white px-8 py-3 font-bold uppercase tracking-wider text-sm transition-colors">
                  Continue to Payment
                </button>
              </div>
            )}
            {step === 2 && (
              <div className="bg-white p-8 shadow-sm">
                <h2 className="font-display text-xl font-bold mb-6">Payment</h2>
                <div className="flex gap-3 mb-6">
                  {['card', 'paypal', 'bank'].map((m) => (
                    <button key={m} onClick={() => setPayment({ ...payment, method: m })} className={`border-2 px-4 py-2 text-sm font-bold uppercase transition-colors ${payment.method === m ? 'border-[#F07B1D] text-[#F07B1D]' : 'border-gray-200 text-gray-500 hover:border-gray-400'}`}>
                      {m}
                    </button>
                  ))}
                </div>
                {payment.method === 'card' && (
                  <div className="space-y-4">
                    <input placeholder="Card Number (demo: any)" value={payment.cardNumber} onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })} className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-[#F07B1D]" />
                    <div className="grid grid-cols-2 gap-4">
                      <input placeholder="MM/YY" value={payment.expiry} onChange={(e) => setPayment({ ...payment, expiry: e.target.value })} className="border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-[#F07B1D]" />
                      <input placeholder="CVV" value={payment.cvv} onChange={(e) => setPayment({ ...payment, cvv: e.target.value })} className="border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-[#F07B1D]" />
                    </div>
                  </div>
                )}
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep(1)} className="border-2 border-gray-300 text-gray-500 px-6 py-3 font-bold uppercase text-sm hover:border-[#2C2C2C] hover:text-[#2C2C2C] transition-colors">
                    Back
                  </button>
                  <button onClick={handlePlaceOrder} disabled={submitting} className="flex-1 bg-[#F07B1D] hover:bg-[#D4620A] disabled:bg-gray-300 text-white py-3 font-bold uppercase tracking-wider text-sm transition-colors flex items-center justify-center gap-2">
                    <FiLock size={14} />
                    {submitting ? 'Placing Order...' : `Place Order — £${grandTotal.toFixed(2)}`}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white p-6 shadow-sm">
              <h2 className="font-display text-xl font-bold mb-4 border-b pb-3">Order Summary</h2>
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item._id} className="flex gap-3">
                    <div className="w-12 h-12 bg-gray-100 flex-shrink-0 overflow-hidden">
                      {item.mainImage && <img src={item.mainImage} alt={item.name} className="w-full h-full object-cover" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold truncate">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-bold text-[#F07B1D]">£{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span>£{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Shipping</span>
                  <span className={shippingCost === 0 ? 'text-green-600' : ''}>{shippingCost === 0 ? 'FREE' : `£${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>VAT (20%)</span>
                  <span>£{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-[#2C2C2C] text-base border-t pt-2">
                  <span>Total</span>
                  <span className="text-[#F07B1D] font-display">£{grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
