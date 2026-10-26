
'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
  AlertTriangle,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  ClipboardCheck,
  Clock3,
  FileCheck2,
  FileText,
  Mail,
  MessageCircle,
  PhoneCall,
  RotateCcw,
  ShieldCheck,
  Tag,
} from 'lucide-react';

const ROOT = '/services/customer-support-outsourcing';
const RED = '#B12025';

const caseStages = [
  {
    title: 'Received',
    detail: 'Complaint logged with a case number.',
    status: 'Open',
  },
  {
    title: 'Acknowledged',
    detail:
      'Customer receives the case number and next step within one working day.',
    status: 'Acknowledged',
  },
  {
    title: 'Updated',
    detail:
      'The customer receives updates while the complaint remains open.',
    status: 'In progress',
  },
  {
    title: 'Final answer',
    detail:
      'The customer receives a written explanation of the outcome.',
    status: 'Final reply',
  },
  {
    title: 'Closed',
    detail: 'The case and its cause remain recorded.',
    status: 'Closed',
  },
] as const;

const features = [
  {
    title: 'A case for every complaint',
    body:
      'Each complaint or query gets a case number in your system, with the date, channel and customer details.',
    Icon: FileText,
  },
  {
    title: 'Prompt acknowledgement',
    body:
      'Customers are told their complaint has been received within one working day. The message includes the case number and the next step.',
    Icon: Clock3,
  },
  {
    title: 'Answers to common queries',
    body:
      'Customers asking about the progress of a complaint, a refund or a return get answers from material you approve.',
    Icon: MessageCircle,
  },
  {
    title: 'Remedies you approve',
    body:
      'Agents offer only the remedies you have approved for each type of complaint. Any other request goes to your team for a decision.',
    Icon: ShieldCheck,
  },
  {
    title: 'Updates until the final answer',
    body:
      'Customers hear from the team at set points while a complaint is open. The final reply explains the outcome in writing.',
    Icon: Mail,
  },
  {
    title: 'Escalation to your staff',
    body:
      'Cases you want to handle yourself, such as legal threats or press enquiries, are passed on the same day with a full summary.',
    Icon: AlertTriangle,
  },
  {
    title: 'Causes tracked',
    body:
      'Agents record the cause of each complaint, such as a late delivery or a billing error. This shows you which problems to fix first.',
    Icon: Tag,
  },
  {
    title: 'Trained agents and scored cases',
    body:
      "Agents are trained on your policies before they handle complaints. Every case gets a quality score, and results are discussed in each agent's monthly performance review with coaching.",
    Icon: ClipboardCheck,
  },
] as const;

const metrics = [
  {
    title: 'Acknowledgement time',
    body:
      'How long customers wait before hearing that their complaint was received.',
    note: 'Target agreed during setup.',
  },
  {
    title: 'Time to resolve',
    body:
      'Working days between the complaint and the final reply.',
    note: 'Shown by complaint type.',
  },
  {
    title: 'Satisfaction after closing',
    body:
      'A short rating customers give once they receive the final answer.',
    note: 'Shown for each agent.',
  },
  {
    title: 'Reopened cases',
    body:
      'Cases opened again after being closed, a sign the first answer did not work.',
    note: 'Each one is reviewed.',
  },
  {
    title: 'Most common causes',
    body:
      'The issues behind most complaints, ranked.',
    note: 'Shared with the teams who can fix them.',
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

const faqs = [
  {
    q: 'How is this different from customer service?',
    a:
      'Customer service covers everyday questions across all channels. Complaint and query handling is responsible for each complaint from the first message to the final reply, and reports on the causes.',
  },
  {
    q: 'Who decides on refunds or compensation?',
    a:
      'You do. The limits are agreed during setup and agents work within them. Larger requests go to your team.',
  },
  {
    q: 'Can complaints come in through any channel?',
    a:
      'Yes. Complaints by phone, email, chat or social media are logged in the same system, so none are missed.',
  },
  {
    q: 'How are serious complaints handled?',
    a:
      'Complaints that mention legal action, safety or the press are flagged. So are complaints from customers who seem vulnerable. These are sent to your named contact within one hour.',
  },
  {
    q: 'Who can see complaint records?',
    a:
      'Only the agents on your account and your own staff. Records stay in your system, and personal details are not copied anywhere else.',
  },
  {
    q: 'Do you follow a complaints standard?',
    a:
      'The process follows the steps in ISO 10002, the international guideline for complaint handling.',
  },
  {
    q: 'How is complaint handling priced?',
    a:
      'Cost depends on the number of cases each month and how complex they are. Most clients pay a fixed monthly fee per agent. A written quote is prepared after the discovery call.',
  },
] as const;

const related = [
  {
    label: 'Inbound call support',
    href: `${ROOT}/inbound-call-support`,
  },
  {
    label: 'Outbound call support',
    href: `${ROOT}/outbound-call-support`,
  },
  {
    label: 'Customer service',
    href: `${ROOT}/customer-service`,
  },
  {
    label: 'Customer retention',
    href: `${ROOT}/customer-retention`,
  },
] as const;

const complaintTypes = [
  'Late delivery',
  'Billing error',
  'Product quality',
  'Service issue',
] as const;

const escalationTypes = [
  'Routine query',
  'Legal threat',
  'Safety concern',
  'Press enquiry',
  'Vulnerable customer',
] as const;

// Illustrative data only. Not actual FirstNotch results.
const exampleCauses = [
  { name: 'Late delivery', value: 42, cumulative: 42 },
  { name: 'Billing error', value: 27, cumulative: 69 },
  { name: 'Service issue', value: 18, cumulative: 87 },
  { name: 'Product quality', value: 13, cumulative: 100 },
];

const QUOTE =
  'Customers who complained about late orders used to wait days for a reply. Now each complaint is answered the same day, and we can see which restaurants cause the most problems.';

const eyebrow =
  'text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B12025]';

const heading =
  'text-[clamp(2.5rem,4.8vw,5.4rem)] font-semibold leading-[1.075] tracking-[-0.065em] text-[#17191C]';

// ======================================================
// GSAP HEADING WORDS
// ======================================================

function AnimatedWords({ text }: { text: string }) {
  return (
    <span role="text" aria-label={text}>
      {text.split(/\s+/).map((word, index) => (
        <span key={`${index}-${word}`} aria-hidden="true">
          {index > 0 ? ' ' : null}
          <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
            <span data-ch-word className="inline-block">
              {word}
            </span>
          </span>
        </span>
      ))}
    </span>
  );
}

// ======================================================
// FOOD DELIVERY TESTIMONIAL
// HOMEPAGE-STYLE SCROLL WORD REVEAL
// ======================================================

function FoodDeliveryQuote() {
  const quoteRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const element = quoteRef.current;
    if (!element) return;

    const media = gsap.matchMedia();

    media.add(
      '(prefers-reduced-motion: no-preference)',
      () => {
        const animation = gsap.fromTo(
          element.querySelectorAll('[data-ch-quote-word]'),
          {
            opacity: 0.2,
            textShadow: '0 0 0 rgba(80,0,0,0)',
          },
          {
            opacity: 1,
            textShadow: '0 4px 14px rgba(80,0,0,.32)',
            stagger: 0.1,
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
      aria-label="Food delivery app testimonial"
      className="bg-[#B12025] px-5 py-[110px] text-white sm:px-8 lg:px-12 lg:py-[155px]"
    >
      <div className="mx-auto max-w-[1350px]">
        <div className="mb-9 flex flex-wrap items-center gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/35">
            <MessageCircle size={23} />
          </span>

          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80">
            Food delivery app
          </p>
        </div>

        <blockquote>
          <p
            ref={quoteRef}
            role="text"
            aria-label={QUOTE}
            className="max-w-[1130px] text-[clamp(1.9rem,3.7vw,4.4rem)] font-semibold leading-[1.45] tracking-[-0.055em]"
          >
            <span aria-hidden="true">“</span>

            {QUOTE.split(/\s+/).map((word, index) => (
              <span
                key={index}
                data-ch-quote-word
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

        <div className="mt-9 flex flex-wrap gap-3">
          <span className="rounded-full border border-white/35 px-4 py-2 text-[11px] font-semibold">
            Written reply
          </span>
          <span className="rounded-full border border-white/35 px-4 py-2 text-[11px] font-semibold">
            Causes tracked
          </span>
          <span className="rounded-full border border-white/35 px-4 py-2 text-[11px] font-semibold">
            Case history
          </span>
        </div>
      </div>
    </section>
  );
}

// ======================================================
// MAIN PAGE
// ======================================================

export default function ComplaintQueryHandlingPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const featuresSectionRef = useRef<HTMLElement>(null);
  const featuresTrackRef = useRef<HTMLDivElement>(null);
  const setupSectionRef = useRef<HTMLElement>(null);
  const setupTrackRef = useRef<HTMLDivElement>(null);

  const featureProgressRef = useRef<HTMLDivElement>(null);
  const setupProgressRef = useRef<HTMLDivElement>(null);

  const [caseStep, setCaseStep] = useState(1);
  const [complaintType, setComplaintType] = useState('Late delivery');
  const [remedyLimit, setRemedyLimit] = useState(50);
  const [requestAmount, setRequestAmount] = useState(100);
  const [escalation, setEscalation] = useState('Routine query');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const [plannerStep, setPlannerStep] = useState(0);
  const [plannerIssue, setPlannerIssue] = useState('');
  const [plannerStart, setPlannerStart] = useState('');
  const [plannerError, setPlannerError] = useState('');

  const currentStage = caseStages[caseStep];
  const isUrgent = escalation !== 'Routine query';
  const canApprove = requestAmount <= remedyLimit;

  // ====================================================
  // GSAP SCROLL ANIMATIONS
  // ====================================================

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);

    const media = gsap.matchMedia();

    media.add(
      '(prefers-reduced-motion: no-preference)',
      () => {
        const context = gsap.context(() => {
          // Heading text reveals
          root.querySelectorAll<HTMLElement>(
            '[data-ch-title]'
          ).forEach((title) => {
            const words =
              title.querySelectorAll('[data-ch-word]');

            gsap.fromTo(
              words,
              {
                yPercent: 110,
                autoAlpha: 0,
              },
              {
                yPercent: 0,
                autoAlpha: 1,
                duration: 0.95,
                stagger: 0.044,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: title,
                  start: 'top 90%',
                  once: true,
                },
              }
            );
          });

          // Regular content reveals
          root.querySelectorAll<HTMLElement>(
            '[data-ch-reveal]'
          ).forEach((item) => {
            gsap.fromTo(
              item,
              {
                y: 30,
                autoAlpha: 0,
              },
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.85,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: item,
                  start: 'top 90%',
                  once: true,
                },
              }
            );
          });

          // Hero case progress line
          root.querySelectorAll<HTMLElement>(
            '[data-ch-line]'
          ).forEach((line) => {
            gsap.fromTo(
              line,
              { scaleX: 0 },
              {
                scaleX: 1,
                duration: 1.6,
                transformOrigin: 'left center',
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: line,
                  start: 'top 92%',
                  once: true,
                },
              }
            );
          });

          // Acknowledged stamp
          root.querySelectorAll<HTMLElement>(
            '[data-ch-stamp]'
          ).forEach((stamp) => {
            gsap.fromTo(
              stamp,
              {
                scale: 1.45,
                rotation: -12,
                opacity: 0,
              },
              {
                scale: 1,
                rotation: -7,
                opacity: 1,
                duration: 0.75,
                ease: 'back.out(1.7)',
                delay: 0.45,
              }
            );
          });
        }, root);

        return () => context.revert();
      }
    );

    // Pinned GSAP horizontal sections
    media.add(
      '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
      () => {
        const sections = [
          {
            section: featuresSectionRef.current,
            track: featuresTrackRef.current,
            progress: featureProgressRef.current,
          },
          {
            section: setupSectionRef.current,
            track: setupTrackRef.current,
            progress: setupProgressRef.current,
          },
        ];

        const animations: gsap.core.Tween[] = [];

        sections.forEach(({ section, track, progress }) => {
          if (!section || !track) return;

          const distance = () =>
            Math.max(
              0,
              track.scrollWidth - window.innerWidth
            );

          if (distance() < 2) return;

          const tween = gsap.to(track, {
            x: () => -distance(),
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              pin: true,
              start: 'top top+=95',
              end: () => `+=${distance()}`,
              scrub: 0.9,
              pinSpacing: true,
              invalidateOnRefresh: true,
              anticipatePin: 1,
              onUpdate: (self) => {
                if (progress) {
                  progress.style.transform =
                    `scaleX(${self.progress})`;
                }
              },
            },
          });

          animations.push(tween);

          track.querySelectorAll<HTMLElement>(
            '[data-ch-card]'
          ).forEach((card, index) => {
            if (index === 0) return;

            const texts = card.querySelectorAll(
              '[data-ch-card-text]'
            );

            const reveal = gsap.fromTo(
              texts,
              {
                y: 28,
                autoAlpha: 0,
              },
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.7,
                stagger: 0.13,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: tween,
                  start: 'left 85%',
                  once: true,
                },
              }
            );

            animations.push(reveal);
          });
        });

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
      if (alive) ScrollTrigger.refresh();
    });

    return () => {
      alive = false;
      media.revert();
    };
  }, []);

  // ====================================================
  // CONTACT FORM PRE-FILL
  // Keeps your existing StoryContact form
  // ====================================================

  function continueToContact() {
    const service = document.querySelector<HTMLSelectElement>(
      '#contact select[name="service"]'
    );

    if (service) {
      service.value = 'Customer support';
      service.dispatchEvent(
        new Event('change', { bubbles: true })
      );
    }

    const start = document.querySelector<HTMLSelectElement>(
      '#contact select[name="start"]'
    );

    if (start && plannerStart) {
      start.value = plannerStart;
      start.dispatchEvent(
        new Event('change', { bubbles: true })
      );
    }

    const message = document.querySelector<HTMLTextAreaElement>(
      '#contact textarea[name="message"]'
    );

    if (message) {
      const content =
        `Complaint handling enquiry.\n` +
        `Complaint type: ${plannerIssue || complaintType}.\n` +
        `Preferred start: ${plannerStart || 'Not specified'}.\n` +
        `We would like to discuss complaint handling and escalation rules.`;

      message.value = content;
      message.dispatchEvent(
        new Event('input', { bubbles: true })
      );
    }

    document.getElementById('contact')?.scrollIntoView({
      behavior: window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches
        ? 'auto'
        : 'smooth',
      block: 'start',
    });
  }

  function nextPlannerStep() {
    if (plannerStep === 0 && !plannerIssue) {
      setPlannerError('Please select a complaint type.');
      return;
    }

    if (plannerStep === 1 && !plannerStart) {
      setPlannerError('Please select when you want to start.');
      return;
    }

    setPlannerError('');

    if (plannerStep < 1) {
      setPlannerStep(1);
    } else {
      continueToContact();
    }
  }

  // ====================================================
  // PAGE
  // ====================================================

  return (
    <div
      ref={rootRef}
      className="overflow-x-clip bg-white font-sans text-[#17191C]"
    >
      {/* HERO */}

      <section
        id="complaint-hero"
        className="relative overflow-hidden bg-white px-5 pb-[100px] pt-[150px] sm:px-8 lg:px-12 lg:pt-[180px]"
      >
        <div className="mx-auto grid max-w-[1450px] items-center gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
          <div>
            <p data-ch-reveal className={eyebrow}>
              Complaint handling services in Sri Lanka
            </p>

            <h1
              data-ch-title
              className="mt-7 text-[clamp(3rem,5.3vw,6.3rem)] font-semibold leading-[1.06] tracking-[-.07em]"
            >
              <AnimatedWords
                text="Complaints answered and closed"
              />{' '}
              <span className="text-[#B12025]">
                <AnimatedWords text="under rules you set," />
              </span>{' '}
              <AnimatedWords
                text="with a record of every case."
              />
            </h1>

            <p
              data-ch-reveal
              className="mt-7 max-w-[680px] text-[15px] leading-[1.95] text-[#17191C]/70 sm:text-[16px]"
            >
              FirstNotch handles your complaints and
              customer queries from Colombo. Agents
              work to the rules you set for refunds
              and escalation, and they keep customers
              updated until the final answer. You can
              see where each complaint stands and
              what caused it.
            </p>

            <div
              data-ch-reveal
              className="mt-9 flex flex-wrap gap-3"
            >
              <a
                href="#contact"
                className="inline-flex min-h-[52px] items-center gap-3 rounded-full bg-[#B12025] px-6 text-[12px] font-semibold text-white transition hover:bg-[#981b20]"
              >
                Book a free discovery call
                <ArrowUpRight size={17} />
              </a>

              <a
                href="#included"
                className="inline-flex min-h-[52px] items-center gap-3 rounded-full border border-[#B12025]/25 px-6 text-[12px] font-semibold text-[#B12025] transition hover:bg-[#fff3f3]"
              >
                See what is included
                <ArrowDownRight size={17} />
              </a>
            </div>

            {/* HERO CASE JOURNEY */}

            <div
              data-ch-reveal
              className="mt-12 max-w-[750px] border-t border-[#B12025]/15 pt-7"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-[.2em] text-[#B12025]">
                  Complaint → Closed
                </span>

                <span className="font-mono text-[11px] text-[#17191C]/45">
                  Example process
                </span>
              </div>

              <div className="relative">
                <div className="absolute left-0 right-0 top-[11px] h-[2px] bg-[#B12025]/15" />

                <div
                  data-ch-line
                  className="absolute left-0 right-0 top-[11px] h-[2px] origin-left bg-[#B12025]"
                />

                <div className="relative grid grid-cols-5 gap-2">
                  {caseStages.map((item, index) => (
                    <button
                      key={item.title}
                      type="button"
                      aria-pressed={caseStep === index}
                      onClick={() => setCaseStep(index)}
                      className="flex flex-col items-center gap-3 text-center"
                    >
                      <span
                        className={`h-[24px] w-[24px] rounded-full border-[5px] transition ${
                          index <= caseStep
                            ? 'border-[#B12025] bg-white'
                            : 'border-[#B12025]/25 bg-white'
                        }`}
                      />

                      <span className={`text-[9px] font-semibold leading-4 sm:text-[10px] ${
                        caseStep === index
                          ? 'text-[#B12025]'
                          : 'text-[#17191C]/55'
                      }`}>
                        {item.title}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CASE FILE HERO */}

          <div
            data-ch-reveal
            className="rounded-[32px] bg-[#fff8f8] p-5 shadow-[0_20px_70px_rgba(177,32,37,.08)] sm:p-8"
          >
            <div className="rounded-[25px] border border-[#B12025]/15 bg-white p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[11px] font-semibold uppercase tracking-[.18em] text-[#B12025]">
                  Complaint case file
                </span>

                <FileText
                  size={24}
                  className="text-[#B12025]"
                />
              </div>

              <div className="relative mt-7 rounded-[20px] border border-[#B12025]/15 bg-[#fffafa] p-6">
                <span className="font-mono text-[11px] text-[#B12025]">
                  SAMPLE RECORD
                </span>

                <h2 className="mt-3 font-mono text-[clamp(1.7rem,3vw,2.7rem)] font-bold tracking-[-.05em]">
                  FN-20418
                </h2>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[10px] text-[#17191C]/45">
                      Channel
                    </span>
                    <p className="mt-1 text-[12px] font-semibold">
                      Email
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] text-[#17191C]/45">
                      Customer
                    </span>
                    <p className="mt-1 text-[12px] font-semibold">
                      Sample customer
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] text-[#17191C]/45">
                      Complaint type
                    </span>
                    <p className="mt-1 text-[12px] font-semibold">
                      Late order
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] text-[#17191C]/45">
                      Status
                    </span>
                    <p className="mt-1 text-[12px] font-semibold text-[#B12025]">
                      {currentStage.status}
                    </p>
                  </div>
                </div>

                <div
                  data-ch-stamp
                  className="absolute right-3 top-6 -rotate-[7deg] rounded-md border-[3px] border-[#B12025] px-3 py-2 text-[12px] font-black uppercase tracking-[.12em] text-[#B12025] opacity-90 sm:right-6"
                >
                  Acknowledged
                </div>
              </div>

              <div
                aria-live="polite"
                className="mt-5 rounded-[18px] bg-[#B12025] p-5 text-white"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[.18em] text-white/75">
                  Current sample stage
                </p>

                <h3 className="mt-3 text-[20px] font-semibold">
                  {currentStage.title}
                </h3>

                <p className="mt-2 min-h-[46px] text-[12px] leading-6 text-white/90">
                  {currentStage.detail}
                </p>
              </div>

              <p className="mt-4 text-[10px] leading-6 text-[#17191C]/50">
                Demonstration case only — not a real customer record.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ONE SYSTEM / FOUR CHANNELS */}

      <section className="border-y border-[#B12025]/10 bg-[#fff9f9] px-5 py-14 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1350px] flex-wrap items-center justify-between gap-6">
          <div>
            <p className={eyebrow}>
              One system, four channels
            </p>

            <p className="mt-2 text-[13px] text-[#17191C]/65">
              Every complaint goes into the same case record.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { title: 'Phone', Icon: PhoneCall },
              { title: 'Email', Icon: Mail },
              { title: 'Chat', Icon: MessageCircle },
              { title: 'Social', Icon: ClipboardCheck },
            ].map(({ title, Icon }) => (
              <span
                key={title}
                className="inline-flex items-center gap-2 rounded-full border border-[#B12025]/15 bg-white px-4 py-3 text-[12px] font-semibold"
              >
                <Icon size={16} className="text-[#B12025]" />
                {title}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* EIGHT GSAP HORIZONTAL FEATURE CARDS */}

      <section
        id="included"
        ref={featuresSectionRef}
        className="relative scroll-mt-[110px] bg-white py-[90px] lg:flex lg:min-h-[710px] lg:flex-col lg:justify-center"
      >
        <div className="mx-auto w-full max-w-[1450px] px-5 sm:px-8 lg:px-12">
          <p data-ch-reveal className={eyebrow}>
            What the service includes
          </p>

          <h2
            data-ch-title
            className={`mt-5 max-w-[950px] ${heading}`}
          >
            <AnimatedWords
              text="What the complaint and query handling service includes"
            />
          </h2>
        </div>

        <div className="mt-10 w-full overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:overflow-visible">
          <div
            ref={featuresTrackRef}
            className="flex w-max gap-4 pl-5 pr-5 sm:pl-8 sm:pr-8 lg:gap-5 lg:pl-12 lg:pr-12"
          >
            {features.map(({ title, body, Icon }, index) => {
              const red = index === 0 || index === 4 || index === 7;

              return (
                <article
                  key={title}
                  data-ch-card
                  className={`group flex min-h-[400px] w-[min(85vw,395px)] shrink-0 flex-col rounded-[28px] border p-8 sm:w-[430px] lg:w-[455px] lg:p-9 ${
                    red
                      ? 'border-[#B12025] bg-[#B12025] text-white'
                      : 'border-[#B12025]/15 bg-[#fff9f9] text-[#17191C]'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span className={`flex h-14 w-14 items-center justify-center rounded-[18px] ${
                      red ? 'bg-white/20' : 'bg-white text-[#B12025]'
                    }`}>
                      <Icon
                        size={26}
                        strokeWidth={1.5}
                        className="transition-transform duration-300 group-hover:scale-110"
                      />
                    </span>

                    <span className={`font-mono text-[13px] font-semibold ${
                      red ? 'text-white/70' : 'text-[#B12025]'
                    }`}>
                      0{index + 1}
                    </span>
                  </div>

                  <div className="mt-auto pt-12">
                    <h3
                      data-ch-card-text
                      className="text-[27px] font-semibold leading-[1.2] tracking-[-.04em]"
                    >
                      {title}
                    </h3>

                    <p
                      data-ch-card-text
                      className={`mt-5 text-[13px] leading-[1.85] ${
                        red ? 'text-white/85' : 'text-[#17191C]/70'
                      }`}
                    >
                      {body}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="mx-auto mt-8 w-full max-w-[1450px] px-5 sm:px-8 lg:px-12">
          <div className="hidden h-[3px] overflow-hidden bg-[#B12025]/10 lg:block">
            <div
              ref={featureProgressRef}
              className="h-full origin-left scale-x-0 bg-[#B12025]"
            />
          </div>

          <p className="text-[11px] text-[#B12025] lg:hidden">
            Swipe sideways to explore all eight features →
          </p>
        </div>
      </section>

      {/* INTERACTIVE CASE TIMELINE */}

      <section className="bg-[#fff8f8] px-5 py-[100px] sm:px-8 lg:px-12 lg:py-[125px]">
        <div className="mx-auto grid max-w-[1350px] gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
          <div>
            <p data-ch-reveal className={eyebrow}>
              Complaint to closed
            </p>

            <h2
              data-ch-title
              className={`mt-5 ${heading}`}
            >
              <AnimatedWords
                text="One complaint. Clear ownership until the final reply."
              />
            </h2>

            <p
              data-ch-reveal
              className="mt-6 max-w-[480px] text-[14px] leading-8 text-[#17191C]/65"
            >
              Explore how a complaint moves from the
              first message through acknowledgement,
              updates, the written final answer and
              closure.
            </p>
          </div>

          <div className="rounded-[28px] border border-[#B12025]/15 bg-white p-6 sm:p-9">
            <p className="font-mono text-[11px] font-semibold text-[#B12025]">
              SAMPLE CASE / FN-20418
            </p>

            <div className="mt-7 space-y-3">
              {caseStages.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setCaseStep(index)}
                  aria-pressed={caseStep === index}
                  className={`flex w-full items-start gap-4 rounded-[17px] border p-5 text-left transition ${
                    caseStep === index
                      ? 'border-[#B12025] bg-[#B12025] text-white'
                      : 'border-[#B12025]/15 bg-white hover:border-[#B12025]/50'
                  }`}
                >
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-mono text-[12px] font-semibold ${
                    caseStep === index
                      ? 'bg-white text-[#B12025]'
                      : 'bg-[#fff0f0] text-[#B12025]'
                  }`}>
                    0{index + 1}
                  </span>

                  <span className="flex-1">
                    <span className="block text-[14px] font-semibold">
                      {item.title}
                    </span>

                    <span className={`mt-2 block text-[12px] leading-6 ${
                      caseStep === index
                        ? 'text-white/85'
                        : 'text-[#17191C]/60'
                    }`}>
                      {item.detail}
                    </span>
                  </span>

                  {caseStep === index && (
                    <Check size={18} className="shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* REMEDY RULEBOOK + ESCALATION */}

      <section className="bg-white px-5 py-[95px] sm:px-8 lg:px-12 lg:py-[125px]">
        <div className="mx-auto max-w-[1350px]">
          <p data-ch-reveal className={eyebrow}>
            Rules you set
          </p>

          <h2
            data-ch-title
            className={`mt-5 max-w-[1050px] ${heading}`}
          >
            <AnimatedWords
              text="Approved remedies. Serious cases routed to your team."
            />
          </h2>

          <div className="mt-11 grid gap-5 lg:grid-cols-2">
            {/* REMEDY RULEBOOK */}

            <article className="rounded-[27px] border border-[#B12025]/15 bg-[#fff9f9] p-7 sm:p-9">
              <div className="flex items-center justify-between">
                <p className={eyebrow}>
                  Remedy rulebook
                </p>

                <ShieldCheck
                  size={25}
                  className="text-[#B12025]"
                />
              </div>

              <h3 className="mt-5 text-[26px] font-semibold tracking-[-.04em]">
                Agents work within your limits.
              </h3>

              <p className="mt-3 text-[13px] leading-7 text-[#17191C]/65">
                Select a complaint type and adjust
                a sample approval limit to see when
                a remedy needs your team's decision.
              </p>

              <label
                htmlFor="ch-complaint"
                className="mt-7 block text-[12px] font-semibold"
              >
                Complaint type
              </label>

              <select
                id="ch-complaint"
                value={complaintType}
                onChange={(event) =>
                  setComplaintType(event.target.value)
                }
                className="mt-2 w-full rounded-xl border border-[#B12025]/20 bg-white px-4 py-3 text-[13px] outline-none focus:border-[#B12025]"
              >
                {complaintTypes.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <label
                htmlFor="ch-limit"
                className="mt-7 flex items-center justify-between gap-3 text-[12px] font-semibold"
              >
                <span>Example approved limit</span>
                <span className="text-[#B12025]">
                  {remedyLimit} demo units
                </span>
              </label>

              <input
                id="ch-limit"
                type="range"
                min={0}
                max={200}
                step={25}
                value={remedyLimit}
                onChange={(event) =>
                  setRemedyLimit(Number(event.target.value))
                }
                className="mt-4 w-full accent-[#B12025]"
              />

              <label
                htmlFor="ch-request"
                className="mt-6 flex items-center justify-between gap-3 text-[12px] font-semibold"
              >
                <span>Example remedy request</span>
                <span className="text-[#B12025]">
                  {requestAmount} demo units
                </span>
              </label>

              <input
                id="ch-request"
                type="range"
                min={0}
                max={250}
                step={25}
                value={requestAmount}
                onChange={(event) =>
                  setRequestAmount(Number(event.target.value))
                }
                className="mt-4 w-full accent-[#B12025]"
              />

              <div
                aria-live="polite"
                className="mt-7 rounded-[17px] bg-[#B12025] p-5 text-white"
              >
                <p className="text-[11px] font-semibold text-white/75">
                  {complaintType} · Sample decision
                </p>

                <h4 className="mt-2 text-[18px] font-semibold">
                  {canApprove
                    ? 'Within the example approval limit'
                    : 'Escalate to your team'}
                </h4>

                <p className="mt-2 text-[12px] leading-6 text-white/85">
                  {canApprove
                    ? 'An agent may use a remedy only if that remedy and its conditions have been approved by you.'
                    : 'The request is beyond the example limit, so your named team must decide.'}
                </p>
              </div>

              <p className="mt-3 text-[10px] leading-6 text-[#17191C]/50">
                Demonstration values only. These are
                not actual refund policies or prices.
              </p>
            </article>

            {/* ESCALATION SWITCHBOARD */}

            <article className="rounded-[27px] bg-[#B12025] p-7 text-white sm:p-9">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-[.2em] text-white/80">
                  Escalation switchboard
                </p>

                <AlertTriangle size={25} />
              </div>

              <h3 className="mt-5 text-[26px] font-semibold tracking-[-.04em]">
                Serious complaints receive priority.
              </h3>

              <p className="mt-3 text-[13px] leading-7 text-white/85">
                Legal, safety, press and vulnerable
                customer concerns are flagged and
                routed to your named contact.
              </p>

              <div
                role="group"
                aria-label="Select sample complaint"
                className="mt-7 space-y-2"
              >
                {escalationTypes.map((item) => (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={escalation === item}
                    onClick={() => setEscalation(item)}
                    className={`flex w-full items-center justify-between rounded-[15px] border px-4 py-3.5 text-left text-[12px] font-semibold transition ${
                      escalation === item
                        ? 'border-white bg-white text-[#B12025]'
                        : 'border-white/25 bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {item}

                    {escalation === item && (
                      <Check size={16} />
                    )}
                  </button>
                ))}
              </div>

              <div
                aria-live="polite"
                className="mt-7 rounded-[17px] bg-white p-5 text-[#17191C]"
              >
                <div className="flex items-center gap-3">
                  {isUrgent ? (
                    <AlertTriangle
                      size={21}
                      className="text-[#B12025]"
                    />
                  ) : (
                    <ClipboardCheck
                      size={21}
                      className="text-[#B12025]"
                    />
                  )}

                  <p className="text-[14px] font-semibold">
                    {isUrgent
                      ? 'Urgent escalation'
                      : 'Normal case handling'}
                  </p>
                </div>

                <p className="mt-3 text-[12px] leading-7 text-[#17191C]/65">
                  {isUrgent
                    ? 'Send the case to your named contact within one hour, with a full summary.'
                    : 'Keep the case with the assigned agent and follow the agreed acknowledgement and update rules.'}
                </p>
              </div>

              <p className="mt-4 text-[10px] leading-6 text-white/70">
                Interactive process illustration.
                No actual cases are routed.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* REPORTING */}

      <section
        id="reporting"
        className="bg-[#fff9f9] px-5 py-[95px] sm:px-8 lg:px-12 lg:py-[125px]"
      >
        <div className="mx-auto max-w-[1350px]">
          <p data-ch-reveal className={eyebrow}>
            The numbers you will see
          </p>

          <h2
            data-ch-title
            className={`mt-5 max-w-[1000px] ${heading}`}
          >
            <AnimatedWords
              text="Understand resolution times and what causes complaints."
            />
          </h2>

          <p
            data-ch-reveal
            className="mt-5 max-w-[760px] text-[14px] leading-8 text-[#17191C]/65"
          >
            Your monthly report shows how long
            complaints took to resolve and which
            causes came up most.
          </p>

          <div className="mt-11 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {metrics.map((item, index) => (
              <article
                key={item.title}
                data-ch-reveal
                className={`flex min-h-[260px] flex-col rounded-[24px] border p-7 ${
                  index === 0
                    ? 'border-[#B12025] bg-[#B12025] text-white'
                    : 'border-[#B12025]/15 bg-white text-[#17191C]'
                }`}
              >
                <span
                  className={`font-mono text-[42px] font-semibold ${
                    index === 0
                      ? 'text-white/40'
                      : 'text-[#B12025]/25'
                  }`}
                >
                  0{index + 1}
                </span>

                <h3 className="mt-4 text-[21px] font-semibold">
                  {item.title}
                </h3>

                <p className={`mt-4 text-[12px] leading-7 ${
                  index === 0
                    ? 'text-white/85'
                    : 'text-[#17191C]/65'
                }`}>
                  {item.body}
                </p>

                <p className={`mt-auto border-t pt-4 text-[11px] font-semibold ${
                  index === 0
                    ? 'border-white/25'
                    : 'border-[#B12025]/15 text-[#B12025]'
                }`}>
                  {item.note}
                </p>
              </article>
            ))}
          </div>

          {/* CAUSE RANKING */}

          <div className="mt-5 grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
            <div className="rounded-[26px] border border-[#B12025]/15 bg-white p-7 sm:p-9">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-[20px] font-semibold">
                  Most common causes
                </h3>

                <span className="text-[10px] font-semibold text-[#B12025]">
                  Example data only
                </span>
              </div>

              <div className="mt-8 space-y-6">
                {exampleCauses.map((cause, index) => (
                  <div key={cause.name}>
                    <div className="mb-2 flex items-center justify-between text-[12px]">
                      <span className="font-semibold">
                        {index + 1}. {cause.name}
                      </span>

                      <span className="font-mono text-[#B12025]">
                        {cause.value} / 100
                      </span>
                    </div>

                    <div className="h-[13px] overflow-hidden rounded-full bg-[#B12025]/10">
                      <div
                        className="h-full rounded-full bg-[#B12025]"
                        style={{ width: `${cause.value}%` }}
                      />
                    </div>

                    <p className="mt-2 text-right text-[10px] text-[#17191C]/50">
                      Cumulative: {cause.cumulative}%
                    </p>
                  </div>
                ))}
              </div>

              <p className="mt-7 text-[11px] leading-6 text-[#17191C]/55">
                Illustrative ranking to demonstrate
                how complaint causes can be reported.
                No real customer results are shown.
              </p>
            </div>

            <div className="rounded-[26px] bg-[#B12025] p-7 text-white sm:p-9">
              <RotateCcw size={30} strokeWidth={1.5} />

              <h3 className="mt-5 text-[24px] font-semibold">
                Reopened cases
              </h3>

              <p className="mt-4 text-[13px] leading-7 text-white/85">
                A case reopened after closure can
                be a sign that the first answer
                did not work. Each one is reviewed.
              </p>

              <div className="mt-9 space-y-3">
                <div className="rounded-[15px] border border-white/25 bg-white/10 p-4 text-[12px]">
                  Case closed
                </div>

                <div className="flex justify-center">
                  <ArrowDownRight size={20} />
                </div>

                <div className="rounded-[15px] bg-white p-4 text-[12px] font-semibold text-[#B12025]">
                  Case reopened → review
                </div>

                <div className="flex justify-center">
                  <ArrowDownRight size={20} />
                </div>

                <div className="rounded-[15px] border border-white/25 bg-white/10 p-4 text-[12px]">
                  Further action recorded
                </div>
              </div>
            </div>
          </div>

          {/* COMPANY FIGURES */}

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {[
              ['85%', 'client retention rate'],
              ['98%', 'accuracy rate'],
              [
                '15 to 20%',
                'of job applicants pass the hiring checks',
              ],
            ].map(([value, label]) => (
              <div
                key={label}
                data-ch-reveal
                className="rounded-[22px] border border-[#B12025]/15 bg-white p-7"
              >
                <p className="text-[clamp(2.4rem,3.7vw,4.2rem)] font-semibold tracking-[-.06em] text-[#B12025]">
                  {value}
                </p>

                <p className="mt-2 text-[12px] text-[#17191C]/65">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL SCROLL REVEAL */}

      <FoodDeliveryQuote />

      {/* ONBOARDING — HORIZONTAL GSAP */}

      <section
        id="setup"
        ref={setupSectionRef}
        className="relative scroll-mt-[110px] bg-white py-[85px] lg:flex lg:min-h-[690px] lg:flex-col lg:justify-center"
      >
        <div className="mx-auto w-full max-w-[1450px] px-5 sm:px-8 lg:px-12">
          <p data-ch-reveal className={eyebrow}>
            How your support team is set up
          </p>

          <h2
            data-ch-title
            className={`mt-5 max-w-[980px] ${heading}`}
          >
            <AnimatedWords
              text="A trained team with a clear process."
            />
          </h2>

          <p className="mt-5 max-w-[720px] text-[13px] leading-7 text-[#17191C]/65">
            The biggest risk with outsourced support
            is agents who do not know your business.
            The steps below prevent that.
          </p>
        </div>

        <div className="mt-10 w-full overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:overflow-visible">
          <div
            ref={setupTrackRef}
            className="flex w-max gap-4 pl-5 pr-5 sm:pl-8 sm:pr-8 lg:gap-5 lg:pl-12 lg:pr-12"
          >
            {setupSteps.map((step, index) => {
              const red = index === 1 || index === 3;

              return (
                <article
                  key={step.title}
                  data-ch-card
                  className={`flex min-h-[370px] w-[min(85vw,410px)] shrink-0 flex-col rounded-[28px] border p-8 sm:w-[450px] lg:w-[490px] lg:p-9 ${
                    red
                      ? 'border-[#B12025] bg-[#B12025] text-white'
                      : 'border-[#B12025]/15 bg-[#fff9f9]'
                  }`}
                >
                  <span className={`font-mono text-[84px] font-semibold leading-none tracking-[-.08em] ${
                    red ? 'text-white/35' : 'text-[#B12025]/20'
                  }`}>
                    0{index + 1}
                  </span>

                  <div className="mt-auto pt-10">
                    <h3
                      data-ch-card-text
                      className="text-[27px] font-semibold tracking-[-.04em]"
                    >
                      {step.title}
                    </h3>

                    <p
                      data-ch-card-text
                      className={`mt-5 text-[13px] leading-[1.85] ${
                        red
                          ? 'text-white/85'
                          : 'text-[#17191C]/65'
                      }`}
                    >
                      {step.body}
                    </p>

                    <span className={`mt-5 flex h-9 w-9 items-center justify-center rounded-full ${
                      red
                        ? 'bg-white text-[#B12025]'
                        : 'bg-[#B12025] text-white'
                    }`}>
                      <Check size={18} />
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="mx-auto mt-8 w-full max-w-[1450px] px-5 sm:px-8 lg:px-12">
          <div className="hidden h-[3px] overflow-hidden bg-[#B12025]/10 lg:block">
            <div
              ref={setupProgressRef}
              className="h-full origin-left scale-x-0 bg-[#B12025]"
            />
          </div>

          <p className="text-[11px] text-[#B12025] lg:hidden">
            Swipe sideways to see the four steps →
          </p>
        </div>
      </section>

      {/* FAQ */}

      <section
        id="faq"
        className="bg-[#fff9f9] px-5 py-[95px] sm:px-8 lg:px-12 lg:py-[125px]"
      >
        <div className="mx-auto grid max-w-[1350px] gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
          <div>
            <p data-ch-reveal className={eyebrow}>
              Common questions
            </p>

            <h2
              data-ch-title
              className={`mt-5 ${heading}`}
            >
              <AnimatedWords
                text="Common questions about complaint handling."
              />
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((item, index) => (
              <div
                key={item.q}
                className="overflow-hidden rounded-[20px] border border-[#B12025]/15 bg-white"
              >
                <button
                  type="button"
                  aria-expanded={openFaq === index}
                  onClick={() =>
                    setOpenFaq(openFaq === index ? null : index)
                  }
                  className="flex w-full items-start justify-between gap-4 p-6 text-left"
                >
                  <span className="text-[14px] font-semibold leading-6">
                    {item.q}
                  </span>

                  <ChevronDown
                    size={19}
                    className={`mt-1 shrink-0 text-[#B12025] transition-transform ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <div className={`grid transition-[grid-template-rows] duration-300 ${
                  openFaq === index
                    ? 'grid-rows-[1fr]'
                    : 'grid-rows-[0fr]'
                }`}>
                  <div className="min-h-0 overflow-hidden">
                    <p className="px-6 pb-6 text-[12px] leading-8 text-[#17191C]/65">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED SERVICES */}

      <section className="bg-white px-5 py-[90px] sm:px-8 lg:px-12 lg:py-[110px]">
        <div className="mx-auto max-w-[1350px]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className={eyebrow}>Explore further</p>

              <h2
                data-ch-title
                className={`mt-5 ${heading}`}
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
                key={item.label}
                href={item.href}
                className="group flex min-h-[110px] items-center justify-between gap-4 rounded-[22px] border border-[#B12025]/15 bg-[#fff9f9] p-6 transition hover:border-[#B12025]"
              >
                <span className="flex items-center gap-5">
                  <span className="font-mono text-[12px] font-semibold text-[#B12025]">
                    0{index + 1}
                  </span>

                  <span className="text-[16px] font-semibold">
                    {item.label}
                  </span>
                </span>

                <ArrowUpRight
                  size={20}
                  className="shrink-0 text-[#B12025] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TWO-STEP ENQUIRY PLANNER */}

      <section className="bg-[#fff9f9] px-5 py-[95px] sm:px-8 lg:px-12 lg:py-[115px]">
        <div className="mx-auto grid max-w-[1350px] gap-10 rounded-[30px] border border-[#B12025]/15 bg-white p-7 sm:p-10 lg:grid-cols-[.85fr_1.15fr] lg:p-14">
          <div>
            <p className={eyebrow}>Free discovery call</p>

            <h2
              data-ch-title
              className={`mt-5 ${heading}`}
            >
              <AnimatedWords
                text="Tell us what you need help with."
              />
            </h2>

            <p className="mt-5 text-[13px] leading-8 text-[#17191C]/65">
              Fill this in to book your free discovery
              call. You'll hear back within one working
              day, with a clear answer on how FirstNotch
              can help.
            </p>
          </div>

          <div className="rounded-[24px] bg-[#fff8f8] p-6 sm:p-9">
            <p className="text-[11px] font-semibold uppercase tracking-[.18em] text-[#B12025]">
              Question {plannerStep + 1} of 2
            </p>

            <div className="mt-5 flex gap-2">
              {[0, 1].map((index) => (
                <span
                  key={index}
                  className={`h-[4px] flex-1 rounded-full ${
                    index <= plannerStep
                      ? 'bg-[#B12025]'
                      : 'bg-[#B12025]/15'
                  }`}
                />
              ))}
            </div>

            <h3 className="mt-8 text-[21px] font-semibold">
              {plannerStep === 0
                ? 'What do you get complaints about?'
                : 'When would you like your team to start?'}
            </h3>

            <div className="mt-6 space-y-2">
              {(plannerStep === 0
                ? [...complaintTypes]
                : [
                    'As soon as possible',
                    'Within the next month',
                    'In 1 to 3 months',
                    'Just exploring for now',
                  ]
              ).map((item) => {
                const active =
                  plannerStep === 0
                    ? plannerIssue === item
                    : plannerStart === item;

                return (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={active}
                    onClick={() => {
                      if (plannerStep === 0) {
                        setPlannerIssue(item);
                      } else {
                        setPlannerStart(item);
                      }

                      setPlannerError('');
                    }}
                    className={`flex w-full items-center justify-between rounded-[14px] border px-5 py-4 text-left text-[12px] font-semibold transition ${
                      active
                        ? 'border-[#B12025] bg-[#B12025] text-white'
                        : 'border-[#B12025]/15 bg-white'
                    }`}
                  >
                    {item}
                    {active && <Check size={16} />}
                  </button>
                );
              })}
            </div>

            {plannerError && (
              <p
                role="alert"
                className="mt-4 text-[12px] font-semibold text-[#B12025]"
              >
                {plannerError}
              </p>
            )}

            <div className="mt-8 flex justify-between gap-3">
              <button
                type="button"
                disabled={plannerStep === 0}
                onClick={() => {
                  setPlannerStep(0);
                  setPlannerError('');
                }}
                className="rounded-full border border-[#B12025]/20 px-5 py-3 text-[12px] font-semibold disabled:opacity-30"
              >
                Back
              </button>

              <button
                type="button"
                onClick={nextPlannerStep}
                className="inline-flex items-center gap-2 rounded-full bg-[#B12025] px-6 py-3 text-[12px] font-semibold text-white"
              >
                {plannerStep === 0
                  ? 'Next'
                  : 'Continue to contact form'}

                <ArrowRight size={16} />
              </button>
            </div>

            <p className="mt-5 text-[10px] leading-6 text-[#17191C]/55">
              This is an enquiry planner, not a booking
              submission. Complete the contact form
              below to send your enquiry.
            </p>

            <noscript>
              <a
                href="#contact"
                className="mt-3 inline-block text-[12px] font-semibold text-[#B12025] underline"
              >
                Go directly to the contact form
              </a>
            </noscript>
          </div>
        </div>
      </section>

      {/* Existing StoryContact component is rendered
          by the Next.js route after this page. */}
    </div>
  );
}
