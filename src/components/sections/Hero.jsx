import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Briefcase,
  Wrench,
  Cog,
  Truck,
  ClipboardList,
  MapPin,
  Clock,
  Globe,
  Map,
} from 'lucide-react';

import { FadeUp } from '../animations/FadeUp';
import { Counter } from '../animations/Counter';
import { contactInfo, stats } from '../../data/contact';
import { cn } from '../../utils/cn';

/* ──────────────────────────────────────────────────────────────────
   Helpers
   ────────────────────────────────────────────────────────────────── */
function parseMdLink(value) {
  if (!value) return { text: '', href: '' };
  const m = value.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
  return m ? { text: m[1], href: m[2] } : { text: value, href: value };
}

/* Dark grid overlay — 40px lines at 0deg + 90deg, 2.5% white */
const gridOverlayStyle = {
  backgroundImage: `
    repeating-linear-gradient(0deg,  rgba(255,255,255,0.025) 0 1px, transparent 1px 40px),
    repeating-linear-gradient(90deg, rgba(255,255,255,0.025) 0 1px, transparent 1px 40px)
  `,
};

/* ──────────────────────────────────────────────────────────────────
   Service pills (right column)
   ────────────────────────────────────────────────────────────────── */
const SERVICE_PILLS = [
  { id: 'sales',   label: 'Sales',   icon: Briefcase     },
  { id: 'service', label: 'Service', icon: Wrench        },
  { id: 'parts',   label: 'Parts',   icon: Cog           },
  { id: 'hiring',  label: 'Hiring',  icon: Truck         },
  { id: 'amc',     label: 'AMC',     icon: ClipboardList },
];

function ServicePill({ icon: Icon, label }) {
  return (
    <div
      className={cn(
        'group flex items-center gap-3 border border-white/10 bg-white/[0.03] px-4 py-3',
        'transition-all duration-200 ease-out',
        'hover:-translate-y-1 hover:border-red hover:bg-white/[0.06]',
        'rounded-none'
      )}
    >
      <span className="grid h-9 w-9 place-items-center bg-white/5 text-red transition-colors duration-200 group-hover:bg-red group-hover:text-white">
        <Icon size={16} strokeWidth={2.25} aria-hidden="true" />
      </span>
      <span className="font-display text-[12px] font-bold uppercase tracking-[0.22em] text-white">
        {label}
      </span>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   Contact card (right column, below pills)
   ────────────────────────────────────────────────────────────────── */
function ContactCard() {
  const website = parseMdLink(contactInfo.website);

  return (
    <div
      className={cn(
        'border border-white/10 bg-white/[0.04] backdrop-blur-sm',
        'p-5 md:p-6',
        'rounded-none'
      )}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Address */}
        <div className="flex items-start gap-3">
          <MapPin size={16} strokeWidth={2.25} className="mt-0.5 shrink-0 text-red" aria-hidden="true" />
          <div>
            <div className="font-display text-[10px] font-bold uppercase tracking-[0.22em] text-white/45">
              Visit Us
            </div>
            <div className="mt-1 font-body text-[12.5px] leading-relaxed text-white/75">
              {contactInfo.address.area},
              <br />
              {contactInfo.address.city} – {contactInfo.address.pincode},
              <br />
              {contactInfo.address.state}.
            </div>
          </div>
        </div>

        {/* Hours */}
        <div className="flex items-start gap-3">
          <Clock size={16} strokeWidth={2.25} className="mt-0.5 shrink-0 text-red" aria-hidden="true" />
          <div>
            <div className="font-display text-[10px] font-bold uppercase tracking-[0.22em] text-white/45">
              Working Hours
            </div>
            <div className="mt-1 font-body text-[12.5px] leading-relaxed text-white/75">
              {contactInfo.hours.weekdays}
              <br />
              <span className="text-white/45">Sunday: {contactInfo.hours.sunday}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Website strip */}
      <a
        href={website.href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 flex items-center gap-2 border-t border-white/10 pt-4 font-body text-[12.5px] text-white/70 transition-colors hover:text-white"
      >
        <Globe size={14} strokeWidth={2.25} className="text-red" aria-hidden="true" />
        <span className="break-all">{website.text}</span>
      </a>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   Service Centres card — major cities + region we cover from Vellore.
   ────────────────────────────────────────────────────────────────── */
const SERVICE_CENTRES = [
  'Chennai',
  'Bangalore',
  'Hosur',
  'Tirupati',
  'Pondicherry',
];

function ServiceCentresCard() {
  return (
    <div
      className={cn(
        'border border-white/10 bg-white/[0.04] backdrop-blur-sm',
        'p-5 md:p-6',
        'rounded-none'
      )}
    >
      <div className="flex items-start gap-3">
        <Map size={16} strokeWidth={2.25} className="mt-0.5 shrink-0 text-red" aria-hidden="true" />
        <div className="min-w-0 flex-1">
          <div className="font-display text-[10px] font-bold uppercase tracking-[0.22em] text-white/45">
            Major Service Centres
          </div>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {SERVICE_CENTRES.map((city) => (
              <li key={city}>
                <span className="inline-flex items-center border border-white/10 bg-white/[0.05] px-2.5 py-1 font-display text-[11px] font-bold uppercase tracking-[0.18em] text-white/85 rounded-none">
                  {city}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-3 font-body text-[12px] italic leading-snug text-white/55">
            Plus broader coverage across the Southern region.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   Stats row
   ────────────────────────────────────────────────────────────────── */
function StatsRow() {
  return (
    <FadeUp
      delay={0.4}
      distance={20}
      className={cn(
        'mt-14 border border-white/10 bg-white/[0.04] backdrop-blur-sm',
        'rounded-none'
      )}
    >
      <ul className="grid grid-cols-2 divide-y divide-white/10 md:grid-cols-4 md:divide-x md:divide-y-0">
        {stats.map((s) => (
          <li key={s.label} className="px-6 py-7 text-center md:px-8">
            <div className="font-display text-4xl font-black text-white md:text-5xl">
              <Counter value={s.value} suffix={s.suffix} duration={2} />
            </div>
            <div className="mt-2 font-display text-[11px] font-bold uppercase tracking-[0.22em] text-white/55">
              {s.label}
            </div>
          </li>
        ))}
      </ul>
    </FadeUp>
  );
}

/* ──────────────────────────────────────────────────────────────────
   HERO — root export
   ────────────────────────────────────────────────────────────────── */
export default function Hero() {
  return (
    <section
      className="relative isolate min-h-screen overflow-hidden bg-ink text-white"
      aria-label="Sheyam Enterprises — Hero"
    >
      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-100"
        style={gridOverlayStyle}
        aria-hidden="true"
      />

      {/* Red glow — top right */}
      <div
        className="pointer-events-none absolute -top-32 right-1/4 h-[700px] w-[700px] rounded-full bg-red/5 blur-3xl"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-20 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-20 md:py-24 lg:py-28">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          {/* ── LEFT: Copy ────────────────────────────────── */}
          <div className="lg:col-span-7">
            {/* Headline */}
            <FadeUp delay={0.1} distance={28}>
              <h1 className="font-display font-black uppercase leading-[0.95] tracking-tight">
                <span className="block text-5xl text-white md:text-6xl lg:text-[72px]">
                  Master in
                </span>
                <span className="mt-1 block text-5xl text-red md:text-6xl lg:text-[72px]">
                  Compressors
                </span>
                <span className="mt-1 block text-4xl text-white/80 md:text-5xl lg:text-[52px]">
                  &amp; Generators
                </span>
              </h1>
            </FadeUp>

            {/* Subtext */}
            <FadeUp delay={0.2} distance={20} className="mt-6">
              <p className="max-w-xl font-body text-[15px] leading-relaxed text-white/65 md:text-base">
                Sales, servicing, spare parts, hiring &amp; AMC for all types of
                air compressors and diesel power generators across India.
              </p>
            </FadeUp>

            {/* CTAs */}
            <FadeUp delay={0.3} distance={16} className="mt-8">
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to="/contact"
                  className={cn(
                    'group inline-flex h-12 items-center justify-center gap-2 bg-red px-6',
                    'font-display text-[12px] font-bold uppercase tracking-[0.22em] text-white',
                    'transition-all duration-200 ease-out',
                    'hover:-translate-y-0.5 hover:bg-red2 hover:shadow-[0_14px_30px_-10px_rgba(204,17,17,0.65)]',
                    'rounded-none'
                  )}
                >
                  Get a Free Quote
                  <ArrowRight
                    size={16}
                    strokeWidth={2.5}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>

                <Link
                  to="/products"
                  className={cn(
                    'inline-flex h-12 items-center justify-center gap-2 border border-white/30 px-6',
                    'font-display text-[12px] font-bold uppercase tracking-[0.22em] text-white',
                    'transition-all duration-200 ease-out',
                    'hover:-translate-y-0.5 hover:border-white hover:bg-white/[0.06]',
                    'rounded-none'
                  )}
                >
                  View Products
                </Link>
              </div>
            </FadeUp>
          </div>

          {/* ── RIGHT: Service pills + contact card ────────── */}
          <div className="lg:col-span-5">
            <FadeUp delay={0.2} distance={24} className="space-y-5">
              {/* Section label */}
              <div className="flex items-center gap-3">
                <span className="block h-0.5 w-5 bg-red" aria-hidden="true" />
                <span className="font-display text-[10px] font-bold uppercase tracking-[0.3em] text-white/55">
                  What We Do
                </span>
              </div>

              {/* Pills grid */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {SERVICE_PILLS.map((p) => (
                  <ServicePill key={p.id} icon={p.icon} label={p.label} />
                ))}
              </div>

              {/* Contact card */}
              <ContactCard />

              {/* Major service centres card */}
              <ServiceCentresCard />
            </FadeUp>
          </div>
        </div>

        {/* ── STATS ROW (full width, below grid) ─────────────── */}
        <StatsRow />
      </div>
    </section>
  );
}
