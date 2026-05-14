import { useState } from 'react';
import { ArrowRight, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

import { FadeUp } from '../animations/FadeUp';
import { SectionLabel } from '../ui/SectionLabel';
import { trackEvent } from '../../utils/analytics';
import { cn } from '../../utils/cn';

const SERVICE_OPTIONS = [
  { value: '',                  label: 'Select a service…',  disabled: true },
  { value: 'sales',             label: 'Sales — New Equipment' },
  { value: 'service-repair',    label: 'Service & Repair' },
  { value: 'spare-parts',       label: 'Spare Parts' },
  { value: 'hiring',            label: 'Equipment Hiring' },
  { value: 'amc',               label: 'AMC — Annual Maintenance' },
  { value: 'other',             label: 'Other' },
];

const INITIAL = {
  name:    '',
  phone:   '',
  email:   '',
  service: '',
  message: '',
};

/* ──────────────────────────────────────────────────────────────────
   Validation helpers
   ────────────────────────────────────────────────────────────────── */
function validateField(name, value) {
  const v = (value || '').trim();
  switch (name) {
    case 'name':
      if (!v) return 'Please tell us your name.';
      if (v.length < 2) return 'Name looks too short.';
      return '';

    case 'phone': {
      if (!v) return 'A phone number lets us call you back fast.';
      // Strip spaces, dashes, parentheses, and a leading +91 / 91 / 0
      const digits = v.replace(/[^\d]/g, '').replace(/^91/, '').replace(/^0/, '');
      if (digits.length !== 10) return 'Phone should be 10 digits.';
      if (!/^[6-9]\d{9}$/.test(digits)) return 'Indian mobile numbers start with 6, 7, 8 or 9.';
      return '';
    }

    case 'email':
      if (!v) return ''; // optional
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Email format looks off.';
      return '';

    case 'service':
      if (!v) return 'Pick the service that fits best.';
      return '';

    case 'message':
      if (!v) return ''; // optional
      if (v.length < 10) return 'A few more words please — at least 10 characters.';
      return '';

    default:
      return '';
  }
}

/* ──────────────────────────────────────────────────────────────────
   Reusable controls
   ────────────────────────────────────────────────────────────────── */
function FieldLabel({ htmlFor, children, required }) {
  return (
    <label
      htmlFor={htmlFor}
      className="font-display text-[11px] font-bold uppercase tracking-[0.22em] text-navy"
    >
      {children}
      {required && <span className="ml-1 text-red">*</span>}
    </label>
  );
}

function FieldError({ children }) {
  if (!children) return null;
  return (
    <p className="mt-1.5 flex items-start gap-1.5 font-body text-[12px] text-red">
      <AlertCircle size={13} strokeWidth={2.5} className="mt-px shrink-0" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}

const inputBase = cn(
  'block w-full border bg-white px-4 py-3',
  'font-body text-[14px] text-ink placeholder:text-muted',
  'transition-colors duration-200',
  'focus:outline-none focus:ring-0',
  'rounded-none'
);

/* ──────────────────────────────────────────────────────────────────
   Form
   ────────────────────────────────────────────────────────────────── */
export default function EnquiryForm() {
  const [values,   setValues]   = useState(INITIAL);
  const [errors,   setErrors]   = useState({});
  const [touched,  setTouched]  = useState({});
  const [submitting, setSubmitting] = useState(false);

  const setField = (name, value) => {
    setValues((v) => ({ ...v, [name]: value }));
    if (touched[name]) {
      setErrors((e) => ({ ...e, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (name) => {
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors((e) => ({ ...e, [name]: validateField(name, values[name]) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate everything
    const fieldErrors = Object.fromEntries(
      Object.keys(values).map((k) => [k, validateField(k, values[k])])
    );
    setErrors(fieldErrors);
    setTouched({ name: true, phone: true, email: true, service: true, message: true });

    const hasError = Object.values(fieldErrors).some(Boolean);
    if (hasError) {
      trackEvent('Contact', 'Form Validation Failed', 'Enquiry Form');
      toast.error('Please fix the highlighted fields.', { duration: 3500 });
      return;
    }

    setSubmitting(true);
    // Simulated async submit — wire to a real endpoint later
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);

    trackEvent('Contact', 'Form Submit', 'Enquiry Form');

    toast.success("Enquiry sent — we'll be in touch shortly!", {
      duration: 4000,
      style: { background: '#0B1B5C', color: '#fff' },
      iconTheme: { primary: '#CC1111', secondary: '#fff' },
    });

    setValues(INITIAL);
    setErrors({});
    setTouched({});
  };

  /* Per-field input state (border + ring colour) */
  const fieldClass = (name) =>
    cn(
      inputBase,
      errors[name]
        ? 'border-red focus:border-red'
        : 'border-off focus:border-navy'
    );

  return (
    <div className="flex flex-col gap-5">
      <FadeUp distance={20}>
        <SectionLabel text="Send An Enquiry" />
      </FadeUp>

      <FadeUp delay={0.05} distance={28}>
        <h2 className="font-display font-black uppercase leading-[0.95] tracking-tight">
          <span className="block text-3xl text-navy md:text-4xl lg:text-[44px]">
            Tell Us
          </span>
          <span className="mt-1 block text-3xl text-red md:text-4xl lg:text-[44px]">
            Your Need.
          </span>
        </h2>
      </FadeUp>

      <FadeUp delay={0.1} distance={20}>
        <p className="font-body text-[14.5px] leading-relaxed text-slate">
          Drop your details and the kind of service you're after — we'll
          respond the same business day with a quote or callback.
        </p>
      </FadeUp>

      <FadeUp delay={0.15} distance={24}>
        <form
          onSubmit={handleSubmit}
          noValidate
          className={cn(
            'border border-off bg-white p-6 md:p-8',
            'border-t-[3px] border-t-red',
            'rounded-none'
          )}
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* Name */}
            <div className="sm:col-span-1">
              <FieldLabel htmlFor="contact-name" required>Name</FieldLabel>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Your full name"
                value={values.name}
                onChange={(e) => setField('name', e.target.value)}
                onBlur={() => handleBlur('name')}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'contact-name-err' : undefined}
                className={cn(fieldClass('name'), 'mt-2')}
              />
              <span id="contact-name-err"><FieldError>{errors.name}</FieldError></span>
            </div>

            {/* Phone */}
            <div className="sm:col-span-1">
              <FieldLabel htmlFor="contact-phone" required>Phone</FieldLabel>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="10-digit mobile"
                value={values.phone}
                onChange={(e) => setField('phone', e.target.value)}
                onBlur={() => handleBlur('phone')}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? 'contact-phone-err' : undefined}
                className={cn(fieldClass('phone'), 'mt-2')}
              />
              <span id="contact-phone-err"><FieldError>{errors.phone}</FieldError></span>
            </div>

            {/* Email */}
            <div className="sm:col-span-2">
              <FieldLabel htmlFor="contact-email">Email</FieldLabel>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                value={values.email}
                onChange={(e) => setField('email', e.target.value)}
                onBlur={() => handleBlur('email')}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'contact-email-err' : undefined}
                className={cn(fieldClass('email'), 'mt-2')}
              />
              <span id="contact-email-err"><FieldError>{errors.email}</FieldError></span>
            </div>

            {/* Service */}
            <div className="sm:col-span-2">
              <FieldLabel htmlFor="contact-service" required>Service</FieldLabel>
              <select
                id="contact-service"
                name="service"
                value={values.service}
                onChange={(e) => setField('service', e.target.value)}
                onBlur={() => handleBlur('service')}
                aria-invalid={!!errors.service}
                aria-describedby={errors.service ? 'contact-service-err' : undefined}
                className={cn(fieldClass('service'), 'mt-2 appearance-none bg-[length:14px_14px] bg-[right_18px_center] bg-no-repeat pr-10', `bg-[image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%234A5568' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>")]`)}
              >
                {SERVICE_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value} disabled={o.disabled}>
                    {o.label}
                  </option>
                ))}
              </select>
              <span id="contact-service-err"><FieldError>{errors.service}</FieldError></span>
            </div>

            {/* Message */}
            <div className="sm:col-span-2">
              <FieldLabel htmlFor="contact-message">Message</FieldLabel>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                placeholder="Briefly describe the equipment, capacity, and timeline you need."
                value={values.message}
                onChange={(e) => setField('message', e.target.value)}
                onBlur={() => handleBlur('message')}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'contact-message-err' : undefined}
                className={cn(fieldClass('message'), 'mt-2 resize-y')}
              />
              <span id="contact-message-err"><FieldError>{errors.message}</FieldError></span>
            </div>

            {/* Submit */}
            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={submitting}
                className={cn(
                  'group inline-flex h-12 w-full items-center justify-center gap-2 bg-red px-6 text-white',
                  'font-display text-[12px] font-bold uppercase tracking-[0.22em]',
                  'transition-all duration-200 ease-out',
                  'hover:-translate-y-0.5 hover:bg-red2 hover:shadow-[0_14px_30px_-10px_rgba(204,17,17,0.65)]',
                  'disabled:pointer-events-none disabled:opacity-60',
                  'rounded-none'
                )}
              >
                {submitting ? 'Sending…' : 'Send Enquiry'}
                {!submitting && (
                  <ArrowRight
                    size={16}
                    strokeWidth={2.5}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                )}
              </button>
              <p className="mt-3 text-center font-body text-[12px] text-muted">
                We respond within one business day.
              </p>
            </div>
          </div>
        </form>
      </FadeUp>
    </div>
  );
}
