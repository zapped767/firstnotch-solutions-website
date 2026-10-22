
'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCheck,
  ChevronDown,
  Clock3,
  FileText,
  Headphones,
  Languages,
  Mail,
  MessageCircle,
  Phone,
  PhoneCall,
  PhoneForwarded,
  ShieldCheck,
  UserRound,
  Volume2,
  Search,
  RotateCcw,
  ClipboardCheck,
} from 'lucide-react';

// ======================================================
// INBOUND CALL SUPPORT — FIRSTNOTCH
// Brand: #B12025 / #FFFFFF
// ======================================================

const base = '/services/customer-support-outsourcing';

// ======================================================
// SERVICE FEATURES
// ======================================================

const features = [
  {
    title: "Call answering in your company's name",
    body: 'Agents greet callers by your business name and use the tone of voice you set.',
    Icon: PhoneCall,
    wide: true,
  },
  {
    title: 'Caller history from your CRM',
    body: 'Agents look up callers in your CRM to see past orders, bookings or account details during the call.',
    Icon: UserRound,
  },
  {
    title: 'Answers from your own information',
    body: 'Agents use product and account material you approve, shared in a knowledge base during onboarding.',
    Icon: FileText,
  },
  {
    title: 'Call notes in your system',
    body: 'Each call is logged with a short summary so your staff can see what was discussed.',
    Icon: ClipboardCheck,
  },
  {
    title: 'Clear escalation rules',
    body: 'Calls that require your own team are passed on using rules agreed during setup.',
    Icon: PhoneForwarded,
  },
  {
    title: 'Help at busy times',
    body: 'Route only overflow calls, or arrange support at set times of day.',
    Icon: Clock3,
  },
  {
    title: 'Four languages',
    body: 'Callers can receive support in English, Sinhala, Tamil or Hindi.',
    Icon: Languages,
  },
  {
    title: 'Quality scoring and coaching',
    body: 'Reviewers score calls against your standards, with monthly coaching for each agent.',
    Icon: ShieldCheck,
    wide: true,
  },
];

// ======================================================
// ANIMATED CALL STORY
// ======================================================

const callSteps = [
  {
    label: 'Incoming call',
    description: 'A customer calls the same business number.',
    Icon: Phone,
  },
  {
    label: 'Your-company greeting',
    description: 'An agent answers using your approved greeting.',
    Icon: Headphones,
  },
  {
    label: 'CRM lookup',
    description: 'The caller history appears in your own system.',
    Icon: UserRound,
  },
  {
    label: 'Answer or escalate',
    description: 'Approved answers are given; exceptions follow agreed rules.',
    Icon: PhoneForwarded,
  },
  {
    label: 'Call note saved',
    description: 'The outcome is recorded for your team to review.',
    Icon: ClipboardCheck,
  },
];

// ======================================================
// REPORTING METRICS
// These are targets, NOT live results.
// ======================================================

const kpis = [
  {
    title: 'Answer speed',
    body: 'Share of calls answered within the agreed threshold.',
    value: '80%',
    tag: 'Target: answered within 20 seconds',
    width: '80%',
  },
  {
    title: 'Missed calls',
    body: 'Share of callers who disconnect before an answer.',
    value: '<5%',
    tag: 'Target: under 5%',
    width: '5%',
  },
  {
    title: 'First-call resolution',
    body: 'Requests resolved without a callback or transfer.',
    value: 'Agreed',
    tag: 'Target defined during setup',
    width: null,
  },
  {
    title: 'Caller satisfaction',
    body: 'Post-call customer rating.',
    value: 'Monthly',
    tag: 'Reported each month',
    width: null,
  },
  {
    title: 'Quality score',
    body: 'Adherence to your scripts and standards.',
    value: 'Reviewed',
    tag: 'Monthly coaching and review',
    width: null,
  },
];

// ======================================================
// ONBOARDING PROCESS
// ======================================================

const process = [
  {
    id: '01',
    title: 'Learning your business',
    body: 'The team studies your products, policies, tone of voice and the questions customers ask most.',
  },
  {
    id: '02',
    title: 'Hiring and training',
    body: 'Agents take language tests, technical assessments and reference checks. Only 15 to 20% of applicants pass. Each agent is trained on your scripts and systems.',
  },
  {
    id: '03',
    title: 'Going live with quality checks',
    body: 'Each call and task receives a quality score. Attendance is tracked and agents receive monthly reviews with coaching.',
  },
  {
    id: '04',
    title: 'Reporting and improving',
    body: 'You receive a monthly report on response times, quality scores and common issues, followed by a discussion of what to improve.',
  },
];

// ======================================================
// RELATED SERVICES
// ======================================================

const otherServices = [
  {
    title: 'Outbound call support',
    href: `${base}/outbound-call-support`,
  },
  {
    title: 'Customer service',
    href: `${base}/customer-service`,
  },
  {
    title: 'Customer retention',
    href: `${base}/customer-retention`,
  },
  {
    title: 'Complaint and query handling',
    href: `${base}/complaint-query-handling`,
  },
];

// ======================================================
// FREQUENTLY ASKED QUESTIONS
// ======================================================

const faqs = [
  {
    q: 'How many calls can the team handle?',
    a: 'Team size is planned around your call volume, including busy days and seasons. A typical starting team is two to five agents, and extra agents can be added within two weeks for busy periods.',
  },
  {
    q: 'Can FirstNotch take only our overflow calls?',
    a: 'Yes. You can route calls to FirstNotch when your own staff are busy or at lunch.',
  },
  {
    q: 'Do we need to change our phone system?',
    a: 'No. Calls can be forwarded from your existing number so customers continue dialing the same number.',
  },
  {
    q: 'What happens to calls outside office hours?',
    a: 'The standard office hours are Monday to Friday, 10am to 7pm Sri Lanka time. Outside those hours, calls can go to voicemail for a next-working-day callback, or evening and weekend shifts can be arranged.',
  },
  {
    q: 'How long does setup take?',
    a: 'Most inbound teams are ready to take calls within two to four weeks, including training on products and scripts.',
  },
  {
    q: 'Who can see our customer data?',
    a: 'Access is limited to authorised agents working on your account. Team members are trained in data handling and confidentiality.',
  },
  {
    q: 'How is pricing worked out?',
    a: 'Pricing depends on call volume, coverage hours and whether agents are dedicated or shared. You receive a written quotation after the discovery call.',
  },
];

// ======================================================
// FOUR-LANGUAGE GREETING DEMO
// ======================================================

const greetings = [
  {
    language: 'English',
    text: 'Hello, how can I help you today?',
  },
  {
    language: 'Sinhala',
    text: 'ආයුබෝවන්, අද මම ඔබට උදව් කරන්නේ කෙසේද?',
  },
  {
    language: 'Tamil',
    text: 'வணக்கம், இன்று நான் உங்களுக்கு எப்படி உதவலாம்?',
  },
  {
    language: 'Hindi',
    text: 'नमस्ते, आज मैं आपकी कैसे मदद कर सकता हूँ?',
  },
];

// ======================================================
// LIVE CLOCK HELPERS
// ======================================================

function formatTime(date: Date | null, timeZone?: string) {
  if (!date) return '--:--';

  return new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone,
  }).format(date);
}

function regularOfficeHours(date: Date | null) {
  if (!date) return null;

  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Colombo',
    weekday: 'short',
    hour: '2-digit',
    hourCycle: 'h23',
  });

  const parts = formatter.formatToParts(date);

  const day =
    parts.find((x) => x.type === 'weekday')?.value || '';

  const hour = Number(
    parts.find((x) => x.type === 'hour')?.value || '0'
  );

  return (
    !['Sat', 'Sun'].includes(day) &&
    hour >= 10 &&
    hour < 19
  );
}

// ======================================================
// MAIN COMPONENT
// ======================================================

export default function InboundCallSupportPage() {
  const rootRef = useRef<HTMLDivElement>(null);

  const [now, setNow] = useState<Date | null>(null);
  const [phase, setPhase] = useState(0);
  const [language, setLanguage] = useState(0);
  const [overflowOnly, setOverflowOnly] = useState(true);
  const [slider, setSlider] = useState(0);
  const [faqQuery, setFaqQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [stickyCTA, setStickyCTA] = useState(false);
  const [callStep, setCallStep] = useState(0);

  // ====================================================
  // UPDATE LOCAL AND COLOMBO CLOCKS
  // ====================================================

  useEffect(() => {
    setNow(new Date());

    const clock = window.setInterval(() => {
      setNow(new Date());
    }, 60000);

    return () => window.clearInterval(clock);
  }, []);

  // ====================================================
  // AUTOMATIC CALL SIMULATION
  // ====================================================

  useEffect(() => {
    const reduce = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );

    if (reduce.matches) return;

    const cycle = window.setInterval(() => {
      setPhase((prev) => (prev + 1) % 5);
    }, 1500);

    return () => window.clearInterval(cycle);
  }, []);

  // ====================================================
  // STICKY CTA
  // Visible after hero, hidden at booking form.
  // ====================================================

  useEffect(() => {
    const root = rootRef.current;

    const hero = root?.querySelector(
      '[data-inbound-hero]'
    );

    const contact = document.getElementById('contact');

    if (!hero || !contact) return;

    let inHero = true;
    let inContact = false;

    const update = () => {
      setStickyCTA(!inHero && !inContact);
    };

    const h = new IntersectionObserver(
      ([entry]) => {
        inHero = entry.isIntersecting;
        update();
      },
      { threshold: 0 }
    );

    const c = new IntersectionObserver(
      ([entry]) => {
        inContact = entry.isIntersecting;
        update();
      },
      { threshold: 0.01 }
    );

    h.observe(hero);
    c.observe(contact);

    return () => {
      h.disconnect();
      c.disconnect();
    };
  }, []);

  // ====================================================
  // GSAP + SCROLLTRIGGER ANIMATIONS
  // ====================================================

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      mm.add(
        '(prefers-reduced-motion: no-preference)',
        () => {
          // HERO TEXT REVEAL
          gsap.from('[data-inbound-line]', {
            yPercent: 105,
            opacity: 0,
            stagger: 0.15,
            duration: 0.95,
            ease: 'power3.out',
            delay: 0.1,
          });

          // GENERAL SECTION REVEALS
          gsap.utils
            .toArray<HTMLElement>(
              '[data-inbound-reveal]'
            )
            .forEach((el) => {
              gsap.from(el, {
                y: 35,
                opacity: 0,
                duration: 0.85,
                ease: 'power3.out',

                scrollTrigger: {
                  trigger: el,
                  start: 'top 92%',
                  once: true,
                },
              });
            });

          // COUNT-UP STATISTICS
          gsap.utils
            .toArray<HTMLElement>(
              '[data-inbound-count]'
            )
            .forEach((el) => {
              const target = Number(el.dataset.to);
              const count = { value: 0 };

              gsap.to(count, {
                value: target,
                duration: 1.7,
                ease: 'power2.out',

                scrollTrigger: {
                  trigger: el,
                  start: 'top 93%',
                  once: true,
                },

                onUpdate: () => {
                  el.textContent =
                    `${Math.round(count.value)}%`;
                },
              });
            });

          // WAVEFORM PARALLAX
          gsap.to('[data-inbound-wave]', {
            y: -16,

            scrollTrigger: {
              trigger: '[data-inbound-hero]',
              start: 'top top',
              end: 'bottom top',
              scrub: 1,
            },
          });

          // CALL TIMELINE STEP ACTIVATION
          gsap.utils
            .toArray<HTMLElement>(
              '[data-inbound-call-step]'
            )
            .forEach((el, index) => {
              ScrollTrigger.create({
                trigger: el,
                start: 'top 62%',
                end: 'bottom 38%',

                onEnter: () => setCallStep(index),
                onEnterBack: () => setCallStep(index),
              });
            });
        }
      );

      // DESKTOP HORIZONTAL PROCESS SCROLL
      mm.add(
        '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
        () => {
          const section =
            root.querySelector<HTMLElement>(
              '[data-inbound-process]'
            );

          const view =
            root.querySelector<HTMLElement>(
              '[data-inbound-process-view]'
            );

          const track =
            root.querySelector<HTMLElement>(
              '[data-inbound-process-track]'
            );

          const progress =
            root.querySelector<HTMLElement>(
              '[data-inbound-process-progress]'
            );

          if (!section || !view || !track) return;

          const travel = () =>
            Math.max(
              0,
              track.scrollWidth - view.clientWidth
            );

          gsap.to(track, {
            x: () => -travel(),
            ease: 'none',

            scrollTrigger: {
              trigger: section,
              start: 'top top+=104',
              end: () =>
                `+=${Math.max(travel(), 1)}`,

              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,

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
      );
    }, root);

    let alive = true;

    // Recalculate pinned positions after fonts load.
    document.fonts?.ready.then(() => {
      if (alive) ScrollTrigger.refresh();
    });

    return () => {
      alive = false;
      mm.revert();
      ctx.revert();
    };
  }, []);

  // ====================================================
  // SLIDE TO BOOK
  // ====================================================

  const goToContact = () => {
    const reduce = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    document.getElementById('contact')?.scrollIntoView({
      behavior: reduce ? 'auto' : 'smooth',
      block: 'start',
    });

    setSlider(0);
  };

  // ====================================================
  // FAQ SEARCH FILTER
  // ====================================================

  const shownFaqs = faqs
    .map((f, index) => ({ ...f, index }))
    .filter((f) =>
      `${f.q} ${f.a}`
        .toLowerCase()
        .includes(faqQuery.toLowerCase().trim())
    );

  const isOfficeHours = regularOfficeHours(now);

  return (
    <div
      ref={rootRef}
      className="bg-white text-[#17191C]"
    >

      {/* =================================================
          SECTION 01 — HERO
      ================================================= */}

      <section
        data-inbound-hero
        className="
          relative isolate overflow-hidden
          px-5 pb-20 pt-[145px]
          sm:px-8
          lg:px-14 lg:pb-28 lg:pt-[165px]
        "
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute
            right-0 top-0 -z-10
            h-[600px] w-[560px]
            rounded-full
            bg-[#B12025]/[0.055]
            blur-[105px]
          "
        />

        <div className="
          mx-auto grid max-w-[1400px]
          items-center gap-14
          lg:grid-cols-[1.05fr_.95fr]
        ">

          {/* HERO TEXT */}
          <div>
            <p className="
              mb-6 text-[11px] font-semibold
              uppercase tracking-[0.19em]
              text-[#B12025]
            ">
              Inbound call center services in Sri Lanka
            </p>

            <h1 className="
              text-[clamp(2.65rem,5.2vw,5.4rem)]
              font-semibold leading-[1.08]
              tracking-[-0.06em]
            ">
              <span className="block overflow-hidden">
                <span data-inbound-line className="block">
                  Shorter waits and
                </span>
              </span>

              <span className="block overflow-hidden">
                <span
                  data-inbound-line
                  className="block text-[#B12025]"
                >
                  accurate answers
                </span>
              </span>

              <span className="block overflow-hidden">
                <span data-inbound-line className="block">
                  for the people who call you.
                </span>
              </span>
            </h1>

            <p className="
              mt-8 max-w-[650px]
              text-[14px] font-light
              leading-[1.95]
              text-[#17191C]/65
              sm:text-[15px]
            ">
              FirstNotch agents answer your incoming calls
              as part of your team. They work in your
              customer records system (CRM) and follow
              your scripts. Businesses use the service for
              product questions, orders, bookings, account
              queries and the calls their own staff do not
              have time to answer.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="
                  inline-flex items-center gap-2
                  rounded-full bg-[#B12025]
                  px-6 py-4 text-[12px]
                  font-semibold text-white
                  transition-colors hover:bg-[#941B20]
                "
              >
                Book a free discovery call
                <ArrowUpRight size={17} />
              </a>

              <a
                href="#included"
                className="
                  inline-flex items-center gap-2
                  rounded-full border
                  border-[#B12025]/20
                  px-6 py-4 text-[12px]
                  font-semibold text-[#B12025]
                  transition-colors
                  hover:bg-[#B12025]/5
                "
              >
                See what is included
                <ArrowDown size={16} />
              </a>
            </div>

            {/* LOCAL + COLOMBO CLOCKS */}
            <div className="
              mt-10 grid max-w-[510px]
              grid-cols-2 gap-3
            ">
              <div className="
                rounded-2xl border
                border-[#B12025]/10
                bg-white p-4
              ">
                <p className="text-[10px] text-[#17191C]/50">
                  Your local time
                </p>
                <p className="
                  mt-1 text-[22px]
                  font-semibold tabular-nums
                ">
                  {formatTime(now)}
                </p>
              </div>

              <div className="
                rounded-2xl border
                border-[#B12025]/10
                bg-white p-4
              ">
                <p className="text-[10px] text-[#17191C]/50">
                  Colombo time
                </p>
                <p className="
                  mt-1 text-[22px]
                  font-semibold tabular-nums
                ">
                  {formatTime(now, 'Asia/Colombo')}
                </p>

                <p className="mt-1 text-[10px] text-[#B12025]">
                  {isOfficeHours === null
                    ? 'Checking office hours'
                    : isOfficeHours
                      ? 'Within standard office hours'
                      : 'Outside standard office hours'}
                </p>
              </div>
            </div>
          </div>

          {/* HERO CALL SIMULATOR */}
          <div
            data-inbound-wave
            className="
              relative mx-auto w-full
              max-w-[550px]
            "
          >
            <div className="
              overflow-hidden rounded-[30px]
              border border-[#B12025]/15
              bg-white
              shadow-[0_35px_90px_rgba(23,25,28,0.12)]
            ">
              <div className="
                flex items-center justify-between
                bg-[#B12025] px-6 py-5 text-white
              ">
                <span className="
                  flex items-center gap-2
                  text-[13px] font-semibold
                ">
                  <PhoneCall size={18} />
                  Inbound call preview
                </span>

                <span className="
                  rounded-full border
                  border-white/30
                  px-3 py-1 text-[10px]
                ">
                  Illustrative demo
                </span>
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-4">
                  <div className="
                    flex h-14 w-14 shrink-0
                    items-center justify-center
                    rounded-full bg-[#B12025]/10
                    text-[#B12025]
                  ">
                    <UserRound size={26} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[15px] font-semibold">
                      Demo caller · Morgan P.
                    </p>
                    <p className="
                      mt-1 text-[11px]
                      text-[#17191C]/50
                    ">
                      Existing customer · Example CRM record
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-[10px] text-[#17191C]/45">
                      Scenario
                    </p>
                    <p className="
                      mt-1 text-[12px]
                      font-semibold text-[#B12025]
                    ">
                      14 sec answer
                    </p>
                  </div>
                </div>

                {/* ANIMATED WAVEFORM */}
                <div className="
                  mt-7 flex h-16
                  items-center justify-center gap-1
                  rounded-2xl bg-[#B12025]/[0.055]
                ">
                  {Array.from({ length: 25 }, (_, i) => (
                    <span
                      key={i}
                      className={`
                        w-[3px] rounded-full
                        bg-[#B12025]
                        transition-[height,opacity]
                        duration-500
                        ${
                          phase > 0
                            ? 'opacity-90'
                            : 'opacity-40'
                        }
                      `}
                      style={{
                        height: `${
                          9 + ((i * 13 + phase * 17) % 36)
                        }px`,
                      }}
                    />
                  ))}
                </div>

                {/* CALL WORKFLOW */}
                <div className="mt-7 space-y-2">
                  {[
                    'Call received',
                    'Answered in your company name',
                    'Customer history loaded',
                    'Question answered',
                    'Call note saved',
                  ].map((label, index) => (
                    <div
                      key={label}
                      className={`
                        flex items-center gap-3
                        rounded-xl px-4 py-3
                        transition-colors duration-500
                        ${
                          index <= phase
                            ? 'bg-[#B12025]/[0.065]'
                            : 'bg-[#F8F7F7]'
                        }
                      `}
                    >
                      <span
                        className={`
                          flex h-7 w-7 items-center
                          justify-center rounded-full
                          text-[10px]
                          ${
                            index <= phase
                              ? 'bg-[#B12025] text-white'
                              : 'bg-white text-[#17191C]/40'
                          }
                        `}
                      >
                        {index < phase ? (
                          <Check size={14} />
                        ) : (
                          `0${index + 1}`
                        )}
                      </span>

                      <span className="text-[11px] font-medium">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setPhase(0)}
                  className="
                    mt-5 inline-flex items-center
                    gap-2 text-[11px]
                    font-semibold text-[#B12025]
                  "
                >
                  <RotateCcw size={14} />
                  Replay example
                </button>
              </div>
            </div>

            {/* SLIDE TO BOOK */}
            <div className="
              mt-5 rounded-2xl border
              border-[#B12025]/15
              bg-white p-4
            ">
              <label
                htmlFor="inbound-pickup"
                className="block text-[11px] font-semibold"
              >
                Slide to discuss your own call setup →
              </label>

              <input
                id="inbound-pickup"
                type="range"
                min={0}
                max={100}
                value={slider}
                onChange={(e) =>
                  setSlider(Number(e.target.value))
                }
                onPointerUp={(e) => {
                  if (
                    Number(e.currentTarget.value) >= 80
                  ) {
                    goToContact();
                  } else {
                    setSlider(0);
                  }
                }}
                onKeyUp={(e) => {
                  if (
                    e.key === 'Enter' &&
                    slider >= 80
                  ) {
                    goToContact();
                  }
                }}
                className="
                  mt-3 w-full cursor-pointer
                  accent-[#B12025]
                "
              />

              <p className="
                mt-1 text-[10px]
                text-[#17191C]/50
              ">
                Drag to 80% or use the booking button above.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          SECTION 02 — EIGHT BENTO FEATURES
      ================================================= */}

      <section
        id="included"
        className="
          scroll-mt-28 bg-[#F9F8F8]
          px-5 py-20
          sm:px-8
          lg:px-14 lg:py-28
        "
      >
        <div className="mx-auto max-w-[1400px]">
          <p
            data-inbound-reveal
            className="
              text-[11px] font-semibold uppercase
              tracking-[0.2em] text-[#B12025]
            "
          >
            The service, clearly defined
          </p>

          <h2
            data-inbound-reveal
            className="
              mt-4 max-w-[850px]
              text-[clamp(2.4rem,4.7vw,4.8rem)]
              font-semibold leading-[1.12]
              tracking-[-0.055em]
            "
          >
            What inbound call support includes
            <span className="text-[#B12025]">.</span>
          </h2>

          <div className="
            mt-12 grid gap-4
            md:grid-cols-2
            lg:grid-cols-4
          ">
            {features.map(
              ({ Icon, ...feature }, index) => (
                <article
                  data-inbound-reveal
                  key={feature.title}
                  className={`
                    group rounded-[24px]
                    border border-[#17191C]/10
                    bg-white p-6
                    transition-[transform,box-shadow]
                    duration-300
                    hover:-translate-y-1.5
                    hover:shadow-[0_18px_40px_rgba(177,32,37,0.08)]
                    ${
                      feature.wide
                        ? 'lg:col-span-2'
                        : ''
                    }
                  `}
                >
                  <div className="
                    flex items-start justify-between
                  ">
                    <span className="
                      flex h-12 w-12 items-center
                      justify-center rounded-2xl
                      bg-[#B12025]/[0.08]
                      text-[#B12025]
                    ">
                      <Icon
                        size={23}
                        strokeWidth={1.7}
                      />
                    </span>

                    <span className="
                      text-[11px] font-semibold
                      text-[#17191C]/30
                    ">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="
                    mt-9 text-[19px]
                    font-semibold leading-snug
                    tracking-[-0.035em]
                  ">
                    {feature.title}
                  </h3>

                  <p className="
                    mt-4 text-[12px]
                    font-light leading-[1.85]
                    text-[#17191C]/60
                  ">
                    {feature.body}
                  </p>
                </article>
              )
            )}
          </div>

          {/* INTERACTIVE DEMOS */}
          <div className="mt-5 grid gap-5 lg:grid-cols-2">

            {/* LANGUAGE SWITCHER */}
            <div className="
              rounded-[26px]
              bg-[#B12025]
              p-7 text-white sm:p-9
            ">
              <div className="
                flex items-center justify-between gap-3
              ">
                <h3 className="text-[20px] font-semibold">
                  Four languages. One standard.
                </h3>
                <Languages size={25} />
              </div>

              <div className="mt-7 flex flex-wrap gap-2">
                {greetings.map((g, index) => (
                  <button
                    type="button"
                    key={g.language}
                    onClick={() => setLanguage(index)}
                    aria-pressed={language === index}
                    className={`
                      rounded-full px-4 py-2
                      text-[11px] font-semibold
                      transition-colors
                      ${
                        language === index
                          ? 'bg-white text-[#B12025]'
                          : 'border border-white/30 text-white hover:bg-white/10'
                      }
                    `}
                  >
                    {g.language}
                  </button>
                ))}
              </div>

              <div
                aria-live="polite"
                className="
                  mt-6 min-h-[100px]
                  rounded-2xl border border-white/25
                  bg-white/10 p-5
                "
              >
                <p className="text-[10px] text-white/70">
                  Illustrative greeting ·{' '}
                  {greetings[language].language}
                </p>
                <p className="
                  mt-3 text-[17px]
                  font-medium leading-relaxed
                ">
                  {greetings[language].text}
                </p>
              </div>
            </div>

            {/* OVERFLOW ROUTING */}
            <div className="
              rounded-[26px] border
              border-[#B12025]/15
              bg-white p-7 sm:p-9
            ">
              <div className="
                flex items-start justify-between gap-4
              ">
                <div>
                  <h3 className="text-[20px] font-semibold">
                    Overflow routing
                  </h3>
                  <p className="
                    mt-2 text-[12px]
                    text-[#17191C]/55
                  ">
                    Try the optional coverage modes.
                  </p>
                </div>

                <PhoneForwarded
                  size={25}
                  className="text-[#B12025]"
                />
              </div>

              <label className="
                mt-7 flex cursor-pointer
                items-center justify-between gap-4
                rounded-xl bg-[#FAF7F7] p-4
                text-[12px] font-semibold
              ">
                <span>
                  Only when my lines are busy
                </span>

                <input
                  type="checkbox"
                  checked={overflowOnly}
                  onChange={(e) =>
                    setOverflowOnly(e.target.checked)
                  }
                  className="
                    h-5 w-5 accent-[#B12025]
                  "
                />
              </label>

              <div
                aria-live="polite"
                className="
                  mt-5 flex flex-wrap
                  items-center justify-between gap-3
                  rounded-xl border
                  border-[#B12025]/15 p-4
                  text-[12px]
                "
              >
                <span>Your existing number</span>

                <ArrowRight
                  size={18}
                  className="text-[#B12025]"
                />

                <span className="
                  font-semibold text-[#B12025]
                ">
                  {overflowOnly
                    ? 'Overflow → FirstNotch'
                    : 'Scheduled → FirstNotch'}
                </span>
              </div>

              <p className="
                mt-5 text-[11px] leading-6
                text-[#17191C]/50
              ">
                Routing is configured with your existing
                phone provider during setup.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          SECTION 03 — SCROLL-DRIVEN CALL STORY
      ================================================= */}

      <section className="
        px-5 py-20
        sm:px-8
        lg:px-14 lg:py-28
      ">
        <div className="mx-auto max-w-[1300px]">
          <p
            data-inbound-reveal
            className="
              text-[11px] font-semibold uppercase
              tracking-[0.2em] text-[#B12025]
            "
          >
            One call, properly handled
          </p>

          <h2
            data-inbound-reveal
            className="
              mt-4 max-w-[850px]
              text-[clamp(2.3rem,4.6vw,4.6rem)]
              font-semibold leading-[1.12]
              tracking-[-0.055em]
            "
          >
            From the first ring to a saved resolution.
          </h2>

          <div className="
            mt-14 grid items-start gap-10
            lg:grid-cols-[0.9fr_1.1fr]
            lg:gap-20
          ">

            {/* STICKY DESKTOP STATUS PANEL */}
            <div className="
              sticky top-[115px]
              hidden rounded-[28px]
              bg-[#B12025]
              p-9 text-white
              lg:block
            ">
              <div className="
                flex items-center justify-between
              ">
                <span className="
                  text-[11px] uppercase
                  tracking-[0.2em] text-white/70
                ">
                  Example call timeline
                </span>
                <Volume2 size={22} />
              </div>

              <p className="
                mt-10 text-[68px]
                font-semibold leading-none
                tracking-[-0.065em]
              ">
                0{callStep + 1}
                <span className="text-white/40">/05</span>
              </p>

              <h3 className="
                mt-7 text-[28px]
                font-semibold tracking-[-0.04em]
              ">
                {callSteps[callStep].label}
              </h3>

              <p className="
                mt-4 min-h-[65px]
                text-[14px] leading-7
                text-white/80
              ">
                {callSteps[callStep].description}
              </p>

              <div className="mt-9 flex gap-2">
                {callSteps.map((step, i) => (
                  <span
                    key={step.label}
                    className={`
                      h-[3px] flex-1 rounded-full
                      ${
                        i <= callStep
                          ? 'bg-white'
                          : 'bg-white/25'
                      }
                    `}
                  />
                ))}
              </div>
            </div>

            {/* SCROLLING TIMELINE */}
            <div className="space-y-5">
              {callSteps.map(
                ({ Icon, ...step }, index) => (
                  <article
                    data-inbound-call-step
                    data-inbound-reveal
                    key={step.label}
                    className="
                      flex min-h-[190px]
                      items-start gap-5
                      rounded-[22px]
                      border border-[#17191C]/10
                      bg-white p-7
                      shadow-[0_8px_32px_rgba(23,25,28,0.04)]
                      sm:p-9
                    "
                  >
                    <span className="
                      flex h-12 w-12 shrink-0
                      items-center justify-center
                      rounded-xl bg-[#B12025]/10
                      text-[#B12025]
                    ">
                      <Icon size={22} />
                    </span>

                    <div>
                      <p className="
                        text-[11px] font-semibold
                        text-[#B12025]
                      ">
                        STEP 0{index + 1}
                      </p>

                      <h3 className="
                        mt-3 text-[22px]
                        font-semibold tracking-[-0.035em]
                      ">
                        {step.label}
                      </h3>

                      <p className="
                        mt-3 max-w-[490px]
                        text-[13px] leading-7
                        text-[#17191C]/60
                      ">
                        {step.description}
                      </p>
                    </div>
                  </article>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          SECTION 04 — REPORTING DASHBOARD
      ================================================= */}

      <section className="
        bg-[#F9F8F8]
        px-5 py-20
        sm:px-8
        lg:px-14 lg:py-28
      ">
        <div className="mx-auto max-w-[1400px]">
          <p
            data-inbound-reveal
            className="
              text-[11px] font-semibold uppercase
              tracking-[0.2em] text-[#B12025]
            "
          >
            Your monthly report
          </p>

          <h2
            data-inbound-reveal
            className="
              mt-4 max-w-[840px]
              text-[clamp(2.3rem,4.7vw,4.7rem)]
              font-semibold leading-[1.12]
              tracking-[-0.055em]
            "
          >
            The numbers you will see.
          </h2>

          <p className="
            mt-5 max-w-[690px]
            text-[13px] leading-7
            text-[#17191C]/60
          ">
            Illustrative reporting dashboard.
            Targets are goals discussed during setup,
            not measured results or a service guarantee.
          </p>

          <div className="
            mt-11 grid gap-4
            md:grid-cols-2 lg:grid-cols-3
          ">
            {kpis.map((k, i) => (
              <div
                data-inbound-reveal
                key={k.title}
                className={`
                  rounded-[24px] border p-7
                  ${
                    i === 0
                      ? 'border-[#B12025] bg-[#B12025] text-white lg:row-span-2'
                      : 'border-[#17191C]/10 bg-white'
                  }
                `}
              >
                <div className="
                  flex items-start justify-between gap-3
                ">
                  <h3 className="text-[17px] font-semibold">
                    {k.title}
                  </h3>

                  <span
                    className={`text-[10px] font-semibold ${
                      i === 0
                        ? 'text-white/60'
                        : 'text-[#B12025]'
                    }`}
                  >
                    0{i + 1}
                  </span>
                </div>

                <p
                  className={`mt-3 text-[12px] leading-7 ${
                    i === 0
                      ? 'text-white/75'
                      : 'text-[#17191C]/60'
                  }`}
                >
                  {k.body}
                </p>

                <p className="
                  mt-8
                  text-[clamp(1.6rem,3vw,3rem)]
                  font-semibold tracking-[-0.045em]
                ">
                  {k.value}
                </p>

                <div
                  className={`mt-4 h-1.5 overflow-hidden rounded-full ${
                    i === 0
                      ? 'bg-white/25'
                      : 'bg-[#B12025]/10'
                  }`}
                >
                  <div
                    className={`h-full rounded-full ${
                      i === 0
                        ? 'bg-white'
                        : 'bg-[#B12025]'
                    }`}
                    style={{
                      width: k.width || '100%',
                    }}
                  />
                </div>

                <p
                  className={`mt-4 text-[11px] ${
                    i === 0
                      ? 'text-white/80'
                      : 'text-[#B12025]'
                  }`}
                >
                  {k.tag}
                </p>
              </div>
            ))}
          </div>

          {/* COMPANY FIGURES */}
          <div className="
            mt-14 grid gap-6
            border-t border-[#17191C]/10
            pt-10 md:grid-cols-3
          ">
            {[
              {
                val: 85,
                label: 'client retention rate',
              },
              {
                val: 98,
                label: 'accuracy rate across client work',
              },
            ].map((s) => (
              <div key={s.label}>
                <span
                  data-inbound-count
                  data-to={s.val}
                  className="
                    text-[clamp(3rem,5vw,5.6rem)]
                    font-semibold
                    tracking-[-0.065em]
                    text-[#B12025]
                  "
                >
                  {s.val}%
                </span>

                <p className="
                  mt-2 text-[12px]
                  text-[#17191C]/60
                ">
                  {s.label}
                </p>
              </div>
            ))}

            <div>
              <p className="
                text-[clamp(3rem,5vw,5.6rem)]
                font-semibold tracking-[-0.065em]
                text-[#B12025]
              ">
                15–20%
              </p>

              <p className="
                mt-2 text-[12px]
                text-[#17191C]/60
              ">
                of job applicants pass the hiring checks
              </p>

              {/* ILLUSTRATIVE HIRING FUNNEL */}
              <div
                aria-label="Illustrative funnel: 20 of 100 dots highlighted"
                className="
                  mt-4 grid max-w-[220px]
                  grid-cols-[repeat(20,minmax(0,1fr))]
                  gap-1
                "
              >
                {Array.from(
                  { length: 100 },
                  (_, i) => (
                    <span
                      key={i}
                      className={`
                        aspect-square rounded-full
                        ${
                          i < 20
                            ? 'bg-[#B12025]'
                            : 'bg-[#B12025]/10'
                        }
                      `}
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          SECTION 05 — HORIZONTAL PROCESS
      ================================================= */}

      <section
        data-inbound-process
        className="
          overflow-hidden px-5 py-20
          sm:px-8
          lg:px-14 lg:py-24
        "
      >
        <div className="mx-auto max-w-[1400px]">
          <p
            data-inbound-reveal
            className="
              text-[11px] font-semibold uppercase
              tracking-[0.2em] text-[#B12025]
            "
          >
            Our onboarding approach
          </p>

          <h2
            data-inbound-reveal
            className="
              mt-4 max-w-[900px]
              text-[clamp(2.3rem,4.7vw,4.7rem)]
              font-semibold leading-[1.12]
              tracking-[-0.055em]
            "
          >
            How your support team is set up.
          </h2>

          <p className="
            mt-5 max-w-[730px]
            text-[13px] leading-7
            text-[#17191C]/60
          ">
            The biggest risk with outsourced support is
            agents who do not know your business.
            These steps are designed to prevent that.
          </p>

          <div
            data-inbound-process-view
            className="
              mt-11 snap-x snap-mandatory
              overflow-x-auto
              lg:snap-none lg:overflow-hidden
            "
            style={{
              scrollbarWidth: 'none',
            }}
          >
            <div
              data-inbound-process-track
              className="flex w-max gap-5 pb-6"
            >
              {process.map((p) => (
                <article
                  key={p.id}
                  className="
                    flex min-h-[355px]
                    w-[min(84vw,500px)]
                    shrink-0 snap-start
                    flex-col
                    rounded-[26px]
                    border border-[#17191C]/10
                    bg-[#FBFAFA] p-8
                    lg:w-[540px]
                  "
                >
                  <p className="
                    text-[68px] font-semibold
                    leading-none tracking-[-0.075em]
                    text-[#B12025]
                  ">
                    {p.id}
                  </p>

                  <h3 className="
                    mt-8 text-[26px]
                    font-semibold tracking-[-0.04em]
                  ">
                    {p.title}
                  </h3>

                  <p className="
                    mt-4 text-[13px] leading-7
                    text-[#17191C]/65
                  ">
                    {p.body}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="
            mt-4 h-[3px]
            rounded-full bg-[#B12025]/10
          ">
            <div
              data-inbound-process-progress
              className="
                h-full w-full origin-left
                bg-[#B12025]
                lg:scale-x-0
              "
            />
          </div>

          <p className="
            mt-3 text-[11px]
            text-[#17191C]/45
            lg:hidden
          ">
            Swipe to explore all four steps →
          </p>
        </div>
      </section>

      {/* =================================================
          SECTION 06 — RELATED SERVICES
      ================================================= */}

      <section className="
        bg-[#B12025]
        px-5 py-20 text-white
        sm:px-8 lg:px-14
      ">
        <div className="mx-auto max-w-[1400px]">
          <div className="
            flex flex-wrap items-end
            justify-between gap-5
          ">
            <div>
              <p className="
                text-[11px] font-semibold
                uppercase tracking-[0.2em]
                text-white/75
              ">
                Explore more ways we can help
              </p>

              <h2 className="
                mt-4
                text-[clamp(2rem,4vw,4rem)]
                font-semibold tracking-[-0.05em]
              ">
                Other customer support services.
              </h2>
            </div>

            <Link
              href={base}
              className="
                inline-flex items-center gap-2
                rounded-full bg-white px-5 py-3
                text-[12px] font-semibold
                text-[#B12025]
              "
            >
              See all services
              <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="
            mt-9 grid gap-3
            sm:grid-cols-2 lg:grid-cols-4
          ">
            {otherServices.map((s) => (
              <Link
                href={s.href}
                key={s.href}
                className="
                  group flex min-h-[135px]
                  flex-col justify-between
                  rounded-[20px]
                  border border-white/25
                  bg-white/10 p-5
                  transition-colors
                  hover:bg-white hover:text-[#B12025]
                "
              >
                <ArrowUpRight
                  size={19}
                  className="
                    ml-auto transition-transform
                    group-hover:-translate-y-1
                    group-hover:translate-x-1
                  "
                />

                <span className="text-[15px] font-semibold">
                  {s.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================
          SECTION 07 — SEARCHABLE FAQ
      ================================================= */}

      <section className="
        bg-white px-5 py-20
        sm:px-8
        lg:px-14 lg:py-28
      ">
        <div className="
          mx-auto grid max-w-[1400px]
          gap-12
          lg:grid-cols-[0.8fr_1.2fr]
          lg:gap-20
        ">
          <div data-inbound-reveal>
            <p className="
              text-[11px] font-semibold uppercase
              tracking-[0.2em] text-[#B12025]
            ">
              Helpful answers
            </p>

            <h2 className="
              mt-4
              text-[clamp(2.4rem,4.5vw,4.5rem)]
              font-semibold leading-[1.12]
              tracking-[-0.055em]
            ">
              Common questions about inbound call support.
            </h2>

            <p className="
              mt-5 text-[13px] leading-7
              text-[#17191C]/60
            ">
              Search for setup, pricing, coverage
              or any other topic.
            </p>
          </div>

          <div>
            <label className="
              flex items-center gap-3
              rounded-2xl border
              border-[#17191C]/10
              bg-[#FAF9F9] px-5 py-4
              focus-within:border-[#B12025]
            ">
              <Search
                size={19}
                className="text-[#B12025]"
              />

              <span className="sr-only">
                Search frequently asked questions
              </span>

              <input
                value={faqQuery}
                onChange={(e) =>
                  setFaqQuery(e.target.value)
                }
                placeholder="Search common questions..."
                className="
                  w-full bg-transparent
                  text-[13px] outline-none
                  placeholder:text-[#17191C]/40
                "
              />
            </label>

            <div className="mt-5 space-y-3">
              {shownFaqs.map((item) => {
                const expanded =
                  openFaq === item.index;

                return (
                  <article
                    key={item.q}
                    className="
                      rounded-[20px]
                      border border-[#17191C]/10
                      bg-white
                    "
                  >
                    <h3>
                      <button
                        type="button"
                        aria-expanded={expanded}
                        aria-controls={
                          `inbound-faq-${item.index}`
                        }
                        onClick={() =>
                          setOpenFaq(
                            expanded ? null : item.index
                          )
                        }
                        className="
                          flex w-full items-center
                          justify-between gap-4
                          p-6 text-left
                          text-[13px] font-semibold
                          sm:text-[15px]
                        "
                      >
                        <span>{item.q}</span>

                        <span
                          className={`
                            flex h-9 w-9 shrink-0
                            items-center justify-center
                            rounded-full transition-colors
                            ${
                              expanded
                                ? 'bg-[#B12025] text-white'
                                : 'bg-[#B12025]/10 text-[#B12025]'
                            }
                          `}
                        >
                          <ChevronDown
                            size={18}
                            className={`
                              transition-transform
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
                      id={`inbound-faq-${item.index}`}
                      aria-hidden={!expanded}
                      className={`
                        grid
                        transition-[grid-template-rows]
                        duration-300
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
                          text-[13px] leading-[1.9]
                          text-[#17191C]/60
                        ">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}

              {shownFaqs.length === 0 && (
                <p className="
                  py-6 text-[13px]
                  text-[#17191C]/60
                ">
                  No matching questions. Try a different
                  word or contact our team.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          SECTION 08 — DISCOVERY CTA
      ================================================= */}

      <section className="
        border-t border-[#B12025]/10
        bg-[#FAF9F9]
        px-5 py-12
        sm:px-8 lg:px-14
      ">
        <div className="
          mx-auto flex max-w-[1400px]
          flex-wrap items-center
          justify-between gap-6
        ">
          <div>
            <p className="
              text-[12px] font-semibold
              text-[#B12025]
            ">
              Ready for a clearer call-handling process?
            </p>

            <h2 className="
              mt-2
              text-[clamp(1.5rem,2.8vw,2.5rem)]
              font-semibold tracking-[-0.04em]
            ">
              Tell us what your callers need.
            </h2>
          </div>

          <a
            href="#contact"
            className="
              inline-flex items-center gap-2
              rounded-full bg-[#B12025]
              px-6 py-4 text-[12px]
              font-semibold text-white
            "
          >
            Book a free discovery call
            <ArrowUpRight size={16} />
          </a>
        </div>
      </section>

      {/* =================================================
          FLOATING CTA
          Appears after hero, hides at the contact form.
      ================================================= */}

      <div
        className={`
          fixed bottom-5 left-1/2 z-40
          flex w-[calc(100%-32px)]
          max-w-[590px]
          -translate-x-1/2
          items-center justify-between gap-3
          rounded-full border border-[#B12025]/15
          bg-white/95 px-4 py-3
          shadow-[0_12px_55px_rgba(0,0,0,0.15)]
          backdrop-blur-lg
          transition-[opacity,transform,visibility]
          duration-300
          sm:px-5

          ${
            stickyCTA
              ? 'visible translate-y-0 opacity-100'
              : 'invisible pointer-events-none translate-y-8 opacity-0'
          }
        `}
      >
        <a
          href="tel:+94772221966"
          className="
            min-w-0 text-[11px]
            font-semibold text-[#17191C]
          "
        >
          <span className="block text-[#B12025]">
            Talk to FirstNotch
          </span>

          <span className="block text-[10px]">
            +94 77 222 1966
          </span>
        </a>

        <a
          href="#contact"
          className="
            shrink-0 rounded-full
            bg-[#B12025] px-4 py-3
            text-[11px] font-semibold text-white
          "
        >
          Book a free call ↗
        </a>
      </div>
    </div>
  );
}
