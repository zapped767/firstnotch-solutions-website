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
// ======================================================

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
  const [qualityActive, setQualityActive] = useState(0);
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
  // QUALITY CAROUSEL — SYNC ACTIVE DOT ON MOBILE
  // ====================================================

  useEffect(() => {
    const carousel =
      document.querySelector<HTMLElement>(
        '[data-quality-carousel]'
      );

    if (!carousel) return;

    const updateActiveDot = () => {
      if (window.innerWidth >= 640) return;

      const cards = Array.from(
        carousel.querySelectorAll<HTMLElement>(
          '[data-mobile-scroll-card]'
        )
      );

      if (!cards.length) return;

      const carouselRect =
        carousel.getBoundingClientRect();

      const center =
        carouselRect.left +
        carouselRect.width / 2;

      let closestIndex = 0;
      let closestDistance = Infinity;

      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();

        const cardCenter =
          rect.left + rect.width / 2;

        const distance = Math.abs(
          cardCenter - center
        );

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setQualityActive(closestIndex);
    };

    updateActiveDot();

    carousel.addEventListener(
      'scroll',
      updateActiveDot,
      { passive: true }
    );

    window.addEventListener(
      'resize',
      updateActiveDot
    );

    return () => {
      carousel.removeEventListener(
        'scroll',
        updateActiveDot
      );

      window.removeEventListener(
        'resize',
        updateActiveDot
      );
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

  let animation: gsap.core.Tween | null = null;

  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries[0]?.isIntersecting) return;

      const counter = {
        value: 100,
      };

      animation = gsap.to(counter, {
        value: 20,
        duration: 1.8,
        ease: 'power3.out',

        onUpdate: () => {
          setRemaining(
            Math.round(counter.value)
          );
        },
      });

      observer.disconnect();
    },
    {
      threshold: 0.35,
    }
  );

  observer.observe(section);

  return () => {
    observer.disconnect();

    if (animation) {
      animation.kill();
    }
  };
}, []);

    // ====================================================
  // MARQUEE
  // ====================================================

 useEffect(() => {
  const marquee = marqueeRef.current;

  if (!marquee) return;

  const inner =
    marquee.querySelector<HTMLElement>(
      '[data-hire-marquee-inner]'
    );

  if (!inner) return;

  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  );

  if (reducedMotion.matches) return;

  const tween = gsap.to(inner, {
    xPercent: -50,
    duration: 24,
    ease: 'none',
    repeat: -1,
  });

  return () => {
    tween.kill();
  };
}, []);
  // ====================================================
  // FAQ TOGGLE
  // ====================================================

  const toggleFaq = (index: number) => {
    setFaqOpen((current) =>
      current === index ? null : index
    );
  };

  return (
    <div
      ref={rootRef}
      className="min-h-screen overflow-x-hidden bg-white text-[#17191C]"
    >
      {/* ==================================================
          PAGE PROGRESS
      ================================================== */}

      <div className="fixed left-0 top-0 z-[100] h-[3px] w-full bg-transparent">
        <div
          ref={pageProgressRef}
          className="h-full w-0 bg-[#B12025]"
        />
      </div>

      {/* ==================================================
          HERO
      ================================================== */}

      <section
        id="how-we-hire-hero"
        className="
          relative
          overflow-hidden
          bg-[#B12025]
          px-5
          pb-[38px]
          pt-[85px]
          text-white

          sm:px-8
          sm:pb-[105px]
          sm:pt-[150px]

          lg:px-14
          lg:pb-[140px]
          lg:pt-[195px]
        "
      >
        {/* background decorative lines */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -right-[12%] top-[6%] h-[420px] w-[420px] rounded-full border border-white/10 sm:h-[700px] sm:w-[700px]" />

          <div className="absolute -right-[4%] top-[15%] h-[280px] w-[280px] rounded-full border border-white/[0.07] sm:h-[500px] sm:w-[500px]" />

          <div className="absolute bottom-[-150px] left-[-100px] h-[320px] w-[320px] rounded-full border border-white/[0.07] sm:h-[520px] sm:w-[520px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1420px]">
          

          <h1
            data-hire-title
            className="
              mt-3
              max-w-[1250px]
              font-semibold
              leading-[1.03]
              tracking-[-.065em]

              sm:mt-6
              sm:leading-[1.02]
              sm:tracking-[-.075em]
            "
          >
            <span
              className="
                block
                whitespace-nowrap
                text-[clamp(1.8rem,8vw,2.35rem)]

                sm:whitespace-normal
                sm:text-[clamp(4rem,8vw,9.5rem)]
              "
            >
              <RisingWords text="How we hire" />
            </span>

            <span
              className="
                mt-3
                block
                max-w-[1170px]
                text-[clamp(1.35rem,6.2vw,1.75rem)]
                leading-[1.13]
                tracking-[-.05em]

                sm:mt-5
                sm:text-[clamp(2.25rem,4.8vw,5.4rem)]
                sm:leading-[1.08]
                sm:tracking-[-.065em]
              "
            >
              <RisingWords text="The people on your account are chosen carefully, trained on your work and measured after they start." />
            </span>
          </h1>

          <div
            data-hire-reveal
            className="
              mt-5
              h-px
              w-full
              bg-white/30

              sm:mt-10
            "
          />

          <div
            className="
              mt-4
              grid
              gap-5

              sm:mt-10
              sm:gap-8

              lg:grid-cols-[1fr_.72fr]
              lg:items-end
            "
          >
            <div data-hire-reveal>
              <p
                className="
                  max-w-[710px]
                  text-[10px]
                  leading-[1.5]
                  text-white

                  sm:text-[16px]
                  sm:leading-[1.9]
                "
              >
                The team working for your business should
                feel like part of your company, not a group
                of strangers handling tasks from somewhere
                else.
              </p>

              <p
                className="
                  mt-2
                  max-w-[670px]
                  text-[10px]
                  leading-[1.5]
                  text-white/85

                  sm:mt-4
                  sm:text-[14px]
                  sm:leading-[1.85]
                "
              >
                That starts with recruitment. FirstNotch
                checks language, practical ability,
                experience and references before someone
                reaches a client account.
              </p>

              <div
                className="
                  mt-4
                  flex
                  flex-wrap
                  gap-2

                  sm:mt-8
                  sm:gap-3
                "
              >
                <a
                  href="#screening"
                  className="
                    inline-flex
                    min-h-[34px]
                    items-center
                    gap-1.5
                    rounded-full
                    bg-white
                    px-2.5
                    text-[8px]
                    font-semibold
                    text-[#B12025]
                    transition
                    hover:bg-[#fff0f0]

                    sm:min-h-[54px]
                    sm:gap-3
                    sm:px-6
                    sm:text-[12px]
                  "
                >
                  See the hiring process
                  <ArrowDownRight
                    className="h-[12px] w-[12px] sm:h-[17px] sm:w-[17px]"
                  />
                </a>

                <Link
                  href="/work-with-us"
                  className="
                    inline-flex
                    min-h-[34px]
                    items-center
                    gap-1.5
                    rounded-full
                    border
                    border-white/50
                    px-2.5
                    text-[8px]
                    font-semibold
                    text-white
                    transition
                    hover:bg-white/15

                    sm:min-h-[54px]
                    sm:gap-3
                    sm:px-6
                    sm:text-[12px]
                  "
                >
                  View careers
                  <ArrowUpRight
                    className="h-[12px] w-[12px] sm:h-[17px] sm:w-[17px]"
                  />
                </Link>
              </div>
            </div>

            <div
              data-hire-reveal
              className="
                border-t
                border-white/30
                pt-4

                sm:pt-7

                lg:border-l
                lg:border-t-0
                lg:pl-10
                lg:pt-0
              "
            >
              <p
                className="
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-[.18em]
                  text-white/60

                  sm:text-[11px]
                  sm:tracking-[.22em]
                "
              >
                THE STANDARD
              </p>

              <p
                className="
                  mt-2
                  max-w-[460px]
                  text-[16px]
                  font-semibold
                  leading-[1.3]
                  tracking-[-.03em]

                  sm:mt-4
                  sm:text-[24px]
                  sm:leading-[1.4]
                "
              >
                Only people who pass the checks and training
                move onto client work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          MARQUEE
      ================================================== */}

      <div
        ref={marqueeRef}
        className="
          overflow-hidden
          border-b
          border-[#B12025]/10
          bg-white
          py-3

          sm:py-5
        "
      >
        <div
          data-hire-marquee-inner
          className="flex w-max whitespace-nowrap"
        >
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="
                flex
                shrink-0
                items-center
                gap-7
                pr-7

                sm:gap-12
                sm:pr-12
              "
              aria-hidden={copy === 1}
            >
              {[
                'LANGUAGE TEST',
                'PRACTICAL ASSESSMENT',
                'EXPERIENCE REVIEW',
                'REFERENCE CHECKS',
                'CLIENT TRAINING',
                'QUALITY MONITORING',
              ].map((item) => (
                <div
                  key={`${copy}-${item}`}
                  className="flex items-center gap-7 sm:gap-12"
                >
                  <span
                    className="
                      text-[8px]
                      font-semibold
                      tracking-[.18em]
                      text-[#17191C]/55

                      sm:text-[11px]
                      sm:tracking-[.22em]
                    "
                  >
                    {item}
                  </span>

                  <span className="h-[5px] w-[5px] rounded-full bg-[#B12025]" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ==================================================
          INTRO
      ================================================== */}

      <section
        className="
          bg-white
          px-5
          py-[48px]

          sm:px-8
          sm:py-[100px]

          lg:px-14
          lg:py-[135px]
        "
      >
        <div
          className="
            mx-auto
            grid
            max-w-[1420px]
            gap-6

            sm:gap-12

            lg:grid-cols-[.75fr_1.25fr]
            lg:gap-20
          "
        >
          <div data-hire-reveal>
            <p
              className={`${label} text-[#B12025]`}
            >
              THE APPROACH
            </p>

            <div
              aria-hidden="true"
              className="
                mt-4
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                bg-[#fff1f1]
                text-[#B12025]

                sm:mt-7
                sm:h-14
                sm:w-14
              "
            >
              <Check
                className="h-[16px] w-[16px] sm:h-[26px] sm:w-[26px]"
              />
            </div>
          </div>

          <div>
            <h2
              data-hire-title
              className="
                max-w-[950px]
                text-[28px]
                font-semibold
                leading-[1.06]
                tracking-[-.055em]

                sm:text-[clamp(2.7rem,5vw,5.8rem)]
                sm:leading-[1.08]
                sm:tracking-[-.065em]
              "
            >
              <RisingWords text="A careful hiring process before anyone touches your work." />
            </h2>

            <p
              data-hire-reveal
              className="
                mt-4
                max-w-[760px]
                text-[11px]
                leading-[1.7]
                text-[#17191C]/70

                sm:mt-7
                sm:text-[15px]
                sm:leading-[1.95]
              "
            >
              Recruitment is not just about filling a seat.
              The person needs to communicate clearly, work
              accurately and understand the responsibility
              that comes with handling another company&apos;s
              customers and data.
            </p>

            <p
              data-hire-reveal
              className="
                mt-3
                max-w-[760px]
                text-[11px]
                leading-[1.7]
                text-[#17191C]/70

                sm:mt-5
                sm:text-[15px]
                sm:leading-[1.95]
              "
            >
              FirstNotch uses several checks before an
              applicant reaches account-specific training.
            </p>
          </div>
        </div>
      </section>

      {/* ==================================================
          SCREENING / CHECKS
      ================================================== */}

      <section
        ref={checksRef}
        id="screening"
        data-hire-screening
        className="
          scroll-mt-[100px]
          overflow-hidden
          bg-[#17191C]
          px-5
          py-[48px]
          text-white

          sm:px-8
          sm:py-[100px]

          lg:min-h-screen
          lg:px-14
          lg:py-[90px]
        "
      >
        <div className="mx-auto max-w-[1420px]">
          <div
            className="
              grid
              gap-6

              sm:gap-10

              lg:grid-cols-[.65fr_1.35fr]
              lg:items-end
            "
          >
            <div data-hire-reveal>
              <p className={`${label} text-white/55`}>
                01 / BEFORE THEY JOIN
              </p>

              <p
                className="
                  mt-4
                  text-[48px]
                  font-semibold
                  leading-none
                  tracking-[-.07em]
                  text-[#B12025]

                  sm:mt-7
                  sm:text-[clamp(5rem,10vw,10rem)]
                  sm:tracking-[-.09em]
                "
              >
                {remaining}%
              </p>

              <p
                className="
                  mt-2
                  max-w-[250px]
                  text-[10px]
                  leading-[1.6]
                  text-white/55

                  sm:mt-4
                  sm:text-[13px]
                  sm:leading-7
                "
              >
                Illustrative applicant pool remaining as
                screening progresses.
              </p>
            </div>

            <div>
              <h2
                data-hire-title
                className="
                  max-w-[950px]
                  text-[28px]
                  font-semibold
                  leading-[1.06]
                  tracking-[-.055em]

                  sm:text-[clamp(2.7rem,5vw,5.8rem)]
                  sm:leading-[1.08]
                  sm:tracking-[-.065em]
                "
              >
                <RisingWords text="Every applicant goes through several checks." />
              </h2>

              <p
                data-hire-reveal
                className="
                  mt-4
                  max-w-[720px]
                  text-[10px]
                  leading-[1.65]
                  text-white/65

                  sm:mt-6
                  sm:text-[14px]
                  sm:leading-8
                "
              >
                The exact assessment depends on the role,
                but these are the checks used across the
                hiring process.
              </p>
            </div>
          </div>

          {/* MOBILE CHECK CARDS */}
          <div
            data-mobile-auto-scroll
            className="
              mt-6
              flex
              snap-x
              snap-mandatory
              gap-3
              overflow-x-auto
              pb-3
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden

              sm:mt-10

              lg:hidden
            "
          >
            {checks.map(
              (
                {
                  title,
                  Icon,
                  note,
                  description,
                },
                index
              ) => (
                <article
                  key={title}
                  data-mobile-scroll-card
                  className="
                    flex
                    min-h-[205px]
                    w-[76vw]
                    max-w-[285px]
                    shrink-0
                    snap-start
                    flex-col
                    rounded-[20px]
                    border
                    border-white/15
                    bg-white/[0.06]
                    p-4

                    sm:min-h-[270px]
                    sm:w-[360px]
                    sm:max-w-none
                    sm:rounded-[27px]
                    sm:p-7
                  "
                >
                  <div className="flex items-start justify-between gap-4">
                    <span
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        bg-[#B12025]
                        text-white

                        sm:h-12
                        sm:w-12
                      "
                    >
                      <Icon
                        className="h-[16px] w-[16px] sm:h-[22px] sm:w-[22px]"
                        strokeWidth={1.6}
                      />
                    </span>

                    <span
                      className="
                        text-[8px]
                        font-semibold
                        text-white/40

                        sm:text-[11px]
                      "
                    >
                      0{index + 1}
                    </span>
                  </div>

                  <div className="mt-auto pt-5 sm:pt-10">
                    <h3
                      className="
                        text-[17px]
                        font-semibold
                        tracking-[-.035em]

                        sm:text-[24px]
                        sm:tracking-[-.04em]
                      "
                    >
                      {title}
                    </h3>

                    <p
                      className="
                        mt-2
                        text-[9px]
                        font-semibold
                        text-[#ef7d82]

                        sm:mt-3
                        sm:text-[11px]
                      "
                    >
                      {note}
                    </p>

                    <p
                      className="
                        mt-2
                        text-[9px]
                        leading-[1.55]
                        text-white/60

                        sm:mt-4
                        sm:text-[12px]
                        sm:leading-7
                      "
                    >
                      {description}
                    </p>
                  </div>
                </article>
              )
            )}
          </div>

          {/* DESKTOP PINNED CHECK CARDS */}
          <div className="mt-14 hidden overflow-hidden lg:block">
            <div
              ref={checksTrackRef}
              className="flex w-max gap-5"
            >
              {checks.map(
                (
                  {
                    title,
                    Icon,
                    note,
                    description,
                  },
                  index
                ) => (
                  <article
                    key={title}
                    className="
                      flex
                      min-h-[390px]
                      w-[430px]
                      shrink-0
                      flex-col
                      rounded-[30px]
                      border
                      border-white/15
                      bg-white/[0.06]
                      p-9
                    "
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#B12025] text-white">
                        <Icon
                          size={25}
                          strokeWidth={1.5}
                        />
                      </span>

                      <span className="text-[12px] font-semibold text-white/35">
                        0{index + 1}
                      </span>
                    </div>

                    <div className="mt-auto pt-14">
                      <h3 className="text-[30px] font-semibold tracking-[-.045em]">
                        {title}
                      </h3>

                      <p className="mt-4 text-[12px] font-semibold text-[#ef7d82]">
                        {note}
                      </p>

                      <p className="mt-5 max-w-[340px] text-[13px] leading-7 text-white/65">
                        {description}
                      </p>
                    </div>
                  </article>
                )
              )}
            </div>

            <div className="mt-9 h-[2px] overflow-hidden bg-white/10">
              <div
                ref={checksProgressRef}
                className="h-full w-0 bg-[#B12025]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          PASS RATE / PROOF
      ================================================== */}

      <section
        className="
          bg-[#fff8f8]
          px-5
          py-[45px]

          sm:px-8
          sm:py-[100px]

          lg:px-14
          lg:py-[135px]
        "
      >
        <div
          className="
            mx-auto
            grid
            max-w-[1420px]
            gap-6

            sm:gap-10

            lg:grid-cols-[.65fr_1.35fr]
            lg:items-center
          "
        >
          <div data-hire-reveal>
            <p className={`${label} text-[#B12025]`}>
              SELECTIVE BY DESIGN
            </p>

            <p
              className="
                mt-3
                text-[52px]
                font-semibold
                leading-none
                tracking-[-.075em]
                text-[#B12025]

                sm:mt-6
                sm:text-[clamp(5rem,10vw,10rem)]
                sm:tracking-[-.09em]
              "
            >
              15–20%
            </p>

            <p
              className="
                mt-2
                max-w-[250px]
                text-[9px]
                leading-[1.6]
                text-[#17191C]/55

                sm:mt-4
                sm:text-[12px]
                sm:leading-6
              "
            >
              Typical proportion of applicants who pass
              FirstNotch hiring checks.
            </p>
          </div>

          <div>
            <h2
              data-hire-title
              className="
                max-w-[940px]
                text-[28px]
                font-semibold
                leading-[1.06]
                tracking-[-.055em]

                sm:text-[clamp(2.7rem,5vw,5.8rem)]
                sm:leading-[1.08]
                sm:tracking-[-.065em]
              "
            >
              <RisingWords text="The goal is not to hire everyone. It is to find the right people." />
            </h2>

            <p
              data-hire-reveal
              className="
                mt-4
                max-w-[720px]
                text-[10px]
                leading-[1.65]
                text-[#17191C]/65

                sm:mt-6
                sm:text-[14px]
                sm:leading-8
              "
            >
              Applicants who do not meet the communication,
              accuracy or role requirements do not move
              forward. That gives client teams a stronger
              starting point before account training begins.
            </p>
          </div>
        </div>
      </section>

      {/* ==================================================
          TRAINING
      ================================================== */}

      <section
        id="training"
        className="
          scroll-mt-[100px]
          bg-white
          px-5
          py-[45px]

          sm:px-8
          sm:py-[105px]

          lg:px-14
          lg:py-[135px]
        "
      >
        <div className="mx-auto max-w-[1420px]">
          <div
            className="
              grid
              gap-5

              sm:gap-10

              lg:grid-cols-[.7fr_1.3fr]
              lg:items-end
            "
          >
            <div data-hire-reveal>
              <p className={`${label} text-[#B12025]`}>
                02 / BEFORE YOUR ACCOUNT
              </p>

              <div
                aria-hidden="true"
                className="
                  mt-4
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  bg-[#fff1f1]
                  text-[#B12025]

                  sm:mt-7
                  sm:h-14
                  sm:w-14
                "
              >
                <GraduationCap
                  className="h-[17px] w-[17px] sm:h-[26px] sm:w-[26px]"
                />
              </div>
            </div>

            <div>
              <h2
                data-hire-title
                className="
                  max-w-[1050px]
                  text-[clamp(1.65rem,7vw,2.05rem)]
                  font-semibold
                  leading-[1.06]
                  tracking-[-.055em]

                  sm:text-[clamp(2.7rem,5vw,5.8rem)]
                  sm:leading-[1.08]
                  sm:tracking-[-.065em]
                "
              >
                <RisingWords text="Then they learn your business before they start." />
              </h2>

              <p
                data-hire-reveal
                className="
                  mt-2.5
                  max-w-[780px]
                  text-[10px]
                  leading-[1.55]
                  text-[#17191C]/65

                  sm:mt-6
                  sm:text-[14px]
                  sm:leading-8
                "
              >
                Passing recruitment does not mean someone
                immediately starts working on your account.
                They first go through training built around
                your products, tools and processes.
              </p>
            </div>
          </div>

          <div
            data-mobile-auto-scroll
            className="
              mt-4
              flex
              snap-x
              snap-mandatory
              gap-3
              overflow-x-auto
              pb-3
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden

              sm:mt-12
              sm:grid
              sm:grid-cols-2
              sm:gap-4
              sm:overflow-visible
              sm:pb-0

              lg:grid-cols-4
            "
          >
            {training.map(
              ({ title, body }, index) => (
                <article
                  key={title}
                  data-mobile-scroll-card
                  data-hire-reveal
                  className="
                    flex
                    min-h-[165px]
                    w-[70vw]
                    max-w-[265px]
                    shrink-0
                    snap-start
                    flex-col
                    rounded-[20px]
                    border
                    border-[#B12025]/12
                    bg-[#F8F8F8]
                    p-3.5
                    transition-colors
                    hover:border-[#B12025]/35

                    sm:min-h-[300px]
                    sm:w-auto
                    sm:max-w-none
                    sm:rounded-[27px]
                    sm:p-7
                  "
                >
                  <div className="flex items-center justify-between gap-4">
                    <span
                      className="
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-full
                        bg-[#B12025]
                        text-[9px]
                        font-semibold
                        text-white

                        sm:h-11
                        sm:w-11
                        sm:text-[12px]
                      "
                    >
                      0{index + 1}
                    </span>

                    <span
                      className="
                        text-[8px]
                        font-semibold
                        uppercase
                        tracking-[.15em]
                        text-[#17191C]/30

                        sm:text-[10px]
                      "
                    >
                      STEP
                    </span>
                  </div>

                  <div className="mt-3 sm:mt-12">
                    <h3
                      className="
                        text-[14px]
                        font-semibold
                        leading-[1.15]
                        tracking-[-.035em]

                        sm:text-[22px]
                        sm:tracking-[-.04em]
                      "
                    >
                      {title}
                    </h3>

                    <p
                      className="
                        mt-1.5
                        max-w-[260px]
                        text-[9px]
                        leading-[1.5]
                        text-[#17191C]/60

                        sm:mt-4
                        sm:text-[12px]
                        sm:leading-7
                      "
                    >
                      {body}
                    </p>
                  </div>
                </article>
              )
            )}
          </div>

          <div
            data-hire-reveal
            className="
              mt-5
              rounded-[20px]
              border
              border-[#B12025]/15
              bg-[#fff8f8]
              p-4

              sm:mt-10
              sm:rounded-[28px]
              sm:p-8
            "
          >
            <div
              className="
                flex
                flex-col
                gap-4

                sm:flex-row
                sm:items-center
                sm:justify-between
                sm:gap-8
              "
            >
              <div>
                <p
                  className="
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[.18em]
                    text-[#B12025]

                    sm:text-[11px]
                    sm:tracking-[.22em]
                  "
                >
                  TRAINING PERIOD
                </p>

                <p
                  className="
                    mt-2
                    text-[17px]
                    font-semibold
                    tracking-[-.035em]

                    sm:mt-3
                    sm:text-[26px]
                    sm:tracking-[-.04em]
                  "
                >
                  {TRAINING_WEEKS === null
                    ? 'Training timing is agreed for each account.'
                    : `${TRAINING_WEEKS} weeks of account-specific training.`}
                </p>
              </div>

              <span
                className="
                  inline-flex
                  w-fit
                  rounded-full
                  bg-white
                  px-3
                  py-2
                  text-[8px]
                  font-semibold
                  text-[#B12025]

                  sm:px-5
                  sm:py-3
                  sm:text-[11px]
                "
              >
                No client work before sign-off
              </span>
            </div>
          </div>
        </div>
      </section>

            {/* ==================================================
          CLIENT-SPECIFIC TRAINING / SIGN-OFF
      ================================================== */}

      <section
        className="
          bg-[#17191C]
          px-5
          py-[46px]
          text-white

          sm:px-8
          sm:py-[105px]

          lg:px-14
          lg:py-[135px]
        "
      >
        <div
          className="
            mx-auto
            grid
            max-w-[1420px]
            gap-7

            sm:gap-12

            lg:grid-cols-[1.1fr_.9fr]
            lg:items-center
            lg:gap-20
          "
        >
          <div>
            <p
              data-hire-reveal
              className={`${label} text-white/50`}
            >
              CLIENT SIGN-OFF
            </p>

            <h2
              data-hire-title
              className="
                mt-3
                max-w-[920px]
                text-[27px]
                font-semibold
                leading-[1.07]
                tracking-[-.05em]

                sm:mt-5
                sm:text-[clamp(2.7rem,5vw,5.8rem)]
                sm:leading-[1.08]
                sm:tracking-[-.065em]
              "
            >
              <RisingWords text="Your process becomes part of their training." />
            </h2>

            <p
              data-hire-reveal
              className="
                mt-4
                max-w-[710px]
                text-[10px]
                leading-[1.65]
                text-white/65

                sm:mt-6
                sm:text-[14px]
                sm:leading-8
              "
            >
              Scripts, escalation rules, account policies,
              tools and common customer situations are
              covered before the team member starts live
              work.
            </p>
          </div>

          <div
            data-hire-reveal
            className="
              rounded-[20px]
              border
              border-white/15
              bg-white/[0.06]
              p-4

              sm:rounded-[30px]
              sm:p-8
            "
          >
            <div className="flex items-start gap-3 sm:gap-5">
              <span
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-[#B12025]

                  sm:h-14
                  sm:w-14
                "
              >
                <Check
                  className="h-[16px] w-[16px] sm:h-[25px] sm:w-[25px]"
                />
              </span>

              <div>
                <p
                  className="
                    text-[15px]
                    font-semibold
                    tracking-[-.03em]

                    sm:text-[24px]
                    sm:tracking-[-.04em]
                  "
                >
                  Ready only after assessment
                </p>

                <p
                  className="
                    mt-2
                    text-[9px]
                    leading-[1.55]
                    text-white/60

                    sm:mt-4
                    sm:text-[12px]
                    sm:leading-7
                  "
                >
                  Staff complete a final process test before
                  they are signed off for live account work.
                  If they do not pass, they receive more
                  training or are not assigned to the
                  account.
                </p>
              </div>
            </div>

            <div
              className="
                mt-4
                grid
                grid-cols-2
                gap-2

                sm:mt-8
                sm:gap-3
              "
            >
              {[
                'Scripts',
                'Tools',
                'Escalations',
                'Policies',
              ].map((item) => (
                <div
                  key={item}
                  className="
                    rounded-[13px]
                    border
                    border-white/10
                    bg-black/10
                    px-3
                    py-2.5
                    text-[8px]
                    font-semibold
                    text-white/70

                    sm:rounded-[18px]
                    sm:px-5
                    sm:py-4
                    sm:text-[11px]
                  "
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          TESTIMONIAL
      ================================================== */}

      <section
        className="
          bg-[#fff8f8]
          px-5
          py-[48px]

          sm:px-8
          sm:py-[110px]

          lg:px-14
          lg:py-[145px]
        "
      >
        <div className="mx-auto max-w-[1200px]">
          <p
            data-hire-reveal
            className={`${label} text-[#B12025]`}
          >
            WHAT CLIENTS NOTICE
          </p>

          <div className="mt-5 sm:mt-10">
            <HiringTestimonial />
          </div>

          <div
            data-hire-reveal
            className="
              mt-5
              flex
              items-center
              gap-3

              sm:mt-9
              sm:gap-4
            "
          >
            <span className="h-px w-8 bg-[#B12025] sm:w-12" />

            <p
              className="
                text-[8px]
                font-semibold
                uppercase
                tracking-[.16em]
                text-[#B12025]

                sm:text-[11px]
                sm:tracking-[.2em]
              "
            >
              CLIENT FEEDBACK
            </p>
          </div>
        </div>
      </section>

      {/* ==================================================
          QUALITY MONITORING
      ================================================== */}

      <section
        id="quality-monitoring"
        className="
          scroll-mt-[100px]
          bg-[#B12025]
          px-5
          pb-[28px]
          pt-[32px]
          text-white

          sm:px-8
          sm:py-[105px]

          lg:px-14
          lg:py-[135px]
        "
      >
        <div className="mx-auto max-w-[1420px]">
          <div
            className="
              grid
              gap-5

              sm:gap-10

              lg:grid-cols-[.68fr_1.32fr]
              lg:items-end
            "
          >
            <div data-hire-reveal>
              <p className={`${label} text-white/55`}>
                03 / AFTER THEY START
              </p>

              <div
                aria-hidden="true"
                className="
                  mt-4
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  bg-white
                  text-[#B12025]

                  sm:mt-7
                  sm:h-14
                  sm:w-14
                "
              >
                <ClipboardCheck
                  className="h-[17px] w-[17px] sm:h-[26px] sm:w-[26px]"
                />
              </div>
            </div>

            <div>
              <h2
                data-hire-title
                className="
                  max-w-[1050px]
                  text-[clamp(1.65rem,7vw,2.05rem)]
                  font-semibold
                  leading-[1.06]
                  tracking-[-.05em]

                  sm:text-[clamp(2.7rem,5vw,5.8rem)]
                  sm:leading-[1.08]
                  sm:tracking-[-.065em]
                "
              >
                <RisingWords text="Hiring well is only the start. The work is checked after that." />
              </h2>

              <p
                data-hire-reveal
                className="
                  mt-2.5
                  max-w-[770px]
                  text-[10px]
                  leading-[1.55]
                  text-white/75

                  sm:mt-6
                  sm:text-[14px]
                  sm:leading-8
                "
              >
                Once someone joins your account, their
                attendance, quality scores and development
                continue to be monitored.
              </p>
            </div>
          </div>

          {/* MOBILE + TABLET QUALITY CARDS */}
          <div
            data-mobile-auto-scroll
            data-quality-carousel
            className="
              mt-4
              flex
              snap-x
              snap-mandatory
              gap-3
              overflow-x-auto
              pb-3
              scroll-smooth
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden

              sm:mt-12
              sm:grid
              sm:grid-cols-2
              sm:gap-4
              sm:overflow-visible
              sm:pb-0

              lg:grid-cols-4
            "
          >
            {monitoring.map(
              ({ title, Icon, body, foot }, index) => (
                <article
                  key={title}
                  data-mobile-scroll-card
                  data-hire-reveal
                  className="
                    flex
                    min-h-[185px]
                    w-[70vw]
                    max-w-[265px]
                    shrink-0
                    snap-start
                    flex-col
                    rounded-[20px]
                    bg-white
                    p-3.5
                    text-[#17191C]

                    sm:min-h-[315px]
                    sm:w-auto
                    sm:max-w-none
                    sm:rounded-[28px]
                    sm:p-7
                  "
                >
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-[10px]
                        bg-[#fff0f0]
                        text-[#B12025]

                        sm:h-12
                        sm:w-12
                        sm:rounded-[14px]
                      "
                    >
                      <Icon
                        className="h-[16px] w-[16px] sm:h-[22px] sm:w-[22px]"
                        strokeWidth={1.6}
                      />
                    </span>

                    <span
                      className="
                        text-[8px]
                        font-semibold
                        text-[#17191C]/25

                        sm:text-[11px]
                      "
                    >
                      0{index + 1}
                    </span>
                  </div>

                  <div className="mt-4 sm:mt-8">
                    <h3
                      className="
                        text-[15px]
                        font-semibold
                        leading-[1.15]
                        tracking-[-.035em]

                        sm:text-[22px]
                        sm:tracking-[-.04em]
                      "
                    >
                      {title}
                    </h3>

                    <p
                      className="
                        mt-1.5
                        text-[9px]
                        leading-[1.5]
                        text-[#17191C]/65

                        sm:mt-4
                        sm:text-[12px]
                        sm:leading-7
                      "
                    >
                      {body}
                    </p>
                  </div>

                  <div
                    className="
                      mt-3
                      border-t
                      border-[#17191C]/10
                      pt-2

                      sm:mt-auto
                      sm:pt-5
                    "
                  >
                    <p
                      className="
                        text-[8px]
                        font-semibold
                        text-[#B12025]

                        sm:text-[10px]
                      "
                    >
                      {foot}
                    </p>
                  </div>
                </article>
              )
            )}
          </div>

          {/* MOBILE ACTIVE DOTS */}
          <div
            className="
              mt-3
              flex
              items-center
              justify-center
              gap-1.5

              sm:hidden
            "
            aria-label={`Quality card ${
              qualityActive + 1
            } of ${monitoring.length}`}
          >
            {monitoring.map((item, index) => (
              <span
                key={item.title}
                className={`
                  h-[4px]
                  rounded-full
                  transition-all
                  duration-300

                  ${
                    index === qualityActive
                      ? 'w-[20px] bg-white'
                      : 'w-[6px] bg-white/40'
                  }
                `}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          SECURITY / DATA HANDLING
      ================================================== */}

      <section
        className="
          bg-white
          px-5
          py-[48px]

          sm:px-8
          sm:py-[105px]

          lg:px-14
          lg:py-[135px]
        "
      >
        <div className="mx-auto max-w-[1420px]">
          <div
            className="
              grid
              gap-5

              sm:gap-10

              lg:grid-cols-[.68fr_1.32fr]
              lg:items-end
            "
          >
            <div data-hire-reveal>
              <p className={`${label} text-[#B12025]`}>
                04 / DATA & RESPONSIBILITY
              </p>

              <div
                aria-hidden="true"
                className="
                  mt-4
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  bg-[#fff1f1]
                  text-[#B12025]

                  sm:mt-7
                  sm:h-14
                  sm:w-14
                "
              >
                <ShieldCheck
                  className="h-[17px] w-[17px] sm:h-[26px] sm:w-[26px]"
                />
              </div>
            </div>

            <div>
              <h2
                data-hire-title
                className="
                  max-w-[1030px]
                  text-[27px]
                  font-semibold
                  leading-[1.06]
                  tracking-[-.05em]

                  sm:text-[clamp(2.7rem,5vw,5.8rem)]
                  sm:leading-[1.08]
                  sm:tracking-[-.065em]
                "
              >
                <RisingWords text="People only get access to what they need for the job." />
              </h2>

              <p
                data-hire-reveal
                className="
                  mt-3
                  max-w-[760px]
                  text-[10px]
                  leading-[1.6]
                  text-[#17191C]/65

                  sm:mt-6
                  sm:text-[14px]
                  sm:leading-8
                "
              >
                Client information is handled through
                account permissions, staff training and
                confidentiality requirements.
              </p>
            </div>
          </div>

          <div
            data-mobile-auto-scroll
            className="
              mt-5
              flex
              snap-x
              snap-mandatory
              gap-3
              overflow-x-auto
              pb-3
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden

              sm:mt-12
              sm:grid
              sm:grid-cols-3
              sm:gap-4
              sm:overflow-visible
              sm:pb-0
            "
          >
            {security.map(
              ({ title, Icon, body, badge }, index) => (
                <article
                  key={title}
                  data-mobile-scroll-card
                  data-hire-reveal
                  className="
                    flex
                    min-h-[180px]
                    w-[72vw]
                    max-w-[270px]
                    shrink-0
                    snap-start
                    flex-col
                    rounded-[20px]
                    border
                    border-[#B12025]/15
                    bg-[#fff9f9]
                    p-4

                    sm:min-h-[320px]
                    sm:w-auto
                    sm:max-w-none
                    sm:rounded-[28px]
                    sm:p-8
                  "
                >
                  <div className="flex items-start justify-between gap-4">
                    <span
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        bg-[#B12025]
                        text-white

                        sm:h-12
                        sm:w-12
                      "
                    >
                      <Icon
                        className="h-[16px] w-[16px] sm:h-[22px] sm:w-[22px]"
                        strokeWidth={1.6}
                      />
                    </span>

                    <span
                      className="
                        text-[8px]
                        font-semibold
                        text-[#B12025]/40

                        sm:text-[11px]
                      "
                    >
                      0{index + 1}
                    </span>
                  </div>

                  <div className="mt-4 sm:mt-10">
                    <h3
                      className="
                        text-[15px]
                        font-semibold
                        tracking-[-.035em]

                        sm:text-[23px]
                        sm:tracking-[-.04em]
                      "
                    >
                      {title}
                    </h3>

                    <p
                      className="
                        mt-2
                        text-[9px]
                        leading-[1.55]
                        text-[#17191C]/60

                        sm:mt-4
                        sm:text-[12px]
                        sm:leading-7
                      "
                    >
                      {body}
                    </p>
                  </div>

                  <span
                    className="
                      mt-4
                      inline-flex
                      w-fit
                      rounded-full
                      bg-white
                      px-2.5
                      py-1.5
                      text-[8px]
                      font-semibold
                      text-[#B12025]

                      sm:mt-auto
                      sm:px-4
                      sm:py-2
                      sm:text-[10px]
                    "
                  >
                    {badge}
                  </span>
                </article>
              )
            )}
          </div>
        </div>
      </section>

      {/* ==================================================
          HOW QUALITY FEEDS COACHING
      ================================================== */}

      <section
        className="
          bg-[#17191C]
          px-5
          py-[48px]
          text-white

          sm:px-8
          sm:py-[110px]

          lg:px-14
          lg:py-[145px]
        "
      >
        <div
          className="
            mx-auto
            grid
            max-w-[1420px]
            gap-7

            sm:gap-12

            lg:grid-cols-[.95fr_1.05fr]
            lg:items-center
            lg:gap-20
          "
        >
          <div>
            <p
              data-hire-reveal
              className={`${label} text-white/50`}
            >
              COACHING LOOP
            </p>

            <h2
              data-hire-title
              className="
                mt-3
                max-w-[850px]
                text-[27px]
                font-semibold
                leading-[1.07]
                tracking-[-.05em]

                sm:mt-5
                sm:text-[clamp(2.7rem,5vw,5.8rem)]
                sm:leading-[1.08]
                sm:tracking-[-.065em]
              "
            >
              <RisingWords text="Scores should lead to better work, not just another report." />
            </h2>

            <p
              data-hire-reveal
              className="
                mt-4
                max-w-[680px]
                text-[10px]
                leading-[1.65]
                text-white/65

                sm:mt-6
                sm:text-[14px]
                sm:leading-8
              "
            >
              Quality results are reviewed with staff so
              problems can be corrected and strong
              performance can be repeated.
            </p>
          </div>

          <div
            data-hire-reveal
            className="
              grid
              grid-cols-2
              gap-2

              sm:gap-4
            "
          >
            {[
              ['01', 'Measure', 'Calls and tasks are scored.'],
              ['02', 'Review', 'Managers review the results.'],
              ['03', 'Coach', 'Specific gaps are coached.'],
              ['04', 'Measure again', 'The next work is checked again.'],
            ].map(([number, title, description]) => (
              <article
                key={number}
                className="
                  min-h-[125px]
                  rounded-[17px]
                  border
                  border-white/12
                  bg-white/[0.05]
                  p-3

                  sm:min-h-[210px]
                  sm:rounded-[25px]
                  sm:p-6
                "
              >
                <span
                  className="
                    text-[8px]
                    font-semibold
                    text-[#ef7d82]

                    sm:text-[11px]
                  "
                >
                  {number}
                </span>

                <h3
                  className="
                    mt-5
                    text-[14px]
                    font-semibold
                    tracking-[-.03em]

                    sm:mt-10
                    sm:text-[22px]
                    sm:tracking-[-.04em]
                  "
                >
                  {title}
                </h3>

                <p
                  className="
                    mt-1.5
                    text-[8px]
                    leading-[1.5]
                    text-white/55

                    sm:mt-3
                    sm:text-[11px]
                    sm:leading-6
                  "
                >
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
            {/* ==================================================
          RESPONSIBILITY / MANAGEMENT
      ================================================== */}

      <section
        className="
          bg-white
          px-5
          py-[48px]

          sm:px-8
          sm:py-[105px]

          lg:px-14
          lg:py-[140px]
        "
      >
        <div className="mx-auto max-w-[1420px]">
          <div
            className="
              grid
              gap-6

              sm:gap-10

              lg:grid-cols-[.7fr_1.3fr]
              lg:items-end
            "
          >
            <div data-hire-reveal>
              <p className={`${label} text-[#B12025]`}>
                CLEAR RESPONSIBILITY
              </p>

              <div
                aria-hidden="true"
                className="
                  mt-4
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  bg-[#fff1f1]
                  text-[#B12025]

                  sm:mt-7
                  sm:h-14
                  sm:w-14
                "
              >
                <ClipboardCheck
                  className="
                    h-[17px]
                    w-[17px]

                    sm:h-[26px]
                    sm:w-[26px]
                  "
                />
              </div>
            </div>

            <div>
              <h2
                data-hire-title
                className="
                  max-w-[1050px]
                  text-[27px]
                  font-semibold
                  leading-[1.07]
                  tracking-[-.05em]

                  sm:text-[clamp(2.7rem,5vw,5.8rem)]
                  sm:leading-[1.08]
                  sm:tracking-[-.065em]
                "
              >
                <RisingWords text="Someone is responsible for the work after the team is hired." />
              </h2>

              <p
                data-hire-reveal
                className="
                  mt-3
                  max-w-[760px]
                  text-[10px]
                  leading-[1.65]
                  text-[#17191C]/65

                  sm:mt-6
                  sm:text-[14px]
                  sm:leading-8
                "
              >
                Hiring, training and monitoring work
                together. Managers are responsible for
                reviewing performance, addressing issues
                and keeping account standards clear.
              </p>
            </div>
          </div>

          <div
            className="
              mt-6
              grid
              gap-3

              sm:mt-12
              sm:grid-cols-3
              sm:gap-4
            "
          >
            {[
              {
                number: '01',
                title: 'Team member',
                body:
                  'Completes the work according to your approved process and account requirements.',
              },
              {
                number: '02',
                title: 'Team leader',
                body:
                  'Checks day-to-day performance, attendance and operational issues.',
              },
              {
                number: '03',
                title: 'Account management',
                body:
                  'Reviews results, client feedback and any actions needed to improve the account.',
              },
            ].map((item) => (
              <article
                key={item.number}
                data-hire-reveal
                className="
                  rounded-[18px]
                  border
                  border-[#17191C]/10
                  bg-[#fafafa]
                  p-4

                  sm:min-h-[280px]
                  sm:rounded-[28px]
                  sm:p-8
                "
              >
                <div className="flex items-center justify-between">
                  <span
                    className="
                      text-[8px]
                      font-semibold
                      text-[#B12025]

                      sm:text-[11px]
                    "
                  >
                    {item.number}
                  </span>

                  <ArrowUpRight
                    className="
                      h-4
                      w-4
                      text-[#B12025]

                      sm:h-5
                      sm:w-5
                    "
                  />
                </div>

                <div className="mt-6 sm:mt-16">
                  <h3
                    className="
                      text-[16px]
                      font-semibold
                      tracking-[-.035em]

                      sm:text-[24px]
                      sm:tracking-[-.04em]
                    "
                  >
                    {item.title}
                  </h3>

                  <p
                    className="
                      mt-2
                      text-[9px]
                      leading-[1.6]
                      text-[#17191C]/60

                      sm:mt-4
                      sm:text-[12px]
                      sm:leading-7
                    "
                  >
                    {item.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          INTERVIEW / CLIENT INVOLVEMENT
      ================================================== */}

      <section
        className="
          overflow-hidden
          bg-[#fff8f8]
          px-5
          py-[48px]

          sm:px-8
          sm:py-[105px]

          lg:px-14
          lg:py-[140px]
        "
      >
        <div
          className="
            mx-auto
            grid
            max-w-[1420px]
            gap-7

            sm:gap-12

            lg:grid-cols-[1.05fr_.95fr]
            lg:items-center
            lg:gap-20
          "
        >
          <div>
            <p
              data-hire-reveal
              className={`${label} text-[#B12025]`}
            >
              YOUR INVOLVEMENT
            </p>

            <h2
              data-hire-title
              className="
                mt-3
                max-w-[920px]
                text-[27px]
                font-semibold
                leading-[1.07]
                tracking-[-.05em]

                sm:mt-5
                sm:text-[clamp(2.7rem,5vw,5.8rem)]
                sm:leading-[1.08]
                sm:tracking-[-.065em]
              "
            >
              <RisingWords text="You can meet the people shortlisted for your account." />
            </h2>

            <p
              data-hire-reveal
              className="
                mt-4
                max-w-[690px]
                text-[10px]
                leading-[1.65]
                text-[#17191C]/65

                sm:mt-6
                sm:text-[14px]
                sm:leading-8
              "
            >
              If you want to be involved in the final
              selection, shortlisted staff can meet you
              before they are assigned to the account.
            </p>

            <div
              data-hire-reveal
              className="
                mt-5
                flex
                flex-wrap
                gap-2

                sm:mt-8
                sm:gap-3
              "
            >
              <Link
                href="/#contact"
                className="
                  inline-flex
                  min-h-[36px]
                  items-center
                  gap-2
                  rounded-full
                  bg-[#B12025]
                  px-3
                  text-[9px]
                  font-semibold
                  text-white
                  transition-colors
                  hover:bg-[#941b20]

                  sm:min-h-[54px]
                  sm:gap-3
                  sm:px-6
                  sm:text-[12px]
                "
              >
                Talk about your team

                <ArrowUpRight
                  className="
                    h-[13px]
                    w-[13px]

                    sm:h-[17px]
                    sm:w-[17px]
                  "
                />
              </Link>
            </div>
          </div>

          <div
            data-hire-reveal
            className="
              relative
              rounded-[22px]
              bg-[#B12025]
              p-5
              text-white

              sm:rounded-[32px]
              sm:p-9
            "
          >
            <div
              aria-hidden="true"
              className="
                absolute
                right-5
                top-5
                h-12
                w-12
                rounded-full
                border
                border-white/20

                sm:right-8
                sm:top-8
                sm:h-20
                sm:w-20
              "
            />

            <p
              className="
                text-[8px]
                font-semibold
                uppercase
                tracking-[.18em]
                text-white/65

                sm:text-[11px]
                sm:tracking-[.22em]
              "
            >
              OPTIONAL CLIENT STEP
            </p>

            <p
              className="
                mt-10
                max-w-[500px]
                text-[22px]
                font-semibold
                leading-[1.18]
                tracking-[-.045em]

                sm:mt-20
                sm:text-[36px]
                sm:leading-[1.2]
              "
            >
              Meet shortlisted staff before they join your
              account.
            </p>

            <div
              className="
                mt-5
                border-t
                border-white/25
                pt-4

                sm:mt-8
                sm:pt-6
              "
            >
              <p
                className="
                  max-w-[470px]
                  text-[9px]
                  leading-[1.6]
                  text-white/70

                  sm:text-[12px]
                  sm:leading-7
                "
              >
                You can ask questions, understand their
                experience and make sure the proposed team
                fits the way your business works.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          YOUR OWN TEST
      ================================================== */}

      <section
        className="
          bg-white
          px-5
          py-[48px]

          sm:px-8
          sm:py-[105px]

          lg:px-14
          lg:py-[140px]
        "
      >
        <div className="mx-auto max-w-[1420px]">
          <div
            className="
              rounded-[22px]
              border
              border-[#B12025]/15
              bg-white
              p-5

              sm:rounded-[34px]
              sm:p-10

              lg:p-14
            "
          >
            <div
              className="
                grid
                gap-7

                sm:gap-12

                lg:grid-cols-[1.1fr_.9fr]
                lg:items-end
              "
            >
              <div>
                <p
                  data-hire-reveal
                  className={`${label} text-[#B12025]`}
                >
                  YOUR OWN ASSESSMENT
                </p>

                <h2
                  data-hire-title
                  className="
                    mt-3
                    max-w-[850px]
                    text-[27px]
                    font-semibold
                    leading-[1.07]
                    tracking-[-.05em]

                    sm:mt-5
                    sm:text-[clamp(2.5rem,4.5vw,5rem)]
                    sm:leading-[1.08]
                    sm:tracking-[-.06em]
                  "
                >
                  <RisingWords text="Your test can be added to our hiring process." />
                </h2>
              </div>

              <div data-hire-reveal>
                <p
                  className="
                    max-w-[580px]
                    text-[10px]
                    leading-[1.65]
                    text-[#17191C]/65

                    sm:text-[14px]
                    sm:leading-8
                  "
                >
                  If your business has a particular
                  assessment, scenario or question set, it
                  can be included when selecting staff for
                  your account.
                </p>
              </div>
            </div>

            <div
              className="
                mt-6
                grid
                gap-2

                sm:mt-10
                sm:grid-cols-3
                sm:gap-3
              "
            >
              {[
                {
                  title: 'Your scenarios',
                  body:
                    'Use situations your team handles in real customer or operational work.',
                },
                {
                  title: 'Your questions',
                  body:
                    'Add questions that help identify the knowledge or judgement you need.',
                },
                {
                  title: 'Your standard',
                  body:
                    'Agree what a successful answer or performance should look like.',
                },
              ].map((item, index) => (
                <article
                  key={item.title}
                  data-hire-reveal
                  className="
                    rounded-[16px]
                    bg-[#fff8f8]
                    p-4

                    sm:min-h-[210px]
                    sm:rounded-[24px]
                    sm:p-6
                  "
                >
                  <span
                    className="
                      text-[8px]
                      font-semibold
                      text-[#B12025]

                      sm:text-[10px]
                    "
                  >
                    0{index + 1}
                  </span>

                  <h3
                    className="
                      mt-5
                      text-[15px]
                      font-semibold
                      tracking-[-.03em]

                      sm:mt-10
                      sm:text-[22px]
                      sm:tracking-[-.04em]
                    "
                  >
                    {item.title}
                  </h3>

                  <p
                    className="
                      mt-2
                      text-[9px]
                      leading-[1.55]
                      text-[#17191C]/60

                      sm:mt-3
                      sm:text-[11px]
                      sm:leading-6
                    "
                  >
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          LANGUAGES
      ================================================== */}

      <section
        className="
          overflow-hidden
          bg-[#B12025]
          px-5
          py-[48px]
          text-white

          sm:px-8
          sm:py-[105px]

          lg:px-14
          lg:py-[140px]
        "
      >
        <div className="mx-auto max-w-[1420px]">
          <p
            data-hire-reveal
            className={`${label} text-white/60`}
          >
            LANGUAGE COVERAGE
          </p>

          <div
            className="
              mt-3
              grid
              gap-6

              sm:mt-6
              sm:gap-10

              lg:grid-cols-[1.1fr_.9fr]
              lg:items-end
            "
          >
            <h2
              data-hire-title
              className="
                max-w-[950px]
                text-[27px]
                font-semibold
                leading-[1.07]
                tracking-[-.05em]

                sm:text-[clamp(2.7rem,5vw,5.8rem)]
                sm:leading-[1.08]
                sm:tracking-[-.065em]
              "
            >
              <RisingWords text="Choose a team that matches the languages your customers use." />
            </h2>

            <p
              data-hire-reveal
              className="
                max-w-[560px]
                text-[10px]
                leading-[1.65]
                text-white/70

                sm:text-[14px]
                sm:leading-8
              "
            >
              Language requirements are considered during
              recruitment so the people proposed for your
              account match the customers or teams they
              need to communicate with.
            </p>
          </div>

          <div
            className="
              mt-6
              grid
              grid-cols-2
              gap-2

              sm:mt-12
              sm:grid-cols-4
              sm:gap-4
            "
          >
            {[
              ['01', 'English'],
              ['02', 'Sinhala'],
              ['03', 'Tamil'],
              ['04', 'Hindi'],
            ].map(([number, language]) => (
              <article
                key={language}
                data-hire-reveal
                className="
                  rounded-[16px]
                  border
                  border-white/20
                  bg-white/[0.06]
                  p-4

                  sm:min-h-[200px]
                  sm:rounded-[25px]
                  sm:p-6
                "
              >
                <span
                  className="
                    text-[8px]
                    font-semibold
                    text-white/50

                    sm:text-[10px]
                  "
                >
                  {number}
                </span>

                <p
                  className="
                    mt-8
                    text-[18px]
                    font-semibold
                    tracking-[-.035em]

                    sm:mt-16
                    sm:text-[27px]
                    sm:tracking-[-.045em]
                  "
                >
                  {language}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          EMPLOYMENT MODEL
      ================================================== */}

      <section
        className="
          bg-[#17191C]
          px-5
          py-[48px]
          text-white

          sm:px-8
          sm:py-[105px]

          lg:px-14
          lg:py-[140px]
        "
      >
        <div
          className="
            mx-auto
            grid
            max-w-[1420px]
            gap-7

            sm:gap-12

            lg:grid-cols-[.8fr_1.2fr]
            lg:items-center
            lg:gap-20
          "
        >
          <div data-hire-reveal>
            <div
              className="
                flex
                h-[120px]
                w-[120px]
                flex-col
                items-center
                justify-center
                rounded-full
                border
                border-white/15
                bg-white/[0.04]

                sm:h-[210px]
                sm:w-[210px]
              "
            >
              <span
                className="
                  text-[27px]
                  font-semibold
                  tracking-[-.06em]
                  text-[#ef7d82]

                  sm:text-[48px]
                "
              >
                FNS
              </span>

              <span
                className="
                  mt-1
                  text-[7px]
                  font-semibold
                  uppercase
                  tracking-[.15em]
                  text-white/45

                  sm:mt-2
                  sm:text-[9px]
                  sm:tracking-[.2em]
                "
              >
                TEAM
              </span>
            </div>
          </div>

          <div>
            <p
              data-hire-reveal
              className={`${label} text-white/50`}
            >
              EMPLOYMENT MODEL
            </p>

            <h2
              data-hire-title
              className="
                mt-3
                max-w-[900px]
                text-[27px]
                font-semibold
                leading-[1.07]
                tracking-[-.05em]

                sm:mt-5
                sm:text-[clamp(2.7rem,5vw,5.8rem)]
                sm:leading-[1.08]
                sm:tracking-[-.065em]
              "
            >
              <RisingWords text="Your team members are FirstNotch employees, not freelancers." />
            </h2>

            <p
              data-hire-reveal
              className="
                mt-4
                max-w-[690px]
                text-[10px]
                leading-[1.65]
                text-white/65

                sm:mt-6
                sm:text-[14px]
                sm:leading-8
              "
            >
              Team members are employed by FirstNotch and
              work within our operating structure. Hiring,
              attendance, coaching and employment
              responsibilities are managed through the
              company.
            </p>
          </div>
        </div>
      </section>

      {/* ==================================================
          REPLACEMENT / CONTINUITY
      ================================================== */}

      <section
        className="
          bg-white
          px-5
          py-[48px]

          sm:px-8
          sm:py-[105px]

          lg:px-14
          lg:py-[140px]
        "
      >
        <div
          className="
            mx-auto
            grid
            max-w-[1420px]
            gap-7

            sm:gap-12

            lg:grid-cols-[1.1fr_.9fr]
            lg:items-center
            lg:gap-20
          "
        >
          <div>
            <p
              data-hire-reveal
              className={`${label} text-[#B12025]`}
            >
              TEAM CONTINUITY
            </p>

            <h2
              data-hire-title
              className="
                mt-3
                max-w-[900px]
                text-[27px]
                font-semibold
                leading-[1.07]
                tracking-[-.05em]

                sm:mt-5
                sm:text-[clamp(2.7rem,5vw,5.8rem)]
                sm:leading-[1.08]
                sm:tracking-[-.065em]
              "
            >
              <RisingWords text="If someone leaves, the replacement goes through the same process." />
            </h2>

            <p
              data-hire-reveal
              className="
                mt-4
                max-w-[690px]
                text-[10px]
                leading-[1.65]
                text-[#17191C]/65

                sm:mt-6
                sm:text-[14px]
                sm:leading-8
              "
            >
              A replacement does not simply take over
              because a seat is empty. They complete the
              relevant checks and account training before
              joining your work.
            </p>
          </div>

          <div
            data-hire-reveal
            className="
              rounded-[22px]
              border
              border-[#B12025]/15
              bg-[#fff8f8]
              p-5

              sm:rounded-[30px]
              sm:p-8
            "
          >
            {[
              'Replacement identified',
              'Hiring checks completed',
              'Account training completed',
              'Handover agreed with you',
            ].map((item, index) => (
              <div
                key={item}
                className={`
                  flex
                  items-center
                  gap-3
                  py-3

                  sm:gap-4
                  sm:py-5

                  ${
                    index !== 3
                      ? 'border-b border-[#B12025]/10'
                      : ''
                  }
                `}
              >
                <span
                  className="
                    flex
                    h-7
                    w-7
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[#B12025]
                    text-[8px]
                    font-semibold
                    text-white

                    sm:h-10
                    sm:w-10
                    sm:text-[10px]
                  "
                >
                  0{index + 1}
                </span>

                <p
                  className="
                    text-[11px]
                    font-semibold
                    tracking-[-.02em]

                    sm:text-[15px]
                  "
                >
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          HIRING TIMELINE
      ================================================== */}

      <section
        className="
          bg-[#fff8f8]
          px-5
          py-[48px]

          sm:px-8
          sm:py-[105px]

          lg:px-14
          lg:py-[140px]
        "
      >
        <div className="mx-auto max-w-[1420px]">
          <div
            className="
              grid
              gap-6

              sm:gap-10

              lg:grid-cols-[.7fr_1.3fr]
              lg:items-end
            "
          >
            <div data-hire-reveal>
              <p className={`${label} text-[#B12025]`}>
                TIMING
              </p>

              <Clock3
                className="
                  mt-4
                  h-9
                  w-9
                  text-[#B12025]

                  sm:mt-7
                  sm:h-14
                  sm:w-14
                "
                strokeWidth={1.3}
              />
            </div>

            <div>
              <h2
                data-hire-title
                className="
                  max-w-[1000px]
                  text-[27px]
                  font-semibold
                  leading-[1.07]
                  tracking-[-.05em]

                  sm:text-[clamp(2.7rem,5vw,5.8rem)]
                  sm:leading-[1.08]
                  sm:tracking-[-.065em]
                "
              >
                <RisingWords text="Hiring time depends on the team you need." />
              </h2>

              <p
                data-hire-reveal
                className="
                  mt-4
                  max-w-[730px]
                  text-[10px]
                  leading-[1.65]
                  text-[#17191C]/65

                  sm:mt-6
                  sm:text-[14px]
                  sm:leading-8
                "
              >
                Team size, languages, role complexity and
                account-specific training all affect the
                hiring timeline.
              </p>
            </div>
          </div>

          <div
            data-hire-reveal
            className="
              mt-6
              rounded-[20px]
              border
              border-[#B12025]/15
              bg-white
              p-5

              sm:mt-12
              sm:rounded-[30px]
              sm:p-9
            "
          >
            <div
              className="
                flex
                flex-col
                gap-5

                sm:flex-row
                sm:items-center
                sm:justify-between
                sm:gap-10
              "
            >
              <div>
                <p
                  className="
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[.18em]
                    text-[#B12025]

                    sm:text-[11px]
                    sm:tracking-[.22em]
                  "
                >
                  TYPICAL TIMELINE
                </p>

                <p
                  className="
                    mt-2
                    max-w-[760px]
                    text-[17px]
                    font-semibold
                    leading-[1.35]
                    tracking-[-.035em]

                    sm:mt-3
                    sm:text-[28px]
                    sm:tracking-[-.045em]
                  "
                >
                  {HIRING_WEEKS === null
                    ? 'The hiring and training timeline is confirmed after we understand your requirements.'
                    : `Hiring and training usually take around ${HIRING_WEEKS} weeks.`}
                </p>
              </div>

              <Link
                href="/#contact"
                className="
                  inline-flex
                  min-h-[36px]
                  w-fit
                  shrink-0
                  items-center
                  gap-2
                  rounded-full
                  bg-[#B12025]
                  px-3
                  text-[9px]
                  font-semibold
                  text-white
                  transition-colors
                  hover:bg-[#941b20]

                  sm:min-h-[52px]
                  sm:px-6
                  sm:text-[11px]
                "
              >
                Discuss your timeline

                <ArrowUpRight
                  className="
                    h-[13px]
                    w-[13px]

                    sm:h-[17px]
                    sm:w-[17px]
                  "
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
            {/* ==================================================
          FAQ
      ================================================== */}

      <section
        id="faq"
        className="
          scroll-mt-[100px]
          bg-white
          px-5
          py-[48px]

          sm:px-8
          sm:py-[105px]

          lg:px-14
          lg:py-[140px]
        "
      >
        <div
          className="
            mx-auto
            grid
            max-w-[1420px]
            gap-7

            sm:gap-12

            lg:grid-cols-[.7fr_1.3fr]
            lg:gap-20
          "
        >
          {/* LEFT */}
          <div>
            <p
              data-hire-reveal
              className={`${label} text-[#B12025]`}
            >
              FAQ
            </p>

            <h2
              data-hire-title
              className="
                mt-3
                max-w-[520px]
                text-[27px]
                font-semibold
                leading-[1.07]
                tracking-[-.05em]

                sm:mt-5
                sm:text-[clamp(2.7rem,5vw,5.8rem)]
                sm:leading-[1.08]
                sm:tracking-[-.065em]
              "
            >
              <RisingWords text="Questions about how we hire." />
            </h2>

            <p
              data-hire-reveal
              className="
                mt-4
                max-w-[460px]
                text-[10px]
                leading-[1.65]
                text-[#17191C]/60

                sm:mt-6
                sm:text-[13px]
                sm:leading-7
              "
            >
              If your hiring requirement is more specific,
              talk to the FirstNotch team and we can explain
              how the process would work for your account.
            </p>

            <Link
              href="/#contact"
              data-hire-reveal
              className="
                mt-5
                inline-flex
                min-h-[36px]
                items-center
                gap-2
                rounded-full
                bg-[#B12025]
                px-3
                text-[9px]
                font-semibold
                text-white
                transition-colors
                hover:bg-[#941b20]

                sm:mt-8
                sm:min-h-[52px]
                sm:gap-3
                sm:px-6
                sm:text-[11px]
              "
            >
              Ask us a question

              <ArrowUpRight
                className="
                  h-[13px]
                  w-[13px]

                  sm:h-[17px]
                  sm:w-[17px]
                "
              />
            </Link>
          </div>

          {/* RIGHT */}
          <div
            data-hire-reveal
            className="
              border-t
              border-[#17191C]/10

              lg:border-t-0
            "
          >
            {faqs.map((faq, index) => {
              const isOpen = faqOpen === index;

              return (
                <div
                  key={faq.question}
                  className="
                    border-b
                    border-[#17191C]/10
                  "
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    className="
                      flex
                      w-full
                      items-start
                      justify-between
                      gap-5
                      py-4
                      text-left

                      sm:gap-8
                      sm:py-7
                    "
                  >
                    <div className="flex gap-3 sm:gap-5">
                      <span
                        className="
                          mt-[2px]
                          shrink-0
                          text-[8px]
                          font-semibold
                          text-[#B12025]/55

                          sm:mt-[5px]
                          sm:text-[10px]
                        "
                      >
                        {String(index + 1).padStart(
                          2,
                          '0'
                        )}
                      </span>

                      <span
                        className="
                          max-w-[720px]
                          text-[13px]
                          font-semibold
                          leading-[1.35]
                          tracking-[-.025em]
                          text-[#17191C]

                          sm:text-[19px]
                          sm:leading-[1.4]
                          sm:tracking-[-.035em]
                        "
                      >
                        {faq.question}
                      </span>
                    </div>

                    <span
                      className={`
                        flex
                        h-7
                        w-7
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[#17191C]/15
                        transition-all
                        duration-300

                        sm:h-10
                        sm:w-10

                        ${
                          isOpen
                            ? 'rotate-180 bg-[#B12025] text-white border-[#B12025]'
                            : 'bg-white text-[#17191C]'
                        }
                      `}
                    >
                      <ChevronDown
                        className="
                          h-[13px]
                          w-[13px]

                          sm:h-[17px]
                          sm:w-[17px]
                        "
                      />
                    </span>
                  </button>

                  <div
                    id={`faq-answer-${index}`}
                    className={`
                      grid
                      transition-[grid-template-rows,opacity]
                      duration-300
                      ease-out

                      ${
                        isOpen
                          ? 'grid-rows-[1fr] opacity-100'
                          : 'grid-rows-[0fr] opacity-0'
                      }
                    `}
                  >
                    <div className="overflow-hidden">
                      <p
                        className="
                          max-w-[710px]
                          pb-4
                          pl-[32px]
                          pr-8
                          text-[9px]
                          leading-[1.65]
                          text-[#17191C]/60

                          sm:pb-7
                          sm:pl-[45px]
                          sm:pr-16
                          sm:text-[13px]
                          sm:leading-7
                        "
                      >
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================================================
          FINAL SUMMARY
      ================================================== */}

      <section
        className="
          overflow-hidden
          bg-[#17191C]
          px-5
          py-[48px]
          text-white

          sm:px-8
          sm:py-[110px]

          lg:px-14
          lg:py-[145px]
        "
      >
        <div className="mx-auto max-w-[1420px]">
          <div
            className="
              grid
              gap-8

              sm:gap-12

              lg:grid-cols-[1.2fr_.8fr]
              lg:items-end
              lg:gap-20
            "
          >
            <div>
              <p
                data-hire-reveal
                className={`${label} text-white/45`}
              >
                THE RESULT
              </p>

              <h2
                data-hire-title
                className="
                  mt-3
                  max-w-[1000px]
                  text-[29px]
                  font-semibold
                  leading-[1.06]
                  tracking-[-.055em]

                  sm:mt-5
                  sm:text-[clamp(3rem,5.4vw,6.2rem)]
                  sm:leading-[1.05]
                  sm:tracking-[-.07em]
                "
              >
                <RisingWords text="A team selected for the work, trained for your account and checked after they start." />
              </h2>
            </div>

            <div
              data-hire-reveal
              className="
                border-t
                border-white/15
                pt-5

                sm:pt-7

                lg:border-l
                lg:border-t-0
                lg:pl-10
                lg:pt-0
              "
            >
              <p
                className="
                  max-w-[480px]
                  text-[10px]
                  leading-[1.7]
                  text-white/65

                  sm:text-[14px]
                  sm:leading-8
                "
              >
                Recruitment is one part of building a good
                outsourced team. The next part is making
                sure that team understands your business
                and keeps meeting the standard after launch.
              </p>
            </div>
          </div>

          <div
            className="
              mt-7
              grid
              grid-cols-2
              gap-2

              sm:mt-12
              sm:grid-cols-4
              sm:gap-4
            "
          >
            {[
              ['01', 'Screened'],
              ['02', 'Trained'],
              ['03', 'Signed off'],
              ['04', 'Monitored'],
            ].map(([number, title]) => (
              <div
                key={title}
                data-hire-reveal
                className="
                  rounded-[16px]
                  border
                  border-white/12
                  bg-white/[0.04]
                  p-3.5

                  sm:min-h-[150px]
                  sm:rounded-[24px]
                  sm:p-6
                "
              >
                <span
                  className="
                    text-[8px]
                    font-semibold
                    text-[#ef7d82]

                    sm:text-[10px]
                  "
                >
                  {number}
                </span>

                <p
                  className="
                    mt-7
                    text-[14px]
                    font-semibold
                    tracking-[-.03em]

                    sm:mt-12
                    sm:text-[21px]
                    sm:tracking-[-.04em]
                  "
                >
                  {title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          FINAL CTA
      ================================================== */}

      <section
        id="contact"
        className="
          relative
          overflow-hidden
          bg-[#B12025]
          px-5
          py-[52px]
          text-white

          sm:px-8
          sm:py-[120px]

          lg:px-14
          lg:py-[155px]
        "
      >
        {/* DECORATIVE BACKGROUND */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            overflow-hidden
          "
        >
          <div
            className="
              absolute
              -right-[120px]
              -top-[100px]
              h-[300px]
              w-[300px]
              rounded-full
              border
              border-white/10

              sm:-right-[180px]
              sm:-top-[180px]
              sm:h-[600px]
              sm:w-[600px]
            "
          />

          <div
            className="
              absolute
              -bottom-[140px]
              -left-[130px]
              h-[300px]
              w-[300px]
              rounded-full
              border
              border-white/[0.08]

              sm:-bottom-[260px]
              sm:-left-[200px]
              sm:h-[600px]
              sm:w-[600px]
            "
          />
        </div>

        <div
          className="
            relative
            z-10
            mx-auto
            max-w-[1420px]
          "
        >
          <p
            data-hire-reveal
            className={`${label} text-white/60`}
          >
            BUILD YOUR TEAM
          </p>

          <div
            className="
              mt-3
              grid
              gap-7

              sm:mt-6
              sm:gap-12

              lg:grid-cols-[1.15fr_.85fr]
              lg:items-end
              lg:gap-20
            "
          >
            <div>
              <h2
                data-hire-title
                className="
                  max-w-[1000px]
                  text-[31px]
                  font-semibold
                  leading-[1.04]
                  tracking-[-.06em]

                  sm:text-[clamp(3.2rem,6vw,7rem)]
                  sm:leading-[1.02]
                  sm:tracking-[-.075em]
                "
              >
                <RisingWords text="Tell us who you need on your team." />
              </h2>

              <p
                data-hire-reveal
                className="
                  mt-4
                  max-w-[700px]
                  text-[10px]
                  leading-[1.7]
                  text-white/75

                  sm:mt-7
                  sm:text-[14px]
                  sm:leading-8
                "
              >
                Tell us the roles, languages and skills you
                need. We&apos;ll explain how we would
                recruit, train and launch the team for your
                account.
              </p>
            </div>

            <div
              data-hire-reveal
              className="
                border-t
                border-white/25
                pt-5

                sm:pt-7

                lg:border-l
                lg:border-t-0
                lg:pl-10
                lg:pt-0
              "
            >
              <div
                className="
                  flex
                  flex-col
                  gap-2.5

                  sm:gap-3
                "
              >
                <Link
                  href="/#contact"
                  className="
                    group
                    flex
                    min-h-[44px]
                    items-center
                    justify-between
                    gap-5
                    rounded-full
                    bg-white
                    px-4
                    text-[10px]
                    font-semibold
                    text-[#B12025]
                    transition-colors
                    hover:bg-[#fff2f2]

                    sm:min-h-[60px]
                    sm:px-6
                    sm:text-[13px]
                  "
                >
                  <span>
                    Request a proposal
                  </span>

                  <ArrowUpRight
                    className="
                      h-[15px]
                      w-[15px]
                      transition-transform
                      duration-300
                      group-hover:-translate-y-0.5
                      group-hover:translate-x-0.5

                      sm:h-[19px]
                      sm:w-[19px]
                    "
                  />
                </Link>

                <Link
                  href="/#contact"
                  className="
                    group
                    flex
                    min-h-[44px]
                    items-center
                    justify-between
                    gap-5
                    rounded-full
                    border
                    border-white/35
                    px-4
                    text-[10px]
                    font-semibold
                    text-white
                    transition-colors
                    hover:bg-white/10

                    sm:min-h-[60px]
                    sm:px-6
                    sm:text-[13px]
                  "
                >
                  <span>
                    Talk to sales
                  </span>

                  <ArrowUpRight
                    className="
                      h-[15px]
                      w-[15px]
                      transition-transform
                      duration-300
                      group-hover:-translate-y-0.5
                      group-hover:translate-x-0.5

                      sm:h-[19px]
                      sm:w-[19px]
                    "
                  />
                </Link>
              </div>

              {/* OFFICE STATUS */}
              <div
                className="
                  mt-5
                  flex
                  items-center
                  gap-2.5

                  sm:mt-7
                  sm:gap-3
                "
              >
                <span
                  className={`
                    h-[7px]
                    w-[7px]
                    rounded-full

                    sm:h-[8px]
                    sm:w-[8px]

                    ${
                      officeOpen === null
                        ? 'bg-white/40'
                        : officeOpen
                        ? 'bg-[#8DFF9C]'
                        : 'bg-white/40'
                    }
                  `}
                />

                <p
                  className="
                    text-[8px]
                    font-medium
                    text-white/60

                    sm:text-[10px]
                  "
                >
                  {officeOpen === null
                    ? 'Checking Colombo office hours...'
                    : officeOpen
                    ? 'Colombo office is open now'
                    : 'Colombo office is currently closed'}
                </p>
              </div>
            </div>
          </div>

          {/* CTA FOOT */}
          <div
            data-hire-reveal
            className="
              mt-8
              flex
              flex-col
              gap-3
              border-t
              border-white/20
              pt-4

              sm:mt-14
              sm:flex-row
              sm:items-center
              sm:justify-between
              sm:gap-6
              sm:pt-6
            "
          >
            <p
              className="
                text-[8px]
                font-semibold
                uppercase
                tracking-[.16em]
                text-white/50

                sm:text-[10px]
                sm:tracking-[.2em]
              "
            >
              FIRSTNOTCH SOLUTIONS
            </p>

            <p
              className="
                max-w-[500px]
                text-[8px]
                leading-[1.6]
                text-white/50

                sm:text-right
                sm:text-[10px]
                sm:leading-6
              "
            >
              Customer support, back office and IT teams
              built around your business.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}