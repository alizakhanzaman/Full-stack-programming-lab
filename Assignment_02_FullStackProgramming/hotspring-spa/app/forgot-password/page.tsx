'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-4">
      <nav aria-label="Breadcrumb" className="text-xs text-gray-500 mb-4">
        <ol className="flex items-center gap-1">
          <li><Link href="/" className="text-red-600 hover:underline">Home</Link></li>
          <li>›</li>
          <li><Link href="/login" className="text-red-600 hover:underline">My Account</Link></li>
          <li>›</li>
          <li>Forgot Password</li>
        </ol>
      </nav>

      <h1 className="text-xl font-bold text-gray-800 mb-6">Forgot Your Password?</h1>

      <div className="max-w-md bg-white border border-gray-200 p-6">
        {submitted ? (
          <div className="text-center py-4">
            <p className="text-4xl mb-3">✉️</p>
            <p className="text-sm font-semibold text-gray-800 mb-2">Check Your Email</p>
            <p className="text-xs text-gray-600 mb-4">
              If an account with <strong>{email}</strong> exists, you will receive a password reset link shortly.
            </p>
            <Link href="/login" className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-5 uppercase text-xs tracking-wide transition-colors inline-block">
              BACK TO LOGIN
            </Link>
          </div>
        ) : (
          <>
            <p className="text-xs text-gray-600 mb-4">
              Please enter your email address below. You will receive a link to reset your password.
            </p>
            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-4">
                <label htmlFor="reset-email" className="text-xs text-gray-700 block mb-1">
                  Email Address <span className="text-red-600">*</span>
                </label>
                <input
                  id="reset-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 px-3 py-2 text-xs focus:outline-none focus:border-red-500"
                  placeholder="Enter your email"
                />
              </div>
              <div className="flex items-center gap-4">
                <button type="submit" className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-5 uppercase text-xs tracking-wide transition-colors">
                  RESET PASSWORD
                </button>
                <Link href="/login" className="text-xs text-red-600 hover:underline">
                  Back to Login
                </Link>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
