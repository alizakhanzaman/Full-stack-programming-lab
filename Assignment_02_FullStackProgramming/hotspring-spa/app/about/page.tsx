import Link from 'next/link';
import BrandBanner from '../components/BrandBanner';

const teamMembers = [
  { name: 'Jennifer Lawrence', role: 'Business Consultant' },
  { name: 'Michael Thompson', role: 'Business Consultant' },
  { name: 'Sarah Martinez', role: 'Business Consultant' },
  { name: 'David Chen', role: 'Business Consultant' },
];

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-4">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-xs text-gray-500 mb-4">
        <ol className="flex items-center gap-1">
          <li><Link href="/" className="text-red-600 hover:underline">Home</Link></li>
          <li>›</li>
          <li>About Us</li>
        </ol>
      </nav>

      <h1 className="text-2xl font-bold text-gray-800 mb-6">About Us</h1>

      <div className="bg-white border border-gray-200 p-6 mb-8">
        {/* Welcome section */}
        <section aria-labelledby="welcome-heading" className="mb-8">
          <h2 id="welcome-heading" className="text-base font-bold text-gray-800 mb-4">
            Welcome to the Company
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-3 text-xs text-gray-600 leading-relaxed">
              <p>
                HotSpring Portable Spas has been the leading provider of premium portable spa solutions
                since 1978. Our commitment to quality, innovation, and customer satisfaction has made us
                the world&apos;s best-selling brand of portable spas. We design each spa with one goal in
                mind — to bring the healing power of hot water therapy to people everywhere.
              </p>
              <p>
                Our extensive range covers everything from compact 2-person models to expansive 8-person
                party spas, all built to the highest manufacturing standards. Every HotSpring spa features
                our exclusive SilentFlo 5000® circulation system, the legendary Freshwater® Salt System,
                and patented No-Fault® heaters — innovations that set us apart from every competitor.
              </p>
            </div>
            <div className="bg-gray-100 aspect-square flex items-center justify-center rounded text-6xl">
              🏢
            </div>
          </div>
        </section>

        {/* Team section */}
        <section aria-labelledby="team-heading">
          <h2 id="team-heading" className="text-base font-bold text-gray-800 mb-3">
            Our Company Members
          </h2>
          <p className="text-xs text-gray-600 mb-5 leading-relaxed">
            Our dedicated team of spa professionals brings decades of combined experience in spa design,
            hydrotherapy, and customer service. We are passionate about helping every customer find
            their perfect spa solution.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <article key={member.name} className="text-center">
                <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded mb-3 flex items-center justify-center text-5xl">
                  👤
                </div>
                <h3 className="text-xs font-bold text-gray-800">{member.name}</h3>
                <p className="text-xs text-gray-500">{member.role}</p>
                <p className="text-xs text-gray-400 mt-1 leading-tight">
                  Dedicated spa specialist with over 10 years of experience.
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>

      <div className="mb-4">
        <BrandBanner />
      </div>
    </div>
  );
}
