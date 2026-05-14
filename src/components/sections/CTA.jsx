import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';

import { contactInfo } from '../../data/contact';
import { FadeUp } from '../animations/FadeUp';
import { SectionLabel } from '../ui/SectionLabel';
import { cn } from '../../utils/cn';

export default function CTA() {
  // CTA button explicitly uses the third number (8098093737) per request.
  const firstPhone = contactInfo.phones[2];

  return (
    <section
      className="relative isolate overflow-hidden bg-navy py-20 text-white md:py-24"
      aria-label="Ready to power your operations"
    >
      {/* Subtle grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg,  rgba(255,255,255,0.04) 0 1px, transparent 1px 40px),
            repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0 1px, transparent 1px 40px)
          `,
        }}
        aria-hidden="true"
      />

      {/* Red glow */}
      <div
        className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-red/15 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <FadeUp distance={20}>
          <SectionLabel text="Get In Touch" tone="white" className="justify-center" />
        </FadeUp>

        <FadeUp delay={0.05} distance={28} className="mt-5">
          <h2 className="font-display font-black uppercase leading-[0.95] tracking-tight">
            <span className="block text-4xl text-white md:text-5xl lg:text-[64px]">
              Ready to Power Your
            </span>
            <span className="mt-1 block text-4xl text-red md:text-5xl lg:text-[64px]">
              Operations?
            </span>
          </h2>
        </FadeUp>

        <FadeUp delay={0.1} distance={20} className="mt-6">
          <p className="mx-auto max-w-2xl font-body text-[15px] leading-relaxed text-white/70 md:text-base">
            Talk to our specialists about sales, servicing, spares, hiring or
            an Annual Maintenance Contract. We'll size the right solution for
            your site and get you a free quote — fast.
          </p>
        </FadeUp>

        <FadeUp delay={0.2} distance={16} className="mt-9">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/contact"
              className={cn(
                'group inline-flex h-12 items-center justify-center gap-2 bg-red px-7',
                'font-display text-[12px] font-bold uppercase tracking-[0.22em] text-white',
                'transition-all duration-200 ease-out',
                'hover:-translate-y-0.5 hover:bg-red2 hover:shadow-[0_14px_30px_-10px_rgba(204,17,17,0.65)]',
                'rounded-none'
              )}
            >
              Get Free Quote
              <ArrowRight
                size={16}
                strokeWidth={2.5}
                className="transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>

            <a
              href={`tel:+91${firstPhone}`}
              className={cn(
                'group inline-flex h-12 items-center justify-center gap-2 border border-white/30 px-7',
                'font-display text-[12px] font-bold uppercase tracking-[0.22em] text-white',
                'transition-all duration-200 ease-out',
                'hover:-translate-y-0.5 hover:border-white hover:bg-white/[0.06]',
                'rounded-none'
              )}
            >
              <Phone size={15} strokeWidth={2.5} aria-hidden="true" />
              Call Now · {firstPhone}
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
