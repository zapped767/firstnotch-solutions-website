
'use client';

import {
  Fragment,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';

import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Code2,
  FileText,
  Headset,
  Mail,
  MessageCircle,
  Phone,
  Users,
} from 'lucide-react';

import Navbar from '../Navbar';
import StoryContact from '../StoryContact';
import ServiceRail from './ServiceRail';
import QualityPromise from './QualityPromise';
import { categories, questions } from './serviceData';

// ======================================================
// 01 — DATA
// ======================================================

const RED = '#B12025';

const proofNumbers = [
  {
    value: 98,
    suffix: '%',
    title: 'Processing accuracy',
    detail: 'Data checked by software and people',
    kind: 'red',
  },
  {
    value: 85,
    suffix: '%',
    title: 'Client retention',
    detail: 'Relationships built to last',
    kind: 'white',
  },
  {
    value: 30,
    suffix: '+',
    title: 'Team members',
    detail: 'Based in Colombo',
    kind: 'charcoal',
  },
  {
    value: 20,
    suffix: '+',
    title: 'Websites supported',
    detail: 'Built and maintained',
    kind: 'white',
  },
  {
    value: 2,
    suffix: '–4',
    title: 'Weeks to launch',
    detail: 'Typical team readiness',
    kind: 'white',
  },
  {
    value: 15,
    suffix: '–20%',
    title: 'Hiring pass rate',
    detail: 'Selective recruitment',
    kind: 'white',
  },
] as const;

const languages = [
  'English',
  'Sinhala',
  'Tamil',
  'Hindi',
];

const channels = [
  { label: 'Call', icon: Phone },
  { label: 'Email', icon: Mail },
  { label: 'Message', icon: MessageCircle },
  { label: 'One team', icon: Users },
];

// ======================================================
// 02 — HELPERS
// ======================================================

function jumpTo(id: string) {
  document.getElementById(id)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
}

function reducedMotion() {
  return window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;
}

// ======================================================
// 03 — ANIMATED NUMBERS
// ======================================================

function AnimatedNumber({
  value,
  suffix,
}: {
  value: number;
  suffix: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    let frame = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        observer.disconnect();

        if (reducedMotion()) {
          setShown(value);
          return;
        }

        const start = performance.now();

        const draw = (now: number) => {
          const t = Math.min(
            1,
            (now - start) / 1200
          );

          setShown(
            Math.round(value * (1 - (1 - t) ** 3))
          );

          if (t < 1) {
            frame = requestAnimationFrame(draw);
          }
        };

        frame = requestAnimationFrame(draw);
      },
      { threshold: 0.35 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref}>
      {shown}
      {suffix}
    </span>
  );
}

// ======================================================
// 04 — STATISTICS RING
// ======================================================

function ProofRing({
  value,
  inverted = false,
}: {
  value: number;
  inverted?: boolean;
}) {
  const progress = Math.min(value, 100);

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      className="h-[54px] w-[54px] -rotate-90 sm:h-[84px] sm:w-[84px]"
    >
      <circle
        cx="50"
        cy="50"
        r="40"
        fill="none"
        stroke={
          inverted
            ? 'rgba(255,255,255,.25)'
            : 'rgba(177,32,37,.12)'
        }
        strokeWidth="5"
      />

      <circle
        cx="50"
        cy="50"
        r="40"
        fill="none"
        stroke={inverted ? '#FFFFFF' : RED}
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray="251.33"
        strokeDashoffset={
          251.33 * (1 - progress / 100)
        }
      />
    </svg>
  );
}

// ======================================================
// 05 — ANIMATED LANGUAGE BENTO CARD
// ======================================================

function LanguageBentoCard() {
  const cardRef = useRef<HTMLElement>(null);

  const timelineRef =
    useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const card = cardRef.current;

    if (!card || reducedMotion()) return;

    const chips = gsap.utils.toArray<HTMLElement>(
      card.querySelectorAll('[data-language-chip]')
    );

    const line =
      card.querySelector<HTMLElement>(
        '[data-language-line]'
      );

    const tl = gsap.timeline({
      paused: true,
      defaults: { ease: 'power3.out' },
    });

    chips.forEach((chip, index) => {
      const at = index * 0.27;

      tl.to(
        chip,
        {
          y: -6,
          scale: 1.07,
          backgroundColor: RED,
          borderColor: RED,
          color: '#FFFFFF',
          duration: 0.35,
        },
        at
      );

      tl.to(
        chip,
        {
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: 'back.out(1.7)',
        },
        at + 0.28
      );
    });

    if (line) {
      tl.fromTo(
        line,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.1,
          ease: 'power2.inOut',
        },
        0.05
      );
    }

    timelineRef.current = tl;

    return () => {
      tl.kill();
      timelineRef.current = null;

      gsap.set(
        [...chips, ...(line ? [line] : [])],
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
      aria-label="Four languages. Hover, focus or tap to highlight them."
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
      className="
        rounded-[26px]
        border
        border-[#17191C]/10
        bg-white
        p-6
        shadow-[0_8px_32px_rgba(23,25,28,.04)]
        outline-none
        transition-shadow
        duration-300
        hover:shadow-[0_16px_45px_rgba(177,32,37,.10)]
        focus-visible:ring-2
        focus-visible:ring-[#B12025]
        sm:p-8
      "
    >
      <div className="flex min-h-[225px] flex-col">
        <h3 className="text-[15px] font-semibold text-[#17191C]">
          Four languages. One standard.
        </h3>

        <div className="mt-5 flex flex-nowrap gap-1.5 sm:mt-7 sm:flex-wrap sm:gap-3">
          {languages.map((language) => (
            <span
              key={language}
              data-language-chip
              className="
                inline-flex
                min-w-0
                items-center
                justify-center
                rounded-full
                border
                border-[#B12025]/20
                bg-[#fff6f5]
                px-2
                py-2
                text-[10px]
                sm:min-w-[76px]
                sm:px-4
                sm:py-2.5
                sm:text-[12px]
                font-medium
                text-[#B12025]
              "
            >
              {language}
            </span>
          ))}
        </div>

        <p className="mt-5 max-w-[390px] text-[12px] leading-6 text-[#17191C]/60 sm:mt-7 sm:text-[13px] sm:leading-7">
          Your customer hears one consistent answer,
          regardless of language.
        </p>

        <div aria-hidden="true" className="mt-auto pt-7">
          <div className="h-[2px] overflow-hidden rounded-full bg-[#B12025]/10">
            <div
              data-language-line
              className="h-full w-full origin-left scale-x-0 bg-[#B12025]"
            />
          </div>
        </div>
      </div>
    </article>
  );
}

// ======================================================
// 06 — ANIMATED CHANNEL FLOW CARD
// ======================================================

function AnimatedChannelFlowCard() {
  const cardRef = useRef<HTMLElement>(null);

  const timelineRef =
    useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const card = cardRef.current;

    if (!card || reducedMotion()) return;

    const icons = gsap.utils.toArray<HTMLElement>(
      card.querySelectorAll('[data-channel-icon]')
    );

    const lines = gsap.utils.toArray<HTMLElement>(
      card.querySelectorAll('[data-channel-line]')
    );

    const labels = gsap.utils.toArray<HTMLElement>(
      card.querySelectorAll('[data-channel-label]')
    );

    const tl = gsap.timeline({
      paused: true,
      defaults: { ease: 'power3.out' },
    });

    icons.forEach((icon, index) => {
      const at = index * 0.55;

      tl.to(
        icon,
        {
          scale: 1.18,
          backgroundColor: '#FFFFFF',
          borderColor: '#FFFFFF',
          color: RED,
          duration: 0.38,
        },
        at
      );

      tl.to(
        icon,
        {
          scale: 1,
          duration: 0.38,
          ease: 'back.out(1.65)',
        },
        at + 0.3
      );

      if (labels[index]) {
        tl.to(
          labels[index],
          { y: -3, duration: 0.26 },
          at + 0.14
        );

        tl.to(
          labels[index],
          { y: 0, duration: 0.32 },
          at + 0.4
        );
      }

      if (lines[index]) {
        tl.fromTo(
          lines[index],
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.48,
            ease: 'power2.inOut',
          },
          at + 0.35
        );
      }
    });

    timelineRef.current = tl;

    return () => {
      tl.kill();
      timelineRef.current = null;

      gsap.set(
        [...icons, ...lines, ...labels],
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
      aria-label="Call, Email and Message connected to one team. Hover, focus or tap to animate."
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
      className="
        relative
        min-w-0
        overflow-hidden
        rounded-[26px]
        bg-[#B12025]
        p-6
        text-white
        shadow-[0_18px_48px_rgba(177,32,37,.15)]
        outline-none
        focus-visible:ring-2
        focus-visible:ring-[#17191C]
        sm:p-8
      "
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-14 -top-14 h-52 w-52 rounded-full bg-white/[.09] blur-[70px]"
      />

      <div className="relative z-10 flex min-h-[225px] flex-col">
        <h3 className="text-[15px] font-semibold">
          One team, one tone of voice.
        </h3>

        <p className="mt-3 max-w-[440px] text-[12px] leading-6 text-white/85">
          Phone, email and chat conversations come
          together in one trained support team.
        </p>

        <div
          className="mt-8 flex w-full items-start justify-between"
          aria-label="Call, Email and Message connected to one team"
        >
          {channels.map((channel, index) => {
            const Icon = channel.icon;

            return (
              <Fragment key={channel.label}>
                <div className="relative z-10 flex w-10 shrink-0 flex-col items-center sm:w-12">
                  <span
                    data-channel-icon
                    aria-hidden="true"
                    className="
                      flex h-10 w-10
                      items-center justify-center
                      rounded-full border border-white/35
                      bg-white/15 text-white shadow-sm
                      sm:h-12 sm:w-12
                    "
                  >
                    <Icon size={20} strokeWidth={1.8} />
                  </span>

                  <span
                    data-channel-label
                    className="mt-3 whitespace-nowrap text-[10px] font-semibold leading-4 text-white sm:text-[11px]"
                  >
                    {channel.label}
                  </span>
                </div>

                {index < channels.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="relative mt-[19px] h-[2px] min-w-[7px] flex-1 bg-white/25 sm:mt-[23px]"
                  >
                    <span
                      data-channel-line
                      className="absolute inset-0 origin-left scale-x-0 bg-white"
                    />
                  </div>
                )}
              </Fragment>
            );
          })}
        </div>

        <div className="mt-auto flex items-center gap-2 border-t border-white/20 pt-4 text-[11px] font-medium leading-5 text-white/90">
          <span
            aria-hidden="true"
            className="h-2 w-2 shrink-0 rounded-full bg-white"
          />
          Every channel, one consistent customer experience.
        </div>
      </div>
    </article>
  );
}

// ======================================================
// FIRSTNOTCH FAQ SECTION
// DESKTOP: TWO AUTO-SCROLLING ROWS
// MOBILE: ONE AUTO-SCROLLING ROW
// ======================================================

type FaqItem = (typeof questions)[number];

type ScrollDirection = 'left' | 'right';

// ======================================================
// FAQ CARD
// ======================================================

function FaqCard({
  item,
  duplicate = false,
}: {
  item: FaqItem;
  duplicate?: boolean;
}) {
  return (
    <article
      tabIndex={duplicate ? -1 : 0}
      className="
        flex
        h-[220px]
        w-[255px]
        shrink-0
        flex-col
        overflow-hidden
        rounded-[20px]
        border
        border-[#17191C]/[.08]
        bg-white
        p-[18px]
        shadow-[0_10px_28px_rgba(23,25,28,.05)]
        outline-none
        transition-colors
        duration-300
        hover:border-[#B12025]/50
        focus-visible:ring-2
        focus-visible:ring-[#B12025]

        sm:h-[290px]
        sm:w-[405px]
        sm:rounded-[26px]
        sm:p-8
        sm:shadow-[0_14px_35px_rgba(23,25,28,.06)]
      "
    >
      {/* TOP LABEL */}

      <div className="flex items-center justify-between gap-2">
        <span
          className="
            text-[9px]
            font-semibold
            uppercase
            tracking-[.13em]
            text-[#B12025]

            sm:text-[10px]
            sm:tracking-[.2em]
          "
        >
          FIRSTNOTCH / FAQ
        </span>

        <MessageCircle
          size={16}
          strokeWidth={1.7}
          className="shrink-0 text-[#B12025] sm:h-[18px] sm:w-[18px]"
          aria-hidden="true"
        />
      </div>

      {/* QUESTION */}

      <h3
        className="
          mt-[13px]
          text-[15px]
          font-semibold
          leading-[1.3]
          tracking-[-.025em]
          text-[#17191C]

          sm:mt-6
          sm:text-[21px]
          sm:leading-[1.33]
          sm:tracking-[-.03em]
        "
      >
        {item.q}
      </h3>

      {/* ANSWER */}

      <p
        className="
          mt-[10px]
          overflow-hidden
          text-[11px]
          leading-[1.55]
          text-[#17191C]/65

          sm:mt-4
          sm:text-[14px]
          sm:leading-[1.75]
        "
        style={{
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 5,
        }}
      >
        {item.a}
      </p>

      {/* BOTTOM TAG */}

      <span
        className="
          mt-auto
          inline-flex
          w-fit
          shrink-0
          rounded-full
          bg-[#B12025]/[.07]
          px-[10px]
          py-[5px]
          text-[9px]
          font-semibold
          text-[#B12025]

          sm:px-3
          sm:py-1.5
          sm:text-[10px]
        "
      >
        {item.tag}
      </span>
    </article>
  );
}

// ======================================================
// AUTOMATIC HORIZONTAL SCROLLER
// ======================================================

function HorizontalScroller({
  items,
  speed,
  direction,
  label,
}: {
  items: FaqItem[];
  speed: number;
  direction: ScrollDirection;
  label: string;
}) {
  return (
    <div
      role="region"
      aria-label={label}
      className="
        fn-faq-roller
        relative
        w-full
        overflow-hidden
        py-[6px]

        sm:py-2
      "
    >
      {/* TWO COPIES CREATE A SEAMLESS LOOP */}

      <div
        className="
          fn-faq-track
          flex
          w-max
          items-stretch
        "
        style={{
          animation: `fnFaqMarquee ${speed}s linear infinite`,

          animationDirection:
            direction === 'right' ? 'reverse' : 'normal',
        }}
      >
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1 ? true : undefined}
            className="
              flex
              shrink-0
              items-stretch
              gap-[12px]
              pr-[12px]

              sm:gap-5
              sm:pr-5
            "
          >
            {items.map((item, index) => (
              <FaqCard
                key={`${copy}-${index}-${item.q}`}
                item={item}
                duplicate={copy === 1}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ======================================================
// FAQ SECTION
// ======================================================

function FaqRollerSection() {
  const rows: {
    id: string;
    direction: ScrollDirection;
    speed: number;
    items: FaqItem[];
  }[] = [
    {
      id: 'upper',
      direction: 'left',
      speed: 48,
      items: [...questions],
    },
    {
      id: 'lower',
      direction: 'right',
      speed: 57,
      items: [...questions].reverse(),
    },
  ];

  return (
    <section
      id="faq"
      aria-labelledby="services-faq-title"
      className="
        scroll-mt-[140px]
        overflow-hidden
        bg-[#FAF9F8]

        pb-[38px]
        pt-[38px]

        sm:py-[135px]
      "
    >
      {/* ============================================
          FAQ HEADING
      ============================================ */}

      <div
        className="
          mx-auto
          max-w-[1440px]
          px-[12px]
          text-center

          sm:px-5
          md:px-10
        "
      >
        {/* LABEL */}

        <p
          data-reveal
          className="
            text-[9px]
            font-semibold
            uppercase
            tracking-[.13em]
            text-[#B12025]

            sm:text-[11px]
            sm:tracking-[.23em]
          "
        >
          STRAIGHT ANSWERS / FIRSTNOTCH
        </p>

        {/* MAIN TITLE */}

        <h2
          id="services-faq-title"
          data-reveal
          className="
            mt-[14px]
            whitespace-nowrap
            text-[clamp(21px,7vw,30px)]
            font-semibold
            leading-[1.12]
            tracking-[-.055em]
            text-[#17191C]

            sm:mt-[22px]
            sm:whitespace-normal
            sm:text-[clamp(40px,5vw,70px)]
            sm:leading-[1.1]
          "
        >
          Common questions.
        </h2>

        {/* DESCRIPTION */}

        <p
          data-reveal
          className="
            mx-auto
            mt-[12px]
            max-w-[290px]
            text-[11px]
            leading-[1.6]
            text-[#17191C]/60

            sm:mt-5
            sm:max-w-[650px]
            sm:text-[14px]
            sm:leading-7
          "
        >
          Clear answers about quality, timelines,
          contracts, pricing and data protection.
        </p>
      </div>

      {/* ============================================
          MOBILE VIEW
          ONE AUTO-SCROLLING ROW
      ============================================ */}

      <div className="mt-[22px] block sm:hidden">
        <HorizontalScroller
          items={[...questions]}
          speed={36}
          direction="left"
          label="Automatically scrolling FAQ cards"
        />
      </div>

      {/* ============================================
          DESKTOP / TABLET VIEW
          ORIGINAL TWO ROWS
      ============================================ */}

      <div
        className="
          mt-12
          hidden
          flex-col
          gap-5

          sm:mt-16
          sm:flex
          sm:gap-7
        "
      >
        {rows.map((row) => (
          <HorizontalScroller
            key={row.id}
            items={row.items}
            speed={row.speed}
            direction={row.direction}
            label={
              row.direction === 'left'
                ? 'Left-moving FAQ cards'
                : 'Right-moving FAQ cards'
            }
          />
        ))}
      </div>

      {/* ============================================
          ANIMATION STYLES
      ============================================ */}

      <style>{`
        @keyframes fnFaqMarquee {
          from {
            transform: translate3d(0, 0, 0);
          }

          to {
            transform: translate3d(-50%, 0, 0);
          }
        }

        .fn-faq-track {
          will-change: transform;
        }

        /* Pause on desktop hover/focus */

        @media (min-width: 640px) {
          .fn-faq-roller:hover .fn-faq-track,
          .fn-faq-roller:focus-within .fn-faq-track {
            animation-play-state: paused !important;
          }
        }

        /* Mobile cards move automatically */

        @media (max-width: 639px) {
          .fn-faq-roller {
            overflow: hidden;
            touch-action: pan-y;
          }

          .fn-faq-track {
            animation-play-state: running;
          }
        }

        /* Accessibility */

        @media (prefers-reduced-motion: reduce) {
          .fn-faq-roller {
            overflow-x: auto;
            scrollbar-width: none;
          }

          .fn-faq-roller::-webkit-scrollbar {
            display: none;
          }

          .fn-faq-track {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}
// ======================================================
// 07 — MAIN SERVICES EXPERIENCE
// ======================================================

export default function ServicesExperience() {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const showcaseRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
 
// ======================================================
// MOBILE CATEGORY AUTO SLIDER
// Desktop GSAP behaviour remains unchanged
// ======================================================

const mobileCategoryIndexRef = useRef(0);

const nextMobileCategory = () => {
  const track = trackRef.current;

  if (!track) return;

  const slides = Array.from(
    track.querySelectorAll<HTMLElement>('[data-category-slide]')
  );

  if (!slides.length) return;

  const nextIndex =
    (mobileCategoryIndexRef.current + 1) % slides.length;

  mobileCategoryIndexRef.current = nextIndex;

  const target = slides[nextIndex];

  track.scrollTo({
    left: target.offsetLeft - slides[0].offsetLeft,
    behavior: 'smooth',
  });
};

useEffect(() => {
  const track = trackRef.current;

  if (!track) return;

  const mobileQuery = window.matchMedia('(max-width: 639px)');
  const motionQuery = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  );

  let timer: ReturnType<typeof setInterval> | null = null;
  let touchStartX = 0;

  const getSlides = () =>
    Array.from(
      track.querySelectorAll<HTMLElement>('[data-category-slide]')
    );

  const stop = () => {
    if (timer !== null) {
      clearInterval(timer);
      timer = null;
    }
  };

  const syncIndex = () => {
    const slides = getSlides();

    if (!slides.length) return;

    const firstOffset = slides[0].offsetLeft;

    let nearestIndex = 0;
    let nearestDistance = Infinity;

    slides.forEach((slide, index) => {
      const distance = Math.abs(
        slide.offsetLeft - firstOffset - track.scrollLeft
      );

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    mobileCategoryIndexRef.current = nearestIndex;
  };

  const advance = () => {
    const slides = getSlides();

    if (!slides.length) return;

    const nextIndex =
      (mobileCategoryIndexRef.current + 1) % slides.length;

    mobileCategoryIndexRef.current = nextIndex;

    track.scrollTo({
      left: slides[nextIndex].offsetLeft - slides[0].offsetLeft,
      behavior: 'smooth',
    });
  };

  const start = () => {
    stop();

    if (!mobileQuery.matches || motionQuery.matches) return;

    timer = setInterval(advance, 6000);
  };

  const onTouchStart = (event: TouchEvent) => {
    touchStartX = event.touches[0]?.clientX ?? 0;
    stop();
  };

  const onTouchEnd = (event: TouchEvent) => {
    const touchEndX = event.changedTouches[0]?.clientX ?? 0;

    if (Math.abs(touchEndX - touchStartX) > 15) {
      window.setTimeout(syncIndex, 450);
    }

    start();
  };

  const onVisibilityChange = () => {
    if (document.hidden) {
      stop();
    } else {
      start();
    }
  };

  const onMediaChange = () => {
    stop();

    if (mobileQuery.matches) {
      mobileCategoryIndexRef.current = 0;
      track.scrollLeft = 0;
    }

    start();
  };

  track.addEventListener('touchstart', onTouchStart, {
    passive: true,
  });

  track.addEventListener('touchend', onTouchEnd, {
    passive: true,
  });

  track.addEventListener('scrollend', syncIndex);

  document.addEventListener(
    'visibilitychange',
    onVisibilityChange
  );

  mobileQuery.addEventListener('change', onMediaChange);
  motionQuery.addEventListener('change', onMediaChange);

  start();

  return () => {
    stop();

    track.removeEventListener('touchstart', onTouchStart);
    track.removeEventListener('touchend', onTouchEnd);
    track.removeEventListener('scrollend', syncIndex);

    document.removeEventListener(
      'visibilitychange',
      onVisibilityChange
    );

    mobileQuery.removeEventListener('change', onMediaChange);
    motionQuery.removeEventListener('change', onMediaChange);
  };
}, []);
  

  const [activeCategory, setActiveCategory] =
    useState(0);

  const [showcaseProgress, setShowcaseProgress] =
    useState(0);



  const [showStickyCall, setShowStickyCall] =
    useState(true);

  const [animatedCards, setAnimatedCards] =
    useState(false);
const mobileResultsRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const container = mobileResultsRef.current;

  if (!container) return;

  const mobileQuery = window.matchMedia('(max-width: 639px)');
  const motionQuery = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  );

  let timer: ReturnType<typeof setInterval> | null = null;
  let currentIndex = 0;

  const getCards = () =>
    Array.from(
      container.querySelectorAll<HTMLElement>('[data-result-card]')
    );

  const stop = () => {
    if (timer !== null) {
      clearInterval(timer);
      timer = null;
    }
  };

  const goToCard = (index: number) => {
    const cards = getCards();

    if (!cards.length) return;

    currentIndex = (index + cards.length) % cards.length;

    const firstCard = cards[0];
    const targetCard = cards[currentIndex];

    container.scrollTo({
      left: targetCard.offsetLeft - firstCard.offsetLeft,
      behavior: 'smooth',
    });
  };

  const start = () => {
    stop();

    if (!mobileQuery.matches || motionQuery.matches) return;

    timer = setInterval(() => {
      goToCard(currentIndex + 1);
    }, 3000);
  };

  const handleScrollEnd = () => {
    const cards = getCards();

    if (!cards.length) return;

    const firstOffset = cards[0].offsetLeft;

    let closestIndex = 0;
    let smallestDistance = Infinity;

    cards.forEach((card, index) => {
      const cardPosition = card.offsetLeft - firstOffset;
      const distance = Math.abs(
        cardPosition - container.scrollLeft
      );

      if (distance < smallestDistance) {
        smallestDistance = distance;
        closestIndex = index;
      }
    });

    currentIndex = closestIndex;
  };

  const handleMediaChange = () => {
    stop();

    if (mobileQuery.matches) {
      currentIndex = 0;
      container.scrollLeft = 0;
      start();
    }
  };

  const handleTouchStart = () => stop();

  const handleTouchEnd = () => {
    handleScrollEnd();
    start();
  };

  container.addEventListener('scrollend', handleScrollEnd);
  container.addEventListener('touchstart', handleTouchStart, {
    passive: true,
  });
  container.addEventListener('touchend', handleTouchEnd, {
    passive: true,
  });
  container.addEventListener('mouseenter', stop);
  container.addEventListener('mouseleave', start);

  mobileQuery.addEventListener('change', handleMediaChange);
  motionQuery.addEventListener('change', handleMediaChange);

  handleMediaChange();

  return () => {
    stop();

    container.removeEventListener('scrollend', handleScrollEnd);
    container.removeEventListener('touchstart', handleTouchStart);
    container.removeEventListener('touchend', handleTouchEnd);
    container.removeEventListener('mouseenter', stop);
    container.removeEventListener('mouseleave', start);

    mobileQuery.removeEventListener('change', handleMediaChange);
    motionQuery.removeEventListener('change', handleMediaChange);
  };
}, []);
  // RESPONSIVE MODE

  useEffect(() => {
    const media = window.matchMedia(
      '(min-width: 768px) and (prefers-reduced-motion: no-preference)'
    );

    const update = () => {
      setAnimatedCards(media.matches);
    };

    update();

    media.addEventListener('change', update);

    return () => {
      media.removeEventListener('change', update);
    };
  }, []);

  // ACTIVE CATEGORY + STICKY CALL BUTTON

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCategory(
              Number(
                (entry.target as HTMLElement)
                  .dataset.index
              )
            );
          }
        });
      },
      {
        rootMargin: '-33% 0px -48% 0px',
      }
    );

    categories.forEach((category, index) => {
      const element =
        document.getElementById(category.id);

      if (element) {
        element.dataset.index = String(index);
        observer.observe(element);
      }
    });

    const contact =
      document.getElementById('contact');

    const contactObserver = new IntersectionObserver(
      ([entry]) => {
        setShowStickyCall(!entry.isIntersecting);
      },
      {
        threshold: 0.12,
      }
    );

    if (contact) {
      contactObserver.observe(contact);
    }

    return () => {
      observer.disconnect();
      contactObserver.disconnect();
    };
  }, []);



  // ====================================================
  // 08 — GSAP SCROLL ANIMATIONS
  // ====================================================

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, Flip);

    const mm = gsap.matchMedia();

    // DESKTOP PINNED HORIZONTAL CATEGORIES

    mm.add(
      '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
      () => {
        const section = showcaseRef.current;
        const track = trackRef.current;

        if (!section || !track) return;

        const slides = Array.from(
          track.querySelectorAll<HTMLElement>(
            '[data-category-slide]'
          )
        );

        const distance = () =>
          Math.max(
            0,
            track.scrollWidth - section.clientWidth
          );

        const timelines = slides.map((slide) => {
          const number =
            slide.querySelector<HTMLElement>(
              '[data-category-number]'
            );

          const elements = Array.from(
            slide.querySelectorAll<HTMLElement>(
              '[data-category-animate]'
            )
          );

          if (number) {
            gsap.set(number, {
              autoAlpha: 0,
              x: -45,
              scale: 0.94,
              transformOrigin: 'center center',
            });
          }

          gsap.set(elements, {
            autoAlpha: 0,
            y: 42,
          });

          const timeline = gsap.timeline({
            paused: true,
          });

          if (number) {
            timeline.to(
              number,
              {
                autoAlpha: 1,
                x: 0,
                scale: 1,
                duration: 1,
                ease: 'power3.out',
              },
              0
            );
          }

          timeline.to(
            elements,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.16,
              ease: 'power3.out',
            },
            0.12
          );

          return timeline;
        });

        const horizontalTween = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',

          scrollTrigger: {
            trigger: section,
            pin: true,
            pinSpacing: true,
            start: 'top top+=150',
            end: () => `+=${distance()}`,
            scrub: 0.85,
            invalidateOnRefresh: true,
            anticipatePin: 1,

            onUpdate: (self) => {
              setShowcaseProgress(self.progress);
            },
          },
        });

        const revealTriggers: ScrollTrigger[] = [];

        if (slides.length > 0) {
          revealTriggers.push(
            ScrollTrigger.create({
              trigger: section,
              start: 'top 78%',
              once: true,
              onEnter: () => timelines[0]?.play(),
            })
          );
        }

        slides.slice(1).forEach(
          (slide, offset) => {
            revealTriggers.push(
              ScrollTrigger.create({
                trigger: slide,
                containerAnimation: horizontalTween,
                start: 'left 78%',
                once: true,

                onEnter: () =>
                  timelines[offset + 1]?.play(),
              })
            );
          }
        );

        return () => {
          revealTriggers.forEach((trigger) =>
            trigger.kill()
          );

          timelines.forEach((timeline) =>
            timeline.kill()
          );

          horizontalTween.scrollTrigger?.kill();
          horizontalTween.kill();
        };
      }
    );

    // MOBILE CATEGORY REVEALS

    mm.add(
      '(min-width: 640px) and (max-width: 1023px) and (prefers-reduced-motion: no-preference)',
      () => {
        const track = trackRef.current;

        if (!track) return;

        const animations = Array.from(
          track.querySelectorAll<HTMLElement>(
            '[data-category-slide]'
          )
        ).map((slide) => {
          const elements = Array.from(
            slide.querySelectorAll<HTMLElement>(
              '[data-category-number], [data-category-animate]'
            )
          );

          return gsap.fromTo(
            elements,
            {
              autoAlpha: 0,
              y: 26,
            },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.1,
              ease: 'power3.out',

              scrollTrigger: {
                trigger: slide,
                start: 'top 82%',
                once: true,
              },
            }
          );
        });

        return () => {
          animations.forEach((animation) => {
            animation.scrollTrigger?.kill();
            animation.kill();
          });
        };
      }
    );

    // GENERAL SCROLL REVEALS

    mm.add(
      '(prefers-reduced-motion: no-preference)',
      () => {
        if (!rootRef.current) return;

        const animations: gsap.core.Tween[] = [];

        const nodes =
          gsap.utils.toArray<HTMLElement>(
            rootRef.current.querySelectorAll(
              '[data-reveal]'
            )
          );

        nodes.forEach((node) => {
          animations.push(
            gsap.fromTo(
              node,
              {
                y: 45,
                opacity: 0,
              },
              {
                y: 0,
                opacity: 1,
                duration: 0.85,
                ease: 'power3.out',

                scrollTrigger: {
                  trigger: node,
                  start: 'top 88%',
                  once: true,
                },
              }
            )
          );
        });

        rootRef.current
          .querySelectorAll<HTMLElement>(
            '[data-float]'
          )
          .forEach((node, index) => {
            animations.push(
              gsap.to(node, {
                y: index % 2 === 0 ? -65 : 80,
                ease: 'none',

                scrollTrigger: {
                  trigger: heroRef.current,
                  start: 'top top',
                  end: 'bottom top',
                  scrub: 1.6,
                },
              })
            );
          });

        return () => {
          animations.forEach((animation) => {
            animation.scrollTrigger?.kill();
            animation.kill();
          });
        };
      }
    );

    // MOUSE PARALLAX

    mm.add(
      '(pointer: fine) and (prefers-reduced-motion: no-preference)',
      () => {
        const hero = heroRef.current;

        if (!hero) return;

        const layers = Array.from(
          hero.querySelectorAll<HTMLElement>(
            '[data-mouse-depth]'
          )
        );

        const moves = layers.map((layer) => ({
          depth: Number(
            layer.dataset.mouseDepth || '1'
          ),

          x: gsap.quickTo(layer, 'x', {
            duration: 1,
            ease: 'power3.out',
          }),

          y: gsap.quickTo(layer, 'y', {
            duration: 1,
            ease: 'power3.out',
          }),
        }));

        const move = (event: MouseEvent) => {
          const rect = hero.getBoundingClientRect();

          const px =
            (event.clientX - rect.left) /
              rect.width -
            0.5;

          const py =
            (event.clientY - rect.top) /
              rect.height -
            0.5;

          moves.forEach(({ depth, x, y }) => {
            x(-px * 32 * depth);
            y(-py * 28 * depth);
          });
        };

        const reset = () => {
          moves.forEach(({ x, y }) => {
            x(0);
            y(0);
          });
        };

        hero.addEventListener('mousemove', move);
        hero.addEventListener('mouseleave', reset);

        return () => {
          hero.removeEventListener('mousemove', move);
          hero.removeEventListener('mouseleave', reset);
        };
      }
    );

    let alive = true;

    document.fonts?.ready.then(() => {
      if (alive) ScrollTrigger.refresh();
    });

    return () => {
      alive = false;
      mm.revert();
    };
  }, []);

  // ====================================================
  // 09 — SERVICES PAGE JSX
  // ====================================================

  return (
    <div
      ref={rootRef}
      className="min-h-screen overflow-x-clip bg-white font-sans text-[#17191C]"
    >
      <Navbar />

      <main className="pt-[88px]">
        {/* HERO */}

        <section
          ref={heroRef}
          id="services-hero"
          className="relative isolate overflow-hidden bg-gradient-to-br from-white via-[#fcfbfa] to-[#f7f5f3]"
        >
          <div
  aria-hidden="true"
  className="pointer-events-none absolute inset-0 hidden sm:block"
>
            <div
              data-float
              data-mouse-depth="0.6"
              className="absolute -right-[8%] top-[4%] h-[480px] w-[480px] rounded-full bg-[#B12025]/[.08] blur-[100px]"
            />

            <div
              data-float
              data-mouse-depth="1.2"
              className="absolute -bottom-[180px] -left-32 h-[400px] w-[400px] rounded-full bg-[#B12025]/[.07] blur-[95px]"
            />

            <Headset
              data-float
              data-mouse-depth="1"
              className="absolute right-[8%] top-[20%] h-28 w-28 text-[#B12025]/15"
              strokeWidth={0.65}
            />

            <FileText
              data-float
              data-mouse-depth="1.6"
              className="absolute right-[27%] top-[52%] h-40 w-40 text-[#B12025]/10"
              strokeWidth={0.55}
            />

            <Code2
              data-float
              data-mouse-depth="0.85"
              className="absolute bottom-[8%] right-[4%] h-44 w-44 text-[#B12025]/15"
              strokeWidth={0.6}
            />
          </div>

         <div className="relative mx-auto max-w-[1440px] px-5 pb-[38px] pt-[42px] md:px-10 md:pb-32 md:pt-36 lg:pt-44">
            <p
              data-reveal
             className="mb-4 text-[11px] font-semibold tracking-[.025em] text-[#B12025] sm:mb-7 sm:text-[13px]" 
            >
              Outsourcing services in Sri Lanka.
            </p>

            <h1
              data-reveal
             className="max-w-[1030px] text-[clamp(2rem,8.5vw,2.5rem)] font-semibold leading-[1.12] tracking-[-.055em] sm:text-[clamp(3rem,6.5vw,6.9rem)] sm:leading-[1.055] sm:tracking-[-.07em]"
            >
              Hand over your{' '}
              <span className="text-[#B12025]">
                customer support, back office and IT work.
              </span>
            </h1>

            <p
              data-reveal
              className="mt-8 max-w-[710px] text-[15px] leading-8 text-[#17191C]/60 sm:text-[17px]"
            >
              FirstNotch offers 16 BPO services in Sri Lanka.
              Choose one or several. A trained team of 30+
              in Colombo works in your tools and follows
              your processes. Every piece of work gets a
              quality score, whether it is a support call
              or a website update.
            </p>

            <button
              type="button"
              data-reveal
              onClick={() => jumpTo('contact')}
              className="group mt-6 inline-flex items-center gap-2 rounded-full bg-[#B12025] px-5 py-3 text-[11px] font-semibold text-white transition duration-300 hover:bg-[#961b21] sm:mt-9 sm:gap-4 sm:px-7 sm:py-4 sm:text-sm"
            >
              Book a free discovery call

              <ArrowUpRight
                size={18}
                className="transition group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </button>

            <div
  data-reveal
  className="mt-20 hidden gap-3 md:grid md:grid-cols-3"
>
              {categories.map((category, index) => (
                <button
                  type="button"
                  key={category.id}
                  onClick={() => jumpTo(category.id)}
                  className="group flex items-center justify-between gap-3 rounded-2xl border border-[#17191C]/10 bg-white/85 p-6 text-left shadow-[0_10px_35px_rgba(23,25,28,.035)] transition duration-300 hover:-translate-y-1 hover:border-[#B12025]/55 hover:shadow-[0_16px_38px_rgba(177,32,37,.08)]"
                >
                  <span>
                    <span className="block text-[11px] font-medium uppercase tracking-[.16em] text-[#17191C]/40">
                      0{index + 1} / {category.services.length} services
                    </span>

                    <span className="mt-2 block text-base font-semibold">
                      {category.short}
                    </span>
                  </span>

                  <ArrowDownRight
                    size={22}
                    className="shrink-0 text-[#B12025] transition-transform group-hover:translate-x-1 group-hover:translate-y-1"
                  />
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* STICKY CATEGORY NAVIGATION */}

        <nav
          aria-label="Service category navigation"
          className="sticky top-[88px] z-40 border-b border-[#17191C]/10 bg-white/85 backdrop-blur-xl"
        >
          <div className="mx-auto flex max-w-[1440px] justify-between gap-1 overflow-x-auto px-2 [scrollbar-width:none] md:gap-12 md:px-10 [&::-webkit-scrollbar]:hidden">
            {categories.map((category, index) => (
              <button
                key={category.id}
                type="button"
                onClick={() => jumpTo(category.id)}
                className={`relative shrink-0 whitespace-nowrap py-4 text-[9px] font-medium tracking-[-.025em] sm:font-semibold sm:tracking-normal transition-colors sm:py-5 sm:text-[13px] ${
                  activeCategory === index
                    ? 'text-[#B12025]'
                    : 'text-[#17191C]/55 hover:text-[#17191C]'
                }`}
              >
                {category.short}

                <span className="ml-0.5 text-[8px] opacity-55 sm:ml-1 sm:text-[11px]">
                  {category.services.length}
                </span>

                <span
                  className={`absolute bottom-0 left-0 h-[3px] w-full origin-left bg-[#B12025] transition-transform duration-500 ${
                    activeCategory === index
                      ? 'scale-x-100'
                      : 'scale-x-0'
                  }`}
                />
              </button>
            ))}
          </div>
        </nav>

{/* =====================================================
    BENTO STATISTICS
    MOBILE: AUTOMATIC HORIZONTAL CAROUSEL
    DESKTOP: ORIGINAL GRID DESIGN
===================================================== */}

<section
  id="results"
  className="overflow-hidden bg-[#f8f7f5] py-10 sm:py-32"
>
  <div className="mx-auto max-w-[1440px] px-5 md:px-10">

    {/* SECTION LABEL */}

    <p
      data-reveal
      className="
        text-[10px]
        font-semibold
        uppercase
        tracking-[.16em]
        text-[#B12025]

        sm:text-xs
        sm:tracking-[.2em]
      "
    >
      Why our work is measurable
    </p>

    {/* SECTION HEADING */}

    <h2
      data-reveal
      className="
        mt-3
        max-w-3xl
        text-[25px]
        font-semibold
        leading-[1.15]
        tracking-[-.045em]
        text-[#17191C]

        sm:mt-4
        sm:text-[clamp(2.5rem,4.9vw,5rem)]
        sm:leading-[1.1]
        sm:tracking-[-.055em]
      "
    >
      The results behind the work.
    </h2>

    {/* RESULTS CAROUSEL / DESKTOP GRID */}

    <div
      ref={mobileResultsRef}
      aria-label="FirstNotch performance results"
      className="
        mt-7
        flex
        w-full
        gap-3
        overflow-x-auto
        overscroll-x-contain
        snap-x
        snap-mandatory
        scroll-smooth
        pb-3

        [scrollbar-width:none]
        [&::-webkit-scrollbar]:hidden

        sm:mt-12
        sm:grid
        sm:grid-cols-2
        sm:gap-4
        sm:overflow-visible
        sm:pb-0

        lg:grid-cols-3
      "
    >
      {proofNumbers.map((proof, index) => {
        const red = proof.kind === 'red';
        const charcoal = proof.kind === 'charcoal';

        return (
          <div
            key={proof.title}
            data-result-card
            className={`
              relative
              box-border
              flex
              h-[185px]
              w-[calc(100%-12px)]
              min-w-[calc(100%-12px)]
              max-w-[calc(100%-12px)]
              shrink-0
              snap-start
              flex-col
              overflow-hidden
              rounded-[20px]
              border
              p-5
              shadow-[0_12px_40px_rgba(23,25,28,.035)]

              sm:h-auto
              sm:min-h-[235px]
              sm:w-auto
              sm:min-w-0
              sm:max-w-none
              sm:shrink
              sm:rounded-[28px]
              sm:p-8

              ${
                red
                  ? `
                    border-[#B12025]
                    bg-[#B12025]
                    text-white
                    sm:col-span-2
                    lg:col-span-2
                  `
                  : charcoal
                  ? `
                    border-[#17191C]
                    bg-[#17191C]
                    text-white
                  `
                  : `
                    border-[#17191C]/10
                    bg-white
                    text-[#17191C]
                  `
              }
            `}
          >
            {/* CIRCULAR PROGRESS */}

            {(red || index === 1) && (
              <div
                className="
                  pointer-events-none
                  absolute
                  right-5
                  top-5
                  opacity-85

                  sm:right-6
                  sm:top-6
                "
              >
                <ProofRing
                  value={proof.value}
                  inverted={red}
                />
              </div>
            )}

            {/* ANIMATED NUMBER */}

            <div
              className="
                relative
                z-10
                text-[39px]
                font-semibold
                leading-none
                tracking-[-.07em]

                sm:text-[clamp(3.2rem,5.5vw,6.1rem)]
              "
            >
              <AnimatedNumber
                value={proof.value}
                suffix={proof.suffix}
              />
            </div>

            {/* RESULT TITLE */}

            <p
              className="
                relative
                z-10
                mt-5
                text-[14px]
                font-semibold
                leading-[1.3]

                sm:mt-7
                sm:text-[18px]
              "
            >
              {proof.title}
            </p>

            {/* RESULT DESCRIPTION */}

            <p
              className={`
                relative
                z-10
                mt-2
                max-w-[190px]
                text-[11px]
                leading-[1.5]

                sm:max-w-none
                sm:text-[13px]

                ${
                  red || charcoal
                    ? 'text-white/70'
                    : 'text-[#17191C]/50'
                }
              `}
            >
              {proof.detail}
            </p>

            {/* MOBILE CARD NUMBER */}

            <span
              className={`
                absolute
                bottom-4
                right-5
                text-[10px]
                font-medium
                tracking-[.15em]
                sm:hidden

                ${
                  red || charcoal
                    ? 'text-white/50'
                    : 'text-[#17191C]/35'
                }
              `}
            >
              0{index + 1} / 0{proofNumbers.length}
            </span>
          </div>
        );
      })}
    </div>
  </div>
</section>

       {/* ======================================================
    HORIZONTAL CATEGORY SHOWCASE

    MOBILE:
    - Automatic horizontal scrolling
    - Next button
    - Manual swipe
    - Three category slides
    - Continuous looping

    DESKTOP:
    - Original GSAP pinned horizontal scrolling
    - Original layout and animations
====================================================== */}

<section
  ref={showcaseRef}
  aria-label="Explore our service categories"
  className="
    relative
    overflow-hidden
    bg-[#B12025]
    lg:h-[calc(100vh-150px)]
  "
>
  {/* CATEGORY TRACK */}

  <div
    ref={trackRef}
    className="
      relative
      flex
      w-full
      flex-row
      snap-x
      snap-mandatory
      overflow-x-auto
      overscroll-x-contain
      scroll-smooth

      [scrollbar-width:none]
      [&::-webkit-scrollbar]:hidden

      lg:h-full
      lg:w-max
      lg:overflow-visible
      lg:snap-none
    "
  >
    {categories.map((category, index) => {
      const white = index === 1;

      return (
        <div
          key={category.id}
          data-category-slide
          className={`
            relative
            flex
            min-h-[570px]
            w-full
            shrink-0
            snap-start
            items-center
            border-r
            px-5
            pb-14
            pt-12

            md:px-10

            lg:h-[calc(100vh-150px)]
            lg:w-screen
            lg:snap-align-none
            lg:border-b-0
            lg:py-10

            ${
              white
                ? 'border-[#B12025]/10 bg-white text-[#B12025]'
                : 'border-white/15 bg-[#B12025] text-white'
            }
          `}
        >
          {/* CARD CONTENT */}

          <div
            className="
              relative
              mx-auto
              grid
              w-full
              max-w-[1280px]
              items-center
              gap-5

              lg:grid-cols-[.45fr_1fr]
              lg:gap-12
            "
          >
            {/* LARGE CATEGORY NUMBER */}

            <div
              data-category-number
              aria-hidden="true"
              className={`
                select-none
                text-[clamp(6.5rem,29vw,8rem)]
                font-bold
                leading-none
                tracking-[-.14em]

                lg:text-[clamp(8rem,21vw,20rem)]

                ${
                  white
                    ? 'text-[#B12025]'
                    : 'text-white'
                }
              `}
            >
              0{index + 1}
            </div>

            {/* TEXT CONTENT */}

            <div className="relative">
              {/* CATEGORY LABEL */}

              <p
                data-category-animate
                className={`
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[.22em]

                  ${
                    white
                      ? 'text-[#B12025]'
                      : 'text-white/85'
                  }
                `}
              >
                Explore category 0{index + 1}
              </p>

              {/* CATEGORY TITLE */}

              <h2
                data-category-animate
                className={`
                  mt-3
                  text-[clamp(2.4rem,10vw,3.2rem)]
                  font-semibold
                  leading-[1.05]
                  tracking-[-.06em]

                  lg:mt-5
                  lg:text-[clamp(3rem,5.6vw,6rem)]

                  ${
                    white
                      ? 'text-[#B12025]'
                      : 'text-white'
                  }
                `}
              >
                {category.label}
              </h2>

              {/* CATEGORY DESCRIPTION */}

              <p
                data-category-animate
                className={`
                  mt-4
                  max-w-[620px]
                  text-[13px]
                  leading-[1.75]

                  lg:mt-7
                  lg:text-[16px]
                  lg:leading-8

                  ${
                    white
                      ? 'text-[#B12025]/85'
                      : 'text-white/85'
                  }
                `}
              >
                {category.description}
              </p>

              {/* PROOF STATISTIC */}

              <p
                data-category-animate
                className={`
                  mt-5
                  text-[clamp(1.5rem,6.5vw,2rem)]
                  font-semibold
                  tracking-tight

                  lg:mt-8
                  lg:text-[clamp(2rem,3vw,3.1rem)]

                  ${
                    white
                      ? 'text-[#B12025]'
                      : 'text-white'
                  }
                `}
              >
                {category.proof}
              </p>

              {/* EXPLORE SERVICES BUTTON */}

              <button
                data-category-animate
                type="button"
                onClick={() => jumpTo(category.id)}
                className={`
                  group
                  mt-5
                  inline-flex
                  items-center
                  gap-3
                  text-[12px]
                  font-semibold
                  transition-opacity
                  hover:opacity-70

                  lg:mt-8
                  lg:text-sm

                  ${
                    white
                      ? 'text-[#B12025]'
                      : 'text-white'
                  }
                `}
              >
                Explore {category.services.length} services

                <ArrowRight
                  size={19}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-2
                  "
                />
              </button>
            </div>
          </div>
        </div>
      );
    })}
  </div>

  {/* ======================================================
      MOBILE NEXT BUTTON
      Hidden on tablet and desktop
  ====================================================== */}

  <button
    type="button"
    onClick={nextMobileCategory}
    aria-label="Go to next service category"
    className="
      absolute
      bottom-[18px]
      right-[18px]
      z-30
      inline-flex
      items-center
      justify-center
      gap-[8px]
      rounded-full
      border
      border-[#B12025]/20
      bg-white
      px-[20px]
      py-[12px]
      text-[12px]
      font-semibold
      text-[#B12025]
      shadow-[0_8px_30px_rgba(0,0,0,0.16)]
      transition-all
      duration-300
      active:scale-95

      sm:hidden
    "
  >
    Next

    <ArrowRight
      size={16}
      strokeWidth={2}
    />
  </button>

  {/* ======================================================
      DESKTOP SCROLL PROGRESS
      Original behaviour preserved
  ====================================================== */}

  <div
    aria-hidden="true"
    className={`
      pointer-events-none
      absolute
      inset-x-0
      bottom-0
      z-20
      hidden
      h-[3px]

      lg:block

      ${
        showcaseProgress >= 0.25 &&
        showcaseProgress <= 0.75
          ? 'bg-[#B12025]/20'
          : 'bg-white/20'
      }
    `}
  >
    <div
      className={`
        h-full
        transition-colors
        duration-300

        ${
          showcaseProgress >= 0.25 &&
          showcaseProgress <= 0.75
            ? 'bg-[#B12025]'
            : 'bg-white'
        }
      `}
      style={{
        width: `${showcaseProgress * 100}%`,
      }}
    />
  </div>
</section>

        {/* CUSTOMER SUPPORT, BACK OFFICE AND IT SERVICE RAILS */}

        {categories.map((category, index) => (
          <section
            key={category.id}
            id={category.id}
            className={`scroll-mt-[155px] border-t border-[#17191C]/5 py-10 sm:py-28 ${
              index % 2 === 0
                ? 'bg-white'
                : 'bg-[#f8f7f5]'
            }`}
          >
            <div className="mx-auto max-w-[1440px] px-5 md:px-10">
              <div
                data-reveal
                className="mb-6 flex flex-col justify-between gap-3 sm:mb-12 sm:gap-6 lg:flex-row lg:items-end"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[.24em] text-[#B12025]">
                    0{index + 1} / {category.services.length} services
                  </p>

                  <h2 className="mt-2 text-[clamp(2rem,8vw,2.6rem)] font-semibold leading-[1.08] tracking-[-.06em] sm:mt-4 sm:text-[clamp(2.6rem,5vw,5rem)]">
                    {category.label}
                    <span className="text-[#B12025]">.</span>
                  </h2>

                  <p className="mt-3 max-w-[740px] text-[12px] leading-[1.65] text-[#17191C]/60 sm:mt-4 sm:text-base sm:leading-8">
                    {category.description}
                  </p>
                </div>

                <div className="shrink-0 self-start rounded-full border border-[#B12025]/20 bg-white px-4 py-2 text-[12px] font-semibold text-[#B12025] sm:px-6 sm:py-3 sm:text-sm">
                  {category.proof}
                </div>
              </div>

              {category.id === 'customer-support' && (
                <div className="mb-8 flex snap-x snap-mandatory items-stretch gap-3 overflow-x-auto overscroll-x-contain pb-3 [scrollbar-width:none] [&>article]:w-[88%] [&>article]:min-w-[88%] [&>article]:shrink-0 [&>article]:snap-start [&::-webkit-scrollbar]:hidden sm:mb-12 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:pb-0 sm:[&>article]:w-auto sm:[&>article]:min-w-0 sm:[&>article]:shrink sm:[&>article]:snap-none">
                  <LanguageBentoCard />
                  <AnimatedChannelFlowCard />
                </div>
              )}

              <ServiceRail
                category={category}
                animateFlip={animatedCards}
              />
            </div>
          </section>
        ))}

        {/* =====================================================
            QUALITY PROMISE — YOUR FINISHED COMPONENT
            No duplicate code or states
        ===================================================== */}

        <QualityPromise />

       <FaqRollerSection />

        {/* CONTACT SECTION */}

        <StoryContact />
      </main>
    </div>
  );
}
