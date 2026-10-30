'use client';

import { useState, type FormEvent } from 'react';
import {
  ArrowUpRight,
  Check,
  Clock,
  Copy,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';

import { CONTACT, COPY } from './content';
import FirstNotchFooter from './FirstNotchFooter';

const field =
  'mt-1.5 w-full rounded-none border-b border-black/25 bg-transparent py-2 text-xs outline-none transition-colors focus:border-[#B12025] sm:mt-2 sm:py-3 sm:text-sm';

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

  // Desktop/tablet form submission — unchanged.
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

    const text = entries
      .map(
        ([label, name]) =>
          `${label}: ${data.get(name) || ''}`,
      )
      .join('\n');

    setDraft(text);
    setCopied(false);

    setStatus(
      'Your email app should open with this enquiry. Review it and send it there.',
    );

    window.location.href =
      `mailto:${CONTACT.email}` +
      `?subject=${encodeURIComponent(COPY.cta)}` +
      `&body=${encodeURIComponent(text)}`;
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(draft);
      setCopied(true);
    } catch {
      setStatus(
        'Copy the enquiry below and email it to ' +
          CONTACT.email +
          '.',
      );
    }
  }

  return (
    <>
      <section
        id="contact"
        aria-labelledby="fns-contact-title"
        className="
          scroll-mt-24
          px-5
          pb-8
          pt-6
          sm:px-8
          sm:py-20
          lg:px-14
          lg:py-28
        "
      >
        <div
          className="
            mx-auto
            grid
            max-w-[1424px]
            gap-8
            sm:gap-14
            lg:grid-cols-12
            lg:gap-20
          "
        >
          {/* =====================================
              LEFT — CONTACT INFORMATION
              ORIGINAL RESPONSIVE DESIGN
          ===================================== */}

          <div className="lg:col-span-6">
            <p
              data-fns-reveal
              className="
                mb-3
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.2em]
                text-[#B12025]
                sm:mb-6
                sm:text-[10px]
              "
            >
              Free discovery call
            </p>

            <h2
              id="fns-contact-title"
              data-fns-reveal
              className="
                text-[clamp(1.9rem,8.5vw,2.3rem)]
                font-semibold
                leading-[1.08]
                tracking-[-0.06em]
                sm:text-[clamp(2.75rem,5.5vw,5.5rem)]
                sm:leading-[1.06]
              "
            >
              {COPY.contactTitle}
            </h2>

            <p
              data-fns-reveal
              className="
                mt-4
                max-w-[470px]
                text-[12px]
                font-light
                leading-[1.65]
                text-black/60
                sm:mt-7
                sm:text-sm
                sm:leading-[1.7]
              "
            >
              {COPY.contact}
            </p>

            {/* CONTACT DETAILS */}

            <dl
              data-fns-reveal
              className="
                mt-6
                grid
                gap-x-8
                gap-y-5
                sm:mt-12
                sm:grid-cols-2
                sm:gap-y-8
              "
            >
              {/* EMAIL */}

              <div>
                <dt className="mb-1.5 flex items-center gap-2 text-[11px] font-semibold sm:mb-3 sm:gap-3 sm:text-xs">
                  <Mail
                    aria-hidden="true"
                    size={15}
                    className="text-[#B12025] sm:h-[17px] sm:w-[17px]"
                  />
                  Email
                </dt>

                <dd>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="break-all text-[11px] leading-5 hover:underline sm:text-xs sm:leading-6"
                  >
                    {CONTACT.email}
                  </a>
                </dd>
              </div>

              {/* PHONE */}

              <div>
                <dt className="mb-1.5 flex items-center gap-2 text-[11px] font-semibold sm:mb-3 sm:gap-3 sm:text-xs">
                  <Phone
                    aria-hidden="true"
                    size={15}
                    className="text-[#B12025] sm:h-[17px] sm:w-[17px]"
                  />
                  Phone
                </dt>

                <dd>
                  <a
                    href={`tel:${CONTACT.phone}`}
                    className="text-[11px] leading-5 hover:underline sm:text-xs sm:leading-6"
                  >
                    {CONTACT.phoneDisplay}
                  </a>
                </dd>
              </div>

              {/* OFFICE */}

              <div>
                <dt className="mb-1.5 flex items-center gap-2 text-[11px] font-semibold sm:mb-3 sm:gap-3 sm:text-xs">
                  <MapPin
                    aria-hidden="true"
                    size={15}
                    className="text-[#B12025] sm:h-[17px] sm:w-[17px]"
                  />
                  Office
                </dt>

                <dd className="text-[11px] leading-5 sm:text-xs sm:leading-6">
                  {CONTACT.office}
                  <br />
                  {CONTACT.city}
                </dd>
              </div>

              {/* HOURS */}

              <div>
                <dt className="mb-1.5 flex items-center gap-2 text-[11px] font-semibold sm:mb-3 sm:gap-3 sm:text-xs">
                  <Clock
                    aria-hidden="true"
                    size={15}
                    className="text-[#B12025] sm:h-[17px] sm:w-[17px]"
                  />
                  Hours
                </dt>

                <dd className="text-[11px] leading-5 sm:text-xs sm:leading-6">
                  {CONTACT.days}
                  <br />
                  {CONTACT.hours}
                </dd>
              </div>
            </dl>
          </div>

          {/* =====================================
              RIGHT — CONTACT FORM AREA
          ===================================== */}

          <div className="lg:col-span-6">
            {/* =====================================
                MOBILE ONLY
                NO FORM FIELDS
                RED DISCOVERY CALL BUTTON
            ===================================== */}

            <div
              className="
                border-t
                border-black/20
                pt-5
                sm:hidden
              "
            >
              <a
                href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(
                  'Free discovery call enquiry',
                )}`}
                className="
                  flex
                  min-h-[48px]
                  w-full
                  items-center
                  justify-between
                  gap-3
                  rounded-full
                  bg-[#B12025]
                  px-5
                  text-[11px]
                  font-semibold
                  text-white
                  transition-colors
                  duration-300
                  hover:bg-[#951a1f]
                "
              >
                <span>Book a free discovery call</span>

                <ArrowUpRight
                  aria-hidden="true"
                  size={18}
                  className="shrink-0"
                />
              </a>
            </div>

            {/* =====================================
                TABLET + DESKTOP ONLY
                ORIGINAL FORM UNCHANGED
            ===================================== */}

            <form
              onSubmit={submit}
              className="
                hidden
                border-t
                border-black/20
                pt-5
                sm:block
                sm:pt-7
              "
            >
              {/* PERSONAL DETAILS */}

              <div
                className="
                  grid
                  gap-x-7
                  gap-y-4
                  sm:grid-cols-2
                  sm:gap-y-6
                "
              >
                {/* FULL NAME */}

                <label
                  htmlFor="fns-name"
                  className="text-[10px] font-medium sm:text-[11px]"
                >
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

                {/* COMPANY */}

                <label
                  htmlFor="fns-company"
                  className="text-[10px] font-medium sm:text-[11px]"
                >
                  Company

                  <input
                    id="fns-company"
                    name="company"
                    autoComplete="organization"
                    maxLength={120}
                    className={field}
                  />
                </label>

                {/* WORK EMAIL */}

                <label
                  htmlFor="fns-email"
                  className="text-[10px] font-medium sm:text-[11px]"
                >
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

                {/* COUNTRY */}

                <label
                  htmlFor="fns-country"
                  className="text-[10px] font-medium sm:text-[11px]"
                >
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

              {/* SERVICE */}

              <label
                htmlFor="fns-service"
                className="
                  mt-5
                  block
                  text-[10px]
                  font-medium
                  sm:mt-7
                  sm:text-[11px]
                "
              >
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

              {/* START DATE */}

              <label
                htmlFor="fns-start"
                className="
                  mt-5
                  block
                  text-[10px]
                  font-medium
                  sm:mt-7
                  sm:text-[11px]
                "
              >
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

              {/* WORKING HOURS */}

              <label
                htmlFor="fns-hours"
                className="
                  mt-5
                  block
                  text-[10px]
                  font-medium
                  sm:mt-7
                  sm:text-[11px]
                "
              >
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

              {/* MESSAGE */}

              <label
                htmlFor="fns-message"
                className="
                  mt-5
                  block
                  text-[10px]
                  font-medium
                  sm:mt-7
                  sm:text-[11px]
                "
              >
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

              {/* EMAIL INFORMATION */}

              <p
                className="
                  mt-4
                  text-[10px]
                  leading-5
                  text-black/55
                  sm:mt-5
                "
              >
                Opens your email app. Review and send your enquiry there.
              </p>

              {/* DESKTOP/TABLET BUTTON */}

              <button
                data-fns-magnetic
                type="submit"
                className="
                  mt-4
                  flex
                  min-h-12
                  w-full
                  items-center
                  justify-between
                  rounded-full
                  bg-[#17191C]
                  px-5
                  text-[11px]
                  font-semibold
                  text-white
                  transition-colors
                  hover:bg-[#B12025]
                  sm:mt-5
                  sm:min-h-14
                  sm:px-6
                  sm:text-xs
                "
              >
                {COPY.cta}

                <ArrowUpRight
                  aria-hidden="true"
                  size={18}
                />
              </button>

              {/* STATUS MESSAGE */}

              <p
                role="status"
                aria-live="polite"
                className="
                  mt-3
                  text-[11px]
                  leading-5
                  text-black/60
                  sm:mt-4
                  sm:text-xs
                  sm:leading-6
                "
              >
                {status}
              </p>

              {/* COPY ENQUIRY */}

              {draft && (
                <div className="mt-4">
                  <textarea
                    data-lenis-prevent
                    aria-label="Your enquiry"
                    readOnly
                    rows={7}
                    value={draft}
                    className="
                      w-full
                      resize-y
                      rounded-xl
                      border
                      border-black/20
                      p-4
                      text-xs
                      leading-6
                    "
                  />

                  <button
                    type="button"
                    onClick={copy}
                    className="
                      mt-3
                      inline-flex
                      items-center
                      gap-2
                      text-xs
                      font-medium
                    "
                  >
                    {copied ? (
                      <Check
                        aria-hidden="true"
                        size={14}
                      />
                    ) : (
                      <Copy
                        aria-hidden="true"
                        size={14}
                      />
                    )}

                    {copied ? 'Copied' : 'Copy enquiry'}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      <FirstNotchFooter />
    </>
  );
}