import {
  PageHero,
  SectorGrid,
  IndustriesMarquee,
} from '../components/sections';
import SEO from '../components/SEO';
import { buildBreadcrumbSchema } from '../utils/schema';

export default function Industries() {
  const crumbs = [
    { label: 'Home',       to: '/' },
    { label: 'Industries', to: '/industries' },
  ];

  return (
    <>
      <SEO
        title="Industries We Serve | Manufacturing, Pharma, Hospitals — Vellore"
        description="Compressed air and standby power for manufacturing plants, construction sites, food & pharma units, hospitals, agriculture and retail across Tamil Nadu."
        keywords="compressor for manufacturing, pharma generator, hospital backup power, construction generator hire vellore"
        path="/industries"
        schema={buildBreadcrumbSchema(crumbs)}
      />
      <PageHero
        pageNumber="04"
        label="Industries"
        title="Industries We Power."
        crumbs={crumbs}
      />
      <SectorGrid />
      <IndustriesMarquee />
    </>
  );
}
