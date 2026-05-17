'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FiMapPin, FiPhone, FiMail, FiClock, FiSend } from 'react-icons/fi';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1200)); // simulate send
    toast.success('Message sent! We\'ll get back to you within 24 hours.');
    setForm({ name: '', email: '', subject: '', message: '' });
    setSending(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0]">
      {/* Header */}
      <div className="bg-[#2C2C2C] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="font-display text-4xl font-bold mb-2">Contact Us</h1>
          <p className="text-gray-400">We'd love to hear from you</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Info */}
        <div className="space-y-6">
          <div className="bg-white p-6 shadow-sm">
            <h3 className="font-display font-bold text-[#2C2C2C] text-lg mb-5 border-b pb-3">Get in Touch</h3>
            <div className="space-y-4">
              {[
                { icon: FiMapPin, title: 'Address', lines: ['42 Reclaimed Road', 'Shoreditch, London', 'EC1A 1BB, UK'] },
                { icon: FiPhone, title: 'Phone', lines: ['+44 207 123 4567', '+44 207 123 4568'] },
                { icon: FiMail, title: 'Email', lines: ['hello@rustikplank.com', 'sales@rustikplank.com'] },
                { icon: FiClock, title: 'Opening Hours', lines: ['Mon–Fri: 9am – 6pm', 'Sat: 10am – 4pm', 'Sun: Closed'] },
              ].map(({ icon: Icon, title, lines }) => (
                <div key={title} className="flex gap-3">
                  <div className="w-9 h-9 bg-[#FFF4EC] flex items-center justify-center flex-shrink-0">
                    <Icon className="text-[#F07B1D]" size={16} />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-[#2C2C2C]">{title}</p>
                    {lines.map((l, i) => <p key={i} className="text-sm text-gray-500">{l}</p>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-2 bg-white p-8 shadow-sm">
          <h3 className="font-display font-bold text-[#2C2C2C] text-2xl mb-6">Send a Message</h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-1">Full Name *</label>
                <input
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-[#F07B1D] transition-colors"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-1">Email *</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-[#F07B1D] transition-colors"
                  required
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-1">Subject *</label>
              <select
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-[#F07B1D] transition-colors text-gray-600"
                required
              >
                <option value="">Select a subject</option>
                <option>Product Enquiry</option>
                <option>Custom Order</option>
                <option>Order Status</option>
                <option>Delivery</option>
                <option>Returns & Refunds</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-1">Message *</label>
              <textarea
                placeholder="How can we help you?"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={6}
                className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-[#F07B1D] transition-colors resize-none"
                required
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="bg-[#F07B1D] hover:bg-[#D4620A] disabled:bg-gray-300 text-white px-8 py-3 font-bold uppercase tracking-wider text-sm transition-colors flex items-center gap-2"
            >
              <FiSend size={15} />
              {sending ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
