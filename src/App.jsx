import { lazy, Suspense, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import Layout from './components/layout/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import {
  initAnalytics,
  pageView,
  setupGlobalLinkTracking,
} from './utils/analytics';

/* Code-split each route so the initial JS bundle only ships the page
   the user actually lands on (typically Home). */
const Home       = lazy(() => import('./pages/Home'));
const About      = lazy(() => import('./pages/About'));
const Services   = lazy(() => import('./pages/Services'));
const Industries = lazy(() => import('./pages/Industries'));
const Projects   = lazy(() => import('./pages/Projects'));
const Contact    = lazy(() => import('./pages/Contact'));
const Brands     = lazy(() => import('./pages/Brands'));
const Products   = lazy(() => import('./pages/Products'));

/* Tiny suspense fallback — keeps the same dark hero feel while a route loads */
function RouteLoader() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="grid min-h-[60vh] place-items-center bg-off"
    >
      <span className="grid h-12 w-12 place-items-center border-2 border-off border-t-red rounded-full animate-spin" />
    </div>
  );
}

/**
 * Lives inside <BrowserRouter> so it can read the route. Fires a GA4
 * page_view every time the pathname (or search string) changes.
 */
function RouteChangeTracker() {
  const location = useLocation();

  useEffect(() => {
    pageView(location.pathname + location.search);
  }, [location.pathname, location.search]);

  return null;
}

/**
 * Reset scroll to the top whenever the route changes — React Router
 * preserves scroll position across SPA navigations by default, which
 * lands users mid-page when they switch sections.
 *
 * Hashes are deliberately left alone (e.g. /services#sales) so deep
 * links to in-page anchors still scroll to the matching section.
 *
 * The global `html { scroll-behavior: smooth }` would otherwise turn
 * this page-change reset into a long animated scroll. We temporarily
 * flip it to `auto` for the jump and restore it on the next paint so
 * intentional smooth scrolls (e.g. anchor jumps) keep working.
 */
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    /* Hash navigation — smooth-scroll to the matching element. Uses a
       small timeout so lazy-loaded routes have time to mount the target
       node. (Section-specific listeners — e.g. ServicesList opening an
       accordion item — keep firing alongside this generic handler.) */
    if (hash) {
      const id = hash.replace(/^#/, '');
      const t = setTimeout(() => {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 120);
      return () => clearTimeout(t);
    }

    /* No hash — reset scroll to the top. The global `html { scroll-behavior:
       smooth }` would otherwise turn this page-change reset into a long
       animated scroll, so we briefly flip it to `auto`. */
    const root = document.documentElement;
    const prev = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    requestAnimationFrame(() => {
      root.style.scrollBehavior = prev;
    });
  }, [pathname, hash]);

  return null;
}

export default function App() {
  /* Boot analytics + global link click tracking once on mount */
  useEffect(() => {
    initAnalytics();
    const teardown = setupGlobalLinkTracking();
    return teardown;
  }, []);

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <BrowserRouter>
          <ScrollToTop />
          <RouteChangeTracker />
          <Routes>
            <Route element={<Layout />}>
              <Route
                index
                element={
                  <Suspense fallback={<RouteLoader />}>
                    <Home />
                  </Suspense>
                }
              />
              <Route
                path="about"
                element={
                  <Suspense fallback={<RouteLoader />}>
                    <About />
                  </Suspense>
                }
              />
              <Route
                path="services"
                element={
                  <Suspense fallback={<RouteLoader />}>
                    <Services />
                  </Suspense>
                }
              />
              <Route
                path="industries"
                element={
                  <Suspense fallback={<RouteLoader />}>
                    <Industries />
                  </Suspense>
                }
              />
              <Route
                path="projects"
                element={
                  <Suspense fallback={<RouteLoader />}>
                    <Projects />
                  </Suspense>
                }
              />
              <Route
                path="contact"
                element={
                  <Suspense fallback={<RouteLoader />}>
                    <Contact />
                  </Suspense>
                }
              />
              <Route
                path="brands"
                element={
                  <Suspense fallback={<RouteLoader />}>
                    <Brands />
                  </Suspense>
                }
              />
              <Route
                path="products"
                element={
                  <Suspense fallback={<RouteLoader />}>
                    <Products />
                  </Suspense>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </HelmetProvider>
    </ErrorBoundary>
  );
}
