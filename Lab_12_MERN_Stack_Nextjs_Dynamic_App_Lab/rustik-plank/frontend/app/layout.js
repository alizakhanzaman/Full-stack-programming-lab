import './globals.css';
import { AuthProvider } from '@/lib/AuthContext';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/ui/CartDrawer';

export const metadata = {
  title: 'Rustik Plank — Handcrafted Furniture',
  description: 'Premium reclaimed and handcrafted wooden furniture. Tables, chairs, beds, bookcases and more.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      </head>
      <body>
        <AuthProvider>
          <Navbar />
          <CartDrawer />
          <main>{children}</main>
          <Footer />
          <Toaster
            position="top-right"
            toastOptions={{
              style: { fontFamily: 'Lato, sans-serif', fontSize: '14px' },
              success: { iconTheme: { primary: '#F07B1D', secondary: '#fff' } },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
