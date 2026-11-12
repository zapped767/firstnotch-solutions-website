
'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CalendarCheck2,
  Check,
  CheckCheck,
  ChevronDown,
  ClipboardCheck,
  ContactRound,
  Database,
  FileCheck2,
  Fingerprint,
  MailCheck,
  MessageCircleMore,
  Search,
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ROOT = '/services/bpo-back-office-outsourcing';

// ======================================================
// SERVICE CONTENT — ALL EIGHT FEATURES
// ======================================================

const included = [
  {
    number: '01',
    title: 'Your ideal customer profile',
    label: 'DEFINE',
    Icon: Target,
    description:
      'Industry, company size, location and job titles are agreed with you before research starts.',
    points: [
      'Industries and company sizes',
      'Locations and decision makers',
      'Your approved criteria',
    ],
  },
  {
    number: '02',
    title: 'Prospect research',
    label: 'RESEARCH',
    Icon: Search,
    description:
      'Researchers find matching businesses and decision makers using LinkedIn, company websites and business databases.',
    points: [
      'Matching businesses',
      'Relevant decision makers',
      'Sources recorded',
    ],
  },
  {
    number: '03',
    title: 'Verified contact details',
    label: 'VERIFY',
    Icon: Fingerprint,
    description:
      'Emails and phone numbers are checked before they are added to your list. Emails are tested to lower message bounces.',
    points: [
      'Email details checked',
      'Phone details checked',
      'Ready for the approved list',
    ],
  },
  {
    number: '04',
    title: 'Outreach on your behalf',
    label: 'CONNECT',
    Icon: MessageCircleMore,
    description:
      'Emails and LinkedIn messages go out using wording you approve. Calls can be added if you want them.',
    points: [
      'Your approved messages',
      'Email and LinkedIn',
      'Optional calls',
    ],
  },
  {
    number: '05',
    title: 'Follow-up until there is an answer',
    label: 'FOLLOW UP',
    Icon: TrendingUp,
    description:
      'Each lead is followed up to an agreed number of times, until they reply or ask not to be contacted.',
    points: [
      'Agreed follow-up limit',
      'Replies monitored',
      'Opt-outs respected',
    ],
  },
  {
    number: '06',
    title: 'Meetings booked',
    label: 'BOOK',
    Icon: CalendarCheck2,
    description:
      'Leads who meet the criteria you agreed are booked into your sales team’s calendar.',
    points: [
      'Criteria checked',
      'Calendar invitation',
      'Notes passed to sales',
    ],
  },
  {
    number: '07',
    title: 'Records in your CRM',
    label: 'LOG',
    Icon: Database,
    description:
      'Every contact, message and reply is logged in your CRM, so nothing is lost when a lead is passed on.',
    points: [
      'Contact history',
      'Reply history',
      'Handover notes',
    ],
  },
  {
    number: '08',
    title: 'Data protection rules followed',
    label: 'PROTECT',
    Icon: ShieldCheck,
    description:
      'Opt-out requests are honoured, and outreach follows the data rules in each target country, such as GDPR in Europe.',
    points: [
      'Country rules considered',
      'Opt-out requests honoured',
      'Controlled customer data',
    ],
  },
] as const;

// ======================================================
// MONTHLY REPORT METRICS
// ======================================================

const metrics = [
  {
    title: 'Contacts added',
    description:
      'New verified contacts that match your profile.',
    caption: 'Reported weekly.',
    Icon: ContactRound,
  },
  {
    title: 'Reply rate',
    description:
      'The share of contacts who replied to outreach.',
    caption: 'Shown by channel and message.',
    Icon: MessageCircleMore,
  },
  {
    title: 'Meetings booked',
    description:
      'Calls or demos booked with your sales team.',
    caption: 'Target agreed at the start.',
    Icon: CalendarCheck2,
  },
  {
    title: 'Lead acceptance',
    description:
      'The share of passed leads your sales team agreed were a good fit.',
    caption: 'Used to adjust the profile.',
    Icon: CheckCheck,
  },
  {
    title: 'Bounce rate',
    description:
      'Emails that could not be delivered.',
    caption: 'Kept low by checking addresses first.',
    Icon: MailCheck,
  },
] as const;

// ======================================================
// QUESTIONS FROM REFERENCE
// ======================================================

const faqs = [
  {
    q: 'Is this the same as outbound call support?',
    a:
      'No. Outbound call support calls people who already know your business. Lead generation finds new businesses and people who match your ideal customer profile, then reaches out.',
  },
  {
    q: 'Who writes the outreach messages?',
    a:
      'The team drafts them from your offer and past results. Nothing is sent until you approve it.',
  },
  {
    q: 'Do you guarantee a number of meetings?',
    a:
      'No. Results depend on your market and your offer. Targets for contacts and replies are agreed at the start, and progress is reported each week.',
  },
  {
    q: 'Can the team work in our CRM?',
    a:
      'Yes. HubSpot, Salesforce, Pipedrive and Zoho are the most common.',
  },
  {
    q: 'Which markets can you reach?',
    a:
      'English-speaking markets, plus Sri Lanka and India, where outreach can also be written in Sinhala, Tamil or Hindi.',
  },
  {
    q: 'How is lead generation priced?',
    a:
      'Cost depends on the number of contacts and outreach channels used. Pricing is usually monthly for the team members. A proposal follows the discovery call.',
  },
] as const;

// ======================================================
// RELATED SERVICES
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
  ['Back office operations', 'back-office-operations'],
  ['Virtual assistant services', 'virtual-assistant-services'],
] as const;

// ======================================================
// SETUP PROCESS
// ======================================================

const process = [
  {
    n: '01',
    title: 'Learning your business',
    description:
      'The team maps each process with you, step by step, and writes it down as a checklist you approve.',
    Icon: ClipboardCheck,
  },
  {
    n: '02',
    title: 'Hiring and training',
    description:
      'Team members take language tests, technical assessments and reference checks. Only 15 to 20% of job applicants pass. Each one then practises on sample work before handling yours.',
    Icon: Users,
  },
  {
    n: '03',
    title: 'Going live with quality checks',
    description:
      'Every task gets a quality score. Work starts at a lower volume with extra checks, and volume grows once accuracy is steady. Each team member has a monthly performance review with coaching.',
    Icon: FileCheck2,
  },
  {
    n: '04',
    title: 'Reporting and improving',
    description:
      'You get a monthly report on volumes, turnaround times, accuracy and the most common errors, plus a call to agree what to improve.',
    Icon: TrendingUp,
  },
] as const;

// ======================================================
// INTERACTIVE LEAD JOURNEY
// ======================================================

const journeys = [
  {
    name: 'Research',
    text:
      'Identify a business that matches your agreed customer profile.',
    chip: 'Business matched',
    icon: Search,
  },
  {
    name: 'Verify',
    text:
      'Check the contact details before adding them to your outreach list.',
    chip: 'Details checked',
    icon: Fingerprint,
  },
  {
    name: 'Outreach',
    text:
      'Send your approved message and record it in the CRM.',
    chip: 'Message logged',
    icon: MessageCircleMore,
  },
  {
    name: 'Follow-up',
    text:
      'Follow up within the limit agreed with you; respect every opt-out.',
    chip: 'Reply recorded',
    icon: MailCheck,
  },
  {
    name: 'Handover',
    text:
      'Pass an interested, qualified contact or meeting to your sales team.',
    chip: 'Sales team notified',
    icon: CalendarCheck2,
  },
] as const;

// ======================================================
// REUSABLE SCROLL HEADING
// ======================================================

function ScrollHeading({
  text,
  inverse = false,
  className = '',
}: {
  text: string;
  inverse?: boolean;
  className?: string;
}) {
  return (
    <h2
      data-lg-heading
      className={`
        max-w-[1040px]
        text-[clamp(2.1rem,4.4vw,4.8rem)]
        font-semibold
        leading-[1.1]
        tracking-[-.065em]
        max-sm:text-[25px]
        max-sm:leading-[1.08]
        max-sm:tracking-[-.05em]
       ${inverse ? 'text-white max-sm:!text-white' : 'text-[#17191C]'}
        ${className}
      `}
    >
      {text.split(' ').map((word, i) => (
        <span
          key={`${i}-${word}`}
          className="inline-block overflow-hidden align-bottom"
        >
          <span
            data-lg-word
            className="inline-block"
          >
            {word}
          </span>
          {'\u00a0'}
        </span>
      ))}
    </h2>
  );
}

// ======================================================
// REUSABLE SECTION INTRO
// ======================================================

function SectionIntro({
  number,
  title,
  detail,
  inverse = false,
}: {
  number: string;
  title: string;
  detail?: string;
  inverse?: boolean;
}) {
  return (
    <div>
      <p
        data-lg-fade
        className={`
          mb-3
          text-[11px]
          font-bold
          uppercase
          tracking-[.22em]
          max-sm:mb-2
          max-sm:text-[8px]
          max-sm:tracking-[.18em]
          ${
            inverse
              ? 'text-white/70'
              : 'text-[#B12025]'
          }
        `}
      >
        {number}
      </p>

      <ScrollHeading
        text={title}
        inverse={inverse}
      />

      {detail && (
        <p
          data-lg-fade
          className={`
            mt-4
            max-w-[760px]
            text-[14px]
            leading-[1.85]
            max-sm:mt-3
            max-sm:text-[9px]
            max-sm:leading-[1.6]
            ${
              inverse
                ? 'text-white/80'
                : 'text-[#17191C]/65'
            }
          `}
        >
          {detail}
        </p>
      )}
    </div>
  );
}

// ======================================================
// ACCESSIBLE FAQ
// ======================================================

function FaqItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#17191C]/15">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="
          flex
          w-full
          items-center
          justify-between
          gap-5
          py-5
          text-left
          text-[15px]
          font-semibold
          text-[#17191C]
          outline-offset-4
          focus-visible:outline-[#B12025]
          max-sm:gap-3
          max-sm:py-3.5
          max-sm:text-[12px]
          max-sm:leading-[1.35]
          sm:text-[17px]
        "
      >
        {question}

        <ChevronDown
          size={19}
          className={`
            shrink-0
            text-[#B12025]
            transition-transform
            duration-300
            max-sm:h-[16px]
            max-sm:w-[16px]
            ${open ? 'rotate-180' : ''}
          `}
        />
      </button>

      <div
        className={`
          grid
          transition-[grid-template-rows,opacity]
          duration-300
          ${
            open
              ? 'grid-rows-[1fr] opacity-100'
              : 'grid-rows-[0fr] opacity-0'
          }
        `}
      >
        <div className="overflow-hidden">
          <p
            className="
              max-w-[740px]
              pb-5
              text-[13px]
              leading-7
              text-[#17191C]/70
              max-sm:pb-3.5
              max-sm:text-[10px]
              max-sm:leading-[1.6]
            "
          >
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

// ======================================================
// MAIN PAGE
// ======================================================

export default function LeadGenerationPage() {
  const rootRef = useRef<HTMLDivElement>(null);

  const horizontalSectionRef =
    useRef<HTMLElement>(null);

  const railRef =
    useRef<HTMLDivElement>(null);

  const [activeJourney, setActiveJourney] =
    useState(0);

  const [activeCard, setActiveCard] =
    useState(0);

  const [activeMarket, setActiveMarket] =
    useState<'UK' | 'Australia' | 'Sri Lanka'>('UK');

  const currentJourney = journeys[activeJourney];

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
          // HERO HEADING RISE

          gsap.fromTo(
            '[data-lg-hero-rise]',
            {
              yPercent: 105,
              opacity: 0,
            },
            {
              yPercent: 0,
              opacity: 1,
              duration: 1.05,
              stagger: 0.13,
              ease: 'power4.out',
              clearProps: 'transform,opacity',
            }
          );

          // HERO CONTENT RISE

          gsap.fromTo(
            '[data-lg-hero-intro]',
            {
              y: 22,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.75,
              stagger: 0.12,
              delay: 0.25,
              ease: 'power3.out',
              clearProps: 'transform,opacity',
            }
          );

          // HERO VISUAL

          gsap.fromTo(
            '[data-lg-hero-visual]',
            {
              y: 45,
              opacity: 0,
              rotate: 3,
            },
            {
              y: 0,
              opacity: 1,
              rotate: 0,
              duration: 1.1,
              delay: 0.35,
              ease: 'power3.out',
              clearProps: 'transform,opacity',
            }
          );

         // HEADING WORD-BY-WORD SCROLL REVEAL
// Desktop / tablet only.
// Mobile headings stay static and fully visible.

if (window.innerWidth >= 640) {
  gsap.utils
    .toArray<HTMLElement>('[data-lg-heading]')
    .forEach((heading) => {
      const words =
        heading.querySelectorAll<HTMLElement>(
          '[data-lg-word]'
        );

      gsap.fromTo(
        words,
        {
          yPercent: 95,
          opacity: 0.15,
        },
        {
          yPercent: 0,
          opacity: 1,
          ease: 'none',
          stagger: 0.016,

          scrollTrigger: {
            trigger: heading,
            start: 'top 88%',
            end: 'top 52%',
            scrub: true,
          },
        }
      );
    });
} else {
  // Mobile: force every heading word visible
  gsap.set('[data-lg-heading] [data-lg-word]', {
    yPercent: 0,
    opacity: 1,
    clearProps: 'transform',
  });
}

          // EYEBROW / SUBTITLE RISE

          gsap.utils
            .toArray<HTMLElement>(
              '[data-lg-fade]'
            )
            .forEach((el) => {
              gsap.fromTo(
                el,
                {
                  y: 20,
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

          // QUOTE TEXT REVEAL

          gsap.fromTo(
            '[data-lg-quote-word]',
            {
              opacity: 0.16,
              y: 13,
            },
            {
              opacity: 1,
              y: 0,
              ease: 'none',
              stagger: 0.015,

              scrollTrigger: {
                trigger: '#lg-quote',
                start: 'top 78%',
                end: 'bottom 60%',
                scrub: 0.65,
              },
            }
          );

          // DECORATIVE PARALLAX

          gsap.utils
            .toArray<HTMLElement>(
              '[data-lg-parallax]'
            )
            .forEach((el) => {
              gsap.fromTo(
                el,
                {
                  y: -18,
                },
                {
                  y: 34,
                  ease: 'none',

                  scrollTrigger: {
                    trigger:
                      el.closest('section') || el,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1.3,
                  },
                }
              );
            });

          // COUNT-UP STATISTICS

          gsap.utils
            .toArray<HTMLElement>(
              '[data-lg-stat]'
            )
            .forEach((el) => {
              const count = { value: 0 };
              const target = Number(
                el.dataset.lgStat || 0
              );

              gsap.to(count, {
                value: target,
                duration: 1.4,
                ease: 'power2.out',

                scrollTrigger: {
                  trigger: el,
                  start: 'top 91%',
                  once: true,
                },

                onUpdate: () => {
                  el.textContent = Math.round(
                    count.value
                  ).toString();
                },
              });
            });

          // SETUP PROGRESS LINE

          gsap.fromTo(
            '[data-lg-process-line]',
            {
              scaleX: 0,
            },
            {
              scaleX: 1,
              ease: 'none',

              scrollTrigger: {
                trigger: '#lg-process',
                start: 'top 83%',
                end: 'bottom 55%',
                scrub: true,
              },
            }
          );

          // PAGE SCROLL PROGRESS

          gsap.fromTo(
            '[data-lg-scroll-progress]',
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

    // ==================================================
    // DESKTOP: PINNED HORIZONTAL SIDE SCROLL
    // MOBILE / TABLET: NATIVE SWIPE
    // ==================================================

    mm.add(
      '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
      () => {
        const section =
          horizontalSectionRef.current;

        const rail =
          railRef.current;

        if (!section || !rail) return;

        const ctx = gsap.context(() => {
          const distance = () =>
            Math.max(
              0,
              rail.scrollWidth -
                window.innerWidth +
                64
            );

          gsap.to(rail, {
            x: () => -distance(),
            ease: 'none',

            scrollTrigger: {
              trigger: section,
              start: 'top top+=72',

              end: () => `+=${distance()}`,

              pin: true,
              scrub: 1.15,
              invalidateOnRefresh: true,
              anticipatePin: 1,

              onUpdate: (self) =>
                setActiveCard(
                  Math.min(
                    included.length - 1,
                    Math.floor(
                      self.progress *
                        included.length
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

  return (
    <div
      ref={rootRef}
      className="overflow-x-clip bg-white font-sans text-[#17191C]"
    >
      {/* PAGE SCROLL PROGRESS */}

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-40 h-[3px]"
      >
        <div
          data-lg-scroll-progress
          className="h-full w-full origin-left bg-[#B12025]"
        />
      </div>

      {/* ==============================================
    01 — HERO
============================================== */}

<section
  id="lg-hero"
  className="relative overflow-hidden bg-white px-5 pb-16 pt-14 max-sm:pb-8 max-sm:pt-[85px] sm:px-8 lg:px-14 lg:pb-[84px] lg:pt-[80px]"
>
  {/* Decorative background circle */}

  <div
    data-lg-parallax
    aria-hidden="true"
    className="
      pointer-events-none
      absolute
      -right-[210px]
      -top-[180px]
      h-[680px]
      w-[680px]
      rounded-full
      border
      border-[#B12025]/10
      max-sm:hidden
    "
  />

  <div
    className="
      relative
      mx-auto
      grid
      max-w-[1420px]
      items-center
      gap-11
      max-sm:gap-0
      lg:grid-cols-[1.06fr_.94fr]
      lg:gap-14
    "
  >
    {/* ==========================================
        LEFT — HERO CONTENT
    ========================================== */}

    <div className="min-w-0">

      {/* Hero label */}

      <p
        data-lg-hero-intro
        className="
          mt-5
          text-[10px]
          font-bold
          uppercase
          tracking-[.21em]
          text-[#B12025]
          max-sm:mt-2
          max-sm:text-[8px]
          max-sm:tracking-[.18em]
        "
      >
        Lead generation services in Sri Lanka
      </p>

      {/* ========================================
          RISING HERO HEADLINE
      ======================================== */}

      <h1
        className="
          mt-5
          max-w-[790px]
          text-[clamp(2.55rem,5vw,5.7rem)]
          font-semibold
          leading-[1.06]
          tracking-[-.07em]
          text-[#B12025]
          max-sm:mt-3
          max-sm:text-[30px]
          max-sm:leading-[1.05]
          max-sm:tracking-[-.055em]
        "
      >
        {[
          'Verified contacts',
          'and booked meetings',
          'for your sales team.',
        ].map((line) => (
          <span
            key={line}
            className="
              block
              overflow-hidden
              pb-[.08em]
            "
          >
            <span
              data-lg-hero-rise
              className="block"
            >
              {line}
            </span>
          </span>
        ))}
      </h1>

      {/* ========================================
          HERO DESCRIPTION
      ======================================== */}

      <p
        data-lg-hero-intro
        className="
          mt-5
          max-w-[610px]
          text-[14px]
          leading-[1.9]
          text-[#17191C]/70
          max-sm:mt-4
          max-sm:text-[10px]
          max-sm:leading-[1.65]
        "
      >
        Sales staff often spend more time looking
        for people to contact than talking to
        them. FirstNotch researches the
        businesses and people that match your
        ideal customer, checks each contact
        detail and reaches out on your behalf.
        Interested leads are passed to your
        sales team with notes.
      </p>

      {/* ========================================
          HERO CTA BUTTONS
          MOBILE: BOTH IN ONE ROW
      ======================================== */}

      <div
        data-lg-hero-intro
        className="
          mt-6
          flex
          flex-wrap
          gap-3
          max-sm:mt-5
          max-sm:flex-nowrap
          max-sm:gap-2
        "
      >
        {/* Primary CTA */}

        <a
          href="#contact"
          className="
            inline-flex
            min-h-[48px]
            items-center
            gap-2
            rounded-full
            bg-[#B12025]
            px-6
            text-[12px]
            font-bold
            text-white
            transition
            hover:bg-[#951B20]
            max-sm:min-h-[40px]
            max-sm:min-w-0
            max-sm:flex-1
            max-sm:justify-center
            max-sm:gap-1
            max-sm:px-2
            max-sm:text-[9px]
            max-sm:whitespace-nowrap
          "
        >
          <span>
            Book a free discovery call
          </span>

          <ArrowUpRight
            size={16}
            className="
              shrink-0
              max-sm:h-[13px]
              max-sm:w-[13px]
            "
          />
        </a>

        {/* Secondary CTA */}

        <a
          href="#lg-included"
          className="
            inline-flex
            min-h-[48px]
            items-center
            gap-2
            rounded-full
            border
            border-[#B12025]/35
            px-6
            text-[12px]
            font-semibold
            text-[#B12025]
            transition
            hover:bg-[#FFF4F4]
            max-sm:min-h-[40px]
            max-sm:min-w-0
            max-sm:flex-1
            max-sm:justify-center
            max-sm:gap-1
            max-sm:px-2
            max-sm:text-[9px]
            max-sm:whitespace-nowrap
          "
        >
          <span>
            See what is included
          </span>

          <ArrowDown
            size={16}
            className="
              shrink-0
              max-sm:h-[13px]
              max-sm:w-[13px]
            "
          />
        </a>
      </div>
    </div>

    {/* ==========================================
        RIGHT — INTERACTIVE HERO PREVIEW

        MOBILE: HIDDEN COMPLETELY
        TABLET/DESKTOP: ORIGINAL UI
    ========================================== */}

    <div
      data-lg-hero-visual
      className="
        relative
        mx-auto
        w-full
        max-w-[560px]
        py-5
        max-sm:hidden
      "
    >
      {/* Decorative circle */}

      <div
        aria-hidden="true"
        className="
          absolute
          -inset-5
          rounded-full
          border
          border-dashed
          border-[#B12025]/15
        "
      />

      {/* Workspace container */}

      <div
        className="
          relative
          overflow-hidden
          rounded-[26px]
          border
          border-[#B12025]/15
          bg-[#FAF7F7]
          p-5
          shadow-[0_30px_65px_rgba(93,18,22,.08)]
          sm:p-7
        "
      >
        {/* Workspace header */}

        <div
          className="
            flex
            items-center
            justify-between
            gap-3
            border-b
            border-[#B12025]/15
            pb-4
          "
        >
          <span
            className="
              text-[11px]
              font-semibold
              tracking-[.15em]
              text-[#B12025]
            "
          >
            LEAD WORKSPACE
          </span>

          <span
            className="
              rounded-full
              bg-white
              px-3
              py-1.5
              text-[10px]
              text-[#17191C]/60
            "
          >
            Illustrative example
          </span>
        </div>

        {/* ======================================
            WORKSPACE PROCESS STEPS
        ====================================== */}

        <div
          className="
            mt-6
            flex
            items-center
            justify-between
            gap-2
          "
        >
          {[
            'RESEARCH',
            'VERIFY',
            'BOOK',
          ].map((step, i) => (
            <div
              key={step}
              className="
                flex
                min-w-0
                flex-1
                flex-col
                items-center
                gap-2
              "
            >
              <span
                className={`
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  ${
                    i === 2
                      ? 'bg-[#B12025] text-white'
                      : 'border border-[#B12025]/25 bg-white text-[#B12025]'
                  }
                `}
              >
                {i === 0 ? (
                  <Search size={18} />
                ) : i === 1 ? (
                  <Check size={19} />
                ) : (
                  <CalendarCheck2 size={19} />
                )}
              </span>

              <span
                className="
                  text-[9px]
                  font-bold
                  tracking-[.08em]
                  text-[#17191C]/65
                "
              >
                {step}
              </span>
            </div>
          ))}
        </div>

        {/* ======================================
            SAMPLE LEAD PREVIEW
        ====================================== */}

        <div
          className="
            mt-7
            rounded-[18px]
            bg-white
            p-5
          "
        >
          {/* Lead reference */}

          <div
            className="
              flex
              flex-wrap
              items-center
              justify-between
              gap-2
            "
          >
            <p
              className="
                font-mono
                text-[10px]
                text-[#17191C]/50
              "
            >
              SAMPLE LEAD / FN-0142
            </p>

            <CheckCheck
              size={18}
              className="text-[#B12025]"
            />
          </div>

          {/* Lead heading */}

          <h2
            className="
              mt-3
              text-[23px]
              font-semibold
              tracking-[-.05em]
            "
          >
            Example prospect
          </h2>

          {/* Active market */}

          <p
            className="
              mt-1
              text-[12px]
              text-[#17191C]/60
            "
          >
            Relevant decision maker · {activeMarket}
          </p>

          {/* Lead checklist */}

          <div className="mt-5 space-y-3">
            {[
              'Profile matched',
              'Contact details checked',
              'Approved message prepared',
              'Sales handover notes ready',
            ].map((line, i) => (
              <div
                key={line}
                className="
                  flex
                  items-center
                  gap-3
                  border-b
                  border-[#17191C]/10
                  pb-2.5
                  text-[12px]
                "
              >
                <span
                  className="
                    flex
                    h-6
                    w-6
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[#FFF1F1]
                    text-[#B12025]
                  "
                >
                  <Check size={13} />
                </span>

                <span className="flex-1">
                  {line}
                </span>

                <span
                  className="
                    font-mono
                    text-[10px]
                    text-[#17191C]/35
                  "
                >
                  0{i + 1}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ======================================
            MARKET PREVIEW
        ====================================== */}

        <div
          className="
            mt-5
            flex
            flex-wrap
            items-center
            justify-between
            gap-3
          "
        >
          <span
            className="
              text-[11px]
              font-semibold
              text-[#B12025]
            "
          >
            Market preview
          </span>

          {/* Market selector buttons */}

          <div className="flex gap-1.5">
            {(
              [
                'UK',
                'Australia',
                'Sri Lanka',
              ] as const
            ).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setActiveMarket(m)}
                aria-pressed={activeMarket === m}
                className={`
                  rounded-full
                  px-3
                  py-1.5
                  text-[10px]
                  font-medium
                  transition
                  ${
                    activeMarket === m
                      ? 'bg-[#B12025] text-white'
                      : 'bg-white text-[#B12025]'
                  }
                `}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative background glow */}

      <div
        data-lg-parallax
        aria-hidden="true"
        className="
          absolute
          -right-3
          top-[15%]
          hidden
          h-14
          w-14
          rounded-full
          bg-[#B12025]/10
          blur-xl
          sm:block
        "
      />
    </div>
  </div>
</section>

{/* ==============================================
    02 — GSAP PINNED HORIZONTAL CARDS
============================================== */}

<section
  ref={horizontalSectionRef}
  id="lg-included"
  className="
    relative
    scroll-mt-20
    overflow-hidden
    bg-[#B12025]
    py-16
    text-white
    max-sm:py-9
    lg:py-14
  "
>
  {/* SECTION HEADING */}

  <div className="mx-auto max-w-[1420px] px-5 sm:px-8 lg:px-14">
    <SectionIntro
      number="01 / What we do"
      title="What the lead generation service includes"
      inverse
      detail="From defining your ideal customer to handing over a qualified meeting. Scroll to explore all eight steps."
    />

    {/* WORKFLOW LABEL */}

    <div
      className="
        mt-6
        flex
        flex-wrap
        items-center
        justify-between
        gap-3
        text-[11px]
        text-white/75
        max-sm:mt-4
        max-sm:gap-2
        max-sm:text-[9px]
      "
    >
      <span>
        THE LEAD GENERATION WORKFLOW
      </span>

      {/* DESKTOP INSTRUCTION */}

      <span className="hidden lg:block">
        SCROLL DOWN TO MOVE SIDEWAYS
        <ArrowRight
          size={14}
          className="ml-1 inline"
        />
      </span>

      {/* MOBILE AND TABLET INSTRUCTION */}

      <span className="lg:hidden">
        SWIPE CARDS
        <ArrowRight
          size={14}
          className="ml-1 inline max-sm:h-[12px] max-sm:w-[12px]"
        />
      </span>
    </div>
  </div>

  {/* ==========================================
      HORIZONTAL SERVICE CARD RAIL

      DESKTOP:
      GSAP PIN + TRANSLATE X

      MOBILE / TABLET:
      NATIVE HORIZONTAL SWIPE
  ========================================== */}

  <div
    className="
      mt-7
      snap-x
      snap-mandatory
      overflow-x-auto
      overscroll-x-contain
      pb-2
      max-sm:mt-5
      lg:snap-none
      lg:overflow-visible
      [scrollbar-width:none]
      [&::-webkit-scrollbar]:hidden
    "
    onScroll={(e) => {
      // Desktop scrolling is managed by GSAP.
      if (window.innerWidth >= 1024) return;

      const element = e.currentTarget;

      const available =
        element.scrollWidth - element.clientWidth;

      const progress =
        available > 0
          ? element.scrollLeft / available
          : 0;

      setActiveCard(
        Math.min(
          included.length - 1,
          Math.round(
            progress * (included.length - 1)
          )
        )
      );
    }}
  >
    {/* GSAP RAIL REF — DO NOT REMOVE */}

    <div
      ref={railRef}
      className="
        flex
        w-max
        gap-4
        px-5
        max-sm:gap-3
        sm:gap-5
        sm:px-8
        lg:gap-6
        lg:px-14
      "
    >
      {/* ALL EIGHT SERVICE CARDS */}

      {included.map((card) => (
        <article
          key={card.number}
          className="
            group
            flex
            min-h-[340px]
            w-[min(85vw,440px)]
            shrink-0
            snap-center
            flex-col
            justify-between
            rounded-[25px]
            border
            border-white/35
            bg-white
            p-6
            text-[#17191C]
            shadow-[0_12px_40px_rgba(0,0,0,.07)]
            transition-transform
            duration-300
            hover:-translate-y-1

            max-sm:min-h-[245px]
            max-sm:w-[76vw]
            max-sm:max-w-[260px]
            max-sm:rounded-[20px]
            max-sm:p-4

            sm:w-[440px]
            sm:p-8

            lg:min-h-[380px]
            lg:w-[min(42vw,520px)]
          "
        >
          {/* ==================================
              CARD TOP CONTENT
          ================================== */}

          <div>
            {/* CARD NUMBER AND ICON */}

            <div
              className="
                flex
                items-start
                justify-between
                gap-3
              "
            >
              {/* CARD NUMBER */}

              <span
                className="
                  font-mono
                  text-[12px]
                  font-semibold
                  tracking-[.1em]
                  text-[#B12025]
                  max-sm:text-[10px]
                "
              >
                {card.number} / 08
              </span>

              {/* SERVICE ICON */}

              <span
                className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#B12025]/20
                  bg-[#FFF5F5]
                  text-[#B12025]

                  max-sm:h-9
                  max-sm:w-9
                "
              >
                <card.Icon
                  size={27}
                  strokeWidth={1.6}
                  className="
                    max-sm:h-[17px]
                    max-sm:w-[17px]
                  "
                />
              </span>
            </div>

            {/* CARD LABEL */}

            <p
              className="
                mt-5
                text-[10px]
                font-bold
                uppercase
                tracking-[.2em]
                text-[#B12025]

                max-sm:mt-3
                max-sm:text-[8px]
                max-sm:tracking-[.15em]
              "
            >
              {card.label}
            </p>

            {/* CARD HEADING */}

            <h3
              className="
                mt-2
                text-[clamp(1.65rem,2.3vw,2.4rem)]
                font-semibold
                leading-[1.13]
                tracking-[-.055em]

                max-sm:mt-1.5
                max-sm:text-[18px]
                max-sm:leading-[1.1]
                max-sm:tracking-[-.04em]
              "
            >
              {card.title}
            </h3>

            {/* CARD DESCRIPTION */}

            <p
              className="
                mt-4
                text-[13px]
                leading-[1.85]
                text-[#17191C]/65

                max-sm:mt-3
                max-sm:text-[9px]
                max-sm:leading-[1.55]
              "
            >
              {card.description}
            </p>
          </div>

          {/* ==================================
              CARD CHECKLIST
          ================================== */}

          <ul
            className="
              mt-6
              space-y-2
              border-t
              border-[#17191C]/10
              pt-5

              max-sm:mt-4
              max-sm:space-y-1.5
              max-sm:pt-3
            "
          >
            {card.points.map((point) => (
              <li
                key={point}
                className="
                  flex
                  items-center
                  gap-2
                  text-[11px]
                  text-[#17191C]/70

                  max-sm:gap-1.5
                  max-sm:text-[9px]
                  max-sm:leading-[1.35]
                "
              >
                {/* CHECK ICON */}

                <Check
                  size={14}
                  className="
                    shrink-0
                    text-[#B12025]

                    max-sm:h-[11px]
                    max-sm:w-[11px]
                  "
                />

                <span>{point}</span>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  </div>

  {/* ==========================================
      SCROLL PROGRESS INDICATOR
  ========================================== */}

  <div
    className="
      mx-auto
      mt-6
      max-w-[1420px]
      px-5
      max-sm:mt-4
      sm:px-8
      lg:px-14
    "
  >
    {/* PROGRESS TRACK */}

    <div
      className="
        h-[3px]
        overflow-hidden
        rounded-full
        bg-white/25
      "
    >
      {/* ACTIVE PROGRESS */}

      <div
        className="
          h-full
          bg-white
          transition-[width]
          duration-200
        "
        style={{
          width: `${
            ((activeCard + 1) / included.length) * 100
          }%`,
        }}
      />
    </div>

    {/* CARD NUMBER AND ACTIVE LABEL */}

    <p
      className="
        mt-2
        font-mono
        text-[10px]
        text-white/75
        max-sm:mt-2
        max-sm:text-[9px]
      "
    >
      {String(activeCard + 1).padStart(2, '0')}{' '}
      / 08 · {included[activeCard].label}
    </p>
  </div>
</section>


{/* ==============================================
    03 — INTERACTIVE LEAD JOURNEY
============================================== */}

<section
  id="lg-journey"
  className="
    relative
    overflow-hidden
    bg-[#FAF8F8]
    px-5
    py-16
    max-sm:hidden
    sm:px-8
    lg:px-14
    lg:py-20
  "
>
  {/* DECORATIVE BACKGROUND CIRCLE */}

  <div
    data-lg-parallax
    aria-hidden="true"
    className="
      pointer-events-none
      absolute
      -right-32
      top-10
      h-[420px]
      w-[420px]
      rounded-full
      border
      border-[#B12025]/10
    "
  />

  <div className="relative mx-auto max-w-[1420px]">

    {/* SECTION HEADING */}

    <SectionIntro
      number="02 / From a name to a meeting"
      title="Every contact has a clear next step"
      detail="Choose a stage to see what your FirstNotch team prepares and records. The illustration is not a live CRM."
    />

    {/* ==========================================
        INTERACTIVE JOURNEY GRID
    ========================================== */}

    <div
      className="
        mt-8
        grid
        gap-7
        lg:grid-cols-[.88fr_1.12fr]
        lg:gap-12
      "
    >
      {/* ========================================
          LEFT — JOURNEY STAGES
      ======================================== */}

      <div className="space-y-1 border-t border-[#B12025]/20">
        {journeys.map((stage, i) => (
          <button
            key={stage.name}
            type="button"
            onClick={() => setActiveJourney(i)}
            aria-pressed={i === activeJourney}
            className={`
              flex
              w-full
              items-center
              gap-4
              border-b
              border-[#B12025]/15
              px-2
              py-4
              text-left
              transition
              ${
                activeJourney === i
                  ? 'text-[#B12025]'
                  : 'text-[#17191C]/65 hover:text-[#B12025]'
              }
            `}
          >
            {/* STAGE NUMBER */}

            <span className="font-mono text-[11px]">
              0{i + 1}
            </span>

            {/* STAGE NAME */}

            <span className="flex-1 text-[17px] font-semibold">
              {stage.name}
            </span>

            {/* STAGE ICON */}

            <stage.icon size={18} />
          </button>
        ))}
      </div>

      {/* ========================================
          RIGHT — INTERACTIVE CRM HANDOVER
      ======================================== */}

      <div
        className="
          relative
          self-start
          rounded-[26px]
          border
          border-[#B12025]/15
          bg-white
          p-6
          shadow-[0_20px_70px_rgba(89,20,20,.06)]
          sm:p-8
        "
      >
        {/* CRM HEADER */}

        <div
          className="
            flex
            flex-wrap
            items-center
            justify-between
            gap-3
            border-b
            border-[#B12025]/15
            pb-4
          "
        >
          <span className="font-mono text-[11px] text-[#17191C]/55">
            EXAMPLE / CRM HANDOVER
          </span>

          {/* ACTIVE STAGE CHIP */}

          <span
            className="
              rounded-full
              bg-[#FFF1F1]
              px-3
              py-2
              text-[10px]
              font-semibold
              text-[#B12025]
            "
          >
            {currentJourney.chip}
          </span>
        </div>

        {/* ======================================
            SELECTED STAGE DETAILS
        ====================================== */}

        <div
          key={currentJourney.name}
          className="mt-7"
        >
          {/* ACTIVE STAGE ICON */}

          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-full
              bg-[#B12025]
              text-white
            "
          >
            <currentJourney.icon size={25} />
          </div>

          {/* ACTIVE STAGE TITLE */}

          <h3
            className="
              mt-5
              text-[clamp(1.6rem,3vw,2.9rem)]
              font-semibold
              tracking-[-.055em]
            "
          >
            {currentJourney.name}
          </h3>

          {/* ACTIVE STAGE DESCRIPTION */}

          <p
            className="
              mt-3
              max-w-[520px]
              text-[14px]
              leading-[1.85]
              text-[#17191C]/65
            "
          >
            {currentJourney.text}
          </p>
        </div>

        {/* ======================================
            CRM RECORD FOOTER
        ====================================== */}

        <div
          className="
            mt-7
            flex
            flex-wrap
            items-center
            gap-2
            border-t
            border-[#B12025]/15
            pt-5
            text-[11px]
            text-[#17191C]/60
          "
        >
          <Database
            size={16}
            className="text-[#B12025]"
          />

          Contact history and next action recorded
        </div>
      </div>
    </div>
  </div>
</section>


{/* ==============================================
    04 — METRICS
============================================== */}

<section
  id="lg-metrics"
  className="
    bg-white
    px-5
    py-16
    max-sm:py-9
    sm:px-8
    lg:px-14
    lg:py-20
  "
>
  <div className="mx-auto max-w-[1420px]">

    {/* ==========================================
        SECTION HEADING
    ========================================== */}

    <SectionIntro
      number="03 / Your monthly report"
      title="The numbers you will see"
      detail="Lead generation is judged by the meetings it produces and whether your sales team wants them. Your weekly report shows each step from first contact to booked meeting."
    />

    {/* ==========================================
        METRIC CARDS

        MOBILE:
        HORIZONTAL SIDE SCROLL

        TABLET / DESKTOP:
        ORIGINAL GRID LAYOUT
    ========================================== */}

    <div
      className="
        mt-8
        grid
        gap-3

       max-sm:-mx-5
max-sm:mt-5
max-sm:flex
max-sm:snap-x
max-sm:snap-mandatory
max-sm:gap-3
max-sm:overflow-x-auto
max-sm:overscroll-x-contain
max-sm:px-7
max-sm:pb-2
max-sm:scroll-px-7
        max-sm:touch-pan-x
        max-sm:[scrollbar-width:none]
        max-sm:[&::-webkit-scrollbar]:hidden

        sm:grid-cols-2
        lg:grid-cols-4
      "
    >
      {metrics.map((m, i) => (
        <article
          data-lg-fade
          key={m.title}
          className={`
            group
            rounded-[20px]
            border
            border-[#E6E7E9]
            bg-[#FBFBFB]
            p-5
            transition
            hover:-translate-y-1
            hover:border-[#B12025]/40

            max-sm:min-h-[190px]
            max-sm:w-[72vw]
            max-sm:max-w-[235px]
            max-sm:shrink-0
            max-sm:snap-start
            max-sm:p-4

            ${
              i === 4
                ? 'lg:col-span-4'
                : ''
            }
          `}
        >
          {/* ==================================
              CARD TOP — NUMBER AND ICON
          ================================== */}

          <div
            className="
              flex
              items-start
              justify-between
              gap-3
            "
          >
            {/* METRIC NUMBER */}

            <span
              className="
                font-mono
                text-[11px]
                text-[#B12025]
                max-sm:text-[9px]
              "
            >
              0{i + 1}
            </span>

            {/* METRIC ICON */}

            <m.Icon
              size={22}
              className="
                text-[#B12025]
                max-sm:h-[17px]
                max-sm:w-[17px]
              "
            />
          </div>

          {/* ==================================
              METRIC TITLE
          ================================== */}

          <h3
            className="
              mt-5
              text-[20px]
              font-semibold
              tracking-[-.04em]

              max-sm:mt-4
              max-sm:text-[16px]
              max-sm:leading-[1.2]
            "
          >
            {m.title}
          </h3>

          {/* ==================================
              METRIC DESCRIPTION
          ================================== */}

          <p
            className="
              mt-2
              text-[12px]
              leading-6
              text-[#17191C]/65

              max-sm:text-[9px]
              max-sm:leading-[1.55]
            "
          >
            {m.description}
          </p>

          {/* ==================================
              METRIC CAPTION
          ================================== */}

          <p
            className="
              mt-5
              text-[11px]
              font-semibold
              text-[#B12025]

              max-sm:mt-4
              max-sm:text-[9px]
              max-sm:leading-[1.4]
            "
          >
            {m.caption}
          </p>
        </article>
      ))}
    </div>

    {/* ==========================================
        STATISTICS SECTION

        MOBILE:
        ALL THREE IN ONE ROW

        DESKTOP / TABLET:
        ORIGINAL LAYOUT
    ========================================== */}

    <div
      className="
        mt-9
        grid
        grid-cols-2
        gap-5
        border-t
        border-[#B12025]/15
        pt-7

        max-sm:mt-5
        max-sm:grid-cols-3
        max-sm:gap-2
        max-sm:pt-5

        sm:grid-cols-3
      "
    >
      {/* ======================================
          STAT 01 — CLIENT RETENTION
      ====================================== */}

      <div className="min-w-0">
        <p
          className="
            text-[clamp(2.3rem,4vw,4rem)]
            font-semibold
            tracking-[-.06em]
            text-[#B12025]

            max-sm:text-[24px]
            max-sm:leading-none
          "
        >
          <span data-lg-stat="85">
            85
          </span>
          %
        </p>

        <p
          className="
            text-[12px]
            text-[#17191C]/60

            max-sm:mt-2
            max-sm:text-[9px]
            max-sm:leading-[1.35]
          "
        >
          client retention rate
        </p>
      </div>

      {/* ======================================
          STAT 02 — ACCURACY RATE
      ====================================== */}

      <div className="min-w-0">
        <p
          className="
            text-[clamp(2.3rem,4vw,4rem)]
            font-semibold
            tracking-[-.06em]
            text-[#B12025]

            max-sm:text-[24px]
            max-sm:leading-none
          "
        >
          <span data-lg-stat="98">
            98
          </span>
          %
        </p>

        <p
          className="
            text-[12px]
            text-[#17191C]/60

            max-sm:mt-2
            max-sm:text-[9px]
            max-sm:leading-[1.35]
          "
        >
          accuracy rate
        </p>
      </div>

      {/* ======================================
          STAT 03 — HIRING CHECKS
      ====================================== */}

      <div className="min-w-0">
        <p
          className="
            text-[clamp(2rem,3.7vw,3.8rem)]
            font-semibold
            tracking-[-.06em]
            text-[#B12025]

            max-sm:whitespace-nowrap
            max-sm:text-[24px]
            max-sm:leading-none
          "
        >
          <span data-lg-stat="15">
            15
          </span>
          –
          <span data-lg-stat="20">
            20
          </span>
          %
        </p>

        <Link
          href="/how-we-hire"
          className="
            inline-flex
            items-center
            gap-1
            text-[12px]
            text-[#17191C]/60
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
              max-sm:h-[11px]
              max-sm:w-[11px]
            "
          />
        </Link>
      </div>
    </div>
  </div>
</section>


    
{/* ==============================================
    05 — TESTIMONIAL SCROLL TEXT REVEAL
============================================== */}

<section
  id="lg-quote"
  className="
    relative
    overflow-hidden
    bg-[#B12025]
    px-5
    py-20
    text-white
    max-sm:py-10
    sm:px-8
    lg:px-14
    lg:py-24
  "
>
  {/* ==========================================
      DECORATIVE BACKGROUND QUOTE
  ========================================== */}

  <div
    data-lg-parallax
    aria-hidden="true"
    className="
      pointer-events-none
      absolute
      -right-4
      -top-24
      text-[320px]
      font-bold
      leading-none
      text-white/[.06]
      max-sm:-right-2
      max-sm:-top-10
      max-sm:text-[150px]
    "
  >
    “
  </div>

  {/* ==========================================
      TESTIMONIAL CONTENT
  ========================================== */}

  <div className="relative mx-auto max-w-[1180px]">

    {/* TESTIMONIAL LABEL */}

    <p
      className="
        text-[11px]
        font-bold
        uppercase
        tracking-[.2em]
        text-white/70
        max-sm:text-[8px]
        max-sm:tracking-[.16em]
      "
    >
      Recruitment agency & Client experience
    </p>

    {/* ========================================
        TESTIMONIAL QUOTE

        GSAP WORD-BY-WORD SCROLL REVEAL
    ======================================== */}

    <blockquote
      className="
        mt-5
        text-[clamp(2rem,4.2vw,4.8rem)]
        font-semibold
        leading-[1.23]
        tracking-[-.055em]
        max-sm:mt-4
        max-sm:text-[23px]
        max-sm:leading-[1.18]
        max-sm:tracking-[-.045em]
      "
    >
      {(
        '“Our consultants used to spend their mornings looking for contacts. Now they start each week with a checked list of hiring managers and a few calls already booked.”'
      )
        .split(' ')
        .map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="
              inline-block
              overflow-hidden
              align-bottom
            "
          >
            <span
              data-lg-quote-word
              className="inline-block"
            >
              {word}
            </span>

            {'\u00a0'}
          </span>
        ))}
    </blockquote>

    {/* ========================================
        TESTIMONIAL AUTHOR
    ======================================== */}



  </div>
</section>


    
{/* ==============================================
    06 — FAQ
============================================== */}

<section
  id="lg-faq"
  className="
    bg-[#F7F7F8]
    px-5
    py-16
    max-sm:py-9
    sm:px-8
    lg:px-14
    lg:py-20
  "
>
  <div
    className="
      mx-auto
      grid
      max-w-[1420px]
      gap-8
      max-sm:gap-5
      lg:grid-cols-[.8fr_1.2fr]
      lg:gap-16
    "
  >
    {/* ==========================================
        LEFT — FAQ SECTION HEADING
    ========================================== */}

    <div
      className="
        self-start
        lg:sticky
        lg:top-[110px]
      "
    >
      <SectionIntro
        number="04 / Questions answered"
        title="Common questions about lead generation"
      />
    </div>

    {/* ==========================================
        RIGHT — FAQ ACCORDION

        MOBILE:
        COMPACT QUESTIONS AND ANSWERS

        TABLET / DESKTOP:
        ORIGINAL ACCORDION LAYOUT
    ========================================== */}

    <div
      className="
        border-t
        border-[#17191C]/15
      "
    >
      {faqs.map((f) => (
        <FaqItem
          key={f.q}
          question={f.q}
          answer={f.a}
        />
      ))}
    </div>
  </div>
</section>


    
{/* ==============================================
    07 — OTHER SERVICES
============================================== */}

<section
  id="lg-related"
  className="
    bg-white
    px-5
    py-14
    max-sm:hidden
    sm:px-8
    lg:px-14
    lg:py-16
  "
>
  <div className="mx-auto max-w-[1420px]">

    {/* ==========================================
        SECTION HEADER
    ========================================== */}

    <div className="flex flex-wrap items-end justify-between gap-4">

      {/* SECTION TITLE */}

      <ScrollHeading
        text="Other BPO and back office services"
        className="max-w-[850px]"
      />

      {/* SEE ALL SERVICES LINK */}

      <Link
        href={ROOT}
        className="
          inline-flex
          items-center
          gap-2
          text-[12px]
          font-semibold
          text-[#B12025]
        "
      >
        See all services

        <ArrowUpRight size={16} />
      </Link>
    </div>

    {/* ==========================================
        RELATED SERVICES GRID
    ========================================== */}

    <div
      className="
        mt-6
        grid
        gap-x-10
        md:grid-cols-2
      "
    >
      {related.map(([label, slug]) => (
        <Link
          key={slug}
          href={`${ROOT}/${slug}`}
          className="
            group
            flex
            items-center
            justify-between
            gap-4
            border-b
            border-[#B12025]/20
            py-4
            text-[14px]
            font-semibold
            text-[#17191C]
            transition
            hover:pl-2
            hover:text-[#B12025]
          "
        >
          {/* SERVICE NAME */}

          <span>{label}</span>

          {/* ARROW ICON */}

          <ArrowRight
            size={16}
            className="
              shrink-0
              text-[#B12025]
              transition
              group-hover:translate-x-1.5
            "
          />
        </Link>
      ))}
    </div>
  </div>
</section>


    
{/* ==============================================
    08 — FOUR-STEP TEAM PROCESS
============================================== */}

<section
  id="lg-process"
  className="
    bg-[#FFF6F6]
    px-5
    py-16
    max-sm:py-9
    sm:px-8
    lg:px-14
    lg:py-20
  "
>
  <div className="mx-auto max-w-[1420px]">

    {/* ==========================================
        SECTION HEADING
    ========================================== */}

    <SectionIntro
      number="05 / How we work"
      title="How your back office team is set up"
      detail="The biggest risk with outsourced admin is mistakes that reach your systems. These steps are there to stop that."
    />

    {/* ==========================================
        PROCESS CONTAINER
    ========================================== */}

    <div
      className="
        relative
        mt-9
        max-sm:mt-5
      "
    >
      {/* ========================================
          DESKTOP BACKGROUND PROGRESS LINE
      ======================================== */}

      <div
        aria-hidden="true"
        className="
          absolute
          inset-x-0
          top-0
          hidden
          h-[2px]
          bg-[#B12025]/20
          lg:block
        "
      />

      {/* ========================================
          DESKTOP GSAP ANIMATED PROGRESS LINE
          DO NOT REMOVE data-lg-process-line
      ======================================== */}

      <div
        data-lg-process-line
        aria-hidden="true"
        className="
          absolute
          inset-x-0
          top-0
          hidden
          h-[2px]
          origin-left
          bg-[#B12025]
          lg:block
        "
      />

      {/* ========================================
          FOUR-STEP PROCESS LIST

          MOBILE:
          HORIZONTAL SIDE SCROLL

          TABLET:
          ORIGINAL TWO-COLUMN GRID

          DESKTOP:
          ORIGINAL FOUR-COLUMN GRID
      ======================================== */}
<ol className="grid gap-7 max-sm:-mx-5 max-sm:flex max-sm:snap-x max-sm:snap-mandatory max-sm:gap-3 max-sm:overflow-x-auto max-sm:overscroll-x-contain max-sm:px-7 max-sm:pb-2 max-sm:scroll-px-7 max-sm:[scrollbar-width:none] max-sm:[&::-webkit-scrollbar]:hidden sm:grid-cols-2 lg:grid-cols-4">
        {/* ======================================
            PROCESS CARDS
        ====================================== */}

        {process.map((step) => (
          <li
            key={step.n}
            className="
              border-l
              border-[#B12025]/35
              pl-4

              max-sm:min-h-[205px]
              max-sm:w-[72vw]
              max-sm:max-w-[235px]
              max-sm:shrink-0
              max-sm:snap-start
              max-sm:rounded-[18px]
              max-sm:border
              max-sm:border-[#B12025]/20
              max-sm:bg-white
              max-sm:p-4

              lg:border-l-0
              lg:pl-0
              lg:pt-6
            "
          >
            {/* ==================================
                CARD TOP — ICON AND NUMBER
            ================================== */}

            <div
              className="
                flex
                items-center
                gap-3
                text-[#B12025]

                max-sm:gap-2
              "
            >
              {/* PROCESS ICON */}

              <step.Icon
                size={23}
                className="
                  max-sm:h-[17px]
                  max-sm:w-[17px]
                "
              />

              {/* PROCESS NUMBER */}

              <span
                className="
                  font-mono
                  text-[11px]
                  font-semibold

                  max-sm:text-[9px]
                "
              >
                {step.n}
              </span>
            </div>

            {/* ==================================
                PROCESS TITLE
            ================================== */}

            <h3
              className="
                mt-3
                text-[19px]
                font-semibold
                tracking-[-.04em]

                max-sm:mt-3
                max-sm:text-[16px]
                max-sm:leading-[1.2]
              "
            >
              {step.title}
            </h3>

            {/* ==================================
                PROCESS DESCRIPTION
            ================================== */}

            <p
              className="
                mt-2
                text-[12px]
                leading-[1.8]
                text-[#17191C]/65

                max-sm:mt-2
                max-sm:text-[9px]
                max-sm:leading-[1.55]
              "
            >
              {step.description}
            </p>

            {/* ==================================
                HIRING PROCESS LINK
                ONLY STEP 02
            ================================== */}

            {step.n === '02' && (
              <Link
                href="/how-we-hire"
                className="
                  mt-3
                  inline-flex
                  items-center
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
                  size={14}
                  className="
                    max-sm:h-[12px]
                    max-sm:w-[12px]
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

        MOBILE:
        COMPLETELY HIDDEN

        TABLET / DESKTOP:
        ORIGINAL DESIGN
    ========================================== */}

    <div
      className="
        mt-9
        flex
        flex-wrap
        items-center
        justify-between
        gap-4
        border-t
        border-[#B12025]/20
        pt-6

        max-sm:hidden
      "
    >
      {/* CTA DESCRIPTION */}

      <p
        className="
          text-[13px]
          text-[#17191C]/70
        "
      >
        Want verified leads and meetings
        prepared for your sales team?
      </p>

      {/* CTA BUTTON */}

      <a
        href="#contact"
        className="
          inline-flex
          items-center
          gap-2
          rounded-full
          bg-[#B12025]
          px-6
          py-3
          text-[12px]
          font-bold
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
