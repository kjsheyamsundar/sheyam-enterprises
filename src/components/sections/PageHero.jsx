import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

import { FadeUp } from '../animations/FadeUp';
import { cn } from '../../utils/cn';

/**
 * @typedef {Object} Crumb
 * @property {string}  label
 * @property {string}  [to]   — if omitted, rendered as the current page (no link)
 */

/**
 * @typedef {Object} PageHeroProps
 * @property {string}            pageNumber  — e.g. "02"
 * @property {string}            label       — e.g. "ABOUT"
 * @property {string}            title       — large heading text
 * @property {Crumb[]}           [crumbs]    — breadcrumb trail (last entry is current page)
 * @property {React.ReactNode}   [badge]     — optional announcement chip rendered above the page-number row
 * @property {string}            [className]
 */

/* Dark grid overlay matching the home Hero */
const gridOverlayStyle = {
  backgroundImage: `
    repeating-linear-gradient(0deg,  rgba(255,255,255,0.025) 0 1px, transparent 1px 40px),
    repeating-linear-gradient(90deg, rgba(255,255,255,0.025) 0 1px, transparent 1px 40px)
  `,
};

export default function PageHero({ pageNumber, label, title, crumbs = [], badge, className }) {
  return (
    <section
      className={cn(
        'relative isolate overflow-hidden bg-ink text-white',
        'min-h-[280px]',
        className
      )}
      aria-label={`${label} — page hero`}
    >
      {/* Grid overlay */}
      <div className="pointer-events-none absolute inset-0" style={gridOverlayStyle} aria-hidden="true" />

      {/* Red glow */}
      <div
        className="pointer-events-none absolute -top-24 right-1/4 h-[420px] w-[420px] rounded-full bg-red/[0.06] blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-20 mx-auto flex min-h-[280px] max-w-7xl flex-col justify-center px-6 py-14">
        {/* Optional announcement chip */}
        {badge && (
          <FadeUp distance={12} className="mb-4">
            {badge}
          </FadeUp>
        )}

        {/* Page number / label — aerocoat style */}
        <FadeUp distance={16}>
          <div className="flex items-center gap-3">
            <span className="font-display text-3xl font-black leading-none text-red md:text-4xl">
              {pageNumber}
              <span className="text-white/35"> /</span>
            </span>
            <span className="font-display text-[11px] font-bold uppercase tracking-[0.3em] text-white/55">
              {label}
            </span>
          </div>
        </FadeUp>

        {/* Title */}
        <FadeUp delay={0.08} distance={24} className="mt-4">
          <h1 className="font-display text-4xl font-black uppercase leading-[0.95] tracking-tight md:text-5xl lg:text-[56px]">
            {title}
          </h1>
        </FadeUp>

        {/* Breadcrumb */}
        {crumbs.length > 0 && (
          <FadeUp delay={0.15} distance={12} className="mt-5">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-1.5 font-body text-[12px] text-white/55">
                {crumbs.map((c, i) => {
                  const isLast = i === crumbs.length - 1;
                  return (
                    <li key={`${c.label}-${i}`} className="flex items-center gap-1.5">
                      {i > 0 && (
                        <ChevronRight size={12} strokeWidth={2.5} className="text-white/25" aria-hidden="true" />
                      )}
                      {c.to && !isLast ? (
                        <Link to={c.to} className="transition-colors hover:text-white">
                          {c.label}
                        </Link>
                      ) : (
                        <span className="font-display text-[11px] font-bold uppercase tracking-[0.22em] text-red">
                          {c.label}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ol>
            </nav>
          </FadeUp>
        )}
      </div>
    </section>
  );
}
