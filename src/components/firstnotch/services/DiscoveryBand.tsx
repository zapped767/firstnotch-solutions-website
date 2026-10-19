
'use client';

import {
  useState,
  type FormEvent,
} from 'react';

import {
  ArrowUpRight,
  Clock3,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';

const emailAddress = 'Info@firstnotch-solutions.com';

type Inquiry = {
  name: string;
  company: string;
  email: string;
  country: string;
  help: string;
  start: string;
  hours: string;
  notes: string;
};

const initial: Inquiry = {
  name: '',
  company: '',
  email: '',
  country: '',
  help: '',
  start: '',
  hours: '',
  notes: '',
};

// ==========================================
// FLOATING LABEL INPUT
// ==========================================

function FloatInput({
  label,
  value,
  onChange,
  type = 'text',
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <label className="relative block">
      <input
        required
        type={type}
        autoComplete={autoComplete}
        placeholder=" "
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="peer h-[62px] w-full rounded-xl border border-[#17191C]/15 bg-white px-4 pb-2 pt-6 text-sm text-[#17191C] outline-none transition focus:border-[#B12025] focus:ring-1 focus:ring-[#B12025]/30"
      />

      <span className="pointer-events-none absolute left-4 top-2.5 text-[10px] font-semibold text-[#B12025] transition-all peer-placeholder-shown:top-[21px] peer-placeholder-shown:text-[13px] peer-placeholder-shown:font-normal peer-placeholder-shown:text-[#17191C]/50 peer-focus:top-2.5 peer-focus:text-[10px] peer-focus:font-semibold peer-focus:text-[#B12025]">
        {label} *
      </span>
    </label>
  );
}

// ==========================================
// DISCOVERY CALL SECTION
// ==========================================

export default function DiscoveryBand() {
  const [info, setInfo] = useState<Inquiry>(initial);

  const [notice, setNotice] = useState('');

  const update = (
    key: keyof Inquiry,
    value: string
  ) => {
    setInfo((old) => ({
      ...old,
      [key]: value,
    }));
  };

  const requiredFields: (keyof Inquiry)[] = [
    'name',
    'company',
    'email',
    'country',
    'help',
    'start',
    'hours',
  ];

  const completed = requiredFields.filter(
    (key) => info[key].trim()
  ).length;

  // Email-client submission until a backend is connected.
  const submit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const lines = [
      `Full name: ${info.name}`,
      `Company: ${info.company}`,
      `Work email: ${info.email}`,
      `Country: ${info.country}`,
      `Services: ${info.help}`,
      `Start: ${info.start}`,
      `Hours: ${info.hours}`,
      `Notes: ${info.notes || 'Not supplied'}`,
    ];

    const subject =
      `FirstNotch discovery call — ${info.company}`;

    window.location.href =
      `mailto:${emailAddress}?subject=` +
      encodeURIComponent(subject) +
      '&body=' +
      encodeURIComponent(lines.join('\n'));

    setNotice(
      'Your email application should open. Please review and send the email to complete your enquiry.'
    );
  };

  return (
    <section
      id="contact"
      className="relative isolate scroll-mt-24 overflow-hidden bg-[#17191C] py-24 text-white sm:py-28 lg:py-36"
    >
      {/* Decorative Red Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-36 top-0 h-[650px] w-[650px] rounded-full bg-[#B12025]/25 blur-[110px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-36 bottom-0 h-[420px] w-[420px] rounded-full bg-[#B12025]/10 blur-[100px]"
      />

      <div className="relative mx-auto grid max-w-[1440px] gap-12 px-5 md:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">

        {/* LEFT — CONTACT CONTENT */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.24em] text-[#ff9da0]">
            Free discovery call
          </p>

          <h2 className="mt-6 max-w-xl text-[clamp(2.8rem,5.2vw,5.4rem)] font-semibold leading-[1.06] tracking-[-.06em]">
            Tell us what you need{' '}
            <span className="text-[#ff8588]">
              help with.
            </span>
          </h2>

          <p className="mt-7 max-w-[480px] text-[15px] leading-8 text-white/65">
            Tell us where your team needs support.
            We’ll review your requirements and respond
            within one working day.
          </p>

          {/* Contact Information */}
          <div className="mt-12 grid gap-x-7 gap-y-8 sm:grid-cols-2">

            {/* Email */}
            <a
              href={`mailto:${emailAddress}`}
              className="group flex items-start gap-3 text-sm"
            >
              <Mail
                className="mt-0.5 shrink-0 text-[#ff8588]"
                size={19}
              />

              <span>
                <b className="block font-semibold">
                  Email
                </b>

                <span className="mt-2 block break-all text-white/65 group-hover:text-white">
                  {emailAddress}
                </span>
              </span>
            </a>

            {/* Phone */}
            <a
              href="tel:+94772221966"
              className="group flex items-start gap-3 text-sm"
            >
              <Phone
                className="mt-0.5 shrink-0 text-[#ff8588]"
                size={19}
              />

              <span>
                <b className="block font-semibold">
                  Phone
                </b>

                <span className="mt-2 block text-white/65 group-hover:text-white">
                  +94 77 222 1966
                </span>
              </span>
            </a>

            {/* Office */}
            <div className="flex items-start gap-3 text-sm">
              <MapPin
                className="mt-0.5 shrink-0 text-[#ff8588]"
                size={19}
              />

              <span>
                <b className="block font-semibold">
                  Office
                </b>

                <span className="mt-2 block leading-7 text-white/65">
                  No 1A, 1/1 R A De Mel Mawatha,
                  Colombo 4, Sri Lanka
                </span>
              </span>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-3 text-sm">
              <Clock3
                className="mt-0.5 shrink-0 text-[#ff8588]"
                size={19}
              />

              <span>
                <b className="block font-semibold">
                  Hours
                </b>

                <span className="mt-2 block leading-7 text-white/65">
                  Monday to Friday
                  <br />
                  10am to 7pm, Sri Lanka time
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT — GLASS FORM CARD */}
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute -inset-3 rounded-[36px] bg-[#B12025]/20 blur-3xl"
          />

          <form
            onSubmit={submit}
            className="fns-discovery-form relative rounded-[30px] border border-white/50 bg-white/95 p-6 text-[#17191C] shadow-[0_30px_90px_rgba(0,0,0,.22)] backdrop-blur-xl sm:p-9"
          >
            {/* Form Heading */}
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[.2em] text-[#B12025]">
                  Let’s begin
                </p>

                <h3 className="mt-2 text-2xl font-semibold tracking-tight">
                  Book your free call
                </h3>
              </div>

              <span className="text-xs font-semibold text-[#17191C]/45">
                {completed}/7
              </span>
            </div>

            {/* Personal Details */}
            <div className="grid gap-4 sm:grid-cols-2">
              <FloatInput
                label="Full name"
                value={info.name}
                onChange={(value) =>
                  update('name', value)
                }
                autoComplete="name"
              />

              <FloatInput
                label="Company"
                value={info.company}
                onChange={(value) =>
                  update('company', value)
                }
                autoComplete="organization"
              />

              <FloatInput
                label="Work email"
                value={info.email}
                onChange={(value) =>
                  update('email', value)
                }
                type="email"
                autoComplete="email"
              />

              <FloatInput
                label="Country"
                value={info.country}
                onChange={(value) =>
                  update('country', value)
                }
                autoComplete="country-name"
              />
            </div>

            {/* Service Requirements */}
            <div className="mt-4 space-y-4">
              {(
                [
                  [
                    'help',
                    'What do you need help with?',
                    [
                      'Customer support',
                      'BPO and back office',
                      'IT services',
                      'More than one of these',
                      "I'm not sure yet",
                    ],
                  ],
                  [
                    'start',
                    'When should your team start?',
                    [
                      'As soon as possible',
                      'Within the next month',
                      'In 1 to 3 months',
                      'Just exploring for now',
                    ],
                  ],
                  [
                    'hours',
                    'What hours should your team cover?',
                    [
                      'During my business hours',
                      'Outside my business hours',
                      'Both',
                      'Not sure yet',
                    ],
                  ],
                ] as const
              ).map(([key, label, options]) => (
                <label key={key} className="block">
                  <span className="mb-2 block text-xs font-semibold text-[#17191C]/65">
                    {label} *
                  </span>

                  <select
                    required
                    value={info[key]}
                    onChange={(event) =>
                      update(key, event.target.value)
                    }
                    className="h-[52px] w-full rounded-xl border border-[#17191C]/15 bg-white px-4 text-sm outline-none focus:border-[#B12025]"
                  >
                    <option value="">
                      Select an option
                    </option>

                    {options.map((opt) => (
                      <option
                        key={opt}
                        value={opt}
                      >
                        {opt}
                      </option>
                    ))}
                  </select>
                </label>
              ))}

              {/* Additional Notes */}
              <label className="block">
                <span className="mb-2 block text-xs font-semibold text-[#17191C]/65">
                  Anything else we should know?
                </span>

                <textarea
                  value={info.notes}
                  onChange={(event) =>
                    update('notes', event.target.value)
                  }
                  rows={3}
                  placeholder="Tell us about your project…"
                  className="w-full resize-y rounded-xl border border-[#17191C]/15 bg-white px-4 py-3 text-sm outline-none focus:border-[#B12025]"
                />
              </label>
            </div>

            {/* Form Progress */}
            <div
              aria-label={`${completed} of 7 required fields completed`}
              className="mt-6 h-[3px] overflow-hidden rounded-full bg-[#17191C]/10"
            >
              <div
                className="h-full rounded-full bg-[#B12025] transition-[width] duration-300"
                style={{
                  width: `${(completed / 7) * 100}%`,
                }}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="mt-6 flex w-full items-center justify-center gap-3 rounded-full bg-[#B12025] px-6 py-4 text-sm font-semibold text-white shadow-[0_0_34px_rgba(177,32,37,.28)] transition duration-300 hover:bg-[#951a1f] hover:shadow-[0_0_48px_rgba(177,32,37,.43)]"
            >
              Book a free discovery call
              <ArrowUpRight size={18} />
            </button>

            <p
              role="status"
              className="mt-4 text-[11px] leading-5 text-[#17191C]/50"
            >
              {notice ||
                'This form prepares an email in your email application. It does not submit to a server.'}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
