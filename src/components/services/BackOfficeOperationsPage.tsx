
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
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  Clock,
  Database,
  FileText,
  RotateCcw,
  ShieldCheck,
  Users,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ======================================================
// FIRSTNOTCH BRAND
// Red: #B12025
// White: #FFFFFF
// Charcoal: #17191C
// ======================================================

const BASE = '/services/bpo-back-office-outsourcing';

// ======================================================
// 8 BACK OFFICE SERVICES
// ======================================================

const features = [
  {
    n: '01',
    title: 'Order processing',
    tag: 'ORDERS',
    Icon: ClipboardCheck,
    text:
      'Orders are entered and checked in your system, and customers are sent confirmation using templates you approve.',
    details: [
      'Order received',
      'Details checked',
      'Confirmation sent',
    ],
  },
  {
    n: '02',
    title: 'Record updates',
    tag: 'RECORDS',
    Icon: Database,
    text:
      'Customer, supplier and staff records are updated as changes come in.',
    details: [
      'Change received',
      'Record updated',
      'Update logged',
    ],
  },
  {
    n: '03',
    title: 'Supplier paperwork',
    tag: 'SUPPLIERS',
    Icon: FileText,
    text:
      'Purchase orders, delivery notes and supplier documents are matched and filed.',
    details: [
      'Purchase order',
      'Delivery note',
      'Documents matched',
    ],
  },
  {
    n: '04',
    title: 'Scheduling',
    tag: 'SCHEDULE',
    Icon: CalendarDays,
    text:
      'Bookings, staff rotas and appointments are kept up to date.',
    details: [
      'Booking received',
      'Availability checked',
      'Schedule updated',
    ],
  },
  {
    n: '05',
    title: 'Regular reports',
    tag: 'REPORTING',
    Icon: BarChart3,
    text:
      'Reports are prepared from your systems daily, weekly or monthly, in the format your managers use.',
    details: [
      'Data gathered',
      'Format checked',
      'Report delivered',
    ],
  },
  {
    n: '06',
    title: 'Written processes',
    tag: 'PLAYBOOK',
    Icon: FileText,
    text:
      'Each task follows a step-by-step guide you approve. When something does not fit the guide, it goes to your team.',
    details: [
      'Your approved guide',
      'Steps followed',
      'Exceptions referred',
    ],
  },
  {
    n: '07',
    title: 'Agreed turnaround times',
    tag: 'TIMING',
    Icon: Clock,
    text:
      'Every type of task has a turnaround time agreed with you, and performance against it is reported.',
    details: [
      'Due time agreed',
      'Status tracked',
      'Performance reported',
    ],
  },
  {
    n: '08',
    title: 'A team that changes size',
    tag: 'SCALING',
    Icon: Users,
    text:
      'Staff can be added before busy periods and reduced afterwards.',
    details: [
      'Busy period planned',
      'Staff prepared',
      'Team size adjusted',
    ],
  },
] as const;

// ======================================================
// REPORT METRICS
// ======================================================

const metrics = [
  {
    title: 'Tasks completed',
    description:
      'Tasks finished in the period, by type.',
    note: 'Reported weekly.',
    Icon: ClipboardCheck,
  },
  {
    title: 'On-time rate',
    description:
      'The share of tasks done within the agreed turnaround time.',
    note: 'Tracked against agreed targets.',
    Icon: Clock,
  },
  {
    title: 'Backlog',
    description:
      'Tasks waiting and how long the oldest has been there.',
    note: 'Shown each day in a shared queue.',
    Icon: BarChart3,
  },
  {
    title: 'Accuracy rate',
    description:
      'Tasks that passed the quality check at review.',
    note: '98% across client work.',
    Icon: ShieldCheck,
  },
  {
    title: 'Exceptions',
    description:
      'Tasks sent to your team because they did not fit the written process.',
    note: 'Used to update the guides.',
    Icon: FileText,
  },
] as const;

// ======================================================
// COMMON QUESTIONS
// ======================================================

const faqs = [
  {
    q: 'Which tasks can be handed over?',
    a:
      'Any task that follows clear steps and can be done remotely in your systems. Tasks that need someone on site stay with your team.',
  },
  {
    q: 'What happens when someone is on leave?',
    a:
      'Each process is written down and at least two people are trained on it, so work continues during leave.',
  },
  {
    q: 'Which systems will the team log into?',
    a:
      'Your own systems, with logins you provide. For example Microsoft 365, Shopify or Zoho.',
  },
  {
    q: 'How do we keep track of the work?',
    a:
      'You get a shared task board showing each task, its status and its due date, plus a monthly report.',
  },
  {
    q: 'Who has access to our systems?',
    a:
      'Only the team members assigned to your account, each with their own login. You can see and remove anyone’s access at any time.',
  },
  {
    q: 'How is back office support priced?',
    a:
      'Cost depends on the tasks your team handles. Usually a monthly fee for each person on your team. Pricing is set out in writing after the discovery call.',
  },
] as const;

// ======================================================
// RELATED SERVICES
// ======================================================

const related = [
  [
    'Data entry and processing',
    'data-entry-processing',
  ],
  [
    'Document processing',
    'document-processing',
  ],
  [
    'Data verification and validation',
    'data-verification-validation',
  ],
  [
    'Compliance, KYC and AML support',
    'compliance-kyc-aml-support',
  ],
  [
    'Lead generation',
    'lead-generation',
  ],
  [
    'Virtual assistant services',
    'virtual-assistant-services',
  ],
] as const;

// ======================================================
// FOUR-STEP SETUP
// ======================================================

const process = [
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
    Icon: CheckCircle2,
    text:
      'Every task gets a quality score. Work starts at a lower volume with extra checks, and volume grows once accuracy is steady. Each team member has a monthly performance review with coaching.',
  },
  {
    n: '04',
    title: 'Reporting and improving',
    Icon: BarChart3,
    text:
      'You get a monthly report on volumes, turnaround times, accuracy and the most common errors, plus a call to agree what to improve.',
  },
] as const;

// ======================================================
// EXAMPLE ADMIN TASK BOARD
// ======================================================

const sampleTasks = [
  {
    id: 'BO-1021',
    name: 'Order confirmation',
    area: 'Order processing',
  },
  {
    id: 'BO-1022',
    name: 'Supplier delivery note',
    area: 'Supplier paperwork',
  },
  {
    id: 'BO-1023',
    name: 'Customer details update',
    area: 'Record updates',
  },
] as const;

const stages = [
  'Received',
  'In progress',
  'Quality check',
  'Completed',
] as const;

type SampleTaskId =
  (typeof sampleTasks)[number]['id'];

type StageIndex = 0 | 1 | 2 | 3;


function ScrollHeading({
  children,
  light = false,
  className = '',
}: {
  children: string;
  light?: boolean;
  className?: string;
}) {
  return (
    <h2
      data-bo-heading
      className={`
        text-[clamp(2.1rem,4.5vw,4.9rem)]
        font-semibold
        leading-[1.09]
        tracking-[-.065em]
        max-sm:text-[24px]
        max-sm:leading-[1.1]
        max-sm:tracking-[-.045em]
        ${light ? 'text-white' : 'text-[#17191C]'}
        ${className}
      `}
    >
      {children.split(' ').map((word, i) => (
        <span
          key={`${i}-${word}`}
          className="inline-block overflow-hidden align-bottom"
        >
          <span data-bo-word className="inline-block">
            {word}
          </span>
          {'\u00a0'}
        </span>
      ))}
    </h2>
  );
}

function SectionIntro({
  label,
  title,
  description,
  light = false,
}: {
  label: string;
  title: string;
  description?: string;
  light?: boolean;
}) {
  return (
    <div>
      <p
        data-bo-fade
        className={`
          text-[11px]
          font-bold
          uppercase
          tracking-[.2em]
          max-sm:text-[8px]
          max-sm:tracking-[.14em]
          ${
            light
              ? 'text-white/75'
              : 'text-[#B12025]'
          }
        `}
      >
        {label}
      </p>

      <ScrollHeading
        light={light}
        className="mt-3 max-w-[1030px] max-sm:mt-2"
      >
        {title}
      </ScrollHeading>

      {description && (
        <p
          data-bo-fade
          className={`
            mt-4
            max-w-[750px]
            text-[14px]
            leading-[1.8]
            max-sm:mt-3
            max-sm:text-[10px]
            max-sm:leading-[1.6]
            ${
              light
                ? 'text-white/80'
                : 'text-[#17191C]/65'
            }
          `}
        >
          {description}
        </p>
      )}
    </div>
  );
}


// ======================================================
// MAIN COMPONENT
// ======================================================

export default function BackOfficeOperationsPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  const horizontalRef =
    useRef<HTMLElement>(null);

  const trackRef =
    useRef<HTMLDivElement>(null);

  const [activeCard, setActiveCard] =
    useState(0);

  const [selectedTask, setSelectedTask] =
    useState<SampleTaskId>('BO-1021');

  const [taskStages, setTaskStages] =
    useState<Record<SampleTaskId, StageIndex>>({
      'BO-1021': 1,
      'BO-1022': 0,
      'BO-1023': 2,
    });

  const [openFaq, setOpenFaq] =
    useState<number | null>(0);

  const currentTask =
    sampleTasks.find(
      (t) => t.id === selectedTask
    )!;

  const currentStage =
    taskStages[selectedTask];

  const advanceTask = () => {
    setTaskStages((prev) => ({
      ...prev,
      [selectedTask]: Math.min(
        3,
        prev[selectedTask] + 1
      ) as StageIndex,
    }));
  };

  // ====================================================
  // GSAP ANIMATIONS
  // ====================================================

  useEffect(() => {
    const root = pageRef.current;

    if (!root) return;

  const mm = gsap.matchMedia();

mm.add('(max-width: 639px)', () => {
  gsap.set(
    [
      '[data-bo-hero-rise]',
      '[data-bo-hero-sub]',
      '[data-bo-word]',
      '[data-bo-fade]',
      '[data-bo-quote-word]',
    ],
    {
      y: 0,
      yPercent: 0,
      opacity: 1,
      autoAlpha: 1,
      visibility: 'visible',
      clearProps: 'transform',
    }
  );
});

   mm.add(
  '(min-width: 640px) and (prefers-reduced-motion: no-preference)',
  () => {
        const ctx = gsap.context(() => {
          // HERO TEXT — RISE FROM BOTTOM

          gsap.fromTo(
            '[data-bo-hero-rise]',
            {
              yPercent: 105,
              autoAlpha: 0,
            },
            {
              yPercent: 0,
              autoAlpha: 1,
              stagger: 0.13,
              duration: 1.05,
              ease: 'power4.out',
            }
          );

          // HERO SUPPORTING CONTENT

          gsap.fromTo(
            '[data-bo-hero-sub]',
            {
              y: 21,
              autoAlpha: 0,
            },
            {
              y: 0,
              autoAlpha: 1,
              stagger: 0.1,
              delay: 0.24,
              duration: 0.8,
              ease: 'power3.out',
            }
          );

          // HERO OPERATIONS WORKSPACE

          gsap.fromTo(
            '[data-bo-hero-board]',
            {
              y: 35,
              scale: 0.97,
              autoAlpha: 0,
            },
            {
              y: 0,
              scale: 1,
              autoAlpha: 1,
              delay: 0.35,
              duration: 1.05,
              ease: 'power3.out',
            }
          );

          // WORD-BY-WORD HEADING REVEAL

          gsap.utils
            .toArray<HTMLElement>(
              '[data-bo-heading]'
            )
            .forEach((heading) => {
              gsap.fromTo(
                heading.querySelectorAll(
                  '[data-bo-word]'
                ),
                {
                  yPercent: 100,
                  opacity: 0.22,
                },
                {
                  yPercent: 0,
                  opacity: 1,
                  stagger: 0.018,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: heading,
                    start: 'top 90%',
                    end: 'bottom 58%',
                    scrub: 0.65,
                  },
                }
              );
            });

          // SUBTITLE / EYEBROW ANIMATION

          gsap.utils
            .toArray<HTMLElement>(
              '[data-bo-fade]'
            )
            .forEach((el) => {
              gsap.fromTo(
                el,
                {
                  y: 19,
                  opacity: 0,
                },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.8,
                  ease: 'power3.out',
                  scrollTrigger: {
                    trigger: el,
                    start: 'top 92%',
                    once: true,
                  },
                }
              );
            });

          // TESTIMONIAL SCROLL REVEAL

          gsap.fromTo(
            '[data-bo-quote-word]',
            {
              opacity: 0.16,
              y: 15,
            },
            {
              opacity: 1,
              y: 0,
              ease: 'none',
              stagger: 0.012,
              scrollTrigger: {
                trigger: '#bo-quote',
                start: 'top 80%',
                end: 'bottom 58%',
                scrub: 0.7,
              },
            }
          );

          // COUNT-UP STATS

          gsap.utils
            .toArray<HTMLElement>(
              '[data-bo-stat]'
            )
            .forEach((el) => {
              const counter = { value: 0 };

              const target = Number(
                el.dataset.boStat || 0
              );

              gsap.to(counter, {
                value: target,
                duration: 1.5,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: el,
                  start: 'top 90%',
                  once: true,
                },
                onUpdate: () => {
                  el.textContent =
                    Math.round(
                      counter.value
                    ).toString();
                },
              });
            });

          // PROCESS TIMELINE DRAW

          gsap.fromTo(
            '[data-bo-process-line]',
            {
              scaleX: 0,
            },
            {
              scaleX: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: '#bo-setup',
                start: 'top 80%',
                end: 'bottom 55%',
                scrub: true,
              },
            }
          );

          // PAGE SCROLL PROGRESS

          gsap.fromTo(
            '[data-bo-page-progress]',
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
              '[data-bo-parallax]'
            )
            .forEach((el) => {
              gsap.fromTo(
                el,
                {
                  y: -22,
                },
                {
                  y: 36,
                  ease: 'none',
                  scrollTrigger: {
                    trigger:
                      el.closest('section') || el,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1.1,
                  },
                }
              );
            });
        }, root);

        return () => ctx.revert();
      }
    );

    // ==================================================
    // GSAP HORIZONTAL CARDS — DESKTOP ONLY
    // TABLET AND MOBILE — NATIVE SWIPE
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
                32
            );

          gsap.to(track, {
            x: () => -distance(),
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top+=80',
              end: () => `+=${distance()}`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) =>
                setActiveCard(
                  Math.min(
                    features.length - 1,
                    Math.round(
                      self.progress *
                        (features.length - 1)
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
  // STRUCTURED FAQ DATA
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

  return (
    <div
      ref={pageRef}
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

      {/* PAGE PROGRESS BAR */}

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[3px]"
      >
        <div
          data-bo-page-progress
          className="h-full w-full origin-left bg-[#B12025]"
        />
      </div>

      
{/* ==============================================
    01 — HERO
============================================== */}

<section
  id="bo-hero"
className="
  relative overflow-hidden bg-white
  px-5 pb-16 pt-14
  max-sm:pb-7 max-sm:pt-[84px]
  sm:px-8
  lg:px-14 lg:pb-[82px] lg:pt-[74px]
"
>
  <div
    data-bo-parallax
    aria-hidden="true"
    className="
      pointer-events-none absolute
      -right-[160px] top-[-190px]
      h-[590px] w-[590px]
      rounded-full border border-[#B12025]/10
      max-sm:hidden
    "
  />

  <div
    className="
      relative mx-auto grid max-w-[1420px]
      items-center gap-10
      max-sm:gap-5
      lg:grid-cols-[1.1fr_.9fr] lg:gap-14
    "
  >
    {/* HERO COPY */}

    <div className="min-w-0">
      <p
        data-bo-hero-sub
        className="
          mt-6 text-[10px] font-bold uppercase
          tracking-[.2em] text-[#B12025]
          max-sm:mt-2 max-sm:text-[8px]
          max-sm:tracking-[.13em]
        "
      >
        Back office support services in Sri Lanka
      </p>

      <h1
        className="
          mt-5 max-w-[810px]
          text-[clamp(2.5rem,4.9vw,5.55rem)]
          font-semibold leading-[1.065]
          tracking-[-.069em] text-[#B12025]
          max-sm:mt-3 max-sm:text-[29px]
          max-sm:leading-[1.06]
          max-sm:tracking-[-.055em]
        "
      >
        {[
          'Your daily admin',
          'done on time, by a team',
          'that changes size as',
          'your workload does.',
        ].map((line) => (
          <span
            key={line}
            className="block overflow-hidden pb-[.09em]"
          >
            <span data-bo-hero-rise className="block">
              {line}
            </span>
          </span>
        ))}
      </h1>

      <p
        data-bo-hero-sub
        className="
          mt-5 max-w-[650px]
          text-[14px] leading-[1.85]
          text-[#17191C]/70
          max-sm:mt-3
          max-sm:text-[10px]
          max-sm:leading-[1.6]
        "
      >
        Each new customer adds admin.
        FirstNotch takes on repeatable admin
        tasks, such as order processing, record
        updates, supplier paperwork,
        scheduling and reporting.
      </p>

      {/* MOBILE BUTTONS — ONE ROW */}

      <div
        data-bo-hero-sub
        className="
          mt-6 flex flex-wrap gap-3
          max-sm:mt-4
          max-sm:flex-nowrap
          max-sm:gap-2
        "
      >
        <a
          href="#contact"
          className="
            inline-flex min-h-[48px] items-center gap-2
            rounded-full bg-[#B12025] px-6
            text-[12px] font-bold text-white
            transition hover:bg-[#941A20]
            max-sm:min-h-[38px]
            max-sm:min-w-0
            max-sm:flex-1
            max-sm:justify-center
            max-sm:gap-1
            max-sm:px-2
            max-sm:text-[9px]
            max-sm:whitespace-nowrap
          "
        >
          Book a free discovery call
          <ArrowUpRight
            size={16}
            className="shrink-0 max-sm:h-[12px] max-sm:w-[12px]"
          />
        </a>

        <a
          href="#bo-included"
          className="
            inline-flex min-h-[48px] items-center gap-2
            rounded-full border border-[#B12025]/40
            px-6 text-[12px] font-semibold
            text-[#B12025] transition
            hover:bg-[#FFF3F3]
            max-sm:min-h-[38px]
            max-sm:min-w-0
            max-sm:flex-1
            max-sm:justify-center
            max-sm:gap-1
            max-sm:px-2
            max-sm:text-[9px]
            max-sm:whitespace-nowrap
          "
        >
          See what is included
          <ArrowDown
            size={16}
            className="shrink-0 max-sm:h-[12px] max-sm:w-[12px]"
          />
        </a>
      </div>
    </div>

{/* OPERATIONS WORKSPACE */}

<div
  data-bo-hero-board
  className="
    relative mx-auto w-full max-w-[560px]
    max-sm:hidden
  "
>
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute -inset-5
          rounded-[34px] border
          border-dashed border-[#B12025]/15
          max-sm:hidden
        "
      />

      <div
        className="
          relative rounded-[25px]
          border border-[#B12025]/15
          bg-[#FAF7F7] p-5
          shadow-[0_25px_75px_rgba(77,18,22,.08)]
          max-sm:rounded-[17px]
          max-sm:p-3
          sm:p-7
        "
      >
        <div
          className="
            flex items-center justify-between gap-2
            border-b border-[#B12025]/15 pb-4
            max-sm:pb-2
          "
        >
          <p
            className="
              text-[11px] font-bold uppercase
              tracking-[.14em] text-[#B12025]
              max-sm:text-[8px]
              max-sm:tracking-[.08em]
            "
          >
            Operations workspace
          </p>

          <span
            className="
              rounded-full bg-white px-3 py-1.5
              text-[10px] text-[#17191C]/60
              max-sm:px-2 max-sm:py-1
              max-sm:text-[8px]
            "
          >
            Example only
          </span>
        </div>

        <div
          className="
            mt-5 flex items-end justify-between gap-2
            max-sm:mt-3
          "
        >
          <div>
            <p
              className="
                text-[12px] text-[#17191C]/55
                max-sm:text-[9px]
              "
            >
              Your daily admin
            </p>

            <h2
              className="
                mt-1 text-[27px] font-semibold
                tracking-[-.06em]
                max-sm:text-[19px]
              "
            >
              One clear queue.
            </h2>
          </div>

          <span
            className="
              flex h-11 w-11 items-center justify-center
              rounded-full bg-[#B12025] text-white
              max-sm:h-8 max-sm:w-8
            "
          >
            <ClipboardCheck
              size={22}
              className="max-sm:h-[16px] max-sm:w-[16px]"
            />
          </span>
        </div>

        <div className="mt-5 space-y-2 max-sm:mt-3 max-sm:space-y-1.5">
          {sampleTasks.map((t, i) => (
            <div
              key={t.id}
              className="
                flex items-center gap-3
                rounded-[12px]
                border border-[#17191C]/[.06]
                bg-white px-4 py-3
                max-sm:gap-2
                max-sm:rounded-[9px]
                max-sm:px-3
                max-sm:py-2
              "
            >
              <span
                className="
                  flex h-8 w-8 shrink-0 items-center
                  justify-center rounded-full
                  bg-[#FFF1F1] text-[11px]
                  font-bold text-[#B12025]
                  max-sm:h-6 max-sm:w-6
                  max-sm:text-[9px]
                "
              >
                0{i + 1}
              </span>

              <span className="min-w-0 flex-1">
                <span
                  className="
                    block truncate text-[12px] font-semibold
                    max-sm:text-[10px]
                  "
                >
                  {t.name}
                </span>

                <span
                  className="
                    block text-[10px] text-[#17191C]/50
                    max-sm:text-[8px]
                  "
                >
                  {t.id}
                </span>
              </span>

              <span
                className={`
                  shrink-0 rounded-full px-2.5 py-1
                  text-[9px] font-semibold
                  max-sm:px-2 max-sm:py-1 max-sm:text-[8px]
                  ${
                    i === 2
                      ? 'bg-[#B12025] text-white'
                      : 'bg-[#FFF1F1] text-[#B12025]'
                  }
                `}
              >
                {i === 0
                  ? 'In progress'
                  : i === 1
                    ? 'Received'
                    : 'QA check'}
              </span>
            </div>
          ))}
        </div>

        <div
          className="
            mt-5 flex items-center justify-between
            border-t border-[#B12025]/15 pt-4
            text-[11px] text-[#17191C]/55
            max-sm:mt-3 max-sm:pt-2
            max-sm:text-[8px]
          "
        >
          <span>Tasks tracked in your systems</span>

          <span className="flex items-center gap-1.5 font-semibold text-[#B12025]">
            <CheckCircle2
              size={15}
              className="max-sm:h-[12px] max-sm:w-[12px]"
            />
            Quality checked
          </span>
        </div>
      </div>
    </div>
  </div>
</section>


 
{/* ==============================================
    02 — PINNED GSAP SIDE SCROLL CARDS
============================================== */}

<section
  ref={horizontalRef}
  id="bo-included"
  className="
    relative scroll-mt-20 overflow-hidden
    bg-[#B12025] py-14 text-white
    max-sm:py-8
    lg:py-12
  "
>
  <div className="mx-auto max-w-[1420px] px-5 sm:px-8 lg:px-14">
    <SectionIntro
      label="01 / What the service includes"
      title="Every task, accounted for"
      light
      description="Eight parts of your back office, handled to the steps and turnaround times you approve."
    />

    <p
      className="
        mt-5 flex items-center gap-2
        text-[11px] font-semibold uppercase
        tracking-[.12em] text-white/70
        max-sm:mt-3 max-sm:text-[9px]
      "
    >
      <ArrowRight
        size={15}
        className="max-sm:h-[12px] max-sm:w-[12px]"
      />

      <span className="hidden lg:inline">
        Scroll down to move the cards sideways
      </span>

      <span className="lg:hidden">
        Swipe to explore all eight services
      </span>
    </p>
  </div>

  {/* HORIZONTAL CARD RAIL */}

  <div
    className="
      mt-6 snap-x snap-mandatory
      overflow-x-auto overscroll-x-contain
      max-sm:mt-4
      [scrollbar-width:none]
      [&::-webkit-scrollbar]:hidden
      lg:snap-none lg:overflow-visible
    "
    onScroll={(e) => {
      if (window.innerWidth >= 1024) return;

      const el = e.currentTarget;
      const max = el.scrollWidth - el.clientWidth;

      if (max > 0) {
        setActiveCard(
          Math.min(
            features.length - 1,
            Math.round(
              (el.scrollLeft / max) *
                (features.length - 1)
            )
          )
        );
      }
    }}
  >
    <div
      ref={trackRef}
      className="
        flex w-max gap-4 px-5
        max-sm:gap-3
        sm:gap-5 sm:px-8
        lg:gap-6 lg:px-14
      "
    >
      {features.map((f) => (
        <article
          key={f.n}
          className="
            group flex min-h-[345px]
            w-[min(86vw,430px)] shrink-0
            snap-center flex-col justify-between
            rounded-[23px] bg-white p-6
            text-[#17191C]
            shadow-[0_18px_50px_rgba(0,0,0,.07)]
            transition-transform duration-300
            hover:-translate-y-1

            max-sm:min-h-[235px]
            max-sm:w-[74vw]
            max-sm:max-w-[265px]
            max-sm:rounded-[18px]
            max-sm:p-4

            sm:w-[430px] sm:p-7
            lg:min-h-[385px] lg:w-[460px]
          "
        >
          <div>
            <div className="flex items-start justify-between gap-4">
              <span
                className="
                  font-mono text-[12px] font-semibold
                  tracking-[.12em] text-[#B12025]
                  max-sm:text-[10px]
                "
              >
                {f.n} / 08
              </span>

              <span
                className="
                  flex h-14 w-14 items-center justify-center
                  rounded-full bg-[#FFF0F0] text-[#B12025]
                  max-sm:h-9 max-sm:w-9
                "
              >
                <f.Icon
                  size={25}
                  strokeWidth={1.7}
                  className="max-sm:h-[17px] max-sm:w-[17px]"
                />
              </span>
            </div>

            <p
              className="
                mt-5 text-[10px] font-bold
                tracking-[.19em] text-[#B12025]
                max-sm:mt-3 max-sm:text-[8px]
              "
            >
              {f.tag}
            </p>

            <h3
              className="
                mt-2
                text-[clamp(1.75rem,2.2vw,2.5rem)]
                font-semibold leading-[1.1]
                tracking-[-.055em]
                max-sm:mt-1
                max-sm:text-[18px]
                max-sm:leading-[1.15]
              "
            >
              {f.title}
            </h3>

            <p
              className="
                mt-4 text-[13px] leading-[1.8]
                text-[#17191C]/65
                max-sm:mt-2
                max-sm:text-[9px]
                max-sm:leading-[1.5]
              "
            >
              {f.text}
            </p>
          </div>

          <ul
            className="
              mt-5 space-y-2 border-t
              border-[#17191C]/10 pt-4
              max-sm:mt-3
              max-sm:space-y-1.5
              max-sm:pt-3
            "
          >
            {f.details.map((d) => (
              <li
                key={d}
                className="
                  flex items-center gap-2
                  text-[11px] text-[#17191C]/65
                  max-sm:gap-1.5
                  max-sm:text-[9px]
                "
              >
                <Check
                  size={14}
                  className="
                    shrink-0 text-[#B12025]
                    max-sm:h-[11px]
                    max-sm:w-[11px]
                  "
                />
                {d}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  </div>

  {/* SCROLL PROGRESS */}

  <div
    className="
      mx-auto mt-6 max-w-[1420px]
      px-5 max-sm:mt-4
      sm:px-8 lg:px-14
    "
  >
    <div className="h-[3px] overflow-hidden rounded-full bg-white/25">
      <div
        className="h-full bg-white transition-[width] duration-150"
        style={{
          width: `${
            ((activeCard + 1) / features.length) * 100
          }%`,
        }}
      />
    </div>

    <p
      className="
        mt-2 font-mono text-[10px] text-white/70
        max-sm:text-[9px]
      "
    >
      {String(activeCard + 1).padStart(2, '0')}{' '}
      / 08 — {features[activeCard].title}
    </p>
  </div>
</section>


  
{/* ==============================================
    03 — INTERACTIVE ADMIN TASK BOARD
============================================== */}

<section
  id="bo-workflow"
  className="
    relative overflow-hidden bg-[#F8F7F7]
    px-5 py-16
    max-sm:py-8
    sm:px-8
    lg:px-14 lg:py-20
  "
>
  {/* DECORATIVE CIRCLE */}

  <div
    data-bo-parallax
    aria-hidden="true"
    className="
      pointer-events-none absolute
      -right-28 top-8 h-[390px] w-[390px]
      rounded-full border border-[#B12025]/10
      max-sm:hidden
    "
  />

  <div
    className="
      relative mx-auto grid max-w-[1420px]
      items-start gap-8
      max-sm:gap-5
      lg:grid-cols-[.86fr_1.14fr]
      lg:gap-14
    "
  >
    {/* LEFT — INTRO AND TASK SELECTION */}

    <div className="lg:sticky lg:top-[110px]">
      <SectionIntro
        label="02 / A clear handover"
        title="Follow every task from start to finish"
        description="Choose a sample task and move it through the workflow. Real tasks are tracked in your own systems; this is just an interactive preview."
      />

      {/* TASK SELECTOR */}

      <div
        className="
          mt-7 space-y-2 border-t
          border-[#B12025]/20
          max-sm:mt-4
          max-sm:space-y-0
        "
      >
        {sampleTasks.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setSelectedTask(t.id)}
            aria-pressed={selectedTask === t.id}
            className={`
              flex w-full items-center
              justify-between gap-3
              border-b border-[#B12025]/15
              px-1 py-4 text-left transition
              max-sm:py-2.5
              ${
                selectedTask === t.id
                  ? 'text-[#B12025]'
                  : 'text-[#17191C]/65 hover:text-[#B12025]'
              }
            `}
          >
            <span
              className="
                text-[13px] font-semibold
                max-sm:text-[11px]
              "
            >
              {t.name}
            </span>

            <ArrowRight
              size={16}
              className="
                shrink-0
                max-sm:h-[13px]
                max-sm:w-[13px]
              "
            />
          </button>
        ))}
      </div>
    </div>

    {/* RIGHT — SAMPLE TASK TRACKER */}

    <div
      className="
        rounded-[24px] border border-[#B12025]/15
        bg-white p-5
        shadow-[0_15px_55px_rgba(80,16,24,.05)]
        max-sm:rounded-[18px]
        max-sm:p-4
        sm:p-8
      "
    >
      {/* TRACKER HEADER */}

      <div
        className="
          flex flex-wrap justify-between gap-3
          border-b border-[#B12025]/15 pb-4
          max-sm:gap-2 max-sm:pb-3
        "
      >
        <span
          className="
            font-mono text-[11px] text-[#17191C]/55
            max-sm:text-[9px]
          "
        >
          {selectedTask} / EXAMPLE WORKFLOW
        </span>

        <span
          className="
            rounded-full bg-[#FFF1F1]
            px-3 py-1.5 text-[10px]
            font-semibold text-[#B12025]
            max-sm:px-2 max-sm:py-1
            max-sm:text-[8px]
          "
        >
          Not live data
        </span>
      </div>

      {/* TASK TITLE */}

      <h3
        className="
          mt-6
          text-[clamp(1.7rem,2.7vw,2.7rem)]
          font-semibold tracking-[-.055em]
          max-sm:mt-4
          max-sm:text-[20px]
          max-sm:leading-[1.15]
        "
      >
        {currentTask.name}
      </h3>

      <p
        className="
          mt-1 text-[12px] text-[#17191C]/60
          max-sm:text-[9px]
        "
      >
        {currentTask.area} · Your approved process
      </p>

      {/* WORKFLOW STAGES */}

      <ol
        className="
          mt-7 space-y-0
          max-sm:mt-4
        "
      >
        {stages.map((s, i) => (
          <li
            key={s}
            className="
              flex items-stretch gap-4
              max-sm:gap-3
            "
          >
            {/* STAGE INDICATOR */}

            <div className="flex flex-col items-center">
              <span
                className={`
                  flex h-9 w-9 items-center
                  justify-center rounded-full
                  border text-[12px] font-semibold
                  max-sm:h-7 max-sm:w-7
                  max-sm:text-[10px]
                  ${
                    i <= currentStage
                      ? 'border-[#B12025] bg-[#B12025] text-white'
                      : 'border-[#B12025]/20 bg-white text-[#B12025]/40'
                  }
                `}
              >
                {i < currentStage ? (
                  <Check
                    size={16}
                    className="max-sm:h-[12px] max-sm:w-[12px]"
                  />
                ) : (
                  i + 1
                )}
              </span>

              {/* CONNECTING LINE */}

              {i < stages.length - 1 && (
                <span
                  className={`
                    my-1 h-8 w-[2px]
                    max-sm:h-5
                    ${
                      i < currentStage
                        ? 'bg-[#B12025]'
                        : 'bg-[#B12025]/15'
                    }
                  `}
                />
              )}
            </div>

            {/* STAGE TEXT */}

            <div className="pt-2 max-sm:pt-1">
              <p
                className={`
                  text-[13px] font-semibold
                  max-sm:text-[11px]
                  ${
                    i <= currentStage
                      ? 'text-[#17191C]'
                      : 'text-[#17191C]/40'
                  }
                `}
              >
                {s}
              </p>

              {i === currentStage && (
                <span
                  className="
                    mt-1 block text-[11px]
                    text-[#B12025]
                    max-sm:mt-0.5
                    max-sm:text-[9px]
                  "
                >
                  Current stage
                </span>
              )}
            </div>
          </li>
        ))}
      </ol>

      {/* TRACKER ACTION BUTTONS */}

      <div
        className="
          mt-5 flex flex-wrap gap-2
          border-t border-[#B12025]/15 pt-5
          max-sm:mt-3
          max-sm:flex-nowrap
          max-sm:pt-3
        "
      >
        {/* NEXT STAGE */}

        <button
          type="button"
          onClick={advanceTask}
          disabled={currentStage === 3}
          className="
            inline-flex min-h-[43px]
            items-center gap-2 rounded-full
            bg-[#B12025] px-5 text-[12px]
            font-semibold text-white
            disabled:cursor-not-allowed
            disabled:opacity-45

            max-sm:min-h-[36px]
            max-sm:min-w-0
            max-sm:flex-1
            max-sm:justify-center
            max-sm:gap-1
            max-sm:px-2
            max-sm:text-[9px]
          "
        >
          {currentStage === 3
            ? 'Completed'
            : 'Move to next stage'}

          <ArrowRight
            size={15}
            className="
              shrink-0
              max-sm:h-[12px]
              max-sm:w-[12px]
            "
          />
        </button>

        {/* RESET TASK */}

        <button
          type="button"
          onClick={() =>
            setTaskStages((prev) => ({
              ...prev,
              [selectedTask]: 0,
            }))
          }
          className="
            inline-flex min-h-[43px]
            items-center gap-2 rounded-full
            border border-[#B12025]/30
            px-5 text-[12px] font-semibold
            text-[#B12025]

            max-sm:min-h-[36px]
            max-sm:justify-center
            max-sm:gap-1
            max-sm:px-3
            max-sm:text-[9px]
          "
        >
          <RotateCcw
            size={14}
            className="max-sm:h-[12px] max-sm:w-[12px]"
          />
          Reset task
        </button>
      </div>
    </div>
  </div>
</section>


 
{/* ==============================================
    04 — REPORT METRICS
============================================== */}

<section
  id="bo-metrics"
  className="
    bg-white px-5 py-16
    max-sm:py-8
    sm:px-8
    lg:px-14 lg:py-20
  "
>
  <div className="mx-auto max-w-[1420px]">
    {/* SECTION INTRO */}

    <SectionIntro
      label="03 / Reporting"
      title="The numbers you will see"
      description="Back office work is measured on speed and accuracy. Your monthly report shows both, along with any work still waiting."
    />

    {/* MOBILE HORIZONTAL METRICS */}

    <div
  className="
    mt-8 grid gap-3
    max-sm:-mx-5
    max-sm:mt-5
    max-sm:flex
    max-sm:snap-x
    max-sm:snap-mandatory
    max-sm:scroll-px-5
    max-sm:overflow-x-auto
    max-sm:overscroll-x-contain
    max-sm:touch-pan-x
    max-sm:px-5
    max-sm:pb-2
    max-sm:[scrollbar-width:none]
    max-sm:[&::-webkit-scrollbar]:hidden
    sm:grid-cols-2
    lg:grid-cols-4
  "
>
      {metrics.map((m, i) => (
        <article
          key={m.title}
          data-bo-fade
          className={`
            group rounded-[19px]
            border border-[#E6E7E9]
            bg-[#FBFBFB] p-5
            transition hover:-translate-y-1
            hover:border-[#B12025]/40

            max-sm:min-h-[155px]
            max-sm:w-[70vw]
            max-sm:max-w-[225px]
            max-sm:shrink-0
            max-sm:snap-start
max-sm:first:ml-[6px]
max-sm:last:mr-[6px]
            max-sm:rounded-[16px]
            max-sm:p-4

            ${i === 4 ? 'lg:col-span-4' : ''}
          `}
        >
          {/* CARD NUMBER AND ICON */}

          <div className="flex items-center justify-between">
            <span
              className="
                font-mono text-[11px] text-[#B12025]
                max-sm:text-[9px]
              "
            >
              0{i + 1}
            </span>

            <m.Icon
              size={22}
              className="
                text-[#B12025]
                max-sm:h-[17px]
                max-sm:w-[17px]
              "
            />
          </div>

          {/* CARD TITLE */}

          <h3
            className="
              mt-5 text-[20px] font-semibold
              tracking-[-.04em]
              max-sm:mt-3
              max-sm:text-[16px]
              max-sm:leading-[1.2]
            "
          >
            {m.title}
          </h3>

          {/* CARD DESCRIPTION */}

          <p
            className="
              mt-2 text-[12px] leading-6
              text-[#17191C]/65
              max-sm:mt-2
              max-sm:text-[9px]
              max-sm:leading-[1.5]
            "
          >
            {m.description}
          </p>

          {/* CARD NOTE */}

          <p
            className="
              mt-4 text-[11px] font-semibold
              text-[#B12025]
              max-sm:mt-3
              max-sm:text-[9px]
              max-sm:leading-[1.4]
            "
          >
            {m.note}
          </p>
        </article>
      ))}
    </div>

    {/* ==========================================
        THREE STATISTICS — ONE ROW ON MOBILE
    ========================================== */}

    <div
      className="
        mt-8 grid grid-cols-2 gap-6
        border-t border-[#B12025]/15 pt-7
        max-sm:mt-5
        max-sm:grid-cols-3
        max-sm:gap-2
        max-sm:pt-5
        sm:grid-cols-3
      "
    >
      {/* CLIENT RETENTION */}

      <div className="min-w-0">
        <p
          className="
            text-[clamp(2.25rem,4vw,4rem)]
            font-semibold tracking-[-.07em]
            text-[#B12025]
            max-sm:text-[24px]
            max-sm:leading-none
          "
        >
          <span data-bo-stat="85">85</span>%
        </p>

        <p
          className="
            text-[12px] text-[#17191C]/60
            max-sm:mt-2
            max-sm:text-[9px]
            max-sm:leading-[1.3]
          "
        >
          client retention rate
        </p>
      </div>

      {/* ACCURACY */}

      <div className="min-w-0">
        <p
          className="
            text-[clamp(2.25rem,4vw,4rem)]
            font-semibold tracking-[-.07em]
            text-[#B12025]
            max-sm:text-[24px]
            max-sm:leading-none
          "
        >
          <span data-bo-stat="98">98</span>%
        </p>

        <p
          className="
            text-[12px] text-[#17191C]/60
            max-sm:mt-2
            max-sm:text-[9px]
            max-sm:leading-[1.3]
          "
        >
          accuracy rate
        </p>
      </div>

      {/* HIRING CHECKS */}

      <div className="min-w-0">
        <p
          className="
            text-[clamp(2rem,3.8vw,3.8rem)]
            font-semibold tracking-[-.07em]
            text-[#B12025]
            max-sm:whitespace-nowrap
            max-sm:text-[24px]
            max-sm:leading-none
          "
        >
          <span data-bo-stat="15">15</span>–
          <span data-bo-stat="20">20</span>%
        </p>

        <Link
          href="/how-we-hire"
          className="
            inline-flex items-center gap-1
            text-[12px] text-[#17191C]/65
            hover:text-[#B12025]
            max-sm:mt-2
            max-sm:gap-0.5
            max-sm:text-[8px]
            max-sm:leading-[1.3]
          "
        >
          <span>
            of applicants pass the hiring checks
          </span>

          <ArrowUpRight
            size={14}
            className="
              shrink-0
              max-sm:h-[10px]
              max-sm:w-[10px]
            "
          />
        </Link>
      </div>
    </div>
  </div>
</section>



{/* ==============================================
    05 — TESTIMONIAL
    SCROLL WORD REVEAL
============================================== */}

<section
  id="bo-quote"
  className="
    relative overflow-hidden
    bg-[#B12025]
    px-5 py-20 text-white
    max-sm:py-9
    sm:px-8
    lg:px-14 lg:py-24
  "
>
  {/* DECORATIVE QUOTE */}

  <div
    data-bo-parallax
    aria-hidden="true"
    className="
      pointer-events-none absolute
      -right-4 -top-28
      text-[310px] font-bold leading-none
      text-white/[.06]
      max-sm:-right-2
      max-sm:-top-10
      max-sm:text-[150px]
    "
  >
    “
  </div>

  {/* TESTIMONIAL CONTENT */}

  <div className="relative mx-auto max-w-[1130px]">
    {/* LABEL */}

    <p
      className="
        text-[11px] font-bold uppercase
        tracking-[.2em] text-white/70
        max-sm:text-[8px]
        max-sm:tracking-[.14em]
      "
    >
      Solar installer / Client experience
    </p>

    {/* GSAP SCROLL WORD REVEAL */}

    <blockquote
      className="
        mt-5
        text-[clamp(2rem,4vw,4.6rem)]
        font-semibold leading-[1.24]
        tracking-[-.055em]
        max-sm:mt-4
        max-sm:text-[22px]
        max-sm:leading-[1.18]
        max-sm:tracking-[-.04em]
      "
    >
      {(
        '“Order forms and supplier paperwork used to be done by our engineers after site visits. Now the Colombo team handles them, and they can book more installations.”'
      )
        .split(' ')
        .map((w, i) => (
          <span
            key={`${i}-${w}`}
            className="inline-block overflow-hidden align-bottom"
          >
            <span
              data-bo-quote-word
              className="inline-block"
            >
              {w}
            </span>
            {'\u00a0'}
          </span>
        ))}
    </blockquote>

    {/* CLIENT LABEL */}

    <p
      className="
        mt-6 text-[11px] font-semibold
        uppercase tracking-[.2em] text-white/75
        max-sm:mt-4
        max-sm:text-[8px]
        max-sm:tracking-[.14em]
      "
    >
      Solar installer
    </p>
  </div>
</section>


 
{/* ==============================================
    06 — FAQ
============================================== */}

<section
  id="bo-faq"
  className="
    bg-[#F6F6F7]
    px-5 py-16
    max-sm:py-8
    sm:px-8
    lg:px-14 lg:py-20
  "
>
  <div
    className="
      mx-auto grid max-w-[1420px]
      items-start gap-8
      max-sm:gap-5
      lg:grid-cols-[.82fr_1.18fr]
      lg:gap-14
    "
  >
    {/* FAQ SECTION HEADING */}

    <div className="lg:sticky lg:top-[110px]">
      <SectionIntro
        label="04 / Common questions"
        title="Questions about back office support"
      />
    </div>

    {/* FAQ ACCORDION */}

    <div className="border-t border-[#17191C]/15">
      {faqs.map((f, i) => (
        <div
          key={f.q}
          className="border-b border-[#17191C]/15"
        >
          {/* QUESTION */}

          <h3>
            <button
              type="button"
              onClick={() =>
                setOpenFaq((v) =>
                  v === i ? null : i
                )
              }
              aria-expanded={openFaq === i}
              aria-controls={`bo-faq-answer-${i}`}
              className="
                flex w-full items-center
                justify-between gap-4
                py-5 text-left
                text-[15px] font-semibold
                text-[#17191C]
                focus-visible:outline-2
                focus-visible:outline-[#B12025]

                max-sm:gap-3
                max-sm:py-3
                max-sm:text-[11px]
                max-sm:leading-[1.4]

                sm:text-[17px]
              "
            >
              <span className="flex-1">
                {f.q}
              </span>

              <ChevronDown
                size={19}
                className={`
                  shrink-0 text-[#B12025]
                  transition-transform duration-300
                  max-sm:h-[15px]
                  max-sm:w-[15px]
                  ${
                    openFaq === i
                      ? 'rotate-180'
                      : ''
                  }
                `}
              />
            </button>
          </h3>

          {/* ANSWER */}

          <div
            id={`bo-faq-answer-${i}`}
            className={`
              grid
              transition-[grid-template-rows,opacity]
              duration-300
              ${
                openFaq === i
                  ? 'grid-rows-[1fr] opacity-100'
                  : 'grid-rows-[0fr] opacity-0'
              }
            `}
          >
            <div className="overflow-hidden">
              <p
                className="
                  pb-5
                  text-[13px]
                  leading-7
                  text-[#17191C]/70

                  max-sm:pb-3
                  max-sm:text-[10px]
                  max-sm:leading-[1.55]
                "
              >
                {f.a}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>



{/* ==============================================
    07 — OTHER SERVICES
============================================== */}
<section
  id="bo-related"
  className="
    bg-white
    px-5 py-14
    max-sm:hidden
    sm:px-8
    lg:px-14 lg:py-16
  "
>
  <div className="mx-auto max-w-[1420px]">
    {/* SECTION HEADING */}

    <div
      className="
        flex flex-wrap items-end
        justify-between gap-4
        max-sm:gap-3
      "
    >
      <ScrollHeading className="max-w-[900px]">
        Other BPO and back office services
      </ScrollHeading>

      {/* SEE ALL SERVICES */}

      <Link
        href={BASE}
        className="
          inline-flex items-center gap-2
          text-[12px] font-semibold
          text-[#B12025]
          hover:underline

          max-sm:gap-1
          max-sm:text-[10px]
        "
      >
        See all services

        <ArrowUpRight
          size={16}
          className="
            max-sm:h-[13px]
            max-sm:w-[13px]
          "
        />
      </Link>
    </div>

    {/* RELATED SERVICE LINKS */}

    <div
      className="
        mt-6 grid gap-x-12
        max-sm:mt-4
        md:grid-cols-2
      "
    >
      {related.map(([label, slug]) => (
        <Link
          key={slug}
          href={`${BASE}/${slug}`}
          className="
            group flex items-center
            justify-between gap-4
            border-b border-[#B12025]/20
            py-4 text-[14px]
            font-semibold text-[#17191C]
            transition-all
            hover:pl-2
            hover:text-[#B12025]

            max-sm:gap-2
            max-sm:py-3
            max-sm:text-[11px]
            max-sm:leading-[1.4]
          "
        >
          <span>{label}</span>

          <ArrowRight
            size={17}
            className="
              shrink-0 text-[#B12025]
              transition-transform
              group-hover:translate-x-1.5

              max-sm:h-[14px]
              max-sm:w-[14px]
            "
          />
        </Link>
      ))}
    </div>
  </div>
</section>


{/* ==============================================
    08 — HOW YOUR TEAM IS SET UP
============================================== */}

<section
  id="bo-setup"
  className="
    bg-[#FFF5F5]
    px-5 py-16
    max-sm:py-8
    sm:px-8
    lg:px-14 lg:py-20
  "
>
  <div className="mx-auto max-w-[1420px]">
    {/* SECTION INTRO */}

    <SectionIntro
      label="05 / The FirstNotch process"
      title="How your back office team is set up"
      description="The biggest risk with outsourced admin is mistakes that reach your systems. These steps are there to stop that."
    />

    {/* PROCESS CONTAINER */}

    <div
      className="
        relative mt-9
        max-sm:mt-5
      "
    >
      {/* DESKTOP TIMELINE BACKGROUND */}

      <div
        aria-hidden="true"
        className="
          absolute inset-x-0 top-0
          hidden h-[2px]
          bg-[#B12025]/20
          lg:block
        "
      />

      {/* GSAP PROGRESS LINE */}

      <div
        data-bo-process-line
        aria-hidden="true"
        className="
          absolute inset-x-0 top-0
          hidden h-[2px]
          origin-left bg-[#B12025]
          lg:block
        "
      />

      {/* ==========================================
          PROCESS CARDS

          MOBILE: HORIZONTAL SWIPE
          TABLET: ORIGINAL 2-COLUMN GRID
          DESKTOP: ORIGINAL 4-COLUMN GRID
      ========================================== */}

      <ol
  className="
    grid gap-7

    max-sm:-mx-5
    max-sm:flex
    max-sm:snap-x
    max-sm:snap-mandatory
    max-sm:scroll-px-5
    max-sm:gap-3
    max-sm:overflow-x-auto
    max-sm:overscroll-x-contain
    max-sm:touch-pan-x
    max-sm:px-5
    max-sm:pb-2
    max-sm:[scrollbar-width:none]
    max-sm:[&::-webkit-scrollbar]:hidden

    sm:grid-cols-2
    lg:grid-cols-4
  "
>
        {process.map((s) => (
          <li
            key={s.n}
            className="
              border-l border-[#B12025]/30
              pl-4

             max-sm:min-h-[190px]
max-sm:w-[70vw]
max-sm:max-w-[225px]
max-sm:shrink-0
max-sm:snap-start
max-sm:first:ml-[6px]
max-sm:last:mr-[6px]
max-sm:rounded-[16px]
max-sm:border
max-sm:border-[#B12025]/20
max-sm:bg-white
max-sm:p-4
              lg:border-l-0
              lg:pl-0
              lg:pt-6
            "
          >
            {/* PROCESS NUMBER AND ICON */}

            <div
              className="
                flex items-center gap-3
                text-[#B12025]
                max-sm:gap-2
              "
            >
              <s.Icon
                size={23}
                className="
                  max-sm:h-[17px]
                  max-sm:w-[17px]
                "
              />

              <span
                className="
                  font-mono
                  text-[11px]
                  font-semibold
                  max-sm:text-[9px]
                "
              >
                {s.n}
              </span>
            </div>

            {/* PROCESS HEADING */}

            <h3
              className="
                mt-3
                text-[19px]
                font-semibold
                tracking-[-.04em]

                max-sm:mt-3
                max-sm:text-[15px]
                max-sm:leading-[1.2]
              "
            >
              {s.title}
            </h3>

            {/* PROCESS DESCRIPTION */}

            <p
              className="
                mt-3
                text-[12px]
                leading-[1.85]
                text-[#17191C]/70

                max-sm:mt-2
                max-sm:text-[9px]
                max-sm:leading-[1.5]
              "
            >
              {s.text}
            </p>

            {/* HIRING LINK — STEP 02 */}

            {s.n === '02' && (
              <Link
                href="/how-we-hire"
                className="
                  mt-3
                  inline-flex items-center
                  gap-1
                  text-[12px]
                  font-semibold
                  text-[#B12025]

                  max-sm:mt-2
                  max-sm:text-[9px]
                "
              >
                See how we hire

                <ArrowUpRight
                  size={13}
                  className="
                    max-sm:h-[11px]
                    max-sm:w-[11px]
                  "
                />
              </Link>
            )}
          </li>
        ))}
      </ol>
    </div>

    {/* ==========================================
        BOTTOM DISCOVERY CTA

        MOBILE: COMPLETELY HIDDEN
        TABLET AND DESKTOP: ORIGINAL DESIGN
    ========================================== */}

    <div
      className="
        mt-9
        flex flex-wrap items-center
        justify-between gap-4
        border-t border-[#B12025]/15
        pt-6
        max-sm:hidden
      "
    >
      <p
        className="
          text-[13px]
          text-[#17191C]/70
        "
      >
        Need a dependable team for your daily admin?
      </p>

      <a
        href="#contact"
        className="
          inline-flex min-h-[45px]
          items-center gap-2
          rounded-full
          bg-[#B12025]
          px-6
          text-[12px]
          font-semibold
          text-white
        "
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
