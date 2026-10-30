
'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import WebCosmosHero from '@/components/services/WebCosmosHero';

import {
  ArrowDown,
  ArrowUpRight,
  CalendarCheck2,
  Check,
  ChevronDown,
  ClipboardCheck,
  Code2,
  FileCode2,
  Gauge,
  LayoutTemplate,
  Mail,
  Menu,
  Monitor,
  PencilLine,
  Rocket,
  Search,
  Settings2,
  ShieldCheck,
  Smartphone,
  Tablet,
  TrendingUp,
  Users,
  WandSparkles,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const BASE = '/services/it-services';
const RED = '#B12025';

// ======================================================
// CONTENT
// ======================================================

const features = [
  {
    title: 'Planning with you',
    Icon: ClipboardCheck,
    text:
      'Pages, content and goals are agreed before design starts, so the build has a clear brief.',
    tag: 'A clear plan',
  },
  {
    title: 'Custom design',
    Icon: WandSparkles,
    text:
      'Layouts use your logo, colours and fonts. You review the designs before any code is written.',
    tag: 'Your brand',
  },
  {
    title: 'Modern frameworks',
    Icon: Code2,
    text:
      'Sites are built with Next.js, React or WordPress, depending on how you want to edit the site and how fast it must load.',
    tag: 'Technology that fits',
  },
  {
    title: 'Built for phones',
    Icon: Smartphone,
    text:
      'Every page is tested on phones and tablets as well as desktop screens.',
    tag: 'All screen sizes',
  },
  {
    title: 'Fast loading',
    Icon: Gauge,
    text:
      'Images, code and hosting are set up for speed. Pages are tested against Google’s Core Web Vitals before launch.',
    tag: 'Performance first',
  },
  {
    title: 'Search basics in place',
    Icon: Search,
    text:
      'Page titles, descriptions, headings and a site map are set up so search engines can read the site.',
    tag: 'Ready to be found',
  },
  {
    title: 'Easy editing',
    Icon: PencilLine,
    text:
      'Your team can change text and images in a simple editor.',
    tag: 'You stay in control',
  },
  {
    title: 'Launch and handover',
    Icon: Rocket,
    text:
      'The site goes live on a date agreed with you. You get training on editing it, plus 30 days of fixes after launch.',
    tag: 'A supported launch',
  },
] as const;

const buildStages = [
  {
    tag: 'BRIEF',
    title: 'Plan together',
    desc:
      'Agree the pages, content, audience and enquiries your website needs to support.',
    Icon: ClipboardCheck,
  },
  {
    tag: 'DESIGN',
    title: 'Made for your brand',
    desc:
      'Review layouts, colours, type and the mobile experience before development.',
    Icon: LayoutTemplate,
  },
  {
    tag: 'BUILD',
    title: 'Built to work',
    desc:
      'Choose a suitable framework and make the pages easy for your team to manage.',
    Icon: FileCode2,
  },
  {
    tag: 'TEST',
    title: 'Check every detail',
    desc:
      'Review page speed, phone layouts, search basics and enquiry actions.',
    Icon: Gauge,
  },
  {
    tag: 'LAUNCH',
    title: 'Ready to go live',
    desc:
      'Launch on the agreed date with training and the agreed after-launch support.',
    Icon: Rocket,
  },
] as const;

const metrics = [
  {
    title: 'Page load time',
    Icon: Gauge,
    desc:
      'How long the main pages take to appear on a phone.',
    note: 'Target agreed in the brief.',
  },
  {
    title: 'Core Web Vitals',
    Icon: TrendingUp,
    desc: 'Google’s scores for speed and stability.',
    note: 'Checked before launch.',
  },
  {
    title: 'Enquiries',
    Icon: Mail,
    desc:
      'Form submissions and clicks to call or email.',
    note: 'Tracked from launch day.',
  },
  {
    title: 'Mobile checks',
    Icon: Smartphone,
    desc:
      'Pages tested on common phone and tablet sizes.',
    note: 'Every page, before launch.',
  },
  {
    title: 'Launch date',
    Icon: CalendarCheck2,
    desc:
      'Whether the site went live on the date agreed.',
    note: 'Shared in each weekly update.',
  },
] as const;

const faqs = [
  {
    q: 'How long does a new website take?',
    a:
      'Most sites take six to ten weeks from the first plan to launch. The actual schedule is agreed in your proposal.',
  },
  {
    q: 'Can you redesign our current site?',
    a:
      'Yes. The team reviews what works now and moves the content you choose into the new design. Old page addresses can be redirected so visitors and search engines reach their new pages.',
  },
  {
    q: 'Can you write the content too?',
    a:
      'Yes. Copywriting and photos can be included, or you can supply your own.',
  },
  {
    q: 'What happens after launch?',
    a:
      'Website maintenance can start straight after launch, so updates and security checks carry on.',
  },
  {
    q: 'How is a website priced?',
    a:
      'Each site is priced as a fixed project, based on the number of pages and features. A deposit is paid at the start and the balance at launch. A written quote is sent after the discovery call.',
  },
] as const;

const team = [
  {
    title: 'Learning your business',
    Icon: ClipboardCheck,
    text:
      'The team documents your systems, accounts and current setup, and agrees access and priorities with you.',
  },
  {
    title: 'Hiring and training',
    Icon: Users,
    text:
      'Team members take language tests, technical assessments and reference checks. Only 15 to 20% of job applicants pass. Each one is then trained on your systems and tools before starting.',
  },
  {
    title: 'Going live with quality checks',
    Icon: ShieldCheck,
    text:
      'Every ticket and project task gets a quality score. Work starts with lower-risk tasks, and access widens once you sign it off. Each team member has a monthly performance review with coaching.',
  },
  {
    title: 'Reporting and improving',
    Icon: TrendingUp,
    text:
      'You get a monthly report on tickets, response times, uptime and open issues, plus a call to agree what to improve.',
  },
] as const;

// ======================================================
// SCROLL REVEAL TEXT
// ======================================================

function ScrollTitle({
  children,
  light = false,
}: {
  children: string;
  light?: boolean;
}) {
  return (
    <h2
      data-wd-heading
      className={`max-w-[960px] text-[clamp(2.15rem,4.6vw,4.9rem)] font-semibold leading-[1.08] tracking-[-.065em] ${
        light ? 'text-white' : 'text-[#17191C]'
      }`}
    >
      {children.split(' ').map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-bottom"
        >
          <span
            data-wd-word
            className="inline-block"
          >
            {word}
          </span>
          {'\u00a0'}
        </span>
      ))}
    </h2>
  );
}

function SectionHead({
  eyebrow,
  title,
  desc,
  light = false,
}: {
  eyebrow: string;
  title: string;
  desc?: string;
  light?: boolean;
}) {
  return (
    <div>
      <p
        data-wd-fade
        className={`mb-3 text-[10px] font-bold uppercase tracking-[.22em] ${
          light ? 'text-white/75' : 'text-[#B12025]'
        }`}
      >
        {eyebrow}
      </p>

      <ScrollTitle light={light}>
        {title}
      </ScrollTitle>

      {desc && (
        <p
          data-wd-fade
          className={`mt-4 max-w-[700px] text-[14px] leading-[1.8] ${
            light
              ? 'text-white/80'
              : 'text-[#17191C]/65'
          }`}
        >
          {desc}
        </p>
      )}
    </div>
  );
}

// ======================================================
// WEBSITE PREVIEW INSIDE THE GLYPH PORTAL
// ======================================================

function SampleBrowser() {
  return (
    <div className="w-full overflow-hidden rounded-[16px] border border-[#B12025]/15 bg-white shadow-[0_16px_45px_rgba(80,10,25,.12)]">
      <div className="flex h-9 items-center gap-2 border-b border-[#17191C]/10 bg-[#F7F7F8] px-3">
        <div className="h-2 w-2 rounded-full bg-[#B12025]/45" />
        <div className="h-2 w-2 rounded-full bg-[#B12025]/20" />
        <span className="ml-2 truncate font-mono text-[9px] text-[#17191C]/50">
          https://yourbrand.lk
        </span>
      </div>

      <div className="p-5 sm:p-7">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-black text-[#B12025]">
            YOUR BRAND
          </span>
          <Menu
            size={16}
            className="text-[#B12025]"
          />
        </div>

        <p className="mt-9 text-[clamp(1.7rem,3vw,2.5rem)] font-semibold leading-[1.1] tracking-[-.055em]">
          Beautifully designed.
          <br />
          Easy to use.
        </p>

        <p className="mt-3 text-[11px] leading-5 text-[#17191C]/60">
          A website that feels like your business.
        </p>

        <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#B12025] px-4 py-2 text-[10px] font-bold text-white">
          Contact us
          <ArrowUpRight size={12} />
        </span>

        <div className="mt-7 grid grid-cols-3 gap-2">
          <div className="h-12 rounded-lg bg-[#FCE4E5]" />
          <div className="h-12 rounded-lg bg-[#F5F5F5]" />
          <div className="h-12 rounded-lg bg-[#FCE4E5]" />
        </div>
      </div>
    </div>
  );
}
// ======================================================
// FIRSTNOTCH — AUTO SLIDING SERVICE CAROUSEL
// ======================================================

function WebDevelopmentFeaturesCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
 

  const total = features.length;

// ==========================================
// AUTOMATIC INFINITE CAROUSEL
// ==========================================

useEffect(() => {
  const interval = window.setInterval(() => {
    setActiveIndex((current) => (current + 1) % total);
  }, 3500);

  return () => window.clearInterval(interval);
}, [total]);

  return (
 
 <div className="relative mt-12 w-full">
      {/* Carousel viewport */}
      <div className="relative mx-auto h-[390px] w-full overflow-hidden sm:h-[430px] lg:h-[460px]">
        <div className="relative mx-auto h-full w-full max-w-[1320px]">
          {features.map((feature, index) => {
            let offset = index - activeIndex;

            // Infinite circular positioning
            if (offset > total / 2) {
              offset -= total;
            }

            if (offset < -total / 2) {
              offset += total;
            }

            const isActive = offset === 0;
            const isVisible = Math.abs(offset) <= 1;

            return (
              <article
                key={feature.title}
                aria-hidden={!isVisible}
                inert={!isVisible}
                className={`
                  absolute left-1/2 top-1/2
                  flex flex-col
                  rounded-[26px]
                  border
                  bg-white
                  transition-[transform,opacity,box-shadow,border-color]
                  duration-700
                  ease-[cubic-bezier(0.22,1,0.36,1)]
                  will-change-transform

                  ${
                    isActive
                      ? 'z-30 border-[#B12025]/25 shadow-[0_25px_75px_rgba(177,32,37,0.13)]'
                      : 'z-10 border-[#E8E8E8] shadow-[0_12px_40px_rgba(0,0,0,0.06)]'
                  }

                  ${
                    isVisible
                      ? 'pointer-events-auto'
                      : 'pointer-events-none'
                  }

                  w-[min(82vw,520px)]
                  h-[330px]
                  sm:h-[360px]
                  lg:h-[385px]
                `}
                style={{
                  transform: `
                    translate(
                      calc(-50% + ${offset * 83}%),
                      -50%
                    )
                    scale(${isActive ? 1 : 0.82})
                  `,
                  opacity: isVisible
                    ? isActive
                      ? 1
                      : 0.65
                    : 0,
                  zIndex: isActive ? 30 : 10,
                }}
              >
                

                <div className="flex flex-1 flex-col p-6 sm:p-8 lg:p-9">
                  {/* Card header */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="font-mono text-[11px] font-semibold tracking-[0.15em] text-[#B12025]">
                        {String(index + 1).padStart(2, '0')}
                        {' / '}
                        {String(total).padStart(2, '0')}
                      </span>

                      <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.17em] text-[#17191C]/40">
                        Web development
                      </p>
                    </div>

                    <div
                      className={`
                        flex h-[52px] w-[52px]
                        shrink-0 items-center justify-center
                        rounded-[16px]
                        transition-colors duration-500
                        ${
                          isActive
                            ? 'bg-[#B12025] text-white'
                            : 'bg-[#FBEDEE] text-[#B12025]'
                        }
                      `}
                    >
                      <feature.Icon
                        size={25}
                        strokeWidth={1.7}
                      />
                    </div>
                  </div>

                  {/* Card content */}
                  <div className="mt-6">
                    <h3
                      className={`
                        font-semibold
                        leading-[1.15]
                        tracking-[-0.055em]
                        text-[#17191C]
                        transition-all duration-500

                        ${
                          isActive
                            ? 'text-[clamp(1.65rem,3vw,2.5rem)]'
                            : 'text-[clamp(1.45rem,2.5vw,2.1rem)]'
                        }
                      `}
                    >
                      {feature.title}
                    </h3>

                    <p className="mt-4 max-w-[440px] text-[12px] leading-[1.85] text-[#17191C]/65 sm:text-[13px]">
                      {feature.text}
                    </p>
                  </div>

                  {/* Card footer */}
                  <div className="mt-auto border-t border-[#17191C]/10 pt-5">
                    <div className="flex items-center gap-2">
                      <span
                        className={`
                          flex h-[25px] w-[25px]
                          items-center justify-center
                          rounded-full

                          ${
                            isActive
                              ? 'bg-[#B12025] text-white'
                              : 'bg-[#B12025]/10 text-[#B12025]'
                          }
                        `}
                      >
                        <Check size={14} strokeWidth={2.4} />
                      </span>

                      <span className="text-[12px] font-semibold text-[#B12025]">
                        {feature.tag}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Pagination dots — click to choose a card */}
      <div className="mt-[30px] flex items-center justify-center gap-[8px]" aria-label="Web development carousel pagination">
        {features.map((feature, index) => (
          <button
            key={feature.title}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Show service ${index + 1}: ${feature.title}`}
            aria-current={activeIndex === index ? 'true' : undefined}
            className={`h-[7px] rounded-full transition-all duration-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B12025] ${
              activeIndex === index
                ? 'w-[30px] bg-[#B12025]'
                : 'w-[7px] bg-[#B12025]/20 hover:bg-[#B12025]/50'
            }`}
          />
        ))}
      </div>

      {/* Bottom text */}
      <p className="mt-5 text-center text-[11px] tracking-[0.04em] text-[#17191C]/45">
        Explore all eight services
      </p>
    </div>
  );
}
// ======================================================
// MAIN PAGE
// ======================================================

export default function WebDevelopmentPage() {
  const root = useRef<HTMLDivElement>(null);

  const journey = useRef<HTMLElement>(null);
  const journeyTrack = useRef<HTMLDivElement>(null);

  const [stage, setStage] = useState(0);
  const [width, setWidth] = useState(680);

  const [editorTitle, setEditorTitle] = useState(
    'A better stay starts here.'
  );

  const [editorCta, setEditorCta] = useState(
    'Explore rooms'
  );

  const [faq, setFaq] = useState<number | null>(0);

  const [project, setProject] = useState(
    'New website'
  );

  // ====================================================
  // GSAP ANIMATIONS
  // ====================================================

  useEffect(() => {
    if (!root.current) return;

    const mm = gsap.matchMedia();

    mm.add(
      '(prefers-reduced-motion: no-preference)',
      () => {
        const ctx = gsap.context(() => {
          // Rising hero headings

          gsap.fromTo(
            '[data-wd-hero-rise]',
            {
              yPercent: 115,
              opacity: 0,
            },
            {
              yPercent: 0,
              opacity: 1,
              duration: 1.05,
              stagger: 0.11,
              ease: 'power4.out',
            }
          );

          gsap.fromTo(
            '[data-wd-hero-fade]',
            {
              y: 20,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              delay: 0.25,
              stagger: 0.09,
              ease: 'power3.out',
            }
          );

          // Heading text scrolling reveals

          gsap.utils
            .toArray<HTMLElement>(
              '[data-wd-heading]'
            )
            .forEach((heading) => {
              gsap.fromTo(
                heading.querySelectorAll(
                  '[data-wd-word]'
                ),
                {
                  yPercent: 95,
                  opacity: 0.15,
                },
                {
                  yPercent: 0,
                  opacity: 1,
                  stagger: 0.018,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: heading,
                    start: 'top 91%',
                    end: 'bottom 61%',
                    scrub: 0.6,
                  },
                }
              );
            });

          // Paragraph and eyebrow animations

          gsap.utils
            .toArray<HTMLElement>(
              '[data-wd-fade]'
            )
            .forEach((element) => {
              gsap.fromTo(
                element,
                {
                  y: 16,
                  opacity: 0,
                },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.75,
                  ease: 'power3.out',
                  scrollTrigger: {
                    trigger: element,
                    start: 'top 92%',
                    once: true,
                  },
                }
              );
            });



          // Testimonial text reveal

          gsap.fromTo(
            '[data-wd-quote-word]',
            {
              opacity: 0.17,
              y: 13,
            },
            {
              opacity: 1,
              y: 0,
              stagger: 0.02,
              ease: 'none',
              scrollTrigger: {
                trigger: '#wd-quote',
                start: 'top 80%',
                end: 'bottom 58%',
                scrub: 0.7,
              },
            }
          );

          // Four-step team progress line

          gsap.fromTo(
            '[data-wd-process-line]',
            {
              scaleX: 0,
            },
            {
              scaleX: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: '#wd-team',
                start: 'top 79%',
                end: 'bottom 50%',
                scrub: true,
              },
            }
          );

          // Top scroll progress bar

          gsap.fromTo(
            '[data-wd-progress]',
            {
              scaleX: 0,
            },
            {
              scaleX: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: root.current,
                start: 'top top',
                end: 'bottom bottom',
                scrub: true,
              },
            }
          );
        }, root);

        return () => ctx.revert();
      }
    );

    // Desktop horizontal-scroll build journey

    mm.add(
      '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
      () => {
        if (!journey.current || !journeyTrack.current) {
          return;
        }

        const section = journey.current;
        const track = journeyTrack.current;

        const ctx = gsap.context(() => {
          const distance = () =>
            Math.max(
              0,
              track.scrollWidth -
                window.innerWidth +
                32
            );

          gsap.to(track, {
            x: () => -distance(),
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top+=80',
              end: () =>
                `+=${Math.max(1, distance())}`,
              scrub: 1,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) =>
                setStage(
                  Math.min(
                    4,
                    Math.round(
                      self.progress * 4
                    )
                  )
                ),
            },
          });
        }, section);

        return () => ctx.revert();
      }
    );

    return () => mm.revert();
  }, []);

  const faqJson = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };

  return (
    <div
      ref={root}
      className="bg-white font-sans text-[#17191C]"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJson).replace(
            /</g,
            '\\u003c'
          ),
        }}
      />

      {/* SCROLL PROGRESS */}

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]"
      >
        <div
          data-wd-progress
          className="h-full w-full origin-left bg-[#B12025]"
        />
      </div>

      {/* ==============================================
          01 — NEW 21ST.DEV GLYPH PORTAL HERO
      ============================================== */}
{/* ==============================================
    01 — THREE.JS COSMIC WEB DEVELOPMENT HERO
============================================== */}

<WebCosmosHero />
    
      {/* ==============================================
    02 — WHAT WEB DEVELOPMENT INCLUDES
    PREMIUM AUTO SLIDING CAROUSEL
============================================== */}

<section
  id="wd-included"
  className="
    relative
    scroll-mt-24
    overflow-hidden
    bg-[#F7F7F8]
    px-5
    py-20
    sm:px-8
    lg:px-14
    lg:py-28
  "
>
  {/* Soft red background glow */}
  <div
    aria-hidden="true"
    className="
      pointer-events-none
      absolute
      left-1/2
      top-[45%]
      h-[550px]
      w-[850px]
      -translate-x-1/2
      rounded-full
      bg-[#B12025]/[0.035]
      blur-[100px]
    "
  />

  <div className="relative z-10 mx-auto max-w-[1420px]">
    {/* Section heading */}
    <div className="text-center">
      <p
        data-wd-fade
        className="
          mb-4
          text-[10px]
          font-bold
          uppercase
          tracking-[0.24em]
          text-[#B12025]
        "
      >
        01 / INCLUDED IN THE BUILD
      </p>

      <h2
        className="
          mx-auto
          max-w-[950px]
          text-[clamp(2.4rem,5vw,5rem)]
          font-semibold
          leading-[1.08]
          tracking-[-0.065em]
          text-[#17191C]
        "
      >
        What the web development
        <br className="hidden sm:block" />
        <span className="text-[#B12025]">
          {' '}service includes
        </span>
      </h2>

      <p
        data-wd-fade
        className="
          mx-auto
          mt-6
          max-w-[620px]
          text-[14px]
          leading-[1.85]
          text-[#17191C]/60
        "
      >
        From the first plan to launch, every part is
        designed around how your business works.
      </p>
    </div>

    {/* Automatic 3-card carousel */}
    <WebDevelopmentFeaturesCarousel />
  </div>
</section>
      {/* ==============================================
          03 — RESPONSIVE DEVICE PREVIEW
      ============================================== */}

      <section
        id="wd-responsive"
        className="bg-white px-5 py-16 sm:px-8 lg:px-14 lg:py-20"
      >
        <div className="mx-auto max-w-[1420px]">
          <SectionHead
            eyebrow="02 / Built for phones"
            title="One site. Every screen."
            desc="Resize this example to see its layout adapt. This is an illustration, not a live client website."
          />

          <div className="mt-8 grid items-start gap-8 lg:grid-cols-[.32fr_.68fr] lg:gap-10">
            <div className="rounded-[22px] border border-[#E6E7E9] bg-[#FAFAFA] p-6">
              <p className="text-[10px] font-bold uppercase tracking-[.15em] text-[#B12025]">
                Responsive preview
              </p>

              <p
                aria-live="polite"
                className="mt-5 text-[clamp(2.2rem,4vw,3.8rem)] font-semibold tracking-[-.06em] text-[#B12025]"
              >
                {width}
                <span className="ml-2 text-[14px] font-medium">
                  px
                </span>
              </p>

              <label
                htmlFor="wd-width"
                className="mt-5 block text-[12px] font-semibold"
              >
                Adjust screen width
              </label>

              <input
                id="wd-width"
                type="range"
                min={360}
                max={920}
                step={10}
                value={width}
                onChange={(e) =>
                  setWidth(Number(e.target.value))
                }
                className="mt-3 w-full accent-[#B12025]"
              />

              <div className="mt-5 flex flex-wrap gap-2">
                {(
                  [
                    {
                      px: 390,
                      name: 'Phone',
                      Icon: Smartphone,
                    },
                    {
                      px: 680,
                      name: 'Tablet',
                      Icon: Tablet,
                    },
                    {
                      px: 920,
                      name: 'Desktop',
                      Icon: Monitor,
                    },
                  ] as const
                ).map((v) => (
                  <button
                    type="button"
                    key={v.name}
                    onClick={() => setWidth(v.px)}
                    className={`flex items-center gap-2 rounded-full border px-3 py-2 text-[11px] font-semibold ${
                      Math.abs(width - v.px) < 20
                        ? 'border-[#B12025] bg-[#B12025] text-white'
                        : 'border-[#B12025]/30 bg-white text-[#B12025]'
                    }`}
                  >
                    <v.Icon size={14} />
                    {v.name}
                  </button>
                ))}
              </div>

              <p className="mt-6 text-[12px] leading-6 text-[#17191C]/60">
                Your content moves from a multi-column
                layout to a clean single-column experience.
              </p>
            </div>

            <div className="flex min-h-[360px] justify-center overflow-hidden rounded-[22px] border border-[#E6E7E9] bg-[#F5F5F6] p-3 sm:p-5">
              <div
                style={{
                  width: `${width}px`,
                  maxWidth: '100%',
                }}
                className="overflow-hidden rounded-[14px] border border-[#B12025]/15 bg-white shadow-xl transition-[width] duration-300"
              >
                <div className="flex h-9 items-center gap-2 border-b border-[#17191C]/10 bg-[#FAFAFA] px-3">
                  <span className="h-2 w-2 rounded-full bg-[#B12025]/50" />
                  <span className="h-2 w-2 rounded-full bg-[#B12025]/20" />
                  <span className="ml-2 font-mono text-[9px] text-[#17191C]/50">
                    yourbrand.lk
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-[#17191C]/10 px-4 py-3">
                  <strong className="text-[12px] text-[#B12025]">
                    YOUR BRAND
                  </strong>

                  {width < 600 ? (
                    <Menu size={18} />
                  ) : (
                    <span className="text-[10px] text-[#17191C]/55">
                      Home　About　Contact
                    </span>
                  )}
                </div>

                <div
                  className={`p-5 sm:p-7 ${
                    width >= 600
                      ? 'grid grid-cols-2 items-center gap-6'
                      : ''
                  }`}
                >
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[.15em] text-[#B12025]">
                      YOUR ONLINE HOME
                    </p>

                    <h3 className="mt-2 text-[clamp(1.5rem,3vw,2.7rem)] font-semibold leading-tight tracking-[-.06em]">
                      Welcome to something better.
                    </h3>

                    <p className="mt-3 text-[11px] leading-6 text-[#17191C]/65">
                      Clean design. Clear content.
                      More ways to enquire.
                    </p>

                    <span className="mt-4 inline-flex rounded-full bg-[#B12025] px-4 py-2 text-[10px] font-semibold text-white">
                      Get started
                    </span>
                  </div>

                  <div
                    className={`rounded-[14px] bg-[#F9E6E6] p-5 ${
                      width < 600 ? 'mt-5' : ''
                    }`}
                  >
                    <div className="h-28 rounded-xl bg-white/85" />
                    <div className="mt-3 h-2 w-2/3 rounded-full bg-[#B12025]/25" />
                    <div className="mt-2 h-2 w-1/2 rounded-full bg-[#B12025]/15" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==============================================
          04 — LIVE CONTENT EDITOR
      ============================================== */}

      <section
        id="wd-editor"
        className="bg-[#FFF5F5] px-5 py-16 sm:px-8 lg:px-14 lg:py-20"
      >
        <div className="mx-auto max-w-[1420px]">
          <SectionHead
            eyebrow="03 / Easy editing"
            title="Change the words. See the result."
            desc="Edit the sample headline and button below. The preview updates instantly without saving or publishing anything."
          />

          <div className="mt-8 grid overflow-hidden rounded-[23px] border border-[#B12025]/15 bg-white lg:grid-cols-[.4fr_.6fr]">
            <div className="border-b border-[#B12025]/15 p-6 lg:border-b-0 lg:border-r lg:p-8">
              <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.14em] text-[#B12025]">
                <Settings2 size={17} />
                Example editor
              </p>

              <label
                htmlFor="wd-edit-heading"
                className="mt-8 block text-[12px] font-semibold"
              >
                Homepage heading
              </label>

              <textarea
                id="wd-edit-heading"
                value={editorTitle}
                maxLength={80}
                onChange={(e) =>
                  setEditorTitle(e.target.value)
                }
                rows={3}
                className="mt-2 w-full resize-none rounded-xl border border-[#B12025]/25 bg-[#FAFAFA] px-4 py-3 text-[14px] outline-none focus:border-[#B12025]"
              />

              <label
                htmlFor="wd-edit-button"
                className="mt-5 block text-[12px] font-semibold"
              >
                Button text
              </label>

              <input
                id="wd-edit-button"
                value={editorCta}
                maxLength={32}
                onChange={(e) =>
                  setEditorCta(e.target.value)
                }
                className="mt-2 w-full rounded-xl border border-[#B12025]/25 bg-[#FAFAFA] px-4 py-3 text-[14px] outline-none focus:border-[#B12025]"
              />

              <button
                type="button"
                onClick={() => {
                  setEditorTitle(
                    'A better stay starts here.'
                  );
                  setEditorCta('Explore rooms');
                }}
                className="mt-5 text-[12px] font-semibold text-[#B12025] underline underline-offset-4"
              >
                Reset example
              </button>
            </div>

            <div className="flex flex-col justify-center bg-[#FBF4F4] p-5 sm:p-8">
              <div className="rounded-[18px] bg-white p-7 shadow-[0_15px_45px_rgba(73,15,20,.05)]">
                <div className="flex justify-between border-b border-[#17191C]/10 pb-4">
                  <strong className="text-[13px] text-[#B12025]">
                    SAMPLE HOTEL
                  </strong>

                  <Menu size={18} />
                </div>

                <p className="mt-8 text-[10px] font-bold uppercase tracking-[.16em] text-[#B12025]">
                  PREVIEW
                </p>

                <h3
                  aria-live="polite"
                  className="mt-3 break-words text-[clamp(1.8rem,3.8vw,4rem)] font-semibold leading-[1.1] tracking-[-.065em]"
                >
                  {editorTitle ||
                    'Your heading appears here.'}
                </h3>

                <p className="mt-4 text-[12px] leading-6 text-[#17191C]/60">
                  Your team can update everyday
                  content without a developer.
                </p>

                <span className="mt-5 inline-flex max-w-full items-center gap-2 overflow-hidden rounded-full bg-[#B12025] px-5 py-3 text-[11px] font-bold text-white">
                  <span className="truncate">
                    {editorCta || 'Your button'}
                  </span>
                  <ArrowUpRight size={15} />
                </span>
              </div>

              <p className="mt-3 text-[11px] text-[#17191C]/50">
                Example data · Changes stay in this preview
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==============================================
          05 — GSAP HORIZONTAL BUILD JOURNEY
      ============================================== */}

      <section
        ref={journey}
        id="wd-process"
        className="scroll-mt-24 overflow-hidden bg-[#B12025] py-14 text-white lg:py-12"
      >
        <div className="mx-auto max-w-[1420px] px-5 sm:px-8 lg:px-14">
          <SectionHead
            eyebrow="04 / How we build"
            title="From the first brief to launch"
            desc="Five clear stages. Scroll to move sideways through each part of the project."
            light
          />

          <p className="mt-5 text-[11px] uppercase tracking-[.15em] text-white/70">
            <span className="hidden lg:inline">
              Scroll down to move the cards sideways
            </span>
            <span className="lg:hidden">
              Swipe the cards to explore
            </span>
          </p>
        </div>

        <div
          className="mt-7 snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:snap-none lg:overflow-visible"
          onScroll={(e) => {
            if (window.innerWidth >= 1024) return;

            const node = e.currentTarget;
            const max =
              node.scrollWidth - node.clientWidth;

            if (max > 0) {
              setStage(
                Math.min(
                  4,
                  Math.round(
                    (node.scrollLeft / max) * 4
                  )
                )
              );
            }
          }}
        >
          <div
            ref={journeyTrack}
            className="flex w-max gap-4 px-5 sm:gap-5 sm:px-8 lg:gap-6 lg:px-14"
          >
            {buildStages.map((item, i) => (
              <article
                key={item.tag}
                className="flex min-h-[290px] w-[min(85vw,430px)] shrink-0 snap-center flex-col justify-between rounded-[22px] bg-white p-6 text-[#17191C] sm:w-[430px] sm:p-8 lg:w-[480px]"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] text-[#B12025]">
                      0{i + 1} / 05
                    </span>

                    <item.Icon
                      size={25}
                      className="text-[#B12025]"
                    />
                  </div>

                  <p className="mt-8 text-[10px] font-bold uppercase tracking-[.17em] text-[#B12025]">
                    {item.tag}
                  </p>

                  <h3 className="mt-2 text-[clamp(1.8rem,2.4vw,2.5rem)] font-semibold tracking-[-.06em]">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-[13px] leading-7 text-[#17191C]/65">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 h-[3px] bg-[#B12025]/15">
                  <div
                    className="h-full bg-[#B12025]"
                    style={{
                      width: `${(i + 1) * 20}%`,
                    }}
                  />
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-6 max-w-[1420px] px-5 sm:px-8 lg:px-14">
          <div className="h-[3px] bg-white/25">
            <div
              className="h-full bg-white transition-[width] duration-200"
              style={{
                width: `${(stage + 1) * 20}%`,
              }}
            />
          </div>

          <p className="mt-2 font-mono text-[10px] text-white/70">
            0{stage + 1} / 05 —{' '}
            {buildStages[stage].tag}
          </p>
        </div>
      </section>

      {/* ==============================================
          06 — REPORTING
      ============================================== */}

      <section
        id="wd-numbers"
        className="bg-white px-5 py-16 sm:px-8 lg:px-14 lg:py-20"
      >
        <div className="mx-auto max-w-[1420px]">
          <SectionHead
            eyebrow="05 / Real reporting"
            title="The numbers you will see"
            desc="Page speed and enquiries are checked before launch and for three months after. Targets are agreed in the project brief."
          />

          <div className="mt-8 overflow-hidden rounded-[22px] border border-[#E6E7E9]">
            <div className="flex flex-wrap justify-between gap-3 border-b border-[#E6E7E9] bg-[#F9F9F9] px-6 py-4">
              <span className="text-[11px] font-bold uppercase tracking-[.16em] text-[#B12025]">
                Website launch report
              </span>

              <span className="text-[10px] text-[#17191C]/50">
                Example layout only
              </span>
            </div>

            <dl className="divide-y divide-[#E6E7E9]">
              {metrics.map((metric) => (
                <div
                  key={metric.title}
                  className="grid gap-2 px-6 py-5 sm:grid-cols-[40px_1fr_1.2fr_.8fr] sm:items-center sm:gap-5"
                >
                  <metric.Icon
                    size={21}
                    className="text-[#B12025]"
                  />

                  <dt className="text-[15px] font-semibold">
                    {metric.title}
                  </dt>

                  <dd className="text-[12px] leading-6 text-[#17191C]/65">
                    {metric.desc}
                  </dd>

                  <dd className="text-[11px] font-semibold text-[#B12025]">
                    {metric.note}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-7 flex flex-wrap gap-x-10 gap-y-5 border-t border-[#B12025]/15 pt-6">
            {[
              ['85%', 'client retention rate'],
              [
                '98%',
                'accuracy rate across client work',
              ],
              [
                '15 to 20%',
                'of applicants pass hiring checks',
              ],
            ].map(([number, description]) => (
              <p
                key={description}
                className="text-[12px] text-[#17191C]/60"
              >
                <span className="mr-2 text-[25px] font-semibold text-[#B12025]">
                  {number}
                </span>
                {description}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ==============================================
          07 — TESTIMONIAL
      ============================================== */}

      <section
        id="wd-quote"
        className="bg-[#FFF4F4] px-5 py-16 sm:px-8 lg:px-14 lg:py-20"
      >
        <div className="mx-auto grid max-w-[1420px] items-center gap-9 lg:grid-cols-[1.1fr_.9fr] lg:gap-12">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#B12025]">
              Boutique hotel / Client experience
            </p>

            <blockquote className="mt-5 text-[clamp(2rem,3.9vw,4.1rem)] font-semibold leading-[1.19] tracking-[-.055em]">
              {'“Guests can now book rooms straight from our website, and it works well on a phone. More of our bookings come in directly instead of through travel sites.”'
                .split(' ')
                .map((word, i) => (
                  <span
                    key={`${word}-${i}`}
                    className="inline-block overflow-hidden align-bottom"
                  >
                    <span
                      data-wd-quote-word
                      className="inline-block"
                    >
                      {word}
                    </span>
                    {'\u00a0'}
                  </span>
                ))}
            </blockquote>

            <p className="mt-6 text-[11px] font-bold uppercase tracking-[.15em] text-[#B12025]">
              Boutique hotel
            </p>
          </div>

          <div className="mx-auto w-full max-w-[420px] -rotate-[2deg] rounded-[20px] border border-[#B12025]/20 bg-white p-7 shadow-[0_22px_55px_rgba(80,20,25,.06)]">
            <div className="flex items-center justify-between border-b border-[#17191C]/10 pb-4">
              <span className="text-[10px] font-bold uppercase tracking-[.15em] text-[#B12025]">
                Sample booking receipt
              </span>

              <CalendarCheck2
                size={18}
                className="text-[#B12025]"
              />
            </div>

            <h3 className="mt-7 text-[26px] font-semibold tracking-[-.05em]">
              Booking received.
            </h3>

            <p className="mt-2 text-[12px] leading-6 text-[#17191C]/65">
              A direct route from visitor to enquiry.
            </p>

            <div className="mt-5 space-y-3 border-y border-dashed border-[#17191C]/20 py-4 text-[12px]">
              <div className="flex justify-between">
                <span>Booking channel</span>
                <strong>Direct</strong>
              </div>

              <div className="flex justify-between">
                <span>Experience</span>
                <strong>Mobile-ready</strong>
              </div>
            </div>

            <p className="mt-6 inline-flex -rotate-[4deg] items-center gap-2 border-2 border-[#B12025] px-4 py-2 text-[14px] font-black uppercase tracking-[.13em] text-[#B12025]">
              <Check size={17} />
              Booked direct
            </p>

            <p className="mt-5 text-[10px] text-[#17191C]/50">
              Illustration, not a real booking record
            </p>
          </div>
        </div>
      </section>

      {/* ==============================================
          08 — FAQ
      ============================================== */}

      <section
        id="wd-faq"
        className="bg-white px-5 py-16 sm:px-8 lg:px-14 lg:py-20"
      >
        <div className="mx-auto grid max-w-[1420px] items-start gap-8 lg:grid-cols-[.84fr_1.16fr] lg:gap-14">
          <div className="lg:sticky lg:top-[110px]">
            <SectionHead
              eyebrow="06 / Questions answered"
              title="Common questions about web development"
            />
          </div>

          <div className="border-t border-[#17191C]/15">
            {faqs.map((item, i) => (
              <div
                key={item.q}
                className="border-b border-[#17191C]/15"
              >
                <h3>
                  <button
                    type="button"
                    aria-expanded={faq === i}
                    aria-controls={`wd-faq-${i}`}
                    onClick={() =>
                      setFaq((previous) =>
                        previous === i ? null : i
                      )
                    }
                    className="flex w-full items-center justify-between gap-4 py-5 text-left text-[16px] font-semibold focus-visible:outline-2 focus-visible:outline-[#B12025]"
                  >
                    {item.q}

                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-[#B12025] transition-transform ${
                        faq === i
                          ? 'rotate-180'
                          : ''
                      }`}
                    />
                  </button>
                </h3>

                <div
                  id={`wd-faq-${i}`}
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ${
                    faq === i
                      ? 'grid-rows-[1fr] opacity-100'
                      : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-5 text-[13px] leading-[1.9] text-[#17191C]/65">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==============================================
          09 — OTHER IT SERVICES
      ============================================== */}

      <section className="bg-[#F7F7F8] px-5 py-14 sm:px-8 lg:px-14 lg:py-16">
        <div className="mx-auto max-w-[1420px]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <ScrollTitle>
              Other IT services
            </ScrollTitle>

            <Link
              href={BASE}
              className="flex items-center gap-2 text-[12px] font-bold text-[#B12025]"
            >
              See all services
              <ArrowUpRight size={15} />
            </Link>
          </div>

          <div className="mt-7 grid gap-3 md:grid-cols-3">
            {(
              [
                [
                  'Website maintenance',
                  'website-maintenance',
                  'Updates and ongoing care after launch.',
                ],
                [
                  'IT support',
                  'it-support',
                  'Day-to-day help with business systems.',
                ],
                [
                  'Technical support',
                  'technical-support',
                  'Practical help when technology users need answers.',
                ],
              ] as const
            ).map(([title, slug, description]) => (
              <Link
                key={slug}
                href={`${BASE}/${slug}`}
                className="group flex min-h-[132px] flex-col justify-between rounded-[19px] border border-[#E6E7E9] bg-white p-5 transition hover:-translate-y-1 hover:border-[#B12025]/35"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-[16px] font-semibold">
                    {title}
                  </h3>

                  <ArrowUpRight
                    size={17}
                    className="shrink-0 text-[#B12025] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </div>

                <p className="mt-4 text-[12px] leading-5 text-[#17191C]/60">
                  {description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ==============================================
          10 — IT TEAM SETUP
      ============================================== */}

      <section
        id="wd-team"
        className="bg-white px-5 py-16 sm:px-8 lg:px-14 lg:py-20"
      >
        <div className="mx-auto max-w-[1420px]">
          <SectionHead
            eyebrow="07 / The FirstNotch team"
            title="How your IT services team is set up"
            desc="The biggest risk with outsourced IT services is a team that does not know your systems. These steps are there to stop that."
          />

          <div className="relative mt-9">
            <div className="absolute inset-x-0 top-0 hidden h-[2px] bg-[#B12025]/15 lg:block" />

            <div
              data-wd-process-line
              className="absolute inset-x-0 top-0 hidden h-[2px] origin-left bg-[#B12025] lg:block"
            />

            <ol className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((item, i) => (
                <li
                  key={item.title}
                  className="border-l border-[#B12025]/25 pl-4 lg:border-l-0 lg:pl-0 lg:pt-6"
                >
                  <div className="flex items-center gap-3 text-[#B12025]">
                    <item.Icon size={21} />

                    <span className="font-mono text-[11px] font-semibold">
                      0{i + 1}
                    </span>
                  </div>

                  <h3 className="mt-3 text-[18px] font-semibold tracking-[-.04em]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-[12px] leading-[1.85] text-[#17191C]/65">
                    {item.text}
                  </p>

                  {i === 1 && (
                    <Link
                      href="/how-we-hire"
                      className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-[#B12025]"
                    >
                      See how we hire
                      <ArrowUpRight size={13} />
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ==============================================
          11 — DISCOVERY CTA
      ============================================== */}

      <section className="bg-[#B12025] px-5 py-14 text-white sm:px-8 lg:px-14">
        <div className="mx-auto flex max-w-[1420px] flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.2em] text-white/70">
              Ready to build?
            </p>

            <h2 className="mt-3 text-[clamp(2rem,3.5vw,3.6rem)] font-semibold tracking-[-.06em]">
              Tell us what your website needs.
            </h2>

            <div className="mt-5 flex flex-wrap gap-2">
              {[
                'New website',
                'Redesign',
                'Content help',
              ].map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={project === item}
                  onClick={() => setProject(item)}
                  className={`rounded-full border px-4 py-2 text-[11px] font-semibold ${
                    project === item
                      ? 'border-white bg-white text-[#B12025]'
                      : 'border-white/50 text-white'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <p className="mt-2 text-[11px] text-white/65">
              Selected: {project}. Please mention
              this in the enquiry form below.
            </p>
          </div>

          <a
            href="#contact"
            className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-white px-6 text-[12px] font-bold text-[#B12025]"
          >
            Book a free discovery call
            <ArrowUpRight size={16} />
          </a>
        </div>
      </section>
    </div>
  );
}
