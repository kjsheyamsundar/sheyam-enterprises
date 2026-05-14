import { Link } from 'react-router-dom';
import { ArrowRight, Wind, Gauge, Zap, Cog } from 'lucide-react';

import { products } from '../../data/products';
import { FadeUp } from '../animations/FadeUp';
import { StaggerList } from '../animations/StaggerList';
import { SectionLabel } from '../ui/SectionLabel';
import { cn } from '../../utils/cn';

/* Map data icon strings → lucide components */
const ICONS = { Wind, Gauge, Zap, Cog };

/* Token-name palette for the original 4 products. The newer entries pass
   raw hex codes via `product.color` instead — see resolveAccent(). */
const TOKEN_HEX = {
  navy:  '#0B1B5C',
  navy2: '#0D2575',
  red:   '#CC1111',
  ink:   '#09090F',
};

const CATEGORY_LABEL = {
  'Air Compressor':       'COMPRESSOR',
  'Generator':            'GENERATOR',
  'Spares & Consumables': 'PARTS',
  // New schema entries — already in the right shape
  COMPRESSOR:             'COMPRESSOR',
  GENERATOR:              'GENERATOR',
  PARTS:                  'PARTS',
  SERVICE:                'SERVICE',
};

/** Resolve `product.color` (token name or hex) to a hex value. */
function resolveAccent(p) {
  const raw = p.color || '';
  return raw.startsWith('#') ? raw : (TOKEN_HEX[raw] ?? TOKEN_HEX.navy);
}

/** Render the icon as a lucide component when known, else as a glyph (emoji). */
function ProductIcon({ product, size = 36 }) {
  const Icon = ICONS[product.icon];
  if (Icon) return <Icon size={size} strokeWidth={2} aria-hidden="true" />;
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

function ProductCard({ product }) {
  const accent = resolveAccent(product);
  const tag    = CATEGORY_LABEL[product.category] ?? (product.category || '').toUpperCase();

  return (
    <Link
      to={`/products#${product.id}`}
      style={{ '--p-color': accent }}
      className={cn(
        'group flex h-full flex-col border border-off bg-white',
        'transition-all duration-300 ease-out',
        'hover:-translate-y-1.5 hover:border-[var(--p-color)] hover:shadow-[0_24px_48px_-20px_rgba(9,9,15,0.25)]',
        'rounded-none'
      )}
    >
      {/* Top header */}
      <div
        className="flex items-center justify-between px-5 py-3 text-white"
        style={{ backgroundColor: accent }}
      >
        <span className="font-display text-[13px] font-black tracking-wide">
          <span className="opacity-90">{product.number}</span>
          <span className="opacity-50"> /</span>
        </span>
        <span className="font-display text-[10px] font-bold uppercase tracking-[0.22em] opacity-90">
          {tag}
        </span>
      </div>

      {/* Image area — product photo when present, icon tile otherwise */}
      <div className="relative grid h-44 place-items-center overflow-hidden bg-off">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, rgba(9,9,15,1) 0 1px, transparent 1px 32px),repeating-linear-gradient(90deg, rgba(9,9,15,1) 0 1px, transparent 1px 32px)',
          }}
          aria-hidden="true"
        />
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="relative h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <span
            className="relative grid h-20 w-20 place-items-center bg-white shadow-sm transition-transform duration-300 group-hover:scale-105"
            style={{ color: accent }}
          >
            <ProductIcon product={product} size={36} />
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col px-5 py-5">
        <h3 className="font-display text-xl font-black uppercase leading-tight tracking-tight text-navy">
          {product.name}
        </h3>
        <p className="mt-2 font-body text-[13px] leading-relaxed text-slate">
          {product.description}
        </p>

        {/* Brand coverage — generic, no per-product subset */}
        <p className="mt-4 font-body text-[11.5px] italic leading-relaxed text-muted">
          All major brands supplied and serviced.
        </p>

        <div className="flex-1" />

        {/* CTA bar */}
        <div
          className="mt-5 -mx-5 -mb-5 flex items-center justify-between px-5 py-3 text-white transition-colors duration-200 group-hover:brightness-110"
          style={{ backgroundColor: accent }}
        >
          <span className="font-display text-[11px] font-bold uppercase tracking-[0.22em]">
            Enquire Now
          </span>
          <ArrowRight
            size={16}
            strokeWidth={2.5}
            className="transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </div>
      </div>
    </Link>
  );
}

export default function Products() {
  /* Show the first 4 catalogue entries on the homepage so the 4-col grid
     stays clean. The full catalogue lives on /products. */
  const featured = products.slice(0, 4);

  return (
    <section
      className="relative bg-white py-20 md:py-24"
      aria-label="Products"
    >
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
            spares — sourced from 16+ trusted global and Indian brands and
            sized for your duty cycle.
          </p>
        </FadeUp>

        {/* Grid */}
        <StaggerList
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          staggerDelay={0.08}
          distance={24}
        >
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </StaggerList>

        {/* See-all link when there are more entries than featured */}
        {products.length > featured.length && (
          <FadeUp delay={0.2} distance={16} className="mt-10 text-center">
            <Link
              to="/products"
              className="group inline-flex h-12 items-center justify-center gap-2 border border-navy bg-white px-6 font-display text-[12px] font-bold uppercase tracking-[0.22em] text-navy transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-navy hover:text-white"
            >
              See all {products.length} products
              <ArrowRight
                size={14}
                strokeWidth={2.5}
                className="transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </FadeUp>
        )}
      </div>
    </section>
  );
}
