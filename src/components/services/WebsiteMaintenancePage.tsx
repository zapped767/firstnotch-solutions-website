"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  FileCheck2,
  Gauge,
  HardDrive,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
  TimerReset,
  Wrench,
} from "lucide-react";
import MaintenanceScrollHero from "../../components/services/Maintenancescrollhero";

gsap.registerPlugin(ScrollTrigger);

const RED = "#B12025";
const CHARCOAL = "#17191C";
const BASE = "/services/it-services";

const maintenanceServices = [
  {
    number: "01",
    title: "Software and plugin updates",
    description:
      "Your platform, theme and plugins are checked and updated on a planned schedule, with a quick test after each change.",
    tag: "Monthly care",
    Icon: RefreshCw,
  },
  {
    number: "02",
    title: "Security patches",
    description:
      "Important security fixes are applied quickly, with access and update activity checked as part of the maintenance routine.",
    tag: "Security first",
    Icon: ShieldCheck,
  },
  {
    number: "03",
    title: "Backups",
    description:
      "Backups are checked and retained so there is a recovery point if an update, hosting issue or human error causes a problem.",
    tag: "Recovery ready",
    Icon: HardDrive,
  },
  {
    number: "04",
    title: "Uptime monitoring",
    description:
      "Your website is monitored for availability. If it goes down, the issue can be investigated and escalated quickly.",
    tag: "Always watched",
    Icon: Gauge,
  },
  {
    number: "05",
    title: "Security scans",
    description:
      "Regular checks look for common malware, suspicious files and other signs that the website needs attention.",
    tag: "Routine checks",
    Icon: Search,
  },
  {
    number: "06",
    title: "Small content changes",
    description:
      "Minor text, image and page updates can be handled as part of the agreed monthly support allowance.",
    tag: "Everyday edits",
    Icon: Wrench,
  },
  {
    number: "07",
    title: "Speed checks",
    description:
      "Key pages are reviewed for obvious performance problems so loading speed does not quietly deteriorate over time.",
    tag: "Performance watch",
    Icon: TimerReset,
  },
  {
    number: "08",
    title: "Monthly report",
    description:
      "You receive a short summary of updates completed, issues found, fixes applied and items that need your decision.",
    tag: "Clear reporting",
    Icon: FileCheck2,
  },
] as const;

const reportMetrics = [
  {
    label: "Uptime",
    value: "99.9%",
    note: "Target agreed for your website",
    Icon: Gauge,
  },
  {
    label: "Updates applied",
    value: "Logged",
    note: "Platform, theme and plugins recorded",
    Icon: RefreshCw,
  },
  {
    label: "Backups",
    value: "Checked",
    note: "Recovery points reviewed",
    Icon: HardDrive,
  },
  {
    label: "Response time",
    value: "Tracked",
    note: "Urgent maintenance issues recorded",
    Icon: Clock3,
  },
  {
    label: "Page speed",
    value: "Compared",
    note: "Month-to-month movement reviewed",
    Icon: Sparkles,
  },
] as const;

const faqs = [
  {
    question: "Can you maintain a website another agency built?",
    answer:
      "Yes. The first step is a technical review of the code, plugins, hosting and access. If the site is maintainable, it can be brought into the monthly maintenance plan.",
  },
  {
    question: "Which platforms do you maintain?",
    answer:
      "FirstNotch can support WordPress, Shopify, Webflow and custom websites built with modern JavaScript frameworks such as React and Next.js. The exact scope is confirmed before the plan starts.",
  },
  {
    question: "What happens if the site is hacked?",
    answer:
      "The first priority is to isolate the problem, restore a safe version where possible, identify the likely cause and agree the recovery work with you. Larger recovery work can be quoted separately.",
  },
  {
    question: "Do we keep our own hosting?",
    answer:
      "Yes. Your domain, hosting and related accounts can stay in your name. FirstNotch only needs the level of access required to maintain the website.",
  },
  {
    question: "How is maintenance priced?",
    answer:
      "Maintenance is priced as a monthly plan based on the website, platform, number of sites, support hours and the amount of content work included.",
  },
] as const;

const process = [
  {
    number: "01",
    title: "Audit your current site",
    description:
      "Review hosting, platform, plugins, backups, access and the current maintenance risks.",
  },
  {
    number: "02",
    title: "Agree the maintenance plan",
    description:
      "Set the update routine, monitoring scope, support allowance, contacts and escalation path.",
  },
  {
    number: "03",
    title: "Run the monthly checks",
    description:
      "Updates, backups, scans, uptime checks and agreed content tasks are handled through the month.",
  },
  {
    number: "04",
    title: "Report what changed",
    description:
      "You receive a concise summary of work completed, issues found and anything that needs approval.",
  },
] as const;

const relatedServices = [
  {
    title: "Web development",
    href: `${BASE}/web-development`,
    text: "New websites designed and built around your business.",
  },
  {
    title: "IT support",
    href: `${BASE}/it-support`,
    text: "Day-to-day help for your staff and business systems.",
  },
  {
    title: "Technical support",
    href: `${BASE}/technical-support`,
    text: "Customer-facing help for software and devices.",
  },
] as const;

function ScrollRevealHeading({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <span
      data-maint-heading
      role="text"
      aria-label={text}
      className={className}
    >
      {text.split(/\s+/).map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="inline-block overflow-hidden align-bottom"
          aria-hidden="true"
        >
          <span data-maint-heading-word className="inline-block">
            {word}
          </span>
          {"\u00a0"}
        </span>
      ))}
    </span>
  );
}

function MaintenanceCard({
  item,
}: {
  item: (typeof maintenanceServices)[number];
}) {
  const Icon = item.Icon;

  return (
    <article
      data-maint-card
      className="group relative min-h-[350px] sm:min-h-[390px]"
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          translate-x-[14px]
          translate-y-[16px]
          -skew-y-[4deg]
          rounded-[26px]
          border
          border-[#B12025]/10
          bg-[#B12025]/[0.025]
          transition-all
          duration-700
          group-hover:translate-x-[8px]
          group-hover:translate-y-[10px]
          group-hover:border-[#B12025]/20
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          translate-x-[7px]
          translate-y-[8px]
          -skew-y-[4deg]
          rounded-[26px]
          border
          border-[#17191C]/10
          bg-white/70
          shadow-[0_18px_50px_rgba(23,25,28,0.04)]
          transition-all
          duration-700
          group-hover:translate-x-[4px]
          group-hover:translate-y-[5px]
        "
      />

      <div
        className="
          relative
          z-10
          flex
          h-full
          min-h-[350px]
          -skew-y-[4deg]
          flex-col
          overflow-hidden
          rounded-[26px]
          border
          border-[#17191C]/10
          bg-white/95
          p-6
          shadow-[0_20px_60px_rgba(23,25,28,0.05)]
          backdrop-blur-sm
          transition-all
          duration-700
          ease-[cubic-bezier(0.22,1,0.36,1)]
          hover:-translate-y-3
          hover:skew-y-0
          hover:border-[#B12025]/30
          hover:shadow-[0_28px_80px_rgba(177,32,37,0.11)]
          sm:min-h-[390px]
          sm:p-8
        "
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] font-semibold tracking-[0.14em] text-[#17191C]/35">
            {item.number} / 08
          </span>

          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#17191C]/10 bg-white text-[#B12025] transition-all duration-500 group-hover:bg-[#B12025] group-hover:text-white">
            <ArrowUpRight size={16} />
          </span>
        </div>

        <div className="mt-9 flex h-[54px] w-[54px] items-center justify-center rounded-[17px] bg-[#B12025] text-white shadow-[0_12px_32px_rgba(177,32,37,0.18)] sm:mt-11">
          <Icon size={24} strokeWidth={1.8} />
        </div>

        <div className="mt-auto pt-12">
          <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#B12025]/70">
            {item.tag}
          </p>

          <h3 className="mt-3 text-[24px] font-semibold leading-[1.08] tracking-[-0.045em] text-[#17191C]">
            {item.title}
          </h3>

          <p className="mt-4 text-[12px] leading-[1.85] text-[#17191C]/60 sm:text-[13px]">
            {item.description}
          </p>
        </div>
      </div>
    </article>
  );
}

function FAQItem({
  question,
  answer,
  open,
  onClick,
}: {
  question: string;
  answer: string;
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
        <span className="max-w-[900px] text-[16px] font-semibold leading-[1.3] tracking-[-0.03em] text-[#17191C] sm:text-[21px] lg:text-[24px]">
          {question}
        </span>

        <span
          className={`
            flex h-9 w-9 shrink-0 items-center justify-center rounded-full border
            transition-all duration-300 sm:h-11 sm:w-11
            ${
              open
                ? "rotate-180 border-[#B12025] bg-[#B12025] text-white"
                : "border-[#17191C]/15 text-[#17191C]"
            }
          `}
        >
          <ChevronDown size={17} />
        </span>
      </button>

      <div
        className={`grid transition-all duration-500 ${
          open
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="max-w-[850px] pb-6 pr-10 text-[12px] leading-[1.85] text-[#17191C]/65 sm:pb-8 sm:text-[14px]">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function WebsiteMaintenancePage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  useEffect(() => {
    if (!rootRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          "[data-maint-eyebrow]",
          { y: 14, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            ease: "power3.out",
          },
        );

        gsap.fromTo(
          "[data-maint-hero-word]",
          {
            yPercent: 120,
            opacity: 0,
          },
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
          "[data-maint-hero-copy]",
          {
            y: 24,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            delay: 0.35,
          },
        );

        gsap.to("[data-maint-down]", {
          y: 6,
          duration: 0.7,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.utils
          .toArray<HTMLElement>("[data-maint-heading]")
          .forEach((heading) => {
            const words = heading.querySelectorAll(
              "[data-maint-heading-word]",
            );

            gsap.fromTo(
              words,
              {
                yPercent: 95,
                opacity: 0.18,
              },
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
          .toArray<HTMLElement>("[data-maint-card]")
          .forEach((card, index) => {
            gsap.fromTo(
              card,
              {
                y: 70 + (index % 2) * 24,
                opacity: 0,
                rotate: index % 2 === 0 ? -1.5 : 1.5,
              },
              {
                y: 0,
                opacity: 1,
                rotate: 0,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 92%",
                  once: true,
                },
              },
            );
          });

        gsap.utils
          .toArray<HTMLElement>("[data-maint-parallax]")
          .forEach((layer) => {
            const speed = Number(
              layer.dataset.maintParallax || "0.25",
            );

            gsap.fromTo(
              layer,
              {
                y: -55 * speed,
              },
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
          .toArray<HTMLElement>("[data-maint-fade]")
          .forEach((element) => {
            gsap.fromTo(
              element,
              {
                y: 24,
                opacity: 0,
              },
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
          "[data-maint-quote-word]",
          {
            opacity: 0.16,
            y: 14,
          },
          {
            opacity: 1,
            y: 0,
            stagger: 0.025,
            ease: "none",
            scrollTrigger: {
              trigger: "#maintenance-quote",
              start: "top 78%",
              end: "bottom 48%",
              scrub: 0.7,
            },
          },
        );

        gsap.fromTo(
          "[data-maint-process-line]",
          {
            scaleX: 0,
          },
          {
            scaleX: 1,
            transformOrigin: "left center",
            ease: "none",
            scrollTrigger: {
              trigger: "#maintenance-process",
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

  const scrollToIncluded = () => {
    document
      .getElementById("maintenance-included")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  return (
    <div
      ref={rootRef}
      className="overflow-x-clip bg-white font-sans text-[#17191C]"
    >
      {/* =====================================================
          01 — HERO (scroll-pinned, see MaintenanceScrollHero.tsx)
      ===================================================== */}

      <MaintenanceScrollHero onSeeIncluded={scrollToIncluded} />

      {/* =====================================================
          02 — INCLUDED / GSAP CARDS
      ===================================================== */}

      <section
        id="maintenance-included"
        className="
          scroll-mt-[90px] bg-[#F7F7F6]
          px-5 py-[80px]
          sm:px-8 sm:py-[115px]
          lg:px-14 lg:py-[145px]
        "
      >
        <div className="mx-auto max-w-[1450px]">
          <div className="mx-auto max-w-[1000px] text-center">
            <p
              data-maint-fade
              className="text-[9px] font-bold uppercase tracking-[0.23em] text-[#B12025] sm:text-[11px]"
            >
              INCLUDED IN THE PLAN
            </p>

            <h2 className="mt-5 text-[clamp(2.2rem,8vw,3.7rem)] font-semibold leading-[1.04] tracking-[-0.06em] text-[#17191C] sm:text-[clamp(3.4rem,5vw,5.8rem)]">
              <ScrollRevealHeading text="What the Website Maintenance Service Includes" />
            </h2>

            <p
              data-maint-fade
              className="mx-auto mt-6 max-w-[650px] text-[12px] leading-[1.85] text-[#17191C]/58 sm:text-[14px]"
            >
              Routine maintenance, monitoring and small updates,
              organised into a clear monthly service instead of a
              list of jobs nobody owns.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-6">
            {maintenanceServices.map((item) => (
              <MaintenanceCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          03 — REPORTING / PARALLAX
      ===================================================== */}

      <section
        className="
          relative isolate overflow-hidden bg-white
          px-5 py-[85px]
          sm:px-8 sm:py-[120px]
          lg:px-14 lg:py-[150px]
        "
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1800&q=78')",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-white/90"
        />
        <div
          data-maint-parallax="0.45"
          aria-hidden="true"
          className="
            pointer-events-none absolute -left-[180px] top-[18%]
            h-[420px] w-[420px] rounded-full bg-[#B12025]/[0.035]
            blur-[80px]
          "
        />

        <div
          data-maint-parallax="0.25"
          aria-hidden="true"
          className="
            pointer-events-none absolute -right-[160px] bottom-[8%]
            h-[460px] w-[460px] rounded-full bg-[#B12025]/[0.04]
            blur-[90px]
          "
        />

        <div className="relative z-10 mx-auto max-w-[1420px]">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <div>
              <p
                data-maint-fade
                className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#B12025] sm:text-[11px]"
              >
                MONTHLY REPORTING
              </p>

              <h2 className="mt-5 max-w-[750px] text-[clamp(2.35rem,8vw,3.8rem)] font-semibold leading-[1.04] tracking-[-0.06em] text-[#17191C] sm:text-[clamp(3.5rem,5vw,5.8rem)]">
                <ScrollRevealHeading text="The Numbers You Will See" />
              </h2>
            </div>

            <p
              data-maint-fade
              className="max-w-[600px] text-[12px] leading-[1.9] text-[#17191C]/60 sm:text-[14px] lg:justify-self-end"
            >
              The report is deliberately short. It shows what was
              checked, what changed, what was fixed and what needs
              your decision next.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-[1.12fr_.88fr] lg:gap-8">
            <div
              data-maint-fade
              className="
                overflow-hidden rounded-[30px] border border-[#17191C]/10
                bg-[#F8F8F7] p-5 sm:p-7 lg:p-8
              "
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#17191C]/10 pb-5">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#B12025]">
                    WEBSITE MAINTENANCE REPORT
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
                {reportMetrics.slice(0, 4).map((metric) => {
                  const Icon = metric.Icon;

                  return (
                    <article
                      key={metric.label}
                      className="rounded-[18px] border border-[#17191C]/10 bg-white p-5"
                    >
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
                      Page speed
                    </p>
                    <p className="mt-1 text-[10px] text-[#17191C]/45">
                      Compared with the previous month
                    </p>
                  </div>

                  <span className="text-[11px] font-semibold text-[#B12025]">
                    Stable
                  </span>
                </div>
              </article>
            </div>

            <div className="relative min-h-[520px]">
              <div
                data-maint-parallax="0.25"
                className="
                  absolute left-0 top-4 w-[88%] rounded-[24px]
                  border border-[#B12025]/12 bg-white p-6
                  shadow-[0_24px_70px_rgba(23,25,28,.07)]
                  sm:w-[75%]
                "
              >
                <p className="text-[9px] font-bold uppercase tracking-[.15em] text-[#B12025]">
                  UPDATE LOG
                </p>
                <p className="mt-5 text-[22px] font-semibold tracking-[-.04em]">
                  7 maintenance actions completed
                </p>
                <div className="mt-5 space-y-3">
                  {[
                    "CMS and plugins checked",
                    "Backup recovery point verified",
                    "Security scan reviewed",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-[12px] bg-[#F7F7F6] px-4 py-3"
                    >
                      <CheckCircle2 size={16} className="text-[#B12025]" />
                      <span className="text-[11px] font-medium text-[#17191C]/70">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div
                data-maint-parallax="0.55"
                className="
                  absolute bottom-4 right-0 w-[82%] rounded-[24px]
                  bg-[#B12025] p-6 text-white
                  shadow-[0_28px_80px_rgba(177,32,37,.20)]
                  sm:w-[72%]
                "
              >
                <p className="text-[9px] font-bold uppercase tracking-[.15em] text-white/65">
                  ATTENTION REQUIRED
                </p>

                <p className="mt-5 text-[24px] font-semibold leading-[1.12] tracking-[-.045em]">
                  One item needs your approval.
                </p>

                <p className="mt-4 text-[11px] leading-6 text-white/75">
                  A larger change is kept separate from routine
                  maintenance so you stay in control of scope and cost.
                </p>

                <span className="mt-6 inline-flex items-center gap-2 text-[10px] font-semibold">
                  Review item
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

      {/* =====================================================
          04 — TESTIMONIAL
      ===================================================== */}

      <section
        id="maintenance-quote"
        className="
          overflow-hidden bg-[#17191C]
          px-5 py-[90px] text-white
          sm:px-8 sm:py-[125px]
          lg:px-14 lg:py-[150px]
        "
      >
        <div className="mx-auto max-w-[1250px] text-center">
          <p className="text-[9px] font-bold uppercase tracking-[.23em] text-white/45 sm:text-[11px]">
            CLIENT EXPERIENCE
          </p>

          <blockquote className="mx-auto mt-8 max-w-[1100px] text-[clamp(2rem,7vw,3.5rem)] font-semibold leading-[1.2] tracking-[-.055em] sm:text-[clamp(3rem,5vw,5.4rem)]">
            {"“Plugin updates and backups used to be nobody's job. Now they are done each month, and we get a list of what changed.”"
              .split(/\s+/)
              .map((word, index) => (
                <span
                  key={`${word}-${index}`}
                  data-maint-quote-word
                  className="inline-block"
                >
                  {word}
                  {"\u00a0"}
                </span>
              ))}
          </blockquote>

          <p className="mt-8 text-[10px] font-bold uppercase tracking-[.18em] text-[#E85B60]">
            SME WEBSITE CLIENT
          </p>
        </div>
      </section>

      {/* =====================================================
          05 — FAQ
      ===================================================== */}

      <section className="bg-white px-5 py-[80px] sm:px-8 sm:py-[115px] lg:px-14 lg:py-[145px]">
        <div className="mx-auto grid max-w-[1320px] gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-16">
          <div className="lg:sticky lg:top-[115px] lg:self-start">
            <p
              data-maint-fade
              className="text-[9px] font-bold uppercase tracking-[.22em] text-[#B12025] sm:text-[11px]"
            >
              FAQ
            </p>

            <h2 className="mt-5 max-w-[560px] text-[clamp(2.35rem,8vw,3.7rem)] font-semibold leading-[1.03] tracking-[-.06em] sm:text-[clamp(3.4rem,4.6vw,5.4rem)]">
              <ScrollRevealHeading text="Common Questions About Website Maintenance" />
            </h2>
          </div>

          <div className="border-t border-[#17191C]/15">
            {faqs.map((item, index) => (
              <FAQItem
                key={item.question}
                question={item.question}
                answer={item.answer}
                open={faqOpen === index}
                onClick={() =>
                  setFaqOpen(
                    faqOpen === index ? null : index,
                  )
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          06 — OTHER IT SERVICES
      ===================================================== */}

      <section className="bg-[#F7F7F6] px-5 py-[70px] sm:px-8 sm:py-[95px] lg:px-14">
        <div className="mx-auto max-w-[1420px]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[.22em] text-[#B12025] sm:text-[11px]">
                KEEP EXPLORING
              </p>

              <h2 className="mt-4 text-[clamp(2rem,7vw,3.2rem)] font-semibold tracking-[-.055em]">
                <ScrollRevealHeading text="Other IT Services" />
              </h2>
            </div>

            <Link
              href={BASE}
              className="inline-flex items-center gap-2 text-[11px] font-semibold text-[#B12025]"
            >
              See all services
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {relatedServices.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                data-maint-fade
                className="
                  group rounded-[22px] border border-[#17191C]/10
                  bg-white p-6 transition-all duration-500
                  hover:-translate-y-1 hover:border-[#B12025]/30
                  hover:shadow-[0_20px_55px_rgba(23,25,28,.06)]
                "
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-[17px] font-semibold tracking-[-.035em]">
                    {service.title}
                  </h3>

                  <ArrowUpRight
                    size={17}
                    className="text-[#B12025] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </div>

                <p className="mt-5 text-[11px] leading-6 text-[#17191C]/55 sm:text-[12px]">
                  {service.text}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          07 — PROCESS
      ===================================================== */}

      <section
        id="maintenance-process"
        className="bg-white px-5 py-[85px] sm:px-8 sm:py-[120px] lg:px-14 lg:py-[150px]"
      >
        <div className="mx-auto max-w-[1420px]">
          <p
            data-maint-fade
            className="text-[9px] font-bold uppercase tracking-[.22em] text-[#B12025] sm:text-[11px]"
          >
            THE PROCESS
          </p>

          <h2 className="mt-5 max-w-[1000px] text-[clamp(2.35rem,8vw,3.8rem)] font-semibold leading-[1.03] tracking-[-.06em] sm:text-[clamp(3.5rem,5vw,5.8rem)]">
            <ScrollRevealHeading text="How Website Maintenance Starts" />
          </h2>

          <p
            data-maint-fade
            className="mt-6 max-w-[720px] text-[12px] leading-[1.9] text-[#17191C]/58 sm:text-[14px]"
          >
            Maintenance works best when access, responsibilities and
            the monthly routine are clear before the first update is made.
          </p>

          <div className="relative mt-12 grid border-t border-[#17191C]/15 lg:grid-cols-4">
            <div
              data-maint-process-line
              aria-hidden="true"
              className="absolute left-0 top-[-1px] hidden h-[2px] w-full bg-[#B12025] lg:block"
            />

            {process.map((item, index) => (
              <article
                key={item.number}
                data-maint-fade
                className={`
                  border-b border-[#17191C]/15 py-8
                  lg:min-h-[340px] lg:border-b-0 lg:px-7 lg:py-10
                  ${
                    index < process.length - 1
                      ? "lg:border-r"
                      : ""
                  }
                `}
              >
                <span className="text-[10px] font-semibold text-[#B12025]">
                  {item.number}
                </span>

                <h3 className="mt-8 text-[23px] font-semibold leading-[1.08] tracking-[-.045em] sm:text-[26px]">
                  {item.title}
                </h3>

                <p className="mt-5 text-[12px] leading-[1.85] text-[#17191C]/58 sm:text-[13px]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
