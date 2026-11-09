'use client';

import React, {
  useEffect,
  useRef,
} from 'react';

import Link from 'next/link';

import {
  ArrowDown,
  ArrowUpRight,
  ArrowRight,
  CheckCheck,
  Headphones,
  PhoneIncoming,
  PhoneOutgoing,
  MessageCircle,
  HeartHandshake,
  ShieldCheck,
  CheckCircle2,
  Users,
  Clock3,
} from 'lucide-react';

// ======================================================
// FIRSTNOTCH
// CUSTOMER SUPPORT STICKY HERO
// ======================================================

// ======================================================
// SERVICES
// ======================================================

const services = [
  {
    number: '01',
    title: 'Inbound Call Support',
    description:
      'Calls answered in your company name by a trained support team.',
    icon: PhoneIncoming,
    href: '/services/customer-support-outsourcing/inbound-call-support',
  },
  {
    number: '02',
    title: 'Outbound Call Support',
    description:
      'Customer follow-ups and approved outbound campaigns.',
    icon: PhoneOutgoing,
    href: '/services/customer-support-outsourcing/outbound-call-support',
  },
  {
    number: '03',
    title: 'Customer Service',
    description:
      'Consistent assistance across calls, emails and chats.',
    icon: Headphones,
    href: '/services/customer-support-outsourcing/customer-service',
  },
  {
    number: '04',
    title: 'Customer Retention',
    description:
      'Customer check-ins, win-back calls and cancellation support.',
    icon: HeartHandshake,
    href: '/services/customer-support-outsourcing/customer-retention',
  },
  {
    number: '05',
    title: 'Complaint & Query Handling',
    description:
      'Customer enquiries and complaints tracked through resolution.',
    icon: MessageCircle,
    href: '/services/customer-support-outsourcing/complaint-query-handling',
  },
];

// ======================================================
// MAIN COMPONENT
// ======================================================

export default function CustomerSupportStickyHero() {
  const mobileServicesRef =
    useRef<HTMLDivElement | null>(null);

  // ====================================================
  // MOBILE SERVICE CARD AUTO SCROLL
  // ====================================================

  useEffect(() => {
    const container =
      mobileServicesRef.current;

    if (!container) return;

    const media = window.matchMedia(
      '(max-width: 639px)'
    );

    if (!media.matches) return;

    let currentIndex = 0;

    let interval:
      | ReturnType<typeof setInterval>
      | null = null;

    let restartTimer:
      | ReturnType<typeof setTimeout>
      | null = null;

    const getCards = () =>
      Array.from(
        container.querySelectorAll<HTMLElement>(
          '[data-cs-mobile-service-card]'
        )
      );

    const scrollToCard = (
      index: number
    ) => {
      const cards = getCards();

      const card = cards[index];

      if (!card) return;

      container.scrollTo({
        left:
          card.offsetLeft -
          container.offsetLeft,
        behavior: 'smooth',
      });
    };

    const startAutoScroll = () => {
      if (interval) {
        clearInterval(interval);
      }

      interval = setInterval(() => {
        const cards = getCards();

        if (!cards.length) return;

        currentIndex =
          (currentIndex + 1) %
          cards.length;

        scrollToCard(currentIndex);
      }, 3500);
    };

    const stopAutoScroll = () => {
      if (interval) {
        clearInterval(interval);

        interval = null;
      }
    };

    const restartAutoScroll = () => {
      stopAutoScroll();

      if (restartTimer) {
        clearTimeout(restartTimer);
      }

      restartTimer = setTimeout(() => {
        startAutoScroll();
      }, 5000);
    };

    const syncIndex = () => {
      const cards = getCards();

      if (!cards.length) return;

      const containerCenter =
        container.scrollLeft +
        container.clientWidth / 2;

      let closestIndex = 0;

      let closestDistance =
        Number.POSITIVE_INFINITY;

      cards.forEach(
        (card, index) => {
          const cardCenter =
            card.offsetLeft +
            card.offsetWidth / 2;

          const distance = Math.abs(
            cardCenter -
              containerCenter
          );

          if (
            distance <
            closestDistance
          ) {
            closestDistance =
              distance;

            closestIndex = index;
          }
        }
      );

      currentIndex =
        closestIndex;
    };

    startAutoScroll();

    container.addEventListener(
      'scroll',
      syncIndex,
      {
        passive: true,
      }
    );

    container.addEventListener(
      'touchstart',
      stopAutoScroll,
      {
        passive: true,
      }
    );

    container.addEventListener(
      'touchend',
      restartAutoScroll,
      {
        passive: true,
      }
    );

    container.addEventListener(
      'pointerdown',
      stopAutoScroll
    );

    container.addEventListener(
      'pointerup',
      restartAutoScroll
    );

    return () => {
      stopAutoScroll();

      if (restartTimer) {
        clearTimeout(
          restartTimer
        );
      }

      container.removeEventListener(
        'scroll',
        syncIndex
      );

      container.removeEventListener(
        'touchstart',
        stopAutoScroll
      );

      container.removeEventListener(
        'touchend',
        restartAutoScroll
      );

      container.removeEventListener(
        'pointerdown',
        stopAutoScroll
      );

      container.removeEventListener(
        'pointerup',
        restartAutoScroll
      );
    };
  }, []);

  return (
    <div
      id="customer-support-hero"
      className="
        relative
        isolate
        w-full
      "
    >
      {/* ==================================================
          PANEL 01
          CLEAN CENTERED HERO
      ================================================== */}

      <section
        className="
          sticky
          top-0
          z-10
          flex
          h-[100svh]
          min-h-[660px]
          w-full
          items-center
          justify-center
          overflow-hidden
          bg-white
          text-[#17191C]

          max-lg:h-auto
          max-lg:min-h-[720px]

          max-sm:relative
max-sm:min-h-[520px]
max-sm:items-start
max-sm:pt-[105px]
max-sm:pb-[24px]
        "
      >
        {/* BACKGROUND GLOW */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            h-[720px]
            w-[720px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[#B12025]/[0.025]
            blur-[110px]

            max-sm:h-[380px]
            max-sm:w-[380px]
          "
        />

        {/* INNER CIRCLE */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            h-[500px]
            w-[500px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            border
            border-[#B12025]/[0.035]

            max-sm:h-[300px]
            max-sm:w-[300px]
          "
        />

        {/* OUTER CIRCLE */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            h-[720px]
            w-[720px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            border
            border-[#B12025]/[0.025]

            max-sm:hidden
          "
        />

        {/* =================================================
            HERO CONTENT
        ================================================= */}

        <div
          className="
            relative
            z-10
            mx-auto
            flex
            w-full
            max-w-[1250px]
            flex-col
            items-center
            px-[48px]
            py-[100px]
            text-center

            lg:px-[65px]

            xl:px-[90px]

            max-sm:px-[18px]
max-sm:py-0
          "
        >
          {/* EYEBROW */}

          <p
            className="
              text-[9px]
              font-bold
              uppercase
              tracking-[0.18em]
              text-[#B12025]

              sm:text-[10px]
              sm:tracking-[0.23em]

              max-sm:whitespace-nowrap
              max-sm:text-[7px]
              max-sm:tracking-[0.08em]
            "
          >
            Customer Support
            Outsourcing in Sri Lanka
          </p>

          {/* MAIN HEADING */}

          <h1
            className="
              mx-auto
              max-w-[1120px]
              text-center
              text-[clamp(42px,6vw,90px)]
              font-semibold
              leading-[1.02]
              tracking-[-0.07em]
              text-[#17191C]

              max-sm:mt-[6px]
max-sm:max-w-[300px]
max-sm:text-[28px]
max-sm:leading-[1.03]
max-sm:tracking-[-0.045em]
            "
          >
            Customer support{' '}

            <span
              className="
                text-[#B12025]
              "
            >
              Handled for you,
            </span>

            <br
              className="
                hidden
                sm:block
              "
            />

            <span>
              {' '}
              from the first call to
              the follow-up.
            </span>
          </h1>

          {/* DESCRIPTION */}

          <div
            className="
              mx-auto
              mt-[32px]
              max-w-[720px]
              space-y-[13px]
              text-center
              text-[13px]
              leading-[1.8]
              text-[#777777]

              sm:mt-[38px]
              sm:text-[15px]
              sm:leading-[1.85]

              max-sm:mt-[14px]
max-sm:max-w-[295px]
max-sm:space-y-[6px]
max-sm:text-[9px]
max-sm:leading-[1.5]
            "
          >
            <p>
              Support problems are
              easy to miss. A call or
              email goes unanswered
              for hours. A complaint
              passes from person to
              person. Follow-up calls
              never get made, and
              customers who stopped
              buying hear nothing
              from you.
            </p>

            <p>
              FirstNotch&apos;s
              trained team in Colombo
              can handle customer
              conversations in your
              company&apos;s name,
              from answering
              enquiries to reaching
              out to customers.
            </p>
          </div>

          {/* =================================================
              HERO BUTTONS
              MOBILE = ONE ROW
          ================================================= */}

          <div
            className="
              mt-[34px]
              flex
              flex-wrap
              items-center
              justify-center
              gap-[12px]

              sm:mt-[40px]

              max-sm:mt-[16px]
max-sm:w-full
max-sm:flex-nowrap
max-sm:gap-[6px]
            "
          >
            <a
              href="#customer-support-services"
              className="
                inline-flex
                min-h-[48px]
                items-center
                justify-center
                gap-[12px]
                rounded-full
                bg-[#B12025]
                px-[24px]
                text-[12px]
                font-semibold
                text-white
                transition-all
                duration-300

                hover:-translate-y-[2px]
                hover:bg-[#8F171C]
                hover:shadow-[0_14px_35px_rgba(177,32,37,0.20)]

                max-sm:min-h-[34px]
                max-sm:flex-1
                max-sm:gap-[6px]
                max-sm:px-[7px]
                max-sm:text-[8px]
                max-sm:whitespace-nowrap
              "
            >
              See the five services

              <ArrowDown
                className="
                  h-[16px]
                  w-[16px]

                  max-sm:h-[11px]
                  max-sm:w-[11px]
                "
              />
            </a>

            <Link
              href="/book-a-free-call"
              className="
                inline-flex
                min-h-[48px]
                items-center
                justify-center
                gap-[12px]
                rounded-full
                border
                border-[#B12025]/20
                bg-white
                px-[24px]
                text-[12px]
                font-semibold
                text-[#B12025]
                transition-all
                duration-300

                hover:-translate-y-[2px]
                hover:border-[#B12025]
                hover:bg-[#FFF8F8]
                hover:shadow-[0_12px_30px_rgba(177,32,37,0.08)]

                max-sm:min-h-[38px]
                max-sm:flex-1
                max-sm:gap-[6px]
                max-sm:px-[7px]
                max-sm:text-[7px]
                max-sm:whitespace-nowrap
              "
            >
              Book a free discovery
              call

              <ArrowUpRight
                className="
                  h-[15px]
                  w-[15px]

                  max-sm:h-[11px]
                  max-sm:w-[11px]
                "
              />
            </Link>
          </div>

          {/* =================================================
              TRUST POINTS
              MOBILE = ONE ROW
          ================================================= */}

          <div
            className="
              mt-[45px]
              flex
              flex-wrap
              items-center
              justify-center
              gap-x-[28px]
              gap-y-[12px]
              text-[10px]
              font-medium
              text-[#8A8A8A]

              sm:text-[11px]

              max-sm:mt-[16px]
max-sm:flex-nowrap
max-sm:gap-x-[6px]
max-sm:text-[6px]
max-sm:whitespace-nowrap
            "
          >
            <span
              className="
                flex
                items-center
                gap-[7px]

                max-sm:gap-[3px]
              "
            >
              <CheckCircle2
                className="
                  h-[14px]
                  w-[14px]
                  text-[#B12025]

                  max-sm:h-[10px]
                  max-sm:w-[10px]
                "
              />

              Trained support team
            </span>

            <span
              className="
                flex
                items-center
                gap-[7px]

                max-sm:gap-[3px]
              "
            >
              <CheckCircle2
                className="
                  h-[14px]
                  w-[14px]
                  text-[#B12025]

                  max-sm:h-[10px]
                  max-sm:w-[10px]
                "
              />

              Colombo based
            </span>

            <span
              className="
                flex
                items-center
                gap-[7px]

                max-sm:gap-[3px]
              "
            >
              <CheckCircle2
                className="
                  h-[14px]
                  w-[14px]
                  text-[#B12025]

                  max-sm:h-[10px]
                  max-sm:w-[10px]
                "
              />

              Built around your
              workflow
            </span>
          </div>
        </div>

        {/* SCROLL INDICATOR */}

        <div
          className="
            pointer-events-none
            absolute
            bottom-[22px]
            left-1/2
            z-10
            hidden
            -translate-x-1/2
            items-center
            gap-[8px]
            text-[10px]
            font-medium
            uppercase
            tracking-[0.18em]
            text-[#B12025]

            lg:flex
          "
        >
          Scroll to explore

          <ArrowDown size={14} />
        </div>
      </section>

      {/* ==================================================
          PANEL 02
          FIVE CUSTOMER SUPPORT SERVICES
      ================================================== */}

      <section
        id="customer-support-services"
        className="
          sticky
          top-0
          z-20
          flex
          h-[100svh]
          min-h-[760px]
          w-full
          items-center
          overflow-hidden
          rounded-t-[30px]
          bg-[#F3F3F3]
          text-[#17191C]

          max-lg:h-auto
          max-lg:min-h-[900px]
          max-lg:py-[100px]

         max-sm:min-h-0
max-sm:rounded-t-[20px]
max-sm:py-[18px]
        "
      >
        {/* GRID BACKGROUND */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-[linear-gradient(to_right,rgba(177,32,37,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(177,32,37,0.035)_1px,transparent_1px)]
            bg-[size:55px_55px]
          "
        />

        <div
          className="
            relative
            z-10
            mx-auto
            w-full
            max-w-[1380px]
            px-[48px]

            lg:px-[65px]

            xl:px-[90px]

            max-sm:px-[18px]
          "
        >
          {/* =================================================
              SECTION HEADING
          ================================================= */}

          <div
            className="
              mb-[35px]
              flex
              flex-col
              items-center
              justify-center
              gap-[20px]
              text-center

            max-sm:mb-[10px]
max-sm:gap-[5px]
            "
          >
            <div
              className="
                flex
                flex-col
                items-center
              "
            >
              <p
                className="
                  mb-[16px]
                  text-[11px]
                  font-bold
                  uppercase
                  tracking-[0.22em]
                  text-[#B12025]

                 max-sm:mb-[5px]
max-sm:text-[7px]
max-sm:tracking-[0.15em]
                "
              >
                What we do
              </p>

              <h2
                className="
                  mx-auto
                  max-w-[800px]
                  text-center
                  text-[clamp(38px,4.5vw,68px)]
                  font-semibold
                  leading-[1.08]
                  tracking-[-0.06em]

                 max-sm:max-w-[270px]
max-sm:text-[22px]
max-sm:leading-[1.02]
max-sm:tracking-[-0.04em]
                "
              >
                Five services.{' '}

                <span
                  className="
                    text-[#B12025]
                  "
                >
                  One support team.
                </span>
              </h2>
            </div>

            <p
              className="
                mx-auto
                max-w-[520px]
                text-center
                text-[14px]
                leading-[1.8]
                text-[#777777]

              max-sm:max-w-[265px]
max-sm:text-[8px]
max-sm:leading-[1.4]
              "
            >
              From the first
              conversation to the
              final follow-up, we
              help you keep every
              customer interaction
              organised.
            </p>
          </div>

          {/* =================================================
              SERVICES

              MOBILE:
              - ONE ROW
              - HORIZONTAL
              - AUTO SCROLL
              - SMALLER CARDS

              TABLET/DESKTOP:
              - ORIGINAL GRID
          ================================================= */}

          <div
            ref={mobileServicesRef}
            className="
              flex
              gap-[12px]
              overflow-x-auto
              scroll-smooth
              snap-x
              snap-mandatory
              pb-[4px]

              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden

              sm:grid
              sm:grid-cols-2
              sm:overflow-visible
              sm:pb-0

              xl:grid-cols-3
            "
          >
            {services.map(
              (service) => {
                const Icon =
                  service.icon;

                return (
                  <Link
                    key={
                      service.number
                    }
                    href={
                      service.href
                    }
                    data-cs-mobile-service-card
                    className="
                      group
                      relative
                      flex
                      min-h-[180px]
                      flex-col
                      justify-between
                      overflow-hidden
                      rounded-[22px]
                      border
                      border-[#E9E1E1]
                      bg-white
                      p-[24px]
                      transition-all
                      duration-300

                      hover:-translate-y-[4px]
                      hover:border-[#B12025]/30
                      hover:shadow-[0_18px_50px_rgba(177,32,37,0.10)]

                     max-sm:min-h-[125px]
max-sm:w-[64vw]
max-sm:max-w-[205px]
max-sm:shrink-0
max-sm:snap-center
max-sm:rounded-[14px]
max-sm:p-[11px]

                      sm:w-auto
                      sm:max-w-none
                    "
                  >
                    {/* TOP */}

                    <div
                      className="
                        flex
                        items-start
                        justify-between
                      "
                    >
                      <div
                        className="
                          grid
                          h-[42px]
                          w-[42px]
                          place-items-center
                          rounded-[13px]
                          bg-[#F8E9EA]
                          text-[#B12025]
                          transition-colors
                          duration-300

                          group-hover:bg-[#B12025]
                          group-hover:text-white

                        max-sm:h-[28px]
max-sm:w-[28px]
max-sm:rounded-[8px]
                        "
                      >
                        <Icon
                          className="
                            h-[20px]
                            w-[20px]
max-sm:h-[12px]
max-sm:w-[12px]
                          "
                        />
                      </div>

                      <span
                        className="
                          text-[11px]
                          font-semibold
                          tracking-[0.15em]
                          text-[#AAAAAA]

                          max-sm:text-[9px]
                        "
                      >
                        {
                          service.number
                        }
                      </span>
                    </div>

                    {/* CONTENT */}

                    <div
                      className="
                        mt-[22px]

                       max-sm:mt-[6px]
                      "
                    >
                      <h3
                        className="
                          flex
                          items-center
                          justify-between
                          gap-[10px]
                          text-[17px]
                          font-semibold
                          tracking-[-0.03em]

                        max-sm:text-[11px]
max-sm:leading-[1.12]
                        "
                      >
                        {
                          service.title
                        }

                        <ArrowUpRight
                          className="
                            h-[18px]
                            w-[18px]
                            flex-none
                            text-[#B12025]
                            transition-transform
                            duration-300

                            group-hover:-translate-y-[3px]
                            group-hover:translate-x-[3px]

                            max-sm:h-[15px]
                            max-sm:w-[15px]
                          "
                        />
                      </h3>

                      <p
                        className="
                          mt-[8px]
                          text-[12px]
                          leading-[1.7]
                          text-[#888888]

                          max-sm:mt-[4px]
max-sm:text-[7.5px]
max-sm:leading-[1.35]
                          max-sm:leading-[1.55]
                        "
                      >
                        {
                          service.description
                        }
                      </p>
                    </div>
                  </Link>
                );
              }
            )}

            {/* =================================================
                FINAL RED CARD

                MOBILE:
                HIDDEN

                TABLET/DESKTOP:
                ORIGINAL
            ================================================= */}

            <div
              className="
                flex
                min-h-[180px]
                flex-col
                justify-between
                rounded-[22px]
                bg-[#B12025]
                p-[24px]
                text-white

                max-sm:hidden
              "
            >
              <Users size={24} />

              <div>
                <h3
                  className="
                    text-[22px]
                    font-semibold
                    tracking-[-0.04em]
                  "
                >
                  Built around your
                  business.
                </h3>

                <p
                  className="
                    mt-[8px]
                    text-[12px]
                    leading-[1.7]
                    text-white/75
                  "
                >
                  Choose the support
                  services that fit
                  your customers and
                  your workflow.
                </p>
              </div>
            </div>
          </div>

          {/* =================================================
              BOTTOM NOTE
              HIDDEN MOBILE
          ================================================= */}

          <div
            className="
              mt-[22px]
              flex
              items-center
              justify-center
              gap-[8px]
              text-center
              text-[11px]
              text-[#777777]

              max-sm:hidden
            "
          >
            <CheckCircle2
              size={15}
              className="
                text-[#B12025]
              "
            />

            Explore each service to
            see how it works.
          </div>
        </div>
      </section>

      {/* ==================================================
          PANEL 03
          PREMIUM FIRSTNOTCH CTA
      ================================================== */}

      <section
  className="
    sticky
    top-0
    z-30
    flex
    h-[100svh]
    min-h-[700px]
    w-full
    items-center
    justify-center
    overflow-hidden
    rounded-t-[30px]
    bg-[#B12025]
    px-[24px]
    py-[100px]
    text-white

    max-sm:relative
    max-sm:!h-auto
    max-sm:!min-h-0
    max-sm:rounded-t-[22px]
    max-sm:px-[18px]
    max-sm:!py-[36px]
  "
>
        {/* GRID BACKGROUND */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)]
            bg-[size:54px_54px]
            [mask-image:radial-gradient(ellipse_75%_70%_at_50%_50%,#000_30%,transparent_100%)]
          "
        />

        {/* DECORATIVE CIRCLE */}

        <div
          className="
            pointer-events-none
            absolute
            -right-[130px]
            -top-[130px]
            h-[500px]
            w-[500px]
            rounded-full
            border
            border-white/10
          "
        />

        {/* DECORATIVE CIRCLE */}

        <div
          className="
            pointer-events-none
            absolute
            -bottom-[230px]
            -left-[130px]
            h-[600px]
            w-[600px]
            rounded-full
            border
            border-white/10
          "
        />

        {/* =================================================
            CONTENT
        ================================================= */}

        <div
          className="
            relative
            z-10
            mx-auto
            max-w-[1050px]
            text-center
          "
        >
          {/* =================================================
              FIRSTNOTCH BADGE

              MOBILE:
              REMOVED

              TABLET/DESKTOP:
              VISIBLE
          ================================================= */}

          <div
            className="
              mb-[28px]
              flex
              justify-center

              max-sm:hidden
            "
          >
            <div
              className="
                flex
                items-center
                gap-[9px]
                rounded-full
                border
                border-white/25
                px-[17px]
                py-[10px]
              "
            >
              <ShieldCheck
                size={16}
              />

              <span
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                "
              >
                FirstNotch
                Solutions
              </span>
            </div>
          </div>

          {/* SMALL HEADING */}

          <p
            className="
              mb-[22px]
              text-[12px]
              font-semibold
              uppercase
              tracking-[0.23em]
              text-white/70

              max-sm:mb-[14px]
              max-sm:text-[8px]
              max-sm:tracking-[0.18em]
            "
          >
            Customer support, made
            simpler
          </p>

          {/* MAIN HEADING */}

          <h2
            className="
              text-center
              text-[clamp(44px,7.3vw,105px)]
              font-semibold
              leading-[1.02]
              tracking-[-0.075em]

              max-sm:text-[30px]
max-sm:leading-[1.02]
max-sm:tracking-[-0.05em]
            "
          >
            Your customers
            <br />

            deserve better.
            <br />

            <span
              className="
                text-white/60
              "
            >
              We&apos;re here to
              help.
            </span>
          </h2>

          {/* DESCRIPTION */}

          <p
            className="
              mx-auto
              mt-[28px]
              max-w-[600px]
              text-center
              text-[14px]
              leading-[1.9]
              text-white/80

              sm:text-[16px]

             max-sm:mt-[14px]
max-sm:max-w-[280px]
max-sm:text-[9px]
max-sm:leading-[1.5]
            "
          >
            Tell us about the
            conversations your team
            handles. We&apos;ll
            discuss a support setup
            that fits your business,
            your customers and your
            goals.
          </p>

          {/* =================================================
              CTA BUTTONS

              MOBILE = ONE ROW
          ================================================= */}

          <div
            className="
              mt-[36px]
              flex
              flex-wrap
              items-center
              justify-center
              gap-[14px]

             max-sm:mt-[18px]
max-sm:w-full
              max-sm:flex-nowrap
              max-sm:gap-[7px]
            "
          >
            <Link
              href="/book-a-free-call"
              className="
                inline-flex
                min-h-[54px]
                items-center
                justify-center
                gap-[14px]
                rounded-full
                bg-white
                px-[28px]
                text-[13px]
                font-semibold
                text-[#B12025]
                transition-all
                duration-300

                hover:scale-[1.035]
                hover:bg-[#F4F4F4]

                max-sm:min-h-[40px]
                max-sm:flex-1
                max-sm:gap-[5px]
                max-sm:px-[8px]
                max-sm:text-[8px]
                max-sm:whitespace-nowrap
              "
            >
              Book a free discovery
              call

              <ArrowUpRight
                className="
                  h-[17px]
                  w-[17px]

                  max-sm:h-[11px]
                  max-sm:w-[11px]
                "
              />
            </Link>

            <Link
              href="/services"
              className="
                inline-flex
                min-h-[54px]
                items-center
                justify-center
                gap-[12px]
                rounded-full
                border
                border-white/35
                px-[25px]
                text-[13px]
                font-semibold
                text-white
                transition-colors
                duration-300

                hover:bg-white/10

                max-sm:min-h-[40px]
                max-sm:flex-1
                max-sm:gap-[5px]
                max-sm:px-[8px]
                max-sm:text-[8px]
                max-sm:whitespace-nowrap
              "
            >
              Explore our services

              <ArrowRight
                className="
                  h-[17px]
                  w-[17px]

                  max-sm:h-[11px]
                  max-sm:w-[11px]
                "
              />
            </Link>
          </div>

          {/* =================================================
              BOTTOM FEATURES
              MOBILE = ONE ROW
          ================================================= */}

          <div
            className="
              mt-[65px]
              flex
              flex-wrap
              justify-center
              gap-x-[32px]
              gap-y-[14px]
              text-[11px]
              text-white/75

              max-sm:mt-[18px]
max-sm:flex-nowrap
max-sm:gap-x-[7px]
max-sm:text-[6px]
              max-sm:whitespace-nowrap
            "
          >
            <span
              className="
                flex
                items-center
                gap-[8px]

                max-sm:gap-[3px]
              "
            >
              <Headphones
                className="
                  h-[15px]
                  w-[15px]

                  max-sm:h-[10px]
                  max-sm:w-[10px]
                "
              />

              Customer support
            </span>

            <span
              className="
                flex
                items-center
                gap-[8px]

                max-sm:gap-[3px]
              "
            >
              <Clock3
                className="
                  h-[15px]
                  w-[15px]

                  max-sm:h-[10px]
                  max-sm:w-[10px]
                "
              />

              Planned workflows
            </span>

            <span
              className="
                flex
                items-center
                gap-[8px]

                max-sm:gap-[3px]
              "
            >
              <CheckCheck
                className="
                  h-[15px]
                  w-[15px]

                  max-sm:h-[10px]
                  max-sm:w-[10px]
                "
              />

              Quality checks
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}