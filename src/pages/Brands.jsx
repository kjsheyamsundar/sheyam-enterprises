import {
  PageHero,
  BrandsGrid,
  BrandsMarquee,
} from '../components/sections';
import SEO from '../components/SEO';
import { buildBreadcrumbSchema } from '../utils/schema';

export default function Brands() {
  const crumbs = [
    { label: 'Home',   to: '/' },
    { label: 'Brands', to: '/brands' },
  ];

  return (
    <>
      <SEO
        title="Trusted Brands — ELGi, Atlas Copco, Cummins, CAT | Sheyam Enterprises"
        description="We service and supply equipment from 16 leading compressor and generator brands — ELGi, Atlas Copco, Kaeser, Ingersoll Rand, Chicago Pneumatic, CAT, Cummins, Hitachi, Perkins and more."
        keywords="elgi service vellore, atlas copco vellore, kaeser tamil nadu, cummins generator vellore, cat generator service, ingersoll rand"
        path="/brands"
        schema={buildBreadcrumbSchema(crumbs)}
      />
      <PageHero
        pageNumber="07"
        label="Brands"
        title="Trusted by Industry Leaders."
        crumbs={crumbs}
      />
      <BrandsGrid />
      <BrandsMarquee />
    </>
  );
}
