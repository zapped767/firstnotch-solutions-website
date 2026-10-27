'use client';

import { useState, type FormEvent } from 'react';
import { ArrowUpRight, Check, Clock, Copy, Mail, MapPin, Phone } from 'lucide-react';
import { CONTACT, COPY } from './content';
import FirstNotchFooter from './FirstNotchFooter';
const field =
  'mt-2 w-full rounded-none border-b border-black/25 bg-transparent py-3 text-sm outline-none transition-colors focus:border-[#B12025]';
const serviceOptions = [
  'Customer support',
  'BPO and back office',
  'IT services',
  'More than one of these',
  "I'm not sure yet",
];
const startOptions = [
  'As soon as possible',
  'Within the next month',
  'In 1 to 3 months',
  'Just exploring for now',
];
const hoursOptions = [
  'During my business hours',
  'Outside my business hours',
  'Both',
  'Not sure yet',
];

export default function StoryContact() {
  const [draft, setDraft] = useState('');
  const [status, setStatus] = useState('');
  const [copied, setCopied] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const entries = [
      ['Full name', 'name'],
      ['Company', 'company'],
      ['Work email', 'email'],
      ['Country', 'country'],
      ['What do you need help with?', 'service'],
      ['When do you need your team to start?', 'start'],
      ['What hours should your team cover?', 'hours'],
      ['Anything else we should know?', 'message'],
    ];
    const text = entries.map(([label, name]) => `${label}: ${data.get(name) || ''}`).join('\n');
    setDraft(text);
    setCopied(false);
    setStatus('Your email app should open with this enquiry. Review it and send it there.');
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(COPY.cta)}&body=${encodeURIComponent(text)}`;
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(draft);
      setCopied(true);
    } catch {
      setStatus('Copy the enquiry below and email it to ' + CONTACT.email + '.');
    }
  }
  return (
    <>
      <section
        id="contact"
        aria-labelledby="fns-contact-title"
        className="scroll-mt-24 px-5 py-20 sm:px-8 lg:px-14 lg:py-28"
      >
        <div className="mx-auto grid max-w-[1424px] gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-6">
            <p
              data-fns-reveal
              className="mb-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#B12025]"
            >
              Free discovery call
            </p>
            <h2
              id="fns-contact-title"
              data-fns-reveal
              className="text-[clamp(2.75rem,5.5vw,5.5rem)] font-semibold leading-[1.06] tracking-[-0.06em]"
            >
              {COPY.contactTitle}
            </h2>
            <p
              data-fns-reveal
              className="mt-7 max-w-[470px] text-sm font-light leading-[1.7] text-black/60"
            >
              {COPY.contact}
            </p>
            <dl data-fns-reveal className="mt-12 grid gap-x-8 gap-y-8 sm:grid-cols-2">
              <div>
                <dt className="mb-3 flex items-center gap-3 text-xs font-semibold">
                  <Mail aria-hidden="true" size={17} className="text-[#B12025]" />
                  Email
                </dt>
                <dd>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="break-all text-xs leading-6 hover:underline"
                  >
                    {CONTACT.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="mb-3 flex items-center gap-3 text-xs font-semibold">
                  <Phone aria-hidden="true" size={17} className="text-[#B12025]" />
                  Phone
                </dt>
                <dd>
                  <a href={`tel:${CONTACT.phone}`} className="text-xs leading-6 hover:underline">
                    {CONTACT.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="mb-3 flex items-center gap-3 text-xs font-semibold">
                  <MapPin aria-hidden="true" size={17} className="text-[#B12025]" />
                  Office
                </dt>
                <dd className="text-xs leading-6">
                  {CONTACT.office}
                  <br />
                  {CONTACT.city}
                </dd>
              </div>
              <div>
                <dt className="mb-3 flex items-center gap-3 text-xs font-semibold">
                  <Clock aria-hidden="true" size={17} className="text-[#B12025]" />
                  Hours
                </dt>
                <dd className="text-xs leading-6">
                  {CONTACT.days}
                  <br />
                  {CONTACT.hours}
                </dd>
              </div>
            </dl>
          </div>
          <form onSubmit={submit} className="border-t border-black/20 pt-7 lg:col-span-6">
            <div className="grid gap-x-7 gap-y-6 sm:grid-cols-2">
              <label htmlFor="fns-name" className="text-[11px] font-medium">
                Full name
                <input
                  id="fns-name"
                  name="name"
                  autoComplete="name"
                  required
                  maxLength={100}
                  className={field}
                />
              </label>
              <label htmlFor="fns-company" className="text-[11px] font-medium">
                Company
                <input
                  id="fns-company"
                  name="company"
                  autoComplete="organization"
                  maxLength={120}
                  className={field}
                />
              </label>
              <label htmlFor="fns-email" className="text-[11px] font-medium">
                Work email
                <input
                  id="fns-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={160}
                  className={field}
                />
              </label>
              <label htmlFor="fns-country" className="text-[11px] font-medium">
                Country
                <input
                  id="fns-country"
                  name="country"
                  autoComplete="country-name"
                  required
                  maxLength={100}
                  className={field}
                />
              </label>
            </div>
            <label htmlFor="fns-service" className="mt-7 block text-[11px] font-medium">
              What do you need help with?
              <select
                id="fns-service"
                name="service"
                defaultValue=""
                required
                className={`${field} cursor-pointer`}
              >
                <option value="" disabled>
                  —
                </option>
                {serviceOptions.map((text) => (
                  <option key={text}>{text}</option>
                ))}
              </select>
            </label>
            <label htmlFor="fns-start" className="mt-7 block text-[11px] font-medium">
              When do you need your team to start?
              <select
                id="fns-start"
                name="start"
                defaultValue=""
                required
                className={`${field} cursor-pointer`}
              >
                <option value="" disabled>
                  —
                </option>
                {startOptions.map((text) => (
                  <option key={text}>{text}</option>
                ))}
              </select>
            </label>
            <label htmlFor="fns-hours" className="mt-7 block text-[11px] font-medium">
              What hours should your team cover?
              <select
                id="fns-hours"
                name="hours"
                defaultValue=""
                required
                className={`${field} cursor-pointer`}
              >
                <option value="" disabled>
                  —
                </option>
                {hoursOptions.map((text) => (
                  <option key={text}>{text}</option>
                ))}
              </select>
            </label>
            <label htmlFor="fns-message" className="mt-7 block text-[11px] font-medium">
              Anything else we should know?
              <textarea
                data-lenis-prevent
                id="fns-message"
                name="message"
                rows={3}
                maxLength={1500}
                className={`${field} resize-y`}
              />
            </label>
            <p className="mt-5 text-[10px] leading-5 text-black/55">
              Opens your email app. Review and send your enquiry there.
            </p>
            <button
              data-fns-magnetic
              type="submit"
              className="mt-5 flex min-h-14 w-full items-center justify-between rounded-full bg-[#17191C] px-6 text-xs font-semibold text-white transition-colors hover:bg-[#B12025]"
            >
              {COPY.cta}
              <ArrowUpRight aria-hidden="true" size={18} />
            </button>
            <p role="status" aria-live="polite" className="mt-4 text-xs leading-6 text-black/60">
              {status}
            </p>
            {draft && (
              <div className="mt-4">
                <textarea
                  data-lenis-prevent
                  aria-label="Your enquiry"
                  readOnly
                  rows={7}
                  value={draft}
                  className="w-full resize-y rounded-xl border border-black/20 p-4 text-xs leading-6"
                />
                <button
                  type="button"
                  onClick={copy}
                  className="mt-3 inline-flex items-center gap-2 text-xs font-medium"
                >
                  {copied ? (
                    <Check aria-hidden="true" size={14} />
                  ) : (
                    <Copy aria-hidden="true" size={14} />
                  )}{' '}
                  {copied ? 'Copied' : 'Copy enquiry'}
                </button>
              </div>
            )}
          </form>
        </div>
        
      </section>
     <FirstNotchFooter />
    </>
  );
}
