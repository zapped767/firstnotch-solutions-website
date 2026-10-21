
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
import { categories, questions } from './serviceData';

// =====================================================
// 01 — PAGE DATA
// =====================================================

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

const qualitySteps = [
  {
    number: '01',
    title: 'Hiring',
    text: 'Only 15 to 20% of applicants pass our hiring checks. We select people who can represent your business well.',
  },
  {
    number: '02',
    title: 'Training',
    text: 'Your team learns your tools, workflows, customer expectations and tone before live work begins.',
  },
  {
    number: '03',
    title: 'QA score',
    text: 'Every piece of work receives a quality score, from a support call to a website update.',
  },
  {
    number: '04',
    title: 'Monthly review',
    text: 'Individual performance is reviewed every month, with coaching and clear actions for improvement.',
  },
];

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

// =====================================================
// 02 — HELPERS
// =====================================================

function jumpTo(id: string) {
  document.getElementById(id)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
}

function prefersReducedMotion() {
  return window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;
}

// =====================================================
// 03 — ANIMATED NUMBER
// =====================================================

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

        if (prefersReducedMotion()) {
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
            Math.round(
              value * (1 - Math.pow(1 - t, 3))
            )
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

  return <span ref={ref}>{shown}{suffix}</span>;
}

// =====================================================
// 04 — STATISTIC RING
// =====================================================

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
      className="h-[84px] w-[84px] -rotate-90"
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
        stroke={inverted ? '#FFFFFF' : '#B12025'}
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

// =====================================================
// 05 — PREMIUM LANGUAGE CARD
//
// HOVER ANIMATION:
// English -> Sinhala -> Tamil -> Hindi
//
// Each chip expands and changes to FirstNotch Red.
// No automatic animation on page scroll.
// =====================================================

function LanguageBentoCard() {
  const cardRef = useRef<HTMLElement>(null);
  const timelineRef =
    useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const card = cardRef.current;

    if (!card || prefersReducedMotion()) {
      return;
    }

    const chips = gsap.utils.toArray<HTMLElement>(
      card.querySelectorAll('[data-language-chip]')
    );

    const line =
      card.querySelector<HTMLElement>(
        '[data-language-line]'
      );

    const tl = gsap.timeline({
      paused: true,
      defaults: {
        ease: 'power3.out',
      },
    });

    chips.forEach((chip, index) => {
      // ============================================
      // MANUAL ADJUSTMENT:
      // 0.27 = delay between language animations
      // Increase for slower animation
      // ============================================

      const start = index * 0.27;

      tl.to(
        chip,
        {
          y: -6,
          scale: 1.07,
          backgroundColor: '#B12025',
          borderColor: '#B12025',
          color: '#FFFFFF',
          duration: 0.35,
        },
        start
      );

      tl.to(
        chip,
        {
          y: 0,
          scale: 1,
          duration: 0.40,
          ease: 'back.out(1.7)',
        },
        start + 0.28
      );
    });

    if (line) {
      tl.fromTo(
        line,
        {
          scaleX: 0,
        },
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
        [
          ...chips,
          ...(line ? [line] : []),
        ],
        { clearProps: 'all' }
      );
    };
  }, []);

  const play = () => {
    timelineRef.current?.restart();
  };

  const reverse = () => {
    timelineRef.current?.reverse();
  };

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
      aria-label="Four languages. Hover, focus or tap to highlight English, Sinhala, Tamil and Hindi."
      className="
        relative
        min-w-0
        overflow-hidden
        rounded-[26px]
        border
        border-[#17191C]/10
        bg-white
        p-6
        outline-none
        shadow-[0_8px_32px_rgba(23,25,28,.04)]
        transition-shadow
        duration-300
        hover:shadow-[0_16px_45px_rgba(177,32,37,.10)]
        focus-visible:ring-2
        focus-visible:ring-[#B12025]
        sm:p-8
      "
    >
      <div className="flex h-full min-h-[225px] flex-col">

        {/* Heading */}
        <h3 className="text-[15px] font-semibold text-[#17191C]">
          Four languages. One standard.
        </h3>

        {/* Animated language chips */}
        <div className="mt-7 flex flex-wrap gap-3">
          {languages.map((language) => (
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
                bg-[#fff6f5]
                px-4
                py-2.5
                text-[12px]
                font-medium
                text-[#B12025]
              "
            >
              {language}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="mt-7 max-w-[390px] text-[13px] leading-7 text-[#17191C]/60">
          Your customer hears one consistent answer,
          regardless of language.
        </p>

        {/* Animated underline */}
        <div
          aria-hidden="true"
          className="mt-auto pt-7"
        >
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

// =====================================================
// 06 — PREMIUM RED CHANNEL ANIMATION CARD
//
// Animation only on hover, keyboard focus or tap.
//
// 01 Call circle expands
// 02 Connecting line grows
// 03 Email circle expands
// 04 Connecting line grows
// 05 Message circle expands
// 06 Connecting line grows
// 07 Users circle expands
//
// Connector lines are separate flex elements.
// They NEVER overlap with the icon circles.
//
// No Replay button.
// =====================================================

function AnimatedChannelFlowCard() {
  const cardRef = useRef<HTMLElement>(null);

  const timelineRef =
    useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const card = cardRef.current;

    if (!card || prefersReducedMotion()) {
      return;
    }

    const icons = gsap.utils.toArray<HTMLElement>(
      card.querySelectorAll('[data-channel-icon]')
    );

    const lines = gsap.utils.toArray<HTMLElement>(
      card.querySelectorAll('[data-channel-line]')
    );

    const labels = gsap.utils.toArray<HTMLElement>(
      card.querySelectorAll('[data-channel-label]')
    );

    const timeline = gsap.timeline({
      paused: true,
      defaults: {
        ease: 'power3.out',
      },
    });

    icons.forEach((icon, index) => {
      // ============================================
      // MANUAL ADJUSTMENT
      //
      // 0.55 = delay between each icon
      // 1.18 = icon expansion size
      // 0.38 = expansion duration
      // ============================================

      const start = index * 0.55;

      // Circle grows and changes to white
      timeline.to(
        icon,
        {
          scale: 1.18,
          backgroundColor: '#FFFFFF',
          borderColor: '#FFFFFF',
          color: '#B12025',
          duration: 0.38,
          ease: 'power3.out',
        },
        start
      );

      // Circle settles smoothly
      timeline.to(
        icon,
        {
          scale: 1,
          duration: 0.38,
          ease: 'back.out(1.65)',
        },
        start + 0.30
      );

      // Label subtle movement
      if (labels[index]) {
        timeline.to(
          labels[index],
          {
            y: -3,
            duration: 0.26,
          },
          start + 0.14
        );

        timeline.to(
          labels[index],
          {
            y: 0,
            duration: 0.32,
          },
          start + 0.40
        );
      }

      // Draw line between icon circles
      if (lines[index]) {
        timeline.fromTo(
          lines[index],
          {
            scaleX: 0,
          },
          {
            scaleX: 1,
            duration: 0.48,
            ease: 'power2.inOut',
          },
          start + 0.35
        );
      }
    });

    timelineRef.current = timeline;

    return () => {
      timeline.kill();
      timelineRef.current = null;

      gsap.set(
        [
          ...icons,
          ...lines,
          ...labels,
        ],
        { clearProps: 'all' }
      );
    };
  }, []);

  const play = () => {
    timelineRef.current?.restart();
  };

  const reverse = () => {
    timelineRef.current?.reverse();
  };

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
      aria-label="One team, one tone of voice. Hover, focus or tap to animate Call, Email, Message and One team."
      className="
        relative
        min-w-0
        overflow-hidden
        rounded-[26px]
        bg-[#B12025]
        p-6
        text-white
        outline-none
        shadow-[0_18px_48px_rgba(177,32,37,.15)]
        focus-visible:ring-2
        focus-visible:ring-[#17191C]
        sm:p-8
      "
    >
      {/* Subtle background */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-14
          -top-14
          h-52
          w-52
          rounded-full
          bg-white/[.09]
          blur-[70px]
        "
      />

      <div className="relative z-10 flex h-full min-h-[225px] flex-col">

        {/* Heading */}
        <h3 className="text-[15px] font-semibold">
          One team, one tone of voice.
        </h3>

        {/* Description */}
        <p className="mt-3 max-w-[440px] text-[12px] leading-6 text-white/85">
          Phone, email and chat conversations come
          together in one trained support team.
        </p>

        {/* ========================================
            PRECISE ICON + CONNECTOR ROW

            Circle size:
            Mobile = 40px
            Desktop = 48px

            Connector is a SEPARATE element.
            No line crosses an icon.
        ======================================== */}

        <div
          className="mt-8 flex w-full items-start justify-between"
          aria-label="Call, Email and Message connected to one team"
        >
          {channels.map((channel, index) => {
            const Icon = channel.icon;

            return (
              <Fragment key={channel.label}>

                {/* ICON AND LABEL */}
                <div className="relative z-10 flex w-10 shrink-0 flex-col items-center sm:w-12">

                  {/* Icon circle */}
                  <span
                    data-channel-icon
                    aria-hidden="true"
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/35
                      bg-white/15
                      text-white
                      shadow-sm
                      sm:h-12
                      sm:w-12
                    "
                  >
                    <Icon
                      size={20}
                      strokeWidth={1.8}
                    />
                  </span>

                  {/* Icon label */}
                  <span
                    data-channel-label
                    className="
                      mt-3
                      whitespace-nowrap
                      text-[10px]
                      font-semibold
                      leading-4
                      text-white
                      sm:text-[11px]
                    "
                  >
                    {channel.label}
                  </span>
                </div>

                {/* CONNECTOR — AFTER EVERY ICON EXCEPT LAST */}
                {index < channels.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="
                      relative
                      mt-[19px]
                      h-[2px]
                      min-w-[7px]
                      flex-1
                      bg-white/25
                      sm:mt-[23px]
                    "
                  >
                    {/* Animated white line */}
                    <span
                      data-channel-line
                      className="
                        absolute
                        inset-0
                        origin-left
                        scale-x-0
                        bg-white
                      "
                    />
                  </div>
                )}
              </Fragment>
            );
          })}
        </div>

        {/* Bottom confirmation */}
        <div className="mt-auto flex items-center gap-2 border-t border-white/20 pt-5 text-[11px] font-medium leading-5 text-white/90">
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

// =====================================================
// 07 — MAIN SERVICES EXPERIENCE
// =====================================================

export default function ServicesExperience() {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const showcaseRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const faqGridRef = useRef<HTMLDivElement>(null);
  const qualityNumberRef = useRef<HTMLDivElement>(null);

  const pendingFlip = useRef<
    ReturnType<typeof Flip.getState> | null
  >(null);

  const [activeCategory, setActiveCategory] =
    useState(0);

  const [showcaseProgress, setShowcaseProgress] =
    useState(0);

  const [activeStep, setActiveStep] = useState(0);
  const [activeFaq, setActiveFaq] =
    useState<number | null>(null);

  const [showStickyCall, setShowStickyCall] =
    useState(true);

  const [animatedCards, setAnimatedCards] =
    useState(false);

  // ===================================================
  // RESPONSIVE MODE
  // ===================================================

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

  // ===================================================
  // ACTIVE CATEGORY + FLOATING CTA
  // ===================================================

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCategory(
              Number(
                (entry.target as HTMLElement).dataset.index
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
      const element = document.getElementById(
        category.id
      );

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

  // ===================================================
  // QUALITY STEP OBSERVER
  // ===================================================

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveStep(
              Number(
                (entry.target as HTMLElement).dataset.step
              )
            );
          }
        });
      },
      {
        rootMargin: '-25% 0px -55% 0px',
      }
    );

    rootRef.current
      ?.querySelectorAll<HTMLElement>('[data-step]')
      .forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, []);

  // ===================================================
  // ANIMATED QUALITY NUMBER
  // ===================================================

  useEffect(() => {
    if (
      !qualityNumberRef.current ||
      prefersReducedMotion()
    ) {
      return;
    }

    const animation = gsap.fromTo(
      qualityNumberRef.current,
      {
        y: 45,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.65,
        ease: 'power3.out',
      }
    );

    return () => {
      animation.kill();
    };
  }, [activeStep]);

  // ===================================================
  // FAQ GSAP FLIP
  // ===================================================

  const toggleFaq = (index: number) => {
    if (
      faqGridRef.current &&
      !prefersReducedMotion()
    ) {
      gsap.registerPlugin(Flip);

      pendingFlip.current = Flip.getState(
        faqGridRef.current.querySelectorAll(
          '[data-faq-item]'
        )
      );
    }

    setActiveFaq((previous) =>
      previous === index ? null : index
    );
  };

  useLayoutEffect(() => {
    if (!pendingFlip.current) return;

    gsap.registerPlugin(Flip);

    const state = pendingFlip.current;
    pendingFlip.current = null;

    const animation = Flip.from(state, {
      duration: 0.65,
      ease: 'power3.out',
      absolute: false,
      nested: true,
    });

    return () => {
      animation.kill();
    };
  }, [activeFaq]);

  // ===================================================
  // GSAP SCROLL ANIMATIONS
  // ===================================================

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, Flip);

    const mm = gsap.matchMedia();

    // DESKTOP HORIZONTAL CATEGORY SCROLL
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

        slides.slice(1).forEach((slide, offset) => {
          const index = offset + 1;

          revealTriggers.push(
            ScrollTrigger.create({
              trigger: slide,
              containerAnimation: horizontalTween,
              start: 'left 78%',
              once: true,
              onEnter: () =>
                timelines[index]?.play(),
            })
          );
        });

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

    // MOBILE CATEGORY REVEAL
    mm.add(
      '(max-width: 1023px) and (prefers-reduced-motion: no-preference)',
      () => {
        const track = trackRef.current;
        if (!track) return;

        const slides = Array.from(
          track.querySelectorAll<HTMLElement>(
            '[data-category-slide]'
          )
        );

        const animations = slides.map((slide) => {
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

    // GENERAL SCROLL REVEAL
    mm.add(
      '(prefers-reduced-motion: no-preference)',
      () => {
        if (!rootRef.current) return;

        const nodes = gsap.utils.toArray<HTMLElement>(
          rootRef.current.querySelectorAll(
            '[data-reveal]'
          )
        );

        const animations: gsap.core.Tween[] = [];

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
          .querySelectorAll<HTMLElement>('[data-float]')
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

    // MOUSE PARALLAX — NO CUSTOM RED CURSOR
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
      if (alive) {
        ScrollTrigger.refresh();
      }
    });

    return () => {
      alive = false;
      mm.revert();
    };
  }, []);

  // ===================================================
  // 08 — PAGE JSX
  // ===================================================

  return (
    <div
      ref={rootRef}
      className="min-h-screen overflow-x-clip bg-white font-sans text-[#17191C]"
    >
      {/* EXISTING NAVBAR */}
      <Navbar />

      <main className="pt-[88px]">

        {/* =========================================
            HERO SECTION
        ========================================= */}

        <section
          ref={heroRef}
          id="services-hero"
          className="relative isolate overflow-hidden bg-gradient-to-br from-white via-[#fcfbfa] to-[#f7f5f3]"
        >
          {/* Background shapes */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
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

          <div className="relative mx-auto max-w-[1440px] px-5 pb-24 pt-28 md:px-10 md:pb-32 md:pt-36 lg:pt-44">

            <p
              data-reveal
              className="mb-7 text-[13px] font-semibold tracking-[.025em] text-[#B12025]"
            >
              Outsourcing services in Sri Lanka.
            </p>

            <h1
              data-reveal
              className="max-w-[1030px] text-[clamp(3rem,6.5vw,6.9rem)] font-semibold leading-[1.055] tracking-[-.07em]"
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
              className="group mt-9 inline-flex items-center gap-4 rounded-full bg-[#B12025] px-7 py-4 text-sm font-semibold text-white transition duration-300 hover:bg-[#961b21]"
            >
              Book a free discovery call

              <ArrowUpRight
                size={18}
                className="transition group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </button>

            {/* Category finder */}
            <div
              data-reveal
              className="mt-20 grid gap-3 md:grid-cols-3"
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

        {/* =========================================
            STICKY CATEGORY NAVBAR
        ========================================= */}

        <nav
          aria-label="Service category navigation"
          className="sticky top-[88px] z-40 border-b border-[#17191C]/10 bg-white/85 backdrop-blur-xl"
        >
          <div className="mx-auto flex max-w-[1440px] gap-7 overflow-x-auto px-5 [scrollbar-width:none] md:gap-12 md:px-10 [&::-webkit-scrollbar]:hidden">
            {categories.map((category, index) => (
              <button
                key={category.id}
                type="button"
                onClick={() => jumpTo(category.id)}
                className={`relative shrink-0 py-5 text-[13px] font-semibold transition-colors ${
                  activeCategory === index
                    ? 'text-[#B12025]'
                    : 'text-[#17191C]/55 hover:text-[#17191C]'
                }`}
              >
                {category.short}

                <span className="ml-1 text-[11px] opacity-55">
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

        {/* =========================================
            STATISTICS SECTION
        ========================================= */}

        <section
          id="results"
          className="bg-[#f8f7f5] py-24 sm:py-32"
        >
          <div className="mx-auto max-w-[1440px] px-5 md:px-10">

            <p
              data-reveal
              className="text-xs font-semibold uppercase tracking-[.2em] text-[#B12025]"
            >
              Why our work is measurable
            </p>

            <h2
              data-reveal
              className="mt-4 max-w-3xl text-[clamp(2.5rem,4.9vw,5rem)] font-semibold leading-[1.1] tracking-[-.055em]"
            >
              The results behind the work.
            </h2>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {proofNumbers.map((proof, index) => {
                const red = proof.kind === 'red';
                const charcoal =
                  proof.kind === 'charcoal';

                return (
                  <div
                    key={proof.title}
                    data-reveal
                    className={`relative min-h-[235px] overflow-hidden rounded-[28px] border p-8 shadow-[0_12px_40px_rgba(23,25,28,.035)] ${
                      red
                        ? 'border-[#B12025] bg-[#B12025] text-white sm:col-span-2 lg:col-span-2'
                        : charcoal
                          ? 'border-[#17191C] bg-[#17191C] text-white'
                          : 'border-[#17191C]/10 bg-white text-[#17191C]'
                    }`}
                  >
                    {(red || index === 1) && (
                      <div className="absolute right-6 top-6 opacity-85">
                        <ProofRing
                          value={proof.value}
                          inverted={red}
                        />
                      </div>
                    )}

                    <div className="relative text-[clamp(3.2rem,5.5vw,6.1rem)] font-semibold leading-none tracking-[-.07em]">
                      <AnimatedNumber
                        value={proof.value}
                        suffix={proof.suffix}
                      />
                    </div>

                    <p className="relative mt-7 text-[18px] font-semibold">
                      {proof.title}
                    </p>

                    <p
                      className={`relative mt-2 text-[13px] ${
                        red || charcoal
                          ? 'text-white/70'
                          : 'text-[#17191C]/50'
                      }`}
                    >
                      {proof.detail}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================
            HORIZONTAL CATEGORY SHOWCASE
        ========================================= */}

        <section
          ref={showcaseRef}
          aria-label="Explore our service categories"
          className="relative overflow-hidden bg-[#B12025] lg:h-[calc(100vh-150px)]"
        >
          <div
            ref={trackRef}
            className="relative flex flex-col lg:h-full lg:w-max lg:flex-row"
          >
            {categories.map((category, index) => {
              const isWhiteSlide = index === 1;

              return (
                <div
                  key={category.id}
                  data-category-slide
                  className={`relative flex min-h-[520px] w-full shrink-0 items-center border-b px-5 py-24 md:px-10 lg:h-[calc(100vh-150px)] lg:w-screen lg:border-b-0 lg:py-10 ${
                    isWhiteSlide
                      ? 'border-[#B12025]/10 bg-white text-[#B12025]'
                      : 'border-white/15 bg-[#B12025] text-white'
                  }`}
                >
                  <div className="relative mx-auto grid w-full max-w-[1280px] items-center gap-12 lg:grid-cols-[.45fr_1fr]">

                    {/* Large category number */}
                    <div
                      data-category-number
                      aria-hidden="true"
                      className={`select-none text-[clamp(8rem,21vw,20rem)] font-bold leading-none tracking-[-.14em] ${
                        isWhiteSlide
                          ? 'text-[#B12025]'
                          : 'text-white'
                      }`}
                    >
                      0{index + 1}
                    </div>

                    <div className="relative">

                      <p
                        data-category-animate
                        className={`text-xs font-semibold uppercase tracking-[.22em] ${
                          isWhiteSlide
                            ? 'text-[#B12025]'
                            : 'text-white/85'
                        }`}
                      >
                        Explore category 0{index + 1}
                      </p>

                      <h2
                        data-category-animate
                        className={`mt-5 text-[clamp(3rem,5.6vw,6rem)] font-semibold leading-[1.05] tracking-[-.06em] ${
                          isWhiteSlide
                            ? 'text-[#B12025]'
                            : 'text-white'
                        }`}
                      >
                        {category.label}
                      </h2>

                      <p
                        data-category-animate
                        className={`mt-7 max-w-[620px] text-[16px] leading-8 ${
                          isWhiteSlide
                            ? 'text-[#B12025]/85'
                            : 'text-white/85'
                        }`}
                      >
                        {category.description}
                      </p>

                      <p
                        data-category-animate
                        className={`mt-8 text-[clamp(2rem,3vw,3.1rem)] font-semibold tracking-tight ${
                          isWhiteSlide
                            ? 'text-[#B12025]'
                            : 'text-white'
                        }`}
                      >
                        {category.proof}
                      </p>

                      <button
                        data-category-animate
                        type="button"
                        onClick={() => jumpTo(category.id)}
                        className={`group mt-8 inline-flex items-center gap-3 text-sm font-semibold transition-opacity hover:opacity-70 ${
                          isWhiteSlide
                            ? 'text-[#B12025]'
                            : 'text-white'
                        }`}
                      >
                        Explore {category.services.length} services

                        <ArrowRight
                          size={19}
                          className="transition-transform duration-300 group-hover:translate-x-2"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Horizontal progress bar */}
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-x-0 bottom-0 z-20 hidden h-[3px] lg:block ${
              showcaseProgress >= 0.25 &&
              showcaseProgress <= 0.75
                ? 'bg-[#B12025]/20'
                : 'bg-white/20'
            }`}
          >
            <div
              className={`h-full transition-colors duration-300 ${
                showcaseProgress >= 0.25 &&
                showcaseProgress <= 0.75
                  ? 'bg-[#B12025]'
                  : 'bg-white'
              }`}
              style={{
                width: `${showcaseProgress * 100}%`,
              }}
            />
          </div>
        </section>

        {/* =========================================
            SERVICE SECTIONS
        ========================================= */}

        {categories.map((category, index) => (
          <section
            key={category.id}
            id={category.id}
            className={`scroll-mt-[155px] border-t border-[#17191C]/5 py-24 sm:py-28 ${
              index % 2 === 0
                ? 'bg-white'
                : 'bg-[#f8f7f5]'
            }`}
          >
            <div className="mx-auto max-w-[1440px] px-5 md:px-10">

              {/* Category heading */}
              <div
                data-reveal
                className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[.24em] text-[#B12025]">
                    0{index + 1} / {category.services.length} services
                  </p>

                  <h2 className="mt-4 text-[clamp(2.6rem,5vw,5rem)] font-semibold tracking-[-.06em]">
                    {category.label}
                    <span className="text-[#B12025]">
                      .
                    </span>
                  </h2>

                  <p className="mt-4 max-w-[740px] text-sm leading-8 text-[#17191C]/60 sm:text-base">
                    {category.description}
                  </p>
                </div>

                <div className="shrink-0 self-start rounded-full border border-[#B12025]/20 bg-white px-6 py-3 text-sm font-semibold text-[#B12025]">
                  {category.proof}
                </div>
              </div>

              {/* ===================================
                  CUSTOMER SUPPORT BENTO CARDS

                  Exactly TWO cards.

                  LEFT:
                  Animated languages

                  RIGHT:
                  Animated channel icons

                  No data-reveal on these cards:
                  internal animations are hover-only.
              =================================== */}

              {category.id === 'customer-support' && (
                <div className="mb-12 grid items-stretch gap-4 lg:grid-cols-2">

                  {/* WHITE LANGUAGE CARD */}
                  <LanguageBentoCard />

                  {/* RED CHANNEL FLOW CARD */}
                  <AnimatedChannelFlowCard />
                </div>
              )}

              {/* Existing side-scrolling service cards */}
              <ServiceRail
                category={category}
                animateFlip={animatedCards}
              />
            </div>
          </section>
        ))}

        {/* =========================================
            QUALITY SECTION
        ========================================= */}

        <section
          id="quality"
          className="scroll-mt-28 bg-[#fbfaf9] py-28 sm:py-36"
        >
          <div className="mx-auto grid max-w-[1440px] gap-10 px-5 md:px-10 lg:grid-cols-[.78fr_1fr] lg:gap-20">

            {/* Sticky left */}
            <div className="lg:sticky lg:top-[185px] lg:self-start">

              <p className="text-xs font-semibold uppercase tracking-[.2em] text-[#B12025]">
                Our quality promise
              </p>

              <h2 className="mt-5 text-[clamp(2.7rem,4.6vw,5rem)] font-semibold leading-[1.08] tracking-[-.06em]">
                How we keep quality high.
              </h2>

              <div className="mt-8 flex h-[155px] items-end overflow-hidden">
                <div
                  ref={qualityNumberRef}
                  key={qualitySteps[activeStep].number}
                  className="text-[clamp(7rem,14vw,13rem)] font-semibold leading-none tracking-[-.12em] text-[#B12025]"
                >
                  {qualitySteps[activeStep].number}
                </div>
              </div>

              <p className="mt-4 text-lg font-semibold">
                {qualitySteps[activeStep].title}
              </p>
            </div>

            {/* Scrollable steps */}
            <div className="space-y-5">
              {qualitySteps.map((step, index) => (
                <article
                  key={step.number}
                  data-step={index}
                  data-reveal
                  className="min-h-[265px] rounded-[28px] border border-[#17191C]/10 bg-white p-9 shadow-[0_12px_40px_rgba(23,25,28,.035)]"
                >
                  <span className="text-xs font-semibold tracking-[.2em] text-[#B12025]">
                    STEP {step.number}
                  </span>

                  <h3 className="mt-7 text-3xl font-semibold tracking-tight">
                    {step.title}
                  </h3>

                  <p className="mt-5 max-w-xl text-[15px] leading-8 text-[#17191C]/60">
                    {step.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================
            FAQ SECTION
        ========================================= */}

        <section
          id="faq"
          className="bg-white py-28 sm:py-36"
        >
          <div className="mx-auto max-w-[1440px] px-5 md:px-10">

            <p className="text-xs font-semibold uppercase tracking-[.2em] text-[#B12025]">
              Straight answers
            </p>

            <h2 className="mb-12 mt-4 text-[clamp(2.6rem,4.8vw,5rem)] font-semibold tracking-[-.06em]">
              Common questions.
            </h2>

            <div
              ref={faqGridRef}
              className="grid gap-4 md:grid-cols-2"
            >
              {questions.map((question, index) => (
                <button
                  data-faq-item
                  key={question.q}
                  type="button"
                  aria-expanded={activeFaq === index}
                  onClick={() => toggleFaq(index)}
                  className={`relative min-h-[165px] rounded-[25px] border border-[#17191C]/10 bg-[#fbfaf9] p-7 text-left shadow-sm transition-colors hover:border-[#B12025]/40 focus-visible:outline-[#B12025] ${
                    activeFaq === index
                      ? 'border-t-[3px] border-t-[#B12025] md:col-span-2'
                      : ''
                  }`}
                >
                  <span className="flex items-start justify-between gap-5">

                    <span className="max-w-xl text-[19px] font-semibold tracking-tight">
                      {question.q}
                    </span>

                    <ChevronDown
                      size={21}
                      className={`shrink-0 transition-all duration-300 ${
                        activeFaq === index
                          ? 'rotate-180 text-[#B12025]'
                          : 'text-[#17191C]/45'
                      }`}
                    />
                  </span>

                  {activeFaq === index ? (
                    <span className="mt-6 block max-w-3xl text-sm leading-8 text-[#17191C]/65">
                      {question.a}
                    </span>
                  ) : (
                    <span className="mt-8 inline-flex rounded-full bg-[#B12025]/[.08] px-3 py-1.5 text-[11px] font-semibold text-[#B12025]">
                      {question.tag}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* EXISTING CONTACT FORM */}
        <StoryContact />
      </main>

      {/* =========================================
          FOOTER
      ========================================= */}

      <footer className="border-t border-[#17191C]/10 bg-[#faf9f7] py-16 text-[#17191C]">
        <div className="mx-auto grid max-w-[1440px] gap-11 px-5 md:grid-cols-4 md:px-10">

          {/* Logo */}
          <div>
            <Link
              href="/"
              aria-label="FirstNotch Solutions homepage"
              className="inline-block"
            >
              <Image
                src="/images/wordmark-red.png"
                width={180}
                height={75}
                alt="FirstNotch Solutions"
                className="h-auto w-[175px] object-contain"
              />
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-[#17191C]/60">
              A BPO company in Sri Lanka for customer
              support, back office work and IT services.
            </p>
          </div>

          {/* Services */}
          <div>
            <p className="mb-5 text-sm font-semibold">
              Services
            </p>

            {categories.map((category) => (
              <button
                type="button"
                key={category.id}
                onClick={() => jumpTo(category.id)}
                className="mb-3 block text-left text-[13px] text-[#17191C]/60 transition hover:text-[#B12025]"
              >
                {category.short}
              </button>
            ))}
          </div>

          {/* Company */}
          <div>
            <p className="mb-5 text-sm font-semibold">
              Company
            </p>

            <Link
              href="/#about"
              className="mb-3 block text-[13px] text-[#17191C]/60 hover:text-[#B12025]"
            >
              About us
            </Link>

            <Link
              href="/#hiring"
              className="mb-3 block text-[13px] text-[#17191C]/60 hover:text-[#B12025]"
            >
              How we hire
            </Link>

            <Link
              href="/#careers"
              className="mb-3 block text-[13px] text-[#17191C]/60 hover:text-[#B12025]"
            >
              Work with us
            </Link>
          </div>

          {/* Contact */}
          <div>
            <p className="mb-5 text-sm font-semibold">
              Contact
            </p>

            <a
              href="mailto:Info@firstnotch-solutions.com"
              className="mb-3 block break-all text-[13px] text-[#17191C]/60 hover:text-[#B12025]"
            >
              <Mail
                size={15}
                className="mr-2 inline"
              />
              Info@firstnotch-solutions.com
            </a>

            <p className="text-[13px] leading-7 text-[#17191C]/60">
              Colombo 4, Sri Lanka
            </p>
          </div>
        </div>

        <p className="mx-auto mt-14 max-w-[1440px] border-t border-[#17191C]/10 px-5 pt-8 text-xs text-[#17191C]/45 md:px-10">
          © 2026 FirstNotch Solutions (Pvt) Ltd.
          All rights reserved.
        </p>
      </footer>

      {/* Floating booking CTA */}
      {showStickyCall && (
        <button
          type="button"
          onClick={() => jumpTo('contact')}
          className="fixed bottom-5 right-5 z-40 rounded-full bg-[#B12025] px-5 py-3.5 text-xs font-semibold text-white shadow-[0_8px_35px_rgba(177,32,37,.2)] transition hover:-translate-y-1 sm:bottom-8 sm:right-8"
        >
          Book a free call

          <ArrowUpRight
            size={16}
            className="ml-1 inline"
          />
        </button>
      )}
    </div>
  );
}
