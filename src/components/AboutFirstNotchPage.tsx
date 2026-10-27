
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
        ? 260
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

      <div className="relative z-10 mx-auto flex min-h-[760px] max-w-[1480px] flex-col items-center justify-center px-5 pb-[80px] pt-[320px] text-center sm:min-h-[830px] sm:px-8 sm:pb-[115px] sm:pt-[210px] lg:min-h-[860px] lg:pt-[225px]">
        <p
          data-orbit-hero-in
          className={`${eyebrow} text-[10px] sm:text-[11px]`}
        >
          FIRSTNOTCH SOLUTIONS · EST. 2022
        </p>

       <h1 className="mt-6 max-w-[960px] text-[clamp(2.95rem,6.4vw,7.4rem)] font-semibold leading-[1.03] tracking-[-.08em] text-[#B12025]">
  <RiseWords text="About FirstNotch" />
</h1>

        <p
          data-orbit-hero-in
          className="mx-auto mt-6 max-w-[670px] text-[clamp(.95rem,1.35vw,1.25rem)] leading-[1.75] text-[#17191C]/70"
        >
          An outsourcing company in Colombo,
          working for businesses in Sri Lanka
          and overseas since 2022.
        </p>

        <div
          data-orbit-hero-in
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          <a
            href="#contact"
            className="inline-flex min-h-[49px] items-center gap-2 rounded-full bg-[#B12025] px-6 text-[12px] font-semibold text-white hover:bg-[#991b20]"
          >
            Book a free discovery call
            <ArrowUpRight size={16} />
          </a>

          <Link
            href="/services"
            className="inline-flex min-h-[49px] items-center gap-2 rounded-full border border-[#B12025]/25 bg-white px-6 text-[12px] font-semibold text-[#B12025] hover:border-[#B12025]"
          >
            See the services
            <ArrowUpRight size={16} />
          </Link>
        </div>

        <p className="mt-[90px] text-[10px] text-[#17191C]/35">
          Illustrative photography ·
          Temporary online images
        </p>
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
        className="bg-white px-5 py-[90px] sm:px-8 lg:px-14 lg:py-[130px]"
      >
        <div className="mx-auto grid max-w-[1420px] gap-12 lg:grid-cols-[.42fr_.58fr] lg:gap-20">
          <div data-about-in>
            <p className={eyebrow}>
              A PARTNER FROM COLOMBO
            </p>

            <span
              aria-hidden="true"
              className="mt-7 flex h-14 w-14 items-center justify-center rounded-full bg-[#fff1f1] text-[#B12025]"
            >
              <Globe2 size={26} />
            </span>
          </div>

          <div>
            <h2
              className={`${heading} max-w-[850px]`}
            >
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
              className="mt-5 max-w-[760px] text-[15px] leading-[1.95] text-[#17191C]/70"
            >
              Today a team of 30+ works from the
              Colombo office on customer support,
              back office work and IT services.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-[1420px] grid-cols-2 gap-x-6 gap-y-9 border-t border-[#B12025]/15 pt-10 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div
              key={stat.number}
              data-about-in
              className="border-l-2 border-[#B12025] pl-5"
            >
              <p className="text-[clamp(2.7rem,5.6vw,6rem)] font-semibold leading-none tracking-[-.08em] text-[#B12025]">
                {stat.number}
              </p>

              <p className="mt-4 max-w-[190px] text-[12px] leading-6 text-[#17191C]/65">
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
        className="bg-[#fff8f8] px-5 py-[100px] sm:px-8 lg:px-14 lg:py-[135px]"
      >
        <div className="mx-auto max-w-[1420px]">
          <p
            data-about-in
            className={eyebrow}
          >
            OUR PURPOSE
          </p>

          <h2
            className={`${heading} mt-6 max-w-[1150px]`}
          >
            <ScrollWords
              text="Why FirstNotch exists"
            />
          </h2>

          <div className="mt-11 grid gap-5 md:grid-cols-2">
            <div
              data-about-in
              className="rounded-[30px] bg-[#B12025] p-8 text-white sm:p-11"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30">
                <CheckCircle2 size={24} />
              </span>

              <h3 className="mt-10 text-[clamp(1.7rem,3vw,2.8rem)] font-semibold tracking-[-.05em]">
                Quality businesses can trust.
              </h3>

              <p className="mt-5 max-w-[520px] text-[14px] leading-8 text-white/85">
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
              className="rounded-[30px] border border-[#B12025]/15 bg-white p-8 sm:p-11"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#fff1f1] text-[#B12025]">
                <Users size={24} />
              </span>

              <h3 className="mt-10 text-[clamp(1.7rem,3vw,2.8rem)] font-semibold tracking-[-.05em]">
                Careers that move people forward.
              </h3>

              <p className="mt-5 max-w-[520px] text-[14px] leading-8 text-[#17191C]/70">
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
        className="bg-white px-5 py-[100px] sm:px-8 lg:px-14 lg:py-[140px]"
      >
        <div className="mx-auto max-w-[1420px]">
          <div className="grid gap-7 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div>
              <p
                data-about-in
                className={eyebrow}
              >
                OUR PRINCIPLES
              </p>

              <h2
                className={`${heading} mt-5`}
              >
                <ScrollWords
                  text="The values behind the work"
                />
              </h2>
            </div>

            <p
              data-about-in
              className="max-w-[550px] text-[14px] leading-8 text-[#17191C]/65"
            >
              These eight values guide how the
              team hires, trains and works on
              client accounts.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {VALUES.map((value, index) => (
              <article
                key={value.title}
                data-about-in
                className="group flex min-h-[310px] flex-col rounded-[25px] border border-[#B12025]/15 bg-[#fffafa] p-7 transition-colors duration-300 hover:border-[#B12025] hover:bg-[#B12025] hover:text-white"
              >
                <div className="flex items-start justify-between">
                  <value.Icon
                    size={27}
                    strokeWidth={1.5}
                    className="text-[#B12025] transition-colors group-hover:text-white"
                  />

                  <span className="text-[11px] font-semibold text-[#B12025] group-hover:text-white/75">
                    0{index + 1}
                  </span>
                </div>

                <div className="mt-auto pt-12">
                  <h3 className="text-[22px] font-semibold leading-[1.2] tracking-[-.04em]">
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
        className="bg-[#fff8f8] px-5 py-[105px] sm:px-8 lg:px-14 lg:py-[140px]"
      >
        <div className="mx-auto grid max-w-[1420px] gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
          <div>
            <p
              data-about-in
              className={eyebrow}
            >
              WORKING TOGETHER
            </p>

            <h2
              className={`${heading} mt-5`}
            >
              <ScrollWords
                text="Who FirstNotch works with"
              />
            </h2>
          </div>

          <div>
            <p
              data-about-in
              className="text-[15px] leading-[1.95] text-[#17191C]/70"
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
              className="mt-6 text-[15px] leading-[1.95] text-[#17191C]/70"
            >
              Clients are based in Sri Lanka
              and in the UK, Australia and
              the Middle East.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {[
                'Sri Lanka',
                'United Kingdom',
                'Australia',
                'Middle East',
              ].map((place) => (
                <span
                  key={place}
                  className="rounded-full border border-[#B12025]/20 bg-white px-4 py-2.5 text-[11px] font-semibold text-[#B12025]"
                >
                  {place}
                </span>
              ))}
            </div>

            <div
              data-about-in
              className="mt-10 flex flex-wrap gap-3"
            >
              <Link
                href="/how-we-hire"
                className="inline-flex items-center gap-2 rounded-full bg-[#B12025] px-5 py-3.5 text-[12px] font-semibold text-white"
              >
                How the team is hired
                <MoveUpRight size={17} />
              </Link>

              <Link
                href="/work-with-us"
                className="inline-flex items-center gap-2 rounded-full border border-[#B12025]/20 bg-white px-5 py-3.5 text-[12px] font-semibold text-[#B12025]"
              >
                Jobs at FirstNotch
                <ArrowUpRight size={17} />
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
        className="bg-white px-5 py-[100px] sm:px-8 lg:px-14 lg:py-[140px]"
      >
        <div className="mx-auto max-w-[1420px]">
          <p
            data-about-in
            className={eyebrow}
          >
            OUR PEOPLE
          </p>

          <h2
            className={`${heading} mt-5 max-w-[980px]`}
          >
            <ScrollWords
              text="The leadership team"
            />
          </h2>

          <p
            data-about-in
            className="mt-5 max-w-[720px] text-[14px] leading-8 text-[#17191C]/65"
          >
            The people responsible for client
            accounts and for the team in Colombo.
          </p>

          <div className="mt-11 grid gap-4 md:grid-cols-3">
            {LEADERS.map((person) => (
              <article
                key={person.number}
                data-about-in
                className="rounded-[26px] border border-[#B12025]/15 bg-[#fff9f9] p-7 sm:p-9"
              >
                <span
                  aria-hidden="true"
                  className="flex h-[130px] w-full items-center justify-center rounded-[18px] bg-white text-[#B12025]/30"
                >
                  <BriefcaseBusiness
                    size={40}
                    strokeWidth={1.3}
                  />
                </span>

                <div className="mt-8 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-[21px] font-semibold tracking-[-.035em]">
                      {person.title}
                    </h3>

                    <p className="mt-3 text-[12px] leading-7 text-[#17191C]/55">
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
        className="overflow-hidden bg-[#B12025] px-5 py-[110px] text-white sm:px-8 lg:px-14 lg:py-[150px]"
      >
        <div className="mx-auto max-w-[1420px]">
          <p className="text-[11px] font-semibold uppercase tracking-[.22em] text-white/75">
            FURNITURE RETAILER
          </p>

          <span
            aria-hidden="true"
            className="mt-5 block text-[110px] font-semibold leading-[.85] text-white/25"
          >
            “
          </span>

          <blockquote>
            <p
              data-about-quote
              role="text"
              aria-label={QUOTE}
              className="mt-4 max-w-[1160px] text-[clamp(2rem,4.3vw,5rem)] font-semibold leading-[1.35] tracking-[-.06em]"
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

            <footer className="mt-10 border-t border-white/25 pt-5 text-[12px] font-semibold tracking-[.1em] text-white/80">
              Furniture retailer
            </footer>
          </blockquote>
        </div>
      </section>

      {/* ==============================================
          FINAL DISCOVERY CALL CTA
      ============================================== */}

      <section className="bg-white px-5 py-[90px] sm:px-8 lg:px-14 lg:py-[115px]">
        <div className="mx-auto flex max-w-[1420px] flex-wrap items-end justify-between gap-8">
          <div>
            <p
              data-about-in
              className={eyebrow}
            >
              LET&apos;S WORK TOGETHER
            </p>

            <h2
              className={`${heading} mt-5 max-w-[860px]`}
            >
              <ScrollWords
                text="Put the right team behind your business."
              />
            </h2>
          </div>

          <a
            href="#contact"
            className="inline-flex min-h-[52px] items-center gap-3 rounded-full bg-[#B12025] px-6 text-[12px] font-semibold text-white"
          >
            Book a free discovery call
            <ArrowUpRight size={17} />
          </a>
        </div>
      </section>
    </div>
  );
}
