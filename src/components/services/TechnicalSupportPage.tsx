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
    <article data-ts-card className="group relative min-h-[355px] sm:min-h-[390px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 translate-x-[14px] translate-y-[16px] -skew-y-[4deg] rounded-[26px] border border-[#B12025]/10 bg-[#B12025]/[0.025] transition-all duration-700 group-hover:translate-x-[8px] group-hover:translate-y-[10px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 translate-x-[7px] translate-y-[8px] -skew-y-[4deg] rounded-[26px] border border-[#17191C]/10 bg-white/75 shadow-[0_18px_50px_rgba(23,25,28,.04)] transition-all duration-700 group-hover:translate-x-[4px] group-hover:translate-y-[5px]"
      />

      <div className="relative z-10 flex h-full min-h-[355px] -skew-y-[4deg] flex-col overflow-hidden rounded-[26px] border border-[#17191C]/10 bg-white/95 p-6 shadow-[0_20px_60px_rgba(23,25,28,.05)] backdrop-blur-sm transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-3 hover:skew-y-0 hover:border-[#B12025]/30 hover:shadow-[0_28px_80px_rgba(177,32,37,.11)] sm:min-h-[390px] sm:p-8">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] font-semibold tracking-[.14em] text-[#17191C]/35">
            {item.number} / 08
          </span>

          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#17191C]/10 bg-white text-[#B12025] transition-all duration-500 group-hover:bg-[#B12025] group-hover:text-white">
            <ArrowUpRight size={16} />
          </span>
        </div>

        <div className="mt-9 flex h-[54px] w-[54px] items-center justify-center rounded-[17px] bg-[#B12025] text-white shadow-[0_12px_32px_rgba(177,32,37,.18)] sm:mt-11">
          <Icon size={24} strokeWidth={1.8} />
        </div>

        <div className="mt-auto pt-12">
          <p className="text-[9px] font-bold uppercase tracking-[.16em] text-[#B12025]/70">
            {item.tag}
          </p>

          <h3 className="mt-3 text-[24px] font-semibold leading-[1.08] tracking-[-.045em] text-[#17191C]">
            {item.title}
          </h3>

          <p className="mt-4 text-[12px] leading-[1.85] text-[#17191C]/60 sm:text-[13px]">
            {item.text}
          </p>
        </div>
      </div>
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

export default function TechnicalSupportPage() {
  const rootRef = useRef<HTMLDivElement>(null);
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
          .toArray<HTMLElement>("[data-ts-card]")
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

  const scrollToIncluded = () =>
    document.getElementById("technical-support-included")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

  return (
    <div ref={rootRef} className="overflow-x-clip bg-white font-sans text-[#17191C]">
      {/* HERO */}
      <section
        aria-labelledby="technical-support-title"
        className="relative isolate min-h-[760px] overflow-hidden bg-white px-5 pb-[100px] pt-[135px] sm:px-8 sm:pb-[120px] sm:pt-[165px] lg:min-h-[880px] lg:px-14 lg:pb-[150px] lg:pt-[190px]"
      >
        <div
          data-ts-parallax="0.2"
          aria-hidden="true"
          className="pointer-events-none absolute left-[3%] top-[31%] z-0 hidden w-[225px] -rotate-[7deg] rounded-[22px] border border-[#B12025]/10 bg-[#FFF8F8] p-5 opacity-60 shadow-[0_20px_60px_rgba(177,32,37,.06)] xl:block"
        >
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-bold uppercase tracking-[.16em] text-[#B12025]">
              Ticket status
            </span>
            <Headphones size={18} className="text-[#B12025]" />
          </div>
          <p className="mt-5 text-[30px] font-semibold tracking-[-.06em] text-[#B12025]">
            Resolved
          </p>
          <p className="mt-2 text-[10px] leading-5 text-[#17191C]/45">
            First-line issue handled by the support team.
          </p>
        </div>

        <div
          data-ts-parallax="0.42"
          aria-hidden="true"
          className="pointer-events-none absolute right-[4%] top-[29%] z-0 hidden w-[240px] rotate-[6deg] rounded-[22px] border border-[#17191C]/10 bg-white p-5 opacity-55 shadow-[0_20px_60px_rgba(23,25,28,.06)] xl:block"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#B12025] text-white">
              <Bug size={17} />
            </span>
            <div>
              <p className="text-[10px] font-semibold text-[#17191C]">
                Bug escalated
              </p>
              <p className="mt-1 text-[9px] text-[#17191C]/45">
                Reproduction steps attached
              </p>
            </div>
          </div>
        </div>

        <div
          data-ts-parallax="0.55"
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[13%] left-[11%] z-0 hidden w-[250px] -rotate-[3deg] rounded-[22px] border border-[#B12025]/10 bg-white p-5 opacity-45 shadow-[0_20px_60px_rgba(177,32,37,.05)] lg:block"
        >
          <div className="flex items-center gap-3">
            <CheckCircle2 size={20} className="text-[#B12025]" />
            <p className="text-[10px] font-semibold text-[#17191C]">
              Customer updated
            </p>
          </div>
        </div>

        <div
          data-ts-parallax="0.3"
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[10%] right-[10%] z-0 hidden w-[250px] rotate-[3deg] rounded-[22px] border border-[#B12025]/10 bg-[#FFF8F8] p-5 opacity-45 shadow-[0_20px_60px_rgba(177,32,37,.05)] lg:block"
        >
          <p className="text-[9px] font-bold uppercase tracking-[.16em] text-[#B12025]">
            Support dashboard
          </p>
          <div className="mt-4 space-y-2">
            <div className="h-2 w-full rounded-full bg-[#B12025]/15" />
            <div className="h-2 w-[82%] rounded-full bg-[#B12025]/10" />
            <div className="h-2 w-[64%] rounded-full bg-[#B12025]/10" />
          </div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[50%] z-[1] h-[520px] w-[92%] max-w-[1180px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-white/85 blur-[55px]"
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
            className="mx-auto mt-6 max-w-[1320px] text-[clamp(2.65rem,10vw,4.4rem)] font-semibold leading-[1.01] tracking-[-.07em] text-[#B12025] sm:mt-8 sm:text-[clamp(4.2rem,7vw,7.2rem)] lg:text-[clamp(4.8rem,6.2vw,7.4rem)]"
          >
            <RisingWords text="A Trained Helpdesk for Your Customers." />
          </h1>

          <p
            data-ts-hero-copy
            className="mx-auto mt-5 max-w-[1100px] text-[clamp(1.35rem,5.5vw,2rem)] font-semibold leading-[1.12] tracking-[-.045em] text-[#B12025] sm:mt-6 sm:text-[clamp(2rem,3.2vw,3.3rem)]"
          >
            So your developers can work on the product.
          </p>

          <p
            data-ts-hero-copy
            className="mx-auto mt-7 max-w-[800px] text-[12px] leading-[1.8] text-[#17191C]/62 sm:mt-9 sm:text-[15px] sm:leading-[1.9]"
          >
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
              className="inline-flex min-h-[50px] items-center gap-2 rounded-full border border-[#B12025]/20 bg-white px-6 text-[12px] font-semibold text-[#B12025] transition hover:border-[#B12025]"
            >
              See what is included
              <ArrowDown data-ts-down size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* INCLUDED */}
      <section
        id="technical-support-included"
        className="scroll-mt-[90px] bg-[#F7F7F6] px-5 py-[80px] sm:px-8 sm:py-[115px] lg:px-14 lg:py-[145px]"
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

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-6">
            {included.map((item) => (
              <SupportCard key={item.title} item={item} />
            ))}
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
