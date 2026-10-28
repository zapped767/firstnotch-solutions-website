
'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCheck,
  ChevronDown,
  CircleAlert,
  ClipboardCheck,
  FileSearch,
  FileText,
  Fingerprint,
  Building2,
  CalendarDays,
  LockKeyhole,
  Search,
  RotateCcw,
  Users,
  BookOpenCheck,
  TrendingUp,
  X,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const BASE = '/services/bpo-back-office-outsourcing';

const features = [
  {
    title: 'Identity document checks',
    tag: 'IDENTITY',
    Icon: Fingerprint,
    description:
      'Passports, ID cards and proof of address are checked for completeness and expiry. Signs of tampering are flagged.',
    samples: [
      'Document completeness',
      'Expiry date',
      'Possible tampering flagged',
    ],
  },
  {
    title: 'Business checks',
    tag: 'BUSINESS',
    Icon: Building2,
    description:
      'For business customers, company registration, directors and owners are checked against official registers.',
    samples: [
      'Company registration',
      'Directors and owners',
      'Official register source',
    ],
  },
  {
    title: 'Sanctions and PEP screening',
    tag: 'SCREENING',
    Icon: Search,
    description:
      'Names are screened against sanctions lists and politically exposed person (PEP) lists using your screening tool.',
    samples: [
      'Customer name',
      'Your screening tool',
      'Potential matches for review',
    ],
  },
  {
    title: 'Adverse media checks',
    tag: 'MEDIA',
    Icon: FileSearch,
    description:
      'News sources are searched for reports of fraud or crime linked to the customer.',
    samples: [
      'News-source search',
      'Identity cross-check',
      'Relevant findings documented',
    ],
  },
  {
    title: 'Alerts reviewed',
    tag: 'ALERTS',
    Icon: CircleAlert,
    description:
      'Matches are sorted using rules you agree. Possible real matches go to your team with notes, and your team can review every cleared alert.',
    samples: [
      'False match + reason',
      'Possible match + notes',
      'Referred to your team',
    ],
  },
  {
    title: 'Your policy and risk rules',
    tag: 'POLICY',
    Icon: BookOpenCheck,
    description:
      'Every check follows your written policy and risk levels. The team never approves or rejects a customer.',
    samples: [
      'Your written policy',
      'Risk category applied',
      'Final decision stays with you',
    ],
  },
  {
    title: 'Audit-ready case files',
    tag: 'AUDIT',
    Icon: ClipboardCheck,
    description:
      'Each case file shows what was checked, the source used and the date, so it is ready when an auditor asks. A second specialist checks each file before it goes to you.',
    samples: [
      'Check / source / date',
      'Second specialist review',
      'Complete case file handover',
    ],
  },
  {
    title: 'Periodic reviews',
    tag: 'REVIEWS',
    Icon: CalendarDays,
    description:
      'Existing customers can be checked again on the schedule your policy sets.',
    samples: [
      'Existing case',
      'Next scheduled review',
      'Policy-defined interval',
    ],
  },
] as const;

const sampleAlerts = [
  {
    id: 'FN-101',
    name: 'Example customer A',
    score: 76,
    issue: 'Similar name',
    clearReason:
      'Different date of birth in this fictional example.',
    referReason:
      'Name similarity needs your compliance team to review.',
  },
  {
    id: 'FN-102',
    name: 'Example business B',
    score: 84,
    issue: 'Director match',
    clearReason:
      'Different registration number in this fictional example.',
    referReason:
      'Ownership evidence needs further assessment.',
  },
  {
    id: 'FN-103',
    name: 'Example customer C',
    score: 68,
    issue: 'Spelling variation',
    clearReason:
      'Different identity document in this fictional example.',
    referReason:
      'Unresolved identity difference sent with notes.',
  },
  {
    id: 'FN-104',
    name: 'Example business D',
    score: 91,
    issue: 'Potential screening match',
    clearReason:
      'Different legal entity confirmed in this fictional example.',
    referReason:
      'Possible match referred without a decision.',
  },
  {
    id: 'FN-105',
    name: 'Example customer E',
    score: 73,
    issue: 'Matching surname',
    clearReason:
      'Different birth date in this fictional example.',
    referReason:
      'Uncertain match referred with notes.',
  },
] as const;

type SortDecision = 'clear' | 'refer';
type Risk = 'low' | 'medium' | 'high';
type CustomerType = 'individual' | 'business';

const metrics = [
  {
    name: 'Cases completed',
    detail:
      'Customer checks finished and sent to your team in the period.',
    note: 'Shown by risk level.',
  },
  {
    name: 'Time per case',
    detail:
      'Time from receiving a case to having it ready for your decision.',
    note: 'Target agreed during setup.',
  },
  {
    name: 'Cases referred',
    detail:
      'Cases with a real screening match or missing documents.',
    note: 'Each one sent with notes.',
  },
  {
    name: 'False matches cleared',
    detail:
      'Screening alerts reviewed and shown to be a different person.',
    note: 'Each one recorded with the reason.',
  },
  {
    name: 'Quality score',
    detail:
      'How closely each case follows your policy, scored by a reviewer.',
    note: 'Shared with you and used in monthly coaching.',
  },
];

const faqs = [
  {
    category: 'Decisions',
    question:
      'Who makes the final decision on a customer?',
    answer:
      'Your compliance team. FirstNotch prepares each case and can add a recommendation if you want one, but approval or rejection stays with you.',
  },
  {
    category: 'Industries',
    question:
      'Which businesses use this service?',
    answer:
      'Any business that must check who its customers are, such as online marketplaces, property agents and payment services.',
  },
  {
    category: 'Tools',
    question:
      'Can the team use our screening tools?',
    answer:
      'Yes. Specialists log in to your screening tools. If you do not have one yet, a provider can be suggested.',
  },
  {
    category: 'Rules',
    question:
      'Which rules does the team follow?',
    answer:
      'The team follows your own policy, which is written for your regulator. FirstNotch does not give legal advice.',
  },
  {
    category: 'Training',
    question:
      'Are the specialists trained in AML?',
    answer:
      'Yes. Each specialist completes AML training before starting work and a refresher course every year.',
  },
  {
    category: 'Data',
    question:
      'How is identity data protected?',
    answer:
      'ID documents are only opened by the specialists on your account, inside your systems. Nothing is downloaded or stored on FirstNotch computers.',
  },
  {
    category: 'Pricing',
    question:
      'How are KYC checks priced?',
    answer:
      'Monthly case volume and the depth of each check set the price. Most clients pay per completed case. A quote follows the discovery call.',
  },
];

const related = [
  ['Data entry and processing', 'data-entry-processing'],
  ['Document processing', 'document-processing'],
  [
    'Data verification and validation',
    'data-verification-validation',
  ],
  ['Lead generation', 'lead-generation'],
  ['Back office operations', 'back-office-operations'],
  ['Virtual assistant services', 'virtual-assistant-services'],
] as const;

const setup = [
  {
    n: '01',
    title: 'Learning your business',
    Icon: ClipboardCheck,
    text:
      'The team maps each process with you, step by step, and writes it down as a checklist you approve.',
  },
  {
    n: '02',
    title: 'Hiring and training',
    Icon: Users,
    text:
      'Team members take language tests, technical assessments and reference checks. Only 15 to 20% of job applicants pass. Each one then practises on sample work before handling yours.',
  },
  {
    n: '03',
    title: 'Going live with quality checks',
    Icon: CheckCheck,
    text:
      'Every task gets a quality score. Work starts at a lower volume with extra checks, and volume grows once accuracy is steady. Each team member has a monthly performance review with coaching.',
  },
  {
    n: '04',
    title: 'Reporting and improving',
    Icon: TrendingUp,
    text:
      'You get a monthly report on volumes, turnaround times, accuracy and the most common errors, plus a call to agree what to improve.',
  },
] as const;

const sampleByRisk: Record<
  Risk,
  [string, string, string]
> = {
  low: [
    '12 sample cases',
    '1 sample referral',
    '4 cleared alerts',
  ],
  medium: [
    '7 sample cases',
    '2 sample referrals',
    '3 cleared alerts',
  ],
  high: [
    '3 sample cases',
    '2 sample referrals',
    '1 cleared alert',
  ],
};

// ======================================================
// SCROLL WORD REVEAL HEADING
// ======================================================

function RevealHeading({
  text,
  light = false,
  className = '',
}: {
  text: string;
  light?: boolean;
  className?: string;
}) {
  return (
    <h2
      data-kyc-heading
      className={`text-[clamp(2rem,4.05vw,4.3rem)] font-semibold leading-[1.12] tracking-[-.06em] ${
        light
          ? 'text-white'
          : 'text-[#B12025]'
      } ${className}`}
    >
      {text.split(' ').map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-bottom"
        >
          <span
            data-kyc-word
            className="inline-block"
          >
            {word}{'\u00a0'}
          </span>
        </span>
      ))}
    </h2>
  );
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
  light = false,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  light?: boolean;
}) {
  return (
    <div>
      <p
        data-kyc-fade
        className={`text-[10px] font-bold uppercase tracking-[.19em] ${
          light
            ? 'text-white/75'
            : 'text-[#B12025]/75'
        }`}
      >
        {eyebrow}
      </p>

      <RevealHeading
        text={title}
        light={light}
        className="mt-3 max-w-[990px]"
      />

      {subtitle && (
        <p
          data-kyc-fade
          className={`mt-3 max-w-[750px] text-[14px] leading-[1.75] ${
            light
              ? 'text-white/80'
              : 'text-[#17191C]/70'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ======================================================
// MAIN COMPONENT
// ======================================================

export default function ComplianceKycAmlPage() {
  const rootRef = useRef<HTMLDivElement>(null);

  const [featureIndex, setFeatureIndex] =
    useState(0);

  const [decisions, setDecisions] = useState<
    Record<string, SortDecision>
  >({});

  const [risk, setRisk] =
    useState<Risk>('medium');

  const [customerType, setCustomerType] =
    useState<CustomerType>('individual');

  const [faqQuery, setFaqQuery] =
    useState('');

  const [faqIndex, setFaqIndex] =
    useState(0);

  const [notice, setNotice] = useState(
    'All five fictional alerts are awaiting review.'
  );

  const [auditHovered, setAuditHovered] =
    useState(false);

  const [auditPinned, setAuditPinned] =
    useState(false);

  const auditOpen = auditHovered || auditPinned;

  const waiting = sampleAlerts.filter(
    (a) => !decisions[a.id]
  );

  const cleared = sampleAlerts.filter(
    (a) => decisions[a.id] === 'clear'
  );

  const referred = sampleAlerts.filter(
    (a) => decisions[a.id] === 'refer'
  );

  const matchedFaqs = faqs
    .map((f, index) => ({
      ...f,
      index,
    }))
    .filter((f) =>
      `${f.question} ${f.answer} ${f.category}`
        .toLowerCase()
        .includes(
          faqQuery.toLowerCase().trim()
        )
    );

  const currentFaq =
    matchedFaqs.find(
      (f) => f.index === faqIndex
    ) ?? matchedFaqs[0];

  // ====================================================
  // ALERT DEMO ACTIONS
  // ====================================================

  const sortAlert = (
    id: string,
    choice: SortDecision
  ) => {
    if (
      !sampleAlerts.some(
        (a) => a.id === id
      )
    ) {
      return;
    }

    setDecisions((prev) => ({
      ...prev,
      [id]: choice,
    }));

    setNotice(
      `${id}: ${
        choice === 'clear'
          ? 'false-match reason recorded'
          : 'referred with notes to your team'
      }. Demo only.`
    );
  };

  const undoAlert = (id: string) => {
    setDecisions((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });

    setNotice(
      `${id} returned to the sample review queue.`
    );
  };

  // ====================================================
  // GSAP ANIMATIONS
  // ====================================================

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const mm = gsap.matchMedia();

    mm.add(
      '(prefers-reduced-motion: no-preference)',
      () => {
        const ctx = gsap.context(() => {
          // Hero heading: rising line by line

          gsap.fromTo(
            '[data-kyc-hero-line]',
            {
              yPercent: 105,
              opacity: 0,
            },
            {
              yPercent: 0,
              opacity: 1,
              stagger: 0.14,
              duration: 1,
              ease: 'power4.out',
            }
          );

          // Hero supporting text

          gsap.fromTo(
            '[data-kyc-hero-small]',
            {
              y: 18,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              stagger: 0.11,
              delay: 0.22,
              duration: 0.65,
              ease: 'power3.out',
            }
          );

          // Hero checklist icons

          gsap.fromTo(
            '[data-kyc-hero-check]',
            {
              scale: 0.45,
              opacity: 0,
            },
            {
              scale: 1,
              opacity: 1,
              stagger: 0.09,
              delay: 0.55,
              duration: 0.45,
              ease: 'back.out(1.7)',
            }
          );

          // All section headings: scroll word reveal

          gsap.utils
            .toArray<HTMLElement>(
              '[data-kyc-heading]'
            )
            .forEach((heading) => {
              const words =
                heading.querySelectorAll(
                  '[data-kyc-word]'
                );

              gsap.fromTo(
                words,
                {
                  y: 17,
                  opacity: 0.22,
                },
                {
                  y: 0,
                  opacity: 1,
                  stagger: 0.025,
                  ease: 'none',

                  scrollTrigger: {
                    trigger: heading,
                    start: 'top 91%',
                    end: 'bottom 57%',
                    scrub: 0.6,
                  },
                }
              );
            });

          // Subtitles and eyebrow text rising

          gsap.utils
            .toArray<HTMLElement>(
              '[data-kyc-fade]'
            )
            .forEach((el) => {
              gsap.fromTo(
                el,
                {
                  y: 17,
                  opacity: 0,
                },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.7,
                  ease: 'power3.out',

                  scrollTrigger: {
                    trigger: el,
                    start: 'top 92%',
                    once: true,
                  },
                }
              );
            });

          // Testimonial word-by-word reveal

          gsap.fromTo(
            '[data-kyc-quote-word]',
            {
              opacity: 0.2,
              y: 14,
            },
            {
              opacity: 1,
              y: 0,
              stagger: 0.025,
              ease: 'none',

              scrollTrigger: {
                trigger: '#kyc-quote',
                start: 'top 77%',
                end: 'bottom 52%',
                scrub: 0.6,
              },
            }
          );

          // Count-up statistics

          gsap.utils
            .toArray<HTMLElement>(
              '[data-kyc-stat]'
            )
            .forEach((el) => {
              const number = { n: 0 };

              gsap.to(number, {
                n: Number(
                  el.dataset.kycStat || 0
                ),
                duration: 1.4,
                ease: 'power2.out',

                scrollTrigger: {
                  trigger: el,
                  start: 'top 90%',
                  once: true,
                },

                onUpdate: () => {
                  el.textContent = String(
                    Math.round(number.n)
                  );
                },
              });
            });

          // Process timeline progress

          gsap.fromTo(
            '[data-kyc-process-line]',
            {
              scaleX: 0,
            },
            {
              scaleX: 1,
              ease: 'none',

              scrollTrigger: {
                trigger: '#kyc-setup',
                start: 'top 78%',
                end: 'bottom 55%',
                scrub: true,
              },
            }
          );

          // Page scroll progress

          gsap.fromTo(
            '[data-kyc-progress]',
            {
              scaleX: 0,
            },
            {
              scaleX: 1,
              ease: 'none',

              scrollTrigger: {
                trigger: root,
                start: 'top top',
                end: 'bottom bottom',
                scrub: true,
              },
            }
          );
        }, root);

        return () => ctx.revert();
      }
    );

    return () => mm.revert();
  }, []);

  const faqJson = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',

    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };

  return (
    <div
      ref={rootRef}
      className="overflow-x-clip bg-white font-sans text-[#17191C]"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            faqJson
          ).replace(/</g, '\\u003c'),
        }}
      />

      {/* Page progress */}

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-[74px] z-40 h-[2px]"
      >
        <div
          data-kyc-progress
          className="h-full w-full origin-left bg-[#B12025]"
        />
      </div>

      {/* =============================================
          01 — HERO
          RED BACKGROUND + WHITE TEXT
      ============================================= */}

      <section className="relative overflow-hidden bg-[#B12025] px-5 pb-16 pt-16 text-white sm:px-8 lg:px-14 lg:pb-[84px] lg:pt-[76px]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-[170px] -top-[100px] h-[550px] w-[550px] rounded-full border border-white/15"
        />

        <div className="relative mx-auto grid max-w-[1420px] items-center gap-10 lg:grid-cols-[1.12fr_.88fr] lg:gap-14">
          <div>
            <p
              data-kyc-hero-small
              className="text-[11px] text-white/70"
            >
              Services / BPO &amp; Back Office /
              Compliance, KYC and AML support
            </p>

            <p
              data-kyc-hero-small
              className="mt-6 text-[10px] font-bold uppercase tracking-[.2em] text-white/80"
            >
              KYC and AML support services in Sri Lanka
            </p>

            {/* Rising heading */}

            <h1 className="mt-5 max-w-[820px] text-[clamp(2.3rem,4.35vw,4.9rem)] font-semibold leading-[1.08] tracking-[-.064em]">
              {[
                'KYC and AML checks',
                'prepared by specialists,',
                'with final decisions left',
                'to your compliance team.',
              ].map((line) => (
                <span
                  key={line}
                  className="block overflow-hidden pb-[.08em]"
                >
                  <span
                    data-kyc-hero-line
                    className="block"
                  >
                    {line}
                  </span>
                </span>
              ))}
            </h1>

            <p
              data-kyc-hero-small
              className="mt-5 max-w-[670px] text-[14px] leading-[1.8] text-white/85"
            >
              New customers often wait days while
              their checks are done, and each
              check must be recorded for future
              audits. FirstNotch specialists handle
              the routine parts of KYC and AML
              work with automated tools. Each case
              is then prepared for your compliance
              team to decide on.
            </p>

            <div
              data-kyc-hero-small
              className="mt-6 flex flex-wrap gap-3"
            >
              <a
                href="#contact"
                className="inline-flex min-h-[47px] items-center gap-2 rounded-full bg-white px-6 text-[12px] font-bold text-[#B12025] transition hover:bg-[#FFEAEA]"
              >
                Book a free discovery call
                <ArrowUpRight size={16} />
              </a>

              <a
                href="#kyc-features"
                className="inline-flex min-h-[47px] items-center gap-2 rounded-full border border-white/60 px-6 text-[12px] font-semibold text-white transition hover:bg-white/10"
              >
                See what is included
                <ArrowDown size={16} />
              </a>
            </div>
          </div>

          {/* Open case preview, no square container */}

          <div className="relative mx-auto w-full max-w-[510px]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-3 rounded-full border border-white/15"
            />

            <div className="relative px-2 py-5 sm:px-6">
              <div className="flex justify-between gap-3 border-b border-white/30 pb-3 font-mono text-[10px] tracking-[.12em]">
                <span>FN / CASE-0412</span>
                <span>EXAMPLE FILE</span>
              </div>

              <h2 className="mt-5 text-[clamp(1.5rem,2.7vw,2.4rem)] font-semibold tracking-[-.04em]">
                Prepared by FirstNotch
              </h2>

              <ul className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3">
                {[
                  'ID checked',
                  'Address checked',
                  'Sanctions screened',
                  'PEP screened',
                  'Media reviewed',
                  'Business checked',
                ].map((s) => (
                  <li
                    key={s}
                    className="flex items-center gap-2 border-b border-white/25 pb-2 text-[11px]"
                  >
                    <Check
                      data-kyc-hero-check
                      size={16}
                      className="shrink-0"
                    />
                    {s}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <span className="-rotate-3 border-2 border-white px-4 py-2 text-[13px] font-black uppercase tracking-[.18em]">
                  Prepared
                </span>

                <span className="text-[11px] text-white/80">
                  Recommendation optional
                </span>
              </div>

              <p className="mt-5 flex items-center gap-2 border-y border-white/25 py-3 text-[12px] font-semibold">
                FirstNotch prepares
                <ArrowRight size={17} />
                Your team decides
              </p>

              <p className="mt-4 flex items-start gap-2 text-[11px] leading-5 text-white/75">
                <LockKeyhole
                  size={16}
                  className="shrink-0"
                />
                No customer approval or rejection
                is made by this demonstration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =============================================
          02 — SERVICE FEATURES
          WHITE BACKGROUND
      ============================================= */}

      <section
        id="kyc-features"
        className="scroll-mt-[90px] bg-white px-5 py-16 sm:px-8 lg:px-14 lg:py-20"
      >
        <div className="mx-auto max-w-[1420px]">
          <SectionHeading
            eyebrow="01 / Service scope"
            title="Every case prepared to your rules"
            subtitle="Eight connected checks, documented for your compliance team. Choose a check to see the sample case notes."
          />

          <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1.08fr_.92fr] lg:gap-12">
            <ul className="divide-y divide-[#B12025]/20 border-t border-[#B12025]/20">
              {features.map((f, i) => (
                <li key={f.title}>
                  <button
                    type="button"
                    onClick={() =>
                      setFeatureIndex(i)
                    }
                    aria-pressed={
                      featureIndex === i
                    }
                    className="group flex w-full items-start gap-3 py-3.5 text-left focus-visible:outline-2 focus-visible:outline-[#B12025]"
                  >
                    <span className="mt-1 font-mono text-[10px] text-[#B12025]/60">
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    <span className="flex-1">
                      <span
                        className={`block text-[16px] font-semibold transition group-hover:translate-x-1 ${
                          featureIndex === i
                            ? 'text-[#B12025]'
                            : 'text-[#17191C]'
                        }`}
                      >
                        {f.title}
                      </span>

                      {featureIndex === i && (
                        <span className="mt-1 block text-[12px] leading-6 text-[#17191C]/70">
                          {f.description}
                        </span>
                      )}
                    </span>

                    <f.Icon
                      size={19}
                      className="shrink-0 text-[#B12025]"
                    />
                  </button>
                </li>
              ))}
            </ul>

            <div className="self-start lg:sticky lg:top-[115px]">
              <div className="relative mx-auto flex aspect-square w-full max-w-[385px] flex-col justify-center rounded-full border border-[#B12025]/30 p-7 text-center sm:p-10">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-4 rounded-full border border-dashed border-[#B12025]/20"
                />

                <p className="relative font-mono text-[10px] tracking-[.15em] text-[#B12025]/65">
                  CASE-0412 / {features[featureIndex].tag}
                </p>

                <h3 className="relative mt-4 text-[clamp(1.3rem,2.35vw,2.1rem)] font-semibold tracking-[-.05em] text-[#B12025]">
                  {features[featureIndex].title}
                </h3>

                <ul className="relative mt-5 space-y-2">
                  {features[featureIndex].samples.map(
                    (s) => (
                      <li
                        key={s}
                        className="flex items-center justify-center gap-2 text-[11px] text-[#17191C]/75"
                      >
                        <Check
                          size={13}
                          className="shrink-0 text-[#B12025]"
                        />
                        {s}
                      </li>
                    )
                  )}
                </ul>

                <p className="relative mt-4 text-[10px] font-bold uppercase tracking-[.13em] text-[#B12025]/65">
                  Prepared, not approved
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =============================================
          03 — ALERT SORTING
          SOFT WHITE BACKGROUND
      ============================================= */}

      <section
        id="kyc-alerts"
        className="bg-[#FFF7F7] px-5 py-16 sm:px-8 lg:px-14 lg:py-20"
      >
        <div className="mx-auto max-w-[1420px]">
          <SectionHeading
            eyebrow="02 / Interactive screening"
            title="Sort the alerts"
            subtitle="Drag an example alert to a tray or use its buttons. False matches are cleared with a reason; possible real matches go to your compliance team. No customer is approved here."
          />

          <p className="mt-4 inline-flex rounded-full border border-[#B12025]/30 px-4 py-2 text-[10px] font-bold uppercase tracking-[.1em] text-[#B12025]">
            Fictional data · not live screening
          </p>

          <p
            role="status"
            aria-live="polite"
            className="mt-4 border-l-[3px] border-[#B12025] pl-3 text-[12px] text-[#17191C]/70"
          >
            {notice}
          </p>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:gap-12">
            <div>
              <div className="flex items-center justify-between border-b border-[#B12025]/30 pb-3">
                <h3 className="text-[23px] font-semibold text-[#B12025]">
                  Review queue
                </h3>

                <span className="font-mono text-[11px] text-[#B12025]">
                  {waiting.length} WAITING
                </span>
              </div>

              <div className="divide-y divide-[#B12025]/15">
                {waiting.map((item) => (
                  <article
                    key={item.id}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData(
                        'text/plain',
                        item.id
                      );

                      e.dataTransfer.effectAllowed =
                        'move';
                    }}
                    className="cursor-grab py-4 active:cursor-grabbing"
                  >
                    <div className="flex flex-wrap justify-between gap-2">
                      <span className="font-mono text-[10px] text-[#17191C]/55">
                        {item.id} · {item.name}
                      </span>

                      <span className="text-[10px] text-[#B12025]">
                        Example score {item.score}
                      </span>
                    </div>

                    <h4 className="mt-2 text-[19px] font-semibold">
                      {item.issue}
                    </h4>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          sortAlert(item.id, 'clear')
                        }
                        className="rounded-full bg-[#B12025] px-4 py-2 text-[11px] font-semibold text-white"
                      >
                        Clear with reason
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          sortAlert(item.id, 'refer')
                        }
                        className="rounded-full border border-[#B12025]/50 px-4 py-2 text-[11px] font-semibold text-[#B12025]"
                      >
                        Refer with notes
                      </button>
                    </div>
                  </article>
                ))}

                {waiting.length === 0 && (
                  <p className="py-6 text-[13px] text-[#17191C]/65">
                    All sample alerts have been sorted.
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-5">
              {(
                [
                  [
                    'clear',
                    'False match · reason recorded',
                    cleared,
                  ],
                  [
                    'refer',
                    'Possible match · referred',
                    referred,
                  ],
                ] as const
              ).map(([kind, title, items]) => (
                <div
                  key={kind}
                  onDragOver={(e) =>
                    e.preventDefault()
                  }
                  onDrop={(e) => {
                    e.preventDefault();

                    sortAlert(
                      e.dataTransfer.getData(
                        'text/plain'
                      ),
                      kind
                    );
                  }}
                  className="min-h-[115px] rounded-[32px] border border-dashed border-[#B12025]/45 px-6 py-5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-[17px] font-semibold text-[#B12025]">
                      {title}
                    </h3>

                    <span className="rounded-full border border-[#B12025]/30 px-3 py-1 text-[11px] text-[#B12025]">
                      {items.length}
                    </span>
                  </div>

                  {items.length === 0 && (
                    <p className="mt-3 text-[12px] text-[#17191C]/60">
                      Drop an alert here or use the
                      queue buttons.
                    </p>
                  )}

                  {items.map((a) => (
                    <div
                      key={a.id}
                      className="mt-3 border-t border-[#B12025]/20 pt-3"
                    >
                      <div className="flex justify-between gap-3">
                        <span className="font-mono text-[10px]">
                          {a.id} · {a.name}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            undoAlert(a.id)
                          }
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#B12025]"
                        >
                          <RotateCcw size={13} />
                          Undo
                        </button>
                      </div>

                      <p className="mt-1 text-[12px] leading-6 text-[#17191C]/70">
                        {kind === 'clear'
                          ? a.clearReason
                          : a.referReason}
                      </p>
                    </div>
                  ))}
                </div>
              ))}

              <button
                type="button"
                onClick={() => {
                  setDecisions({});
                  setNotice(
                    'All fictional alerts returned to the review queue.'
                  );
                }}
                className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#B12025] underline underline-offset-4"
              >
                <RotateCcw size={15} />
                Reset sample alerts
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =============================================
          04 — POLICY
          BRAND RED BACKGROUND
      ============================================= */}

      <section
        id="kyc-policy"
        className="bg-[#B12025] px-5 py-16 text-white sm:px-8 lg:px-14 lg:py-20"
      >
        <div className="mx-auto grid max-w-[1420px] gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
          <SectionHeading
            light
            eyebrow="03 / Written policy"
            title="Your rules. Your decision"
            subtitle="Choose a sample customer type and risk level. The real process always follows your written policy."
          />

          <div className="space-y-5 border-y border-white/35 py-6">
            <fieldset>
              <legend className="mb-3 text-[12px] font-semibold">
                Customer type
              </legend>

              <div className="flex flex-wrap gap-2">
                {(
                  ['individual', 'business'] as const
                ).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() =>
                      setCustomerType(t)
                    }
                    aria-pressed={
                      customerType === t
                    }
                    className={`rounded-full border px-5 py-2 text-[12px] capitalize ${
                      customerType === t
                        ? 'border-white bg-white font-bold text-[#B12025]'
                        : 'border-white/55'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="mb-3 text-[12px] font-semibold">
                Example risk level
              </legend>

              <div className="flex flex-wrap gap-2">
                {(
                  ['low', 'medium', 'high'] as const
                ).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRisk(r)}
                    aria-pressed={risk === r}
                    className={`rounded-full border px-5 py-2 text-[12px] capitalize ${
                      risk === r
                        ? 'border-white bg-white font-bold text-[#B12025]'
                        : 'border-white/55'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </fieldset>

            <div>
              <p className="mb-3 text-[12px] font-semibold">
                Illustrative checks
              </p>

              <div className="flex flex-wrap gap-2">
                {[
                  'Identity',
                  'Sanctions / PEP',
                  ...(customerType === 'business'
                    ? [
                        'Company registry',
                        'Ownership',
                      ]
                    : ['Proof of address']),
                  ...(risk !== 'low'
                    ? ['Risk-rule review']
                    : []),
                  ...(risk === 'high'
                    ? [
                        'Adverse media',
                        'Additional review',
                      ]
                    : []),
                ].map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center gap-2 rounded-full border border-white/40 px-3 py-2 text-[11px]"
                  >
                    <Check size={13} />
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <p className="border-l-[3px] border-white pl-3 text-[11px] leading-6 text-white/75">
              Illustration only. FirstNotch does
              not give legal advice or make
              customer approval decisions.
            </p>
          </div>
        </div>
      </section>

      {/* =============================================
          05 — METRICS
          WHITE BACKGROUND
      ============================================= */}

      <section
        id="kyc-metrics"
        className="bg-white px-5 py-16 sm:px-8 lg:px-14 lg:py-20"
      >
        <div className="mx-auto max-w-[1420px]">
          <SectionHeading
            eyebrow="04 / Reporting"
            title="The numbers you will see"
            subtitle="Faster checks only help if every case can be audited. Your monthly report tracks speed and quality together."
          />

          <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-b border-[#B12025]/25 pb-4">
            <p className="font-mono text-[10px] uppercase tracking-[.1em] text-[#B12025]">
              Monthly case ledger · sample report
            </p>

            <div className="flex gap-2">
              {(
                ['low', 'medium', 'high'] as const
              ).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRisk(r)}
                  className={`rounded-full border px-3 py-1.5 text-[11px] capitalize ${
                    risk === r
                      ? 'border-[#B12025] bg-[#B12025] text-white'
                      : 'border-[#B12025]/30 text-[#B12025]'
                  }`}
                >
                  {r} risk
                </button>
              ))}
            </div>
          </div>

          <dl className="divide-y divide-[#B12025]/15">
            {metrics.map((m, i) => (
              <div
                key={m.name}
                className="grid gap-2 py-4 md:grid-cols-[.85fr_1.4fr_.8fr] md:items-center"
              >
                <dt className="text-[17px] font-semibold text-[#B12025]">
                  {m.name}
                </dt>

                <dd className="text-[13px] leading-6 text-[#17191C]/70">
                  {m.detail}
                </dd>

                <dd className="text-[12px] font-semibold text-[#B12025]">
                  {i === 0
                    ? sampleByRisk[risk][0]
                    : i === 2
                      ? sampleByRisk[risk][1]
                      : i === 3
                        ? sampleByRisk[risk][2]
                        : m.note}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-2 text-[11px] text-[#17191C]/55">
            Illustrative report values. Real results
            are based on your completed cases.
          </p>

          <div className="mt-7 grid grid-cols-2 gap-5 border-t border-[#B12025]/20 pt-6 sm:grid-cols-3">
            <div>
              <p className="text-[clamp(2rem,4vw,3.8rem)] font-bold tracking-[-.06em] text-[#B12025]">
                <span data-kyc-stat="85">
                  85
                </span>
                %
              </p>

              <p className="text-[11px] text-[#17191C]/65">
                client retention rate
              </p>
            </div>

            <div>
              <p className="text-[clamp(2rem,4vw,3.8rem)] font-bold tracking-[-.06em] text-[#B12025]">
                <span data-kyc-stat="98">
                  98
                </span>
                %
              </p>

              <p className="text-[11px] text-[#17191C]/65">
                accuracy rate across client work
              </p>
            </div>

            <div>
              <p className="text-[clamp(2rem,4vw,3.8rem)] font-bold tracking-[-.06em] text-[#B12025]">
                <span data-kyc-stat="15">
                  15
                </span>
                –
                <span data-kyc-stat="20">
                  20
                </span>
                %
              </p>

              <Link
                href="/how-we-hire"
                className="inline-flex items-center gap-1 text-[11px] text-[#B12025] underline underline-offset-4"
              >
                of applicants pass hiring checks
                <ArrowUpRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =============================================
          06 — AUDIT RECEIPT
          HOVER AND TAP ANIMATION
      ============================================= */}

      <section
        id="kyc-audit"
        className="bg-[#B12025] px-5 py-16 text-white sm:px-8 lg:px-14 lg:py-20"
      >
        <div className="mx-auto grid max-w-[1420px] items-start gap-7 lg:grid-cols-[1fr_1fr] lg:gap-12">
          <div>
            <SectionHeading
              light
              eyebrow="05 / Audit-ready records"
              title="When an auditor asks, the file is ready"
              subtitle="Hover over the audit receipt to see the case history. Tap or click on mobile and tablets. The file is fictional sample data."
            />

            <p className="mt-4 flex items-center gap-2 text-[12px] text-white/75">
              <FileText size={17} />
              FN-0412 · Example file
            </p>
          </div>

          <div
            onPointerEnter={(e) => {
              if (e.pointerType === 'mouse') {
                setAuditHovered(true);
              }
            }}
            onPointerLeave={(e) => {
              if (e.pointerType === 'mouse') {
                setAuditHovered(false);
              }
            }}
          >
            <button
              type="button"
              aria-expanded={auditOpen}
              aria-controls="kyc-receipt"
              onClick={() =>
                setAuditPinned((v) => !v)
              }
              className="group flex w-full items-center justify-between gap-3 rounded-full border border-white/65 px-6 py-4 text-left text-white transition hover:bg-white hover:text-[#B12025] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <span className="inline-flex items-center gap-3 text-[17px] font-semibold">
                <FileText size={22} />
                Audit receipt · FN-0412
              </span>

              <ChevronDown
                size={21}
                className={`shrink-0 transition-transform duration-500 ${
                  auditOpen
                    ? 'rotate-180'
                    : ''
                }`}
              />
            </button>

            {/* Unrolling receipt */}

            <div
              id="kyc-receipt"
              aria-hidden={!auditOpen}
              className={`grid transition-[grid-template-rows,opacity,transform] duration-500 ease-in-out ${
                auditOpen
                  ? 'grid-rows-[1fr] translate-y-0 opacity-100'
                  : 'grid-rows-[0fr] -translate-y-3 opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <div className="mx-auto mt-3 w-[93%] border-x border-b border-dashed border-white/60 px-5 pb-6 pt-5 sm:px-7">
                  <div className="flex justify-between gap-3 border-b border-white/25 pb-4 font-mono text-[10px] tracking-[.12em]">
                    <span>
                      AUDIT TRAIL / CASE-0412
                    </span>
                    <CheckCheck size={17} />
                  </div>

                  <ol className="mt-4 space-y-3">
                    {[
                      'Identity document checked',
                      'Source and reference recorded',
                      'Check date recorded',
                      'Second specialist reviewed',
                      'Prepared case sent to your team',
                    ].map((s, i) => (
                      <li
                        key={s}
                        className="flex items-center gap-3 border-b border-white/15 pb-3 text-[12px]"
                      >
                        <span className="font-mono text-white/60">
                          0{i + 1}
                        </span>

                        <span className="flex-1">
                          {s}
                        </span>

                        <Check size={15} />
                      </li>
                    ))}
                  </ol>

                  <p className="mt-4 text-[11px] text-white/75">
                    Prepared by FirstNotch ·
                    Final decision by your team
                  </p>

                  <p className="mt-2 font-mono text-[10px] text-white/60">
                    ILLUSTRATIVE · NOT A REAL
                    CUSTOMER FILE
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-2 text-center text-[11px] text-white/65">
              Hover to unroll · Tap to toggle
            </p>
          </div>
        </div>
      </section>

      {/* =============================================
          07 — TESTIMONIAL
          SCROLL WORD REVEAL
      ============================================= */}

      <section
        id="kyc-quote"
        className="relative overflow-hidden bg-white px-5 py-16 text-[#B12025] sm:px-8 lg:px-14 lg:py-20"
      >
        <div className="mx-auto max-w-[1150px]">
          <p
            data-kyc-fade
            className="text-[11px] font-bold uppercase tracking-[.17em] text-[#B12025]/65"
          >
            Online marketplace / Client experience
          </p>

          <blockquote className="mt-5 text-[clamp(1.9rem,3.75vw,4.1rem)] font-semibold leading-[1.2] tracking-[-.05em]">
            {(
              '“New sellers used to wait a week to be approved. Their checks are now ready for our team within a day, and each case file is complete.”'
            )
              .split(' ')
              .map((word, i) => (
                <span
                  key={`${word}-${i}`}
                  className="inline-block overflow-hidden align-bottom"
                >
                  <span
                    data-kyc-quote-word
                    className="inline-block"
                  >
                    {word}{'\u00a0'}
                  </span>
                </span>
              ))}
          </blockquote>

          <p
            data-kyc-fade
            className="mt-5 text-[11px] font-semibold uppercase tracking-[.17em] text-[#B12025]/70"
          >
            Online marketplace
          </p>
        </div>
      </section>

      {/* =============================================
          08 — FAQ
          LIGHT GREY BACKGROUND
      ============================================= */}

      <section
        id="kyc-faq"
        className="bg-[#F6F6F7] px-5 py-16 sm:px-8 lg:px-14 lg:py-20"
      >
        <div className="mx-auto max-w-[1420px]">
          <SectionHeading
            eyebrow="06 / Questions answered"
            title="Common questions about KYC and AML support"
          />

          <div className="mt-6 flex items-center gap-3 border-b border-[#B12025]/35 pb-3">
            <Search
              size={18}
              className="text-[#B12025]"
            />

            <input
              type="search"
              value={faqQuery}
              onChange={(e) =>
                setFaqQuery(e.target.value)
              }
              placeholder="Search questions"
              aria-label="Search KYC questions"
              className="w-full bg-transparent py-2 text-[13px] text-[#17191C] outline-none placeholder:text-[#17191C]/50"
            />

            {faqQuery && (
              <button
                type="button"
                onClick={() =>
                  setFaqQuery('')
                }
                aria-label="Clear search"
                className="text-[#B12025]"
              >
                <X size={17} />
              </button>
            )}
          </div>

          {/* Desktop FAQ */}

          <div className="mt-6 hidden gap-10 lg:grid lg:grid-cols-[.95fr_1.05fr]">
            <div className="divide-y divide-[#B12025]/20 border-t border-[#B12025]/20">
              {matchedFaqs.map((f) => (
                <button
                  key={f.question}
                  type="button"
                  onClick={() =>
                    setFaqIndex(f.index)
                  }
                  aria-pressed={
                    currentFaq?.index === f.index
                  }
                  className="flex w-full items-center justify-between gap-4 py-4 text-left"
                >
                  <span>
                    <span className="block text-[10px] font-bold uppercase tracking-[.12em] text-[#B12025]/65">
                      {f.category}
                    </span>

                    <span
                      className={`mt-1 block text-[16px] font-semibold ${
                        currentFaq?.index === f.index
                          ? 'text-[#B12025]'
                          : 'text-[#17191C]'
                      }`}
                    >
                      {f.question}
                    </span>
                  </span>

                  <ArrowRight
                    size={17}
                    className="shrink-0 text-[#B12025]"
                  />
                </button>
              ))}

              {matchedFaqs.length === 0 && (
                <p className="py-4 text-[13px]">
                  No matching questions.
                </p>
              )}
            </div>

            <div className="self-start border-t-2 border-[#B12025] pt-5 lg:sticky lg:top-[120px]">
              {currentFaq && (
                <div key={currentFaq.question}>
                  <p className="text-[10px] font-bold uppercase tracking-[.13em] text-[#B12025]/65">
                    {currentFaq.category}
                  </p>

                  <h3 className="mt-3 text-[clamp(1.5rem,2.25vw,2.4rem)] font-semibold tracking-[-.04em] text-[#B12025]">
                    {currentFaq.question}
                  </h3>

                  <p className="mt-4 text-[14px] leading-[1.85] text-[#17191C]/75">
                    {currentFaq.answer}
                  </p>

                  {currentFaq.index === 0 && (
                    <p className="mt-5 flex flex-wrap items-center gap-2 border-t border-[#B12025]/15 pt-4 text-[12px] font-semibold text-[#B12025]">
                      Prepared by FirstNotch
                      <ArrowRight size={15} />
                      Decided by your team
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile FAQ */}

          <div className="mt-5 divide-y divide-[#B12025]/20 lg:hidden">
            {matchedFaqs.map((f) => (
              <details
                key={f.question}
                className="group py-4"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[15px] font-semibold text-[#B12025] [&::-webkit-details-marker]:hidden">
                  {f.question}

                  <ChevronDown
                    size={17}
                    className="shrink-0 transition-transform group-open:rotate-180"
                  />
                </summary>

                <p className="pt-3 text-[13px] leading-7 text-[#17191C]/75">
                  {f.answer}
                </p>
              </details>
            ))}

            {matchedFaqs.length === 0 && (
              <p className="py-4 text-[13px]">
                No matching questions.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* =============================================
          09 — RELATED SERVICES
          WHITE BACKGROUND
      ============================================= */}

      <section
        id="kyc-related"
        className="bg-white px-5 py-14 sm:px-8 lg:px-14 lg:py-16"
      >
        <div className="mx-auto max-w-[1420px]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <RevealHeading
              text="Other BPO and back office services"
              className="max-w-[850px]"
            />

            <Link
              href={BASE}
              className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#B12025] underline underline-offset-4"
            >
              See all services
              <ArrowUpRight size={15} />
            </Link>
          </div>

          <div className="mt-5 grid gap-x-10 md:grid-cols-2">
            {related.map(([name, slug]) => (
              <Link
                key={slug}
                href={`${BASE}/${slug}`}
                className="group flex items-center justify-between gap-4 border-b border-[#B12025]/20 py-4 text-[14px] font-semibold text-[#B12025] transition hover:pl-2"
              >
                <span>{name}</span>

                <ArrowRight
                  size={17}
                  className="shrink-0 transition-transform group-hover:translate-x-2"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =============================================
          10 — TEAM SETUP
          FIRSTNOTCH RED BACKGROUND
      ============================================= */}

      <section
        id="kyc-setup"
        className="bg-[#B12025] px-5 py-16 text-white sm:px-8 lg:px-14 lg:py-20"
      >
        <div className="mx-auto max-w-[1420px]">
          <SectionHeading
            light
            eyebrow="07 / How we work"
            title="How your back office team is set up"
            subtitle="The biggest risk with outsourced admin is mistakes that reach your systems. These steps are there to stop that."
          />

          <div className="relative mt-8">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 hidden h-[2px] bg-white/30 lg:block"
            />

            <div
              data-kyc-process-line
              aria-hidden="true"
              className="absolute inset-x-0 top-0 hidden h-[2px] origin-left bg-white lg:block"
            />

            <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
              {setup.map((s) => (
                <li
                  key={s.n}
                  className="border-l border-white/40 pl-4 lg:border-l-0 lg:pl-0 lg:pt-6"
                >
                  <div className="flex items-center gap-3">
                    <s.Icon size={21} />

                    <span className="font-mono text-[11px]">
                      {s.n}
                    </span>
                  </div>

                  <h3 className="mt-3 text-[19px] font-semibold tracking-[-.04em]">
                    {s.title}
                  </h3>

                  <p className="mt-2 text-[12px] leading-[1.8] text-white/80">
                    {s.text}
                  </p>

                  {s.n === '02' && (
                    <Link
                      href="/how-we-hire"
                      className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold underline underline-offset-4"
                    >
                      See how we hire
                      <ArrowUpRight size={13} />
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-9 flex flex-wrap items-center justify-between gap-4 border-t border-white/30 pt-6">
            <p className="text-[13px] text-white/85">
              Need help preparing KYC and AML
              case files?
            </p>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[12px] font-bold text-[#B12025]"
            >
              Book a free discovery call
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
