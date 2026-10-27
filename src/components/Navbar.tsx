
'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  Code2,
  Database,
  FileText,
  Files,
  Headset,
  HeartHandshake,
  House,
  MessageCircle,
  Minus,
  Monitor,
  PhoneCall,
  PhoneOutgoing,
  Plus,
  ScanSearch,
  ShieldCheck,
  Target,
  Wrench,
  X,
} from 'lucide-react';

import { COPY, LOGOS } from './content';

// ======================================================
// FIRSTNOTCH PREMIUM NAVBAR
//
// Red:      #B12025
// Charcoal: #17191C
// White:    #FFFFFF
//
// Desktop:
// Services text -> /services
// Chevron -> Opens/closes mega menu
//
// Mobile:
// Custom hamburger icon
// Right-side sliding navigation drawer
// Expandable Services categories
// ======================================================

const serviceGroups = [
  {
    id: 'customer',
    title: 'Customer Support',
    eyebrow: 'CUSTOMER EXPERIENCE',
    description:
      'Build stronger customer relationships with trained, multilingual support teams.',
    href: '/services/customer-support-outsourcing',
    icon: Headset,

    services: [
      {
        label: 'Inbound Call Support',
        description: 'Every call answered with care.',
        href: '/services/customer-support-outsourcing/inbound-call-support',
        icon: PhoneCall,
      },
      {
        label: 'Outbound Call Support',
        description: 'Proactive calls and follow-ups.',
        href: '/services/customer-support-outsourcing/outbound-call-support',
        icon: PhoneOutgoing,
      },
      {
        label: 'Customer Service',
        description: 'One experience across every channel.',
        href: '/services/customer-support-outsourcing/customer-service',
        icon: Headset,
      },
      {
        label: 'Customer Retention',
        description: 'Build lasting customer relationships.',
        href: '/services/customer-support-outsourcing/customer-retention',
        icon: HeartHandshake,
      },
      {
        label: 'Complaint and Query Handling',
        description: 'Resolve enquiries with clear ownership.',
        href: '/services/customer-support-outsourcing/complaint-query-handling',
        icon: MessageCircle,
      },
    ],
  },

  {
    id: 'backoffice',
    title: 'BPO & Back Office',
    eyebrow: 'BUSINESS OPERATIONS',
    description:
      'Reliable operational support, accurate data and streamlined business processes.',
    href: '/services/bpo-back-office-outsourcing',
    icon: Files,

    services: [
      {
        label: 'Data Entry and Processing',
        description: 'Organised and accurate data handling.',
        href: '/services/bpo-back-office-outsourcing/data-entry-processing',
        icon: Database,
      },
      {
        label: 'Document Processing',
        description: 'Smarter document workflows.',
        href: '/services/bpo-back-office-outsourcing/document-processing',
        icon: FileText,
      },
      {
        label: 'Data Verification and Validation',
        description: 'Reliable records and verification.',
        href: '/services/bpo-back-office-outsourcing/data-verification-validation',
        icon: ScanSearch,
      },
      {
        label: 'Compliance, KYC and AML Support',
        description: 'Compliance-focused process support.',
        href: '/services/bpo-back-office-outsourcing/compliance-kyc-aml-support',
        icon: ShieldCheck,
      },
      {
        label: 'Lead Generation',
        description: 'Find and engage potential customers.',
        href: '/services/bpo-back-office-outsourcing/lead-generation',
        icon: Target,
      },
      {
        label: 'Back Office Operations',
        description: 'Efficient day-to-day administration.',
        href: '/services/bpo-back-office-outsourcing/back-office-operations',
        icon: ClipboardList,
      },
      {
        label: 'Virtual Assistant Services',
        description: 'Dedicated administrative assistance.',
        href: '/services/bpo-back-office-outsourcing/virtual-assistant-services',
        icon: CalendarDays,
      },
    ],
  },

  {
    id: 'technology',
    title: 'IT Services',
    eyebrow: 'TECHNOLOGY SOLUTIONS',
    description:
      'Modern digital solutions and dependable technical support for growing businesses.',
    href: '/services/it-services',
    icon: Code2,

    services: [
      {
        label: 'Web Development',
        description: 'Modern websites built for your business.',
        href: '/services/it-services/web-development',
        icon: Code2,
      },
      {
        label: 'Website Maintenance',
        description: 'Keep your website secure and updated.',
        href: '/services/it-services/website-maintenance',
        icon: Monitor,
      },
      {
        label: 'IT Support',
        description: 'Reliable assistance for daily IT issues.',
        href: '/services/it-services/it-support',
        icon: Wrench,
      },
      {
        label: 'Technical Support',
        description: 'Expert support for your technology users.',
        href: '/services/it-services/technical-support',
        icon: Headset,
      },
    ],
  },
] as const;

// ======================================================
// MAIN NAVIGATION LINKS
// ======================================================

const navigationLinks = [
  {
    label: 'How We Hire',
    href: '/how-we-hire',
    icon: CheckCircle2,
  },
  {
    label: 'About',
    href: '/about',
    icon: HeartHandshake,
  },
  {
    label: 'Work With Us',
    href: '/work-with-us',
    icon: BriefcaseBusiness,
  },
] as const;

// ======================================================
// NAVBAR COMPONENT
// ======================================================

export default function Navbar() {
  const pathname = usePathname();

  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] =
    useState(false);

  const [expandedMobileGroup, setExpandedMobileGroup] =
    useState<string | null>(null);

  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const servicesToggleRef = useRef<HTMLButtonElement>(null);

  const isServicesPage =
    pathname === '/services' ||
    pathname.startsWith('/services/');

  // ====================================================
  // CLOSE ALL MENUS
  // ====================================================

  const closeAllMenus = () => {
    setServicesOpen(false);
    setMobileOpen(false);
    setMobileServicesOpen(false);
    setExpandedMobileGroup(null);
  };

  // ====================================================
  // DISABLE PAGE SCROLL WHILE DRAWER IS OPEN
  // ====================================================

  useEffect(() => {
    if (!mobileOpen) return;

    const previous = document.body.style.overflow;

    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  // ====================================================
  // CLOSE MENUS ON ROUTE CHANGE
  // ====================================================

  useEffect(() => {
    setServicesOpen(false);
    setMobileOpen(false);
    setMobileServicesOpen(false);
    setExpandedMobileGroup(null);
  }, [pathname]);

  // ====================================================
  // ESCAPE, KEYBOARD FOCUS, OUTSIDE CLICK, RESIZE
  // ====================================================

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (mobileOpen) {
          closeAllMenus();
          menuButtonRef.current?.focus();
        } else if (servicesOpen) {
          setServicesOpen(false);
          servicesToggleRef.current?.focus();
        }
      }

      // Keep keyboard focus in the mobile drawer.
      if (
        event.key === 'Tab' &&
        mobileOpen &&
        drawerRef.current
      ) {
        const controls = Array.from(
          drawerRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        );

        if (!controls.length) return;

        const first = controls[0];
        const last = controls[controls.length - 1];

        if (
          event.shiftKey &&
          document.activeElement === first
        ) {
          event.preventDefault();
          last.focus();
        } else if (
          !event.shiftKey &&
          document.activeElement === last
        ) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      if (
        !mobileOpen &&
        event.target instanceof Node &&
        !headerRef.current?.contains(event.target)
      ) {
        setServicesOpen(false);
      }
    };

    const media = window.matchMedia(
      '(min-width: 1280px)'
    );

    const onBreakpointChange = () => {
      closeAllMenus();
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener(
      'pointerdown',
      onPointerDown
    );

    media.addEventListener(
      'change',
      onBreakpointChange
    );

    return () => {
      document.removeEventListener(
        'keydown',
        onKeyDown
      );
      document.removeEventListener(
        'pointerdown',
        onPointerDown
      );
      media.removeEventListener(
        'change',
        onBreakpointChange
      );
    };
  }, [mobileOpen, servicesOpen]);

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <header
      ref={headerRef}
      onMouseLeave={() => setServicesOpen(false)}
      className="
        fixed inset-x-0 top-0 z-50
        border-b border-[#17191C]/10
        bg-white font-normal text-[#17191C]
      "
    >
      {/* SCROLL PROGRESS — USED BY HOMEMOTION */}

      <div
        data-fns-progress
        aria-hidden="true"
        className="
          pointer-events-none absolute left-0 top-0
          h-[3px] w-full origin-left scale-x-0
          bg-[#B12025]
        "
      />

      {/* =================================================
          MAIN NAVBAR — 88PX
      ================================================= */}

      <div
        className="
          mx-auto flex h-[88px] max-w-[1536px]
          items-center justify-between gap-5
          px-5 sm:px-8 lg:px-14
        "
      >
        {/* FIRSTNOTCH LOGO */}

        <Link
          href="/"
          onClick={closeAllMenus}
          aria-label="FirstNotch Solutions home"
          className="
            flex w-[130px] shrink-0 items-center
            sm:w-[145px] lg:w-[165px]
          "
        >
          <Image
            src={LOGOS.red}
            alt="FirstNotch Solutions"
            width={190}
            height={67}
            priority
            className="h-auto w-full object-contain"
          />
        </Link>

        {/* =============================================
            DESKTOP NAVIGATION
        ============================================= */}

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-7 xl:flex"
        >
          {/* SERVICES TEXT + CHEVRON */}

          <div className="flex h-[88px] items-center gap-0.5">
            <Link
              href="/services"
              onClick={closeAllMenus}
              onKeyDown={(event) => {
                if (event.key === 'ArrowDown') {
                  event.preventDefault();
                  setServicesOpen(true);

                  requestAnimationFrame(() => {
                    document
                      .querySelector<HTMLElement>(
                        '[data-fns-first-mega-link]'
                      )
                      ?.focus();
                  });
                }
              }}
              className={`
                relative flex h-full items-center
                text-[13px] font-semibold
                transition-colors hover:text-[#B12025]
                ${
                  isServicesPage || servicesOpen
                    ? 'text-[#B12025]'
                    : 'text-[#17191C]'
                }
              `}
            >
              Services

              {/* ACTIVE UNDERLINE */}

              <span
                className={`
                  absolute bottom-[23px] left-0 h-[2px]
                  bg-[#B12025] transition-all
                  ${
                    isServicesPage || servicesOpen
                      ? 'w-full'
                      : 'w-0'
                  }
                `}
              />
            </Link>

            {/* CHEVRON OPENS MEGA MENU */}

            <button
              ref={servicesToggleRef}
              type="button"
              aria-label={
                servicesOpen
                  ? 'Close services menu'
                  : 'Expand services menu'
              }
              aria-expanded={servicesOpen}
              aria-controls="fns-premium-mega-menu"
              aria-haspopup="true"
              onClick={() =>
                setServicesOpen((value) => !value)
              }
              className="
                flex h-9 w-9 items-center justify-center
                rounded-full text-[#B12025]
                transition hover:bg-[#B12025]/10
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-[#B12025]
              "
            >
              <ChevronDown
                size={17}
                strokeWidth={2}
                className={`
                  transition-transform duration-300
                  ${servicesOpen ? 'rotate-180' : ''}
                `}
              />
            </button>
          </div>

          {/* OTHER DESKTOP LINKS */}

          {navigationLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeAllMenus}
              onMouseEnter={() =>
                setServicesOpen(false)
              }
              className={`
                text-[13px] font-semibold
                transition-colors hover:text-[#B12025]
                ${
                  pathname === item.href
                    ? 'text-[#B12025]'
                    : 'text-[#17191C]'
                }
              `}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* =============================================
            DESKTOP / TABLET CONTACT BUTTON
        ============================================= */}

        <Link
          href="/#contact"
          onClick={closeAllMenus}
          data-fns-magnetic
          className="
            group hidden shrink-0 items-center gap-4
            rounded-full bg-[#B12025] px-6 py-3.5
            text-[12px] font-semibold text-white
            transition hover:bg-[#981B20]
            sm:inline-flex
          "
        >
          {COPY.cta}

          <ArrowUpRight
            size={17}
            className="
              transition-transform
              group-hover:-translate-y-0.5
              group-hover:translate-x-0.5
            "
          />
        </Link>

        {/* =============================================
            PREMIUM MOBILE HAMBURGER
            THREE ASYMMETRIC LINES
        ============================================= */}

        <button
          ref={menuButtonRef}
          type="button"
          aria-label={
            mobileOpen
              ? 'Close navigation menu'
              : 'Open navigation menu'
          }
          aria-expanded={mobileOpen}
          aria-controls="fns-mobile-navigation"
          onClick={() => {
            setMobileOpen((value) => !value);
            setServicesOpen(false);
          }}
          className="
            ml-auto flex h-[46px] w-[46px]
            shrink-0 items-center justify-center
            rounded-[10px] bg-white text-[#17191C]
            transition
            hover:bg-[#FFF2F2]
            hover:text-[#B12025]
            focus-visible:outline
            focus-visible:outline-2
            focus-visible:outline-[#B12025]
            xl:hidden
          "
        >
          {mobileOpen ? (
            <X
              size={25}
              strokeWidth={2.2}
              aria-hidden="true"
            />
          ) : (
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M5 7.5H23" />
              <path d="M14 14H23" />
              <path d="M5 20.5H23" />
            </svg>
          )}
        </button>
      </div>

      {/* =================================================
          DESKTOP SERVICES MEGA MENU
      ================================================= */}

      {servicesOpen && (
        <div
          id="fns-premium-mega-menu"
          className="
            absolute inset-x-0 top-full
            hidden max-h-[calc(100dvh-88px)]
            overflow-y-auto overscroll-contain
            border-t border-[#17191C]/10
            bg-white
            shadow-[0_30px_70px_rgba(23,25,28,.10)]
            xl:block
          "
        >
          <div
            className="
              mx-auto max-w-[1400px]
              px-10 pb-9 pt-8
            "
          >
            <p
              className="
                text-[10px] font-semibold uppercase
                tracking-[.18em] text-[#B12025]
              "
            >
              EXPLORE FIRSTNOTCH
            </p>

            <h2
              className="
                mt-2 text-[24px] font-semibold
                tracking-[-.04em]
              "
            >
              Solutions built around your business.
            </h2>

            {/* FOUR-COLUMN LAYOUT */}

            <div
              className="
                mt-7 grid
                grid-cols-[1fr_1.12fr_1fr_1.06fr]
                items-start gap-x-7
                2xl:gap-x-10
              "
            >
              {/* FIRST THREE SERVICE COLUMNS */}

              {serviceGroups.map((group, index) => {
                const GroupIcon = group.icon;

                return (
                  <div
                    key={group.id}
                    className="min-w-0"
                  >
                    <p
                      className="
                        mb-6 text-[10px] font-medium
                        uppercase tracking-[.16em]
                        text-[#17191C]/40
                      "
                    >
                      {group.eyebrow}
                    </p>

                    {/* CATEGORY LINK */}

                    <Link
                      href={group.href}
                      onClick={closeAllMenus}
                      data-fns-first-mega-link={
                        index === 0
                          ? 'true'
                          : undefined
                      }
                      className="
                        group mb-3 flex items-center gap-2.5
                        text-[15px] font-semibold
                        tracking-[-.02em]
                        transition hover:text-[#B12025]
                      "
                    >
                      <GroupIcon
                        size={19}
                        strokeWidth={1.7}
                        className="
                          shrink-0 text-[#B12025]
                        "
                      />

                      {group.title}

                      <ArrowUpRight
                        size={14}
                        className="
                          text-[#B12025] opacity-0
                          transition-opacity
                          group-hover:opacity-100
                        "
                      />
                    </Link>

                    <p
                      className="
                        mb-5 min-h-[50px] max-w-[270px]
                        text-[11px] leading-[1.75]
                        text-[#17191C]/55
                      "
                    >
                      {group.description}
                    </p>

                    {/* SERVICES */}

                    <div className="space-y-1">
                      {group.services.map((service) => {
                        const Icon = service.icon;

                        const active =
                          pathname === service.href;

                        return (
                          <Link
                            key={service.href}
                            href={service.href}
                            onClick={closeAllMenus}
                            className={`
                              group flex items-start gap-3
                              rounded-[9px] px-2 py-2.5
                              transition
                              hover:translate-x-1
                              hover:bg-[#B12025]/[.045]
                              focus-visible:outline
                              focus-visible:outline-2
                              focus-visible:outline-[#B12025]
                              ${
                                active
                                  ? 'bg-[#B12025]/[.06]'
                                  : ''
                              }
                            `}
                          >
                            <Icon
                              size={17}
                              strokeWidth={1.65}
                              className={`
                                mt-0.5 shrink-0
                                ${
                                  active
                                    ? 'text-[#B12025]'
                                    : 'text-[#17191C]/65 group-hover:text-[#B12025]'
                                }
                              `}
                            />

                            <span className="min-w-0">
                              <span
                                className={`
                                  block text-[12px]
                                  font-semibold leading-[1.4]
                                  ${
                                    active
                                      ? 'text-[#B12025]'
                                      : 'group-hover:text-[#B12025]'
                                  }
                                `}
                              >
                                {service.label}
                              </span>

                              <span
                                className="
                                  mt-1 block text-[10px]
                                  leading-[1.6]
                                  text-[#17191C]/55
                                "
                              >
                                {service.description}
                              </span>
                            </span>
                          </Link>
                        );
                      })}
                    </div>

                    {/* CATEGORY FOOTER LINK */}

                    <Link
                      href={group.href}
                      onClick={closeAllMenus}
                      className="
                        group mt-5 inline-flex
                        items-center gap-2
                        text-[11px] font-semibold
                        text-[#B12025]
                      "
                    >
                      Explore {group.services.length} services

                      <ArrowRight
                        size={14}
                        className="
                          transition-transform
                          group-hover:translate-x-1
                        "
                      />
                    </Link>
                  </div>
                );
              })}

              {/* =========================================
                  RIGHT RED PROMOTIONAL PANEL
              ========================================= */}

              <aside
                className="
                  relative isolate flex min-h-[430px]
                  flex-col overflow-hidden rounded-[27px]
                  bg-[#B12025] p-7 text-white
                  shadow-[0_20px_45px_rgba(177,32,37,.12)]
                "
              >
                {/* DECORATIVE CURVES */}

                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none absolute
                    -bottom-[110px] -right-[125px]
                    h-[370px] w-[370px]
                    rounded-full border border-white/20
                  "
                />

                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none absolute
                    -bottom-[75px] -right-[80px]
                    h-[280px] w-[280px]
                    rounded-full border border-white/15
                  "
                />

                {/* PANEL HEADER */}

                <div
                  className="
                    relative z-10 flex
                    items-start justify-between gap-3
                  "
                >
                  <span
                    className="
                      text-[10px] font-semibold
                      uppercase tracking-[.18em]
                      text-white/75
                    "
                  >
                    WORK WITH FIRSTNOTCH
                  </span>

                  <Link
                    href="/#contact"
                    onClick={closeAllMenus}
                    aria-label="Book a discovery call"
                    className="
                      flex h-10 w-10 items-center
                      justify-center rounded-full
                      border border-white/30
                      bg-white/10 transition
                      hover:bg-white
                      hover:text-[#B12025]
                    "
                  >
                    <ArrowUpRight size={19} />
                  </Link>
                </div>

                <h3
                  className="
                    relative z-10 mt-7
                    text-[28px] font-semibold
                    leading-[1.2] tracking-[-.055em]
                  "
                >
                  Your business.
                  <br />
                  Our expertise.
                </h3>

                <p
                  className="
                    relative z-10 mt-4
                    max-w-[260px]
                    text-[12px] leading-[1.9]
                    text-white/85
                  "
                >
                  Customer support, back office
                  and IT services delivered by
                  one dedicated team.
                </p>

                <div className="relative z-10 mt-auto pt-8">
                  <div className="flex justify-center gap-3 pb-7">
                    {[Headset, Files, Code2].map(
                      (Icon, index) => (
                        <div
                          key={index}
                          className="
                            flex h-[60px] w-[60px]
                            items-center justify-center
                            rounded-full border
                            border-white/25 bg-white/10
                            backdrop-blur-sm
                          "
                        >
                          <Icon
                            size={24}
                            strokeWidth={1.5}
                          />
                        </div>
                      )
                    )}
                  </div>

                  <Link
                    href="/#contact"
                    onClick={closeAllMenus}
                    className="
                      flex items-center justify-between
                      gap-3 rounded-full bg-white
                      px-5 py-4 text-[11px]
                      font-semibold text-[#B12025]
                      transition hover:bg-[#FFF3F3]
                    "
                  >
                    Book a free discovery call

                    <ArrowUpRight size={17} />
                  </Link>
                </div>
              </aside>
            </div>
          </div>

          {/* =========================================
              MEGA MENU BOTTOM ACTION BAR
          ========================================= */}

          <div
            className="
              border-t border-[#17191C]/10
              bg-white
            "
          >
            <div
              className="
                mx-auto flex max-w-[1400px]
                items-center justify-between
                px-10 py-4
              "
            >
              <div className="flex items-center gap-9">
                <Link
                  href="/services"
                  onClick={closeAllMenus}
                  className="
                    flex items-center gap-2
                    text-[12px] font-medium
                    hover:text-[#B12025]
                  "
                >
                  <BriefcaseBusiness size={17} />
                  All services
                </Link>

                <Link
                  href="/#contact"
                  onClick={closeAllMenus}
                  className="
                    flex items-center gap-2
                    text-[12px] font-medium
                    hover:text-[#B12025]
                  "
                >
                  <CheckCircle2 size={17} />
                  Talk to our team
                </Link>
              </div>

              <button
                type="button"
                onClick={() => {
                  setServicesOpen(false);
                  servicesToggleRef.current?.focus();
                }}
                className="
                  flex items-center gap-2
                  text-[12px] font-medium
                  hover:text-[#B12025]
                "
              >
                <X size={16} />
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =================================================
          MOBILE MENU BACKDROP + SLIDING DRAWER
      ================================================= */}

      <div
        aria-hidden={!mobileOpen}
        inert={!mobileOpen}
        className={`
          fixed inset-0 z-[60]
          transition-[visibility] duration-500
          xl:hidden
          ${
            mobileOpen
              ? 'visible'
              : 'invisible pointer-events-none'
          }
        `}
      >
        {/* DARK TRANSPARENT BACKDROP */}

        <button
          type="button"
          aria-label="Close mobile menu"
          onClick={() => {
            closeAllMenus();
            menuButtonRef.current?.focus();
          }}
          className={`
            absolute inset-0
            bg-[#17191C]/40
            backdrop-blur-[2px]
            transition-opacity duration-500
            ${
              mobileOpen
                ? 'opacity-100'
                : 'opacity-0'
            }
          `}
        />

        {/* ============================================
            RIGHT-SIDE MOBILE DRAWER
        ============================================ */}

        <div
          ref={drawerRef}
          id="fns-mobile-navigation"
          role="dialog"
          aria-modal={mobileOpen}
          aria-label="Mobile navigation"
          className={`
            absolute inset-y-0 right-0
            flex h-[100dvh]
            w-[min(86vw,370px)]
            flex-col overflow-y-auto
            overscroll-contain
            border-l border-[#17191C]/10
            bg-white
            shadow-[-20px_0_60px_rgba(23,25,28,.12)]
            transform-gpu
            transition-transform duration-500
            ease-[cubic-bezier(.22,1,.36,1)]
            motion-reduce:transition-none
            ${
              mobileOpen
                ? 'translate-x-0'
                : 'translate-x-full'
            }
          `}
        >
          {/* DRAWER HEADER */}

          <div
            className="
              sticky top-0 z-10
              flex items-center justify-between
              border-b border-[#17191C]/10
              bg-white px-6 py-6
            "
          >
            <Link
              href="/"
              onClick={closeAllMenus}
              aria-label="FirstNotch home"
            >
              <Image
                src={LOGOS.red}
                alt="FirstNotch Solutions"
                width={155}
                height={55}
                className="
                  h-auto w-[145px] object-contain
                "
              />
            </Link>

            <button
              ref={closeButtonRef}
              type="button"
              aria-label="Close mobile navigation"
              onClick={() => {
                closeAllMenus();
                menuButtonRef.current?.focus();
              }}
              className="
                flex h-10 w-10 items-center
                justify-center rounded-full
                text-[#17191C]
                hover:bg-[#FFF2F2]
                hover:text-[#B12025]
              "
            >
              <X size={24} />
            </button>
          </div>

          {/* ============================================
              MOBILE NAVIGATION CONTENT
          ============================================ */}

          <nav
            aria-label="Mobile menu links"
            className="
              flex flex-1 flex-col
              px-6 pb-7 pt-5
            "
          >
            {/* HOME */}

            <Link
              href="/"
              onClick={closeAllMenus}
              className={`
                flex min-h-[52px]
                items-center gap-4 rounded-[12px]
                px-3 text-[14px] font-semibold
                transition hover:bg-[#FFF8F8]
                ${
                  pathname === '/'
                    ? 'bg-[#FFF2F2] text-[#B12025]'
                    : ''
                }
              `}
            >
              <House
                size={19}
                strokeWidth={1.8}
              />
              Home
            </Link>

            {/* ========================================
                SERVICES + EXPAND CHEVRON
            ======================================== */}

            <div
              className="
                mt-1 flex items-center
                rounded-[12px] hover:bg-[#FFF8F8]
              "
            >
              <Link
                href="/services"
                onClick={closeAllMenus}
                className={`
                  flex min-h-[52px] flex-1
                  items-center gap-4 px-3
                  text-[14px] font-semibold
                  ${
                    isServicesPage
                      ? 'text-[#B12025]'
                      : ''
                  }
                `}
              >
                <Headset
                  size={19}
                  strokeWidth={1.8}
                />
                Services
              </Link>

              <button
                type="button"
                aria-label={
                  mobileServicesOpen
                    ? 'Collapse services'
                    : 'Expand services'
                }
                aria-expanded={mobileServicesOpen}
                aria-controls="fns-mobile-services-list"
                onClick={() =>
                  setMobileServicesOpen(
                    (open) => !open
                  )
                }
                className="
                  flex h-[45px] w-[45px]
                  shrink-0 items-center
                  justify-center rounded-full
                  text-[#B12025]
                  hover:bg-[#B12025]/10
                "
              >
                <ChevronDown
                  size={19}
                  className={`
                    transition-transform duration-300
                    ${
                      mobileServicesOpen
                        ? 'rotate-180'
                        : ''
                    }
                  `}
                />
              </button>
            </div>

            {/* ========================================
                MOBILE SERVICES CATEGORIES
            ======================================== */}

            {mobileServicesOpen && (
              <div
                id="fns-mobile-services-list"
                className="
                  mb-3 mt-2 rounded-[16px]
                  bg-[#FFF7F7] px-3 py-3
                "
              >
                <Link
                  href="/services"
                  onClick={closeAllMenus}
                  className="
                    flex items-center
                    justify-between px-3 py-3
                    text-[12px] font-semibold
                    text-[#B12025]
                  "
                >
                  Explore all 16 services
                  <ArrowUpRight size={16} />
                </Link>

                {serviceGroups.map((group) => {
                  const GroupIcon = group.icon;

                  const expanded =
                    expandedMobileGroup === group.id;

                  return (
                    <div
                      key={group.id}
                      className="
                        border-t border-[#B12025]/10
                        py-2
                      "
                    >
                      <div
                        className="
                          flex items-center gap-2
                        "
                      >
                        <GroupIcon
                          size={17}
                          className="
                            shrink-0 text-[#B12025]
                          "
                        />

                        <Link
                          href={group.href}
                          onClick={closeAllMenus}
                          className="
                            flex-1 py-3 text-[12px]
                            font-semibold text-[#17191C]
                          "
                        >
                          {group.title}

                          <span
                            className="
                              ml-2 text-[#B12025]/60
                            "
                          >
                            {group.services.length}
                          </span>
                        </Link>

                        {/* GROUP EXPAND BUTTON */}

                        <button
                          type="button"
                          aria-label={`${
                            expanded
                              ? 'Collapse'
                              : 'Expand'
                          } ${group.title}`}
                          aria-expanded={expanded}
                          onClick={() =>
                            setExpandedMobileGroup(
                              expanded
                                ? null
                                : group.id
                            )
                          }
                          className="
                            flex h-9 w-9 items-center
                            justify-center
                            text-[#B12025]
                          "
                        >
                          {expanded ? (
                            <Minus size={16} />
                          ) : (
                            <Plus size={16} />
                          )}
                        </button>
                      </div>

                      {/* INDIVIDUAL SERVICE LINKS */}

                      {expanded && (
                        <div
                          className="
                            space-y-1 pb-2 pl-5
                          "
                        >
                          {group.services.map(
                            (service) => (
                              <Link
                                key={service.href}
                                href={service.href}
                                onClick={closeAllMenus}
                                className="
                                  block rounded-[9px]
                                  px-3 py-2.5
                                  text-[12px] leading-5
                                  text-[#17191C]/75
                                  hover:bg-white
                                  hover:text-[#B12025]
                                "
                              >
                                {service.label}
                              </Link>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* ========================================
                OTHER MOBILE NAVIGATION ITEMS
            ======================================== */}

            {navigationLinks.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeAllMenus}
                  className={`
                    mt-1 flex min-h-[52px]
                    items-center gap-4
                    rounded-[12px] px-3
                    text-[14px] font-semibold
                    transition hover:bg-[#FFF8F8]
                    ${
                      pathname === item.href
                        ? 'bg-[#FFF2F2] text-[#B12025]'
                        : ''
                    }
                  `}
                >
                  <Icon
                    size={19}
                    strokeWidth={1.8}
                  />

                  {item.label}
                </Link>
              );
            })}

            {/* ========================================
                MOBILE CONTACT CTA CARD
            ======================================== */}

            <div className="mt-auto pt-14">
              <div
                className="
                  rounded-[20px] bg-[#FFF0F0]
                  px-5 py-6 text-center
                "
              >
                <p
                  className="
                    text-[10px] font-semibold
                    uppercase tracking-[.16em]
                    text-[#B12025]
                  "
                >
                  FIRSTNOTCH SOLUTIONS
                </p>

                <h3
                  className="
                    mt-3 text-[19px]
                    font-semibold leading-[1.3]
                    tracking-[-.04em]
                    text-[#17191C]
                  "
                >
                  Let&apos;s work together.
                </h3>

                <p
                  className="
                    mt-3 text-[12px] leading-6
                    text-[#17191C]/65
                  "
                >
                  Customer support, back office
                  and IT services delivered by
                  a team in Colombo.
                </p>

                <Link
                  href="/#contact"
                  onClick={closeAllMenus}
                  className="
                    mt-6 inline-flex min-h-[44px]
                    items-center justify-center
                    gap-2 rounded-full
                    bg-[#B12025] px-5
                    text-[11px] font-semibold
                    text-white transition
                    hover:bg-[#981B20]
                  "
                >
                  Book a free discovery call
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
