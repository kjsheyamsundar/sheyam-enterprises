import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import { importExportData } from '../../data/services';
import { FadeUp, StaggerList } from '../animations';
import { SectionLabel } from '../ui';
import { cn } from '../../utils/cn';

/* Dark grid overlay — matches the home Hero / TrustedBy texture */
const gridOverlayStyle = {
  backgroundImage: `
    repeating-linear-gradient(0deg,  rgba(255,255,255,0.02) 0 1px, transparent 1px 40px),
    repeating-linear-gradient(90deg, rgba(255,255,255,0.02) 0 1px, transparent 1px 40px)
  `,
};

/* ──────────────────────────────────────────────────────────────────
   CategoryCard — shared by both Import and Export columns so the
   visual treatment is byte-for-byte identical. Import items use a
   `name` field; export items use `category`. Either is accepted.
   ────────────────────────────────────────────────────────────────── */
function CategoryCard({ entry }) {
  const title = entry.category || entry.name;
  const tags  = Array.isArray(entry.tags) ? entry.tags : [];

  return (
    <article
      className={cn(
        'group relative border border-[#1E1E38] border-l-[3px] border-l-red bg-[#0F0F1E] p-5 md:p-6',
        'transition-all duration-300 ease-out',
        'hover:-translate-y-[3px] hover:shadow-[0_18px_40px_-22px_rgba(204,17,17,0.55)]',
        'rounded-none'
      )}
    >
      <div className="flex items-start gap-3">
        <span
          className="grid h-9 w-9 shrink-0 place-items-center bg-white/[0.05] text-base leading-none"
          aria-hidden="true"
        >
          {entry.icon}
        </span>
        <div className="min-w-0 flex-1">
          <h4 className="font-display text-[15px] font-bold uppercase tracking-wide text-white md:text-[16px]">
            {title}
          </h4>
          <p className="mt-1 font-body text-[12.5px] leading-snug text-white/55">
            {entry.desc}
          </p>
        </div>
      </div>

      {/* Tag pills — rendered whenever the entry has tags */}
      {tags.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <li key={t}>
              <span
                className={cn(
                  'inline-flex items-center px-2.5 py-1',
                  'border border-[#262645] bg-[#1A1A35]',
                  'font-display text-[10px] font-bold uppercase tracking-[0.18em] text-white/55',
                  'transition-colors duration-150',
                  'hover:border-red hover:text-white',
                  'rounded-none'
                )}
              >
                {t}
              </span>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

/* ──────────────────────────────────────────────────────────────────
   IMPORT / EXPORT box header (used at the top of each column)
   ────────────────────────────────────────────────────────────────── */
function ColumnHeader({ icon, title, description }) {
  return (
    <div className="flex items-start gap-4 px-5 py-5 md:px-6 md:py-6">
      <span
        className="grid h-12 w-12 shrink-0 place-items-center bg-white/[0.05] text-2xl leading-none"
        aria-hidden="true"
      >
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="font-display text-[22px] font-black uppercase leading-none tracking-tight text-white">
          {title}
        </h3>
        <p className="mt-2 font-body text-[12.5px] leading-relaxed text-white/55">
          {description}
        </p>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   Column — same shell + card list for both Import and Export.
   The only difference between the two columns is the 4px top accent
   colour (navy for Import, red for Export).
   ────────────────────────────────────────────────────────────────── */
function Column({ block, accent, staggerDelay = 0.08 }) {
  return (
    <div
      className={cn(
        'relative border border-[#1E1E38] border-t-4 bg-[#111122]',
        accent === 'navy' ? 'border-t-navy' : 'border-t-red'
      )}
    >
      <ColumnHeader
        icon={block.icon}
        title={block.title}
        description={block.description}
      />

      <StaggerList
        className="border-t border-white/10 flex flex-col gap-4 p-5 md:p-6"
        staggerDelay={staggerDelay}
        distance={16}
      >
        {block.items.map((entry) => (
          <CategoryCard key={entry.id} entry={entry} />
        ))}
      </StaggerList>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   ImportExport — root export
   ────────────────────────────────────────────────────────────────── */
export default function ImportExport() {
  const { import: imp, export: exp } = importExportData;

  return (
    <section
      id="global-trade"
      className="relative isolate overflow-hidden bg-ink py-24 text-white scroll-mt-32"
      aria-label="Global trade — import and export"
    >
      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={gridOverlayStyle}
        aria-hidden="true"
      />

      {/* Left red accent bar */}
      <div
        className="pointer-events-none absolute left-0 top-0 z-10 h-full w-1.5 bg-red"
        aria-hidden="true"
      />

      {/* Subtle red glow */}
      <div
        className="pointer-events-none absolute -top-32 right-1/4 h-[600px] w-[600px] rounded-full bg-red/[0.05] blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-20 mx-auto max-w-7xl px-6">
        {/* Header */}
        <FadeUp distance={20}>
          <SectionLabel text="Import & Export" tone="white" className="justify-center" />
        </FadeUp>

        <FadeUp delay={0.05} distance={28} className="mt-4">
          <h2 className="text-center font-display font-black uppercase leading-[0.95] tracking-tight">
            <span className="block text-4xl text-white md:text-5xl lg:text-[52px]">
              Global Trade
            </span>
            <span className="mt-1 block text-4xl text-red md:text-5xl lg:text-[52px]">
              Solutions.
            </span>
          </h2>
        </FadeUp>

        <FadeUp delay={0.1} distance={20} className="mt-5">
          <p className="mx-auto max-w-2xl text-center font-body text-[13px] leading-relaxed text-white/65">
            Importing world-class equipment. Exporting genuine parts globally.
          </p>
        </FadeUp>

        {/* Two-column grid — identical card design on both sides */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start">
          <FadeUp distance={28}>
            <Column block={imp} accent="navy" staggerDelay={0.06} />
          </FadeUp>

          <FadeUp delay={0.1} distance={28}>
            <Column block={exp} accent="red" staggerDelay={0.08} />
          </FadeUp>
        </div>

        {/* Bottom red banner */}
        <FadeUp delay={0.15} distance={24} className="mt-12">
          <div
            className={cn(
              'flex flex-col items-center justify-between gap-5 bg-red px-6 py-5 text-white',
              'md:flex-row md:gap-8 md:px-8 md:py-6',
              'rounded-none'
            )}
          >
            <p className="text-center font-display text-[15px] font-bold uppercase tracking-wide md:text-left md:text-[17px]">
              Interested in Import or Export? Contact us for pricing and availability.
            </p>
            <Link
              to="/contact"
              className={cn(
                'group inline-flex h-11 shrink-0 items-center justify-center gap-2 bg-white px-6 text-navy',
                'font-display text-[12px] font-bold uppercase tracking-[0.22em]',
                'transition-all duration-200 ease-out',
                'hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-10px_rgba(9,9,15,0.45)]',
                'rounded-none'
              )}
            >
              Get in Touch
              <ArrowRight
                size={14}
                strokeWidth={2.5}
                className="transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
