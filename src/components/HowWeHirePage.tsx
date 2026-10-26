
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
              '0 4px 12px rgba(85,0,0,.22)',
            stagger: 0.09,
            ease: 'none',

            scrollTrigger: {
              trigger: el,
              start: 'top 87%',
              end: 'bottom 43%',
              scrub: true,
            },
          }
        );

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      aria-label="Online tutoring platform testimonial"
      className="overflow-hidden bg-[#B12025] px-5 py-[100px] text-white sm:px-8 lg:px-14 lg:py-[150px]"
    >
      <div className="mx-auto max-w-[1440px]">
        <span
          aria-hidden="true"
          className="block text-[120px] font-semibold leading-[.8] text-white/25"
        >
          “
        </span>

        <blockquote>
          <p
            ref={quoteRef}
            role="text"
            aria-label={quote}
            className="mt-5 max-w-[1160px] text-[clamp(2rem,4.1vw,4.7rem)] font-semibold leading-[1.38] tracking-[-.055em]"
          >
            {quote.split(/\s+/).map((word, i) => (
              <span
                aria-hidden="true"
                data-hire-quote-word
                key={i}
                className="inline-block"
              >
                {word}
                {'\u00a0'}
              </span>
            ))}
          </p>

          <footer className="mt-11 border-t border-white/25 pt-6 text-[12px] font-semibold uppercase tracking-[.17em] text-white/80">
            Online tutoring platform
          </footer>
        </blockquote>
      </div>
    </section>
  );
}

// ======================================================
// MAIN HOW WE HIRE PAGE
// ======================================================

export default function HowWeHirePage() {
  const rootRef = useRef<HTMLDivElement>(null);

  const checksRef = useRef<HTMLElement>(null);

  const checksTrackRef =
    useRef<HTMLDivElement>(null);

  const checksProgressRef =
    useRef<HTMLDivElement>(null);

  const marqueeRef =
    useRef<HTMLDivElement>(null);

  const pageProgressRef =
    useRef<HTMLDivElement>(null);

  const [remaining, setRemaining] =
    useState(100);

  const [faqOpen, setFaqOpen] =
    useState<number | null>(0);

  const [officeOpen, setOfficeOpen] =
    useState<boolean | null>(null);

  // ====================================================
  // SRI LANKA OFFICE HOURS
  // ====================================================

  useEffect(() => {
    function refreshHours() {
      const parts =
        new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Colombo',
          weekday: 'short',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }).formatToParts(new Date());

      const part = (kind: string) =>
        parts.find(
          (x) => x.type === kind
        )?.value ?? '';

      const mins =
        Number(part('hour')) * 60 +
        Number(part('minute'));

      setOfficeOpen(
        !['Sat', 'Sun'].includes(
          part('weekday')
        ) &&
          mins >= 600 &&
          mins < 1140
      );
    }

    refreshHours();

    const timer = window.setInterval(
      refreshHours,
      60000
    );

    return () =>
      window.clearInterval(timer);
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
              const words =
                title.querySelectorAll(
                  '[data-hire-word]'
                );

              if (!words.length) return;

              const hero =
                title.tagName === 'H1';

              gsap.fromTo(
                words,
                {
                  yPercent: 115,
                  autoAlpha: 0,
                },
                {
                  yPercent: 0,
                  autoAlpha: 1,

                  duration: hero
                    ? 1.3
                    : 0.95,

                  stagger: hero
                    ? 0.065
                    : 0.045,

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
                  y: 28,
                  autoAlpha: 0,
                },
                {
                  y: 0,
                  autoAlpha: 1,
                  duration: 0.85,
                  ease: 'power3.out',

                  scrollTrigger: {
                    trigger: element,
                    start: 'top 91%',
                    once: true,
                  },
                }
              );
            });

          // ==========================================
          // TRAINING PROGRESS LINE
          // ==========================================

          root
            .querySelectorAll<SVGPathElement>(
              '[data-hire-path]'
            )
            .forEach((path) => {
              gsap.fromTo(
                path,
                {
                  strokeDashoffset: 1000,
                },
                {
                  strokeDashoffset: 0,
                  ease: 'none',

                  scrollTrigger: {
                    trigger:
                      path.closest('section'),

                    start: 'top 74%',
                    end: 'bottom 40%',
                    scrub: true,
                  },
                }
              );
            });

          // ==========================================
          // SCROLL-LINKED WORD OPACITY REVEAL
          // ==========================================

          const read =
            root.querySelector<HTMLElement>(
              '[data-hire-read]'
            );

          if (read) {
            gsap.fromTo(
              read.querySelectorAll(
                '[data-hire-read-word]'
              ),
              {
                opacity: 0.16,
              },
              {
                opacity: 1,
                stagger: 0.09,
                ease: 'none',

                scrollTrigger: {
                  trigger: read,
                  start: 'top 85%',
                  end: 'bottom 41%',
                  scrub: true,
                },
              }
            );
          }

          // ==========================================
          // PAGE SCROLL PROGRESS
          // ==========================================

          if (pageProgressRef.current) {
            gsap.fromTo(
              pageProgressRef.current,
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

          // ==========================================
          // STAFF BENEFITS MARQUEE
          // ==========================================

          if (marqueeRef.current) {
            gsap.to(marqueeRef.current, {
              xPercent: -50,
              duration: 30,
              repeat: -1,
              ease: 'none',
            });
          }
        }, root);

        return () => ctx.revert();
      }
    );

    // ==================================================
    // GSAP HORIZONTAL CARDS — DESKTOP ONLY
    // ==================================================

    mm.add(
      '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
      () => {
        const section =
          checksRef.current;

        const track =
          checksTrackRef.current;

        if (!section || !track) return;

        const distance = () =>
          Math.max(
            0,
            track.scrollWidth -
              section.clientWidth +
              32
          );

        if (distance() <= 1) return;

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',

          scrollTrigger: {
            id: 'how-we-hire-checks',

            trigger: section,

            start: 'top top+=120',

            end: () =>
              `+=${Math.max(1, distance())}`,

            pin: true,
            scrub: 0.9,
            anticipatePin: 1,
            invalidateOnRefresh: true,

            onUpdate: (self) => {
              if (
                checksProgressRef.current
              ) {
                checksProgressRef.current.style.transform =
                  `scaleX(${self.progress})`;
              }

              const counts = [
                100, 70, 45, 27, 17,
              ];

              setRemaining(
                counts[
                  Math.min(
                    4,
                    Math.floor(
                      self.progress * 4.001
                    )
                  )
                ]
              );
            },
          },
        });

        const animations:
          gsap.core.Tween[] = [];

        track
          .querySelectorAll<HTMLElement>(
            '[data-hire-card]'
          )
          .forEach((card, index) => {
            if (!index) return;

            const texts =
              card.querySelectorAll(
                '[data-hire-card-text]'
              );

            const anim = gsap.fromTo(
              texts,
              {
                autoAlpha: 0,
                y: 25,
              },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.75,
                stagger: 0.1,
                ease: 'power3.out',

                scrollTrigger: {
                  trigger: card,
                  containerAnimation: tween,
                  start: 'left 87%',
                  once: true,
                },
              }
            );

            animations.push(anim);
          });

        return () => {
          animations.forEach((a) => {
            a.scrollTrigger?.kill();
            a.kill();
          });

          tween.scrollTrigger?.kill();
          tween.kill();

          gsap.set(track, {
            clearProps: 'transform',
          });
        };
      }
    );

    let mounted = true;

    document.fonts?.ready.then(() => {
      if (mounted) {
        ScrollTrigger.refresh();
      }
    });

    return () => {
      mounted = false;
      mm.revert();
    };
  }, []);

  // ====================================================
  // SCROLL TO AN INDIVIDUAL CHECK
  // ====================================================

  function goToCheck(index: number) {
    const st = ScrollTrigger.getById(
      'how-we-hire-checks'
    );

    if (st) {
      const y =
        st.start +
        (st.end - st.start) *
          (index / 3);

      window.scrollTo({
        top: y,

        behavior: window.matchMedia(
          '(prefers-reduced-motion: reduce)'
        ).matches
          ? 'auto'
          : 'smooth',
      });
    } else {
      checksTrackRef.current
        ?.children[index]
        ?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
    }
  }

  // ====================================================
  // PAGE JSX
  // ====================================================

  return (
    <div
      ref={rootRef}
      className="overflow-x-clip bg-white font-sans text-[#17191C]"
    >
      {/* ==============================================
          PAGE SCROLL INDICATOR
      ============================================== */}

      <div
        ref={pageProgressRef}
        aria-hidden="true"
        className="pointer-events-none fixed right-0 top-0 z-[125] h-full w-[3px] origin-top scale-y-0 bg-[#B12025]"
      />

      {/* ==============================================
          STICKY SECTION NAVIGATION
      ============================================== */}

      <nav
        aria-label="How we hire sections"
        className="sticky top-[80px] z-30 overflow-x-auto border-b border-[#B12025]/15 bg-white/95 px-5 py-3 backdrop-blur-sm [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-8 lg:px-14"
      >
        <div className="mx-auto flex w-max max-w-[1450px] items-center gap-6 text-[11px] font-semibold lg:w-full lg:gap-8">
          <span className="shrink-0 text-[#B12025]">
            HOW WE HIRE
          </span>

          {(
            [
              ['Checks', '#checks'],
              ['Training', '#training'],
              ['Quality', '#quality'],
              [
                'Data protection',
                '#security',
              ],
              ['FAQs', '#hire-faq'],
            ] as const
          ).map(([name, href]) => (
            <a
              key={href}
              href={href}
              className="shrink-0 hover:text-[#B12025] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#B12025]"
            >
              {name}
            </a>
          ))}

          <a
            href="#contact"
            className="ml-auto shrink-0 rounded-full bg-[#B12025] px-4 py-2.5 text-white"
          >
            Book a call
          </a>
        </div>
      </nav>

      {/* ==============================================
          PREMIUM RED HERO
          NO FALLING DOT ANIMATION
          WHITE RISING TEXT
      ============================================== */}

      <section
        id="hire-hero"
        className="relative overflow-hidden bg-[#B12025] px-5 pb-[110px] pt-[150px] text-white sm:px-8 lg:px-14 lg:pb-[150px] lg:pt-[175px]"
      >
        {/* Subtle decorative circles */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-[220px] -top-[260px] h-[800px] w-[800px] rounded-full border border-white/10"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-[110px] -top-[150px] h-[560px] w-[560px] rounded-full border border-white/10"
        />

        <div className="relative mx-auto max-w-[1450px]">
          <p
            data-hire-reveal
            className={`${label} text-white/85`}
          >
            FirstNotch Solutions / Our people
          </p>

          {/* LARGE WHITE HEADING */}

          <h1
            data-hire-title
            className="mt-9 max-w-[1250px] font-semibold leading-[1.04] tracking-[-.075em] text-white"
          >
            <span className="block text-[clamp(4rem,8vw,9.5rem)]">
              <RisingWords
                text="How we hire"
              />
            </span>

            <span className="mt-6 block max-w-[1170px] text-[clamp(2.5rem,5.25vw,6.2rem)] leading-[1.1]">
              <RisingWords
                text="Only 15 to 20% of applicants pass our checks."
              />
            </span>
          </h1>

          {/* THIN DIVIDER */}

          <div
            data-hire-reveal
            className="mt-14 h-px w-full bg-white/30"
          />

          <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_.8fr] lg:gap-20">
            {/* HERO DESCRIPTION */}

            <div>
              <p
                data-hire-reveal
                className="max-w-[710px] text-[clamp(1rem,1.65vw,1.35rem)] leading-[1.8] text-white"
              >
                The people on your account will
                speak to your customers or work
                inside your systems. Each one
                is tested before being offered
                a job.
              </p>

              <p
                data-hire-reveal
                className="mt-5 max-w-[670px] text-[14px] leading-[1.9] text-white/85"
              >
                This page explains the checks,
                the training that follows and
                how work is monitored once
                someone starts.
              </p>

              {/* HERO BUTTONS */}

              <div
                data-hire-reveal
                className="mt-9 flex flex-wrap gap-3"
              >
                <a
                  href="#contact"
                  className="inline-flex min-h-[54px] items-center gap-3 rounded-full border border-white bg-white px-6 text-[12px] font-semibold text-[#B12025] transition hover:bg-[#fff2f2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  Book a free discovery call

                  <ArrowUpRight
                    size={17}
                  />
                </a>

                <a
                  href="#checks"
                  className="inline-flex min-h-[54px] items-center gap-3 rounded-full border border-white/50 px-6 text-[12px] font-semibold text-white transition hover:bg-white/10"
                >
                  Explore the four checks

                  <ArrowDownRight
                    size={17}
                  />
                </a>
              </div>
            </div>

            {/* TEXT-ONLY HIRING CHECKS */}

            <div
              data-hire-reveal
              className="grid grid-cols-2 content-start gap-x-7 gap-y-7"
            >
              {checks.map((check, index) => (
                <div
                  key={check.title}
                  className="border-b border-white/35 pb-5"
                >
                  <span className="font-mono text-[12px] text-white/70">
                    0{index + 1}
                  </span>

                  <p className="mt-3 text-[clamp(.98rem,1.35vw,1.22rem)] font-medium leading-6 text-white">
                    {check.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==============================================
          FOUR HIRING CHECKS
          GSAP HORIZONTAL CARD SCROLL
      ============================================== */}

      <section
        ref={checksRef}
        id="checks"
        className="relative scroll-mt-[120px] bg-[#fff9f9] py-[95px] lg:flex lg:min-h-[760px] lg:flex-col lg:justify-center"
      >
        <div className="mx-auto w-full max-w-[1450px] px-5 sm:px-8 lg:px-14">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p
                data-hire-reveal
                className={`${label} text-[#B12025]`}
              >
                01 / Our selection process
              </p>

              <h2
                data-hire-title
                className={`mt-5 max-w-[920px] ${heading}`}
              >
                <RisingWords
                  text="The four checks before anyone is hired"
                />
              </h2>
            </div>

            <p className="rounded-full border border-[#B12025]/20 bg-white px-5 py-3 text-[12px] font-semibold text-[#B12025]">
              Applicants remaining

              <span className="ml-2 text-[22px] tabular-nums">
                {remaining}
              </span>

              <span className="text-[10px]">
                {' '}example
              </span>
            </p>
          </div>

          <p
            data-hire-reveal
            className="mt-5 max-w-[690px] text-[13px] leading-7 text-[#17191C]/65"
          >
            The order and timing of these
            steps still need to be confirmed.
            The illustrated stage-by-stage
            applicant counts are not measured
            pass rates.
          </p>
        </div>

        {/* SIDE SCROLL TRACK */}

        <div className="mt-10 w-full overflow-x-auto overscroll-x-contain snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:overflow-visible lg:snap-none">
          <div
            ref={checksTrackRef}
            className="flex w-max gap-5 pl-5 pr-5 sm:pl-8 lg:pl-14 lg:pr-14"
          >
            {checks.map(
              (
                {
                  title,
                  description,
                  Icon,
                  note,
                },
                index
              ) => {
                const red =
                  index === 0 ||
                  index === 2;

                return (
                  <article
                    key={title}
                    data-hire-card
                    className={`relative flex min-h-[440px] w-[min(88vw,555px)] shrink-0 snap-center flex-col overflow-hidden rounded-[30px] border p-8 sm:p-10 lg:w-[615px] ${
                      red
                        ? 'border-[#B12025] bg-[#B12025] text-white'
                        : 'border-[#B12025]/20 bg-white text-[#17191C]'
                    }`}
                  >
                    {/* OUTLINED CARD NUMBER */}

                    <div
                      aria-hidden="true"
                      className={`pointer-events-none absolute -right-3 top-6 text-[175px] font-semibold leading-none tracking-[-.13em] ${
                        red
                          ? 'text-white/[.08]'
                          : 'text-[#B12025]/[.05]'
                      }`}
                    >
                      0{index + 1}
                    </div>

                    <div className="relative flex items-start justify-between">
                      <span
                        className={`flex h-16 w-16 items-center justify-center rounded-[19px] ${
                          red
                            ? 'bg-white/15 text-white'
                            : 'bg-[#fff2f2] text-[#B12025]'
                        }`}
                      >
                        <Icon
                          size={30}
                          strokeWidth={1.5}
                        />
                      </span>

                      <span
                        className={`font-mono text-[12px] ${
                          red
                            ? 'text-white/75'
                            : 'text-[#B12025]'
                        }`}
                      >
                        0{index + 1} / 04
                      </span>
                    </div>

                    <div className="relative mt-auto pt-14">
                      <h3
                        data-hire-card-text
                        className="text-[clamp(2rem,3vw,3.25rem)] font-semibold leading-[1.13] tracking-[-.05em]"
                      >
                        {title}
                      </h3>

                      <p
                        data-hire-card-text
                        className={`mt-5 max-w-[470px] text-[14px] leading-[1.85] ${
                          red
                            ? 'text-white/85'
                            : 'text-[#17191C]/70'
                        }`}
                      >
                        {description}
                      </p>

                      <p
                        className={`mt-7 border-t pt-5 text-[11px] font-semibold uppercase tracking-[.12em] ${
                          red
                            ? 'border-white/30 text-white/75'
                            : 'border-[#B12025]/20 text-[#B12025]'
                        }`}
                      >
                        {note}
                      </p>
                    </div>
                  </article>
                );
              }
            )}
          </div>
        </div>

        {/* HORIZONTAL SCROLL PROGRESS */}

        <div className="mx-auto mt-8 flex w-full max-w-[1450px] items-center gap-4 px-5 sm:px-8 lg:px-14">
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-[#B12025]/15">
            <div
              ref={checksProgressRef}
              className="h-full origin-left scale-x-0 bg-[#B12025]"
            />
          </div>

          <div className="hidden gap-2 lg:flex">
            {checks.map((item, i) => (
              <button
                key={item.title}
                type="button"
                onClick={() =>
                  goToCheck(i)
                }
                aria-label={`Show ${item.title}`}
                className="rounded-full border border-[#B12025]/20 bg-white px-3 py-2 text-[11px] font-semibold text-[#B12025] hover:bg-[#B12025] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#B12025]"
              >
                0{i + 1}
              </button>
            ))}
          </div>

          <p className="text-[11px] text-[#B12025] lg:hidden">
            Swipe to explore →
          </p>
        </div>
      </section>

      {/* ==============================================
          TRAINING BEFORE LIVE WORK
      ============================================== */}

      <section
        id="training"
        className="scroll-mt-[110px] bg-white px-5 py-[100px] sm:px-8 lg:px-14 lg:py-[140px]"
      >
        <div className="mx-auto max-w-[1450px]">
          <p
            data-hire-reveal
            className={`${label} text-[#B12025]`}
          >
            02 / Before live work
          </p>

          <div className="mt-5 grid items-end gap-9 lg:grid-cols-[1.08fr_.92fr]">
            <h2
              data-hire-title
              className={heading}
            >
              <RisingWords
                text="Training before work on your account starts"
              />
            </h2>

            <p
              data-hire-reveal
              className="max-w-[520px] text-[14px] leading-[1.9] text-[#17191C]/70"
            >
              New hires train for{' '}

              <strong className="text-[#B12025]">
                {TRAINING_WEEKS === null
                  ? 'a duration to be confirmed'
                  : `${TRAINING_WEEKS} weeks`}
              </strong>{' '}

              before they handle live work.
              This covers FirstNotch policies
              and data handling, then your
              products, tools and scripts.
            </p>
          </div>

          {/* TRAINING PROGRESS LINE */}

          <div className="relative mt-14 grid gap-4 md:grid-cols-4">
            <svg
              aria-hidden="true"
              viewBox="0 0 1000 5"
              preserveAspectRatio="none"
              className="pointer-events-none absolute left-0 top-[48px] hidden h-[5px] w-full md:block"
            >
              <path
                d="M 0 2.5 H 1000"
                stroke="#B12025"
                strokeOpacity=".14"
                strokeWidth="2"
              />

              <path
                data-hire-path
                d="M 0 2.5 H 1000"
                stroke="#B12025"
                strokeWidth="3"
                strokeDasharray="1000"
                strokeDashoffset="1000"
              />
            </svg>

            {training.map((item, index) => (
              <article
                key={item.title}
                data-hire-reveal
                className="relative rounded-[26px] border border-[#B12025]/15 bg-[#fff9f9] p-7 sm:p-8"
              >
                <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#B12025] text-[12px] font-semibold text-white">
                  {index === 3 ? (
                    <Check size={20} />
                  ) : (
                    `0${index + 1}`
                  )}
                </span>

                <h3 className="mt-8 text-[20px] font-semibold tracking-[-.03em]">
                  {item.title}
                </h3>

                <p className="mt-4 text-[12px] leading-7 text-[#17191C]/70">
                  {item.body}
                </p>
              </article>
            ))}
          </div>

          <p className="mt-9 text-[13px] leading-7 text-[#17191C]/70">
            Training ends with a test on
            your processes.{' '}

            <strong className="text-[#B12025]">
              Only staff who pass are moved
              onto your account.
            </strong>
          </p>
        </div>
      </section>

      {/* ==============================================
          QUALITY MONITORING
          RED BACKGROUND / WHITE TEXT
      ============================================== */}

      <section
        id="quality"
        className="scroll-mt-[110px] bg-[#B12025] px-5 py-[105px] text-white sm:px-8 lg:px-14 lg:py-[145px]"
      >
        <div className="mx-auto max-w-[1450px]">
          <p
            data-hire-reveal
            className={`${label} text-white/75`}
          >
            03 / Ongoing performance
          </p>

          <h2
            data-hire-title
            className={`mt-5 max-w-[1050px] ${heading}`}
          >
            <RisingWords
              text="How work is checked once someone starts"
            />
          </h2>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-12">
            {monitoring.map((item, index) => (
              <article
                key={item.title}
                data-hire-reveal
                className={`group flex min-h-[290px] flex-col rounded-[28px] border border-white/20 bg-white/[.08] p-8 transition hover:bg-white/[.13] ${
                  index < 2
                    ? 'lg:col-span-7'
                    : 'lg:col-span-5'
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-white text-[#B12025]">
                    <item.Icon
                      size={26}
                      strokeWidth={1.6}
                    />
                  </span>

                  <span className="font-mono text-[12px] text-white/65">
                    0{index + 1}
                  </span>
                </div>

                <div className="mt-auto pt-10">
                  <p className="text-[10px] font-semibold uppercase tracking-[.15em] text-white/75">
                    {item.foot}
                  </p>

                  <h3 className="mt-3 text-[27px] font-semibold tracking-[-.045em]">
                    {item.title}
                  </h3>

                  <p className="mt-4 max-w-[520px] text-[13px] leading-[1.85] text-white/85">
                    {item.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ==============================================
          DATA PROTECTION
      ============================================== */}

      <section
        id="security"
        className="scroll-mt-[110px] bg-white px-5 py-[110px] sm:px-8 lg:px-14 lg:py-[145px]"
      >
        <div className="mx-auto grid max-w-[1450px] gap-12 lg:grid-cols-[.82fr_1.18fr] lg:gap-20">
          <div className="lg:sticky lg:top-[145px] lg:self-start">
            <p
              data-hire-reveal
              className={`${label} text-[#B12025]`}
            >
              04 / Data protection
            </p>

            <h2
              data-hire-title
              className={`mt-5 ${heading}`}
            >
              <RisingWords
                text="How your data is protected"
              />
            </h2>

            <p
              data-hire-reveal
              className="mt-6 max-w-[480px] text-[14px] leading-8 text-[#17191C]/70"
            >
              Staff receive only the access
              they need to do their assigned
              work, with mandatory data-handling
              training and confidentiality
              agreements.
            </p>
          </div>

          {/* STICKY SECURITY CARDS */}

          <div className="space-y-5">
            {security.map((item, index) => (
              <article
                key={item.title}
                className={`relative rounded-[29px] border border-[#B12025]/15 bg-[#fff9f9] p-8 sm:p-11 lg:sticky ${
                  index === 0
                    ? 'lg:top-[105px]'
                    : index === 1
                      ? 'lg:top-[125px]'
                      : 'lg:top-[145px]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#B12025] text-white">
                    <item.Icon
                      size={27}
                      strokeWidth={1.6}
                    />
                  </span>

                  <span className="font-mono text-[12px] text-[#B12025]">
                    0{index + 1} / 03
                  </span>
                </div>

                <h3 className="mt-10 text-[clamp(1.9rem,3.2vw,3.4rem)] font-semibold tracking-[-.06em]">
                  {item.title}
                </h3>

                <p className="mt-5 max-w-[580px] text-[14px] leading-[1.85] text-[#17191C]/65">
                  {item.body}
                </p>

                <span className="mt-8 inline-block rounded-full border border-[#B12025]/20 bg-white px-4 py-2 text-[11px] font-semibold text-[#B12025]">
                  {item.badge}
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ==============================================
          KEEPING TRAINED STAFF
      ============================================== */}

      <section
        id="retention"
        className="overflow-hidden bg-[#fff9f9] py-[110px] lg:py-[145px]"
      >
        <div className="mx-auto max-w-[1450px] px-5 sm:px-8 lg:px-14">
          <p
            data-hire-reveal
            className={`${label} text-[#B12025]`}
          >
            05 / Continuity
          </p>

          {/* SCROLL-LINKED TEXT OPACITY REVEAL */}

          <h2
            className={`mt-6 max-w-[1150px] ${heading}`}
          >
            <span
              data-hire-read
              role="text"
              aria-label="Keeping trained people on your account"
            >
              <span aria-hidden="true">
                {'Keeping trained people on your account'
                  .split(/\s+/)
                  .map((word, i) => (
                    <span
                      key={i}
                      data-hire-read-word
                      className="inline-block"
                    >
                      {word}
                      {'\u00a0'}
                    </span>
                  ))}
              </span>
            </span>
          </h2>

          <p
            data-hire-reveal
            className="mt-8 max-w-[780px] text-[14px] leading-8 text-[#17191C]/70"
          >
            Competitive pay, monthly incentives
            and EPF contributions after probation
            help trained staff stay with FirstNotch.
            As a result, the people who know
            your processes remain on your account.
          </p>
        </div>

        {/* ANIMATED MARQUEE */}

        <div className="mt-16 overflow-hidden border-y border-[#B12025]/10 bg-white py-8">
          <div
            ref={marqueeRef}
            className="flex w-max gap-9 whitespace-nowrap text-[clamp(1.4rem,3vw,3rem)] font-semibold tracking-[-.05em] text-[#17191C]"
          >
            {[0, 1].map((i) => (
              <div
                key={i}
                className="flex shrink-0 items-center gap-9 pr-9"
              >
                <span>
                  Competitive pay
                </span>

                <span className="text-[#B12025]">
                  ✳
                </span>

                <span>
                  Monthly incentives
                </span>

                <span className="text-[#B12025]">
                  ✳
                </span>

                <span>
                  EPF after probation
                </span>

                <span className="text-[#B12025]">
                  ✳
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-9 max-w-[1450px] px-5 sm:px-8 lg:px-14">
          <Link
            href="/#careers"
            className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#B12025] underline-offset-4 hover:underline"
          >
            See jobs at FirstNotch

            <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>

      {/* ==============================================
          TESTIMONIAL
          RED BACKGROUND + SCROLL TEXT REVEAL
      ============================================== */}

      <HiringTestimonial />

      {/* ==============================================
          FAQ
      ============================================== */}

      <section
        id="hire-faq"
        className="scroll-mt-[110px] bg-white px-5 py-[110px] sm:px-8 lg:px-14 lg:py-[145px]"
      >
        <div className="mx-auto grid max-w-[1450px] gap-12 lg:grid-cols-[.83fr_1.17fr] lg:gap-20">
          <div>
            <p
              data-hire-reveal
              className={`${label} text-[#B12025]`}
            >
              06 / Questions
            </p>

            <h2
              data-hire-title
              className={`mt-5 ${heading}`}
            >
              <RisingWords
                text="Questions about the hiring process"
              />
            </h2>

            <a
              href="#contact"
              className="mt-8 inline-flex items-center gap-2 text-[13px] font-semibold text-[#B12025] hover:underline"
            >
              Can we interview your team?
              Book a call

              <ArrowUpRight size={17} />
            </a>
          </div>

          {/* FAQ ACCORDION */}

          <div className="space-y-3">
            {faqs.map((item, index) => (
              <div
                key={item.question}
                className="overflow-hidden rounded-[20px] border border-[#B12025]/15 bg-[#fff9f9]"
              >
                <h3>
                  <button
                    type="button"
                    aria-expanded={
                      faqOpen === index
                    }
                    aria-controls={`hire-answer-${index}`}
                    onClick={() =>
                      setFaqOpen((x) =>
                        x === index
                          ? null
                          : index
                      )
                    }
                    className="flex w-full items-center justify-between gap-5 p-6 text-left text-[15px] font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#B12025]"
                  >
                    <span>
                      {item.question}
                    </span>

                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#fff0f0] text-[#B12025]">
                      <ChevronDown
                        size={18}
                        className={`transition-transform ${
                          faqOpen === index
                            ? 'rotate-180'
                            : ''
                        }`}
                      />
                    </span>
                  </button>
                </h3>

                <div
                  id={`hire-answer-${index}`}
                  className={`grid transition-[grid-template-rows] duration-300 ${
                    faqOpen === index
                      ? 'grid-rows-[1fr]'
                      : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <p className="border-t border-[#B12025]/10 px-6 pb-7 pt-5 text-[13px] leading-8 text-[#17191C]/70">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==============================================
          OFFICE HOURS INDICATOR
      ============================================== */}

      <section className="border-t border-[#B12025]/10 bg-[#fff9f9] px-5 py-8 sm:px-8 lg:px-14">
        <div className="mx-auto flex max-w-[1450px] flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[13px] font-semibold">
              FirstNotch Colombo office
            </p>

            <p className="mt-2 text-[11px] text-[#17191C]/65">
              Monday to Friday · 10am–7pm
              Sri Lanka time
            </p>
          </div>

          <span
            role="status"
            className="inline-flex items-center gap-2 rounded-full border border-[#B12025]/15 bg-white px-4 py-2.5 text-[11px] font-semibold"
          >
            <span
              className={`h-2 w-2 rounded-full ${
                officeOpen
                  ? 'bg-[#B12025]'
                  : 'bg-[#17191C]/30'
              }`}
            />

            {officeOpen === null
              ? 'Checking office hours'
              : officeOpen
                ? 'Within office hours'
                : 'Outside office hours'}
          </span>
        </div>
      </section>

      {/* StoryContact renders the contact form and footer */}
    </div>
  );
}
