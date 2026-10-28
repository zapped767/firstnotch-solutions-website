
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlyphPortal from "@/components/services/GlyphPortal";
import {
  Activity,
  AlertCircle,
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Bell,
  Check,
  CheckCheck,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  Clock3,
  Headphones,
  Laptop,
  LockKeyhole,
  Mail,
  MessageCircle,
  Monitor,
  MousePointer2,
  Phone,
  Search,
  ShieldCheck,
  Star,
  Ticket,
  UserRoundCheck,
  Users,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const RED = "#B12025";
const IT_BASE = "/services/it-services";

type Lane = "Urgent" | "Normal" | "Low";

type TicketItem = {
  id: string;
  subject: string;
  lane: Lane;
  detail: string;
};

const features = [
  {
    title: "A helpdesk for your staff",
    icon: Headphones,
    text: "Staff can raise a request by email, chat or phone. Each request gets a ticket number.",
    note: "Ticket created and tracked",
  },
  {
    title: "Remote fixes",
    icon: MousePointer2,
    text: "Problems are fixed through a secure remote connection, so nobody needs to visit.",
    note: "Secure remote assistance",
  },
  {
    title: "Accounts and access",
    icon: UserRoundCheck,
    text: "New starters get email, login and access set up. Leavers have access removed on their last day.",
    note: "Joiners and leavers",
  },
  {
    title: "Email and office software",
    icon: Mail,
    text: "Microsoft 365 or Google Workspace accounts, email and file sharing are managed for you.",
    note: "Your working tools",
  },
  {
    title: "Monitoring",
    icon: Activity,
    text: "Devices and systems are checked for warning signs, such as low disk space or failed updates. Alerts are checked each working day and logged as tickets.",
    note: "Warnings become tickets",
  },
  {
    title: "Security basics",
    icon: ShieldCheck,
    text: "Updates, antivirus and two-factor login are kept in place on each device.",
    note: "Security checks",
  },
  {
    title: "Device setup",
    icon: Laptop,
    text: "New laptops are set up with the software and settings your staff need. Devices can be sent out ready to use.",
    note: "Prepared for day one",
  },
  {
    title: "Your priority rules",
    icon: Bell,
    text: "You decide which problems are urgent, and those tickets are answered first.",
    note: "Urgency set by you",
  },
] as const;

const metrics = [
  {
    title: "First response time",
    text: "How long staff wait for a first reply.",
    note: "Target set for each priority level.",
    icon: Clock3,
  },
  {
    title: "Resolution time",
    text: "Time from the request to the fix.",
    note: "Shown by type of problem.",
    icon: CheckCircle2,
  },
  {
    title: "Repeat issues",
    text: "Problems that come back after being fixed.",
    note: "Each one is looked into.",
    icon: Activity,
  },
  {
    title: "Tickets per person",
    text: "Requests handled for each member of staff.",
    note: "Used to find systems that cause the most trouble.",
    icon: Ticket,
  },
  {
    title: "Satisfaction rating",
    text: "A short score staff give once their ticket is closed.",
    note: "Shared with the team every month.",
    icon: Star,
  },
] as const;

const faqs = [
  {
    q: "Is support only remote?",
    a: "Yes, support is given remotely from Colombo. For work that needs hands-on device care, a local partner can be arranged.",
    label: "Coverage",
  },
  {
    q: "How quickly are requests answered?",
    a: "Requests are handled on weekdays from 10am to 7pm Sri Lanka time. Urgent requests are picked up within 30 minutes during working hours. Others are answered within four hours.",
    label: "Response time",
  },
  {
    q: "Which systems can you support?",
    a: "Windows and Mac laptops, Microsoft 365, Google Workspace and common business software. For your own custom software, the team works from guides you provide.",
    label: "Systems",
  },
  {
    q: "How many staff can you support?",
    a: "Plans cover from 10 to 500 users.",
    label: "Team size",
  },
  {
    q: "How is IT support priced?",
    a: "A monthly fee per user or per device. Project work, such as an office move, is quoted separately.",
    label: "Pricing",
  },
] as const;

const initialTickets: TicketItem[] = [
  {
    id: "FN-1201",
    subject: "CEO can't log in",
    lane: "Urgent",
    detail: "Account access",
  },
  {
    id: "FN-1202",
    subject: "Printer jams",
    lane: "Normal",
    detail: "Office printer",
  },
  {
    id: "FN-1203",
    subject: "Wi-Fi slow in one room",
    lane: "Low",
    detail: "Network",
  },
  {
    id: "FN-1204",
    subject: "New starter needs email",
    lane: "Normal",
    detail: "Onboarding",
  },
  {
    id: "FN-1205",
    subject: "Laptop security alert",
    lane: "Urgent",
    detail: "Device monitoring",
  },
];

const setupSteps = [
  {
    title: "Learning your business",
    icon: ClipboardCheck,
    text: "The team documents your systems, accounts and current setup, and agrees access and priorities with you.",
  },
  {
    title: "Hiring and training",
    icon: Users,
    text: "Team members take language tests, technical assessments and reference checks. Only 15 to 20% of applicants pass. Each one is then trained on your systems and tools before starting.",
  },
  {
    title: "Going live with quality checks",
    icon: ShieldCheck,
    text: "Every ticket and project task gets a quality score. Work starts with lower-risk tasks, and access widens once you sign it off. Each team member has a monthly performance review with coaching.",
  },
  {
    title: "Reporting and improving",
    icon: Activity,
    text: "You get a monthly report on tickets, response times, uptime and open issues, plus a call to agree what to improve.",
  },
] as const;

// =====================================================
// GSAP SCROLL-REVEAL HEADINGS
// =====================================================

function SectionHeading({
  number,
  eyebrow,
  title,
  description,
}: {
  number: string;
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-[1000px]">
      <p
        data-it-rise
        className="mb-4 text-[11px] font-bold uppercase tracking-[.2em] text-[#B12025]"
      >
        {number} / {eyebrow}
      </p>

      <h2
        data-it-heading
        className="text-[clamp(2.2rem,4.6vw,5rem)] font-semibold leading-[1.07] tracking-[-.065em] text-[#17191C]"
      >
        {title.split(" ").map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="inline-block overflow-hidden align-bottom"
          >
            <span data-it-word className="inline-block">
              {word}
            </span>
            {"\u00a0"}
          </span>
        ))}
      </h2>

      {description && (
        <p
          data-it-rise
          className="mt-5 max-w-[690px] text-[14px] leading-[1.85] text-[#17191C]/65"
        >
          {description}
        </p>
      )}
    </div>
  );
}

// =====================================================
// ANIMATED HELPDESK TICKET FEED
// =====================================================

function TicketFeed({
  phase = 0,
  compact = false,
}: {
  phase?: number;
  compact?: boolean;
}) {
  const tickets = [
    {
      id: "FN-2041",
      channel: "Email",
      subject: "New starter needs access",
      Icon: Mail,
    },
    {
      id: "FN-2042",
      channel: "Chat",
      subject: "Laptop is running slowly",
      Icon: MessageCircle,
    },
    {
      id: "FN-2043",
      channel: "Phone",
      subject: "Password reset needed",
      Icon: Phone,
    },
  ];

  return (
    <div
      className={`overflow-hidden rounded-[22px] border border-[#B12025]/15 bg-white text-[#17191C] shadow-[0_22px_65px_rgba(69,13,19,.12)] ${
        compact ? "p-4" : "p-5 sm:p-7"
      }`}
    >
      <div className="flex items-center justify-between gap-3 border-b border-[#17191C]/10 pb-4">
        <div className="flex items-center gap-2">
          <Headphones size={18} className="text-[#B12025]" />
          <strong className="text-[12px] sm:text-[14px]">
            FirstNotch Solutions helpdesk
          </strong>
        </div>

        <span className="flex items-center gap-2 rounded-full bg-[#FBE9E9] px-3 py-1.5 text-[9px] font-bold uppercase text-[#B12025]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#B12025]" />
          Demo
        </span>
      </div>

      <div className="mt-4 space-y-2.5">
        {tickets.map((ticket, i) => {
          const status = (phase + 3 - i) % 3;

          return (
            <div
              key={ticket.id}
              className="flex items-center gap-3 rounded-xl border border-[#E6E7E9] p-3"
            >
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#FFF1F1] text-[#B12025]">
                <ticket.Icon size={17} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-[10px] font-semibold sm:text-[11px]">
                  {ticket.subject}
                </p>

                <p className="mt-1 font-mono text-[9px] text-[#17191C]/45">
                  {ticket.id} · {ticket.channel}
                </p>
              </div>

              <span
                className={`shrink-0 rounded-full px-2 py-1 text-[9px] font-semibold transition-colors ${
                  status === 2
                    ? "bg-[#B12025] text-white"
                    : status === 1
                      ? "bg-[#FBE9E9] text-[#B12025]"
                      : "bg-[#F4F4F5] text-[#17191C]/65"
                }`}
              >
                {status === 2
                  ? "Fixed"
                  : status === 1
                    ? "In progress"
                    : "New"}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-[#17191C]/10 pt-3 text-[10px]">
        <span className="text-[#17191C]/50">
          Every request has its own number
        </span>

        <span className="flex items-center gap-1 font-semibold text-[#B12025]">
          <CheckCircle2 size={13} />
          Satisfied
        </span>
      </div>
    </div>
  );
}

// =====================================================
// MAIN PAGE
// =====================================================

export default function ITSupportPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const manualTabRef = useRef(false);

  const [feedPhase, setFeedPhase] = useState(0);
  const [activeFeature, setActiveFeature] = useState(0);
  const [remoteStep, setRemoteStep] = useState(0);

  const [office, setOffice] = useState<
    "Microsoft 365" | "Google Workspace"
  >("Microsoft 365");

  const [monitorDemo, setMonitorDemo] = useState(false);

  const [tickets, setTickets] =
    useState<TicketItem[]>(initialTickets);

  const [selectedTicket, setSelectedTicket] =
    useState("FN-1201");

  const [draggedTicket, setDraggedTicket] =
    useState<string | null>(null);

  const [faqSearch, setFaqSearch] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [users, setUsers] = useState(70);

  const [billingUnit, setBillingUnit] = useState<
    "user" | "device"
  >("user");

  const [systemTab, setSystemTab] =
    useState("Microsoft 365");

  const [selectedNeed, setSelectedNeed] =
    useState("Existing helpdesk");

  // ---------------------------------------------------
  // ANIMATE SAMPLE TICKET STATUSES
  // ---------------------------------------------------

  useEffect(() => {
    if (
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
    ) {
      return;
    }

    const interval = window.setInterval(() => {
      setFeedPhase((previous) => (previous + 1) % 3);
    }, 3200);

    return () => window.clearInterval(interval);
  }, []);

  // ---------------------------------------------------
  // REMOTE FIX EXAMPLE
  // ---------------------------------------------------

  useEffect(() => {
    if (remoteStep !== 1 && remoteStep !== 2) return;

    const timeout = window.setTimeout(() => {
      setRemoteStep(remoteStep + 1);
    }, 1000);

    return () => window.clearTimeout(timeout);
  }, [remoteStep]);

  // ---------------------------------------------------
  // FAQ / KEYBOARD SEARCH
  // ---------------------------------------------------

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;

      const editing =
        ["INPUT", "TEXTAREA", "SELECT"].includes(
          target.tagName
        ) || target.isContentEditable;

      if (
        event.key === "/" &&
        !editing &&
        !event.altKey &&
        !event.ctrlKey &&
        !event.metaKey
      ) {
        event.preventDefault();
        searchRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKey);

    return () =>
      window.removeEventListener("keydown", handleKey);
  }, []);

  // ---------------------------------------------------
  // GSAP SCROLL ANIMATIONS
  // ---------------------------------------------------

  useEffect(() => {
    if (!rootRef.current) return;

    const mm = gsap.matchMedia();

    mm.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        const ctx = gsap.context(() => {
          // Hero heading rise

          gsap.fromTo(
            "[data-it-hero]",
            {
              yPercent: 108,
              opacity: 0,
            },
            {
              yPercent: 0,
              opacity: 1,
              duration: 0.65,
              stagger: 0.1,
              ease: "power3.out",
              clearProps: "transform,opacity",
            }
          );

          gsap.fromTo(
            "[data-it-hero-fade]",
            {
              opacity: 0,
              y: 20,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: 0.2,
              stagger: 0.09,
              ease: "power3.out",
              clearProps: "transform,opacity",
            }
          );

          // Scroll text reveal

          gsap.utils
            .toArray<HTMLElement>("[data-it-heading]")
            .forEach((heading) => {
              gsap.fromTo(
                heading.querySelectorAll(
                  "[data-it-word]"
                ),
                {
                  yPercent: 95,
                  opacity: 0.18,
                },
                {
                  yPercent: 0,
                  opacity: 1,
                  ease: "none",
                  stagger: 0.025,
                  scrollTrigger: {
                    trigger: heading,
                    start: "top 90%",
                    end: "bottom 62%",
                    scrub: 0.55,
                  },
                }
              );
            });

          // Fade and rise

          gsap.utils
            .toArray<HTMLElement>("[data-it-rise]")
            .forEach((item) => {
              gsap.fromTo(
                item,
                {
                  opacity: 0,
                  y: 20,
                },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.65,
                  ease: "power3.out",
                  scrollTrigger: {
                    trigger: item,
                    start: "top 92%",
                    once: true,
                  },
                }
              );
            });

          // Team progress rail

          gsap.fromTo(
            "[data-it-line]",
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: "none",
              scrollTrigger: {
                trigger: "#it-team",
                start: "top 75%",
                end: "bottom 50%",
                scrub: 1,
              },
            }
          );

          // Full-page progress bar

          gsap.fromTo(
            "[data-it-progress]",
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: "none",
              scrollTrigger: {
                trigger: rootRef.current,
                start: "top top",
                end: "bottom bottom",
                scrub: true,
              },
            }
          );

          // Testimonial word-by-word reveal

          gsap.fromTo(
            "[data-it-quote-word]",
            {
              opacity: 0.16,
              y: 12,
            },
            {
              opacity: 1,
              y: 0,
              stagger: 0.018,
              ease: "none",
              scrollTrigger: {
                trigger: "#it-quote",
                start: "top 78%",
                end: "bottom 58%",
                scrub: 0.6,
              },
            }
          );

          // Feature console changes as user scrolls

          ScrollTrigger.create({
            trigger: "#it-console",
            start: "top 65%",
            end: "bottom 36%",
            onUpdate(self) {
              if (!manualTabRef.current) {
                setActiveFeature(
                  Math.min(
                    7,
                    Math.floor(self.progress * 8)
                  )
                );
              }
            },
            onLeave: () => {
              manualTabRef.current = false;
            },
            onLeaveBack: () => {
              manualTabRef.current = false;
            },
          });
        }, rootRef);

        return () => ctx.revert();
      }
    );

    return () => mm.revert();
  }, []);

  // ---------------------------------------------------
  // DEMO TICKET PRIORITY LOGIC
  // ---------------------------------------------------

  const changePriority = (id: string, lane: Lane) => {
    setTickets((previous) =>
      previous.map((ticket) =>
        ticket.id === id
          ? { ...ticket, lane }
          : ticket
      )
    );
  };

  const visibleFaqs = faqs
    .map((item, index) => ({ ...item, index }))
    .filter((item) =>
      `${item.q} ${item.a} ${item.label}`
        .toLowerCase()
        .includes(faqSearch.trim().toLowerCase())
    );

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: {
        "@type": "Answer",
        text: a,
      },
    })),
  };

  return (
    <div
      ref={rootRef}
      className="overflow-x-clip bg-white font-sans text-[#17191C]"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />

      {/* PAGE SCROLL PROGRESS */}

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-[65] h-[3px]"
      >
        <div
          data-it-progress
          className="h-full w-full origin-left bg-[#B12025]"
        />
      </div>

      {/* =================================================
          01 — GLYPH PORTAL HERO
      ================================================= */}

    {/* ==============================================
    01 — IT SUPPORT HERO
============================================== */}

<GlyphPortal
  word="IT SUPPORT"
  fontWeight={900}
  scrollLength={1.8}
  interactive
  enterLabel="Enter IT support"
  className="w-full"
  style={{
    '--gp-paper': '#FFFFFF',
    '--gp-ink': RED,
    '--gp-field': RED,
    '--gp-foreground': '#FFFFFF',
  }}
  background={
    <div
      className="absolute inset-0 bg-[#B12025]"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 opacity-[.13]"
        style={{
          backgroundImage:
            'linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />

      <div className="absolute -right-24 top-10 h-[420px] w-[420px] rounded-full border border-white/25" />
    </div>
  }
  front={
    <>
      {/* TOP HERO TEXT */}

      <div className="absolute inset-x-0 top-[5%] mx-auto max-w-[1420px] px-5 sm:top-[7%] sm:px-8 lg:px-14">
        <p
          data-wd-hero-fade
          className="text-[10px] text-[#17191C]/55"
        >
          Services / IT Services / IT support
        </p>

        <p
          data-wd-hero-fade
          className="mt-3 text-[9px] font-bold uppercase tracking-[.23em] text-[#B12025] sm:mt-5 sm:text-[11px]"
        >
          IT support services in Sri Lanka
        </p>

        <h1 className="mt-2 max-w-[940px] text-[clamp(1.45rem,3.4vw,3.5rem)] font-semibold leading-[1.07] tracking-[-.065em] text-[#B12025] sm:mt-3">
          {[
            'A helpdesk your staff can call,',
            'and monitoring that finds',
            'problems early.',
          ].map((line) => (
            <span
              key={line}
              className="block overflow-hidden pb-[.05em]"
            >
              <span
                data-wd-hero-rise
                className="block"
              >
                {line}
              </span>
            </span>
          ))}
        </h1>
      </div>

      {/* BOTTOM HERO TEXT */}

      <div className="absolute inset-x-0 bottom-[5%] mx-auto max-w-[1420px] px-5 sm:bottom-[6%] sm:px-8 lg:px-14">
        <p
          data-wd-hero-fade
          className="max-w-[690px] text-[11px] leading-[1.65] text-[#17191C]/75 sm:text-[13px]"
        >
          When a laptop fails or a password stops
          working, staff can lose hours waiting for
          help. FirstNotch gives your team an IT
          support service run by trained staff in
          Colombo. Problems are fixed remotely, and
          every ticket gets a quality score.
        </p>

        <div
          data-wd-hero-fade
          className="mt-3 flex flex-wrap gap-2 sm:mt-5 sm:gap-3"
        >
          <a
            href="#contact"
            className="inline-flex min-h-[42px] items-center gap-2 rounded-full bg-[#B12025] px-4 text-[10px] font-semibold text-white sm:px-6 sm:text-[12px]"
          >
            Book a free discovery call
            <ArrowUpRight size={15} />
          </a>

          <a
            href="#it-included"
            className="inline-flex min-h-[42px] items-center gap-2 rounded-full border border-[#B12025]/35 bg-white px-4 text-[10px] font-semibold text-[#B12025] sm:px-6 sm:text-[12px]"
          >
            See what is included
            <ArrowDown size={15} />
          </a>
        </div>
      </div>
    </>
  }
>
  {/* REVEALED AFTER SCROLLING INTO TYPOGRAPHY */}

  <div className="mx-auto grid w-full max-w-[1250px] items-center gap-10 lg:grid-cols-2 lg:gap-14">
    <div>
      <p className="text-[10px] font-bold uppercase tracking-[.2em] text-white/70">
        IT support for your business
      </p>

      <h2 className="mt-5 max-w-[580px] text-[clamp(2.6rem,5.5vw,6rem)] font-semibold leading-[1.04] tracking-[-.07em]">
        Support that responds.
        <br />
        Monitoring that warns.
      </h2>

      <p className="mt-5 max-w-[480px] text-[14px] leading-[1.8] text-white/80">
        Helpdesk support, monitoring, user
        assistance and issue tracking — all handled
        by your Colombo team.
      </p>

      <a
        href="#it-included"
        className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[12px] font-bold text-[#B12025]"
      >
        Explore what is included
        <ArrowDown size={16} />
      </a>
    </div>

    {/* RIGHT SIDE IMAGE REMOVED */}
  </div>
</GlyphPortal>
      {/* =================================================
          02 — INTERACTIVE SERVICE CONSOLE
      ================================================= */}

      <section
        id="it-console"
        className="scroll-mt-24 bg-[#F7F7F8] px-5 py-16 sm:px-8 lg:px-14 lg:py-20"
      >
        <div className="mx-auto max-w-[1420px]">
          <SectionHeading
            number="01"
            eyebrow="What is included"
            title="Support that works like part of your team."
            description="Explore all eight parts of the IT support service. Each view uses fictional example tickets and devices."
          />

          <div className="mt-9 grid overflow-hidden rounded-[24px] border border-[#B12025]/15 bg-white lg:grid-cols-[320px_1fr]">
            {/* FEATURE TABS */}

            <div className="flex snap-x gap-2 overflow-x-auto border-b border-[#17191C]/10 bg-[#FFF9F9] p-3 [scrollbar-width:none] lg:flex-col lg:overflow-visible lg:border-b-0 lg:border-r lg:p-5">
              {features.map((item, i) => (
                <button
                  key={item.title}
                  type="button"
                  aria-pressed={activeFeature === i}
                  onClick={() => {
                    manualTabRef.current = true;
                    setActiveFeature(i);
                  }}
                  className={`flex min-w-max snap-start items-center gap-3 rounded-[14px] px-4 py-3 text-left transition lg:min-w-0 ${
                    activeFeature === i
                      ? "bg-[#B12025] text-white shadow-sm"
                      : "text-[#17191C]/75 hover:bg-white"
                  }`}
                >
                  <item.icon
                    size={18}
                    className="shrink-0"
                  />

                  <span className="text-[12px] font-semibold">
                    {item.title}
                  </span>

                  <span className="ml-auto hidden font-mono text-[10px] opacity-60 lg:inline">
                    0{i + 1}
                  </span>
                </button>
              ))}
            </div>

            {/* CONSOLE CONTENT */}

            <div
              className="min-w-0 p-5 sm:p-8 lg:p-10"
              aria-live="polite"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-[10px] font-bold uppercase tracking-[.18em] text-[#B12025]">
                  Feature{" "}
                  {String(activeFeature + 1).padStart(
                    2,
                    "0"
                  )}{" "}
                  / 08
                </span>

                <span className="rounded-full bg-[#FFF0F0] px-3 py-1.5 text-[10px] font-semibold text-[#B12025]">
                  Illustrative console
                </span>
              </div>

              <h3 className="mt-5 text-[clamp(1.9rem,3.3vw,3.5rem)] font-semibold tracking-[-.06em]">
                {features[activeFeature].title}
              </h3>

              <p className="mt-3 max-w-[650px] text-[13px] leading-[1.8] text-[#17191C]/65">
                {features[activeFeature].text}
              </p>

              <div className="mt-7 min-h-[240px] rounded-[18px] border border-[#E6E7E9] bg-[#FAFAFA] p-4 sm:p-6">
                {/* 1 — HELPDESK */}

                {activeFeature === 0 && (
                  <TicketFeed
                    compact
                    phase={feedPhase}
                  />
                )}

                {/* 2 — REMOTE FIX */}

                {activeFeature === 1 && (
                  <div className="flex h-full flex-col items-center justify-center gap-5 py-5 text-center">
                    <Monitor
                      size={52}
                      strokeWidth={1.4}
                      className="text-[#B12025]"
                    />

                    <h4 className="text-[21px] font-semibold">
                      Remote session
                    </h4>

                    <p className="text-[12px] text-[#17191C]/65">
                      Example: a setting is fixed
                      remotely, with permission.
                    </p>

                    <button
                      type="button"
                      onClick={() => setRemoteStep(1)}
                      className="rounded-full bg-[#B12025] px-5 py-3 text-[12px] font-semibold text-white"
                    >
                      {remoteStep === 0
                        ? "Start remote fix"
                        : remoteStep === 3
                          ? "Run again"
                          : "Working…"}
                    </button>

                    <p className="text-[11px] font-semibold text-[#B12025]">
                      {
                        [
                          "Ready to connect",
                          "Connecting securely",
                          "Correcting setting",
                          "Resolved — nobody needs to visit",
                        ][remoteStep]
                      }
                    </p>
                  </div>
                )}

                {/* 3 — ACCOUNTS */}

                {activeFeature === 2 && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl bg-white p-5">
                      <h4 className="font-semibold">
                        New starter
                      </h4>

                      {[
                        "Email account",
                        "Login details",
                        "Access permissions",
                      ].map((item) => (
                        <p
                          key={item}
                          className="mt-4 flex items-center gap-2 text-[12px]"
                        >
                          <CheckCircle2
                            size={16}
                            className="text-[#B12025]"
                          />
                          {item}
                        </p>
                      ))}
                    </div>

                    <div className="rounded-xl bg-white p-5">
                      <h4 className="font-semibold">
                        Leaving staff
                      </h4>

                      <p className="mt-4 text-[12px] leading-6 text-[#17191C]/65">
                        Access removed on the
                        employee&apos;s last day.
                      </p>

                      <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#FFF1F1] px-3 py-2 text-[11px] font-semibold text-[#B12025]">
                        <LockKeyhole size={15} />
                        Access revoked
                      </p>
                    </div>
                  </div>
                )}

                {/* 4 — OFFICE SOFTWARE */}

                {activeFeature === 3 && (
                  <div>
                    <div className="flex flex-wrap gap-2">
                      {(
                        [
                          "Microsoft 365",
                          "Google Workspace",
                        ] as const
                      ).map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() =>
                            setOffice(item)
                          }
                          className={`rounded-full border px-4 py-2 text-[12px] font-semibold ${
                            office === item
                              ? "border-[#B12025] bg-[#B12025] text-white"
                              : "border-[#B12025]/25 bg-white text-[#B12025]"
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>

                    <div className="mt-5 rounded-xl bg-white p-5">
                      <h4 className="text-[18px] font-semibold">
                        {office}
                      </h4>

                      <div className="mt-5 grid gap-3 sm:grid-cols-3">
                        {[
                          "Email",
                          "Accounts",
                          "File sharing",
                        ].map((item) => (
                          <span
                            key={item}
                            className="flex items-center gap-2 rounded-lg bg-[#FFF5F5] p-3 text-[12px]"
                          >
                            <Check
                              size={16}
                              className="text-[#B12025]"
                            />
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 5 — MONITORING */}

                {activeFeature === 4 && (
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {[
                      "Laptop 01",
                      "Laptop 02",
                      "Server 01",
                      "Laptop 03",
                    ].map((device, i) => (
                      <div
                        key={device}
                        className={`rounded-xl border bg-white p-4 ${
                          i === 2
                            ? "border-[#B12025]"
                            : "border-[#E6E7E9]"
                        }`}
                      >
                        <Laptop
                          size={23}
                          className="text-[#B12025]"
                        />

                        <p className="mt-4 text-[12px] font-semibold">
                          {device}
                        </p>

                        <p className="mt-2 text-[10px] text-[#B12025]">
                          {i === 2
                            ? "Disk space alert"
                            : "Checked"}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* 6 — SECURITY */}

                {activeFeature === 5 && (
                  <div className="grid gap-3 sm:grid-cols-3">
                    {[
                      "Updates",
                      "Antivirus",
                      "Two-factor login",
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded-xl bg-white p-5"
                      >
                        <ShieldCheck
                          size={28}
                          className="text-[#B12025]"
                        />

                        <p className="mt-6 text-[13px] font-semibold">
                          {item}
                        </p>

                        <p className="mt-2 text-[10px] text-[#17191C]/50">
                          Checked on each device
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* 7 — DEVICE SETUP */}

                {activeFeature === 6 && (
                  <div className="flex flex-col items-center py-5">
                    <Laptop
                      size={72}
                      strokeWidth={1.2}
                      className="text-[#B12025]"
                    />

                    <p className="mt-4 text-[20px] font-semibold">
                      Laptop prepared
                    </p>

                    <div className="mt-5 flex flex-wrap justify-center gap-2">
                      {[
                        "Software",
                        "Account",
                        "Security",
                        "Settings",
                      ].map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-[#B12025]/20 bg-white px-3 py-2 text-[11px]"
                        >
                          ✓ {item}
                        </span>
                      ))}
                    </div>

                    <p className="mt-5 text-[11px] font-bold text-[#B12025]">
                      Ready for the first morning
                    </p>
                  </div>
                )}

                {/* 8 — PRIORITIES */}

                {activeFeature === 7 && (
                  <div className="grid gap-3 sm:grid-cols-3">
                    {(
                      [
                        "Urgent",
                        "Normal",
                        "Low",
                      ] as const
                    ).map((lane) => (
                      <div
                        key={lane}
                        className="rounded-xl bg-white p-5"
                      >
                        <p className="text-[11px] font-bold uppercase tracking-[.12em] text-[#B12025]">
                          {lane}
                        </p>

                        <p className="mt-4 text-[12px] text-[#17191C]/60">
                          {lane === "Urgent"
                            ? "Answered first"
                            : lane === "Normal"
                              ? "Standard queue"
                              : "Lower-priority requests"}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <p className="mt-4 flex items-center gap-2 text-[11px] font-semibold text-[#B12025]">
                <Check size={15} />
                {features[activeFeature].note}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          03 — MONITORING DEMO
      ================================================= */}

      <section
        id="it-monitor"
        className="bg-white px-5 py-16 sm:px-8 lg:px-14 lg:py-20"
      >
        <div className="mx-auto grid max-w-[1420px] items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              number="02"
              eyebrow="Monitoring"
              title="Catch the warning before it becomes downtime."
              description="Devices and systems are checked for warning signs. Alerts are checked each working day and logged as tickets."
            />

            <button
              type="button"
              onClick={() =>
                setMonitorDemo((previous) => !previous)
              }
              className="mt-7 inline-flex min-h-[46px] items-center gap-2 rounded-full bg-[#B12025] px-6 text-[12px] font-semibold text-white"
            >
              {monitorDemo
                ? "Reset example"
                : "Run monitoring example"}
              <ArrowRight size={15} />
            </button>

            <p className="mt-3 text-[11px] text-[#17191C]/50">
              Illustrative monitoring. No live devices
              are connected.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-[24px] border border-[#B12025]/20 bg-[#FFF9F9] p-5 sm:p-8">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-bold uppercase tracking-[.15em] text-[#B12025]">
                Device overview
              </p>

              <span className="text-[10px] text-[#17191C]/50">
                Example monitoring
              </span>
            </div>

            <div className="relative mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                "Reception",
                "Finance",
                "Operations",
                "Server",
                "Support",
                "Management",
              ].map((device, i) => (
                <div
                  key={device}
                  className={`rounded-[16px] border bg-white p-5 transition-colors duration-500 ${
                    monitorDemo && i === 3
                      ? "border-[#B12025] shadow-[0_0_0_2px_rgba(177,32,37,.09)]"
                      : "border-[#E6E7E9]"
                  }`}
                >
                  <Monitor
                    size={20}
                    className="text-[#B12025]"
                  />

                  <p className="mt-5 text-[12px] font-semibold">
                    {device}
                  </p>

                  <p className="mt-1 text-[10px] text-[#B12025]">
                    {monitorDemo && i === 3
                      ? "Low disk space"
                      : "Checked"}
                  </p>
                </div>
              ))}

              <span
                aria-hidden="true"
                className={`pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-[#B12025]/50 shadow-[0_0_16px_rgba(177,32,37,.35)] transition-transform duration-[1200ms] ease-linear ${
                  monitorDemo
                    ? "translate-x-[750px]"
                    : "translate-x-0"
                }`}
              />
            </div>

            <div
              aria-live="polite"
              className="mt-5 flex items-center gap-3 rounded-xl border border-[#B12025]/15 bg-white p-4"
            >
              <AlertCircle
                size={18}
                className="shrink-0 text-[#B12025]"
              />

              <p className="flex-1 text-[12px] font-semibold">
                {monitorDemo
                  ? "FN-2044 · Low disk space alert logged as a ticket"
                  : "Monitoring summary · No example alert created yet"}
              </p>

              {monitorDemo && (
                <span className="rounded-full bg-[#FBE9E9] px-3 py-1 text-[10px] font-semibold text-[#B12025]">
                  New ticket
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          04 — NEW STARTER JOURNEY
      ================================================= */}

      <section className="bg-[#FFF4F4] px-5 py-16 sm:px-8 lg:px-14 lg:py-20">
        <div className="mx-auto max-w-[1420px]">
          <SectionHeading
            number="03"
            eyebrow="Onboarding"
            title="Ready for the first morning."
            description="A new starter gets a prepared laptop, login and email access without waiting for separate teams."
          />

          <ol className="mt-9 grid gap-4 md:grid-cols-4">
            {[
              "Offer accepted",
              "Laptop prepared",
              "Accounts created",
              "First morning, ready",
            ].map((item, i) => (
              <li
                data-it-rise
                key={item}
                className="border-t-2 border-[#B12025] pt-5"
              >
                <p className="font-mono text-[11px] text-[#B12025]">
                  0{i + 1}
                </p>

                <p className="mt-4 text-[17px] font-semibold tracking-[-.03em]">
                  {item}
                </p>

                <CheckCircle2
                  className="mt-4 text-[#B12025]"
                  size={21}
                />
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* =================================================
          05 — INTERACTIVE PRIORITY SORTER
      ================================================= */}

      <section
        id="it-priorities"
        className="bg-white px-5 py-16 sm:px-8 lg:px-14 lg:py-20"
      >
        <div className="mx-auto max-w-[1420px]">
          <SectionHeading
            number="04"
            eyebrow="Your priority rules"
            title="You decide what gets answered first."
            description="Move fictional tickets between the lanes by dragging them, or select a ticket and use the priority buttons. No real requests are changed."
          />

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
            <p className="text-[11px] font-semibold uppercase tracking-[.14em] text-[#B12025]">
              Interactive example queue
            </p>

            <button
              type="button"
              onClick={() => {
                setTickets(initialTickets);
                setSelectedTicket("FN-1201");
              }}
              className="text-[12px] font-semibold text-[#B12025] underline underline-offset-4"
            >
              Reset queue
            </button>
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            {(
              [
                "Urgent",
                "Normal",
                "Low",
              ] as const
            ).map((lane) => (
              <div
                key={lane}
                onDragOver={(event) =>
                  event.preventDefault()
                }
                onDrop={(event) => {
                  event.preventDefault();

                  const id =
                    event.dataTransfer.getData(
                      "text/plain"
                    ) || draggedTicket;

                  if (id) changePriority(id, lane);

                  setDraggedTicket(null);
                }}
                className="min-h-[230px] rounded-[20px] border border-[#B12025]/15 bg-[#FAFAFA] p-4 sm:p-5"
              >
                <div className="flex justify-between border-b border-[#B12025]/20 pb-4">
                  <h3 className="text-[18px] font-semibold">
                    {lane}
                  </h3>

                  <span className="rounded-full bg-[#FCE9EA] px-3 py-1 text-[10px] font-bold text-[#B12025]">
                    {
                      tickets.filter(
                        (ticket) =>
                          ticket.lane === lane
                      ).length
                    }{" "}
                    tickets
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  {tickets
                    .filter(
                      (ticket) =>
                        ticket.lane === lane
                    )
                    .map((ticket) => (
                      <button
                        key={ticket.id}
                        type="button"
                        draggable
                        onDragStart={(event) => {
                          setDraggedTicket(ticket.id);

                          event.dataTransfer.setData(
                            "text/plain",
                            ticket.id
                          );
                        }}
                        onDragEnd={() =>
                          setDraggedTicket(null)
                        }
                        onClick={() =>
                          setSelectedTicket(ticket.id)
                        }
                        aria-pressed={
                          selectedTicket === ticket.id
                        }
                        className={`block w-full rounded-xl border bg-white p-4 text-left transition hover:border-[#B12025] ${
                          selectedTicket === ticket.id
                            ? "border-[#B12025] shadow-sm"
                            : "border-[#E6E7E9]"
                        }`}
                      >
                        <p className="font-mono text-[10px] text-[#B12025]">
                          {ticket.id} / {ticket.detail}
                        </p>

                        <p className="mt-2 text-[13px] font-semibold">
                          {ticket.subject}
                        </p>
                      </button>
                    ))}

                  {!tickets.some(
                    (ticket) =>
                      ticket.lane === lane
                  ) && (
                    <p className="py-8 text-center text-[11px] text-[#17191C]/45">
                      Drop a ticket here
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div
            className="mt-5 flex flex-wrap items-center gap-3 rounded-[17px] border border-[#B12025]/20 bg-[#FFF5F5] p-4"
            aria-live="polite"
          >
            <p className="mr-auto text-[12px] font-semibold">
              Selected: {selectedTicket}
            </p>

            {(
              [
                "Urgent",
                "Normal",
                "Low",
              ] as const
            ).map((lane) => (
              <button
                type="button"
                key={lane}
                onClick={() =>
                  changePriority(
                    selectedTicket,
                    lane
                  )
                }
                className="rounded-full border border-[#B12025]/35 bg-white px-4 py-2 text-[11px] font-semibold text-[#B12025] hover:bg-[#B12025] hover:text-white"
              >
                Move to {lane}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================
          06 — REPORTING DASHBOARD
      ================================================= */}

      <section className="bg-[#F7F7F8] px-5 py-16 sm:px-8 lg:px-14 lg:py-20">
        <div className="mx-auto max-w-[1420px]">
          <SectionHeading
            number="05"
            eyebrow="Monthly reporting"
            title="The numbers you will see"
            description="Your monthly report shows how long staff waited for a reply and for a fix. These are reporting fields, not live performance results."
          />

          <div className="mt-8 overflow-hidden rounded-[20px] border border-[#E6E7E9] bg-white">
            <div className="flex flex-wrap justify-between gap-3 bg-[#FFF4F4] px-5 py-4">
              <p className="text-[11px] font-bold uppercase tracking-[.16em] text-[#B12025]">
                IT service desk report
              </p>

              <span className="text-[10px] font-semibold text-[#B12025]">
                Sample report · No client data
              </span>
            </div>

            <dl className="divide-y divide-[#E6E7E9]">
              {metrics.map((item) => (
                <div
                  data-it-rise
                  key={item.title}
                  className="grid gap-2 p-5 sm:grid-cols-[28px_1fr_1.4fr_1.1fr] sm:items-center sm:gap-5"
                >
                  <item.icon
                    size={21}
                    className="text-[#B12025]"
                  />

                  <dt className="text-[14px] font-semibold">
                    {item.title}
                  </dt>

                  <dd className="text-[12px] leading-6 text-[#17191C]/65">
                    {item.text}
                  </dd>

                  <dd className="text-[11px] font-semibold text-[#B12025]">
                    {item.note}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-7 flex flex-wrap gap-x-10 gap-y-5 border-t border-[#B12025]/15 pt-6">
            <p className="text-[12px] text-[#17191C]/60">
              <strong className="mr-2 text-[28px] text-[#B12025]">
                85%
              </strong>
              client retention rate
            </p>

            <p className="text-[12px] text-[#17191C]/60">
              <strong className="mr-2 text-[28px] text-[#B12025]">
                98%
              </strong>
              accuracy across client work
            </p>

            <Link
              href="/how-we-hire"
              className="text-[12px] text-[#17191C]/60"
            >
              <strong className="mr-2 text-[28px] text-[#B12025]">
                15–20%
              </strong>
              of applicants pass hiring checks
              <ArrowUpRight
                size={14}
                className="ml-1 inline text-[#B12025]"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* =================================================
          07 — SCROLLING TESTIMONIAL
      ================================================= */}

      <section
        id="it-quote"
        className="bg-[#B12025] px-5 py-16 text-white sm:px-8 lg:px-14 lg:py-20"
      >
        <div className="mx-auto grid max-w-[1420px] items-center gap-10 lg:grid-cols-[1.25fr_.75fr]">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[.19em] text-white/70">
              Law firm / Client experience
            </p>

            <blockquote className="mt-5 text-[clamp(2rem,3.9vw,4.6rem)] font-semibold leading-[1.17] tracking-[-.06em]">
              {"“New staff now have a laptop, email and system access ready on their first morning. Password resets are done within minutes.”"
                .split(" ")
                .map((word, i) => (
                  <span
                    key={`${word}-${i}`}
                    className="inline-block overflow-hidden align-bottom"
                  >
                    <span
                      data-it-quote-word
                      className="inline-block"
                    >
                      {word}
                    </span>
                    {"\u00a0"}
                  </span>
                ))}
            </blockquote>

            <p className="mt-5 text-[11px] font-bold uppercase tracking-[.19em] text-white/70">
              Law firm
            </p>
          </div>

          <div className="rounded-[24px] border border-white/20 bg-white p-6 text-[#17191C] shadow-[0_30px_65px_rgba(60,7,15,.13)]">
            <p className="font-mono text-[10px] uppercase tracking-[.14em] text-[#B12025]">
              First-morning example
            </p>

            <div className="mt-6 rounded-[18px] border border-[#B12025]/20 bg-[#FFF7F7] p-5 text-center">
              <Laptop
                size={58}
                strokeWidth={1.3}
                className="mx-auto text-[#B12025]"
              />

              <p className="mt-4 text-[20px] font-semibold">
                Welcome to your desk
              </p>

              <p className="mt-2 text-[11px] text-[#17191C]/60">
                Laptop · Email · System access
              </p>

              <div className="mt-5 flex flex-wrap justify-center gap-2">
                {[
                  "Laptop ready",
                  "Account set up",
                  "Access checked",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-white px-3 py-2 text-[10px] text-[#B12025]"
                  >
                    ✓ {item}
                  </span>
                ))}
              </div>
            </div>

            <p className="mt-4 text-[10px] text-[#17191C]/50">
              Illustrative screen · No real employee
              data
            </p>
          </div>
        </div>
      </section>

      {/* =================================================
          08 — PLANS AND SYSTEMS
      ================================================= */}

      <section className="bg-white px-5 py-16 sm:px-8 lg:px-14 lg:py-20">
        <div className="mx-auto grid max-w-[1420px] gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              number="06"
              eyebrow="Coverage"
              title="Built around your team size."
              description="Plans cover from 10 to 500 users. This example shows coverage size only — not a quotation."
            />

            <label
              htmlFor="it-users"
              className="mt-8 block text-[13px] font-semibold"
            >
              People needing support
            </label>

            <div className="mt-2 flex items-end gap-3">
              <span
                className="text-[clamp(3rem,6vw,5rem)] font-semibold tracking-[-.06em] text-[#B12025]"
                aria-live="polite"
              >
                {users}
              </span>

              <span className="pb-3 text-[12px] text-[#17191C]/55">
                users
              </span>
            </div>

            <input
              id="it-users"
              type="range"
              min={10}
              max={500}
              step={10}
              value={users}
              onChange={(event) =>
                setUsers(Number(event.target.value))
              }
              className="mt-4 w-full accent-[#B12025]"
            />

            <div className="mt-1 flex justify-between text-[10px] text-[#17191C]/50">
              <span>10</span>
              <span>500</span>
            </div>

            <div className="mt-6 flex gap-2">
              {(
                [
                  "user",
                  "device",
                ] as const
              ).map((unit) => (
                <button
                  type="button"
                  key={unit}
                  onClick={() =>
                    setBillingUnit(unit)
                  }
                  className={`rounded-full border px-4 py-2 text-[12px] font-semibold ${
                    billingUnit === unit
                      ? "border-[#B12025] bg-[#B12025] text-white"
                      : "border-[#B12025]/20 text-[#B12025]"
                  }`}
                >
                  Per {unit}
                </button>
              ))}
            </div>

            <p className="mt-4 text-[12px] leading-6 text-[#17191C]/65">
              Pricing is agreed per {billingUnit} each
              month. Projects are quoted separately.
              No prices are estimated here.
            </p>
          </div>

          <div className="rounded-[22px] border border-[#B12025]/15 bg-[#FFF6F6] p-6 sm:p-8">
            <p className="text-[11px] font-bold uppercase tracking-[.16em] text-[#B12025]">
              Systems supported
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {[
                "Windows",
                "Mac",
                "Microsoft 365",
                "Google Workspace",
                "Your own software",
              ].map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() =>
                    setSystemTab(item)
                  }
                  className={`rounded-full border px-4 py-2 text-[11px] font-semibold ${
                    systemTab === item
                      ? "border-[#B12025] bg-[#B12025] text-white"
                      : "border-[#B12025]/25 bg-white text-[#B12025]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="mt-6 rounded-xl bg-white p-6">
              <CheckCircle2
                size={24}
                className="text-[#B12025]"
              />

              <h3 className="mt-4 text-[22px] font-semibold">
                {systemTab}
              </h3>

              <p className="mt-2 text-[12px] leading-6 text-[#17191C]/65">
                {systemTab === "Your own software"
                  ? "The team works from guides your business provides."
                  : "Support is included in the scope agreed for your account."}
              </p>
            </div>

            <div className="mt-5 border-t border-[#B12025]/15 pt-5">
              <p className="text-[11px] font-bold text-[#B12025]">
                Remote first, from Colombo
              </p>

              <p className="mt-2 text-[12px] leading-6 text-[#17191C]/65">
                For hands-on device work, a local
                partner can be arranged where available.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          09 — SEARCHABLE FAQ
      ================================================= */}

      <section
        id="it-faq"
        className="bg-[#F7F7F8] px-5 py-16 sm:px-8 lg:px-14 lg:py-20"
      >
        <div className="mx-auto grid max-w-[1420px] gap-9 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-[105px] lg:self-start">
            <SectionHeading
              number="07"
              eyebrow="Common questions"
              title="Questions about IT support."
            />

            <div className="relative mt-7 max-w-[400px]">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B12025]"
              />

              <input
                ref={searchRef}
                type="search"
                value={faqSearch}
                onChange={(event) =>
                  setFaqSearch(event.target.value)
                }
                placeholder="Search questions (press /)"
                aria-label="Search IT support FAQs"
                className="w-full rounded-xl border border-[#B12025]/20 bg-white py-3 pl-11 pr-4 text-[12px] outline-none focus:border-[#B12025]"
              />
            </div>
          </div>

          <div className="space-y-3">
            {visibleFaqs.map((item) => (
              <article
                key={item.q}
                className="overflow-hidden rounded-[16px] border border-[#E6E7E9] bg-white"
              >
                <h3>
                  <button
                    type="button"
                    aria-expanded={
                      openFaq === item.index
                    }
                    aria-controls={`it-faq-answer-${item.index}`}
                    onClick={() =>
                      setOpenFaq(
                        openFaq === item.index
                          ? null
                          : item.index
                      )
                    }
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left focus-visible:outline-2 focus-visible:outline-[#B12025]"
                  >
                    <span>
                      <span className="text-[10px] font-semibold uppercase tracking-[.12em] text-[#B12025]">
                        {item.label}
                      </span>

                      <span className="mt-2 block text-[15px] font-semibold">
                        {item.q}
                      </span>
                    </span>

                    <ChevronDown
                      size={19}
                      className={`shrink-0 text-[#B12025] transition-transform ${
                        openFaq === item.index
                          ? "rotate-180"
                          : ""
                      }`}
                    />
                  </button>
                </h3>

                <div
                  id={`it-faq-answer-${item.index}`}
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ${
                    openFaq === item.index
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="mx-5 mb-5 rounded-[12px] bg-[#FFF5F5] p-4">
                      <p className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase text-[#B12025]">
                        <CheckCheck size={15} />
                        Answered
                      </p>

                      <p className="text-[12px] leading-[1.85] text-[#17191C]/70">
                        {item.a}
                      </p>

                      {item.index === 1 && (
                        <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#B12025]/20 bg-white px-3 py-2 text-[10px] font-semibold text-[#B12025]">
                          <Clock3 size={13} />
                          Urgent pickup: within 30
                          minutes during working hours
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}

            {visibleFaqs.length === 0 && (
              <p className="rounded-xl bg-white p-6 text-[13px] text-[#17191C]/65">
                No matching questions. Try a
                different search.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* =================================================
          10 — OTHER IT SERVICES
      ================================================= */}

      <section className="bg-white px-5 py-14 sm:px-8 lg:px-14">
        <div className="mx-auto max-w-[1420px]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              number="08"
              eyebrow="Keep exploring"
              title="Other IT services"
            />

            <Link
              href="/services#it-services"
              className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#B12025]"
            >
              See all services
              <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="mt-7 grid gap-3 md:grid-cols-3">
            {[
              {
                name: "Web development",
                slug: "web-development",
                desc: "Fast custom websites made for your business.",
              },
              {
                name: "Website maintenance",
                slug: "website-maintenance",
                desc: "Keep a launched website updated and secure.",
              },
              {
                name: "Technical support",
                slug: "technical-support",
                desc: "Practical troubleshooting for your customers.",
              },
            ].map((item) => (
              <Link
                key={item.slug}
                href={`${IT_BASE}/${item.slug}`}
                className="group flex min-h-[125px] flex-col justify-between rounded-[18px] border border-[#E6E7E9] bg-[#FFF9F9] p-5 transition-transform hover:-translate-y-1 hover:border-[#B12025]/40"
              >
                <div className="flex justify-between gap-3 text-[15px] font-semibold">
                  <span>{item.name}</span>

                  <ArrowUpRight
                    size={17}
                    className="text-[#B12025] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </div>

                <p className="mt-4 text-[12px] leading-6 text-[#17191C]/60">
                  {item.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================
          11 — HOW YOUR IT TEAM IS SET UP
      ================================================= */}

      <section
        id="it-team"
        className="bg-[#FFF7F7] px-5 py-16 sm:px-8 lg:px-14 lg:py-20"
      >
        <div className="mx-auto max-w-[1420px]">
          <SectionHeading
            number="09"
            eyebrow="How we work"
            title="How your IT services team is set up"
            description="The biggest risk with outsourced IT services is a team that does not know your systems. These steps are there to stop that."
          />

          <div className="relative mt-9">
            <div className="absolute inset-x-0 top-0 hidden h-[2px] bg-[#B12025]/15 lg:block" />

            <div
              data-it-line
              className="absolute inset-x-0 top-0 hidden h-[2px] origin-left bg-[#B12025] lg:block"
            />

            <ol className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
              {setupSteps.map((step, i) => (
                <li
                  key={step.title}
                  className="border-l border-[#B12025]/30 pl-5 lg:border-l-0 lg:pl-0 lg:pt-6"
                >
                  <p className="flex items-center gap-3 font-mono text-[11px] font-bold text-[#B12025]">
                    <step.icon size={21} />
                    0{i + 1}
                  </p>

                  <h3 className="mt-4 text-[18px] font-semibold tracking-[-.04em]">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-[12px] leading-[1.9] text-[#17191C]/65">
                    {step.text}
                  </p>

                  {i === 1 && (
                    <Link
                      href="/how-we-hire"
                      className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-[#B12025]"
                    >
                      How we hire
                      <ArrowUpRight size={14} />
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* =================================================
          12 — DISCOVERY CALL CTA
      ================================================= */}

      <section className="bg-[#B12025] px-5 py-14 text-white sm:px-8 lg:px-14">
        <div className="mx-auto flex max-w-[1420px] flex-wrap items-center justify-between gap-7">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.18em] text-white/75">
              Free discovery call
            </p>

            <h2 className="mt-3 text-[clamp(2rem,3.6vw,4rem)] font-semibold leading-[1.08] tracking-[-.06em]">
              A better way to support your staff.
            </h2>

            <p className="mt-4 max-w-[580px] text-[13px] leading-7 text-white/80">
              Tell us which systems your team uses
              and what support you need. We&apos;ll
              reply within one working day.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {[
                "New team",
                "Existing helpdesk",
                "Device setup",
                "Monitoring",
              ].map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() =>
                    setSelectedNeed(item)
                  }
                  aria-pressed={
                    selectedNeed === item
                  }
                  className={`rounded-full border px-4 py-2 text-[11px] font-semibold ${
                    selectedNeed === item
                      ? "border-white bg-white text-[#B12025]"
                      : "border-white/55 text-white"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <p className="mt-3 text-[11px] text-white/70">
              Selected: {selectedNeed}. Mention this
              when completing the form below.
            </p>
          </div>

          <a
            href="#contact"
            className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-white px-6 text-[12px] font-bold text-[#B12025]"
          >
            Book a free discovery call
            <ArrowUpRight size={16} />
          </a>
        </div>
      </section>
    </div>
  );
}
