import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import * as Dialog from '@radix-ui/react-dialog';
import { motion } from 'framer-motion';
import { ArrowRight, X, Wind, Zap } from 'lucide-react';

import { brands } from '../../data/brands';
import { FadeUp } from '../animations/FadeUp';
import { SectionLabel } from '../ui/SectionLabel';
import { Badge } from '../ui/Badge';
import { cn } from '../../utils/cn';

/* Map brand category → lucide icon (matches the industries page pattern). */
const CATEGORY_ICON = {
  Compressor: Wind,
  Generator:  Zap,
};

const FILTERS = [
  { id: 'ALL',         label: 'All Brands' },
  { id: 'Compressor',  label: 'Compressors' },
  { id: 'Generator',   label: 'Generators'  },
];

function FilterTab({ active, onClick, children, count }) {
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
          ? 'border-navy bg-navy text-white shadow-[0_10px_22px_-12px_rgba(11,27,92,0.55)]'
          : 'border-off bg-white text-ink hover:border-navy hover:text-navy'
      )}
    >
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

function BrandCard({ brand, onOpen }) {
  const Icon = CATEGORY_ICON[brand.category] ?? Wind;

  return (
    <button
      type="button"
      onClick={() => onOpen(brand)}
      className={cn(
        'group relative flex h-full w-full flex-col bg-white p-7 text-left md:p-8',
        // Resting elevation — soft shadow defines the card; deeper on hover (matches industries)
        'shadow-[0_6px_24px_-12px_rgba(9,9,15,0.12)]',
        'transition-all duration-300 ease-out',
        'hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-18px_rgba(9,9,15,0.22)]',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-navy/40',
        'rounded-none'
      )}
    >
      {/* Top row — category label + icon tile */}
      <div className="flex items-start justify-between">
        <span className="font-display text-[10px] font-bold uppercase tracking-[0.3em] text-red">
          {brand.category}
        </span>
        <span
          className="grid h-12 w-12 place-items-center bg-off text-navy transition-all duration-300 ease-out group-hover:scale-105 group-hover:bg-navy group-hover:text-white"
          aria-hidden="true"
        >
          <Icon size={22} strokeWidth={2.25} />
        </span>
      </div>

      {/* Brand name */}
      <h3 className="mt-6 font-display text-2xl font-black uppercase leading-tight tracking-tight text-navy md:text-[28px]">
        {brand.name}
      </h3>

      {/* Tagline as body copy */}
      <p
        className="mt-3 w-full truncate font-body text-[14px] leading-relaxed text-slate"
        title={brand.tagline}
      >
        {brand.tagline}
      </p>

      <div className="flex-1" />

      {/* Footer arrow — matches industries' "Explore Sector" pattern */}
      <div
        className={cn(
          'mt-7 flex items-center gap-2 border-t border-off pt-5',
          'font-display text-[11px] font-bold uppercase tracking-[0.22em]',
          'transition-colors duration-200',
          'text-navy group-hover:text-red'
        )}
      >
        View Details
        <ArrowRight
          size={14}
          strokeWidth={2.5}
          className="transition-transform duration-200 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </div>
    </button>
  );
}

/* ──────────────────────────────────────────────────────────────────
   Brand detail modal (Radix Dialog)
   ────────────────────────────────────────────────────────────────── */
function BrandModal({ brand, open, onOpenChange }) {
  if (!brand) return null;

  const variant     = brand.category === 'Compressor' ? 'compressor' : 'generator';
  const accentClass = brand.category === 'Compressor' ? 'bg-navy'    : 'bg-red';

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay asChild>
          <motion.div
            className="fixed inset-0 z-[60] bg-ink/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        </Dialog.Overlay>

        <Dialog.Content asChild>
          <motion.div
            className="fixed left-1/2 top-1/2 z-[70] w-[92vw] max-w-lg -translate-x-1/2 -translate-y-1/2 border border-off bg-white shadow-[0_30px_60px_-15px_rgba(9,9,15,0.45)] focus:outline-none"
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1,    y: 0 }}
            exit={{    opacity: 0, scale: 0.94, y: 12 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
                {/* Top accent */}
                <span className={cn('absolute inset-x-0 top-0 h-1', accentClass)} aria-hidden="true" />

                <div className="px-7 pb-7 pt-8">
                  <div className="flex items-start justify-between gap-4">
                    <Badge text={brand.category} variant={variant} />
                    <Dialog.Close asChild>
                      <button
                        type="button"
                        aria-label="Close"
                        className="grid h-9 w-9 place-items-center border border-off text-muted transition-colors hover:border-red hover:text-red"
                      >
                        <X size={16} strokeWidth={2.5} />
                      </button>
                    </Dialog.Close>
                  </div>

                  <Dialog.Title className="mt-5 font-display text-3xl font-black uppercase leading-tight tracking-tight text-navy md:text-4xl">
                    {brand.name}
                  </Dialog.Title>

                  <Dialog.Description className="mt-2 font-display text-[12px] font-bold uppercase tracking-[0.18em] text-red">
                    {brand.tagline}
                  </Dialog.Description>

                  <div className="mt-5 border-t border-off pt-5">
                    <p className="font-body text-[14.5px] leading-relaxed text-slate">
                      Sheyam Enterprises supplies and services {brand.name}{' '}
                      {brand.category.toLowerCase()}s — covering new equipment supply,
                      genuine spare parts, scheduled servicing, breakdown response
                      and AMC coverage.
                    </p>

                    {brand.featured && (
                      <p className="mt-3 inline-flex items-center gap-1.5 font-display text-[10px] font-bold uppercase tracking-[0.22em] text-red">
                        <span className="block h-1.5 w-1.5 rounded-full bg-red" aria-hidden="true" />
                        Featured Brand
                      </p>
                    )}
                  </div>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <Link
                      to="/contact"
                      onClick={() => onOpenChange(false)}
                      className={cn(
                        'inline-flex h-11 items-center justify-center gap-2 bg-red px-5 text-white',
                        'font-display text-[11px] font-bold uppercase tracking-[0.22em]',
                        'transition-all duration-200 ease-out',
                        'hover:-translate-y-0.5 hover:bg-red2',
                        'rounded-none'
                      )}
                    >
                      Request a Quote
                      <ArrowRight size={14} strokeWidth={2.5} aria-hidden="true" />
                    </Link>
                    <Dialog.Close asChild>
                      <button
                        type="button"
                        className={cn(
                          'inline-flex h-11 items-center justify-center gap-2 border border-off bg-white px-5 text-ink',
                          'font-display text-[11px] font-bold uppercase tracking-[0.22em]',
                          'transition-all duration-200 ease-out',
                          'hover:-translate-y-0.5 hover:border-navy hover:text-navy',
                          'rounded-none'
                        )}
                      >
                        Close
                      </button>
                    </Dialog.Close>
                  </div>
                </div>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

/* ──────────────────────────────────────────────────────────────────
   BrandsGrid — root export
   ────────────────────────────────────────────────────────────────── */
export default function BrandsGrid() {
  const [filter, setFilter]       = useState('ALL');
  const [active, setActive]       = useState(null);
  const [open,   setOpen]         = useState(false);

  const counts = useMemo(() => ({
    ALL:        brands.length,
    Compressor: brands.filter((b) => b.category === 'Compressor').length,
    Generator:  brands.filter((b) => b.category === 'Generator').length,
  }), []);

  const filtered = useMemo(
    () => (filter === 'ALL' ? brands : brands.filter((b) => b.category === filter)),
    [filter]
  );

  const openBrand = (b) => {
    setActive(b);
    setOpen(true);
  };

  return (
    <section className="bg-white py-20 md:py-24" aria-label="Brands gallery">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <FadeUp distance={20}>
          <SectionLabel text="Brands We Service" />
        </FadeUp>

        <FadeUp delay={0.05} distance={28} className="mt-4">
          <h2 className="font-display font-black uppercase leading-[0.95] tracking-tight">
            <span className="block text-5xl text-navy md:text-6xl lg:text-[72px]">
              Trusted By
            </span>
            <span className="mt-1 block text-5xl text-red md:text-6xl lg:text-[72px]">
              Industry Leaders.
            </span>
          </h2>
        </FadeUp>

        <FadeUp delay={0.1} distance={20} className="mt-5">
          <p className="max-w-2xl font-body text-[15px] leading-relaxed text-slate md:text-base">
            16 brands across compressors and generators. Click any card for the
            details we typically share before a quote.
          </p>
        </FadeUp>

        {/* Filter tabs */}
        <FadeUp delay={0.15} distance={16} className="mt-8">
          <div role="tablist" aria-label="Filter brands" className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <FilterTab
                key={f.id}
                active={filter === f.id}
                onClick={() => setFilter(f.id)}
                count={counts[f.id]}
              >
                {f.label}
              </FilterTab>
            ))}
          </div>
        </FadeUp>

        {/* Grid */}
        <motion.div
          key={filter}
          data-filter={filter}
          data-count={filtered.length}
          className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden:  {},
            visible: { transition: { staggerChildren: 0.04 } },
          }}
        >
          {filtered.map((b) => (
            <motion.div
              key={b.id}
              className="h-full"
              variants={{
                hidden:  { opacity: 0, scale: 0.94, y: 14 },
                visible: { opacity: 1, scale: 1,    y: 0  },
              }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <BrandCard brand={b} onOpen={openBrand} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal */}
      <BrandModal brand={active} open={open} onOpenChange={setOpen} />
    </section>
  );
}
