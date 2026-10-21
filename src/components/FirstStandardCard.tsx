
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

import {
  ArrowUpRight,
  Check,
  CheckCircle2,
  SlidersHorizontal,
} from 'lucide-react';

// ==========================================
// MANUAL ANIMATION ADJUSTMENTS
// ==========================================

// Change these values to adjust expansion height.
const HEIGHTS = {
  closed: 60,     // Initial "Let's get started" height
  first: 115,     // After row 01 appears
  second: 163,    // After row 02 appears
  third: 211,     // After row 03 appears
  finished: 270,  // Final expanded height
};

const ACTIONS = [
  'Your tools',
  'Your scripts',
  'Your process',
] as const;

type FirstStandardCardProps = {
  title: string;
  description: string;
};

export default function FirstStandardCard({
  title,
  description,
}: FirstStandardCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const checklistRef = useRef<HTMLDivElement>(null);

  // ========================================
  // HOVER ANIMATION — MULTIPLIER STYLE
  // ========================================

  useEffect(() => {
    const card = cardRef.current;
    const checklist = checklistRef.current;

    if (!card || !checklist) return;

    const steps = Array.from(
      checklist.querySelectorAll<HTMLElement>(
        '[data-fns-first-step]'
      )
    );

    const final = checklist.querySelector<HTMLElement>(
      '[data-fns-first-finish]'
    );

    const mm = gsap.matchMedia();

    // Desktop mouse users get hover animation.
    // Touch devices and reduced-motion users
    // get the fully expanded content.

    mm.add(
      '(min-width: 768px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
      () => {
        // ----------------------------------
        // INITIAL COLLAPSED STATE
        // ----------------------------------

        gsap.set(checklist, {
          height: HEIGHTS.closed,
        });

        gsap.set(steps, {
          autoAlpha: 0,
          y: 12,
        });

        if (final) {
          gsap.set(final, {
            autoAlpha: 0,
            y: 12,
          });
        }

        // ----------------------------------
        // CREATE SEQUENTIAL TIMELINE
        // ----------------------------------

        const timeline = gsap.timeline({
          paused: true,
          defaults: {
            ease: 'power3.out',
          },
        });

        const targetHeights = [
          HEIGHTS.first,
          HEIGHTS.second,
          HEIGHTS.third,
        ];

        // Each step expands the white container
        // before revealing the next checklist row.

        steps.forEach((step, index) => {
          // Expand container DOWN
          timeline.to(checklist, {
            height: targetHeights[index],
            duration: 0.42,
            ease: 'power3.inOut',
          });

          // Reveal corresponding row
          timeline.to(
            step,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.3,
            },
            '-=0.08'
          );
        });

        // ----------------------------------
        // FINAL EXPANSION
        // ----------------------------------

        timeline.to(checklist, {
          height: HEIGHTS.finished,
          duration: 0.38,
          ease: 'power3.inOut',
        });

        // Final confirmation reveal
        if (final) {
          timeline.to(
            final,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.3,
            },
            '-=0.08'
          );
        }

        // ----------------------------------
        // MOUSE / KEYBOARD INTERACTION
        // ----------------------------------

        const open = () => {
          timeline.timeScale(1).play();
        };

        const close = () => {
          timeline.timeScale(1.35).reverse();
        };

        const onFocusOut = (event: FocusEvent) => {
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
        card.addEventListener('focusout', onFocusOut);

        // ----------------------------------
        // CLEANUP
        // ----------------------------------

        return () => {
          card.removeEventListener('mouseenter', open);
          card.removeEventListener('mouseleave', close);
          card.removeEventListener('focusin', open);
          card.removeEventListener('focusout', onFocusOut);

          timeline.kill();

          gsap.set(checklist, {
            clearProps: 'height',
          });

          gsap.set(steps, {
            clearProps: 'opacity,visibility,transform',
          });

          if (final) {
            gsap.set(final, {
              clearProps: 'opacity,visibility,transform',
            });
          }
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
      aria-label="Your way of doing things: focus to preview the setup steps"
      className="
        group
        relative
        flex
        min-h-[630px]
        flex-col
        justify-between
        overflow-hidden
        rounded-[32px]
        border
        border-[#B12025]
        bg-[#B12025]
        p-6
        text-white
        outline-none
        transition-shadow
        duration-300

        hover:shadow-[0_24px_65px_rgba(23,25,28,0.12)]

        focus-visible:ring-4
        focus-visible:ring-white
        focus-visible:ring-offset-2
        focus-visible:ring-offset-[#B12025]

        sm:p-9
        lg:min-h-[650px]
        lg:p-10
      "
    >
      {/* ==================================
          CARD HEADING / ORIGINAL CONTENT
      ================================== */}

      <div className="relative z-10">
        <div className="mb-9 flex items-center justify-between gap-4">
          <span className="text-[10px] font-semibold tracking-[0.17em] text-white/80">
            01 / CUSTOM WORKFLOWS
          </span>

          <a
            href="#contact"
            aria-label="Discuss custom workflows with FirstNotch"
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              border-white/35
              bg-white/10
              text-white
              transition-colors

              hover:bg-white
              hover:text-[#B12025]

              focus-visible:outline
              focus-visible:outline-2
              focus-visible:outline-offset-4
              focus-visible:outline-white
            "
          >
            <ArrowUpRight
              size={19}
              aria-hidden="true"
            />
          </a>
        </div>

        {/* Original heading */}
        <h3 className="max-w-[510px] text-[clamp(1.8rem,2.7vw,2.7rem)] font-semibold leading-[1.13] tracking-[-0.05em]">
          {title}
        </h3>

        {/* Original paragraph */}
        <p className="mt-5 max-w-[485px] text-[13px] font-light leading-[1.8] text-white/85 sm:text-[14px]">
          {description}
        </p>
      </div>

      {/* ==================================
          TWO WHITE UI PANELS
          FIXED STAGE PREVENTS LAYOUT JUMPS
      ================================== */}

      <div className="relative z-10 mt-8 flex h-[372px] w-full shrink-0 flex-col items-end">

        {/* ==================================
            WHITE PANEL 01 — ALWAYS VISIBLE
            THIS PANEL DOES NOT EXPAND

            MANUAL WIDTH ADJUSTMENT:
            sm:w-[72%] = Current
            sm:w-[65%] = Smaller
            sm:w-[80%] = Wider
        ================================== */}

        <div
          className="
            flex
            h-[88px]
            w-full
            shrink-0
            items-center
            justify-between
            gap-3
            rounded-[21px]
            bg-white
            px-4
            text-[#17191C]
            shadow-[0_16px_40px_rgba(0,0,0,0.08)]

            sm:w-[72%]
            sm:px-5
          "
        >
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#B12025]/10 text-[#B12025]">
              <SlidersHorizontal
                size={19}
                aria-hidden="true"
              />
            </div>

            <div className="min-w-0">
              <p className="truncate text-[13px] font-semibold">
                Your team setup
              </p>

              <p className="mt-1 truncate text-[10px] text-[#17191C]/50">
                Built around your business
              </p>
            </div>
          </div>

          <span className="shrink-0 rounded-full bg-[#B12025]/10 px-3 py-1.5 text-[10px] font-semibold text-[#B12025]">
            Ready
          </span>
        </div>

        {/* ==================================
            WHITE PANEL 02 — EXPANDING

            Initially only the heading is visible.
            The container grows DOWN as each
            checklist row appears.

            MANUAL WIDTH:
            sm:w-[72%] = Current
        ================================== */}

        <div
          ref={checklistRef}
          className="
            mt-[8px]
            h-[270px]
            w-full
            shrink-0
            overflow-hidden
            rounded-[21px]
            bg-white
            text-[#17191C]
            shadow-[0_18px_45px_rgba(0,0,0,0.10)]

            sm:w-[72%]
          "
        >
          {/* Checklist heading always visible */}
          <div className="flex h-[60px] items-center justify-between px-5">
            <span className="text-[14px] font-semibold">
              Let&apos;s get started
            </span>

            <span className="text-[10px] font-medium text-[#B12025]">
              SETUP
            </span>
          </div>

          {/* Numbered checklist rows */}
          <div className="px-4 pb-3 pt-3">
            <div className="space-y-2">
              {ACTIONS.map((label, index) => (
                <div
                  data-fns-first-step
                  key={label}
                  className="
                    flex
                    h-[40px]
                    items-center
                    gap-3
                    rounded-lg
                    bg-[#F7F7F7]
                    px-3
                  "
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#B12025] text-white">
                    <Check
                      size={14}
                      strokeWidth={2.5}
                      aria-hidden="true"
                    />
                  </span>

                  <span className="min-w-0 flex-1 text-[12px] font-medium">
                    {label}
                  </span>

                  <span className="text-[10px] text-[#17191C]/35">
                    0{index + 1}
                  </span>
                </div>
              ))}
            </div>

            {/* Final confirmation */}
            <div
              data-fns-first-finish
              className="
                mt-3
                flex
                min-h-[37px]
                items-center
                gap-2
                rounded-lg
                bg-[#B12025]/[0.07]
                px-3
                text-[11px]
                font-semibold
                text-[#B12025]
              "
            >
              <CheckCircle2
                size={17}
                aria-hidden="true"
              />

              Your workflow, our team
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
