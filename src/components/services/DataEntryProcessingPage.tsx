
'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Check,
  CheckCheck,
  ChevronDown,
  ClipboardCheck,
  ClipboardList,
  Database,
  FileCheck2,
  FileSpreadsheet,
  FileText,
  FolderInput,
  PenLine,
  ScanLine,
  TrendingUp,
  UserRoundCheck,
  Users,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ======================================================
// FIRSTNOTCH — DATA ENTRY & PROCESSING
// Red:   #B12025
// White: #FFFFFF
// Cream: #FFF9F6
// ======================================================

const RED = '#B12025';
const ROOT = '/services/bpo-back-office-outsourcing';

// ======================================================
// SERVICE FEATURES
// ======================================================

const FEATURES = [
  {
    title: 'Entry from any source',
    text: 'Data can come from paper forms, PDFs, scans, emails or spreadsheets.',
    Icon: FolderInput,
  },
  {
    title: 'Work in your systems',
    text: 'Records go straight into your CRM, database or other software. Files can also be delivered in Excel or CSV.',
    Icon: Database,
  },
  {
    title: 'Software checks first',
    text: 'Tools flag missing fields, wrong formats and possible duplicates while the data is entered.',
    Icon: ScanLine,
  },
  {
    title: 'A person checks each record',
    text: 'Every record is reviewed by hand. Client work is delivered at a 98% accuracy rate.',
    Icon: UserRoundCheck,
  },
  {
    title: 'Data processing',
    text: 'Data can be cleaned, sorted, merged or converted into the format your team needs.',
    Icon: FileSpreadsheet,
  },
  {
    title: 'Your formatting rules',
    text: 'Each field follows rules you set, such as date formats, naming and product codes. Anything unclear goes to your team to confirm.',
    Icon: PenLine,
  },
  {
    title: 'Agreed turnaround',
    text: 'Each batch has a turnaround time agreed with you. Urgent batches can be returned the same day.',
    Icon: ClipboardCheck,
  },
  {
    title: 'A quality score for every batch',
    text: 'Completed batches are scored before they reach you. Errors are logged by type and used to improve the checks.',
    Icon: BadgeCheck,
  },
] as const;

// ======================================================
// REPORT METRICS
// ======================================================

const METRICS = [
  {
    title: 'Accuracy rate',
    text: 'The share of records delivered without an error.',
    note: '98% on client work to date.',
  },
  {
    title: 'Turnaround time',
    text: 'How long each batch takes from receipt to delivery.',
    note: 'Agreed for each type of batch.',
  },
  {
    title: 'Volume completed',
    text: 'Records entered or processed in the period.',
    note: 'Shown by source.',
  },
  {
    title: 'Rework',
    text: 'Records you sent back for correction.',
    note: 'Corrected free of charge.',
  },
  {
    title: 'Most common errors',
    text: 'The mistakes found most often during checks.',
    note: 'Reviewed with you each month.',
  },
] as const;

// ======================================================
// FAQ CONTENT
// ======================================================

const FAQS = [
  {
    question: 'What happens when handwriting is hard to read?',
    answer:
      'Unclear entries are marked and sent to you, rather than one person guessing.',
  },
  {
    question: 'Which systems can you enter data into?',
    answer:
      'We can work in your CRM, databases or your own tools. Desktop software can be used through a secure remote connection.',
  },
  {
    question: 'How much data can the team handle?',
    answer:
      'Team size is planned around your volumes. Extra staff can be added for seasonal peaks with two weeks notice.',
  },
  {
    question: 'Is our data kept confidential?',
    answer:
      'Only the people working on your account can open your files. Each one signs a confidentiality agreement, and files are deleted when the work is complete if you ask.',
  },
  {
    question: 'Can we test the service on a small batch?',
    answer:
      'Yes. A sample batch is processed for a check, so you can check the accuracy before you decide.',
  },
  {
    question: 'How is data entry priced?',
    answer:
      'Price depends on the number of records and how many fields each one has. Most work is priced per record or per hour. A quotation is sent after the discovery call.',
  },
] as const;

// ======================================================
// RELATED SERVICES
// ======================================================

const OTHER_SERVICES = [
  {
    name: 'Document processing',
    slug: 'document-processing',
  },
  {
    name: 'Data verification and validation',
    slug: 'data-verification-validation',
  },
  {
    name: 'Compliance, KYC and AML support',
    slug: 'compliance-kyc-aml-support',
  },
  {
    name: 'Lead generation',
    slug: 'lead-generation',
  },
  {
    name: 'Back office operations',
    slug: 'back-office-operations',
  },
  {
    name: 'Virtual assistant services',
    slug: 'virtual-assistant-services',
  },
] as const;

// ======================================================
// FOUR-STEP SETUP PROCESS
// ======================================================

const STEPS = [
  {
    num: '01',
    title: 'Learning your business',
    text: 'The team maps each process with you, step by step, and writes it down as a checklist you approve.',
    Icon: ClipboardCheck,
  },
  {
    num: '02',
    title: 'Hiring and training',
    text: 'Team members take language tests, technical assessments and reference checks. Only 15 to 20% of job applicants pass. Each one then practises on sample work before handling yours.',
    Icon: Users,
  },
  {
    num: '03',
    title: 'Going live with quality checks',
    text: 'Every task gets a quality score. Work starts at a lower volume with extra checks, and volume grows once accuracy is steady. Each team member has a monthly performance review with coaching.',
    Icon: BadgeCheck,
  },
  {
    num: '04',
    title: 'Reporting and improving',
    text: 'You get a monthly report on volume, turnaround times, accuracy and the most common errors, plus a call to agree what to improve.',
    Icon: TrendingUp,
  },
] as const;

// Illustrative spreadsheet preview, not real client data.

const PREVIEW_ROWS = [
  {
    code: 'PRD-1024',
    name: 'Office chair',
    status: 'Checked',
  },
  {
    code: 'PRD-1025',
    name: 'Desk lamp',
    status: 'Checked',
  },
  {
    code: 'INV-2048',
    name: 'Invoice',
    status: 'Checked',
  },
  {
    code: 'ORD-3091',
    name: 'Order form',
    status: 'Checked',
  },
] as const;

// ======================================================
// SCROLL-REVEALED TEXT (NO BACKGROUND HIGHLIGHT)
// ======================================================

function Highlight({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <span
      data-de-text-reveal
      className="inline-block font-semibold text-[#B12025]"
    >
      {children}
    </span>
  );
}

// ======================================================
// GSAP FAQ ACCORDION
// ======================================================

function FaqItem({
  item,
  index,
  open,
  toggle,
}: {
  item: (typeof FAQS)[number];
  index: number;
  open: boolean;
  toggle: () => void;
}) {
  const content = useRef<HTMLDivElement>(null);
  const initial = useRef(true);

  useEffect(() => {
    if (!content.current) return;

    if (initial.current) {
      gsap.set(content.current, {
        height: open ? 'auto' : 0,
      });

      initial.current = false;
      return;
    }

    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const tween = gsap.to(content.current, {
      height: open ? 'auto' : 0,
      duration: reduced ? 0 : 0.4,
      ease: 'power3.inOut',
      overwrite: 'auto',
    });

    return () => {
      tween.kill();
    };
  }, [open]);

  return (
    <article className="border-b border-[#B12025]/15 py-5">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`de-answer-${index}`}
          onClick={toggle}
          className="group flex w-full items-center justify-between gap-5 text-left text-[16px] font-semibold leading-[1.45] text-[#17191C] transition-colors hover:text-[#B12025] focus-visible:rounded-md focus-visible:outline-2 focus-visible:outline-[#B12025] sm:text-[18px]"
        >
          {item.question}

          <ChevronDown
            size={19}
            aria-hidden="true"
            className={`shrink-0 text-[#B12025] transition-transform duration-300 ${
              open ? 'rotate-180' : ''
            }`}
          />
        </button>
      </h3>

      <div
        ref={content}
        id={`de-answer-${index}`}
        aria-hidden={!open}
        className="overflow-hidden"
      >
        <p className="max-w-[670px] pb-2 pt-4 text-[13px] leading-[1.9] text-[#17191C]/70 sm:text-[14px]">
          {item.answer}
        </p>
      </div>
    </article>
  );
}

// ======================================================
// MAIN PAGE COMPONENT
// ======================================================

export default function DataEntryProcessingPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLElement>(null);
  const processRef = useRef<HTMLElement>(null);
  const processLine = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // ====================================================
  // GSAP ANIMATIONS
  // ====================================================

  useEffect(() => {
    const root = rootRef.current;
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

          gsap.to('[data-de-progress]', {
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
          // MASKED H1 RISING ANIMATION
          // ==========================================

          gsap.from('[data-de-rise]', {
            yPercent: 112,
            autoAlpha: 0,
            duration: 1.05,
            stagger: 0.11,
            ease: 'power4.out',
          });

          gsap.from('[data-de-intro]', {
            y: 22,
            autoAlpha: 0,
            duration: 0.8,
            delay: 0.25,
            stagger: 0.12,
            ease: 'power3.out',
          });

          // ==========================================
          // CHECKED BY HAND UNDERLINE DRAW
          // ==========================================

          gsap.fromTo(
            '[data-de-underline]',
            {
              strokeDashoffset: 1,
            },
            {
              strokeDashoffset: 0,
              duration: 1,
              delay: 0.7,
              ease: 'power2.out',
            }
          );

          gsap.from('[data-de-underline-check]', {
            scale: 0,
            autoAlpha: 0,
            delay: 1.35,
            duration: 0.45,
            ease: 'back.out(2)',
          });

          // ==========================================
          // SCROLL-TRIGGERED TEXT REVEAL (NO YELLOW MARKERS)
          // Each highlighted phrase and each quote line fades and rises
          // when it enters the viewport.
          // ==========================================

          gsap.utils.toArray<HTMLElement>(
            '[data-de-text-reveal]'
          ).forEach((el) => {
            gsap.fromTo(
              el,
              { y: 22, autoAlpha: 0 },
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.85,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: el,
                  start: 'top 90%',
                  once: true,
                },
              }
            );
          });

          // ==========================================
          // QUOTE LINES REVEAL ON SCROLL
          // ==========================================

          gsap.fromTo(
            '[data-de-quote-reveal]',
            { y: 35, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.9,
              stagger: 0.17,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: quoteRef.current,
                start: 'top 78%',
                once: true,
              },
            }
          );

          // ==========================================
                    // DOCUMENTS: MESSY TO TIDY
          // ==========================================

          const offsets = [
            [-65, -70, -12],
            [50, -55, 10],
            [-45, 55, -8],
            [68, 47, 12],
          ];

          gsap.fromTo(
            '[data-de-paper]',
            {
              x: (i: number) => offsets[i % 4][0],
              y: (i: number) => offsets[i % 4][1],
              rotation: (i: number) => offsets[i % 4][2],
            },
            {
              x: 0,
              y: 0,
              rotation: 0,
              ease: 'none',
              scrollTrigger: {
                trigger: hero,
                start: 'top top',
                end: 'bottom 35%',
                scrub: 0.8,
              },
            }
          );

          // ==========================================
          // SCANNING LINE
          // ==========================================

          gsap.fromTo(
            '[data-de-scan]',
            {
              yPercent: -250,
              autoAlpha: 0,
            },
            {
              yPercent: 1350,
              autoAlpha: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: hero,
                start: 'top top',
                end: 'bottom 35%',
                scrub: 0.8,
              },
            }
          );

          // ==========================================
          // SPREADSHEET CELL TYPING
          // ==========================================

          const typedCells =
            gsap.utils.toArray<HTMLElement>(
              '[data-de-typed]'
            );

          const typeTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: sheetRef.current,
              start: 'top 85%',
              once: true,
            },
          });

          typedCells.forEach((el, i) => {
            const value = el.dataset.value ?? '';
            const state = { chars: 0 };

            typeTimeline.to(
              state,
              {
                chars: value.length,
                duration: 0.38,
                ease: 'none',

                onStart: () => {
                  el.textContent = '';
                },

                onUpdate: () => {
                  el.textContent = value.slice(
                    0,
                    Math.floor(state.chars)
                  );
                },

                onComplete: () => {
                  el.textContent = value;
                },
              },
              i * 0.23
            );
          });

          // ==========================================
          // RECORD APPROVAL STAMPS
          // ==========================================

          gsap.from('[data-de-record-check]', {
            scale: 0,
            autoAlpha: 0,
            stagger: 0.13,
            duration: 0.45,
            ease: 'back.out(1.8)',
            scrollTrigger: {
              trigger: sheetRef.current,
              start: 'top 72%',
              once: true,
            },
          });

          // ==========================================
          // GENERAL SECTION REVEALS
          // ==========================================

          gsap.utils
            .toArray<HTMLElement>(
              '[data-de-reveal]'
            )
            .forEach((el) => {
              gsap.from(el, {
                y: 28,
                autoAlpha: 0,
                duration: 0.85,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: el,
                  start: 'top 90%',
                  once: true,
                },
              });
            });

          // ==========================================
          // CHECKLIST TICK DRAW
          // ==========================================

          gsap.fromTo(
            '[data-de-tick-path]',
            {
              strokeDashoffset: 1,
            },
            {
              strokeDashoffset: 0,
              stagger: 0.09,
              duration: 0.7,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: '#de-included',
                start: 'top 75%',
                once: true,
              },
            }
          );

          gsap.from('[data-de-feature]', {
            y: 28,
            autoAlpha: 0,
            stagger: 0.06,
            duration: 0.65,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '#de-included',
              start: 'top 78%',
              once: true,
            },
          });

          // ==========================================
          // SOFTWARE THEN HUMAN PASS
          // ==========================================

          gsap.from('[data-de-pass]', {
            y: 25,
            autoAlpha: 0,
            stagger: 0.18,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '#de-pass',
              start: 'top 82%',
              once: true,
            },
          });

          // ==========================================
          // METRIC CARD 3D FLIP-IN
          // ==========================================

          gsap.from('[data-de-metric]', {
            y: 36,
            rotationX: -13,
            autoAlpha: 0,
            stagger: 0.09,
            transformOrigin: 'center bottom',
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '#de-metrics',
              start: 'top 75%',
              once: true,
            },
          });

          // ==========================================
          // MINI DASHBOARD BARS
          // ==========================================

          gsap.fromTo(
            '[data-de-report-bar]',
            {
              scaleY: 0,
            },
            {
              scaleY: 1,
              stagger: 0.1,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: '#de-dashboard',
                start: 'top 85%',
                once: true,
              },
            }
          );

          // ==========================================
          // MINI DASHBOARD LINE
          // ==========================================

          gsap.fromTo(
            '[data-de-report-line]',
            {
              strokeDashoffset: 1,
            },
            {
              strokeDashoffset: 0,
              duration: 1.35,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: '#de-dashboard',
                start: 'top 85%',
                once: true,
              },
            }
          );

          // ==========================================
          // COUNT-UP STATISTICS
          // ==========================================

          gsap.utils
            .toArray<HTMLElement>(
              '[data-de-count]'
            )
            .forEach((el) => {
              const target = Number(
                el.dataset.deCount || 0
              );

              const num = { value: 0 };

              gsap.to(num, {
                value: target,
                duration: 1.55,
                ease: 'power2.out',

                scrollTrigger: {
                  trigger: el,
                  start: 'top 90%',
                  once: true,
                },

                onUpdate: () => {
                  el.textContent = String(
                    Math.round(num.value)
                  );
                },
              });
            });

          // ==========================================
          // 98% SVG ACCURACY RING
          // ==========================================

          gsap.fromTo(
            '[data-de-ring]',
            {
              strokeDashoffset: 283,
            },
            {
              strokeDashoffset: 283 * 0.02,
              duration: 1.7,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: '#de-stats',
                start: 'top 85%',
                once: true,
              },
            }
          );

          // ==========================================
          // OTHER SERVICE LINK REVEALS
          // ==========================================

          gsap.from('[data-de-other]', {
            x: -30,
            autoAlpha: 0,
            duration: 0.65,
            stagger: 0.08,
            scrollTrigger: {
              trigger: '#de-other',
              start: 'top 85%',
              once: true,
            },
          });

          // ==========================================
          // FOUR PROCESS STEP ICONS
          // ==========================================

          gsap.from('[data-de-step-icon]', {
            scale: 0.4,
            rotate: -12,
            autoAlpha: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: 'back.out(1.8)',
            scrollTrigger: {
              trigger: processRef.current,
              start: 'top 80%',
              once: true,
            },
          });

          // ==========================================
          // SUBTLE HERO BACKGROUND PARALLAX
          // ==========================================

          gsap.fromTo(
            '[data-de-ambient]',
            {
              y: -25,
            },
            {
              y: 45,
              ease: 'none',
              scrollTrigger: {
                trigger: hero,
                start: 'top top',
                end: 'bottom top',
                scrub: true,
              },
            }
          );
        }, root);

        return () => ctx.revert();
      }
    );

    // ==================================================
    // DESKTOP CHECKLIST PARALLAX
    // ==================================================

    mm.add(
      '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
      () => {
        const ctx = gsap.context(() => {
          gsap.utils
            .toArray<HTMLElement>(
              '[data-de-column]'
            )
            .forEach((col, i) => {
              gsap.fromTo(
                col,
                {
                  y: i === 0 ? -12 : 12,
                },
                {
                  y: i === 0 ? 12 : -12,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: '#de-included',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                  },
                }
              );
            });
        }, root);

        return () => ctx.revert();
      }
    );

    // ==================================================
    // LARGE DESKTOP PINNED ANIMATIONS
    // ==================================================

    mm.add(
      '(min-width: 1200px) and (min-height: 720px) and (prefers-reduced-motion: no-preference)',
      () => {
        const ctx = gsap.context(() => {
          // ========================================
          // Quote scroll-reveal runs in the shared animation setup.
          // No pinned yellow highlight animation.
          // ========================================
          // PINNED FOUR-STEP TIMELINE
          // ========================================

          gsap.to(processLine.current, {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: processRef.current,
              start: 'top top',
              end: '+=430',
              pin: true,
              scrub: 1,
              anticipatePin: 1,

              onUpdate: (s) => {
                root
                  .querySelectorAll<HTMLElement>(
                    '[data-de-step]'
                  )
                  .forEach((el, i) => {
                    gsap.set(el, {
                      opacity:
                        s.progress >= i / 4
                          ? 1
                          : 0.4,
                    });
                  });
              },
            },
          });
        }, root);

        return () => ctx.revert();
      }
    );

    // ==================================================
    // MOBILE / TABLET / SHORTER SCREENS
    // NO PINNING
    // ==================================================

    mm.add(
      '(max-width: 1199px) and (prefers-reduced-motion: no-preference), (max-height: 719px) and (prefers-reduced-motion: no-preference)',
      () => {
        const ctx = gsap.context(() => {
          gsap.to(processLine.current, {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: processRef.current,
              start: 'top 80%',
              end: 'bottom 35%',
              scrub: true,
            },
          });
        }, root);

        return () => ctx.revert();
      }
    );

    // ==================================================
    // MAGNETIC CTA — MOUSE DEVICES ONLY
    // ==================================================

    const magnetic =
      root.querySelector<HTMLElement>(
        '[data-de-magnetic]'
      );

    const finePointer = window.matchMedia(
      '(hover: hover) and (pointer: fine)'
    ).matches;

    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const move = (event: MouseEvent) => {
      if (!magnetic) return;

      const r = magnetic.getBoundingClientRect();

      gsap.to(magnetic, {
        x:
          (event.clientX -
            (r.left + r.width / 2)) *
          0.12,

        y:
          (event.clientY -
            (r.top + r.height / 2)) *
          0.12,

        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    const leave = () => {
      if (magnetic) {
        gsap.to(magnetic, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1,0.5)',
        });
      }
    };

    if (magnetic && finePointer && !reduced) {
      magnetic.addEventListener('mousemove', move);
      magnetic.addEventListener('mouseleave', leave);
    }

    return () => {
      magnetic?.removeEventListener(
        'mousemove',
        move
      );

      magnetic?.removeEventListener(
        'mouseleave',
        leave
      );

      mm.revert();
    };
  }, []);

  // ====================================================
  // PAGE JSX
  // ====================================================

  return (
    <div
      ref={rootRef}
      className="overflow-x-clip bg-white font-sans text-[#17191C]"
    >
      {/* PAGE READING PROGRESS */}

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-[88px] z-40 h-[2px]"
      >
        <div
          data-de-progress
          className="h-full w-full origin-left scale-x-0 bg-[#B12025]"
        />
      </div>

      {/* ==============================================
          01 — HERO
      ============================================== */}

      <section
        ref={heroRef}
        className="relative isolate overflow-hidden bg-[#FFF9F6] px-5 pb-[95px] pt-[155px] sm:px-8 lg:px-14 lg:pb-[125px] lg:pt-[170px]"
      >
        <div
          data-de-ambient
          aria-hidden="true"
          className="absolute -right-[160px] top-[120px] -z-10 h-[520px] w-[520px] rounded-full bg-[#F8DADA]/60 blur-[90px]"
        />

        <div className="relative mx-auto grid max-w-[1420px] items-center gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-14">
          {/* HERO TEXT */}

          <div>
            <p
              data-de-intro
              className="text-[12px] text-[#17191C]/50"
            >
              Services / BPO &amp; Back Office /
              Data entry and processing
            </p>

            <p
              data-de-intro
              className="mt-8 text-[10px] font-semibold uppercase tracking-[.22em] text-[#B12025]"
            >
              Data entry services in Sri Lanka
            </p>

            {/* MASKED RISING H1 */}

            <h1 className="mt-5 max-w-[770px] text-[clamp(2.65rem,4.9vw,5.8rem)] font-semibold leading-[1.08] tracking-[-.067em]">
              <span className="block overflow-hidden pb-[.12em]">
                <span data-de-rise className="block">
                  Clean data in your systems,
                </span>
              </span>

              <span className="block overflow-hidden pb-[.12em]">
                <span data-de-rise className="block">
                  with each record
                </span>
              </span>

              <span className="block overflow-hidden pb-[.12em]">
                <span data-de-rise className="block">
                  checked by hand
                </span>
              </span>

              <span className="block overflow-hidden pb-[.12em]">
                <span data-de-rise className="block">
                  before delivery
                  <span className="text-[#B12025]">.</span>
                </span>
              </span>
            </h1>

            {/* SVG UNDERLINE + CHECK */}

            <div
              data-de-intro
              className="mt-1 flex items-center gap-2 text-[#B12025]"
            >
              <svg
                viewBox="0 0 320 16"
                className="h-4 w-[min(55vw,320px)]"
                fill="none"
                aria-hidden="true"
              >
                <path
                  data-de-underline
                  d="M3 11 C75 2 150 14 317 5"
                  stroke={RED}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  pathLength={1}
                  strokeDasharray={1}
                  strokeDashoffset={0}
                />
              </svg>

              <Check
                data-de-underline-check
                size={19}
                strokeWidth={3}
                aria-hidden="true"
              />
            </div>

            {/* INTRO WITH SCROLL-REVEALED PHRASES */}

            <p
              data-de-intro
              className="mt-6 max-w-[630px] text-[14px] leading-[1.95] text-[#17191C]/70 sm:text-[15px]"
            >
              FirstNotch enters and processes data for
              you, inside your own systems. Software
              tools handle the repetitive parts, and
              a person checks each record before it
              is delivered. Businesses use the service
              for{' '}
              <Highlight>product listings</Highlight>,{' '}
              <Highlight>order forms</Highlight>,{' '}
              <Highlight>invoices</Highlight>,{' '}
              <Highlight>survey results</Highlight>{' '}
              and{' '}
              <Highlight>customer records</Highlight>.
            </p>

            {/* HERO BUTTONS */}

            <div
              data-de-intro
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <a
                data-de-magnetic
                href="#contact"
                className="inline-flex min-h-[50px] items-center gap-3 rounded-full bg-[#B12025] px-6 text-[12px] font-semibold text-white transition-colors hover:bg-[#961B20] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B12025]"
              >
                Book a free discovery call

                <ArrowUpRight
                  size={16}
                  aria-hidden="true"
                />
              </a>

              <a
                href="#de-included"
                className="inline-flex min-h-[50px] items-center gap-2 rounded-full border border-[#B12025]/25 bg-white px-6 text-[12px] font-semibold text-[#B12025] transition hover:border-[#B12025] hover:bg-[#FFF3F3]"
              >
                See what is included

                <ArrowDown
                  size={16}
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>

          {/* ==========================================
              ANIMATED DATA ENTRY VISUAL
          ========================================== */}

          <div
            className="min-w-0 rounded-[28px] border border-[#B12025]/15 bg-white p-4 shadow-[0_30px_90px_rgba(177,32,37,.08)] sm:p-7"
            aria-label="Illustrative data entry workflow"
          >
            <div className="flex items-center justify-between border-b border-[#B12025]/10 pb-4">
              <div className="flex items-center gap-2">
                <FileSpreadsheet
                  size={20}
                  className="text-[#B12025]"
                />

                <span className="text-[12px] font-semibold">
                  Data entry workflow
                </span>
              </div>

              <span className="rounded-full bg-[#FFF0F0] px-3 py-1 text-[10px] font-semibold text-[#B12025]">
                DEMO
              </span>
            </div>

            {/* SCATTERED SOURCE DOCUMENTS */}

            <div className="relative mt-5 grid grid-cols-2 gap-3 overflow-hidden rounded-[16px] bg-[#FFF9F7] p-4 sm:grid-cols-4">
              {[
                {
                  title: 'Paper form',
                  Icon: FileText,
                },
                {
                  title: 'Invoice',
                  Icon: FileCheck2,
                },
                {
                  title: 'Survey',
                  Icon: ClipboardList,
                },
                {
                  title: 'Source CSV',
                  Icon: FileSpreadsheet,
                },
              ].map(({ title, Icon }) => (
                <div
                  data-de-paper
                  key={title}
                  className="relative flex min-h-[95px] flex-col items-center justify-center gap-3 rounded-[12px] border border-[#B12025]/15 bg-white p-3 text-center shadow-sm"
                >
                  <Icon
                    size={22}
                    strokeWidth={1.6}
                    className="text-[#B12025]"
                  />

                  <span className="text-[10px] font-semibold leading-4 text-[#17191C]/75">
                    {title}
                  </span>
                </div>
              ))}

              {/* SCANNING LINE */}

              <div
                data-de-scan
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-3 top-3 h-[2px] bg-[#B12025] shadow-[0_0_18px_4px_rgba(177,32,37,.22)]"
              />
            </div>

            {/* SOFTWARE TO HUMAN HANDOFF */}

            <div className="my-4 flex items-center justify-center gap-3 text-[11px] font-semibold text-[#B12025]">
              <ScanLine size={16} />

              Software check

              <ArrowRight size={14} />

              <UserRoundCheck size={16} />

              Human review
            </div>

            {/* SPREADSHEET MOCKUP */}

            <div
              ref={sheetRef}
              className="overflow-hidden rounded-[15px] border border-[#B12025]/15"
            >
              <div className="grid grid-cols-[.9fr_1.4fr_.75fr] bg-[#B12025] px-3 py-3 text-[10px] font-semibold uppercase tracking-[.08em] text-white">
                <span>Record ID</span>
                <span>Source value</span>
                <span>Status</span>
              </div>

              {PREVIEW_ROWS.map((row) => (
                <div
                  key={row.code}
                  className="grid grid-cols-[.9fr_1.4fr_.75fr] items-center gap-1 border-t border-[#B12025]/10 px-3 py-3 text-[10px] sm:text-[11px]"
                >
                  <span className="font-mono text-[#17191C]/65">
                    {row.code}
                  </span>

                  <span
                    data-de-typed
                    data-value={row.name}
                    className="min-w-0 font-medium text-[#17191C] after:ml-[2px] after:animate-pulse after:text-[#B12025] after:content-['|']"
                  >
                    {row.name}
                  </span>

                  <span
                    data-de-record-check
                    className="flex items-center gap-1 text-[10px] font-semibold text-[#B12025]"
                  >
                    <CheckCheck size={14} />

                    {row.status}
                  </span>
                </div>
              ))}
            </div>

            <p className="mt-4 text-[10px] leading-5 text-[#17191C]/45">
              Illustrative records, not real customer
              information.
            </p>
          </div>
        </div>
      </section>

      {/* ==============================================
          02 — WHAT THE SERVICE INCLUDES
      ============================================== */}

      <section
        id="de-included"
        className="scroll-mt-[105px] bg-white px-5 py-[100px] sm:px-8 lg:px-14 lg:py-[130px]"
      >
        <div className="mx-auto max-w-[1420px]">
          <p
            data-de-reveal
            className="text-[10px] font-semibold uppercase tracking-[.2em] text-[#B12025]"
          >
            The service
          </p>

          <h2
            data-de-reveal
            className="mt-4 max-w-[900px] text-[clamp(2.5rem,4.5vw,4.8rem)] font-semibold leading-[1.1] tracking-[-.06em]"
          >
            What the data entry service includes
            <span className="text-[#B12025]">.</span>
          </h2>

          {/* TWO-COLUMN CHECKLIST */}

          <div className="mt-12 grid gap-x-12 gap-y-0 lg:grid-cols-2">
            {[0, 1].map((col) => (
              <div
                key={col}
                data-de-column
              >
                {FEATURES.filter(
                  (_, i) => i % 2 === col
                ).map((feature) => (
                  <article
                    key={feature.title}
                    data-de-feature
                    className="group flex gap-4 border-b border-[#B12025]/15 py-6"
                  >
                    <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#B12025]/20 bg-[#FFF5F5] text-[#B12025]">
                      <svg
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path
                          data-de-tick-path
                          pathLength={1}
                          strokeDasharray={1}
                          strokeDashoffset={0}
                          d="M4 12l5 5L20 6"
                        />
                      </svg>
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <feature.Icon
                          size={18}
                          className="text-[#B12025]"
                        />

                        <h3 className="text-[17px] font-semibold tracking-[-.03em]">
                          {feature.title}
                        </h3>
                      </div>

                      <p className="mt-2 max-w-[535px] text-[13px] leading-[1.85] text-[#17191C]/65">
                        {feature.text}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            ))}
          </div>

          {/* SOFTWARE THEN HUMAN CHECK */}

          <div
            id="de-pass"
            className="mt-12 grid gap-4 rounded-[26px] border border-[#B12025]/15 bg-[#FFF9F6] p-5 sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:p-8"
          >
            <div
              data-de-pass
              className="flex items-center gap-4"
            >
              <ScanLine
                size={28}
                className="text-[#B12025]"
              />

              <div>
                <p className="text-[11px] uppercase tracking-[.13em] text-[#B12025]">
                  01 / Software
                </p>

                <p className="mt-1 text-[15px] font-semibold">
                  Missing fields and duplicates flagged
                </p>
              </div>
            </div>

            <ArrowRight
              aria-hidden="true"
              size={22}
              className="hidden text-[#B12025] sm:block"
            />

            <div
              data-de-pass
              className="flex items-center gap-4"
            >
              <UserRoundCheck
                size={28}
                className="text-[#B12025]"
              />

              <div>
                <p className="text-[11px] uppercase tracking-[.13em] text-[#B12025]">
                  02 / Human
                </p>

                <p className="mt-1 text-[15px] font-semibold">
                  Every record reviewed before delivery
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==============================================
          03 — REPORTING AND STATISTICS
      ============================================== */}

      <section
        id="de-metrics"
        className="bg-[#FFF9F6] px-5 py-[100px] sm:px-8 lg:px-14 lg:py-[130px]"
      >
        <div className="mx-auto max-w-[1420px]">
          <p
            data-de-reveal
            className="text-[10px] font-semibold uppercase tracking-[.2em] text-[#B12025]"
          >
            Your reporting
          </p>

          <h2
            data-de-reveal
            className="mt-4 text-[clamp(2.6rem,5vw,5.1rem)] font-semibold leading-[1.09] tracking-[-.06em]"
          >
            The numbers you will see
            <span className="text-[#B12025]">.</span>
          </h2>

          <p
            data-de-reveal
            className="mt-5 max-w-[730px] text-[14px] leading-[1.9] text-[#17191C]/65"
          >
            Speed only matters when the records
            are correct. Your weekly report shows
            turnaround and accuracy side by side.
          </p>

          {/* 5 METRIC CARDS */}

          <div className="mt-11 grid gap-4 [perspective:1100px] sm:grid-cols-2 lg:grid-cols-4">
            {METRICS.map((m, i) => (
              <article
                key={m.title}
                data-de-metric
                className={`group flex min-h-[210px] flex-col rounded-[22px] border border-[#B12025]/10 bg-white p-6 transition-all duration-300 hover:-translate-y-2 hover:border-[#B12025]/50 hover:shadow-[0_18px_40px_rgba(177,32,37,.10)] ${
                  i === 4
                    ? 'sm:col-span-2 lg:col-span-4 lg:min-h-[150px]'
                    : ''
                }`}
              >
                <p className="text-[12px] font-semibold uppercase tracking-[.1em] text-[#B12025]">
                  {m.title}
                </p>

                <p className="mt-5 max-w-[470px] text-[15px] font-medium leading-[1.65]">
                  {m.text}
                </p>

                <p className="mt-auto pt-5 text-[12px] leading-[1.65] text-[#17191C]/55">
                  {m.note}
                </p>
              </article>
            ))}
          </div>

          {/* MINI REPORT DASHBOARD */}

          <div
            id="de-dashboard"
            data-de-reveal
            className="mt-6 grid gap-6 rounded-[24px] border border-[#B12025]/10 bg-white p-6 sm:p-8 lg:grid-cols-[1fr_1fr] lg:items-center"
          >
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[.2em] text-[#B12025]">
                Weekly report preview
              </span>

              <h3 className="mt-3 text-[23px] font-semibold tracking-[-.04em]">
                Accuracy, volume and turnaround in one view.
              </h3>

              <p className="mt-3 text-[13px] leading-7 text-[#17191C]/60">
                An illustrative dashboard layout.
                Your actual figures come from the
                batches processed for your account.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="min-w-0">
                <p className="text-[11px] font-semibold">
                  Volume by source
                </p>

                <div className="mt-4 flex h-[90px] items-end gap-3 border-b border-[#B12025]/10 pb-2">
                  {[48, 75, 62, 90, 70].map(
                    (v, i) => (
                      <span
                        key={i}
                        data-de-report-bar
                        className="flex-1 origin-bottom rounded-t-md bg-[#B12025]/[.65]"
                        style={{ height: `${v}%` }}
                      />
                    )
                  )}
                </div>

                <p className="mt-2 text-[10px] text-[#17191C]/45">
                  Illustrative bars
                </p>
              </div>

              <div className="min-w-0">
                <p className="text-[11px] font-semibold">
                  Accuracy trend
                </p>

                <svg
                  className="mt-3 h-[104px] w-full overflow-visible"
                  viewBox="0 0 190 100"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M0 85H190M0 55H190M0 25H190"
                    stroke="#B12025"
                    strokeOpacity=".12"
                  />

                  <path
                    data-de-report-line
                    d="M3 75 L40 62 L80 69 L116 39 L151 44 L186 18"
                    stroke={RED}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    pathLength={1}
                    strokeDasharray={1}
                    strokeDashoffset={0}
                  />
                </svg>

                <p className="mt-2 text-[10px] text-[#17191C]/45">
                  Illustrative trend
                </p>
              </div>
            </div>
          </div>

          {/* COUNT-UP STATS */}

          <div
            id="de-stats"
            className="mt-12 grid grid-cols-2 gap-6 border-t border-[#B12025]/20 pt-9 sm:grid-cols-3"
          >
            <div>
              <p className="text-[clamp(2.5rem,4vw,4.3rem)] font-semibold leading-none tracking-[-.06em] text-[#B12025]">
                <span data-de-count="85">85</span>%
              </p>

              <p className="mt-3 text-[12px] text-[#17191C]/60">
                client retention rate
              </p>
            </div>

            <div className="flex items-center gap-3">
              <svg
                aria-hidden="true"
                className="h-[63px] w-[63px] shrink-0 -rotate-90"
                viewBox="0 0 110 110"
              >
                <circle
                  cx="55"
                  cy="55"
                  r="45"
                  stroke="#F3D6D6"
                  strokeWidth="8"
                  fill="none"
                />

                <circle
                  data-de-ring
                  cx="55"
                  cy="55"
                  r="45"
                  stroke={RED}
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray="283"
                  strokeDashoffset="283"
                  strokeLinecap="round"
                />
              </svg>

              <div>
                <p className="text-[clamp(2.1rem,3.6vw,4rem)] font-semibold leading-none tracking-[-.06em] text-[#B12025]">
                  <span data-de-count="98">98</span>%
                </p>

                <p className="mt-3 text-[12px] text-[#17191C]/60">
                  accuracy rate
                </p>
              </div>
            </div>

            <div>
              <p className="text-[clamp(2.2rem,4vw,4.3rem)] font-semibold leading-none tracking-[-.06em] text-[#B12025]">
                <span data-de-count="15">15</span>
                –
                <span data-de-count="20">20</span>%
              </p>

              <p className="mt-3 text-[12px] text-[#17191C]/60">
                of job applicants pass the hiring checks
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==============================================
          04 — DEALERSHIP TESTIMONIAL
      ============================================== */}

      <section
        ref={quoteRef}
        className="relative flex min-h-[520px] items-center overflow-hidden bg-[#B12025] px-5 py-[95px] text-white sm:px-8 lg:min-h-[620px] lg:px-14"
        aria-label="Car dealership client quotation"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-[470px] w-[470px] rounded-full border border-white/20"
        />

        <div className="relative mx-auto w-full max-w-[1120px] text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[.2em] text-white/70">
            Client experience / Car dealership
          </p>

          <blockquote className="mt-8 text-[clamp(1.8rem,4.2vw,4.5rem)] font-semibold leading-[1.35] tracking-[-.053em]">
            {[
              '“Vehicle details used to be typed in by our sales staff after hours.',
              'Now the listings are updated each morning,',
              'and the prices match our system.”',
            ].map((line) => (
              <span
                key={line}
                data-de-quote-reveal
                className="mr-[.18em] inline-block text-white"
              >
                {line}{' '}
              </span>
            ))}
          </blockquote>

          <p className="mt-7 text-[12px] font-semibold uppercase tracking-[.17em] text-white/85">
            Car dealership
          </p>

          {/* BEFORE / AFTER */}

          <div className="mx-auto mt-9 flex max-w-[570px] flex-wrap justify-center gap-3 text-[11px]">
            <span className="rounded-full border border-white/35 px-4 py-2">
              Before: after hours
            </span>

            <ArrowRight
              aria-hidden="true"
              className="my-auto"
              size={17}
            />

            <span className="rounded-full border border-white/35 bg-white/10 px-4 py-2">
              Now: each morning
            </span>

            <span className="rounded-full border border-white/35 px-4 py-2">
              Prices match the system
            </span>
          </div>
        </div>
      </section>

      {/* ==============================================
          05 — FAQ
      ============================================== */}

      <section
        id="de-faq"
        className="bg-[#FFF9F6] px-5 py-[105px] sm:px-8 lg:px-14 lg:py-[135px]"
      >
        <div className="mx-auto grid max-w-[1420px] gap-12 lg:grid-cols-[.75fr_1.25fr] lg:gap-20">
          {/* STICKY HEADING */}

          <div className="self-start lg:sticky lg:top-[120px]">
            <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-[#B12025]">
              Questions, answered
            </p>

            <h2 className="mt-4 max-w-[470px] text-[clamp(2.5rem,4.5vw,4.9rem)] font-semibold leading-[1.1] tracking-[-.06em]">
              Common questions about data entry services
              <span className="text-[#B12025]">.</span>
            </h2>
          </div>

          {/* ANIMATED ACCORDION */}

          <div className="border-t border-[#B12025]/20">
            {FAQS.map((item, index) => (
              <FaqItem
                key={item.question}
                item={item}
                index={index}
                open={openFaq === index}
                toggle={() =>
                  setOpenFaq((v) =>
                    v === index ? null : index
                  )
                }
              />
            ))}
          </div>
        </div>

        {/* ==========================================
            OTHER BPO SERVICES
        ========================================== */}

        <div
          id="de-other"
          className="mx-auto mt-[105px] max-w-[1420px]"
        >
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-[clamp(1.9rem,3.5vw,3.3rem)] font-semibold tracking-[-.055em]">
              Other BPO and back office services
            </h2>

            <Link
              href={ROOT}
              className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#B12025] hover:underline"
            >
              See all services
              <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {OTHER_SERVICES.map((item) => (
              <Link
                data-de-other
                key={item.slug}
                href={`${ROOT}/${item.slug}`}
                className="group flex min-h-[65px] items-center justify-between gap-3 rounded-[15px] border border-[#B12025]/10 bg-white px-5 text-[13px] font-semibold transition-all hover:border-[#B12025]/55 hover:shadow-[0_10px_25px_rgba(177,32,37,.08)]"
              >
                {item.name}

                <ArrowRight
                  size={17}
                  className="shrink-0 text-[#B12025] transition-transform group-hover:translate-x-1.5"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ==============================================
          06 — FOUR-STEP PROCESS
      ============================================== */}

      <section
        ref={processRef}
        id="de-process"
        className="flex min-h-[580px] items-center bg-white px-5 py-[100px] sm:px-8 lg:min-h-[710px] lg:px-14"
      >
        <div className="mx-auto w-full max-w-[1420px]">
          <p
            data-de-reveal
            className="text-[10px] font-semibold uppercase tracking-[.2em] text-[#B12025]"
          >
            Our process
          </p>

          <h2
            data-de-reveal
            className="mt-4 max-w-[900px] text-[clamp(2.5rem,4.6vw,5rem)] font-semibold leading-[1.08] tracking-[-.06em]"
          >
            How your back office team is set up
            <span className="text-[#B12025]">.</span>
          </h2>

          <p
            data-de-reveal
            className="mt-5 max-w-[680px] text-[14px] leading-[1.85] text-[#17191C]/65"
          >
            The biggest risk with outsourced admin
            is mistakes that reach your systems.
            These steps are there to stop that.
          </p>

          {/* ANIMATED PROGRESS LINE */}

          <div className="relative mt-12">
            <div
              aria-hidden="true"
              className="absolute left-0 right-0 top-0 hidden h-[2px] bg-[#B12025]/15 lg:block"
            />

            <div
              ref={processLine}
              aria-hidden="true"
              className="absolute left-0 right-0 top-0 hidden h-[2px] origin-left scale-x-0 bg-[#B12025] lg:block"
            />

            {/* FOUR STEPS */}

            <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              {STEPS.map((step) => (
                <article
                  data-de-step
                  key={step.num}
                  className="border-t-2 border-[#B12025]/30 pt-6 lg:border-0"
                >
                  <div className="flex items-center gap-3 text-[#B12025]">
                    <step.Icon
                      data-de-step-icon
                      size={25}
                      strokeWidth={1.7}
                    />

                    <span className="text-[13px] font-bold">
                      {step.num}
                    </span>
                  </div>

                  <h3 className="mt-5 text-[20px] font-semibold tracking-[-.04em]">
                    {step.title}
                  </h3>

                  <p className="mt-4 text-[13px] leading-[1.85] text-[#17191C]/65">
                    {step.text}
                  </p>
                </article>
              ))}
            </div>
          </div>

          {/* FINAL CTA */}

          <div
            data-de-reveal
            className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[#B12025]/15 pt-7"
          >
            <p className="text-[13px] text-[#17191C]/60">
              Ready to discuss the work your team
              needs covered?
            </p>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#B12025] px-6 py-3 text-[12px] font-semibold text-white hover:bg-[#961B20]"
            >
              Book a free discovery call

              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
