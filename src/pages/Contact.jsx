import {
  PageHero,
  ContactInfoCards,
  EnquiryForm,
  ContactMap,
} from '../components/sections';
import SEO from '../components/SEO';
import { contactInfo } from '../data/contact';
import {
  buildBreadcrumbSchema,
  buildLocalBusinessSchema,
} from '../utils/schema';

export default function Contact() {
  const crumbs = [
    { label: 'Home',    to: '/' },
    { label: 'Contact', to: '/contact' },
  ];

  const schema = [
    buildLocalBusinessSchema(contactInfo),
    buildBreadcrumbSchema(crumbs),
  ];

  return (
    <>
      <SEO
        title="Contact Sheyam Enterprises Vellore | 9965499444"
        description="Reach Sheyam Enterprises in Vellore for sales, service, spares, hiring and AMC enquiries. Call +91 9965499444, +91 6383171788 or +91 8098093737. Sathuvachari, Vellore – 632 009."
        keywords="contact sheyam enterprises, compressor service vellore phone, generator service vellore, vellore industrial equipment contact"
        path="/contact"
        schema={schema}
      />

      <PageHero
        pageNumber="06"
        label="Contact"
        title="Let's Work Together."
        crumbs={crumbs}
      />

      {/* 2-col body — info cards (left) + form (right) */}
      <section className="bg-off py-20 md:py-24" aria-label="Contact information and form">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <ContactInfoCards />
            </div>
            <div className="lg:col-span-7">
              <EnquiryForm />
            </div>
          </div>
        </div>
      </section>

      <ContactMap />
    </>
  );
}
