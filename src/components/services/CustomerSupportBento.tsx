
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

import {
  Mail,
  MessageCircle,
  Phone,
  Users,
} from 'lucide-react';

// ================================================
// FIRSTNOTCH CUSTOMER SUPPORT BENTO
//
// LEFT: 4 ANIMATED LANGUAGES
// RIGHT: 4 CONNECTED SUPPORT CHANNELS
//
// Animations run ONLY on hover, focus or tap.
// ================================================

const LANGUAGES = [
  'English',
  'Sinhala',
  'Tamil',
  'Hindi',
] as const;

const CHANNELS = [
  { label: 'Call', Icon: Phone },
  { label: 'Email', Icon: Mail },
  { label: 'Message', Icon: MessageCircle },
  { label: 'One team', Icon: Users },
] as const;

// ================================================
// CARD 01 — ANIMATED LANGUAGES
// ================================================

function LanguageCard() {
  const cardRef = useRef<HTMLElement | null>(null);

  const timelineRef =
    useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const card = cardRef.current;

    if (!card) return;

    // Don't animate for reduced-motion users.
    if (
      window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches
    ) {
      return;
    }

    const chips = gsap.utils.toArray<HTMLElement>(
      card.querySelectorAll('[data-language-chip]')
    );

    const underline =
      card.querySelector<HTMLElement>(
        '[data-language-underline]'
      );

    const glow =
      card.querySelector<HTMLElement>(
        '[data-language-glow]'
      );

    if (underline) {
      gsap.set(underline, {
        scaleX: 0,
        transformOrigin: 'left center',
      });
    }

    const tl = gsap.timeline({
      paused: true,
      defaults: {
        ease: 'power3.out',
      },
    });

    chips.forEach((chip, i) => {
      // CHANGE: Delay between language chips
      const t = i * 0.22;

      tl.to(
        chip,
        {
          y: -6,
          scale: 1.07,

          // Highlighted language becomes RED
          backgroundColor: '#B12025',
          borderColor: '#B12025',
          color: '#FFFFFF',

          duration: 0.35,
        },
        t
      ).to(
        chip,
        {
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: 'back.out(1.8)',
        },
        t + 0.29
      );
    });

    // Animated red underline
    if (underline) {
      tl.to(
        underline,
        {
          scaleX: 1,
          duration: 0.75,
          ease: 'power2.inOut',
        },
        0.15
      );
    }

    // Very subtle background highlight
    if (glow) {
      tl.to(
        glow,
        {
          opacity: 0.12,
          duration: 0.75,
        },
        0
      );
    }

    timelineRef.current = tl;

    return () => {
      tl.kill();
      timelineRef.current = null;

      gsap.set(
        [
          ...chips,
          ...(underline ? [underline] : []),
          ...(glow ? [glow] : []),
        ],
        { clearProps: 'all' }
      );
    };
  }, []);

  // Hover starts animation.
  const play = () => timelineRef.current?.restart();

  // Mouse leaving reverses animation.
  const reverse = () => timelineRef.current?.reverse();

  return (
    <article
      ref={cardRef}
      tabIndex={0}
      onMouseEnter={play}
      onMouseLeave={reverse}
      onFocus={play}
      onBlur={reverse}
      onClick={play}
      onKeyDown={(event) => {
        if (
          event.key === 'Enter' ||
          event.key === ' '
        ) {
          event.preventDefault();
          play();
        }
      }}
      aria-label="Four languages, one standard. Hover, tap or focus to see the languages highlighted."
      className="
        relative
        min-w-0
        overflow-hidden
        rounded-[28px]
        border
        border-[#17191C]/10
        bg-white
        p-6
        shadow-[0_12px_40px_rgba(23,25,28,0.045)]
        outline-none

        transition-shadow
        duration-300

        hover:shadow-[0_20px_60px_rgba(177,32,37,0.10)]

        focus-visible:ring-2
        focus-visible:ring-[#B12025]

        sm:p-8
      "
    >
      {/* Soft highlight on hover */}
      <div
        data-language-glow
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-10
          -top-12
          h-44
          w-44
          rounded-full
          bg-[#B12025]
          opacity-0
          blur-[80px]
        "
      />

      <div className="relative z-10 flex h-full min-h-[210px] flex-col">
        <h3 className="text-[15px] font-semibold text-[#17191C]">
          Four languages. One standard.
        </h3>

        {/* Sequential language chips */}
        <div className="mt-7 flex flex-wrap gap-3">
          {LANGUAGES.map((language) => (
            <span
              key={language}
              data-language-chip
              className="
                inline-flex
                min-w-[76px]
                items-center
                justify-center
                rounded-full
                border
                border-[#B12025]/20
                bg-[#fff7f6]
                px-4
                py-2.5
                text-[12px]
                font-medium
                text-[#B12025]
                will-change-transform
              "
            >
              {language}
            </span>
          ))}
        </div>

        <p className="mt-7 max-w-[390px] text-[13px] leading-7 text-[#17191C]/60">
          Your customer hears one consistent answer,
          regardless of language.
        </p>

        {/* Animated progress underline */}
        <div
          aria-hidden="true"
          className="mt-auto pt-7"
        >
          <div className="h-[2px] w-full overflow-hidden rounded-full bg-[#B12025]/10">
            <div
              data-language-underline
              className="h-full w-full origin-left scale-x-0 rounded-full bg-[#B12025]"
            />
          </div>
        </div>
      </div>
    </article>
  );
}

// ================================================
// CARD 02 — ANIMATED CHANNEL FLOW
//
// CALL -> EMAIL -> MESSAGE -> ONE TEAM
//
// Lines stop at the circle edges.
// No line passes through an icon.
//
// The lines remain subtle until hovering.
// ================================================

function ChannelCard() {
  const cardRef = useRef<HTMLElement | null>(null);

  const timelineRef =
    useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const card = cardRef.current;

    if (!card) return;

    if (
      window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches
    ) {
      return;
    }

    const icons = gsap.utils.toArray<HTMLElement>(
      card.querySelectorAll('[data-flow-icon]')
    );

    const lines = gsap.utils.toArray<HTMLElement>(
      card.querySelectorAll('[data-flow-active-line]')
    );

    const labels = gsap.utils.toArray<HTMLElement>(
      card.querySelectorAll('[data-flow-label]')
    );

    const status =
      card.querySelector<HTMLElement>(
        '[data-flow-status]'
      );

    // Keep icons visible before hover.
    // Only animated progress lines begin hidden.
    gsap.set(lines, {
      scaleX: 0,
      transformOrigin: 'left center',
    });

    const tl = gsap.timeline({
      paused: true,
      defaults: {
        ease: 'power3.out',
      },
    });

    icons.forEach((icon, i) => {
      // ===================================
      // MANUAL ANIMATION SPEED
      //
      // Increase 0.55 for slower sequence.
      // Decrease 0.55 for faster sequence.
      // ===================================

      const t = i * 0.55;

      // Icon expands and background turns white
      tl.to(
        icon,
        {
          backgroundColor: '#FFFFFF',
          color: '#B12025',

          scale: 1.18,

          duration: 0.38,
        },
        t
      ).to(
        icon,
        {
          scale: 1,
          duration: 0.40,
          ease: 'back.out(1.8)',
        },
        t + 0.30
      );

      // Icon label gently responds
      if (labels[i]) {
        tl.to(
          labels[i],
          {
            opacity: 1,
            scale: 1.06,
            duration: 0.26,
          },
          t + 0.12
        ).to(
          labels[i],
          {
            scale: 1,
            duration: 0.3,
          },
          t + 0.33
        );
      }

      // Draw the line to the next icon.
      // Does not overlap the circles.
      if (lines[i]) {
        tl.to(
          lines[i],
          {
            scaleX: 1,
            duration: 0.47,
            ease: 'power2.inOut',
          },
          t + 0.32
        );
      }
    });

    // Final confirmation
    if (status) {
      tl.to(
        status,
        {
          scale: 1.03,
          duration: 0.3,
        },
        2.2
      ).to(
        status,
        {
          scale: 1,
          duration: 0.35,
        },
        2.48
      );
    }

    timelineRef.current = tl;

    return () => {
      tl.kill();
      timelineRef.current = null;

      gsap.set(
        [
          ...icons,
          ...lines,
          ...labels,
          ...(status ? [status] : []),
        ],
        { clearProps: 'all' }
      );
    };
  }, []);

  const play = () => timelineRef.current?.restart();

  const reverse = () => timelineRef.current?.reverse();

  return (
    <article
      ref={cardRef}
      tabIndex={0}
      onMouseEnter={play}
      onMouseLeave={reverse}
      onFocus={play}
      onBlur={reverse}
      onClick={play}
      onKeyDown={(event) => {
        if (
          event.key === 'Enter' ||
          event.key === ' '
        ) {
          event.preventDefault();
          play();
        }
      }}
      aria-label="One team, one tone of voice. Hover, tap or focus to animate Call, Email, Message and One team."
      className="
        relative
        min-w-0
        overflow-hidden
        rounded-[28px]
        bg-[#B12025]
        p-6
        text-white
        shadow-[0_18px_48px_rgba(177,32,37,0.16)]
        outline-none

        focus-visible:ring-2
        focus-visible:ring-[#17191C]

        sm:p-8
      "
    >
      {/* Premium subtle background */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-16
          -top-12
          h-56
          w-56
          rounded-full
          bg-white/[.08]
          blur-[70px]
        "
      />

      <div className="relative z-10 flex h-full min-h-[210px] flex-col">
        {/* Card title */}
        <h3 className="text-[15px] font-semibold">
          One team, one tone of voice.
        </h3>

        <p className="mt-3 max-w-[440px] text-[12px] leading-6 text-white/80">
          Phone, email and chat conversations come
          together in one trained support team.
        </p>

        {/* ===================================
            ICON FLOW ROW

            All 4 icons remain on one line.

            Circle size:
            Mobile: 40px
            Desktop: 48px

            Gap:
            Mobile: 8px
            Desktop: 16px
        =================================== */}

        <div
          className="mt-7 grid grid-cols-4 gap-2 sm:gap-4"
          aria-label="Call, Email and Message connected to One team"
        >
          {CHANNELS.map(({ label, Icon }, i) => (
            <div
              key={label}
              className="relative flex min-w-0 flex-col items-center text-center"
            >
              {/* ==================================
                  PRECISE CONNECTOR LINES

                  Start: Right edge of current icon
                  End: Left edge of next icon

                  No overlapping or crossing icons.
              ================================== */}

              {i < CHANNELS.length - 1 && (
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute

                    left-[calc(50%+20px)]
                    top-[20px]
                    h-[2px]
                    w-[calc(100%+0.5rem-40px)]

                    sm:left-[calc(50%+24px)]
                    sm:top-[24px]
                    sm:w-[calc(100%+1rem-48px)]
                  "
                >
                  {/* Always visible faint connector */}
                  <div className="absolute inset-0 rounded-full bg-white/30" />

                  {/* White line fills only on hover */}
                  <div
                    data-flow-active-line
                    className="
                      absolute
                      inset-0
                      origin-left
                      scale-x-0
                      rounded-full
                      bg-white
                    "
                  />
                </div>
              )}

              {/* Animated circular icon */}
              <div
                data-flow-icon
                aria-hidden="true"
                className="
                  relative
                  z-10
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/35
                  bg-white/15
                  text-white
                  will-change-transform

                  sm:h-12
                  sm:w-12
                "
              >
                <Icon
                  size={19}
                  strokeWidth={1.8}
                />
              </div>

              {/* Icon label */}
              <span
                data-flow-label
                className="
                  mt-3
                  text-[10px]
                  font-semibold
                  leading-4
                  text-white/90
                  sm:text-[11px]
                "
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Status */}
        <div
          data-flow-status
          className="
            mt-auto
            flex
            items-center
            gap-2
            border-t
            border-white/25
            pt-5
            text-[11px]
            font-medium
            leading-5
            text-white/90
          "
        >
          <span
            aria-hidden="true"
            className="h-2 w-2 shrink-0 rounded-full bg-white"
          />

          Every channel, one consistent customer
          experience.
        </div>
      </div>
    </article>
  );
}

// ================================================
// EXPORT BOTH CARDS AS ONE BENTO SECTION
// ================================================

export default function CustomerSupportBento() {
  return (
    <div className="mb-12 grid items-stretch gap-4 lg:grid-cols-2">
      <LanguageCard />
      <ChannelCard />
    </div>
  );
}
