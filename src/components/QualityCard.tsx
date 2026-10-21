
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

import {
  ArrowUpRight,
  ChartNoAxesCombined,
  CheckCircle2,
  ClipboardCheck,
  TrendingUp,
} from 'lucide-react';

// ==========================================
// MANUAL ANIMATION SETTINGS
// ==========================================

const SETTINGS = {
  closedHeight: 82,
  openHeight: 340,
  expansionSpeed: 0.68,
  reverseSpeed: 1.45,

  // 94% is an illustrative UI score.
  sampleScore: 94,
};

const BARS = [37, 56, 46, 72, 64, 88, 94];

// SVG ring circumference: radius 36
const RING_LENGTH = 2 * Math.PI * 36;

type Props = {
  title: string;
  description: string;
};

export default function QualityCard({
  title,
  description,
}: Props) {
  const cardRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const scoreRef = useRef<HTMLSpanElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const panel = panelRef.current;
    const score = scoreRef.current;
    const ring = ringRef.current;

    if (!card || !panel || !score || !ring) return;

    const reveals = gsap.utils.toArray<HTMLElement>(
      panel.querySelectorAll('[data-qa-reveal]')
    );

    const bars = gsap.utils.toArray<HTMLElement>(
      panel.querySelectorAll('[data-qa-bar]')
    );

    const footer = panel.querySelector<HTMLElement>(
      '[data-qa-footer]'
    );

    const progress = panel.querySelector<HTMLElement>(
      '[data-qa-progress]'
    );

    const mm = gsap.matchMedia();

    mm.add(
      '(min-width: 768px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
      () => {
        const counter = { value: 0 };

        // INITIAL COMPACT DASHBOARD
        gsap.set(panel, {
          height: SETTINGS.closedHeight,
        });

        gsap.set(reveals, {
          autoAlpha: 0,
          y: 18,
        });

        gsap.set(bars, {
          scaleY: 0,
          transformOrigin: 'bottom center',
        });

        gsap.set(ring, {
          strokeDashoffset: RING_LENGTH,
        });

        gsap.set(footer, {
          autoAlpha: 0,
          y: 14,
        });

        if (progress) {
          gsap.set(progress, {
            scaleX: 0,
            transformOrigin: 'left center',
          });
        }

        score.textContent = '0%';

        // ==================================
        // HOVER TIMELINE
        // ==================================

        const tl = gsap.timeline({
          paused: true,
          defaults: {
            ease: 'power3.out',
          },
        });

        // 01 — EXPAND WHITE DASHBOARD
        tl.to(
          panel,
          {
            height: SETTINGS.openHeight,
            duration: SETTINGS.expansionSpeed,
            ease: 'power3.inOut',
          },
          0
        );

        // 02 — REVEAL QA CONTENT
        tl.to(
          reveals,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.16,
          },
          0.5
        );

        // 03 — COUNT FROM 0 TO 94
        tl.to(
          counter,
          {
            value: SETTINGS.sampleScore,
            duration: 0.95,
            ease: 'power2.out',
            onUpdate: () => {
              score.textContent =
                `${Math.round(counter.value)}%`;
            },
          },
          0.68
        );

        // 04 — DRAW THE CIRCULAR QA RING
        tl.to(
          ring,
          {
            strokeDashoffset:
              RING_LENGTH *
              (1 - SETTINGS.sampleScore / 100),
            duration: 0.95,
            ease: 'power2.out',
          },
          0.68
        );

        // 05 — CHART BARS ONE-BY-ONE
        tl.to(
          bars,
          {
            scaleY: 1,
            duration: 0.65,
            stagger: 0.1,
            ease: 'power3.out',
          },
          1.04
        );

        // 06 — PROGRESS METER
        if (progress) {
          tl.to(
            progress,
            {
              scaleX: 1,
              duration: 0.6,
            },
            1.55
          );
        }

        // 07 — FINAL REVIEW CONFIRMATION
        if (footer) {
          tl.to(
            footer,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.45,
            },
            1.85
          );
        }

        const open = () => {
          tl.timeScale(1).play();
        };

        const close = () => {
          tl.timeScale(SETTINGS.reverseSpeed).reverse();
        };

        const onFocusOut = (event: FocusEvent) => {
          const target = event.relatedTarget;

          if (
            !(target instanceof Node) ||
            !card.contains(target)
          ) {
            close();
          }
        };

        card.addEventListener('mouseenter', open);
        card.addEventListener('mouseleave', close);
        card.addEventListener('focusin', open);
        card.addEventListener('focusout', onFocusOut);

        return () => {
          card.removeEventListener('mouseenter', open);
          card.removeEventListener('mouseleave', close);
          card.removeEventListener('focusin', open);
          card.removeEventListener('focusout', onFocusOut);

          tl.kill();
          score.textContent =
            `${SETTINGS.sampleScore}%`;
        };
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <article
      ref={cardRef}
      data-standards-card
      tabIndex={0}
      aria-label={`${title}. Focus to preview the quality dashboard.`}
      className="
        group relative flex min-h-[650px] flex-col
        overflow-hidden rounded-[32px]
        border border-[#17191C]/10
        bg-[#F7F6F4] p-6 text-[#17191C]
        outline-none transition-shadow duration-300
        hover:shadow-[0_24px_65px_rgba(23,25,28,0.10)]
        focus-visible:ring-2
        focus-visible:ring-[#B12025]
        sm:p-9 lg:p-10
      "
    >
      {/* OUTER CARD CONTENT — UNCHANGED */}
      <div className="relative z-10">
        <div className="mb-9 flex items-center justify-between gap-4">
          <span className="text-[10px] font-semibold tracking-[0.17em] text-[#B12025]">
            03 / QUALITY ASSURANCE
          </span>

          <a
            href="#contact"
            aria-label="Discuss quality assurance"
            className="
              flex h-10 w-10 shrink-0 items-center
              justify-center rounded-full
              border border-[#17191C]/15 bg-white
              transition-colors
              hover:border-[#B12025]
              hover:bg-[#B12025] hover:text-white
              focus-visible:outline-2
              focus-visible:outline-offset-4
              focus-visible:outline-[#B12025]
            "
          >
            <ArrowUpRight size={19} />
          </a>
        </div>

        <h3 className="max-w-[510px] text-[clamp(1.8rem,2.7vw,2.7rem)] font-semibold leading-[1.13] tracking-[-0.05em]">
          {title}
        </h3>

        <p className="mt-5 max-w-[485px] text-[13px] font-light leading-[1.8] text-[#17191C]/65 sm:text-[14px]">
          {description}
        </p>
      </div>

      {/* ==================================
          PANEL STAGE

          Positioned directly after text.
          No justify-between / large blank gap.

          MANUAL VERTICAL ADJUSTMENT:
          mt-8 = 32px gap
          mt-5 = 20px gap
          mt-12 = 48px gap
      ================================== */}

      <div className="relative z-10 mt-8 h-[355px] w-full shrink-0">

        {/* ==================================
            MANUAL WHITE CONTAINER WIDTH

            Default:
            Mobile = 100%
            Desktop = 82%
            Large desktop = 70%

            Smaller: xl:w-[62%]
            Wider: xl:w-[78%]
        ================================== */}

        <div
          ref={panelRef}
          className="
            absolute right-0 top-0
            h-[340px] w-full
            overflow-hidden rounded-[23px]
            border border-black/[0.05]
            bg-white text-[#17191C]
            shadow-[0_20px_55px_rgba(23,25,28,0.10)]
            lg:w-[82%] xl:w-[70%]
          "
        >
          {/* FIXED TOP HEADER */}
          <div className="flex h-[82px] items-center justify-between gap-3 border-b border-black/10 px-4 sm:px-5">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#B12025]/10 text-[#B12025]">
                <ClipboardCheck size={20} />
              </span>

              <div className="min-w-0">
                <p className="truncate text-[12px] font-semibold sm:text-[13px]">
                  Quality dashboard
                </p>

                <p className="mt-1 truncate text-[10px] text-[#17191C]/45">
                  Sample QA performance
                </p>
              </div>
            </div>

            <span className="shrink-0 rounded-full bg-[#B12025]/10 px-2.5 py-1.5 text-[10px] font-semibold text-[#B12025]">
              QA
            </span>
          </div>

          {/* ==================================
              QUALITY SCORE + CIRCULAR METER
          ================================== */}

          <div
            data-qa-reveal
            className="flex items-center justify-between gap-2 px-5 pb-2 pt-4"
          >
            <div>
              <p className="text-[10px] font-medium text-[#17191C]/45">
                Example score
              </p>

              <span
                ref={scoreRef}
                className="mt-2 block text-[40px] font-semibold leading-none tracking-[-0.06em] text-[#B12025]"
              >
                94%
              </span>

              <span className="mt-2 flex items-center gap-1 text-[10px] text-[#17191C]/55">
                <TrendingUp size={13} />
                Quality tracked
              </span>
            </div>

            {/* ANIMATED SVG SCORE RING */}
            <svg
              viewBox="0 0 100 100"
              width="86"
              height="86"
              role="img"
              aria-label="Illustrative 94 percent score"
              className="h-[76px] w-[76px] shrink-0"
            >
              <circle
                cx="50"
                cy="50"
                r="36"
                fill="none"
                stroke="#B12025"
                strokeOpacity="0.10"
                strokeWidth="8"
              />

              <circle
                ref={ringRef}
                cx="50"
                cy="50"
                r="36"
                fill="none"
                stroke="#B12025"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={RING_LENGTH}
                strokeDashoffset={
                  RING_LENGTH * 0.06
                }
                transform="rotate(-90 50 50)"
              />

              <ChartNoAxesCombined
                className="hidden"
                aria-hidden="true"
              />
              <path
                d="M36 57 L46 47 L53 53 L66 39"
                fill="none"
                stroke="#B12025"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* ==================================
              SEVEN ANIMATED CHART BARS
          ================================== */}

          <div
            data-qa-reveal
            className="mx-5 mt-1 rounded-xl bg-[#F8F8F8] px-4 py-3"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[10px] font-semibold">
                QA trend
              </span>

              <span className="text-[9px] text-[#17191C]/40">
                SAMPLE DATA
              </span>
            </div>

            <div className="flex h-[55px] items-end gap-2">
              {BARS.map((height, index) => (
                <span
                  key={index}
                  className="flex h-full flex-1 items-end"
                >
                  <span
                    data-qa-bar
                    className="w-full origin-bottom rounded-t-[4px] bg-[#B12025]"
                    style={{
                      height: `${height}%`,
                    }}
                  />
                </span>
              ))}
            </div>
          </div>

          {/* FINAL REVIEW STATUS */}
          <div
            data-qa-footer
            className="mx-5 mt-3 flex items-center justify-between gap-2 border-t border-black/10 pt-3"
          >
            <span className="flex items-center gap-2 text-[10px] font-semibold text-[#B12025]">
              <CheckCircle2 size={16} />
              Monthly review
            </span>

            <span className="text-[10px] text-[#17191C]/55">
              Coaching included
            </span>
          </div>

          {/* THIN ANIMATED PROGRESS LINE */}
          <div className="absolute bottom-0 left-0 h-[3px] w-full bg-[#B12025]/10">
            <div
              data-qa-progress
              className="h-full w-full origin-left bg-[#B12025]"
            />
          </div>
        </div>
      </div>
    </article>
  );
}
