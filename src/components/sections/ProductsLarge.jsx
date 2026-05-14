import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Wind, Gauge, Zap, Cog, ShoppingCart } from 'lucide-react';

import { products } from '../../data/products';
import { FadeUp } from '../animations/FadeUp';
import { SectionLabel } from '../ui/SectionLabel';
import { cn } from '../../utils/cn';

const ICONS = { Wind, Gauge, Zap, Cog };

/* Token-name palette for the original 4 products. The 5 new entries pass
   raw hex codes via `product.color` instead — see resolveAccent(). */
const TOKEN_HEX = {
  navy:  '#0B1B5C',
  navy2: '#0D2575',
  red:   '#CC1111',
  ink:   '#09090F',
};

/* ──────────────────────────────────────────────────────────────────
   Schema-tolerant helpers — the dataset mixes two shapes:
   • original 4: { id: slug,  icon: 'Wind', color: 'navy'  }
   • new 5:      { id: number, icon: '🌀',   color: '#0B1B5C', specs: [] }
   These functions normalise both at render time without forking code.
   ────────────────────────────────────────────────────────────────── */

/** Group a product into its filter bucket regardless of the exact category
   string. Tab IDs follow the user spec: COMPRESSORS / GENERATORS / PARTS
   are plural, SERVICE is singular. */
function categoryGroup(p) {
  const c = (p?.category || '').toUpperCase();
  if (c.includes('COMPRESSOR')) return 'COMPRESSORS';
  if (c.includes('GENERATOR'))  return 'GENERATORS';
  if (c.includes('PARTS') || c.includes('SPARES')) return 'PARTS';
  if (c.includes('SERVICE'))    return 'SERVICE';
  return 'OTHER';
}

/** Short uppercase tag shown in the card header (CATEGORY badge). */
function categoryTag(p) {
  const map = { COMPRESSORS: 'COMPRESSOR', GENERATORS: 'GENERATOR', PARTS: 'PARTS', SERVICE: 'SERVICE' };
  return map[categoryGroup(p)] ?? (p.category || '').toUpperCase();
}

/** Resolve the accent color into both a hex value and a CSS-var binding
   so Tailwind arbitrary values like `hover:border-[var(--p-color)]` work. */
function resolveAccent(p) {
  const raw = p.color || '';
  const hex = raw.startsWith('#') ? raw : (TOKEN_HEX[raw] ?? TOKEN_HEX.navy);
  return {
    hex,
    cssVar: { '--p-color': hex },
  };
}

/* Map filter id → product.category match (now group-based). Each entry
   carries an icon glyph rendered to the left of the label in the tab. */
const FILTERS = [
  { id: 'ALL',         label: 'All',         icon: '⊞',  match: () => true },
  { id: 'COMPRESSORS', label: 'Compressors', icon: '⚙️', match: (p) => categoryGroup(p) === 'COMPRESSORS' },
  { id: 'GENERATORS',  label: 'Generators',  icon: '⚡', match: (p) => categoryGroup(p) === 'GENERATORS' },
  { id: 'PARTS',       label: 'Parts',       icon: '🔩', match: (p) => categoryGroup(p) === 'PARTS' },
  { id: 'SERVICE',     label: 'Service',     icon: '📊', match: (p) => categoryGroup(p) === 'SERVICE' },
];

/* Spec highlights for the original 4 products. Newer entries provide their
   own `specs` array and bypass this map. */
const HIGHLIGHTS = {
  'screw-compressor': [
    'Continuous-duty rated for 24×7 operation',
    'Energy-efficient airend with low vibration',
    'Capacities from 5 HP to 500 HP',
    'CE-certified, ISO-compliant builds',
  ],
  'reciprocating-compressor': [
    'Single and two-stage configurations',
    'Workshop and intermittent-duty applications',
    'Rugged piston design, easy field service',
    'Capacities from 1 HP to 50 HP',
  ],
  'diesel-generator': [
    'CPCB-IV+ compliant emissions',
    'Acoustic enclosures with AMF panels',
    'Load-bank tested before dispatch',
    'Ratings from 5 kVA to 2000 kVA',
  ],
  'replacement-parts': [
    'Filters, lubricants, valves, AVRs',
    'Airends, alternators, controllers',
    'Same-day dispatch on consumables',
    'OEM-traceable documentation',
  ],
};

/** Best available highlight list — prefer product.specs (data) over the
   render-time HIGHLIGHTS map (used by the original four). */
function getHighlights(p) {
  if (Array.isArray(p.specs) && p.specs.length) return p.specs;
  return HIGHLIGHTS[p.id] ?? [];
}

/** Render the icon as a lucide component when `icon` is a known name,
   otherwise treat the raw string as a glyph (emoji). */
function ProductIcon({ product, size = 56 }) {
  const Icon = ICONS[product.icon];
  if (Icon) return <Icon size={size} strokeWidth={1.75} aria-hidden="true" />;
  return (
    <span
      className="leading-none"
      style={{ fontSize: `${Math.round(size * 0.9)}px` }}
      aria-hidden="true"
    >
      {product.icon || '🔧'}
    </span>
  );
}

/* ──────────────────────────────────────────────────────────────────
   Filter tab
   ────────────────────────────────────────────────────────────────── */
function FilterTab({ active, onClick, children, count, icon }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-2 px-5 py-2.5',
        'font-display text-[12px] font-bold uppercase tracking-[0.22em]',
        'border transition-all duration-200 ease-out',
        'rounded-none',
        active
          ? cn(
              'border-navy bg-navy text-white',
              // Inset shadow draws a 3px red bar at the bottom edge without
              // changing layout; outer shadow is the existing soft lift.
              'shadow-[inset_0_-3px_0_0_#CC1111,0_10px_22px_-12px_rgba(11,27,92,0.55)]'
            )
          : 'border-off bg-white text-slate hover:border-navy hover:text-navy'
      )}
    >
      {icon && (
        <span className="text-[14px] leading-none" aria-hidden="true">
          {icon}
        </span>
      )}
      <span>{children}</span>
      {typeof count === 'number' && (
        <span
          className={cn(
            'min-w-[24px] px-1.5 py-0.5 text-center font-display text-[10px] font-bold tracking-wider',
            active ? 'bg-white/15 text-white' : 'bg-off text-muted'
          )}
        >
          {count}
        </span>
      )}
    </button>
  );
}

/* ──────────────────────────────────────────────────────────────────
   Large product card
   ────────────────────────────────────────────────────────────────── */
function ProductCardLarge({ product }) {
  const accent     = resolveAccent(product);
  const tag        = categoryTag(product);
  const highlights = getHighlights(product);

  return (
    <article
      style={accent.cssVar}
      className={cn(
        'group relative grid h-full grid-cols-1 overflow-hidden border border-off bg-white md:grid-cols-2',
        'transition-all duration-300 ease-out',
        'hover:border-[var(--p-color)] hover:-translate-y-1.5 hover:shadow-[0_28px_56px_-22px_rgba(9,9,15,0.22)]',
        'rounded-none'
      )}
    >
      {/* Left — image area. Fixed height + flex centering so every product
          photo lands in the same canvas regardless of its native aspect
          ratio (tall, wide, or square). Header bar sits absolute at the
          top; image content stays clear of it via pt-14 padding. */}
      <div className="relative flex h-[320px] items-center justify-center overflow-hidden bg-off md:h-[360px]">
        {/* Header tag */}
        <div
          className="absolute left-0 top-0 z-10 flex w-full items-center justify-between px-5 py-3 text-white"
          style={{ backgroundColor: accent.hex }}
        >
          <span className="font-display text-[13px] font-black tracking-wide">
            <span className="opacity-90">{product.number}</span>
            <span className="opacity-50"> /</span>
          </span>
          <span className="font-display text-[10px] font-bold uppercase tracking-[0.22em] opacity-90">
            {tag}
          </span>
        </div>

        {/* Grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, rgba(9,9,15,1) 0 1px, transparent 1px 32px),repeating-linear-gradient(90deg, rgba(9,9,15,1) 0 1px, transparent 1px 32px)',
          }}
          aria-hidden="true"
        />

        {product.image ? (
          /* Photo — fills the fixed image area, contained so the full
             product is visible. Same effective canvas for every image. */
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="relative h-full w-full object-contain px-6 pb-6 pt-14 transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          /* Centred icon tile — fallback when no photo is supplied */
          <span
            className="relative grid h-32 w-32 place-items-center bg-white shadow-md transition-transform duration-300 group-hover:scale-105"
            style={{ color: accent.hex }}
          >
            <ProductIcon product={product} size={56} />
          </span>
        )}
      </div>

      {/* Right — copy */}
      <div className="flex flex-col p-7 md:p-8">
        <h3 className="font-display text-3xl font-black uppercase leading-tight tracking-tight text-navy md:text-[34px]">
          {product.name}
        </h3>

        <p className="mt-3 font-body text-[14.5px] leading-relaxed text-slate">
          {product.description}
        </p>

        {/* Brand coverage — generic statement avoids implying a limited
            roster; we supply and service every major brand. */}
        <div className="mt-5 border-t border-off pt-5">
          <span className="font-display text-[10px] font-bold uppercase tracking-[0.3em] text-muted">
            All Brands Available
          </span>
          <p className="mt-2 font-body text-[13px] italic leading-relaxed text-slate">
            We supply and service equipment from every leading global and Indian brand.
          </p>
        </div>

        {/* Specs — flex-wrap pill row, ✓ prefix uses the product's accent colour */}
        {highlights.length > 0 && (
          <div className="mt-5 border-t border-off pt-5">
            <span className="font-display text-[10px] font-bold uppercase tracking-[0.3em] text-muted">
              Specifications
            </span>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {highlights.map((h) => (
                <li
                  key={h}
                  className="inline-flex items-center gap-1.5 bg-off px-2.5 py-1 font-body text-[10px] font-medium text-slate"
                >
                  <span
                    className="font-bold leading-none"
                    style={{ color: accent.hex }}
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex-1" />

        {/* CTA */}
        <Link
          to="/contact"
          style={{ backgroundColor: accent.hex }}
          className={cn(
            'group/cta mt-6 inline-flex h-11 items-center justify-center gap-2 px-5 text-white',
            'font-display text-[11px] font-bold uppercase tracking-[0.22em]',
            'transition-all duration-200 ease-out',
            'hover:-translate-y-0.5 hover:brightness-110',
            'rounded-none'
          )}
        >
          Enquire Now
          <ArrowRight
            size={14}
            strokeWidth={2.5}
            className="transition-transform duration-200 group-hover/cta:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </div>
    </article>
  );
}

/* ──────────────────────────────────────────────────────────────────
   Sticky mobile "Request a Quote" bar
   ────────────────────────────────────────────────────────────────── */
function MobileQuoteBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-off bg-white/95 px-4 py-3 backdrop-blur md:hidden"
      role="region"
      aria-label="Request a quote"
    >
      <Link
        to="/contact"
        className={cn(
          'group flex h-11 w-full items-center justify-center gap-2 bg-red px-5 text-white',
          'font-display text-[12px] font-bold uppercase tracking-[0.22em]',
          'transition-all duration-200 ease-out',
          'hover:bg-red2',
          'rounded-none'
        )}
      >
        <ShoppingCart size={14} strokeWidth={2.5} aria-hidden="true" />
        Request a Quote
        <ArrowRight
          size={14}
          strokeWidth={2.5}
          className="transition-transform duration-200 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </Link>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   ProductsLarge — root export
   ────────────────────────────────────────────────────────────────── */
export default function ProductsLarge() {
  const [filter, setFilter] = useState('ALL');
  const location = useLocation();

  const counts = useMemo(() => {
    const c = { ALL: products.length };
    FILTERS.forEach((f) => {
      if (f.id === 'ALL') return;
      c[f.id] = products.filter(f.match).length;
    });
    return c;
  }, []);

  const filtered = useMemo(() => {
    const f = FILTERS.find((x) => x.id === filter);
    return products.filter(f?.match ?? (() => true));
  }, [filter]);

  /* Hash-anchor scroll — when the user arrives via /products#<id> (e.g.
     from the footer Products links), reset the filter to ALL so the
     matching card is rendered, then scroll it into view.

     Two-step scroll: an instant jump first to land the card on screen
     reliably, then a smooth nudge so the offset under the sticky navbar
     feels polished. The instant step is critical — `behavior: 'smooth'`
     alone gets interrupted by the route-change re-renders happening
     around the same tick. */
  useEffect(() => {
    const raw = location.hash.replace(/^#/, '');
    if (!raw) return;

    // Hashes can be slugs ("screw-compressor") or numeric strings ("10")
    const match = products.find((p) => String(p.id) === raw);
    if (!match) return;

    if (filter !== 'ALL') setFilter('ALL');

    // Wait for the filter-keyed grid to finish remounting + stagger animation
    const t1 = setTimeout(() => {
      const el = document.getElementById(`product-${raw}`);
      el?.scrollIntoView({ behavior: 'auto', block: 'start' });
    }, 350);
    // Second smooth pass once the page is settled, for visual polish
    const t2 = setTimeout(() => {
      const el = document.getElementById(`product-${raw}`);
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [location.hash, location.key]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <section className="bg-white py-20 pb-32 md:py-24 md:pb-24" aria-label="Products gallery">
        <div className="mx-auto max-w-7xl px-6">
          {/* Header */}
          <FadeUp distance={20}>
            <SectionLabel text="Our Products" />
          </FadeUp>

          <FadeUp delay={0.05} distance={28} className="mt-4">
            <h2 className="font-display font-black uppercase leading-[0.95] tracking-tight">
              <span className="block text-5xl text-navy md:text-6xl lg:text-[72px]">
                What We
              </span>
              <span className="mt-1 block text-5xl text-red md:text-6xl lg:text-[72px]">
                Supply.
              </span>
            </h2>
          </FadeUp>

          <FadeUp delay={0.1} distance={20} className="mt-5">
            <p className="max-w-2xl font-body text-[15px] leading-relaxed text-slate md:text-base">
              Industrial air compressors, diesel generators and genuine
              spares — sized for your duty cycle and sourced from 16+ trusted
              global and Indian brands.
            </p>
          </FadeUp>

          {/* Filter tabs */}
          <FadeUp delay={0.15} distance={16} className="mt-8">
            <div role="tablist" aria-label="Filter products" className="flex flex-wrap gap-2">
              {FILTERS.map((f) => (
                <FilterTab
                  key={f.id}
                  active={filter === f.id}
                  onClick={() => setFilter(f.id)}
                  count={counts[f.id]}
                  icon={f.icon}
                >
                  {f.label}
                </FilterTab>
              ))}
            </div>
          </FadeUp>

          {/* Grid — keyed on filter so it remounts cleanly when category changes */}
          <motion.div
            key={filter}
            className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2"
            initial="hidden"
            animate="visible"
            variants={{
              hidden:  {},
              visible: { transition: { staggerChildren: 0.06 } },
            }}
          >
            {filtered.map((p) => (
              <motion.div
                key={p.id}
                id={`product-${p.id}`}
                className="scroll-mt-32"
                variants={{
                  hidden:  { opacity: 0, scale: 0.94, y: 16 },
                  visible: { opacity: 1, scale: 1,    y: 0  },
                }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProductCardLarge product={p} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <MobileQuoteBar />
    </>
  );
}
