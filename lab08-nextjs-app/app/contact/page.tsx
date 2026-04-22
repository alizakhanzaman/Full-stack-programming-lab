export default function Contact() {
  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-4xl font-bold text-red-700 mb-2">Reserve a Table</h1>
      <p className="text-gray-500 mb-6">Fill in the form and we'll confirm your booking shortly.</p>
      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input type="text" placeholder="Aliza Zaman"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input type="email" placeholder="aliza@email.com"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
          <input type="number" placeholder="2" min="1" max="20"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
          <input type="date"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400" />
        </div>
        <button className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 w-full font-semibold transition">
          Confirm Reservation
        </button>
      </div>
    </div>
  );
}