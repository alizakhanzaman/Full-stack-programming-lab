'use client';
import { useState } from 'react';
import Link from 'next/link';
import BrandBanner from '../components/BrandBanner';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const update = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Your message has been sent! We will get back to you shortly.');
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-4">
      <nav aria-label="Breadcrumb" className="text-xs text-gray-500 mb-4">
        <ol className="flex items-center gap-1">
          <li><Link href="/" className="text-red-600 hover:underline">Home</Link></li>
          <li>›</li>
          <li>Contact Us</li>
        </ol>
      </nav>

      <h1 className="text-2xl font-bold text-gray-800 mb-6">Contact Us</h1>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Contact form */}
        <section className="md:col-span-2 bg-white border border-gray-200 p-6" aria-labelledby="contact-form-heading">
          <h2 id="contact-form-heading" className="text-sm font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">
            Send Us a Message
          </h2>
          <form onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label htmlFor="contact-name" className="text-xs text-gray-700 block mb-1">Name <span className="text-red-600">*</span></label>
                <input id="contact-name" type="text" required value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  className="w-full border border-gray-300 px-3 py-2 text-xs focus:outline-none focus:border-red-500" />
              </div>
              <div>
                <label htmlFor="contact-email" className="text-xs text-gray-700 block mb-1">Email <span className="text-red-600">*</span></label>
                <input id="contact-email" type="email" required value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  className="w-full border border-gray-300 px-3 py-2 text-xs focus:outline-none focus:border-red-500" />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="contact-phone" className="text-xs text-gray-700 block mb-1">Phone</label>
              <input id="contact-phone" type="tel" value={form.phone}
                onChange={(e) => update('phone', e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 text-xs focus:outline-none focus:border-red-500" />
            </div>
            <div className="mb-3">
              <label htmlFor="contact-subject" className="text-xs text-gray-700 block mb-1">Subject <span className="text-red-600">*</span></label>
              <input id="contact-subject" type="text" required value={form.subject}
                onChange={(e) => update('subject', e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 text-xs focus:outline-none focus:border-red-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="contact-message" className="text-xs text-gray-700 block mb-1">Message <span className="text-red-600">*</span></label>
              <textarea id="contact-message" required rows={5} value={form.message}
                onChange={(e) => update('message', e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 text-xs focus:outline-none focus:border-red-500 resize-none" />
            </div>
            <button type="submit" className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 uppercase text-xs tracking-wide transition-colors">
              SUBMIT
            </button>
          </form>
        </section>

        {/* Contact info */}
        <aside className="bg-white border border-gray-200 p-6 h-fit" aria-label="Contact information">
          <h2 className="text-sm font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">Get In Touch</h2>
          <address className="not-italic text-xs text-gray-600 space-y-3 leading-relaxed">
            <div>
              <p className="font-semibold text-gray-700">📍 Address</p>
              <p>123 Spa Boulevard<br />Los Angeles, CA 90001<br />United States</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">📞 Phone</p>
              <p>CALL 24/7: <a href="tel:8882018899" className="text-red-600 hover:underline">888-201-8899</a></p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">✉️ Email</p>
              <p><a href="mailto:servicemail@yoursitename.com" className="text-red-600 hover:underline">servicemail@yoursitename.com</a></p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">🕐 Hours</p>
              <p>Mon–Fri: 9am–6pm PST<br />Sat: 10am–4pm PST<br />Sun: Closed</p>
            </div>
          </address>
        </aside>
      </div>

      <div className="mb-4">
        <BrandBanner />
      </div>
    </div>
  );
}
