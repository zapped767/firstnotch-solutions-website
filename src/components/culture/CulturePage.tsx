'use client';

import { useEffect, useRef } from 'react';

import Link from 'next/link';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { ArrowDown, ArrowRight, Sparkles } from 'lucide-react';

import {
  ContainerScroll,
  ContainerSticky,
  GalleryContainer,
  GalleryCol,
} from '@/components/ui/container-scroll';

gsap.registerPlugin(ScrollTrigger);

/* =========================================================
   CONTENT
========================================================= */
const events = [
  {
    number: '01',
    title: 'Pongal',
    subtitle: 'Gratitude & new beginnings',
    image:
      'https://images.unsplash.com/photo-1604608672516-f1b9b1d37076?auto=format&fit=crop&w=1400&q=85',
    className: 'h-[300px] sm:h-[420px]',
  },
  {
    number: '02',
    title: 'Deepavali',
    subtitle: 'Light & togetherness',
    image:
      'https://images.unsplash.com/photo-1604423488919-1e8e0f4c4d45?auto=format&fit=crop&w=1400&q=85',
    className: 'h-[380px] sm:h-[520px]',
  },
  {
    number: '03',
    title: 'Vesak',
    subtitle: 'Reflection & compassion',
    image:
      'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1400&q=85',
    className: 'h-[330px] sm:h-[450px]',
  },
  {
    number: '04',
    title: 'Halloween',
    subtitle: 'Creativity & fun',
    image:
      'https://images.unsplash.com/photo-1508361001413-7a9dca21d08a?auto=format&fit=crop&w=1400&q=85',
    className: 'h-[350px] sm:h-[500px]',
  },
  {
    number: '05',
    title: 'Cricket Day',
    subtitle: 'One team. One game.',
    image:
      'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1400&q=85',
    className: 'h-[400px] sm:h-[560px]',
  },
  {
    number: '06',
    title: 'Carrom Day',
    subtitle: 'Focus. Competition. Connection.',
    image:
      'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?auto=format&fit=crop&w=1400&q=85',
    className: 'h-[320px] sm:h-[430px]',
  },

  // MORE CULTURE PHOTOS

  {
    number: '07',
    title: 'Team Moments',
    subtitle: 'Better together',
    image:
      'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=85',
    className: 'h-[380px] sm:h-[520px]',
  },
  {
    number: '08',
    title: 'Office Life',
    subtitle: 'Where ideas meet',
    image:
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=85',
    className: 'h-[300px] sm:h-[430px]',
  },
  {
    number: '09',
    title: 'Team Day',
    subtitle: 'People beyond projects',
    image:
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1400&q=85',
    className: 'h-[370px] sm:h-[500px]',
  },
  {
    number: '10',
    title: 'Celebrations',
    subtitle: 'Moments worth remembering',
    image:
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1400&q=85',
    className: 'h-[320px] sm:h-[460px]',
  },
  {
    number: '11',
    title: 'Teamwork',
    subtitle: 'Different strengths. One goal.',
    image:
      'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=85',
    className: 'h-[400px] sm:h-[550px]',
  },
  {
    number: '12',
    title: 'Learning Together',
    subtitle: 'Share. Learn. Grow.',
    image:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=85',
    className: 'h-[350px] sm:h-[480px]',
  },
  {
    number: '13',
    title: 'Good Times',
    subtitle: 'Work with personality',
    image:
      'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1400&q=85',
    className: 'h-[330px] sm:h-[470px]',
  },
  {
    number: '14',
    title: 'Our People',
    subtitle: 'The heart of FirstNotch',
    image:
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1400&q=85',
    className: 'h-[390px] sm:h-[530px]',
  },
  {
    number: '15',
    title: 'Together',
    subtitle: 'More than colleagues',
    image:
      'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1400&q=85',
    className: 'h-[350px] sm:h-[490px]',
  },
];

/* Which events go in which gallery column (6 images per column = 18 tiles) */
const galleryColumns = [
  [0, 3, 6, 9, 12, 14],
  [1, 4, 7, 10, 13, 2],
  [5, 8, 11, 2, 0, 3],
];

/* Columns 1 & 3 travel up, column 2 travels down */
const columnRanges: string[][] = [
  ['0%', '-50%'],
  ['-50%', '0%'],
  ['0%', '-50%'],
];

/* =========================================================
   RISING WORDS
========================================================= */

function RisingWords({
  text,
  className = '',
}: {
  text: string;
  className?: string;
}) {
  return (
    <span className={className}>
      {text.split(' ').map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="mr-[0.22em] inline-block overflow-hidden align-bottom"
        >
          <span data-culture-word className="inline-block">
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}

/* =========================================================
   EVENT IMAGE
========================================================= */

function EventImage({
  event,
  priority = false,
}: {
  event: (typeof events)[number];
  priority?: boolean;
}) {
  return (
    <article
      className={`
        culture-image
        group
        relative
        shrink-0
        overflow-hidden
        rounded-[20px]
        bg-[#17191C]
        ${event.className}

        sm:rounded-[28px]
      `}
    >
      <img
        src={event.image}
        alt={`${event.title} celebration`}
        loading={priority ? 'eager' : 'lazy'}
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
          transition-transform
          duration-[1200ms]
          ease-[cubic-bezier(.22,1,.36,1)]

          group-hover:scale-[1.045]
        "
      />

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-[#17191C]/90
          via-[#17191C]/10
          to-transparent
        "
      />

      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
        <span className="text-[9px] font-bold tracking-[0.2em] text-white/55 sm:text-[10px]">
          {event.number}
        </span>

        <h3 className="mt-2 text-[22px] font-semibold leading-none tracking-[-0.045em] text-white sm:text-[30px]">
          {event.title}
        </h3>

        <p className="mt-2 text-[9px] uppercase tracking-[0.12em] text-white/60 sm:text-[10px]">
          {event.subtitle}
        </p>
      </div>
    </article>
  );
}

/* =========================================================
   CULTURE PAGE
========================================================= */

export default function CulturePage() {
  const pageRef = useRef<HTMLDivElement>(null);

  /* =======================================================
     WORD RISING
  ======================================================= */

  useEffect(() => {
    const root = pageRef.current;

    if (!root) return;

    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;

      if (reduceMotion) {
        gsap.set('[data-culture-word]', {
          yPercent: 0,
          opacity: 1,
        });

        return;
      }

      const groups = gsap.utils.toArray<HTMLElement>('[data-word-group]');

      groups.forEach((group) => {
        const words = group.querySelectorAll('[data-culture-word]');

        gsap.fromTo(
          words,
          { yPercent: 115, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.95,
            stagger: 0.045,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: group,
              start: 'top 88%',
              once: true,
            },
          },
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  /* =======================================================
     PARALLAX
  ======================================================= */

  useEffect(() => {
    const root = pageRef.current;

    if (!root) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 640px)', () => {
        gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((item) => {
          const speed = Number(item.dataset.parallax) || 40;

          gsap.fromTo(
            item,
            { y: speed },
            {
              y: -speed,
              ease: 'none',
              scrollTrigger: {
                trigger: item,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            },
          );
        });
      });

      return () => mm.revert();
    }, root);

    return () => ctx.revert();
  }, []);

  /* =======================================================
     EDITORIAL IMAGE REVEALS
  ======================================================= */

  useEffect(() => {
    const root = pageRef.current;

    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.culture-reveal').forEach((item) => {
        gsap.fromTo(
          item,
          { y: 70, opacity: 0, scale: 0.97 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.1,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 88%',
              once: true,
            },
          },
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    /*
     * IMPORTANT: overflow-x-clip (NOT overflow-hidden).
     * overflow-hidden breaks `position: sticky`, which the
     * scroll gallery depends on.
     */
    <main ref={pageRef} className="overflow-x-clip bg-white text-[#17191C]">
      {/* ===================================================
          HERO
      =================================================== */}

      <section
        className="
          relative
          flex
          min-h-[92vh]
          items-center
          overflow-hidden
          px-5
          pb-[70px]
          pt-[140px]

          sm:px-8
          sm:pb-[100px]
          sm:pt-[180px]

          lg:px-14
        "
      >
        {/* Background letter */}

        <span
          aria-hidden="true"
          className="
            absolute
            right-[-20px]
            top-[100px]
            text-[180px]
            font-semibold
            leading-none
            tracking-[-0.09em]
            text-[#B12025]/[0.035]

            sm:text-[300px]

            lg:right-[20px]
            lg:text-[430px]
          "
        >
          C
        </span>

        <div className="relative z-10 mx-auto w-full max-w-[1450px]">
          <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#B12025] sm:text-[11px]">
            CULTURE AT FIRSTNOTCH
          </p>

          <h1
            data-word-group
            className="
              mt-5
              max-w-[1200px]
              text-[clamp(3.3rem,14vw,6rem)]
              font-semibold
              leading-[0.88]
              tracking-[-0.075em]

              sm:mt-8
              sm:text-[clamp(5.5rem,10vw,10rem)]
            "
          >
            <RisingWords text="Different stories. One team." />
          </h1>

          <div
            className="
              mt-10
              grid
              gap-8

              sm:mt-16

              lg:grid-cols-[1fr_480px]
              lg:items-end
            "
          >
            <div>
              <div className="h-[2px] w-[70px] bg-[#B12025] sm:w-[100px]" />

              <p
                className="
                  mt-5
                  max-w-[570px]
                  text-[14px]
                  leading-[1.75]
                  text-[#17191C]/60

                  sm:text-[17px]
                  sm:leading-[1.85]
                "
              >
                Culture is not something we write on a wall. It is how we work,
                celebrate, compete, learn and show up for each other.
              </p>
            </div>

            <p
              data-word-group
              className="
                text-[25px]
                font-semibold
                leading-[1.08]
                tracking-[-0.045em]

                sm:text-[36px]
              "
            >
              <RisingWords text="The moments between the work matter too." />
            </p>
          </div>

          <div className="mt-12 flex items-center gap-3 text-[#B12025] sm:mt-16">
            <span className="text-[9px] font-bold uppercase tracking-[0.2em]">
              Meet our culture
            </span>

            <ArrowDown className="h-4 w-4" />
          </div>
        </div>
      </section>

      {/* ===================================================
          INTRO STRIP
      =================================================== */}

      <section
        className="
          border-y
          border-[#17191C]/10
          bg-[#F5F5F3]
          px-5
          py-[65px]

          sm:px-8
          sm:py-[110px]

          lg:px-14
          lg:py-[130px]
        "
      >
        <div className="mx-auto max-w-[1450px]">
          <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#B12025] sm:text-[11px]">
            MORE THAN WORK
          </p>

          <h2
            data-word-group
            className="
              mt-5
              max-w-[1200px]
              text-[38px]
              font-semibold
              leading-[0.98]
              tracking-[-0.06em]

              sm:mt-7
              sm:text-[clamp(4rem,7vw,7.5rem)]
            "
          >
            <RisingWords text="The best teams share more than a workload." />
          </h2>
        </div>
      </section>

      {/* ===================================================
          3D PARALLEL SCROLL GALLERY
      =================================================== */}

      <ContainerScroll className="min-h-[500vh] bg-[#F5F5F3] sm:min-h-[600vh]">
        <ContainerSticky className="flex items-start px-5 pt-[120px] sm:px-8 sm:pt-[130px] lg:px-14">
          <GalleryContainer className="mx-auto max-w-[1450px]">
            {galleryColumns.map((col, colIndex) => (
              <GalleryCol key={colIndex} yRange={columnRanges[colIndex]}>
                {col.map((eventIndex, i) => (
                  <EventImage
                    key={`${colIndex}-${i}`}
                    event={events[eventIndex]}
                    priority={i < 2}
                  />
                ))}
              </GalleryCol>
            ))}
          </GalleryContainer>
        </ContainerSticky>
      </ContainerScroll>

      {/* ===================================================
          DARK STATEMENT
      =================================================== */}

      <section
        className="
          relative
          overflow-hidden
          bg-[#17191C]
          px-5
          py-[85px]
          text-white

          sm:px-8
          sm:py-[150px]

          lg:px-14
          lg:py-[180px]
        "
      >
        <div
          aria-hidden="true"
          className="
            absolute
            -right-[120px]
            -top-[120px]
            h-[420px]
            w-[420px]
            rounded-full
            border
            border-white/[0.05]

            sm:h-[700px]
            sm:w-[700px]
          "
        />

        <div className="relative mx-auto max-w-[1450px]">
          <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#E75A5F] sm:text-[11px]">
            ONE TEAM
          </p>

          <h2
            data-word-group
            className="
              mt-6
              max-w-[1300px]
              text-[42px]
              font-semibold
              leading-[0.95]
              tracking-[-0.065em]

              sm:mt-9
              sm:text-[clamp(4.5rem,8vw,9rem)]
            "
          >
            <RisingWords text="We work together." />

            <br />

            <span className="text-[#E75A5F]">
              <RisingWords text="We celebrate together." />
            </span>

            <br />

            <RisingWords text="We grow together." />
          </h2>
        </div>
      </section>

      {/* ===================================================
          EVENT STORIES
      =================================================== */}

      <section
        className="
          bg-white
          px-5
          py-[70px]

          sm:px-8
          sm:py-[130px]

          lg:px-14
          lg:py-[160px]
        "
      >
        <div className="mx-auto max-w-[1450px]">
          <div className="grid gap-[90px] sm:gap-[140px]">
            {/* PONGAL */}

            <article
              className="
                grid
                gap-8

                lg:grid-cols-[1.15fr_.85fr]
                lg:items-center
                lg:gap-[90px]
              "
            >
              <div
                data-parallax="45"
                className="
                  culture-reveal
                  relative
                  aspect-[4/3]
                  overflow-hidden
                  rounded-[24px]

                  sm:rounded-[36px]
                "
              >
                <img
                  src={events[0].image}
                  alt="Pongal workplace celebration"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>

              <div>
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#B12025]">
                  01 / CULTURE
                </span>

                <h3
                  data-word-group
                  className="
                    mt-5
                    text-[42px]
                    font-semibold
                    leading-[0.95]
                    tracking-[-0.06em]

                    sm:text-[68px]
                  "
                >
                  <RisingWords text="Gratitude. Tradition. Togetherness." />
                </h3>

                <p
                  className="
                    mt-7
                    max-w-[540px]
                    text-[13px]
                    leading-[1.8]
                    text-[#17191C]/60

                    sm:text-[15px]
                  "
                >
                  Moments like Pongal give us space to appreciate where we come
                  from, what we have achieved together, and the people beside us
                  on the journey.
                </p>
              </div>
            </article>

            {/* CRICKET */}

            <article
              className="
                grid
                gap-8

                lg:grid-cols-[.8fr_1.2fr]
                lg:items-center
                lg:gap-[90px]
              "
            >
              <div className="lg:order-2">
                <div
                  data-parallax="60"
                  className="
                    culture-reveal
                    relative
                    aspect-[16/10]
                    overflow-hidden
                    rounded-[24px]

                    sm:rounded-[36px]
                  "
                >
                  <img
                    src={events[4].image}
                    alt="Team cricket day"
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className="lg:order-1">
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#B12025]">
                  02 / TEAM
                </span>

                <h3
                  data-word-group
                  className="
                    mt-5
                    text-[42px]
                    font-semibold
                    leading-[0.95]
                    tracking-[-0.06em]

                    sm:text-[68px]
                  "
                >
                  <RisingWords text="Different roles. Same jersey." />
                </h3>

                <p
                  className="
                    mt-7
                    max-w-[520px]
                    text-[13px]
                    leading-[1.8]
                    text-[#17191C]/60

                    sm:text-[15px]
                  "
                >
                  Away from desks and screens, titles disappear. Cricket gives
                  us another way to communicate, compete and learn how each
                  other responds under pressure.
                </p>
              </div>
            </article>

            {/* CARROM */}

            <article
              className="
                grid
                gap-8

                lg:grid-cols-[1.15fr_.85fr]
                lg:items-center
                lg:gap-[90px]
              "
            >
              <div
                data-parallax="40"
                className="
                  culture-reveal
                  relative
                  aspect-[4/3]
                  overflow-hidden
                  rounded-[24px]

                  sm:rounded-[36px]
                "
              >
                <img
                  src={events[5].image}
                  alt="Office carrom competition"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>

              <div>
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#B12025]">
                  03 / PLAY
                </span>

                <h3
                  data-word-group
                  className="
                    mt-5
                    text-[42px]
                    font-semibold
                    leading-[0.95]
                    tracking-[-0.06em]

                    sm:text-[68px]
                  "
                >
                  <RisingWords text="A little competition is good." />
                </h3>

                <p
                  className="
                    mt-7
                    max-w-[520px]
                    text-[13px]
                    leading-[1.8]
                    text-[#17191C]/60

                    sm:text-[15px]
                  "
                >
                  Carrom brings focus, friendly rivalry and plenty of
                  conversation. Small moments like these help relationships
                  grow beyond project meetings.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ===================================================
          VALUES
      =================================================== */}

      <section
        className="
          bg-[#F5F5F3]
          px-5
          py-[75px]

          sm:px-8
          sm:py-[130px]

          lg:px-14
          lg:py-[160px]
        "
      >
        <div className="mx-auto max-w-[1450px]">
          <div
            className="
              grid
              gap-10

              lg:grid-cols-[.7fr_1.3fr]
              lg:gap-[100px]
            "
          >
            <div>
              <Sparkles className="h-7 w-7 text-[#B12025]" />

              <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#B12025]">
                HOW WE SHOW UP
              </p>
            </div>

            <div>
              {[
                [
                  '01',
                  'Respect the person',
                  'Different backgrounds, beliefs and perspectives make the team stronger.',
                ],
                [
                  '02',
                  'Own the work',
                  'Take responsibility, communicate clearly and finish what you start.',
                ],
                [
                  '03',
                  'Help each other win',
                  'Knowledge gets stronger when it is shared.',
                ],
                [
                  '04',
                  'Make room for joy',
                  'Great work and good memories can exist in the same place.',
                ],
              ].map(([number, title, description]) => (
                <div
                  key={number}
                  className="
                    grid
                    gap-4
                    border-t
                    border-[#17191C]/15
                    py-7

                    sm:grid-cols-[70px_1fr_1fr]
                    sm:items-start
                    sm:gap-8
                    sm:py-9
                  "
                >
                  <span className="text-[10px] font-bold text-[#B12025]">
                    {number}
                  </span>

                  <h3 className="text-[22px] font-semibold tracking-[-0.04em] sm:text-[28px]">
                    {title}
                  </h3>

                  <p className="max-w-[430px] text-[12px] leading-[1.75] text-[#17191C]/55 sm:text-[14px]">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          FINAL CTA
      =================================================== */}

      <section
        className="
          relative
          overflow-hidden
          bg-[#B12025]
          px-5
          py-[90px]
          text-white

          sm:px-8
          sm:py-[150px]

          lg:px-14
          lg:py-[180px]
        "
      >
        <div
          aria-hidden="true"
          className="
            absolute
            right-[-80px]
            top-1/2
            -translate-y-1/2
            text-[260px]
            font-semibold
            leading-none
            tracking-[-0.1em]
            text-white/[0.04]

            sm:text-[500px]
          "
        >
          FN
        </div>

        <div className="relative z-10 mx-auto max-w-[1450px]">
          <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/60 sm:text-[11px]">
            LIFE AT FIRSTNOTCH
          </p>

          <h2
            data-word-group
            className="
              mt-6
              max-w-[1150px]
              text-[46px]
              font-semibold
              leading-[0.92]
              tracking-[-0.065em]

              sm:mt-8
              sm:text-[clamp(5rem,8vw,9rem)]
            "
          >
            <RisingWords text="Bring your whole self to the work." />
          </h2>

          <div
            className="
              mt-10
              flex
              flex-col
              gap-6

              sm:mt-14
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <p className="max-w-[530px] text-[12px] leading-[1.8] text-white/70 sm:text-[15px]">
              We are building a team where people can grow professionally
              without leaving their personality, traditions or interests at the
              door.
            </p>

            <Link
              href="/work-with-us"
              className="
                group
                inline-flex
                w-fit
                items-center
                gap-4
                rounded-full
                bg-white
                px-6
                py-4
                text-[11px]
                font-semibold
                text-[#B12025]
                transition-transform
                duration-300

                hover:scale-[1.03]

                sm:px-8
                sm:py-5
                sm:text-[13px]
              "
            >
              Work With Us
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}