'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';
import { getProducts, deleteProduct, getCategories, createCategory } from '@/lib/api';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiPackage, FiGrid, FiUsers, FiShoppingBag, FiPlus, FiTrash2, FiEdit, FiBarChart2 } from 'react-icons/fi';

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState('products');
  const [loadingData, setLoadingData] = useState(true);
  const [newCat, setNewCat] = useState('');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '', price: '', originalPrice: '', stock: '', description: '',
    shortDescription: '', material: '', color: '', mainImage: '',
    category: '', isFeatured: false, isSpecial: false, isPopular: false,
  });

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      router.push('/');
    }
  }, [user, loading]);

  useEffect(() => {
    if (user?.role !== 'admin') return;
    Promise.all([
      getProducts({ limit: 50 }),
      getCategories(),
    ]).then(([p, c]) => {
      setProducts(p.data.data || []);
      setCategories(c.data.data || []);
    }).finally(() => setLoadingData(false));
  }, [user]);

  const handleDeleteProduct = async (id, name) => {
    if (!confirm(`Delete "${name}"?`)) return;
    try {
      await deleteProduct(id);
      setProducts(products.filter((p) => p._id !== id));
      toast.success('Product deleted');
    } catch {
      toast.error('Failed to delete');
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const res = await createCategory({ name: newCat, slug: newCat.toLowerCase().replace(/\s+/g, '-') });
      setCategories([...categories, res.data.data]);
      setNewCat('');
      toast.success('Category added!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed');
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const token = localStorage.getItem('rustik_token');
      const res = await axios.post(`${API_URL}/products`, newProduct, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts([res.data.data, ...products]);
      setShowAddProduct(false);
      setNewProduct({ name:'',price:'',originalPrice:'',stock:'',description:'',shortDescription:'',material:'',color:'',mainImage:'',category:'',isFeatured:false,isSpecial:false,isPopular:false });
      toast.success('Product added!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add product');
    }
  };

  if (loading || !user) return null;
  if (user.role !== 'admin') return null;

  const tabs = [
    { id: 'products', label: 'Products', icon: FiPackage, count: products.length },
    { id: 'categories', label: 'Categories', icon: FiGrid, count: categories.length },
  ];

  return (
    <div className="min-h-screen bg-[#FAF6F0]">
      {/* Header */}
      <div className="bg-[#2C2C2C] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-400 text-sm mt-1">Manage your store</p>
          </div>
          <Link href="/" className="text-gray-400 hover:text-white text-sm transition-colors">← Back to Store</Link>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Products', value: products.length, icon: FiPackage, color: 'text-blue-600' },
            { label: 'Categories', value: categories.length, icon: FiGrid, color: 'text-purple-600' },
            { label: 'In Stock', value: products.filter(p => p.stock > 0).length, icon: FiShoppingBag, color: 'text-green-600' },
            { label: 'Out of Stock', value: products.filter(p => p.stock === 0).length, icon: FiBarChart2, color: 'text-red-600' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white p-5 shadow-sm flex items-center gap-4">
              <div className={`${stat.color} bg-gray-50 p-3 rounded-lg`}>
                <stat.icon size={22} />
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-[#2C2C2C]">{stat.value}</p>
                <p className="text-xs text-gray-400">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-0 border-b border-gray-200 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-wide transition-colors ${activeTab === tab.id ? 'border-b-2 border-[#F07B1D] text-[#F07B1D]' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <tab.icon size={15} /> {tab.label}
              <span className={`text-xs px-1.5 py-0.5 rounded font-normal ${activeTab === tab.id ? 'bg-[#FFF4EC] text-[#F07B1D]' : 'bg-gray-100 text-gray-400'}`}>{tab.count}</span>
            </button>
          ))}
        </div>

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="bg-white shadow-sm">
            <div className="flex items-center justify-between p-5 border-b">
              <h2 className="font-display font-bold text-lg text-[#2C2C2C]">All Products</h2>
              <button onClick={() => setShowAddProduct(!showAddProduct)} className="flex items-center gap-2 bg-[#F07B1D] hover:bg-[#D4620A] text-white px-4 py-2 text-sm font-bold uppercase tracking-wide transition-colors">
                <FiPlus size={14} /> Add Product
              </button>
            </div>

            {/* Add Product Form */}
            {showAddProduct && (
              <form onSubmit={handleAddProduct} className="p-6 border-b bg-[#FFF9F5] grid grid-cols-1 md:grid-cols-2 gap-4">
                <h3 className="md:col-span-2 font-bold text-[#2C2C2C]">New Product</h3>
                <input required placeholder="Product Name" value={newProduct.name} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} className="border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-[#F07B1D]" />
                <select required value={newProduct.category} onChange={(e) => setNewProduct({...newProduct, category: e.target.value})} className="border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-[#F07B1D] text-gray-600">
                  <option value="">Select Category</option>
                  {categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
                </select>
                <input required type="number" step="0.01" placeholder="Price (£)" value={newProduct.price} onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} className="border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-[#F07B1D]" />
                <input type="number" step="0.01" placeholder="Original Price (optional)" value={newProduct.originalPrice} onChange={(e) => setNewProduct({...newProduct, originalPrice: e.target.value})} className="border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-[#F07B1D]" />
                <input required type="number" placeholder="Stock" value={newProduct.stock} onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})} className="border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-[#F07B1D]" />
                <input placeholder="Material" value={newProduct.material} onChange={(e) => setNewProduct({...newProduct, material: e.target.value})} className="border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-[#F07B1D]" />
                <input placeholder="Image URL" value={newProduct.mainImage} onChange={(e) => setNewProduct({...newProduct, mainImage: e.target.value})} className="border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-[#F07B1D] md:col-span-2" />
                <input placeholder="Short Description" value={newProduct.shortDescription} onChange={(e) => setNewProduct({...newProduct, shortDescription: e.target.value})} className="border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-[#F07B1D] md:col-span-2" />
                <textarea required placeholder="Full Description" value={newProduct.description} onChange={(e) => setNewProduct({...newProduct, description: e.target.value})} rows={3} className="border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-[#F07B1D] md:col-span-2" />
                <div className="flex gap-4 md:col-span-2">
                  {['isFeatured','isSpecial','isPopular'].map((flag) => (
                    <label key={flag} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input type="checkbox" checked={newProduct[flag]} onChange={(e) => setNewProduct({...newProduct, [flag]: e.target.checked})} className="accent-[#F07B1D]" />
                      {flag.replace('is', '')}
                    </label>
                  ))}
                </div>
                <div className="md:col-span-2 flex gap-3">
                  <button type="submit" className="bg-[#F07B1D] hover:bg-[#D4620A] text-white px-6 py-2 text-sm font-bold uppercase tracking-wide transition-colors">Save Product</button>
                  <button type="button" onClick={() => setShowAddProduct(false)} className="border border-gray-300 text-gray-500 px-6 py-2 text-sm font-bold hover:bg-gray-50 transition-colors">Cancel</button>
                </div>
              </form>
            )}

            {/* Products Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="px-5 py-3 text-xs font-bold text-gray-400 uppercase tracking-wide">Product</th>
                    <th className="px-5 py-3 text-xs font-bold text-gray-400 uppercase tracking-wide">Category</th>
                    <th className="px-5 py-3 text-xs font-bold text-gray-400 uppercase tracking-wide">Price</th>
                    <th className="px-5 py-3 text-xs font-bold text-gray-400 uppercase tracking-wide">Stock</th>
                    <th className="px-5 py-3 text-xs font-bold text-gray-400 uppercase tracking-wide">Tags</th>
                    <th className="px-5 py-3 text-xs font-bold text-gray-400 uppercase tracking-wide">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loadingData ? (
                    Array(5).fill(0).map((_, i) => (
                      <tr key={i}><td colSpan={6} className="px-5 py-3"><div className="h-6 bg-gray-100 animate-pulse rounded" /></td></tr>
                    ))
                  ) : products.map((product) => (
                    <tr key={product._id} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 flex-shrink-0 overflow-hidden">
                            {product.mainImage && <img src={product.mainImage} alt="" className="w-full h-full object-cover" />}
                          </div>
                          <span className="font-medium text-[#2C2C2C]">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-gray-500">{product.category?.name || '—'}</td>
                      <td className="px-5 py-3 font-bold text-[#F07B1D]">£{product.price.toFixed(2)}</td>
                      <td className="px-5 py-3">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex gap-1 flex-wrap">
                          {product.isFeatured && <span className="bg-blue-100 text-blue-600 text-xs px-1.5 py-0.5">Featured</span>}
                          {product.isSpecial && <span className="bg-orange-100 text-orange-600 text-xs px-1.5 py-0.5">Special</span>}
                          {product.isPopular && <span className="bg-purple-100 text-purple-600 text-xs px-1.5 py-0.5">Popular</span>}
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <Link href={`/products/${product.slug || product._id}`} className="text-gray-400 hover:text-[#F07B1D] transition-colors" title="View">
                            <FiEdit size={15} />
                          </Link>
                          <button onClick={() => handleDeleteProduct(product._id, product.name)} className="text-gray-400 hover:text-red-500 transition-colors" title="Delete">
                            <FiTrash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Categories Tab */}
        {activeTab === 'categories' && (
          <div className="bg-white shadow-sm">
            <div className="p-5 border-b">
              <h2 className="font-display font-bold text-lg text-[#2C2C2C] mb-4">Categories</h2>
              <form onSubmit={handleAddCategory} className="flex gap-3 max-w-sm">
                <input
                  value={newCat}
                  onChange={(e) => setNewCat(e.target.value)}
                  placeholder="New category name"
                  className="flex-1 border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-[#F07B1D]"
                  required
                />
                <button type="submit" className="bg-[#F07B1D] hover:bg-[#D4620A] text-white px-4 py-2 text-sm font-bold uppercase transition-colors">
                  Add
                </button>
              </form>
            </div>
            <div className="divide-y">
              {categories.map((cat) => (
                <div key={cat._id} className="flex items-center justify-between px-5 py-4">
                  <div>
                    <p className="font-medium text-[#2C2C2C]">{cat.name}</p>
                    <p className="text-xs text-gray-400">/{cat.slug}</p>
                  </div>
                  <span className="text-xs text-gray-400">{cat.isActive ? 'Active' : 'Inactive'}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
