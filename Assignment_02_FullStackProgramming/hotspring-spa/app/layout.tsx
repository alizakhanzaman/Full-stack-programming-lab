import type { Metadata } from 'next';
import './globals.css';
import TopBar from './components/TopBar';
import Header from './components/Header';
import Footer from './components/Footer';

export const metadata: Metadata = {
  title: 'HotSpring Portable Spas – Premium Hot Tubs & Spas',
  description: 'Shop the best portable spas and hot tubs at HotSpring.',
  keywords: 'hot tubs, portable spas, hot spring, jacuzzi, outdoor spa',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-50">
        <TopBar />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
