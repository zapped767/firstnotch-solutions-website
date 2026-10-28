
'use client';

import {
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  FileArchive,
  FileCheck2,
  FileSearch,
  FileText,
  FolderClosed,
  FolderOpen,
  LockKeyhole,
  Plus,
  Search,
  ShieldCheck,
  ScanLine,
  TrendingUp,
  Users,
  X,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ======================================================
// FIRSTNOTCH — DOCUMENT PROCESSING
//
// White:    #FFFFFF
// Charcoal: #17191C
// Red:      #B12025
// Grey:     #F4F4F5
//
// No yellow highlights.
// No additional CSS files.
// Only standard GSAP + ScrollTrigger.
// ======================================================

const BASE = '/services/bpo-back-office-outsourcing';
const RED = '#B12025';

// Temporary illustrative records.
// Replace with approved client material later.

const documentTypes = [
  {
    label: 'Contract',
    file: 'CTR-2026-0318_Acme.pdf',
    number: 'CTR-0318',
    name: 'Acme Ltd',
    date: '18 Mar 2026',
    amount: 'Agreement',
    icon: FileText,
  },
  {
    label: 'Invoice',
    file: 'INV-2026-0142_Acme.pdf',
    number: 'INV-0142',
    name: 'Acme Ltd',
    date: '12 Mar 2026',
    amount: 'Invoice',
    icon: FileCheck2,
  },
  {
    label: 'Application',
    file: 'APP-2026-0087_Amara.pdf',
    number: 'APP-0087',
    name: 'Amara Silva',
    date: '09 Mar 2026',
    amount: 'Application',
    icon: ClipboardCheck,
  },
  {
    label: 'Delivery note',
    file: 'DEL-2026-0204_North.pdf',
    number: 'DEL-0204',
    name: 'North Trading',
    date: '21 Mar 2026',
    amount: 'Delivery',
    icon: FileArchive,
  },
  {
    label: 'Staff file',
    file: 'HR-2026-0018_Staff.pdf',
    number: 'HR-0018',
    name: 'Staff record',
    date: '24 Mar 2026',
    amount: 'HR file',
    icon: FolderClosed,
  },
] as const;

// ======================================================
// EIGHT DOCUMENT PROCESSING STEPS
// ======================================================

const stages = [
  {
    title: 'Scanning and import',
    tag: 'SCAN',
    Icon: ScanLine,
    text:
      'Paper files are scanned at your premises, or sent to the Colombo office. PDFs and email files are imported digitally.',
    demo: 'Document received',
    info: 'Paper and digital source files enter a single workflow.',
  },
  {
    title: 'Text you can search',
    tag: 'READ',
    Icon: FileSearch,
    text:
      'Scans are run through text recognition (OCR), so you can search inside most documents.',
    demo: 'Text recognised',
    info: 'Searchable text extracted from the original.',
  },
  {
    title: 'Key details captured',
    tag: 'CAPTURE',
    Icon: FileText,
    text:
      'Names, dates, amounts and reference numbers are taken from each document and entered into your system.',
    demo: 'Fields extracted',
    info: 'Reference number, name and date captured.',
  },
  {
    title: 'Compliance checks',
    tag: 'CHECK',
    Icon: ShieldCheck,
    text:
      'Each document is checked against your checklist for problems such as a missing signature or an expired date. Problems are flagged to your team.',
    demo: 'Exception flagged',
    info: 'Any exception goes to your team for a decision.',
  },
  {
    title: 'Your naming and filing rules',
    tag: 'FILE',
    Icon: FolderOpen,
    text:
      'Files are named and filed using rules you set, so everyone looks for them in the same place.',
    demo: 'Filename applied',
    info: 'A consistent folder and naming convention.',
  },
  {
    title: 'Secure storage',
    tag: 'STORE',
    Icon: LockKeyhole,
    text:
      'Files are stored in your own system, and access is limited to the people you choose.',
    demo: 'Access controlled',
    info: 'Only authorised account users can access a file.',
  },
  {
    title: 'Reviewer scores',
    tag: 'SCORE',
    Icon: BadgeCheck,
    text:
      'Every batch gets a quality score from a reviewer before it is returned to you.',
    demo: 'Quality reviewed',
    info: 'Batch scored against the approved checklist.',
  },
  {
    title: 'Ready for audits',
    tag: 'AUDIT',
    Icon: ClipboardCheck,
    text:
      'Each document keeps a record of who processed it and when. Auditors can search by name, date or reference number.',
    demo: 'Audit trail ready',
    info: 'Processing and review events are recorded.',
  },
] as const;

// ======================================================
// INTERACTIVE SEARCH SAMPLE DATA
// ======================================================

const records = [
  {
    id: 'INV-0142',
    name: 'Acme invoice',
    date: '12 Mar 2026',
    kind: 'Invoice',
    tags: 'invoice 0142 march 2026 acme paid',
    icon: FileCheck2,
  },
  {
    id: 'CTR-0318',
    name: 'Acme contract',
    date: '18 Mar 2026',
    kind: 'Contract',
    tags: 'march 2026 acme contract signed',
    icon: FileText,
  },
  {
    id: 'APP-0087',
    name: 'Application form',
    date: '09 Mar 2026',
    kind: 'Form',
    tags: 'application missing signature march 2026',
    icon: ClipboardCheck,
  },
  {
    id: 'DEL-0204',
    name: 'Delivery note',
    date: '21 Mar 2026',
    kind: 'Delivery',
    tags: 'delivery north trading march 2026',
    icon: FileArchive,
  },
  {
    id: 'HR-0018',
    name: 'Staff record',
    date: '24 Mar 2026',
    kind: 'HR',
    tags: 'staff march 2026 personnel',
    icon: FolderClosed,
  },
  {
    id: 'INV-0091',
    name: 'Service invoice',
    date: '26 Feb 2026',
    kind: 'Invoice',
    tags: 'invoice february 2026 service',
    icon: FileCheck2,
  },
] as const;

// ======================================================
// MONTHLY REPORT METRICS
// ======================================================

const report = [
  {
    title: 'Documents processed',
    description:
      'Documents and pages completed in the period.',
    note: 'Shown by document type.',
    Icon: FileText,
  },
  {
    title: 'Turnaround time',
    description:
      'Time from receiving a batch to filing it.',
    note: 'Agreed during setup.',
    Icon: Clock3,
  },
  {
    title: 'Capture accuracy',
    description:
      'The share of captured details that match the original document.',
    note: 'Checked on every batch.',
    Icon: CheckCircle2,
  },
  {
    title: 'Flagged documents',
    description:
      'Documents with a missing signature, date or page.',
    note: 'Listed for your team to follow up.',
    Icon: ShieldCheck,
  },
  {
    title: 'Quality score',
    description:
      'How closely each batch follows your checklist, scored by a reviewer.',
    note: 'Reviewed with the team every month.',
    Icon: BadgeCheck,
  },
] as const;

// ======================================================
// FAQ
// ======================================================

const faqs = [
  {
    tag: 'Formats',
    q: 'Which documents can you handle?',
    a:
      'Most business documents, including printed forms, typed letters and PDFs. Handwritten forms can be processed too, and unclear entries are sent to your team to confirm.',
  },
  {
    tag: 'Systems',
    q: 'Can you work with our document system?',
    a:
      'Yes. The team works in your own storage. Common tools include SharePoint, Google Drive, Dropbox and M-Files.',
  },
  {
    tag: 'Originals',
    q: 'What happens to the paper originals?',
    a:
      'They are returned to you or destroyed securely, as you choose.',
  },
  {
    tag: 'Timing',
    q: 'How long does a backlog take to clear?',
    a:
      'Clearing time depends on the page count and how many details are captured. A backlog of 10,000 pages usually takes three to four weeks.',
  },
  {
    tag: 'Security',
    q: 'How are confidential documents handled?',
    a:
      'Access is limited to your account team. Work is done on office computers where downloads and USB drives are blocked.',
  },
  {
    tag: 'Pricing',
    q: 'How is document processing priced?',
    a:
      'Cost depends on the number of pages and how much data is captured from each one. Most projects are priced per page or per document. A price is agreed after the discovery call.',
  },
] as const;

// ======================================================
// RELATED BPO SERVICES
// ======================================================

const related = [
  {
    title: 'Data entry and processing',
    desc: 'Clean, reviewed data in your systems.',
    slug: 'data-entry-processing',
  },
  {
    title: 'Data verification and validation',
    desc: 'Check records before you rely on them.',
    slug: 'data-verification-validation',
  },
  {
    title: 'Compliance, KYC and AML support',
    desc: 'Structured identity and background checks.',
    slug: 'compliance-kyc-aml-support',
  },
  {
    title: 'Lead generation',
    desc: 'Verified contacts for outreach.',
    slug: 'lead-generation',
  },
  {
    title: 'Back office operations',
    desc: 'Everyday admin handled to plan.',
    slug: 'back-office-operations',
  },
  {
    title: 'Virtual assistant services',
    desc: 'Support for calendars and inboxes.',
    slug: 'virtual-assistant-services',
  },
] as const;

// ======================================================
// SETUP PROCESS
// ======================================================

const setup = [
  {
    number: '01',
    title: 'Learning your business',
    text:
      'The team maps each process with you, step by step, and writes it down as a checklist you approve.',
    Icon: ClipboardCheck,
  },
  {
    number: '02',
    title: 'Hiring and training',
    text:
      'Team members take language tests, technical assessments and reference checks. Only 15 to 20% of job applicants pass. Each one then practises on sample work before handling yours.',
    Icon: Users,
  },
  {
    number: '03',
    title: 'Going live with quality checks',
    text:
      'Every task gets a quality score. Work starts at a lower volume with extra checks, and volume grows once accuracy is steady. Each team member has a monthly performance review with coaching.',
    Icon: BadgeCheck,
  },
  {
    number: '04',
    title: 'Reporting and improving',
    text:
      'You get a monthly report on volumes, turnaround times, accuracy and the most common errors, plus a call to agree what to improve.',
    Icon: TrendingUp,
  },
] as const;

// ======================================================
// ANIMATED RED UNDERLINE
// NO YELLOW HIGHLIGHT
// ======================================================

function DrawUnderline({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <span className="relative inline-block whitespace-normal font-semibold">
      <span className="relative z-10">
        {children}
      </span>

      <span
        data-doc-underline
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-[#B12025]"
      />
    </span>
  );
}

// ======================================================
// NATIVE FAQ DETAILS + GSAP HEIGHT ANIMATION
// Still works without JavaScript as native details.
// ======================================================

function FaqItem({
  faq,
  index,
}: {
  faq: (typeof faqs)[number];
  index: number;
}) {
  const details = useRef<HTMLDetailsElement>(null);
  const answer = useRef<HTMLDivElement>(null);

  const onSummary = (
    event: ReactMouseEvent<HTMLElement>
  ) => {
    const panel = details.current;
    const body = answer.current;

    if (
      !panel ||
      !body ||
      window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches
    ) {
      return;
    }

    event.preventDefault();

    gsap.killTweensOf(body);

    if (!panel.open) {
      panel.open = true;

      gsap.fromTo(
        body,
        {
          height: 0,
          opacity: 0,
        },
        {
          height: body.scrollHeight,
          opacity: 1,
          duration: 0.42,
          ease: 'power3.out',
          onComplete: () =>
            gsap.set(body, {
              clearProps: 'height,opacity',
            }),
        }
      );
    } else {
      gsap.fromTo(
        body,
        {
          height: body.offsetHeight,
          opacity: 1,
        },
        {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.inOut',
          onComplete: () => {
            panel.open = false;

            gsap.set(body, {
              clearProps: 'height,opacity',
            });
          },
        }
      );
    }
  };

  return (
    <details
      ref={details}
      className="group border-b border-[#17191C]/10"
      open={index === 0}
    >
      <summary
        onClick={onSummary}
        className="flex cursor-pointer list-none items-start justify-between gap-4 py-6 marker:hidden [&::-webkit-details-marker]:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B12025]"
      >
        <span>
          <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[.18em] text-[#B12025]">
            {faq.tag}
          </span>

          <span className="text-[17px] font-semibold tracking-[-.03em] text-[#17191C] sm:text-[20px]">
            {faq.q}
          </span>
        </span>

        <span className="mt-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#B12025]/20 text-[#B12025]">
          <Plus
            className="transition-transform duration-300 group-open:rotate-45"
            size={17}
          />
        </span>
      </summary>

      <div ref={answer} className="overflow-hidden">
        <p className="max-w-[720px] pb-6 pr-10 text-[14px] leading-[1.9] text-[#17191C]/70">
          {faq.a}
        </p>

        {index === 3 && (
          <p className="mb-6 max-w-[410px] text-[11px] text-[#B12025]">
            Illustrative timing reference:
            10,000 pages → 3–4 weeks.
            Confirm scope before quoting.
          </p>
        )}
      </div>
    </details>
  );
}

// ======================================================
// COMPLETE DOCUMENT PROCESSING PAGE
// ======================================================

export default function DocumentProcessingPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const scannerRef = useRef<HTMLDivElement>(null);
  const pipelineRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const [docIndex, setDocIndex] = useState(1);
  const [filename, setFilename] = useState('');
  const [activeStage, setActiveStage] = useState(0);
  const [search, setSearch] = useState('');

  const selected = documentTypes[docIndex];

  const matches = records.filter((record) =>
    `${record.id} ${record.name} ${record.date} ${record.kind} ${record.tags}`
      .toLowerCase()
      .includes(search.trim().toLowerCase())
  );

 
  // ====================================================
  // FILENAME TYPING ANIMATION
  // ====================================================

  useEffect(() => {
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (reduced) {
      setFilename(selected.file);
      return;
    }

    const progress = { count: 0 };

    setFilename('');

    const tween = gsap.to(progress, {
      count: selected.file.length,
      duration: 0.95,
      ease: 'none',

      onUpdate: () => {
        setFilename(
          selected.file.slice(
            0,
            Math.floor(progress.count)
          )
        );
      },

      onComplete: () => {
        setFilename(selected.file);
      },
    });

    // FIX: React cleanup must return void
    return () => {
      tween.kill();
    };
  }, [selected.file]);


  // ====================================================
  // MAIN GSAP ANIMATIONS
  // ====================================================

  useEffect(() => {
    const root = rootRef.current;

    if (!root) return;

    const mm = gsap.matchMedia();

    mm.add(
      '(prefers-reduced-motion: no-preference)',
      () => {
        const ctx = gsap.context(() => {
          // ------------------------------------------
          // MASKED H1 RISE
          // ------------------------------------------

          gsap.from('[data-doc-h1]', {
            yPercent: 105,
            opacity: 0,
            duration: 1.05,
            stagger: 0.12,
            ease: 'power4.out',
          });

          gsap.from('[data-doc-intro]', {
            y: 23,
            opacity: 0,
            delay: 0.34,
            stagger: 0.12,
            duration: 0.75,
            ease: 'power3.out',
          });

          // ------------------------------------------
          // RED UNDERLINE DRAW
          // ------------------------------------------

          gsap.fromTo(
            '[data-doc-underline]',
            {
              scaleX: 0,
            },
            {
              scaleX: 1,
              transformOrigin: 'left',
              duration: 0.8,
              delay: 0.65,
              ease: 'power3.out',
              stagger: 0.12,
            }
          );

          // ------------------------------------------
          // MESSY PAPER TO ORDERED DOCUMENTS
          // ------------------------------------------

          gsap.fromTo(
            '[data-doc-paper]',
            {
              x: (i: number) =>
                [-65, 64, -44, 78][i % 4],

              y: (i: number) =>
                [-45, 44, 53, -36][i % 4],

              rotate: (i: number) =>
                [-9, 11, -7, 8][i % 4],
            },
            {
              x: 0,
              y: 0,
              rotate: 0,
              ease: 'none',

              scrollTrigger: {
                trigger: heroRef.current,
                start: 'top top',
                end: 'bottom 38%',
                scrub: 0.65,
              },
            }
          );

          // ------------------------------------------
          // LOOPING RED SCANNER
          // PAUSES WHEN HERO IS OFFSCREEN
          // ------------------------------------------

          const scanner = gsap.fromTo(
            scannerRef.current,
            {
              y: 0,
              opacity: 0,
            },
            {
              y: 300,
              opacity: 1,
              duration: 2.5,
              ease: 'none',
              repeat: -1,
              repeatDelay: 0.5,
              paused: true,
            }
          );

          ScrollTrigger.create({
            trigger: heroRef.current,
            start: 'top bottom',
            end: 'bottom top',
            onEnter: () => scanner.play(),
            onEnterBack: () => scanner.play(),
            onLeave: () => scanner.pause(),
            onLeaveBack: () => scanner.pause(),
          });

          // ------------------------------------------
          // SCROLL REVEAL
          // ------------------------------------------

          gsap.utils
            .toArray<HTMLElement>(
              '[data-doc-reveal]'
            )
            .forEach((element) => {
              gsap.from(element, {
                y: 28,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',

                scrollTrigger: {
                  trigger: element,
                  start: 'top 89%',
                  once: true,
                },
              });
            });

          // ------------------------------------------
          // PIPELINE — UPDATE ACTIVE STAGE
          // ------------------------------------------

          gsap.utils
            .toArray<HTMLElement>(
              '[data-doc-pipeline-item]'
            )
            .forEach((element, index) => {
              ScrollTrigger.create({
                trigger: element,
                start: 'top 59%',
                end: 'bottom 45%',

                onEnter: () => {
                  setActiveStage(index);
                },

                onEnterBack: () => {
                  setActiveStage(index);
                },
              });
            });

          // ------------------------------------------
          // REPORT CARD STAGGER
          // ------------------------------------------

          gsap.from('[data-doc-report]', {
            opacity: 0,
            y: 30,
            stagger: 0.1,
            duration: 0.65,
            ease: 'power3.out',

            scrollTrigger: {
              trigger: '#doc-report',
              start: 'top 80%',
              once: true,
            },
          });

          // REPORT BAR CHART

          gsap.fromTo(
            '[data-doc-bar]',
            {
              scaleY: 0,
            },
            {
              scaleY: 1,
              duration: 0.85,
              stagger: 0.1,
              transformOrigin: 'bottom',

              scrollTrigger: {
                trigger: '#doc-report-chart',
                start: 'top 85%',
                once: true,
              },
            }
          );

          // ACCURACY RING

          gsap.fromTo(
            '[data-doc-ring]',
            {
              strokeDashoffset: 283,
            },
            {
              strokeDashoffset: 283 * 0.02,
              duration: 1.5,
              ease: 'power2.out',

              scrollTrigger: {
                trigger: '#doc-report',
                start: 'top 80%',
                once: true,
              },
            }
          );

          // ------------------------------------------
          // COUNT-UP STATISTICS
          // ------------------------------------------

          gsap.utils
            .toArray<HTMLElement>(
              '[data-doc-count]'
            )
            .forEach((element) => {
              const number = { value: 0 };

              gsap.to(number, {
                value: Number(
                  element.dataset.docCount
                ),

                duration: 1.65,
                ease: 'power2.out',

                scrollTrigger: {
                  trigger: element,
                  start: 'top 92%',
                  once: true,
                },

                onUpdate: () => {
                  element.textContent = String(
                    Math.round(number.value)
                  );
                },
              });
            });

          // ------------------------------------------
          // TESTIMONIAL LINE REVEAL
          // ------------------------------------------

          gsap.from(
            '[data-doc-quote-line]',
            {
              yPercent: 70,
              opacity: 0,
              duration: 0.9,
              stagger: 0.16,
              ease: 'power3.out',

              scrollTrigger: {
                trigger: quoteRef.current,
                start: 'top 72%',
                once: true,
              },
            }
          );

          // ------------------------------------------
          // RELATED SERVICE LINKS
          // ------------------------------------------

          gsap.from(
            '[data-doc-related]',
            {
              x: -30,
              opacity: 0,
              duration: 0.55,
              stagger: 0.09,
              ease: 'power3.out',

              scrollTrigger: {
                trigger: '#doc-related',
                start: 'top 85%',
                once: true,
              },
            }
          );

          // ------------------------------------------
          // PROCESS LINE DRAWS ON SCROLL
          // ------------------------------------------

          gsap.fromTo(
            timelineRef.current,
            {
              scaleX: 0,
            },
            {
              scaleX: 1,
              transformOrigin: 'left',
              ease: 'none',

              scrollTrigger: {
                trigger: '#doc-process',
                start: 'top 70%',
                end: 'bottom 58%',
                scrub: true,
              },
            }
          );
        }, root);

        return () => ctx.revert();
      }
    );

    // ==================================================
    // MAGNETIC CTA — DESKTOP POINTERS ONLY
    // ==================================================

    const button = root.querySelector<HTMLElement>(
      '[data-doc-magnetic]'
    );

    const enableMagnetic = window.matchMedia(
      '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)'
    ).matches;

    const onMove = (event: MouseEvent) => {
      if (!button) return;

      const rect =
        button.getBoundingClientRect();

      gsap.to(button, {
        x:
          (event.clientX -
            rect.left -
            rect.width / 2) *
          0.13,

        y:
          (event.clientY -
            rect.top -
            rect.height / 2) *
          0.13,

        duration: 0.25,
        ease: 'power2.out',
        overwrite: true,
      });
    };

    const onLeave = () => {
      if (button) {
        gsap.to(button, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)',
        });
      }
    };

    if (enableMagnetic && button) {
      button.addEventListener(
        'mousemove',
        onMove
      );

      button.addEventListener(
        'mouseleave',
        onLeave
      );
    }

    return () => {
      button?.removeEventListener(
        'mousemove',
        onMove
      );

      button?.removeEventListener(
        'mouseleave',
        onLeave
      );

      gsap.killTweensOf(button);

      mm.revert();
    };
  }, []);

  // ====================================================
  // FAQ JSON-LD
  // ====================================================

  const faqJson = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',

    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,

      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  // ====================================================
  // RENDER PAGE
  // ====================================================

  return (
    <div
      ref={rootRef}
      className="overflow-x-clip bg-white font-sans text-[#17191C]"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJson).replace(
            /</g,
            '\\u003c'
          ),
        }}
      />

      {/* =================================================
          01 — HERO: PAPER IN, SEARCHABLE RECORD OUT
      ================================================= */}

      <section
        ref={heroRef}
        className="relative overflow-hidden bg-white px-5 pb-24 pt-[150px] sm:px-8 lg:px-14 lg:pb-32 lg:pt-[175px]"
      >
        <div className="mx-auto grid max-w-[1420px] items-center gap-14 lg:grid-cols-[1.08fr_.92fr]">
          {/* HERO TEXT */}

          <div>
            <p
              data-doc-intro
              className="text-[12px] text-[#17191C]/50"
            >
              Services / BPO &amp; Back Office /
              Document processing
            </p>

            <p
              data-doc-intro
              className="mt-8 text-[11px] font-semibold uppercase tracking-[.2em] text-[#B12025]"
            >
              Document processing services in Sri Lanka
            </p>

            {/* MASKED H1 */}

            <h1 className="mt-5 max-w-[770px] text-[clamp(2.55rem,5.1vw,5.4rem)] font-semibold leading-[1.07] tracking-[-.065em]">
              {[
                'Paper files and PDFs',
                'turned into organised',
                'records you can search.',
              ].map((line) => (
                <span
                  key={line}
                  className="block overflow-hidden pb-[.12em]"
                >
                  <span
                    data-doc-h1
                    className="block"
                  >
                    {line}
                  </span>
                </span>
              ))}
            </h1>

            <p
              data-doc-intro
              className="mt-7 max-w-[640px] text-[15px] leading-[1.9] text-[#17191C]/70"
            >
              FirstNotch digitises your paper files
              and organises your PDFs. Each document
              is scanned or imported, named and
              checked before it is stored in your
              system. Businesses use the service
              for{' '}
              <DrawUnderline>
                contracts, invoices, application
                forms, delivery notes and staff files.
              </DrawUnderline>
            </p>

            <div
              data-doc-intro
              className="mt-8 flex flex-wrap gap-3"
            >
              <a
                href="#contact"
                data-doc-magnetic
                className="inline-flex min-h-[52px] items-center gap-3 rounded-full bg-[#B12025] px-6 text-[12px] font-semibold text-white transition hover:bg-[#941A1F]"
              >
                Book a free discovery call

                <ArrowUpRight size={16} />
              </a>

              <a
                href="#doc-pipeline"
                className="inline-flex min-h-[52px] items-center gap-2 rounded-full border border-[#B12025]/25 px-6 text-[12px] font-semibold text-[#B12025] transition hover:border-[#B12025] hover:bg-[#FFF4F4]"
              >
                See what is included

                <ArrowDown size={16} />
              </a>
            </div>
          </div>

          {/* SCANNER VISUAL */}

          <div className="min-w-0 rounded-[28px] border border-[#B12025]/15 bg-[#F4F4F5] p-4 shadow-[0_30px_90px_rgba(23,25,28,.07)] sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-[11px] font-semibold uppercase tracking-[.13em] text-[#B12025]">
                Paper → searchable record
              </span>

              <span className="rounded-full bg-white px-3 py-1 text-[10px] text-[#17191C]/60">
                Example documents
              </span>
            </div>

            {/* PAPER DOCUMENTS */}

            <div className="relative mt-5 overflow-hidden rounded-[18px] border border-[#17191C]/10 bg-white p-4 sm:p-6">
              <div className="grid grid-cols-2 gap-3">
                {documentTypes
                  .slice(0, 4)
                  .map((doc) => (
                    <div
                      data-doc-paper
                      key={doc.label}
                      className="relative min-h-[105px] rounded-[12px] border border-[#17191C]/10 bg-[#FAFAFB] p-3 shadow-sm"
                    >
                      <doc.icon
                        size={21}
                        className="text-[#B12025]"
                      />

                      <p className="mt-3 text-[11px] font-semibold">
                        {doc.label}
                      </p>

                      <div className="mt-3 h-1 w-full rounded-full bg-[#E6E7E9]" />

                      <div className="mt-2 h-1 w-3/5 rounded-full bg-[#E6E7E9]" />
                    </div>
                  ))}
              </div>

              {/* ANIMATED SCAN LINE */}

              <div
                ref={scannerRef}
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-3 top-3 z-10 h-[2px] bg-[#B12025] shadow-[0_0_14px_4px_rgba(177,32,37,.19)]"
              />
            </div>

            {/* DOCUMENT SELECTOR */}

            <div
              className="mt-5 flex flex-wrap gap-2"
              role="group"
              aria-label="Preview a document type"
            >
              {documentTypes.map((doc, i) => (
                <button
                  key={doc.label}
                  type="button"
                  aria-pressed={docIndex === i}
                  onClick={() => setDocIndex(i)}
                  className={`rounded-full border px-3 py-2 text-[10px] font-semibold transition focus-visible:outline-2 focus-visible:outline-[#B12025] ${
                    docIndex === i
                      ? 'border-[#B12025] bg-[#B12025] text-white'
                      : 'border-[#B12025]/20 bg-white text-[#17191C] hover:border-[#B12025]'
                  }`}
                >
                  {doc.label}
                </button>
              ))}
            </div>

            {/* EXTRACTED RECORD */}

            <div className="mt-4 rounded-[16px] border border-[#B12025]/15 bg-white p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[11px] font-semibold text-[#B12025]">
                  Extracted record
                </span>

                <CheckCircle2
                  size={18}
                  className="text-[#B12025]"
                />
              </div>

              <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-3 text-[11px]">
                {[
                  ['Reference', selected.number],
                  ['Date', selected.date],
                  ['Name', selected.name],
                  ['Type', selected.amount],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-[#17191C]/45">
                      {label}
                    </dt>

                    <dd className="mt-1 font-semibold">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>

              <p
                className="mt-4 break-all rounded-[8px] bg-[#FFF4F4] p-3 font-mono text-[10px] text-[#B12025]"
                aria-label={`Example filename ${selected.file}`}
              >
                {filename}

                <span
                  aria-hidden="true"
                  className="ml-0.5 animate-pulse"
                >
                  |
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          02 — EIGHT-STAGE DOCUMENT PIPELINE
      ================================================= */}

      <section
        id="doc-pipeline"
        ref={pipelineRef}
        className="scroll-mt-[96px] bg-[#17191C] px-5 py-24 text-white sm:px-8 lg:px-14 lg:py-32"
      >
        <div className="mx-auto max-w-[1420px]">
          <p
            data-doc-reveal
            className="text-[11px] font-semibold uppercase tracking-[.19em] text-white/65"
          >
            What the service includes
          </p>

          <h2
            data-doc-reveal
            className="mt-4 max-w-[950px] text-[clamp(2.45rem,4.8vw,5rem)] font-semibold leading-[1.08] tracking-[-.065em]"
          >
            Eight steps. One searchable record
            <span className="text-[#EF7376]">.</span>
          </h2>

          <div className="mt-14 grid gap-10 lg:grid-cols-[.88fr_1.12fr] lg:gap-20">
            {/* STICKY DOCUMENT PREVIEW */}

            <div className="self-start lg:sticky lg:top-[115px]">
              <div className="overflow-hidden rounded-[25px] border border-white/15 bg-[#26292C] p-5 sm:p-7">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[11px] font-semibold tracking-[.14em] text-white/70">
                    DOCUMENT / PREVIEW
                  </span>

                  <span className="rounded-full bg-[#B12025] px-3 py-1 text-[10px] font-semibold text-white">
                    {stages[activeStage].tag}
                  </span>
                </div>

                {/* DOCUMENT PAPER */}

                <div className="mt-6 rounded-[14px] bg-white p-5 text-[#17191C] sm:p-7">
                  <div className="flex items-center gap-3 text-[#B12025]">
                    <FileText size={28} />

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[.15em]">
                        Process record
                      </p>

                      <p className="font-mono text-[10px] text-[#17191C]/55">
                        INV-2026-0142.pdf
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    {[70, 95, 82, 67].map((w, i) => (
                      <div
                        key={i}
                        className="h-[7px] rounded-full bg-[#E6E7E9]"
                        style={{ width: `${w}%` }}
                      />
                    ))}
                  </div>

                  {/* EXTRACTED FIELDS */}

                  <div className="mt-7 grid grid-cols-2 gap-3">
                    {[
                      'Name: Acme Ltd',
                      'Date: 12 Mar',
                      'Ref: INV-0142',
                      'Status: Reviewed',
                    ].map((text) => (
                      <span
                        key={text}
                        className={`rounded-md border p-2 text-[10px] transition-colors ${
                          activeStage >= 2
                            ? 'border-[#B12025]/25 bg-[#FFF5F5]'
                            : 'border-[#E6E7E9]'
                        }`}
                      >
                        {text}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center gap-2 border-t border-[#E6E7E9] pt-4 text-[11px] font-semibold text-[#B12025]">
                    <CheckCircle2 size={17} />

                    {stages[activeStage].demo}
                  </div>
                </div>

                <p className="mt-5 min-h-[48px] text-[13px] leading-[1.7] text-white/70">
                  {stages[activeStage].info}
                </p>

                {/* RED PROGRESS BAR */}

                <div className="mt-5 h-[3px] overflow-hidden rounded-full bg-white/15">
                  <div
                    className="h-full bg-[#EF7376] transition-[width] duration-500"
                    style={{
                      width: `${
                        ((activeStage + 1) /
                          stages.length) *
                        100
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* EIGHT PIPELINE CARDS */}

            <ol className="relative space-y-4 border-l border-white/15 pl-6 sm:pl-9">
              {stages.map((stage, i) => (
                <li
                  data-doc-pipeline-item
                  key={stage.title}
                  className={`relative scroll-mt-28 rounded-[20px] border p-6 transition-all duration-300 sm:p-8 ${
                    activeStage === i
                      ? 'border-[#EF7376]/50 bg-white/10'
                      : 'border-white/10 bg-[#222426]'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute -left-[31px] top-9 h-[12px] w-[12px] rounded-full border-2 sm:-left-[43px] ${
                      activeStage >= i
                        ? 'border-[#EF7376] bg-[#B12025]'
                        : 'border-white/25 bg-[#17191C]'
                    }`}
                  />

                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[11px] font-semibold tracking-[.18em] text-white/55">
                      {String(i + 1).padStart(2, '0')}
                      {' / 08'}
                    </span>

                    <stage.Icon
                      size={23}
                      className="text-[#EF7376]"
                    />
                  </div>

                  <h3 className="mt-4 text-[22px] font-semibold tracking-[-.035em] sm:text-[26px]">
                    {stage.title}
                  </h3>

                  <p className="mt-3 max-w-[590px] text-[14px] leading-[1.9] text-white/70">
                    {stage.text}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* =================================================
          03 — INTERACTIVE DOCUMENT SEARCH
      ================================================= */}

      <section
        id="doc-search"
        className="bg-white px-5 py-24 sm:px-8 lg:px-14 lg:py-32"
      >
        <div className="mx-auto max-w-[1420px]">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p
                data-doc-reveal
                className="text-[11px] font-semibold uppercase tracking-[.2em] text-[#B12025]"
              >
                Interactive example
              </p>

              <h2
                data-doc-reveal
                className="mt-4 text-[clamp(2.4rem,4.5vw,4.8rem)] font-semibold leading-[1.1] tracking-[-.06em]"
              >
                Search your documents
                <span className="text-[#B12025]">.</span>
              </h2>
            </div>

            <span className="rounded-full border border-[#B12025]/20 px-4 py-2 text-[11px] text-[#B12025]">
              EXAMPLE DATA · No live records
            </span>
          </div>

          <p
            data-doc-reveal
            className="mt-5 max-w-[700px] text-[14px] leading-[1.9] text-[#17191C]/65"
          >
            Search by name, date or reference number.
            Matching records stay clear while
            the others fade back.
          </p>

          {/* SEARCH INPUT */}

          <div className="mt-9 flex min-h-[58px] items-center gap-3 rounded-[16px] border border-[#B12025]/25 bg-[#FAFAFA] px-5 focus-within:ring-2 focus-within:ring-[#B12025]/25">
            <Search
              size={20}
              className="shrink-0 text-[#B12025]"
            />

            <input
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Try Invoice 0142, March 2026, missing signature..."
              aria-label="Search example documents"
              className="min-w-0 flex-1 bg-transparent text-[14px] outline-none placeholder:text-[#17191C]/45"
            />

            {search && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => setSearch('')}
                className="text-[#B12025]"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* SEARCH CHIPS */}

          <div className="mt-4 flex flex-wrap gap-2">
            {[
              'Invoice 0142',
              'March 2026',
              'missing signature',
            ].map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => setSearch(chip)}
                className="rounded-full border border-[#B12025]/20 px-4 py-2 text-[11px] font-medium text-[#B12025] transition hover:bg-[#FFF2F2]"
              >
                {chip}
              </button>
            ))}
          </div>

          <p
            role="status"
            className="mt-6 text-[12px] text-[#17191C]/55"
          >
            {search
              ? `${matches.length} matching example ${
                  matches.length === 1
                    ? 'record'
                    : 'records'
                }`
              : '6 illustrative records'}
          </p>

          {/* SEARCHABLE CARDS */}

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {records.map((record) => {
              const match = matches.some(
                (item) => item.id === record.id
              );

              return (
                <article
                  key={record.id}
                  className={`rounded-[19px] border bg-white p-5 shadow-sm transition-[opacity,transform,filter,border-color,box-shadow] duration-300 ${
                    match
                      ? 'border-[#B12025]/40 shadow-[0_14px_38px_rgba(177,32,37,.08)]'
                      : 'scale-[.97] border-[#17191C]/10 opacity-25 blur-[2px]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <record.icon
                      size={28}
                      className="text-[#B12025]"
                    />

                    <span className="rounded-full bg-[#FFF1F1] px-3 py-1 text-[10px] font-semibold text-[#B12025]">
                      {record.kind}
                    </span>
                  </div>

                  <p className="mt-6 text-[17px] font-semibold">
                    {record.name}
                  </p>

                  <p className="mt-2 font-mono text-[11px] text-[#17191C]/55">
                    {record.id} · {record.date}
                  </p>

                  <p className="mt-5 flex items-center gap-2 text-[11px] text-[#B12025]">
                    <Search size={13} />

                    Searchable record
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* =================================================
          04 — MONTHLY REPORT
      ================================================= */}

      <section
        id="doc-report"
        className="bg-[#F4F4F5] px-5 py-24 sm:px-8 lg:px-14 lg:py-32"
      >
        <div className="mx-auto max-w-[1420px]">
          <p
            data-doc-reveal
            className="text-[11px] font-semibold uppercase tracking-[.2em] text-[#B12025]"
          >
            What you can measure
          </p>

          <h2
            data-doc-reveal
            className="mt-4 text-[clamp(2.5rem,4.7vw,4.9rem)] font-semibold leading-[1.1] tracking-[-.06em]"
          >
            The numbers you will see
            <span className="text-[#B12025]">.</span>
          </h2>

          <p
            data-doc-reveal
            className="mt-5 max-w-[750px] text-[14px] leading-[1.8] text-[#17191C]/65"
          >
            Each batch is measured on speed and on
            how closely the captured details match
            the original. Your monthly report
            covers both.
          </p>

          {/* FIVE METRIC CARDS */}

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {report.map((metric, i) => (
              <article
                data-doc-report
                key={metric.title}
                className={`group relative overflow-hidden rounded-[20px] border border-[#17191C]/10 bg-white p-6 transition hover:-translate-y-1 hover:border-[#B12025]/45 hover:shadow-[0_18px_45px_rgba(23,25,28,.08)] ${
                  i === 4 ? 'lg:col-span-4' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <metric.Icon
                    size={24}
                    className="text-[#B12025]"
                  />

                  <span className="text-[10px] text-[#17191C]/40">
                    0{i + 1}
                  </span>
                </div>

                <h3 className="mt-5 text-[19px] font-semibold tracking-[-.03em]">
                  {metric.title}
                </h3>

                <p className="mt-3 max-w-[630px] text-[13px] leading-[1.8] text-[#17191C]/65">
                  {metric.description}
                </p>

                <p className="mt-5 border-t border-[#B12025]/15 pt-3 text-[11px] font-medium text-[#B12025]">
                  {metric.note}
                </p>
              </article>
            ))}
          </div>

          {/* LIVE DASHBOARD PREVIEW */}

          <div
            id="doc-report-chart"
            className="mt-5 grid gap-6 rounded-[22px] border border-[#17191C]/10 bg-white p-6 sm:p-8 lg:grid-cols-[.8fr_1.2fr]"
          >
            <div>
              <span className="rounded-full bg-[#FFF1F1] px-3 py-1 text-[10px] font-semibold text-[#B12025]">
                SAMPLE REPORT
              </span>

              <h3 className="mt-5 text-[24px] font-semibold tracking-[-.04em]">
                A clearer view of every batch.
              </h3>

              <p className="mt-3 text-[13px] leading-[1.8] text-[#17191C]/60">
                Illustrative dashboard only.
                Your actual volume, turnaround,
                flags and scores come from
                your own documents.
              </p>
            </div>

            <div className="grid grid-cols-[1fr_auto] items-center gap-6">
              <div>
                <p className="text-[11px] font-semibold">
                  Documents by type · example
                </p>

                <div className="mt-4 flex h-[120px] items-end gap-4 border-b border-[#17191C]/10">
                  {[45, 83, 58, 95, 71].map(
                    (height, i) => (
                      <div
                        key={i}
                        data-doc-bar
                        className="flex-1 origin-bottom rounded-t-[7px] bg-[#B12025]/75"
                        style={{
                          height: `${height}%`,
                        }}
                      />
                    )
                  )}
                </div>

                <p className="mt-2 text-[10px] text-[#17191C]/50">
                  Five sample categories
                </p>
              </div>

              <div className="text-center">
                <svg
                  className="mx-auto h-[75px] w-[75px] -rotate-90"
                  viewBox="0 0 110 110"
                  aria-hidden="true"
                >
                  <circle
                    cx="55"
                    cy="55"
                    r="45"
                    fill="none"
                    stroke="#E6E7E9"
                    strokeWidth="8"
                  />

                  <circle
                    data-doc-ring
                    cx="55"
                    cy="55"
                    r="45"
                    fill="none"
                    stroke={RED}
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray="283"
                    strokeDashoffset="283"
                  />
                </svg>

                <p className="mt-1 text-[10px] text-[#17191C]/55">
                  Ring illustration
                </p>
              </div>
            </div>
          </div>

          {/* BUSINESS STATISTICS */}

          <div className="mt-10 grid grid-cols-2 gap-7 border-t border-[#17191C]/10 pt-9 sm:grid-cols-3">
            <div>
              <p className="text-[clamp(2.5rem,4vw,4.5rem)] font-semibold leading-none tracking-[-.06em] text-[#B12025]">
                <span data-doc-count="85">85</span>%
              </p>

              <p className="mt-3 text-[12px] text-[#17191C]/60">
                client retention rate
              </p>
            </div>

            <div>
              <p className="text-[clamp(2.5rem,4vw,4.5rem)] font-semibold leading-none tracking-[-.06em] text-[#B12025]">
                <span data-doc-count="98">98</span>%
              </p>

              <p className="mt-3 text-[12px] text-[#17191C]/60">
                accuracy rate
              </p>
            </div>

            <div>
              <p className="text-[clamp(2.1rem,3.7vw,4.2rem)] font-semibold leading-none tracking-[-.06em] text-[#B12025]">
                <span data-doc-count="15">15</span>
                –
                <span data-doc-count="20">20</span>%
              </p>

              <Link
                href="/how-we-hire"
                className="mt-3 inline-flex items-center gap-1 text-[12px] text-[#B12025] hover:underline"
              >
                of applicants pass hiring checks

                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          05 — PRIVATE SCHOOL TESTIMONIAL
      ================================================= */}

      <section
        ref={quoteRef}
        className="relative overflow-hidden bg-[#17191C] px-5 py-28 text-white sm:px-8 lg:px-14 lg:py-40"
      >
        <div
          className="pointer-events-none absolute -right-12 top-6 text-[270px] font-bold leading-none text-[#B12025]/15"
          aria-hidden="true"
        >
          “
        </div>

        <div className="relative mx-auto max-w-[1120px]">
          <p className="text-[11px] font-semibold uppercase tracking-[.2em] text-white/55">
            A private school / Client experience
          </p>

          <blockquote className="mt-9 text-[clamp(2rem,4.3vw,4.8rem)] font-semibold leading-[1.28] tracking-[-.056em]">
            {[
              '“Student records and enrolment forms used to be kept in boxes.',
              'Now every file is scanned, named and easy to find',
              'when parents or inspectors ask.”',
            ].map((line) => (
              <span
                key={line}
                className="block overflow-hidden pb-[.11em]"
              >
                <span
                  data-doc-quote-line
                  className="block"
                >
                  {line}
                </span>
              </span>
            ))}
          </blockquote>

          <p className="mt-7 text-[12px] font-semibold uppercase tracking-[.17em] text-[#EF9A9C]">
            Private school
          </p>
        </div>
      </section>

      {/* =================================================
          06 — FAQ AND RELATED SERVICES
      ================================================= */}

      <section className="bg-white px-5 py-24 sm:px-8 lg:px-14 lg:py-32">
        <div className="mx-auto grid max-w-[1420px] gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
          <div className="self-start lg:sticky lg:top-[115px]">
            <p
              data-doc-reveal
              className="text-[11px] font-semibold uppercase tracking-[.19em] text-[#B12025]"
            >
              Questions answered
            </p>

            <h2
              data-doc-reveal
              className="mt-4 max-w-[450px] text-[clamp(2.45rem,4.5vw,4.7rem)] font-semibold leading-[1.1] tracking-[-.06em]"
            >
              Common questions about document processing
              <span className="text-[#B12025]">.</span>
            </h2>
          </div>

          <div className="border-t border-[#17191C]/10">
            {faqs.map((faq, index) => (
              <FaqItem
                key={faq.q}
                faq={faq}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* RELATED SERVICES */}

        <div
          id="doc-related"
          className="mx-auto mt-28 max-w-[1420px]"
        >
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-[clamp(2rem,3.4vw,3.4rem)] font-semibold leading-[1.1] tracking-[-.05em]">
              Other BPO and back office services
            </h2>

            <Link
              href={BASE}
              className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#B12025] hover:underline"
            >
              See all services

              <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <Link
                data-doc-related
                href={`${BASE}/${item.slug}`}
                key={item.slug}
                className="group overflow-hidden rounded-[15px] border border-[#17191C]/10 bg-[#F7F7F8] p-5 transition hover:border-[#B12025]/50 hover:bg-white"
              >
                <span className="flex items-center justify-between gap-3 text-[14px] font-semibold">
                  {item.title}

                  <ArrowRight
                    size={17}
                    className="shrink-0 text-[#B12025] transition group-hover:translate-x-1.5"
                  />
                </span>

                <span className="mt-2 block text-[12px] text-[#17191C]/60 opacity-100 transition lg:opacity-0 lg:group-hover:opacity-100">
                  {item.desc}
                </span>

                <span
                  aria-hidden="true"
                  className="mt-3 block h-[2px] w-full origin-left scale-x-0 bg-[#B12025] transition-transform duration-300 group-hover:scale-x-100"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================
          07 — FOUR-STEP SETUP PROCESS
      ================================================= */}

      <section
        id="doc-process"
        className="bg-[#F4F4F5] px-5 py-24 sm:px-8 lg:px-14 lg:py-32"
      >
        <div className="mx-auto max-w-[1420px]">
          <p
            data-doc-reveal
            className="text-[11px] font-semibold uppercase tracking-[.18em] text-[#B12025]"
          >
            How we work
          </p>

          <h2
            data-doc-reveal
            className="mt-4 text-[clamp(2.4rem,4.6vw,4.8rem)] font-semibold leading-[1.1] tracking-[-.06em]"
          >
            How your back office team is set up
            <span className="text-[#B12025]">.</span>
          </h2>

          <p
            data-doc-reveal
            className="mt-5 max-w-[730px] text-[14px] leading-[1.8] text-[#17191C]/65"
          >
            The biggest risk with outsourced admin
            is mistakes that reach your systems.
            These steps are there to stop that.
          </p>

          {/* DESKTOP HORIZONTAL / MOBILE VERTICAL */}

          <div className="relative mt-12">
            <div
              className="absolute inset-x-0 top-0 hidden h-[2px] bg-[#B12025]/15 lg:block"
              aria-hidden="true"
            />

            <div
              ref={timelineRef}
              aria-hidden="true"
              className="absolute inset-x-0 top-0 hidden h-[2px] origin-left bg-[#B12025] lg:block"
            />

            <ol className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-9">
              {setup.map((step) => (
                <li
                  key={step.number}
                  className="border-l-2 border-[#B12025]/35 pl-5 lg:border-l-0 lg:pl-0 lg:pt-7"
                >
                  <div className="flex items-center gap-3 text-[#B12025]">
                    <step.Icon size={23} />

                    <span className="text-[12px] font-bold">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mt-5 text-[21px] font-semibold tracking-[-.04em]">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-[13px] leading-[1.9] text-[#17191C]/65">
                    {step.text}
                  </p>

                  {step.number === '02' && (
                    <Link
                      href="/how-we-hire"
                      className="mt-4 inline-flex items-center gap-2 text-[12px] font-semibold text-[#B12025] hover:underline"
                    >
                      See how we hire

                      <ArrowUpRight size={15} />
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </div>

          {/* FINAL CTA */}

          <div className="mt-16 flex flex-wrap items-center justify-between gap-5 border-t border-[#17191C]/15 pt-7">
            <p className="text-[14px] text-[#17191C]/60">
              Ready to turn your document backlog
              into searchable records?
            </p>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#B12025] px-6 py-4 text-[12px] font-semibold text-white hover:bg-[#941A1F]"
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
