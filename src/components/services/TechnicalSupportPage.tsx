"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Bug,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  FileText,
  Gauge,
  Headphones,
  Languages,
  LifeBuoy,
  Search,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const BASE = "/services/it-services";

const included = [
  {
    number: "01",
    title: "First-line support",
    text: "Setup, login and how-to questions are answered by phone, email or chat using the channels agreed with you.",
    tag: "Fast first response",
    Icon: Headphones,
  },
  {
    number: "02",
    title: "Deeper troubleshooting",
    text: "Agents follow your product checks, logs, settings and error messages before passing anything to a developer.",
    tag: "Structured diagnosis",
    Icon: Search,
  },
  {
    number: "03",
    title: "Clear bug reports",
    text: "Issues that need a code fix are sent to your developers with steps to reproduce, screenshots and customer details.",
    tag: "Developer-ready",
    Icon: Bug,
  },
  {
    number: "04",
    title: "Your escalation rules",
    text: "You decide which issues go to which team, what counts as urgent and when engineering should be involved.",
    tag: "Your rules",
    Icon: ShieldCheck,
  },
  {
    number: "05",
    title: "Help articles",
    text: "Agents build useful help content from common questions, with your approval before anything goes live.",
    tag: "Knowledge base",
    Icon: FileText,
  },
  {
    number: "06",
    title: "Hardware support",
    text: "For devices, agents can guide customers through setup and fixes while returns follow your warranty rules.",
    tag: "Device support",
    Icon: Wrench,
  },
  {
    number: "07",
    title: "Your ticket tools",
    text: "The team works inside your existing helpdesk, such as Zendesk, Jira Service Management or Freshdesk.",
    tag: "Your systems",
    Icon: LifeBuoy,
  },
  {
    number: "08",
    title: "Four languages",
    text: "Help can be delivered in English, Sinhala, Tamil or Hindi, depending on the team and coverage agreed.",
    tag: "Multilingual",
    Icon: Languages,
  },
] as const;

const reportMetrics = [
  {
    label: "First response time",
    value: "Tracked",
    note: "How long customers wait for a first reply.",
    Icon: Clock3,
  },
  {
    label: "Solved at helpdesk",
    value: "Measured",
    note: "Issues solved without needing developers.",
    Icon: CheckCircle2,
  },
  {
    label: "Escalations",
    value: "Logged",
    note: "Tickets passed to your team with the reason.",
    Icon: ArrowUpRight,
  },
  {
    label: "Time to resolve",
    value: "Compared",
    note: "Time from first message to fix.",
    Icon: Gauge,
  },
] as const;

const faqs = [
  {
    q: "How is this different from customer service?",
    a: "Customer service covers orders, accounts and general questions. Technical support handles problems with how your product works, so agents are trained on the product itself.",
  },
  {
    q: "How do agents learn our product?",
    a: "They study your documentation, use a test account and shadow your team before taking live tickets. Training continues as your product changes.",
  },
  {
    q: "Can agents access our systems?",
    a: "Only what you allow. Access follows least-privilege rules, with role-based permissions and separate logins for each team member.",
  },
  {
    q: "What if an issue needs a developer?",
    a: "The ticket is passed on under your escalation rules with a complete report. The customer can still receive progress updates while your technical team investigates.",
  },
  {
    q: "How is technical support priced?",
    a: "Pricing depends on ticket volume, channels, coverage hours, product complexity and the number of agents required. The final plan is agreed after the discovery call.",
  },
] as const;

const process = [
  {
    number: "01",
    title: "Learning your business",
    text: "The team documents your systems, accounts, product setup, support scope and priorities with you.",
  },
  {
    number: "02",
    title: "Hiring and training",
    text: "Team members complete language tests, technical assessments and reference checks, then train on your systems before starting.",
  },
  {
    number: "03",
    title: "Going live with quality checks",
    text: "Work starts with lower-risk tickets. Every ticket gets a quality score and access widens once you sign it off.",
  },
  {
    number: "04",
    title: "Reporting and improving",
    text: "You get a monthly report on tickets, response times, escalations and open issues, plus a call to agree what to improve.",
  },
] as const;

const related = [
  {
    title: "Web development",
    href: `${BASE}/web-development`,
    text: "New websites designed and built around your business.",
  },
  {
    title: "Website maintenance",
    href: `${BASE}/website-maintenance`,
    text: "Updates, backups, monitoring and ongoing care.",
  },
  {
    title: "IT support",
    href: `${BASE}/it-support`,
    text: "Day-to-day help for your staff and business systems.",
  },
] as const;

function RisingWords({ text }: { text: string }) {
  return (
    <span role="text" aria-label={text}>
      {text.split(/\s+/).map((word, index) => (
        <span key={`${word}-${index}`} aria-hidden="true">
          {index > 0 ? " " : null}
          <span className="inline-block overflow-hidden align-bottom">
            <span data-ts-hero-word className="inline-block">
              {word}
            </span>
          </span>
        </span>
      ))}
    </span>
  );
}

function ScrollHeading({ text }: { text: string }) {
  return (
    <span data-ts-heading role="text" aria-label={text}>
      {text.split(/\s+/).map((word, index) => (
        <span
          key={`${word}-${index}`}
          aria-hidden="true"
          className="inline-block overflow-hidden align-bottom"
        >
          <span data-ts-heading-word className="inline-block">
            {word}
          </span>
          {"\u00a0"}
        </span>
      ))}
    </span>
  );
}
function SupportCard({
  item,
}: {
  item: (typeof included)[number];
}) {
  const Icon = item.Icon;

  return (
    <article
      className="
        group
        relative
        h-[270px]
        w-[290px]
        shrink-0
        overflow-hidden
        rounded-[14px]
        border
        border-[#17191C]/10
        bg-white
        p-5

        shadow-[0_12px_35px_rgba(23,25,28,.055)]

        transition-all
        duration-500
        ease-[cubic-bezier(.22,1,.36,1)]

        hover:-translate-y-[4px]
        hover:border-[#B12025]/30
        hover:shadow-[0_20px_50px_rgba(177,32,37,.10)]

        sm:h-[285px]
        sm:w-[310px]
        sm:p-6

        lg:h-[290px]
        lg:w-[320px]
      "
    >
      {/* TOP ROW */}
      <div className="flex items-center justify-between">
        <span
          className="
            font-mono
            text-[9px]
            font-semibold
            tracking-[.14em]
            text-[#B12025]
          "
        >
          {item.number} / 08
        </span>

        <span
          className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-full
            border
            border-[#17191C]/10
            bg-white
            text-[#B12025]

            transition-all
            duration-300

            group-hover:border-[#B12025]
            group-hover:bg-[#B12025]
            group-hover:text-white
          "
        >
          <ArrowUpRight size={14} />
        </span>
      </div>

      {/* ICON */}
      <div
        className="
          mt-6
          flex
          h-[44px]
          w-[44px]
          items-center
          justify-center
          rounded-[11px]
          bg-[#B12025]
          text-white

          shadow-[0_10px_25px_rgba(177,32,37,.18)]

          sm:h-[48px]
          sm:w-[48px]
        "
      >
        <Icon
          size={20}
          strokeWidth={1.8}
        />
      </div>

      {/* CONTENT */}
      <div className="mt-6">
        <p
          className="
            text-[8px]
            font-bold
            uppercase
            tracking-[.16em]
            text-[#B12025]/70
          "
        >
          {item.tag}
        </p>

        <h3
          className="
            mt-2
            text-[19px]
            font-semibold
            leading-[1.08]
            tracking-[-.04em]
            text-[#17191C]

            sm:text-[21px]
          "
        >
          {item.title}
        </h3>

        <p
          className="
            mt-3
            line-clamp-3
            text-[10px]
            leading-[1.65]
            text-[#17191C]/58

            sm:text-[11px]
          "
        >
          {item.text}
        </p>
      </div>

      {/* HOVER BOTTOM LINE */}
      <div
        aria-hidden="true"
        className="
          absolute
          bottom-0
          left-0
          h-[2px]
          w-0
          bg-[#B12025]

          transition-all
          duration-500

          group-hover:w-full
        "
      />
    </article>
  );
}

function FAQItem({
  item,
  open,
  onClick,
}: {
  item: (typeof faqs)[number];
  open: boolean;
  onClick: () => void;
}) {
  return (
    <div className="border-b border-[#17191C]/15">
      <button
        type="button"
        onClick={onClick}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-5 py-5 text-left sm:py-7"
      >
        <span className="max-w-[900px] text-[16px] font-semibold leading-[1.3] tracking-[-.03em] text-[#17191C] sm:text-[21px] lg:text-[24px]">
          {item.q}
        </span>

        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 sm:h-11 sm:w-11 ${
            open
              ? "rotate-180 border-[#B12025] bg-[#B12025] text-white"
              : "border-[#17191C]/15 text-[#17191C]"
          }`}
        >
          <ChevronDown size={17} />
        </span>
      </button>

      <div
        className={`grid transition-all duration-500 ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="max-w-[850px] pb-6 pr-10 text-[12px] leading-[1.85] text-[#17191C]/65 sm:pb-8 sm:text-[14px]">
            {item.a}
          </p>
        </div>
      </div>
    </div>
  );
}
type GradientBarsProps = {
  numBars?: number;
  animationDuration?: number;
  className?: string;
};

function GradientBars({
  numBars = 12,
  animationDuration = 3.4,
  className = "",
}: GradientBarsProps) {
  const calculateHeight = (
    index: number,
    total: number
  ) => {
    const position =
      index / (total - 1);

    const center = 0.5;

    const distanceFromCenter =
      Math.abs(position - center);

    const minHeight = 20;
    const maxHeight = 96;

    const curve =
      Math.pow(
        distanceFromCenter * 2,
        1.15
      );

    return (
      minHeight +
      (maxHeight - minHeight) *
        curve
    );
  };

  return (
    <>
      <style>{`
        @keyframes technicalBarsPulse {
          0% {
            transform: scaleY(var(--initial-scale));
          }

          100% {
            transform: scaleY(
              calc(var(--initial-scale) * 0.88)
            );
          }
        }
      `}</style>

      <div
        aria-hidden="true"
        className={`
          pointer-events-none
          absolute
          inset-0
          z-0
          overflow-hidden
          bg-[#0A0A0A]
          ${className}
        `}
      >
        <div
          className="
            absolute
            inset-0
            flex
            items-end
          "
          style={{
            transform:
              "translateZ(0)",

            backfaceVisibility:
              "hidden",
          }}
        >
          {Array.from({
            length: numBars,
          }).map((_, index) => {
            const height =
              calculateHeight(
                index,
                numBars
              );

            return (
              <div
                key={index}
                className="
                  relative
                  h-full
                  overflow-hidden
                "
                style={{
                  flex: `1 0 calc(100% / ${numBars})`,
                  maxWidth: `calc(100% / ${numBars})`,
                }}
              >
                <div
                  className="
                    absolute
                    inset-0
                    origin-bottom
                    will-change-transform
                  "
                  style={{
                    background: `
                      linear-gradient(
                        to top,
                        #B12025 0%,
                        #B12025 12%,
                        rgba(177,32,37,0.92) 24%,
                        rgba(177,32,37,0.62) 42%,
                        rgba(177,32,37,0.26) 65%,
                        rgba(177,32,37,0.06) 82%,
                        transparent 100%
                      )
                    `,

                    transform: `scaleY(${height / 100})`,

                    animation:
                      `technicalBarsPulse ${animationDuration}s ease-in-out infinite alternate`,

                    animationDelay:
                      `${index * 0.09}s`,

                    ["--initial-scale" as string]:
                      height / 100,
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* DARK TOP FADE */}
        <div
          className="
            absolute
            inset-0
            bg-[linear-gradient(to_bottom,#0A0A0A_0%,rgba(10,10,10,.96)_18%,rgba(10,10,10,.70)_42%,rgba(10,10,10,.12)_78%,transparent_100%)]
          "
        />
      </div>
    </>
  );
}

export default function TechnicalSupportPage() {
const rootRef = useRef<HTMLDivElement>(null);
const marqueeRef = useRef<HTMLDivElement>(null);
const marqueeGroupRef = useRef<HTMLDivElement>(null);

const [faqOpen, setFaqOpen] = useState<number | null>(0);

  useEffect(() => {
    if (!rootRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          "[data-ts-eyebrow]",
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65, ease: "power3.out" },
        );

        gsap.fromTo(
          "[data-ts-hero-word]",
          { yPercent: 120, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.05,
            stagger: 0.055,
            ease: "power4.out",
            delay: 0.08,
          },
        );

        gsap.fromTo(
          "[data-ts-hero-copy]",
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            delay: 0.35,
          },
        );

        gsap.to("[data-ts-down]", {
          y: 6,
          duration: 0.7,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.utils
          .toArray<HTMLElement>("[data-ts-heading]")
          .forEach((heading) => {
            gsap.fromTo(
              heading.querySelectorAll("[data-ts-heading-word]"),
              { yPercent: 95, opacity: 0.18 },
              {
                yPercent: 0,
                opacity: 1,
                stagger: 0.025,
                ease: "none",
                scrollTrigger: {
                  trigger: heading,
                  start: "top 90%",
                  end: "bottom 58%",
                  scrub: 0.65,
                },
              },
            );
          });

        
        gsap.utils
          .toArray<HTMLElement>("[data-ts-parallax]")
          .forEach((layer) => {
            const speed = Number(layer.dataset.tsParallax || "0.25");

            gsap.fromTo(
              layer,
              { y: -55 * speed },
              {
                y: 110 * speed,
                ease: "none",
                scrollTrigger: {
                  trigger: layer.closest("section") || layer,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              },
            );
          });

        gsap.utils
          .toArray<HTMLElement>("[data-ts-fade]")
          .forEach((element) => {
            gsap.fromTo(
              element,
              { y: 24, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: element,
                  start: "top 91%",
                  once: true,
                },
              },
            );
          });

        gsap.fromTo(
          "[data-ts-quote-word]",
          { opacity: 0.16, y: 14 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.025,
            ease: "none",
            scrollTrigger: {
              trigger: "#technical-support-quote",
              start: "top 78%",
              end: "bottom 48%",
              scrub: 0.7,
            },
          },
        );

        gsap.fromTo(
          "[data-ts-process-line]",
          { scaleX: 0 },
          {
            scaleX: 1,
            transformOrigin: "left center",
            ease: "none",
            scrollTrigger: {
              trigger: "#technical-support-process",
              start: "top 80%",
              end: "bottom 55%",
              scrub: true,
            },
          },
        );
      }, rootRef);
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  // =====================================================
  // INFINITE TECHNICAL SUPPORT CARD MARQUEE
  // =====================================================
  useEffect(() => {
    const track = marqueeRef.current;
    const firstGroup = marqueeGroupRef.current;

    if (!track || !firstGroup) return;

    let tween: gsap.core.Tween | null = null;

    const startMarquee = () => {
      tween?.kill();

      const groupWidth = firstGroup.getBoundingClientRect().width;

      if (!groupWidth) return;

      gsap.set(track, {
        x: -groupWidth,
      });

      tween = gsap.to(track, {
        x: 0,
        duration: 24,
        ease: "none",
        repeat: -1,
      });
    };

    const pauseMarquee = () => {
      tween?.pause();
    };

    const resumeMarquee = () => {
      tween?.resume();
    };

    const frame = requestAnimationFrame(startMarquee);

    window.addEventListener("resize", startMarquee);
    track.addEventListener("mouseenter", pauseMarquee);
    track.addEventListener("mouseleave", resumeMarquee);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", startMarquee);
      track.removeEventListener("mouseenter", pauseMarquee);
      track.removeEventListener("mouseleave", resumeMarquee);
      tween?.kill();
    };
  }, []);

  const scrollToIncluded = () =>
    document.getElementById("technical-support-included")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

  return (
    <div
      ref={rootRef}
      className="overflow-x-clip bg-white font-sans text-[#17191C]"
    >
      {/* HERO */}
      <section
  aria-labelledby="technical-support-title"
  className="
    relative
    isolate
    min-h-[760px]
    overflow-hidden
    bg-[#0A0A0A]
    px-5
    pb-[100px]
    pt-[135px]
    text-white

    sm:px-8
    sm:pb-[120px]
    sm:pt-[165px]

    lg:min-h-[880px]
    lg:px-14
    lg:pb-[150px]
    lg:pt-[190px]
  "
>
        {/* FIRSTNOTCH RED ANIMATED BAR BACKGROUND */}
        <GradientBars
          numBars={12}
          animationDuration={3.4}
          className="opacity-100"
        />

        {/* CHARCOAL DEPTH OVERLAY — KEEPS THE REFERENCE LOOK */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            z-[1]
            bg-[linear-gradient(to_bottom,rgba(10,10,10,.18)_0%,rgba(10,10,10,.18)_24%,rgba(10,10,10,.10)_52%,rgba(10,10,10,0)_100%)]
          "
        />

        {/* TOP BLACK FADE */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-x-0
            top-0
            z-[1]
            h-[180px]
            bg-gradient-to-b
            from-[#0A0A0A]
            via-[#0A0A0A]/90
            to-transparent
          "
        />
        <div className="relative z-10 mx-auto max-w-[1450px] text-center">
          <p
            data-ts-eyebrow
            className="text-[9px] font-bold uppercase tracking-[.25em] text-[#B12025] sm:text-[11px]"
          >
            TECHNICAL SUPPORT OUTSOURCING IN SRI LANKA
          </p>

          <h1
            id="technical-support-title"
className="
  mx-auto
  mt-6
  max-w-[1320px]
  text-[clamp(2.65rem,10vw,4.4rem)]
  font-semibold
  leading-[1.01]
  tracking-[-.07em]
  text-white

  sm:mt-8
  sm:text-[clamp(4.2rem,7vw,7.2rem)]

  lg:text-[clamp(4.8rem,6.2vw,7.4rem)]
"          >
            <RisingWords text="Trained Helpdesk for Your Customers." />
          </h1>

          <p
            data-ts-hero-copy
className="
  mx-auto
  mt-5
  max-w-[1100px]
  text-[clamp(1.35rem,5.5vw,2rem)]
  font-semibold
  leading-[1.12]
  tracking-[-.045em]
  text-[#B12025]

  sm:mt-6
  sm:text-[clamp(2rem,3.2vw,3.3rem)]
"          >
            So your developers can work on the product.
          </p>

          <p
            data-ts-hero-copy
className="
  mx-auto
  mt-7
  max-w-[800px]
  text-[12px]
  leading-[1.8]
  text-white/65

  sm:mt-9
  sm:text-[15px]
  sm:leading-[1.9]
"          >
            When customers have trouble with your software or device,
            the questions often go straight to developers. FirstNotch
            sets up a trained helpdesk around your product, answers
            common questions and sends real bugs to your team under
            escalation rules you agree.
          </p>

          <div data-ts-hero-copy className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#contact"
              className="inline-flex min-h-[50px] items-center gap-2 rounded-full bg-[#B12025] px-6 text-[12px] font-semibold text-white transition hover:bg-[#981A1F]"
            >
              Book a free discovery call
              <ArrowUpRight size={16} />
            </a>

            <button
              type="button"
              onClick={scrollToIncluded}
className="
  inline-flex
  min-h-[50px]
  items-center
  gap-2
  rounded-full
  border
  border-white/20
  bg-white/[0.06]
  px-6
  text-[12px]
  font-semibold
  text-white
  backdrop-blur-md
  transition

  hover:border-white/45
  hover:bg-white
  hover:text-[#17191C]
"            >
              See what is included
              <ArrowDown data-ts-down size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* INCLUDED */}
      <section
        id="technical-support-included"
        className="
  scroll-mt-[90px]
  overflow-hidden
  bg-[#F7F7F6]
  px-5
  py-[65px]

  sm:px-8
  sm:py-[90px]

  lg:px-14
  lg:py-[105px]
"
      >
        <div className="mx-auto max-w-[1450px]">
          <div className="mx-auto max-w-[1000px] text-center">
            <p data-ts-fade className="text-[9px] font-bold uppercase tracking-[.23em] text-[#B12025] sm:text-[11px]">
              WHAT THE SERVICE INCLUDES
            </p>

            <h2 className="mt-5 text-[clamp(2.2rem,8vw,3.7rem)] font-semibold leading-[1.04] tracking-[-.06em] text-[#17191C] sm:text-[clamp(3.4rem,5vw,5.8rem)]">
              <ScrollHeading text="What the Technical Support Service Includes" />
            </h2>

            <p data-ts-fade className="mx-auto mt-6 max-w-[680px] text-[12px] leading-[1.85] text-[#17191C]/58 sm:text-[14px]">
              A trained first line for your customers, clear escalation
              rules for your team and better information when an issue
              genuinely needs engineering.
            </p>
          </div>

         <div
  className="
    relative
    left-1/2
    mt-10
    w-screen
    -translate-x-1/2
    overflow-hidden

    lg:mt-14
  "
>
  {/* LEFT SOFT FADE */}
  <div
    aria-hidden="true"
    className="
      pointer-events-none
      absolute
      inset-y-0
      left-0
      z-20
      w-[45px]
      bg-gradient-to-r
      from-[#F7F7F6]
      to-transparent

      sm:w-[80px]
      lg:w-[120px]
    "
  />

  {/* RIGHT SOFT FADE */}
  <div
    aria-hidden="true"
    className="
      pointer-events-none
      absolute
      inset-y-0
      right-0
      z-20
      w-[45px]
      bg-gradient-to-l
      from-[#F7F7F6]
      to-transparent

      sm:w-[80px]
      lg:w-[120px]
    "
  />
<div
  ref={marqueeRef}
  className="
    flex
    w-max
    py-3
    will-change-transform
    [transform:translate3d(0,0,0)]
  "
>
  {/* GROUP 1 */}
  <div
    ref={marqueeGroupRef}
    className="flex shrink-0 gap-5 pr-5"
  >
    {included.map((item) => (
      <SupportCard
        key={`first-${item.number}`}
        item={item}
      />
    ))}
  </div>

  {/* GROUP 2 — EXACT DUPLICATE FOR INFINITE LOOP */}
  <div
    aria-hidden="true"
    className="flex shrink-0 gap-5 pr-5"
  >
    {included.map((item) => (
      <SupportCard
        key={`second-${item.number}`}
        item={item}
      />
    ))}
  </div>
</div>
</div>
        </div>
      </section>

      {/* REPORTING */}
      <section className="relative isolate overflow-hidden bg-white px-5 py-[85px] sm:px-8 sm:py-[120px] lg:px-14 lg:py-[150px]">
        <div data-ts-parallax="0.45" aria-hidden="true" className="pointer-events-none absolute -left-[180px] top-[18%] h-[420px] w-[420px] rounded-full bg-[#B12025]/[0.035] blur-[80px]" />
        <div data-ts-parallax="0.25" aria-hidden="true" className="pointer-events-none absolute -right-[160px] bottom-[8%] h-[460px] w-[460px] rounded-full bg-[#B12025]/[0.04] blur-[90px]" />

        <div className="relative z-10 mx-auto max-w-[1420px]">
          <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:items-end">
            <div>
              <p data-ts-fade className="text-[9px] font-bold uppercase tracking-[.22em] text-[#B12025] sm:text-[11px]">
                SUPPORT REPORTING
              </p>

              <h2 className="mt-5 max-w-[760px] text-[clamp(2.35rem,8vw,3.8rem)] font-semibold leading-[1.04] tracking-[-.06em] text-[#17191C] sm:text-[clamp(3.5rem,5vw,5.8rem)]">
                <ScrollHeading text="The Numbers You Will See" />
              </h2>
            </div>

            <p data-ts-fade className="max-w-[620px] text-[12px] leading-[1.9] text-[#17191C]/60 sm:text-[14px] lg:justify-self-end">
              Good technical support solves routine issues at the helpdesk
              and sends the rest on with enough detail for your developers
              to act quickly.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-[1.12fr_.88fr] lg:gap-8">
            <div data-ts-fade className="overflow-hidden rounded-[30px] border border-[#17191C]/10 bg-[#F8F8F7] p-5 sm:p-7 lg:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#17191C]/10 pb-5">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#B12025]">
                    TECHNICAL SUPPORT REPORT
                  </p>
                  <p className="mt-2 text-[11px] text-[#17191C]/45">
                    Example monthly dashboard
                  </p>
                </div>

                <span className="rounded-full bg-[#B12025] px-4 py-2 text-[10px] font-semibold text-white">
                  Current month
                </span>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {reportMetrics.map((metric) => {
                  const Icon = metric.Icon;

                  return (
                    <article key={metric.label} className="rounded-[18px] border border-[#17191C]/10 bg-white p-5">
                      <div className="flex items-center justify-between">
                        <Icon size={19} className="text-[#B12025]" />
                        <Check size={15} className="text-[#B12025]" />
                      </div>

                      <p className="mt-8 text-[10px] font-semibold uppercase tracking-[.13em] text-[#17191C]/45">
                        {metric.label}
                      </p>

                      <p className="mt-2 text-[27px] font-semibold tracking-[-.05em] text-[#B12025]">
                        {metric.value}
                      </p>

                      <p className="mt-2 text-[10px] leading-5 text-[#17191C]/50">
                        {metric.note}
                      </p>
                    </article>
                  );
                })}
              </div>

              <article className="mt-3 rounded-[18px] border border-[#17191C]/10 bg-white p-5">
                <div className="grid items-center gap-5 sm:grid-cols-[auto_1fr_auto]">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF0F0] text-[#B12025]">
                    <Sparkles size={18} />
                  </span>

                  <div>
                    <p className="text-[11px] font-semibold text-[#17191C]">
                      Customer satisfaction
                    </p>
                    <p className="mt-1 text-[10px] text-[#17191C]/45">
                      Reviewed with the support team
                    </p>
                  </div>

                  <span className="text-[11px] font-semibold text-[#B12025]">
                    Reviewed
                  </span>
                </div>
              </article>
            </div>

            <div className="relative min-h-[520px]">
              <div data-ts-parallax="0.25" className="absolute left-0 top-4 w-[88%] rounded-[24px] border border-[#B12025]/12 bg-white p-6 shadow-[0_24px_70px_rgba(23,25,28,.07)] sm:w-[75%]">
                <p className="text-[9px] font-bold uppercase tracking-[.15em] text-[#B12025]">
                  FIRST-LINE SUPPORT
                </p>

                <p className="mt-5 text-[22px] font-semibold tracking-[-.04em]">
                  Routine issues stay at the helpdesk.
                </p>

                <div className="mt-5 space-y-3">
                  {["Login question resolved", "Setup guide shared", "Customer updated"].map((item) => (
                    <div key={item} className="flex items-center gap-3 rounded-[12px] bg-[#F7F7F6] px-4 py-3">
                      <CheckCircle2 size={16} className="text-[#B12025]" />
                      <span className="text-[11px] font-medium text-[#17191C]/70">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div data-ts-parallax="0.55" className="absolute bottom-4 right-0 w-[82%] rounded-[24px] bg-[#B12025] p-6 text-white shadow-[0_28px_80px_rgba(177,32,37,.20)] sm:w-[72%]">
                <p className="text-[9px] font-bold uppercase tracking-[.15em] text-white/65">
                  ESCALATION
                </p>

                <p className="mt-5 text-[24px] font-semibold leading-[1.12] tracking-[-.045em]">
                  One issue needs engineering.
                </p>

                <p className="mt-4 text-[11px] leading-6 text-white/75">
                  Reproduction steps, environment details and customer
                  history are attached before the ticket reaches your developers.
                </p>

                <span className="mt-6 inline-flex items-center gap-2 text-[10px] font-semibold">
                  View escalation
                  <ArrowRight size={14} />
                </span>
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-[#17191C]/10 pt-7">
            {[
              ["85%", "client retention rate"],
              ["98%", "accuracy rate across client work"],
              ["15–20%", "of applicants pass hiring checks"],
            ].map(([value, label]) => (
              <div key={label}>
                <p className="text-[22px] font-semibold tracking-[-.05em] text-[#B12025] sm:text-[32px]">
                  {value}
                </p>
                <p className="mt-2 text-[9px] leading-5 text-[#17191C]/48 sm:text-[11px]">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section
        id="technical-support-quote"
        className="overflow-hidden bg-[#17191C] px-5 py-[90px] text-white sm:px-8 sm:py-[125px] lg:px-14 lg:py-[150px]"
      >
        <div className="mx-auto max-w-[1250px] text-center">
          <p className="text-[9px] font-bold uppercase tracking-[.23em] text-white/45 sm:text-[11px]">
            CLIENT EXPERIENCE
          </p>

          <blockquote className="mx-auto mt-8 max-w-[1100px] text-[clamp(2rem,7vw,3.5rem)] font-semibold leading-[1.2] tracking-[-.055em] sm:text-[clamp(3rem,5vw,5.4rem)]">
            {"“Customers with setup problems now reach someone who can walk them through it. Our engineers get bug reports they can act on straight away.”"
              .split(/\s+/)
              .map((word, index) => (
                <span key={`${word}-${index}`} data-ts-quote-word className="inline-block">
                  {word}
                  {"\u00a0"}
                </span>
              ))}
          </blockquote>

          <p className="mt-8 text-[10px] font-bold uppercase tracking-[.18em] text-[#E85B60]">
            SMART HOME DEVICE BRAND
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white px-5 py-[80px] sm:px-8 sm:py-[115px] lg:px-14 lg:py-[145px]">
        <div className="mx-auto grid max-w-[1320px] gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-16">
          <div className="lg:sticky lg:top-[115px] lg:self-start">
            <p data-ts-fade className="text-[9px] font-bold uppercase tracking-[.22em] text-[#B12025] sm:text-[11px]">
              FAQ
            </p>

            <h2 className="mt-5 max-w-[560px] text-[clamp(2.35rem,8vw,3.7rem)] font-semibold leading-[1.03] tracking-[-.06em] sm:text-[clamp(3.4rem,4.6vw,5.4rem)]">
              <ScrollHeading text="Common Questions About Technical Support" />
            </h2>
          </div>

          <div className="border-t border-[#17191C]/15">
            {faqs.map((item, index) => (
              <FAQItem
                key={item.q}
                item={item}
                open={faqOpen === index}
                onClick={() => setFaqOpen(faqOpen === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* OTHER SERVICES */}
      <section className="bg-[#F7F7F6] px-5 py-[70px] sm:px-8 sm:py-[95px] lg:px-14">
        <div className="mx-auto max-w-[1420px]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[.22em] text-[#B12025] sm:text-[11px]">
                KEEP EXPLORING
              </p>

              <h2 className="mt-4 text-[clamp(2rem,7vw,3.2rem)] font-semibold tracking-[-.055em]">
                <ScrollHeading text="Other IT Services" />
              </h2>
            </div>

            <Link href={BASE} className="inline-flex items-center gap-2 text-[11px] font-semibold text-[#B12025]">
              See all services
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {related.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                data-ts-fade
                className="group rounded-[22px] border border-[#17191C]/10 bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[#B12025]/30 hover:shadow-[0_20px_55px_rgba(23,25,28,.06)]"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-[17px] font-semibold tracking-[-.035em]">
                    {service.title}
                  </h3>

                  <ArrowUpRight size={17} className="text-[#B12025] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>

                <p className="mt-5 text-[11px] leading-6 text-[#17191C]/55 sm:text-[12px]">
                  {service.text}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section
        id="technical-support-process"
        className="bg-white px-5 py-[85px] sm:px-8 sm:py-[120px] lg:px-14 lg:py-[150px]"
      >
        <div className="mx-auto max-w-[1420px]">
          <p data-ts-fade className="text-[9px] font-bold uppercase tracking-[.22em] text-[#B12025] sm:text-[11px]">
            THE PROCESS
          </p>

          <h2 className="mt-5 max-w-[1000px] text-[clamp(2.35rem,8vw,3.8rem)] font-semibold leading-[1.03] tracking-[-.06em] sm:text-[clamp(3.5rem,5vw,5.8rem)]">
            <ScrollHeading text="How Your Technical Support Team Is Set Up" />
          </h2>

          <p data-ts-fade className="mt-6 max-w-[720px] text-[12px] leading-[1.9] text-[#17191C]/58 sm:text-[14px]">
            The biggest risk with outsourced technical support is a team
            that does not know your product or your escalation rules.
            The setup process is designed to prevent that.
          </p>

          <div className="relative mt-12 grid border-t border-[#17191C]/15 lg:grid-cols-4">
            <div data-ts-process-line aria-hidden="true" className="absolute left-0 top-[-1px] hidden h-[2px] w-full bg-[#B12025] lg:block" />

            {process.map((item, index) => (
              <article
                key={item.number}
                data-ts-fade
                className={`border-b border-[#17191C]/15 py-8 lg:min-h-[340px] lg:border-b-0 lg:px-7 lg:py-10 ${
                  index < process.length - 1 ? "lg:border-r" : ""
                }`}
              >
                <span className="text-[10px] font-semibold text-[#B12025]">
                  {item.number}
                </span>

                <h3 className="mt-8 text-[23px] font-semibold leading-[1.08] tracking-[-.045em] sm:text-[26px]">
                  {item.title}
                </h3>

                <p className="mt-5 text-[12px] leading-[1.85] text-[#17191C]/58 sm:text-[13px]">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
