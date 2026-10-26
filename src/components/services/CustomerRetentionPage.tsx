
'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  CalendarCheck2,
  Check,
  ChevronDown,
  ClipboardCheck,
  Clock3,
  Gift,
  Heart,
  HeartHandshake,
  Pause,
  PhoneCall,
  RefreshCw,
  RotateCcw,
  ShieldCheck,
  Tag,
} from 'lucide-react';

// ======================================================
// FIRSTNOTCH — CUSTOMER RETENTION
// Brand: #B12025 / #FFFFFF
// GSAP horizontal cards + text reveals
// ======================================================

const ROOT = '/services/customer-support-outsourcing';

const QUOTE =
  'Members who want to cancel now talk to someone who listens and offers a pause instead. Many of them come back after the break.';

// ======================================================
// DATA
// ======================================================

const lifecycle = [
  {
    title: 'Welcome call',
    timing: 'Within the first two weeks',
    description:
      'New customers get a call to check they are set up and using what they bought.',
    Icon: PhoneCall,
  },
  {
    title: 'Regular check-in',
    timing: 'On a schedule you set',
    description:
      'Agents check in with long-standing customers, including when usage falls or a renewal is missed.',
    Icon: Clock3,
  },
  {
    title: 'Cancel request',
    timing: 'Handled without pressure',
    description:
      'An experienced agent listens, offers only agreed options and cancels straight away if the customer still wants to leave.',
    Icon: Pause,
  },
  {
    title: 'Win-back call',
    timing: 'After a period you choose',
    description:
      'Former customers hear an offer or update you have approved.',
    Icon: RotateCcw,
  },
  {
    title: 'Loyalty support',
    timing: 'When members need help',
    description:
      'Members get help with points and rewards by phone, email or chat.',
    Icon: Gift,
  },
] as const;

const features = [
  {
    title: 'Welcome calls',
    body:
      'New customers get a call within their first two weeks to check they are set up and using what they bought.',
    Icon: PhoneCall,
  },
  {
    title: 'Regular check-ins',
    body:
      'Long-standing customers are contacted on a schedule you set, or when your system shows a warning sign, such as falling usage or a missed renewal.',
    Icon: Clock3,
  },
  {
    title: 'Requests to cancel',
    body:
      'These calls go to agents with at least six months on your account. Customers who still want to leave are cancelled straight away, without pressure.',
    Icon: HeartHandshake,
  },
  {
    title: 'Offers agreed with you',
    body:
      'Any offer, such as a pause or a discount, is agreed with you before the program starts. Agents cannot add their own. Requests outside that list are passed to your team.',
    Icon: ShieldCheck,
  },
  {
    title: 'Win-back calls',
    body:
      'Customers who stopped buying are contacted after a set period with an offer or update you choose.',
    Icon: RefreshCw,
  },
  {
    title: 'Loyalty program support',
    body:
      'Members get help with points and rewards by phone, email or chat.',
    Icon: Gift,
  },
  {
    title: 'Reason tracking',
    body:
      'Each request is tagged with a reason, so you can see which ones come up most.',
    Icon: Tag,
  },
  {
    title: 'Scored retention calls',
    body:
      'Reviewers score each call, including whether only agreed offers were used. Each agent then reviews these scores with a coach once a month.',
    Icon: ClipboardCheck,
  },
] as const;

const metrics = [
  {
    title: 'Save rate',
    body:
      'The share of customers who asked to cancel and were still active a month later.',
    note: 'Shown for each agent.',
    Icon: Heart,
  },
  {
    title: 'Win-back rate',
    body:
      'The share of lapsed customers who bought again after a call.',
    note: 'Tracked for each campaign.',
    Icon: RotateCcw,
  },
  {
    title: 'Renewal rate',
    body:
      'The share of customers who renewed when their plan or membership was due.',
    note: 'Compared with your figures before the program.',
    Icon: CalendarCheck2,
  },
  {
    title: 'Most common reasons',
    body:
      'The reasons customers give most often, ranked.',
    note: 'Shared with your product and service teams.',
    Icon: Tag,
  },
  {
    title: 'Offers used',
    body:
      'How often each agreed offer was used, and how many customers stayed after it.',
    note: 'Helps you decide which offers to keep.',
    Icon: Gift,
  },
] as const;

const setup = [
  {
    title: 'Learning your business',
    body:
      'The team studies your products, policies, tone of voice and the questions customers ask most.',
  },
  {
    title: 'Hiring and training',
    body:
      'Agents take language tests, technical assessments and reference checks. Only 15 to 20% of job applicants pass. Each one is then trained on your scripts and systems before speaking to a customer.',
  },
  {
    title: 'Going live with quality checks',
    body:
      'Each call and task gets a quality score. Attendance is tracked, and every agent has a monthly performance review with coaching.',
  },
  {
    title: 'Reporting and improving',
    body:
      'You get a monthly report on response times, quality scores and the issues customers raise most, plus a call to agree what to improve.',
  },
] as const;

const faqs = [
  {
    q: 'How is this different from outbound call support?',
    a:
      'Outbound call support runs campaigns with an end date, such as surveys or reminders. Customer retention is an ongoing program. The same agents stay on it, so they get to know your customers over time.',
  },
  {
    q: 'Who decides which offers agents can make?',
    a:
      'You do. The list of offers is agreed during setup, and it only changes with your approval. Options that cost nothing, such as a pause or a plan change, are usually tried first.',
  },
  {
    q: 'Which customers should we start with?',
    a:
      'Most clients begin with one group, such as new customers in their first few weeks or members whose renewal is due. More groups are added once the first one shows results.',
  },
  {
    q: 'Do we need a loyalty program already?',
    a:
      'No. The team can work with the rewards you have now. If you have none, FirstNotch can help you plan simple rewards and the messages that go with them.',
  },
  {
    q: 'Which customer data does the team need?',
    a:
      'Contact details, purchase or plan history and notes on past issues. Access is through your own CRM, so the data stays in your systems.',
  },
  {
    q: 'How is a retention program priced?',
    a:
      'Cost depends on how many customers are in the program and how often each one is contacted. Most programs are priced per agent each month. The discovery call is followed by a written quote.',
  },
] as const;

const related = [
  {
    title: 'Inbound call support',
    href: `${ROOT}/inbound-call-support`,
  },
  {
    title: 'Outbound call support',
    href: `${ROOT}/outbound-call-support`,
  },
  {
    title: 'Customer service',
    href: `${ROOT}/customer-service`,
  },
  {
    title: 'Complaint and query handling',
    href: `${ROOT}/complaint-query-handling`,
  },
] as const;

const audienceOptions = [
  {
    label: 'New customers',
    description:
      'Start with a welcome call during the first two weeks.',
  },
  {
    label: 'Renewals due',
    description:
      'Check in before a plan or membership is due for renewal.',
  },
  {
    label: 'Lapsed customers',
    description:
      'Contact former customers after a period you choose.',
  },
] as const;

const approvedOfferNames = [
  'Pause',
  'Plan change',
  'Discount',
] as const;

// ======================================================
// ANIMATED HEADING WORDS
// ======================================================

function WordTitle({ text }: { text: string }) {
  return (
    <span role="text" aria-label={text}>
      {text.split(/\s+/).map((word, index) => (
        <span
          key={`${index}-${word}`}
          aria-hidden="true"
        >
          {index > 0 ? ' ' : null}

          <span className="inline-block overflow-hidden pb-[.13em] -mb-[.13em] align-bottom">
            <span
              data-ret-word
              className="inline-block"
            >
              {word}
            </span>
          </span>
        </span>
      ))}
    </span>
  );
}

// ======================================================
// FITNESS CLUB QUOTE
// SCROLL-LINKED TEXT REVEAL + SHADOW
// ======================================================

function FitnessQuote() {
  const quoteRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!quoteRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const media = gsap.matchMedia();

    media.add(
      '(prefers-reduced-motion: no-preference)',
      () => {
        const node = quoteRef.current;
        if (!node) return;

        const tween = gsap.fromTo(
          node.querySelectorAll(
            '[data-ret-quote-word]'
          ),
          {
            opacity: 0.2,
            textShadow:
              '0 0 0 rgba(75,0,0,0)',
          },
          {
            opacity: 1,
            textShadow:
              '0 4px 12px rgba(75,0,0,.3)',
            stagger: 0.1,
            ease: 'none',

            scrollTrigger: {
              trigger: node,
              start: 'top 85%',
              end: 'bottom 45%',
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      }
    );

    return () => media.revert();
  }, []);

  return (
    <section
      aria-label="Fitness club chain testimonial"
      className="bg-[#B12025] px-5 py-[105px] text-white sm:px-8 lg:px-12 lg:py-[145px]"
    >
      <div className="mx-auto grid max-w-[1350px] gap-10 lg:grid-cols-[.23fr_.77fr]">
        <div className="flex flex-col items-start gap-5">
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/35">
            <Pause
              size={28}
              fill="currentColor"
            />
          </span>

          <span className="text-[11px] font-semibold uppercase tracking-[.22em] text-white/80">
            Fitness club chain
          </span>
        </div>

        <div>
          <blockquote>
            <p
              ref={quoteRef}
              role="text"
              aria-label={QUOTE}
              className="max-w-[1050px] text-[clamp(1.9rem,3.6vw,4.2rem)] font-semibold leading-[1.43] tracking-[-.052em]"
            >
              <span aria-hidden="true">“</span>

              {QUOTE.split(/\s+/).map(
                (word, index) => (
                  <span
                    key={index}
                    data-ret-quote-word
                    aria-hidden="true"
                    className="inline-block"
                  >
                    {word}
                    {'\u00A0'}
                  </span>
                )
              )}

              <span aria-hidden="true">”</span>
            </p>
          </blockquote>

          <p className="mt-9 inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-[11px] font-semibold">
            <RefreshCw size={14} />
            Pause → Welcome back
          </p>
        </div>
      </div>
    </section>
  );
}

// ======================================================
// SHARED TEXT STYLES
// ======================================================

const smallLabel =
  'text-[11px] font-semibold uppercase tracking-[.21em] text-[#B12025]';

const sectionHeading =
  'text-[clamp(2.6rem,4.9vw,5.5rem)] font-semibold leading-[1.075] tracking-[-.06em] text-[#17191C]';

// ======================================================
// MAIN COMPONENT
// ======================================================

export default function CustomerRetentionPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  const featuresRef = useRef<HTMLElement>(null);
  const featureTrackRef =
    useRef<HTMLDivElement>(null);

  const setupRef = useRef<HTMLElement>(null);
  const setupTrackRef =
    useRef<HTMLDivElement>(null);

  const [stage, setStage] = useState(0);

  const [approved, setApproved] =
    useState<boolean[]>([
      true,
      true,
      false,
    ]);

  const [signal, setSignal] =
    useState('Falling usage');

  const [featureProgress, setFeatureProgress] =
    useState(0);

  const [setupProgress, setSetupProgress] =
    useState(0);

  const [selectedAudience, setSelectedAudience] =
    useState(0);

  const [viewComparison, setViewComparison] =
    useState<'before' | 'with'>('before');

  const [openFaq, setOpenFaq] =
    useState<number | null>(0);

  const [plannerStep, setPlannerStep] =
    useState(0);

  const [startDate, setStartDate] =
    useState('Within the next month');

  const chosenStage = lifecycle[stage];
  const ChosenStageIcon = chosenStage.Icon;

  const allowedOffers = approvedOfferNames.filter(
    (_, index) => approved[index]
  );

  // ====================================================
  // PREFILL EXISTING CONTACT FORM
  // ====================================================

  const jumpToContact = () => {
    const service =
      document.querySelector<HTMLSelectElement>(
        '#contact select[name="service"]'
      );

    if (service) {
      service.value = 'Customer support';

      service.dispatchEvent(
        new Event('change', {
          bubbles: true,
        })
      );
    }

    const start =
      document.querySelector<HTMLSelectElement>(
        '#contact select[name="start"]'
      );

    if (start) {
      start.value = startDate;

      start.dispatchEvent(
        new Event('change', {
          bubbles: true,
        })
      );
    }

    const message =
      document.querySelector<HTMLTextAreaElement>(
        '#contact textarea[name="message"]'
      );

    if (message) {
      message.value =
        `Customer retention enquiry. ` +
        `Start with: ${audienceOptions[selectedAudience].label}. ` +
        `Planned start: ${startDate}. ` +
        `Please contact me about setting up a retention program.`;

      message.dispatchEvent(
        new Event('input', {
          bubbles: true,
        })
      );
    }

    document
      .getElementById('contact')
      ?.scrollIntoView({
        behavior: window.matchMedia(
          '(prefers-reduced-motion: reduce)'
        ).matches
          ? 'auto'
          : 'smooth',
        block: 'start',
      });
  };

  // ====================================================
  // GSAP SCROLL ANIMATIONS
  // ====================================================

  useEffect(() => {
    if (!pageRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const media = gsap.matchMedia();

    // TEXT REVEAL ANIMATIONS

    media.add(
      '(prefers-reduced-motion: no-preference)',
      () => {
        const scope = pageRef.current;
        if (!scope) return;

        const context = gsap.context(() => {
          scope
            .querySelectorAll<HTMLElement>(
              '[data-ret-reveal]'
            )
            .forEach((element) => {
              gsap.fromTo(
                element,
                {
                  autoAlpha: 0,
                  y: 30,
                },
                {
                  autoAlpha: 1,
                  y: 0,
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

          // HEADING WORD-BY-WORD REVEALS

          scope
            .querySelectorAll<HTMLElement>(
              '[data-ret-title]'
            )
            .forEach((title) => {
              const words =
                title.querySelectorAll(
                  '[data-ret-word]'
                );

              if (!words.length) return;

              gsap.fromTo(
                words,
                {
                  yPercent: 108,
                  autoAlpha: 0,
                },
                {
                  yPercent: 0,
                  autoAlpha: 1,
                  duration: 0.88,
                  stagger: 0.044,
                  ease: 'power3.out',

                  scrollTrigger: {
                    trigger: title,
                    start: 'top 91%',
                    once: true,
                  },
                }
              );
            });

          // CUSTOMER LIFELINE DRAW

          scope
            .querySelectorAll<HTMLElement>(
              '[data-ret-line]'
            )
            .forEach((line) => {
              gsap.fromTo(
                line,
                {
                  scaleX: 0,
                },
                {
                  scaleX: 1,
                  duration: 1.4,
                  transformOrigin:
                    'left center',
                  ease: 'power3.out',

                  scrollTrigger: {
                    trigger: line,
                    start: 'top 85%',
                    once: true,
                  },
                }
              );
            });
        }, scope);

        return () => context.revert();
      }
    );

    // GSAP PINNED HORIZONTAL SCROLLING

    media.add(
      '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
      () => {
        const sequences = [
          {
            section: featuresRef.current,
            track: featureTrackRef.current,
            onProgress: setFeatureProgress,
          },
          {
            section: setupRef.current,
            track: setupTrackRef.current,
            onProgress: setSetupProgress,
          },
        ];

        const animations: gsap.core.Tween[] = [];

        sequences.forEach(
          ({ section, track, onProgress }) => {
            if (!section || !track) return;

            const travel = () =>
              Math.max(
                0,
                track.scrollWidth -
                  section.clientWidth
              );

            if (travel() <= 1) return;

            const tween = gsap.to(track, {
              x: () => -travel(),
              ease: 'none',

              scrollTrigger: {
                trigger: section,
                start: 'top top+=96',

                end: () =>
                  `+=${Math.max(1, travel())}`,

                pin: true,
                pinSpacing: true,
                scrub: 0.9,
                anticipatePin: 1,
                invalidateOnRefresh: true,

                onUpdate: (self) => {
                  onProgress(self.progress);
                },
              },
            });

            animations.push(tween);

            // ANIMATE TEXT AS CARDS ENTER

            track
              .querySelectorAll<HTMLElement>(
                '[data-ret-card]'
              )
              .forEach((card, index) => {
                const parts =
                  card.querySelectorAll(
                    '[data-ret-card-text]'
                  );

                const animation = gsap.fromTo(
                  parts,
                  {
                    y: 24,
                    autoAlpha: 0,
                  },
                  {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.72,
                    stagger: 0.1,
                    ease: 'power3.out',

                    scrollTrigger:
                      index === 0
                        ? {
                            trigger: section,
                            start: 'top 78%',
                            once: true,
                          }
                        : {
                            trigger: card,
                            containerAnimation: tween,
                            start: 'left 85%',
                            once: true,
                          },
                  }
                );

                animations.push(animation);
              });
          }
        );

        return () => {
          animations.forEach((animation) => {
            animation.scrollTrigger?.kill();
            animation.kill();
          });
        };
      }
    );

    let alive = true;

    document.fonts?.ready.then(() => {
      if (alive) {
        ScrollTrigger.refresh();
      }
    });

    const refresh = () =>
      ScrollTrigger.refresh();

    window.addEventListener('load', refresh, {
      once: true,
    });

    return () => {
      alive = false;

      window.removeEventListener(
        'load',
        refresh
      );

      media.revert();
    };
  }, []);

  // ====================================================
  // JSX
  // ====================================================

  return (
    <div
      ref={pageRef}
      className="overflow-x-clip bg-white font-sans text-[#17191C]"
    >
      {/* ================================================
          HERO
      ================================================ */}

      <section
        id="retention-hero"
        className="relative overflow-hidden bg-white px-5 pb-[100px] pt-[150px] sm:px-8 lg:px-12 lg:pt-[185px]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-[120px] top-12 h-[440px] w-[440px] rounded-full border border-[#B12025]/10"
        />

        <div className="relative mx-auto grid max-w-[1450px] items-center gap-12 lg:grid-cols-[1fr_.98fr] lg:gap-16">
          <div>
            <p
              data-ret-reveal
              className={smallLabel}
            >
              Customer retention services in Sri Lanka
            </p>

            <h1
              data-ret-title
              className="mt-6 max-w-[810px] text-[clamp(3rem,5.3vw,6.5rem)] font-semibold leading-[1.06] tracking-[-.07em]"
            >
              <WordTitle
                text="Keep more of your customers,"
              />{' '}

              <span className="text-[#B12025]">
                <WordTitle
                  text="with planned contact"
                />
              </span>{' '}

              <WordTitle
                text="from a team that knows your products."
              />
            </h1>

            <p
              data-ret-reveal
              className="mt-8 max-w-[650px] text-[15px] leading-[1.95] text-[#17191C]/70 sm:text-[16px]"
            >
              FirstNotch runs your customer retention
              program from Colombo. Agents check in
              with new and long-standing customers on
              a schedule you approve. When someone
              asks to cancel, a trained agent finds
              out why and offers the options agreed
              with you.
            </p>

            <div
              data-ret-reveal
              className="mt-9 flex flex-wrap gap-3"
            >
              <a
                href="#contact"
                className="inline-flex min-h-[52px] items-center gap-3 rounded-full bg-[#B12025] px-6 text-[12px] font-semibold text-white transition hover:bg-[#981a20]"
              >
                Book a free discovery call
                <ArrowUpRight size={17} />
              </a>

              <a
                href="#included"
                className="inline-flex min-h-[52px] items-center gap-3 rounded-full border border-[#B12025]/30 px-6 text-[12px] font-semibold text-[#B12025] transition hover:bg-[#fff3f3]"
              >
                See what is included
                <ArrowDownRight size={17} />
              </a>
            </div>
          </div>

          {/* CONTINUOUS CUSTOMER LIFELINE */}

          <div
            data-ret-reveal
            className="relative overflow-hidden rounded-[35px] bg-[#B12025] p-6 text-white shadow-[0_32px_70px_rgba(177,32,37,.12)] sm:p-9"
          >
            <div className="flex items-center justify-between gap-4 border-b border-white/20 pb-5">
              <span className="text-[11px] font-semibold uppercase tracking-[.2em] text-white/80">
                The customer lifeline
              </span>

              <Heart
                size={22}
                strokeWidth={1.5}
              />
            </div>

            <div className="relative mt-10 flex min-h-[185px] items-center justify-center overflow-hidden">
              <svg
                viewBox="0 0 500 185"
                className="w-full"
                role="img"
                aria-label="A continuous relationship line joining five customer lifecycle stages"
              >
                <path
                  d="M 20 92 C 105 92 105 92 155 92 S 240 92 250 92 S 375 92 480 92"
                  fill="none"
                  stroke="white"
                  strokeOpacity=".2"
                  strokeWidth="5"
                  strokeLinecap="round"
                />

                <path
                  data-ret-line
                  d="M 20 92 C 105 92 105 92 155 92 S 240 92 250 92 S 375 92 480 92"
                  fill="none"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                />

                {[44, 146, 250, 354, 456].map(
                  (x, index) => (
                    <g key={index}>
                      <circle
                        cx={x}
                        cy="92"
                        r={index === stage ? 13 : 9}
                        fill={
                          index === stage
                            ? 'white'
                            : '#B12025'
                        }
                        stroke="white"
                        strokeWidth="3"
                      />

                      <text
                        x={x}
                        y={
                          index % 2 === 0
                            ? 65
                            : 126
                        }
                        fontSize="13"
                        textAnchor="middle"
                        fill="white"
                        fontWeight={
                          index === stage
                            ? '700'
                            : '400'
                        }
                      >
                        {`0${index + 1}`}
                      </text>
                    </g>
                  )
                )}
              </svg>
            </div>

            {/* ACTIVE LIFECYCLE CARD */}

            <div className="rounded-[24px] bg-white p-6 text-[#17191C]">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-[.15em] text-[#B12025]">
                  Stage 0{stage + 1} / 05
                </span>

                <ChosenStageIcon
                  size={23}
                  className="text-[#B12025]"
                />
              </div>

              <h2 className="mt-4 text-[24px] font-semibold tracking-[-.04em]">
                {chosenStage.title}
              </h2>

              <p className="mt-2 text-[12px] font-semibold text-[#B12025]">
                {chosenStage.timing}
              </p>

              <p className="mt-3 min-h-[75px] text-[12px] leading-7 text-[#17191C]/65">
                {chosenStage.description}
              </p>
            </div>

            <div
              className="mt-5 grid grid-cols-5 gap-2"
              role="group"
              aria-label="Customer lifecycle stages"
            >
              {lifecycle.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setStage(index)}
                  aria-pressed={stage === index}
                  aria-label={item.title}
                  className={`min-h-[37px] rounded-full border text-[11px] font-semibold transition ${
                    stage === index
                      ? 'border-white bg-white text-[#B12025]'
                      : 'border-white/35 bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  0{index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================
          CUSTOMER LIFECYCLE TABS
      ================================================ */}

      <section className="bg-[#fff8f8] px-5 py-[90px] sm:px-8 lg:px-12 lg:py-[115px]">
        <div className="mx-auto max-w-[1350px]">
          <p
            data-ret-reveal
            className={smallLabel}
          >
            An ongoing program
          </p>

          <h2
            data-ret-title
            className={`mt-5 max-w-[900px] ${sectionHeading}`}
          >
            <WordTitle
              text="Stay close to customers at every stage."
            />
          </h2>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {lifecycle.map(
              ({ title, timing, Icon }, index) => (
                <button
                  key={title}
                  type="button"
                  aria-pressed={stage === index}
                  onClick={() => {
                    setStage(index);

                    document
                      .getElementById(
                        'retention-hero'
                      )
                      ?.scrollIntoView({
                        behavior: 'smooth',
                      });
                  }}
                  className={`flex min-h-[180px] flex-col items-start rounded-[23px] border p-6 text-left transition ${
                    stage === index
                      ? 'border-[#B12025] bg-[#B12025] text-white'
                      : 'border-[#B12025]/15 bg-white text-[#17191C] hover:border-[#B12025]/60'
                  }`}
                >
                  <Icon
                    size={23}
                    className={
                      stage === index
                        ? 'text-white'
                        : 'text-[#B12025]'
                    }
                  />

                  <span className="mt-auto pt-5 text-[17px] font-semibold">
                    {title}
                  </span>

                  <span
                    className={`mt-2 text-[11px] leading-5 ${
                      stage === index
                        ? 'text-white/75'
                        : 'text-[#17191C]/55'
                    }`}
                  >
                    {timing}
                  </span>
                </button>
              )
            )}
          </div>
        </div>
      </section>

      {/* ================================================
          8 FEATURES — GSAP HORIZONTAL SCROLL
      ================================================ */}

      <section
        ref={featuresRef}
        id="included"
        className="relative scroll-mt-[112px] bg-white py-[80px] lg:flex lg:min-h-[730px] lg:flex-col lg:justify-center lg:py-[85px]"
      >
        <div className="mx-auto w-full max-w-[1450px] px-5 sm:px-8 lg:px-12">
          <p
            data-ret-reveal
            className={smallLabel}
          >
            What the retention program includes
          </p>

          <h2
            data-ret-title
            className={`mt-4 max-w-[990px] ${sectionHeading}`}
          >
            <WordTitle
              text="Every conversation has a reason to matter."
            />
          </h2>

          <p className="mt-4 text-[12px] font-medium text-[#B12025]">
            Eight parts of one ongoing retention program
          </p>
        </div>

        <div className="mt-10 w-full overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:overflow-visible">
          <div
            ref={featureTrackRef}
            className="flex w-max gap-4 pl-5 pr-5 sm:pl-8 sm:pr-8 lg:gap-5 lg:pl-12 lg:pr-12"
          >
            {features.map(
              ({ title, body, Icon }, index) => {
                const red =
                  index === 0 ||
                  index === 3 ||
                  index === 7;

                return (
                  <article
                    key={title}
                    data-ret-card
                    className={`group flex min-h-[405px] w-[min(85vw,395px)] shrink-0 flex-col rounded-[30px] border p-8 sm:w-[430px] lg:min-h-[435px] lg:w-[455px] lg:p-9 ${
                      red
                        ? 'border-[#B12025] bg-[#B12025] text-white'
                        : 'border-[#B12025]/15 bg-[#fff9f9] text-[#17191C]'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <span
                        className={`flex h-14 w-14 items-center justify-center rounded-[18px] ${
                          red
                            ? 'bg-white/20'
                            : 'bg-white text-[#B12025]'
                        }`}
                      >
                        <Icon
                          size={26}
                          strokeWidth={1.5}
                          className="transition-transform duration-300 group-hover:scale-110"
                        />
                      </span>

                      <span
                        className={`text-[13px] font-bold ${
                          red
                            ? 'text-white/70'
                            : 'text-[#B12025]'
                        }`}
                      >
                        0{index + 1}
                      </span>
                    </div>

                    <div className="mt-auto pt-10">
                      <h3
                        data-ret-card-text
                        className="max-w-[350px] text-[27px] font-semibold leading-[1.2] tracking-[-.045em]"
                      >
                        {title}
                      </h3>

                      <p
                        data-ret-card-text
                        className={`mt-5 text-[13px] leading-[1.85] ${
                          red
                            ? 'text-white/85'
                            : 'text-[#17191C]/65'
                        }`}
                      >
                        {body}
                      </p>
                    </div>
                  </article>
                );
              }
            )}
          </div>
        </div>

        <div className="mx-auto mt-8 w-full max-w-[1450px] px-5 sm:px-8 lg:px-12">
          <div className="hidden h-[3px] bg-[#B12025]/10 lg:block">
            <div
              className="h-full bg-[#B12025]"
              style={{
                width: `${Math.max(
                  2,
                  featureProgress * 100
                )}%`,
              }}
            />
          </div>

          <p className="text-[11px] text-[#B12025] lg:hidden">
            Swipe sideways to explore all eight services →
          </p>
        </div>
      </section>

      {/* ================================================
          WARNING SIGNS + APPROVED OFFERS
      ================================================ */}

      <section className="bg-[#fff8f8] px-5 py-[100px] sm:px-8 lg:px-12 lg:py-[125px]">
        <div className="mx-auto max-w-[1350px]">
          <p
            data-ret-reveal
            className={smallLabel}
          >
            A program you control
          </p>

          <h2
            data-ret-title
            className={`mt-5 max-w-[900px] ${sectionHeading}`}
          >
            <WordTitle
              text="Offer the right option. Respect the decision."
            />
          </h2>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {/* WARNING SIGNALS */}

            <article
              data-ret-reveal
              className="rounded-[28px] border border-[#B12025]/15 bg-white p-7 sm:p-8"
            >
              <div className="flex justify-between gap-4">
                <span className="text-[11px] font-semibold uppercase tracking-[.17em] text-[#B12025]">
                  Warning signs
                </span>

                <Clock3
                  size={21}
                  className="text-[#B12025]"
                />
              </div>

              <h3 className="mt-5 text-[24px] font-semibold">
                Know when to check in.
              </h3>

              <p className="mt-3 text-[12px] leading-7 text-[#17191C]/65">
                Your system can flag a warning sign
                before a customer leaves.
              </p>

              <div
                role="group"
                aria-label="Example warning signal"
                className="mt-7 space-y-2"
              >
                {[
                  'Falling usage',
                  'Missed renewal',
                ].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() =>
                      setSignal(item)
                    }
                    aria-pressed={
                      signal === item
                    }
                    className={`flex w-full items-center justify-between rounded-[15px] border px-4 py-3 text-left text-[12px] font-semibold ${
                      signal === item
                        ? 'border-[#B12025] bg-[#fff2f2] text-[#B12025]'
                        : 'border-[#B12025]/15'
                    }`}
                  >
                    {item}

                    {signal === item && (
                      <Check size={15} />
                    )}
                  </button>
                ))}
              </div>

              <div className="mt-6 rounded-[16px] bg-[#B12025] p-4 text-white">
                <p className="text-[11px] font-semibold">
                  {signal}
                </p>

                <p className="mt-1 text-[12px] text-white/85">
                  Check-in call planned on your
                  agreed schedule
                </p>
              </div>

              <p className="mt-3 text-[10px] text-[#17191C]/45">
                Illustrative workflow — not live CRM signals.
              </p>
            </article>

            {/* APPROVED OFFER CONTROL */}

            <article
              data-ret-reveal
              className="rounded-[28px] border border-[#B12025]/15 bg-white p-7 sm:p-8"
            >
              <div className="flex justify-between gap-4">
                <span className="text-[11px] font-semibold uppercase tracking-[.17em] text-[#B12025]">
                  Approved by you
                </span>

                <ShieldCheck
                  size={21}
                  className="text-[#B12025]"
                />
              </div>

              <h3 className="mt-5 text-[24px] font-semibold">
                No unauthorised offers.
              </h3>

              <p className="mt-3 text-[12px] leading-7 text-[#17191C]/65">
                Turn example offers on or off to
                preview an agreed offer list.
              </p>

              <div className="mt-6 space-y-2">
                {approvedOfferNames.map(
                  (name, index) => (
                    <button
                      key={name}
                      type="button"
                      role="switch"
                      aria-checked={
                        approved[index]
                      }
                      onClick={() =>
                        setApproved((prev) =>
                          prev.map((value, i) =>
                            i === index
                              ? !value
                              : value
                          )
                        )
                      }
                      className="flex w-full items-center justify-between rounded-[15px] border border-[#B12025]/15 px-4 py-3 text-left text-[12px] font-semibold"
                    >
                      {name}

                      <span
                        className={`relative h-[24px] w-[43px] rounded-full transition-colors ${
                          approved[index]
                            ? 'bg-[#B12025]'
                            : 'bg-[#B12025]/15'
                        }`}
                      >
                        <span
                          className={`absolute top-[4px] h-[16px] w-[16px] rounded-full bg-white transition-transform ${
                            approved[index]
                              ? 'translate-x-[23px]'
                              : 'translate-x-[4px]'
                          }`}
                        />
                      </span>
                    </button>
                  )
                )}
              </div>

              <div
                aria-live="polite"
                className="mt-6 rounded-[16px] bg-[#fff4f4] p-4"
              >
                <p className="text-[11px] font-semibold text-[#B12025]">
                  Sample permitted options
                </p>

                <p className="mt-2 text-[12px] leading-6 text-[#17191C]">
                  {allowedOffers.length
                    ? allowedOffers.join(' · ')
                    : 'No offers selected — refer the request to your team.'}
                </p>
              </div>

              <p className="mt-3 text-[10px] text-[#17191C]/45">
                Preview only. Actual offers require
                your approval during setup.
              </p>
            </article>

            {/* NO-PRESSURE CANCELLATION */}

            <article
              data-ret-reveal
              className="rounded-[28px] bg-[#B12025] p-7 text-white sm:p-8"
            >
              <div className="flex justify-between gap-4">
                <span className="text-[11px] font-semibold uppercase tracking-[.17em] text-white/80">
                  Requests to cancel
                </span>

                <HeartHandshake size={21} />
              </div>

              <h3 className="mt-5 text-[24px] font-semibold">
                Listen first. No pressure.
              </h3>

              <p className="mt-3 text-[12px] leading-7 text-white/85">
                Cancellation calls go to agents
                with at least six months on your
                account.
              </p>

              <div className="mt-6 space-y-3 text-[12px]">
                <div className="rounded-[15px] bg-white/15 p-4">
                  01. Customer asks to cancel
                </div>

                <div className="rounded-[15px] bg-white/15 p-4">
                  02. Agent listens and asks why
                </div>

                <div className="rounded-[15px] bg-white/15 p-4">
                  03. Only agreed options can
                  be offered
                </div>

                <div className="rounded-[15px] bg-white p-4 font-semibold text-[#B12025]">
                  04. If they still want to leave:
                  cancel straight away
                </div>
              </div>

              <p className="mt-5 inline-flex items-center gap-2 text-[11px] text-white/85">
                <Check size={15} />
                At least six months on your account
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ================================================
          MONTHLY REPORTING
      ================================================ */}

      <section
        id="reporting"
        className="bg-white px-5 py-[95px] sm:px-8 lg:px-12 lg:py-[130px]"
      >
        <div className="mx-auto max-w-[1350px]">
          <p
            data-ret-reveal
            className={smallLabel}
          >
            The numbers you will see
          </p>

          <h2
            data-ret-title
            className={`mt-5 max-w-[1000px] ${sectionHeading}`}
          >
            <WordTitle
              text="Know how many customers stay."
            />
          </h2>

          <p
            data-ret-reveal
            className="mt-5 max-w-[790px] text-[14px] leading-8 text-[#17191C]/65"
          >
            A retention program is judged on how
            many customers stay with you.
            Your monthly report includes the
            figures below.
          </p>

          <div className="mt-11 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {metrics.map(
              (
                { title, body, note, Icon },
                index
              ) => (
                <article
                  key={title}
                  data-ret-reveal
                  className={`flex min-h-[290px] flex-col rounded-[27px] border p-7 sm:p-8 ${
                    index === 0
                      ? 'border-[#B12025] bg-[#B12025] text-white'
                      : 'border-[#B12025]/15 bg-[#fff9f9]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`flex h-[60px] w-[60px] items-center justify-center rounded-full border ${
                        index === 0
                          ? 'border-white/40'
                          : 'border-[#B12025]/25 text-[#B12025]'
                      }`}
                    >
                      <Icon size={24} />
                    </span>

                    <span
                      className={`text-[12px] font-semibold ${
                        index === 0
                          ? 'text-white/65'
                          : 'text-[#B12025]'
                      }`}
                    >
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="mt-6 text-[22px] font-semibold">
                    {title}
                  </h3>

                  <p
                    className={`mt-3 text-[12px] leading-7 ${
                      index === 0
                        ? 'text-white/85'
                        : 'text-[#17191C]/65'
                    }`}
                  >
                    {body}
                  </p>

                  <p
                    className={`mt-auto border-t pt-5 text-[11px] font-semibold ${
                      index === 0
                        ? 'border-white/25'
                        : 'border-[#B12025]/15 text-[#B12025]'
                    }`}
                  >
                    {note}
                  </p>
                </article>
              )
            )}
          </div>

          {/* BEFORE / AFTER COMPARISON */}

          <div
            data-ret-reveal
            className="mt-5 rounded-[28px] border border-[#B12025]/15 bg-[#fff9f9] p-7 sm:p-9"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h3 className="text-[22px] font-semibold">
                Before and with the program
              </h3>

              <span className="rounded-full bg-white px-4 py-2 text-[11px] font-semibold text-[#B12025]">
                Comparison layout · No sample numbers
              </span>
            </div>

            <div
              role="group"
              aria-label="Report comparison view"
              className="mt-6 inline-flex gap-2 rounded-full bg-white p-1"
            >
              <button
                type="button"
                aria-pressed={
                  viewComparison === 'before'
                }
                onClick={() =>
                  setViewComparison('before')
                }
                className={`rounded-full px-5 py-2 text-[12px] font-semibold ${
                  viewComparison === 'before'
                    ? 'bg-[#B12025] text-white'
                    : 'text-[#B12025]'
                }`}
              >
                Before program
              </button>

              <button
                type="button"
                aria-pressed={
                  viewComparison === 'with'
                }
                onClick={() =>
                  setViewComparison('with')
                }
                className={`rounded-full px-5 py-2 text-[12px] font-semibold ${
                  viewComparison === 'with'
                    ? 'bg-[#B12025] text-white'
                    : 'text-[#B12025]'
                }`}
              >
                With program
              </button>
            </div>

            <div
              aria-live="polite"
              className="mt-6 flex items-center gap-5 rounded-[20px] border border-[#B12025]/10 bg-white p-6"
            >
              <CalendarCheck2
                size={28}
                className="shrink-0 text-[#B12025]"
              />

              <div>
                <p className="text-[13px] font-semibold">
                  Renewal rate —{' '}
                  {viewComparison === 'before'
                    ? 'your earlier figures'
                    : 'your program figures'}
                </p>

                <p className="mt-1 text-[12px] leading-6 text-[#17191C]/60">
                  {viewComparison === 'before'
                    ? 'Your existing renewal rate provides the baseline.'
                    : 'Your monthly report compares renewals with your baseline.'}{' '}
                  Actual values come from your own records.
                </p>
              </div>
            </div>
          </div>

          {/* COMPANY FIGURES */}

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {[
              {
                value: '85%',
                label: 'client retention rate',
              },
              {
                value: '98%',
                label: 'accuracy rate',
              },
              {
                value: '15 to 20%',
                label:
                  'of job applicants pass the hiring checks',
              },
            ].map((item) => (
              <div
                key={item.label}
                data-ret-reveal
                className="rounded-[24px] border border-[#B12025]/15 p-7"
              >
                <p className="text-[clamp(2.5rem,4vw,4.5rem)] font-semibold tracking-[-.06em] text-[#B12025]">
                  {item.value}
                </p>

                <p className="mt-2 text-[12px] text-[#17191C]/65">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================
          FITNESS CLUB SCROLL REVEAL
      ================================================ */}

      <FitnessQuote />

      {/* ================================================
          FOUR SETUP STEPS — GSAP HORIZONTAL SCROLL
      ================================================ */}

      <section
        id="setup"
        ref={setupRef}
        className="relative scroll-mt-[112px] bg-[#fff9f9] py-[80px] lg:flex lg:min-h-[690px] lg:flex-col lg:justify-center lg:py-[85px]"
      >
        <div className="mx-auto w-full max-w-[1450px] px-5 sm:px-8 lg:px-12">
          <p
            data-ret-reveal
            className={smallLabel}
          >
            How your support team is set up
          </p>

          <h2
            data-ret-title
            className={`mt-5 max-w-[950px] ${sectionHeading}`}
          >
            <WordTitle
              text="Four steps to a team that knows your business."
            />
          </h2>

          <p className="mt-5 max-w-[740px] text-[13px] leading-7 text-[#17191C]/65">
            The biggest risk with outsourced support
            is agents who do not know your business.
            The steps below prevent that.
          </p>
        </div>

        <div className="mt-9 w-full overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:overflow-visible">
          <div
            ref={setupTrackRef}
            className="flex w-max gap-4 pl-5 pr-5 sm:pl-8 sm:pr-8 lg:gap-5 lg:pl-12 lg:pr-12"
          >
            {setup.map(
              ({ title, body }, index) => {
                const red =
                  index === 1 || index === 3;

                return (
                  <article
                    key={title}
                    data-ret-card
                    className={`flex min-h-[370px] w-[min(86vw,420px)] shrink-0 flex-col rounded-[28px] border p-8 sm:w-[450px] lg:min-h-[400px] lg:w-[490px] lg:p-9 ${
                      red
                        ? 'border-[#B12025] bg-[#B12025] text-white'
                        : 'border-[#B12025]/15 bg-white'
                    }`}
                  >
                    <span
                      className={`text-[85px] font-semibold leading-none tracking-[-.09em] ${
                        red
                          ? 'text-white/30'
                          : 'text-[#B12025]/20'
                      }`}
                    >
                      0{index + 1}
                    </span>

                    <div className="mt-auto pt-10">
                      <h3
                        data-ret-card-text
                        className="text-[26px] font-semibold tracking-[-.045em]"
                      >
                        {title}
                      </h3>

                      <p
                        data-ret-card-text
                        className={`mt-4 text-[13px] leading-[1.85] ${
                          red
                            ? 'text-white/85'
                            : 'text-[#17191C]/65'
                        }`}
                      >
                        {body}
                      </p>

                      <span
                        className={`mt-6 flex h-9 w-9 items-center justify-center rounded-full ${
                          red
                            ? 'bg-white text-[#B12025]'
                            : 'bg-[#B12025] text-white'
                        }`}
                      >
                        <Check size={17} />
                      </span>
                    </div>
                  </article>
                );
              }
            )}
          </div>
        </div>

        <div className="mx-auto mt-7 w-full max-w-[1450px] px-5 sm:px-8 lg:px-12">
          <div className="hidden h-[3px] bg-[#B12025]/10 lg:block">
            <div
              className="h-full bg-[#B12025]"
              style={{
                width: `${Math.max(
                  2,
                  setupProgress * 100
                )}%`,
              }}
            />
          </div>

          <p className="text-[11px] text-[#B12025] lg:hidden">
            Swipe sideways to see the four steps →
          </p>
        </div>
      </section>

      {/* ================================================
          CUSTOMER GROUP PICKER
      ================================================ */}

      <section className="bg-white px-5 py-[95px] sm:px-8 lg:px-12 lg:py-[125px]">
        <div className="mx-auto grid max-w-[1350px] gap-5 lg:grid-cols-2">
          <div
            data-ret-reveal
            className="rounded-[28px] border border-[#B12025]/15 bg-[#fff9f9] p-7 sm:p-9"
          >
            <p className={smallLabel}>
              Which group first?
            </p>

            <h2 className="mt-4 text-[clamp(2rem,3.1vw,3.5rem)] font-semibold leading-[1.15] tracking-[-.05em]">
              Start with one customer group.
            </h2>

            <div className="mt-7 space-y-2">
              {audienceOptions.map(
                (item, index) => (
                  <button
                    key={item.label}
                    type="button"
                    aria-pressed={
                      selectedAudience === index
                    }
                    onClick={() =>
                      setSelectedAudience(index)
                    }
                    className={`flex w-full items-center justify-between rounded-[15px] border px-5 py-4 text-left text-[12px] font-semibold ${
                      selectedAudience === index
                        ? 'border-[#B12025] bg-[#B12025] text-white'
                        : 'border-[#B12025]/15 bg-white'
                    }`}
                  >
                    {item.label}

                    {selectedAudience === index && (
                      <Check size={17} />
                    )}
                  </button>
                )
              )}
            </div>

            <div
              aria-live="polite"
              className="mt-6 rounded-[17px] border border-[#B12025]/15 bg-white p-5"
            >
              <p className="text-[11px] font-semibold text-[#B12025]">
                Suggested starting point
              </p>

              <p className="mt-2 text-[12px] leading-7">
                {
                  audienceOptions[
                    selectedAudience
                  ].description
                }
              </p>
            </div>

            <button
              type="button"
              onClick={jumpToContact}
              className="mt-6 inline-flex items-center gap-2 text-[12px] font-semibold text-[#B12025]"
            >
              Add this to your enquiry
              <ArrowUpRight size={16} />
            </button>
          </div>

          {/* RETENTION VS OUTBOUND */}

          <div
            data-ret-reveal
            className="rounded-[28px] bg-[#B12025] p-7 text-white sm:p-9"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[.2em] text-white/75">
              Retention versus outbound support
            </p>

            <h3 className="mt-4 text-[clamp(2rem,3.1vw,3.5rem)] font-semibold leading-[1.15] tracking-[-.05em]">
              An ongoing relationship, not a
              one-off campaign.
            </h3>

            <div className="mt-8 space-y-3">
              <div className="rounded-[18px] border border-white/25 bg-white/10 p-5">
                <p className="text-[12px] font-semibold">
                  Outbound call support
                </p>

                <p className="mt-2 text-[12px] leading-6 text-white/85">
                  A campaign with an end date,
                  such as reminders or surveys.
                </p>
              </div>

              <div className="rounded-[18px] bg-white p-5 text-[#17191C]">
                <p className="text-[12px] font-semibold text-[#B12025]">
                  Customer retention
                </p>

                <p className="mt-2 text-[12px] leading-6">
                  An ongoing program with the same
                  agents who get to know your
                  customers over time.
                </p>
              </div>
            </div>

            <Link
              href={`${ROOT}/outbound-call-support`}
              className="mt-7 inline-flex items-center gap-2 text-[12px] font-semibold text-white"
            >
              Explore outbound call support
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================
          FREQUENTLY ASKED QUESTIONS
      ================================================ */}

      <section
        id="faq"
        className="bg-[#fff8f8] px-5 py-[95px] sm:px-8 lg:px-12 lg:py-[125px]"
      >
        <div className="mx-auto grid max-w-[1350px] gap-11 lg:grid-cols-[.75fr_1.25fr] lg:gap-16">
          <div>
            <p
              data-ret-reveal
              className={smallLabel}
            >
              Common questions
            </p>

            <h2
              data-ret-title
              className={`mt-5 ${sectionHeading}`}
            >
              <WordTitle
                text="Customer retention, explained."
              />
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((item, index) => (
              <div
                key={item.q}
                data-ret-reveal
                className="overflow-hidden rounded-[20px] border border-[#B12025]/15 bg-white"
              >
                <button
                  type="button"
                  aria-expanded={
                    openFaq === index
                  }
                  onClick={() =>
                    setOpenFaq(
                      openFaq === index
                        ? null
                        : index
                    )
                  }
                  className="flex w-full items-start justify-between gap-4 p-6 text-left"
                >
                  <span className="text-[14px] font-semibold leading-6">
                    {item.q}
                  </span>

                  <ChevronDown
                    size={19}
                    className={`mt-1 shrink-0 text-[#B12025] transition-transform ${
                      openFaq === index
                        ? 'rotate-180'
                        : ''
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-[grid-template-rows] duration-300 ${
                    openFaq === index
                      ? 'grid-rows-[1fr]'
                      : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <p className="px-6 pb-6 text-[12px] leading-8 text-[#17191C]/65">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================
          RELATED SERVICES
      ================================================ */}

      <section className="bg-white px-5 py-[85px] sm:px-8 lg:px-12 lg:py-[110px]">
        <div className="mx-auto max-w-[1350px]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className={smallLabel}>
                Explore further
              </p>

              <h2
                data-ret-title
                className={`mt-4 ${sectionHeading}`}
              >
                <WordTitle
                  text="Other customer support services"
                />
              </h2>
            </div>

            <Link
              href={ROOT}
              className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#B12025]"
            >
              See all services
              <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="mt-9 grid gap-3 sm:grid-cols-2">
            {related.map(
              (item, index) => (
                <Link
                  href={item.href}
                  key={item.title}
                  className="group flex min-h-[105px] items-center justify-between gap-4 rounded-[21px] border border-[#B12025]/15 bg-[#fff9f9] p-6 transition hover:border-[#B12025]"
                >
                  <span className="flex items-center gap-5">
                    <span className="text-[12px] font-semibold text-[#B12025]">
                      0{index + 1}
                    </span>

                    <span className="text-[16px] font-semibold">
                      {item.title}
                    </span>
                  </span>

                  <ArrowUpRight
                    size={20}
                    className="shrink-0 text-[#B12025] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </Link>
              )
            )}
          </div>
        </div>
      </section>

      {/* ================================================
          DISCOVERY CALL PLANNER
      ================================================ */}

      <section className="bg-[#fff9f9] px-5 py-[95px] sm:px-8 lg:px-12 lg:py-[110px]">
        <div className="mx-auto grid max-w-[1350px] gap-10 rounded-[30px] border border-[#B12025]/15 bg-white p-7 sm:p-10 lg:grid-cols-[.8fr_1.2fr] lg:p-14">
          <div>
            <p className={smallLabel}>
              Free discovery call
            </p>

            <h2
              data-ret-title
              className={`mt-4 ${sectionHeading}`}
            >
              <WordTitle
                text="Tell us what you need help with."
              />
            </h2>

            <p className="mt-5 text-[13px] leading-8 text-[#17191C]/65">
              Fill this in to book your free
              discovery call. You'll hear back
              within one working day, with a clear
              answer on how FirstNotch can help.
            </p>
          </div>

          <div className="rounded-[23px] bg-[#fff8f8] p-6 sm:p-9">
            <div className="flex justify-between gap-3">
              <span className="text-[11px] font-bold uppercase tracking-[.17em] text-[#B12025]">
                Question {plannerStep + 1} of 2
              </span>

              <span className="text-[11px] text-[#17191C]/45">
                Retention brief
              </span>
            </div>

            <div className="mt-4 flex gap-2">
              {[0, 1].map((index) => (
                <span
                  key={index}
                  className={`h-1 flex-1 rounded-full ${
                    index <= plannerStep
                      ? 'bg-[#B12025]'
                      : 'bg-[#B12025]/15'
                  }`}
                />
              ))}
            </div>

            <h3 className="mt-8 text-[21px] font-semibold">
              {plannerStep === 0
                ? 'Which customers should we start with?'
                : 'When would you like to start?'}
            </h3>

            <div className="mt-6 space-y-2">
              {plannerStep === 0
                ? audienceOptions.map(
                    (item, index) => (
                      <button
                        key={item.label}
                        type="button"
                        aria-pressed={
                          selectedAudience === index
                        }
                        onClick={() =>
                          setSelectedAudience(index)
                        }
                        className={`flex w-full items-center justify-between rounded-[15px] border px-4 py-4 text-left text-[12px] font-semibold ${
                          selectedAudience === index
                            ? 'border-[#B12025] bg-[#B12025] text-white'
                            : 'border-[#B12025]/15 bg-white'
                        }`}
                      >
                        {item.label}

                        {selectedAudience === index && (
                          <Check size={15} />
                        )}
                      </button>
                    )
                  )
                : [
                    'As soon as possible',
                    'Within the next month',
                    'In 1 to 3 months',
                    'Just exploring for now',
                  ].map((item) => (
                    <button
                      key={item}
                      type="button"
                      aria-pressed={
                        startDate === item
                      }
                      onClick={() =>
                        setStartDate(item)
                      }
                      className={`flex w-full items-center justify-between rounded-[15px] border px-4 py-4 text-left text-[12px] font-semibold ${
                        startDate === item
                          ? 'border-[#B12025] bg-[#B12025] text-white'
                          : 'border-[#B12025]/15 bg-white'
                      }`}
                    >
                      {item}

                      {startDate === item && (
                        <Check size={15} />
                      )}
                    </button>
                  ))}
            </div>

            <div className="mt-8 flex justify-between gap-3">
              <button
                type="button"
                disabled={plannerStep === 0}
                onClick={() =>
                  setPlannerStep(0)
                }
                className="rounded-full border border-[#B12025]/20 px-5 py-3 text-[12px] font-semibold disabled:opacity-30"
              >
                Back
              </button>

              {plannerStep === 0 ? (
                <button
                  type="button"
                  onClick={() =>
                    setPlannerStep(1)
                  }
                  className="inline-flex items-center gap-2 rounded-full bg-[#B12025] px-6 py-3 text-[12px] font-semibold text-white"
                >
                  Next
                  <ArrowRight size={15} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={jumpToContact}
                  className="inline-flex items-center gap-2 rounded-full bg-[#B12025] px-6 py-3 text-[12px] font-semibold text-white"
                >
                  Continue to contact form
                  <ArrowUpRight size={15} />
                </button>
              )}
            </div>

            <p className="mt-4 text-[10px] leading-6 text-[#17191C]/50">
              This brief does not send an enquiry.
              Complete the existing contact form
              below.
            </p>
          </div>
        </div>
      </section>

      {/* Navbar, contact form and footer
          are rendered by the route file. */}
    </div>
  );
}
