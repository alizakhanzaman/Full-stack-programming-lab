'use client';
import { useState } from 'react';
import Link from 'next/link';
import BrandBanner from '../components/BrandBanner';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Sign in functionality would be implemented here.');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-4">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-xs text-gray-500 mb-4">
        <ol className="flex items-center gap-1">
          <li><Link href="/" className="text-red-600 hover:underline">Home</Link></li>
          <li>›</li>
          <li>My Account</li>
        </ol>
      </nav>

      <h1 className="text-xl font-bold text-gray-800 mb-6">Login Or Create Account</h1>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Login form */}
        <section className="bg-white border border-gray-200 p-6" aria-labelledby="login-heading">
          <h2 id="login-heading" className="text-sm font-bold text-gray-800 mb-4">User Login Details</h2>
          <p className="text-xs text-gray-600 mb-1">Please sign in below with your login information.</p>
          <p className="text-xs text-gray-500 mb-4">*Required Fields</p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label htmlFor="email" className="text-xs text-gray-700 block mb-1">
                Email <span className="text-red-600">*</span>
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 text-xs focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-200"
                aria-required="true"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="text-xs text-gray-700 block mb-1">
                Password <span className="text-red-600">*</span>
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 text-xs focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-200"
                aria-required="true"
              />
            </div>
            <div className="flex items-center gap-2 mb-4">
              <input
                id="remember"
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-3 h-3"
              />
              <label htmlFor="remember" className="text-xs text-gray-600">Remember me the next time I visit</label>
            </div>
            <div className="flex items-center gap-4">
              <button type="submit" className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-5 uppercase text-xs tracking-wide transition-colors">
                SIGN IN
              </button>
              <Link href="/forgot-password" className="text-xs text-blue-600 hover:underline">
                Forgot your password?
              </Link>
            </div>
          </form>
        </section>

        {/* New customer */}
        <section className="bg-white border border-gray-200 p-6" aria-labelledby="new-customer-heading">
          <h2 id="new-customer-heading" className="text-sm font-bold text-gray-800 mb-4">New Customer</h2>
          <p className="text-xs text-gray-600 mb-3">As a registered Abt.com customer you can:</p>
          <ul className="text-xs text-gray-600 space-y-1 mb-6 list-disc pl-5">
            <li>Store billing &amp; shipping information</li>
            <li>Check your order status</li>
            <li>Track your delivery status</li>
            <li>View your order history</li>
          </ul>
          <Link
            href="/register"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-5 uppercase text-xs tracking-wide transition-colors"
          >
            CREATE NEW ACCOUNT
          </Link>
        </section>
      </div>

      <div className="mb-8">
        <BrandBanner />
      </div>
    </div>
  );
}
