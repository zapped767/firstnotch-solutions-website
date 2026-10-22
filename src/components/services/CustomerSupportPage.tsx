
'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
  ArrowDown,
  ArrowUpRight,
  Check,
  CheckCheck,
  ChevronDown,
  Headset,
  HeartHandshake,
  Mail,
  MessageCircle,
  PhoneCall,
  PhoneOutgoing,
  ShieldCheck,
  Sparkles,
  UserRoundCheck,
  X,
} from 'lucide-react';

// ======================================================
// CUSTOMER SUPPORT PAGE DATA
// Edit content and individual service URLs here.
// ======================================================

const services = [
  {
    number: '01',
    title: 'Inbound call support',
    icon: PhoneCall,
    description:
      "Incoming calls answered in your company's name, with each caller's history on screen.",
    href: '/services/customer-support-outsourcing/inbound-call-support',
    miniTitle: 'Inbound call workflow',
    steps: [
      'Call received',
      'Customer identified',
      'Question answered',
    ],
  },
  {
    number: '02',
    title: 'Outbound call support',
    icon: PhoneOutgoing,
    description:
      'Follow-up calls, surveys and campaigns run by agents using your scripts.',
    href: '/services/customer-support-outsourcing/outbound-call-support',
    miniTitle: 'Follow-up campaign',
    steps: [
      'Approved script',
      'Contact scheduled',
      'Outcome recorded',
    ],
  },
  {
    number: '03',
    title: 'Customer service',
    icon: Headset,
    description:
      'Phone, email and live chat support from one team, in four languages.',
    href: '/services/customer-support-outsourcing/customer-service',
    miniTitle: 'One consistent experience',
    steps: [
      'Phone and email',
      'Live chat',
      'One shared history',
    ],
  },
  {
    number: '04',
    title: 'Customer retention',
    icon: HeartHandshake,
    description:
      'Check-in and win-back calls that use only the offers you approve.',
    href: '/services/customer-support-outsourcing/customer-retention',
    miniTitle: 'Retention workflow',
    steps: [
      'Customer segment',
      'Approved offer',
      'Follow-up outcome',
    ],
  },
  {
    number: '05',
    title: 'Complaint and query handling',
    icon: ShieldCheck,
    description:
      'Each complaint gets a case number and a written final answer.',
    href: '/services/customer-support-outsourcing/complaint-query-handling',
    miniTitle: 'Case resolution',
    steps: [
      'Case created',
      'Owner assigned',
      'Written resolution',
    ],
  },
] as const;

const stats = [
  {
    to: 85,
    suffix: '%',
    label: 'client retention rate',
  },
  {
    to: 4,
    suffix: '',
    label:
      'support languages: English, Sinhala, Tamil and Hindi',
  },
  {
    to: 20,
    prefix: '15 to ',
    suffix: '%',
    label:
      'of job applicants pass the hiring checks',
  },
  {
    to: 98,
    suffix: '%',
    label: 'accuracy rate across client work',
  },
] as const;

const process = [
  {
    number: '01',
    title: 'Learning your business',
    body:
      'The team studies your products, policies, tone of voice and the questions customers ask most.',
    note: 'Your tools and processes',
    icon: MessageCircle,
  },
  {
    number: '02',
    title: 'Hiring and training',
    body:
      'Agents take language tests, technical assessments and reference checks. Only 15 to 20% of job applicants pass. Each agent is trained on your scripts and systems before speaking to a customer.',
    note: 'Careful selection',
    icon: UserRoundCheck,
  },
  {
    number: '03',
    title: 'Going live with quality checks',
    body:
      'Each call and task gets a quality score. Attendance is tracked, and every agent has a monthly performance review with coaching.',
    note: 'Measured from day one',
    icon: CheckCheck,
  },
  {
    number: '04',
    title: 'Reporting and improving',
    body:
      'You get a monthly report on response times, quality scores and the issues customers raise most, plus a call to agree what to improve.',
    note: 'Clear next steps',
    icon: Sparkles,
  },
] as const;

const faqs = [
  {
    q: 'Will customers know they are dealing with an outsourced team?',
    a:
      "Agents answer as part of your team. They use your company's name, your CRM and your scripts. Every agent passes a language test before being hired.",
  },
  {
    q: 'Which channels and languages are covered?',
    a:
      'Phone, email and live chat, in English, Sinhala, Tamil and Hindi.',
  },
  {
    q: 'What hours can the team cover?',
    a:
      'The office runs Monday to Friday, 10am to 7pm Sri Lanka time (GMT+5:30). Evening and weekend shifts, including cover for US hours, can be arranged.',
  },
  {
    q: 'Can the team work in our systems?',
    a:
      'Yes. Agents work inside your CRM and helpdesk tools. The team has experience with tools such as Zendesk, Freshdesk and HubSpot.',
  },
  {
    q: 'Will the same agents stay on our account?',
    a:
      'Agents receive incentives, employment benefits and career development opportunities. Ask about current average tenure during your discovery call.',
  },
  {
    q: 'What does it cost?',
    a:
      'Pricing depends on channels, coverage hours and the number of agents. You receive a written quotation after the discovery call, with the included services clearly listed.',
  },
  {
    q: 'Can we change the team size later?',
    a:
      "Yes. Agents can be added or reduced with 30 days' notice.",
  },
  {
    q: 'How is customer data kept safe?',
    a:
      'Access is limited to the people who need it, and every team member is trained on data handling and confidentiality. Systems are protected with encryption and two-factor login, and security updates are applied regularly.',
  },
] as const;

// ======================================================
// COMPONENT
// ======================================================

export default function CustomerSupportPage() {
  const rootRef = useRef<HTMLDivElement>(null);

  const [openFaq, setOpenFaq] =
    useState<number | null>(0);

  // ====================================================
  // GSAP ANIMATIONS
  // ====================================================

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    let mounted = true;

    const ctx = gsap.context(() => {

      // ================================================
      // NORMAL DESKTOP / TABLET MOTION
      // ================================================

      mm.add(
        '(prefers-reduced-motion: no-preference)',
        () => {

          // 01 — HERO LINE REVEAL
          // Lines are already split in JSX, so no
          // SplitText plugin is needed.

          gsap.from('[data-cs-hero-line]', {
            yPercent: 110,
            autoAlpha: 0,
            duration: 1.05,
            stagger: 0.16,
            ease: 'power3.out',
            delay: 0.12,
          });

          gsap.from('[data-cs-hero-enter]', {
            y: 25,
            autoAlpha: 0,
            duration: 0.85,
            stagger: 0.11,
            ease: 'power3.out',
            delay: 0.32,
          });

          // 02 — HERO PARALLAX DEPTH

          gsap.to('[data-cs-orb]', {
            yPercent: -18,
            scrollTrigger: {
              trigger: '[data-cs-hero]',
              start: 'top top',
              end: 'bottom top',
              scrub: 1.1,
            },
          });

          gsap.to('[data-cs-queue]', {
            yPercent: -9,
            scrollTrigger: {
              trigger: '[data-cs-hero]',
              start: 'top top',
              end: 'bottom top',
              scrub: 0.9,
            },
          });

          // 03 — GENERAL SCROLL REVEAL

          gsap.utils
            .toArray<HTMLElement>('[data-cs-reveal]')
            .forEach((el) => {
              gsap.from(el, {
                y: 44,
                autoAlpha: 0,
                duration: 0.9,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: el,
                  start: 'top 90%',
                  once: true,
                },
              });
            });

          // 04 — ANIMATED STATISTICS

          gsap.utils
            .toArray<HTMLElement>('[data-cs-stat]')
            .forEach((el) => {
              const goal = Number(
                el.dataset.goal || 0
              );

              const prefix =
                el.dataset.prefix || '';

              const suffix =
                el.dataset.suffix || '';

              const counter = { value: 0 };

              gsap.to(counter, {
                value: goal,
                duration: 1.7,
                ease: 'power2.out',

                scrollTrigger: {
                  trigger: el,
                  start: 'top 91%',
                  once: true,
                },

                onUpdate: () => {
                  el.textContent =
                    `${prefix}${Math.round(
                      counter.value
                    )}${suffix}`;
                },
              });
            });

          // 05 — WORD-BY-WORD SCROLL HIGHLIGHT

          const words =
            gsap.utils.toArray<HTMLElement>(
              '[data-cs-word]'
            );

          if (words.length) {
            gsap.fromTo(
              words,
              { opacity: 0.22 },
              {
                opacity: 1,
                stagger: 0.065,
                ease: 'none',

                scrollTrigger: {
                  trigger: '[data-cs-highlight]',
                  start: 'top 80%',
                  end: 'bottom 45%',
                  scrub: 1,
                },
              }
            );
          }

          // 06 — QUOTE BAND EXPANSION

          gsap.fromTo(
            '[data-cs-quote-box]',
            { scaleX: 0.88 },
            {
              scaleX: 1,
              ease: 'none',

              scrollTrigger: {
                trigger: '[data-cs-quote]',
                start: 'top 86%',
                end: 'top 38%',
                scrub: 1,
              },
            }
          );

          // 07 — SERVICE ICON REVEAL

          gsap.utils
            .toArray<HTMLElement>(
              '[data-cs-service-icon]'
            )
            .forEach((el) => {
              gsap.from(el, {
                y: 16,
                scale: 0.85,
                autoAlpha: 0,
                duration: 0.75,
                ease: 'back.out(1.4)',

                scrollTrigger: {
                  trigger: el,
                  start: 'top 92%',
                  once: true,
                },
              });
            });
        }
      );

      // ================================================
      // DESKTOP ONLY
      // ================================================

      mm.add(
        '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
        () => {

          // 08 — PINNED HORIZONTAL PROCESS

          const section =
            root.querySelector<HTMLElement>(
              '[data-cs-process]'
            );

          const track =
            root.querySelector<HTMLElement>(
              '[data-cs-process-track]'
            );

          const viewport =
            root.querySelector<HTMLElement>(
              '[data-cs-process-viewport]'
            );

          const progress =
            root.querySelector<HTMLElement>(
              '[data-cs-process-progress]'
            );

          if (section && track && viewport) {
            const distance = () =>
              Math.max(
                0,
                track.scrollWidth -
                  viewport.clientWidth
              );

            gsap.to(track, {
              x: () => -distance(),
              ease: 'none',

              scrollTrigger: {
                trigger: section,
                start: 'top top+=96',
                end: () =>
                  `+=${Math.max(distance(), 1)}`,
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true,
                anticipatePin: 1,

                onUpdate: (self) => {
                  if (progress) {
                    gsap.set(progress, {
                      scaleX: self.progress,
                    });
                  }
                },
              },
            });
          }

          // 09 — BEFORE / AFTER CROSSFADE

          const story =
            root.querySelector<HTMLElement>(
              '[data-cs-story]'
            );

          const after =
            root.querySelector<HTMLElement>(
              '[data-cs-story-after]'
            );

          if (story && after) {
            gsap.fromTo(
              after,
              {
                autoAlpha: 0,
                y: 24,
              },
              {
                autoAlpha: 1,
                y: 0,
                ease: 'none',

                scrollTrigger: {
                  trigger: story,
                  start: 'top 25%',
                  end: 'bottom 65%',
                  scrub: 1,
                },
              }
            );
          }

          // 10 — CURSOR-FOLLOWING 3D TILT

          const cleanups: Array<() => void> = [];

          if (
            window.matchMedia(
              '(hover: hover) and (pointer: fine)'
            ).matches
          ) {
            gsap.utils
              .toArray<HTMLElement>(
                '[data-cs-tilt]'
              )
              .forEach((card) => {
                const xTo = gsap.quickTo(
                  card,
                  'rotateX',
                  {
                    duration: 0.35,
                    ease: 'power3.out',
                  }
                );

                const yTo = gsap.quickTo(
                  card,
                  'rotateY',
                  {
                    duration: 0.35,
                    ease: 'power3.out',
                  }
                );

                const move = (
                  event: PointerEvent
                ) => {
                  const rect =
                    card.getBoundingClientRect();

                  const x =
                    (event.clientX - rect.left) /
                      rect.width -
                    0.5;

                  const y =
                    (event.clientY - rect.top) /
                      rect.height -
                    0.5;

                  xTo(-y * 4);
                  yTo(x * 4);
                };

                const leave = () => {
                  xTo(0);
                  yTo(0);
                };

                card.addEventListener(
                  'pointermove',
                  move
                );

                card.addEventListener(
                  'pointerleave',
                  leave
                );

                cleanups.push(() => {
                  card.removeEventListener(
                    'pointermove',
                    move
                  );

                  card.removeEventListener(
                    'pointerleave',
                    leave
                  );
                });
              });
          }

          return () => {
            cleanups.forEach((fn) => fn());
          };
        }
      );

    }, root);

    // Refresh pinned positions once Poppins loads.

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (mounted) ScrollTrigger.refresh();
      });
    }

    return () => {
      mounted = false;
      mm.revert();
      ctx.revert();
    };
  }, []);

  // ====================================================
  // PAGE JSX
  // ====================================================

  return (
    <div
      ref={rootRef}
      className="bg-white font-[inherit] text-[#17191C]"
    >

      {/* =================================================
          SECTION 01 — WHITE HERO
      ================================================= */}

      <section
        data-cs-hero
        className="
          relative
          isolate
          overflow-hidden
          bg-white
          px-5
          pb-20
          pt-[145px]

          sm:px-8

          lg:min-h-[790px]
          lg:px-14
          lg:pb-24
          lg:pt-[175px]
        "
      >

        {/* SOFT RED PARALLAX GLOW */}

        <div
          data-cs-orb
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-36
            top-16
            -z-10
            h-[550px]
            w-[550px]
            rounded-full
            bg-[#B12025]/[0.07]
            blur-[100px]
          "
        />

        <div className="
          mx-auto
          grid
          max-w-[1400px]
          items-center
          gap-14
          lg:grid-cols-[1.12fr_.88fr]
        ">

          {/* HERO CONTENT */}

          <div>

            <p
              data-cs-hero-enter
              className="
                mb-7
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.22em]
                text-[#B12025]
              "
            >
              Customer support outsourcing in Sri Lanka
            </p>

            {/* MASKED HEADLINE */}

            <h1 className="
              max-w-[850px]
              text-[clamp(2.75rem,5.5vw,5.5rem)]
              font-semibold
              leading-[1.08]
              tracking-[-0.065em]
            ">
              <span className="block overflow-hidden">
                <span
                  data-cs-hero-line
                  className="block"
                >
                  Customer support
                </span>
              </span>

              <span className="block overflow-hidden">
                <span
                  data-cs-hero-line
                  className="block text-[#B12025]"
                >
                  handled for you,
                </span>
              </span>

              <span className="block overflow-hidden">
                <span
                  data-cs-hero-line
                  className="block"
                >
                  from the first call
                </span>
              </span>

              <span className="block overflow-hidden">
                <span
                  data-cs-hero-line
                  className="block"
                >
                  to the follow-up.
                </span>
              </span>
            </h1>

            {/* DESCRIPTION */}

            <p
              data-cs-hero-enter
              className="
                mt-8
                max-w-[615px]
                text-[14px]
                font-light
                leading-[1.95]
                text-[#17191C]/65
                sm:text-[15px]
              "
            >
              Support problems are easy to miss. A call
              or email goes unanswered for hours. A
              complaint passes from person to person.
              Follow-up calls never get made, and
              customers who stopped buying hear nothing
              from you.
            </p>

            <p
              data-cs-hero-enter
              className="
                mt-4
                max-w-[615px]
                text-[14px]
                font-light
                leading-[1.95]
                text-[#17191C]/65
                sm:text-[15px]
              "
            >
              Each one looks small, but customers
              notice, and some of them leave.
              FirstNotch&apos;s trained call center team
              of 30+ in Colombo can handle all of it,
              from answering customers to reaching out
              to them, in your company&apos;s name.
            </p>

            {/* HERO BUTTONS */}

            <div
              data-cs-hero-enter
              className="mt-9 flex flex-wrap gap-3"
            >
              <a
                href="#services"
                className="
                  group
                  inline-flex
                  items-center
                  gap-3
                  rounded-full
                  bg-[#B12025]
                  px-6
                  py-4
                  text-[12px]
                  font-semibold
                  text-white
                  transition-colors
                  hover:bg-[#94191E]
                "
              >
                See the five services

                <ArrowDown
                  size={16}
                  className="transition-transform group-hover:translate-y-1"
                />
              </a>

              <a
                href="#contact"
                className="
                  inline-flex
                  items-center
                  gap-3
                  rounded-full
                  border
                  border-[#B12025]/20
                  px-6
                  py-4
                  text-[12px]
                  font-semibold
                  text-[#B12025]
                  hover:bg-[#B12025]/5
                "
              >
                Book a free discovery call
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>

          {/* HERO SUPPORT QUEUE VISUAL */}

          <div
            data-cs-queue
            className="
              relative
              mx-auto
              w-full
              max-w-[540px]
              lg:ml-auto
            "
          >
            <div className="
              rounded-[30px]
              border
              border-[#B12025]/10
              bg-[#F9F7F7]
              p-5
              shadow-[0_30px_90px_rgba(30,10,10,0.08)]
              sm:p-8
            ">

              <div className="flex items-center justify-between gap-3">

                <div className="flex items-center gap-3">
                  <span className="
                    flex h-11 w-11
                    items-center justify-center
                    rounded-2xl bg-[#B12025]
                    text-white
                  ">
                    <Headset size={23} />
                  </span>

                  <div>
                    <p className="text-[13px] font-semibold">
                      Support overview
                    </p>
                    <p className="text-[10px] text-[#17191C]/50">
                      Illustrative workflow
                    </p>
                  </div>
                </div>

                <span className="
                  rounded-full bg-white
                  px-3 py-1.5
                  text-[10px] font-semibold
                  text-[#B12025]
                ">
                  One team
                </span>
              </div>

              <div className="mt-7 space-y-3">
                {[
                  {
                    Icon: PhoneCall,
                    title: 'Incoming call',
                    note: 'Customer identified',
                    tag: 'Answered',
                  },
                  {
                    Icon: Mail,
                    title: 'Email enquiry',
                    note: 'Assigned to support',
                    tag: 'In progress',
                  },
                  {
                    Icon: MessageCircle,
                    title: 'Live chat',
                    note: 'Resolved by one team',
                    tag: 'Resolved',
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="
                      flex
                      items-center
                      gap-3
                      rounded-[18px]
                      bg-white
                      p-4
                      shadow-[0_5px_22px_rgba(0,0,0,0.035)]
                      transition-transform
                      duration-300
                      hover:-translate-y-1
                    "
                  >
                    <span className="
                      flex h-10 w-10
                      shrink-0 items-center justify-center
                      rounded-xl bg-[#B12025]/10
                      text-[#B12025]
                    ">
                      <item.Icon size={18} />
                    </span>

                    <div className="min-w-0 flex-1">
                      <p className="text-[12px] font-semibold">
                        {item.title}
                      </p>
                      <p className="mt-1 text-[10px] text-[#17191C]/55">
                        {item.note}
                      </p>
                    </div>

                    <span className="
                      shrink-0 rounded-full
                      bg-[#B12025]/[0.07]
                      px-2.5 py-1
                      text-[9px] font-semibold text-[#B12025]
                    ">
                      {item.tag}
                    </span>
                  </div>
                ))}
              </div>

              <div className="
                mt-6
                flex items-center justify-between
                rounded-2xl bg-[#B12025]
                p-5 text-white
              ">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.13em] text-white/70">
                    One team
                  </p>
                  <p className="mt-1 text-[18px] font-semibold">
                    One clear experience
                  </p>
                </div>
                <CheckCheck size={28} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          SECTION 02 — COUNT-UP STATISTICS
      ================================================= */}

      <section
        aria-label="Customer support at a glance"
        className="
          border-y border-[#B12025]/10
          bg-[#FCFAFA]
          px-5 py-12
          sm:px-8 lg:px-14
        "
      >
        <div className="
          mx-auto
          grid max-w-[1400px]
          grid-cols-2 gap-9
          md:grid-cols-4 md:gap-6
        ">
          {stats.map((item) => (
            <div
              data-cs-reveal
              key={item.label}
              className="
                min-w-0
                border-l-2 border-[#B12025]
                pl-5
              "
            >
              <p
                data-cs-stat
                data-goal={item.to}
                data-prefix={
                  'prefix' in item
                    ? item.prefix
                    : ''
                }
                data-suffix={item.suffix}
                className="
                  text-[clamp(2.2rem,4vw,4.25rem)]
                  font-semibold
                  leading-none
                  tracking-[-0.055em]
                  text-[#B12025]
                "
              >
                {'prefix' in item
                  ? item.prefix
                  : ''}
                {item.to}
                {item.suffix}
              </p>

              <p className="
                mt-3 max-w-[230px]
                text-[11px] leading-[1.75]
                text-[#17191C]/65
                sm:text-[12px]
              ">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =================================================
          SECTION 03 — SCROLL TEXT HIGHLIGHT
      ================================================= */}

      <section
        data-cs-highlight
        className="
          px-5 py-20
          sm:px-8
          lg:px-14 lg:py-32
        "
      >
        <div className="mx-auto max-w-[1100px]">

          <p
            data-cs-reveal
            className="
              mb-6 text-[11px]
              font-semibold uppercase
              tracking-[0.19em] text-[#B12025]
            "
          >
            Your company. Your voice.
          </p>

          <h2 className="
            text-[clamp(2rem,4.8vw,4.7rem)]
            font-semibold
            leading-[1.18]
            tracking-[-0.05em]
          ">
            {'Agents work as part of your team — in your systems, with your standards.'
              .split(' ')
              .map((word, index) => (
                <span
                  data-cs-word
                  key={`${word}-${index}`}
                  className="inline-block pr-[0.25em]"
                >
                  {word}
                </span>
              ))}
          </h2>
        </div>
      </section>

      {/* =================================================
          SECTION 04 — STACKING SERVICE CARDS
      ================================================= */}

      <section
        id="services"
        className="
          scroll-mt-[105px]
          bg-[#FAF9F9]
          px-5 py-20
          sm:px-8
          lg:px-14 lg:py-28
        "
      >
        <div className="mx-auto max-w-[1250px]">

          <div data-cs-reveal className="mb-12 max-w-[860px] lg:mb-16">

            <p className="
              text-[11px] font-semibold
              uppercase tracking-[0.19em]
              text-[#B12025]
            ">
              Five connected services
            </p>

            <h2 className="
              mt-4
              text-[clamp(2.35rem,5vw,5rem)]
              font-semibold
              leading-[1.1]
              tracking-[-0.055em]
            ">
              Customer support services
              <span className="text-[#B12025]">.</span>
            </h2>

            <p className="mt-5 text-[14px] leading-[1.85] text-[#17191C]/60">
              Choose a service to see how it works.
            </p>
          </div>

          <div className="space-y-7 lg:space-y-14">

            {services.map((item, index) => {
              const Icon = item.icon;
              const red = index % 2 === 0;

              return (
                <div
                  key={item.number}
                  className="
                    relative
                    lg:sticky
                    lg:top-[111px]
                  "
                  style={{
                    zIndex: index + 1,
                    perspective: '1300px',
                  }}
                >
                  <article
                    data-cs-tilt
                    className={`
                      relative
                      overflow-hidden
                      rounded-[28px]
                      border
                      p-7

                      shadow-[0_20px_60px_rgba(23,25,28,0.08)]

                      sm:p-9

                      lg:min-h-[430px]
                      lg:rounded-[34px]
                      lg:p-12

                      ${
                        red
                          ? 'border-[#B12025] bg-[#B12025] text-white'
                          : 'border-[#17191C]/10 bg-white text-[#17191C]'
                      }
                    `}
                  >
                    <div className="
                      grid items-center gap-9
                      lg:grid-cols-[1.1fr_.9fr]
                      lg:gap-14
                    ">

                      {/* CARD TEXT */}

                      <div>
                        <p
                          className={`text-[11px] font-semibold tracking-[0.22em] ${
                            red
                              ? 'text-white/65'
                              : 'text-[#B12025]'
                          }`}
                        >
                          {item.number} / 05 — SUPPORT SERVICES
                        </p>

                        <div
                          data-cs-service-icon
                          className={`
                            mt-8
                            flex h-[64px] w-[64px]
                            items-center justify-center
                            rounded-[18px]
                            ${
                              red
                                ? 'bg-white/15'
                                : 'bg-[#B12025]/10 text-[#B12025]'
                            }
                          `}
                        >
                          <Icon
                            size={29}
                            strokeWidth={1.55}
                          />
                        </div>

                        <h3 className="
                          mt-7
                          text-[clamp(1.9rem,3.6vw,3.9rem)]
                          font-semibold
                          leading-[1.13]
                          tracking-[-0.05em]
                        ">
                          {item.title}
                        </h3>

                        <p
                          className={`mt-5 max-w-[510px] text-[14px] leading-[1.85] ${
                            red
                              ? 'text-white/80'
                              : 'text-[#17191C]/65'
                          }`}
                        >
                          {item.description}
                        </p>

                        <Link
                          href={item.href}
                          className={`
                            group
                            mt-8
                            inline-flex items-center gap-3
                            rounded-full
                            px-5 py-3.5
                            text-[12px] font-semibold
                            transition-transform
                            hover:-translate-y-1
                            ${
                              red
                                ? 'bg-white text-[#B12025]'
                                : 'bg-[#B12025] text-white'
                            }
                          `}
                        >
                          Read more

                          <ArrowUpRight
                            size={16}
                            className="
                              transition-transform
                              group-hover:translate-x-1
                              group-hover:-translate-y-1
                            "
                          />
                        </Link>
                      </div>

                      {/* ANIMATED SERVICE WORKFLOW */}

                      <div
                        className={`
                          rounded-[24px]
                          p-5
                          shadow-[0_15px_40px_rgba(0,0,0,0.07)]
                          sm:p-7
                          ${
                            red
                              ? 'bg-white text-[#17191C]'
                              : 'bg-[#F8F5F5] text-[#17191C]'
                          }
                        `}
                      >
                        <div className="
                          flex items-center justify-between
                          gap-2 border-b border-black/10
                          pb-5
                        ">

                          <div className="flex items-center gap-3">
                            <span className="
                              flex h-10 w-10
                              items-center justify-center
                              rounded-xl bg-[#B12025]/10
                              text-[#B12025]
                            ">
                              <Icon size={20} />
                            </span>

                            <div>
                              <p className="text-[12px] font-semibold">
                                {item.miniTitle}
                              </p>
                              <p className="mt-1 text-[10px] text-[#17191C]/45">
                                Illustrative example
                              </p>
                            </div>
                          </div>

                          <Check
                            size={17}
                            className="shrink-0 text-[#B12025]"
                          />
                        </div>

                        <div className="mt-5 space-y-3">

                          {item.steps.map((step, stepIndex) => (
                            <div
                              key={step}
                              className="
                                flex items-center gap-3
                                rounded-xl bg-white
                                p-3.5
                                transition-transform
                                duration-300
                                hover:translate-x-1
                              "
                            >
                              <span className="
                                flex h-8 w-8
                                shrink-0
                                items-center justify-center
                                rounded-full
                                bg-[#B12025]/10
                                text-[10px] font-semibold
                                text-[#B12025]
                              ">
                                0{stepIndex + 1}
                              </span>

                              <span className="flex-1 text-[12px] font-medium">
                                {step}
                              </span>

                              <Check
                                size={15}
                                className="text-[#B12025]"
                              />
                            </div>
                          ))}
                        </div>

                        <div className="
                          mt-5 flex items-center gap-2
                          text-[10px] font-semibold
                          text-[#B12025]
                        ">
                          <CheckCheck size={15} />
                          Your team, your standards
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =================================================
          SECTION 05 — BEFORE / AFTER STORY
      ================================================= */}

      <section
        data-cs-story
        className="
          bg-white
          px-5 py-20
          sm:px-8
          lg:h-[165vh]
          lg:px-14
          lg:py-0
        "
      >
        <div className="
          mx-auto
          flex max-w-[1300px]
          flex-col justify-center

          lg:sticky
          lg:top-[100px]
          lg:h-[calc(100vh-110px)]
        ">

          <div data-cs-reveal className="mb-9">

            <p className="
              text-[11px] font-semibold
              uppercase tracking-[0.2em]
              text-[#B12025]
            ">
              A clearer way to support
            </p>

            <h2 className="
              mt-3
              text-[clamp(2.3rem,4.6vw,4.8rem)]
              font-semibold
              tracking-[-0.055em]
            ">
              From missed moments to managed conversations.
            </h2>
          </div>

          {/* BEFORE AND AFTER STAGE */}

          <div className="
            relative
            min-h-[380px]
            overflow-hidden
            rounded-[30px]
            lg:min-h-[435px]
          ">

            {/* BEFORE */}

            <div className="
              absolute inset-0
              rounded-[30px]
              bg-[#F7F1F1]
              p-7 sm:p-12
            ">
              <p className="
                text-[11px] font-semibold
                uppercase tracking-[0.2em]
                text-[#B12025]
              ">
                Before — the missed moments
              </p>

              <h3 className="
                mt-5
                text-[clamp(1.6rem,3.2vw,3rem)]
                font-semibold
                tracking-[-0.04em]
              ">
                Calls missed. Cases passed around.
              </h3>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  'Unanswered calls',
                  'Unassigned complaints',
                  'Follow-ups delayed',
                ].map((item) => (
                  <div
                    key={item}
                    className="
                      flex items-center gap-3
                      rounded-2xl
                      border border-[#B12025]/15
                      bg-white p-5
                      text-[12px] font-medium
                    "
                  >
                    <X
                      size={20}
                      className="shrink-0 text-[#B12025]"
                    />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* AFTER — SCROLL CROSSFADE */}

            <div
              data-cs-story-after
              className="
                relative z-10
                mt-[400px]
                rounded-[30px]
                bg-[#B12025]
                p-7 text-white

                sm:mt-[365px]
                sm:p-12

                lg:absolute
                lg:inset-0
                lg:mt-0
              "
            >
              <p className="
                text-[11px] font-semibold
                uppercase tracking-[0.2em]
                text-white/75
              ">
                After — one accountable team
              </p>

              <h3 className="
                mt-5
                text-[clamp(1.6rem,3.2vw,3rem)]
                font-semibold
                tracking-[-0.04em]
              ">
                Answered. Assigned. Followed through.
              </h3>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  'Support across channels',
                  'Clear case ownership',
                  'Follow-up recorded',
                ].map((item) => (
                  <div
                    key={item}
                    className="
                      flex items-center gap-3
                      rounded-2xl
                      border border-white/20
                      bg-white/10 p-5
                      text-[12px] font-medium
                    "
                  >
                    <Check size={20} className="shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          SECTION 06 — HORIZONTAL PROCESS SCROLL
      ================================================= */}

      <section
        data-cs-process
        className="
          overflow-hidden
          bg-[#FAF9F9]
          px-5 py-20
          sm:px-8
          lg:px-14
        "
      >
        <div className="mx-auto max-w-[1400px]">

          <div data-cs-reveal className="mb-11 max-w-[840px]">

            <p className="
              text-[11px] font-semibold
              uppercase tracking-[0.19em]
              text-[#B12025]
            ">
              Designed around your business
            </p>

            <h2 className="
              mt-4
              text-[clamp(2.2rem,4.5vw,4.7rem)]
              font-semibold
              leading-[1.1]
              tracking-[-0.055em]
            ">
              How your support team is set up
              <span className="text-[#B12025]">.</span>
            </h2>

            <p className="
              mt-5 max-w-[650px]
              text-[14px] leading-[1.85]
              text-[#17191C]/65
            ">
              The biggest risk with outsourced support is
              agents who do not know your business.
              The steps below prevent that.
            </p>
          </div>

          {/* HORIZONTAL TRACK */}

          <div
            data-cs-process-viewport
            className="
              snap-x snap-mandatory
              overflow-x-auto pb-5

              lg:snap-none
              lg:overflow-hidden
            "
            style={{ scrollbarWidth: 'none' }}
          >
            <div
              data-cs-process-track
              className="
                flex w-max gap-5 pb-3
                lg:gap-7
              "
            >
              {process.map((step) => {
                const Icon = step.icon;

                return (
                  <article
                    key={step.number}
                    className="
                      flex
                      w-[min(84vw,530px)]
                      shrink-0
                      snap-start
                      flex-col

                      rounded-[26px]
                      border border-[#17191C]/10
                      bg-white
                      p-7

                      shadow-[0_12px_42px_rgba(23,25,28,0.04)]

                      sm:p-10

                      lg:min-h-[365px]
                      lg:w-[min(62vw,610px)]
                    "
                  >
                    <div className="flex items-start justify-between">

                      <span className="
                        text-[64px]
                        font-semibold
                        leading-none
                        tracking-[-0.07em]
                        text-[#B12025]
                      ">
                        {step.number}
                      </span>

                      <span className="
                        flex h-12 w-12
                        items-center justify-center
                        rounded-full bg-[#B12025]/10
                        text-[#B12025]
                      ">
                        <Icon size={24} />
                      </span>
                    </div>

                    <p className="
                      mt-5
                      text-[10px] font-semibold
                      uppercase tracking-[0.17em]
                      text-[#B12025]
                    ">
                      {step.note}
                    </p>

                    <h3 className="
                      mt-3
                      text-[clamp(1.45rem,2.4vw,2.4rem)]
                      font-semibold
                      tracking-[-0.045em]
                    ">
                      {step.title}
                    </h3>

                    <p className="
                      mt-4 max-w-[490px]
                      text-[13px] leading-[1.9]
                      text-[#17191C]/65
                    ">
                      {step.body}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>

          {/* PROCESS PROGRESS LINE */}

          <div className="
            mt-4 h-[3px] w-full
            overflow-hidden rounded-full
            bg-[#B12025]/10
          ">
            <div
              data-cs-process-progress
              className="
                h-full w-full
                origin-left scale-x-0
                bg-[#B12025]
              "
            />
          </div>

          <p className="mt-4 text-[11px] text-[#17191C]/40 lg:hidden">
            Swipe to explore the four steps →
          </p>
        </div>
      </section>

      {/* =================================================
          SECTION 07 — TESTIMONIAL BAND
      ================================================= */}

      <section
        data-cs-quote
        className="
          overflow-hidden
          bg-white
          px-5 py-20
          sm:px-8
          lg:px-14 lg:py-28
        "
      >
        <div
          data-cs-quote-box
          className="
            mx-auto
            max-w-[1400px]
            origin-center

            rounded-[28px]
            bg-[#B12025]
            px-7 py-14
            text-white

            sm:px-12

            lg:rounded-[36px]
            lg:px-20
            lg:py-20
          "
        >
          <p
            data-cs-reveal
            className="
              text-[11px] font-semibold
              uppercase tracking-[0.2em]
              text-white/70
            "
          >
            What a support partnership can change
          </p>

          <blockquote
            data-cs-reveal
            className="
              mt-8
              max-w-[1050px]
              text-[clamp(1.45rem,3.2vw,3.5rem)]
              font-medium
              leading-[1.4]
              tracking-[-0.035em]
            "
          >
            “One team now answers our calls and chats,
            and follows up on complaints until they are
            closed. Our own staff can focus on their own
            work again.”
          </blockquote>

          <p
            data-cs-reveal
            className="mt-9 text-[12px] font-semibold text-white/75"
          >
            — Internet service provider
          </p>
        </div>
      </section>

      {/* =================================================
          SECTION 08 — INTERACTIVE FAQ
      ================================================= */}

      <section className="
        bg-[#FAF9F9]
        px-5 py-20
        sm:px-8
        lg:px-14 lg:py-28
      ">
        <div className="
          mx-auto
          grid max-w-[1300px]
          gap-12

          lg:grid-cols-[.85fr_1.15fr]
          lg:gap-20
        ">

          {/* FAQ HEADING */}

          <div data-cs-reveal>

            <p className="
              text-[11px]
              font-semibold
              uppercase
              tracking-[0.2em]
              text-[#B12025]
            ">
              Common questions
            </p>

            <h2 className="
              mt-5
              text-[clamp(2.3rem,4.5vw,4.5rem)]
              font-semibold
              leading-[1.1]
              tracking-[-0.055em]
            ">
              Customer support, clearly explained.
            </h2>

            <p className="
              mt-6
              text-[14px]
              leading-[1.9]
              text-[#17191C]/60
            ">
              Everything you need to know about working
              with a FirstNotch support team.
            </p>

            <a
              href="#contact"
              className="
                group mt-8
                inline-flex
                items-center gap-2
                text-[12px]
                font-semibold
                text-[#B12025]
              "
            >
              Still have a question? Talk to us

              <ArrowUpRight
                size={16}
                className="
                  transition-transform
                  group-hover:translate-x-1
                  group-hover:-translate-y-1
                "
              />
            </a>
          </div>

          {/* FAQ ITEMS */}

          <div className="space-y-3">

            {faqs.map((faq, index) => {
              const expanded = openFaq === index;

              return (
                <div
                  key={faq.q}
                  className={`
                    rounded-[20px]
                    border bg-white
                    transition-colors
                    duration-300

                    ${
                      expanded
                        ? 'border-[#B12025]/35'
                        : 'border-[#17191C]/10'
                    }
                  `}
                >
                  <h3>
                    <button
                      type="button"
                      aria-expanded={expanded}
                      aria-controls={`cs-faq-${index}`}
                      onClick={() =>
                        setOpenFaq(
                          expanded ? null : index
                        )
                      }
                      className="
                        flex w-full
                        items-center justify-between
                        gap-5

                        px-6 py-6
                        text-left
                        text-[13px]
                        font-semibold

                        sm:px-7
                        sm:text-[15px]

                        focus-visible:outline
                        focus-visible:outline-2
                        focus-visible:outline-[#B12025]
                      "
                    >
                      {faq.q}

                      <span
                        className={`
                          flex h-9 w-9
                          shrink-0
                          items-center justify-center
                          rounded-full
                          transition-colors

                          ${
                            expanded
                              ? 'bg-[#B12025] text-white'
                              : 'bg-[#B12025]/[0.07] text-[#B12025]'
                          }
                        `}
                      >
                        <ChevronDown
                          size={17}
                          className={`
                            transition-transform
                            duration-300

                            ${
                              expanded
                                ? 'rotate-180'
                                : ''
                            }
                          `}
                        />
                      </span>
                    </button>
                  </h3>

                  <div
                    id={`cs-faq-${index}`}
                    className={`
                      grid
                      transition-[grid-template-rows]
                      duration-300
                      ease-out

                      ${
                        expanded
                          ? 'grid-rows-[1fr]'
                          : 'grid-rows-[0fr]'
                      }
                    `}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <p className="
                        px-6 pb-7
                        text-[13px]
                        leading-[1.95]
                        text-[#17191C]/65
                        sm:px-7
                      ">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}
