import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';

import { contactInfo } from '../../data/contact';
import { FadeUp } from '../animations/FadeUp';
import { SectionLabel } from '../ui/SectionLabel';
import { cn } from '../../utils/cn';

const gridStyle = {
  backgroundImage: `
    repeating-linear-gradient(0deg,  rgba(255,255,255,0.025) 0 1px, transparent 1px 40px),
    repeating-linear-gradient(90deg, rgba(255,255,255,0.025) 0 1px, transparent 1px 40px)
  `,
};

export default function ServicesCTA() {
  return (
    <section
      className="relative isolate overflow-hidden bg-ink py-20 text-white md:py-24"
      aria-label="Need a service"
    >
      <div className="pointer-events-none absolute inset-0" style={gridStyle} aria-hidden="true" />
      <div
        className="pointer-events-none absolute -bottom-32 -left-32 h-[450px] w-[450px] rounded-full bg-red/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          {/* Left — copy */}
          <div className="lg:col-span-7">
            <FadeUp distance={20}>
              <SectionLabel text="Talk To A Specialist" tone="white" />
            </FadeUp>

            <FadeUp delay={0.05} distance={28} className="mt-4">
              <h2 className="font-display font-black uppercase leading-[0.95] tracking-tight">
                <span className="block text-4xl text-white md:text-5xl lg:text-[60px]">
                  Need a
                </span>
                <span className="mt-1 block text-4xl text-red md:text-5xl lg:text-[60px]">
                  Service?
                </span>
              </h2>
            </FadeUp>

            <FadeUp delay={0.1} distance={20} className="mt-6">
              <p className="max-w-xl font-body text-[15px] leading-relaxed text-white/65 md:text-base">
                Breakdown call, scheduled service, or a one-off site audit —
                pick up any of the numbers below or send us an enquiry. We'll
                get a technician on the line in minutes.
              </p>
            </FadeUp>

            <FadeUp delay={0.2} distance={16} className="mt-8">
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to="/contact"
                  className={cn(
                    'group inline-flex h-12 items-center justify-center gap-2 bg-red px-6',
                    'font-display text-[12px] font-bold uppercase tracking-[0.22em] text-white',
                    'transition-all duration-200 ease-out',
                    'hover:-translate-y-0.5 hover:bg-red2 hover:shadow-[0_14px_30px_-10px_rgba(204,17,17,0.65)]',
                    'rounded-none'
                  )}
                >
                  Send Enquiry
                  <ArrowRight
                    size={16}
                    strokeWidth={2.5}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </FadeUp>
          </div>

          {/* Right — phone numbers card */}
          <div className="lg:col-span-5">
            <FadeUp delay={0.15} distance={28}>
              <div className="border border-white/10 bg-white/[0.04] backdrop-blur-sm">
                <div className="border-b border-white/10 bg-white/[0.03] px-6 py-4">
                  <span className="font-display text-[10px] font-bold uppercase tracking-[0.3em] text-red">
                    24×7 Service Line
                  </span>
                  <h3 className="mt-1 font-display text-xl font-black uppercase tracking-tight text-white">
                    Call Us Directly
                  </h3>
                </div>
                <ul className="divide-y divide-white/10">
                  {contactInfo.phones.map((num, i) => (
                    <li key={num}>
                      <a
                        href={`tel:+91${num}`}
                        className="group flex items-center gap-4 px-6 py-4 transition-colors hover:bg-white/[0.04]"
                      >
                        <span className="grid h-10 w-10 place-items-center border border-white/15 bg-white/[0.03] text-red transition-colors group-hover:border-red group-hover:bg-red group-hover:text-white">
                          <Phone size={15} strokeWidth={2.5} aria-hidden="true" />
                        </span>
                        <div className="flex-1">
                          <div className="font-display text-[10px] font-bold uppercase tracking-[0.22em] text-white/45">
                            Line {i + 1}
                          </div>
                          <div className="font-display text-lg font-black tracking-wide text-white">
                            +91 {num}
                          </div>
                        </div>
                        <ArrowRight
                          size={16}
                          strokeWidth={2.5}
                          className="text-white/35 transition-all duration-200 group-hover:translate-x-1 group-hover:text-red"
                          aria-hidden="true"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
