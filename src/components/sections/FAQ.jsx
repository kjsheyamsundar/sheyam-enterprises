import * as Accordion from '@radix-ui/react-accordion';
import { Plus } from 'lucide-react';

import { FadeUp } from '../animations/FadeUp';
import { StaggerList } from '../animations/StaggerList';
import { SectionLabel } from '../ui/SectionLabel';
import { cn } from '../../utils/cn';

const FAQS = [
  {
    id: 'compressor-types',
    q: 'What types of air compressors do you offer?',
    a: "Screw, reciprocating, and oil-free compressors across capacities and configurations — sized to your duty cycle, footprint, and downstream load. We carry stationary and portable units from ELGi, Atlas Copco, Kaeser, Ingersoll Rand, CompAir, Chicago Pneumatic, MARK and Kirloskar.",
  },
  {
    id: 'on-site-services',
    q: 'Do you provide on-site services?',
    a: "Yes — installation, commissioning, scheduled servicing, breakdown calls, and overhauls are all delivered on your site. Our service van is stocked with calibrated tools and common consumables so most issues are resolved on the first visit.",
  },
  {
    id: 'warranty',
    q: 'What are your warranty terms?',
    a: "New equipment ships with the manufacturer's standard warranty (typically 12 months on compressors and gensets; 24 months on select brands). Our installation and commissioning are covered by a separate workmanship warranty. AMC contracts include parts coverage as specified in the SLA.",
  },
  {
    id: 'response-time',
    q: 'How quickly can you respond?',
    a: "AMC clients get priority response within hours across the Vellore region; non-AMC breakdown calls are typically attended the same business day. We operate a 24×7 service line on our primary number for urgent situations on critical sites.",
  },
  {
    id: 'genuine-parts',
    q: 'Do you supply genuine replacement parts?',
    a: "Every spare part we supply is sourced through OEM channels — filters, oils, valves, airends, alternators, AVRs and controllers. Each part is traceable to the manufacturer and ships with original documentation.",
  },
];

function FaqRow({ faq, index }) {
  return (
    <Accordion.Item
      value={faq.id}
      className={cn(
        'group border border-off bg-white transition-all duration-200',
        'data-[state=open]:border-red data-[state=open]:shadow-[0_18px_40px_-22px_rgba(9,9,15,0.25)]',
        'rounded-none'
      )}
    >
      <Accordion.Header className="m-0">
        <Accordion.Trigger className="flex w-full items-center gap-5 px-6 py-5 text-left md:gap-6 md:px-7 md:py-6">
          <span className="font-display text-[12px] font-bold uppercase tracking-[0.22em] text-red">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="flex-1 font-display text-lg font-black uppercase tracking-tight text-navy md:text-xl">
            {faq.q}
          </span>
          <span
            className={cn(
              'shrink-0 transition-transform duration-300 ease-out',
              'group-data-[state=open]:rotate-45'
            )}
            aria-hidden="true"
          >
            <span className="grid h-9 w-9 place-items-center border border-navy/15 bg-white text-navy transition-colors group-data-[state=open]:border-red group-data-[state=open]:bg-red group-data-[state=open]:text-white">
              <Plus size={16} strokeWidth={2.5} />
            </span>
          </span>
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content
        className={cn(
          'overflow-hidden',
          'data-[state=open]:animate-[accordion-down_220ms_ease-out]',
          'data-[state=closed]:animate-[accordion-up_180ms_ease-out]'
        )}
      >
        <div className="border-t border-off px-6 py-5 md:px-7 md:py-6">
          <p className="max-w-3xl font-body text-[14.5px] leading-relaxed text-slate md:text-[15px]">
            {faq.a}
          </p>
        </div>
      </Accordion.Content>
    </Accordion.Item>
  );
}

export default function FAQ() {
  return (
    <section className="bg-white py-20 md:py-24" aria-label="Frequently asked questions">
      <div className="mx-auto max-w-7xl px-6">
        <FadeUp distance={20}>
          <SectionLabel text="Need More Detail?" />
        </FadeUp>

        <FadeUp delay={0.05} distance={28} className="mt-4">
          <h2 className="font-display font-black uppercase leading-[0.95] tracking-tight">
            <span className="block text-4xl text-navy md:text-5xl lg:text-[60px]">
              Frequently
            </span>
            <span className="mt-1 block text-4xl text-red md:text-5xl lg:text-[60px]">
              Asked Questions.
            </span>
          </h2>
        </FadeUp>

        <div className="mt-12">
          <Accordion.Root type="single" collapsible className="flex flex-col gap-3">
            <StaggerList staggerDelay={0.06} distance={16} className="flex flex-col gap-3">
              {FAQS.map((f, i) => (
                <FaqRow key={f.id} faq={f} index={i} />
              ))}
            </StaggerList>
          </Accordion.Root>
        </div>
      </div>
    </section>
  );
}
