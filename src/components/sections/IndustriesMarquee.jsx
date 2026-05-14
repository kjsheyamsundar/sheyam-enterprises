import { industries } from '../../data/industries';
import { Marquee } from '../animations/Marquee';
import { FadeUp } from '../animations/FadeUp';
import { SectionLabel } from '../ui/SectionLabel';
import { cn } from '../../utils/cn';

function IndustryPill({ name }) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 border border-white/10 bg-white/[0.03] px-6 py-3',
        'font-display text-[13px] font-bold uppercase tracking-[0.22em] text-white/85',
        'rounded-none'
      )}
    >
      <span className="block h-1.5 w-1.5 rounded-full bg-red" aria-hidden="true" />
      <span>{name}</span>
    </div>
  );
}

export default function IndustriesMarquee() {
  // Duplicate the 6 industries to give the marquee enough density
  const items = [...industries, ...industries, ...industries].map((s) => s.name);

  return (
    <section
      className="relative isolate overflow-hidden bg-ink py-16 text-white md:py-20"
      aria-label="Industries we serve marquee"
    >
      {/* Header */}
      <div className="mx-auto max-w-7xl px-6">
        <FadeUp distance={20}>
          <SectionLabel text="Across Tamil Nadu" tone="white" />
        </FadeUp>

        <FadeUp delay={0.05} distance={20} className="mt-3">
          <p className="max-w-2xl font-display text-[14px] font-semibold uppercase tracking-[0.18em] text-white/55">
            Six core sectors · Hundreds of sites · One trusted service team
          </p>
        </FadeUp>
      </div>

      {/* Marquee */}
      <div className="mt-10">
        <Marquee
          items={items}
          renderItem={(name) => <IndustryPill name={name} />}
          speed={30}
          direction="left"
          gap={20}
          tone="dark"
        />
      </div>
    </section>
  );
}
