'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [shipping, setShipping] = useState({
    firstName: '', lastName: '', address: '', city: '', state: '', zip: '', country: 'US', phone: '',
  });
  const [payment, setPayment] = useState({
    cardName: '', cardNumber: '', expiry: '', cvv: '',
  });

  const updateShipping = (field: string, value: string) =>
    setShipping((prev) => ({ ...prev, [field]: value }));
  const updatePayment = (field: string, value: string) =>
    setPayment((prev) => ({ ...prev, [field]: value }));

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Order placed successfully! Thank you for your purchase.');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-4">
      <nav aria-label="Breadcrumb" className="text-xs text-gray-500 mb-4">
        <ol className="flex items-center gap-1">
          <li><Link href="/" className="text-red-600 hover:underline">Home</Link></li>
          <li>›</li>
          <li><Link href="/cart" className="text-red-600 hover:underline">Cart</Link></li>
          <li>›</li>
          <li>Checkout</li>
        </ol>
      </nav>

      <h1 className="text-xl font-bold text-gray-800 mb-6">Checkout</h1>

      {/* Progress steps */}
      <div className="flex items-center gap-0 mb-8 overflow-x-auto">
        {['Shipping', 'Payment', 'Review'].map((s, i) => (
          <div key={s} className="flex items-center">
            <div className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold ${step === i + 1 ? 'bg-red-600 text-white' : step > i + 1 ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
              <span className="w-5 h-5 rounded-full border-2 border-current flex items-center justify-center font-bold text-xs">
                {step > i + 1 ? '✓' : i + 1}
              </span>
              {s}
            </div>
            {i < 2 && <div className="w-6 h-0.5 bg-gray-300" />}
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <form onSubmit={handleOrder} className="md:col-span-2">
          {step === 1 && (
            <section className="bg-white border border-gray-200 p-6" aria-labelledby="shipping-heading">
              <h2 id="shipping-heading" className="text-sm font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                Shipping Address
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'fn', label: 'First Name', field: 'firstName', type: 'text' },
                  { id: 'ln', label: 'Last Name', field: 'lastName', type: 'text' },
                ].map(({ id, label, field }) => (
                  <div key={id}>
                    <label htmlFor={id} className="text-xs text-gray-700 block mb-1">{label} *</label>
                    <input id={id} type="text" required value={(shipping as Record<string, string>)[field]}
                      onChange={(e) => updateShipping(field, e.target.value)}
                      className="w-full border border-gray-300 px-3 py-2 text-xs focus:outline-none focus:border-red-500" />
                  </div>
                ))}
                <div className="col-span-2">
                  <label htmlFor="addr" className="text-xs text-gray-700 block mb-1">Street Address *</label>
                  <input id="addr" type="text" required value={shipping.address}
                    onChange={(e) => updateShipping('address', e.target.value)}
                    className="w-full border border-gray-300 px-3 py-2 text-xs focus:outline-none focus:border-red-500" />
                </div>
                <div>
                  <label htmlFor="city" className="text-xs text-gray-700 block mb-1">City *</label>
                  <input id="city" type="text" required value={shipping.city}
                    onChange={(e) => updateShipping('city', e.target.value)}
                    className="w-full border border-gray-300 px-3 py-2 text-xs focus:outline-none focus:border-red-500" />
                </div>
                <div>
                  <label htmlFor="state" className="text-xs text-gray-700 block mb-1">State *</label>
                  <input id="state" type="text" required value={shipping.state}
                    onChange={(e) => updateShipping('state', e.target.value)}
                    className="w-full border border-gray-300 px-3 py-2 text-xs focus:outline-none focus:border-red-500" />
                </div>
                <div>
                  <label htmlFor="zip" className="text-xs text-gray-700 block mb-1">Zip Code *</label>
                  <input id="zip" type="text" required value={shipping.zip}
                    onChange={(e) => updateShipping('zip', e.target.value)}
                    className="w-full border border-gray-300 px-3 py-2 text-xs focus:outline-none focus:border-red-500" />
                </div>
                <div>
                  <label htmlFor="phone" className="text-xs text-gray-700 block mb-1">Phone</label>
                  <input id="phone" type="tel" value={shipping.phone}
                    onChange={(e) => updateShipping('phone', e.target.value)}
                    className="w-full border border-gray-300 px-3 py-2 text-xs focus:outline-none focus:border-red-500" />
                </div>
              </div>
              <button type="button" onClick={() => setStep(2)} className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 uppercase text-xs tracking-wide transition-colors">
                CONTINUE TO PAYMENT →
              </button>
            </section>
          )}

          {step === 2 && (
            <section className="bg-white border border-gray-200 p-6" aria-labelledby="payment-heading">
              <h2 id="payment-heading" className="text-sm font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                Payment Information
              </h2>
              <div className="flex gap-2 mb-4">
                {['Visa', 'MC', 'Amex', 'PayPal'].map((c) => (
                  <span key={c} className="bg-gray-100 border border-gray-300 text-xs px-3 py-1.5 rounded font-bold">{c}</span>
                ))}
              </div>
              <div className="space-y-3">
                <div>
                  <label htmlFor="card-name" className="text-xs text-gray-700 block mb-1">Cardholder Name *</label>
                  <input id="card-name" type="text" required value={payment.cardName}
                    onChange={(e) => updatePayment('cardName', e.target.value)}
                    className="w-full border border-gray-300 px-3 py-2 text-xs focus:outline-none focus:border-red-500" />
                </div>
                <div>
                  <label htmlFor="card-num" className="text-xs text-gray-700 block mb-1">Card Number *</label>
                  <input id="card-num" type="text" required placeholder="1234 5678 9012 3456" value={payment.cardNumber}
                    onChange={(e) => updatePayment('cardNumber', e.target.value)}
                    className="w-full border border-gray-300 px-3 py-2 text-xs focus:outline-none focus:border-red-500" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="expiry" className="text-xs text-gray-700 block mb-1">Expiry Date *</label>
                    <input id="expiry" type="text" placeholder="MM/YY" required value={payment.expiry}
                      onChange={(e) => updatePayment('expiry', e.target.value)}
                      className="w-full border border-gray-300 px-3 py-2 text-xs focus:outline-none focus:border-red-500" />
                  </div>
                  <div>
                    <label htmlFor="cvv" className="text-xs text-gray-700 block mb-1">CVV *</label>
                    <input id="cvv" type="text" placeholder="123" required value={payment.cvv}
                      onChange={(e) => updatePayment('cvv', e.target.value)}
                      className="w-full border border-gray-300 px-3 py-2 text-xs focus:outline-none focus:border-red-500" />
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <button type="button" onClick={() => setStep(1)} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 uppercase text-xs tracking-wide transition-colors">
                  ← BACK
                </button>
                <button type="button" onClick={() => setStep(3)} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 uppercase text-xs tracking-wide transition-colors">
                  REVIEW ORDER →
                </button>
              </div>
            </section>
          )}

          {step === 3 && (
            <section className="bg-white border border-gray-200 p-6" aria-labelledby="review-heading">
              <h2 id="review-heading" className="text-sm font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                Review Your Order
              </h2>
              <p className="text-xs text-gray-600 mb-4">Please review your order before placing it.</p>
              <div className="bg-gray-50 p-3 rounded text-xs mb-4 space-y-1">
                <p><strong>Shipping to:</strong> {shipping.firstName} {shipping.lastName}, {shipping.city}, {shipping.state} {shipping.zip}</p>
                <p><strong>Payment:</strong> Card ending in •••• {payment.cardNumber.slice(-4) || '****'}</p>
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setStep(2)} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 uppercase text-xs tracking-wide transition-colors">
                  ← BACK
                </button>
                <button type="submit" className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 uppercase text-xs tracking-wide transition-colors">
                  PLACE ORDER ✓
                </button>
              </div>
            </section>
          )}
        </form>

        {/* Order summary sidebar */}
        <aside className="bg-white border border-gray-200 p-4 h-fit" aria-label="Order summary">
          <h2 className="text-sm font-bold text-gray-800 mb-3 border-b border-gray-200 pb-2">Order Summary</h2>
          <div className="text-xs space-y-2 mb-4">
            <div className="flex justify-between"><span className="text-gray-600">2 items</span><span>$1,000.00</span></div>
            <div className="flex justify-between"><span className="text-gray-600">Shipping</span><span className="text-green-600">Free</span></div>
            <div className="flex justify-between"><span className="text-gray-600">Tax</span><span>$80.00</span></div>
            <div className="flex justify-between border-t pt-2 font-bold text-sm"><span>Total</span><span className="text-red-600">$1,080.00</span></div>
          </div>
        </aside>
      </div>
    </div>
  );
}
