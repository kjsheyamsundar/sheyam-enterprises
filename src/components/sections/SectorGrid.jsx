import {
  Factory,
  HardHat,
  FlaskConical,
  HeartPulse,
  Sprout,
  Building2,
  ArrowRight,
} from 'lucide-react';

import { industries } from '../../data/industries';
import { FadeUp } from '../animations/FadeUp';
import { StaggerList } from '../animations/StaggerList';
import { SectionLabel } from '../ui/SectionLabel';
import { cn } from '../../utils/cn';

/* Map data icon strings → lucide components */
const ICONS = {
  Factory,
  HardHat,
  FlaskConical,
  HeartPulse,
  Sprout,
  Building2,
};

function SectorCard({ sector }) {
  const Icon = ICONS[sector.icon] ?? Building2;
  // The `highlighted` flag in data is preserved but no longer inverts the
  // card colour — the 3×2 grid now reads as six visually identical cards
  // for a cleaner, more consistent layout.

  return (
    <article
      className={cn(
        'group relative flex h-full flex-col p-7 md:p-8',
        'bg-white text-ink',
        // Resting elevation — soft shadow defines the card; deeper on hover
        'shadow-[0_6px_24px_-12px_rgba(9,9,15,0.12)]',
        'transition-all duration-300 ease-out',
        'hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-18px_rgba(9,9,15,0.22)]',
        'rounded-none'
      )}
    >
      {/* Top label + icon */}
      <div className="flex items-start justify-between">
        <span className="font-display text-[10px] font-bold uppercase tracking-[0.3em] text-red">
          {sector.sectorNum}
        </span>
        <span
          className="grid h-12 w-12 place-items-center bg-off text-navy transition-all duration-300 ease-out group-hover:scale-105 group-hover:bg-navy group-hover:text-white"
          aria-hidden="true"
        >
          <Icon size={22} strokeWidth={2.25} />
        </span>
      </div>

      {/* Sector name */}
      <h3 className="mt-6 font-display text-2xl font-black uppercase leading-tight tracking-tight text-navy md:text-[28px]">
        {sector.name}
      </h3>

      {/* Description */}
      <p className="mt-3 font-body text-[14px] leading-relaxed text-slate">
        {sector.description}
      </p>

      <div className="flex-1" />

      {/* Footer arrow */}
      <div
        className={cn(
          'mt-7 flex items-center gap-2 border-t border-off pt-5',
          'font-display text-[11px] font-bold uppercase tracking-[0.22em]',
          'transition-colors duration-200',
          'text-navy group-hover:text-red'
        )}
      >
        Explore Sector
        <ArrowRight
          size={14}
          strokeWidth={2.5}
          className="transition-transform duration-200 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </div>
    </article>
  );
}

export default function SectorGrid() {
  return (
    <section className="bg-white py-20 md:py-24" aria-label="Industries we power">
      <div className="mx-auto max-w-7xl px-6">
        <FadeUp distance={20}>
          <SectionLabel text="Sectors We Serve" />
        </FadeUp>

        <FadeUp delay={0.05} distance={28} className="mt-4">
          <h2 className="font-display font-black uppercase leading-[0.95] tracking-tight">
            <span className="block text-5xl text-navy md:text-6xl lg:text-[72px]">
              Industries We
            </span>
            <span className="mt-1 block text-5xl text-red md:text-6xl lg:text-[72px]">
              Power.
            </span>
          </h2>
        </FadeUp>

        <FadeUp delay={0.1} distance={20} className="mt-5">
          <p className="max-w-2xl font-body text-[15px] leading-relaxed text-slate md:text-base">
            From production lines and pharma cleanrooms to hospitals,
            cold-storage facilities, and rural processing units — our
            equipment runs on the sites that can't afford to go down.
          </p>
        </FadeUp>

        {/* Grid */}
        <StaggerList
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          staggerDelay={0.08}
          distance={24}
        >
          {industries.map((s) => (
            <SectorCard key={s.id} sector={s} />
          ))}
        </StaggerList>
      </div>
    </section>
  );
}
