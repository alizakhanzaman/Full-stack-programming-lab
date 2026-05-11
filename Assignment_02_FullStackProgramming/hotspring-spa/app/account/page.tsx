import Link from 'next/link';

const orders = [
  { id: '#10045', date: 'Mar 7, 2026', status: 'Delivered', total: '$1,000.00', items: 2 },
  { id: '#10032', date: 'Feb 15, 2026', status: 'Shipped', total: '$500.00', items: 1 },
  { id: '#10018', date: 'Jan 3, 2026', status: 'Delivered', total: '$4,899.00', items: 1 },
];

export default function AccountPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-4">
      <nav aria-label="Breadcrumb" className="text-xs text-gray-500 mb-4">
        <ol className="flex items-center gap-1">
          <li><Link href="/" className="text-red-600 hover:underline">Home</Link></li>
          <li>›</li>
          <li>My Account</li>
        </ol>
      </nav>

      <h1 className="text-xl font-bold text-gray-800 mb-6">My Account</h1>

      <div className="grid md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <aside className="md:col-span-1">
          <nav className="bg-white border border-gray-200" aria-label="Account navigation">
            <h2 className="bg-red-600 text-white text-xs font-bold px-4 py-2 uppercase tracking-wide">Account</h2>
            <ul className="text-xs">
              {[
                { label: 'Dashboard', href: '/account', active: true },
                { label: 'Order History', href: '/account/orders' },
                { label: 'Edit Account', href: '/account/edit' },
                { label: 'Edit Billing Address', href: '/account/billing' },
                { label: 'Edit Shipping Address', href: '/account/shipping' },
                { label: 'My Wishlist', href: '/account/wishlist' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`block px-4 py-2.5 border-b border-gray-100 hover:bg-gray-50 hover:text-red-600 transition-colors ${item.active ? 'text-red-600 font-semibold bg-gray-50' : 'text-gray-600'}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <button className="w-full text-left px-4 py-2.5 text-gray-600 hover:bg-gray-50 hover:text-red-600 transition-colors text-xs">
                  Sign Out
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Content */}
        <div className="md:col-span-3 space-y-6">
          {/* Welcome */}
          <section className="bg-white border border-gray-200 p-5" aria-labelledby="dashboard-heading">
            <h2 id="dashboard-heading" className="text-sm font-bold text-gray-800 mb-3 border-b border-gray-200 pb-2">
              Account Dashboard
            </h2>
            <p className="text-xs text-gray-600">
              Welcome back, <strong>John Doe</strong>! From your account dashboard you can view your recent orders,
              manage your shipping and billing addresses, and edit your password and account details.
            </p>
          </section>

          {/* Recent Orders */}
          <section className="bg-white border border-gray-200 p-5" aria-labelledby="orders-heading">
            <h2 id="orders-heading" className="text-sm font-bold text-gray-800 mb-3 border-b border-gray-200 pb-2">
              Recent Orders
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left px-3 py-2 font-semibold text-gray-700">Order #</th>
                    <th className="text-left px-3 py-2 font-semibold text-gray-700">Date</th>
                    <th className="text-left px-3 py-2 font-semibold text-gray-700">Status</th>
                    <th className="text-right px-3 py-2 font-semibold text-gray-700">Total</th>
                    <th className="text-center px-3 py-2 font-semibold text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-3 py-2.5 text-red-600 font-semibold">{order.id}</td>
                      <td className="px-3 py-2.5 text-gray-600">{order.date}</td>
                      <td className="px-3 py-2.5">
                        <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-700'
                          : order.status === 'Shipped' ? 'bg-blue-100 text-blue-700'
                          : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-right font-semibold">{order.total}</td>
                      <td className="px-3 py-2.5 text-center">
                        <Link href={`/account/orders/${order.id}`} className="text-red-600 hover:underline">
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Account Info */}
          <section className="bg-white border border-gray-200 p-5" aria-labelledby="info-heading">
            <h2 id="info-heading" className="text-sm font-bold text-gray-800 mb-3 border-b border-gray-200 pb-2">
              Contact Information
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-xs text-gray-600">
              <div>
                <p className="font-semibold text-gray-700 mb-1">Personal Info</p>
                <p>John Doe</p>
                <p>john.doe@example.com</p>
                <Link href="/account/edit" className="text-red-600 hover:underline mt-1 block">Edit</Link>
              </div>
              <div>
                <p className="font-semibold text-gray-700 mb-1">Default Shipping Address</p>
                <p>123 Main Street</p>
                <p>Los Angeles, CA 90001</p>
                <p>United States</p>
                <Link href="/account/shipping" className="text-red-600 hover:underline mt-1 block">Edit</Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
