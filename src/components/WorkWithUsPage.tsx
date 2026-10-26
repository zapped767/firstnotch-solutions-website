
'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Copy,
  GraduationCap,
  HeartHandshake,
  Mail,
  MapPin,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Wallet,
  X,
} from 'lucide-react';

const CAREERS_EMAIL = 'careers@firstnotch-solutions.com';

// ======================================================
// FIRSTNOTCH WORK WITH US — CONTENT
// ======================================================

const benefits = [
  {
    title: 'EPF contributions',
    Icon: ShieldCheck,
    body: 'EPF contributions start once you pass your probation period.',
  },
  {
    title: 'Structured breaks',
    Icon: Clock3,
    body: 'Each shift has fixed break times.',
  },
  {
    title: 'Training',
    Icon: GraduationCap,
    body: 'Ongoing training and career development programmes help you build new skills.',
  },
];

const culture = [
  {
    title: 'Your ideas are welcome',
    body: 'Staff are encouraged to suggest better ways of working, and good work is recognised.',
    Icon: Sparkles,
  },
  {
    title: 'Room to grow',
    body: 'As you gain experience you can learn new skills and take on new kinds of work.',
    Icon: TrendingUp,
  },
  {
    title: 'A mixed team',
    body: 'Colleagues come from different backgrounds and speak English, Sinhala, Tamil and Hindi.',
    Icon: Users,
  },
  {
    title: 'Respect and teamwork',
    body: 'People are expected to treat each other with respect. The team also takes part in social responsibility projects.',
    Icon: HeartHandshake,
  },
];

type Category =
  | 'Customer'
  | 'Data'
  | 'Marketing'
  | 'Sales';

type Role = {
  slug: string;
  title: string;
  category: Category;
  summary: string;
};

const roles: Role[] = [
  {
    slug: 'customer-support-executive',
    title: 'Customer Support Executive',
    category: 'Customer',
    summary:
      'Answer calls, emails and live chat for client businesses.',
  },
  {
    slug: 'data-analyst',
    title: 'Data Analyst',
    category: 'Data',
    summary:
      'Prepare and check data and reports for client accounts.',
  },
  {
    slug: 'digital-marketing-associate',
    title: 'Digital Marketing Associate',
    category: 'Marketing',
    summary:
      'Plan and run online marketing work, such as social media posts and ads.',
  },
  {
    slug: 'business-development-executive',
    title: 'Business Development Executive',
    category: 'Sales',
    summary:
      'Find new clients and look after the first conversations with them.',
  },
];

const categories: Array<'All' | Category> = [
  'All',
  'Customer',
  'Data',
  'Marketing',
  'Sales',
];

const faqs = [
  {
    q: 'Do I need experience?',
    a: 'Not for every role. Customer Support Executive roles are open to school leavers and graduates.',
  },
  {
    q: 'What are the working hours?',
    a: 'Office hours are 10am to 7pm, Monday to Friday. Some client accounts need different shifts, and this is explained before an offer is made.',
  },
  {
    q: 'Is the work in the office or from home?',
    a: 'All roles are office based. Working from home is not offered.',
  },
  {
    q: 'How long is probation?',
    a: 'The probation period has not yet been confirmed for this page. Ask our careers team for the current duration.',
  },
  {
    q: 'Which languages do I need?',
    a: 'Good English is needed for every role. Sinhala, Tamil or Hindi is useful for some client accounts.',
  },
];

const applySteps = [
  {
    title: 'Choose a role',
    body: 'Pick the open role that fits you best from the list above.',
  },
  {
    title: 'Send your CV',
    body: 'Email your CV to careers@firstnotch-solutions.com with the job title in the subject line.',
  },
  {
    title: 'Hear back',
    body: 'Shortlisted applicants are contacted to book the first test. The response timeframe is to be confirmed.',
  },
];

const quizQuestions: {
  title: string;
  choices: {
    label: string;
    category: Category;
  }[];
}[] = [
  {
    title: 'What do you enjoy most?',
    choices: [
      { label: 'Helping people', category: 'Customer' },
      { label: 'Working with numbers', category: 'Data' },
      { label: 'Creating content', category: 'Marketing' },
      { label: 'Meeting new people', category: 'Sales' },
    ],
  },
  {
    title: 'What kind of task sounds interesting?',
    choices: [
      { label: 'Resolving an enquiry', category: 'Customer' },
      { label: 'Checking a report', category: 'Data' },
      { label: 'Planning a campaign', category: 'Marketing' },
      { label: 'Introducing a service', category: 'Sales' },
    ],
  },
  {
    title: 'Which skill would you like to build?',
    choices: [
      { label: 'Communication', category: 'Customer' },
      { label: 'Analysis', category: 'Data' },
      { label: 'Digital creativity', category: 'Marketing' },
      { label: 'Client relationships', category: 'Sales' },
    ],
  },
];

const mailto = (title?: string) =>
  `mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(
    title
      ? `Application – ${title}`
      : 'General CV – FirstNotch'
  )}`;

// ======================================================
// HOMEPAGE-STYLE GSAP SCROLL TEXT REVEAL
//
// Opacity: 0.2 → 1
// Start: top 88%
// End: bottom 50%
// Scrub: true
// ======================================================

function ScrollWords({ text }: { text: string }) {
  return (
    <span
      data-wu-read
      role="text"
      aria-label={text}
    >
      {text.split(/\s+/).map((word, index) => (
        <span
          key={index}
          data-wu-word
          aria-hidden="true"
          className="inline-block"
        >
          {word}
          {'\u00a0'}
        </span>
      ))}
    </span>
  );
}

// ======================================================
// HERO — RISING WORD ANIMATION
// ======================================================

function HeroWords({ text }: { text: string }) {
  return (
    <span role="text" aria-label={text}>
      {text.split(/\s+/).map((word, index) => (
        <span
          key={index}
          aria-hidden="true"
          className="-mb-[.12em] mr-[.2em] inline-block overflow-hidden pb-[.12em] align-bottom"
        >
          <span
            data-wu-rise
            className="inline-block"
          >
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}

const titleClass =
  'text-[clamp(2.65rem,5.4vw,6rem)] font-semibold leading-[1.09] tracking-[-.065em]';

const labelClass =
  'text-[11px] font-semibold uppercase tracking-[.2em]';

// ======================================================
// MAIN PAGE
// ======================================================

export default function WorkWithUsPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const growthRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  const [filter, setFilter] =
    useState<'All' | Category>('All');

  const [selectedRole, setSelectedRole] =
    useState<Role | null>(null);

  const [today, setToday] = useState('');
  const [officeOpen, setOfficeOpen] =
    useState<boolean | null>(null);

  const [resultBand, setResultBand] =
    useState(1);

  const [faqOpen, setFaqOpen] =
    useState<number | null>(0);

  const [copied, setCopied] = useState(false);

  const [quizStep, setQuizStep] = useState(0);

  const [quizAnswers, setQuizAnswers] =
    useState<Category[]>([]);

  const [suggested, setSuggested] =
    useState<Category | null>(null);

  const [quizHidden, setQuizHidden] =
    useState(false);

  // ====================================================
  // COLOMBO DATE AND OFFICE HOURS
  // ====================================================

  useEffect(() => {
    const update = () => {
      const parts = new Intl.DateTimeFormat(
        'en-GB',
        {
          timeZone: 'Asia/Colombo',
          weekday: 'short',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }
      ).formatToParts(new Date());

      const get = (type: string) =>
        parts.find(
          (part) => part.type === type
        )?.value ?? '';

      const day = get('weekday');

      const minutes =
        Number(get('hour')) * 60 +
        Number(get('minute'));

      setToday(day);

      setOfficeOpen(
        !['Sat', 'Sun'].includes(day) &&
          minutes >= 600 &&
          minutes < 1140
      );
    };

    update();

    const interval = window.setInterval(
      update,
      60000
    );

    return () =>
      window.clearInterval(interval);
  }, []);

  // Open a job drawer from a shared URL hash.
  useEffect(() => {
    const slug =
      window.location.hash.slice(1);

    const found = roles.find(
      (role) => role.slug === slug
    );

    if (found) {
      setSelectedRole(found);
    }
  }, []);

  // ====================================================
  // GSAP + LENIS
  // ====================================================

  useEffect(() => {
    const root = rootRef.current;

    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    mm.add(
      '(prefers-reduced-motion: no-preference)',
      () => {
        const lenis = new Lenis({
          autoRaf: false,
          lerp: 0.1,
          smoothWheel: true,
          anchors: { offset: -110 },
        });

        const tick = (time: number) => {
          lenis.raf(time * 1000);
        };

        const sync = () => {
          ScrollTrigger.update();
        };

        lenis.on('scroll', sync);
        gsap.ticker.add(tick);

        const context = gsap.context(() => {

          // ============================================
          // EXACT HOMEPAGE SCROLL HEADING REVEAL
          // ============================================

          root
            .querySelectorAll<HTMLElement>(
              '[data-wu-read]'
            )
            .forEach((element) => {
              const words =
                element.querySelectorAll(
                  '[data-wu-word]'
                );

              gsap.fromTo(
                words,
                {
                  opacity: 0.2,
                },
                {
                  opacity: 1,
                  stagger: 0.12,
                  ease: 'none',

                  scrollTrigger: {
                    trigger: element,
                    start: 'top 88%',
                    end: 'bottom 50%',
                    scrub: true,
                  },
                }
              );
            });

          // ============================================
          // HERO HEADING RISE FROM BOTTOM
          // ============================================

          gsap.fromTo(
            root.querySelectorAll(
              '[data-wu-rise]'
            ),
            {
              yPercent: 110,
              opacity: 0,
            },
            {
              yPercent: 0,
              opacity: 1,
              duration: 1.1,
              stagger: 0.075,
              ease: 'power4.out',
              delay: 0.12,
            }
          );

          // ============================================
          // PARAGRAPHS AND CARDS FADE UP
          // ============================================

          root
            .querySelectorAll<HTMLElement>(
              '[data-wu-in]'
            )
            .forEach((element) => {
              gsap.fromTo(
                element,
                {
                  y: 32,
                  opacity: 0,
                },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.85,
                  ease: 'power3.out',

                  scrollTrigger: {
                    trigger: element,
                    start: 'top 90%',
                    once: true,
                  },
                }
              );
            });

          // ============================================
          // PAGE SCROLL PROGRESS
          // ============================================

          if (progressRef.current) {
            gsap.fromTo(
              progressRef.current,
              {
                scaleY: 0,
              },
              {
                scaleY: 1,
                ease: 'none',

                scrollTrigger: {
                  trigger: root,
                  start: 'top top',
                  end: 'bottom bottom',
                  scrub: true,
                },
              }
            );
          }

          // ============================================
          // CAREER LADDER PROGRESS LINE
          // ============================================

          if (growthRef.current) {
            gsap.fromTo(
              growthRef.current,
              {
                scaleX: 0,
              },
              {
                scaleX: 1,
                ease: 'none',

                scrollTrigger: {
                  trigger: '#wu-growth',
                  start: 'top 80%',
                  end: 'bottom 45%',
                  scrub: true,
                },
              }
            );
          }

          // ============================================
          // BENEFITS MARQUEE
          // ============================================

          if (marqueeRef.current) {
            gsap.to(marqueeRef.current, {
              xPercent: -50,
              duration: 32,
              ease: 'none',
              repeat: -1,
            });
          }
        }, root);

        return () => {
          context.revert();
          lenis.off('scroll', sync);
          gsap.ticker.remove(tick);
          lenis.destroy();
        };
      }
    );

    let active = true;

    document.fonts?.ready.then(() => {
      if (active) {
        ScrollTrigger.refresh();
      }
    });

    return () => {
      active = false;
      mm.revert();
    };
  }, []);

  // ====================================================
  // ACCESSIBLE JOB DETAILS DRAWER
  // ====================================================

  useEffect(() => {
    if (!selectedRole) return;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      'hidden';

    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedRole(null);
      }

      if (
        event.key === 'Tab' &&
        drawerRef.current
      ) {
        const focusable =
          Array.from(
            drawerRef.current.querySelectorAll<HTMLElement>(
              'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
            )
          );

        if (!focusable.length) return;

        const first = focusable[0];

        const last =
          focusable[focusable.length - 1];

        if (
          event.shiftKey &&
          document.activeElement === first
        ) {
          event.preventDefault();
          last.focus();
        } else if (
          !event.shiftKey &&
          document.activeElement === last
        ) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener(
      'keydown',
      onKeyDown
    );

    let tween: gsap.core.Tween | null =
      null;

    if (
      drawerRef.current &&
      !window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches
    ) {
      tween = gsap.fromTo(
        drawerRef.current,
        { xPercent: 100 },
        {
          xPercent: 0,
          duration: 0.48,
          ease: 'power3.out',
        }
      );
    }

    return () => {
      tween?.kill();

      document.body.style.overflow =
        previousOverflow;

      document.removeEventListener(
        'keydown',
        onKeyDown
      );
    };
  }, [selectedRole]);

  // ====================================================
  // JOB FILTERING
  // ====================================================

  const displayedRoles =
    filter === 'All'
      ? roles
      : roles.filter(
          (role) => role.category === filter
        );

  function openRole(role: Role) {
    window.history.replaceState(
      null,
      '',
      `#${role.slug}`
    );

    setSelectedRole(role);
  }

  function closeRole() {
    window.history.replaceState(
      null,
      '',
      '#roles'
    );

    setSelectedRole(null);
  }

  // ====================================================
  // OPTIONAL ROLE MATCHER
  // ====================================================

  function answerQuiz(category: Category) {
    const next = [
      ...quizAnswers,
      category,
    ];

    setQuizAnswers(next);

    if (
      quizStep <
      quizQuestions.length - 1
    ) {
      setQuizStep(quizStep + 1);
    } else {
      const counts: Record<
        Category,
        number
      > = {
        Customer: 0,
        Data: 0,
        Marketing: 0,
        Sales: 0,
      };

      next.forEach(
        (value) => counts[value]++
      );

      const match = next.reduce(
        (best, candidate) =>
          counts[candidate] > counts[best]
            ? candidate
            : best,
        next[0]
      );

      setSuggested(match);
      setFilter('All');
    }
  }

  // ====================================================
  // COPY CAREERS EMAIL
  // ====================================================

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(
        CAREERS_EMAIL
      );

      setCopied(true);
    } catch {
      setCopied(false);
      window.location.href = mailto();
    }
  }

  return (
    <div
      ref={rootRef}
      className="overflow-x-clip bg-white font-sans text-[#17191C]"
    >
      {/* PAGE SCROLL INDICATOR */}

      <div
        ref={progressRef}
        aria-hidden="true"
        className="pointer-events-none fixed right-0 top-0 z-[130] h-full w-[3px] origin-top scale-y-0 bg-[#B12025]"
      />

      {/* ==============================================
          PREMIUM RED HERO
      ============================================== */}

      <section
        id="wu-top"
        className="relative overflow-hidden bg-[#B12025] px-5 pb-[105px] pt-[150px] text-white sm:px-8 lg:px-14 lg:pb-[140px] lg:pt-[195px]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-[270px] top-[-250px] h-[850px] w-[850px] rounded-full border border-white/15"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-[110px] top-[-110px] h-[570px] w-[570px] rounded-full border border-white/15"
        />

        <div className="relative mx-auto grid max-w-[1460px] gap-14 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
          <div>
            <p
              data-wu-in
              className={`${labelClass} text-white/75`}
            >
              FIRSTNOTCH SOLUTIONS / WORK WITH US
            </p>

            <h1 className="mt-7 max-w-[920px] text-[clamp(3.2rem,6.5vw,7.8rem)] font-semibold leading-[1.045] tracking-[-.075em]">
              <HeroWords
                text="Jobs in Colombo that pay a salary plus monthly incentives"
              />
            </h1>

            <p
              data-wu-in
              className="mt-8 max-w-[690px] text-[15px] leading-[1.9] text-white/95 sm:text-[17px]"
            >
              FirstNotch is a BPO company with
              a team of 30+ at its Colombo
              office. Staff answer customer
              calls, process data and build
              websites for client businesses
              in Sri Lanka and abroad.
            </p>

            <p
              data-wu-in
              className="mt-5 max-w-[650px] text-[14px] leading-[1.85] text-white/80"
            >
              A willingness to learn matters
              more here than a long CV. New
              starters get training, and
              those who do well can move
              into senior roles.
            </p>

            <div
              data-wu-in
              className="mt-9 flex flex-wrap gap-3"
            >
              <a
                href="#roles"
                className="inline-flex min-h-[52px] items-center gap-3 rounded-full bg-white px-6 text-[12px] font-semibold text-[#B12025] transition hover:bg-[#fff0f0]"
              >
                See open roles
                <ArrowUpRight size={17} />
              </a>

              <a
                href="#apply"
                className="inline-flex min-h-[52px] items-center gap-3 rounded-full border border-white/50 px-6 text-[12px] font-semibold text-white transition hover:bg-white/15"
              >
                How to apply
                <ArrowDownRight size={17} />
              </a>
            </div>
          </div>

          {/* HERO STATS */}

          <div
            data-wu-in
            className="relative border-t border-white/35 pt-9 lg:mb-3 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0"
          >
            <p className="text-[clamp(6rem,12vw,12rem)] font-semibold leading-none tracking-[-.1em]">
              30
              <span className="text-white/65">
                +
              </span>
            </p>

            <p className="mt-3 text-[15px] font-semibold">
              People in the Colombo team
            </p>

            <div className="mt-10 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/30 px-4 py-2 text-[11px]">
                Colombo 4 · Office based
              </span>

              <span className="rounded-full border border-white/30 px-4 py-2 text-[11px]">
                {officeOpen === null
                  ? 'Checking office hours'
                  : officeOpen
                    ? 'Within office hours'
                    : 'Outside office hours'}
              </span>
            </div>

            <div
              className="relative mt-10 h-[54px] overflow-hidden"
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 450 55"
                className="h-full w-full"
              >
                <path
                  d="M5 39 C70 8 110 58 175 27 S320 4 445 30"
                  fill="none"
                  stroke="white"
                  strokeOpacity=".55"
                  strokeWidth="2"
                  strokeDasharray="4 8"
                />

                <circle
                  cx="445"
                  cy="30"
                  r="7"
                  fill="white"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ==============================================
          BENEFITS
      ============================================== */}

      <section
        id="benefits"
        className="scroll-mt-[110px] bg-white px-5 py-[105px] sm:px-8 lg:px-14 lg:py-[135px]"
      >
        <div className="mx-auto max-w-[1440px]">
          <p
            data-wu-in
            className={`${labelClass} text-[#B12025]`}
          >
            01 / WHAT YOU GET
          </p>

          <h2
            className={`${titleClass} mt-5 max-w-[1080px]`}
          >
            <ScrollWords
              text="A place to learn, earn and grow."
            />
          </h2>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-12">
            {/* SALARY CARD */}

            <article
              data-wu-in
              className="flex min-h-[345px] flex-col rounded-[29px] bg-[#B12025] p-8 text-white sm:p-10 lg:col-span-7"
            >
              <Wallet
                size={30}
                strokeWidth={1.5}
              />

              <div className="mt-auto pt-10">
                <h3 className="text-[30px] font-semibold tracking-[-.04em]">
                  Salary and incentives
                </h3>

                <p className="mt-3 max-w-[500px] text-[14px] leading-7 text-white/90">
                  A competitive salary, plus
                  monthly incentives based
                  on your results.
                </p>

                <label
                  htmlFor="wu-incentives"
                  className="mt-7 block text-[12px] font-semibold"
                >
                  Example results level:{' '}
                  {
                    ['Good', 'Great', 'Top'][
                      resultBand
                    ]
                  }
                </label>

                <input
                  id="wu-incentives"
                  type="range"
                  min={0}
                  max={2}
                  step={1}
                  value={resultBand}
                  onChange={(event) =>
                    setResultBand(
                      Number(event.target.value)
                    )
                  }
                  className="mt-4 w-full accent-white"
                />

                <p className="mt-3 text-[10px] text-white/75">
                  Illustrative levels only;
                  incentive amounts and
                  eligibility are confirmed
                  by HR.
                </p>
              </div>
            </article>

            {benefits.map(
              ({ title, Icon, body }, index) => (
                <article
                  data-wu-in
                  key={title}
                  className={`flex min-h-[245px] flex-col rounded-[29px] border border-[#B12025]/15 bg-[#fff9f9] p-8 ${
                    index === 0
                      ? 'lg:col-span-5'
                      : 'lg:col-span-6'
                  }`}
                >
                  <Icon
                    size={27}
                    className="text-[#B12025]"
                    strokeWidth={1.5}
                  />

                  <div className="mt-auto pt-8">
                    <h3 className="text-[23px] font-semibold tracking-[-.035em]">
                      {title}
                    </h3>

                    <p className="mt-3 text-[13px] leading-7 text-[#17191C]/70">
                      {body}
                    </p>
                  </div>
                </article>
              )
            )}

            <article
              data-wu-in
              className="flex min-h-[245px] flex-col rounded-[29px] border border-[#B12025]/15 bg-white p-8 lg:col-span-6"
            >
              <CheckCircle2
                size={28}
                className="text-[#B12025]"
              />

              <div className="mt-auto pt-8">
                <h3 className="text-[23px] font-semibold">
                  Relaxed dress code
                </h3>

                <p className="mt-3 text-[13px] leading-7 text-[#17191C]/70">
                  Smart casual Monday to
                  Thursday, black and white
                  on Wednesdays, and casual
                  Fridays and Poya days.
                </p>
              </div>
            </article>
          </div>

          {/* DRESS CODE WEEK STRIP */}

          <div className="mt-8 rounded-[28px] border border-[#B12025]/15 bg-[#fff9f9] p-6 sm:p-9">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-[21px] font-semibold">
                Your workweek, your style
              </h3>

              <span className="text-[11px] text-[#B12025]">
                Colombo time · Poya days: casual
              </span>
            </div>

            <div className="mt-7 grid grid-cols-5 gap-2 sm:gap-3">
              {[
                ['Mon', 'Smart casual'],
                ['Tue', 'Smart casual'],
                ['Wed', 'Black & white'],
                ['Thu', 'Smart casual'],
                ['Fri', 'Casual'],
              ].map(([day, mode]) => (
                <div
                  key={day}
                  className={`rounded-[17px] border p-3 text-center sm:p-5 ${
                    today === day
                      ? 'border-[#B12025] bg-[#B12025] text-white'
                      : 'border-[#B12025]/15 bg-white'
                  }`}
                >
                  <p className="text-[12px] font-semibold">
                    {day}
                  </p>

                  <p className="mt-4 text-[10px] leading-5 sm:text-[12px]">
                    {mode}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==============================================
          COMPANY CULTURE
      ============================================== */}

      <section
        id="culture"
        className="bg-[#fff9f9] py-[100px] lg:py-[135px]"
      >
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
          <p
            data-wu-in
            className={`${labelClass} text-[#B12025]`}
          >
            02 / WORKING AT FIRSTNOTCH
          </p>

          <h2
            className={`${titleClass} mt-5 max-w-[1150px]`}
          >
            <ScrollWords
              text="Good work is noticed. Good ideas are welcome."
            />
          </h2>

          <p
            data-wu-in
            className="mt-6 max-w-[700px] text-[14px] leading-8 text-[#17191C]/65"
          >
            Colleagues from different
            backgrounds work together,
            learn from each other and
            take on new challenges.
          </p>
        </div>

        <div className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-8 lg:px-14">
          {culture.map(
            ({ title, body, Icon }, index) => (
              <article
                key={title}
                className={`flex min-h-[325px] w-[min(85vw,420px)] shrink-0 snap-start flex-col rounded-[27px] border p-8 sm:w-[440px] ${
                  index === 0
                    ? 'border-[#B12025] bg-[#B12025] text-white'
                    : 'border-[#B12025]/15 bg-white'
                }`}
              >
                <Icon
                  size={29}
                  strokeWidth={1.5}
                  className={
                    index === 0
                      ? 'text-white'
                      : 'text-[#B12025]'
                  }
                />

                <div className="mt-auto pt-12">
                  <h3 className="text-[27px] font-semibold tracking-[-.04em]">
                    {title}
                  </h3>

                  <p
                    className={`mt-4 text-[13px] leading-7 ${
                      index === 0
                        ? 'text-white/85'
                        : 'text-[#17191C]/70'
                    }`}
                  >
                    {body}
                  </p>

                  {title === 'A mixed team' && (
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {[
                        'English',
                        'සිංහල',
                        'தமிழ்',
                        'हिन्दी',
                      ].map((language) => (
                        <span
                          key={language}
                          className="rounded-full bg-[#fff1f1] px-3 py-1.5 text-[11px] text-[#B12025]"
                        >
                          {language}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            )
          )}
        </div>

        <p className="px-5 text-[11px] text-[#B12025] sm:px-8 lg:px-14">
          Swipe horizontally to explore our culture →
        </p>
      </section>

      {/* ==============================================
          JOB OPENINGS
      ============================================== */}

      <section
        id="roles"
        className="scroll-mt-[110px] bg-[#17191C] px-5 py-[110px] text-white sm:px-8 lg:px-14 lg:py-[140px]"
      >
        <div className="mx-auto max-w-[1440px]">
          <p
            data-wu-in
            className={`${labelClass} text-[#F5B0B2]`}
          >
            03 / OPEN ROLES
          </p>

          <h2
            className={`${titleClass} mt-5 max-w-[1050px]`}
          >
            <ScrollWords
              text="Find a role where you can do your best work."
            />
          </h2>

          <p
            data-wu-in
            className="mt-6 max-w-[760px] text-[14px] leading-8 text-white/70"
          >
            These BPO roles are listed in the
            FirstNotch careers brief.
            Each is full time and based at
            the Colombo office. Confirm
            current vacancy status with
            the careers team before applying.
          </p>

          {/* JOB FILTERS */}

          <div
            role="group"
            aria-label="Filter job categories"
            className="mt-9 flex flex-wrap gap-2"
          >
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                aria-pressed={
                  filter === category
                }
                onClick={() =>
                  setFilter(category)
                }
                className={`rounded-full border px-5 py-3 text-[12px] font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-white ${
                  filter === category
                    ? 'border-white bg-white text-[#17191C]'
                    : 'border-white/25 text-white hover:border-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* ROLE CARDS */}

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {displayedRoles.map((role) => (
              <article
                key={role.slug}
                id={role.slug}
                className={`group relative min-h-[315px] scroll-mt-[130px] overflow-hidden rounded-[28px] border p-8 sm:p-10 ${
                  suggested === role.category
                    ? 'border-white bg-[#B12025]'
                    : 'border-white/20 bg-[#25282C]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[13px] text-white/55">
                    0{roles.indexOf(role) + 1}/04
                  </span>

                  <span className="rounded-full border border-white/25 px-3 py-1.5 text-[10px]">
                    {role.category}
                  </span>
                </div>

                <div className="mt-14">
                  <h3 className="text-[clamp(1.65rem,2.5vw,2.65rem)] font-semibold leading-[1.17] tracking-[-.045em]">
                    {role.title}
                  </h3>

                  <p className="mt-4 max-w-[510px] text-[13px] leading-7 text-white/75">
                    {role.summary}
                  </p>

                  <p className="mt-4 text-[11px] text-white/60">
                    Full time · Colombo office
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    openRole(role)
                  }
                  className="mt-8 inline-flex items-center gap-2 border-b border-white/40 pb-2 text-[12px] font-semibold transition group-hover:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                >
                  View role & apply
                  <ArrowUpRight size={17} />
                </button>

                <div
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-[3px] w-0 bg-white transition-all duration-500 group-hover:w-full"
                />
              </article>
            ))}
          </div>

          {/* GENERAL CV */}

          <div className="mt-5 flex flex-wrap items-center justify-between gap-5 rounded-[25px] border border-dashed border-white/35 p-7 sm:p-9">
            <div>
              <h3 className="text-[23px] font-semibold">
                No role that fits?
              </h3>

              <p className="mt-2 text-[13px] leading-7 text-white/70">
                Send your CV anyway and say
                what kind of work you are
                looking for.
              </p>
            </div>

            <a
              href={mailto()}
              className="inline-flex items-center gap-2 rounded-full bg-[#B12025] px-6 py-4 text-[12px] font-semibold text-white"
            >
              Send a general CV
              <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </section>

      {/* ==============================================
          OPTIONAL ROLE MATCHER
      ============================================== */}

      <section
        id="wu-matcher"
        className="bg-white px-5 py-[100px] sm:px-8 lg:px-14 lg:py-[130px]"
      >
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
          <div>
            <p
              data-wu-in
              className={`${labelClass} text-[#B12025]`}
            >
              04 / OPTIONAL ROLE MATCHER
            </p>

            <h2 className={`${titleClass} mt-5`}>
              <ScrollWords
                text="Which role fits you?"
              />
            </h2>

            <p className="mt-6 text-[14px] leading-8 text-[#17191C]/65">
              Three quick questions can suggest
              a starting point. This is not an
              assessment or hiring decision;
              every role stays available to explore.
            </p>
          </div>

          <div className="rounded-[29px] border border-[#B12025]/15 bg-[#fff9f9] p-7 sm:p-10">
            {quizHidden ? (
              <div>
                <h3 className="text-[21px] font-semibold">
                  All roles are open to explore.
                </h3>

                <button
                  type="button"
                  onClick={() => {
                    setQuizHidden(false);
                    setQuizStep(0);
                    setQuizAnswers([]);
                    setSuggested(null);
                  }}
                  className="mt-5 text-[12px] font-semibold text-[#B12025] underline"
                >
                  Try the role matcher
                </button>
              </div>
            ) : suggested ? (
              <div aria-live="polite">
                <span className="text-[12px] font-semibold uppercase tracking-[.15em] text-[#B12025]">
                  Suggested area
                </span>

                <h3 className="mt-4 text-[33px] font-semibold tracking-[-.05em]">
                  {suggested}
                </h3>

                <p className="mt-3 text-[13px] leading-7 text-[#17191C]/70">
                  Explore the highlighted role
                  above. You can still apply
                  for any position.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setQuizAnswers([]);
                      setQuizStep(0);
                      setSuggested(null);
                    }}
                    className="rounded-full border border-[#B12025]/20 px-5 py-3 text-[12px] font-semibold"
                  >
                    Try again
                  </button>

                  <a
                    href="#roles"
                    className="rounded-full bg-[#B12025] px-5 py-3 text-[12px] font-semibold text-white"
                  >
                    See suggested role
                  </a>
                </div>
              </div>
            ) : (
              <>
                <p className="text-[11px] font-semibold text-[#B12025]">
                  QUESTION {quizStep + 1} / 3
                </p>

                <div className="mt-4 flex gap-2">
                  {[0, 1, 2].map((index) => (
                    <span
                      key={index}
                      className={`h-1 flex-1 rounded-full ${
                        index <= quizStep
                          ? 'bg-[#B12025]'
                          : 'bg-[#B12025]/15'
                      }`}
                    />
                  ))}
                </div>

                <h3 className="mt-7 text-[24px] font-semibold">
                  {quizQuestions[quizStep].title}
                </h3>

                <div className="mt-6 grid gap-2 sm:grid-cols-2">
                  {quizQuestions[
                    quizStep
                  ].choices.map((choice) => (
                    <button
                      key={choice.label}
                      type="button"
                      onClick={() =>
                        answerQuiz(
                          choice.category
                        )
                      }
                      className="rounded-[14px] border border-[#B12025]/20 bg-white p-4 text-left text-[12px] font-semibold hover:border-[#B12025] hover:bg-[#fff2f2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#B12025]"
                    >
                      {choice.label}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setQuizHidden(true)
                  }
                  className="mt-6 text-[11px] text-[#17191C]/60 underline"
                >
                  Skip this quiz
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ==============================================
          CAREER GROWTH
      ============================================== */}

      <section
        id="wu-growth"
        className="bg-[#fff9f9] px-5 py-[110px] sm:px-8 lg:px-14 lg:py-[145px]"
      >
        <div className="mx-auto max-w-[1400px]">
          <p
            data-wu-in
            className={`${labelClass} text-[#B12025]`}
          >
            05 / ROOM TO GROW
          </p>

          <h2
            className={`${titleClass} mt-5 max-w-[1050px]`}
          >
            <ScrollWords
              text="One role can open the door to the next."
            />
          </h2>

          <blockquote className="mt-10 max-w-[1050px] border-l-[5px] border-[#B12025] pl-7 text-[clamp(1.55rem,3.15vw,3.25rem)] font-medium leading-[1.42] tracking-[-.04em] text-[#17191C]">
            <ScrollWords
              text="I joined to answer calls. Within a year I was helping to train new starters on my team."
            />

            <footer className="mt-6 text-[12px] font-semibold not-italic tracking-normal text-[#B12025]">
              Customer Support Executive, FirstNotch
            </footer>
          </blockquote>

          {/* CAREER PROGRESSION */}

          <div className="relative mt-16 grid gap-4 md:grid-cols-3">
            <div className="absolute left-0 right-0 top-[34px] hidden h-[3px] bg-[#B12025]/15 md:block">
              <div
                ref={growthRef}
                className="h-full origin-left bg-[#B12025]"
              />
            </div>

            {[
              'Customer Support Executive',
              'Trainer / mentor',
              'Senior role',
            ].map((stage, index) => (
              <div
                key={stage}
                className="relative rounded-[24px] border border-[#B12025]/15 bg-white p-7"
              >
                <span className="relative z-10 flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#B12025] text-[13px] font-semibold text-white">
                  0{index + 1}
                </span>

                <h3 className="mt-8 text-[21px] font-semibold">
                  {stage}
                </h3>

                <p className="mt-3 text-[12px] leading-7 text-[#17191C]/65">
                  {index === 0
                    ? 'Start in a customer support role.'
                    : index === 1
                      ? 'Build experience and help new starters learn.'
                      : 'Senior opportunities depend on your skills and available roles.'}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-5 text-[11px] text-[#17191C]/55">
            Illustrative career path; promotions
            and specific titles are not guaranteed.
          </p>
        </div>
      </section>

      {/* ==============================================
          HIRING PROCESS
      ============================================== */}

      <section
        id="process"
        className="bg-white px-5 py-[100px] sm:px-8 lg:px-14 lg:py-[130px]"
      >
        <div className="mx-auto max-w-[1400px]">
          <p
            data-wu-in
            className={`${labelClass} text-[#B12025]`}
          >
            06 / OUR HIRING PROCESS
          </p>

          <h2
            className={`${titleClass} mt-5 max-w-[1050px]`}
          >
            <ScrollWords
              text="Every applicant is checked before an offer."
            />
          </h2>

          <p className="mt-5 text-[13px] leading-7 text-[#17191C]/65">
            Expect a language test and, for most
            roles, a practical task. Work history
            and references are reviewed before
            any offer. The exact order and
            timing are to be confirmed.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {[
              'Language test',
              'Practical task',
              'Work history review',
              'Reference checks',
            ].map((name, index) => (
              <div
                data-wu-in
                key={name}
                className="rounded-[25px] border border-[#B12025]/15 bg-[#fff9f9] p-7"
              >
                <span className="text-[55px] font-semibold tracking-[-.08em] text-[#B12025]/25">
                  0{index + 1}
                </span>

                <h3 className="mt-7 text-[19px] font-semibold">
                  {name}
                </h3>
              </div>
            ))}
          </div>

          <Link
            href="/how-we-hire"
            className="mt-8 inline-flex items-center gap-2 text-[13px] font-semibold text-[#B12025] hover:underline"
          >
            See how we hire
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>

      {/* ==============================================
          HOW TO APPLY
      ============================================== */}

      <section
        id="apply"
        className="scroll-mt-[110px] bg-[#B12025] px-5 py-[105px] text-white sm:px-8 lg:px-14 lg:py-[135px]"
      >
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
          <div>
            <p
              data-wu-in
              className={`${labelClass} text-white/75`}
            >
              07 / HOW TO APPLY
            </p>

            <h2
              className={`${titleClass} mt-5`}
            >
              <ScrollWords
                text="Three clear steps. Your next move starts here."
              />
            </h2>

            <p className="mt-7 text-[14px] leading-8 text-white/80">
              Have a CV ready? Send it directly
              to our careers team. You can
              apply for a named role or send
              a general CV.
            </p>
          </div>

          <div className="space-y-3">
            {applySteps.map((step, index) => (
              <article
                data-wu-in
                key={step.title}
                className="flex gap-5 rounded-[22px] border border-white/25 bg-white/10 p-6 sm:p-8"
              >
                <span className="text-[24px] font-semibold text-white/55">
                  0{index + 1}
                </span>

                <div>
                  <h3 className="text-[21px] font-semibold">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-[13px] leading-7 text-white/85">
                    {step.body}
                  </p>

                  {index === 1 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={copyEmail}
                        className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[12px] font-semibold text-[#B12025]"
                      >
                        <Copy size={15} />
                        {copied
                          ? 'Copied email'
                          : 'Copy careers email'}
                      </button>

                      <a
                        href={mailto()}
                        className="inline-flex items-center gap-2 rounded-full border border-white/35 px-5 py-3 text-[12px] font-semibold text-white"
                      >
                        Open email
                        <ArrowUpRight size={15} />
                      </a>
                    </div>
                  )}
                </div>
              </article>
            ))}

            <p className="mt-5 text-[12px] text-white/80">
              No role that fits? Email your
              CV anyway and say what kind
              of work you want.
            </p>
          </div>
        </div>
      </section>

      {/* ==============================================
          APPLICANT FAQ
      ============================================== */}

      <section
        id="wu-faq"
        className="bg-white px-5 py-[105px] sm:px-8 lg:px-14 lg:py-[135px]"
      >
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[.82fr_1.18fr] lg:gap-20">
          <div>
            <p
              data-wu-in
              className={`${labelClass} text-[#B12025]`}
            >
              08 / APPLICANT QUESTIONS
            </p>

            <h2
              className={`${titleClass} mt-5`}
            >
              <ScrollWords
                text="Questions from job applicants"
              />
            </h2>

            <span className="mt-6 inline-flex rounded-full bg-[#fff3f3] px-4 py-2 text-[11px] font-semibold text-[#B12025]">
              All positions: Colombo office-based
            </span>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <article
                key={faq.q}
                className="overflow-hidden rounded-[19px] border border-[#B12025]/15 bg-[#fff9f9]"
              >
                <h3>
                  <button
                    type="button"
                    aria-expanded={
                      faqOpen === index
                    }
                    aria-controls={`wu-faq-${index}`}
                    onClick={() =>
                      setFaqOpen(
                        faqOpen === index
                          ? null
                          : index
                      )
                    }
                    className="flex w-full items-center justify-between gap-4 p-6 text-left text-[14px] font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#B12025]"
                  >
                    <span>{faq.q}</span>

                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-[#B12025] transition-transform ${
                        faqOpen === index
                          ? 'rotate-180'
                          : ''
                      }`}
                    />
                  </button>
                </h3>

                <div
                  id={`wu-faq-${index}`}
                  className={`grid transition-[grid-template-rows] duration-300 ${
                    faqOpen === index
                      ? 'grid-rows-[1fr]'
                      : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <p className="border-t border-[#B12025]/10 px-6 pb-6 pt-4 text-[13px] leading-7 text-[#17191C]/70">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ==============================================
          CAREERS CONTACT
      ============================================== */}

      <section
        id="careers-contact"
        className="bg-[#fff9f9] px-5 py-[100px] sm:px-8 lg:px-14 lg:py-[130px]"
      >
        <div className="mx-auto max-w-[1400px] rounded-[30px] border border-[#B12025]/15 bg-white p-8 sm:p-12 lg:p-16">
          <p
            data-wu-in
            className={`${labelClass} text-[#B12025]`}
          >
            CONTACT OUR CAREERS TEAM
          </p>

          <h2
            className={`${titleClass} mt-5 max-w-[1040px]`}
          >
            <ScrollWords
              text="Your application starts with an email."
            />
          </h2>

          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            <div>
              <Mail
                size={22}
                className="text-[#B12025]"
              />

              <p className="mt-4 text-[12px] font-semibold">
                Careers email
              </p>

              <a
                href={mailto()}
                className="mt-2 block break-all text-[14px] text-[#B12025] underline"
              >
                {CAREERS_EMAIL}
              </a>
            </div>

            <div>
              <MapPin
                size={22}
                className="text-[#B12025]"
              />

              <p className="mt-4 text-[12px] font-semibold">
                Office
              </p>

              <p className="mt-2 text-[13px] leading-7 text-[#17191C]/65">
                No 1A, 1/1 R A De Mel Mawatha
                {' '}
                Colombo 4, Sri Lanka
              </p>
            </div>

            <div>
              <Clock3
                size={22}
                className="text-[#B12025]"
              />

              <p className="mt-4 text-[12px] font-semibold">
                Office hours
              </p>

              <p className="mt-2 text-[13px] leading-7 text-[#17191C]/65">
                Monday to Friday,
                10am–7pm, Sri Lanka time
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-[#B12025]/15 pt-8">
            <a
              href={mailto()}
              className="inline-flex items-center gap-2 rounded-full bg-[#B12025] px-6 py-4 text-[12px] font-semibold text-white"
            >
              Send your CV
              <ArrowUpRight size={17} />
            </a>

            <Link
              href="/#contact"
              className="text-[12px] font-semibold text-[#B12025] underline"
            >
              Hiring a team for your business?
              Book a discovery call
            </Link>
          </div>
        </div>
      </section>

      {/* ==============================================
          FOOTER
      ============================================== */}

      <footer className="bg-[#17191C] px-5 pb-8 pt-[70px] text-white sm:px-8 lg:px-14">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-wrap justify-between gap-10">
            <div>
              <p className="text-[clamp(2.6rem,6vw,6rem)] font-semibold leading-none tracking-[-.075em]">
                FirstNotch.
              </p>

              <p className="mt-5 text-[13px] text-white/70">
                A BPO company in Colombo, Sri Lanka.
              </p>
            </div>

            <div className="flex flex-wrap gap-7 text-[12px] font-semibold">
              <Link
                href="/"
                className="hover:underline"
              >
                Home
              </Link>

              <Link
                href="/how-we-hire"
                className="hover:underline"
              >
                How we hire
              </Link>

              <a
                href="#roles"
                className="hover:underline"
              >
                Open roles
              </a>

              <a
                href="#apply"
                className="hover:underline"
              >
                How to apply
              </a>
            </div>
          </div>

          <div className="mt-16 flex flex-wrap justify-between gap-4 border-t border-white/20 pt-6 text-[11px] text-white/60">
            <span>
              © 2026 FirstNotch Solutions
              (Pvt) Ltd. All rights reserved.
            </span>

            <a
              href="#wu-top"
              className="hover:text-white"
            >
              Back to top ↑
            </a>
          </div>
        </div>
      </footer>

      {/* ==============================================
          JOB DETAILS DRAWER
      ============================================== */}

      {selectedRole && (
        <div
          className="fixed inset-0 z-[160] flex justify-end"
          role="presentation"
        >
          <button
            type="button"
            aria-label="Close job details"
            onClick={closeRole}
            className="absolute inset-0 cursor-default bg-[#17191C]/65"
          />

          <aside
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="wu-drawer-title"
            className="relative z-10 flex h-full w-full max-w-[570px] flex-col overflow-y-auto bg-white p-7 text-[#17191C] shadow-2xl sm:p-11"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={closeRole}
              aria-label="Close job details"
              className="ml-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#fff0f0] text-[#B12025]"
            >
              <X size={23} />
            </button>

            <p className="mt-9 text-[11px] font-semibold uppercase tracking-[.18em] text-[#B12025]">
              {selectedRole.category} / COLOMBO OFFICE
            </p>

            <h2
              id="wu-drawer-title"
              className="mt-5 text-[clamp(2.35rem,4.2vw,4.5rem)] font-semibold leading-[1.11] tracking-[-.06em]"
            >
              {selectedRole.title}
            </h2>

            <p className="mt-5 text-[14px] leading-8 text-[#17191C]/70">
              {selectedRole.summary}
            </p>

            <div className="mt-8 border-y border-[#B12025]/15 py-6">
              <p className="text-[13px] font-semibold">
                Full time · Colombo office · Office based
              </p>

              <p className="mt-4 text-[13px] leading-7 text-[#17191C]/65">
                Detailed requirements are to be
                confirmed by FirstNotch HR.
                Good English is needed for
                every role; additional languages
                depend on the account.
              </p>
            </div>

            <p className="mt-6 text-[13px] leading-7 text-[#17191C]/65">
              Send your CV by email with the job
              title in the subject line. Attach
              your CV in your email application
              before sending.
            </p>

            <a
              href={mailto(selectedRole.title)}
              className="mt-9 inline-flex min-h-[54px] items-center justify-center gap-3 rounded-full bg-[#B12025] px-7 text-[13px] font-semibold text-white"
            >
              Apply by email
              <ArrowUpRight size={18} />
            </a>

            <p className="mt-5 text-[11px] text-[#17191C]/55">
              Email is not sent automatically.
              Your email application will open.
            </p>
          </aside>
        </div>
      )}
    </div>
  );
}
