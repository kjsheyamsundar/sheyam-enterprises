import { Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Clock,
  ChevronRight,
} from 'lucide-react';

/* Inline LinkedIn glyph — lucide-react in this project doesn't ship a
   Linkedin export, so we render the official mark as a small SVG. */
function LinkedInIcon({ size = 12, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95v5.67H9.35V9h3.41v1.56h.05c.47-.89 1.63-1.83 3.36-1.83 3.59 0 4.26 2.36 4.26 5.43v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

import { contactInfo } from '../../data/contact';
import { WhatsAppIcon } from '../ui/WhatsAppIcon';
import { cn } from '../../utils/cn';

/* ──────────────────────────────────────────────────────────────────
   Helpers
   ────────────────────────────────────────────────────────────────── */
function parseMdLink(value) {
  if (!value) return { text: '', href: '' };
  const m = value.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
  return m ? { text: m[1], href: m[2] } : { text: value, href: value };
}

/* ──────────────────────────────────────────────────────────────────
   Column data
   ────────────────────────────────────────────────────────────────── */
const QUICK_LINKS = [
  { to: '/',           label: 'Home'       },
  { to: '/products',   label: 'Products'   },
  { to: '/services',   label: 'Services'   },
  { to: '/industries', label: 'Industries' },
  { to: '/projects',   label: 'Projects'   },
  { to: '/brands',     label: 'Brands'     },
  { to: '/about',      label: 'About'      },
  { to: '/contact',    label: 'Contact'    },
];

/* Hashes must match real `id` values in data/products.js so the
   /products page can scroll to the matching card on arrival. */
const PRODUCT_LINKS = [
  { to: '/products#screw-compressor',         label: 'Screw Air Compressors'     },
  { to: '/products#reciprocating-compressor', label: 'Reciprocating Compressors' },
  { to: '/products#diesel-generator',         label: 'Diesel Generators'         },
  { to: '/products#10',                       label: 'Spare Parts'               },
  { to: '/products#11',                       label: 'Lubricants & Oils'         },
];

/* ──────────────────────────────────────────────────────────────────
   Sub-components
   ────────────────────────────────────────────────────────────────── */
function ColumnTitle({ children, className }) {
  return (
    <h3
      className={cn(
        'relative pb-3 font-display text-[13px] font-bold uppercase tracking-[0.25em] text-white',
        'after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-8 after:bg-red after:content-[""]',
        className
      )}
    >
      {children}
    </h3>
  );
}

function FooterLink({ to, children, external = false }) {
  const Component = external ? 'a' : Link;
  const props = external
    ? { href: to, target: '_blank', rel: 'noopener noreferrer' }
    : { to };

  return (
    <Component
      {...props}
      className={cn(
        'group inline-flex items-center gap-1.5',
        'font-body text-[13px] text-white/65',
        'transition-all duration-200 ease-out',
        'hover:translate-x-1 hover:text-white'
      )}
    >
      <ChevronRight
        size={14}
        strokeWidth={2.5}
        className="text-white/30 transition-colors duration-200 group-hover:text-red"
        aria-hidden="true"
      />
      <span>{children}</span>
    </Component>
  );
}

function SocialIconButton({ href, label, icon: Icon, external = true }) {
  return (
    <a
      href={href}
      aria-label={label}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={cn(
        'grid h-10 w-10 place-items-center',
        'border border-white/15 bg-white/5 text-white/80',
        'transition-all duration-200 ease-out',
        'hover:-translate-y-0.5 hover:border-red hover:bg-red hover:text-white',
        'rounded-none'
      )}
    >
      <Icon size={16} strokeWidth={2.25} aria-hidden="true" />
    </a>
  );
}

/* ──────────────────────────────────────────────────────────────────
   Columns
   ────────────────────────────────────────────────────────────────── */
function AboutColumn() {
  const email      = parseMdLink(contactInfo.email);
  const whatsApp   = `https://wa.me/${contactInfo.whatsapp}`;
  const firstPhone = `tel:+91${contactInfo.phones[0]}`;

  return (
    <div className="md:col-span-2 lg:col-span-1">
      {/* Logo — full company mark on the dark footer */}
      <Link to="/" className="inline-flex items-center" aria-label="Sheyam Enterprises — Home">
        <img
          src="/logo.png"
          alt="Sheyam Enterprises"
          className="h-24 w-auto"
        />
      </Link>

      {/* Tagline */}
      <p className="mt-5 font-display text-sm font-bold uppercase tracking-[0.1em] text-red">
        {contactInfo.tagline}
      </p>

      {/* Description */}
      <p className="mt-3 max-w-md font-body text-[13px] leading-relaxed text-white/65">
        Sales, service, spares, hiring and AMC for industrial air compressors and
        diesel generators across Vellore and Tamil Nadu — backed by 16+ trusted
        brands and a 24×7 service team.
      </p>

      {/* Social row */}
      <div className="mt-6 flex items-center gap-3">
        <SocialIconButton href={whatsApp}    label="Chat on WhatsApp" icon={WhatsAppIcon} />
        <SocialIconButton href={email.href}  label="Send email"       icon={Mail} />
        <SocialIconButton href={firstPhone}  label="Call us"          icon={Phone} external={false} />
        <SocialIconButton
          href="https://www.linkedin.com/in/prabhu-g-326904176/"
          label="LinkedIn"
          icon={LinkedInIcon}
        />
      </div>
    </div>
  );
}

function QuickLinksColumn() {
  return (
    <div>
      <ColumnTitle>Quick Links</ColumnTitle>
      <ul className="mt-5 flex flex-col gap-3">
        {QUICK_LINKS.map((link) => (
          <li key={link.to}>
            <FooterLink to={link.to}>{link.label}</FooterLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProductsColumn() {
  return (
    <div>
      <ColumnTitle>Products</ColumnTitle>
      <ul className="mt-5 flex flex-col gap-3">
        {PRODUCT_LINKS.map((link) => (
          <li key={link.to}>
            <FooterLink to={link.to}>{link.label}</FooterLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ContactColumn() {
  const email   = parseMdLink(contactInfo.email);
  const website = parseMdLink(contactInfo.website);

  return (
    <div className="md:col-span-2 lg:col-span-1">
      <ColumnTitle>Contact Us</ColumnTitle>

      <ul className="mt-5 flex flex-col gap-4 font-body text-[13px] text-white/65">
        {/* Address */}
        <li className="flex gap-3">
          <MapPin size={16} strokeWidth={2.25} className="mt-0.5 shrink-0 text-red" aria-hidden="true" />
          <address className="not-italic leading-relaxed">
            {contactInfo.address.street},<br />
            {contactInfo.address.area},<br />
            {contactInfo.address.city} – {contactInfo.address.pincode},<br />
            {contactInfo.address.state}.
          </address>
        </li>

        {/* Phones */}
        <li className="flex gap-3">
          <Phone size={16} strokeWidth={2.25} className="mt-0.5 shrink-0 text-red" aria-hidden="true" />
          <ul className="flex flex-col gap-1">
            {contactInfo.phones.map((num) => (
              <li key={num}>
                <a
                  href={`tel:+91${num}`}
                  className="tracking-wide transition-colors hover:text-white"
                >
                  +91 {num}
                </a>
              </li>
            ))}
          </ul>
        </li>

        {/* Email — iterate contactInfo.emails so the array stays the
            source of truth; fall back to the legacy single field. */}
        <li className="flex gap-3">
          <Mail size={16} strokeWidth={2.25} className="mt-0.5 shrink-0 text-red" aria-hidden="true" />
          <ul className="flex flex-col gap-1">
            {(contactInfo.emails ?? [email.text]).map((addr) => (
              <li key={addr}>
                <a
                  href={`mailto:${addr}`}
                  className="break-all transition-colors hover:text-white"
                >
                  {addr}
                </a>
              </li>
            ))}
          </ul>
        </li>

        {/* Website */}
        <li className="flex gap-3">
          <Globe size={16} strokeWidth={2.25} className="mt-0.5 shrink-0 text-red" aria-hidden="true" />
          <a
            href={website.href}
            target="_blank"
            rel="noopener noreferrer"
            className="break-all transition-colors hover:text-white"
          >
            {website.text}
          </a>
        </li>

        {/* Hours */}
        <li className="flex gap-3">
          <Clock size={16} strokeWidth={2.25} className="mt-0.5 shrink-0 text-red" aria-hidden="true" />
          <div className="leading-relaxed">
            <div>{contactInfo.hours.weekdays}</div>
            <div className="text-white/50">Sunday: {contactInfo.hours.sunday}</div>
          </div>
        </li>
      </ul>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   FOOTER — root
   ────────────────────────────────────────────────────────────────── */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white">
      {/* Top red accent line */}
      <div className="h-1 w-full bg-red" aria-hidden="true" />

      {/* Main grid */}
      <div className="mx-auto max-w-7xl px-6 py-14 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-x-10 md:gap-y-12 lg:grid-cols-4 lg:gap-12">
          <AboutColumn />
          <QuickLinksColumn />
          <ProductsColumn />
          <ContactColumn />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.08]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-5 text-[12px] text-white/30 md:flex-row">
          <p className="font-body">
            © {year} Sheyam Enterprises. All rights reserved.
          </p>
          <p className="font-body">
            Designed &amp; Developed by{' '}
            <a
              href="https://www.sheyamportfolio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white/55 transition-colors hover:text-red"
            >
              Sheyam
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
