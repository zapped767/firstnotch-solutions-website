
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
  ClipboardList,
  Code2,
  Database,
  FileText,
  Files,
  Headset,
  HeartHandshake,
  Menu,
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

// =====================================================
// FIRSTNOTCH PREMIUM NAVBAR
//
// Reference: Multiplier-style full-width mega menu
//
// COLORS:
// Red:      #B12025
// Charcoal: #17191C
// White:    #FFFFFF
//
// DESKTOP:
// Hover Services -> Open mega menu
// Click Services -> /services
//
// MOBILE:
// Open hamburger -> Expand Services
//
// NO CHEVRON-DOWN BUTTON
// =====================================================

// =====================================================
// 16 SERVICE LINKS
// =====================================================

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
        description:
          'Every call answered with care.',
        href: '/services/customer-support-outsourcing/inbound-call-support',
        icon: PhoneCall,
      },
      {
        label: 'Outbound Call Support',
        description:
          'Proactive calls and follow-ups.',
        href: '/services/customer-support-outsourcing/outbound-call-support',
        icon: PhoneOutgoing,
      },
      {
        label: 'Customer Service',
        description:
          'One experience across every channel.',
        href: '/services/customer-support-outsourcing/customer-service',
        icon: Headset,
      },
      {
        label: 'Customer Retention',
        description:
          'Build lasting customer relationships.',
        href: '/services/customer-support-outsourcing/customer-retention',
        icon: HeartHandshake,
      },
      {
        label: 'Complaint and Query Handling',
        description:
          'Resolve enquiries with clear ownership.',
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
        description:
          'Organised and accurate data handling.',
        href: '/services/bpo-back-office-outsourcing/data-entry-processing',
        icon: Database,
      },
      {
        label: 'Document Processing',
        description:
          'Smarter document workflows.',
        href: '/services/bpo-back-office-outsourcing/document-processing',
        icon: FileText,
      },
      {
        label: 'Data Verification and Validation',
        description:
          'Reliable records and verification.',
        href: '/services/bpo-back-office-outsourcing/data-verification-validation',
        icon: ScanSearch,
      },
      {
        label: 'Compliance, KYC and AML Support',
        description:
          'Compliance-focused process support.',
        href: '/services/bpo-back-office-outsourcing/compliance-kyc-aml-support',
        icon: ShieldCheck,
      },
      {
        label: 'Lead Generation',
        description:
          'Find and engage potential customers.',
        href: '/services/bpo-back-office-outsourcing/lead-generation',
        icon: Target,
      },
      {
        label: 'Back Office Operations',
        description:
          'Efficient day-to-day administration.',
        href: '/services/bpo-back-office-outsourcing/back-office-operations',
        icon: ClipboardList,
      },
      {
        label: 'Virtual Assistant Services',
        description:
          'Dedicated administrative assistance.',
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
        description:
          'Modern websites built for your business.',
        href: '/services/it-services/web-development',
        icon: Code2,
      },
      {
        label: 'Website Maintenance',
        description:
          'Keep your website secure and updated.',
        href: '/services/it-services/website-maintenance',
        icon: Monitor,
      },
      {
        label: 'IT Support',
        description:
          'Reliable assistance for daily IT issues.',
        href: '/services/it-services/it-support',
        icon: Wrench,
      },
      {
        label: 'Technical Support',
        description:
          'Expert support for your technology users.',
        href: '/services/it-services/technical-support',
        icon: Headset,
      },
    ],
  },
];

// =====================================================
// OTHER NAVIGATION LINKS
// =====================================================

const navigationLinks = [
  {
  label: 'How We Hire',
  href: '/how-we-hire',
},
{
  label: 'About',
  href: '/about',
},
{
  label: 'Work With Us',
  href: '/work-with-us',
},
];

// =====================================================
// NAVBAR COMPONENT
// =====================================================

export default function Navbar() {
  const pathname = usePathname();

  const [servicesOpen, setServicesOpen] =
    useState(false);

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [mobileServicesOpen, setMobileServicesOpen] =
    useState(false);

  const [expandedMobileGroup, setExpandedMobileGroup] =
    useState<string | null>(null);

  const headerRef = useRef<HTMLElement>(null);
  const servicesLinkRef =
    useRef<HTMLAnchorElement>(null);

  const menuButtonRef =
    useRef<HTMLButtonElement>(null);

  const isServicesPage =
    pathname === '/services' ||
    pathname.startsWith('/services/');

  // ===================================================
  // CLOSE ALL NAVIGATION MENUS
  // ===================================================

  const closeAllMenus = () => {
    setServicesOpen(false);
    setMobileOpen(false);
    setMobileServicesOpen(false);
    setExpandedMobileGroup(null);
  };

  // ===================================================
  // ESCAPE KEY / OUTSIDE CLICK / RESPONSIVENESS
  // ===================================================

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;

      const wasMobileOpen = mobileOpen;

      setServicesOpen(false);
      setMobileOpen(false);
      setMobileServicesOpen(false);
      setExpandedMobileGroup(null);

      if (wasMobileOpen) {
        menuButtonRef.current?.focus();
      } else {
        servicesLinkRef.current?.focus();
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !headerRef.current?.contains(event.target)
      ) {
        setServicesOpen(false);
        setMobileOpen(false);
        setMobileServicesOpen(false);
      }
    };

    const breakpoint = window.matchMedia(
      '(min-width: 1280px)'
    );

    const onBreakpointChange = () => {
      setServicesOpen(false);
      setMobileOpen(false);
      setMobileServicesOpen(false);
      setExpandedMobileGroup(null);
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener(
      'pointerdown',
      onPointerDown
    );

    breakpoint.addEventListener(
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

      breakpoint.removeEventListener(
        'change',
        onBreakpointChange
      );
    };
  }, [mobileOpen]);

  // ===================================================
  // DESKTOP HOVER MENU
  // ===================================================

  const openServicesMenu = () => {
    setServicesOpen(true);
  };

  const closeServicesMenu = () => {
    setServicesOpen(false);
  };

  // ===================================================
  // RENDER
  // ===================================================

  return (
    <header
      ref={headerRef}
      onMouseLeave={closeServicesMenu}
      onBlur={(event) => {
        if (
          !event.relatedTarget ||
          !event.currentTarget.contains(
            event.relatedTarget as Node
          )
        ) {
          setServicesOpen(false);
        }
      }}
      className="
        fixed
        inset-x-0
        top-0
        z-50
        border-b
        border-[#17191C]/10
        bg-white
        font-normal
        text-[#17191C]
      "
    >

      {/* ==========================================
          EXISTING SCROLL PROGRESS
      ========================================== */}

      <div
        data-fns-progress
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-0
          top-0
          h-[3px]
          w-full
          origin-left
          scale-x-0
          bg-[#B12025]
        "
      />

      {/* ==========================================
          MAIN NAVBAR — HEIGHT 88PX
      ========================================== */}

      <div
        className="
          mx-auto
          flex
          h-[88px]
          max-w-[1536px]
          items-center
          justify-between
          gap-5
          px-5
          sm:px-8
          lg:px-14
        "
      >

        {/* FIRSTNOTCH LOGO */}


{/* FIRSTNOTCH LOGO — ALWAYS GO HOME */}

<Link
  href="/"
  scroll={true}
  onClick={() => {
    closeAllMenus();

    // Scroll immediately, including when already on Home
    const html = document.documentElement;
    const previous = html.style.scrollBehavior;

    html.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);

    requestAnimationFrame(() => {
      html.style.scrollBehavior = previous;
    });
  }}
  aria-label="FirstNotch Solutions home"
  className="
    flex
    w-[130px]
    shrink-0
    items-center
    sm:w-[145px]
    lg:w-[165px]
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


        {/* ======================================
            DESKTOP NAVIGATION
        ====================================== */}

        <nav
          aria-label="Main navigation"
          className="
            hidden
            items-center
            gap-8
            xl:flex
          "
        >

          {/* ====================================
              SERVICES TEXT ONLY

              HOVER = OPEN MEGA MENU
              CLICK = NAVIGATE TO /services

              NO CHEVRON DOWN ICON
          ==================================== */}

          <Link
            ref={servicesLinkRef}
            href="/services"
            onClick={closeAllMenus}
            onMouseEnter={openServicesMenu}
            onFocus={openServicesMenu}
            onKeyDown={(event) => {
              if (event.key === 'ArrowDown') {
                event.preventDefault();
                setServicesOpen(true);

                requestAnimationFrame(() => {
                  document
                    .querySelector<HTMLAnchorElement>(
                      '[data-fns-first-mega-link]'
                    )
                    ?.focus();
                });
              }
            }}
            aria-haspopup="true"
            aria-expanded={servicesOpen}
            aria-controls="fns-premium-mega-menu"
            className={`
              relative
              flex
              h-[88px]
              items-center

              text-[13px]
              font-semibold

              transition-colors
              duration-300

              hover:text-[#B12025]

              ${
                servicesOpen || isServicesPage
                  ? 'text-[#B12025]'
                  : 'text-[#17191C]'
              }
            `}
          >
            Services

            {/* Animated active underline */}
            <span
              className={`
                absolute
                bottom-[23px]
                left-0
                h-[2px]
                bg-[#B12025]

                transition-all
                duration-300

                ${
                  servicesOpen || isServicesPage
                    ? 'w-full'
                    : 'w-0'
                }
              `}
            />
          </Link>

          {/* OTHER NAVBAR ITEMS */}

          {navigationLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={closeAllMenus}
              onMouseEnter={closeServicesMenu}
              onFocus={closeServicesMenu}
              className="
                relative
                py-3
                text-[13px]
                font-semibold

                transition-colors
                duration-300

                hover:text-[#B12025]

                focus-visible:text-[#B12025]
              "
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* ======================================
            FREE DISCOVERY CALL BUTTON
        ====================================== */}

        <Link
          href="/#contact"
          onClick={closeAllMenus}
          onMouseEnter={closeServicesMenu}
          data-fns-magnetic
          className="
            group
            hidden
            shrink-0
            items-center
            gap-4

            rounded-full
            bg-[#B12025]
            px-6
            py-3.5

            text-[12px]
            font-semibold
            text-white

            transition-all
            duration-300

            hover:bg-[#981B20]

            sm:inline-flex
          "
        >
          {COPY.cta}

          <ArrowUpRight
            size={17}
            className="
              transition-transform
              duration-300

              group-hover:-translate-y-0.5
              group-hover:translate-x-0.5
            "
          />
        </Link>

        {/* ======================================
            MOBILE HAMBURGER
        ====================================== */}

        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => {
            setMobileOpen(!mobileOpen);
            setServicesOpen(false);
          }}
          aria-label={
            mobileOpen
              ? 'Close menu'
              : 'Open menu'
          }
          aria-expanded={mobileOpen}
          aria-controls="fns-mobile-navigation"
          className="
            ml-auto
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center

            rounded-full
            border
            border-[#17191C]/15

            transition-colors
            duration-300

            hover:border-[#B12025]
            hover:text-[#B12025]

            xl:hidden
          "
        >
          {mobileOpen ? (
            <X size={21} />
          ) : (
            <Menu size={21} />
          )}
        </button>
      </div>

      {/* ==================================================
          FULL-WIDTH PREMIUM MEGA MENU

          MULTIPLIER-INSPIRED LAYOUT

          - White background
          - Clean columns
          - Small icons
          - Title + short description
          - Red promotional panel
          - Bottom action bar
      ================================================== */}

      <div
        id="fns-premium-mega-menu"
        aria-hidden={!servicesOpen}
        className={`
          absolute
          inset-x-0
          top-full

          hidden
          max-h-[calc(100dvh-88px)]
          overflow-y-auto
          overscroll-contain

          border-t
          border-[#17191C]/[0.06]
          bg-white

          shadow-[0_30px_70px_rgba(23,25,28,0.10)]

          transition-[opacity,transform,visibility]
          duration-[350ms]
          ease-[cubic-bezier(0.22,1,0.36,1)]

          motion-reduce:transition-none

          xl:block

          ${
            servicesOpen
              ? 'visible translate-y-0 opacity-100'
              : 'invisible pointer-events-none -translate-y-3 opacity-0'
          }
        `}
      >

        {/* MEGA MENU CONTENT */}

        <div
          className="
            mx-auto
            max-w-[1400px]
            px-10
            pb-9
            pt-8
          "
        >

          {/* SMALL HEADING */}

          <div className="mb-7">

            <p className="
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.18em]
              text-[#B12025]
            ">
              Explore FirstNotch
            </p>

            <h2 className="
              mt-2
              text-[24px]
              font-semibold
              tracking-[-0.04em]
            ">
              Solutions built around your business.
            </h2>
          </div>

          {/* ========================================
              FOUR-COLUMN DESKTOP LAYOUT

              1 Customer Support
              2 BPO & Back Office
              3 IT Services
              4 RED PROMOTIONAL PANEL

              ADJUST GRID WIDTH HERE
          ======================================== */}

          <div
            className="
              grid
              grid-cols-[1fr_1.12fr_1fr_1.06fr]
              items-start
              gap-x-7
              2xl:gap-x-10
            "
          >

            {/* ====================================
                FIRST THREE SERVICE COLUMNS
            ==================================== */}

            {serviceGroups.map((group, groupIndex) => {
              const GroupIcon = group.icon;

              return (
                <div
                  key={group.id}
                  className="
                    min-w-0
                    animate-none
                  "
                >

                  {/* CATEGORY LABEL */}

                  <div className="mb-6">

                    <span className="
                      text-[10px]
                      font-medium
                      uppercase
                      tracking-[0.16em]
                      text-[#17191C]/35
                    ">
                      {group.eyebrow}
                    </span>
                  </div>

                  {/* CATEGORY LINK */}

                  <Link
                    href={group.href}
                    data-fns-first-mega-link={
                      groupIndex === 0
                        ? true
                        : undefined
                    }
                    onClick={closeAllMenus}
                    className="
                      group/category
                      mb-3
                      flex
                      items-center
                      gap-2.5

                      text-[15px]
                      font-semibold
                      tracking-[-0.02em]

                      transition-colors
                      duration-200

                      hover:text-[#B12025]
                    "
                  >
                    <GroupIcon
                      size={19}
                      strokeWidth={1.7}
                      className="shrink-0 text-[#B12025]"
                    />

                    <span>{group.title}</span>

                    <ArrowUpRight
                      size={14}
                      className="
                        shrink-0
                        text-[#B12025]
                        opacity-0

                        transition-all
                        duration-300

                        group-hover/category:translate-x-1
                        group-hover/category:opacity-100

                        group-focus-visible/category:opacity-100
                      "
                    />
                  </Link>

                  {/* CATEGORY DESCRIPTION */}

                  <p className="
                    mb-5
                    min-h-[50px]
                    max-w-[270px]

                    text-[11px]
                    leading-[1.75]
                    text-[#17191C]/50
                  ">
                    {group.description}
                  </p>

                  {/* ================================
                      INDIVIDUAL SERVICE LINKS
                  ================================ */}

                  <div className="space-y-1">

                    {group.services.map((service) => {
                      const ServiceIcon = service.icon;

                      const active =
                        pathname === service.href;

                      return (
                        <Link
                          key={service.href}
                          href={service.href}
                          onClick={closeAllMenus}
                          className={`
                            group/service
                            flex
                            items-start
                            gap-3

                            rounded-[9px]
                            px-2
                            py-2.5

                            transition-[background-color,transform]
                            duration-300

                            hover:translate-x-1
                            hover:bg-[#B12025]/[0.045]

                            focus-visible:outline
                            focus-visible:outline-2
                            focus-visible:outline-[#B12025]

                            ${
                              active
                                ? 'bg-[#B12025]/[0.06]'
                                : ''
                            }
                          `}
                        >

                          {/* SMALL ICON */}

                          <ServiceIcon
                            size={17}
                            strokeWidth={1.65}
                            aria-hidden="true"
                            className={`
                              mt-0.5
                              shrink-0
                              transition-colors
                              duration-300

                              ${
                                active
                                  ? 'text-[#B12025]'
                                  : 'text-[#17191C]/65 group-hover/service:text-[#B12025]'
                              }
                            `}
                          />

                          {/* NAME + DESCRIPTION */}

                          <span className="min-w-0">

                            <span
                              className={`
                                block
                                text-[12px]
                                font-semibold
                                leading-[1.4]

                                transition-colors
                                duration-200

                                ${
                                  active
                                    ? 'text-[#B12025]'
                                    : 'text-[#17191C] group-hover/service:text-[#B12025]'
                                }
                              `}
                            >
                              {service.label}
                            </span>

                            <span className="
                              mt-1
                              block
                              text-[10px]
                              leading-[1.6]
                              text-[#17191C]/50
                            ">
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
                      group/explore
                      mt-5
                      inline-flex
                      items-center
                      gap-2

                      text-[11px]
                      font-semibold
                      text-[#B12025]
                    "
                  >
                    Explore {group.services.length} services

                    <ArrowRight
                      size={14}
                      className="
                        transition-transform
                        duration-300

                        group-hover/explore:translate-x-1
                      "
                    />
                  </Link>
                </div>
              );
            })}

            {/* ====================================
                RIGHT PROMOTIONAL PANEL

                REFERENCE:
                Multiplier right-side promo tile.

                FIRSTNOTCH RED VERSION.
            ==================================== */}

            <div
              className="
                group/promo
                relative
                isolate
                flex
                min-h-[430px]
                flex-col
                overflow-hidden

                rounded-[27px]
                bg-[#B12025]
                p-7
                text-white

                shadow-[0_20px_45px_rgba(177,32,37,0.12)]
              "
            >

              {/* DECORATIVE CIRCLES */}

              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  -bottom-[110px]
                  -right-[125px]

                  h-[370px]
                  w-[370px]
                  rounded-full
                  border
                  border-white/20

                  transition-transform
                  duration-[900ms]

                  group-hover/promo:scale-110
                "
              />

              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  -bottom-[75px]
                  -right-[80px]

                  h-[280px]
                  w-[280px]
                  rounded-full
                  border
                  border-white/15

                  transition-transform
                  duration-[1100ms]

                  group-hover/promo:scale-110
                "
              />

              {/* PANEL HEADER */}

              <div className="relative z-10 flex items-start justify-between gap-3">

                <span className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-white/75
                ">
                  Work with FirstNotch
                </span>

                <Link
                  href="/#contact"
                  onClick={closeAllMenus}
                  aria-label="Book a discovery call"
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center

                    rounded-full
                    border
                    border-white/30
                    bg-white/10

                    transition-all
                    duration-300

                    hover:bg-white
                    hover:text-[#B12025]
                  "
                >
                  <ArrowUpRight size={19} />
                </Link>
              </div>

              {/* PROMOTIONAL HEADING */}

              <div className="relative z-10 mt-7">

                <h3 className="
                  max-w-[260px]
                  text-[28px]
                  font-semibold
                  leading-[1.2]
                  tracking-[-0.055em]
                ">
                  Your business.
                  <br />
                  Our expertise.
                </h3>

                <p className="
                  mt-4
                  max-w-[260px]
                  text-[12px]
                  leading-[1.9]
                  text-white/80
                ">
                  Customer support, back office and IT services delivered by one dedicated team.
                </p>
              </div>

              {/* DECORATIVE SERVICE VISUAL */}

              <div className="
                relative
                z-10
                mt-auto
                pt-8
              ">

                {/* FLOATING ICON CIRCLES */}

                <div className="
                  relative
                  flex
                  items-center
                  justify-center
                  gap-3

                  pb-7
                ">

                  {[
                    Headset,
                    Files,
                    Code2,
                  ].map((Icon, index) => (
                    <div
                      key={index}
                      className="
                        flex
                        h-[60px]
                        w-[60px]
                        items-center
                        justify-center

                        rounded-full
                        border
                        border-white/25
                        bg-white/10

                        backdrop-blur-sm

                        transition-transform
                        duration-[500ms]

                        group-hover/promo:-translate-y-2
                      "
                      style={{
                        transitionDelay: `${index * 90}ms`,
                      }}
                    >
                      <Icon
                        size={24}
                        strokeWidth={1.5}
                      />
                    </div>
                  ))}
                </div>

                {/* BOTTOM WHITE CTA */}

                <Link
                  href="/#contact"
                  onClick={closeAllMenus}
                  className="
                    group/cta
                    flex
                    items-center
                    justify-between
                    gap-3

                    rounded-full
                    bg-white
                    px-5
                    py-4

                    text-[11px]
                    font-semibold
                    text-[#B12025]

                    transition-all
                    duration-300

                    hover:bg-[#FFF3F3]
                  "
                >
                  Book a free discovery call

                  <ArrowUpRight
                    size={17}
                    className="
                      transition-transform
                      duration-300

                      group-hover/cta:translate-x-1
                      group-hover/cta:-translate-y-1
                    "
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            BOTTOM ACTION BAR

            Like the Multiplier reference.
        ========================================== */}

        <div className="
          border-t
          border-[#17191C]/10
          bg-white
        ">

          <div className="
            mx-auto
            flex
            max-w-[1400px]
            items-center
            justify-between

            px-10
            py-4
          ">

            {/* LEFT ACTION LINKS */}

            <div className="flex items-center gap-9">

              <Link
                href="/services"
                onClick={closeAllMenus}
                className="
                  group
                  flex
                  items-center
                  gap-2

                  text-[12px]
                  font-medium

                  transition-colors
                  hover:text-[#B12025]
                "
              >
                <BriefcaseBusiness
                  size={17}
                  strokeWidth={1.6}
                />

                All services

                <ArrowUpRight
                  size={13}
                  className="
                    opacity-0
                    transition-opacity
                    group-hover:opacity-100
                  "
                />
              </Link>

              <Link
                href="/#contact"
                onClick={closeAllMenus}
                className="
                  flex
                  items-center
                  gap-2

                  text-[12px]
                  font-medium

                  transition-colors
                  hover:text-[#B12025]
                "
              >
                <CheckCircle2
                  size={17}
                  strokeWidth={1.6}
                />

                Talk to our team
              </Link>
            </div>

            {/* CLOSE MEGA MENU */}

            <button
              type="button"
              onClick={closeServicesMenu}
              className="
                flex
                items-center
                gap-2

                text-[12px]
                font-medium
                text-[#17191C]

                transition-colors
                hover:text-[#B12025]
              "
            >
              <X size={16} />

              Close
            </button>
          </div>
        </div>
      </div>

      {/* ==================================================
          MOBILE AND TABLET NAVIGATION

          NO CHEVRON DOWN BUTTON
          USE PLUS / MINUS FOR CATEGORY EXPANSION
      ================================================== */}

      {mobileOpen && (
        <nav
          id="fns-mobile-navigation"
          aria-label="Mobile navigation"
          className="
            max-h-[calc(100dvh-88px)]
            overflow-y-auto
            overscroll-contain

            border-t
            border-[#17191C]/10

            bg-white
            px-5
            pb-8
            pt-3

            shadow-[0_24px_45px_rgba(23,25,28,0.10)]

            sm:px-8
            xl:hidden
          "
        >

          {/* SERVICES HEADING */}

          <div className="
            flex
            items-center
            justify-between
            border-b
            border-[#17191C]/10
          ">

            <Link
              href="/services"
              onClick={closeAllMenus}
              className={`
                flex-1
                py-4
                text-[16px]
                font-semibold

                ${
                  isServicesPage
                    ? 'text-[#B12025]'
                    : 'text-[#17191C]'
                }
              `}
            >
              Services
            </Link>

            <button
              type="button"
              aria-label="Expand services menu"
              aria-expanded={mobileServicesOpen}
              onClick={() =>
                setMobileServicesOpen(
                  !mobileServicesOpen
                )
              }
              className="
                flex
                h-10
                w-10
                items-center
                justify-center

                rounded-full
                bg-[#F7F7F7]
                text-[#B12025]
              "
            >
              {mobileServicesOpen ? (
                <Minus size={19} />
              ) : (
                <Plus size={19} />
              )}
            </button>
          </div>

          {/* MOBILE SERVICES LIST */}

          {mobileServicesOpen && (
            <div className="
              border-b
              border-[#17191C]/10
              bg-[#FAF9F9]
              px-3
              py-4
            ">

              <Link
                href="/services"
                onClick={closeAllMenus}
                className="
                  mb-4
                  inline-flex
                  items-center
                  gap-2

                  text-[12px]
                  font-semibold
                  text-[#B12025]
                "
              >
                Explore all 16 services

                <ArrowUpRight size={15} />
              </Link>

              {serviceGroups.map((group) => {
                const GroupIcon = group.icon;

                const expanded =
                  expandedMobileGroup === group.id;

                return (
                  <div
                    key={group.id}
                    className="
                      border-t
                      border-[#17191C]/10
                      py-2
                    "
                  >

                    {/* MOBILE CATEGORY */}

                    <div className="
                      flex
                      items-center
                      gap-3
                      py-2
                    ">

                      <span className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center

                        rounded-[10px]
                        bg-[#B12025]/10
                        text-[#B12025]
                      ">
                        <GroupIcon size={19} />
                      </span>

                      <Link
                        href={group.href}
                        onClick={closeAllMenus}
                        className="
                          flex-1
                          text-[13px]
                          font-semibold
                        "
                      >
                        {group.title}

                        <span className="
                          ml-2
                          text-[11px]
                          font-normal
                          text-[#17191C]/40
                        ">
                          {group.services.length}
                        </span>
                      </Link>

                      <button
                        type="button"
                        onClick={() =>
                          setExpandedMobileGroup(
                            expanded
                              ? null
                              : group.id
                          )
                        }
                        aria-expanded={expanded}
                        aria-label={`${
                          expanded
                            ? 'Collapse'
                            : 'Expand'
                        } ${group.title}`}
                        className="
                          flex
                          h-9
                          w-9
                          shrink-0
                          items-center
                          justify-center

                          rounded-full
                          text-[#B12025]

                          transition-colors
                          hover:bg-[#B12025]/10
                        "
                      >
                        {expanded ? (
                          <Minus size={17} />
                        ) : (
                          <Plus size={17} />
                        )}
                      </button>
                    </div>

                    {/* EXPANDED SERVICES */}

                    {expanded && (
                      <div className="
                        space-y-1
                        pb-3
                        pl-5
                        sm:pl-12
                      ">

                        {group.services.map((service) => {
                          const ServiceIcon =
                            service.icon;

                          return (
                            <Link
                              key={service.href}
                              href={service.href}
                              onClick={closeAllMenus}
                              className="
                                flex
                                items-start
                                gap-3

                                rounded-lg
                                px-3
                                py-3

                                transition-colors

                                hover:bg-white
                              "
                            >

                              <ServiceIcon
                                size={17}
                                className="
                                  mt-0.5
                                  shrink-0
                                  text-[#B12025]
                                "
                              />

                              <span>
                                <span className="
                                  block
                                  text-[12px]
                                  font-semibold
                                ">
                                  {service.label}
                                </span>

                                <span className="
                                  mt-1
                                  block
                                  text-[11px]
                                  leading-5
                                  text-[#17191C]/50
                                ">
                                  {service.description}
                                </span>
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* OTHER NAV ITEMS */}

          {navigationLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={closeAllMenus}
              className="
                flex
                items-center
                justify-between

                border-b
                border-[#17191C]/10
                py-4

                text-[15px]
                font-semibold

                transition-colors
                hover:text-[#B12025]
              "
            >
              {item.label}

              <ArrowUpRight
                size={16}
                className="text-[#B12025]"
              />
            </Link>
          ))}

          {/* MOBILE CTA */}

          <Link
            href="/#contact"
            onClick={closeAllMenus}
            className="
              mt-6
              flex
              items-center
              justify-between

              rounded-full
              bg-[#B12025]
              px-6
              py-4

              text-[12px]
              font-semibold
              text-white

              sm:hidden
            "
          >
            {COPY.cta}

            <ArrowUpRight size={17} />
          </Link>
        </nav>
      )}
    </header>
  );
}
