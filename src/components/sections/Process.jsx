import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  MessageSquare,
  ClipboardList,
  Wrench,
  HeartHandshake,
} from 'lucide-react';

import { FadeUp } from '../animations/FadeUp';
import { StaggerList } from '../animations/StaggerList';
import { SectionLabel } from '../ui/SectionLabel';
import { cn } from '../../utils/cn';

const STEPS = [
  {
    n: '01',
    title: 'Consultation',
    body: "We visit your site, audit existing equipment, and map your duty cycle, footprint, and load profile.",
    icon: MessageSquare,
  },
  {
    n: '02',
    title: 'Planning',
    body: 'We size the right unit, prepare a transparent quote, and align delivery with your downtime window.',
    icon: ClipboardList,
  },
  {
    n: '03',
    title: 'Execution',
    body: 'Certified technicians deliver, install, commission, and load-test on-site — start to finish.',
    icon: Wrench,
  },
  {
    n: '04',
    title: 'Support',
    body: 'AMC coverage, scheduled servicing, priority breakdown response, and quarterly performance reviews.',
    icon: HeartHandshake,
  },
];

/* Step card */
function StepCard({ step }) {
  const Icon = step.icon;
  return (
    <div className="relative flex h-full flex-col border border-off bg-white p-6 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-red hover:shadow-[0_24px_48px_-20px_rgba(9,9,15,0.18)]">
      {/* Step number tile */}
      <div className="flex items-center gap-3">
        <span className="grid h-12 w-12 place-items-center bg-navy text-white">
          <Icon size={20} strokeWidth={2.25} aria-hidden="true" />
        </span>
        <span className="font-display text-3xl font-black leading-none text-red">
          {step.n}
          <span className="text-muted"> /</span>
        </span>
      </div>

      <h3 className="mt-5 font-display text-2xl font-black uppercase leading-tight tracking-tight text-navy">
        {step.title}
      </h3>
      <p className="mt-2 font-body text-[14px] leading-relaxed text-slate">
        {step.body}
      </p>
    </div>
  );
}

/* Animated connector line — drawn on scroll into view */
function ConnectorLine() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <svg
      ref={ref}
      className="pointer-events-none absolute left-0 right-0 top-[68px] z-0 hidden h-2 w-full lg:block"
      viewBox="0 0 100 1"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/* Background line */}
      <line x1="2" y1="0.5" x2="98" y2="0.5" stroke="#E5E7EB" strokeWidth="0.6" strokeLinecap="round" />
      {/* Animated red line */}
      <motion.line
        x1="2"
        y1="0.5"
        x2="98"
        y2="0.5"
        stroke="#CC1111"
        strokeWidth="0.8"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}

export default function Process() {
  return (
    <section className="bg-off py-20 md:py-24" aria-label="How we work">
      <div className="mx-auto max-w-7xl px-6">
        <FadeUp distance={20}>
          <SectionLabel text="How We Work" />
        </FadeUp>

        <FadeUp delay={0.05} distance={28} className="mt-4">
          <h2 className="font-display font-black uppercase leading-[0.95] tracking-tight">
            <span className="block text-4xl text-navy md:text-5xl lg:text-[60px]">
              Four Steps,
            </span>
            <span className="mt-1 block text-4xl text-red md:text-5xl lg:text-[60px]">
              No Surprises.
            </span>
          </h2>
        </FadeUp>

        <FadeUp delay={0.1} distance={20} className="mt-5">
          <p className="max-w-2xl font-body text-[15px] leading-relaxed text-slate md:text-base">
            From the first site visit to long-term support — every engagement
            follows the same predictable rhythm.
          </p>
        </FadeUp>

        {/* Steps grid + animated connector */}
        <div className="relative mt-14">
          <ConnectorLine />

          <StaggerList
            className="relative z-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
            staggerDelay={0.12}
            distance={28}
          >
            {STEPS.map((s) => (
              <StepCard key={s.n} step={s} />
            ))}
          </StaggerList>
        </div>
      </div>
    </section>
  );
}
