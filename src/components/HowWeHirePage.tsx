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
  GraduationCap,
  Languages,
  LockKeyhole,
  SearchCheck,
  ShieldCheck,
  CalendarCheck2,
  Fingerprint,
  BookOpenCheck,
} from 'lucide-react';

// ======================================================
// FIRSTNOTCH SOLUTIONS — HOW WE HIRE
//
// PRIMARY RED: #B12025
// WHITE: #FFFFFF
//
// GSAP RISING TEXT HEADINGS
// HORIZONTAL SCROLLING CHECK CARDS
// NO CANVAS / NO FALLING DOTS
// ======================================================

// Replace these only after the durations are confirmed.
const TRAINING_WEEKS: number | null = null;
const HIRING_WEEKS: number | null = null;

// ======================================================
// CONTENT
// ======================================================

const checks = [
  {
    title: 'Language test',
    Icon: Languages,
    note: 'English · Sinhala · Tamil · Hindi',
    description:
      'Applicants are tested on spoken and written English. Where your account needs it, they are also tested in Sinhala, Tamil or Hindi.',
  },
  {
    title: 'Technical assessment',
    Icon: BookOpenCheck,
    note: 'Practical tests for each role',
    description:
      'Most roles include a practical test that fits the job. For example, typing speed and accuracy for data roles, or a sample ticket for IT support roles.',
  },
  {
    title: 'Experience review',
    Icon: SearchCheck,
    note: 'Relevant experience reviewed',
    description:
      'Past roles are reviewed to see whether the applicant has done similar work before.',
  },
  {
    title: 'Reference checks',
    Icon: FileCheck2,
    note: 'Work history verified',
    description:
      "Previous employers are contacted to confirm the applicant's work history.",
  },
] as const;

const training = [
  {
    title: 'Policies & data handling',
    body:
      'FirstNotch policies, confidentiality and responsible data handling.',
  },
  {
    title: 'Your products',
    body:
      'Your products, services, policies and the questions customers ask most.',
  },
  {
    title: 'Your tools & scripts',
    body:
      'Practice using your systems, approved processes and scripts.',
  },
  {
    title: 'Final process test',
    body:
      'Only staff who pass the test on your processes move onto your account.',
  },
] as const;

const monitoring = [
  {
    title: 'Quality scores',
    Icon: ClipboardCheck,
    body:
      'Calls and tasks are given QA scores, which are then used in coaching. You see these scores in your monthly report.',
    foot: 'Scored · Reported · Coached',
  },
  {
    title: 'Time keeping',
    Icon: Clock3,
    body:
      'Attendance and punctuality are recorded for every team member.',
    foot: 'Attendance · Punctuality',
  },
  {
    title: 'Monthly reviews',
    Icon: CalendarCheck2,
    body:
      'Managers meet each team member once a month to go through their scores and agree what to coach.',
    foot: 'Review · Feedback · Coaching',
  },
  {
    title: 'Company policies',
    Icon: ShieldCheck,
    body:
      'Staff must follow strict policies on conduct and on how client work is done.',
    foot: 'Conduct · Standards',
  },
] as const;

const security = [
  {
    title: 'Limited access',
    Icon: LockKeyhole,
    body:
      'Access controls mean each person can only open the data needed for their work.',
    badge: 'Access by role',
  },
  {
    title: 'Data handling training',
    Icon: GraduationCap,
    body:
      'All staff complete mandatory training on data handling and confidentiality.',
    badge: 'Mandatory training',
  },
  {
    title: 'Confidentiality agreements',
    Icon: Fingerprint,
    body:
      'Every team member signs a confidentiality agreement as part of their contract.',
    badge: 'Signed agreement',
  },
] as const;

const faqs = [
  {
    question:
      'Can we interview the people who will work on our account?',
    answer:
      'Yes. You can meet shortlisted staff on a video call before they join your account.',
  },
  {
    question: 'Can we add our own test?',
    answer:
      'Yes. A test or question set from your business can be added to the checks for your account.',
  },
  {
    question: 'Which languages can the team work in?',
    answer:
      'English, Sinhala, Tamil and Hindi. Staff for your account are chosen to match the languages your customers use.',
  },
  {
    question: 'Are team members employees or freelancers?',
    answer:
      'They are full-time employees of FirstNotch and work from the Colombo office.',
  },
  {
    question:
      'What happens if someone on our account leaves?',
    answer:
      'A replacement goes through the same checks and training. The handover timing is agreed with you.',
  },
  {
    question:
      'How long does it take to hire for a new account?',
    answer:
      HIRING_WEEKS === null
        ? 'Hiring and training timing is to be confirmed. It depends on team size and the languages needed.'
        : `Hiring and training usually take ${HIRING_WEEKS} weeks, depending on the size of the team and languages needed.`,
  },
] as const;

const quote =
  'Parents often tell us how clear and polite the support team sounds on the phone. That matters to the families we serve.';

const label =
  'text-[11px] font-semibold uppercase tracking-[0.2em]';

const heading =
  'text-[clamp(2.7rem,5vw,5.8rem)] font-semibold leading-[1.08] tracking-[-0.065em]';

// ======================================================
// GSAP RISING TEXT COMPONENT
// ======================================================

function RisingWords({ text }: { text: string }) {
  return (
    <span role="text" aria-label={text}>
      {text.split(/\s+/).map((word, i) => (
        <span
          key={`${i}-${word}`}
          aria-hidden="true"
        >
          {i ? ' ' : null}

          <span className="-mb-[.12em] inline-block overflow-hidden pb-[.12em] align-bottom">
            <span
              data-hire-word
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
// TESTIMONIAL — SCROLL-LINKED WORD REVEAL
// ======================================================

function HiringTestimonial() {
  const quoteRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = quoteRef.current;

    if (!el) return;

    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    mm.add(
      '(prefers-reduced-motion: no-preference)',
      () => {
        const tween = gsap.fromTo(
          el.querySelectorAll(
            '[data-hire-quote-word]'
          ),
          {
            opacity: 0.18,
            y: 12,
            textShadow:
              '0 0 0 rgba(85,0,0,0)',
          },
          {
            opacity: 1,
            y: 0,
            textShadow:
              '0 0 0 rgba(85,0,0,0)',
            stagger: 0.035,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              end: 'bottom 45%',
              scrub: true,
            },
          }
        );

        return () => tween.kill();
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <p
      ref={quoteRef}
      className="text-[clamp(1.8rem,3vw,3.5rem)] font-semibold leading-[1.3] tracking-[-0.04em]"
    >
      {quote.split(/\s+/).map((word, index) => (
        <span
          key={index}
          data-hire-quote-word
          className="inline-block"
        >
          {word}&nbsp;
        </span>
      ))}
    </p>
  );
}
// ======================================================
// MAIN HOW WE HIRE PAGE
// ======================================================

export default function HowWeHirePage() {
  const rootRef = useRef<HTMLDivElement>(null);

  const checksRef = useRef<HTMLElement>(null);

  const checksTrackRef = useRef<HTMLDivElement>(null);

  const checksProgressRef = useRef<HTMLDivElement>(null);

  const marqueeRef = useRef<HTMLDivElement>(null);

  const pageProgressRef = useRef<HTMLDivElement>(null);

  const [remaining, setRemaining] = useState(100);

  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  const [officeOpen, setOfficeOpen] =
    useState<boolean | null>(null);

  // ====================================================
  // SRI LANKA OFFICE HOURS
  // ====================================================

  useEffect(() => {
    function refreshHours() {
      const parts = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Colombo',
        weekday: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).formatToParts(new Date());

      const part = (kind: string) =>
        parts.find((x) => x.type === kind)?.value ?? '';

      const mins =
        Number(part('hour')) * 60 +
        Number(part('minute'));

      setOfficeOpen(
        !['Sat', 'Sun'].includes(part('weekday')) &&
          mins >= 600 &&
          mins < 1140
      );
    }

    refreshHours();

    const timer = window.setInterval(
      refreshHours,
      60000
    );

    return () => window.clearInterval(timer);
  }, []);

  // ====================================================
  // GSAP ANIMATIONS
  // ====================================================

  useEffect(() => {
    const root = rootRef.current;

    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    // ================================================
    // RISING TEXT HEADING ANIMATIONS
    // ================================================

    mm.add(
      '(prefers-reduced-motion: no-preference)',
      () => {
        const ctx = gsap.context(() => {
          root
            .querySelectorAll<HTMLElement>(
              '[data-hire-title]'
            )
            .forEach((title) => {
              const words = title.querySelectorAll(
                '[data-hire-word]'
              );

              if (!words.length) return;

              const hero = title.tagName === 'H1';

              gsap.fromTo(
                words,
                {
                  yPercent: 115,
                  autoAlpha: 0,
                },
                {
                  yPercent: 0,
                  autoAlpha: 1,

                  duration: hero ? 1.3 : 0.95,

                  stagger: hero ? 0.065 : 0.045,

                  ease: 'power4.out',

                  clearProps:
                    'transform,opacity,visibility',

                  scrollTrigger: {
                    trigger: title,

                    start: hero
                      ? 'top 98%'
                      : 'top 88%',

                    once: true,
                  },
                }
              );
            });

          // ==========================================
          // NORMAL ELEMENT REVEALS
          // ==========================================

          root
            .querySelectorAll<HTMLElement>(
              '[data-hire-reveal]'
            )
            .forEach((element) => {
              gsap.fromTo(
                element,
                {
                  y: 40,
                  opacity: 0,
                },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.85,
                  ease: 'power3.out',
                  clearProps: 'all',

                  scrollTrigger: {
                    trigger: element,
                    start: 'top 92%',
                    once: true,
                  },
                }
              );
            });
        }, root);

        return () => ctx.revert();
      }
    );

    return () => mm.revert();
  }, []);

  // ====================================================
  // PAGE SCROLL PROGRESS
  // ====================================================

  useEffect(() => {
    const progress = pageProgressRef.current;

    if (!progress) return;

    let frame = 0;

    const updateProgress = () => {
      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        const scrollableHeight =
          document.documentElement.scrollHeight -
          window.innerHeight;

        const percentage =
          scrollableHeight > 0
            ? (window.scrollY / scrollableHeight) * 100
            : 0;

        progress.style.width = `${Math.min(
          100,
          Math.max(0, percentage)
        )}%`;
      });
    };

    updateProgress();

    window.addEventListener('scroll', updateProgress, {
      passive: true,
    });

    window.addEventListener('resize', updateProgress);

    return () => {
      cancelAnimationFrame(frame);

      window.removeEventListener(
        'scroll',
        updateProgress
      );

      window.removeEventListener(
        'resize',
        updateProgress
      );
    };
  }, []);

  // ====================================================
  // DESKTOP CHECK CARDS — HORIZONTAL SCROLL
  // MOBILE WILL USE NORMAL HORIZONTAL CARDS
  // ====================================================

  useEffect(() => {
    const section = checksRef.current;
    const track = checksTrackRef.current;
    const progress = checksProgressRef.current;

    if (!section || !track) return;

    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      const distance = () =>
        Math.max(
          0,
          track.scrollWidth -
            track.parentElement!.clientWidth
        );

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',

        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance() + 400}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,

          onUpdate: (self) => {
            if (progress) {
              progress.style.width = `${
                self.progress * 100
              }%`;
            }
          },
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => mm.revert();
  }, []);

  // ====================================================
  // MOBILE HORIZONTAL CARD SCROLLING
  // ====================================================

  useEffect(() => {
    const mobileQuery = window.matchMedia(
      '(max-width: 639px)'
    );

    const containers =
      document.querySelectorAll<HTMLElement>(
        '[data-mobile-auto-scroll]'
      );

    const cleanups: Array<() => void> = [];

    containers.forEach((container) => {
      let interval: number | undefined;
      let resumeTimeout: number | undefined;

      const getCards = () =>
        Array.from(
          container.querySelectorAll<HTMLElement>(
            '[data-mobile-scroll-card]'
          )
        );

      const scrollNext = () => {
        if (!mobileQuery.matches) return;

        if (
          window.matchMedia(
            '(prefers-reduced-motion: reduce)'
          ).matches
        ) {
          return;
        }

        const cards = getCards();

        if (cards.length < 2) return;

        const currentLeft = container.scrollLeft;

        const nextCard = cards.find(
          (card) =>
            card.offsetLeft -
              container.offsetLeft >
            currentLeft + 8
        );

        if (nextCard) {
          container.scrollTo({
            left:
              nextCard.offsetLeft -
              container.offsetLeft,
            behavior: 'smooth',
          });
        } else {
          container.scrollTo({
            left: 0,
            behavior: 'smooth',
          });
        }
      };

      const start = () => {
        if (interval !== undefined) return;

        if (!mobileQuery.matches) return;

        interval = window.setInterval(
          scrollNext,
          3500
        );
      };

      const stop = () => {
        if (interval !== undefined) {
          window.clearInterval(interval);
          interval = undefined;
        }
      };

      const pause = () => {
        stop();

        if (resumeTimeout !== undefined) {
          window.clearTimeout(resumeTimeout);
        }

        resumeTimeout = window.setTimeout(
          start,
          6000
        );
      };

      const handleMediaChange = () => {
        if (mobileQuery.matches) {
          start();
        } else {
          stop();
        }
      };

      container.addEventListener(
        'touchstart',
        pause,
        { passive: true }
      );

      container.addEventListener(
        'pointerdown',
        pause
      );

      mobileQuery.addEventListener(
        'change',
        handleMediaChange
      );

      start();

      cleanups.push(() => {
        stop();

        if (resumeTimeout !== undefined) {
          window.clearTimeout(resumeTimeout);
        }

        container.removeEventListener(
          'touchstart',
          pause
        );

        container.removeEventListener(
          'pointerdown',
          pause
        );

        mobileQuery.removeEventListener(
          'change',
          handleMediaChange
        );
      });
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

    // ====================================================
  // APPLICANT SCREENING COUNTER
  // ====================================================

  useEffect(() => {
    const section = document.querySelector(
      '[data-hire-screening]'
    );

    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;

        const counter = { value: 100 };

        const animation = gsap.to(counter, {
          value: 18,
          duration: 2.5,
          ease: 'power2.out',

          onUpdate: () => {
            setRemaining(Math.round(counter.value));
          },
        });

        observer.disconnect();

        return () => animation.kill();
      },
      {
        threshold: 0.25,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  // ====================================================
  // SMOOTH SECTION NAVIGATION
  // ====================================================

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);

    if (!element) return;

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    element.scrollIntoView({
      behavior: reducedMotion ? 'instant' : 'smooth',
      block: 'start',
    });
  };

  // ====================================================
  // PAGE JSX
  // ====================================================

  return (
    <div
      ref={rootRef}
      className="
        relative
        min-h-screen
        overflow-x-clip
        bg-white
        font-normal
        text-[#17191C]
      "
    >
      {/* ================================================
          PAGE SCROLL PROGRESS
      ================================================ */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          fixed
          left-0
          top-0
          z-[100]
          h-[3px]
          w-full
          bg-transparent
        "
      >
        <div
          ref={pageProgressRef}
          className="
            h-full
            w-0
            bg-[#B12025]
          "
        />
      </div>

      {/* ================================================
          HERO SECTION

          MOBILE:
          - Reduced height
          - Smaller headings
          - Compact descriptions
          - Smaller buttons
          - Four checks in one row

          DESKTOP:
          - Original spacious layout
      ================================================ */}

      <section
        id="how-we-hire"
        aria-labelledby="hire-hero-title"
        className="
          relative
          overflow-hidden
          bg-[#B12025]
          px-5
          pb-[45px]
          pt-[55px]
          text-white

          sm:px-8
          sm:pb-[110px]
          sm:pt-[150px]

          lg:px-14
          lg:pb-[150px]
          lg:pt-[175px]
        "
      >
        <div className="relative mx-auto max-w-[1440px]">
          {/* EYEBROW */}

          <p
            data-hire-reveal
            className="
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.22em]
              text-white/85

              sm:text-[11px]
            "
          >
            OUR PEOPLE. YOUR STANDARDS.
          </p>

          {/* MAIN HERO HEADING */}

          <h1
            id="hire-hero-title"
            data-hire-title
            className="
              mt-5
              max-w-[1250px]
              font-semibold
              leading-[1.04]
              tracking-[-0.075em]
              text-white

              sm:mt-9
            "
          >
            <span
              className="
                block
                whitespace-nowrap
                text-[clamp(2.2rem,10vw,3rem)]

                sm:whitespace-normal
                sm:text-[clamp(4rem,8vw,9.5rem)]
              "
            >
              <RisingWords text="How we hire" />
            </span>

            <span
              className="
                mt-4
                block
                max-w-[1170px]
                text-[clamp(1.65rem,7.5vw,2.2rem)]
                leading-[1.15]

                sm:mt-6
                sm:text-[clamp(2.5rem,5.25vw,6.2rem)]
                sm:leading-[1.1]
              "
            >
              <RisingWords
                text="Only 15 to 20% of applicants pass our checks."
              />
            </span>
          </h1>

          {/* DIVIDER */}

          <div
            aria-hidden="true"
            className="
              mt-7
              h-px
              w-full
              bg-white/30

              sm:mt-14
            "
          />

          {/* HERO DESCRIPTION + FOUR CHECKS */}

          <div
            className="
              mt-6
              grid
              gap-7

              sm:mt-10
              sm:gap-12

              lg:grid-cols-[1fr_.8fr]
              lg:gap-20
            "
          >
            {/* LEFT CONTENT */}

            <div>
              <p
                data-hire-reveal
                className="
                  max-w-[710px]
                  text-[11px]
                  leading-[1.55]
                  text-white

                  sm:text-[clamp(1rem,1.65vw,1.35rem)]
                  sm:leading-[1.8]
                "
              >
                We take hiring seriously because the people
                working on your account represent your
                business. Every applicant goes through
                language, technical, experience and
                reference checks before joining our team.
              </p>

              <p
                data-hire-reveal
                className="
                  mt-2
                  max-w-[670px]
                  text-[11px]
                  leading-[1.55]
                  text-white/85

                  sm:mt-5
                  sm:text-[14px]
                  sm:leading-[1.9]
                "
              >
                We look for people who communicate clearly,
                understand their responsibilities and can
                deliver work to the standards you expect.
              </p>

              {/* HERO BUTTONS */}

              <div
                data-hire-reveal
                className="
                  mt-4
                  flex
                  flex-nowrap
                  items-center
                  gap-2

                  sm:mt-9
                  sm:flex-wrap
                  sm:gap-3
                "
              >
                <Link
                  href="/#contact"
                  className="
                    inline-flex
                    min-h-[38px]
                    shrink-0
                    items-center
                    justify-center
                    gap-2
                    rounded-full
                    border
                    border-white
                    bg-white
                    px-3
                    text-[9px]
                    font-semibold
                    text-[#B12025]
                    transition-colors
                    duration-300
                    hover:bg-[#fff2f2]

                    sm:min-h-[54px]
                    sm:gap-3
                    sm:px-6
                    sm:text-[12px]
                  "
                >
                  Book a free discovery call

                  <ArrowUpRight
                    aria-hidden="true"
                    className="
                      h-[13px]
                      w-[13px]

                      sm:h-[17px]
                      sm:w-[17px]
                    "
                  />
                </Link>

                <button
                  type="button"
                  onClick={() =>
                    scrollToSection('four-checks')
                  }
                  className="
                    inline-flex
                    min-h-[38px]
                    shrink-0
                    items-center
                    justify-center
                    gap-2
                    rounded-full
                    border
                    border-white/50
                    px-3
                    text-[9px]
                    font-semibold
                    text-white
                    transition-colors
                    duration-300
                    hover:bg-white/10

                    sm:min-h-[54px]
                    sm:gap-3
                    sm:px-6
                    sm:text-[12px]
                  "
                >
                  Explore the four checks

                  <ArrowDownRight
                    aria-hidden="true"
                    className="
                      h-[13px]
                      w-[13px]

                      sm:h-[17px]
                      sm:w-[17px]
                    "
                  />
                </button>
              </div>
            </div>

            {/* FOUR CHECKS — ONE ROW ON MOBILE */}

            <div
              data-hire-reveal
              className="
                grid
                grid-cols-4
                content-start
                gap-x-3
                gap-y-0

                sm:grid-cols-2
                sm:gap-x-7
                sm:gap-y-7
              "
            >
              {[
                'Language test',
                'Technical assessment',
                'Experience review',
                'Reference checks',
              ].map((title, index) => (
                <div
                  key={title}
                  className="
                    min-w-0
                    border-b
                    border-white/35
                    pb-3

                    sm:pb-5
                  "
                >
                  <span
                    className="
                      font-mono
                      text-[10px]
                      text-white/70

                      sm:text-[12px]
                    "
                  >
                    0{index + 1}
                  </span>

                  <p
                    className="
                      mt-2
                      text-[10px]
                      font-medium
                      leading-[1.35]
                      text-white

                      sm:mt-3
                      sm:text-[clamp(.98rem,1.35vw,1.22rem)]
                      sm:leading-6
                    "
                  >
                    {title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================
          FOUR CHECKS SECTION

          MOBILE:
          - Reduced white spacing
          - Smaller heading
          - Applicants remaining hidden
          - Shorter horizontal cards
      ================================================ */}

      <section
        id="four-checks"
        ref={checksRef}
        data-hire-screening
        aria-labelledby="four-checks-title"
        className="
          relative
          scroll-mt-[120px]
          bg-[#fff9f9]
          py-[35px]

          sm:py-[95px]

          lg:flex
          lg:min-h-[760px]
          lg:flex-col
          lg:justify-center
        "
      >
        <div
          className="
            mx-auto
            w-full
            max-w-[1440px]
            px-5

            sm:px-8

            lg:px-14
          "
        >
          {/* SECTION LABEL */}

          <p
            data-hire-reveal
            className={`${label} text-[#B12025]`}
          >
            THE SELECTION PROCESS
          </p>

          {/* SECTION HEADING */}

          <h2
            id="four-checks-title"
            data-hire-title
            className="
              mt-3
              max-w-[920px]
              text-[27px]
              font-semibold
              leading-[1.12]
              tracking-[-0.055em]

              sm:mt-5
              sm:text-[clamp(2.7rem,5vw,5.8rem)]
              sm:leading-[1.08]
              sm:tracking-[-0.065em]
            "
          >
            <RisingWords
              text="The four checks before anyone is hired."
            />
          </h2>

          {/* DESCRIPTION */}

          <p
            data-hire-reveal
            className="
              mt-3
              max-w-[690px]
              text-[11px]
              leading-[1.6]
              text-[#17191C]/65

              sm:mt-5
              sm:text-[13px]
              sm:leading-7
            "
          >
            Each applicant completes a structured screening
            process. We assess communication, practical
            skills, previous experience and references
            before making a hiring decision.
          </p>

          {/* APPLICANTS REMAINING — DESKTOP ONLY */}

          <div
            data-hire-reveal
            className="
              mt-7
              hidden
              items-center
              gap-4

              sm:flex
            "
          >
            <span
              className="
                rounded-full
                border
                border-[#B12025]/20
                bg-white
                px-5
                py-3
                text-[12px]
                font-semibold
                text-[#B12025]
              "
            >
              Applicants remaining: {remaining}
            </span>

            <span
              className="
                text-[11px]
                text-[#17191C]/50
              "
            >
              Example screening journey
            </span>
          </div>
        </div>

        {/* ============================================
            HORIZONTAL CHECK CARDS
        ============================================ */}

        <div
          className="
            mt-5
            w-full
            snap-x
            snap-mandatory
            overflow-x-auto
            overscroll-x-contain

            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden

            sm:mt-10

            lg:overflow-visible
            lg:snap-none
          "
        >
          <div
            ref={checksTrackRef}
            data-mobile-auto-scroll
            className="
              flex
              w-max
              gap-3
              px-5

              sm:gap-5
              sm:px-8

              lg:gap-6
              lg:px-14
            "
          >
            {checks.map((check, index) => {
              const Icon = check.Icon;

              return (
                <article
                  key={check.title}
                  data-mobile-scroll-card
                  className="
                    relative
                    flex
                    min-h-[310px]
                    w-[min(82vw,555px)]
                    shrink-0
                    snap-center
                    flex-col
                    overflow-hidden
                    rounded-[22px]
                    border
                    border-[#B12025]/15
                    bg-white
                    p-5
                    text-[#17191C]

                    sm:min-h-[440px]
                    sm:w-[min(88vw,555px)]
                    sm:rounded-[30px]
                    sm:p-10

                    lg:w-[615px]
                  "
                >
                  {/* CARD TOP */}

                  <div
                    className="
                      flex
                      items-start
                      justify-between
                      gap-3
                    "
                  >
                    <div
                      className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-[14px]
                        bg-[#B12025]/10
                        text-[#B12025]

                        sm:h-16
                        sm:w-16
                        sm:rounded-[19px]
                      "
                    >
                      <Icon
                        aria-hidden="true"
                        className="
                          h-5
                          w-5

                          sm:h-7
                          sm:w-7
                        "
                      />
                    </div>

                    <span
                      className="
                        text-[12px]
                        font-semibold
                        text-[#B12025]

                        sm:text-[14px]
                      "
                    >
                      0{index + 1}
                    </span>
                  </div>

                  {/* CARD CONTENT */}

                  <div
                    className="
                      relative
                      mt-auto
                      pt-6

                      sm:pt-14
                    "
                  >
                    <p
                      className="
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.15em]
                        text-[#B12025]

                        sm:text-[12px]
                      "
                    >
                      {check.note}
                    </p>

                    <h3
                      className="
                        mt-3
                        text-[23px]
                        font-semibold
                        leading-[1.13]
                        tracking-[-0.05em]

                        sm:text-[clamp(2rem,3vw,3.25rem)]
                      "
                    >
                      {check.title}
                    </h3>

                    <p
                      className="
                        mt-3
                        max-w-[470px]
                        text-[11px]
                        leading-[1.6]
                        text-[#17191C]/65

                        sm:mt-5
                        sm:text-[14px]
                        sm:leading-[1.85]
                      "
                    >
                      {check.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* DESKTOP SCROLL PROGRESS */}

        <div
          aria-hidden="true"
          className="
            mx-auto
            mt-8
            hidden
            h-[2px]
            max-w-[1328px]
            overflow-hidden
            bg-[#B12025]/15

            lg:block
          "
        >
          <div
            ref={checksProgressRef}
            className="
              h-full
              w-0
              bg-[#B12025]
            "
          />
        </div>
      </section>

      {/* ================================================
          TRAINING SECTION
          MOBILE:
          - Compact spacing
          - Smaller headings
          - Horizontal training cards
      ================================================ */}

      <section
        id="training"
        aria-labelledby="training-title"
        className="
          relative
          scroll-mt-[100px]
          overflow-hidden
          bg-white
          px-5
          pb-[35px]
          pt-[40px]

          sm:px-8
          sm:py-[100px]

          lg:px-14
          lg:py-[140px]
        "
      >
        <div className="mx-auto max-w-[1440px]">
          <p
            data-hire-reveal
            className={`${label} text-[#B12025]`}
          >
            TRAINED FOR YOUR BUSINESS
          </p>

          <h2
            id="training-title"
            data-hire-title
            className="
              mt-3
              max-w-[1050px]
              text-[clamp(2rem,8vw,2.6rem)]
              font-semibold
              leading-[1.12]
              tracking-[-0.055em]

              sm:mt-6
              sm:text-[clamp(2.7rem,5vw,5.8rem)]
              sm:leading-[1.08]
              sm:tracking-[-0.065em]
            "
          >
            <RisingWords
              text="Training that prepares your team for your business."
            />
          </h2>

          <p
            data-hire-reveal
            className="
              mt-3
              max-w-[780px]
              text-[11px]
              leading-[1.65]
              text-[#17191C]/65

              sm:mt-6
              sm:text-[14px]
              sm:leading-[1.85]
            "
          >
            Before joining your account, team members learn
            your processes, tools, products and quality
            expectations. Training is designed around the
            work they will actually do.
          </p>

                    {/* ============================================
              TRAINING CARDS

              MOBILE:
              - Horizontal side scrolling
              - Compact card height
              - Smaller text and icons

              TABLET / DESKTOP:
              - Original grid layout
          ============================================ */}

          <div
            data-mobile-auto-scroll
            className="
              mt-6
              flex
              snap-x
              snap-mandatory
              gap-3
              overflow-x-auto
              overscroll-x-contain
              pb-3
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden

              sm:mt-12
              sm:grid
              sm:grid-cols-2
              sm:gap-5
              sm:overflow-visible
              sm:pb-0

              lg:grid-cols-4
              lg:gap-6
            "
          >
            {training.map((item, index) => (
              <article
                key={item.title}
                data-mobile-scroll-card
                className="
                  group
                  relative
                  flex
                  min-h-[210px]
                  w-[78vw]
                  max-w-[300px]
                  shrink-0
                  snap-start
                  flex-col
                  justify-between
                  overflow-hidden
                  rounded-[18px]
                  border
                  border-[#B12025]/15
                  bg-[#F8F8F8]
                  p-4
                  transition-colors
                  duration-300

                  sm:min-h-[340px]
                  sm:w-auto
                  sm:max-w-none
                  sm:rounded-[26px]
                  sm:p-7

                  lg:min-h-[390px]
                  lg:p-8
                "
              >
                {/* CARD NUMBER */}

                <div className="flex items-start justify-between">
                  <span
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      bg-[#B12025]
                      text-[11px]
                      font-semibold
                      text-white

                      sm:h-14
                      sm:w-14
                      sm:text-[16px]
                    "
                  >
                    0{index + 1}
                  </span>

                  <ArrowUpRight
                    aria-hidden="true"
                    className="
                      h-4
                      w-4
                      text-[#B12025]

                      sm:h-6
                      sm:w-6
                    "
                  />
                </div>

                {/* CARD CONTENT */}

                <div className="mt-5 sm:mt-12">
                  <h3
                    className="
                      max-w-[250px]
                      text-[17px]
                      font-semibold
                      leading-[1.15]
                      tracking-[-0.045em]
                      text-[#17191C]

                      sm:text-[clamp(1.4rem,2vw,2rem)]
                      sm:leading-[1.2]
                    "
                  >
                    {item.title}
                  </h3>

                  <p
                    className="
                      mt-2
                      max-w-[260px]
                      text-[11px]
                      leading-[1.55]
                      text-[#17191C]/65

                      sm:mt-5
                      sm:text-[13px]
                      sm:leading-[1.8]
                    "
                  >
                    {item.body}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* ============================================
              TRAINING CLOSING MESSAGE

              HIDDEN ON MOBILE ONLY
          ============================================ */}

          <div
            data-hire-reveal
            className="
              mt-12
              hidden
              border-t
              border-[#17191C]/10
              pt-8

              sm:block
              lg:mt-16
            "
          >
            <div
              className="
                flex
                flex-col
                gap-4

                lg:flex-row
                lg:items-center
                lg:justify-between
                lg:gap-12
              "
            >
              <p
                className="
                  max-w-[850px]
                  text-[clamp(1.3rem,2.2vw,2.4rem)]
                  font-medium
                  leading-[1.4]
                  tracking-[-0.035em]
                  text-[#17191C]
                "
              >
                Training ends with a test on your processes.
                Only people who pass move onto your account.
              </p>

              <span
                className="
                  inline-flex
                  shrink-0
                  items-center
                  gap-2
                  text-[12px]
                  font-semibold
                  text-[#B12025]
                "
              >
                <Check
                  aria-hidden="true"
                  size={17}
                />

                Process tested
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================
          QUALITY MONITORING SECTION

          MOBILE:
          - Reduced red empty spaces
          - Smaller headings and descriptions
          - Horizontally scrolling cards
          - Smaller card icons and text

          TABLET / DESKTOP:
          - Original grid layout
      ================================================ */}

      <section
        id="quality-monitoring"
        aria-labelledby="quality-monitoring-title"
        className="
          relative
          scroll-mt-[100px]
          overflow-hidden
          bg-[#B12025]
          px-5
          pb-[40px]
          pt-[45px]
          text-white

          sm:px-8
          sm:py-[100px]

          lg:px-14
          lg:py-[140px]
        "
      >
        <div className="mx-auto max-w-[1440px]">
          {/* SECTION LABEL */}

          <p
            data-hire-reveal
            className="
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.2em]
              text-white/80

              sm:text-[11px]
            "
          >
            QUALITY MONITORING
          </p>

          {/* MAIN HEADING */}

          <h2
            id="quality-monitoring-title"
            data-hire-title
            className="
              mt-3
              max-w-[1150px]
              text-[clamp(2rem,8vw,2.65rem)]
              font-semibold
              leading-[1.1]
              tracking-[-0.055em]
              text-white

              sm:mt-6
              sm:text-[clamp(2.7rem,5vw,5.8rem)]
              sm:leading-[1.08]
              sm:tracking-[-0.065em]
            "
          >
            <RisingWords
              text="Quality is checked, scored and improved."
            />
          </h2>

          {/* DESCRIPTION */}

          <p
            data-hire-reveal
            className="
              mt-3
              max-w-[770px]
              text-[11px]
              leading-[1.65]
              text-white/85

              sm:mt-6
              sm:text-[14px]
              sm:leading-[1.85]
            "
          >
            Hiring and training are only the beginning.
            We continue to monitor performance, review
            quality scores and coach team members to
            maintain the standards your business expects.
          </p>

          {/* ============================================
              QUALITY CARDS

              MOBILE:
              - Single horizontal row
              - Side scrolling
              - Smaller icons
              - Reduced card height
              - Smaller text

              TABLET / DESKTOP:
              - Original grid
          ============================================ */}

          <div
            data-mobile-auto-scroll
            className="
              mt-6
              flex
              snap-x
              snap-mandatory
              gap-3
              overflow-x-auto
              overscroll-x-contain
              pb-3
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden

              sm:mt-12
              sm:grid
              sm:grid-cols-2
              sm:gap-5
              sm:overflow-visible
              sm:pb-0

              lg:grid-cols-4
              lg:gap-6
            "
          >
            {monitoring.map((item, index) => {
              const Icon = item.Icon;

              return (
                <article
                  key={item.title}
                  data-mobile-scroll-card
                  className="
                    group
                    relative
                    flex
                    min-h-[235px]
                    w-[78vw]
                    max-w-[300px]
                    shrink-0
                    snap-start
                    flex-col
                    justify-between
                    overflow-hidden
                    rounded-[18px]
                    border
                    border-white/25
                    bg-white
                    p-4
                    text-[#17191C]
                    transition-transform
                    duration-300

                    sm:min-h-[360px]
                    sm:w-auto
                    sm:max-w-none
                    sm:rounded-[26px]
                    sm:p-7

                    lg:min-h-[410px]
                    lg:p-8
                  "
                >
                  {/* CARD TOP */}

                  <div className="flex items-start justify-between">
                    <div
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-[12px]
                        bg-[#B12025]/10
                        text-[#B12025]

                        sm:h-16
                        sm:w-16
                        sm:rounded-[18px]
                      "
                    >
                      <Icon
                        aria-hidden="true"
                        className="
                          h-5
                          w-5

                          sm:h-7
                          sm:w-7
                        "
                      />
                    </div>

                    <span
                      className="
                        text-[11px]
                        font-semibold
                        text-[#B12025]/65

                        sm:text-[13px]
                      "
                    >
                      0{index + 1}
                    </span>
                  </div>

                  {/* CARD CONTENT */}

                  <div className="mt-5 sm:mt-12">
                    <h3
                      className="
                        text-[18px]
                        font-semibold
                        leading-[1.15]
                        tracking-[-0.045em]
                        text-[#17191C]

                        sm:text-[clamp(1.5rem,2vw,2.1rem)]
                        sm:leading-[1.2]
                      "
                    >
                      {item.title}
                    </h3>

                    <p
                      className="
                        mt-2
                        text-[11px]
                        leading-[1.55]
                        text-[#17191C]/65

                        sm:mt-5
                        sm:text-[13px]
                        sm:leading-[1.8]
                      "
                    >
                      {item.body}
                    </p>

                    {/* CARD FOOTER */}

                    <div
                      className="
                        mt-4
                        border-t
                        border-[#17191C]/10
                        pt-3

                        sm:mt-8
                        sm:pt-5
                      "
                    >
                      <p
                        className="
                          text-[9px]
                          font-semibold
                          uppercase
                          tracking-[0.1em]
                          text-[#B12025]

                          sm:text-[11px]
                        "
                      >
                        {item.foot}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* MOBILE SCROLL INDICATOR */}

          <div
            aria-hidden="true"
            className="
              mt-3
              flex
              items-center
              justify-center
              gap-2

              sm:hidden
            "
          >
            {monitoring.map((item, index) => (
              <span
                key={item.title}
                className={`
                  h-[4px]
                  rounded-full
                  ${
                    index === 0
                      ? 'w-[20px] bg-white'
                      : 'w-[6px] bg-white/40'
                  }
                `}
              />
            ))}
          </div>
        </div>
      </section>
            {/* ================================================
          DATA SECURITY SECTION
      ================================================ */}

      <section
        id="data-security"
        aria-labelledby="data-security-title"
        className="
          relative
          scroll-mt-[100px]
          bg-white
          px-5
          py-[45px]

          sm:px-8
          sm:py-[100px]

          lg:px-14
          lg:py-[140px]
        "
      >
        <div className="mx-auto max-w-[1440px]">
          <p
            data-hire-reveal
            className={`${label} text-[#B12025]`}
          >
            DATA SECURITY
          </p>

          <div
            className="
              mt-3
              grid
              gap-5

              sm:mt-6
              sm:gap-10

              lg:grid-cols-[1.1fr_.9fr]
              lg:items-end
            "
          >
            <h2
              id="data-security-title"
              data-hire-title
              className="
                max-w-[950px]
               text-[27px]
                font-semibold
                leading-[1.12]
                tracking-[-0.055em]

                sm:text-[clamp(2.7rem,5vw,5.8rem)]
                sm:leading-[1.08]
                sm:tracking-[-0.065em]
              "
            >
              <RisingWords
                text="Your data is handled with care."
              />
            </h2>

            <p
              data-hire-reveal
              className="
                max-w-[520px]
                text-[11px]
                leading-[1.65]
                text-[#17191C]/70

                sm:text-[14px]
                sm:leading-[1.9]
              "
            >
              Every team member is trained to protect
              confidential information. Access is limited
              according to the work they perform, and
              confidentiality is part of their employment
              agreement.
            </p>
          </div>

          {/* SECURITY CARDS */}

          <div
  data-mobile-auto-scroll
  className="
    mt-5 flex snap-x snap-mandatory gap-3
    overflow-x-auto overscroll-x-contain pb-2
    [scrollbar-width:none]
    [&::-webkit-scrollbar]:hidden
    sm:mt-14 sm:grid sm:grid-cols-2 sm:gap-5
    sm:overflow-visible sm:pb-0
    md:grid-cols-3
  "
> {security.map((item, index) => {
              const Icon = item.Icon;

              return (
                <article
  key={item.title}
  data-mobile-scroll-card
  className="
    group relative flex min-h-[205px]
    w-[78vw] max-w-[270px] shrink-0 snap-start
    flex-col rounded-[20px]
    border border-[#B12025]/15
    bg-[#fff9f9] p-4
    sm:min-h-[310px] sm:w-auto sm:max-w-none
    sm:rounded-[28px] sm:p-8
  "
>
                  <div className="flex items-start justify-between">
                    <div
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-[12px]
                        bg-[#B12025]
                        text-white

                        sm:h-14
                        sm:w-14
                        sm:rounded-[18px]
                      "
                    >
                      <Icon
                        aria-hidden="true"
                        className="
                          h-5
                          w-5

                          sm:h-6
                          sm:w-6
                        "
                      />
                    </div>

                    <span
                      className="
                        text-[11px]
                        font-semibold
                        text-[#B12025]/55

                        sm:text-[13px]
                      "
                    >
                      0{index + 1}
                    </span>
                  </div>

                  <div className="mt-auto pt-5 sm:pt-12">
                    <span
                      className="
                        text-[9px]
                        font-semibold
                        uppercase
                        tracking-[0.13em]
                        text-[#B12025]

                        sm:text-[10px]
                      "
                    >
                      {item.badge}
                    </span>

                    <h3
                      className="
                        mt-2
                        text-[19px]
                        font-semibold
                        leading-[1.2]
                        tracking-[-0.04em]

                        sm:mt-4
                        sm:text-[26px]
                      "
                    >
                      {item.title}
                    </h3>

                    <p
                      className="
                        mt-2
                        max-w-[370px]
                        text-[11px]
                        leading-[1.6]
                        text-[#17191C]/65

                        sm:mt-4
                        sm:text-[13px]
                        sm:leading-[1.8]
                      "
                    >
                      {item.body}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================
          TEAM RETENTION SECTION
      ================================================ */}

      <section
        id="team-retention"
        aria-labelledby="team-retention-title"
        className="
          relative
          overflow-hidden
          bg-[#17191C]
          px-5
          py-[50px]
          text-white

          sm:px-8
          sm:py-[110px]

          lg:px-14
          lg:py-[150px]
        "
      >
        <div
          className="
            mx-auto
            grid
            max-w-[1440px]
            gap-7

            sm:gap-12

            lg:grid-cols-[1.05fr_.95fr]
            lg:items-center
          "
        >
          {/* LEFT CONTENT */}

          <div>
            <p
              data-hire-reveal
              className={`${label} text-white/65`}
            >
              PEOPLE WHO STAY
            </p>

            <h2
              id="team-retention-title"
              data-hire-title
              className="
                mt-4
                max-w-[850px]
                text-[clamp(2rem,8vw,2.65rem)]
                font-semibold
                leading-[1.12]
                tracking-[-0.055em]

                sm:mt-6
                sm:text-[clamp(2.7rem,5vw,5.8rem)]
                sm:leading-[1.08]
                sm:tracking-[-0.065em]
              "
            >
              <RisingWords
                text="Good people. Stronger teams."
              />
            </h2>

            <p
              data-hire-reveal
              className="
                mt-4
                max-w-[660px]
                text-[11px]
                leading-[1.7]
                text-white/75

                sm:mt-7
                sm:text-[14px]
                sm:leading-[1.9]
              "
            >
              Keeping experienced people on your account
              helps maintain consistent service. We support
              our employees through regular feedback,
              coaching and opportunities to develop their
              skills.
            </p>

            <p
              data-hire-reveal
              className="
                mt-3
                max-w-[660px]
                text-[11px]
                leading-[1.7]
                text-white/75

                sm:mt-5
                sm:text-[14px]
                sm:leading-[1.9]
              "
            >
              Our managers work closely with team members
              to identify problems early, improve
              performance and support long-term growth.
            </p>
          </div>

          {/* RIGHT CONTENT */}

          <div
            data-hire-reveal
            className="
              relative
              overflow-hidden
              rounded-[22px]
              border
              border-white/15
              bg-white/[0.06]
              p-5

              sm:rounded-[32px]
              sm:p-10
            "
          >
            <div
              className="
                flex
                items-center
                justify-between
                border-b
                border-white/15
                pb-5
              "
            >
              <span
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.15em]
                  text-white/65

                  sm:text-[12px]
                "
              >
                HOW WE SUPPORT OUR TEAMS
              </span>

              <ArrowUpRight
                aria-hidden="true"
                className="h-5 w-5 text-white/70"
              />
            </div>

           <div
  data-mobile-auto-scroll
  className="
    mt-4 flex snap-x snap-mandatory gap-3
    overflow-x-auto overscroll-x-contain pb-2
    [scrollbar-width:none]
    [&::-webkit-scrollbar]:hidden
    sm:mt-8 sm:block sm:space-y-6
    sm:overflow-visible sm:pb-0
  "
>
              {[
                {
                  number: '01',
                  title: 'Regular feedback',
                  description:
                    'Clear conversations about performance and expectations.',
                },
                {
                  number: '02',
                  title: 'Ongoing coaching',
                  description:
                    'Practical support to strengthen skills and confidence.',
                },
                {
                  number: '03',
                  title: 'Development opportunities',
                  description:
                    'Opportunities to learn and take on greater responsibility.',
                },
              ].map((item) => (
                <div
  key={item.number}
  data-mobile-scroll-card
  className="
    flex min-h-[155px] w-[75vw] max-w-[235px]
    shrink-0 snap-start flex-col
    rounded-[15px] border border-white/15
    bg-white/[0.05] p-4
    sm:grid sm:min-h-0 sm:w-auto sm:max-w-none
    sm:grid-cols-[45px_1fr] sm:gap-5
    sm:rounded-none sm:border-0 sm:border-b
    sm:border-white/10 sm:bg-transparent
    sm:p-0 sm:pb-6
    sm:last:border-b-0 sm:last:pb-0
  "
>
                  <span
                    className="
  text-[10px] font-semibold text-white/50
  sm:pt-1 sm:text-[11px]
"
                  >
                    {item.number}
                  </span>

                  <div>
                    <h3
                      className="
                        text-[16px]
                        font-semibold
                        tracking-[-0.03em]

                        sm:text-[22px]
                      "
                    >
                      {item.title}
                    </h3>

                    <p
                      className="
                        mt-1
                        text-[11px]
                        leading-[1.6]
                        text-white/65

                        sm:mt-2
                        sm:text-[13px]
                        sm:leading-[1.8]
                      "
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================
          CLIENT TESTIMONIAL
      ================================================ */}

      <section
        id="testimonial"
        aria-labelledby="testimonial-title"
        className="
          relative
          overflow-hidden
          bg-[#fff9f9]
          px-5
          py-[30px]

          sm:px-8
          sm:py-[110px]

          lg:px-14
          lg:py-[150px]
        "
      >
        <div className="mx-auto max-w-[1440px]">
          <p
            data-hire-reveal
            className={`${label} text-[#B12025]`}
          >
            WHAT CLIENTS NOTICE
          </p>

          <div
            className="
              mt-5
              grid
              gap-7

              sm:mt-10
              sm:gap-12

              lg:grid-cols-[.3fr_1fr]
            "
          >
            <div
              data-hire-reveal
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                bg-[#B12025]
                text-[32px]
                font-semibold
                text-white

                sm:h-20
                sm:w-20
                sm:text-[52px]
              "
            >
              &ldquo;
            </div>

            <div>
              <h2
                id="testimonial-title"
                className="sr-only"
              >
                Client testimonial
              </h2>

              <HiringTestimonial />

              <div
                data-hire-reveal
                className="
                  mt-7
                  flex
                  items-center
                  gap-4
                  border-t
                  border-[#B12025]/15
                  pt-5

                  sm:mt-12
                  sm:pt-8
                "
              >
                <div
                  className="
                    h-10
                    w-1
                    rounded-full
                    bg-[#B12025]

                    sm:h-12
                  "
                />

                <div>
                  <p
                    className="
                      text-[12px]
                      font-semibold
                      text-[#17191C]

                      sm:text-[14px]
                    "
                  >
                    Client feedback
                  </p>

                  <p
                    className="
                      mt-1
                      text-[10px]
                      text-[#17191C]/55

                      sm:text-[12px]
                    "
                  >
                    Service quality and communication
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================
          FREQUENTLY ASKED QUESTIONS
      ================================================ */}

      <section
        id="frequently-asked-questions"
        aria-labelledby="faq-title"
        className="
          relative
          scroll-mt-[100px]
          bg-white
          px-5
          py-[50px]

          sm:px-8
          sm:py-[110px]

          lg:px-14
          lg:py-[150px]
        "
      >
        <div
          className="
            mx-auto
            grid
            max-w-[1440px]
            gap-8

            sm:gap-12

            lg:grid-cols-[.8fr_1.2fr]
            lg:gap-20
          "
        >
          {/* LEFT HEADING */}

          <div>
            <p
              data-hire-reveal
              className={`${label} text-[#B12025]`}
            >
              FREQUENTLY ASKED QUESTIONS
            </p>

            <h2
              id="faq-title"
              data-hire-title
              className="
                mt-4
                max-w-[600px]
                text-[clamp(2rem,8vw,2.65rem)]
                font-semibold
                leading-[1.12]
                tracking-[-0.055em]

                sm:mt-6
                sm:text-[clamp(2.7rem,5vw,5.8rem)]
                sm:leading-[1.08]
                sm:tracking-[-0.065em]
              "
            >
              <RisingWords
                text="Questions about our hiring process."
              />
            </h2>

            <p
              data-hire-reveal
              className="
                mt-4
                max-w-[430px]
                text-[11px]
                leading-[1.7]
                text-[#17191C]/65

                sm:mt-7
                sm:text-[14px]
                sm:leading-[1.9]
              "
            >
              Here are answers to some of the questions
              clients ask about recruitment, training and
              the people who work on their accounts.
            </p>
          </div>

          {/* FAQ ACCORDION */}

          <div className="border-t border-[#17191C]/15">
            {faqs.map((faq, index) => {
              const isOpen = faqOpen === index;

              return (
                <div
                  key={faq.question}
                  className="
                    border-b
                    border-[#17191C]/15
                  "
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`hire-faq-panel-${index}`}
                    onClick={() =>
                      setFaqOpen(
                        isOpen ? null : index
                      )
                    }
                    className="
                      flex
                      w-full
                      items-center
                      justify-between
                      gap-4
                      py-5
                      text-left

                      sm:gap-8
                      sm:py-7
                    "
                  >
                    <span
                      className="
                        text-[13px]
                        font-semibold
                        leading-[1.5]
                        tracking-[-0.025em]
                        text-[#17191C]

                        sm:text-[18px]
                      "
                    >
                      {faq.question}
                    </span>

                    <span
                      className={`
                        flex
                        h-8
                        w-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        border
                        transition-colors
                        duration-300

                        sm:h-10
                        sm:w-10

                        ${
                          isOpen
                            ? 'border-[#B12025] bg-[#B12025] text-white'
                            : 'border-[#17191C]/20 bg-white text-[#17191C]'
                        }
                      `}
                    >
                      <ChevronDown
                        aria-hidden="true"
                        className={`
                          h-4
                          w-4
                          transition-transform
                          duration-300

                          ${
                            isOpen
                              ? 'rotate-180'
                              : 'rotate-0'
                          }
                        `}
                      />
                    </span>
                  </button>

                  <div
                    id={`hire-faq-panel-${index}`}
                    hidden={!isOpen}
                    className="
                      pb-5
                      pr-10

                      sm:pb-7
                      sm:pr-16
                    "
                  >
                    <p
                      className="
                        max-w-[680px]
                        text-[11px]
                        leading-[1.75]
                        text-[#17191C]/65

                        sm:text-[14px]
                        sm:leading-[1.9]
                      "
                    >
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================
          FINAL CTA SECTION
      ================================================ */}

      <section
        id="hire-contact"
        aria-labelledby="hire-contact-title"
        className="
          relative
          overflow-hidden
          bg-[#B12025]
          px-5
          py-[55px]
          text-white

          sm:px-8
          sm:py-[115px]

          lg:px-14
          lg:py-[155px]
        "
      >
        <div className="mx-auto max-w-[1440px]">
          {/* TOP ROW */}

          <div
            className="
              flex
              flex-wrap
              items-center
              justify-between
              gap-4
            "
          >
            <p
              data-hire-reveal
              className={`${label} text-white/75`}
            >
              LET'S BUILD YOUR TEAM
            </p>

            {/* OFFICE HOURS */}

            <div
              data-hire-reveal
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-white/25
                px-3
                py-2

                sm:px-4
              "
            >
              <span
                className={`
                  h-[7px]
                  w-[7px]
                  rounded-full

                  ${
                    officeOpen === true
                      ? 'bg-[#8EF0AE]'
                      : officeOpen === false
                        ? 'bg-white/50'
                        : 'bg-white/30'
                  }
                `}
              />

              <span
                className="
                  text-[9px]
                  font-medium
                  text-white/85

                  sm:text-[11px]
                "
              >
                {officeOpen === null
                  ? 'Checking Colombo office hours'
                  : officeOpen
                    ? 'Colombo office is open'
                    : 'Colombo office is currently closed'}
              </span>
            </div>
          </div>

          {/* CTA HEADING */}

          <h2
            id="hire-contact-title"
            data-hire-title
            className="
              mt-6
              max-w-[1200px]
              text-[clamp(2.2rem,9vw,3.2rem)]
              font-semibold
              leading-[1.08]
              tracking-[-0.065em]

              sm:mt-12
              sm:text-[clamp(3.5rem,7vw,8rem)]
              sm:leading-[1.05]
            "
          >
            <RisingWords
              text="The right people for your business."
            />
          </h2>

          {/* CTA DESCRIPTION */}

          <p
            data-hire-reveal
            className="
              mt-4
              max-w-[660px]
              text-[11px]
              leading-[1.7]
              text-white/85

              sm:mt-8
              sm:text-[15px]
              sm:leading-[1.9]
            "
          >
            Tell us what your business needs. We can
            discuss the roles, skills and languages
            required to build a team that works to your
            standards.
          </p>

          {/* CTA BUTTONS */}

          <div
            data-hire-reveal
            className="
              mt-6
              flex
              flex-wrap
              items-center
              gap-3

              sm:mt-10
              sm:gap-4
            "
          >
            <Link
              href="/#contact"
              className="
                inline-flex
                min-h-[42px]
                items-center
                justify-center
                gap-2
                rounded-full
                bg-white
                px-4
                text-[10px]
                font-semibold
                text-[#B12025]
                transition-colors
                duration-300
                hover:bg-[#fff2f2]

                sm:min-h-[56px]
                sm:gap-3
                sm:px-7
                sm:text-[13px]
              "
            >
              Book a free discovery call

              <ArrowUpRight
                aria-hidden="true"
                className="
                  h-4
                  w-4

                  sm:h-5
                  sm:w-5
                "
              />
            </Link>

            <Link
              href="/services"
              className="
                inline-flex
                min-h-[42px]
                items-center
                justify-center
                gap-2
                rounded-full
                border
                border-white/50
                px-4
                text-[10px]
                font-semibold
                text-white
                transition-colors
                duration-300
                hover:bg-white/10

                sm:min-h-[56px]
                sm:gap-3
                sm:px-7
                sm:text-[13px]
              "
            >
              Explore our services

              <ArrowUpRight
                aria-hidden="true"
                className="
                  h-4
                  w-4

                  sm:h-5
                  sm:w-5
                "
              />
            </Link>
          </div>

          {/* BOTTOM DIVIDER */}

          <div
            aria-hidden="true"
            className="
              mt-10
              h-px
              w-full
              bg-white/25

              sm:mt-20
            "
          />

          <div
            className="
              mt-5
              flex
              flex-wrap
              items-center
              justify-between
              gap-3

              sm:mt-8
            "
          >
            <p
              className="
                text-[10px]
                font-medium
                text-white/70

                sm:text-[12px]
              "
            >
              FirstNotch Solutions (Pvt) Ltd
            </p>

            <p
              className="
                text-[10px]
                text-white/60

                sm:text-[12px]
              "
            >
              Built on people. Driven by quality.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}