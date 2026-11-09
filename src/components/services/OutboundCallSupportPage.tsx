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
// Mobile optimised + desktop preserved
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
    description:
      'People who asked not to be called again.',
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
        <span key={`${index}-${word}`} aria-hidden="true">
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
// Scroll word reveal
// MOBILE:
// - reduced height
// - reduced label
// - reduced quote size
// Desktop/tablet preserved
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

        max-sm:px-[20px]
        max-sm:py-[45px]

        sm:px-[32px]

        lg:px-[48px]
        lg:py-[135px]
      "
    >
      <div className="mx-auto max-w-[1350px]">
        <p
          className="
            mb-[35px]
            text-[12px]
            font-semibold
            uppercase
            tracking-[0.24em]
            text-white/80

            max-sm:mb-[22px]
            max-sm:text-[8px]
            max-sm:tracking-[0.18em]
          "
        >
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

              max-sm:text-[22px]
              max-sm:leading-[1.48]
              max-sm:tracking-[-0.035em]
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

  // Mobile horizontal scrolling
  const useCasesRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const mobileStepsRef = useRef<HTMLDivElement>(null);

  // Desktop GSAP horizontal sections
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

    // ==================================================
    // GENERAL TEXT / ELEMENT REVEALS
    // ==================================================

    media.add(
      '(prefers-reduced-motion: no-preference)',
      () => {
        const context = gsap.context(() => {
          // General reveal
          gsap.utils
            .toArray<HTMLElement>(
              '[data-ob-reveal]'
            )
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

          // Word-by-word heading reveal
          gsap.utils
            .toArray<HTMLElement>(
              '[data-ob-title]'
            )
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

          // Eyebrow animation
          gsap.utils
            .toArray<HTMLElement>(
              '[data-ob-eyebrow]'
            )
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

          // Hero connection lines
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

        return () => {
          context.revert();
        };
      }
    );

    // ==================================================
    // DESKTOP PINNED HORIZONTAL SCROLL
    // DESKTOP ONLY — DO NOT AFFECT MOBILE
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
                  `+=${Math.max(
                    travel(),
                    1
                  )}`,

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
                            containerAnimation:
                              tween,
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
          animations.forEach(
            (animation) => {
              animation.scrollTrigger?.kill();
              animation.kill();
            }
          );

          gsap.set(
            [
              featuresTrackRef.current,
              stepsTrackRef.current,
            ].filter(Boolean),
            {
              clearProps: 'transform',
            }
          );
        };
      }
    );

    let mounted = true;

    document.fonts?.ready.then(() => {
      if (mounted) {
        ScrollTrigger.refresh();
      }
    });

    const onLoad = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener(
      'load',
      onLoad,
      {
        once: true,
      }
    );

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
  // Hidden separately on mobile in JSX
  // ====================================================

  useEffect(() => {
    const hero =
      document.getElementById(
        'outbound-hero'
      );

    const contact =
      document.getElementById(
        'contact'
      );

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
      new IntersectionObserver(
        ([entry]) => {
          heroOnScreen =
            entry.isIntersecting;

          sync();
        }
      );

    const contactObserver =
      new IntersectionObserver(
        ([entry]) => {
          contactOnScreen =
            entry.isIntersecting;

          sync();
        }
      );

    heroObserver.observe(hero);

    if (contact) {
      contactObserver.observe(
        contact
      );
    }

    return () => {
      heroObserver.disconnect();
      contactObserver.disconnect();
    };
  }, []);

  // ====================================================
  // MOBILE USE-CASE PILLS AUTO SCROLL
  // ====================================================

  useEffect(() => {
    const container =
      useCasesRef.current;

    if (!container) return;

    const media =
      window.matchMedia(
        '(max-width: 639px)'
      );

    if (!media.matches) return;

    let direction = 1;

    const interval =
      window.setInterval(() => {
        const maxScroll =
          container.scrollWidth -
          container.clientWidth;

        if (maxScroll <= 0) return;

        if (
          container.scrollLeft >=
          maxScroll - 5
        ) {
          direction = -1;
        }

        if (
          container.scrollLeft <= 5
        ) {
          direction = 1;
        }

        container.scrollBy({
          left: 85 * direction,
          behavior: 'smooth',
        });
      }, 1800);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  // ====================================================
  // MOBILE METRIC CARDS AUTO SCROLL
  // ====================================================

  useEffect(() => {
    const container =
      metricsRef.current;

    if (!container) return;

    const media =
      window.matchMedia(
        '(max-width: 639px)'
      );

    if (!media.matches) return;

    let currentIndex = 0;

    const interval =
      window.setInterval(() => {
        const cards = Array.from(
          container.children
        ) as HTMLElement[];

        if (!cards.length) return;

        currentIndex =
          (currentIndex + 1) %
          cards.length;

        const card =
          cards[currentIndex];

        container.scrollTo({
          left:
            card.offsetLeft -
            container.offsetLeft,
          behavior: 'smooth',
        });
      }, 2500);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  // ====================================================
  // MOBILE STATS AUTO SCROLL
  // ====================================================

  useEffect(() => {
    const container =
      statsRef.current;

    if (!container) return;

    const media =
      window.matchMedia(
        '(max-width: 639px)'
      );

    if (!media.matches) return;

    let currentIndex = 0;

    const interval =
      window.setInterval(() => {
        const cards = Array.from(
          container.children
        ) as HTMLElement[];

        if (!cards.length) return;

        currentIndex =
          (currentIndex + 1) %
          cards.length;

        const card =
          cards[currentIndex];

        container.scrollTo({
          left:
            card.offsetLeft -
            container.offsetLeft,
          behavior: 'smooth',
        });
      }, 2300);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  // ====================================================
  // MOBILE SETUP CARDS AUTO SCROLL
  // Image 2 requirement
  // ====================================================

  useEffect(() => {
    const container =
      mobileStepsRef.current;

    if (!container) return;

    const media =
      window.matchMedia(
        '(max-width: 639px)'
      );

    if (!media.matches) return;

    let currentIndex = 0;

    const interval =
      window.setInterval(() => {
        const track =
          container.firstElementChild as HTMLElement | null;

        if (!track) return;

        const cards = Array.from(
          track.children
        ) as HTMLElement[];

        if (!cards.length) return;

        currentIndex =
          (currentIndex + 1) %
          cards.length;

        const card =
          cards[currentIndex];

        container.scrollTo({
          left:
            card.offsetLeft -
            track.offsetLeft,
          behavior: 'smooth',
        });
      }, 2600);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  return (
    <div
      ref={pageRef}
      className="
        overflow-x-clip
        bg-white
        font-sans
        text-[#17191C]
      "
    >

            {/* ==================================================
          01 — HERO
      ================================================== */}

      <section
        id="outbound-hero"
        className="
          relative overflow-hidden
          border-b border-[#B12025]/10
          bg-white
          px-5 pb-[85px] pt-[145px]

          max-sm:px-[20px]
          max-sm:pb-[38px]
          max-sm:pt-[105px]

          sm:px-8 sm:pb-[110px]

          lg:px-12
          lg:pt-[180px]
        "
      >
        {/* Decorative background circles */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-[190px]
            top-[90px]
            h-[520px]
            w-[520px]
            rounded-full
            border
            border-[#B12025]/10

            max-sm:-right-[180px]
            max-sm:top-[90px]
            max-sm:h-[390px]
            max-sm:w-[390px]
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-[55px]
            top-[180px]
            h-[350px]
            w-[350px]
            rounded-full
            border
            border-[#B12025]/10

            max-sm:-right-[105px]
            max-sm:top-[175px]
            max-sm:h-[270px]
            max-sm:w-[270px]
          "
        />

        <div
          className="
            relative z-10
            mx-auto
            grid
            max-w-[1400px]
            gap-14

            lg:grid-cols-[1.05fr_.95fr]
            lg:items-center
            lg:gap-20
          "
        >
          {/* ==========================================
              HERO CONTENT
          ========================================== */}

          <div>
            <p
              data-ob-eyebrow
              data-ob-reveal
              className="
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.2em]
                text-[#B12025]

                max-sm:max-w-[285px]
                max-sm:text-[8px]
                max-sm:leading-[1.55]
                max-sm:tracking-[0.18em]
              "
            >
              Outbound call center services in Sri Lanka
            </p>

            <h1
              data-ob-title
              className="
                mt-7
                max-w-[820px]
                text-[clamp(2.9rem,5.2vw,6.2rem)]
                font-semibold
                leading-[1.075]
                tracking-[-0.073em]
                text-[#17191C]

                max-sm:mt-[18px]
                max-sm:max-w-[310px]
                max-sm:text-[34px]
                max-sm:leading-[1.08]
                max-sm:tracking-[-0.055em]
              "
            >
              <AnimatedWords text="Follow-up calls and campaigns" />

              <br />

              <span className="text-[#B12025]">
                <AnimatedWords text="run on schedule," />
              </span>{' '}

              <AnimatedWords text="with each result logged in your CRM." />
            </h1>

            <p
              data-ob-reveal
              className="
                mt-7
                max-w-[690px]
                text-[15px]
                leading-[1.95]
                text-[#17191C]/70

                max-sm:mt-[18px]
                max-sm:max-w-[300px]
                max-sm:text-[10px]
                max-sm:leading-[1.75]

                sm:text-[16px]
              "
            >
              FirstNotch agents call your customers and
              leads in your company&apos;s name, using
              scripts you approve. Businesses use the
              service for payment reminders, feedback
              surveys, appointment confirmations, lead
              qualification and sales campaigns. It also
              works for follow-up calls after an enquiry,
              quote or purchase.
            </p>

            {/* ========================================
                CTA BUTTONS
                MOBILE = ONE ROW
            ======================================== */}

            <div
              data-ob-reveal
              className="
                mt-9
                flex
                flex-wrap
                items-center
                gap-3

                max-sm:mt-[20px]
                max-sm:w-full
                max-sm:flex-nowrap
                max-sm:gap-[8px]
              "
            >
              <Link
                href="/book-a-free-call"
                className="
                  group
                  inline-flex
                  min-h-[52px]
                  items-center
                  justify-center
                  gap-3
                  rounded-full
                  bg-[#B12025]
                  px-6
                  py-3
                  text-[12px]
                  font-semibold
                  text-white
                  transition
                  hover:bg-[#951b20]

                  max-sm:min-h-[40px]
                  max-sm:flex-1
                  max-sm:gap-[5px]
                  max-sm:px-[10px]
                  max-sm:py-[8px]
                  max-sm:text-[8px]
                  max-sm:whitespace-nowrap
                "
              >
                Book a free discovery call

                <ArrowUpRight
                  size={16}
                  className="
                    transition-transform
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5

                    max-sm:h-[12px]
                    max-sm:w-[12px]
                  "
                />
              </Link>

              <a
                href="#what-is-included"
                className="
                  group
                  inline-flex
                  min-h-[52px]
                  items-center
                  justify-center
                  gap-3
                  rounded-full
                  border
                  border-[#B12025]/30
                  bg-white
                  px-6
                  py-3
                  text-[12px]
                  font-semibold
                  text-[#B12025]
                  transition
                  hover:border-[#B12025]
                  hover:bg-[#fff5f5]

                  max-sm:min-h-[40px]
                  max-sm:flex-1
                  max-sm:gap-[5px]
                  max-sm:px-[10px]
                  max-sm:py-[8px]
                  max-sm:text-[8px]
                  max-sm:whitespace-nowrap
                "
              >
                See what is included

                <ArrowDownRight
                  size={16}
                  className="
                    transition-transform
                    group-hover:translate-x-0.5
                    group-hover:translate-y-0.5

                    max-sm:h-[12px]
                    max-sm:w-[12px]
                  "
                />
              </a>
            </div>

            {/* ========================================
                USE CASE PILLS
                MOBILE = ONE ROW + AUTO SCROLL
            ======================================== */}

            <div
              ref={useCasesRef}
              data-ob-reveal
              className="
                mt-12
                flex
                flex-wrap
                gap-2
                border-t
                border-[#B12025]/10
                pt-7

                max-sm:mt-[22px]
                max-sm:flex-nowrap
                max-sm:overflow-x-auto
                max-sm:scroll-smooth
                max-sm:pt-[14px]
                max-sm:pb-[2px]
                max-sm:[scrollbar-width:none]
                max-sm:[&::-webkit-scrollbar]:hidden
              "
            >
              {useCases.map((item) => (
                <span
                  key={item}
                  className="
                    rounded-full
                    border
                    border-[#B12025]/15
                    bg-[#fff8f8]
                    px-4
                    py-2.5
                    text-[11px]
                    font-medium
                    text-[#B12025]

                    max-sm:shrink-0
                    max-sm:px-[13px]
                    max-sm:py-[7px]
                    max-sm:text-[8px]
                    max-sm:whitespace-nowrap
                  "
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* ==========================================
              HERO RED VISUAL

              IMPORTANT:
              Hidden ONLY on mobile.
              Tablet / desktop remains unchanged.
          ========================================== */}

          <div
            data-ob-reveal
            className="
              relative
              overflow-hidden
              rounded-[36px]
              bg-[#B12025]
              px-7
              pb-8
              pt-8
              text-white
              shadow-[0_30px_70px_rgba(177,32,37,.13)]

              max-sm:hidden

              sm:px-9
              sm:pb-10
              sm:pt-10
            "
          >
            <div className="flex items-center justify-between gap-5">
              <p
                className="
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-white/80
                "
              >
                Calls under your brand
              </p>

              <PhoneOutgoing
                size={28}
                strokeWidth={1.5}
                className="shrink-0 text-white"
              />
            </div>

            <div className="mt-6 h-px bg-white/20" />

            {/* ========================================
                OUTBOUND CONNECTION VISUAL
            ======================================== */}

            <div
              className="
                relative
                mt-7
                flex
                min-h-[270px]
                items-center
                justify-center
                overflow-hidden
                rounded-[25px]
                border
                border-white/20
                bg-white/[0.07]
                p-6

                sm:min-h-[310px]
              "
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 500 300"
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                "
                fill="none"
              >
                <circle
                  cx="150"
                  cy="150"
                  r="33"
                  stroke="rgba(255,255,255,.25)"
                />

                <circle
                  cx="150"
                  cy="150"
                  r="67"
                  stroke="rgba(255,255,255,.12)"
                />

                <circle
                  cx="150"
                  cy="150"
                  r="105"
                  stroke="rgba(255,255,255,.08)"
                />

                <path
                  data-outgoing-line
                  d="M150 150 C245 80 310 55 390 65"
                  stroke="rgba(255,255,255,.8)"
                  strokeWidth="2"
                  strokeDasharray="7 8"
                  strokeDashoffset="0"
                />

                <path
                  data-outgoing-line
                  d="M150 150 C250 120 320 120 420 135"
                  stroke="rgba(255,255,255,.7)"
                  strokeWidth="2"
                  strokeDasharray="7 8"
                  strokeDashoffset="0"
                />

                <path
                  data-outgoing-line
                  d="M150 150 C250 175 310 205 385 235"
                  stroke="rgba(255,255,255,.75)"
                  strokeWidth="2"
                  strokeDasharray="7 8"
                  strokeDashoffset="0"
                />

                <circle
                  cx="150"
                  cy="150"
                  r="16"
                  fill="white"
                  fillOpacity=".15"
                  stroke="white"
                  strokeWidth="2"
                />

                <circle
                  cx="150"
                  cy="150"
                  r="9"
                  fill="white"
                />

                <circle
                  cx="390"
                  cy="65"
                  r="10"
                  fill="white"
                  fillOpacity=".18"
                  stroke="white"
                  strokeWidth="2"
                />

                <circle
                  cx="390"
                  cy="65"
                  r="5"
                  fill="white"
                />

                <circle
                  cx="420"
                  cy="135"
                  r="10"
                  fill="white"
                  fillOpacity=".18"
                  stroke="white"
                  strokeWidth="2"
                />

                <circle
                  cx="420"
                  cy="135"
                  r="5"
                  fill="white"
                />

                <circle
                  cx="385"
                  cy="235"
                  r="10"
                  fill="white"
                  fillOpacity=".18"
                  stroke="white"
                  strokeWidth="2"
                />

                <circle
                  cx="385"
                  cy="235"
                  r="5"
                  fill="white"
                />
              </svg>
            </div>

            {/* ========================================
                SMALL HERO VISUAL CARDS
            ======================================== */}

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div
                className="
                  rounded-[20px]
                  bg-white
                  p-5
                  text-[#17191C]
                "
              >
                <Check
                  size={20}
                  strokeWidth={1.8}
                  className="text-[#B12025]"
                />

                <p className="mt-5 text-[14px] font-semibold">
                  Scripts that improve
                </p>

                <p className="mt-2 text-[11px] leading-6 text-[#17191C]/60">
                  Scripts are updated with your approval.
                </p>
              </div>

              <div
                className="
                  rounded-[20px]
                  border
                  border-white/20
                  bg-white/10
                  p-5
                "
              >
                <ClipboardCheck
                  size={20}
                  strokeWidth={1.8}
                  className="text-white"
                />

                <p className="mt-5 text-[14px] font-semibold">
                  Call outcomes in your CRM
                </p>

                <p className="mt-2 text-[11px] leading-6 text-white/70">
                  Your team can see each result the same day.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          02 — WHAT IS INCLUDED

          MOBILE:
          - reduced section whitespace
          - smaller heading
          - smaller cards
          - horizontal scrolling
          - shorter cards

          DESKTOP:
          existing GSAP pinned horizontal behavior preserved
      ================================================== */}

      <section
        ref={featuresSectionRef}
        id="what-is-included"
        className="
          relative
          scroll-mt-[115px]
          bg-[#fff9f9]
          py-[85px]

          max-sm:py-[38px]

          lg:flex
          lg:min-h-[720px]
          lg:flex-col
          lg:justify-center
          lg:py-[88px]
        "
      >
        {/* ==========================================
            SECTION HEADING
        ========================================== */}

        <div
          className="
            mx-auto
            w-full
            max-w-[1400px]
            px-5

            sm:px-8
            lg:px-12
          "
        >
          <p
            data-ob-eyebrow
            data-ob-reveal
            className="
              text-[11px]
              font-semibold
              uppercase
              tracking-[0.2em]
              text-[#B12025]

              max-sm:text-[8px]
              max-sm:tracking-[0.16em]
            "
          >
            What is included
          </p>

          <div
            className="
              mt-5
              flex
              flex-wrap
              items-end
              justify-between
              gap-6

              max-sm:mt-[12px]
              max-sm:gap-[10px]
            "
          >
            <h2
              data-ob-title
              className={`
                max-w-[980px]
                ${heading}

                max-sm:max-w-[290px]
                max-sm:text-[29px]
                max-sm:leading-[1.05]
                max-sm:tracking-[-0.055em]
              `}
            >
              <AnimatedWords text="What the outbound call support service includes" />
            </h2>

            <p
              data-ob-reveal
              className="
                text-[12px]
                font-medium
                text-[#B12025]

                max-sm:text-[9px]
              "
            >
              01 — 08
            </p>
          </div>
        </div>

        {/* ==========================================
            HORIZONTAL CARDS VIEWPORT
        ========================================== */}

        <div
          className="
            mt-10
            w-full
            overflow-x-auto
            overscroll-x-contain

            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden

            max-sm:mt-[22px]

            lg:overflow-visible
          "
        >
          <div
            ref={featuresTrackRef}
            className="
              flex
              w-max
              snap-x
              snap-mandatory
              gap-4
              px-5
              pb-2

              sm:gap-5
              sm:px-8

              lg:snap-none
              lg:px-12
            "
          >
            {included.map(
              (
                {
                  title,
                  description,
                  Icon,
                },
                index
              ) => {
                const red =
                  index % 2 === 0;

                return (
                  <article
                    key={title}
                    data-ob-card
                    className={`group flex min-h-[410px] w-[min(85vw,400px)] shrink-0 snap-start flex-col overflow-hidden rounded-[30px] p-8 transition-shadow duration-300

                      max-sm:min-h-[255px]
                      max-sm:w-[72vw]
                      max-sm:max-w-[250px]
                      max-sm:rounded-[20px]
                      max-sm:p-[18px]

                      sm:w-[430px]
                      sm:p-9

                      lg:min-h-[440px]
                      lg:w-[455px]

                      ${
                        red
                          ? 'bg-[#B12025] text-white shadow-[0_25px_65px_rgba(177,32,37,.14)]'
                          : 'border border-[#B12025]/15 bg-white text-[#17191C]'
                      }`}
                  >
                    {/* ==================================
                        CARD TOP
                    ================================== */}

                    <div className="flex items-start justify-between gap-4">
                      <div
                        className={`flex h-[62px] w-[62px] items-center justify-center rounded-[19px]

                          max-sm:h-[42px]
                          max-sm:w-[42px]
                          max-sm:rounded-[13px]

                          ${
                            red
                              ? 'bg-white/15 text-white'
                              : 'bg-[#B12025]/10 text-[#B12025]'
                          }`}
                      >
                        <Icon
                          size={28}
                          strokeWidth={1.5}
                          className="
                            h-[28px]
                            w-[28px]
                            transition-transform
                            duration-300

                            group-hover:-rotate-6
                            group-hover:scale-110

                            max-sm:h-[18px]
                            max-sm:w-[18px]
                          "
                        />
                      </div>

                      <span
                        className={`text-[12px] font-semibold

                          max-sm:text-[9px]

                          ${
                            red
                              ? 'text-white/70'
                              : 'text-[#B12025]/70'
                          }`}
                      >
                        {String(index + 1).padStart(
                          2,
                          '0'
                        )}
                      </span>
                    </div>

                    {/* ==================================
                        CARD CONTENT
                    ================================== */}

                    <div
                      className="
                        mt-auto
                        pt-14

                        max-sm:pt-[25px]
                      "
                    >
                      <div
                        className={`mb-5 h-[2px] w-[56px]

                          max-sm:mb-[12px]
                          max-sm:w-[38px]

                          ${
                            red
                              ? 'bg-white'
                              : 'bg-[#B12025]'
                          }`}
                      />

                      <h3
                        data-ob-card-title
                        className="
                          max-w-[340px]
                          text-[28px]
                          font-semibold
                          leading-[1.2]
                          tracking-[-.045em]

                          max-sm:text-[18px]
                          max-sm:leading-[1.12]
                        "
                      >
                        {title}
                      </h3>

                      <p
                        data-ob-card-copy
                        className={`mt-5 max-w-[340px] text-[14px] leading-[1.85]

                          max-sm:mt-[10px]
                          max-sm:text-[9px]
                          max-sm:leading-[1.55]

                          ${
                            red
                              ? 'text-white/72'
                              : 'text-[#17191C]/65'
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

        {/* ==========================================
            DESKTOP PROGRESS BAR
        ========================================== */}

        <div
          className="
            mx-auto
            mt-8
            hidden
            w-full
            max-w-[1400px]
            px-12

            lg:block
          "
        >
          <div className="h-[2px] overflow-hidden rounded-full bg-[#B12025]/10">
            <div
              className="
                h-full
                origin-left
                bg-[#B12025]
                transition-transform
                duration-150
              "
              style={{
                transform: `scaleX(${Math.max(
                  featuresProgress,
                  0.03
                )})`,
              }}
            />
          </div>
        </div>
      </section>

            {/* ==================================================
          03 — THE NUMBERS YOU WILL SEE

          MOBILE:
          - reduced vertical whitespace
          - smaller heading / description
          - smaller cards
          - horizontal auto scroll

          TABLET / DESKTOP:
          existing layout preserved
      ================================================== */}

      <section
        className="
          bg-white
          px-5
          py-[90px]

          max-sm:px-[18px]
          max-sm:py-[40px]

          sm:px-8

          lg:px-12
          lg:py-[135px]
        "
      >
        <div className="mx-auto max-w-[1400px]">
          {/* ==========================================
              SECTION HEADING
          ========================================== */}

          <div>
            <p
              data-ob-eyebrow
              data-ob-reveal
              className="
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.2em]
                text-[#B12025]

                max-sm:text-[8px]
                max-sm:tracking-[0.16em]
              "
            >
              The numbers you will see
            </p>

            <h2
              data-ob-title
              className={`
                mt-5
                max-w-[1000px]
                ${heading}

                max-sm:mt-[12px]
                max-sm:max-w-[280px]
                max-sm:text-[29px]
                max-sm:leading-[1.04]
                max-sm:tracking-[-0.055em]
              `}
            >
              <AnimatedWords text="The numbers you will see" />
            </h2>

            <p
              data-ob-reveal
              className="
                mt-6
                max-w-[740px]
                text-[15px]
                leading-8
                text-[#17191C]/65

                max-sm:mt-[14px]
                max-sm:max-w-[290px]
                max-sm:text-[9px]
                max-sm:leading-[1.65]
              "
            >
              Outbound calling results depend on the list
              and the offer. Targets are agreed for each
              campaign, and these figures appear in your
              weekly report.
            </p>
          </div>

          {/* ==========================================
              METRIC CARDS
              MOBILE = SIDE AUTO SCROLL
          ========================================== */}

          <div
            ref={metricsRef}
            className="
              mt-12
              grid
              gap-4

              md:grid-cols-2
              xl:grid-cols-3

              max-sm:mt-[24px]
              max-sm:flex
              max-sm:overflow-x-auto
              max-sm:snap-x
              max-sm:snap-mandatory
              max-sm:scroll-smooth
              max-sm:gap-[10px]
              max-sm:pb-[5px]
              max-sm:[scrollbar-width:none]
              max-sm:[&::-webkit-scrollbar]:hidden
            "
          >
            {metrics.map(
              (
                {
                  title,
                  description,
                  note,
                },
                index
              ) => {
                const red =
                  index % 2 === 0;

                return (
                  <article
                    key={title}
                    data-ob-reveal
                    className={`relative flex min-h-[315px] flex-col rounded-[28px] border p-8

                      max-sm:min-h-[220px]
                      max-sm:w-[70vw]
                      max-sm:max-w-[235px]
                      max-sm:shrink-0
                      max-sm:snap-center
                      max-sm:rounded-[20px]
                      max-sm:p-[18px]

                      sm:p-9

                      ${
                        red
                          ? 'border-[#B12025] bg-[#B12025] text-white'
                          : 'border-[#B12025]/15 bg-[#fffafa] text-[#17191C]'
                      }`}
                  >
                    {/* NUMBER */}

                    <p
                      className={`text-[58px] font-semibold leading-none tracking-[-.075em]

                        max-sm:text-[40px]

                        ${
                          red
                            ? 'text-white/35'
                            : 'text-[#B12025]/25'
                        }`}
                    >
                      {String(index + 1).padStart(
                        2,
                        '0'
                      )}
                    </p>

                    {/* TITLE */}

                    <h3
                      className="
                        mt-5
                        text-[24px]
                        font-semibold
                        tracking-[-.035em]

                        max-sm:mt-[14px]
                        max-sm:text-[17px]
                        max-sm:leading-[1.15]
                      "
                    >
                      {title}
                    </h3>

                    {/* DESCRIPTION */}

                    <p
                      className={`mt-4 text-[13px] leading-7

                        max-sm:mt-[10px]
                        max-sm:text-[9px]
                        max-sm:leading-[1.55]

                        ${
                          red
                            ? 'text-white/72'
                            : 'text-[#17191C]/65'
                        }`}
                    >
                      {description}
                    </p>

                    {/* NOTE */}

                    <p
                      className={`mt-auto border-t pt-5 text-[12px] font-semibold

                        max-sm:pt-[12px]
                        max-sm:text-[8px]
                        max-sm:leading-[1.4]

                        ${
                          red
                            ? 'border-white/20 text-white/85'
                            : 'border-[#B12025]/15 text-[#B12025]'
                        }`}
                    >
                      {note}
                    </p>
                  </article>
                );
              }
            )}
          </div>

          {/* ==========================================
              MOBILE SWIPE LABEL
          ========================================== */}

          <div
            className="
              hidden

              max-sm:mt-[10px]
              max-sm:flex
              max-sm:items-center
              max-sm:justify-center
              max-sm:gap-[5px]
              max-sm:text-[7px]
              max-sm:font-medium
              max-sm:text-[#17191C]/40
            "
          >
            Auto scrolling
            <ArrowUpRight
              size={9}
              className="rotate-45"
            />
          </div>

          {/* ==========================================
              85 / 98 / 15–20 STATS

              MOBILE:
              - horizontal row
              - smaller cards
              - auto scroll
          ========================================== */}

          <div
            ref={statsRef}
            className="
              mt-5
              grid
              gap-4

              md:grid-cols-3

              max-sm:flex
              max-sm:overflow-x-auto
              max-sm:snap-x
              max-sm:snap-mandatory
              max-sm:scroll-smooth
              max-sm:gap-[10px]
              max-sm:pb-[4px]
              max-sm:[scrollbar-width:none]
              max-sm:[&::-webkit-scrollbar]:hidden
            "
          >
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
                value: '15–20%',
                label:
                  'of job applicants pass the hiring checks',
              },
            ].map((stat) => (
              <div
                key={stat.label}
                data-ob-reveal
                className="
                  rounded-[25px]
                  border
                  border-[#B12025]/15
                  bg-white
                  p-7

                  max-sm:min-h-[120px]
                  max-sm:w-[54vw]
                  max-sm:max-w-[185px]
                  max-sm:shrink-0
                  max-sm:snap-center
                  max-sm:rounded-[17px]
                  max-sm:p-[16px]
                "
              >
                <p
                  className="
                    whitespace-nowrap
                    text-[clamp(2.3rem,3.3vw,4rem)]
                    font-semibold
                    tracking-[-.065em]
                    text-[#B12025]

                    max-sm:text-[23px]
                    max-sm:tracking-[-0.05em]
                  "
                >
                  {stat.value}
                </p>

                <p
                  className="
                    mt-2
                    text-[13px]
                    font-medium
                    text-[#17191C]/65

                    max-sm:mt-[7px]
                    max-sm:text-[8px]
                    max-sm:leading-[1.45]
                  "
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          04 — TRAVEL COMPANY TESTIMONIAL

          MOBILE:
          - shorter red section
          - smaller label
          - smaller quote
          - scroll word reveal stays active
          - floating CTA will be hidden in Part 4
      ================================================== */}

      <TravelQuoteReveal />

      {/* ==================================================
          05 — SUPPORT TEAM SETUP

          MOBILE:
          - reduced whitespace
          - reduced heading
          - reduced description
          - smaller cards
          - cards horizontal
          - cards auto scroll

          Continues below.
      ================================================== */}

      <section
        ref={stepsSectionRef}
        className="
          relative
          scroll-mt-[100px]
          bg-white
          py-[90px]

          max-sm:py-[38px]

          lg:flex
          lg:min-h-[710px]
          lg:flex-col
          lg:justify-center
          lg:py-[85px]
        "
      >
        {/* ==========================================
            SETUP SECTION HEADING
        ========================================== */}

        <div
          className="
            mx-auto
            w-full
            max-w-[1400px]
            px-5

            sm:px-8
            lg:px-12
          "
        >
          <p
            data-ob-eyebrow
            data-ob-reveal
            className={`
              ${eyebrow}

              max-sm:text-[8px]
              max-sm:tracking-[0.16em]
            `}
          >
            How your support team is set up
          </p>

          <h2
            data-ob-title
            className={`
              mt-5
              max-w-[980px]
              ${heading}

              max-sm:mt-[12px]
              max-sm:max-w-[290px]
              max-sm:text-[29px]
              max-sm:leading-[1.05]
              max-sm:tracking-[-0.05em]
            `}
          >
            <AnimatedWords text="How your support team is set up" />
          </h2>

          <p
            data-ob-reveal
            className="
              mt-5
              max-w-[770px]
              text-[14px]
              leading-8
              text-[#17191C]/65

              max-sm:mt-[14px]
              max-sm:max-w-[295px]
              max-sm:text-[9px]
              max-sm:leading-[1.65]
            "
          >
            The biggest risk with outsourced support is
            agents who do not know your business. The
            steps below prevent that.
          </p>
        </div>

        {/* ==========================================
            SETUP CARDS VIEWPORT

            mobileStepsRef is on the viewport.
            The effect from Part 1 moves this
            horizontally without moving the page
            vertically.
        ========================================== */}

        <div
          ref={mobileStepsRef}
          className="
            mt-10
            w-full
            overflow-x-auto
            overscroll-x-contain
            scroll-smooth

            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden

            max-sm:mt-[24px]

            lg:overflow-visible
          "
        >
          <div
            ref={stepsTrackRef}
            className="
              flex
              w-max
              snap-x
              snap-mandatory
              gap-4
              px-5
              pb-2

              sm:gap-5
              sm:px-8

              lg:snap-none
              lg:px-12
            "
          >
            {steps.map(
              (
                {
                  title,
                  description,
                },
                index
              ) => {
                const red =
                  index % 2 === 1;

                return (
                  <article
                    key={title}
                    data-ob-card
                    className={`relative flex min-h-[370px] w-[min(86vw,425px)] shrink-0 snap-start flex-col rounded-[30px] border p-8

                      max-sm:min-h-[235px]
                      max-sm:w-[72vw]
                      max-sm:max-w-[250px]
                      max-sm:rounded-[19px]
                      max-sm:p-[17px]

                      sm:w-[450px]
                      sm:p-9

                      lg:min-h-[400px]
                      lg:w-[500px]

                      ${
                        red
                          ? 'border-[#B12025] bg-[#B12025] text-white'
                          : 'border-[#B12025]/15 bg-[#fffafa] text-[#17191C]'
                      }`}
                  >
                    {/* STEP NUMBER */}

                    <p
                      className={`text-[clamp(5.5rem,7vw,7rem)] font-semibold leading-none tracking-[-.09em]

                        max-sm:text-[48px]

                        ${
                          red
                            ? 'text-white/25'
                            : 'text-[#B12025]/20'
                        }`}
                    >
                      {String(index + 1).padStart(
                        2,
                        '0'
                      )}
                    </p>

                    {/* CARD CONTENT */}

                    <div
                      className="
                        mt-auto
                        pt-10

                        max-sm:pt-[18px]
                      "
                    >
                      <h3
                        data-ob-card-title
                        className="
                          text-[28px]
                          font-semibold
                          tracking-[-.045em]

                          max-sm:text-[17px]
                          max-sm:leading-[1.15]
                        "
                      >
                        {title}
                      </h3>

                      <p
                        data-ob-card-copy
                        className={`mt-5 max-w-[395px] text-[14px] leading-[1.9]

                          max-sm:mt-[10px]
                          max-sm:text-[9px]
                          max-sm:leading-[1.55]

                          ${
                            red
                              ? 'text-white/72'
                              : 'text-[#17191C]/65'
                          }`}
                      >
                        {description}
                      </p>

                      <div
                        className={`mt-6 flex h-10 w-10 items-center justify-center rounded-full

                          max-sm:mt-[14px]
                          max-sm:h-[30px]
                          max-sm:w-[30px]

                          ${
                            red
                              ? 'bg-white text-[#B12025]'
                              : 'bg-[#B12025] text-white'
                          }`}
                      >
                        <Check
                          size={17}
                          strokeWidth={2}

                          className="
                            max-sm:h-[13px]
                            max-sm:w-[13px]
                          "
                        />
                      </div>
                    </div>
                  </article>
                );
              }
            )}
          </div>
        </div>

        {/* ==========================================
            DESKTOP SETUP PROGRESS
        ========================================== */}

        <div
          className="
            mx-auto
            mt-8
            hidden
            w-full
            max-w-[1400px]
            px-12

            lg:block
          "
        >
          <div className="h-[2px] overflow-hidden rounded-full bg-[#B12025]/10">
            <div
              className="
                h-full
                origin-left
                bg-[#B12025]
                transition-transform
                duration-150
              "
              style={{
                transform: `scaleX(${Math.max(
                  stepsProgress,
                  0.03
                )})`,
              }}
            />
          </div>
        </div>
      </section>
            {/* ==================================================
          06 — COMMON QUESTIONS

          MOBILE:
          - reduced section whitespace
          - smaller heading
          - smaller text
          - questions in one horizontal row
          - side scroll
          - smaller FAQ cards

          TABLET / DESKTOP:
          original layout preserved
      ================================================== */}

      <section
        className="
          bg-[#fff8f8]
          px-5
          py-[90px]

          max-sm:px-[18px]
          max-sm:py-[38px]

          sm:px-8

          lg:px-12
          lg:py-[130px]
        "
      >
        <div
          className="
            mx-auto
            grid
            max-w-[1400px]
            gap-12

            max-sm:gap-[24px]

            lg:grid-cols-[.83fr_1.17fr]
            lg:gap-20
          "
        >
          {/* ==========================================
              FAQ INTRO
          ========================================== */}

          <div>
            <p
              data-ob-eyebrow
              data-ob-reveal
              className={`
                ${eyebrow}

                max-sm:text-[8px]
                max-sm:tracking-[0.16em]
              `}
            >
              Common questions
            </p>

            <h2
              data-ob-title
              className={`
                mt-5
                ${heading}

                max-sm:mt-[12px]
                max-sm:max-w-[295px]
                max-sm:text-[29px]
                max-sm:leading-[1.05]
                max-sm:tracking-[-0.05em]
              `}
            >
              <AnimatedWords text="Questions businesses ask before starting outbound support." />
            </h2>

            <p
              data-ob-reveal
              className="
                mt-6
                max-w-[420px]
                text-[14px]
                leading-[1.8]
                text-[#17191C]/65

                max-sm:mt-[14px]
                max-sm:max-w-[295px]
                max-sm:text-[9px]
                max-sm:leading-[1.6]
              "
            >
              These are the practical questions that
              usually come up before a campaign starts.
              If your situation is different, we can go
              through it during the discovery call.
            </p>

            <Link
              data-ob-reveal
              href="/book-a-free-call"
              className="
                group
                mt-8
                inline-flex
                items-center
                gap-2
                text-[12px]
                font-semibold
                text-[#B12025]

                max-sm:mt-[18px]
                max-sm:text-[9px]
              "
            >
              Talk to our team

              <ArrowUpRight
                size={15}
                className="
                  transition-transform
                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5

                  max-sm:h-[11px]
                  max-sm:w-[11px]
                "
              />
            </Link>
          </div>

          {/* ==========================================
              FAQ CARDS

              MOBILE:
              horizontal side-scroll
          ========================================== */}

          <div
            className="
              space-y-3

              max-sm:flex
              max-sm:space-y-0
              max-sm:gap-[10px]
              max-sm:overflow-x-auto
              max-sm:snap-x
              max-sm:snap-mandatory
              max-sm:scroll-smooth
              max-sm:pb-[3px]
              max-sm:[scrollbar-width:none]
              max-sm:[&::-webkit-scrollbar]:hidden
            "
          >
            {faqs.map(
              (
                {
                  question,
                  answer,
                },
                index
              ) => {
                const open =
                  openFaq === index;

                return (
                  <div
                    key={question}
                    data-ob-reveal
                    className="
                      overflow-hidden
                      rounded-[22px]
                      border
                      border-[#B12025]/15
                      bg-white

                      max-sm:w-[76vw]
                      max-sm:max-w-[265px]
                      max-sm:shrink-0
                      max-sm:snap-center
                      max-sm:rounded-[17px]
                    "
                  >
                    <button
                      type="button"
                      aria-expanded={open}
                      onClick={() =>
                        setOpenFaq(
                          open
                            ? null
                            : index
                        )
                      }
                      className="
                        flex
                        w-full
                        items-start
                        justify-between
                        gap-5
                        p-6
                        text-left

                        max-sm:gap-[10px]
                        max-sm:p-[16px]

                        sm:p-7
                      "
                    >
                      <span
                        className="
                          text-[15px]
                          font-semibold
                          leading-7
                          text-[#17191C]

                          max-sm:text-[11px]
                          max-sm:leading-[1.4]
                        "
                      >
                        {question}
                      </span>

                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors

                          max-sm:h-[28px]
                          max-sm:w-[28px]

                          ${
                            open
                              ? 'bg-[#B12025] text-white'
                              : 'bg-[#B12025]/8 text-[#B12025]'
                          }`}
                      >
                        <ChevronDown
                          size={16}
                          strokeWidth={1.8}
                          className={`transition-transform duration-300

                            max-sm:h-[12px]
                            max-sm:w-[12px]

                            ${
                              open
                                ? 'rotate-180'
                                : ''
                            }`}
                        />
                      </span>
                    </button>

                    <div
                      className={`
                        grid
                        transition-[grid-template-rows]
                        duration-300
                        ease-out

                        ${
                          open
                            ? 'grid-rows-[1fr]'
                            : 'grid-rows-[0fr]'
                        }
                      `}
                    >
                      <div className="overflow-hidden">
                        <p
                          className="
                            px-6
                            pb-7
                            text-[13px]
                            leading-8
                            text-[#17191C]/70

                            max-sm:px-[16px]
                            max-sm:pb-[16px]
                            max-sm:text-[9px]
                            max-sm:leading-[1.65]

                            sm:px-7
                          "
                        >
                          {answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>

        {/* Mobile swipe indicator */}

        <div
          className="
            hidden

            max-sm:mt-[12px]
            max-sm:flex
            max-sm:items-center
            max-sm:justify-end
            max-sm:gap-[5px]
            max-sm:text-[7px]
            max-sm:font-medium
            max-sm:text-[#17191C]/40
          "
        >
          Swipe for more questions

          <ArrowUpRight
            size={9}
            className="rotate-45"
          />
        </div>
      </section>

      {/* ==================================================
          07 — RELATED SERVICES
      ================================================== */}

      <section
        className="
          bg-white
          px-5
          py-[85px]

          max-sm:px-[18px]
          max-sm:py-[45px]

          sm:px-8

          lg:px-12
          lg:py-[120px]
        "
      >
        <div className="mx-auto max-w-[1400px]">
          <div
            className="
              flex
              flex-col
              gap-8

              lg:flex-row
              lg:items-end
              lg:justify-between
            "
          >
            <div>
              <p
                data-ob-eyebrow
                data-ob-reveal
                className={`
                  ${eyebrow}

                  max-sm:text-[8px]
                  max-sm:tracking-[0.16em]
                `}
              >
                Related customer support services
              </p>

              <h2
                data-ob-title
                className={`
                  mt-5
                  max-w-[780px]
                  ${heading}

                  max-sm:mt-[12px]
                  max-sm:max-w-[300px]
                  max-sm:text-[29px]
                  max-sm:leading-[1.05]
                  max-sm:tracking-[-0.05em]
                `}
              >
                <AnimatedWords text="More ways we can support your customers." />
              </h2>
            </div>

            <p
              data-ob-reveal
              className="
                max-w-[430px]
                text-[14px]
                leading-8
                text-[#17191C]/65

                max-sm:max-w-[295px]
                max-sm:text-[9px]
                max-sm:leading-[1.6]
              "
            >
              Outbound calling can work on its own or
              alongside your inbound support, customer
              service and retention teams.
            </p>
          </div>

          {/* ==========================================
              RELATED SERVICE CARDS
          ========================================== */}

          <div
            className="
              mt-12
              grid
              gap-4

              max-sm:mt-[24px]
              max-sm:grid-cols-2
              max-sm:gap-[8px]

              md:grid-cols-2
              xl:grid-cols-4
            "
          >
            {related.map(
              (
                {
                  title,
                  href,
                },
                index
              ) => (
                <Link
                  key={title}
                  href={href}
                  data-ob-reveal
                  className="
                    group
                    flex
                    min-h-[200px]
                    flex-col
                    justify-between
                    rounded-[26px]
                    border
                    border-[#B12025]/15
                    bg-[#fffafa]
                    p-7
                    transition
                    duration-300

                    hover:-translate-y-1
                    hover:border-[#B12025]
                    hover:bg-white
                    hover:shadow-[0_20px_50px_rgba(177,32,37,.08)]

                    max-sm:min-h-[135px]
                    max-sm:rounded-[17px]
                    max-sm:p-[14px]
                  "
                >
                  <div className="flex items-start justify-between gap-4">
                    <span
                      className="
                        text-[11px]
                        font-semibold
                        text-[#B12025]/50

                        max-sm:text-[8px]
                      "
                    >
                      {String(index + 1).padStart(
                        2,
                        '0'
                      )}
                    </span>

                    <span
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        bg-[#B12025]/8
                        text-[#B12025]
                        transition
                        duration-300

                        group-hover:bg-[#B12025]
                        group-hover:text-white

                        max-sm:h-[27px]
                        max-sm:w-[27px]
                      "
                    >
                      <ArrowUpRight
                        size={15}
                        className="
                          transition-transform
                          group-hover:-translate-y-0.5
                          group-hover:translate-x-0.5

                          max-sm:h-[11px]
                          max-sm:w-[11px]
                        "
                      />
                    </span>
                  </div>

                  <h3
                    className="
                      max-w-[250px]
                      text-[20px]
                      font-semibold
                      leading-[1.2]
                      tracking-[-.04em]
                      text-[#17191C]

                      max-sm:text-[12px]
                      max-sm:leading-[1.2]
                    "
                  >
                    {title}
                  </h3>
                </Link>
              )
            )}
          </div>
        </div>
      </section>

      {/* ==================================================
          08 — FINAL CTA / CONTACT
      ================================================== */}

      <section
        id="contact"
        className="
          relative
          overflow-hidden
          bg-[#17191C]
          px-5
          py-[100px]
          text-white

          max-sm:px-[18px]
          max-sm:py-[55px]

          sm:px-8

          lg:px-12
          lg:py-[145px]
        "
      >
        {/* Background decorative circle */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-[180px]
            -top-[180px]
            h-[520px]
            w-[520px]
            rounded-full
            border
            border-white/10

            max-sm:-right-[190px]
            max-sm:-top-[170px]
            max-sm:h-[350px]
            max-sm:w-[350px]
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -bottom-[200px]
            -left-[170px]
            h-[450px]
            w-[450px]
            rounded-full
            border
            border-[#B12025]/30

            max-sm:hidden
          "
        />

        <div
          className="
            relative
            z-10
            mx-auto
            max-w-[1400px]
          "
        >
          <p
            data-ob-eyebrow
            data-ob-reveal
            className="
              text-[11px]
              font-semibold
              uppercase
              tracking-[0.2em]
              text-[#E86A6F]

              max-sm:text-[8px]
              max-sm:tracking-[0.16em]
            "
          >
            Start a conversation
          </p>

          <div
            className="
              mt-6
              grid
              gap-10

              max-sm:mt-[14px]
              max-sm:gap-[24px]

              lg:grid-cols-[1fr_.55fr]
              lg:items-end
            "
          >
            <h2
              data-ob-title
              className="
                max-w-[900px]
                text-[clamp(2.6rem,5vw,5.7rem)]
                font-semibold
                leading-[1.07]
                tracking-[-.065em]

                max-sm:max-w-[300px]
                max-sm:text-[31px]
                max-sm:leading-[1.06]
                max-sm:tracking-[-0.05em]
              "
            >
              <AnimatedWords text="Tell us what your outbound team needs to achieve." />
            </h2>

            <div>
              <p
                data-ob-reveal
                className="
                  max-w-[430px]
                  text-[14px]
                  leading-8
                  text-white/65

                  max-sm:max-w-[295px]
                  max-sm:text-[9px]
                  max-sm:leading-[1.65]
                "
              >
                Share the size of your calling list,
                the countries you need to reach and the
                result you want from each call. We will
                explain how the team could be set up and
                what it would cost.
              </p>

              <Link
                data-ob-reveal
                href="/book-a-free-call"
                className="
                  group
                  mt-8
                  inline-flex
                  min-h-[54px]
                  items-center
                  justify-center
                  gap-3
                  rounded-full
                  bg-[#B12025]
                  px-7
                  py-3
                  text-[12px]
                  font-semibold
                  text-white
                  transition
                  hover:bg-[#951b20]

                  max-sm:mt-[20px]
                  max-sm:min-h-[42px]
                  max-sm:px-[17px]
                  max-sm:text-[9px]
                "
              >
                Book a free discovery call

                <ArrowUpRight
                  size={16}
                  className="
                    transition-transform
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5

                    max-sm:h-[12px]
                    max-sm:w-[12px]
                  "
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          FLOATING DISCOVERY CTA

          IMPORTANT:
          User requested this to be REMOVED on mobile.

          max-sm:hidden means:
          Mobile  -> hidden
          Tablet  -> visible
          Desktop -> visible

          Existing stickyCTA logic is preserved.
      ================================================== */}

     
   
    </div>
  );
}