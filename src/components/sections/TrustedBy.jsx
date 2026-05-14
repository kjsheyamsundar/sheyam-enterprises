import { Marquee } from '../animations/Marquee';
import { FadeUp } from '../animations/FadeUp';
import { SectionLabel } from '../ui/SectionLabel';
import { cn } from '../../utils/cn';

const ROW_1 = [
  'Thirumalai Chemicals', 'ICE Steel', 'BHEL', 'Fedders Lloyd', 'Acoustics India',
  'KPA Precision', 'Vellore Industries', 'Ranipet SIPCOT', 'Chennai Auto Parts',
  'Tiruppur Textiles',
];

const ROW_2 = [
  'ELGi Equipment', 'Atlas Copco Equipment', 'Kaeser Compressors', 'Cummins Generators',
  'CAT Equipment', 'Hitachi Products', 'Greaves Power', 'Kirloskar Systems',
  'CompAir Solutions',
];

const ROW_3 = [
  'Manufacturing', 'Construction', 'Food & Pharma', 'Hospitals', 'Agriculture',
  'Retail', 'Government', 'Textile Mills', 'Auto Components', 'Cold Storage',
];

/* ──────────────────────────────────────────────────────────────────
   Pill — single marquee item
   ────────────────────────────────────────────────────────────────── */
function Pill({ label, dot, color = 'white' }) {
  // color → text + opacity
  const COLOR = {
    white:  'text-white/80',
    red:    'text-red',
    muted:  'text-white/40',
  };
  const DOT = {
    white:  'bg-white/70',
    red:    'bg-red',
    muted:  'bg-white/40',
  };

  return (
    <div
      className={cn(
        'flex items-center gap-3 border border-white/10 bg-white/[0.03] px-5 py-3',
        'font-display text-[12px] font-bold uppercase tracking-[0.22em]',
        'rounded-none',
        COLOR[color]
      )}
    >
      {dot && (
        <span className={cn('block h-1.5 w-1.5 rounded-full', DOT[color])} aria-hidden="true" />
      )}
      <span>{label}</span>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   Row wrapper
   ────────────────────────────────────────────────────────────────── */
function TrustRow({ items, direction, seconds, color, label }) {
  return (
    <div className="space-y-3">
      <div className="mx-auto max-w-7xl px-6">
        <span className="font-display text-[10px] font-bold uppercase tracking-[0.3em] text-white/35">
          {label}
        </span>
      </div>
      <Marquee
        items={items}
        renderItem={(item) => <Pill label={item} dot color={color} />}
        speed={seconds}
        direction={direction}
        gap={16}
        tone="dark"
      />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   TRUSTED BY — root
   ────────────────────────────────────────────────────────────────── */
const gridStyle = {
  backgroundImage: `
    repeating-linear-gradient(0deg,  rgba(255,255,255,0.025) 0 1px, transparent 1px 40px),
    repeating-linear-gradient(90deg, rgba(255,255,255,0.025) 0 1px, transparent 1px 40px)
  `,
};

export default function TrustedBy() {
  return (
    <section
      className="relative isolate overflow-hidden bg-ink py-20 text-white md:py-24"
      aria-label="Trusted by industry leaders"
    >
      {/* Grid overlay */}
      <div className="pointer-events-none absolute inset-0" style={gridStyle} aria-hidden="true" />

      {/* Header */}
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <FadeUp distance={20}>
          <SectionLabel text="Trusted Across Tamil Nadu" />
        </FadeUp>

        <FadeUp delay={0.05} distance={28} className="mt-4">
          <h2 className="font-display font-black uppercase leading-[0.95] tracking-tight">
            <span className="block text-4xl text-white md:text-5xl lg:text-[60px]">
              Trusted By
            </span>
            <span className="mt-1 block text-4xl text-red md:text-5xl lg:text-[60px]">
              Industry Leaders.
            </span>
          </h2>
        </FadeUp>

        <FadeUp delay={0.1} distance={20} className="mt-5">
          <p className="max-w-2xl font-body text-[15px] leading-relaxed text-white/65 md:text-base">
            From manufacturing plants and pharma units to hospitals, data
            centres and infrastructure projects — our equipment runs on the
            sites that can't afford to go down.
          </p>
        </FadeUp>
      </div>

      {/* Marquee rows — client-names row was removed; we now lead with
          brand coverage, then the sectors we serve. */}
      <div className="relative z-10 mt-12 flex flex-col gap-8">
        <TrustRow
          items={ROW_2}
          direction="right"
          seconds={25}
          color="red"
          label="Brands We Service"
        />
        <TrustRow
          items={ROW_3}
          direction="left"
          seconds={40}
          color="muted"
          label="Sectors We Serve"
        />
      </div>
    </section>
  );
}
