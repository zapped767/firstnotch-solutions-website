
'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  CalendarDays,
  Check,
  CheckCheck,
  ChevronDown,
  ClipboardCheck,
  ClipboardList,
  Database,
  FileCheck2,
  FileText,
  ScanSearch,
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ======================================================
// FIRSTNOTCH — BPO & BACK OFFICE
// Brand Red: #B12025
// White: #FFFFFF
// Warm Cream: #FFF9F6
// ======================================================

const RED = '#B12025';

const BASE = '/services/bpo-back-office-outsourcing';

const QUOTE_PARTS = [
  'Shipping documents used to sit in shared folders for days.',
  'Now each one is entered and checked within a day,',
  'and our team can find any file in seconds.',
];

// ======================================================
// SEVEN SERVICES
// ======================================================

const services = [
  {
    title: 'Data entry and processing',
    detail:
      'Records entered into your systems, then checked by hand before delivery.',
    slug: 'data-entry-processing',
    icon: Database,
  },
  {
    title: 'Document processing',
    detail:
      'Contracts, forms and invoices digitised and filed so you can find them.',
    slug: 'document-processing',
    icon: FileText,
  },
  {
    title: 'Data verification and validation',
    detail:
      'Records checked for errors and duplicates before you rely on them.',
    slug: 'data-verification-validation',
    icon: ScanSearch,
  },
  {
    title: 'Compliance, KYC and AML support',
    detail:
      'Identity and background checks on new customers, with records ready for an audit.',
    slug: 'compliance-kyc-aml-support',
    icon: ShieldCheck,
  },
  {
    title: 'Lead generation',
    detail:
      'Lists of verified contacts that match the customers you want to reach.',
    slug: 'lead-generation',
    icon: Target,
  },
  {
    title: 'Back office operations',
    detail:
      'Daily admin handled to agreed turnaround times as your workload grows.',
    slug: 'back-office-operations',
    icon: ClipboardList,
  },
  {
    title: 'Virtual assistant services',
    detail:
      'An assistant who keeps calendars and inboxes in order for your managers.',
    slug: 'virtual-assistant-services',
    icon: CalendarDays,
  },
];

// ======================================================
// FAQ DATA
// ======================================================

const faqs = [
  {
    q: 'How accurate is the work?',
    a: 'Client work is delivered at a 98% accuracy rate. Errors are checked by type and used in coaching. Any error found after delivery is corrected free of charge.',
    highlight:
      'Any error found after delivery is corrected free of charge.',
  },
  {
    q: 'How fast is work returned?',
    a: 'Turnaround times are agreed with you for each type of task. Most daily work is returned within one working day.',
    highlight:
      'Most daily work is returned within one working day.',
  },
  {
    q: 'Which systems can the team work in?',
    a: 'The team works in your own systems, such as your CRM, accounting software or document storage. Common tools include Microsoft 365, Google Workspace, Salesforce and Zoho.',
    highlight:
      'Microsoft 365, Google Workspace, Salesforce and Zoho.',
  },
  {
    q: 'Can we start with a small trial?',
    a: 'Yes. Many clients start with three processors for a few weeks. More work is added once you have checked the results.',
    highlight:
      'Many clients start with three processors for a few weeks.',
  },
  {
    q: 'Who decides how unusual cases are handled?',
    a: 'You do. Rules for exceptions are agreed with you before work starts. Anything they do not cover goes to your team for a decision.',
    highlight:
      'Rules for exceptions are agreed with you before work starts.',
  },
  {
    q: 'Who can see our data?',
    a: 'Each team member can only open the systems and files needed for your work. Work is done on office computers with encrypted connections and two-factor login. USB drives and personal emails are blocked.',
    highlight:
      'Work is done on office computers with encrypted connections and two-factor login.',
  },
  {
    q: 'Can the team grow with our workload?',
    a: 'Yes. The team size can change with 30 days notice, and extra staff can be trained ahead of known busy periods.',
    highlight:
      'The team size can change with 30 days notice.',
  },
  {
    q: 'What does it cost?',
    a: 'Price depends on the volume of work and how complex each task is. Work can be priced per task, or per team member each month. A written quotation is provided after the discovery call.',
    highlight:
      'Work can be priced per task, or per team member each month.',
  },
];

// ======================================================
// FOUR-STEP SETUP PROCESS
// ======================================================

const setup = [
  {
    n: '01',
    title: 'Learning your business',
    icon: ClipboardCheck,
    text:
      'The team maps each process with you, step by step, and writes it down as a checklist you approve.',
  },
  {
    n: '02',
    title: 'Hiring and training',
    icon: Users,
    text:
      'Team members take language tests, technical assessments and reference checks. Only 15 to 20% of job applicants pass. Each one then practises on sample work before handling yours.',
  },
  {
    n: '03',
    title: 'Going live with quality checks',
    icon: BadgeCheck,
    text:
      'Every task gets a quality score. Work starts at a lower volume with extra checks, and volume grows once accuracy is steady. Each team member has a monthly performance review with coaching.',
  },
  {
    n: '04',
    title: 'Reporting and improving',
    icon: TrendingUp,
    text:
      'You get a monthly report on volume, turnaround times, accuracy and the most common errors, plus a call to agree what to improve.',
  },
];

// ======================================================
// GSAP FAQ ACCORDION
// ======================================================

function FaqRow({
  item,
  index,
}: {
  item: (typeof faqs)[number];
  index: number;
}) {
  const [open, setOpen] = useState(index === 0);

  const answer = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  useEffect(() => {
    const node = answer.current;
    if (!node) return;

    if (first.current) {
      first.current = false;

      gsap.set(node, {
        height: open ? 'auto' : 0,
      });

      return;
    }

    const tween = gsap.to(node, {
      height: open ? 'auto' : 0,

      duration: window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches
        ? 0
        : 0.43,

      ease: 'power3.inOut',
      overwrite: 'auto',
    });

    return () => {
      tween.kill();
    };
  }, [open]);

  const splitAt = item.a.indexOf(item.highlight);

  return (
    <div className="border-b border-[#B12025]/15 py-5">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`bpo-faq-answer-${index}`}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-start justify-between gap-4 text-left text-[16px] font-semibold tracking-[-.03em] text-[#17191C] focus-visible:rounded-md focus-visible:outline-2 focus-visible:outline-[#B12025] sm:text-[18px]"
        >
          {item.q}

          <ChevronDown
            size={19}
            aria-hidden="true"
            className={`mt-1 shrink-0 text-[#B12025] transition-transform duration-300 ${
              open ? 'rotate-180' : ''
            }`}
          />
        </button>
      </h3>

      <div
        id={`bpo-faq-answer-${index}`}
        ref={answer}
        className="overflow-hidden"
        aria-hidden={!open}
      >
        <p className="max-w-[680px] pb-1 pt-4 text-[13px] leading-[1.9] text-[#17191C]/70 sm:text-[14px]">
          {splitAt >= 0 ? (
            <>
              {item.a.slice(0, splitAt)}

              <span className="rounded-sm bg-[#FFE9E9] px-0.5 text-[#8D1A20]">
                {item.highlight}
              </span>

              {item.a.slice(
                splitAt + item.highlight.length
              )}
            </>
          ) : (
            item.a
          )}
        </p>
      </div>
    </div>
  );
}

// ======================================================
// MAIN PAGE
// ======================================================

export default function BpoBackOfficePage() {
  const pageRef = useRef<HTMLDivElement>(null);

  const heroRef = useRef<HTMLElement>(null);
  const docsRef = useRef<HTMLDivElement>(null);

  const quoteRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLElement>(null);

  const ringRef = useRef<SVGCircleElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  // ====================================================
  // GSAP ANIMATIONS
  // ====================================================

  useEffect(() => {
    const root = pageRef.current;
    const hero = heroRef.current;

    if (!root || !hero) return;

    const mm = gsap.matchMedia();

    mm.add(
      '(prefers-reduced-motion: no-preference)',
      () => {
        const ctx = gsap.context(() => {
          // ==========================================
          // PAGE READING PROGRESS
          // ==========================================

          gsap.to('[data-bpo-reading-progress]', {
            scaleX: 1,
            ease: 'none',

            scrollTrigger: {
              trigger: root,
              start: 'top top',
              end: 'bottom bottom',
              scrub: true,
            },
          });

          // ==========================================
          // SOFT BACKGROUND COLOUR MORPH
          // ==========================================

          gsap.fromTo(
            hero,
            {
              backgroundColor: '#FFF9F6',
            },
            {
              backgroundColor: '#FFFFFF',
              ease: 'none',

              scrollTrigger: {
                trigger: hero,
                start: 'top top',
                end: 'bottom top',
                scrub: true,
              },
            }
          );

          // ==========================================
          // MASKED HEADING RISE
          // ==========================================

          gsap.fromTo(
            '[data-bpo-line]',
            {
              yPercent: 110,
              autoAlpha: 0,
            },
            {
              yPercent: 0,
              autoAlpha: 1,

              duration: 1.1,
              stagger: 0.11,

              ease: 'power4.out',
            }
          );

          // HERO SUPPORTING TEXT

          gsap.fromTo(
            '[data-bpo-intro]',
            {
              y: 26,
              autoAlpha: 0,
            },
            {
              y: 0,
              autoAlpha: 1,

              duration: 0.8,
              stagger: 0.1,
              delay: 0.45,

              ease: 'power3.out',
            }
          );

          // 98% HIGHLIGHT

          gsap.fromTo(
            '[data-bpo-98-wipe]',
            {
              scaleX: 0,
            },
            {
              scaleX: 1,
              transformOrigin: 'left center',

              duration: 1,
              delay: 0.62,

              ease: 'power3.out',
            }
          );

          // ==========================================
          // DOCUMENTS: MESSY -> NEAT ROWS
          // ==========================================

          const cards =
            gsap.utils.toArray<HTMLElement>(
              '[data-bpo-doc]'
            );

          const scatter = [
            [-80, -90, -19],
            [110, -80, 17],
            [-105, 60, -12],
            [65, 95, 15],
          ];

          gsap.fromTo(
            cards,
            {
              x: (i) =>
                scatter[i % scatter.length][0],

              y: (i) =>
                scatter[i % scatter.length][1],

              rotation: (i) =>
                scatter[i % scatter.length][2],
            },
            {
              x: 0,
              y: 0,
              rotation: 0,

              stagger: 0.08,
              ease: 'none',

              scrollTrigger: {
                trigger: hero,
                start: 'top top',
                end: 'bottom top',
                scrub: 0.8,
              },
            }
          );

          // ==========================================
          // SCAN LINE
          // ==========================================

          gsap.fromTo(
            '[data-bpo-scan]',
            {
              y: -5,
              opacity: 0,
            },
            {
              y: () =>
                (docsRef.current?.clientHeight || 400) -
                40,

              opacity: 1,
              ease: 'none',

              scrollTrigger: {
                trigger: hero,
                start: 'top top',
                end: 'bottom top',
                scrub: 0.7,
              },
            }
          );

          // DOCUMENT CHECKMARKS

          gsap.fromTo(
            '[data-bpo-doc-check]',
            {
              scale: 0,
              autoAlpha: 0,
            },
            {
              scale: 1,
              autoAlpha: 1,

              stagger: 0.1,
              ease: 'back.out(1.6)',

              scrollTrigger: {
                trigger: hero,
                start: 'top 2%',
                end: 'bottom 25%',
                scrub: 0.8,
              },
            }
          );

          // ==========================================
          // SECTION CONTENT REVEALS
          // ==========================================

          gsap.utils
            .toArray<HTMLElement>(
              '[data-bpo-reveal]'
            )
            .forEach((el) => {
              gsap.fromTo(
                el,
                {
                  y: 32,
                  autoAlpha: 0,
                },
                {
                  y: 0,
                  autoAlpha: 1,

                  duration: 0.9,
                  ease: 'power3.out',

                  scrollTrigger: {
                    trigger: el,
                    start: 'top 89%',
                    once: true,
                  },
                }
              );
            });

          // ==========================================
          // STAGGERED SERVICE CARDS
          // ==========================================

          ScrollTrigger.batch(
            '[data-bpo-card]',
            {
              start: 'top 91%',
              once: true,
              interval: 0.12,
              batchMax: 4,

              onEnter: (elements) =>
                gsap.fromTo(
                  elements,
                  {
                    autoAlpha: 0,
                    y: 45,
                    scale: 0.97,
                  },
                  {
                    autoAlpha: 1,
                    y: 0,
                    scale: 1,

                    stagger: 0.1,
                    duration: 0.8,

                    ease: 'power3.out',
                  }
                ),
            }
          );

          // ==========================================
          // STATISTICS COUNT UP
          // ==========================================

          gsap.utils
            .toArray<HTMLElement>(
              '[data-bpo-count]'
            )
            .forEach((el) => {
              const end = Number(
                el.dataset.bpoCount || 0
              );

              const number = {
                value: 0,
              };

              gsap.to(number, {
                value: end,

                duration: 1.7,
                ease: 'power2.out',

                scrollTrigger: {
                  trigger: el,
                  start: 'top 90%',
                  once: true,
                },

                onUpdate: () => {
                  el.textContent = String(
                    Math.round(number.value)
                  );
                },
              });
            });

          // ==========================================
          // 98% SVG PROGRESS RING
          // ==========================================

          if (ringRef.current) {
            const length =
              2 * Math.PI * 45;

            gsap.fromTo(
              ringRef.current,
              {
                strokeDashoffset: length,
              },
              {
                strokeDashoffset:
                  length * 0.02,

                duration: 1.8,
                ease: 'power2.out',

                scrollTrigger: {
                  trigger: ringRef.current,
                  start: 'top 85%',
                  once: true,
                },
              }
            );
          }

          // ==========================================
          // PARALLAX BACKGROUND SHAPES
          // ==========================================

          gsap.utils
            .toArray<HTMLElement>(
              '[data-bpo-bg]'
            )
            .forEach((el, i) => {
              gsap.fromTo(
                el,
                {
                  y: i % 2 ? -30 : 30,
                },
                {
                  y: i % 2 ? 45 : -45,
                  ease: 'none',

                  scrollTrigger: {
                    trigger: hero,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                  },
                }
              );
            });

          // ==========================================
          // TESTIMONIAL HIGHLIGHT SWEEP
          // ==========================================

          gsap.fromTo(
            '[data-bpo-quote-highlight]',
            {
              backgroundSize: '0% 100%',
            },
            {
              backgroundSize: '100% 100%',
              ease: 'none',
              stagger: 0.22,

              scrollTrigger: {
                trigger: quoteRef.current,
                start: 'top 75%',
                end: 'bottom 45%',
                scrub: true,
              },
            }
          );

          // QUOTE WORD REVEAL

          gsap.fromTo(
            '[data-bpo-quote-word]',
            {
              opacity: 0.3,
            },
            {
              opacity: 1,
              stagger: 0.08,
              ease: 'none',

              scrollTrigger: {
                trigger: quoteRef.current,
                start: 'top 80%',
                end: 'bottom 40%',
                scrub: true,
              },
            }
          );

          // QUOTE PROGRESS

          gsap.fromTo(
            '[data-bpo-quote-wipe]',
            {
              scaleX: 0,
            },
            {
              scaleX: 1,
              ease: 'none',

              scrollTrigger: {
                trigger: quoteRef.current,
                start: 'top 75%',
                end: 'bottom 45%',
                scrub: true,
              },
            }
          );

          // ==========================================
          // PROCESS ICONS
          // ==========================================

          gsap.fromTo(
            '[data-bpo-step] svg',
            {
              scale: 0.65,
              rotation: -14,
              opacity: 0.25,
            },
            {
              scale: 1,
              rotation: 0,
              opacity: 1,

              duration: 0.7,
              stagger: 0.13,

              ease: 'back.out(1.5)',

              scrollTrigger: {
                trigger: stepsRef.current,
                start: 'top 75%',
                once: true,
              },
            }
          );

          // BEFORE / AFTER LABELS

          gsap.fromTo(
            '[data-bpo-quote-timing]',
            {
              y: 22,
              autoAlpha: 0,
            },
            {
              y: 0,
              autoAlpha: 1,

              stagger: 0.22,
              duration: 0.75,

              scrollTrigger: {
                trigger: quoteRef.current,
                start: 'top 75%',
                once: true,
              },
            }
          );

          // ==========================================
          // EXISTING CONTACT FORM REVEAL
          // ==========================================

          const sharedForm =
            document.querySelector<HTMLElement>(
              '#contact form'
            );

          if (sharedForm) {
            gsap.fromTo(
              sharedForm,
              {
                y: 48,
                autoAlpha: 0,
              },
              {
                y: 0,
                autoAlpha: 1,

                duration: 1,
                ease: 'power3.out',

                scrollTrigger: {
                  trigger: sharedForm,
                  start: 'top 90%',
                  once: true,
                },
              }
            );
          }

          // FOOTER PARALLAX REVEAL

          const footer =
            document.querySelector<HTMLElement>(
              'footer'
            );

          if (footer) {
            gsap.fromTo(
              footer,
              {
                y: 40,
                opacity: 0.93,
              },
              {
                y: 0,
                opacity: 1,
                ease: 'none',

                scrollTrigger: {
                  trigger: footer,
                  start: 'top bottom',
                  end: 'top 75%',
                  scrub: true,
                },
              }
            );
          }
        }, root);

        return () => ctx.revert();
      }
    );

    // ==================================================
    // DESKTOP-ONLY PINNED EFFECTS
    // ==================================================

    mm.add(
      '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
      () => {
        const ctx = gsap.context(() => {
          // ==========================================
          // COLUMN SPEED PARALLAX
          // ==========================================

          gsap.utils
            .toArray<HTMLElement>(
              '[data-bpo-column]'
            )
            .forEach((el, i) => {
              gsap.fromTo(
                el,
                {
                  y: 0,
                },
                {
                  y: (i % 3 - 1) * 20,
                  ease: 'none',

                  scrollTrigger: {
                    trigger: '#bpo-services',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                  },
                }
              );
            });

          // ==========================================
          // PINNED TESTIMONIAL
          // ==========================================

          gsap.to(
            '[data-bpo-quote-progress]',
            {
              scaleX: 1,
              ease: 'none',

              scrollTrigger: {
                trigger: quoteRef.current,
                pin: true,

                start: 'top top',
                end: '+=520',

                scrub: true,
                anticipatePin: 1,
              },
            }
          );

          // ==========================================
          // PINNED FOUR-STEP TIMELINE
          // ==========================================

          gsap.to(
            timelineRef.current,
            {
              scaleX: 1,
              ease: 'none',

              scrollTrigger: {
                trigger: stepsRef.current,
                pin: true,

                start: 'top top',
                end: '+=650',

                scrub: true,
                anticipatePin: 1,

                onUpdate: (self) => {
                  root
                    .querySelectorAll<HTMLElement>(
                      '[data-bpo-step]'
                    )
                    .forEach((el, i) => {
                      gsap.set(el, {
                        opacity:
                          self.progress >= i / 4
                            ? 1
                            : 0.48,
                      });
                    });
                },
              },
            }
          );
        }, root);

        return () => ctx.revert();
      }
    );

    document.fonts?.ready.then(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      mm.revert();
    };
  }, []);

  // ====================================================
  // PAGE JSX
  // ====================================================

  return (
    <div
      ref={pageRef}
      className="overflow-x-clip bg-white font-sans text-[#17191C]"
    >
      {/* PAGE READING PROGRESS */}

      <div
        className="fixed left-0 right-0 top-[88px] z-40 h-[2px] bg-transparent"
        aria-hidden="true"
      >
        <div
          data-bpo-reading-progress
          className="h-full w-full origin-left scale-x-0 bg-[#B12025]"
        />
      </div>

      {/* ==============================================
          01 — HERO SECTION
      ============================================== */}

      <section
        ref={heroRef}
        id="bpo-top"
        className="relative isolate overflow-hidden bg-[#FFF9F6] px-5 pb-16 pt-[150px] sm:px-8 lg:px-14 lg:pb-28 lg:pt-[175px]"
      >
        {/* PARALLAX BACKGROUND SHAPES */}

        <div
          aria-hidden="true"
          data-bpo-bg
          className="absolute -right-24 top-24 h-[420px] w-[420px] rounded-full bg-[#F8DEDE]/65 blur-[90px]"
        />

        <div
          aria-hidden="true"
          data-bpo-bg
          className="absolute -left-44 bottom-0 h-[300px] w-[300px] rounded-full bg-[#FFF0E5] blur-[65px]"
        />

        <div className="relative mx-auto grid max-w-[1420px] items-center gap-12 lg:grid-cols-[1.12fr_.88fr] lg:gap-14">
          {/* HERO LEFT CONTENT */}

          <div>
            

            <p
              data-bpo-intro
              className="mt-8 text-[11px] font-bold uppercase tracking-[.2em] text-[#B12025]"
            >
              BPO and back office outsourcing in Sri Lanka
            </p>

            {/* MASKED H1 REVEAL */}

            <h1 className="mt-5 max-w-[850px] text-[clamp(2.65rem,5.3vw,5.3rem)] font-semibold leading-[1.08] tracking-[-.069em]">
              <span className="block overflow-hidden pb-[.1em]">
                <span
                  data-bpo-line
                  className="block"
                >
                  Back office work
                </span>
              </span>

              <span className="block overflow-hidden pb-[.1em]">
                <span
                  data-bpo-line
                  className="block"
                >
                  delivered at{' '}

                  <span className="relative inline-block text-[#B12025]">
                    <span
                      data-bpo-98-wipe
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-[6%] -z-10 h-[33%] origin-left bg-[#F6CECF]"
                    />

                    98%
                  </span>{' '}
                  accuracy,
                </span>
              </span>

              <span className="block overflow-hidden pb-[.1em]">
                <span
                  data-bpo-line
                  className="block"
                >
                  checked by software
                </span>
              </span>

              <span className="block overflow-hidden pb-[.1em]">
                <span
                  data-bpo-line
                  className="block"
                >
                  and by people.
                </span>
              </span>
            </h1>

            <p
              data-bpo-intro
              className="mt-8 max-w-[680px] text-[15px] leading-[1.85] text-[#17191C]/75"
            >
              Back office work builds up as a business grows.
              Data entry falls behind and checks on new
              customers slow down sign-ups. Managers end up
              doing admin instead of their own jobs.
            </p>

            <p
              data-bpo-intro
              className="mt-4 max-w-[680px] text-[15px] leading-[1.85] text-[#17191C]/75"
            >
              FirstNotch&apos;s team of 30+ in Colombo can take
              this work on. Software catches simple errors
              first, then a person checks each item. That is
              how client work reaches a 98% accuracy rate.
            </p>

            <div
              data-bpo-intro
              className="mt-7 flex flex-wrap items-center gap-4"
            >
              <a
                href="#bpo-services"
                className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#B12025] underline-offset-4 hover:underline"
              >
                See the seven services
                <ArrowDown size={16} />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#B12025] px-6 py-3.5 text-[12px] font-semibold text-white transition hover:bg-[#991B20]"
              >
                Book a free discovery call
                <ArrowUpRight size={17} />
              </a>
            </div>
          </div>

          {/* ==========================================
              ANIMATED DOCUMENT CHECKING PANEL
          ========================================== */}

          <div
            ref={docsRef}
            className="relative mx-auto w-full max-w-[525px] overflow-hidden rounded-[30px] border border-[#B12025]/15 bg-white/90 p-5 shadow-[0_30px_90px_rgba(177,32,37,.09)] sm:p-7"
            role="img"
            aria-label="Illustration of invoices, identity records and contracts being checked"
          >
            <div className="flex items-center justify-between border-b border-[#B12025]/10 pb-4">
              <span className="text-[10px] font-semibold uppercase tracking-[.2em] text-[#B12025]">
                Software + human review
              </span>

              <ScanSearch
                size={20}
                className="text-[#B12025]"
              />
            </div>

            <div className="relative mt-5 grid grid-cols-2 gap-3 sm:gap-4">
              {[
                {
                  n: 'Invoice',
                  k: 'INV-2048',
                  I: FileText,
                },
                {
                  n: 'KYC record',
                  k: 'KYC-0152',
                  I: ShieldCheck,
                },
                {
                  n: 'Contract',
                  k: 'DOC-9031',
                  I: FileCheck2,
                },
                {
                  n: 'Data sheet',
                  k: 'DATA-042',
                  I: Database,
                },
              ].map((doc) => (
                <div
                  key={doc.k}
                  data-bpo-doc
                  className="relative min-h-[135px] rounded-[17px] border border-[#B12025]/10 bg-[#FFF9F7] p-4 shadow-sm sm:min-h-[165px]"
                >
                  <div className="flex items-center justify-between">
                    <doc.I
                      size={21}
                      className="text-[#B12025]"
                    />

                    <span
                      data-bpo-doc-check
                      className="rounded-full bg-[#B12025] p-1 text-white"
                    >
                      <Check size={13} />
                    </span>
                  </div>

                  <p className="mt-5 text-[14px] font-semibold">
                    {doc.n}
                  </p>

                  <p className="mt-1 font-mono text-[10px] tracking-[.06em] text-[#17191C]/50">
                    {doc.k}
                  </p>

                  <div className="mt-3 h-[3px] w-4/5 rounded-full bg-[#B12025]/10">
                    <div className="h-full w-3/4 rounded-full bg-[#B12025]/30" />
                  </div>
                </div>
              ))}

              {/* SCANNING LINE */}

              <div
                data-bpo-scan
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[2px] bg-[#B12025] shadow-[0_0_20px_5px_rgba(177,32,37,.2)]"
              />
            </div>

            <div className="mt-5 flex items-center gap-2 rounded-xl bg-[#FFF0F0] p-3 text-[11px] font-medium text-[#B12025]">
              <CheckCheck size={17} />
              Checked by software and by people
            </div>
          </div>
        </div>
      </section>

      {/* ==============================================
          02 — ANIMATED STATISTICS
      ============================================== */}

      <section
        className="relative bg-white px-5 py-12 sm:px-8 lg:px-14"
        aria-label="FirstNotch performance statistics"
      >
        <div className="mx-auto grid max-w-[1420px] grid-cols-2 gap-5 rounded-[26px] border border-[#B12025]/10 bg-white p-5 shadow-[0_12px_50px_rgba(177,32,37,.06)] md:grid-cols-4 lg:p-8">
          {/* 98% + SVG RING */}

          <div
            data-bpo-reveal
            className="flex items-center gap-3 border-[#B12025]/10 md:border-r"
          >
            <svg
              viewBox="0 0 112 112"
              width="70"
              height="70"
              className="shrink-0 -rotate-90"
              aria-hidden="true"
            >
              <circle
                cx="56"
                cy="56"
                r="45"
                stroke="#F5DADA"
                strokeWidth="8"
                fill="none"
              />

              <circle
                ref={ringRef}
                cx="56"
                cy="56"
                r="45"
                stroke={RED}
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 45}
                strokeDashoffset={2 * Math.PI * 45}
              />
            </svg>

            <div>
              <div className="text-[28px] font-semibold tracking-[-.06em] text-[#B12025]">
                <span data-bpo-count="98">98</span>%
              </div>

              <p className="text-[11px] leading-5 text-[#17191C]/60">
                accuracy rate across client work
              </p>
            </div>
          </div>

          {/* 85% */}

          <div
            data-bpo-reveal
            className="flex flex-col justify-center border-[#B12025]/10 pl-2 md:border-r md:pl-6"
          >
            <div className="text-[37px] font-semibold leading-none tracking-[-.06em] text-[#B12025]">
              <span data-bpo-count="85">85</span>%
            </div>

            <p className="mt-2 text-[12px] text-[#17191C]/60">
              client retention rate
            </p>
          </div>

          {/* HIRING RATE */}

          <div
            data-bpo-reveal
            className="flex flex-col justify-center border-[#B12025]/10 pl-2 md:border-r md:pl-6"
          >
            <div className="text-[37px] font-semibold leading-none tracking-[-.06em] text-[#B12025]">
              <span data-bpo-count="15">15</span>
              –
              <span data-bpo-count="20">20</span>%
            </div>

            <p className="mt-2 text-[12px] text-[#17191C]/60">
              of job applicants pass the hiring checks
            </p>
          </div>

          {/* EMPLOYEES */}

          <div
            data-bpo-reveal
            className="flex flex-col justify-center pl-2 md:pl-6"
          >
            <div className="text-[37px] font-semibold leading-none tracking-[-.06em] text-[#B12025]">
              <span data-bpo-count="30">30</span>+
            </div>

            <p className="mt-2 text-[12px] text-[#17191C]/60">
              trained staff in Colombo
            </p>
          </div>
        </div>
      </section>

      {/* ==============================================
          03 — SEVEN SERVICE CARDS
      ============================================== */}

      <section
        id="bpo-services"
        className="scroll-mt-[100px] bg-white px-5 py-[90px] sm:px-8 lg:px-14 lg:py-[120px]"
      >
        <div className="mx-auto max-w-[1420px]">
          <p
            data-bpo-reveal
            className="text-[11px] font-semibold uppercase tracking-[.2em] text-[#B12025]"
          >
            What we handle
          </p>

          <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
            <h2
              data-bpo-reveal
              className="max-w-[820px] text-[clamp(2.6rem,5vw,5rem)] font-semibold leading-[1.08] tracking-[-.06em]"
            >
              BPO and back office services
              <span className="text-[#B12025]">.</span>
            </h2>

            <p
              data-bpo-reveal
              className="max-w-[300px] text-[13px] leading-7 text-[#17191C]/65"
            >
              Each card links to the full details.
            </p>
          </div>

          {/* ANIMATED GRID */}

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {services.map((service, i) => (
              <div
                data-bpo-column
                key={service.slug}
                className="min-w-0"
              >
                <Link
                  data-bpo-card
                  href={`${BASE}/${service.slug}`}
                  className="group flex h-full min-h-[265px] flex-col rounded-[24px] border border-[#B12025]/10 bg-[#FFF9F7] p-7 transition-[background-color,border-color,box-shadow,transform] duration-300 hover:-translate-y-2 hover:border-[#B12025] hover:bg-white hover:shadow-[0_25px_60px_rgba(177,32,37,.11)] focus-visible:outline-2 focus-visible:outline-[#B12025]"
                >
                  <div className="flex items-center justify-between">
                    <service.icon
                      size={27}
                      strokeWidth={1.6}
                      className="text-[#B12025]"
                    />

                    <span className="text-[11px] text-[#B12025]/50">
                      0{i + 1}
                    </span>
                  </div>

                  <h3 className="mt-9 max-w-[320px] text-[21px] font-semibold leading-[1.2] tracking-[-.04em]">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-[13px] leading-[1.8] text-[#17191C]/65">
                    {service.detail}
                  </p>

                  <span className="mt-auto flex items-center gap-2 pt-6 text-[12px] font-semibold text-[#B12025]">
                    Read more

                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-2"
                    />
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==============================================
          04 — PINNED QUOTE SECTION
      ============================================== */}

      <section
        ref={quoteRef}
        id="bpo-results"
        className="relative flex min-h-[510px] items-center overflow-hidden bg-[#B12025] px-5 py-20 text-white sm:px-8 lg:min-h-[600px] lg:px-14"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-[10%] top-0 h-[530px] w-[530px] rounded-full border border-white/15"
        />

        <div className="relative mx-auto w-full max-w-[1180px] text-center">
          <p
            data-bpo-reveal
            className="text-[11px] font-semibold uppercase tracking-[.2em] text-white/75"
          >
            Freight forwarder · client experience
          </p>

          <blockquote className="mx-auto mt-9 max-w-[1100px] text-[clamp(1.85rem,4.1vw,4.3rem)] font-semibold leading-[1.3] tracking-[-.055em]">
            {QUOTE_PARTS.map((part, i) => (
              <span
                key={i}
                data-bpo-quote-highlight
                className="mr-[.2em] inline rounded-[3px] bg-[linear-gradient(rgba(255,255,255,.19),rgba(255,255,255,.19))] bg-left bg-no-repeat [background-size:0%_100%]"
              >
                {part.split(/\s+/).map((word, j) => (
                  <span
                    key={j}
                    data-bpo-quote-word
                    className="inline-block"
                  >
                    {word}
                    {'\u00a0'}
                  </span>
                ))}
              </span>
            ))}
          </blockquote>

          {/* BEFORE / AFTER STORY */}

          <div className="mx-auto mt-10 flex max-w-[640px] flex-wrap justify-center gap-3">
            {[
              'Days',
              'Within a day',
              'Seconds',
            ].map((v, i) => (
              <span
                key={v}
                data-bpo-quote-timing
                className="rounded-full border border-white/30 bg-white/10 px-5 py-2 text-[12px] font-semibold text-white"
              >
                {i === 0
                  ? 'Before: '
                  : i === 1
                  ? 'Checked: '
                  : 'Found: '}

                {v}
              </span>
            ))}
          </div>

          <div className="mx-auto mt-8 h-[3px] w-[240px] overflow-hidden rounded-full bg-white/25">
            <div
              data-bpo-quote-progress
              className="h-full w-full origin-left scale-x-0 bg-white"
            />
          </div>
        </div>

        <div
          data-bpo-quote-wipe
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 h-[5px] w-full origin-left scale-x-0 bg-white"
        />
      </section>

      {/* ==============================================
          05 — FAQ SECTION
      ============================================== */}

      <section
        id="bpo-faq"
        className="bg-[#FFF8F5] px-5 py-[105px] sm:px-8 lg:px-14 lg:py-[135px]"
      >
        <div className="mx-auto grid max-w-[1420px] gap-12 lg:grid-cols-[.75fr_1.25fr] lg:gap-20">
          {/* STICKY LEFT HEADING */}

          <div className="self-start lg:sticky lg:top-[125px]">
            <p
              data-bpo-reveal
              className="text-[11px] font-semibold uppercase tracking-[.2em] text-[#B12025]"
            >
              Good to know
            </p>

            <h2
              data-bpo-reveal
              className="mt-5 max-w-[420px] text-[clamp(2.6rem,4.8vw,4.9rem)] font-semibold leading-[1.08] tracking-[-.06em]"
            >
              Common questions about back office outsourcing
              <span className="text-[#B12025]">.</span>
            </h2>

            <p className="mt-6 max-w-[360px] text-[14px] leading-[1.8] text-[#17191C]/65">
              Answers about quality, turnaround,
              your data and growing the team.
            </p>
          </div>

          {/* GSAP FAQ ACCORDION */}

          <div className="border-t border-[#B12025]/15">
            {faqs.map((faq, i) => (
              <FaqRow
                key={faq.q}
                item={faq}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ==============================================
          06 — PINNED FOUR-STEP PROCESS
      ============================================== */}

      <section
        ref={stepsRef}
        id="bpo-process"
        className="flex min-h-[570px] items-center bg-white px-5 py-24 sm:px-8 lg:min-h-[690px] lg:px-14"
      >
        <div className="mx-auto w-full max-w-[1420px]">
          <p
            data-bpo-reveal
            className="text-[11px] font-semibold uppercase tracking-[.2em] text-[#B12025]"
          >
            Our process
          </p>

          <h2
            data-bpo-reveal
            className="mt-5 max-w-[1000px] text-[clamp(2.5rem,4.9vw,5rem)] font-semibold leading-[1.07] tracking-[-.06em]"
          >
            How your back office team is set up
            <span className="text-[#B12025]">.</span>
          </h2>

          <p
            data-bpo-reveal
            className="mt-5 max-w-[680px] text-[14px] leading-[1.8] text-[#17191C]/65"
          >
            The biggest risk with outsourced admin is
            mistakes that reach your systems. These
            steps are there to stop that.
          </p>

          {/* PROGRESS LINE */}

          <div className="relative mt-12">
            <div
              aria-hidden="true"
              className="absolute left-0 right-0 top-0 hidden h-[2px] bg-[#B12025]/15 lg:block"
            />

            <div
              ref={timelineRef}
              aria-hidden="true"
              className="absolute left-0 right-0 top-0 hidden h-[2px] origin-left scale-x-0 bg-[#B12025] lg:block"
            />

            {/* FOUR STEPS */}

            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              {setup.map((step) => (
                <article
                  data-bpo-step
                  key={step.n}
                  className="border-t-2 border-[#B12025]/35 pt-6 lg:border-0"
                >
                  <div className="flex items-center gap-3 text-[#B12025]">
                    <step.icon
                      size={25}
                      strokeWidth={1.6}
                    />

                    <span className="text-[13px] font-semibold">
                      {step.n}
                    </span>
                  </div>

                  <h3 className="mt-5 text-[21px] font-semibold tracking-[-.04em]">
                    {step.title}
                  </h3>

                  <p className="mt-4 text-[13px] leading-[1.9] text-[#17191C]/65">
                    {step.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Existing StoryContact and FirstNotchFooter
          are rendered by the route after this page. */}
    </div>
  );
}
