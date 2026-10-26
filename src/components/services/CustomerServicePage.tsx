
'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCheck,
  ChevronDown,
  ClipboardCheck,
  FileCheck2,
  Inbox,
  Languages,
  Mail,
  MessageCircle,
  Package,
  PhoneCall,
  Send,
  ShieldCheck,
  Users,
} from 'lucide-react';

// ======================================================
// FIRSTNOTCH — CUSTOMER SERVICE
// Colours: Red #B12025, White #FFFFFF
// GSAP text reveals and horizontal scrolling
// ======================================================

const ROOT = '/services/customer-support-outsourcing';


const channels = [
  { name: 'Email', Icon: Mail },
  { name: 'Chat', Icon: MessageCircle },
  { name: 'Phone', Icon: PhoneCall },
  { name: 'Facebook', Icon: Users },
  { name: 'Instagram', Icon: MessageCircle },
  { name: 'WhatsApp', Icon: MessageCircle },
] as const;


const industries = [
  {
    name: 'Parcel service',
    mark: 'P',
    label: 'Parcel service',
    tone: 'Clear and reassuring',
    answer:
      'I can check the latest delivery update for you. Please share your tracking reference.',
  },
  {
    name: 'Online shop',
    mark: 'S',
    label: 'Online shop',
    tone: 'Warm and helpful',
    answer:
      'Happy to help with your order. May I have your order reference?',
  },
  {
    name: 'Telecom',
    mark: 'T',
    label: 'Telecom',
    tone: 'Direct and informative',
    answer:
      'I can help check your account. Please provide your support reference.',
  },
] as const;

const questions = [
  'Where is my parcel?',
  'Can I change my details?',
  'When will I get an update?',
] as const;

const featureData = [
  {
    title: 'One shared inbox',
    body:
      "Messages from every channel arrive in your help desk (such as Zendesk, Freshdesk or Gorgias). No message is left in one person's mailbox.",
    Icon: Inbox,
    detail: 'One team. All conversations.',
  },
  {
    title: 'Full history before each reply',
    body:
      'Agents see past emails, chats and calls from the same customer, so customers do not have to explain their issue again.',
    Icon: ClipboardCheck,
    detail: 'Past messages in context.',
  },
  {
    title: 'Live chat on your website',
    body:
      'Chats are answered within one minute during working hours.',
    Icon: MessageCircle,
    detail: 'Live support during working hours.',
  },
  {
    title: 'Replies written in your style',
    body:
      'Emails, chats and social replies follow your tone guide and approved templates. Emails are checked for spelling and accuracy before they are sent.',
    Icon: FileCheck2,
    detail: 'Your approved tone and templates.',
  },
  {
    title: 'Social media messages',
    body:
      'Facebook, Instagram and WhatsApp messages can go to the same team.',
    Icon: Users,
    detail: 'Social conversations, together.',
  },
  {
    title: 'Four languages',
    body:
      'Customers can write or speak in English, Sinhala, Tamil or Hindi.',
    Icon: Languages,
    detail: 'English · Sinhala · Tamil · Hindi',
  },
  {
    title: 'Hand-offs with notes',
    body:
      'Cases that need your own staff are assigned to them with a summary, so your staff can see what has already been said.',
    Icon: Users,
    detail: 'Nothing lost in the hand-off.',
  },
  {
    title: 'A quality score for every ticket',
    body:
      'Each email, chat and call is scored by a reviewer. Agents go over their results in a monthly performance review with coaching.',
    Icon: ShieldCheck,
    detail: 'Reviewed, scored, coached.',
  },
] as const;

const metricData = [
  {
    title: 'First reply time',
    description:
      'The wait before a customer gets a first answer.',
    note: 'Target set with you for each channel, phone included.',
  },
  {
    title: 'Resolution time',
    description:
      'Time from the first message until the case is closed.',
    note: 'Tracked by ticket type.',
  },
  {
    title: 'Repeat contacts',
    description:
      'Customers who contact you again about the same issue within a week.',
    note: 'Reviewed each month to find gaps in your help articles.',
  },
  {
    title: 'Customer satisfaction',
    description:
      'A rating customers give once their case is closed.',
    note: 'Shown for each agent and channel.',
  },
  {
    title: 'Quality score',
    description:
      'How well replies match your tone, templates and policies, scored by a reviewer.',
    note: 'Shared with each agent after every review.',
  },
] as const;

const setupSteps = [
  {
    title: 'Learning your business',
    body:
      'The team studies your products, policies, tone of voice and the questions customers ask most.',
  },
  {
    title: 'Hiring and training',
    body:
      'Agents take language tests, technical assessments and reference checks. Only 15 to 20% of job applicants pass. Each one is then trained on your scripts and systems before speaking to a customer.',
  },
  {
    title: 'Going live with quality checks',
    body:
      'Each call and task gets a quality score. Attendance is tracked, and every agent has a monthly performance review with coaching.',
  },
  {
    title: 'Reporting and improving',
    body:
      'You get a monthly report on response times, quality scores and the issues customers raise most, plus a call to agree what to improve.',
  },
] as const;

const faqData = [
  {
    title: 'Which help desk tools can the team use?',
    answer:
      'The team works in the tools you already have. Zendesk, Freshdesk, Gorgias, Intercom and HubSpot are the most common. If you do not use a help desk yet, FirstNotch can recommend one and set it up.',
    category: 'Tools & channels',
  },
  {
    title: 'Can we start with one channel?',
    answer:
      'Yes. Many clients begin with email or chat and add more channels once quality scores on the first channel meet your target.',
    category: 'Tools & channels',
  },
  {
    title: 'Who writes the saved replies?',
    answer:
      'Agents draft saved replies and help articles from the questions they see most. You approve each one before it is used.',
    category: 'Tools & channels',
  },
  {
    title:
      'Can customers get help outside Sri Lanka office hours?',
    answer:
      'Core hours are Monday to Friday, 10am to 7pm Sri Lanka time. Emails that arrive overnight are answered first the next morning. Evening and weekend chat cover can be added.',
    category: 'Hours & peaks',
  },
  {
    title: 'How is customer information kept safe?',
    answer:
      'Each agent has a personal login to your help desk, so every action can be traced to one person. Access is removed on the same day someone leaves your account.',
    category: 'Security & cost',
  },
  {
    title: 'What happens during busy seasons?',
    answer:
      "Extra agents can be trained ahead of known peaks, such as sale periods and holidays. A month's notice is enough for most peaks.",
    category: 'Hours & peaks',
  },
  {
    title:
      'How much does customer service outsourcing cost?',
    answer:
      'Price depends on your monthly conversation volume and which channels are covered. Most clients pay a fixed fee per agent. You receive a written quote after the discovery call.',
    category: 'Security & cost',
  },
] as const;

const related = [
  {
    title: 'Inbound call support',
    href: `${ROOT}/inbound-call-support`,
  },
  {
    title: 'Outbound call support',
    href: `${ROOT}/outbound-call-support`,
  },
  {
    title: 'Customer retention',
    href: `${ROOT}/customer-retention`,
  },
  {
    title: 'Complaint and query handling',
    href: `${ROOT}/complaint-query-handling`,
  },
] as const;

const helpdeskTools = [
  'Zendesk',
  'Freshdesk',
  'Gorgias',
  'Intercom',
  'HubSpot',
] as const;

const faqCategories = [
  'Tools & channels',
  'Hours & peaks',
  'Security & cost',
] as const;

const QUOTE =
  'When customers ask where their parcel is, they now get a chat reply within minutes. Our drivers no longer take those calls on the road.';

const eyebrow =
  'text-[11px] font-semibold uppercase tracking-[0.21em] text-[#B12025]';

const heading =
  'text-[clamp(2.5rem,4.7vw,5.35rem)] font-semibold leading-[1.075] tracking-[-0.065em] text-[#17191C]';

// ======================================================
// GSAP HEADING WORD COMPONENT
// ======================================================

function AnimatedWords({ text }: { text: string }) {
  return (
    <span role="text" aria-label={text}>
      {text.split(/\s+/).map((word, index) => (
        <span
          key={`${index}-${word}`}
          aria-hidden="true"
        >
          {index > 0 ? ' ' : null}

          <span className="-mb-[0.13em] inline-block overflow-hidden pb-[0.13em] align-bottom">
            <span
              data-cs-word
              className="inline-block"
            >
              {word}
            </span>
          </span>
        </span>
      ))}
    </span>
  );
}

// ======================================================
// SCROLL-LINKED TESTIMONIAL
// SAME STYLE AS HOMEPAGE
// ======================================================

function ScrollQuote() {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    gsap.registerPlugin(ScrollTrigger);

    const media = gsap.matchMedia();

    media.add(
      '(prefers-reduced-motion: no-preference)',
      () => {
        const animation = gsap.fromTo(
          element.querySelectorAll(
            '[data-cs-quote-word]'
          ),
          {
            opacity: 0.2,
            textShadow:
              '0px 0px 0px rgba(91,0,0,0)',
          },
          {
            opacity: 1,
            textShadow:
              '0px 4px 13px rgba(91,0,0,0.3)',
            stagger: 0.09,
            ease: 'none',

            scrollTrigger: {
              trigger: element,
              start: 'top 85%',
              end: 'bottom 45%',
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );

        return () => {
          animation.scrollTrigger?.kill();
          animation.kill();
        };
      }
    );

    return () => media.revert();
  }, []);

  return (
    <section
      aria-label="Parcel delivery service testimonial"
      className="bg-[#B12025] px-5 py-[92px] text-white sm:px-8 lg:px-12 lg:py-[140px]"
    >
      <div className="mx-auto max-w-[1350px]">
        <p className="mb-10 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80">
          Parcel delivery service
        </p>

        <blockquote>
          <p
            ref={ref}
            role="text"
            aria-label={QUOTE}
            className="max-w-[1170px] text-[clamp(1.9rem,3.8vw,4.4rem)] font-semibold leading-[1.42] tracking-[-0.055em]"
          >
            <span aria-hidden="true">“</span>

            {QUOTE.split(/\s+/).map((word, index) => (
              <span
                key={index}
                data-cs-quote-word
                aria-hidden="true"
                className="inline-block"
              >
                {word}
                {'\u00A0'}
              </span>
            ))}

            <span aria-hidden="true">”</span>
          </p>
        </blockquote>

        <div className="mt-10 flex flex-wrap items-center gap-3 text-[12px] text-white/90">
          <Package size={19} />

          Parcel delivery service

          <span className="ml-3 h-px w-24 bg-white/50" />

          <span className="text-white/70">
            Delivery update → Chat reply
          </span>
        </div>
      </div>
    </section>
  );
}

// ======================================================
// MAIN CUSTOMER SERVICE PAGE
// ======================================================

export default function CustomerServicePage() {
  const pageRef = useRef<HTMLDivElement>(null);

  const featuresSectionRef = useRef<HTMLElement>(null);
  const featuresTrackRef = useRef<HTMLDivElement>(null);

  const setupSectionRef = useRef<HTMLElement>(null);
  const setupTrackRef = useRef<HTMLDivElement>(null);

  const [featureProgress, setFeatureProgress] =
    useState(0);

  const [setupProgress, setSetupProgress] =
    useState(0);

  const [industryIndex, setIndustryIndex] =
    useState(0);

  const [sampleQuestion, setSampleQuestion] =
    useState(0);

  const [chosenTool, setChosenTool] =
    useState(0);

  const [handoff, setHandoff] =
    useState(false);

  const [channelPick, setChannelPick] =
    useState('Chat');

  const [seasonLevel, setSeasonLevel] =
    useState(1);

  const [faqCategory, setFaqCategory] =
    useState('Tools & channels');

  const [openFaq, setOpenFaq] =
    useState<number | null>(0);

  const [plannerStep, setPlannerStep] =
    useState(0);

  const [supportHours, setSupportHours] =
    useState('During business hours');

  const [startTime, setStartTime] =
    useState('Within the next month');

  const [showFloatingCTA, setShowFloatingCTA] =
    useState(false);

  // ====================================================
  // CONTACT FORM PRE-FILL
  // Uses your existing StoryContact component
  // ====================================================

  const continueToContact = () => {
    const service =
      document.querySelector<HTMLSelectElement>(
        '#contact select[name="service"]'
      );

    if (service) {
      service.value = 'Customer support';

      service.dispatchEvent(
        new Event('change', { bubbles: true })
      );
    }

    const hours =
      document.querySelector<HTMLSelectElement>(
        '#contact select[name="hours"]'
      );

    if (hours) {
      hours.value =
        supportHours === 'During business hours'
          ? 'During my business hours'
          : supportHours === 'Evenings or weekends'
          ? 'Outside my business hours'
          : 'Both';

      hours.dispatchEvent(
        new Event('change', { bubbles: true })
      );
    }

    const start =
      document.querySelector<HTMLSelectElement>(
        '#contact select[name="start"]'
      );

    if (start) {
      start.value = startTime;

      start.dispatchEvent(
        new Event('change', { bubbles: true })
      );
    }

    const message =
      document.querySelector<HTMLTextAreaElement>(
        '#contact textarea[name="message"]'
      );

    if (message) {
      const volumes = [
        'Lower volume',
        'Regular volume',
        'Growing volume',
        'Busy season / peak',
      ];

      message.value =
        `Customer service enquiry. ` +
        `Start with: ${channelPick}. ` +
        `Coverage: ${supportHours}. ` +
        `Start: ${startTime}. ` +
        `Conversation volume: ${volumes[seasonLevel]}.`;

      message.dispatchEvent(
        new Event('input', { bubbles: true })
      );
    }

    document
      .getElementById('contact')
      ?.scrollIntoView({
        behavior: window.matchMedia(
          '(prefers-reduced-motion: reduce)'
        ).matches
          ? 'auto'
          : 'smooth',
      });
  };

  // ====================================================
  // GSAP TEXT ANIMATIONS + SIDE SCROLL
  // ====================================================

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const root = pageRef.current;

    if (!root) return;

    const media = gsap.matchMedia();

    // WORD-BY-WORD TEXT REVEAL

    media.add(
      '(prefers-reduced-motion: no-preference)',
      () => {
        const context = gsap.context(() => {
          root
            .querySelectorAll<HTMLElement>(
              '[data-cs-title]'
            )
            .forEach((title) => {
              const words =
                title.querySelectorAll(
                  '[data-cs-word]'
                );

              if (!words.length) return;

              gsap.fromTo(
                words,
                {
                  yPercent: 115,
                  autoAlpha: 0,
                },
                {
                  yPercent: 0,
                  autoAlpha: 1,

                  duration:
                    title.tagName === 'H1'
                      ? 1.1
                      : 0.85,

                  stagger:
                    title.tagName === 'H1'
                      ? 0.055
                      : 0.036,

                  ease: 'power3.out',

                  scrollTrigger: {
                    trigger: title,
                    start: 'top 90%',
                    once: true,
                  },
                }
              );
            });

          // GENERAL ELEMENT REVEALS

          root
            .querySelectorAll<HTMLElement>(
              '[data-cs-reveal]'
            )
            .forEach((element) => {
              gsap.fromTo(
                element,
                {
                  autoAlpha: 0,
                  y: 25,
                },
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.78,
                  ease: 'power3.out',

                  scrollTrigger: {
                    trigger: element,
                    start: 'top 92%',
                    once: true,
                  },
                }
              );
            });

          // HERO CHANNEL ICON REVEALS

          root
            .querySelectorAll<HTMLElement>(
              '[data-cs-channel]'
            )
            .forEach((element, index) => {
              gsap.fromTo(
                element,
                {
                  autoAlpha: 0,
                  x:
                    index % 2 === 0
                      ? -28
                      : 28,
                },
                {
                  autoAlpha: 1,
                  x: 0,
                  duration: 0.8,
                  delay: index * 0.06,
                  ease: 'power3.out',

                  scrollTrigger: {
                    trigger: element.parentElement,
                    start: 'top 88%',
                    once: true,
                  },
                }
              );
            });
        }, root);

        return () => context.revert();
      }
    );

    // DESKTOP PINNED SIDE SCROLLING

    media.add(
      '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
      () => {
        const scenes = [
          {
            section: featuresSectionRef.current,
            track: featuresTrackRef.current,
            setProgress: setFeatureProgress,
          },
          {
            section: setupSectionRef.current,
            track: setupTrackRef.current,
            setProgress: setSetupProgress,
          },
        ];

        const animations: gsap.core.Tween[] = [];

        scenes.forEach(
          ({ section, track, setProgress }) => {
            if (!section || !track) return;

            const distance = () =>
              Math.max(
                0,
                track.scrollWidth -
                  section.clientWidth
              );

            const tween = gsap.to(track, {
              x: () => -distance(),
              ease: 'none',

              scrollTrigger: {
                trigger: section,
                start: 'top top+=100',

                end: () =>
                  `+=${Math.max(distance(), 1)}`,

                pin: true,
                pinSpacing: true,
                scrub: 0.85,
                anticipatePin: 1,
                invalidateOnRefresh: true,

                onUpdate: (self) => {
                  setProgress(self.progress);
                },
              },
            });

            animations.push(tween);

            // CARD TEXT REVEAL WHILE SIDE SCROLLING

            track
              .querySelectorAll<HTMLElement>(
                '[data-cs-card]'
              )
              .forEach((card, index) => {
                const texts =
                  card.querySelectorAll(
                    '[data-cs-card-text]'
                  );

                if (!texts.length) return;

                const reveal = gsap.fromTo(
                  texts,
                  {
                    autoAlpha: 0,
                    y: 25,
                  },
                  {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.75,
                    stagger: 0.1,
                    ease: 'power3.out',

                    scrollTrigger:
                      index === 0
                        ? {
                            trigger: section,
                            start: 'top 80%',
                            once: true,
                          }
                        : {
                            trigger: card,
                            containerAnimation: tween,
                            start: 'left 85%',
                            once: true,
                          },
                  }
                );

                animations.push(reveal);
              });
          }
        );

        return () => {
          animations.forEach((animation) => {
            animation.scrollTrigger?.kill();
            animation.kill();
          });
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
      media.revert();
    };
  }, []);

  // ====================================================
  // FLOATING CONTACT CTA
  // ====================================================

  useEffect(() => {
    const hero =
      document.getElementById(
        'customer-service-hero'
      );

    const contact =
      document.getElementById('contact');

    if (!hero) return;

    let heroVisible = true;
    let contactVisible = false;

    const sync = () => {
      setShowFloatingCTA(
        !heroVisible && !contactVisible
      );
    };

    const heroObserver =
      new IntersectionObserver(([entry]) => {
        heroVisible = entry.isIntersecting;
        sync();
      });

    const contactObserver =
      new IntersectionObserver(([entry]) => {
        contactVisible = entry.isIntersecting;
        sync();
      });

    heroObserver.observe(hero);

    if (contact) {
      contactObserver.observe(contact);
    }

    return () => {
      heroObserver.disconnect();
      contactObserver.disconnect();
    };
  }, []);

  const brand = industries[industryIndex];

  const visibleFaqs = faqData
    .map((item, index) => ({
      ...item,
      index,
    }))
    .filter(
      (item) =>
        item.category === faqCategory
    );

  const seasonLabels = [
    'Lower volume',
    'Regular volume',
    'Growing volume',
    'Busy season / peak',
  ];

  return (
    <div
      ref={pageRef}
      className="overflow-x-clip bg-white font-sans text-[#17191C]"
    >
      {/* =================================================
          HERO — ALL CHANNELS, ONE INBOX
      ================================================= */}

      <section
        id="customer-service-hero"
        className="relative overflow-hidden bg-white px-5 pb-20 pt-[150px] sm:px-8 lg:px-12 lg:pb-[115px] lg:pt-[180px]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-[160px] top-[50px] h-[480px] w-[480px] rounded-full border border-[#B12025]/10"
        />

        <div className="relative mx-auto grid max-w-[1450px] items-center gap-12 lg:grid-cols-[1.04fr_.96fr] lg:gap-14">
          <div>
            <p
              data-cs-reveal
              className={eyebrow}
            >
              Outsourced customer service in Sri Lanka
            </p>

            <h1
              data-cs-title
              className="mt-6 max-w-[750px] text-[clamp(3rem,5.2vw,6.3rem)] font-semibold leading-[1.06] tracking-[-0.07em]"
            >
              <AnimatedWords
                text="One team for your emails, chats and calls,"
              />{' '}

              <span className="text-[#B12025]">
                <AnimatedWords
                  text="with each customer's full history on screen."
                />
              </span>
            </h1>

            <p
              data-cs-reveal
              className="mt-8 max-w-[620px] text-[15px] leading-[1.9] text-[#17191C]/70 sm:text-[16px]"
            >
              FirstNotch runs your customer service
              from Colombo, inside your help desk
              and under your brand. Agents handle
              order questions, account changes,
              delivery updates and product advice
              on each channel your customers use.
              Someone who emails in the morning
              and starts a chat later speaks to a
              person who can see both.
            </p>

            <div
              data-cs-reveal
              className="mt-9 flex flex-wrap gap-3"
            >
              <a
                href="#contact"
                className="group inline-flex min-h-[52px] items-center gap-3 rounded-full bg-[#B12025] px-6 py-3 text-[12px] font-semibold text-white transition hover:bg-[#971b20]"
              >
                Book a free discovery call

                <ArrowUpRight
                  size={17}
                  className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </a>

              <a
                href="#included"
                className="inline-flex min-h-[52px] items-center gap-3 rounded-full border border-[#B12025]/25 px-6 py-3 text-[12px] font-semibold text-[#B12025] transition hover:bg-[#fff4f4]"
              >
                See what is included
                <ArrowDownRight size={17} />
              </a>
            </div>

            {/* BRAND PREVIEW SELECTOR */}

            <div
              data-cs-reveal
              className="mt-12 border-t border-[#B12025]/15 pt-6"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#B12025]">
                Under your brand — demo preview
              </p>

              <div
                role="group"
                aria-label="Select example business"
                className="mt-3 flex flex-wrap gap-2"
              >
                {industries.map((item, index) => (
                  <button
                    key={item.name}
                    type="button"
                    aria-pressed={
                      industryIndex === index
                    }
                    onClick={() =>
                      setIndustryIndex(index)
                    }
                    className={`rounded-full border px-4 py-2.5 text-[11px] font-semibold transition ${
                      industryIndex === index
                        ? 'border-[#B12025] bg-[#B12025] text-white'
                        : 'border-[#B12025]/20 text-[#B12025] hover:bg-[#fff4f4]'
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* INTERACTIVE UNIFIED INBOX */}

          <div
            data-cs-reveal
            className="relative rounded-[32px] border border-[#B12025]/15 bg-[#fff9f9] p-5 shadow-[0_28px_75px_rgba(177,32,37,.08)] sm:p-7"
          >
            <div className="flex items-center justify-between gap-3 border-b border-[#B12025]/10 pb-5">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-[#B12025] text-xl font-bold text-white">
                  {brand.mark}
                </span>

                <div>
                  <p className="text-[12px] font-semibold">
                    {brand.label} inbox
                  </p>

                  <p className="text-[10px] text-[#17191C]/45">
                    Sample customer service workspace
                  </p>
                </div>
              </div>

              <Inbox
                size={23}
                className="text-[#B12025]"
              />
            </div>

            {/* SIX CHANNELS */}

            <div className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-6">
              {channels.map(({ name, Icon }) => (
                <div
                  data-cs-channel
                  key={name}
                  className="flex flex-col items-center gap-2 rounded-[14px] border border-[#B12025]/10 bg-white px-1 py-3 text-center"
                >
                  <Icon
                    size={18}
                    className="text-[#B12025]"
                    strokeWidth={1.7}
                  />

                  <span className="text-[9px] font-medium">
                    {name}
                  </span>

                  <span
                    aria-hidden="true"
                    className="h-1 w-1 rounded-full bg-[#B12025]"
                  />
                </div>
              ))}
            </div>

            <div
              aria-hidden="true"
              className="mx-auto h-9 w-[2px] bg-[#B12025]/35"
            />

            {/* ONE CUSTOMER THREAD */}

            <div className="rounded-[23px] bg-[#B12025] p-5 text-white sm:p-6">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-[12px] font-semibold">
                  <Inbox size={17} />
                  One shared inbox
                </span>

                <span className="text-[10px] text-white/65">
                  Example thread
                </span>
              </div>

              <div className="mt-5 space-y-3">
                <div className="rounded-[15px] bg-white p-4 text-[#17191C]">
                  <div className="flex justify-between gap-3">
                    <span className="text-[11px] font-bold">
                      09:00 · Email
                    </span>

                    <Mail
                      size={16}
                      className="text-[#B12025]"
                    />
                  </div>

                  <p className="mt-2 text-[12px] leading-6">
                    Where is my parcel? I would
                    like an update.
                  </p>
                </div>

                <div className="rounded-[15px] border border-white/30 bg-white/10 p-4">
                  <div className="flex justify-between gap-3">
                    <span className="text-[11px] font-bold">
                      14:00 · Live chat
                    </span>

                    <MessageCircle size={16} />
                  </div>

                  <p className="mt-2 text-[12px] leading-6">
                    Hello, I emailed earlier
                    about my delivery.
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-[11px] font-semibold">
                <CheckCheck size={17} />
                Customer does not need to explain again
              </div>
            </div>

            {/* TONE GUIDE PREVIEW */}

            <div className="mt-4 rounded-[18px] border border-[#B12025]/15 bg-white p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[11px] font-semibold text-[#B12025]">
                  Reply in your tone
                </p>

                <span className="text-[10px] text-[#17191C]/45">
                  {brand.tone}
                </span>
              </div>

              <p className="mt-2 text-[12px] leading-6">
                {brand.answer}
              </p>

              <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#fff2f2] px-3 py-1.5 text-[10px] font-semibold text-[#B12025]">
                <Check size={13} />
                Approved style preview
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          WORKING EXAMPLE CHAT
      ================================================= */}

      <section
        aria-label="Sample customer chat demo"
        className="bg-[#fff8f8] px-5 py-[90px] sm:px-8 lg:px-12"
      >
        <div className="mx-auto grid max-w-[1350px] gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-center lg:gap-20">
          <div>
            <p
              data-cs-reveal
              className={eyebrow}
            >
              Live chat on your website
            </p>

            <h2
              data-cs-title
              className={`mt-5 ${heading}`}
            >
              <AnimatedWords
                text="See the conversation, with the history already there."
              />
            </h2>

            <p
              data-cs-reveal
              className="mt-6 max-w-[480px] text-[14px] leading-8 text-[#17191C]/65"
            >
              Choose a sample customer question
              to preview how a reply appears in a
              shared help desk. This is an
              interactive demonstration, not a
              live support connection.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {questions.map((question, index) => (
                <button
                  key={question}
                  type="button"
                  aria-pressed={
                    sampleQuestion === index
                  }
                  onClick={() =>
                    setSampleQuestion(index)
                  }
                  className={`rounded-full border px-4 py-3 text-left text-[11px] font-semibold transition ${
                    sampleQuestion === index
                      ? 'border-[#B12025] bg-[#B12025] text-white'
                      : 'border-[#B12025]/15 bg-white text-[#B12025] hover:border-[#B12025]'
                  }`}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          <div
            data-cs-reveal
            className="overflow-hidden rounded-[28px] border border-[#B12025]/15 bg-white shadow-[0_18px_60px_rgba(177,32,37,.06)]"
          >
            <div className="flex items-center justify-between bg-[#B12025] px-6 py-5 text-white">
              <div className="flex items-center gap-3">
                <MessageCircle size={20} />

                <span className="text-[13px] font-semibold">
                  Customer chat · Example
                </span>
              </div>

              <span className="text-[10px] text-white/80">
                Demo only
              </span>
            </div>

            <div className="min-h-[270px] space-y-4 p-6 sm:p-8">
              <div className="ml-auto max-w-[80%] rounded-[20px] rounded-br-[5px] bg-[#fff0f0] p-4 text-[13px] leading-7 text-[#17191C]">
                {questions[sampleQuestion]}
              </div>

              <div
                key={`${industryIndex}-${sampleQuestion}`}
                className="mr-auto max-w-[85%] rounded-[20px] rounded-bl-[5px] bg-[#B12025] p-4 text-[13px] leading-7 text-white"
              >
                {sampleQuestion === 0
                  ? brand.answer
                  : sampleQuestion === 1
                  ? 'I can help with that. Please share the relevant account or order reference.'
                  : 'I can check the latest information for you. Please share your reference number.'}
              </div>

              <div className="flex items-center gap-2 text-[11px] text-[#17191C]/45">
                <Check
                  size={14}
                  className="text-[#B12025]"
                />

                Sample answer; not a response-time measurement
              </div>
            </div>

            <div className="flex items-center gap-3 border-t border-[#B12025]/10 px-6 py-4">
              <span className="flex-1 text-[12px] text-[#17191C]/35">
                Conversation preview
              </span>

              <Send
                size={18}
                className="text-[#B12025]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          EIGHT FEATURE CARDS — GSAP SIDE SCROLL
      ================================================= */}

      <section
        ref={featuresSectionRef}
        id="included"
        className="relative scroll-mt-[115px] bg-white py-[85px] lg:flex lg:min-h-[700px] lg:flex-col lg:justify-center lg:py-[85px]"
      >
        <div className="mx-auto w-full max-w-[1450px] px-5 sm:px-8 lg:px-12">
          <p
            data-cs-reveal
            className={eyebrow}
          >
            What the customer service team handles
          </p>

          <h2
            data-cs-title
            className={`mt-5 max-w-[920px] ${heading}`}
          >
            <AnimatedWords
              text="One connected team across every channel."
            />
          </h2>

          <p className="mt-4 max-w-[700px] text-[13px] leading-7 text-[#17191C]/60">
            Eight essentials, from shared inboxes
            and full conversation history to reviewed
            replies and organised hand-offs.
          </p>
        </div>

        <div className="mt-10 w-full overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:overflow-visible">
          <div
            ref={featuresTrackRef}
            className="flex w-max gap-4 pl-5 pr-5 sm:pl-8 sm:pr-8 lg:gap-5 lg:pl-[48px] lg:pr-[48px]"
          >
            {featureData.map(
              (
                { title, body, Icon, detail },
                index
              ) => {
                const red =
                  index === 0 ||
                  index === 4 ||
                  index === 7;

                return (
                  <article
                    key={title}
                    data-cs-card
                    className={`group flex min-h-[410px] w-[min(85vw,395px)] shrink-0 flex-col rounded-[29px] border p-8 sm:w-[430px] sm:p-9 lg:min-h-[430px] lg:w-[460px] ${
                      red
                        ? 'border-[#B12025] bg-[#B12025] text-white'
                        : 'border-[#B12025]/15 bg-[#fff9f9] text-[#17191C]'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <span
                        className={`flex h-[62px] w-[62px] items-center justify-center rounded-[20px] ${
                          red
                            ? 'bg-white/15'
                            : 'bg-white text-[#B12025]'
                        }`}
                      >
                        <Icon
                          size={29}
                          strokeWidth={1.5}
                          className="transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
                        />
                      </span>

                      <span
                        className={`text-[13px] font-bold ${
                          red
                            ? 'text-white/75'
                            : 'text-[#B12025]'
                        }`}
                      >
                        0{index + 1}
                      </span>
                    </div>

                    <div className="mt-auto pt-12">
                      <p
                        className={`mb-4 text-[10px] font-semibold uppercase tracking-[0.15em] ${
                          red
                            ? 'text-white/75'
                            : 'text-[#B12025]'
                        }`}
                      >
                        {detail}
                      </p>

                      <h3
                        data-cs-card-text
                        className="text-[28px] font-semibold leading-[1.17] tracking-[-0.04em]"
                      >
                        {title}
                      </h3>

                      <p
                        data-cs-card-text
                        className={`mt-5 text-[13px] leading-[1.85] ${
                          red
                            ? 'text-white/90'
                            : 'text-[#17191C]/70'
                        }`}
                      >
                        {body}
                      </p>
                    </div>
                  </article>
                );
              }
            )}
          </div>
        </div>

        <div className="mx-auto mt-8 w-full max-w-[1450px] px-5 sm:px-8 lg:px-12">
          <div className="hidden h-[3px] overflow-hidden rounded-full bg-[#B12025]/10 lg:block">
            <div
              className="h-full bg-[#B12025]"
              style={{
                width: `${Math.max(
                  2,
                  featureProgress * 100
                )}%`,
              }}
            />
          </div>

          <p className="text-[11px] text-[#B12025] lg:hidden">
            Swipe to explore all eight features →
          </p>
        </div>
      </section>

      {/* =================================================
          CUSTOMER TIMELINE + HAND-OFF
      ================================================= */}

      <section
        id="history"
        className="bg-[#fff8f8] px-5 py-[95px] sm:px-8 lg:px-12 lg:py-[130px]"
      >
        <div className="mx-auto grid max-w-[1350px] gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
          <div>
            <p
              data-cs-reveal
              className={eyebrow}
            >
              Full history before each reply
            </p>

            <h2
              data-cs-title
              className={`mt-5 ${heading}`}
            >
              <AnimatedWords
                text="From first email to final hand-off. All in one thread."
              />
            </h2>

            <p
              data-cs-reveal
              className="mt-6 max-w-[495px] text-[14px] leading-8 text-[#17191C]/65"
            >
              Agents see the previous conversation
              before they reply. When your own staff
              need to take over, the case moves
              with a summary of what has already
              been said.
            </p>

            <button
              type="button"
              onClick={() =>
                setHandoff((previous) => !previous)
              }
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#B12025] px-6 py-3.5 text-[12px] font-semibold text-white transition hover:bg-[#971b20]"
            >
              {handoff
                ? 'Reset hand-off'
                : 'Preview the hand-off'}

              <ArrowRight size={17} />
            </button>
          </div>

          <div
            data-cs-reveal
            className="rounded-[27px] border border-[#B12025]/15 bg-white p-6 sm:p-9"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B12025]">
              Customer journey · Example
            </p>

            <div className="relative mt-8 space-y-7 border-l-2 border-[#B12025]/20 pl-7">
              {[
                {
                  time: '09:00',
                  title: 'Email arrives',
                  copy: 'Customer asks about an order.',
                  Icon: Mail,
                },
                {
                  time: '14:00',
                  title: 'Live chat begins',
                  copy:
                    'The agent sees the earlier email.',
                  Icon: MessageCircle,
                },
                {
                  time: '14:10',
                  title: 'Call notes are available',
                  copy:
                    'The customer history stays together.',
                  Icon: PhoneCall,
                },
              ].map((item) => {
                const Icon = item.Icon;

                return (
                  <div
                    key={item.title}
                    className="relative"
                  >
                    <span className="absolute -left-[41px] flex h-7 w-7 items-center justify-center rounded-full bg-[#B12025] text-white">
                      <Icon size={13} />
                    </span>

                    <span className="text-[10px] font-semibold text-[#B12025]">
                      {item.time}
                    </span>

                    <h3 className="mt-1 text-[17px] font-semibold">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-[12px] leading-6 text-[#17191C]/60">
                      {item.copy}
                    </p>
                  </div>
                );
              })}
            </div>

            <div
              className={`mt-9 rounded-[19px] border p-5 transition-all duration-500 ${
                handoff
                  ? 'translate-x-2 border-[#B12025] bg-[#B12025] text-white'
                  : 'border-[#B12025]/20 bg-[#fff7f7]'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-[12px] font-semibold">
                  {handoff
                    ? 'Assigned to your staff'
                    : 'FirstNotch agent'}
                </span>

                <span className="text-[10px] font-semibold">
                  {handoff
                    ? 'Hand-off complete'
                    : 'Ready for hand-off'}
                </span>
              </div>

              <p
                className={`mt-3 text-[12px] leading-7 ${
                  handoff
                    ? 'text-white/90'
                    : 'text-[#17191C]/65'
                }`}
              >
                Summary note: Customer asked
                about a delivery and followed up
                by chat. Previous conversation is
                attached.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          HELP DESK TOOL PREVIEW + TONE EDITOR
      ================================================= */}

      <section className="bg-white px-5 py-[95px] sm:px-8 lg:px-12 lg:py-[125px]">
        <div className="mx-auto max-w-[1350px]">
          <p
            data-cs-reveal
            className={eyebrow}
          >
            Inside your help desk
          </p>

          <h2
            data-cs-title
            className={`mt-5 max-w-[920px] ${heading}`}
          >
            <AnimatedWords
              text="The tools you use. The tone you approve."
            />
          </h2>

          <div
            role="group"
            aria-label="Choose a help desk preview"
            className="mt-10 flex flex-wrap gap-2"
          >
            {helpdeskTools.map((tool, index) => (
              <button
                key={tool}
                type="button"
                aria-pressed={
                  chosenTool === index
                }
                onClick={() =>
                  setChosenTool(index)
                }
                className={`rounded-full border px-5 py-3 text-[12px] font-semibold transition ${
                  chosenTool === index
                    ? 'border-[#B12025] bg-[#B12025] text-white'
                    : 'border-[#B12025]/15 bg-white text-[#B12025] hover:border-[#B12025]'
                }`}
              >
                {tool}
              </button>
            ))}
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            {/* GENERIC HELP DESK UI */}

            <div className="rounded-[25px] border border-[#B12025]/15 bg-[#fff9f9] p-7 sm:p-9">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-semibold">
                  {helpdeskTools[chosenTool]} · Generic help desk preview
                </span>

                <Inbox
                  size={22}
                  className="text-[#B12025]"
                />
              </div>

              <div className="mt-7 space-y-3">
                {[
                  'Email · Order question',
                  'Chat · Delivery update',
                  'Social · Account change',
                ].map((row, index) => (
                  <div
                    key={row}
                    className={`flex items-center justify-between rounded-[15px] border p-4 text-[12px] ${
                      index === chosenTool % 3
                        ? 'border-[#B12025] bg-white'
                        : 'border-[#B12025]/10 bg-white/70'
                    }`}
                  >
                    <span>{row}</span>

                    <ArrowUpRight
                      size={16}
                      className="text-[#B12025]"
                    />
                  </div>
                ))}
              </div>

              <p className="mt-6 text-[11px] leading-6 text-[#17191C]/55">
                Illustrative layout only.
                This does not reproduce a
                vendor interface.
              </p>
            </div>

            {/* TONE GUIDE EDITOR */}

            <div className="rounded-[25px] bg-[#B12025] p-7 text-white sm:p-9">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
                Replies written in your style
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[16px] bg-white/10 p-5">
                  <p className="text-[10px] font-semibold text-white/75">
                    Plain draft · Example
                  </p>

                  <p className="mt-4 text-[13px] leading-7">
                    Got your message. Send order
                    number. We can check.
                  </p>
                </div>

                <div className="rounded-[16px] bg-white p-5 text-[#17191C]">
                  <p className="text-[10px] font-semibold text-[#B12025]">
                    In your tone · Example
                  </p>

                  <p className="mt-4 text-[13px] leading-7">
                    Thanks for getting in touch.
                    Please share your order number
                    and we’ll check the details
                    for you.
                  </p>

                  <span className="mt-4 inline-flex items-center gap-2 text-[10px] font-semibold text-[#B12025]">
                    <CheckCheck size={15} />
                    Spelling and accuracy checked
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          REPORTING + METRICS
      ================================================= */}

      <section
        id="reporting"
        className="bg-[#fff8f8] px-5 py-[95px] sm:px-8 lg:px-12 lg:py-[130px]"
      >
        <div className="mx-auto max-w-[1350px]">
          <p
            data-cs-reveal
            className={eyebrow}
          >
            The numbers you will see
          </p>

          <h2
            data-cs-title
            className={`mt-5 ${heading}`}
          >
            <AnimatedWords
              text="Each channel measured on its own."
            />
          </h2>

          <p
            data-cs-reveal
            className="mt-6 max-w-[760px] text-[14px] leading-8 text-[#17191C]/65"
          >
            Each channel is measured on its own,
            so slow email replies are not hidden
            by fast chat replies. The figures
            below come from your help desk,
            in a monthly report.
          </p>

          {/* FIVE METRICS */}

          <div className="mt-11 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {metricData.map((item, index) => (
              <article
                data-cs-reveal
                key={item.title}
                className={`flex min-h-[267px] flex-col rounded-[25px] border p-7 ${
                  index === 0
                    ? 'border-[#B12025] bg-[#B12025] text-white'
                    : 'border-[#B12025]/15 bg-white'
                }`}
              >
                <p
                  className={`text-[44px] font-bold leading-none ${
                    index === 0
                      ? 'text-white/40'
                      : 'text-[#B12025]/20'
                  }`}
                >
                  0{index + 1}
                </p>

                <h3 className="mt-5 text-[20px] font-semibold">
                  {item.title}
                </h3>

                <p
                  className={`mt-3 text-[12px] leading-7 ${
                    index === 0
                      ? 'text-white/85'
                      : 'text-[#17191C]/65'
                  }`}
                >
                  {item.description}
                </p>

                <p
                  className={`mt-auto border-t pt-4 text-[11px] font-semibold ${
                    index === 0
                      ? 'border-white/20 text-white'
                      : 'border-[#B12025]/15 text-[#B12025]'
                  }`}
                >
                  {item.note}
                </p>
              </article>
            ))}
          </div>

          {/* PER-CHANNEL SCOREBOARD */}

          <div className="mt-5 rounded-[26px] border border-[#B12025]/15 bg-white p-6 sm:p-9">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h3 className="text-[20px] font-semibold">
                Per-channel scoreboard
              </h3>

              <span className="rounded-full bg-[#fff0f0] px-3 py-2 text-[10px] font-semibold text-[#B12025]">
                Example layout · No actual results
              </span>
            </div>

            <div className="mt-7 overflow-x-auto">
              <table className="w-full min-w-[590px] border-collapse text-left text-[12px]">
                <thead>
                  <tr className="border-b border-[#B12025]/15 text-[#B12025]">
                    <th className="p-3">Channel</th>
                    <th className="p-3">First reply</th>
                    <th className="p-3">Resolution</th>
                    <th className="p-3">Satisfaction</th>
                    <th className="p-3">Quality</th>
                  </tr>
                </thead>

                <tbody>
                  {['Email', 'Chat', 'Phone'].map(
                    (item) => (
                      <tr
                        key={item}
                        className="border-b border-[#B12025]/10"
                      >
                        <th className="p-3 font-semibold">
                          {item}
                        </th>

                        <td className="p-3">
                          Target agreed
                        </td>

                        <td className="p-3">
                          Tracked
                        </td>

                        <td className="p-3">
                          Reported
                        </td>

                        <td className="p-3">
                          Reviewed
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* REPEAT CONTACT TREND + HIRING */}

          <div className="mt-5 grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
            <div className="rounded-[26px] border border-[#B12025]/15 bg-white p-7 sm:p-9">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-[19px] font-semibold">
                  Repeat contact trend
                </h3>

                <span className="text-[10px] text-[#B12025]">
                  Illustrative direction — not actual data
                </span>
              </div>

              <svg
                viewBox="0 0 620 185"
                role="img"
                aria-label="Illustrative falling repeat-contact trend line"
                className="mt-7 w-full"
              >
                <path
                  d="M 0 155 H 620 M 0 98 H 620 M 0 41 H 620"
                  fill="none"
                  stroke="#B12025"
                  strokeOpacity=".11"
                  strokeWidth="1.5"
                />

                <path
                  d="M 12 33 C 80 24 102 58 162 70 S 263 85 323 110 S 441 123 500 143 S 578 151 612 158"
                  fill="none"
                  stroke="#B12025"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>

              <p className="mt-3 text-[11px] leading-6 text-[#17191C]/60">
                Repeat contacts are reviewed
                each month to find gaps in
                your help articles.
              </p>
            </div>

            <div className="rounded-[26px] bg-[#B12025] p-7 text-white sm:p-9">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70">
                Hiring checks
              </p>

              <h3 className="mt-3 text-[45px] font-semibold leading-none tracking-[-0.05em]">
                15–20%
              </h3>

              <p className="mt-4 text-[12px] leading-7 text-white/85">
                Of job applicants pass
                the hiring checks.
              </p>

              <div className="mt-6 grid grid-cols-[repeat(20,minmax(0,1fr))] gap-[4px]">
                {Array.from(
                  { length: 100 },
                  (_, index) => (
                    <span
                      key={index}
                      className={`aspect-square rounded-full ${
                        index < 18
                          ? 'bg-white'
                          : 'bg-white/20'
                      }`}
                    />
                  )
                )}
              </div>

              <p className="mt-4 text-[10px] text-white/70">
                Dots illustrate 18 out of 100,
                within the stated 15–20% range.
              </p>
            </div>
          </div>

          {/* COMPANY-PROVIDED FIGURES */}

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {[
              {
                value: '85%',
                text: 'client retention rate',
              },
              {
                value: '98%',
                text: 'accuracy rate',
              },
              {
                value: '15 to 20%',
                text:
                  'of job applicants pass the hiring checks',
              },
            ].map((item) => (
              <div
                data-cs-reveal
                key={item.text}
                className="rounded-[22px] border border-[#B12025]/15 bg-white p-7"
              >
                <p className="text-[clamp(2.3rem,3.4vw,4rem)] font-bold tracking-[-0.05em] text-[#B12025]">
                  {item.value}
                </p>

                <p className="mt-2 text-[12px] text-[#17191C]/65">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCROLL-LINKED QUOTE */}

      <ScrollQuote />

      {/* =================================================
          GSAP HORIZONTAL ONBOARDING CARDS
      ================================================= */}

      <section
        ref={setupSectionRef}
        id="setup"
        className="relative scroll-mt-[110px] bg-white py-[88px] lg:flex lg:min-h-[690px] lg:flex-col lg:justify-center lg:py-[85px]"
      >
        <div className="mx-auto w-full max-w-[1450px] px-5 sm:px-8 lg:px-12">
          <p
            data-cs-reveal
            className={eyebrow}
          >
            How your support team is set up
          </p>

          <h2
            data-cs-title
            className={`mt-5 max-w-[930px] ${heading}`}
          >
            <AnimatedWords
              text="A clear start, then quality you can check."
            />
          </h2>

          <p className="mt-5 max-w-[740px] text-[14px] leading-8 text-[#17191C]/65">
            The biggest risk with outsourced
            support is agents who do not know
            your business. The steps below
            prevent that.
          </p>
        </div>

        <div className="mt-9 w-full overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:overflow-visible">
          <div
            ref={setupTrackRef}
            className="flex w-max gap-4 pl-5 pr-5 sm:pl-8 sm:pr-8 lg:gap-5 lg:pl-[48px] lg:pr-[48px]"
          >
            {setupSteps.map((item, index) => {
              const red =
                index === 1 || index === 3;

              return (
                <article
                  key={item.title}
                  data-cs-card
                  className={`flex min-h-[365px] w-[min(85vw,420px)] shrink-0 flex-col rounded-[29px] border p-8 sm:w-[460px] sm:p-9 lg:min-h-[390px] lg:w-[500px] ${
                    red
                      ? 'border-[#B12025] bg-[#B12025] text-white'
                      : 'border-[#B12025]/15 bg-[#fff9f9]'
                  }`}
                >
                  <span
                    className={`text-[85px] font-bold leading-none tracking-[-0.08em] ${
                      red
                        ? 'text-white/35'
                        : 'text-[#B12025]/20'
                    }`}
                  >
                    0{index + 1}
                  </span>

                  <div className="mt-auto pt-8">
                    <h3
                      data-cs-card-text
                      className="text-[27px] font-semibold tracking-[-0.04em]"
                    >
                      {item.title}
                    </h3>

                    <p
                      data-cs-card-text
                      className={`mt-5 text-[13px] leading-8 ${
                        red
                          ? 'text-white/90'
                          : 'text-[#17191C]/70'
                      }`}
                    >
                      {item.body}
                    </p>

                    <span
                      className={`mt-6 flex h-9 w-9 items-center justify-center rounded-full ${
                        red
                          ? 'bg-white text-[#B12025]'
                          : 'bg-[#B12025] text-white'
                      }`}
                    >
                      <Check size={18} />
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="mx-auto mt-7 w-full max-w-[1450px] px-5 sm:px-8 lg:px-12">
          <div className="hidden h-[3px] overflow-hidden rounded-full bg-[#B12025]/10 lg:block">
            <div
              className="h-full bg-[#B12025]"
              style={{
                width: `${Math.max(
                  2,
                  setupProgress * 100
                )}%`,
              }}
            />
          </div>

          <p className="text-[11px] text-[#B12025] lg:hidden">
            Swipe to see all four steps →
          </p>
        </div>
      </section>

      {/* =================================================
          START WITH ONE CHANNEL + BUSY SEASONS
      ================================================= */}

      <section
        id="channel-picker"
        className="bg-[#fff8f8] px-5 py-[90px] sm:px-8 lg:px-12 lg:py-[120px]"
      >
        <div className="mx-auto grid max-w-[1350px] gap-5 lg:grid-cols-2">
          <div className="rounded-[27px] border border-[#B12025]/15 bg-white p-7 sm:p-10">
            <p className={eyebrow}>
              Start with one channel
            </p>

            <h2 className="mt-4 text-[clamp(2rem,3vw,3.4rem)] font-semibold leading-[1.15] tracking-[-0.05em]">
              Start small. Add more when quality
              meets your target.
            </h2>

            <div className="mt-7 flex flex-wrap gap-2">
              {[
                'Email',
                'Chat',
                'Calls',
                'Social',
              ].map((channel) => (
                <button
                  key={channel}
                  type="button"
                  aria-pressed={
                    channelPick === channel
                  }
                  onClick={() =>
                    setChannelPick(channel)
                  }
                  className={`rounded-full px-5 py-3 text-[12px] font-semibold transition ${
                    channelPick === channel
                      ? 'bg-[#B12025] text-white'
                      : 'border border-[#B12025]/20 text-[#B12025]'
                  }`}
                >
                  {channel}
                </button>
              ))}
            </div>

            <div className="mt-7 rounded-[20px] bg-[#fff4f4] p-5">
              <p className="text-[11px] text-[#17191C]/50">
                Example growth path
              </p>

              <p className="mt-2 text-[14px] font-semibold text-[#B12025]">
                Start with {channelPick.toLowerCase()} → review quality → add another channel
              </p>
            </div>
          </div>

          <div className="rounded-[27px] bg-[#B12025] p-7 text-white sm:p-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/75">
              What happens during busy seasons?
            </p>

            <h3 className="mt-5 text-[clamp(2rem,3vw,3.2rem)] font-semibold leading-[1.15] tracking-[-0.05em]">
              Plan for your peak.
            </h3>

            <p className="mt-5 text-[13px] leading-7 text-white/90">
              Extra agents can be trained ahead
              of known peaks, such as sale
              periods and holidays. A month’s
              notice is enough for most peaks.
            </p>

            <label
              htmlFor="cs-season"
              className="mt-8 block text-[12px] font-semibold"
            >
              Conversation volume: {seasonLabels[seasonLevel]}
            </label>

            <input
              id="cs-season"
              type="range"
              min={0}
              max={3}
              step={1}
              value={seasonLevel}
              onChange={(event) =>
                setSeasonLevel(
                  Number(event.target.value)
                )
              }
              className="mt-4 w-full accent-white"
            />

            <p className="mt-4 text-[11px] text-white/75">
              Team sizing is agreed during
              discovery. This slider does
              not estimate staffing or pricing.
            </p>
          </div>
        </div>
      </section>

      {/* =================================================
          FAQ WITH CATEGORIES
      ================================================= */}

      <section
        id="faq"
        className="bg-white px-5 py-[95px] sm:px-8 lg:px-12 lg:py-[125px]"
      >
        <div className="mx-auto grid max-w-[1350px] gap-12 lg:grid-cols-[.82fr_1.18fr] lg:gap-[72px]">
          <div>
            <p
              data-cs-reveal
              className={eyebrow}
            >
              Common questions
            </p>

            <h2
              data-cs-title
              className={`mt-5 ${heading}`}
            >
              <AnimatedWords
                text="Common questions about outsourced customer service."
              />
            </h2>
          </div>

          <div>
            <div
              role="group"
              aria-label="FAQ categories"
              className="mb-6 flex flex-wrap gap-2"
            >
              {faqCategories.map((category) => (
                <button
                  key={category}
                  type="button"
                  aria-pressed={
                    faqCategory === category
                  }
                  onClick={() => {
                    setFaqCategory(category);
                    setOpenFaq(null);
                  }}
                  className={`rounded-full border px-4 py-3 text-[11px] font-semibold ${
                    faqCategory === category
                      ? 'border-[#B12025] bg-[#B12025] text-white'
                      : 'border-[#B12025]/20 text-[#B12025] hover:bg-[#fff8f8]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {visibleFaqs.map((item) => (
                <div
                  key={item.title}
                  className="overflow-hidden rounded-[20px] border border-[#B12025]/15 bg-[#fff9f9]"
                >
                  <button
                    type="button"
                    aria-expanded={
                      openFaq === item.index
                    }
                    onClick={() =>
                      setOpenFaq(
                        openFaq === item.index
                          ? null
                          : item.index
                      )
                    }
                    className="flex w-full items-start justify-between gap-5 p-6 text-left"
                  >
                    <span className="text-[14px] font-semibold leading-6">
                      {item.title}
                    </span>

                    <ChevronDown
                      size={19}
                      className={`mt-1 shrink-0 text-[#B12025] transition-transform ${
                        openFaq === item.index
                          ? 'rotate-180'
                          : ''
                      }`}
                    />
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ${
                      openFaq === item.index
                        ? 'grid-rows-[1fr]'
                        : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <p className="px-6 pb-6 text-[12px] leading-8 text-[#17191C]/70">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          RELATED CUSTOMER SUPPORT SERVICES
      ================================================= */}

      <section className="bg-[#fff8f8] px-5 py-[90px] sm:px-8 lg:px-12 lg:py-[110px]">
        <div className="mx-auto max-w-[1350px]">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className={eyebrow}>
                Explore further
              </p>

              <h2
                data-cs-title
                className={`mt-4 ${heading}`}
              >
                <AnimatedWords
                  text="Other customer support services"
                />
              </h2>
            </div>

            <Link
              href={ROOT}
              className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#B12025]"
            >
              See all services

              <ArrowUpRight size={17} />
            </Link>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {related.map((item, index) => (
              <Link
                key={item.title}
                href={item.href}
                className="group flex min-h-[116px] items-center justify-between gap-4 rounded-[22px] border border-[#B12025]/15 bg-white p-6 transition hover:border-[#B12025] hover:bg-[#fff2f2]"
              >
                <span className="flex items-center gap-5">
                  <span className="text-[12px] font-bold text-[#B12025]">
                    0{index + 1}
                  </span>

                  <span className="text-[16px] font-semibold">
                    {item.title}
                  </span>
                </span>

                <ArrowUpRight
                  size={20}
                  className="text-[#B12025] transition group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================
          STEP-BY-STEP DISCOVERY CALL BRIEF
      ================================================= */}

      <section className="bg-white px-5 py-[90px] sm:px-8 lg:px-12 lg:py-[110px]">
        <div className="mx-auto grid max-w-[1350px] gap-10 rounded-[30px] border border-[#B12025]/15 bg-[#fff9f9] p-7 sm:p-11 lg:grid-cols-[.8fr_1.2fr] lg:gap-16 lg:p-14">
          <div>
            <p className={eyebrow}>
              Free discovery call
            </p>

            <h2
              data-cs-title
              className={`mt-4 ${heading}`}
            >
              <AnimatedWords
                text="Tell us what you need help with."
              />
            </h2>

            <p className="mt-5 text-[13px] leading-8 text-[#17191C]/65">
              Fill this in to book your free
              discovery call. You'll hear back
              within one working day, with a clear
              answer on how FirstNotch can help.
            </p>
          </div>

          <div className="rounded-[24px] bg-white p-6 sm:p-9">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#B12025]">
                Question {plannerStep + 1} of 3
              </span>

              <span className="text-[10px] text-[#17191C]/50">
                Service brief
              </span>
            </div>

            <div className="mt-4 flex gap-2">
              {[0, 1, 2].map((index) => (
                <span
                  key={index}
                  className={`h-[4px] flex-1 rounded-full ${
                    index <= plannerStep
                      ? 'bg-[#B12025]'
                      : 'bg-[#B12025]/10'
                  }`}
                />
              ))}
            </div>

            <h3 className="mt-8 text-[21px] font-semibold">
              {plannerStep === 0
                ? 'Which channel would you like to start with?'
                : plannerStep === 1
                ? 'When should your team be available?'
                : 'When would you like to start?'}
            </h3>

            <div className="mt-6 flex min-h-[185px] flex-col gap-2">
              {(plannerStep === 0
                ? [
                    'Email',
                    'Chat',
                    'Calls',
                    'Social',
                  ]
                : plannerStep === 1
                ? [
                    'During business hours',
                    'Evenings or weekends',
                    'Both',
                  ]
                : [
                    'As soon as possible',
                    'Within the next month',
                    'In 1 to 3 months',
                    'Just exploring for now',
                  ]
              ).map((option) => {
                const selected =
                  plannerStep === 0
                    ? channelPick === option
                    : plannerStep === 1
                    ? supportHours === option
                    : startTime === option;

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() =>
                      plannerStep === 0
                        ? setChannelPick(option)
                        : plannerStep === 1
                        ? setSupportHours(option)
                        : setStartTime(option)
                    }
                    className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left text-[12px] font-semibold transition ${
                      selected
                        ? 'border-[#B12025] bg-[#fff1f1] text-[#B12025]'
                        : 'border-[#B12025]/15 bg-white'
                    }`}
                  >
                    {option}

                    {selected && (
                      <Check size={16} />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-7 flex justify-between gap-3">
              <button
                type="button"
                disabled={plannerStep === 0}
                onClick={() =>
                  setPlannerStep((previous) =>
                    Math.max(0, previous - 1)
                  )
                }
                className="rounded-full border border-[#B12025]/15 px-5 py-3 text-[12px] font-semibold disabled:opacity-30"
              >
                Back
              </button>

              {plannerStep < 2 ? (
                <button
                  type="button"
                  onClick={() =>
                    setPlannerStep((previous) =>
                      Math.min(2, previous + 1)
                    )
                  }
                  className="inline-flex items-center gap-2 rounded-full bg-[#B12025] px-6 py-3 text-[12px] font-semibold text-white"
                >
                  Next
                  <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={continueToContact}
                  className="inline-flex items-center gap-2 rounded-full bg-[#B12025] px-5 py-3 text-[12px] font-semibold text-white"
                >
                  Continue to contact form
                  <ArrowUpRight size={16} />
                </button>
              )}
            </div>

            <p className="mt-4 text-[10px] leading-6 text-[#17191C]/50">
              This brief does not submit an
              enquiry. Please complete the
              contact form below.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT FORM AND FOOTER ARE IN StoryContact */}

      {showFloatingCTA && (
        <a
          href="#contact"
          className="fixed bottom-5 left-1/2 z-40 inline-flex min-h-[52px] -translate-x-1/2 items-center gap-3 rounded-full bg-[#B12025] px-6 text-[12px] font-semibold text-white shadow-[0_15px_45px_rgba(177,32,37,.22)] sm:bottom-8"
        >
          Book a free discovery call
          <ArrowUpRight size={17} />
        </a>
      )}
    </div>
  );
}
