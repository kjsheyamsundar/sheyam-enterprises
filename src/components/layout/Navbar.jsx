import { useEffect, useState } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, Menu, X } from 'lucide-react';

import { contactInfo } from '../../data/contact';
import { WhatsAppIcon } from '../ui/WhatsAppIcon';
import { cn } from '../../utils/cn';

/* ──────────────────────────────────────────────────────────────────
   Nav link config — order matches the design
   ────────────────────────────────────────────────────────────────── */
const NAV_LINKS = [
  { to: '/',           label: 'Home',       end: true  },
  { to: '/products',   label: 'Products'    },
  { to: '/services',   label: 'Services'    },
  { to: '/industries', label: 'Industries'  },
  { to: '/projects',   label: 'Projects'    },
  { to: '/brands',     label: 'Brands'      },
  { to: '/about',      label: 'About'       },
  { to: '/contact',    label: 'Contact'     },
];

/**
 * Pulls "[text](href)" out of the markdown-style strings in data/contact.js.
 * Returns { text, href }; falls back to the raw value for both if no match.
 */
function parseMdLink(value) {
  if (!value) return { text: '', href: '' };
  const m = value.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
  return m ? { text: m[1], href: m[2] } : { text: value, href: value };
}

/* ──────────────────────────────────────────────────────────────────
   TOP BAR — navy strip with phones / email / whatsapp
   ────────────────────────────────────────────────────────────────── */
function TopBar() {
  const email    = parseMdLink(contactInfo.email);
  const whatsApp = `https://wa.me/${contactInfo.whatsapp}`;

  return (
    <div className="hidden bg-navy text-white/70 md:block">
      <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-6 text-[12px]">
        {/* Phones */}
        <ul className="flex items-center gap-5">
          {contactInfo.phones.map((num, i) => (
            <li key={num} className="flex items-center">
              {i === 0 && <Phone size={12} strokeWidth={2.25} className="mr-1.5 text-white/60" aria-hidden="true" />}
              <a
                href={`tel:+91${num}`}
                className="font-body tracking-wide transition-colors hover:text-white"
              >
                {num}
              </a>
              {i < contactInfo.phones.length - 1 && (
                <span className="ml-5 text-white/30" aria-hidden="true">|</span>
              )}
            </li>
          ))}
        </ul>

        {/* Email + WhatsApp */}
        <div className="flex items-center gap-5">
          <a
            href={email.href}
            className="flex items-center gap-1.5 font-body tracking-wide transition-colors hover:text-white"
          >
            <Mail size={12} strokeWidth={2.25} className="text-white/60" aria-hidden="true" />
            {email.text}
          </a>
          <span className="text-white/30" aria-hidden="true">|</span>
          <a
            href={whatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-body tracking-wide transition-colors hover:text-white"
          >
            <WhatsAppIcon size={12} className="text-white/60" />
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   LOGO — "SE" tile + name + tagline
   ────────────────────────────────────────────────────────────────── */
function Logo({ onClick }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      className="flex items-center gap-3"
      aria-label="Sheyam Enterprises — Home"
    >
      <img
        src="/logo.png"
        alt="Sheyam Enterprises"
        className="h-20 w-auto"
      />
    </Link>
  );
}

/* ──────────────────────────────────────────────────────────────────
   DESKTOP NAV LINK — animated underline via layoutId
   ────────────────────────────────────────────────────────────────── */
function DesktopNavLink({ to, label, end }) {
  return (
    <NavLink to={to} end={end} className="relative">
      {({ isActive }) => (
        <span
          className={cn(
            'relative inline-flex h-[88px] items-center px-1',
            'font-display text-[13px] font-semibold uppercase tracking-[0.04em]',
            'transition-colors duration-200',
            isActive ? 'text-red' : 'text-ink hover:text-navy'
          )}
        >
          {label}
          {isActive && (
            <motion.span
              layoutId="navbar-underline"
              className="absolute inset-x-0 -bottom-[1px] h-0.5 bg-red"
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              aria-hidden="true"
            />
          )}
        </span>
      )}
    </NavLink>
  );
}

/* ──────────────────────────────────────────────────────────────────
   GET QUOTE CTA — sharp red button
   ────────────────────────────────────────────────────────────────── */
function QuoteCTA({ onClick, className }) {
  return (
    <Link
      to="/contact"
      onClick={onClick}
      className={cn(
        'group inline-flex h-10 items-center justify-center gap-2 bg-red px-5',
        'font-display text-[12px] font-bold uppercase tracking-[0.2em] text-white',
        'shadow-[0_2px_0_rgb(0_0_0/0.06)]',
        'transition-all duration-200 ease-out',
        'hover:scale-[1.03] hover:bg-red2 hover:shadow-[0_10px_24px_-6px_rgba(204,17,17,0.55)]',
        'rounded-none',
        className
      )}
    >
      Get Quote
      <span className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true">→</span>
    </Link>
  );
}

/* ──────────────────────────────────────────────────────────────────
   MOBILE DRAWER — slide-down full-screen menu
   ────────────────────────────────────────────────────────────────── */
function MobileMenu({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="mobile-menu"
          className="fixed inset-x-0 top-[88px] z-40 origin-top bg-white shadow-[0_20px_30px_-15px_rgba(9,9,15,0.25)] lg:hidden"
          initial={{ opacity: 0, y: -16, scaleY: 0.96 }}
          animate={{ opacity: 1, y: 0,   scaleY: 1 }}
          exit={{    opacity: 0, y: -16, scaleY: 0.96 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          <ul className="flex flex-col divide-y divide-off">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  onClick={onClose}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center justify-between px-6 py-4',
                      'font-display text-[14px] font-bold uppercase tracking-[0.15em]',
                      'transition-colors',
                      isActive ? 'text-red' : 'text-ink hover:text-navy'
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>{link.label}</span>
                      {isActive && <span className="h-0.5 w-6 bg-red" aria-hidden="true" />}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="border-t border-off p-6">
            <QuoteCTA onClick={onClose} className="w-full" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ──────────────────────────────────────────────────────────────────
   WHATSAPP FLOAT — fixed bottom-right, pulsing
   ────────────────────────────────────────────────────────────────── */
function WhatsAppFloat() {
  const href = `https://wa.me/${contactInfo.whatsapp}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-7 right-7 z-50"
      aria-label="Chat on WhatsApp"
    >
      {/* Pulse ring */}
      <span
        className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366] opacity-60"
        style={{ animationDuration: '2s' }}
        aria-hidden="true"
      />
      {/* Button */}
      <span className="grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_25px_-8px_rgba(37,211,102,0.7)] transition-transform duration-200 group-hover:scale-105">
        <WhatsAppIcon size={28} className="text-white" />
      </span>
      {/* Tooltip */}
      <span className="pointer-events-none absolute right-[72px] top-1/2 -translate-y-1/2 whitespace-nowrap bg-ink px-3 py-1.5 font-display text-[11px] font-bold uppercase tracking-[0.18em] text-white opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100">
        Chat on WhatsApp
      </span>
    </a>
  );
}

/* ──────────────────────────────────────────────────────────────────
   NAVBAR — root export
   ────────────────────────────────────────────────────────────────── */
export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Add shadow once user scrolls past 20px
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile drawer whenever the route changes
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  // Lock body scroll while drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <header className="sticky top-0 z-50">
        <TopBar />

        <div
          className={cn(
            'border-b-[3px] border-red bg-white transition-shadow duration-200',
            scrolled ? 'shadow-md' : 'shadow-none'
          )}
        >
          <div className="mx-auto flex h-[88px] max-w-7xl items-center justify-between px-6">
            <Logo />

            {/* Desktop nav */}
            <nav className="hidden lg:block" aria-label="Main">
              <ul className="flex items-center gap-7">
                {NAV_LINKS.map((link) => (
                  <li key={link.to}>
                    <DesktopNavLink {...link} />
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-3">
              {/* Wrap so the parent's `hidden sm:flex` controls visibility —
                  if we put `hidden sm:inline-flex` directly on QuoteCTA it
                  conflicts with QuoteCTA's own `inline-flex` base class and
                  the button stays visible at every breakpoint. */}
              <span className="hidden sm:inline-flex">
                <QuoteCTA />
              </span>

              {/* Mobile hamburger */}
              <button
                type="button"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
                className="grid h-10 w-10 place-items-center text-ink transition-colors hover:text-red lg:hidden"
              >
                {mobileOpen ? <X size={22} strokeWidth={2.25} /> : <Menu size={22} strokeWidth={2.25} />}
              </button>
            </div>
          </div>
        </div>

        <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
      </header>

      <WhatsAppFloat />
    </>
  );
}
