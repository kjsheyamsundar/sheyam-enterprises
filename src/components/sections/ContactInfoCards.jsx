import { MapPin, Phone, Mail, Globe, Clock, ArrowRight } from 'lucide-react';

import { contactInfo } from '../../data/contact';
import { FadeUp } from '../animations/FadeUp';
import { StaggerList } from '../animations/StaggerList';
import { SectionLabel } from '../ui/SectionLabel';
import { cn } from '../../utils/cn';

function parseMdLink(value) {
  if (!value) return { text: '', href: '' };
  const m = value.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
  return m ? { text: m[1], href: m[2] } : { text: value, href: value };
}

function ContactCard({ icon: Icon, label, children, hrefList }) {
  return (
    <div
      className={cn(
        'group relative flex gap-5 border border-off bg-white p-5 md:p-6',
        'border-l-[6px] border-l-red',
        'transition-all duration-300 ease-out',
        'hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-22px_rgba(9,9,15,0.22)]',
        'rounded-none'
      )}
    >
      <span className="grid h-11 w-11 shrink-0 place-items-center bg-red/10 text-red transition-colors duration-200 group-hover:bg-red group-hover:text-white">
        <Icon size={18} strokeWidth={2.25} aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <span className="font-display text-[10px] font-bold uppercase tracking-[0.3em] text-muted">
          {label}
        </span>
        <div className="mt-1.5 font-body text-[14px] leading-relaxed text-ink">
          {children}
        </div>
      </div>
      {hrefList && hrefList.length === 1 && (
        <ArrowRight
          size={16}
          strokeWidth={2.5}
          className="self-center text-muted transition-all duration-200 group-hover:translate-x-1 group-hover:text-red"
          aria-hidden="true"
        />
      )}
    </div>
  );
}

export default function ContactInfoCards() {
  const email   = parseMdLink(contactInfo.email);
  const website = parseMdLink(contactInfo.website);

  return (
    <div className="flex flex-col gap-5">
      <FadeUp distance={20}>
        <SectionLabel text="Reach Us Directly" />
      </FadeUp>

      <FadeUp delay={0.05} distance={28}>
        <h2 className="font-display font-black uppercase leading-[0.95] tracking-tight">
          <span className="block text-3xl text-navy md:text-4xl lg:text-[44px]">
            Get In
          </span>
          <span className="mt-1 block text-3xl text-red md:text-4xl lg:text-[44px]">
            Touch.
          </span>
        </h2>
      </FadeUp>

      <FadeUp delay={0.1} distance={20}>
        <p className="font-body text-[14.5px] leading-relaxed text-slate">
          Sales enquiries, breakdown calls, AMC quotes, parts orders — pick
          whichever channel works for you. Our team responds the same business
          day.
        </p>
      </FadeUp>

      <StaggerList className="mt-2 flex flex-col gap-4" staggerDelay={0.08} distance={16}>
        {/* Address */}
        <ContactCard icon={MapPin} label="Visit Us">
          <address className="not-italic">
            {contactInfo.address.street},<br />
            {contactInfo.address.area},<br />
            {contactInfo.address.city} – {contactInfo.address.pincode},<br />
            {contactInfo.address.state}.
          </address>
        </ContactCard>

        {/* Phones */}
        <ContactCard icon={Phone} label="Call Us">
          <ul className="flex flex-col gap-1">
            {contactInfo.phones.map((num, i) => (
              <li key={num}>
                <a
                  href={`tel:+91${num}`}
                  className="inline-flex items-center gap-3 transition-colors hover:text-red"
                >
                  <span className="font-display text-[10px] font-bold uppercase tracking-[0.22em] text-muted">
                    Line {i + 1}
                  </span>
                  <span className="font-display text-base font-bold text-ink">
                    +91 {num}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </ContactCard>

        {/* Email — render every entry in contactInfo.emails (falls back to
            the primary legacy field if the array is missing). */}
        <ContactCard icon={Mail} label="Email">
          <ul className="flex flex-col gap-1">
            {(contactInfo.emails ?? [email.text]).map((addr) => (
              <li key={addr}>
                <a
                  href={`mailto:${addr}`}
                  className="break-all transition-colors hover:text-red"
                >
                  {addr}
                </a>
              </li>
            ))}
          </ul>
        </ContactCard>

        {/* Website */}
        <ContactCard icon={Globe} label="Website" hrefList={[website.href]}>
          <a
            href={website.href}
            target="_blank"
            rel="noopener noreferrer"
            className="break-all transition-colors hover:text-red"
          >
            {website.text}
          </a>
        </ContactCard>

        {/* Hours */}
        <ContactCard icon={Clock} label="Working Hours">
          <div>
            <div>{contactInfo.hours.weekdays}</div>
            <div className="mt-0.5 text-muted">Sunday: {contactInfo.hours.sunday}</div>
          </div>
        </ContactCard>
      </StaggerList>
    </div>
  );
}
