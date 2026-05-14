import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as Accordion from '@radix-ui/react-accordion';
import { Plus, Check } from 'lucide-react';

import { services } from '../../data/services';
import { FadeUp } from '../animations/FadeUp';
import { StaggerList } from '../animations/StaggerList';
import { SectionLabel } from '../ui/SectionLabel';
import { cn } from '../../utils/cn';

/* ──────────────────────────────────────────────────────────────────
   Single service row — Radix Accordion item rendered with
   the NumberedItem visual language built inline.
   ────────────────────────────────────────────────────────────────── */
function ServiceRow({ service, alt }) {
  const isAlt = !!alt;

  return (
    <Accordion.Item
      value={service.id}
      id={service.id}
      className={cn(
        'group relative border-l-[6px] border-l-transparent border-y border-y-off',
        // Offset for the sticky navbar (~110px with TopBar) when scrolled into view
        'scroll-mt-32',
        'transition-all duration-300 ease-out',
        'data-[state=open]:border-l-red',
        'hover:border-l-red',
        isAlt ? 'bg-off' : 'bg-white',
        'rounded-none'
      )}
    >
      <Accordion.Header className="m-0">
        <Accordion.Trigger
          className={cn(
            'group/trigger flex w-full items-stretch gap-6 px-6 py-7 text-left',
            'transition-transform duration-300 ease-out',
            'data-[state=closed]:hover:translate-x-1',
            'md:gap-10 md:px-8'
          )}
        >
          {/* Number block */}
          <div className="flex w-24 shrink-0 flex-col justify-center md:w-32">
            <span className="font-display text-4xl font-black leading-none text-red md:text-5xl">
              {service.number}
              <span className="text-muted"> /</span>
            </span>
            <span className="mt-2 font-display text-[11px] font-bold uppercase tracking-[0.25em] text-muted">
              Discipline
            </span>
          </div>

          {/* Title + short desc */}
          <div className="flex flex-1 flex-col justify-center">
            <span className="block font-display text-2xl font-black uppercase tracking-tight text-navy md:text-3xl">
              {service.title}
            </span>
            <span className="mt-2 block max-w-2xl font-body text-sm leading-relaxed text-slate md:text-base">
              {service.shortDesc}
            </span>
          </div>

          {/* Plus indicator → rotates 45deg on open */}
          <div
            className={cn(
              'shrink-0 self-center',
              'transition-transform duration-300 ease-out',
              'group-data-[state=open]:rotate-45'
            )}
            aria-hidden="true"
          >
            <span className="grid h-11 w-11 place-items-center border border-navy/15 bg-white text-navy transition-colors group-data-[state=open]:border-red group-data-[state=open]:bg-red group-data-[state=open]:text-white">
              <Plus size={20} strokeWidth={2.5} />
            </span>
          </div>
        </Accordion.Trigger>
      </Accordion.Header>

      <Accordion.Content
        className={cn(
          'overflow-hidden',
          'data-[state=open]:animate-[accordion-down_240ms_ease-out]',
          'data-[state=closed]:animate-[accordion-up_200ms_ease-out]'
        )}
      >
        <div className="grid grid-cols-1 gap-8 border-t border-off px-6 py-7 md:grid-cols-12 md:gap-10 md:px-8">
          {/* Left — full description */}
          <div className="md:col-span-6 md:col-start-3">
            <span className="font-display text-[10px] font-bold uppercase tracking-[0.3em] text-red">
              About this service
            </span>
            <p className="mt-3 font-body text-[14.5px] leading-relaxed text-slate md:text-[15px]">
              {service.fullDesc}
            </p>
          </div>

          {/* Right — features */}
          <div className="md:col-span-4">
            <span className="font-display text-[10px] font-bold uppercase tracking-[0.3em] text-navy">
              What's included
            </span>
            <ul className="mt-3 space-y-2.5">
              {service.features.map((f) => (
                <li key={f} className="flex items-start gap-3 font-body text-[13.5px] text-ink">
                  <span
                    className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center bg-red text-white"
                    aria-hidden="true"
                  >
                    <Check size={12} strokeWidth={3} />
                  </span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Accordion.Content>
    </Accordion.Item>
  );
}

/* ──────────────────────────────────────────────────────────────────
   ServicesList — root export
   ────────────────────────────────────────────────────────────────── */
export default function ServicesList() {
  const [open, setOpen] = useState('');
  const location = useLocation();

  // Open + scroll to the matching service whenever the URL hash changes.
  // Triggered when a user clicks a strip cell on /  → /services#sales,
  // or hits a deep link from anywhere else in the app.
  useEffect(() => {
    const id = location.hash.replace(/^#/, '');
    if (!id) return;

    // Make sure the id is one we know about (avoid silent fails on typos)
    const match = services.find((s) => s.id === id);
    if (!match) return;

    setOpen(id);

    // Wait one paint so the accordion's open state is committed and the
    // expanded panel is in the DOM before we measure for scrolling.
    const t = setTimeout(() => {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
    return () => clearTimeout(t);
  }, [location.hash, location.key]);

  return (
    <section className="bg-white py-20 md:py-24" aria-label="Services list">
      <div className="mx-auto max-w-7xl px-6">
        <FadeUp distance={20}>
          <SectionLabel text="Five Disciplines" />
        </FadeUp>

        <FadeUp delay={0.05} distance={28} className="mt-4">
          <h2 className="font-display font-black uppercase leading-[0.95] tracking-tight">
            <span className="block text-4xl text-navy md:text-5xl lg:text-[60px]">
              Click any row
            </span>
            <span className="mt-1 block text-4xl text-red md:text-5xl lg:text-[60px]">
              For Full Details.
            </span>
          </h2>
        </FadeUp>

        <FadeUp delay={0.1} distance={20} className="mt-5">
          <p className="max-w-2xl font-body text-[15px] leading-relaxed text-slate md:text-base">
            Each discipline expands to show what's included — sized for your
            equipment, your duty cycle, and your operating hours.
          </p>
        </FadeUp>
      </div>

      {/* Accordion */}
      <div className="mx-auto mt-12 max-w-7xl px-6">
        <Accordion.Root
          type="single"
          collapsible
          value={open}
          onValueChange={setOpen}
          className="flex flex-col"
        >
          <StaggerList staggerDelay={0.07} distance={24}>
            {services.map((s, i) => (
              <ServiceRow key={s.id} service={s} alt={i % 2 === 1} />
            ))}
          </StaggerList>
        </Accordion.Root>
      </div>
    </section>
  );
}
