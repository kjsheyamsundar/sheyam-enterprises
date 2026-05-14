import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-off">
      {/* Skip to content — invisible until keyboard-focused. */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-red focus:px-4 focus:py-2 focus:font-display focus:text-[12px] focus:font-bold focus:uppercase focus:tracking-[0.22em] focus:text-white focus:shadow-[0_8px_22px_-8px_rgba(204,17,17,0.6)]"
      >
        Skip to main content
      </a>

      <Navbar />
      <main id="main-content" role="main" className="flex-1" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
}
