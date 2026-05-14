import {
  Hero,
  ServicesStrip,
  Products,
  TrustedBy,
  BrandsMarquee,
  CTA,
} from '../components/sections';
import ImportExport from '../components/sections/ImportExport';
import SEO from '../components/SEO';
import { contactInfo } from '../data/contact';
import {
  buildLocalBusinessSchema,
  buildWebSiteSchema,
} from '../utils/schema';

export default function Home() {
  const schema = [
    buildWebSiteSchema(),
    buildLocalBusinessSchema(contactInfo),
  ];

  return (
    <>
      <SEO
        title="Sheyam Enterprises | Air Compressors & Generators Vellore"
        description="Master in all types of air compressors & generators in Vellore, Tamil Nadu. Sales, service, spare parts, hiring & AMC. ELGi, Atlas Copco, CAT, Cummins equipment serviced."
        keywords="air compressor vellore, generator vellore, ELGi compressor, Atlas Copco Tamil Nadu, screw air compressor, diesel generator service vellore"
        path="/"
        schema={schema}
      />
      <Hero />
      <ServicesStrip />
      <Products />
      <ImportExport />
      <TrustedBy />
      <BrandsMarquee />
      <CTA />
    </>
  );
}
