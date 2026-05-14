/**
 * Google Analytics 4 helpers.
 *
 * The GA4 Measurement ID is read from `import.meta.env.VITE_GA_ID`
 * (e.g. "G-XXXXXXXXXX"). When the env var is unset or in dev mode without it,
 * tracking is a no-op — gtag.js is never injected, no network requests fire,
 * and the helpers log to the console instead so you can verify wiring.
 *
 * Public API:
 *   - initAnalytics()                       — inject gtag.js once at app boot
 *   - pageView(path)                         — fire a SPA page_view
 *   - trackEvent(category, action, label)    — fire a generic event
 *   - setupGlobalLinkTracking()              — auto-track tel:/wa.me/mailto clicks
 */

const GA_ID    = import.meta.env.VITE_GA_ID;
// Accept real measurement IDs only — reject the literal placeholder so
// the console-only fallback fires until a real ID is wired in.
const HAS_GA   =
  typeof GA_ID === 'string' &&
  /^G-[A-Z0-9]+$/i.test(GA_ID) &&
  !/^G-X+$/i.test(GA_ID);
const IS_DEV   = import.meta.env.DEV;

/** Stash so we don't double-inject the gtag script during HMR */
let initialized = false;

/* ──────────────────────────────────────────────────────────────────
   Init — inject gtag.js once
   ────────────────────────────────────────────────────────────────── */
export function initAnalytics() {
  if (initialized) return;
  initialized = true;

  if (!HAS_GA) {
    if (IS_DEV) {
      // eslint-disable-next-line no-console
      console.info('[analytics] VITE_GA_ID not set — tracking disabled.');
    }
    return;
  }

  // 1. Bootstrap dataLayer + gtag stub
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());

  // 2. Configure — `send_page_view: false` so we control SPA routing manually
  window.gtag('config', GA_ID, {
    send_page_view: false,
    transport_type: 'beacon',
    anonymize_ip:   true,
  });

  // 3. Inject the script tag
  const script = document.createElement('script');
  script.async = true;
  script.src   = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
}

/* ──────────────────────────────────────────────────────────────────
   Page view (SPA)
   ────────────────────────────────────────────────────────────────── */
export function pageView(path) {
  const fullPath = path || (typeof window !== 'undefined' ? window.location.pathname + window.location.search : '/');

  if (!HAS_GA) {
    if (IS_DEV) console.info('[analytics] page_view', fullPath);
    return;
  }

  if (typeof window.gtag !== 'function') return;
  window.gtag('event', 'page_view', {
    page_path:     fullPath,
    page_location: window.location.href,
    page_title:    document.title,
  });
}

/* ──────────────────────────────────────────────────────────────────
   Generic event
   ────────────────────────────────────────────────────────────────── */
export function trackEvent(category, action, label, value) {
  if (!HAS_GA) {
    if (IS_DEV) console.info('[analytics] event', { category, action, label, value });
    return;
  }
  if (typeof window.gtag !== 'function') return;

  window.gtag('event', action, {
    event_category: category,
    event_label:    label,
    value,
  });
}

/* ──────────────────────────────────────────────────────────────────
   Global link tracking
   Captures tel: / wa.me / mailto: clicks anywhere in the app via a
   single delegated listener — avoids sprinkling onClick handlers
   across every Navbar/Footer/Section component.
   ────────────────────────────────────────────────────────────────── */
export function setupGlobalLinkTracking() {
  if (typeof document === 'undefined') return () => {};

  const handler = (e) => {
    const a = e.target.closest('a[href]');
    if (!a) return;
    const href = a.getAttribute('href') || '';

    if (href.startsWith('tel:')) {
      const num = href.replace(/^tel:/, '');
      trackEvent('Contact', 'Phone Click', num);
      return;
    }
    if (href.includes('wa.me') || href.includes('whatsapp')) {
      trackEvent('Contact', 'WhatsApp Click', href);
      return;
    }
    if (href.startsWith('mailto:')) {
      const addr = href.replace(/^mailto:/, '');
      trackEvent('Contact', 'Email Click', addr);
      return;
    }
  };

  document.addEventListener('click', handler, { capture: true });
  return () => document.removeEventListener('click', handler, { capture: true });
}
