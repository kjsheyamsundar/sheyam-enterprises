import { MapPin, ExternalLink, Navigation, ArrowRight, Star } from 'lucide-react';

import { contactInfo } from '../../data/contact';
import { FadeUp } from '../animations/FadeUp';
import { SectionLabel } from '../ui/SectionLabel';
import { cn } from '../../utils/cn';

/**
 * Build a key-less iframe URL pinned to the precise lat/lng of the
 * Sheyam Enterprises shop (resolved from the user-provided Google Maps
 * short link). Including the company name in the query gives the marker
 * a labelled tooltip when the embed loads.
 */
function buildEmbedUrl({ location }) {
  // Plain `q=lat,lng` is the most reliable key-less embed format —
  // labelled card on top of the iframe gives the marker its identity.
  return `https://maps.google.com/maps?q=${location.lat},${location.lng}&z=17&output=embed`;
}

function buildDirectionsUrl(location) {
  // Driving directions URL that opens the exact pin in Maps app/web.
  return `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`;
}

export default function ContactMap() {
  const embedUrl = buildEmbedUrl(contactInfo);
  const placeUrl = contactInfo.location.shortUrl;
  const dirUrl   = buildDirectionsUrl(contactInfo.location);

  // Compact address for the floating card overlay
  const compactAddress =
    `${contactInfo.address.street.replace(/^No\.\s*/, '')}, ` +
    `${contactInfo.address.area}, ` +
    `${contactInfo.address.city}, ${contactInfo.address.state} ${contactInfo.address.pincode}`;

  return (
    <section className="bg-white" aria-label="Find us on the map">
      <div className="mx-auto max-w-7xl px-6 pb-20 md:pb-24">
        {/* Section header */}
        <FadeUp distance={20}>
          <SectionLabel text="Find Us At" />
          <h2 className="mt-3 font-display text-3xl font-black uppercase leading-tight tracking-tight md:text-4xl">
            <span className="text-navy">Sathuvachari, </span>
            <span className="text-red">Vellore.</span>
          </h2>
        </FadeUp>

        {/* Map card */}
        <FadeUp delay={0.1} distance={24} className="mt-6">
          <div className="overflow-hidden border border-off bg-white shadow-[0_18px_36px_-22px_rgba(9,9,15,0.18)]">
            {/* Map + overlay info card */}
            <div className="relative">
              <iframe
                src={embedUrl}
                title={`${contactInfo.company} — ${contactInfo.address.area}, ${contactInfo.address.city}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-[420px] w-full md:h-[480px]"
                allowFullScreen
              />

              {/* Floating info card */}
              <div
                className={cn(
                  'absolute left-4 top-4 max-w-[280px] sm:max-w-[320px]',
                  'bg-white border border-off',
                  'shadow-[0_10px_28px_-10px_rgba(9,9,15,0.28)]',
                  'rounded-none'
                )}
              >
                <div className="px-4 pb-3 pt-3.5">
                  {/* Title + actions */}
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-[13px] font-black uppercase tracking-tight text-navy">
                      {contactInfo.company}
                    </h3>
                    <div className="flex shrink-0 items-center gap-1.5">
                      <a
                        href={placeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Open in Google Maps"
                        className={cn(
                          'grid h-7 w-7 place-items-center border border-off bg-white text-muted',
                          'transition-colors hover:border-navy hover:text-navy',
                          'rounded-none'
                        )}
                      >
                        <ExternalLink size={13} strokeWidth={2.25} aria-hidden="true" />
                      </a>
                      <a
                        href={dirUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Get driving directions"
                        className={cn(
                          'grid h-7 w-7 place-items-center bg-red text-white',
                          'transition-all hover:bg-red2 hover:shadow-[0_6px_14px_-6px_rgba(204,17,17,0.6)]',
                          'rounded-none'
                        )}
                      >
                        <Navigation size={13} strokeWidth={2.5} aria-hidden="true" />
                      </a>
                    </div>
                  </div>

                  {/* Address */}
                  <p className="mt-2 font-body text-[12px] leading-snug text-slate">
                    {compactAddress}
                  </p>

                  {/* Rating row */}
                  <div className="mt-3 flex items-center gap-1.5 border-t border-off pt-2.5">
                    <Star
                      size={12}
                      strokeWidth={2}
                      fill="#f5b400"
                      stroke="#f5b400"
                      aria-hidden="true"
                    />
                    <span className="font-display text-[11px] font-bold tracking-wide text-ink">
                      5.0
                    </span>
                    <span className="font-body text-[11px] text-muted">
                      Local service team
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom directions strip */}
            <a
              href={dirUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'group flex items-center justify-between gap-4 border-t border-off bg-white px-5 py-4',
                'transition-colors hover:bg-off'
              )}
            >
              <span className="flex items-center gap-2.5 font-body text-[13px] text-ink">
                <span
                  className="grid h-7 w-7 place-items-center bg-red/10 text-red"
                  aria-hidden="true"
                >
                  <MapPin size={14} strokeWidth={2.5} />
                </span>
                <span>
                  Near PF Office, {contactInfo.address.city}, {contactInfo.address.state}, India
                </span>
              </span>
              <span className="inline-flex items-center gap-2 font-display text-[12px] font-bold uppercase tracking-[0.22em] text-red">
                Get Directions
                <ArrowRight
                  size={14}
                  strokeWidth={2.5}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
