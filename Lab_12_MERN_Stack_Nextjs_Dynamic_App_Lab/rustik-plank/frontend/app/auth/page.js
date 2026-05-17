'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';
import toast from 'react-hot-toast';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';

export default function AuthPage() {
  const [mode, setMode] = useState('login');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === 'login') {
        await login(formData.email, formData.password);
        toast.success('Welcome back!');
      } else {
        await register(formData.name, formData.email, formData.password);
        toast.success('Account created! Welcome!');
      }
      router.push('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-[#F07B1D] rotate-45 flex items-center justify-center">
              <span className="text-white font-bold text-xs -rotate-45">RP</span>
            </div>
            <span className="font-display text-2xl font-bold text-[#2C2C2C]">Rustik Plank</span>
          </div>
        </div>

        <div className="bg-white shadow-sm p-8">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-8">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-3 font-bold uppercase text-sm tracking-wide transition-colors ${mode === 'login' ? 'border-b-2 border-[#F07B1D] text-[#F07B1D]' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Login
            </button>
            <button
              onClick={() => setMode('register')}
              className={`flex-1 py-3 font-bold uppercase text-sm tracking-wide transition-colors ${mode === 'register' ? 'border-b-2 border-[#F07B1D] text-[#F07B1D]' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-gray-300 pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-[#F07B1D] transition-colors"
                  required
                />
              </div>
            )}
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border border-gray-300 pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-[#F07B1D] transition-colors"
                required
              />
            </div>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full border border-gray-300 pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-[#F07B1D] transition-colors"
                required
                minLength={6}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#F07B1D] hover:bg-[#D4620A] disabled:bg-gray-300 text-white py-3 font-bold uppercase tracking-wider text-sm transition-colors"
            >
              {loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Create Account'}
            </button>
          </form>

          {mode === 'login' && (
            <div className="mt-4 text-center">
              <p className="text-xs text-gray-400">Demo accounts:</p>
              <p className="text-xs text-gray-500">admin@rustikplank.com / admin123</p>
              <p className="text-xs text-gray-500">user@rustikplank.com / user123</p>
            </div>
          )}
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          <Link href="/" className="text-[#F07B1D] hover:underline">← Back to Store</Link>
        </p>
      </div>
    </div>
  );
}
