
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
  Activity,
  ArrowUpRight,
  Check,
  CheckCheck,
  CheckCircle2,
  CircleAlert,
  ClipboardCheck,
  Fingerprint,
  LockKeyhole,
  SearchCheck,
  ShieldCheck,
  SlidersHorizontal,
  Users,
} from 'lucide-react';

import { COPY, STANDARDS } from './content';

// ==========================================
// FIRSTNOTCH STANDARDS — COMPACT EDITION
//
// Brand Red: #B12025
// Background: White / Off-white
// Font: Inherits website Poppins
//
// No extra CSS file required.
// No additional Lenis provider required.
// ==========================================

// ==========================================
// MANUAL SIZE + ANIMATION SETTINGS
// ==========================================

const SETTINGS = {
  // Inner white containers
  // Change max-w-[350px] in the component
  // if you want a smaller/wider panel.

  // White container expansion heights
  checklistHeight: 198,
  trackerHeight: 258,
  qualityHeight: 258,
  securityHeight: 258,

  // Initial compact panel heights
  checklistClosed: 42,
  compactClosed: 62,

  // Animations
  expandDuration: 0.52,
  reverseSpeed: 1.55,
};

// Sample UI score — not a verified company metric.
const SAMPLE_QA = 94;

const CHART_BARS = [37, 61, 48, 78, 69, 89, 94];

const RING_CIRCUMFERENCE = 2 * Math.PI * 31;

// ==========================================
// CARD METADATA
// ==========================================

const CARD_META = [
  {
    label: '01 / CUSTOM WORKFLOWS',
    red: true,
  },
  {
    label: '02 / ACCOUNTABILITY',
    red: false,
  },
  {
    label: '03 / QUALITY ASSURANCE',
    red: false,
  },
  {
    label: '04 / DATA PROTECTION',
    red: true,
  },
] as const;

// ==========================================
// SHARED MINI PANEL HEADER
// ==========================================

function PanelHeader({
  icon,
  title,
  subtitle,
  status,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  status?: string;
}) {
  return (
    <div className="flex h-[62px] items-center justify-between gap-2 border-b border-[#17191C]/10 px-3 sm:px-4">
      <div className="flex min-w-0 items-center gap-2.5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#B12025]/10 text-[#B12025]">
          {icon}
        </span>

        <div className="min-w-0">
          <p className="truncate text-[11px] font-semibold text-[#17191C]">
            {title}
          </p>

          <p className="mt-0.5 truncate text-[9px] text-[#17191C]/45">
            {subtitle}
          </p>
        </div>
      </div>

      {status && (
        <span className="shrink-0 rounded-full bg-[#B12025]/10 px-2 py-1 text-[9px] font-semibold text-[#B12025]">
          {status}
        </span>
      )}
    </div>
  );
}

// ==========================================
// CARD 01 VISUAL — WORKFLOW STACK
//
// Top white panel always visible.
// Bottom checklist expands DOWNWARD.
// ==========================================

function WorkflowPreview() {
  return (
    <div className="w-full max-w-[350px]">
      {/* FIXED TOP PANEL */}
      <div className="flex h-[60px] items-center justify-between gap-2 rounded-[18px] bg-white px-3 shadow-[0_12px_30px_rgba(0,0,0,0.08)] sm:px-4">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#B12025]/10 text-[#B12025]">
            <SlidersHorizontal size={17} />
          </span>

          <div className="min-w-0">
            <p className="truncate text-[11px] font-semibold text-[#17191C]">
              Your team setup
            </p>

            <p className="mt-0.5 truncate text-[9px] text-[#17191C]/45">
              Built around your business
            </p>
          </div>
        </div>

        <span className="shrink-0 rounded-full bg-[#B12025]/10 px-2 py-1 text-[9px] font-semibold text-[#B12025]">
          Ready
        </span>
      </div>

      {/* DOWNWARD EXPANDING PANEL */}
      <div
        data-fns-expand
        className="mt-[6px] h-[198px] overflow-hidden rounded-[18px] bg-white text-[#17191C] shadow-[0_15px_35px_rgba(0,0,0,0.11)]"
      >
        <div className="flex h-[42px] items-center justify-between px-4">
          <p className="text-[12px] font-semibold">
            Let&apos;s get started
          </p>

          <span className="text-[9px] font-semibold text-[#B12025]">
            SETUP
          </span>
        </div>

        <div className="space-y-1 px-3">
          {[
            'Your tools',
            'Your scripts',
            'Your process',
          ].map((item, index) => (
            <div
              key={item}
              data-fns-step
              className="flex h-[33px] items-center gap-2 rounded-lg bg-[#F7F7F7] px-2.5"
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#B12025] text-white">
                <Check size={12} />
              </span>

              <span className="flex-1 text-[10px] font-medium">
                {item}
              </span>

              <span className="text-[9px] text-[#17191C]/35">
                0{index + 1}
              </span>
            </div>
          ))}
        </div>

        <div
          data-fns-footer
          className="mx-3 mt-2 flex h-[30px] items-center gap-2 rounded-lg bg-[#B12025]/[0.07] px-2.5 text-[10px] font-semibold text-[#B12025]"
        >
          <CheckCircle2 size={14} />
          Your workflow, our team
        </div>
      </div>
    </div>
  );
}

// ==========================================
// CARD 02 VISUAL — RESOLUTION TRACKER
//
// Vertical line draws through 3 steps.
// Icons pop and final status appears.
// ==========================================

function ResolutionPreview() {
  const steps = [
    {
      number: '01',
      title: 'Issue detected',
      detail: 'Performance monitored',
      Icon: CircleAlert,
    },
    {
      number: '02',
      title: 'Cause found',
      detail: 'Root cause identified',
      Icon: SearchCheck,
    },
    {
      number: '03',
      title: 'Fix applied',
      detail: 'Action communicated',
      Icon: CheckCircle2,
    },
  ];

  return (
    <div
      data-fns-expand
      className="relative h-[258px] w-full max-w-[350px] overflow-hidden rounded-[18px] bg-white text-[#17191C] shadow-[0_15px_40px_rgba(23,25,28,0.11)]"
    >
      <PanelHeader
        icon={<Activity size={17} />}
        title="Performance overview"
        subtitle="Resolution tracker"
        status="Monitored"
      />

      <div className="relative px-3 pt-2.5">
        {/* ANIMATED CONNECTOR LINE */}
        <div className="absolute bottom-7 left-[29px] top-5 w-[2px] bg-[#B12025]/10">
          <div
            data-fns-line
            className="h-full w-full origin-top bg-[#B12025]"
          />
        </div>

        <div className="space-y-1.5">
          {steps.map(({ number, title, detail, Icon }) => (
            <div
              key={number}
              data-fns-step
              className="relative flex h-[44px] items-center gap-2.5 rounded-lg bg-[#F7F7F7] px-2.5"
            >
              <span
                data-fns-icon
                className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#B12025]/20 bg-white text-[#B12025]"
              >
                <Icon size={15} />
              </span>

              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-semibold">
                  {title}
                </p>

                <p className="mt-0.5 truncate text-[9px] text-[#17191C]/45">
                  {detail}
                </p>
              </div>

              <span className="text-[9px] text-[#B12025]/70">
                {number}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div
        data-fns-footer
        className="mx-3 mt-2 flex h-[29px] items-center gap-2 rounded-lg bg-[#B12025] px-3 text-[10px] font-semibold text-white"
      >
        <CheckCheck size={15} />
        Resolution complete
      </div>
    </div>
  );
}

// ==========================================
// CARD 03 VISUAL — QUALITY COMMAND CENTRE
//
// Score ring draws, number counts up,
// chart bars animate one by one.
// ==========================================

function QualityPreview() {
  return (
    <div
      data-fns-expand
      className="h-[258px] w-full max-w-[350px] overflow-hidden rounded-[18px] bg-white text-[#17191C] shadow-[0_15px_40px_rgba(23,25,28,0.10)]"
    >
      <PanelHeader
        icon={<ClipboardCheck size={17} />}
        title="Quality dashboard"
        subtitle="Illustrative performance"
        status="QA"
      />

      {/* SCORE + RING */}
      <div
        data-fns-step
        className="flex h-[91px] items-center justify-between px-4"
      >
        <div>
          <p className="text-[9px] text-[#17191C]/45">
            Sample quality score
          </p>

          <span
            data-fns-score
            className="mt-1 block text-[37px] font-semibold leading-none tracking-[-0.06em] text-[#B12025]"
          >
            94%
          </span>
        </div>

        <svg
          viewBox="0 0 90 90"
          className="h-[70px] w-[70px] shrink-0"
          role="img"
          aria-label="Illustrative 94 percent QA score"
        >
          <circle
            cx="45"
            cy="45"
            r="31"
            fill="none"
            stroke="#B12025"
            strokeOpacity=".10"
            strokeWidth="7"
          />

          <circle
            data-fns-ring
            cx="45"
            cy="45"
            r="31"
            fill="none"
            stroke="#B12025"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={RING_CIRCUMFERENCE}
            strokeDashoffset={
              RING_CIRCUMFERENCE * 0.06
            }
            transform="rotate(-90 45 45)"
          />

          <path
            d="M33 47 L41 54 L58 36"
            fill="none"
            stroke="#B12025"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* BAR CHART */}
      <div
        data-fns-step
        className="mx-3 rounded-lg bg-[#F7F7F7] px-3 py-2"
      >
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold">
            Quality trend
          </p>

          <span className="text-[8px] text-[#17191C]/40">
            SAMPLE
          </span>
        </div>

        <div className="mt-1.5 flex h-[47px] items-end gap-2">
          {CHART_BARS.map((height, index) => (
            <div
              key={index}
              className="flex h-full flex-1 items-end"
            >
              <div
                data-fns-bar
                className="w-full origin-bottom rounded-t-[3px] bg-[#B12025]"
                style={{
                  height: `${height}%`,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div
        data-fns-footer
        className="mx-3 mt-2 flex items-center gap-2 text-[10px] font-semibold text-[#B12025]"
      >
        <CheckCircle2 size={15} />
        Monthly review and coaching
      </div>
    </div>
  );
}

// ==========================================
// CARD 04 VISUAL — SECURE ACCESS VAULT
//
// Permissions enter from opposite sides.
// Red scanning light moves through panel.
// Shield seal activates at the end.
// ==========================================

function SecurityPreview() {
  return (
    <div
      data-fns-expand
      className="relative h-[258px] w-full max-w-[350px] overflow-hidden rounded-[18px] bg-white text-[#17191C] shadow-[0_15px_40px_rgba(0,0,0,0.13)]"
    >
      <PanelHeader
        icon={<Fingerprint size={17} />}
        title="Access control"
        subtitle="Example security workflow"
        status="Secure"
      />

      <div className="relative px-3 pt-2.5">
        {/* SECURITY SCANNING LIGHT */}
        <div
          data-fns-scan
          aria-hidden="true"
          className="pointer-events-none absolute left-3 right-3 top-3 z-20 h-[2px] bg-[#B12025] opacity-0 shadow-[0_0_12px_2px_rgba(177,32,37,0.24)]"
        />

        {/* ACCESS PERMISSIONS */}
        <div className="space-y-1.5">
          {[
            {
              title: 'Team lead',
              subtitle: 'Role-based access',
              Icon: ShieldCheck,
            },
            {
              title: 'Team member',
              subtitle: 'Limited permissions',
              Icon: Users,
            },
          ].map(({ title, subtitle, Icon }) => (
            <div
              key={title}
              data-fns-step
              className="flex h-[45px] items-center gap-2.5 rounded-lg bg-[#F7F7F7] px-2.5"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#B12025]/10 text-[#B12025]">
                <Icon size={15} />
              </span>

              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-semibold">
                  {title}
                </p>

                <p className="mt-0.5 text-[9px] text-[#17191C]/45">
                  {subtitle}
                </p>
              </div>

              <CheckCircle2
                size={15}
                className="shrink-0 text-[#B12025]"
              />
            </div>
          ))}
        </div>

        {/* SHIELD CONFIRMATION */}
        <div
          data-fns-seal
          className="mt-2 flex h-[47px] items-center gap-2.5 rounded-lg bg-[#B12025]/[0.07] px-3"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[#B12025]">
            <ShieldCheck size={19} />
          </span>

          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold text-[#B12025]">
              Protected access
            </p>

            <p className="mt-0.5 text-[9px] text-[#17191C]/50">
              Permission-based workflow
            </p>
          </div>

          <LockKeyhole
            size={15}
            className="text-[#B12025]"
          />
        </div>

        <div
          data-fns-footer
          className="mt-2 flex items-center gap-2 border-t border-black/10 pt-2 text-[10px] font-semibold text-[#B12025]"
        >
          <Check size={14} />
          Confidentiality comes first
        </div>
      </div>
    </div>
  );
}

// ==========================================
// SINGLE ANIMATED FEATURE CARD
// ==========================================

type FeatureCardProps = {
  index: number;
  title: string;
  description: string;
};

function FeatureCard({
  index,
  title,
  description,
}: FeatureCardProps) {
  const cardRef = useRef<HTMLElement>(null);

  const config = CARD_META[index] ?? CARD_META[0];

  const red = config.red;

  // ========================================
  // UNIQUE GSAP TIMELINES FOR EACH CARD
  // ========================================

  useEffect(() => {
    const card = cardRef.current;

    if (!card) return;

    const media = gsap.matchMedia();

    media.add(
      '(min-width: 768px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
      () => {
        const panel = card.querySelector<HTMLElement>(
          '[data-fns-expand]'
        );

        if (!panel) return;

        const steps = Array.from(
          card.querySelectorAll<HTMLElement>(
            '[data-fns-step]'
          )
        );

        const footer = card.querySelector<HTMLElement>(
          '[data-fns-footer]'
        );

        const icons = Array.from(
          card.querySelectorAll<HTMLElement>(
            '[data-fns-icon]'
          )
        );

        const line = card.querySelector<HTMLElement>(
          '[data-fns-line]'
        );

        const bars = Array.from(
          card.querySelectorAll<HTMLElement>(
            '[data-fns-bar]'
          )
        );

        const score = card.querySelector<HTMLElement>(
          '[data-fns-score]'
        );

        const ring = card.querySelector<SVGCircleElement>(
          '[data-fns-ring]'
        );

        const scan = card.querySelector<HTMLElement>(
          '[data-fns-scan]'
        );

        const seal = card.querySelector<HTMLElement>(
          '[data-fns-seal]'
        );

        const counter = { value: 0 };

        let timeline: gsap.core.Timeline;

        // Use a GSAP context for reliable cleanup.
        const context = gsap.context(() => {
          const openHeight =
            index === 0
              ? SETTINGS.checklistHeight
              : index === 1
                ? SETTINGS.trackerHeight
                : index === 2
                  ? SETTINGS.qualityHeight
                  : SETTINGS.securityHeight;

          const closedHeight =
            index === 0
              ? SETTINGS.checklistClosed
              : SETTINGS.compactClosed;

          // Initial compact panel.
          gsap.set(panel, {
            height: closedHeight,
          });

          gsap.set(steps, {
            autoAlpha: 0,
            y: 16,
          });

          if (footer) {
            gsap.set(footer, {
              autoAlpha: 0,
              y: 12,
            });
          }

          // Base expansion timeline.
          timeline = gsap.timeline({
            paused: true,
            defaults: {
              ease: 'power3.out',
            },
          });

          timeline.to(
            panel,
            {
              height: openHeight,
              duration: SETTINGS.expandDuration,
              ease: 'power3.inOut',
            },
            0
          );

          // ==================================
          // CARD 01 — CASCADE CHECKLIST
          // ==================================

          if (index === 0) {
            steps.forEach((step, stepIndex) => {
              timeline.to(
                step,
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.30,
                },
                0.36 + stepIndex * 0.22
              );
            });

            if (footer) {
              timeline.to(
                footer,
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.38,
                },
                1.04
              );
            }
          }

          // ==================================
          // CARD 02 — CONNECTED RESOLUTION
          // ==================================

          if (index === 1) {
            if (line) {
              gsap.set(line, {
                scaleY: 0,
                transformOrigin: 'top center',
              });

              timeline.to(
                line,
                {
                  scaleY: 1,
                  duration: 0.85,
                  ease: 'power2.inOut',
                },
                0.47
              );
            }

            gsap.set(icons, {
              scale: 0.45,
            });

            steps.forEach((step, stepIndex) => {
              const position = 0.52 + stepIndex * 0.27;

              timeline.to(
                step,
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.33,
                },
                position
              );

              const icon = icons[stepIndex];

              if (icon) {
                timeline.to(
                  icon,
                  {
                    scale: 1,
                    duration: 0.34,
                    ease: 'back.out(1.6)',
                  },
                  position + 0.04
                );
              }
            });

            if (footer) {
              timeline.to(
                footer,
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.38,
                },
                1.40
              );
            }
          }

          // ==================================
          // CARD 03 — QA SCORE + CHART
          // ==================================

          if (index === 2) {
            gsap.set(bars, {
              scaleY: 0,
              transformOrigin: 'bottom center',
            });

            if (ring) {
              gsap.set(ring, {
                strokeDashoffset: RING_CIRCUMFERENCE,
              });
            }

            if (score) {
              score.textContent = '0%';
            }

            timeline.to(
              steps,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.4,
                stagger: 0.25,
              },
              0.38
            );

            timeline.to(
              counter,
              {
                value: SAMPLE_QA,
                duration: 0.9,
                ease: 'power2.out',
                onUpdate: () => {
                  if (score) {
                    score.textContent =
                      `${Math.round(counter.value)}%`;
                  }
                },
              },
              0.57
            );

            if (ring) {
              timeline.to(
                ring,
                {
                  strokeDashoffset:
                    RING_CIRCUMFERENCE *
                    (1 - SAMPLE_QA / 100),
                  duration: 0.95,
                },
                0.57
              );
            }

            timeline.to(
              bars,
              {
                scaleY: 1,
                stagger: 0.085,
                duration: 0.52,
              },
              0.93
            );

            if (footer) {
              timeline.to(
                footer,
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.35,
                },
                1.59
              );
            }
          }

          // ==================================
          // CARD 04 — SECURITY SCAN + SEAL
          // ==================================

          if (index === 3) {
            if (scan) {
              gsap.set(scan, {
                autoAlpha: 0,
                y: 0,
              });
            }

            if (seal) {
              gsap.set(seal, {
                autoAlpha: 0,
                scale: 0.86,
                y: 12,
                transformOrigin: 'center center',
              });
            }

            steps.forEach((step, stepIndex) => {
              timeline.fromTo(
                step,
                {
                  x: stepIndex === 0 ? -24 : 24,
                  y: 8,
                  autoAlpha: 0,
                },
                {
                  x: 0,
                  y: 0,
                  autoAlpha: 1,
                  duration: 0.44,
                },
                0.47 + stepIndex * 0.24
              );
            });

            if (scan) {
              timeline.to(
                scan,
                {
                  autoAlpha: 0.9,
                  duration: 0.14,
                },
                0.72
              );

              timeline.to(
                scan,
                {
                  y: 135,
                  duration: 0.82,
                  ease: 'none',
                },
                0.82
              );

              timeline.to(
                scan,
                {
                  autoAlpha: 0,
                  duration: 0.16,
                },
                1.64
              );
            }

            if (seal) {
              timeline.to(
                seal,
                {
                  autoAlpha: 1,
                  scale: 1,
                  y: 0,
                  duration: 0.48,
                  ease: 'back.out(1.5)',
                },
                1.35
              );
            }

            if (footer) {
              timeline.to(
                footer,
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.38,
                },
                1.78
              );
            }
          }
        }, card);

        // ==================================
        // MOUSE + KEYBOARD CONTROLS
        // ==================================

        const open = () => {
          timeline.timeScale(1).play();
        };

        const close = () => {
          timeline
            .timeScale(SETTINGS.reverseSpeed)
            .reverse();
        };

        const focusOut = (event: FocusEvent) => {
          const next = event.relatedTarget;

          if (
            !(next instanceof Node) ||
            !card.contains(next)
          ) {
            close();
          }
        };

        card.addEventListener('mouseenter', open);
        card.addEventListener('mouseleave', close);
        card.addEventListener('focusin', open);
        card.addEventListener('focusout', focusOut);

        return () => {
          card.removeEventListener('mouseenter', open);
          card.removeEventListener('mouseleave', close);
          card.removeEventListener('focusin', open);
          card.removeEventListener('focusout', focusOut);

          context.revert();

          if (score) {
            score.textContent = `${SAMPLE_QA}%`;
          }
        };
      }
    );

    return () => {
      media.revert();
    };
  }, [index]);

  // ========================================
  // RENDER CARD
  // ========================================

  return (
    <article
      ref={cardRef}
      data-standards-card
      tabIndex={0}
      aria-label={`${title}. Focus to preview the animated example.`}
      className={`
        group relative flex min-h-[520px] flex-col
        overflow-hidden rounded-[28px] border
        p-5 outline-none transition-shadow
        duration-300

        sm:min-h-[530px] sm:p-7
        lg:min-h-[535px] lg:p-8

        ${
          red
            ? 'border-[#B12025] bg-[#B12025] text-white'
            : 'border-[#17191C]/10 bg-[#F7F6F4] text-[#17191C]'
        }

        hover:shadow-[0_18px_45px_rgba(23,25,28,0.10)]
        focus-visible:ring-2
        focus-visible:ring-[#B12025]
        focus-visible:ring-offset-4
      `}
    >
      {/* ==================================
          ORIGINAL TITLE + DESCRIPTION
      ================================== */}

      <div className="relative z-10">
        <div className="mb-6 flex items-center justify-between gap-4">
          <span
            className={`text-[10px] font-semibold uppercase tracking-[0.15em] ${
              red
                ? 'text-white/85'
                : 'text-[#B12025]'
            }`}
          >
            {config.label}
          </span>

          <a
            href="#contact"
            aria-label={`Discuss ${title} with FirstNotch`}
            className={`
              flex h-9 w-9 shrink-0 items-center
              justify-center rounded-full border
              transition-colors
              focus-visible:outline-2
              focus-visible:outline-offset-4

              ${
                red
                  ? 'border-white/35 bg-white/10 hover:bg-white hover:text-[#B12025] focus-visible:outline-white'
                  : 'border-[#17191C]/15 bg-white hover:border-[#B12025] hover:bg-[#B12025] hover:text-white focus-visible:outline-[#B12025]'
              }
            `}
          >
            <ArrowUpRight size={17} />
          </a>
        </div>

        <h3 className="max-w-[470px] text-[clamp(1.65rem,2.5vw,2.15rem)] font-semibold leading-[1.13] tracking-[-0.05em]">
          {title}
        </h3>

        <p
          className={`mt-4 max-w-[450px] text-[12px] font-light leading-[1.75] sm:text-[13px] ${
            red
              ? 'text-white/85'
              : 'text-[#17191C]/65'
          }`}
        >
          {description}
        </p>
      </div>

      {/* ==================================
          COMPACT ANIMATION STAGE

          h-[264px] = reserved space
          mt-6 = 24px below description

          White panels are right-aligned.
          They will NOT push the outer card.
      ================================== */}

      <div className="relative z-10 mt-6 h-[264px] w-full shrink-0">

        <div className="ml-auto w-full max-w-[350px]">
          {index === 0 && <WorkflowPreview />}

          {index === 1 && <ResolutionPreview />}

          {index === 2 && <QualityPreview />}

          {index === 3 && <SecurityPreview />}
        </div>
      </div>
    </article>
  );
}

// ==========================================
// MAIN STANDARDS SECTION
// ==========================================

export default function StandardsShowcase() {
  const sectionRef = useRef<HTMLElement>(null);

  // ========================================
  // SCROLL ENTRANCE FOR THE FOUR CARDS
  // ========================================

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;

    if (!section) return;

    const media = gsap.matchMedia();

    media.add(
      '(prefers-reduced-motion: no-preference)',
      () => {
        const context = gsap.context(() => {
          const cards = section.querySelectorAll<HTMLElement>(
            '[data-standards-card]'
          );

          cards.forEach((card, index) => {
            gsap.fromTo(
              card,
              {
                autoAlpha: 0,
                y: 24,
              },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.72,
                delay: (index % 2) * 0.08,
                ease: 'power3.out',

                scrollTrigger: {
                  trigger: card,
                  start: 'top 92%',
                  once: true,
                },
              }
            );
          });
        }, section);

        return () => context.revert();
      }
    );

    return () => media.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="standards"
      aria-labelledby="fns-standards-title"
      className="relative scroll-mt-28 overflow-hidden bg-white px-5 py-20 text-[#17191C] sm:px-8 lg:px-12 lg:py-24"
    >
      {/* ==================================
          MAIN SECTION WIDTH ADJUSTMENT

          max-w-[1180px] = Current
          max-w-[1100px] = Smaller
          max-w-[1280px] = Wider
      ================================== */}

      <div className="mx-auto max-w-[1180px]">

        {/* SECTION TITLE */}
        <div className="mb-11">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#B12025]">
            THE FIRSTNOTCH STANDARD
          </p>

          <h2
            id="fns-standards-title"
            className="mt-5 max-w-[900px] text-[clamp(2.5rem,5vw,4.7rem)] font-semibold leading-[1.07] tracking-[-0.065em]"
          >
            {COPY.standardsTitle}
            <span className="text-[#B12025]">.</span>
          </h2>

          <p className="mt-4 max-w-[550px] text-[13px] font-light leading-7 text-[#17191C]/60">
            Your processes, your standards, and a team
            that works like it belongs in-house.
          </p>
        </div>

        {/* ==================================
            COMPACT 2 × 2 CARD GRID
        ================================== */}

        <div className="grid items-stretch gap-5 md:grid-cols-2">
          {STANDARDS.map(([title, body], index) => (
            <FeatureCard
              key={title}
              index={index}
              title={title}
              description={body}
            />
          ))}
        </div>

        {/* BOTTOM CTA */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-5 border-t border-[#17191C]/10 pt-7">
          <p className="text-[13px] text-[#17191C]/60">
            Your business processes. Our people.
            One clear standard.
          </p>

          <a
            href="#contact"
            className="group inline-flex items-center gap-3 rounded-full bg-[#B12025] px-6 py-3.5 text-[12px] font-semibold text-white transition-colors hover:bg-[#981B20] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B12025]"
          >
            Book a free discovery call

            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
