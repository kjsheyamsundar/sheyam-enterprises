import { Helmet } from 'react-helmet-async';
import {
  SITE_URL,
  SITE_NAME,
  SITE_TAGLINE,
  DEFAULT_OG_IMAGE,
  absoluteUrl,
} from '../utils/schema';

/**
 * @typedef {Object} SEOProps
 * @property {string}                      title         — page title (will be used as both <title> and og:title)
 * @property {string}                      [description] — meta description (≤160 chars recommended)
 * @property {string}                      [keywords]    — comma-separated keyword string
 * @property {string}                      [path]        — pathname like "/about"; defaults to "/"
 * @property {string}                      [image]       — absolute or root-relative image URL for og:image
 * @property {'website'|'article'|'product'|'profile'} [type] — og:type (default 'website')
 * @property {Object | Object[]}          [schema]       — one or more JSON-LD schema objects to embed
 * @property {boolean}                    [noIndex]      — emit `noindex,nofollow` if true
 */

/**
 * Page-level SEO wrapper.
 * Renders <title>, description, keywords, OpenGraph, Twitter Card,
 * canonical URL, and any number of JSON-LD <script> tags via Helmet.
 *
 * Place once per page, near the top of the page component.
 */
export default function SEO({
  title,
  description = SITE_TAGLINE,
  keywords,
  path = '/',
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  schema,
  noIndex = false,
}) {
  const fullTitle = title?.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const url       = absoluteUrl(path);
  const ogImage   = image?.startsWith('http') ? image : absoluteUrl(image);

  /* Normalise schema → always an array */
  const schemas = !schema ? [] : Array.isArray(schema) ? schema : [schema];

  return (
    <Helmet>
      {/* Standard meta */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* OpenGraph */}
      <meta property="og:type"        content={type} />
      <meta property="og:site_name"   content={SITE_NAME} />
      <meta property="og:title"       content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url"         content={url} />
      <meta property="og:image"       content={ogImage} />
      <meta property="og:locale"      content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={ogImage} />

      {/* JSON-LD schema(s) */}
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
}
