'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';
import { getMyOrders } from '@/lib/api';
import toast from 'react-hot-toast';
import { FiUser, FiPackage, FiMapPin, FiLogOut, FiChevronRight } from 'react-icons/fi';

export default function AccountPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [activeTab, setActiveTab] = useState('orders');

  useEffect(() => {
    if (!user) { router.push('/auth'); return; }
    getMyOrders()
      .then((res) => setOrders(res.data.data || []))
      .catch(() => {})
      .finally(() => setLoadingOrders(false));
  }, [user]);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    router.push('/');
  };

  if (!user) return null;

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-700',
    processing: 'bg-blue-100 text-blue-700',
    shipped: 'bg-purple-100 text-purple-700',
    delivered: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0]">
      {/* Header */}
      <div className="bg-[#2C2C2C] text-white py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#F07B1D] rounded-full flex items-center justify-center text-white text-2xl font-bold font-display">
              {user.name[0].toUpperCase()}
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold">{user.name}</h1>
              <p className="text-gray-400 text-sm">{user.email}</p>
              {user.role === 'admin' && (
                <span className="inline-block bg-[#F07B1D] text-white text-xs font-bold px-2 py-0.5 mt-1 uppercase">Admin</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="md:col-span-1">
            <div className="bg-white shadow-sm">
              {[
                { id: 'orders', label: 'My Orders', icon: FiPackage },
                { id: 'profile', label: 'Profile', icon: FiUser },
                { id: 'addresses', label: 'Addresses', icon: FiMapPin },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`w-full flex items-center justify-between px-5 py-4 text-sm font-medium border-b border-gray-100 transition-colors ${activeTab === id ? 'bg-[#FFF4EC] text-[#F07B1D] font-bold border-l-4 border-l-[#F07B1D]' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <span className="flex items-center gap-3"><Icon size={16} />{label}</span>
                  <FiChevronRight size={14} />
                </button>
              ))}
              {user.role === 'admin' && (
                <Link href="/admin" className="w-full flex items-center justify-between px-5 py-4 text-sm font-medium border-b border-gray-100 text-[#F07B1D] hover:bg-orange-50 transition-colors">
                  <span>Admin Dashboard</span>
                  <FiChevronRight size={14} />
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-5 py-4 text-sm text-red-500 hover:bg-red-50 transition-colors"
              >
                <FiLogOut size={16} /> Logout
              </button>
            </div>
          </aside>

          {/* Content */}
          <div className="md:col-span-3">
            {/* Orders */}
            {activeTab === 'orders' && (
              <div className="bg-white shadow-sm p-6">
                <h2 className="font-display text-xl font-bold text-[#2C2C2C] mb-6">Order History</h2>
                {loadingOrders ? (
                  <div className="space-y-3">
                    {[1,2,3].map(i => <div key={i} className="h-20 bg-gray-100 animate-pulse rounded" />)}
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-12">
                    <FiPackage className="mx-auto text-gray-300 mb-3" size={48} />
                    <p className="text-gray-500 mb-4">You haven't placed any orders yet</p>
                    <Link href="/products" className="bg-[#F07B1D] text-white px-6 py-2 font-bold uppercase text-sm hover:bg-[#D4620A] transition-colors inline-block">
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order._id} className="border border-gray-100 p-5 hover:border-[#F07B1D] transition-colors">
                        <div className="flex items-start justify-between gap-4 flex-wrap">
                          <div>
                            <p className="font-bold text-[#2C2C2C] text-sm">{order.orderNumber}</p>
                            <p className="text-xs text-gray-400 mt-0.5">{new Date(order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                            <p className="text-xs text-gray-500 mt-1">{order.items?.length} item(s)</p>
                          </div>
                          <div className="text-right">
                            <p className="font-display font-bold text-[#F07B1D] text-lg">£{order.totalPrice?.toFixed(2)}</p>
                            <span className={`text-xs font-bold px-2 py-0.5 rounded uppercase ${statusColors[order.status] || 'bg-gray-100 text-gray-600'}`}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                        {/* Items preview */}
                        <div className="flex gap-2 mt-3">
                          {order.items?.slice(0, 4).map((item, i) => (
                            <div key={i} className="w-10 h-10 bg-gray-100 overflow-hidden flex-shrink-0">
                              {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
                            </div>
                          ))}
                          {order.items?.length > 4 && (
                            <div className="w-10 h-10 bg-gray-100 flex items-center justify-center text-xs text-gray-500 font-bold">
                              +{order.items.length - 4}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Profile */}
            {activeTab === 'profile' && (
              <div className="bg-white shadow-sm p-6">
                <h2 className="font-display text-xl font-bold text-[#2C2C2C] mb-6">Profile Information</h2>
                <div className="grid grid-cols-1 gap-4 max-w-lg">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-1">Full Name</label>
                    <p className="border border-gray-200 px-4 py-3 text-sm bg-gray-50 text-[#2C2C2C]">{user.name}</p>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-1">Email</label>
                    <p className="border border-gray-200 px-4 py-3 text-sm bg-gray-50 text-[#2C2C2C]">{user.email}</p>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-1">Phone</label>
                    <p className="border border-gray-200 px-4 py-3 text-sm bg-gray-50 text-gray-400">{user.phone || 'Not set'}</p>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-1">Member Since</label>
                    <p className="border border-gray-200 px-4 py-3 text-sm bg-gray-50 text-gray-400">
                      {new Date(user.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">Profile editing coming soon.</p>
                </div>
              </div>
            )}

            {/* Addresses */}
            {activeTab === 'addresses' && (
              <div className="bg-white shadow-sm p-6">
                <h2 className="font-display text-xl font-bold text-[#2C2C2C] mb-6">Saved Addresses</h2>
                {user.addresses?.length === 0 || !user.addresses ? (
                  <div className="text-center py-12">
                    <FiMapPin className="mx-auto text-gray-300 mb-3" size={48} />
                    <p className="text-gray-500">No saved addresses yet.</p>
                    <p className="text-xs text-gray-400 mt-1">Addresses will be saved after your first order.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {user.addresses.map((addr, i) => (
                      <div key={i} className="border border-gray-200 p-4">
                        <p className="font-bold text-sm text-[#2C2C2C] mb-1">{addr.label}</p>
                        <p className="text-sm text-gray-500">{addr.street}</p>
                        <p className="text-sm text-gray-500">{addr.city}, {addr.state} {addr.zip}</p>
                        <p className="text-sm text-gray-500">{addr.country}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
