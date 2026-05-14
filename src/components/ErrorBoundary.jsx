import { Component } from 'react';
import { AlertTriangle, Phone, Mail, Home } from 'lucide-react';

import { contactInfo } from '../data/contact';
import { WhatsAppIcon } from './ui/WhatsAppIcon';
import { trackEvent } from '../utils/analytics';
import { cn } from '../utils/cn';

function parseMdLink(value) {
  if (!value) return { text: '', href: '' };
  const m = value.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
  return m ? { text: m[1], href: m[2] } : { text: value, href: value };
}

/**
 * Catches render-time errors anywhere below it in the tree.
 * Shows a friendly error page with the company contact details
 * so a frustrated user has a clear next action.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('[ErrorBoundary] Render error caught:', error, info?.componentStack);

    // Best-effort GA event so we know real users hit the boundary
    try {
      trackEvent('App', 'Error Boundary', error?.message?.slice(0, 120) || 'unknown');
    } catch {
      /* swallow — analytics shouldn't break the fallback */
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    const email      = parseMdLink(contactInfo.email);
    const firstPhone = contactInfo.phones[0];
    const whatsapp   = `https://wa.me/${contactInfo.whatsapp}`;

    return (
      <div className="grid min-h-screen place-items-center bg-off px-6 py-16">
        <div className="mx-auto w-full max-w-xl">
          {/* Icon */}
          <div className="grid h-14 w-14 place-items-center bg-red text-white">
            <AlertTriangle size={26} strokeWidth={2.25} aria-hidden="true" />
          </div>

          {/* Heading */}
          <h1 className="mt-6 font-display font-black uppercase leading-[0.95] tracking-tight">
            <span className="block text-4xl text-navy md:text-5xl lg:text-[56px]">
              Something Went
            </span>
            <span className="mt-1 block text-4xl text-red md:text-5xl lg:text-[56px]">
              Wrong.
            </span>
          </h1>

          <p className="mt-6 max-w-lg font-body text-[13px] leading-relaxed text-slate">
            The page hit an unexpected error while loading. We've been notified.
            In the meantime, please reload the page or reach us directly using
            any of the channels below — we'll respond the same business day.
          </p>

          {/* Recovery actions */}
          <div className="mt-7 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={this.handleReload}
              className={cn(
                'group inline-flex h-12 items-center justify-center gap-2 bg-red px-6 text-white',
                'font-display text-[12px] font-bold uppercase tracking-[0.22em]',
                'transition-all duration-200 ease-out',
                'hover:-translate-y-0.5 hover:bg-red2 hover:shadow-[0_14px_30px_-10px_rgba(204,17,17,0.65)]',
                'rounded-none'
              )}
            >
              Reload Page
            </button>
            <button
              type="button"
              onClick={this.handleGoHome}
              className={cn(
                'inline-flex h-12 items-center justify-center gap-2 border border-navy bg-white px-6 text-navy',
                'font-display text-[12px] font-bold uppercase tracking-[0.22em]',
                'transition-all duration-200 ease-out',
                'hover:-translate-y-0.5 hover:bg-navy hover:text-white',
                'rounded-none'
              )}
            >
              <Home size={14} strokeWidth={2.5} aria-hidden="true" />
              Go to Home
            </button>
          </div>

          {/* Contact channels */}
          <div className="mt-10 border-t border-off pt-6">
            <span className="font-display text-[10px] font-bold uppercase tracking-[0.3em] text-muted">
              Reach Us Directly
            </span>
            <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <li>
                <a
                  href={`tel:+91${firstPhone}`}
                  className="group flex items-center gap-3 border border-off bg-white p-3 transition-colors hover:border-red"
                >
                  <span className="grid h-9 w-9 place-items-center bg-red/10 text-red transition-colors group-hover:bg-red group-hover:text-white">
                    <Phone size={14} strokeWidth={2.5} aria-hidden="true" />
                  </span>
                  <span className="font-display text-[13px] font-bold tracking-wide text-ink">
                    +91 {firstPhone}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 border border-off bg-white p-3 transition-colors hover:border-red"
                >
                  <span className="grid h-9 w-9 place-items-center bg-red/10 text-red transition-colors group-hover:bg-red group-hover:text-white">
                    <WhatsAppIcon size={14} />
                  </span>
                  <span className="font-display text-[13px] font-bold uppercase tracking-wide text-ink">
                    WhatsApp
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={email.href}
                  className="group flex items-center gap-3 border border-off bg-white p-3 transition-colors hover:border-red"
                >
                  <span className="grid h-9 w-9 place-items-center bg-red/10 text-red transition-colors group-hover:bg-red group-hover:text-white">
                    <Mail size={14} strokeWidth={2.5} aria-hidden="true" />
                  </span>
                  <span className="truncate font-display text-[12px] font-bold tracking-wide text-ink">
                    {email.text}
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {/* Dev-only error detail */}
          {import.meta.env.DEV && this.state.error && (
            <details className="mt-8 border border-off bg-white p-4 text-[12px] text-slate">
              <summary className="cursor-pointer font-display text-[11px] font-bold uppercase tracking-[0.22em] text-muted">
                Developer detail
              </summary>
              <pre className="mt-3 overflow-x-auto whitespace-pre-wrap break-words font-mono">
                {String(this.state.error?.stack || this.state.error?.message || this.state.error)}
              </pre>
            </details>
          )}
        </div>
      </div>
    );
  }
}
