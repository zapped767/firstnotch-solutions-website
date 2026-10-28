
'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  CalendarCheck2,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  Clock3,
  FileText,
  Inbox,
  LockKeyhole,
  Mail,
  Plane,
  RotateCcw,
  ShieldCheck,
  Users,
  Video,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ======================================================
// FIRSTNOTCH — VIRTUAL ASSISTANT SERVICES
// Premium white + red design
// GSAP ScrollTrigger horizontal service cards
// Rising headings + interactive demonstrations
// ======================================================

const BASE = '/services/bpo-back-office-outsourcing';

// ======================================================
// EIGHT VIRTUAL ASSISTANT SERVICES
// ======================================================

const services = [
  {
    n: '01',
    label: 'PLAN',
    title: 'Calendar management',
    Icon: CalendarDays,
    copy:
      'Meetings are booked and moved as you ask, with time kept free for the work you do.',
    checks: [
      'Meetings arranged',
      'Conflicts checked',
      'Focus time protected',
    ],
  },
  {
    n: '02',
    label: 'ORGANISE',
    title: 'Inbox management',
    Icon: Inbox,
    copy:
      'Emails are sorted, and routine ones are answered using replies you have approved. Anything that needs you is flagged.',
    checks: [
      'Inbox sorted',
      'Approved replies used',
      'Important emails flagged',
    ],
  },
  {
    n: '03',
    label: 'RESPOND',
    title: 'Client emails',
    Icon: Mail,
    copy:
      'Client messages are answered within a reply time agreed with you, using templates you sign off.',
    checks: [
      'Your reply templates',
      'Agreed response time',
      'Conversations recorded',
    ],
  },
  {
    n: '04',
    label: 'COORDINATE',
    title: 'Travel bookings',
    Icon: Plane,
    copy:
      'Flights and hotels are found within your budget and booked once you approve them.',
    checks: [
      'Options researched',
      'Budget respected',
      'Approval before booking',
    ],
  },
  {
    n: '05',
    label: 'SUPPORT',
    title: 'Meeting support',
    Icon: Video,
    copy:
      'Agendas are prepared, notes are taken on calls and follow-up actions are sent out once you approve them.',
    checks: [
      'Agenda prepared',
      'Notes organised',
      'Actions approved',
    ],
  },
  {
    n: '06',
    label: 'PREPARE',
    title: 'Documents and research',
    Icon: FileText,
    copy:
      'Slides, spreadsheets and short research briefs are prepared from your notes.',
    checks: [
      'Slides and spreadsheets',
      'Research summaries',
      'Files organised',
    ],
  },
  {
    n: '07',
    label: 'ALIGN',
    title: 'Hours that overlap yours',
    Icon: Clock3,
    copy:
      'Your assistant works weekdays from 11am to 8pm Sri Lanka time. Hours can be moved to cover your morning in the US or Europe.',
    checks: [
      'Weekday coverage',
      'Hours agreed with you',
      'Overlapping work time',
    ],
  },
  {
    n: '08',
    label: 'PROTECT',
    title: 'Confidentiality',
    Icon: ShieldCheck,
    copy:
      'Your assistant signs a confidentiality agreement and only uses the accounts you share.',
    checks: [
      'Confidentiality agreement',
      'Access you approve',
      'Account permissions controlled',
    ],
  },
] as const;

// ======================================================
// MONTHLY REPORT METRICS
// ======================================================

const report = [
  {
    title: 'Tasks completed',
    description:
      'Requests finished in the period, by type.',
    note: 'Listed in a shared tracker.',
    Icon: CheckCircle2,
  },
  {
    title: 'Response time',
    description:
      'How quickly your requests are picked up.',
    note: 'Target agreed with you.',
    Icon: Clock3,
  },
  {
    title: 'Inbox at day end',
    description:
      'Emails still waiting for a reply when the day ends.',
    note: 'Reported each evening.',
    Icon: Inbox,
  },
  {
    title: 'Hours used',
    description:
      'Time spent on your work, by type of task.',
    note: 'Shown in a monthly summary.',
    Icon: BarChart3,
  },
  {
    title: 'Quality score',
    description:
      'How well tasks follow your instructions, scored by a reviewer.',
    note: 'Your assistant is coached each month.',
    Icon: ClipboardCheck,
  },
] as const;

// ======================================================
// COMMON QUESTIONS
// ======================================================

const faqs = [
  {
    q: 'Will I work with the same assistant each day?',
    a:
      'Yes. You have one assistant with a trained backup for leave.',
  },
  {
    q: 'How do I hand over tasks?',
    a:
      'By email, chat or a shared task list such as Asana, Trello or Notion.',
  },
  {
    q: 'What will the assistant not do?',
    a:
      'The assistant does not make payments, sign agreements or send replies you have not approved, unless you have made that a rule.',
  },
  {
    q: 'How does the assistant learn how I work?',
    a:
      'In the first week you go through your routine together. The assistant writes it down as a guide you approve.',
  },
  {
    q: 'How are my accounts kept secure?',
    a:
      'Access is granted through a password manager, so passwords are not shared in plain text. Two-factor login is used on every account.',
  },
  {
    q: 'Can I start part time?',
    a:
      'Yes. Plans start at 20 hours a week and can grow to full time.',
  },
  {
    q: 'How are virtual assistant services priced?',
    a:
      'Pricing is monthly based on the hours you need. You get a written price after the discovery call.',
  },
] as const;

// ======================================================
// OTHER BACK OFFICE SERVICES
// ======================================================

const related = [
  ['Data entry and processing', 'data-entry-processing'],
  ['Document processing', 'document-processing'],
  [
    'Data verification and validation',
    'data-verification-validation',
  ],
  [
    'Compliance, KYC and AML support',
    'compliance-kyc-aml-support',
  ],
  ['Lead generation', 'lead-generation'],
  ['Back office operations', 'back-office-operations'],
] as const;

// ======================================================
// TEAM SETUP PROCESS
// ======================================================

const steps = [
  {
    n: '01',
    title: 'Learning your business',
    Icon: ClipboardCheck,
    copy:
      'The team maps each process with you, step by step, and writes it down as a checklist you approve.',
  },
  {
    n: '02',
    title: 'Hiring and training',
    Icon: Users,
    copy:
      'Team members take language tests, technical assessments and reference checks. Only 15 to 20% of job applicants pass. Each one then practises on sample work before handling yours.',
  },
  {
    n: '03',
    title: 'Going live with quality checks',
    Icon: CheckCircle2,
    copy:
      'Every task gets a quality score. Work starts at a lower volume with extra checks, and volume grows once accuracy is steady. Each team member has a monthly performance review with coaching.',
  },
  {
    n: '04',
    title: 'Reporting and improving',
    Icon: BarChart3,
    copy:
      'You get a monthly report on volumes, turnaround times, accuracy and the most common errors, plus a call to agree what to improve.',
  },
] as const;

// ======================================================
// INTERACTIVE WORKSPACE TYPES
// ======================================================

type WorkspaceTab = 'overview' | 'inbox' | 'calendar';

type TaskState = 'new' | 'in-progress' | 'done';

const taskSamples = [
  {
    id: 'VA-101',
    title: 'Confirm client meeting',
    group: 'Calendar',
  },
  {
    id: 'VA-102',
    title: 'Prepare Monday briefing',
    group: 'Documents',
  },
  {
    id: 'VA-103',
    title: 'Organise client emails',
    group: 'Inbox',
  },
] as const;

type TaskId = (typeof taskSamples)[number]['id'];

// ======================================================
// WORD-BY-WORD SCROLL REVEAL
// ======================================================

function RevealTitle({
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
      data-va-title
      className={`
        text-[clamp(2rem,4.1vw,4.5rem)]
        font-semibold
        leading-[1.11]
        tracking-[-.065em]
        ${light ? 'text-white' : 'text-[#17191C]'}
        ${className}
      `}
    >
      {text.split(' ').map((word, i) => (
        <span
          key={`${i}-${word}`}
          className="inline-block overflow-hidden align-bottom"
        >
          <span data-va-word className="inline-block">
            {word}
          </span>
          {'\u00a0'}
        </span>
      ))}
    </h2>
  );
}

// ======================================================
// SECTION HEADING
// ======================================================

function SectionHeading({
  eyebrow,
  text,
  subtitle,
  light = false,
}: {
  eyebrow: string;
  text: string;
  subtitle?: string;
  light?: boolean;
}) {
  return (
    <div>
      <p
        data-va-fade
        className={`text-[10px] font-bold uppercase tracking-[.22em] ${
          light
            ? 'text-white/70'
            : 'text-[#B12025]'
        }`}
      >
        {eyebrow}
      </p>

      <RevealTitle
        text={text}
        light={light}
        className="mt-3 max-w-[1060px]"
      />

      {subtitle && (
        <p
          data-va-fade
          className={`mt-4 max-w-[750px] text-[14px] leading-[1.8] ${
            light
              ? 'text-white/80'
              : 'text-[#17191C]/65'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ======================================================
// MAIN PAGE
// ======================================================

export default function VirtualAssistantServicesPage() {
  const rootRef = useRef<HTMLDivElement>(null);

  const horizontalRef = useRef<HTMLElement>(null);

  const trackRef = useRef<HTMLDivElement>(null);

  const [tab, setTab] =
    useState<WorkspaceTab>('overview');

  const [cardIndex, setCardIndex] =
    useState(0);

  const [faqOpen, setFaqOpen] =
    useState<number | null>(0);

  const [approved, setApproved] =
    useState(false);

  const [selectedTask, setSelectedTask] =
    useState<TaskId>('VA-101');

  const [tasks, setTasks] =
    useState<Record<TaskId, TaskState>>({
      'VA-101': 'in-progress',
      'VA-102': 'new',
      'VA-103': 'done',
    });

  const chosenTask = taskSamples.find(
    (t) => t.id === selectedTask
  )!;

  const status = tasks[selectedTask];

  const statusLabel: Record<TaskState, string> = {
    new: 'Received',
    'in-progress': 'In progress',
    done: 'Quality checked',
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
          // ---------------------------------------------
          // HERO HEADLINE — RISE LINE BY LINE
          // ---------------------------------------------

          gsap.fromTo(
            '[data-va-hero-line]',
            {
              yPercent: 110,
              opacity: 0,
            },
            {
              yPercent: 0,
              opacity: 1,
              duration: 1,
              stagger: 0.13,
              ease: 'power4.out',
              clearProps: 'transform,opacity',
            }
          );

          // HERO SUPPORTING TEXT

          gsap.fromTo(
            '[data-va-hero-detail]',
            {
              y: 20,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.75,
              stagger: 0.11,
              delay: 0.25,
              ease: 'power3.out',
              clearProps: 'transform,opacity',
            }
          );

          // HERO WORKSPACE ENTRANCE

          gsap.fromTo(
            '[data-va-hero-ui]',
            {
              y: 42,
              rotate: -2,
              opacity: 0,
            },
            {
              y: 0,
              rotate: 0,
              opacity: 1,
              duration: 1.05,
              delay: 0.3,
              ease: 'power3.out',
              clearProps: 'transform,opacity',
            }
          );

          // ---------------------------------------------
          // SCROLL HEADING REVEAL
          // ---------------------------------------------

          gsap.utils
            .toArray<HTMLElement>('[data-va-title]')
            .forEach((heading) => {
              gsap.fromTo(
                heading.querySelectorAll(
                  '[data-va-word]'
                ),
                {
                  yPercent: 95,
                  opacity: 0.22,
                },
                {
                  yPercent: 0,
                  opacity: 1,
                  stagger: 0.014,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: heading,
                    start: 'top 91%',
                    end: 'bottom 61%',
                    scrub: 0.65,
                  },
                }
              );
            });

          // EYEBROW AND SUBTITLE REVEAL

          gsap.utils
            .toArray<HTMLElement>('[data-va-fade]')
            .forEach((el) => {
              gsap.fromTo(
                el,
                {
                  y: 18,
                  opacity: 0,
                },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.7,
                  ease: 'power3.out',
                  scrollTrigger: {
                    trigger: el,
                    start: 'top 91%',
                    once: true,
                  },
                }
              );
            });

          // CARD RISE EFFECT

          gsap.utils
            .toArray<HTMLElement>(
              '[data-va-rise-card]'
            )
            .forEach((el) => {
              gsap.fromTo(
                el,
                {
                  y: 22,
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

          // ---------------------------------------------
          // TESTIMONIAL SCROLL REVEAL
          // ---------------------------------------------

          gsap.fromTo(
            '[data-va-quote-word]',
            {
              opacity: 0.18,
              y: 12,
            },
            {
              opacity: 1,
              y: 0,
              ease: 'none',
              stagger: 0.017,
              scrollTrigger: {
                trigger: '#va-quote',
                start: 'top 79%',
                end: 'bottom 58%',
                scrub: 0.7,
              },
            }
          );

          // ---------------------------------------------
          // COUNT-UP STATISTICS
          // ---------------------------------------------

          gsap.utils
            .toArray<HTMLElement>('[data-va-stat]')
            .forEach((el) => {
              const counter = {
                value: 0,
              };

              gsap.to(counter, {
                value: Number(
                  el.dataset.vaStat ?? 0
                ),
                duration: 1.55,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: el,
                  start: 'top 91%',
                  once: true,
                },
                onUpdate: () => {
                  el.textContent = String(
                    Math.round(counter.value)
                  );
                },
              });
            });

          // PROCESS TIMELINE

          gsap.fromTo(
            '[data-va-process-progress]',
            {
              scaleX: 0,
            },
            {
              scaleX: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: '#va-process',
                start: 'top 83%',
                end: 'bottom 54%',
                scrub: true,
              },
            }
          );

          // PAGE SCROLL PROGRESS

          gsap.fromTo(
            '[data-va-scroll-progress]',
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

          // DECORATIVE PARALLAX

          gsap.utils
            .toArray<HTMLElement>(
              '[data-va-parallax]'
            )
            .forEach((el) => {
              gsap.fromTo(
                el,
                {
                  y: -18,
                },
                {
                  y: 26,
                  ease: 'none',
                  scrollTrigger: {
                    trigger:
                      el.closest('section') ?? el,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1.3,
                  },
                }
              );
            });
        }, root);

        return () => ctx.revert();
      }
    );

    // ==================================================
    // DESKTOP PINNED GSAP HORIZONTAL CARDS
    // MOBILE AND TABLET USE NATIVE SWIPE
    // ==================================================

    mm.add(
      '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
      () => {
        const section = horizontalRef.current;

        const track = trackRef.current;

        if (!section || !track) return;

        const ctx = gsap.context(() => {
          const distance = () =>
            Math.max(
              0,
              track.scrollWidth -
                window.innerWidth +
                28
            );

          gsap.to(track, {
            x: () => -distance(),
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top+=80',
              end: () =>
                `+=${Math.max(1, distance())}`,
              pin: true,
              anticipatePin: 1,
              scrub: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) =>
                setCardIndex(
                  Math.min(
                    7,
                    Math.round(
                      self.progress * 7
                    )
                  )
                ),
            },
          });
        }, section);

        return () => ctx.revert();
      }
    );

    return () => mm.revert();
  }, []);

  // ====================================================
  // FAQ JSON-LD
  // ====================================================

  const jsonLd = {
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

  return (
    <div
      ref={rootRef}
      className="overflow-x-clip bg-white font-sans text-[#17191C]"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(
            /</g,
            '\\u003c'
          ),
        }}
      />

      {/* PAGE SCROLL PROGRESS */}

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-40 h-[3px]"
      >
        <div
          data-va-scroll-progress
          className="h-full w-full origin-left bg-[#B12025]"
        />
      </div>

      {/* ==============================================
          01 — HERO
          PREMIUM WHITE EDITORIAL
          INTERACTIVE INBOX AND CALENDAR
      ============================================== */}

      <section className="relative overflow-hidden bg-white px-5 pb-16 pt-12 sm:px-8 lg:px-14 lg:pb-[75px] lg:pt-[70px]">
        {/* Decorative background */}

        <div
          data-va-parallax
          aria-hidden="true"
          className="pointer-events-none absolute -right-[190px] -top-[190px] h-[650px] w-[650px] rounded-full border border-[#B12025]/10"
        />

        <div className="relative mx-auto grid max-w-[1420px] items-center gap-10 lg:grid-cols-[1.08fr_.92fr] lg:gap-12">
          {/* LEFT HERO TEXT */}

          <div>
            <p
              data-va-hero-detail
              className="text-[11px] text-[#17191C]/55"
            >
              Services / BPO &amp; Back Office /
              Virtual assistant services
            </p>

            <p
              data-va-hero-detail
              className="mt-6 text-[10px] font-bold uppercase tracking-[.21em] text-[#B12025]"
            >
              Virtual assistant services in Sri Lanka
            </p>

            {/* RISING H1 */}

            <h1 className="mt-5 max-w-[830px] text-[clamp(2rem,4.65vw,5.45rem)] font-semibold leading-[1.065] tracking-[-.065em] text-[#B12025]">
              {[
                'An assistant who',
                'manages your calendar',
                'and inbox, so you can',
                'spend your day on',
                'your own work.',
              ].map((line) => (
                <span
                  key={line}
                  className="block overflow-hidden pb-[.07em]"
                >
                  <span
                    data-va-hero-line
                    className="block"
                  >
                    {line}
                  </span>
                </span>
              ))}
            </h1>

            <p
              data-va-hero-detail
              className="mt-5 max-w-[620px] text-[14px] leading-[1.85] text-[#17191C]/70"
            >
              Managers lose hours each week to
              scheduling, email and small admin
              tasks. A FirstNotch virtual assistant
              takes these on, working in your
              accounts and following the way you
              like things done.
            </p>

            {/* ACTION BUTTONS */}

            <div
              data-va-hero-detail
              className="mt-6 flex flex-wrap gap-3"
            >
              <a
                href="#contact"
                className="inline-flex min-h-[47px] items-center gap-2 rounded-full bg-[#B12025] px-6 text-[12px] font-bold text-white transition hover:bg-[#94191E]"
              >
                Book a free discovery call
                <ArrowUpRight size={16} />
              </a>

              <a
                href="#va-included"
                className="inline-flex min-h-[47px] items-center gap-2 rounded-full border border-[#B12025]/35 px-6 text-[12px] font-semibold text-[#B12025] transition hover:bg-[#FFF1F1]"
              >
                See what is included
                <ArrowDown size={16} />
              </a>
            </div>

            <p
              data-va-hero-detail
              className="mt-6 flex items-center gap-2 text-[11px] text-[#17191C]/55"
            >
              <LockKeyhole
                size={14}
                className="text-[#B12025]"
              />
              Your accounts. Your instructions. Your approval.
            </p>
          </div>

          {/* RIGHT HERO INTERACTIVE WORKSPACE */}

          <div
            data-va-hero-ui
            className="relative mx-auto w-full max-w-[570px]"
          >
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-[36px] border border-dashed border-[#B12025]/15"
            />

            <div className="relative rounded-[26px] border border-[#B12025]/15 bg-[#FAF8F8] p-4 shadow-[0_28px_65px_rgba(92,21,28,.09)] sm:p-6">
              {/* Workspace header */}

              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#B12025]/15 pb-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#B12025] text-white">
                    <CalendarCheck2 size={18} />
                  </span>

                  <span className="text-[13px] font-bold">
                    Your assistant&apos;s workspace
                  </span>
                </div>

                <span className="rounded-full border border-[#B12025]/20 bg-white px-3 py-1.5 text-[10px] text-[#B12025]">
                  Interactive example
                </span>
              </div>

              {/* WORKSPACE TABS */}

              <div
                role="tablist"
                aria-label="Sample assistant workspace"
                className="mt-5 flex flex-wrap gap-2"
              >
                {(
                  [
                    ['overview', 'Morning brief'],
                    ['inbox', 'Inbox'],
                    ['calendar', 'Calendar'],
                  ] as const
                ).map(([key, name]) => (
                  <button
                    key={key}
                    type="button"
                    role="tab"
                    aria-selected={tab === key}
                    onClick={() => setTab(key)}
                    className={`rounded-full px-4 py-2 text-[11px] font-semibold transition ${
                      tab === key
                        ? 'bg-[#B12025] text-white'
                        : 'bg-white text-[#17191C]/65 hover:text-[#B12025]'
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>

              {/* SELECTED PREVIEW */}

              <div
                role="tabpanel"
                className="mt-4 min-h-[295px] rounded-[19px] bg-white p-5 sm:p-6"
              >
                {/* MORNING BRIEF */}

                {tab === 'overview' && (
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#B12025]">
                      Your morning, organised
                    </p>

                    <h2 className="mt-2 text-[28px] font-semibold tracking-[-.06em]">
                      Ready for your day.
                    </h2>

                    <p className="mt-2 text-[12px] leading-6 text-[#17191C]/60">
                      A sample overview prepared before
                      you start work.
                    </p>

                    <div className="mt-6 grid grid-cols-3 gap-2">
                      {[
                        ['03', 'Tasks tracked'],
                        ['02', 'Meetings planned'],
                        ['01', 'Needs approval'],
                      ].map(([value, label]) => (
                        <div
                          key={label}
                          className="rounded-xl bg-[#FFF5F5] p-3"
                        >
                          <p className="text-[25px] font-semibold tracking-[-.05em] text-[#B12025]">
                            {value}
                          </p>

                          <p className="mt-1 text-[10px] leading-4 text-[#17191C]/60">
                            {label}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 flex items-center gap-3 border-t border-[#17191C]/10 pt-4 text-[12px]">
                      <CheckCircle2
                        size={18}
                        className="shrink-0 text-[#B12025]"
                      />

                      Inbox triaged and calendar checked
                    </div>
                  </div>
                )}

                {/* INBOX PREVIEW */}

                {tab === 'inbox' && (
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#B12025]">
                      Approval-first inbox
                    </p>

                    <h2 className="mt-2 text-[27px] font-semibold tracking-[-.05em]">
                      Nothing sent without approval.
                    </h2>

                    <div className="mt-5 space-y-3">
                      <div className="rounded-[13px] border border-[#B12025]/15 p-4">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[11px] font-bold">
                            Client meeting request
                          </span>

                          <span className="text-[10px] text-[#B12025]">
                            Sample email
                          </span>
                        </div>

                        <p className="mt-2 text-[11px] leading-5 text-[#17191C]/65">
                          Draft: “Thanks for your message.
                          We&apos;ll confirm a suitable time
                          shortly.”
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setApproved((v) => !v)
                        }
                        className="inline-flex items-center gap-2 rounded-full bg-[#B12025] px-4 py-2.5 text-[11px] font-semibold text-white"
                      >
                        {approved ? (
                          <Check size={15} />
                        ) : (
                          <Mail size={15} />
                        )}

                        {approved
                          ? 'Sample reply approved'
                          : 'Approve sample reply'}
                      </button>

                      <p className="text-[11px] text-[#17191C]/55">
                        Approval updates this demo only;
                        no email is sent.
                      </p>
                    </div>
                  </div>
                )}

                {/* CALENDAR PREVIEW */}

                {tab === 'calendar' && (
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#B12025]">
                      Protected calendar time
                    </p>

                    <h2 className="mt-2 text-[27px] font-semibold tracking-[-.05em]">
                      Your time, protected.
                    </h2>

                    <div className="mt-5 space-y-3">
                      {[
                        ['09:00', 'Focus time', 'Reserved'],
                        [
                          '11:30',
                          'Client catch-up',
                          'Confirmed',
                        ],
                        [
                          '15:00',
                          'Project review',
                          'Planned',
                        ],
                      ].map(([time, title, state]) => (
                        <div
                          key={time}
                          className="flex items-center gap-3 border-b border-[#17191C]/10 pb-3"
                        >
                          <span className="w-12 shrink-0 font-mono text-[11px] text-[#B12025]">
                            {time}
                          </span>

                          <span className="flex-1 text-[12px] font-medium">
                            {title}
                          </span>

                          <span className="text-[10px] text-[#17191C]/50">
                            {state}
                          </span>
                        </div>
                      ))}
                    </div>

                    <p className="mt-4 flex items-center gap-2 text-[11px] text-[#17191C]/60">
                      <CalendarDays
                        size={15}
                        className="text-[#B12025]"
                      />

                      Illustrative schedule, not connected
                      to your calendar.
                    </p>
                  </div>
                )}
              </div>

              {/* WORKSPACE FOOTER */}

              <div className="mt-4 flex items-center justify-between gap-3 text-[10px] text-[#17191C]/50">
                <span>Prepared under your brand</span>

                <span className="flex items-center gap-1.5">
                  <ShieldCheck
                    size={14}
                    className="text-[#B12025]"
                  />
                  Controlled access
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==============================================
          02 — PINNED HORIZONTAL SERVICE CARDS
      ============================================== */}

      <section
        ref={horizontalRef}
        id="va-included"
        className="relative scroll-mt-20 overflow-hidden bg-[#B12025] py-14 text-white lg:py-12"
      >
        <div className="mx-auto max-w-[1420px] px-5 sm:px-8 lg:px-14">
          <SectionHeading
            eyebrow="01 / Everything handled"
            text="What the virtual assistant service includes"
            light
            subtitle="Eight ways to give yourself more time, with your processes and approvals kept in place."
          />

          <p className="mt-5 flex items-center gap-2 text-[11px] uppercase tracking-[.14em] text-white/70">
            <ArrowRight size={15} />

            <span className="hidden lg:inline">
              Scroll down to explore sideways
            </span>

            <span className="lg:hidden">
              Swipe the cards to explore
            </span>
          </p>
        </div>

        {/* MOBILE SWIPE / DESKTOP GSAP */}

        <div
          className="mt-6 snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:snap-none lg:overflow-visible"
          onScroll={(e) => {
            if (window.innerWidth >= 1024) return;

            const node = e.currentTarget;

            const max =
              node.scrollWidth -
              node.clientWidth;

            if (max > 0) {
              setCardIndex(
                Math.min(
                  7,
                  Math.round(
                    (node.scrollLeft / max) * 7
                  )
                )
              );
            }
          }}
        >
          <div
            ref={trackRef}
            className="flex w-max gap-4 px-5 sm:gap-5 sm:px-8 lg:gap-6 lg:px-14"
          >
            {services.map((s) => (
              <article
                key={s.n}
                className="group flex min-h-[330px] w-[min(86vw,440px)] shrink-0 snap-center flex-col justify-between rounded-[23px] bg-white p-6 text-[#17191C] shadow-[0_16px_40px_rgba(70,12,18,.14)] transition-transform duration-300 hover:-translate-y-1 sm:w-[440px] sm:p-8 lg:min-h-[360px] lg:w-[465px]"
              >
                <div>
                  {/* CARD TOP */}

                  <div className="flex items-start justify-between gap-3">
                    <span className="font-mono text-[12px] text-[#B12025]">
                      {s.n} / 08
                    </span>

                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF1F1] text-[#B12025]">
                      <s.Icon
                        size={26}
                        strokeWidth={1.7}
                      />
                    </span>
                  </div>

                  <p className="mt-5 text-[10px] font-bold tracking-[.2em] text-[#B12025]">
                    {s.label}
                  </p>

                  <h3 className="mt-2 text-[clamp(1.7rem,2.1vw,2.35rem)] font-semibold leading-[1.13] tracking-[-.05em]">
                    {s.title}
                  </h3>

                  <p className="mt-4 text-[13px] leading-[1.8] text-[#17191C]/65">
                    {s.copy}
                  </p>
                </div>

                {/* CARD CHECKLIST */}

                <ul className="mt-5 space-y-2 border-t border-[#17191C]/10 pt-4">
                  {s.checks.map((c) => (
                    <li
                      key={c}
                      className="flex items-center gap-2 text-[11px] text-[#17191C]/65"
                    >
                      <Check
                        size={14}
                        className="shrink-0 text-[#B12025]"
                      />

                      {c}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>

        {/* SCROLL PROGRESS */}

        <div className="mx-auto mt-6 max-w-[1420px] px-5 sm:px-8 lg:px-14">
          <div className="h-[3px] overflow-hidden rounded-full bg-white/25">
            <div
              className="h-full bg-white transition-[width] duration-150"
              style={{
                width: `${
                  ((cardIndex + 1) * 100) /
                  services.length
                }%`,
              }}
            />
          </div>

          <p className="mt-2 font-mono text-[10px] text-white/70">
            {String(cardIndex + 1).padStart(
              2,
              '0'
            )}{' '}
            / 08 · {services[cardIndex].title}
          </p>
        </div>
      </section>

      {/* ==============================================
          03 — INTERACTIVE TASK WORKFLOW
      ============================================== */}

      <section
        id="va-demo"
        className="relative overflow-hidden bg-[#F8F7F7] px-5 py-16 sm:px-8 lg:px-14 lg:py-20"
      >
        <div
          data-va-parallax
          aria-hidden="true"
          className="pointer-events-none absolute -right-28 top-0 h-[400px] w-[400px] rounded-full border border-[#B12025]/10"
        />

        <div className="relative mx-auto grid max-w-[1420px] items-start gap-8 lg:grid-cols-[.92fr_1.08fr] lg:gap-14">
          {/* LEFT HEADING */}

          <div className="lg:sticky lg:top-[115px]">
            <SectionHeading
              eyebrow="02 / Working together"
              text="One assistant. A clear view of every task"
              subtitle="The assistant works in the tools you already use. Try the sample task board to see how work moves from request to review."
            />

            {/* TASK SELECTOR */}

            <div className="mt-7 border-t border-[#B12025]/20">
              {taskSamples.map((task) => (
                <button
                  type="button"
                  key={task.id}
                  onClick={() =>
                    setSelectedTask(task.id)
                  }
                  aria-pressed={
                    selectedTask === task.id
                  }
                  className={`flex w-full items-center justify-between gap-3 border-b border-[#B12025]/15 py-4 text-left text-[13px] font-semibold transition ${
                    selectedTask === task.id
                      ? 'text-[#B12025]'
                      : 'text-[#17191C]/65 hover:text-[#B12025]'
                  }`}
                >
                  <span>{task.title}</span>

                  <ArrowRight
                    size={17}
                    className="shrink-0"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT WORKFLOW PANEL */}

          <div
            data-va-rise-card
            className="rounded-[24px] border border-[#B12025]/15 bg-white p-5 shadow-[0_15px_50px_rgba(88,15,23,.06)] sm:p-8"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#B12025]/15 pb-4">
              <span className="font-mono text-[10px] text-[#17191C]/50">
                {selectedTask} / SAMPLE WORKFLOW
              </span>

              <span className="rounded-full bg-[#FFF1F1] px-3 py-1.5 text-[10px] font-semibold text-[#B12025]">
                Not connected to your accounts
              </span>
            </div>

            <h3 className="mt-6 text-[clamp(1.6rem,2.7vw,2.75rem)] font-semibold tracking-[-.055em]">
              {chosenTask.title}
            </h3>

            <p className="mt-2 text-[12px] text-[#17191C]/60">
              {chosenTask.group} · Your approved workflow
            </p>

            {/* WORKFLOW STAGES */}

            <div className="mt-6 grid grid-cols-3 gap-2">
              {(
                [
                  ['new', 'Received'],
                  ['in-progress', 'In progress'],
                  ['done', 'QA checked'],
                ] as const
              ).map(([value, title], index) => (
                <div
                  key={value}
                  className={`rounded-[13px] p-3 text-center ${
                    status === value
                      ? 'bg-[#B12025] text-white'
                      : 'bg-[#FFF4F4] text-[#B12025]/65'
                  }`}
                >
                  <span className="font-mono text-[11px]">
                    0{index + 1}
                  </span>

                  <p className="mt-2 text-[11px] font-semibold">
                    {title}
                  </p>
                </div>
              ))}
            </div>

            <p
              role="status"
              className="mt-5 flex items-center gap-2 text-[12px] text-[#17191C]/70"
            >
              <CheckCircle2
                size={17}
                className="text-[#B12025]"
              />

              Current state: {statusLabel[status]}
            </p>

            {/* TASK ACTIONS */}

            <div className="mt-6 flex flex-wrap gap-2 border-t border-[#B12025]/15 pt-5">
              <button
                type="button"
                disabled={status === 'done'}
                onClick={() =>
                  setTasks((old) => ({
                    ...old,
                    [selectedTask]:
                      old[selectedTask] === 'new'
                        ? 'in-progress'
                        : 'done',
                  }))
                }
                className="inline-flex min-h-[43px] items-center gap-2 rounded-full bg-[#B12025] px-5 text-[11px] font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {status === 'done'
                  ? 'Review completed'
                  : 'Move to next stage'}

                <ArrowRight size={15} />
              </button>

              <button
                type="button"
                onClick={() =>
                  setTasks((old) => ({
                    ...old,
                    [selectedTask]: 'new',
                  }))
                }
                className="inline-flex min-h-[43px] items-center gap-2 rounded-full border border-[#B12025]/35 px-5 text-[11px] font-bold text-[#B12025]"
              >
                <RotateCcw size={14} />
                Reset example
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==============================================
          04 — NUMBERS / REPORTING
      ============================================== */}

      <section
        id="va-reporting"
        className="bg-white px-5 py-16 sm:px-8 lg:px-14 lg:py-20"
      >
        <div className="mx-auto max-w-[1420px]">
          <SectionHeading
            eyebrow="03 / Visibility"
            text="The numbers you will see"
            subtitle="Your monthly summary shows the hours used on each type of task, the work finished and what is still awaiting your attention."
          />

          {/* REPORT CARDS */}

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {report.map((metric, i) => (
              <article
                key={metric.title}
                data-va-rise-card
                className={`group rounded-[19px] border border-[#E7E2E2] bg-[#FBFAFA] p-5 transition-transform duration-300 hover:-translate-y-1 hover:border-[#B12025]/40 ${
                  i === 4 ? 'lg:col-span-4' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-[#B12025]">
                    0{i + 1}
                  </span>

                  <metric.Icon
                    size={22}
                    className="text-[#B12025]"
                  />
                </div>

                <h3 className="mt-5 text-[19px] font-semibold tracking-[-.035em]">
                  {metric.title}
                </h3>

                <p className="mt-2 text-[12px] leading-6 text-[#17191C]/65">
                  {metric.description}
                </p>

                <p className="mt-4 text-[11px] font-semibold text-[#B12025]">
                  {metric.note}
                </p>
              </article>
            ))}
          </div>

          {/* COMPANY STATISTICS */}

          <div className="mt-8 grid grid-cols-2 gap-6 border-t border-[#B12025]/15 pt-7 sm:grid-cols-3">
            <div>
              <p className="text-[clamp(2.25rem,4vw,4rem)] font-semibold tracking-[-.07em] text-[#B12025]">
                <span data-va-stat="85">85</span>%
              </p>

              <p className="text-[12px] text-[#17191C]/60">
                client retention rate
              </p>
            </div>

            <div>
              <p className="text-[clamp(2.25rem,4vw,4rem)] font-semibold tracking-[-.07em] text-[#B12025]">
                <span data-va-stat="98">98</span>%
              </p>

              <p className="text-[12px] text-[#17191C]/60">
                accuracy rate
              </p>
            </div>

            <div>
              <p className="text-[clamp(2rem,3.8vw,3.8rem)] font-semibold tracking-[-.07em] text-[#B12025]">
                <span data-va-stat="15">15</span>–
                <span data-va-stat="20">20</span>%
              </p>

              <Link
                href="/how-we-hire"
                className="inline-flex items-center gap-1 text-[12px] text-[#17191C]/60 hover:text-[#B12025]"
              >
                of applicants pass hiring checks
                <ArrowUpRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==============================================
          05 — TESTIMONIAL TEXT REVEAL
      ============================================== */}

      <section
        id="va-quote"
        className="relative overflow-hidden bg-[#B12025] px-5 py-20 text-white sm:px-8 lg:px-14 lg:py-24"
      >
        <div
          data-va-parallax
          aria-hidden="true"
          className="pointer-events-none absolute -right-6 -top-28 text-[320px] font-bold leading-none text-white/[.06]"
        >
          “
        </div>

        <div className="relative mx-auto max-w-[1170px]">
          <p className="text-[11px] font-semibold uppercase tracking-[.2em] text-white/70">
            Architecture practice / Client experience
          </p>

          <blockquote className="mt-6 text-[clamp(2rem,4.2vw,4.6rem)] font-semibold leading-[1.23] tracking-[-.055em]">
            {(
              '“Our director’s calendar and inbox are now sorted every morning before she arrives. Client emails no longer wait until the evening for a reply.”'
            )
              .split(' ')
              .map((word, i) => (
                <span
                  key={`${i}-${word}`}
                  className="inline-block overflow-hidden align-bottom"
                >
                  <span
                    data-va-quote-word
                    className="inline-block"
                  >
                    {word}
                  </span>
                  {'\u00a0'}
                </span>
              ))}
          </blockquote>

          <p className="mt-6 text-[11px] font-semibold uppercase tracking-[.18em] text-white/75">
            Architecture practice
          </p>
        </div>
      </section>

      {/* ==============================================
          06 — FAQ SECTION
      ============================================== */}

      <section
        id="va-faq"
        className="bg-[#F7F7F8] px-5 py-16 sm:px-8 lg:px-14 lg:py-20"
      >
        <div className="mx-auto grid max-w-[1420px] items-start gap-8 lg:grid-cols-[.85fr_1.15fr] lg:gap-14">
          {/* STICKY HEADING */}

          <div className="lg:sticky lg:top-[115px]">
            <SectionHeading
              eyebrow="04 / Answers"
              text="Common questions about virtual assistant services"
            />
          </div>

          {/* FAQ ACCORDION */}

          <div className="border-t border-[#17191C]/15">
            {faqs.map((faq, i) => (
              <div
                key={faq.q}
                className="border-b border-[#17191C]/15"
              >
                <h3>
                  <button
                    type="button"
                    onClick={() =>
                      setFaqOpen((old) =>
                        old === i ? null : i
                      )
                    }
                    aria-expanded={faqOpen === i}
                    aria-controls={`va-faq-${i}`}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left text-[15px] font-semibold text-[#17191C] focus-visible:outline-2 focus-visible:outline-[#B12025] sm:text-[17px]"
                  >
                    {faq.q}

                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-[#B12025] transition-transform duration-300 ${
                        faqOpen === i
                          ? 'rotate-180'
                          : ''
                      }`}
                    />
                  </button>
                </h3>

                <div
                  id={`va-faq-${i}`}
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ${
                    faqOpen === i
                      ? 'grid-rows-[1fr] opacity-100'
                      : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-5 text-[13px] leading-7 text-[#17191C]/70">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==============================================
          07 — RELATED SERVICES
      ============================================== */}

      <section
        id="va-related"
        className="bg-white px-5 py-14 sm:px-8 lg:px-14 lg:py-16"
      >
        <div className="mx-auto max-w-[1420px]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <RevealTitle
              text="Other BPO and back office services"
              className="max-w-[850px]"
            />

            <Link
              href={BASE}
              className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#B12025]"
            >
              See all services
              <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="mt-6 grid gap-x-12 md:grid-cols-2">
            {related.map(([name, slug]) => (
              <Link
                key={slug}
                href={`${BASE}/${slug}`}
                className="group flex items-center justify-between gap-4 border-b border-[#B12025]/20 py-4 text-[14px] font-semibold transition-all hover:pl-2 hover:text-[#B12025]"
              >
                {name}

                <ArrowRight
                  size={16}
                  className="shrink-0 text-[#B12025] transition-transform group-hover:translate-x-2"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ==============================================
          08 — HOW YOUR BACK OFFICE TEAM IS SET UP
      ============================================== */}

      <section
        id="va-process"
        className="bg-[#FFF5F5] px-5 py-16 sm:px-8 lg:px-14 lg:py-20"
      >
        <div className="mx-auto max-w-[1420px]">
          <SectionHeading
            eyebrow="05 / Onboarding"
            text="How your back office team is set up"
            subtitle="The biggest risk with outsourced admin is mistakes that reach your systems. These steps are there to stop that."
          />

          {/* HORIZONTAL PROCESS LINE */}

          <div className="relative mt-9">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 hidden h-[2px] bg-[#B12025]/20 lg:block"
            />

            <div
              data-va-process-progress
              aria-hidden="true"
              className="absolute inset-x-0 top-0 hidden h-[2px] origin-left bg-[#B12025] lg:block"
            />

            <ol className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((s) => (
                <li
                  key={s.n}
                  data-va-rise-card
                  className="border-l border-[#B12025]/30 pl-4 lg:border-l-0 lg:pl-0 lg:pt-6"
                >
                  <div className="flex items-center gap-3 text-[#B12025]">
                    <s.Icon size={22} />

                    <span className="font-mono text-[11px] font-bold">
                      {s.n}
                    </span>
                  </div>

                  <h3 className="mt-3 text-[19px] font-semibold tracking-[-.04em]">
                    {s.title}
                  </h3>

                  <p className="mt-3 text-[12px] leading-[1.8] text-[#17191C]/70">
                    {s.copy}
                  </p>

                  {s.n === '02' && (
                    <Link
                      href="/how-we-hire"
                      className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-[#B12025]"
                    >
                      See how we hire
                      <ArrowUpRight size={13} />
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </div>

          {/* CTA */}

          <div className="mt-9 flex flex-wrap items-center justify-between gap-4 border-t border-[#B12025]/15 pt-6">
            <p className="text-[13px] text-[#17191C]/70">
              Ready to hand over your calendar and inbox?
            </p>

            <a
              href="#contact"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#B12025] px-6 text-[12px] font-semibold text-white"
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
