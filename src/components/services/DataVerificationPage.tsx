
'use client';

import {
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from 'react';

import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCheck,
  ChevronRight,
  ClipboardCheck,
  Clock3,
  Database,
  FileCheck2,
  Fingerprint,
  History,
  LockKeyhole,
  Plus,
  RefreshCcw,
  SearchCheck,
  ShieldCheck,
  UserRoundCheck,
  Users,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ======================================================
// FIRSTNOTCH — DATA VERIFICATION AND VALIDATION
//
// White:    #FFFFFF
// Charcoal: #17191C
// Red:      #B12025
// Grey:     #F4F4F5
//
// No yellow highlights.
// Next.js + TypeScript + Tailwind + GSAP
// ======================================================

const BASE =
  '/services/bpo-back-office-outsourcing';

const RED = '#ffffff';

// ======================================================
// EIGHT SERVICE FEATURES
// ======================================================

const features = [
  {
    title: 'Duplicates merged',
    text:
      'Records that refer to the same person or business are found and merged, using matching rules you approve.',
    Icon: Database,
    result:
      '2 possible matches · awaiting your approval',
  },
  {
    title: 'Format checks',
    text:
      'Emails, phone numbers, postcodes and dates are checked against the correct format for each country.',
    Icon: SearchCheck,
    result:
      'Incorrect email and date formats flagged',
  },
  {
    title: 'Checks against trusted sources',
    text:
      'Details are confirmed against company registers, postal address databases or the original documents.',
    Icon: ShieldCheck,
    result:
      'Source match recorded for review',
  },
  {
    title: 'Several checks per record',
    text:
      'Each record goes through several checks, first by software and then by a person.',
    Icon: UserRoundCheck,
    result:
      'Software reviewed → person reviewed',
  },
  {
    title: 'Gaps filled only from reliable sources',
    text:
      'Missing details found in a reliable source are added once you approve them. Nothing is guessed.',
    Icon: Fingerprint,
    result:
      'Unverifiable field → referred to your team',
  },
  {
    title: 'A log of every change',
    text:
      'Each change is recorded with the old value and the new one, so you can review or undo it.',
    Icon: History,
    result:
      'Old → new · time · reviewer',
  },
  {
    title: 'Ongoing checks',
    text:
      'New records can be checked each week, so the database stays accurate after the first clean-up.',
    Icon: Clock3,
    result:
      'One-off clean-up or ongoing schedule',
  },
  {
    title: 'Scored batches',
    text:
      'Each completed batch is scored by a reviewer, and the results are shared with you.',
    Icon: ClipboardCheck,
    result:
      'Quality score shared after review',
  },
] as const;

// ======================================================
// INTERACTIVE APPROVAL DEMO DATA
// All records are fictional examples.
// ======================================================

type Decision =
  | 'pending'
  | 'approved'
  | 'referred';

type Proposal = {
  id: string;
  type: 'duplicate' | 'correction' | 'unverified';
  field: string;
  before: string;
  after: string;
  note: string;
};

const proposals: Proposal[] = [
  {
    id: '01',
    type: 'duplicate',
    field: 'Customer account',
    before: 'S. Perera / Sam Perera',
    after: 'Sam Perera · 1 account',
    note:
      'Same address and matching contact details',
  },
  {
    id: '02',
    type: 'correction',
    field: 'Email format',
    before: 'support@acme..com',
    after: 'support@acme.com',
    note:
      'Correct format proposed for approval',
  },
  {
    id: '03',
    type: 'correction',
    field: 'Telephone',
    before: '+94 77 12',
    after: '+94 77 123 4567',
    note:
      'Example value from an approved source',
  },
  {
    id: '04',
    type: 'correction',
    field: 'Postcode',
    before: 'Colombo 04X',
    after: 'Colombo 04',
    note:
      'Format checked against an example rule',
  },
  {
    id: '05',
    type: 'duplicate',
    field: 'Company account',
    before: 'North Trading / North Traders',
    after: 'North Trading · 1 account',
    note:
      'Possible match; requires your approval',
  },
  {
    id: '06',
    type: 'correction',
    field: 'Date format',
    before: '2026/31/03',
    after: '31/03/2026',
    note:
      'Approved date-format rule applied',
  },
  {
    id: '07',
    type: 'unverified',
    field: 'Missing address',
    before: 'Address not provided',
    after: 'Not confirmed',
    note:
      'No reliable supporting source; send to your team',
  },
  {
    id: '08',
    type: 'unverified',
    field: 'Source mismatch',
    before: 'Two conflicting addresses',
    after: 'Not confirmed',
    note:
      'Conflicting source records; send to your team',
  },
];

// ======================================================
// REPORT METRICS
// ======================================================

const metricCopy = [
  {
    title: 'Records checked',
    text: 'Records reviewed in the period.',
    note: 'Shown by source.',
  },
  {
    title: 'Duplicates merged',
    text:
      'Records confirmed because they refer to the same person or business.',
    note: 'Listed for your review.',
  },
  {
    title: 'Errors corrected',
    text:
      'Corrections approved by your team and then made.',
    note: 'Grouped by type of error.',
  },
  {
    title: 'Records referred to you',
    text:
      'Records that could not be confirmed and need your team’s decision.',
    note: 'Sent with notes.',
  },
  {
    title: 'Accuracy rate',
    text:
      'The share of checked records with no remaining errors.',
    note: '98% on all client work.',
  },
];

// ======================================================
// FAQ
// ======================================================

const faqs = [
  {
    tag: 'Approval',
    q: 'Do you change our data directly?',
    a:
      'Only with your approval. Changes can be made in a copy first, so you can review them before anything is updated.',
  },
  {
    tag: 'Duplicates',
    q:
      'Who decides what counts as a duplicate?',
    a:
      'You do. The matching rules, such as the same email address or the same name and address, are agreed before work starts.',
  },
  {
    tag: 'Review',
    q: 'Can this help us spot fraud?',
    a:
      'Verification can flag records that do not match trusted sources, such as an address that does not exist. Your team decides what to do with them.',
  },
  {
    tag: 'Frequency',
    q:
      'Is this a one-off clean-up or ongoing?',
    a:
      'Both. Many clients start with one clean-up and then add a monthly check on new records.',
  },
  {
    tag: 'Security',
    q: 'Is our data copied anywhere?',
    a:
      'No. The team works in your systems or in a locked secure office computer that is deleted when the work ends.',
  },
  {
    tag: 'Pricing',
    q: 'How is data verification priced?',
    a:
      'The cost depends on the number of checks and the type. Most projects are priced per record. A quote is sent once you’ve agreed a scope.',
  },
];

// ======================================================
// RELATED SERVICES
// ======================================================

const related = [
  {
    title: 'Data entry and processing',
    slug: 'data-entry-processing',
    desc: 'Accurate data entered in your systems.',
  },
  {
    title: 'Document processing',
    slug: 'document-processing',
    desc:
      'Paperwork organised into searchable files.',
  },
  {
    title: 'Compliance, KYC and AML support',
    slug: 'compliance-kyc-aml-support',
    desc:
      'Structured customer checks and records.',
  },
  {
    title: 'Lead generation',
    slug: 'lead-generation',
    desc: 'Verified leads for your sales team.',
  },
  {
    title: 'Back office operations',
    slug: 'back-office-operations',
    desc:
      'Everyday administration managed to plan.',
  },
  {
    title: 'Virtual assistant services',
    slug: 'virtual-assistant-services',
    desc:
      'Help with calendars, inboxes and tasks.',
  },
];

// ======================================================
// TEAM SETUP STEPS
// ======================================================

const steps = [
  {
    n: '01',
    title: 'Learning your business',
    text:
      'The team maps each process with you, step by step, and writes it down as a checklist you approve.',
    Icon: ClipboardCheck,
  },
  {
    n: '02',
    title: 'Hiring and training',
    text:
      'Team members take language tests, technical assessments and reference checks. Only 15 to 20% of job applicants pass. Each one then practises on sample work before handling yours.',
    Icon: Users,
  },
  {
    n: '03',
    title: 'Going live with quality checks',
    text:
      'Every task gets a quality score. Work starts at a lower volume with extra checks, and volume grows once accuracy is steady. Each team member has a monthly performance review with coaching.',
    Icon: CheckCheck,
  },
  {
    n: '04',
    title: 'Reporting and improving',
    text:
      'You get a monthly report on volumes, turnaround times, accuracy and the most common errors, plus a call to agree what to improve.',
    Icon: FileCheck2,
  },
];

// ======================================================
// FAQ ACCORDION
// Native details with GSAP animations
// ======================================================

function FAQItem({
  faq,
  index,
}: {
  faq: (typeof faqs)[number];
  index: number;
}) {
  const detailRef =
    useRef<HTMLDetailsElement>(null);

  const answerRef =
    useRef<HTMLDivElement>(null);

  const [emailRule, setEmailRule] =
    useState(true);

  const [addressRule, setAddressRule] =
    useState(false);

  const [ongoing, setOngoing] =
    useState(false);

  const toggle = (
    event: ReactMouseEvent<HTMLElement>
  ) => {
    const detail = detailRef.current;
    const body = answerRef.current;

    if (
      !detail ||
      !body ||
      window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches
    ) {
      return;
    }

    event.preventDefault();

    gsap.killTweensOf(body);

    if (!detail.open) {
      detail.open = true;

      gsap.fromTo(
        body,
        {
          height: 0,
          opacity: 0,
        },
        {
          height: body.scrollHeight,
          opacity: 1,
          duration: 0.36,
          ease: 'power2.out',

          onComplete: () =>
            gsap.set(body, {
              clearProps: 'height,opacity',
            }),
        }
      );
    } else {
      gsap.fromTo(
        body,
        {
          height: body.offsetHeight,
          opacity: 1,
        },
        {
          height: 0,
          opacity: 0,
          duration: 0.26,
          ease: 'power2.inOut',

          onComplete: () => {
            detail.open = false;

            gsap.set(body, {
              clearProps: 'height,opacity',
            });
          },
        }
      );
    }
  };

  return (
    <details
      ref={detailRef}
      open={index === 0}
      className="group border-b border-[#17191C]/10"
    >
      <summary
        onClick={toggle}
        className="flex cursor-pointer list-none items-start justify-between gap-4 py-6 focus-visible:outline-2 focus-visible:outline-[#B12025] [&::-webkit-details-marker]:hidden"
      >
        <span>
          <span className="mb-2 block text-[10px] font-bold uppercase tracking-[.18em] text-[#B12025]">
            {faq.tag}
          </span>

          <span className="text-[17px] font-semibold tracking-[-.03em] sm:text-[19px]">
            {faq.q}
          </span>
        </span>

        <span className="mt-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#B12025]/20 text-[#B12025]">
          <Plus
            size={17}
            className="transition-transform duration-300 group-open:rotate-45"
          />
        </span>
      </summary>

      <div
        ref={answerRef}
        className="overflow-hidden"
      >
        <p className="max-w-[700px] pb-5 text-[14px] leading-[1.85] text-[#17191C]/70">
          {faq.a}
        </p>

        {/* APPROVAL WORKFLOW */}

        {index === 0 && (
          <div className="mb-6 flex flex-wrap items-center gap-2 text-[11px] font-medium">
            <span className="rounded-lg bg-[#F4F4F5] p-2">
              Copy made
            </span>

            <ArrowRight
              size={13}
              className="text-[#B12025]"
            />

            <span className="rounded-lg bg-[#F4F4F5] p-2">
              You review
            </span>

            <ArrowRight
              size={13}
              className="text-[#B12025]"
            />

            <span className="rounded-lg bg-[#FFF1F1] p-2 text-[#B12025]">
              Data updated on approval
            </span>
          </div>
        )}

        {/* DUPLICATE MATCHING RULES */}

        {index === 1 && (
          <div className="mb-6 rounded-xl bg-[#F4F4F5] p-4 text-[12px]">
            <p className="mb-3 font-semibold">
              Example matching rules
            </p>

            <label className="mr-4 inline-flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={emailRule}
                onChange={(e) =>
                  setEmailRule(e.target.checked)
                }
                className="accent-[#B12025]"
              />

              Same email
            </label>

            <label className="inline-flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={addressRule}
                onChange={(e) =>
                  setAddressRule(e.target.checked)
                }
                className="accent-[#B12025]"
              />

              Same name + address
            </label>

            <p className="mt-3 text-[#B12025]">
              {emailRule || addressRule
                ? 'Potential match flagged for your review.'
                : 'No matching rule enabled.'}
            </p>
          </div>
        )}

        {/* ONE-OFF VS ONGOING */}

        {index === 3 && (
          <div className="mb-6 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setOngoing(false)}
              className={`rounded-full border px-4 py-2 text-[11px] ${
                !ongoing
                  ? 'border-[#B12025] bg-[#B12025] text-white'
                  : 'border-[#B12025]/20'
              }`}
            >
              One-off clean-up
            </button>

            <button
              type="button"
              onClick={() => setOngoing(true)}
              className={`rounded-full border px-4 py-2 text-[11px] ${
                ongoing
                  ? 'border-[#B12025] bg-[#B12025] text-white'
                  : 'border-[#B12025]/20'
              }`}
            >
              Monthly checks
            </button>

            <p className="w-full pt-2 text-[12px] text-[#17191C]/65">
              {ongoing
                ? 'New records are reviewed on an agreed monthly schedule.'
                : 'Existing records are reviewed in an agreed initial batch.'}
            </p>
          </div>
        )}

        {/* DATA SECURITY FLOW */}

        {index === 4 && (
          <div className="mb-6 flex flex-wrap items-center gap-2 text-[11px]">
            <span className="rounded-lg bg-[#F4F4F5] p-2">
              Your systems
            </span>

            <ArrowRight
              size={13}
              className="text-[#B12025]"
            />

            <span className="rounded-lg bg-[#FFF1F1] p-2">
              Authorised team
            </span>

            <ArrowRight
              size={13}
              className="text-[#B12025]"
            />

            <span className="rounded-lg bg-[#F4F4F5] p-2">
              Work ends / access removed
            </span>
          </div>
        )}

        {index === 5 && (
          <p className="mb-6 border-l-2 border-[#B12025] pl-3 text-[12px] text-[#17191C]/60">
            Scope and complexity determine the
            quote; this is not a price calculator.
          </p>
        )}
      </div>
    </details>
  );
}

// ======================================================
// COMPLETE DATA VERIFICATION PAGE
// ======================================================

export default function DataVerificationPage() {
  const rootRef =
    useRef<HTMLDivElement>(null);

  const [heroApproved, setHeroApproved] =
    useState(false);

  const [heroVariant, setHeroVariant] =
    useState<'duplicate' | 'address'>(
      'duplicate'
    );

  const [activeStage, setActiveStage] =
    useState(0);

  const [decisions, setDecisions] =
    useState<Record<string, Decision>>({});

  const [feedback, setFeedback] = useState(
    'All proposed changes are awaiting your decision.'
  );

  const [showLog, setShowLog] =
    useState(true);

  const decisionFor = (
    id: string
  ): Decision =>
    decisions[id] ?? 'pending';

  const approved = proposals.filter(
    (p) =>
      decisionFor(p.id) === 'approved'
  );

  const referred = proposals.filter(
    (p) =>
      decisionFor(p.id) === 'referred'
  );

  const duplicateCount =
    approved.filter(
      (p) => p.type === 'duplicate'
    ).length;

  const correctionCount =
    approved.filter(
      (p) => p.type === 'correction'
    ).length;

  // ====================================================
  // APPROVE / REFER / UNDO
  // ====================================================

  const updateDecision = (
    id: string,
    decision: Decision
  ) => {
    setDecisions((current) => ({
      ...current,
      [id]: decision,
    }));

    setFeedback(
      `Example record ${id}: ${
        decision === 'approved'
          ? 'approved'
          : decision === 'referred'
            ? 'referred for review'
            : 'restored to pending'
      }.`
    );
  };

  const approveAll = () => {
    const next: Record<string, Decision> =
      {};

    for (const p of proposals) {
      next[p.id] =
        p.type === 'unverified'
          ? 'referred'
          : 'approved';
    }

    setDecisions(next);

    setFeedback(
      'Confirmable sample changes approved. Unverifiable records referred to your team.'
    );
  };

  const resetAll = () => {
    setDecisions({});

    setFeedback(
      'All sample changes restored to pending.'
    );
  };

  // ====================================================
  // GSAP SCROLL ANIMATIONS
  // ====================================================

  useEffect(() => {
    const root = rootRef.current;

    if (!root) return;

    const mm = gsap.matchMedia();

    mm.add(
      '(prefers-reduced-motion: no-preference)',
      () => {
        const ctx = gsap.context(() => {
          // MASKED HERO TEXT REVEAL

          gsap.from('[data-dv-h1]', {
            yPercent: 105,
            opacity: 0,
            duration: 1.05,
            stagger: 0.12,
            ease: 'power4.out',
          });

          // INTRO TEXT RISE

          gsap.from('[data-dv-intro]', {
            y: 22,
            opacity: 0,
            duration: 0.75,
            stagger: 0.1,
            delay: 0.24,
            ease: 'power3.out',
          });

          // RED UNDERLINE DRAW

          gsap.fromTo(
            '[data-dv-underline]',
            {
              scaleX: 0,
            },
            {
              scaleX: 1,
              stagger: 0.1,
              duration: 0.85,
              ease: 'power3.out',
              delay: 0.6,
            }
          );

          // GENERAL SECTION REVEALS

          gsap.utils
            .toArray<HTMLElement>(
              '[data-dv-reveal]'
            )
            .forEach((el) => {
              gsap.from(el, {
                y: 27,
                opacity: 0,
                duration: 0.75,
                ease: 'power3.out',

                scrollTrigger: {
                  trigger: el,
                  start: 'top 88%',
                  once: true,
                },
              });
            });

          // EIGHT-STAGE PIPELINE SCROLL

          gsap.utils
            .toArray<HTMLElement>(
              '[data-dv-pipeline]'
            )
            .forEach((el, i) => {
              ScrollTrigger.create({
                trigger: el,
                start: 'top 64%',
                end: 'bottom 35%',

                onEnter: () =>
                  setActiveStage(i),

                onEnterBack: () =>
                  setActiveStage(i),
              });
            });

          // REPORT CARDS REVEAL

          gsap.from('[data-dv-report]', {
            y: 35,
            opacity: 0,
            stagger: 0.11,
            duration: 0.8,
            ease: 'power3.out',

            scrollTrigger: {
              trigger: '#dv-report',
              start: 'top 82%',
              once: true,
            },
          });

          // REPORT CHART BARS

          gsap.fromTo(
            '[data-dv-bar]',
            {
              scaleY: 0,
            },
            {
              scaleY: 1,
              stagger: 0.09,
              duration: 0.85,
              transformOrigin: 'bottom',

              scrollTrigger: {
                trigger: '#dv-report',
                start: 'top 80%',
                once: true,
              },
            }
          );

          // ACCURACY RING

          gsap.fromTo(
            '[data-dv-ring]',
            {
              strokeDashoffset: 283,
            },
            {
              strokeDashoffset:
                283 * 0.02,

              duration: 1.5,
              ease: 'power2.out',

              scrollTrigger: {
                trigger: '#dv-report',
                start: 'top 82%',
                once: true,
              },
            }
          );

          // COUNT-UP STATISTICS

          gsap.utils
            .toArray<HTMLElement>(
              '[data-dv-count]'
            )
            .forEach((el) => {
              const obj = { v: 0 };

              gsap.to(obj, {
                v: Number(
                  el.dataset.dvCount || 0
                ),

                duration: 1.6,
                ease: 'power2.out',

                scrollTrigger: {
                  trigger: el,
                  start: 'top 90%',
                  once: true,
                },

                onUpdate: () => {
                  el.textContent = String(
                    Math.round(obj.v)
                  );
                },
              });
            });

          // TESTIMONIAL LINE REVEAL

          gsap.from('[data-dv-quote]', {
            yPercent: 65,
            opacity: 0,
            duration: 0.9,
            stagger: 0.17,
            ease: 'power3.out',

            scrollTrigger: {
              trigger: '#dv-quote',
              start: 'top 75%',
              once: true,
            },
          });

          // RELATED SERVICE REVEAL

          gsap.from('[data-dv-related]', {
            x: -25,
            opacity: 0,
            stagger: 0.07,
            duration: 0.65,
            ease: 'power3.out',

            scrollTrigger: {
              trigger: '#dv-related',
              start: 'top 85%',
              once: true,
            },
          });

          // FOUR-STEP PROCESS LINE

          gsap.fromTo(
            '[data-dv-process-line]',
            {
              scaleX: 0,
            },
            {
              scaleX: 1,
              ease: 'none',

              scrollTrigger: {
                trigger: '#dv-process',
                start: 'top 70%',
                end: 'bottom 55%',
                scrub: true,
              },
            }
          );

          // PAGE SCROLL PROGRESS

          gsap.to(
            '[data-dv-progress]',
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

  // ====================================================
  // FAQ STRUCTURED DATA
  // ====================================================

  const faqJson = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',

    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,

      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };

  // ====================================================
  // PAGE JSX
  // ====================================================

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

      {/* PAGE PROGRESS */}

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[3px]"
      >
        <div
          data-dv-progress
          className="h-full w-full origin-left scale-x-0 bg-[#B12025]"
        />
      </div>

      {/* =================================================
          01 — HERO
      ================================================= */}

      <section className="relative bg-white px-5 pb-24 pt-[150px] sm:px-8 lg:px-14 lg:pb-32 lg:pt-[180px]">
        <div className="mx-auto grid max-w-[1420px] items-center gap-12 lg:grid-cols-[1.08fr_.92fr] lg:gap-16">
          {/* LEFT SIDE TEXT */}

          <div>
            <p
              data-dv-intro
              className="text-[12px] text-[#17191C]/50"
            >
              Services / BPO &amp; Back Office /
              Data verification and validation
            </p>

            <p
              data-dv-intro
              className="mt-8 text-[11px] font-semibold uppercase tracking-[.2em] text-[#B12025]"
            >
              Data verification services in Sri Lanka
            </p>

            {/* MASKED HEADING RISE */}

            <h1 className="mt-5 max-w-[800px] text-[clamp(2.65rem,5vw,5.6rem)] font-semibold leading-[1.08] tracking-[-.065em]">
              {[
                'Duplicates and errors',
                'found in your records,',
                'then fixed once you',
                'approve the changes.',
              ].map((line) => (
                <span
                  key={line}
                  className="block overflow-hidden pb-[.12em]"
                >
                  <span
                    data-dv-h1
                    className="block"
                  >
                    {line}
                  </span>
                </span>
              ))}
            </h1>

            <span
              data-dv-underline
              aria-hidden="true"
              className="mt-2 block h-[3px] w-[min(75vw,330px)] origin-left rounded-full bg-[#B12025]"
            />

            <p
              data-dv-intro
              className="mt-7 max-w-[650px] text-[15px] leading-[1.9] text-[#17191C]/70"
            >
              Errors build up in every database
              over time. Customers move house
              and the same business gets entered
              twice. FirstNotch checks your
              records against rules you agree,
              and proposes fixes for your approval.
              Records that cannot be confirmed
              go to your team.
            </p>

            {/* HERO BUTTONS */}

            <div
              data-dv-intro
              className="mt-8 flex flex-wrap gap-3"
            >
              <a
                href="#contact"
                className="inline-flex min-h-[50px] items-center gap-2 rounded-full bg-[#B12025] px-6 text-[12px] font-semibold text-white transition hover:bg-[#931A1F]"
              >
                Book a free discovery call

                <ArrowUpRight size={16} />
              </a>

              <a
                href="#dv-included"
                className="inline-flex min-h-[50px] items-center gap-2 rounded-full border border-[#B12025]/25 px-6 text-[12px] font-semibold text-[#B12025] hover:bg-[#FFF2F2]"
              >
                See what is included

                <ArrowDown size={16} />
              </a>
            </div>
          </div>

          {/* ==========================================
              HERO REVIEW DEMO
          ========================================== */}

          <div className="min-w-0 rounded-[27px] border border-[#17191C]/10 bg-[#F4F4F5] p-4 shadow-[0_30px_85px_rgba(23,25,28,.08)] sm:p-7">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[11px] font-bold uppercase tracking-[.15em] text-[#B12025]">
                Review before changing
              </span>

              <span className="rounded-full bg-white px-3 py-1 text-[10px] text-[#17191C]/60">
                Example data
              </span>
            </div>

            {/* CHANGE TYPE TOGGLE */}

            <div className="mt-5 flex flex-wrap gap-2">
              {(
                [
                  'duplicate',
                  'address',
                ] as const
              ).map((variant) => (
                <button
                  key={variant}
                  type="button"
                  onClick={() => {
                    setHeroVariant(variant);
                    setHeroApproved(false);
                  }}
                  className={`rounded-full border px-4 py-2 text-[11px] font-semibold transition ${
                    heroVariant === variant
                      ? 'border-[#B12025] bg-[#B12025] text-white'
                      : 'border-[#17191C]/10 bg-white text-[#17191C]'
                  }`}
                >
                  {variant === 'duplicate'
                    ? 'Duplicate record'
                    : 'Address change'}
                </button>
              ))}
            </div>

            {/* TWO RECORD CARDS */}

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[0, 1].map((i) => (
                <div
                  key={i}
                  className={`rounded-[15px] border bg-white p-4 transition-all duration-500 ${
                    heroApproved && i === 1
                      ? 'scale-[.95] border-[#17191C]/10 opacity-30'
                      : 'border-[#17191C]/10'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <UserRoundCheck
                      size={19}
                      className="text-[#B12025]"
                    />

                    <span className="font-mono text-[10px] text-[#17191C]/40">
                      REC-00{i + 1}
                    </span>
                  </div>

                  <p className="mt-4 text-[15px] font-semibold">
                    {heroVariant === 'duplicate'
                      ? i === 0
                        ? 'S. Perera'
                        : 'Sam Perera'
                      : 'Sam Perera'}
                  </p>

                  <p
                    className={`mt-2 rounded-md p-2 text-[12px] ${
                      i === 1
                        ? 'bg-[#FFF1F1] text-[#B12025]'
                        : 'bg-[#F4F4F5]'
                    }`}
                  >
                    {heroVariant === 'duplicate'
                      ? i === 0
                        ? '12 Galle Rd'
                        : '12 Galle Road'
                      : i === 0
                        ? '12 Galle Road'
                        : '14 Galle Road'}
                  </p>
                </div>
              ))}
            </div>

            {/* APPROVAL STATUS */}

            <div className="mt-4 rounded-[14px] border border-[#B12025]/20 bg-white p-4">
              <p className="flex items-center gap-2 text-[12px] font-semibold text-[#B12025]">
                {heroApproved ? (
                  <Check size={17} />
                ) : (
                  <Clock3 size={17} />
                )}

                {heroApproved
                  ? 'Approved in demo'
                  : 'Proposed change · awaiting approval'}
              </p>

              <p className="mt-2 text-[12px] leading-6 text-[#17191C]/65">
                {heroApproved
                  ? heroVariant === 'duplicate'
                    ? 'Records merged in this example.'
                    : 'Address changed in this example.'
                  : heroVariant === 'duplicate'
                    ? 'Potential duplicate found. No records changed yet.'
                    : 'Address mismatch found. Your decision is required.'}
              </p>
            </div>

            {/* DEMO CONTROLS */}

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() =>
                  setHeroApproved(true)
                }
                disabled={heroApproved}
                className="rounded-full bg-[#B12025] px-5 py-3 text-[12px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-45"
              >
                Approve example
              </button>

              <button
                type="button"
                onClick={() =>
                  setHeroApproved(false)
                }
                className="rounded-full border border-[#B12025]/25 bg-white px-5 py-3 text-[12px] font-semibold text-[#B12025]"
              >
                Undo / reset
              </button>
            </div>

            {heroApproved && (
              <p
                role="status"
                className="mt-4 flex items-center gap-2 text-[11px] text-[#17191C]/65"
              >
                <History
                  size={15}
                  className="text-[#B12025]"
                />

                Change log: original and proposed
                values recorded.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* =================================================
          02 — EIGHT-STAGE REVIEW PIPELINE
      ================================================= */}

      <section
        id="dv-included"
        className="scroll-mt-24 bg-[#B12025] px-5 py-24 text-white sm:px-8 lg:px-14 lg:py-32"
      >
        <div className="mx-auto max-w-[1420px]">
          <p
            data-dv-reveal
            className="text-[11px] font-semibold uppercase tracking-[.2em] text-white/60"
          >
            What the service includes
          </p>

          <h2
            data-dv-reveal
            className="mt-5 max-w-[960px] text-[clamp(2.55rem,4.6vw,5rem)] font-semibold leading-[1.1] tracking-[-.06em]"
          >
            Every change checked. Every decision
            yours
            <span className="text-[#F28F92]">
              .
            </span>
          </h2>

          <div className="mt-14 grid gap-10 lg:grid-cols-[.86fr_1.14fr] lg:gap-16">
            {/* DESKTOP STICKY REVIEW PANEL */}

            <div className="self-start lg:sticky lg:top-[115px]">
              <div className="rounded-[22px] border border-white/15 bg-[#ffffff] p-5 sm:p-7">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-[11px] text-white/65">
                    REVIEW QUEUE / PREVIEW
                  </span>

                  <span className="rounded-full bg-[#B12025] px-3 py-1 text-[10px] font-bold">
                    {String(
                      activeStage + 1
                    ).padStart(2, '0')}{' '}
                    / 08
                  </span>
                </div>

                {/* ACTIVE REVIEW RECORD */}

                <div className="mt-7 rounded-[16px] bg-[#B12025] p-6 text-[#17191C]">
                  <div className="flex items-center gap-3 text-[#B12025]">
                    {(() => {
                      const Icon =
                        features[activeStage].Icon;

                      return <Icon size={24} />;
                    })()}

                    <span className="text-[11px] font-bold uppercase tracking-[.1em]">
                      {features[activeStage].title}
                    </span>
                  </div>

                  <p className="mt-6 rounded-[9px] bg-[#F4F4F5] p-4 font-mono text-[12px]">
                    REC-021 · review requested
                  </p>

                  <p className="mt-3 border-l-2 border-[#B12025] pl-3 text-[13px] leading-7">
                    {features[activeStage].result}
                  </p>

                  <p className="mt-5 flex items-center gap-2 text-[11px] font-semibold text-[#B12025]">
                    <LockKeyhole size={15} />

                    Nothing updates without your
                    approval
                  </p>
                </div>

                {/* PIPELINE PROGRESS */}

                <div className="mt-6 h-[3px] rounded-full bg-white/15">
                  <div
                    className="h-full rounded-full bg-[#E78185] transition-[width] duration-500"
                    style={{
                      width: `${
                        (activeStage + 1) * 12.5
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* EIGHT SERVICE ITEMS */}

            <ul className="relative space-y-3 border-l border-white/20 pl-7 sm:pl-10">
              {features.map((feature, i) => (
                <li
                  key={feature.title}
                  data-dv-pipeline
                  className={`relative min-h-[205px] rounded-[20px] border p-6 transition-colors sm:p-8 ${
                    activeStage === i
                      ? 'border-[#E78185]/65 bg-white/10'
                      : 'border-white/10 bg-white/[.035]'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute -left-[33px] top-9 h-3 w-3 rounded-full border-2 sm:-left-[45px] ${
                      activeStage >= i
                        ? 'border-[#E78185] bg-[#B12025]'
                        : 'border-white/30 bg-[#ffffff]'
                    }`}
                  />

                  <div className="flex items-center justify-between">
                    <span className="text-[11px] tracking-[.2em] text-white/55">
                      0{i + 1}
                    </span>

                    <feature.Icon
                      size={22}
                      className="text-[#F28F92]"
                    />
                  </div>

                  <h3 className="mt-5 text-[23px] font-semibold tracking-[-.04em]">
                    {feature.title}
                  </h3>

                  <p className="mt-3 max-w-[580px] text-[14px] leading-[1.9] text-white/75">
                    {feature.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* =================================================
          03 — INTERACTIVE APPROVAL TABLE
      ================================================= */}

      <section
        id="dv-demo"
        className="bg-white px-5 py-24 sm:px-8 lg:px-14 lg:py-32"
      >
        <div className="mx-auto max-w-[1420px]">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p
                data-dv-reveal
                className="text-[11px] font-bold uppercase tracking-[.18em] text-[#B12025]"
              >
                Interactive sample
              </p>

              <h2
                data-dv-reveal
                className="mt-4 text-[clamp(2.6rem,4.5vw,4.9rem)] font-semibold tracking-[-.06em]"
              >
                Approve the changes
                <span className="text-[#B12025]">
                  .
                </span>
              </h2>

              <p className="mt-4 max-w-[670px] text-[14px] leading-7 text-[#17191C]/65">
                Eight example records. Review each
                suggestion, approve it, refer it to
                your team, or undo your decision.
                No real data is changed.
              </p>
            </div>

            <span className="rounded-full border border-[#B12025]/20 px-4 py-2 text-[11px] font-semibold text-[#B12025]">
              EXAMPLE DATA · LOCAL DEMO
            </span>
          </div>

          {/* APPROVAL CONTROLS */}

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-[18px] border border-[#B12025]/15 bg-[#F4F4F5] p-4">
            <p
              role="status"
              aria-live="polite"
              className="max-w-[700px] text-[12px] leading-6 text-[#17191C]/70"
            >
              {feedback}
            </p>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={approveAll}
                type="button"
                className="rounded-full bg-[#B12025] px-5 py-3 text-[11px] font-semibold text-white hover:bg-[#951A20]"
              >
                Approve all confirmable
              </button>

              <button
                onClick={resetAll}
                type="button"
                className="rounded-full border border-[#B12025]/20 bg-white px-5 py-3 text-[11px] font-semibold text-[#B12025]"
              >
                Undo all
              </button>
            </div>
          </div>

          {/* LIVE SAMPLE COUNTERS */}

          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl bg-[#F4F4F5] p-4">
              <p className="text-[26px] font-bold text-[#B12025]">
                8
              </p>
              <p className="text-[11px]">
                Records checked
              </p>
            </div>

            <div className="rounded-xl bg-[#F4F4F5] p-4">
              <p className="text-[26px] font-bold text-[#ffffff]">
                {duplicateCount}
              </p>
              <p className="text-[11px]">
                Duplicates merged
              </p>
            </div>

            <div className="rounded-xl bg-[#F4F4F5] p-4">
              <p className="text-[26px] font-bold text-[#B12025]">
                {correctionCount}
              </p>
              <p className="text-[11px]">
                Errors corrected
              </p>
            </div>

            <div className="rounded-xl bg-[#F4F4F5] p-4">
              <p className="text-[26px] font-bold text-[#B12025]">
                {referred.length}
              </p>
              <p className="text-[11px]">
                Referred to you
              </p>
            </div>
          </div>

          {/* SAMPLE RECORD CARDS */}

          <div className="mt-5 grid gap-3 lg:grid-cols-2">
            {proposals.map((p) => {
              const decision =
                decisionFor(p.id);

              return (
                <article
                  key={p.id}
                  className={`rounded-[19px] border p-5 transition-all duration-300 ${
                    decision === 'approved'
                      ? 'border-[#B12025]/35 bg-[#FFF9F9]'
                      : 'border-[#17191C]/10 bg-white'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-[11px] font-bold uppercase tracking-[.12em] text-[#B12025]">
                      {p.field} · #{p.id}
                    </p>

                    <span
                      className={`rounded-full px-3 py-1 text-[10px] font-semibold ${
                        decision === 'pending'
                          ? 'bg-[#F4F4F5] text-[#17191C]/70'
                          : decision === 'approved'
                            ? 'bg-[#B12025] text-white'
                            : 'bg-[#FFF1F1] text-[#B12025]'
                      }`}
                    >
                      {decision === 'pending'
                        ? 'Awaiting approval'
                        : decision === 'approved'
                          ? 'Approved'
                          : 'Referred to you'}
                    </span>
                  </div>

                  {/* BEFORE / AFTER DIFF */}

                  <div className="mt-5 flex flex-wrap items-center gap-3 text-[13px]">
                    <span className="max-w-full break-all text-[#B12025] line-through decoration-[#B12025]/60">
                      {p.before}
                    </span>

                    <ArrowRight
                      size={15}
                      className="shrink-0 text-[#17191C]/40"
                    />

                    <span className="max-w-full break-all rounded-md bg-[#F4F4F5] px-2 py-1 font-semibold text-[#17191C]">
                      {p.after}
                    </span>
                  </div>

                  <p className="mt-3 text-[12px] leading-6 text-[#17191C]/60">
                    {p.note}
                  </p>

                  {/* APPROVE / REFER / UNDO */}

                  <div className="mt-5 flex flex-wrap gap-2">
                    {decision === 'pending' ? (
                      <>
                        <button
                          disabled={
                            p.type === 'unverified'
                          }
                          onClick={() =>
                            updateDecision(
                              p.id,
                              'approved'
                            )
                          }
                          type="button"
                          className="rounded-full bg-[#B12025] px-4 py-2 text-[11px] font-semibold text-white disabled:cursor-not-allowed disabled:bg-[#17191C]/25"
                        >
                          Approve
                        </button>

                        <button
                          onClick={() =>
                            updateDecision(
                              p.id,
                              'referred'
                            )
                          }
                          type="button"
                          className="rounded-full border border-[#B12025]/25 px-4 py-2 text-[11px] font-semibold text-[#B12025]"
                        >
                          {p.type === 'unverified'
                            ? 'Refer to your team'
                            : 'Reject / refer'}
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() =>
                          updateDecision(
                            p.id,
                            'pending'
                          )
                        }
                        type="button"
                        className="inline-flex items-center gap-1 rounded-full border border-[#B12025]/25 px-4 py-2 text-[11px] font-semibold text-[#B12025]"
                      >
                        <RefreshCcw size={13} />

                        Undo
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          {/* CHANGE LOG */}

          <div className="mt-6 rounded-[18px] border border-[#B12025]/20 bg-[#FFF8F8] p-5">
            <button
              type="button"
              onClick={() =>
                setShowLog((v) => !v)
              }
              className="flex w-full items-center justify-between text-left text-[14px] font-semibold text-[#B12025]"
            >
              <span className="flex items-center gap-2">
                <History size={18} />

                Change log / Referred to you
              </span>

              <span>
                {showLog ? '−' : '+'}
              </span>
            </button>

            {showLog && (
              <div className="mt-4 space-y-2">
                {Object.keys(decisions).length ===
                0 ? (
                  <p className="text-[12px] text-[#17191C]/60">
                    No example decisions recorded
                    yet.
                  </p>
                ) : (
                  proposals
                    .filter(
                      (p) =>
                        decisionFor(p.id) !==
                        'pending'
                    )
                    .map((p) => (
                      <div
                        key={p.id}
                        className="flex flex-wrap justify-between gap-2 border-t border-[#B12025]/10 py-2 text-[12px]"
                      >
                        <span>
                          {p.field}: {p.before}
                        </span>

                        <span className="font-semibold text-[#B12025]">
                          {decisionFor(p.id) ===
                          'approved'
                            ? `Approved → ${p.after}`
                            : 'Referred for a decision'}
                        </span>
                      </div>
                    ))
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =================================================
          04 — REPORTING DASHBOARD
      ================================================= */}

      <section
        id="dv-report"
        className="bg-[#F4F4F5] px-5 py-24 sm:px-8 lg:px-14 lg:py-32"
      >
        <div className="mx-auto max-w-[1420px]">
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#B12025]">
                Your reporting
              </p>

              <h2
                data-dv-reveal
                className="mt-4 text-[clamp(2.5rem,4.5vw,4.8rem)] font-semibold tracking-[-.06em]"
              >
                The numbers you will see
                <span className="text-[#B12025]">
                  .
                </span>
              </h2>

              <p className="mt-4 max-w-[750px] text-[14px] leading-7 text-[#17191C]/65">
                A clean-up is measured by the errors
                it finds and how many are resolved.
                Your report at the end of each batch
                lists every change and every record
                still waiting for a decision.
              </p>
            </div>

            <span className="rounded-full bg-white px-4 py-2 text-[11px] font-bold text-[#B12025]">
              SAMPLE REPORT
            </span>
          </div>

          {/* FIVE REPORT METRICS */}

          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {metricCopy.map((m, i) => (
              <article
                data-dv-report
                key={m.title}
                className={`rounded-[18px] border border-[#17191C]/10 bg-white p-6 ${
                  i === 4
                    ? 'sm:col-span-2 lg:col-span-4'
                    : ''
                }`}
              >
                <h3 className="text-[18px] font-semibold">
                  {m.title}
                </h3>

                <p className="mt-3 text-[13px] leading-7 text-[#17191C]/65">
                  {m.text}
                </p>

                <p className="mt-5 border-t border-[#B12025]/15 pt-3 text-[11px] font-semibold text-[#B12025]">
                  {m.note}
                </p>
              </article>
            ))}
          </div>

          {/* SAMPLE ERROR REPORT VISUAL */}

          <div className="mt-5 grid gap-8 rounded-[20px] border border-[#17191C]/10 bg-white p-6 sm:p-8 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#B12025]">
                Illustrative batch breakdown
              </p>

              <h3 className="mt-3 text-[22px] font-semibold tracking-[-.04em]">
                Error types, explained clearly.
              </h3>

              <p className="mt-4 max-w-[420px] text-[13px] leading-7 text-[#17191C]/60">
                Example report visualisation —
                not live results. Your delivered
                figures come from your own checked
                batches.
              </p>
            </div>

            <div className="grid grid-cols-[1fr_auto] items-center gap-6">
              <div>
                <p className="text-[12px] font-semibold">
                  Format · Duplicate · Missing · Source
                </p>

                <div className="mt-5 flex h-[105px] items-end gap-3 border-b border-[#17191C]/10">
                  {[58, 85, 44, 72].map(
                    (v, i) => (
                      <div
                        data-dv-bar
                        key={i}
                        style={{
                          height: `${v}%`,
                        }}
                        className="flex-1 origin-bottom rounded-t-md bg-[#B12025]/75"
                      />
                    )
                  )}
                </div>
              </div>

              {/* ACCURACY SVG RING */}

              <div className="text-center">
                <svg
                  viewBox="0 0 110 110"
                  className="h-[82px] w-[82px] -rotate-90"
                  aria-hidden="true"
                >
                  <circle
                    cx="55"
                    cy="55"
                    r="45"
                    fill="none"
                    stroke="#E6E7E9"
                    strokeWidth="8"
                  />

                  <circle
                    data-dv-ring
                    cx="55"
                    cy="55"
                    r="45"
                    fill="none"
                    stroke={RED}
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray="283"
                    strokeDashoffset="283"
                  />
                </svg>

                <p className="mt-1 text-[10px] text-[#17191C]/60">
                  Accuracy ring
                </p>
              </div>
            </div>
          </div>

          {/* BUSINESS STATS */}

          <div className="mt-9 grid grid-cols-2 gap-6 border-t border-[#17191C]/10 pt-9 sm:grid-cols-3">
            <div>
              <p className="text-[clamp(2.3rem,4vw,4.4rem)] font-semibold tracking-[-.06em] text-[#B12025]">
                <span data-dv-count="85">
                  85
                </span>
                %
              </p>

              <p className="text-[12px] text-[#17191C]/60">
                client retention rate
              </p>
            </div>

            <div>
              <p className="text-[clamp(2.3rem,4vw,4.4rem)] font-semibold tracking-[-.06em] text-[#B12025]">
                <span data-dv-count="98">
                  98
                </span>
                %
              </p>

              <p className="text-[12px] text-[#17191C]/60">
                accuracy rate
              </p>
            </div>

            <div>
              <p className="text-[clamp(2.2rem,4vw,4.2rem)] font-semibold tracking-[-.06em] text-[#B12025]">
                <span data-dv-count="15">
                  15
                </span>
                –
                <span data-dv-count="20">
                  20
                </span>
                %
              </p>

              <Link
                href="/how-we-hire"
                className="inline-flex items-center gap-1 text-[12px] text-[#B12025] hover:underline"
              >
                of applicants pass hiring checks

                <ArrowUpRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          05 — TESTIMONIAL
      ================================================= */}

      <section
        id="dv-quote"
        className="relative overflow-hidden bg-[#17191C] px-5 py-28 text-white sm:px-8 lg:px-14 lg:py-40"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-12 text-[260px] font-bold leading-none text-[#B12025]/20"
        >
          “
        </div>

        <div className="relative mx-auto max-w-[1120px]">
          <p className="text-[11px] font-bold uppercase tracking-[.2em] text-white/60">
            Wholesale distributor / Client experience
          </p>

          <blockquote className="mt-9 text-[clamp(2rem,4.2vw,4.7rem)] font-semibold leading-[1.27] tracking-[-.055em]">
            {[
              '“Our customer database had thousands of duplicate accounts.',
              'After the clean-up, invoices go to the right address',
              'and our sales reports show the correct totals.”',
            ].map((line) => (
              <span
                key={line}
                className="block overflow-hidden pb-[.1em]"
              >
                <span
                  data-dv-quote
                  className="block"
                >
                  {line}
                </span>
              </span>
            ))}
          </blockquote>

          <p
            data-dv-reveal
            className="mt-8 text-[12px] font-semibold uppercase tracking-[.16em] text-[#EE9A9D]"
          >
            Wholesale distributor
          </p>
        </div>
      </section>

      {/* =================================================
          06 — FAQ AND RELATED SERVICES
      ================================================= */}

      <section className="bg-white px-5 py-24 sm:px-8 lg:px-14 lg:py-32">
        <div className="mx-auto grid max-w-[1420px] gap-12 lg:grid-cols-[.78fr_1.22fr] lg:gap-20">
          {/* STICKY FAQ HEADING */}

          <div className="self-start lg:sticky lg:top-[120px]">
            <p className="text-[11px] font-bold uppercase tracking-[.19em] text-[#B12025]">
              Questions answered
            </p>

            <h2
              data-dv-reveal
              className="mt-5 text-[clamp(2.5rem,4.2vw,4.6rem)] font-semibold leading-[1.12] tracking-[-.06em]"
            >
              Common questions about data
              verification
              <span className="text-[#B12025]">
                .
              </span>
            </h2>
          </div>

          {/* SIX FAQ ITEMS */}

          <div className="border-t border-[#17191C]/10">
            {faqs.map((faq, i) => (
              <FAQItem
                faq={faq}
                key={faq.q}
                index={i}
              />
            ))}
          </div>
        </div>

        {/* ==========================================
            RELATED SERVICES
        ========================================== */}

        <div
          id="dv-related"
          className="mx-auto mt-28 max-w-[1420px]"
        >
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-[clamp(2rem,3.4vw,3.5rem)] font-semibold tracking-[-.06em]">
              Other BPO and back office services
            </h2>

            <Link
              href={BASE}
              className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#B12025] hover:underline"
            >
              See all services

              <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`${BASE}/${item.slug}`}
                data-dv-related
                className="group rounded-[16px] border border-[#17191C]/10 bg-[#F4F4F5] p-5 transition-all hover:border-[#B12025]/55 hover:bg-white"
              >
                <span className="flex items-center justify-between gap-4 text-[14px] font-semibold">
                  {item.title}

                  <ChevronRight
                    size={17}
                    className="shrink-0 text-[#B12025] transition-transform group-hover:translate-x-1.5"
                  />
                </span>

                <span className="mt-2 block text-[12px] text-[#17191C]/60">
                  {item.desc}
                </span>

                <span
                  aria-hidden="true"
                  className="mt-3 block h-[2px] w-full origin-left scale-x-0 bg-[#B12025] transition-transform duration-300 group-hover:scale-x-100"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================
          07 — FOUR-STEP PROCESS
      ================================================= */}

      <section
        id="dv-process"
        className="bg-[#F4F4F5] px-5 py-24 sm:px-8 lg:px-14 lg:py-32"
      >
        <div className="mx-auto max-w-[1420px]">
          <p
            data-dv-reveal
            className="text-[11px] font-bold uppercase tracking-[.2em] text-[#B12025]"
          >
            How we work
          </p>

          <h2
            data-dv-reveal
            className="mt-5 text-[clamp(2.45rem,4.4vw,4.8rem)] font-semibold tracking-[-.06em]"
          >
            How your back office team is set up
            <span className="text-[#B12025]">
              .
            </span>
          </h2>

          <p
            data-dv-reveal
            className="mt-5 max-w-[710px] text-[14px] leading-7 text-[#17191C]/65"
          >
            The biggest risk with outsourced admin
            is mistakes that reach your systems.
            These steps are there to stop that.
          </p>

          {/* DESKTOP HORIZONTAL TIMELINE */}

          <div className="relative mt-12">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 hidden h-[2px] bg-[#B12025]/15 lg:block"
            />

            <div
              aria-hidden="true"
              data-dv-process-line
              className="absolute inset-x-0 top-0 hidden h-[2px] origin-left bg-[#B12025] lg:block"
            />

            <ol className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-9">
              {steps.map((s) => (
                <li
                  key={s.n}
                  className="border-l-2 border-[#B12025]/35 pl-5 lg:border-l-0 lg:pl-0 lg:pt-7"
                >
                  <div className="flex items-center gap-3 text-[#B12025]">
                    <s.Icon size={23} />

                    <span className="text-[12px] font-bold">
                      {s.n}
                    </span>
                  </div>

                  <h3 className="mt-5 text-[21px] font-semibold tracking-[-.04em]">
                    {s.title}
                  </h3>

                  <p className="mt-4 text-[13px] leading-[1.85] text-[#17191C]/65">
                    {s.text}
                  </p>

                  {s.n === '02' && (
                    <Link
                      href="/how-we-hire"
                      className="mt-4 inline-flex items-center gap-1 text-[12px] font-semibold text-[#B12025] hover:underline"
                    >
                      See how we hire

                      <ArrowUpRight size={14} />
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </div>

          {/* FINAL CTA */}

          <div className="mt-14 flex flex-wrap items-center justify-between gap-5 border-t border-[#17191C]/15 pt-7">
            <p className="text-[14px] text-[#17191C]/65">
              Need a review plan for your current records?
            </p>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#B12025] px-6 py-4 text-[12px] font-semibold text-white hover:bg-[#931A1F]"
            >
              Book a free discovery call

              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
