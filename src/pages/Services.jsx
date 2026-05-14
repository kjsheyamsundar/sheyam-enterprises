import { Link } from 'react-router-dom';
import { Globe } from 'lucide-react';

import {
  PageHero,
  ServicesList,
  Process,
  FAQ,
  ServicesCTA,
} from '../components/sections';
import SEO from '../components/SEO';
import { services } from '../data/services';
import {
  buildBreadcrumbSchema,
  buildServiceSchema,
} from '../utils/schema';

/* Announcement chip rendered above the page hero — cross-page deep link
   to the Import & Export section, which now lives on the home page
   (id="global-trade" on the ImportExport section). */
function NowOfferingBadge() {
  return (
    <Link
      to="/#global-trade"
      className="group inline-flex items-center gap-2 bg-red px-3 py-1.5 font-display text-[11px] font-bold uppercase tracking-[0.22em] text-white shadow-[0_8px_20px_-10px_rgba(204,17,17,0.6)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-red2 rounded-none"
    >
      <Globe size={12} strokeWidth={2.5} aria-hidden="true" />
      <span>Now offering Import &amp; Export</span>
      <span className="text-white/70 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true">→</span>
    </Link>
  );
}

export default function Services() {
  const crumbs = [
    { label: 'Home',     to: '/' },
    { label: 'Services', to: '/services' },
  ];

  const schema = [
    buildBreadcrumbSchema(crumbs),
    ...services.map(buildServiceSchema),
  ];

  return (
    <>
      <SEO
        title="Air Compressor & Generator Services Vellore | Sales, AMC, Repair, Parts"
        description="Sales, service, spare parts, hiring and AMC for industrial air compressors and diesel generators across Vellore and Tamil Nadu. Certified technicians, genuine OEM parts, 24×7 response."
        keywords="compressor service vellore, generator amc tamil nadu, spare parts compressor, equipment hiring vellore, generator repair"
        path="/services"
        schema={schema}
      />
      <PageHero
        pageNumber="03"
        label="Services"
        title="Five Disciplines. One Complete Solution."
        crumbs={crumbs}
        badge={<NowOfferingBadge />}
      />
      <ServicesList />
      <Process />
      <FAQ />
      <ServicesCTA />
    </>
  );
}
