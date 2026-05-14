import {
  Check,
  MapPin,
  CalendarDays,
  ShieldCheck,
  Users2,
  Award,
  Headset,
} from 'lucide-react';

import PageHero from '../components/sections/PageHero';
import SEO from '../components/SEO';
import { FadeUp } from '../components/animations/FadeUp';
import { StaggerList } from '../components/animations/StaggerList';
import { Counter } from '../components/animations/Counter';
import { SectionLabel } from '../components/ui/SectionLabel';
import { Card } from '../components/ui/Card';
import { NumberedItem } from '../components/ui/NumberedItem';
import { contactInfo, stats } from '../data/contact';
import {
  buildBreadcrumbSchema,
  buildLocalBusinessSchema,
} from '../utils/schema';
import { cn } from '../utils/cn';

/* ──────────────────────────────────────────────────────────────────
   STORY SECTION
   ────────────────────────────────────────────────────────────────── */
function StorySection() {
  const metrics = [
    { value: '25+',   label: 'Years',    icon: CalendarDays },
    { value: '500+',  label: 'Clients',  icon: Users2       },
    { value: '16+',   label: 'Brands',   icon: Award        },
    { value: '24/7',  label: 'Support',  icon: Headset      },
  ];

  return (
    <section className="bg-white py-20 md:py-24" aria-label="Our Story">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left — copy */}
          <div className="lg:col-span-7">
            <FadeUp distance={20}>
              <SectionLabel text="Our Story" />
            </FadeUp>

            <FadeUp delay={0.05} distance={28} className="mt-4">
              <h2 className="font-display font-black uppercase leading-[0.95] tracking-tight">
                <span className="block text-5xl text-navy md:text-6xl lg:text-[72px]">
                  Our
                </span>
                <span className="mt-1 block text-5xl text-red md:text-6xl lg:text-[72px]">
                  Story.
                </span>
              </h2>
            </FadeUp>

            <FadeUp delay={0.1} distance={20} className="mt-6 space-y-4">
              <p className="max-w-2xl font-body text-[15px] leading-relaxed text-slate md:text-base">
                Sheyam Enterprises is Vellore's most trusted name for industrial
                air compressors and diesel generators. Founded in 2011 and led
                by a specialist with over 25 years of hands-on industry
                experience, we serve businesses across Tamil Nadu with sales,
                service, spare parts, hiring, and annual maintenance contracts.
              </p>
              <p className="max-w-2xl font-body text-[15px] leading-relaxed text-slate md:text-base">
                Our team works directly with manufacturing plants, hospitals,
                construction sites, food &amp; pharma units, and commercial
                operations — every customer backed by genuine OEM parts,
                certified technicians, and a 24×7 service line.
              </p>
            </FadeUp>
          </div>

          {/* Right — dark navy card */}
          <div className="lg:col-span-5">
            <FadeUp delay={0.15} distance={28}>
              <div className="relative isolate overflow-hidden bg-navy p-8 text-white md:p-10">
                {/* Accent bar */}
                <span className="absolute left-0 top-0 h-full w-1.5 bg-red" aria-hidden="true" />
                {/* Subtle grid */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-60"
                  style={{
                    backgroundImage: `
                      repeating-linear-gradient(0deg,  rgba(255,255,255,0.04) 0 1px, transparent 1px 32px),
                      repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0 1px, transparent 1px 32px)
                    `,
                  }}
                  aria-hidden="true"
                />

                <div className="relative z-10">
                  <span className="font-display text-[14px] font-black uppercase tracking-[0.3em] text-red2">
                    Established Business
                  </span>
                  <h3 className="mt-3 font-display text-3xl font-black uppercase leading-[0.95] tracking-tight md:text-[40px]">
                    Sheyam Enterprises
                  </h3>

                  <ul className="mt-6 space-y-2 font-body text-[13.5px] text-white/75">
                    <li className="flex items-start gap-2.5">
                      <CalendarDays size={15} strokeWidth={2.25} className="mt-0.5 shrink-0 text-red" aria-hidden="true" />
                      <span>
                        <span className="font-semibold text-white">Founded:</span> Serving Vellore since 2011
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <MapPin size={15} strokeWidth={2.25} className="mt-0.5 shrink-0 text-red" aria-hidden="true" />
                      <span>
                        <span className="font-semibold text-white">Located:</span>{' '}
                        {contactInfo.address.city} – {contactInfo.address.pincode}, {contactInfo.address.state}
                      </span>
                    </li>
                  </ul>

                  {/* 2x2 metric grid */}
                  <div className="mt-7 grid grid-cols-2 divide-x divide-y divide-white/10 border border-white/10">
                    {metrics.map((m) => {
                      const Icon = m.icon;
                      return (
                        <div key={m.label} className="flex flex-col items-start gap-2 p-5">
                          <Icon size={18} strokeWidth={2.25} className="text-red" aria-hidden="true" />
                          <span className="font-display text-3xl font-black leading-none text-white md:text-4xl">
                            {m.value}
                          </span>
                          <span className="font-display text-[10px] font-bold uppercase tracking-[0.22em] text-white/50">
                            {m.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────
   MISSION & VISION SECTION
   ────────────────────────────────────────────────────────────────── */
function MissionVisionSection() {
  const mission = {
    title: 'Mission',
    body:
      'To be the most reliable single-source provider for industrial air compressors and diesel generators across Tamil Nadu — backed by genuine OEM parts, professional service, and predictable AMCs.',
    points: [
      'Genuine OEM spares with manufacturer documentation',
      'Same-day breakdown response across Tamil Nadu',
      'Transparent quotes and AMC pricing',
      'Quarterly performance reviews',
    ],
    accent: 'navy',
  };

  const vision = {
    title: 'Vision',
    body:
      "To set the benchmark for industrial equipment service in South India — every customer's site running at peak uptime, every technician trained to OEM standards, every contract honoured to the letter.",
    points: [
      'Zero unplanned downtime for AMC clients',
      'Class-0 oil-free air for pharma and food lines',
      'CPCB-IV+ compliant gensets across our fleet',
      '24×7 service coverage across Tamil Nadu',
    ],
    accent: 'red',
  };

  return (
    <section className="bg-off py-20 md:py-24" aria-label="Mission and Vision">
      <div className="mx-auto max-w-7xl px-6">
        <FadeUp distance={20}>
          <SectionLabel text="What Drives Us" />
        </FadeUp>

        <FadeUp delay={0.05} distance={28} className="mt-4">
          <h2 className="font-display font-black uppercase leading-[0.95] tracking-tight">
            <span className="block text-4xl text-navy md:text-5xl lg:text-[60px]">
              Mission
            </span>
            <span className="mt-1 block text-4xl text-red md:text-5xl lg:text-[60px]">
              &amp; Vision.
            </span>
          </h2>
        </FadeUp>

        <StaggerList
          className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2"
          staggerDelay={0.1}
          distance={24}
        >
          {[mission, vision].map((card) => (
            <Card
              key={card.title}
              tone="light"
              topAccent={card.accent}
              hoverBorder={card.accent}
              className="flex flex-col p-8 md:p-10"
            >
              <span
                className={cn(
                  'font-display text-[11px] font-bold uppercase tracking-[0.3em]',
                  card.accent === 'red' ? 'text-red' : 'text-navy'
                )}
              >
                Our {card.title}
              </span>
              <h3 className="mt-3 font-display text-3xl font-black uppercase leading-tight tracking-tight text-ink md:text-4xl">
                {card.title}.
              </h3>
              <p className="mt-4 font-body text-[14.5px] leading-relaxed text-slate">
                {card.body}
              </p>

              <ul className="mt-6 space-y-3 border-t border-off pt-6">
                {card.points.map((p) => (
                  <li key={p} className="flex items-start gap-3 font-body text-[14px] text-ink">
                    <span
                      className={cn(
                        'mt-0.5 grid h-5 w-5 shrink-0 place-items-center text-white',
                        card.accent === 'red' ? 'bg-red' : 'bg-navy'
                      )}
                      aria-hidden="true"
                    >
                      <Check size={12} strokeWidth={3} />
                    </span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </StaggerList>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────
   WHY CHOOSE US SECTION
   ────────────────────────────────────────────────────────────────── */
const REASONS = [
  {
    number: '01',
    label: 'Genuine OEM Parts',
    title: 'Genuine OEM Parts',
    description:
      "Direct supply of original spares — filters, oils, valves, airends, alternators, AVRs and controllers — sourced through manufacturer channels. Every part traceable, every fitment correct.",
  },
  {
    number: '02',
    label: 'Certified Technicians',
    title: 'Certified Technicians',
    description:
      'Factory-trained service team with calibrated tooling and OEM service kits. Every visit closes with a detailed service report and the next maintenance window scheduled.',
  },
  {
    number: '03',
    label: 'Fast Response',
    title: 'Fast Response',
    description:
      '24×7 breakdown response across the Vellore region with a stocked service van and same-day dispatch on common consumables. Downtime measured in hours, not days.',
  },
  {
    number: '04',
    label: 'AMC Packages',
    title: 'AMC Packages',
    description:
      'Comprehensive and non-comprehensive AMCs tailored to your fleet — scheduled visits, priority breakdown response, parts coverage, and quarterly performance reviews.',
  },
];

const darkGridStyle = {
  backgroundImage: `
    repeating-linear-gradient(0deg,  rgba(255,255,255,0.025) 0 1px, transparent 1px 40px),
    repeating-linear-gradient(90deg, rgba(255,255,255,0.025) 0 1px, transparent 1px 40px)
  `,
};

function WhyChooseUsSection() {
  return (
    <section
      className="relative isolate overflow-hidden bg-ink py-20 text-white md:py-24"
      aria-label="Why choose us"
    >
      <div className="pointer-events-none absolute inset-0" style={darkGridStyle} aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <FadeUp distance={20}>
          <SectionLabel text="Why Choose Us" tone="white" />
        </FadeUp>

        <FadeUp delay={0.05} distance={28} className="mt-4">
          <h2 className="font-display font-black uppercase leading-[0.95] tracking-tight">
            <span className="block text-4xl text-white md:text-5xl lg:text-[60px]">
              Engineered for
            </span>
            <span className="mt-1 block text-4xl text-red md:text-5xl lg:text-[60px]">
              Operations Where Downtime Isn't An Option.
            </span>
          </h2>
        </FadeUp>

        <FadeUp delay={0.1} distance={20} className="mt-5">
          <p className="max-w-2xl font-body text-[15px] leading-relaxed text-white/65 md:text-base">
            Four reasons our customers stay with us — across years, across
            equipment refreshes, across plant expansions.
          </p>
        </FadeUp>

        <StaggerList
          className="mt-12 flex flex-col"
          staggerDelay={0.07}
          distance={20}
        >
          {REASONS.map((r, i) => (
            <NumberedItem
              key={r.number}
              number={r.number}
              label={r.label.toUpperCase()}
              title={r.title}
              description={r.description}
              alt={i % 2 === 1}
              tone="dark"
              icon={<ShieldCheck size={22} strokeWidth={2.25} aria-hidden="true" />}
            />
          ))}
        </StaggerList>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────
   STATS COUNTERS SECTION
   ────────────────────────────────────────────────────────────────── */
function StatsSection() {
  return (
    <section className="bg-white py-16 md:py-20" aria-label="Company stats">
      <div className="mx-auto max-w-7xl px-6">
        <FadeUp distance={20}>
          <div className="border border-off bg-off">
            <ul className="grid grid-cols-2 divide-y divide-off bg-white md:grid-cols-4 md:divide-x md:divide-y-0">
              {stats.map((s) => (
                <li key={s.label} className="px-6 py-10 text-center md:px-8">
                  <div className="font-display text-5xl font-black leading-none text-navy md:text-6xl">
                    <Counter value={s.value} suffix={s.suffix} duration={2} />
                  </div>
                  <div className="mt-3 font-display text-[11px] font-bold uppercase tracking-[0.25em] text-muted">
                    {s.label}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────
   ABOUT — root export
   ────────────────────────────────────────────────────────────────── */
export default function About() {
  const crumbs = [
    { label: 'Home',  to: '/' },
    { label: 'About', to: '/about' },
  ];

  const schema = [
    buildLocalBusinessSchema(contactInfo),
    buildBreadcrumbSchema(crumbs),
  ];

  return (
    <>
      <SEO
        title="About Sheyam Enterprises | 25+ Years Air Compressor Experts Vellore"
        description="Trusted compressor and generator specialist in Vellore since 2011. 25+ years of industry expertise from our founder, 500+ clients served, 16+ brands across sales, service, parts, hiring and AMC."
        keywords="about sheyam enterprises, vellore compressor company, generator service tamil nadu, industrial equipment vellore"
        path="/about"
        schema={schema}
      />

      <PageHero
        pageNumber="02"
        label="About"
        title="About Sheyam Enterprises"
        crumbs={crumbs}
      />

      <StorySection />
      <MissionVisionSection />
      <WhyChooseUsSection />
      <StatsSection />
    </>
  );
}
