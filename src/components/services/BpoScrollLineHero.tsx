"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

// ======================================================
// FIRSTNOTCH — ANIMATED COSMIC BPO HERO
// Red: #B12025
// Charcoal: #17191C
// ======================================================

interface CosmicParallaxBgProps {
  head?: string;
  text?: string;
  loop?: boolean;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  drift: number;
  red: boolean;
}

// Deterministic random generator.
// Prevents server/client hydration mismatches.
function createRandom(seed: number) {
  let value = seed;

  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

function generateStars(
  count: number,
  size: number,
  seed: number
): React.CSSProperties[] {
  const random = createRandom(seed);

  return Array.from({ length: count }, () => ({
    position: "absolute" as const,
    left: `${random() * 100}%`,
    top: `${random() * 100}%`,
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: "50%",
    backgroundColor: "#FFFFFF",
    opacity: 0.2 + random() * 0.65,
    boxShadow:
      size > 2
        ? "0 0 8px rgba(255,255,255,0.65)"
        : "none",
  }));
}

function generateParticles(
  count: number,
  seed: number
): Particle[] {
  const random = createRandom(seed);

  return Array.from({ length: count }, () => ({
    x: random() * 100,
    y: random() * 100,
    size: 1 + random() * 2.5,
    opacity: 0.25 + random() * 0.65,
    duration: 7 + random() * 13,
    delay: -random() * 20,
    drift: -45 + random() * 90,
    red: random() > 0.85,
  }));
}

const SMALL_STARS = generateStars(160, 1, 101);
const MEDIUM_STARS = generateStars(55, 2, 202);
const BIG_STARS = generateStars(18, 3, 303);

// Change 110 to increase/decrease falling particles.
const FALLING_PARTICLES = generateParticles(110, 404);

// ======================================================
// COSMIC BACKGROUND
// ======================================================

export function CosmicParallaxBg({
  head = "BPO & BACK OFFICE",
  text = "Accuracy, Quality, Reliability",
  loop = true,
  className = "",
}: CosmicParallaxBgProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let frame = 0;

    const handleScroll = () => {
      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        if (!containerRef.current) return;

        const rect =
          containerRef.current.getBoundingClientRect();

        setScrollY(-rect.top);
      });
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const parallax = Math.max(
    -300,
    Math.min(300, scrollY)
  );

  return (
    <div
      ref={containerRef}
      className={`
        pointer-events-none
        absolute inset-0
        overflow-hidden
        bg-[#17191C]
        ${className}
      `}
      aria-hidden="true"
    >
      {/* DEEP SPACE */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_75%,#3A1117_0%,#17191C_48%,#090A0D_100%)]" />

      {/* SMALL STARS */}
      <div
        className="cosmic-stars-small absolute inset-[-15%]"
        style={{
          transform: `translateY(${parallax * 0.12}px)`,
          animationPlayState: loop ? "running" : "paused",
        }}
      >
        {SMALL_STARS.map((style, index) => (
          <span key={`small-${index}`} style={style} />
        ))}
      </div>

      {/* MEDIUM STARS */}
      <div
        className="cosmic-stars-medium absolute inset-[-10%]"
        style={{
          transform: `translateY(${parallax * 0.22}px)`,
          animationPlayState: loop ? "running" : "paused",
        }}
      >
        {MEDIUM_STARS.map((style, index) => (
          <span key={`medium-${index}`} style={style} />
        ))}
      </div>

      {/* LARGE STARS */}
      <div
        className="cosmic-stars-large absolute inset-0"
        style={{
          transform: `translateY(${parallax * 0.32}px)`,
          animationPlayState: loop ? "running" : "paused",
        }}
      >
        {BIG_STARS.map((style, index) => (
          <span key={`big-${index}`} style={style} />
        ))}
      </div>

      {/* INFINITE FALLING DOTS */}
      <div className="absolute inset-0 overflow-hidden">
        {FALLING_PARTICLES.map((particle, index) => (
          <span
            key={`falling-${index}`}
            className="cosmic-falling-particle absolute rounded-full"
            style={
              {
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                backgroundColor: particle.red
                  ? "#FF6268"
                  : "#FFFFFF",
                opacity: particle.opacity,
                boxShadow: particle.red
                  ? "0 0 8px rgba(255,98,104,0.7)"
                  : "0 0 5px rgba(255,255,255,0.45)",
                animationDuration: `${particle.duration}s`,
                animationDelay: `${particle.delay}s`,
                animationPlayState: loop
                  ? "running"
                  : "paused",
                "--particle-drift": `${particle.drift}px`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* RED NEBULA */}
      <div className="absolute left-1/2 top-[35%] h-[600px] w-[950px] -translate-x-1/2 rounded-full bg-[#B12025]/15 blur-[150px]" />

      <div className="absolute right-[-200px] top-[10%] h-[500px] w-[500px] rounded-full bg-[#B12025]/10 blur-[140px]" />

      {/* COSMIC HORIZON */}
      <div
        className="
          absolute
          bottom-[-360px]
          left-1/2
          h-[600px]
          w-[180%]
          -translate-x-1/2
          rounded-[50%]
          bg-[#08090C]
          shadow-[0_-18px_90px_rgba(177,32,37,0.45),0_-4px_25px_rgba(177,32,37,0.75)]
          sm:bottom-[-390px]
          lg:bottom-[-430px]
        "
      />

      {/* RED ATMOSPHERIC LIGHT */}
      <div className="absolute bottom-[40px] left-1/2 h-[180px] w-[95%] -translate-x-1/2 rounded-full bg-[#B12025]/20 blur-[90px]" />

      {/* LEFT LABEL */}
      <div className="absolute left-[6%] top-[30%] hidden text-[10px] font-semibold uppercase tracking-[0.35em] text-white/15 lg:block">
        {head}
      </div>

      {/* RIGHT LABEL */}
      <div className="absolute right-[6%] top-[42%] hidden max-w-[150px] text-right text-[10px] font-medium uppercase leading-[2] tracking-[0.2em] text-white/15 lg:block">
        {text.split(",").map((part, index) => (
          <div key={index}>{part.trim()}</div>
        ))}
      </div>

      {/* BOTTOM FADE */}
      <div className="absolute inset-x-0 bottom-0 h-[120px] bg-gradient-to-t from-[#08090C] to-transparent" />

      {/* ANIMATIONS */}
      <style>{`
        @keyframes cosmicDrift {
          from { translate: 0 0; }
          to { translate: 0 -80px; }
        }

        @keyframes cosmicFloat {
          0%, 100% { translate: 0 0; }
          50% { translate: 0 -50px; }
        }

        @keyframes cosmicTwinkle {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        @keyframes cosmicParticleFall {
          0% {
            transform: translate3d(0, -110vh, 0);
          }

          100% {
            transform: translate3d(
              var(--particle-drift),
              110vh,
              0
            );
          }
        }

        @keyframes cosmicTextReveal {
          from {
            opacity: 0;
            transform: translateY(38px);
            filter: blur(8px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        @keyframes cosmicNumberGlow {
          0%, 100% {
            text-shadow: 0 0 0 rgba(255,98,104,0);
          }

          50% {
            text-shadow: 0 0 28px rgba(255,98,104,0.45);
          }
        }

        @keyframes cosmicScrollBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(7px); }
        }

        .cosmic-stars-small {
          animation: cosmicDrift 100s linear infinite;
        }

        .cosmic-stars-medium {
          animation: cosmicFloat 70s ease-in-out infinite;
        }

        .cosmic-stars-large {
          animation: cosmicTwinkle 5s ease-in-out infinite;
        }

        .cosmic-falling-particle {
          animation-name: cosmicParticleFall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform;
        }

        .cosmic-reveal {
          opacity: 0;
          animation: cosmicTextReveal 1s ease-out forwards;
        }

        .cosmic-reveal-1 { animation-delay: 0.1s; }
        .cosmic-reveal-2 { animation-delay: 0.3s; }
        .cosmic-reveal-3 { animation-delay: 0.55s; }
        .cosmic-reveal-4 { animation-delay: 0.8s; }
        .cosmic-reveal-5 { animation-delay: 1.05s; }

        .cosmic-number-glow {
          animation: cosmicNumberGlow 3s ease-in-out infinite;
        }

        .cosmic-scroll-arrow {
          animation: cosmicScrollBounce 2s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .cosmic-stars-small,
          .cosmic-stars-medium,
          .cosmic-stars-large,
          .cosmic-falling-particle,
          .cosmic-number-glow,
          .cosmic-scroll-arrow {
            animation: none !important;
          }

          .cosmic-reveal {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
          }
        }
      `}</style>
    </div>
  );
}

// ======================================================
// MAIN BPO HERO
// ======================================================

export default function BpoScrollLineHero() {
  return (
    <section
      id="bpo-hero"
      className="
        relative isolate flex min-h-[850px]
        w-full items-center justify-center
        overflow-hidden bg-[#17191C]
        px-[22px] pb-[110px] pt-[130px]
        text-white
        sm:px-[40px]
        lg:min-h-[900px] lg:px-[65px]
      "
    >
      <CosmicParallaxBg
        head="BPO & BACK OFFICE"
        text="Accuracy, Quality, Reliability"
        loop={true}
      />

      {/* HERO CONTENT */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-col items-center text-center">

        {/* EYEBROW */}
        <p className="cosmic-reveal cosmic-reveal-1 mb-[30px] text-[10px] font-bold uppercase tracking-[0.25em] text-[#FF8589] sm:text-[11px]">
          BPO and Back Office Outsourcing in Sri Lanka
        </p>

        {/* MAIN HEADING */}
        <h1
          className="
            cosmic-reveal cosmic-reveal-2
            mx-auto max-w-[1100px]
            text-center
            text-[clamp(42px,5.8vw,88px)]
            font-semibold
            leading-[1.08]
            tracking-[-0.065em]
            text-white
          "
        >
          Back office work
          <br />
          delivered at{" "}
          <span className="cosmic-number-glow text-[#FF6268]">
            98%
          </span>{" "}
          accuracy,
          <br />
          checked by software
          <br className="hidden lg:block" />
          {" "}and by people.
        </h1>

        {/* DESCRIPTION */}
        <div
          className="
            cosmic-reveal cosmic-reveal-3
            mx-auto mt-[32px]
            max-w-[720px]
            space-y-[15px]
            text-center
            text-[14px] leading-[1.9]
            text-white/65
            sm:text-[15px]
          "
        >
          <p>
            Back office work builds up as a business grows.
            Data entry falls behind and checks on new customers
            slow down sign-ups. Managers end up doing admin
            instead of their own jobs.
          </p>

          <p>
            FirstNotch&apos;s team of 30+ in Colombo can take
            this work on. Software catches simple errors first,
            then a person checks each item. That is how client
            work reaches a 98% accuracy rate.
          </p>
        </div>

        {/* CTA BUTTONS */}
        <div className="cosmic-reveal cosmic-reveal-4 mt-[35px] flex flex-wrap items-center justify-center gap-[12px]">

          <a
            href="#bpo-services"
            className="
              group inline-flex min-h-[50px]
              items-center justify-center gap-[12px]
              rounded-full bg-[#B12025]
              px-[26px] text-[12px]
              font-semibold text-white
              transition-all duration-300
              hover:bg-[#D32A30]
            "
          >
            See the seven services
            <ArrowDown
              size={16}
              className="transition-transform group-hover:translate-y-[3px]"
            />
          </a>

          <Link
            href="/book-a-free-call"
            className="
              group inline-flex min-h-[50px]
              items-center justify-center gap-[12px]
              rounded-full border border-white/25
              bg-white/10 px-[26px]
              text-[12px] font-semibold
              text-white backdrop-blur-md
              transition-all duration-300
              hover:border-white
              hover:bg-white
              hover:text-[#B12025]
            "
          >
            Book a free discovery call
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* TRUST POINTS */}
        <div className="cosmic-reveal cosmic-reveal-5 mt-[38px] flex flex-wrap items-center justify-center gap-x-[26px] gap-y-[12px] text-[11px] font-medium text-white/60">

          <span className="flex items-center gap-[8px]">
            <CheckCircle2
              size={15}
              className="text-[#FF6268]"
            />
            Data processing
          </span>

          <span className="flex items-center gap-[8px]">
            <CheckCircle2
              size={15}
              className="text-[#FF6268]"
            />
            Document verification
          </span>

          <span className="flex items-center gap-[8px]">
            <CheckCircle2
              size={15}
              className="text-[#FF6268]"
            />
            Quality checks
          </span>
        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <div
        className="
          pointer-events-none
          absolute bottom-[28px]
          left-1/2 z-10
          flex -translate-x-1/2
          items-center gap-[9px]
          whitespace-nowrap
          text-[10px] font-semibold
          uppercase tracking-[0.18em]
          text-white/55
        "
      >
        Scroll to explore
        <ArrowDown
          size={15}
          className="cosmic-scroll-arrow"
        />
      </div>
    </section>
  );
}