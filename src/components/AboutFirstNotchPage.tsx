
'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
  ArrowUpRight,
  BadgeCheck,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  Globe2,
  Handshake,
  HeartHandshake,
  Lightbulb,
  MoveUpRight,
  ShieldCheck,
  TrendingUp,
  Users,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ======================================================
// FIRSTNOTCH — ABOUT PAGE
// 21st.dev-inspired hero animation
//
// 1. Images enter from scattered positions
// 2. Images align into a horizontal line
// 3. Images form a large circular arrangement
// 4. Entire circle rotates slowly
// 5. Each individual image stays upright
//
// No Framer Motion dependency.
// ======================================================

// Temporary images from your uploaded 21st.dev code.
// Replace with /images/about/... paths later.

const PHOTOS = [
  'https://cdn.21st.dev/assets/mirror/4d/4d1bff4ea8b9f400dff7ae405f92e15bd39ec76e9285c7d96017e64ba1de3ae1.jpg',
  'https://cdn.21st.dev/assets/mirror/ee/ee36e332fe99d7611c43b90511db08a4f84e4545caa78e7b52e9ccffe273864b.jpg',
  'https://cdn.21st.dev/assets/mirror/dd/dddeaa4e6132c65bf7ff99d197f792a30937b5cbfe97a2b1ee54a793684df52e.jpg',
  'https://cdn.21st.dev/assets/mirror/48/487977107b5011b5e1c25289f6e4393ef555e1a92daee554788e9363b233ca14.jpg',
  'https://cdn.21st.dev/assets/mirror/a1/a12509688be6c9d3b2cb26d2ea1cfce48b8a8dbf2653e17be8a3fc31bd69f162.jpg',
  'https://cdn.21st.dev/assets/mirror/05/051f9e565b5b0b221384d9c27a0760febc3fb48d190c046adfda579f3614c958.jpg',
  'https://cdn.21st.dev/assets/mirror/87/87d4f60a4465d19d14b8acefa46275df4ccd767ccea6d7f234ea5bad99cfec56.jpg',
  'https://cdn.21st.dev/assets/mirror/06/0610989e0675a12c02d35aa5464e2644bf77913214b748b73a894808d2d79877.jpg',
  'https://cdn.21st.dev/assets/mirror/fe/fe90b90751e671a9526134c4743e2fcbf6c1a24991aba273ad7418c88fc9c701.jpg',
  'https://cdn.21st.dev/assets/mirror/2e/2e0452c1994fcc2130a1b8ef68e34b5ea52d1b35b80dde09b99349ad1de54598.jpg',
  'https://cdn.21st.dev/assets/mirror/84/847dc523558808119dc4bbb5218ff862ae5f5b455f33e9a0304f2f5a4b2f0f2c.jpg',
  'https://cdn.21st.dev/assets/mirror/2f/2f128763d177d6bdda3de9f0a766693406034977082bdb542138b7b74af9697b.jpg',
  'https://cdn.21st.dev/assets/mirror/30/30f8223f1d1ecc24fc8b7a9995b8ee98449b1e9fc300c14fbccec01b6a83a0ae.jpg',
  'https://cdn.21st.dev/assets/mirror/b4/b4df0e3e425ffce3b4f62fd7bc717e4dc90b94455f4d65d64fc07fe9721b0519.jpg',
  'https://cdn.21st.dev/assets/mirror/90/90c625659f072e4a701c2e37fa4ca46f25c7ca8689d723e7802fe84cf17874e9.jpg',
  'https://cdn.21st.dev/assets/mirror/6a/6aa0befc69cc3db8f3f3558d4b5e1216a5b64ceae1b86f51acf1c3f1432a8cf7.jpg',
  'https://cdn.21st.dev/assets/mirror/dc/dc126cfd753dc217945d0ea2f915e539dfe4ffb5fdea02245d0f576b25a9c4dd.jpg',
  'https://cdn.21st.dev/assets/mirror/ab/ab5f167fcb763aee7c3247fb8af97875998a7f519a6119da7dadd9cf73ae1a2c.jpg',
  'https://cdn.21st.dev/assets/mirror/57/57d6e450f7068e5f3be04907dcc0815343e67df1dc82f2da0ff1c859afc1f700.jpg',
  'https://cdn.21st.dev/assets/mirror/e4/e491359016d1494074e287dfbb55be068cffc0110017ae2257a5d4cdec193a47.jpg',
];

const VALUES = [
  {
    title: 'Integrity',
    detail:
      'Pricing is set out in writing, and reports show the real results.',
    Icon: ShieldCheck,
  },
  {
    title: 'Excellence',
    detail:
      'Calls and tasks are given quality scores, and the target for accuracy is 98%.',
    Icon: BadgeCheck,
  },
  {
    title: 'Customer first',
    detail:
      'Offers, exceptions and changes are always agreed with the client before the team acts on them.',
    Icon: HeartHandshake,
  },
  {
    title: 'People and growth',
    detail:
      'Staff get regular training and monthly coaching, with career development programmes to help them move up.',
    Icon: TrendingUp,
  },
  {
    title: 'Reliability',
    detail:
      'Shifts are covered as planned, and time keeping is checked for each person.',
    Icon: Clock3,
  },
  {
    title: 'Innovation',
    detail:
      'Automated checks run on each task before a person reviews it.',
    Icon: Lightbulb,
  },
  {
    title: 'Teamwork',
    detail:
      'Your FirstNotch team works with your staff in your own tools and channels.',
    Icon: Handshake,
  },
  {
    title: 'Global standards, local talent',
    detail:
      'Trained Sri Lankan staff work to the quality levels each client sets.',
    Icon: Globe2,
  },
] as const;

const STATS = [
  {
    number: '2022',
    label: 'the year FirstNotch was founded',
  },
  {
    number: '70+',
    label: 'staff working from Colombo',
  },
  {
    number: '85%',
    label: 'client retention rate',
  },
  {
    number: '4',
    label: 'languages spoken by the team',
  },
];

const LEADERS = [
  {
    number: '01',
    title: 'Leadership profile',
    prompt: 'Full name and role to be confirmed',
  },
  {
    number: '02',
    title: 'Operations leadership',
    prompt: 'Full name and role to be confirmed',
  },
  {
    number: '03',
    title: 'Client services leadership',
    prompt: 'Full name and role to be confirmed',
  },
];

const QUOTE =
  'We visited the Colombo office before signing. Meeting the people who would talk to our customers made the decision easy.';

const eyebrow =
  'text-[11px] font-semibold uppercase tracking-[.22em] text-[#B12025]';

const heading =
  'text-[clamp(2.7rem,5.3vw,6.2rem)] font-semibold leading-[1.09] tracking-[-.068em]';

// ======================================================
// RISING TEXT ANIMATION
// ======================================================

function RiseWords({ text }: { text: string }) {
  return (
    <span role="text" aria-label={text}>
      {text.split(/\s+/).map((word, i) => (
        <span
          key={`${i}-${word}`}
          aria-hidden="true"
        >
          {i > 0 ? ' ' : null}

          <span className="-mb-[.14em] inline-block overflow-hidden pb-[.14em] align-bottom">
            <span
              data-about-rise-word
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
// HOMEPAGE-STYLE SCROLLING TEXT REVEAL
// ======================================================

function ScrollWords({ text }: { text: string }) {
  return (
    <span
      data-about-read
      role="text"
      aria-label={text}
    >
      {text.split(/\s+/).map((word, i) => (
        <span
          key={i}
          data-about-read-word
          aria-hidden="true"
          className="inline-block"
        >
          {word}
          {'\u00a0'}
        </span>
      ))}
    </span>
  );
}

// ======================================================
// 21ST.DEV-INSPIRED HERO ANIMATION
// ======================================================

function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const orbit = orbitRef.current;

    if (!section || !orbit) return;

    const cards = gsap.utils.toArray<HTMLElement>(
      '[data-orbit-card]',
      orbit
    );

    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const state = {
      angle: -Math.PI / 2,
      scrollAngle: 0,
    };

    let settled = false;
    let visible = true;

    // Calculate each card's position around
    // the same circular / elliptical orbit.

    function destination(i: number) {
      const w = orbit!.clientWidth;
      const h = orbit!.clientHeight;

      const mobile = w < 640;

      const rx = Math.min(
        w * (mobile ? 0.39 : 0.45),
        700
      );

      const ry = mobile
        ? 165
        : Math.min(h * 0.47, 390);

      const cy = mobile
        ? 290
        : h * 0.70;

      const angle =
        state.angle +
        state.scrollAngle +
        (i / cards.length) * Math.PI * 2;

      return {
        x: Math.cos(angle) * rx,
        y: cy + Math.sin(angle) * ry,
      };
    }

    // Each card moves around the circle.
    // No individual image spinning.

    const render = () => {
      if (!settled) return;

      cards.forEach((card, i) => {
        const { x, y } = destination(i);

        gsap.set(card, {
          x,
          y,
          rotation: 0,
          scale: 1,
        });
      });
    };

    const ro = new ResizeObserver(render);

    ro.observe(orbit);

    gsap.set(cards, {
      xPercent: -50,
      yPercent: -50,
      transformOrigin: '50% 50%',
    });

    const ctx = gsap.context(() => {
      if (reduced) {
        settled = true;
        gsap.set(cards, { autoAlpha: 1 });
        render();
        return;
      }

      // ================================================
      // PHASE 1 — SCATTER
      // ================================================

      gsap.set(cards, {
        x: (i: number) =>
          ((i * 173) % 1200) - 600,

        y: (i: number) =>
          -130 - (i % 5) * 54,

        rotation: (i: number) =>
          i % 2 ? -15 : 15,

        scale: 0.55,
        autoAlpha: 0,
      });

      const intro = gsap.timeline({
        delay: 0.12,
      });

      // ================================================
      // PHASE 2 — LINE
      // ================================================

      intro.to(cards, {
        x: (i: number) =>
          (i - (cards.length - 1) / 2) *
          Math.min(
            82,
            orbit.clientWidth / 12
          ),

        y: () =>
          orbit.clientHeight * 0.23,

        rotation: 0,
        scale: 0.8,
        autoAlpha: 1,

        duration: 0.75,
        stagger: 0.018,
        ease: 'power3.out',
      });

      // ================================================
      // PHASE 3 — FORM THE CIRCLE
      // ================================================

      intro.to(
        cards,
        {
          x: (i: number) =>
            destination(i).x,

          y: (i: number) =>
            destination(i).y,

          rotation: 0,
          scale: 1,

          duration: 1.35,

          stagger: {
            each: 0.015,
            from: 'center',
          },

          ease: 'power3.inOut',

          onComplete: () => {
            settled = true;
            render();

            if (visible) {
              orbitTween.play();
            }
          },
        },
        '+=0.10'
      );

      // ================================================
      // CENTRE HEADING RISE
      // ================================================

      intro.fromTo(
        section.querySelectorAll(
          '[data-about-rise-word]'
        ),
        {
          yPercent: 115,
          autoAlpha: 0,
        },
        {
          yPercent: 0,
          autoAlpha: 1,

          duration: 1.05,
          stagger: 0.075,
          ease: 'power4.out',
        },
        1.15
      );

      intro.fromTo(
        section.querySelectorAll(
          '[data-orbit-hero-in]'
        ),
        {
          y: 22,
          autoAlpha: 0,
        },
        {
          y: 0,
          autoAlpha: 1,

          duration: 0.75,
          stagger: 0.12,
          ease: 'power3.out',
        },
        1.65
      );

      // ================================================
      // PHASE 4 — SLOW CONTINUOUS ORBIT
      // ================================================

      const orbitTween = gsap.to(state, {
        angle:
          state.angle + Math.PI * 2,

        duration: 120,
        ease: 'none',
        repeat: -1,
        paused: true,

        onUpdate: render,
      });

      // Adds subtle motion based on normal page scroll.
      // Does not block or hijack scrolling.

      const scrollTrigger =
        ScrollTrigger.create({
          trigger: section,

          start: 'top top',
          end: 'bottom top',

          onUpdate: (self) => {
            state.scrollAngle =
              self.progress * 0.4;

            render();
          },
        });

      // Pause orbit when hero is off-screen.

      const io = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;

          orbitTween.paused(
            !visible || !settled
          );
        },
        { threshold: 0.01 }
      );

      io.observe(section);

      return () => {
        io.disconnect();
        scrollTrigger.kill();
      };
    }, section);

    return () => {
      ro.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about-hero"
      className="relative isolate overflow-hidden bg-white text-[#17191C]"
    >
      {/* ==============================================
          CIRCULAR PHOTO ARRANGEMENT
          LOWER 25% SOFT FADE
      ============================================== */}

      <div
        ref={orbitRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        style={{
          maskImage:
            'linear-gradient(to bottom, black 0%, black 70%, rgba(0,0,0,.45) 83%, transparent 100%)',

          WebkitMaskImage:
            'linear-gradient(to bottom, black 0%, black 70%, rgba(0,0,0,.45) 83%, transparent 100%)',
        }}
      >
        {PHOTOS.map((src, i) => (
          <div
            key={src}
            data-orbit-card
            className="absolute left-1/2 top-0 h-[76px] w-[57px] opacity-0 sm:h-[105px] sm:w-[80px] lg:h-[139px] lg:w-[105px] xl:h-[151px] xl:w-[115px]"
          >
            <div className="h-full w-full overflow-hidden rounded-[13px] bg-[#f5efef] shadow-[0_15px_36px_rgba(23,25,28,.15)] sm:rounded-[18px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}

              <img
                src={src}
                alt=""
                width={260}
                height={340}
                loading={
                  i < 12 ? 'eager' : 'lazy'
                }
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>

      {/* WHITE CENTRE FOR TEXT READABILITY */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[51%] z-[1] hidden h-[360px] w-[750px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/90 blur-[45px] md:block"
      />

      {/* ==============================================
          CENTRE CONTENT + RISING HEADING
      ============================================== */}

      <div className="
  relative z-10 mx-auto flex
  min-h-[570px]
  max-w-[1480px]
  flex-col items-center justify-center
  px-5
  pb-[35px]
  pt-[260px]
  text-center

  sm:min-h-[830px]
  sm:px-8
  sm:pb-[115px]
  sm:pt-[210px]

  lg:min-h-[860px]
  lg:pt-[225px]
">
<p
  data-orbit-hero-in
  className="-mt-[40px] text-[8px] font-semibold uppercase tracking-[.13em] text-[#B12025] sm:mt-0 sm:text-[11px] sm:tracking-[.22em]"
>
  FIRSTNOTCH SOLUTIONS · EST. 2022
</p>

<h1 className="mt-[10px] max-w-[290px] text-[32px] font-semibold leading-[.92] tracking-[-.065em] text-[#B12025] sm:mt-6 sm:max-w-[960px] sm:text-[clamp(2.95rem,6.4vw,7.4rem)] sm:leading-[1.03] sm:tracking-[-.08em]">
  <RiseWords text="About FirstNotch Solutions" />
</h1>

        <p
  data-orbit-hero-in
  className="mx-auto mt-[190px] max-w-[280px] text-[11px] leading-[1.7] text-[#17191C]/65 sm:mt-6 sm:max-w-[670px] sm:text-[clamp(.95rem,1.35vw,1.25rem)] sm:leading-[1.75]"
>
          An outsourcing company in Colombo,
          working for businesses in Sri Lanka
          and overseas since 2022.
        </p>

        <div
  data-orbit-hero-in
  className="mt-8 flex w-full flex-nowrap items-center justify-between gap-2 sm:w-auto sm:flex-wrap sm:justify-center sm:gap-3"
>
  {/* Left button */}
  <Link
    href="/book-a-free-call"
    className="inline-flex min-h-[42px] flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-[#B12025] px-3 text-[9px] font-semibold text-white hover:bg-[#991b20] sm:min-h-[49px] sm:flex-none sm:gap-2 sm:px-6 sm:text-[12px]"
  >
    Book a free discovery call
    <ArrowUpRight size={14} className="sm:h-4 sm:w-4" />
  </Link>

  {/* Right button */}
  <Link
    href="/services"
    className="inline-flex min-h-[42px] flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-[#B12025]/25 bg-white px-3 text-[9px] font-semibold text-[#B12025] hover:border-[#B12025] sm:min-h-[49px] sm:flex-none sm:gap-2 sm:px-6 sm:text-[12px]"
  >
    See the services
    <ArrowUpRight size={14} className="sm:h-4 sm:w-4" />
  </Link>
</div>

        
      </div>
    </section>
  );
}

// ======================================================
// COMPLETE ABOUT PAGE
// ======================================================

export default function AboutFirstNotchPage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
   const root = rootRef.current;

if (!root) return;

const valuesSlider =
  root.querySelector<HTMLElement>('[data-values-slider]');

let valuesInterval: ReturnType<typeof setInterval> | null = null;

if (valuesSlider) {
  valuesInterval = setInterval(() => {
    if (window.innerWidth >= 640) return;

    const cards = Array.from(
      valuesSlider.children
    ) as HTMLElement[];

    if (!cards.length) return;

    const cardWidth = cards[0].offsetWidth + 12;
    const maxScroll =
      valuesSlider.scrollWidth - valuesSlider.clientWidth;

    if (valuesSlider.scrollLeft >= maxScroll - 10) {
      valuesSlider.scrollTo({
        left: 0,
        behavior: 'smooth',
      });
    } else {
      valuesSlider.scrollBy({
        left: cardWidth,
        behavior: 'smooth',
      });
    }
  }, 3000);
}

    const mm = gsap.matchMedia();

    mm.add(
      '(prefers-reduced-motion: no-preference)',
      () => {
        const ctx = gsap.context(() => {
          // Homepage-style scrolling text reveals

          root
            .querySelectorAll<HTMLElement>(
              '[data-about-read]'
            )
            .forEach((el) => {
              gsap.fromTo(
                el.querySelectorAll(
                  '[data-about-read-word]'
                ),
                {
                  opacity: 0.2,
                },
                {
                  opacity: 1,
                  stagger: 0.12,
                  ease: 'none',

                  scrollTrigger: {
                    trigger: el,
                    start: 'top 88%',
                    end: 'bottom 50%',
                    scrub: true,
                  },
                }
              );
            });

          // Paragraph and card reveals

          root
            .querySelectorAll<HTMLElement>(
              '[data-about-in]'
            )
            .forEach((el) => {
              gsap.fromTo(
                el,
                {
                  y: 28,
                  autoAlpha: 0,
                },
                {
                  y: 0,
                  autoAlpha: 1,

                  duration: 0.85,
                  ease: 'power3.out',

                  scrollTrigger: {
                    trigger: el,
                    start: 'top 91%',
                    once: true,
                  },
                }
              );
            });

          // Testimonial scroll text-shadow reveal

          const quote =
            root.querySelector<HTMLElement>(
              '[data-about-quote]'
            );

          if (quote) {
            gsap.fromTo(
              quote.querySelectorAll(
                '[data-about-quote-word]'
              ),
              {
                opacity: 0.18,
                textShadow:
                  '0 0 0 rgba(70,0,0,0)',
              },
              {
                opacity: 1,
                textShadow:
                  '0 4px 14px rgba(70,0,0,.28)',

                stagger: 0.1,
                ease: 'none',

                scrollTrigger: {
                  trigger: quote,
                  start: 'top 87%',
                  end: 'bottom 45%',
                  scrub: true,
                },
              }
            );
          }
        }, root);

        return () => ctx.revert();
      }
    );

    let mounted = true;

    document.fonts?.ready.then(() => {
      if (mounted) ScrollTrigger.refresh();
    });

    return () => {
      mounted = false;
      mm.revert();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="overflow-x-clip bg-white font-sans text-[#17191C]"
    >
      {/* NEW 21ST.DEV-INSPIRED HERO */}

      <AboutHero />

      {/* ==============================================
          COMPANY INTRODUCTION + STATISTICS
      ============================================== */}

      <section
        id="about-intro"
        className="bg-white px-5 py-[45px] sm:px-8 sm:py-[90px] lg:px-14 lg:py-[130px]"
      >
        <div className="mx-auto grid max-w-[1420px] gap-7 sm:gap-12 lg:grid-cols-[.42fr_.58fr] lg:gap-20">
          <div data-about-in>
            <p className="text-[8px] font-semibold uppercase tracking-[.20em] text-[#B12025] sm:text-[11px] sm:tracking-[.22em]">
  A PARTNER FROM COLOMBO
</p>

            <span
  aria-hidden="true"
  className="mt-4 flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[#fff1f1] text-[#B12025] sm:mt-7 sm:h-14 sm:w-14"
>
  <Globe2 className="h-[16px] w-[16px] sm:h-[26px] sm:w-[26px]" />
</span>
          </div>

          <div>
            <h2 className="max-w-[850px] text-[28px] font-semibold leading-[1.06] tracking-[-.055em] sm:text-[clamp(2.7rem,5.3vw,6.2rem)] sm:leading-[1.09] sm:tracking-[-.068em]">
  <ScrollWords
    text="Built in Sri Lanka. Working with the world."
  />
</h2>

            <p
              data-about-in
              className="mt-8 max-w-[760px] text-[15px] leading-[1.95] text-[#17191C]/70"
            >
              FirstNotch was started by people
              with years of experience in sales,
              customer service, business development
              and outsourced operations. They set
              out to build an outsourcing company
              in Sri Lanka that could meet the
              standards international clients expect.
            </p>

            <p
              data-about-in
              className="mt-3 max-w-[760px] text-[12px] leading-[1.75] text-[#17191C]/70 sm:mt-5 sm:text-[15px] sm:leading-[1.95]"
            >
              Today a team of 70+ works from the
              Colombo office on customer support,
              back office work and IT services.
            </p>
          </div>
        </div>

       <div className="mx-auto mt-8 grid max-w-[1420px] grid-cols-4 gap-2 border-t border-[#B12025]/15 pt-6 sm:mt-16 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-9 sm:pt-10 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div
              key={stat.number}
              data-about-in
              className="border-l border-[#B12025] pl-2 sm:border-l-2 sm:pl-5"
            >
              <p className="text-[25px] font-semibold leading-none tracking-[-.06em] text-[#B12025] sm:text-[clamp(2.7rem,5.6vw,6rem)] sm:tracking-[-.08em]">
                {stat.number}
              </p>

              <p className="mt-2 max-w-[90px] text-[8px] leading-[1.5] text-[#17191C]/65 sm:mt-4 sm:max-w-[190px] sm:text-[12px] sm:leading-6">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ==============================================
          WHY FIRSTNOTCH EXISTS
      ============================================== */}

      <section
        id="why"
        className="bg-[#fff8f8] px-5 py-[48px] sm:px-8 sm:py-[100px] lg:px-14 lg:py-[135px]"
      >
        <div className="mx-auto max-w-[1420px]">
         <p
  data-about-in
  className="text-[8px] font-semibold uppercase tracking-[.20em] text-[#B12025] sm:text-[11px] sm:tracking-[.22em]"
>
  OUR PURPOSE
</p>

          <h2 className="mt-4 max-w-[1150px] text-[30px] font-semibold leading-[1.08] tracking-[-.055em] sm:mt-6 sm:text-[clamp(2.7rem,5.3vw,6.2rem)] sm:leading-[1.09] sm:tracking-[-.068em]">
            <ScrollWords
              text="Why FirstNotch exists"
            />
          </h2>

          <div
  data-purpose-slider
  className="mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mt-11 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:pb-0"
>
            <div
              data-about-in
              className="min-h-[280px] w-[88%] shrink-0 snap-center rounded-[22px] bg-[#B12025] p-5 text-white sm:min-h-0 sm:w-auto sm:rounded-[30px] sm:p-11"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30">
                <CheckCircle2 className="h-[17px] w-[17px] sm:h-6 sm:w-6" />
              </span>

              <h3 className="mt-6 text-[20px] font-semibold leading-[1.2] tracking-[-.04em] sm:mt-10 sm:text-[clamp(1.7rem,3vw,2.8rem)] sm:tracking-[-.05em]">
                Quality businesses can trust.
              </h3>

              <p className="mt-4 max-w-[520px] text-[11px] leading-[1.75] text-white/85 sm:mt-5 sm:text-[14px] sm:leading-8">
                The aim is to become an outsourcing
                partner that companies in Sri Lanka
                and abroad can trust with their work.
                That means good quality at a fair cost,
                with software used to check and
                track the work.
              </p>
            </div>

            <div
              data-about-in
             className="min-h-[280px] w-[88%] shrink-0 snap-center rounded-[22px] border border-[#B12025]/15 bg-white p-5 sm:min-h-0 sm:w-auto sm:rounded-[30px] sm:p-11"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#fff1f1] text-[#B12025]">
                <Users size={24} />
              </span>

              <h3 className="mt-6 text-[20px] font-semibold leading-[1.2] tracking-[-.04em] sm:mt-10 sm:text-[clamp(1.7rem,3vw,2.8rem)] sm:tracking-[-.05em]">
  Careers that move people forward.
</h3>

              <p className="mt-4 max-w-[520px] text-[11px] leading-[1.75] text-[#17191C]/70 sm:mt-5 sm:text-[14px] sm:leading-8">
                The second aim is to create skilled
                jobs and careers for people in Sri Lanka.
                Each new client account opens roles for
                local staff who are trained to an
                international standard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==============================================
          EIGHT COMPANY VALUES
      ============================================== */}

      <section
        id="values"
        className="bg-white px-5 py-[45px] sm:px-8 sm:py-[100px] lg:px-14 lg:py-[140px]"
      >
        <div className="mx-auto max-w-[1420px]">
          <div className="grid gap-4 sm:gap-7 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div>
              <p
                data-about-in
                className="text-[8px] font-semibold uppercase tracking-[.18em] text-[#B12025] sm:text-[11px] sm:tracking-[.22em]"
              >
                OUR PRINCIPLES
              </p>

              <h2
               className="mt-3 text-[30px] font-semibold leading-[1.05] tracking-[-.055em] sm:mt-5 sm:text-[clamp(2.7rem,5.3vw,6.2rem)] sm:leading-[1.09] sm:tracking-[-.068em]"
              >
                <ScrollWords
                  text="The values behind the work"
                />
              </h2>
            </div>

            <p
              data-about-in
              className="max-w-[550px] text-[11px] leading-[1.7] text-[#17191C]/65 sm:text-[14px] sm:leading-8"
            >
              These eight values guide how the
              team hires, trains and works on
              client accounts.
            </p>
          </div>

         <div
  data-values-slider
  className="mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mt-12 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:pb-0 xl:grid-cols-4"
>
            {VALUES.map((value, index) => (
              <article
                key={value.title}
                data-about-in
               className="group flex h-[210px] w-[82%] shrink-0 snap-center flex-col rounded-[20px] border border-[#B12025]/15 bg-[#fffafa] p-5 transition-colors duration-300 hover:border-[#B12025] hover:bg-[#B12025] hover:text-white sm:h-auto sm:min-h-[310px] sm:w-auto sm:rounded-[25px] sm:p-7"
              >
                <div className="flex items-start justify-between">
                 <value.Icon
  size={20}
  strokeWidth={1.5}
  className="text-[#B12025] transition-colors group-hover:text-white sm:h-[27px] sm:w-[27px]"
/>

                  <span className="text-[9px] font-semibold text-[#B12025] group-hover:text-white/75 sm:text-[11px]">
                    0{index + 1}
                  </span>
                </div>

                <div className="mt-auto pt-4 sm:pt-12">
                  <h3 className="text-[17px] font-semibold leading-[1.2] tracking-[-.035em] sm:text-[22px] sm:tracking-[-.04em]">
                    {value.title}
                  </h3>

                  <p className="mt-4 text-[12px] leading-[1.85] text-[#17191C]/65 transition-colors group-hover:text-white/85">
                    {value.detail}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ==============================================
          WHO FIRSTNOTCH WORKS WITH
      ============================================== */}

      <section
        id="who-we-work-with"
        className="bg-[#fff8f8] px-5 py-[45px] sm:px-8 sm:py-[105px] lg:px-14 lg:py-[140px]"
      >
       <div className="mx-auto grid max-w-[1420px] gap-6 sm:gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
          <div>
            <p
              data-about-in
              className="text-[8px] font-semibold uppercase tracking-[.18em] text-[#B12025] sm:text-[11px] sm:tracking-[.22em]"
            >
              WORKING TOGETHER
            </p>

            <h2
              className="mt-3 text-[30px] font-semibold leading-[1.05] tracking-[-.055em] sm:mt-5 sm:text-[clamp(2.7rem,5.3vw,6.2rem)] sm:leading-[1.09] sm:tracking-[-.068em]"
            >
              <ScrollWords
                text="Who FirstNotch works with"
              />
            </h2>
          </div>

          <div>
            <p
              data-about-in
             className="text-[11px] leading-[1.75] text-[#17191C]/70 sm:text-[15px] sm:leading-[1.95]"
            >
              Clients are businesses that want
              reliable help they can scale up
              or down. Some need customer service
              or sales calls handled. Others
              outsource lead generation, data
              processing or back office tasks.
            </p>

            <p
              data-about-in
             className="mt-3 text-[11px] leading-[1.75] text-[#17191C]/70 sm:mt-6 sm:text-[15px] sm:leading-[1.95]"
            >
              Clients are based in Sri Lanka
              and in the UK, Australia and
              the Middle East.
            </p>

            <div className="mt-5 flex flex-nowrap items-center gap-1.5 sm:mt-8 sm:flex-wrap sm:gap-2">
              {[
                'Sri Lanka',
                'United Kingdom',
                'Australia',
                'Middle East',
              ].map((place) => (
                <span
                  key={place}
                 className="whitespace-nowrap rounded-full border border-[#B12025]/20 bg-white px-2.5 py-2 text-[8px] font-semibold text-[#B12025] sm:px-4 sm:py-2.5 sm:text-[11px]"
                >
                  {place}
                </span>
              ))}
            </div>

            <div
              data-about-in
             className="mt-6 flex flex-nowrap items-center gap-2 sm:mt-10 sm:flex-wrap sm:gap-3"
            >
              <Link
                href="/how-we-hire"
                className="inline-flex min-h-[40px] flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-[#B12025] px-3 text-[9px] font-semibold text-white sm:min-h-0 sm:flex-none sm:gap-2 sm:px-5 sm:py-3.5 sm:text-[12px]"
              >
                How the team is hired
                <MoveUpRight size={17} />
              </Link>

              <Link
                href="/work-with-us"
               className="inline-flex min-h-[40px] flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-[#B12025]/20 bg-white px-3 text-[9px] font-semibold text-[#B12025] sm:min-h-0 sm:flex-none sm:gap-2 sm:px-5 sm:py-3.5 sm:text-[12px]"
              >
                Jobs at FirstNotch
                <ArrowUpRight className="h-[13px] w-[13px] sm:h-[17px] sm:w-[17px]" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==============================================
          LEADERSHIP TEAM
      ============================================== */}

      <section
        id="leadership"
        className="bg-white px-5 py-[45px] sm:px-8 sm:py-[100px] lg:px-14 lg:py-[140px]"
      >
        <div className="mx-auto max-w-[1420px]">
          <p
            data-about-in
            className={eyebrow}
          >
            OUR PEOPLE
          </p>

          <h2
            className="mt-3 max-w-[980px] text-[30px] font-semibold leading-[1.05] tracking-[-.055em] sm:mt-5 sm:text-[clamp(2.7rem,5.3vw,6.2rem)] sm:leading-[1.09] sm:tracking-[-.068em]"
          >
            <ScrollWords
              text="The leadership team"
            />
          </h2>

          <p
            data-about-in
            className="mt-3 max-w-[720px] text-[11px] leading-[1.7] text-[#17191C]/65 sm:mt-5 sm:text-[14px] sm:leading-8"
          >
            The people responsible for client
            accounts and for the team in Colombo.
          </p>

          <div className="mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mt-11 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:pb-0">
            {LEADERS.map((person) => (
              <article
                key={person.number}
                data-about-in
                className="w-[82%] shrink-0 snap-center rounded-[20px] border border-[#B12025]/15 bg-[#fff9f9] p-5 sm:w-auto sm:rounded-[26px] sm:p-9"
              >
                <span
                  aria-hidden="true"
                 className="flex h-[85px] w-full items-center justify-center rounded-[14px] bg-white text-[#B12025]/30 sm:h-[130px] sm:rounded-[18px]"
                >
                  <BriefcaseBusiness
  className="h-[26px] w-[26px] sm:h-10 sm:w-10"
  strokeWidth={1.3}
/>
                </span>

                <div className="mt-5 flex items-start justify-between gap-3 sm:mt-8">
                  <div>
                    <h3 className="text-[16px] font-semibold tracking-[-.035em] sm:text-[21px]">
                      {person.title}
                    </h3>

                    <p className="mt-2 text-[9px] leading-[1.6] text-[#17191C]/55 sm:mt-3 sm:text-[12px] sm:leading-7">
                      {person.prompt}
                    </p>
                  </div>

                  <span className="text-[11px] font-semibold text-[#B12025]">
                    {person.number}
                  </span>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-5 text-[11px] text-[#17191C]/50">
            Leadership names, actual titles,
            biographies and photographs should
            be added after confirmation.
          </p>
        </div>
      </section>

      {/* ==============================================
          CLIENT TESTIMONIAL
      ============================================== */}

      <section
        aria-label="Furniture retailer testimonial"
       className="overflow-hidden bg-[#B12025] px-5 py-[55px] text-white sm:px-8 sm:py-[110px] lg:px-14 lg:py-[150px]"
      >
        <div className="mx-auto max-w-[1420px]">
         

          <blockquote>
            <p
              data-about-quote
              role="text"
              aria-label={QUOTE}
             className="mt-2 max-w-[1160px] text-[24px] font-semibold leading-[1.28] tracking-[-.045em] sm:mt-4 sm:text-[clamp(2rem,4.3vw,5rem)] sm:leading-[1.35] sm:tracking-[-.06em]"
            >
              {QUOTE.split(/\s+/).map(
                (word, i) => (
                  <span
                    key={i}
                    data-about-quote-word
                    aria-hidden="true"
                    className="inline-block"
                  >
                    {word}
                    {'\u00a0'}
                  </span>
                )
              )}
            </p>

            
          </blockquote>
        </div>
      </section>

      {/* ==============================================
          FINAL DISCOVERY CALL CTA
      ============================================== */}

      <section className="bg-white px-5 py-[42px] sm:px-8 sm:py-[90px] lg:px-14 lg:py-[115px]">
       <div className="mx-auto flex max-w-[1420px] flex-wrap items-end justify-between gap-5 sm:gap-8">
          <div>
            <p
              data-about-in
             className="text-[8px] font-semibold uppercase tracking-[.18em] text-[#B12025] sm:text-[11px] sm:tracking-[.22em]"
            >
              LET&apos;S WORK TOGETHER
            </p>

            <h2
              className="mt-3 max-w-[860px] text-[30px] font-semibold leading-[1.06] tracking-[-.055em] sm:mt-5 sm:text-[clamp(2.7rem,5.3vw,6.2rem)] sm:leading-[1.09] sm:tracking-[-.068em]"
            >
              <ScrollWords
                text="Put the right team behind your business."
              />
            </h2>
          </div>

          <a
            href="#contact"
          className="inline-flex min-h-[40px] items-center gap-2 rounded-full bg-[#B12025] px-4 text-[9px] font-semibold text-white sm:min-h-[52px] sm:gap-3 sm:px-6 sm:text-[12px]"
          >
            Book a free discovery call
            <ArrowUpRight size={17} />
          </a>
        </div>
      </section>
    </div>
  );
}
