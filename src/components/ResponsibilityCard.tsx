
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

import {
  Activity,
  ArrowUpRight,
  CheckCheck,
  CheckCircle2,
  CircleAlert,
  SearchCheck,
} from 'lucide-react';

// ==========================================
// MANUAL ADJUSTMENTS
// ==========================================

const SETTINGS = {
  collapsedHeight: 84,
  expandedHeight: 354,

  // MANUAL WHITE CONTAINER POSITION
  // 100 = Move up 100px
  // 160 = Move up 160px (Recommended)
  // 200 = Move closer to the heading
  // 230 = Very close to the heading
  collapsedBottom: 160,

  expandDuration: 0.68,
  stepGap: 0.32,
  reverseSpeed: 1.5,
};


// ==========================================
// RESOLUTION TIMELINE CONTENT
// ==========================================

const resolutionSteps = [
  {
    number: '01',
    title: 'Issue detected',
    description: 'Performance monitored',
    Icon: CircleAlert,
  },
  {
    number: '02',
    title: 'Cause identified',
    description: 'Root cause investigated',
    Icon: SearchCheck,
  },
  {
    number: '03',
    title: 'Fix applied',
    description: 'Action communicated',
    Icon: CheckCircle2,
  },
] as const;

// ==========================================
// COMPONENT PROPS
// ==========================================

type ResponsibilityCardProps = {
  title: string;
  description: string;
};

// ==========================================
// MAIN RESPONSIBILITY CARD
// ==========================================

export default function ResponsibilityCard({
  title,
  description,
}: ResponsibilityCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const connectorRef = useRef<HTMLDivElement>(null);
  const completedRef = useRef<HTMLDivElement>(null);

  // ========================================
  // GSAP PREMIUM EXPANSION ANIMATION
  // ========================================

  useEffect(() => {
    const card = cardRef.current;
    const panel = panelRef.current;
    const connector = connectorRef.current;
    const completed = completedRef.current;

    if (!card || !panel || !connector || !completed) {
      return;
    }

    const rows = Array.from(
      panel.querySelectorAll<HTMLElement>(
        '[data-resolve-row]'
      )
    );

    const icons = Array.from(
      panel.querySelectorAll<HTMLElement>(
        '[data-resolve-icon]'
      )
    );

    const progress = panel.querySelector<HTMLElement>(
      '[data-resolve-progress]'
    );

    const mm = gsap.matchMedia();

    // Hover animation runs only on desktop
    // with a mouse and normal motion settings.
    //
    // Mobile / reduced motion:
    // Expanded content stays visible.

    mm.add(
      '(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
      () => {
        // ----------------------------------
        // INITIAL CLOSED STATE
        // ----------------------------------

        
gsap.set(panel, {
  height: SETTINGS.collapsedHeight,

  // White container position before hover
  bottom: SETTINGS.collapsedBottom,
});

        gsap.set(rows, {
          autoAlpha: 0,
          y: 22,
        });

        gsap.set(icons, {
          scale: 0.65,
        });

        gsap.set(connector, {
          scaleY: 0,
          transformOrigin: 'top center',
        });

        gsap.set(completed, {
          autoAlpha: 0,
          y: 15,
        });

        if (progress) {
          gsap.set(progress, {
            scaleX: 0,
            transformOrigin: 'left center',
          });
        }

        // ----------------------------------
        // CREATE PAUSED TIMELINE
        // ----------------------------------

        const timeline = gsap.timeline({
          paused: true,
          defaults: {
            ease: 'power3.out',
          },
        });

        // ==================================
        // STAGE 01 — PANEL EXPANDS UPWARDS
        //
        // Its bottom edge stays anchored.
        // Only its height changes.
        // ==================================

        
timeline.to(
  panel,
  {
    // Expand the white container
    height: SETTINGS.expandedHeight,

    // Move smoothly into its full expanded position
    bottom: 0,

    duration: SETTINGS.expandDuration,
    ease: 'power3.inOut',
  },
  0
);


        // ==================================
        // STAGE 02 — RED CONNECTING LINE
        // ==================================

        timeline.to(
          connector,
          {
            scaleY: 1,
            duration: 0.9,
            ease: 'power2.inOut',
          },
          0.61
        );

        // ==================================
        // STAGE 03 — ICONS AND CONTENT
        //
        // 01 → 02 → 03
        // ==================================

        rows.forEach((row, index) => {
          const start =
            0.7 + index * SETTINGS.stepGap;

          const icon = row.querySelector<HTMLElement>(
            '[data-resolve-icon]'
          );

          // Row enters from below.
          timeline.to(
            row,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.38,
              ease: 'power3.out',
            },
            start
          );

          // Circular icon pops in.
          if (icon) {
            timeline.to(
              icon,
              {
                scale: 1,
                duration: 0.42,
                ease: 'back.out(1.5)',
              },
              start + 0.06
            );
          }
        });

        // ==================================
        // STAGE 04 — COMPLETION STATUS
        // ==================================

        timeline.to(
          completed,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.45,
            ease: 'power3.out',
          },
          1.78
        );

        // Draw the completion progress line.
        if (progress) {
          timeline.to(
            progress,
            {
              scaleX: 1,
              duration: 0.65,
              ease: 'power2.out',
            },
            1.78
          );
        }

        // ----------------------------------
        // HOVER CONTROLS
        // ----------------------------------

        const open = () => {
          timeline.timeScale(1).play();
        };

        const close = () => {
          timeline
            .timeScale(SETTINGS.reverseSpeed)
            .reverse();
        };

        // Keyboard focus also opens the card.
        const focusOut = (event: FocusEvent) => {
          const next = event.relatedTarget;

          if (
            !(next instanceof Node) ||
            !card.contains(next)
          ) {
            close();
          }
        };

        card.addEventListener(
          'mouseenter',
          open
        );

        card.addEventListener(
          'mouseleave',
          close
        );

        card.addEventListener(
          'focusin',
          open
        );

        card.addEventListener(
          'focusout',
          focusOut
        );

        // ----------------------------------
        // CLEANUP
        // ----------------------------------

        return () => {
          card.removeEventListener(
            'mouseenter',
            open
          );

          card.removeEventListener(
            'mouseleave',
            close
          );

          card.removeEventListener(
            'focusin',
            open
          );

          card.removeEventListener(
            'focusout',
            focusOut
          );

          timeline.kill();
        };
      }
    );

    return () => {
      mm.revert();
    };
  }, []);

  // ========================================
  // CARD UI
  // ========================================

  return (
    <article
      ref={cardRef}
      data-standards-card
      tabIndex={0}
      aria-label={`${title}. Focus to reveal the resolution workflow.`}
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
        border-[#17191C]/10
        bg-[#F7F6F4]
        p-6
        text-[#17191C]
        outline-none
        transition-shadow
        duration-300

        hover:shadow-[0_24px_65px_rgba(23,25,28,0.10)]

        focus-visible:ring-2
        focus-visible:ring-[#B12025]
        focus-visible:ring-offset-4

        sm:p-9
        lg:min-h-[650px]
        lg:p-10
      "
    >
      {/* ==================================
          SUBTLE BACKGROUND LIGHT
      ================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-24
          -top-24
          h-[300px]
          w-[300px]
          rounded-full
          bg-[#B12025]/[0.035]
          blur-[85px]
        "
      />

      {/* ==================================
          OUTER CARD CONTENT — UNCHANGED
      ================================== */}

      <div className="relative z-10">
        <div className="mb-9 flex items-center justify-between gap-4">
          <span className="text-[10px] font-semibold tracking-[0.17em] text-[#B12025]">
            02 / ACCOUNTABILITY
          </span>

          <a
            href="#contact"
            aria-label="Discuss accountability with FirstNotch"
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              border-[#17191C]/15
              bg-white
              text-[#17191C]
              transition-colors
              duration-200

              hover:border-[#B12025]
              hover:bg-[#B12025]
              hover:text-white

              focus-visible:outline-2
              focus-visible:outline-offset-4
              focus-visible:outline-[#B12025]
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
        <p className="mt-5 max-w-[485px] text-[13px] font-light leading-[1.8] text-[#17191C]/65 sm:text-[14px]">
          {description}
        </p>
      </div>

      {/* ==================================
          ANIMATION STAGE

          Fixed height prevents page jumping.
          White panel remains right-aligned.
      ================================== */}

      <div
        className="
          relative
          z-10
          mt-8
          h-[370px]
          w-full
          shrink-0
        "
      >
        {/* ==================================
            WHITE RESOLUTION TRACKER

            WIDTH ADJUSTMENT:
            lg:w-[78%] = medium
            xl:w-[68%] = current premium width

            SMALLER:
            xl:w-[60%]

            WIDER:
            xl:w-[75%]

            Change only these width classes.
        ================================== */}

        <div
          ref={panelRef}
          className="
            absolute
            bottom-0
            right-0

            h-[354px]
            w-full

            overflow-hidden
            rounded-[23px]
            border
            border-[#17191C]/[0.05]
            bg-white
            text-[#17191C]

            shadow-[0_22px_60px_rgba(23,25,28,0.10)]

            lg:w-[78%]
            xl:w-[68%]
          "
        >
          {/* ==================================
              FIXED PANEL HEADER
          ================================== */}

          <div
            className="
              relative
              z-10
              flex
              h-[84px]
              items-center
              justify-between
              gap-3
              border-b
              border-[#17191C]/10
              px-4

              sm:px-5
            "
          >
            <div className="flex min-w-0 items-center gap-3">
              <span
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-[12px]
                  bg-[#B12025]/10
                  text-[#B12025]
                "
              >
                <Activity
                  size={20}
                  strokeWidth={1.8}
                />
              </span>

              <div className="min-w-0">
                <p className="truncate text-[12px] font-semibold sm:text-[13px]">
                  Performance overview
                </p>

                <p className="mt-1 truncate text-[10px] text-[#17191C]/45">
                  Resolution tracker
                </p>
              </div>
            </div>

            <span
              className="
                shrink-0
                rounded-full
                bg-[#B12025]/[0.08]
                px-2.5
                py-1.5
                text-[10px]
                font-semibold
                text-[#B12025]
              "
            >
              Monitored
            </span>
          </div>

          {/* ==================================
              CONNECTED RESOLUTION TIMELINE
          ================================== */}

          <div className="relative px-4 pt-4 sm:px-5">
            {/* Animated vertical connector */}
            <div
              aria-hidden="true"
              className="
                absolute
                left-[34px]
                top-[43px]
                h-[124px]
                w-[2px]
                bg-[#B12025]/10

                sm:left-[38px]
              "
            >
              <div
                ref={connectorRef}
                className="
                  h-full
                  w-full
                  origin-top
                  bg-[#B12025]
                "
              />
            </div>

            {/* 01 → 02 → 03 */}
            <div className="space-y-2">
              {resolutionSteps.map((step) => {
                const Icon = step.Icon;

                return (
                  <div
                    key={step.number}
                    data-resolve-row
                    className="
                      relative
                      flex
                      min-h-[57px]
                      items-center
                      gap-3
                      rounded-[12px]
                      border
                      border-[#17191C]/[0.045]
                      bg-[#FAFAFA]
                      px-2.5
                      py-2

                      sm:px-3
                    "
                  >
                    {/* Red icon for each step */}
                    <span
                      data-resolve-icon
                      className="
                        relative
                        z-10
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[#B12025]/20
                        bg-white
                        text-[#B12025]
                      "
                    >
                      <Icon
                        size={18}
                        strokeWidth={1.8}
                      />
                    </span>

                    {/* Step details */}
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-semibold leading-4 sm:text-[12px]">
                        {step.title}
                      </p>

                      <p className="mt-1 text-[10px] leading-4 text-[#17191C]/45">
                        {step.description}
                      </p>
                    </div>

                    {/* Step number */}
                    <span className="shrink-0 text-[10px] font-medium text-[#B12025]/65">
                      {step.number}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ==================================
              FINAL RESOLUTION CONFIRMATION
          ================================== */}

          <div
            ref={completedRef}
            className="
              mx-4
              mt-3
              flex
              h-[43px]
              items-center
              justify-between
              gap-2
              rounded-[11px]
              bg-[#B12025]
              px-3
              text-white

              sm:mx-5
            "
          >
            <div className="flex min-w-0 items-center gap-2">
              <CheckCheck
                size={17}
                className="shrink-0"
              />

              <span className="text-[11px] font-semibold">
                Resolution complete
              </span>
            </div>

            <CheckCircle2
              size={17}
              className="shrink-0"
            />
          </div>

          {/* ==================================
              THIN RESOLUTION PROGRESS LINE
          ================================== */}

          <div className="absolute bottom-0 left-0 h-[3px] w-full bg-[#B12025]/10">
            <div
              data-resolve-progress
              className="h-full w-full origin-left bg-[#B12025]"
            />
          </div>
        </div>
      </div>
    </article>
  );
}
