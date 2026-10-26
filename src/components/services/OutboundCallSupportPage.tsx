
'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  ClipboardCheck,
  Clock3,
  FileCheck2,
  Headset,
  Languages,
  ListFilter,
  Mic2,
  PhoneOutgoing,
  RotateCcw,
} from 'lucide-react';

// ======================================================
// FIRSTNOTCH — OUTBOUND CALL SUPPORT
// Brand: #B12025 / #FFFFFF
// No black background sections
// GSAP word reveals + horizontal scrolling
// ======================================================

const ROOT = '/services/customer-support-outsourcing';

const included = [
  {
    title: 'Calls under your brand',
    description:
      'Agents introduce themselves as part of your team and follow the scripts you sign off.',
    Icon: Headset,
  },
  {
    title: 'Lists checked before calling',
    description:
      'Wrong numbers and duplicates are removed before a campaign starts. So is anyone who has asked not to be called.',
    Icon: ListFilter,
  },
  {
    title: 'Suitable local calling times',
    description:
      "Each call is planned around your customers' time zone and the hours allowed in their country.",
    Icon: Clock3,
  },
  {
    title: 'Call outcomes in your CRM',
    description:
      'Each result is logged, such as a booking made or a request for a callback. Your team can see it the same day.',
    Icon: ClipboardCheck,
  },
  {
    title: 'Planned retries',
    description:
      'Numbers that do not answer are tried again at other times of day, up to a limit you choose.',
    Icon: RotateCcw,
  },
  {
    title: 'Four languages',
    description:
      'Customers can be spoken to in English, Sinhala, Tamil or Hindi.',
    Icon: Languages,
  },
  {
    title: 'Recorded and scored calls',
    description:
      'Customers are told at the start that the call is recorded, and you can listen to any recording. Reviewers score each call against your script.',
    Icon: Mic2,
  },
  {
    title: 'Scripts that improve',
    description:
      'Agents note the questions and objections they hear most. Scripts are then updated with your approval.',
    Icon: FileCheck2,
  },
] as const;

const metrics = [
  {
    title: 'Contact rate',
    description:
      'The share of numbers on the list where a real person was reached.',
    note: 'Reported for each campaign.',
  },
  {
    title: 'Conversion rate',
    description:
      'The share of conversations that reached the goal, such as a booking, a payment or a completed survey.',
    note: 'Target set with you before calling starts.',
  },
  {
    title: 'List progress',
    description:
      'How much of the calling list has been worked through, and how many numbers are waiting for a retry.',
    note: 'Updated weekly.',
  },
  {
    title: 'Opt-out requests',
    description: 'People who asked not to be called again.',
    note: 'Taken off the list within one working day.',
  },
  {
    title: 'Quality score',
    description:
      'How closely calls follow your script and the calling rules, scored by a quality checker.',
    note: 'Each agent reviews their scores with a coach every month.',
  },
] as const;

const steps = [
  {
    title: 'Learning your business',
    description:
      'The team studies your products, policies, tone of voice and the questions customers ask most.',
  },
  {
    title: 'Hiring and training',
    description:
      'Agents take language tests, technical assessments and reference checks. Only 15 to 20% of job applicants pass. Each one is then trained on your scripts and systems before speaking to a customer.',
  },
  {
    title: 'Going live with quality checks',
    description:
      'Each call and task gets a quality score. Attendance is tracked, and every agent has a monthly performance review with coaching.',
  },
  {
    title: 'Reporting and improving',
    description:
      'You get a monthly report on response times, quality scores and the issues customers raise most, plus a call to agree what to improve.',
  },
] as const;

const faqs = [
  {
    question: 'Who can the team call?',
    answer:
      'Your existing customers and people who have asked to hear from you, such as leads who filled in a form or requested a quote. The calling list comes from your CRM.',
  },
  {
    question: 'Can the team make sales calls?',
    answer:
      'Yes. Agents can qualify leads, book meetings for your sales staff and offer upgrades or renewals. Each campaign starts with a small test so the script can be adjusted before the full list is called.',
  },
  {
    question: 'Which number will customers see?',
    answer:
      "Calls can show your own business number or a local number in your customers' country. People are more likely to answer a number they recognise.",
  },
  {
    question:
      "How do you follow calling rules in our customers' country?",
    answer:
      'Before calling starts, the rules that apply are agreed with you. These cover permitted calling hours and how opt-outs are handled. Lists can also be checked against national do-not-call registers, such as the TPS in the UK.',
  },
  {
    question: 'What hours can the team call?',
    answer:
      'Standard calling hours are 10am to 7pm Sri Lanka time, Monday to Friday. For customers in the UK, Europe or North America, shifts can be moved to match their daytime hours.',
  },
  {
    question: 'Who can see our customer list?',
    answer:
      'Only the agents on your campaign. The list stays in your own system or a secure shared folder and is deleted when the campaign ends. Agents never take card details over the phone. Customers who want to pay are sent a secure payment link.',
  },
  {
    question: 'How soon can a campaign start?',
    answer:
      'Most campaigns start one to two weeks after signing, once the script and list are ready.',
  },
  {
    question: 'How is an outbound campaign priced?',
    answer:
      'Cost depends on the size of the list and how long the campaign runs. Longer campaigns are priced per agent each month. Short ones can be priced per hour. A written quotation follows the discovery call.',
  },
] as const;

const related = [
  {
    title: 'Inbound call support',
    href: `${ROOT}/inbound-call-support`,
  },
  {
    title: 'Customer service',
    href: `${ROOT}/customer-service`,
  },
  {
    title: 'Customer retention',
    href: `${ROOT}/customer-retention`,
  },
  {
    title: 'Complaint and query handling',
    href: `${ROOT}/complaint-query-handling`,
  },
] as const;

const useCases = [
  'Payment reminders',
  'Feedback surveys',
  'Appointment confirmations',
  'Lead qualification',
  'Sales campaigns',
];

const eyebrow =
  'text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B12025]';

const heading =
  'text-[clamp(2.5rem,4.8vw,5.5rem)] font-semibold leading-[1.075] tracking-[-0.065em] text-[#17191C]';

// ======================================================
// ANIMATED HEADING WORDS
// ======================================================

function AnimatedWords({ text }: { text: string }) {
  return (
    <span role="text" aria-label={text}>
      {text.split(/\s+/).map((word, index) => (
        <span
          key={`${index}-${word}`}
          aria-hidden="true"
        >
          {index > 0 ? ' ' : null}

          <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
            <span
              data-ob-word
              className="inline-block will-change-transform"
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
// TRAVEL TESTIMONIAL
// HOMEPAGE-STYLE SCROLL WORD REVEAL + TEXT SHADOW
//
// This component MUST remain outside the main component.
// ======================================================

function TravelQuoteReveal() {
  const quoteRef = useRef<HTMLParagraphElement>(null);

  const quote =
    'Each traveler now gets a call a week before departure to check their booking details. Mistakes with dates or names are found in time to fix them.';

  useEffect(() => {
    const element = quoteRef.current;

    if (!element) return;

    gsap.registerPlugin(ScrollTrigger);

    const words =
      element.querySelectorAll<HTMLElement>(
        '[data-travel-word]'
      );

    const media = gsap.matchMedia();

    media.add(
      '(prefers-reduced-motion: no-preference)',
      () => {
        const animation = gsap.fromTo(
          words,
          {
            opacity: 0.2,
            textShadow:
              '0px 0px 0px rgba(70,0,0,0)',
          },
          {
            opacity: 1,
            textShadow:
              '0px 4px 12px rgba(70,0,0,0.35)',
            stagger: 0.12,
            ease: 'none',

            scrollTrigger: {
              trigger: element,
              start: 'top 88%',
              end: 'bottom 50%',
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );

        return () => {
          animation.scrollTrigger?.kill();
          animation.kill();
        };
      }
    );

    return () => {
      media.revert();
    };
  }, []);

  return (
    <section
      aria-label="Travel company testimonial"
      className="
        relative
        overflow-hidden
        bg-[#B12025]
        px-[20px]
        py-[95px]
        text-white
        sm:px-[32px]
        lg:px-[48px]
        lg:py-[135px]
      "
    >
      <div className="mx-auto max-w-[1350px]">

        <p className="mb-[35px] text-[12px] font-semibold uppercase tracking-[0.24em] text-white/80">
          Travel company
        </p>

        <blockquote>
          <p
            ref={quoteRef}
            role="text"
            aria-label={quote}
            className="
              max-w-[1180px]
              text-[clamp(1.9rem,3.8vw,4.5rem)]
              font-semibold
              leading-[1.45]
              tracking-[-0.055em]
              text-white
            "
          >
            <span aria-hidden="true">“</span>

            {quote.split(/\s+/).map((word, index) => (
              <span
                key={index}
                data-travel-word
                aria-hidden="true"
                className="inline-block"
              >
                {word}
                {'\u00A0'}
              </span>
            ))}

            <span aria-hidden="true">”</span>
          </p>
        </blockquote>
      </div>
    </section>
  );
}

// ======================================================
// MAIN PAGE COMPONENT
// ======================================================

export default function OutboundCallSupportPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  const featuresSectionRef =
    useRef<HTMLElement>(null);

  const featuresTrackRef =
    useRef<HTMLDivElement>(null);

  const stepsSectionRef =
    useRef<HTMLElement>(null);

  const stepsTrackRef =
    useRef<HTMLDivElement>(null);

  const [featuresProgress, setFeaturesProgress] =
    useState(0);

  const [stepsProgress, setStepsProgress] =
    useState(0);

  const [openFaq, setOpenFaq] =
    useState<number | null>(0);

  const [stickyCTA, setStickyCTA] =
    useState(false);

  // ====================================================
  // GSAP ANIMATIONS
  // ====================================================

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const page = pageRef.current;
    if (!page) return;

    const media = gsap.matchMedia();

    // TEXT AND ELEMENT REVEALS

    media.add(
      '(prefers-reduced-motion: no-preference)',
      () => {
        const context = gsap.context(() => {

          // General text reveal
          gsap.utils
            .toArray<HTMLElement>('[data-ob-reveal]')
            .forEach((element) => {
              gsap.fromTo(
                element,
                {
                  autoAlpha: 0,
                  y: 32,
                },
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.9,
                  ease: 'power3.out',
                  scrollTrigger: {
                    trigger: element,
                    start: 'top 89%',
                    once: true,
                  },
                }
              );
            });

          // Word-by-word heading animation
          gsap.utils
            .toArray<HTMLElement>('[data-ob-title]')
            .forEach((title) => {
              const words = Array.from(
                title.querySelectorAll<HTMLElement>(
                  '[data-ob-word]'
                )
              );

              if (!words.length) return;

              gsap.fromTo(
                words,
                {
                  yPercent: 115,
                  autoAlpha: 0,
                  rotate: 2,
                },
                {
                  yPercent: 0,
                  autoAlpha: 1,
                  rotate: 0,
                  duration:
                    title.tagName === 'H1'
                      ? 1.15
                      : 0.92,
                  stagger:
                    title.tagName === 'H1'
                      ? 0.055
                      : 0.038,
                  ease: 'power3.out',
                  scrollTrigger: {
                    trigger: title,
                    start: 'top 88%',
                    once: true,
                  },
                }
              );
            });

          // Animated section labels
          gsap.utils
            .toArray<HTMLElement>('[data-ob-eyebrow]')
            .forEach((label) => {
              gsap.fromTo(
                label,
                {
                  letterSpacing: '0.32em',
                },
                {
                  letterSpacing: '0.2em',
                  duration: 0.85,
                  ease: 'power2.out',
                  scrollTrigger: {
                    trigger: label,
                    start: 'top 90%',
                    once: true,
                  },
                }
              );
            });

          // Animated hero connection lines
          gsap.utils
            .toArray<SVGPathElement>(
              '[data-outgoing-line]'
            )
            .forEach((line, index) => {
              gsap.to(line, {
                strokeDashoffset: -90,
                duration: 4 + index * 0.8,
                repeat: -1,
                ease: 'none',
              });
            });

        }, page);

        return () => context.revert();
      }
    );

    // ==================================================
    // DESKTOP PINNED HORIZONTAL SCROLL
    // ==================================================

    media.add(
      '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
      () => {
        const setups = [
          {
            section: featuresSectionRef.current,
            track: featuresTrackRef.current,
            update: setFeaturesProgress,
          },
          {
            section: stepsSectionRef.current,
            track: stepsTrackRef.current,
            update: setStepsProgress,
          },
        ];

        const animations: gsap.core.Tween[] = [];

        setups.forEach(
          ({ section, track, update }) => {
            if (!section || !track) return;

            const travel = () =>
              Math.max(
                0,
                track.scrollWidth -
                  section.clientWidth
              );

            const tween = gsap.to(track, {
              x: () => -travel(),
              ease: 'none',

              scrollTrigger: {
                trigger: section,
                start: 'top top+=96',
                end: () =>
                  `+=${Math.max(travel(), 1)}`,
                pin: true,
                scrub: 0.9,
                anticipatePin: 1,
                invalidateOnRefresh: true,

                onUpdate: (self) => {
                  update(self.progress);
                },
              },
            });

            animations.push(tween);

            // Individual card text reveals

            track
              .querySelectorAll<HTMLElement>(
                '[data-ob-card]'
              )
              .forEach((card, index) => {
                const parts =
                  card.querySelectorAll<HTMLElement>(
                    '[data-ob-card-title], [data-ob-card-copy]'
                  );

                if (!parts.length) return;

                const reveal = gsap.fromTo(
                  parts,
                  {
                    autoAlpha: 0,
                    y: 28,
                  },
                  {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.12,
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
                            start: 'left 88%',
                            once: true,
                          },
                  }
                );

                animations.push(reveal);
              });
          }
        );

        return () => {
          animations.forEach((animation) => {
            animation.scrollTrigger?.kill();
            animation.kill();
          });

          gsap.set(
            [
              featuresTrackRef.current,
              stepsTrackRef.current,
            ].filter(Boolean),
            { clearProps: 'transform' }
          );
        };
      }
    );

    let mounted = true;

    document.fonts?.ready.then(() => {
      if (mounted) ScrollTrigger.refresh();
    });

    const onLoad = () =>
      ScrollTrigger.refresh();

    window.addEventListener('load', onLoad, {
      once: true,
    });

    return () => {
      mounted = false;
      window.removeEventListener(
        'load',
        onLoad
      );
      media.revert();
    };
  }, []);

  // ====================================================
  // STICKY BOOKING BUTTON
  // ====================================================

  useEffect(() => {
    const hero =
      document.getElementById(
        'outbound-hero'
      );

    const contact =
      document.getElementById('contact');

    if (!hero) return;

    let heroOnScreen = true;
    let contactOnScreen = false;

    const sync = () => {
      setStickyCTA(
        !heroOnScreen &&
          !contactOnScreen
      );
    };

    const heroObserver =
      new IntersectionObserver(([entry]) => {
        heroOnScreen = entry.isIntersecting;
        sync();
      });

    const contactObserver =
      new IntersectionObserver(([entry]) => {
        contactOnScreen = entry.isIntersecting;
        sync();
      });

    heroObserver.observe(hero);

    if (contact) {
      contactObserver.observe(contact);
    }

    return () => {
      heroObserver.disconnect();
      contactObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={pageRef}
      className="overflow-x-clip bg-white font-sans text-[#17191C]"
    >
      {/* ==================================================
          HERO
      ================================================== */}

      <section
        id="outbound-hero"
        className="relative overflow-hidden border-b border-[#B12025]/10 bg-white px-5 pb-[85px] pt-[145px] sm:px-8 sm:pb-[110px] lg:px-12 lg:pt-[180px]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-160px] top-[75px] h-[520px] w-[520px] rounded-full border border-[#B12025]/[.09]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-70px] top-[160px] h-[350px] w-[350px] rounded-full border border-[#B12025]/[.13]"
        />

        <div className="relative mx-auto grid max-w-[1450px] items-center gap-12 lg:grid-cols-[1.13fr_.87fr] lg:gap-16">
          <div>
            <p
              data-ob-reveal
              data-ob-eyebrow
              className={eyebrow}
            >
              Outbound call center services in Sri Lanka
            </p>

            <h1
              data-ob-title
              className="mt-7 max-w-[820px] text-[clamp(2.9rem,5.2vw,6.2rem)] font-semibold leading-[1.075] tracking-[-0.073em] text-[#17191C]"
            >
              <AnimatedWords
                text="Follow-up calls and campaigns"
              />{' '}

              <span className="text-[#B12025]">
                <AnimatedWords
                  text="run on schedule,"
                />
              </span>{' '}

              <AnimatedWords
                text="with each result logged in your CRM."
              />
            </h1>

            <p
              data-ob-reveal
              className="mt-7 max-w-[690px] text-[15px] leading-[1.95] text-[#17191C]/70 sm:text-[16px]"
            >
              FirstNotch agents call your customers and
              leads in your company&apos;s name, using
              scripts you approve. Businesses use the
              service for payment reminders, feedback
              surveys, appointment confirmations,
              lead qualification and sales campaigns.
              It also suits older lists your own staff
              have not had time to call.
            </p>

            <div
              data-ob-reveal
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <a
                href="#contact"
                className="group inline-flex min-h-[52px] items-center gap-3 rounded-full bg-[#B12025] px-6 py-3 text-[12px] font-semibold text-white transition hover:bg-[#951b20]"
              >
                Book a free discovery call

                <ArrowUpRight
                  size={17}
                  className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </a>

              <a
                href="#included"
                className="group inline-flex min-h-[52px] items-center gap-3 rounded-full border border-[#B12025]/30 bg-white px-6 py-3 text-[12px] font-semibold text-[#B12025] transition hover:border-[#B12025] hover:bg-[#fff5f5]"
              >
                See what is included

                <ArrowDownRight
                  size={17}
                  className="transition-transform group-hover:translate-y-1"
                />
              </a>
            </div>

            <div
              data-ob-reveal
              className="mt-12 flex flex-wrap gap-2 border-t border-[#B12025]/10 pt-7"
            >
              {useCases.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[#B12025]/15 bg-[#fff8f8] px-4 py-2.5 text-[11px] font-medium text-[#B12025]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* HERO RED VISUAL */}

          <div
            data-ob-reveal
            className="relative overflow-hidden rounded-[36px] bg-[#B12025] px-7 pb-8 pt-8 text-white shadow-[0_30px_70px_rgba(177,32,37,.13)] sm:px-9 sm:pb-10 sm:pt-10"
          >
            <div className="relative flex items-center justify-between gap-3 border-b border-white/25 pb-5">
              <span className="text-[11px] font-semibold uppercase tracking-[.16em] text-white/80">
                Calls under your brand
              </span>

              <PhoneOutgoing
                size={25}
                strokeWidth={1.5}
              />
            </div>

            <div className="relative mt-7 h-[270px] overflow-hidden rounded-[24px] border border-white/15 bg-white/[.07] sm:h-[320px]">
              <svg
                viewBox="0 0 580 350"
                preserveAspectRatio="xMidYMid meet"
                aria-hidden="true"
                className="h-full w-full"
              >
                <g
                  fill="none"
                  stroke="white"
                  strokeOpacity=".15"
                  strokeWidth="1.5"
                >
                  <circle
                    cx="165"
                    cy="180"
                    r="44"
                  />

                  <circle
                    cx="165"
                    cy="180"
                    r="90"
                  />

                  <circle
                    cx="165"
                    cy="180"
                    r="137"
                  />
                </g>

                {[
                  { x: 438, y: 65 },
                  { x: 473, y: 169 },
                  { x: 431, y: 291 },
                ].map((point, index) => (
                  <g key={index}>
                    <path
                      data-outgoing-line
                      d={`M 165 180 Q 290 ${point.y - 40} ${point.x} ${point.y}`}
                      fill="none"
                      stroke="white"
                      strokeWidth="2.3"
                      strokeDasharray="8 10"
                      strokeOpacity=".85"
                    />

                    <circle
                      cx={point.x}
                      cy={point.y}
                      r="8"
                      fill="white"
                    />

                    <circle
                      cx={point.x}
                      cy={point.y}
                      r="17"
                      fill="none"
                      stroke="white"
                      strokeOpacity=".35"
                    />
                  </g>
                ))}

                <circle
                  cx="165"
                  cy="180"
                  r="14"
                  fill="white"
                />

                <circle
                  cx="165"
                  cy="180"
                  r="23"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                />
              </svg>
            </div>

            <div className="relative mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[19px] bg-white p-5 text-[#17191C]">
                <Check
                  size={20}
                  className="text-[#B12025]"
                />

                <p className="mt-3 text-[13px] font-semibold">
                  Scripts that improve
                </p>

                <p className="mt-2 text-[11px] leading-6 text-[#17191C]/65">
                  Scripts are updated with your approval.
                </p>
              </div>

              <div className="rounded-[19px] border border-white/25 bg-white/[.1] p-5">
                <ClipboardCheck size={20} />

                <p className="mt-3 text-[13px] font-semibold">
                  Call outcomes in your CRM
                </p>

                <p className="mt-2 text-[11px] leading-6 text-white/80">
                  Your team can see each result the same day.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          INCLUDED — 8 SIDE-SCROLLING CARDS
      ================================================== */}

      <section
        ref={featuresSectionRef}
        id="included"
        className="relative scroll-mt-[115px] bg-[#fff9f9] py-[85px] lg:flex lg:min-h-[720px] lg:flex-col lg:justify-center lg:py-[88px]"
      >
        <div className="mx-auto w-full max-w-[1450px] px-5 sm:px-8 lg:px-12">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p
                data-ob-reveal
                data-ob-eyebrow
                className={eyebrow}
              >
                What is included
              </p>

              <h2
                data-ob-title
                className={`mt-5 max-w-[980px] ${heading}`}
              >
                <AnimatedWords
                  text="What the outbound call support service includes"
                />
              </h2>
            </div>

            <p className="text-[12px] font-medium text-[#B12025]">
              01 — 08
            </p>
          </div>
        </div>

        <div className="mt-10 w-full overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:overflow-visible">
          <div
            ref={featuresTrackRef}
            className="flex w-max gap-4 pl-5 pr-5 sm:pl-8 sm:pr-8 lg:gap-5 lg:pl-[48px] lg:pr-[48px]"
          >
            {included.map(
              (
                { title, description, Icon },
                index
              ) => {
                const red =
                  index === 0 ||
                  index === 4 ||
                  index === 7;

                return (
                  <article
                    key={title}
                    data-ob-card
                    className={`group flex min-h-[410px] w-[min(85vw,400px)] shrink-0 snap-start flex-col overflow-hidden rounded-[30px] p-8 transition-shadow duration-300 sm:w-[430px] sm:p-9 lg:min-h-[440px] lg:w-[455px] ${
                      red
                        ? 'bg-[#B12025] text-white shadow-[0_15px_40px_rgba(177,32,37,.12)]'
                        : 'border border-[#B12025]/15 bg-white text-[#17191C] shadow-[0_15px_40px_rgba(177,32,37,.04)]'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <span
                        className={`flex h-[62px] w-[62px] items-center justify-center rounded-[19px] ${
                          red
                            ? 'bg-white/15 text-white'
                            : 'bg-[#fff1f1] text-[#B12025]'
                        }`}
                      >
                        <Icon
                          size={28}
                          strokeWidth={1.5}
                          className="transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
                        />
                      </span>

                      <span
                        className={`text-[13px] font-bold tracking-[.1em] ${
                          red
                            ? 'text-white/75'
                            : 'text-[#B12025]'
                        }`}
                      >
                        0{index + 1}
                      </span>
                    </div>

                    <div className="mt-auto pt-14">
                      <div
                        className={`mb-5 h-[2px] w-[56px] ${
                          red
                            ? 'bg-white/65'
                            : 'bg-[#B12025]'
                        }`}
                      />

                      <h3
                        data-ob-card-title
                        className="max-w-[340px] text-[28px] font-semibold leading-[1.2] tracking-[-.045em]"
                      >
                        {title}
                      </h3>

                      <p
                        data-ob-card-copy
                        className={`mt-5 max-w-[340px] text-[14px] leading-[1.85] ${
                          red
                            ? 'text-white/90'
                            : 'text-[#17191C]/70'
                        }`}
                      >
                        {description}
                      </p>
                    </div>
                  </article>
                );
              }
            )}
          </div>
        </div>

        <div className="mx-auto mt-8 w-full max-w-[1450px] px-5 sm:px-8 lg:px-12">
          <div className="hidden h-[3px] overflow-hidden rounded-full bg-[#B12025]/10 lg:block">
            <div
              className="h-full origin-left bg-[#B12025]"
              style={{
                width: `${Math.max(
                  2,
                  featuresProgress * 100
                )}%`,
              }}
            />
          </div>

          <p className="text-[11px] font-medium text-[#B12025] lg:hidden">
            Swipe across to explore all eight services →
          </p>
        </div>
      </section>

      {/* ==================================================
          METRICS
      ================================================== */}

      <section className="bg-white px-5 py-[90px] sm:px-8 lg:px-12 lg:py-[135px]">
        <div className="mx-auto max-w-[1400px]">
          <p
            data-ob-reveal
            data-ob-eyebrow
            className={eyebrow}
          >
            The numbers you will see
          </p>

          <h2
            data-ob-title
            className={`mt-5 max-w-[1000px] ${heading}`}
          >
            <AnimatedWords
              text="The numbers you will see"
            />
          </h2>

          <p
            data-ob-reveal
            className="mt-6 max-w-[740px] text-[15px] leading-8 text-[#17191C]/65"
          >
            Outbound calling results depend on the
            list and the offer. Targets are agreed
            for each campaign, and these figures
            appear in your weekly report.
          </p>

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {metrics.map((metric, index) => {
              const red = index === 0;

              return (
                <article
                  key={metric.title}
                  data-ob-reveal
                  className={`relative flex min-h-[315px] flex-col rounded-[28px] border p-8 sm:p-9 ${
                    red
                      ? 'border-[#B12025] bg-[#B12025] text-white'
                      : 'border-[#B12025]/15 bg-[#fff9f9] text-[#17191C]'
                  }`}
                >
                  <span
                    className={`text-[58px] font-semibold leading-none tracking-[-.075em] ${
                      red
                        ? 'text-white/45'
                        : 'text-[#B12025]/20'
                    }`}
                  >
                    0{index + 1}
                  </span>

                  <h3 className="mt-5 text-[24px] font-semibold tracking-[-.035em]">
                    {metric.title}
                  </h3>

                  <p
                    className={`mt-4 text-[13px] leading-7 ${
                      red
                        ? 'text-white/85'
                        : 'text-[#17191C]/65'
                    }`}
                  >
                    {metric.description}
                  </p>

                  <p
                    className={`mt-auto border-t pt-5 text-[12px] font-semibold ${
                      red
                        ? 'border-white/30 text-white'
                        : 'border-[#B12025]/15 text-[#B12025]'
                    }`}
                  >
                    {metric.note}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {[
              {
                value: '85%',
                title: 'client retention rate',
              },
              {
                value: '98%',
                title: 'accuracy rate',
              },
              {
                value: '15 to 20%',
                title:
                  'of job applicants pass the hiring checks',
              },
            ].map((stat) => (
              <div
                key={stat.title}
                data-ob-reveal
                className="rounded-[25px] border border-[#B12025]/15 bg-white p-7"
              >
                <p className="text-[clamp(2.3rem,3.3vw,4rem)] font-semibold tracking-[-.065em] text-[#B12025]">
                  {stat.value}
                </p>

                <p className="mt-2 text-[13px] font-medium text-[#17191C]/65">
                  {stat.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          TRAVEL COMPANY
          NEW SCROLL-LINKED SHADOW TEXT ANIMATION
      ================================================== */}

      <TravelQuoteReveal />

      {/* ==================================================
          HOW YOUR SUPPORT TEAM IS SET UP
          FOUR SIDE-SCROLLING CARDS
      ================================================== */}

      <section
        id="setup"
        ref={stepsSectionRef}
        className="relative scroll-mt-[100px] bg-white py-[90px] lg:flex lg:min-h-[710px] lg:flex-col lg:justify-center lg:py-[85px]"
      >
        <div className="mx-auto w-full max-w-[1450px] px-5 sm:px-8 lg:px-12">
          <p
            data-ob-reveal
            data-ob-eyebrow
            className={eyebrow}
          >
            How your support team is set up
          </p>

          <h2
            data-ob-title
            className={`mt-5 max-w-[980px] ${heading}`}
          >
            <AnimatedWords
              text="How your support team is set up"
            />
          </h2>

          <p
            data-ob-reveal
            className="mt-5 max-w-[770px] text-[14px] leading-8 text-[#17191C]/65"
          >
            The biggest risk with outsourced support
            is agents who do not know your business.
            The steps below prevent that.
          </p>
        </div>

        <div className="mt-10 w-full overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:overflow-visible">
          <div
            ref={stepsTrackRef}
            className="flex w-max gap-4 pl-5 pr-5 sm:pl-8 sm:pr-8 lg:gap-5 lg:pl-[48px] lg:pr-[48px]"
          >
            {steps.map((step, index) => {
              const red =
                index === 1 || index === 3;

              return (
                <article
                  key={step.title}
                  data-ob-card
                  className={`relative flex min-h-[370px] w-[min(86vw,425px)] shrink-0 snap-start flex-col rounded-[30px] border p-8 sm:w-[450px] sm:p-9 lg:min-h-[400px] lg:w-[500px] ${
                    red
                      ? 'border-[#B12025] bg-[#B12025] text-white'
                      : 'border-[#B12025]/15 bg-[#fff9f9] text-[#17191C]'
                  }`}
                >
                  <span
                    className={`text-[clamp(5.5rem,7vw,7rem)] font-semibold leading-none tracking-[-.09em] ${
                      red
                        ? 'text-white/35'
                        : 'text-[#B12025]/25'
                    }`}
                  >
                    0{index + 1}
                  </span>

                  <div className="mt-auto pt-10">
                    <h3
                      data-ob-card-title
                      className="text-[28px] font-semibold tracking-[-.045em]"
                    >
                      {step.title}
                    </h3>

                    <p
                      data-ob-card-copy
                      className={`mt-5 max-w-[395px] text-[14px] leading-[1.9] ${
                        red
                          ? 'text-white/85'
                          : 'text-[#17191C]/70'
                      }`}
                    >
                      {step.description}
                    </p>

                    <div
                      className={`mt-6 flex h-10 w-10 items-center justify-center rounded-full ${
                        red
                          ? 'bg-white text-[#B12025]'
                          : 'bg-[#B12025] text-white'
                      }`}
                    >
                      <Check size={19} />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="mx-auto mt-7 w-full max-w-[1450px] px-5 sm:px-8 lg:px-12">
          <div className="hidden h-[3px] rounded-full bg-[#B12025]/10 lg:block">
            <div
              className="h-full bg-[#B12025]"
              style={{
                width: `${Math.max(
                  2,
                  stepsProgress * 100
                )}%`,
              }}
            />
          </div>

          <p className="text-[11px] text-[#B12025] lg:hidden">
            Swipe across to see all four steps →
          </p>
        </div>
      </section>

      {/* ==================================================
          FAQ
      ================================================== */}

      <section
        id="faq"
        className="bg-[#fff8f8] px-5 py-[90px] sm:px-8 lg:px-12 lg:py-[130px]"
      >
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[.83fr_1.17fr] lg:gap-20">
          <div>
            <p
              data-ob-reveal
              data-ob-eyebrow
              className={eyebrow}
            >
              Common questions
            </p>

            <h2
              data-ob-title
              className={`mt-5 ${heading}`}
            >
              <AnimatedWords
                text="Common questions about outbound call center services"
              />
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={faq.question}
                data-ob-reveal
                className="overflow-hidden rounded-[22px] border border-[#B12025]/15 bg-white"
              >
                <button
                  type="button"
                  aria-expanded={openFaq === index}
                  onClick={() =>
                    setOpenFaq(
                      openFaq === index
                        ? null
                        : index
                    )
                  }
                  className="flex w-full items-start justify-between gap-5 p-6 text-left sm:p-7"
                >
                  <span className="text-[15px] font-semibold leading-7 text-[#17191C]">
                    {faq.question}
                  </span>

                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors ${
                      openFaq === index
                        ? 'bg-[#B12025] text-white'
                        : 'bg-[#fff1f1] text-[#B12025]'
                    }`}
                  >
                    <ChevronDown
                      size={18}
                      className={`transition-transform duration-300 ${
                        openFaq === index
                          ? 'rotate-180'
                          : ''
                      }`}
                    />
                  </span>
                </button>

                <div
                  className={`grid transition-[grid-template-rows] duration-300 ${
                    openFaq === index
                      ? 'grid-rows-[1fr]'
                      : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <p className="px-6 pb-7 text-[13px] leading-8 text-[#17191C]/70 sm:px-7">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          RELATED SERVICES
      ================================================== */}

      <section className="bg-white px-5 py-[85px] sm:px-8 lg:px-12 lg:py-[110px]">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2
              data-ob-title
              className={`max-w-[890px] ${heading}`}
            >
              <AnimatedWords
                text="Other customer support services"
              />
            </h2>

            <Link
              href={ROOT}
              className="group flex items-center gap-2 text-[13px] font-semibold text-[#B12025]"
            >
              See all services

              <ArrowUpRight
                size={17}
                className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div className="mt-11 grid gap-4 sm:grid-cols-2">
            {related.map((service, index) => (
              <Link
                key={service.title}
                href={service.href}
                className="group flex min-h-[120px] items-center justify-between gap-5 rounded-[24px] border border-[#B12025]/15 bg-[#fff9f9] p-7 transition-colors hover:border-[#B12025] hover:bg-[#fff1f1]"
              >
                <span className="flex items-center gap-5">
                  <span className="text-[13px] font-bold text-[#B12025]">
                    0{index + 1}
                  </span>

                  <span className="text-[18px] font-semibold tracking-[-.02em] text-[#17191C]">
                    {service.title}
                  </span>
                </span>

                <ArrowUpRight
                  size={23}
                  className="shrink-0 text-[#B12025] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact form and footer are rendered
          by StoryContact in page.tsx */}

      {stickyCTA && (
        <a
          href="#contact"
          className="fixed bottom-5 left-1/2 z-40 flex min-h-[52px] -translate-x-1/2 items-center gap-3 rounded-full bg-[#B12025] px-6 text-[12px] font-semibold text-white shadow-[0_16px_40px_rgba(177,32,37,.27)] transition hover:bg-[#951b20] sm:bottom-8"
        >
          Book a free discovery call
          <ArrowUpRight size={17} />
        </a>
      )}
    </div>
  );
}
