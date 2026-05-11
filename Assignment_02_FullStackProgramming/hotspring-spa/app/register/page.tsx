'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', password: '', confirm: '',
    subscribe: false,
  });

  const update = (field: string, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Registration would be processed here.');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-4">
      <nav aria-label="Breadcrumb" className="text-xs text-gray-500 mb-4">
        <ol className="flex items-center gap-1">
          <li><Link href="/" className="text-red-600 hover:underline">Home</Link></li>
          <li>›</li>
          <li>Create Account</li>
        </ol>
      </nav>

      <h1 className="text-xl font-bold text-gray-800 mb-6">Create New Customer Account</h1>

      <div className="bg-white border border-gray-200 p-6 max-w-xl">
        <h2 className="text-sm font-bold text-gray-700 mb-4 border-b border-gray-200 pb-2">Personal Information</h2>

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label htmlFor="firstName" className="text-xs text-gray-700 block mb-1">First Name <span className="text-red-600">*</span></label>
              <input id="firstName" type="text" required value={form.firstName}
                onChange={(e) => update('firstName', e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 text-xs focus:outline-none focus:border-red-500" />
            </div>
            <div>
              <label htmlFor="lastName" className="text-xs text-gray-700 block mb-1">Last Name <span className="text-red-600">*</span></label>
              <input id="lastName" type="text" required value={form.lastName}
                onChange={(e) => update('lastName', e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 text-xs focus:outline-none focus:border-red-500" />
            </div>
          </div>
          <div className="mb-3">
            <label className="flex items-center gap-2 text-xs text-gray-600">
              <input type="checkbox" checked={form.subscribe}
                onChange={(e) => update('subscribe', e.target.checked)} className="w-3 h-3" />
              Sign Up for Newsletter
            </label>
          </div>

          <h2 className="text-sm font-bold text-gray-700 mb-4 border-b border-gray-200 pb-2 mt-5">Login Information</h2>

          <div className="mb-3">
            <label htmlFor="reg-email" className="text-xs text-gray-700 block mb-1">Email Address <span className="text-red-600">*</span></label>
            <input id="reg-email" type="email" required value={form.email}
              onChange={(e) => update('email', e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 text-xs focus:outline-none focus:border-red-500" />
          </div>
          <div className="mb-3">
            <label htmlFor="reg-password" className="text-xs text-gray-700 block mb-1">Password <span className="text-red-600">*</span></label>
            <input id="reg-password" type="password" required value={form.password}
              onChange={(e) => update('password', e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 text-xs focus:outline-none focus:border-red-500" />
          </div>
          <div className="mb-5">
            <label htmlFor="reg-confirm" className="text-xs text-gray-700 block mb-1">Confirm Password <span className="text-red-600">*</span></label>
            <input id="reg-confirm" type="password" required value={form.confirm}
              onChange={(e) => update('confirm', e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 text-xs focus:outline-none focus:border-red-500" />
          </div>

          <div className="flex items-center gap-4">
            <button type="submit" className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-5 uppercase text-xs tracking-wide transition-colors">
              REGISTER
            </button>
            <Link href="/login" className="text-xs text-red-600 hover:underline">Back to Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
