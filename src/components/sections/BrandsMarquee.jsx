import { useState } from 'react';

import { brands } from '../../data/brands';
import { Marquee } from '../animations/Marquee';
import { FadeUp } from '../animations/FadeUp';
import { SectionLabel } from '../ui/SectionLabel';
import { cn } from '../../utils/cn';

/**
 * Single marquee item. If the brand has a `logo` path AND the image
 * loads successfully, the logo is shown. Otherwise we fall back to the
 * brand name in bold caps — so the marquee keeps working even before
 * the logo files land on disk.
 */
function BrandCard({ brand }) {
  const [logoFailed, setLogoFailed] = useState(false);
  const showLogo = brand.logo && !logoFailed;

  return (
    <div
      className={cn(
        'flex h-24 min-w-[220px] items-center justify-center bg-white px-8',
        'shadow-[0_6px_24px_-12px_rgba(0,0,0,0.45)]',
        'transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_18px_36px_-12px_rgba(204,17,17,0.45)]',
        'rounded-none'
      )}
    >
      {showLogo ? (
        <img
          src={brand.logo}
          alt={brand.name}
          loading="lazy"
          onError={() => setLogoFailed(true)}
          className="h-14 max-w-[180px] object-contain"
        />
      ) : (
        <div className="flex flex-col items-center justify-center gap-1">
          <span className="font-display text-[18px] font-black uppercase tracking-wide text-white">
            {brand.name}
          </span>
          <span className="font-display text-[9px] font-bold uppercase tracking-[0.25em] text-white/45">
            {brand.category}
          </span>
        </div>
      )}
    </div>
  );
}

export default function BrandsMarquee() {
  return (
    <section
      className="relative isolate overflow-hidden bg-ink py-16 text-white md:py-20"
      aria-label="Brands we service"
    >
      {/* Header */}
      <div className="mx-auto max-w-7xl px-6">
        <FadeUp distance={20}>
          <SectionLabel text="Brands We Service" />
        </FadeUp>

      </div>

      {/* Marquee */}
      <div className="mt-10">
        <Marquee
          items={brands}
          renderItem={(b) => <BrandCard brand={b} />}
          speed={35}
          direction="left"
          gap={20}
          pauseOnHover
          tone="dark"
        />
      </div>
    </section>
  );
}
