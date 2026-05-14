/**
 * Site-wide constants used by SEO + sitemap + JSON-LD schema.
 * Update SITE_URL when the production domain is finalised.
 */
export const SITE_URL    =
  import.meta.env.VITE_SITE_URL?.replace(/\/$/, '') ||
  'https://www.sheyamenterprises.com';
export const SITE_NAME   = 'Sheyam Enterprises';
export const SITE_TAGLINE =
  'Master in all Types of Air Compressors & Generators';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

/* ──────────────────────────────────────────────────────────────────
   Helpers
   ────────────────────────────────────────────────────────────────── */
function cleanEmail(value) {
  if (!value) return '';
  // Strip the markdown-style `[email](mailto:email)` wrapper if present
  const m = value.match(/^\[([^\]]+)\]\(mailto:([^)]+)\)$/);
  return m ? m[2] : value;
}

function cleanUrl(value) {
  if (!value) return '';
  const m = value.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
  return m ? m[2] : value;
}

/** Build an absolute URL from a path. */
export function absoluteUrl(path = '/') {
  if (path.startsWith('http')) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

/* ──────────────────────────────────────────────────────────────────
   LocalBusiness — primary org schema, attach to homepage + contact
   ────────────────────────────────────────────────────────────────── */
export function buildLocalBusinessSchema(contactInfo) {
  const email   = cleanEmail(contactInfo.email);
  const website = cleanUrl(contactInfo.website);

  return {
    '@context': 'https://schema.org',
    '@type':    'LocalBusiness',
    '@id':      `${SITE_URL}/#organization`,
    name:        contactInfo.company,
    description: contactInfo.tagline,
    url:         website || SITE_URL,
    telephone:   `+91${contactInfo.phones[0]}`,
    email,
    image:       DEFAULT_OG_IMAGE,
    logo:        `${SITE_URL}/logo.png`,
    address: {
      '@type':         'PostalAddress',
      streetAddress:   `${contactInfo.address.street}, ${contactInfo.address.area}`,
      addressLocality: contactInfo.address.city,
      addressRegion:   contactInfo.address.state,
      postalCode:      contactInfo.address.pincode.replace(/\s+/g, ''),
      addressCountry:  'IN',
    },
    geo: {
      '@type':    'GeoCoordinates',
      latitude:   contactInfo.location?.lat ?? 12.9419942,
      longitude:  contactInfo.location?.lng ?? 79.1684241,
    },
    openingHoursSpecification: [
      {
        '@type':     'OpeningHoursSpecification',
        dayOfWeek:   ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens:       '09:00',
        closes:      '18:30',
      },
    ],
    openingHours: 'Mo-Sa 09:00-18:30',
    priceRange:   '₹₹',
    areaServed: [
      { '@type': 'City',           name: 'Vellore' },
      { '@type': 'City',           name: 'Chennai' },
      { '@type': 'AdministrativeArea', name: 'Tamil Nadu' },
    ],
    contactPoint: contactInfo.phones.map((num, i) => ({
      '@type':       'ContactPoint',
      telephone:     `+91${num}`,
      contactType:   i === 0 ? 'customer service' : 'sales',
      areaServed:    'IN',
      availableLanguage: ['en', 'ta'],
    })),
    sameAs: [
      `https://wa.me/${contactInfo.whatsapp}`,
      contactInfo.location?.shortUrl,
    ].filter(Boolean),
  };
}

/* ──────────────────────────────────────────────────────────────────
   WebSite — sitelinks search + canonical name
   ────────────────────────────────────────────────────────────────── */
export function buildWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type':    'WebSite',
    '@id':      `${SITE_URL}/#website`,
    url:        SITE_URL,
    name:       SITE_NAME,
    description: SITE_TAGLINE,
    inLanguage: 'en-IN',
    publisher: { '@id': `${SITE_URL}/#organization` },
  };
}

/* ──────────────────────────────────────────────────────────────────
   Product schema (per product entry)
   ────────────────────────────────────────────────────────────────── */
export function buildProductSchema(product) {
  return {
    '@context': 'https://schema.org',
    '@type':    'Product',
    '@id':      `${SITE_URL}/products#${product.id}`,
    name:        product.name,
    description: product.description,
    category:    product.category,
    brand:       product.brands.map((b) => ({ '@type': 'Brand', name: b })),
    offers: {
      '@type':         'Offer',
      availability:    'https://schema.org/InStock',
      priceCurrency:   'INR',
      price:           '0',
      priceValidUntil: '2027-12-31',
      url:             `${SITE_URL}/products#${product.id}`,
      seller:          { '@id': `${SITE_URL}/#organization` },
    },
  };
}

/* ──────────────────────────────────────────────────────────────────
   Service schema (per service entry)
   ────────────────────────────────────────────────────────────────── */
export function buildServiceSchema(service) {
  return {
    '@context': 'https://schema.org',
    '@type':    'Service',
    '@id':      `${SITE_URL}/services#${service.id}`,
    name:        service.title,
    description: service.fullDesc || service.shortDesc,
    serviceType: service.title,
    provider:    { '@id': `${SITE_URL}/#organization` },
    areaServed: [
      { '@type': 'City', name: 'Vellore' },
      { '@type': 'AdministrativeArea', name: 'Tamil Nadu' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name:    `${service.title} Inclusions`,
      itemListElement: (service.features || []).map((f, i) => ({
        '@type': 'Offer',
        position: i + 1,
        itemOffered: { '@type': 'Service', name: f },
      })),
    },
  };
}

/* ──────────────────────────────────────────────────────────────────
   BreadcrumbList — page hero crumbs
   ────────────────────────────────────────────────────────────────── */
export function buildBreadcrumbSchema(crumbs) {
  return {
    '@context': 'https://schema.org',
    '@type':    'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type':   'ListItem',
      position:  i + 1,
      name:      c.label,
      item:      c.to ? absoluteUrl(c.to) : undefined,
    })),
  };
}

/* ──────────────────────────────────────────────────────────────────
   FAQ — for the services page FAQs
   ────────────────────────────────────────────────────────────────── */
export function buildFaqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type':    'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type':         'Question',
      name:            f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}
