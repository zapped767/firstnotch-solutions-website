'use client';

import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import Link from 'next/link';

import gsap from 'gsap';

import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Code2,
  Headphones,
  MessageSquareText,
  ShieldCheck,
  Wrench,
} from 'lucide-react';

/* =========================================================
   TYPES
========================================================= */

interface CrowdCanvasProps {
  src: string;
  rows?: number;
  cols?: number;
}

type Peep = {
  image: HTMLImageElement;
  rect: number[];
  width: number;
  height: number;

  x: number;
  y: number;
  anchorY: number;
  scaleX: number;

  walk: gsap.core.Timeline | null;

  setRect: (rect: number[]) => void;

  render: (
    ctx: CanvasRenderingContext2D,
  ) => void;
};

/* =========================================================
   CONTENT
========================================================= */

const services = [
  {
    number: '01',
    title: 'Web development',
    short: 'Web',
    description:
      'New websites designed and built to load fast and bring in enquiries.',
    cue: 'New site or rebuild',
    href: '/services/it-services/web-development',
    Icon: Code2,
  },

  {
    number: '02',
    title: 'Website maintenance',
    short: 'Maintenance',
    description:
      'Regular updates and security checks so your site stays online.',
    cue: 'Starts straight after launch',
    href: '/services/it-services/website-maintenance',
    Icon: ShieldCheck,
  },

  {
    number: '03',
    title: 'IT support',
    short: 'IT support',
    description:
      'Help for your staff with laptops, logins and systems, mostly done remotely.',
    cue: 'Your staff',
    href: '/services/it-services/it-support',
    Icon: Headphones,
  },

  {
    number: '04',
    title: 'Technical support',
    short: 'Technical',
    description:
      "A helpdesk that answers your customers' questions about your software or devices.",
    cue: 'Your customers',
    href: '/services/it-services/technical-support',
    Icon: MessageSquareText,
  },
];

const stats = [
  {
    value: '98%',
    label: 'Accuracy rate across client work',
  },

  {
    value: '85%',
    label: 'Client retention rate',
  },

  {
    value: '15–20%',
    label:
      'Of job applicants pass the hiring checks',
    href: '/how-we-hire',
  },

  {
    value: '20+',
    label:
      'Websites built and maintained',
    href: '/services/it-services/web-development',
  },
];

const faqs = [
  {
    question:
      'Can we use just one service?',

    answer:
      'Yes. Each service can be used on its own or combined with the others.',
  },

  {
    question:
      'Which platforms does the team work with?',

    answer:
      'WordPress, Shopify, Webflow and custom builds in React and Next.js. For IT support, Microsoft 365 and Google Workspace.',
  },

  {
    question:
      'What happens if something breaks out of hours?',

    answer:
      'Normal cover is 10am to 7pm Sri Lanka time on weekdays. Urgent issues, such as a website going down, can be covered outside those hours by agreement.',
  },

  {
    question:
      'Who owns the website and code?',

    answer:
      'You do. The code, domain and hosting accounts are in your name, and you have full access at all times.',
  },

  {
    question:
      'How are our systems kept secure?',

    answer:
      'Each team member has their own login with only the access they need. All accounts use two-factor login, and security updates are applied each month.',
  },

  {
    question:
      'How are IT services priced?',

    answer:
      'Websites are priced as a fixed project, and support is a monthly plan. The monthly price depends on the number of users or sites covered. Both are set out after the discovery call.',
  },
];

const process = [
  {
    number: '01',
    title: 'Learning your business',

    description:
      'The team documents your systems, accounts and current setup, and agrees access and priorities with you.',
  },

  {
    number: '02',
    title: 'Hiring and training',

    description:
      'Team members take language tests, technical assessments and reference checks. Only 15 to 20% of job applicants pass. Each one is then trained on your systems and tools before starting.',
  },

  {
    number: '03',
    title:
      'Going live with quality checks',

    description:
      'Every ticket and project task gets a quality score. Work starts with lower-risk tasks, and access widens once you sign it off.',
  },

  {
    number: '04',
    title:
      'Reporting and improving',

    description:
      'You get a monthly report on tickets, response times, uptime and open issues, plus a call to agree what to improve.',
  },
];

/* =========================================================
   CROWD CANVAS
========================================================= */

function CrowdCanvas({
  src,
  rows = 15,
  cols = 7,
}: CrowdCanvasProps) {
  const canvasRef =
    useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx =
      canvas.getContext('2d');

    if (!ctx) return;

    const image = new Image();

    const stage = {
      width: 0,
      height: 0,
    };

    const allPeeps: Peep[] = [];
    const availablePeeps: Peep[] = [];
    const crowd: Peep[] = [];

    let destroyed = false;

    const randomRange = (
      min: number,
      max: number,
    ) =>
      min +
      Math.random() *
        (max - min);

    const randomIndex = (
      array: unknown[],
    ) =>
      randomRange(
        0,
        array.length,
      ) | 0;

    const removeFromArray = <T,>(
      array: T[],
      index: number,
    ) =>
      array.splice(
        index,
        1,
      )[0];

    const removeRandomFromArray = <T,>(
      array: T[],
    ) =>
      removeFromArray(
        array,
        randomIndex(array),
      );

    const createPeep = ({
      image,
      rect,
    }: {
      image: HTMLImageElement;
      rect: number[];
    }): Peep => {
      const peep: Peep = {
        image,
        rect,

        width: rect[2],
        height: rect[3],

        x: 0,
        y: 0,
        anchorY: 0,
        scaleX: 1,

        walk: null,

        setRect(nextRect) {
          peep.rect =
            nextRect;

          peep.width =
            nextRect[2];

          peep.height =
            nextRect[3];
        },

        render(context) {
          context.save();

          context.translate(
            peep.x,
            peep.y,
          );

          context.scale(
            peep.scaleX,
            1,
          );

          context.drawImage(
            peep.image,

            peep.rect[0],
            peep.rect[1],
            peep.rect[2],
            peep.rect[3],

            0,
            0,

            peep.width,
            peep.height,
          );

          context.restore();
        },
      };

      return peep;
    };

    const resetPeep = (
      peep: Peep,
    ) => {
      const direction =
        Math.random() > 0.5
          ? 1
          : -1;

      const offsetY =
        100 -
        250 *
          gsap.parseEase(
            'power2.in',
          )(Math.random());

      const startY =
        stage.height -
        peep.height +
        offsetY;

      let startX = 0;
      let endX = 0;

      if (direction === 1) {
        startX =
          -peep.width;

        endX =
          stage.width;

        peep.scaleX = 1;
      } else {
        startX =
          stage.width +
          peep.width;

        endX = 0;

        peep.scaleX = -1;
      }

      peep.x = startX;
      peep.y = startY;

      peep.anchorY =
        startY;

      return {
        startY,
        endX,
      };
    };

    const addPeepToCrowd =
      (): Peep | null => {
        if (
          destroyed ||
          !availablePeeps.length
        ) {
          return null;
        }

        const peep =
          removeRandomFromArray(
            availablePeeps,
          );

        const {
          startY,
          endX,
        } = resetPeep(peep);

        const timeline =
          gsap.timeline();

        timeline.timeScale(
          randomRange(
            0.5,
            1.5,
          ),
        );

        timeline.to(
          peep,
          {
            duration: 10,
            x: endX,
            ease: 'none',
          },
          0,
        );

        timeline.to(
          peep,
          {
            duration: 0.25,
            repeat: 40,
            yoyo: true,
            y: startY - 10,
            ease: 'none',
          },
          0,
        );

        timeline.eventCallback(
          'onComplete',
          () => {
            if (destroyed)
              return;

            const index =
              crowd.indexOf(
                peep,
              );

            if (index >= 0) {
              crowd.splice(
                index,
                1,
              );
            }

            availablePeeps.push(
              peep,
            );

            addPeepToCrowd();
          },
        );

        peep.walk =
          timeline;

        crowd.push(peep);

        crowd.sort(
          (a, b) =>
            a.anchorY -
            b.anchorY,
        );

        return peep;
      };

    const initCrowd = () => {
      while (
        availablePeeps.length
      ) {
        const peep =
          addPeepToCrowd();

        if (!peep) break;

        peep.walk?.progress(
          Math.random(),
        );
      }
    };

    const createPeeps =
      () => {
        const width =
          image.naturalWidth;

        const height =
          image.naturalHeight;

        const total =
          rows * cols;

        const rectWidth =
          width / rows;

        const rectHeight =
          height / cols;

        for (
          let i = 0;
          i < total;
          i++
        ) {
          allPeeps.push(
            createPeep({
              image,

              rect: [
                (i % rows) *
                  rectWidth,

                ((i / rows) |
                  0) *
                  rectHeight,

                rectWidth,

                rectHeight,
              ],
            }),
          );
        }
      };

    const resize = () => {
      if (destroyed)
        return;

      const ratio =
        window
          .devicePixelRatio ||
        1;

      stage.width =
        canvas.clientWidth;

      stage.height =
        canvas.clientHeight;

      canvas.width =
        stage.width *
        ratio;

      canvas.height =
        stage.height *
        ratio;

      crowd.forEach(
        (peep) => {
          peep.walk?.kill();
        },
      );

      crowd.length = 0;

      availablePeeps.length =
        0;

      availablePeeps.push(
        ...allPeeps,
      );

      initCrowd();
    };

    const render = () => {
      if (destroyed)
        return;

      const ratio =
        window
          .devicePixelRatio ||
        1;

      ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height,
      );

      ctx.save();

      ctx.scale(
        ratio,
        ratio,
      );

      crowd.forEach(
        (peep) => {
          peep.render(ctx);
        },
      );

      ctx.restore();
    };

    const init = () => {
      if (destroyed)
        return;

      createPeeps();
      resize();

      gsap.ticker.add(
        render,
      );
    };

    image.onload = init;
    image.src = src;

    window.addEventListener(
      'resize',
      resize,
    );

    return () => {
      destroyed = true;

      window.removeEventListener(
        'resize',
        resize,
      );

      gsap.ticker.remove(
        render,
      );

      crowd.forEach(
        (peep) => {
          peep.walk?.kill();
        },
      );

      image.onload = null;
    };
  }, [src, rows, cols]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="
        absolute
        inset-0
        h-full
        w-full
        pointer-events-none
      "
    />
  );
}

/* =========================================================
   FAQ ITEM
========================================================= */

function FAQItem({
  question,
  answer,
  open,
  onClick,
}: {
  question: string;
  answer: string;
  open: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className="
        border-b
        border-[#17191C]/15
      "
    >
      <button
        type="button"
        onClick={onClick}
        aria-expanded={open}
        className="
          flex
          w-full
          items-center
          justify-between
          gap-5
          py-5
          text-left

          sm:py-7
        "
      >
        <span
          className="
            max-w-[900px]
            text-[16px]
            font-semibold
            leading-[1.3]
            tracking-[-0.03em]
            text-[#17191C]

            sm:text-[22px]

            lg:text-[25px]
          "
        >
          {question}
        </span>

        <span
          className={`
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-full
            border
            border-[#17191C]/15
            transition-all
            duration-300

            sm:h-11
            sm:w-11

            ${
              open
                ? 'rotate-180 bg-[#B12025] text-white border-[#B12025]'
                : 'text-[#17191C]'
            }
          `}
        >
          <ChevronDown
            className="
              h-4
              w-4
            "
          />
        </span>
      </button>

      <div
        className={`
          grid
          transition-all
          duration-500

          ${
            open
              ? 'grid-rows-[1fr] opacity-100'
              : 'grid-rows-[0fr] opacity-0'
          }
        `}
      >
        <div className="overflow-hidden">
          <p
            className="
              max-w-[850px]
              pb-6
              pr-10
              text-[12px]
              leading-[1.8]
              text-[#17191C]/65

              sm:pb-8
              sm:text-[14px]
              sm:leading-[1.9]
            "
          >
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
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
          <span
            data-rise-word
            className="inline-block"
          >
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}
/* =========================================================
   PAGE
========================================================= */

export default function ITServicesPage() {
  const rootRef =
    useRef<HTMLDivElement>(null);

  const serviceTrackRef =
    useRef<HTMLDivElement>(null);

  const [faqOpen, setFaqOpen] =
    useState<number | null>(0);
const [stat98, setStat98] = useState(0);
const [stat85, setStat85] = useState(0);
const [stat15, setStat15] = useState(0);
const [stat20, setStat20] = useState(0);
 /* =======================================================
   HERO + WORD RISING ANIMATION
======================================================= */

useEffect(() => {
  const root = rootRef.current;

  if (!root) return;

  const ctx = gsap.context(() => {
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (reduceMotion) {
      gsap.set('[data-rise-word]', {
        yPercent: 0,
        opacity: 1,
      });

      return;
    }

    gsap.set('[data-rise-word]', {
      yPercent: 115,
      opacity: 0,
    });

    const timeline = gsap.timeline({
      defaults: {
        ease: 'power4.out',
      },
    });

    timeline.fromTo(
      '[data-hero-eyebrow]',
      {
        opacity: 0,
        y: 15,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
      },
    );

    timeline.to(
      '[data-rise-word]',
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.95,
        stagger: 0.045,
      },
      '-=0.25',
    );

    timeline.fromTo(
      '[data-hero-copy]',
      {
        opacity: 0,
        y: 25,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        stagger: 0.1,
      },
      '-=0.45',
    );

    timeline.fromTo(
      '[data-hero-stats]',
      {
        opacity: 0,
        y: 25,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
      },
      '-=0.35',
    );

    gsap.to('[data-down-arrow]', {
      y: 5,
      duration: 0.65,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }, root);

  return () => ctx.revert();
}, []);
/* =======================================================
   STAT AUTO INCREMENT
======================================================= */

useEffect(() => {
  const heroStats =
    document.getElementById('hero-stats');

  if (!heroStats) return;

  let hasAnimated = false;

  const animateValue = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    target: number,
    duration: number,
  ) => {
    const startTime = performance.now();

    const update = (currentTime: number) => {
      const elapsed = currentTime - startTime;

      const progress = Math.min(
        elapsed / duration,
        1,
      );

      const eased =
        1 - Math.pow(1 - progress, 3);

      setter(
        Math.round(target * eased),
      );

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (
        entry.isIntersecting &&
        !hasAnimated
      ) {
        hasAnimated = true;

        animateValue(
          setStat98,
          98,
          1500,
        );

        animateValue(
          setStat85,
          85,
          1500,
        );

        animateValue(
          setStat15,
          15,
          1300,
        );

        animateValue(
          setStat20,
          20,
          1400,
        );

        observer.disconnect();
      }
    },
    {
      threshold: 0.25,
    },
  );

  observer.observe(heroStats);

  return () => observer.disconnect();
}, []);
  /* =======================================================
     MOBILE AUTO SERVICE CARDS
  ======================================================= */

  useEffect(() => {
    const track =
      serviceTrackRef.current;

    if (!track) return;

    const mobile =
      window.matchMedia(
        '(max-width: 639px)',
      );

    const reduced =
      window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      );

    let interval:
      | ReturnType<
          typeof setInterval
        >
      | undefined;

    let resumeTimer:
      | ReturnType<
          typeof setTimeout
        >
      | undefined;

    let currentIndex = 0;

    const cards =
      Array.from(
        track.querySelectorAll<HTMLElement>(
          '[data-service-card]',
        ),
      );

    const stop = () => {
      if (interval) {
        clearInterval(
          interval,
        );

        interval =
          undefined;
      }
    };

    const scrollToCard = (
      index: number,
    ) => {
      const card =
        cards[index];

      if (!card) return;

      track.scrollTo({
        left:
          card.offsetLeft -
          track.offsetLeft,

        behavior:
          reduced.matches
            ? 'auto'
            : 'smooth',
      });
    };

    const next = () => {
      if (
        !mobile.matches ||
        reduced.matches ||
        cards.length < 2
      ) {
        return;
      }

      currentIndex =
        (currentIndex + 1) %
        cards.length;

      scrollToCard(
        currentIndex,
      );
    };

    const start = () => {
      stop();

      if (
        !mobile.matches ||
        reduced.matches
      ) {
        return;
      }

      interval =
        setInterval(
          next,
          3200,
        );
    };

    const pause = () => {
      stop();

      if (resumeTimer) {
        clearTimeout(
          resumeTimer,
        );
      }

      resumeTimer =
        setTimeout(
          start,
          6000,
        );
    };

    track.addEventListener(
      'touchstart',
      pause,
      {
        passive: true,
      },
    );

    track.addEventListener(
      'pointerdown',
      pause,
    );

    start();

    return () => {
      stop();

      if (resumeTimer) {
        clearTimeout(
          resumeTimer,
        );
      }

      track.removeEventListener(
        'touchstart',
        pause,
      );

      track.removeEventListener(
        'pointerdown',
        pause,
      );
    };
  }, []);

  const scrollToServices =
    () => {
      document
        .getElementById(
          'it-services-list',
        )
        ?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
    };

  return (
    <div
      ref={rootRef}
      className="
        bg-white
        text-[#17191C]
      "
    >
   {/* ===================================================
    01 — WHITE HERO + ANIMATED CROWD BEHIND TEXT
=================================================== */}

<section
  aria-labelledby="it-services-title"
  className="
    relative
    isolate
    overflow-hidden
    bg-white
    px-5
    pb-[100px]
    pt-[125px]

    sm:px-8
    sm:pb-[130px]
    sm:pt-[160px]

    lg:px-14
    lg:pb-[150px]
    lg:pt-[185px]
  "
>
  {/* =================================================
      ANIMATED CANVAS CROWD — BEHIND HERO TEXT
  ================================================= */}

  <div
    aria-hidden="true"
    className="
      pointer-events-none
      absolute
      inset-x-0
      bottom-0
      z-0
      h-[390px]
      overflow-hidden

      sm:h-[500px]
      lg:h-[620px]
    "
  >
    <div
      className="
        absolute
        inset-0
        opacity-[0.13]

        sm:opacity-[0.15]
        lg:opacity-[0.17]
      "
    >
      <CrowdCanvas
        src="https://cdn.21st.dev/assets/localized/abdb8990a7bef8c2f5af3e45f0a3c969c4b0603fba8be92e81347de4ea4e1ed7.png"
        rows={15}
        cols={7}
      />
    </div>

    {/* Soft white fade from the heading into the crowd */}
    <div
      className="
        absolute
        inset-x-0
        top-0
        h-[150px]
        bg-gradient-to-b
        from-white
        via-white/75
        to-transparent

        sm:h-[190px]
        lg:h-[220px]
      "
    />

    {/* Bottom fade keeps the hero transition clean */}
    <div
      className="
        absolute
        inset-x-0
        bottom-0
        h-[70px]
        bg-gradient-to-t
        from-white
        to-transparent
      "
    />
  </div>

  {/* Subtle white centre veil for text readability */}
  <div
    aria-hidden="true"
    className="
      pointer-events-none
      absolute
      left-1/2
      top-[54%]
      z-[1]
      h-[470px]
      w-[92%]
      max-w-[1120px]
      -translate-x-1/2
      -translate-y-1/2
      rounded-[50%]
      bg-white/58
      blur-[48px]

      sm:bg-white/52
      lg:bg-white/45
    "
  />

  {/* =================================================
      HERO CONTENT
  ================================================= */}

  <div
    className="
      relative
      z-20
      mx-auto
      max-w-[1450px]
    "
  >
    {/* EYEBROW */}

    <p
      data-hero-eyebrow
      className="
        text-center
        text-[9px]
        font-bold
        uppercase
        tracking-[0.25em]
        text-[#B12025]

        sm:text-[11px]
      "
    >
      IT SERVICES IN SRI LANKA
    </p>

    {/* H1 — WORD RISING */}

    <h1
      id="it-services-title"
      className="
        mx-auto
        mt-5
        max-w-[1450px]
        text-center
        text-[clamp(2.35rem,10vw,4rem)]
        font-semibold
        leading-[1.02]
        tracking-[-0.065em]
        text-[#B12025]

        sm:mt-7
        sm:text-[clamp(3.8rem,6.2vw,6.6rem)]

        lg:whitespace-nowrap
        lg:text-[clamp(4.2rem,5.4vw,6.6rem)]
      "
    >
      <RisingWords
        text="One IT Services Team in Colombo,"
      />
    </h1>

    <p
      className="
        mx-auto
        mt-4
        max-w-[1180px]
        text-center
        text-[clamp(1.45rem,6vw,2.2rem)]
        font-semibold
        leading-[1.08]
        tracking-[-0.045em]
        text-[#B12025]

        sm:mt-5
        sm:text-[clamp(2rem,3.5vw,3.5rem)]

        lg:text-[clamp(2.4rem,3vw,3.6rem)]
      "
    >
      <RisingWords
        text="From Building Your Website to Answering Your Customers' Technical Questions."
      />
    </p>

    {/* DESCRIPTION */}

    <div
      className="
        relative
        z-20
        mx-auto
        mt-7
        max-w-[850px]
        text-center

        sm:mt-10
      "
    >
      <p
        data-hero-copy
        className="
          text-[12px]
          leading-[1.75]
          text-[#17191C]/65

          sm:text-[15px]
          sm:leading-[1.9]

          lg:text-[16px]
        "
      >
        Your website needs regular updates, and your
        staff need help when a laptop or login fails.
        If you sell software or devices, your customers
        also need answers to technical questions.
      </p>

      <p
        data-hero-copy
        className="
          mx-auto
          mt-4
          max-w-[760px]
          text-[12px]
          leading-[1.75]
          text-[#17191C]/65

          sm:mt-5
          sm:text-[15px]
          sm:leading-[1.9]

          lg:text-[16px]
        "
      >
        FirstNotch&apos;s team in Colombo covers all
        of it. Choose only the services you need.
        Every ticket and task gets a quality score.
      </p>

      <button
        type="button"
        onClick={scrollToServices}
        data-hero-copy
        className="
          group
          mt-7
          inline-flex
          items-center
          gap-3
          border-b
          border-[#B12025]/30
          pb-2
          text-[11px]
          font-semibold
          text-[#B12025]
          transition-colors

          hover:border-[#B12025]

          sm:mt-9
          sm:text-[13px]
        "
      >
        See the four services

        <ArrowDown
          data-down-arrow
          className="h-4 w-4"
        />
      </button>
    </div>

    {/* Space lets the animated crowd remain visible behind the lower hero */}
    <div
      aria-hidden="true"
      className="
        h-[150px]
        sm:h-[210px]
        lg:h-[250px]
      "
    />
  </div>
</section>

{/* ===================================================
    HERO STATS — DIRECTLY AFTER HERO
=================================================== */}

<section
  aria-label="IT services performance statistics"
  className="
    relative
    z-30
    bg-white
    px-5

    sm:px-8
    lg:px-14
  "
>
  <div
    id="hero-stats"
    data-hero-stats
    className="
      mx-auto
      grid
      max-w-[1200px]
      grid-cols-2
      border-y
      border-[#17191C]/10
      bg-white

      lg:grid-cols-4
    "
  >
    {/* 98% */}
    <div
      className="
        min-h-[120px]
        border-b
        border-r
        border-[#17191C]/10
        p-4

        sm:min-h-[150px]
        sm:p-6

        lg:border-b-0
      "
    >
      <strong
        className="
          block
          text-[25px]
          font-semibold
          tracking-[-0.05em]
          text-[#B12025]

          sm:text-[38px]
        "
      >
        {stat98}%
      </strong>

      <span
        className="
          mt-2
          block
          max-w-[180px]
          text-[9px]
          leading-[1.5]
          text-[#17191C]/50

          sm:text-[11px]
        "
      >
        Accuracy rate across client work
      </span>
    </div>

    {/* 85% */}
    <div
      className="
        min-h-[120px]
        border-b
        border-[#17191C]/10
        p-4

        sm:min-h-[150px]
        sm:p-6

        lg:border-b-0
        lg:border-r
      "
    >
      <strong
        className="
          block
          text-[25px]
          font-semibold
          tracking-[-0.05em]
          text-[#B12025]

          sm:text-[38px]
        "
      >
        {stat85}%
      </strong>

      <span
        className="
          mt-2
          block
          max-w-[180px]
          text-[9px]
          leading-[1.5]
          text-[#17191C]/50

          sm:text-[11px]
        "
      >
        Client retention rate
      </span>
    </div>

    {/* 15–20% */}
    <Link
      href="/how-we-hire"
      className="
        group
        min-h-[120px]
        border-r
        border-[#17191C]/10
        p-4
        transition-colors

        hover:bg-[#B12025]/[0.035]

        sm:min-h-[150px]
        sm:p-6
      "
    >
      <strong
        className="
          block
          text-[25px]
          font-semibold
          tracking-[-0.05em]
          text-[#B12025]

          sm:text-[38px]
        "
      >
        {stat15}–20%
      </strong>

      <span
        className="
          mt-2
          block
          max-w-[180px]
          text-[9px]
          leading-[1.5]
          text-[#17191C]/50

          sm:text-[11px]
        "
      >
        Of job applicants pass the hiring checks
      </span>
    </Link>

    {/* 20+ */}
    <Link
      href="/services/it-services/web-development"
      className="
        group
        min-h-[120px]
        p-4
        transition-colors

        hover:bg-[#B12025]/[0.035]

        sm:min-h-[150px]
        sm:p-6
      "
    >
      <strong
        className="
          block
          text-[25px]
          font-semibold
          tracking-[-0.05em]
          text-[#B12025]

          sm:text-[38px]
        "
      >
        {stat20}+
      </strong>

      <span
        className="
          mt-2
          block
          max-w-[180px]
          text-[9px]
          leading-[1.5]
          text-[#17191C]/50

          sm:text-[11px]
        "
      >
        Websites built and maintained
      </span>
    </Link>
  </div>
</section>

      {/* ===================================================
          02 — FOUR SERVICES
          MOBILE = AUTO HORIZONTAL
      =================================================== */}

      <section
        id="it-services-list"
        className="
          scroll-mt-[90px]
          overflow-hidden
          bg-[#F5F5F3]
          px-5
          py-[65px]

          sm:px-8
          sm:py-[110px]

          lg:px-14
          lg:py-[140px]
        "
      >
        <div
          className="
            mx-auto
            max-w-[1450px]
          "
        >
          <p
            className="
              text-center
              text-[9px]
              font-bold
              uppercase
              tracking-[0.22em]
              text-[#B12025]

              sm:text-[11px]
            "
          >
            ONE TEAM. FOUR
            SERVICES.
          </p>

          <h2
            className="
              mx-auto
              mt-4
              max-w-[850px]
              text-center
              text-[34px]
              font-semibold
              leading-[1]
              tracking-[-0.055em]
              text-[#17191C]

              sm:mt-6
              sm:text-[clamp(3rem,5vw,5.8rem)]
            "
          >
            IT services
          </h2>

          <p
            className="
              mx-auto
              mt-4
              max-w-[550px]
              text-center
              text-[11px]
              leading-[1.7]
              text-[#17191C]/55

              sm:text-[14px]
            "
          >
            Choose a service
            to see what it
            includes.
          </p>

          {/* =================================================
              DISPLAY CARDS — STACKED / SKEW STYLE
          ================================================= */}

          <div
            ref={serviceTrackRef}
            className="
              -mx-5
              mt-10
              flex
              snap-x
              snap-mandatory
              gap-6
              overflow-x-auto
              overscroll-x-contain
              px-5
              pb-12

              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden

              sm:mx-0
              sm:mt-14
              sm:grid
              sm:grid-cols-2
              sm:gap-x-8
              sm:gap-y-14
              sm:overflow-visible
              sm:px-0
              sm:pb-8

              lg:grid-cols-4
              lg:gap-7
            "
          >
            {services.map((service, index) => {
              const Icon = service.Icon;

              return (
                <div
                  key={service.title}
                  data-service-card
                  className="
                    group
                    relative
                    w-[84vw]
                    max-w-[325px]
                    shrink-0
                    snap-center

                    sm:w-auto
                    sm:max-w-none
                    sm:snap-none
                  "
                >
                  {/* Back stacked layer 01 */}
                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      z-0
                      translate-x-[18px]
                      translate-y-[22px]
                      -skew-y-[8deg]
                      rounded-[24px]
                      border
                      border-[#B12025]/10
                      bg-white/45
                      opacity-80
                      backdrop-blur-[2px]
                      transition-all
                      duration-700

                      group-hover:translate-x-[10px]
                      group-hover:translate-y-[14px]
                      group-hover:border-[#B12025]/20

                      sm:rounded-[28px]
                    "
                  />

                  {/* Back stacked layer 02 */}
                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      z-[1]
                      translate-x-[9px]
                      translate-y-[11px]
                      -skew-y-[8deg]
                      rounded-[24px]
                      border
                      border-[#17191C]/10
                      bg-white/75
                      opacity-90
                      shadow-[0_16px_45px_rgba(23,25,28,0.05)]
                      backdrop-blur-sm
                      transition-all
                      duration-700

                      group-hover:translate-x-[5px]
                      group-hover:translate-y-[7px]
                      group-hover:border-[#B12025]/20

                      sm:rounded-[28px]
                    "
                  />

                  <Link
                    href={service.href}
                    className="
                      relative
                      z-10
                      flex
                      min-h-[335px]
                      flex-col
                      overflow-hidden
                      -skew-y-[8deg]
                      select-none
                      rounded-[24px]
                      border-2
                      border-[#17191C]/10
                      bg-white/90
                      px-5
                      py-5
                      shadow-[0_20px_55px_rgba(23,25,28,0.06)]
                      backdrop-blur-sm
                      transition-all
                      duration-700
                      ease-[cubic-bezier(0.22,1,0.36,1)]

                      before:absolute
                      before:inset-0
                      before:z-0
                      before:rounded-[inherit]
                      before:bg-[#F5F5F3]/40
                      before:opacity-100
                      before:transition-opacity
                      before:duration-700
                      before:content-['']

                      after:absolute
                      after:-right-[22%]
                      after:top-[-5%]
                      after:z-0
                      after:h-[110%]
                      after:w-[62%]
                      after:bg-gradient-to-l
                      after:from-white
                      after:via-white/85
                      after:to-transparent
                      after:content-['']

                      hover:-translate-y-4
                      hover:skew-y-0
                      hover:border-[#B12025]/30
                      hover:bg-white
                      hover:shadow-[0_30px_80px_rgba(177,32,37,0.12)]
                      hover:before:opacity-0

                      sm:min-h-[390px]
                      sm:rounded-[28px]
                      sm:px-7
                      sm:py-7

                      lg:min-h-[420px]
                    "
                  >
                    {/* Counter + arrow */}
                    <div
                      className="
                        relative
                        z-10
                        flex
                        items-center
                        justify-between
                        gap-4
                      "
                    >
                      <span
                        className="
                          font-mono
                          text-[10px]
                          font-semibold
                          tracking-[0.14em]
                          text-[#17191C]/40
                        "
                      >
                        {service.number} / 04
                      </span>

                      <span
                        className="
                          flex
                          h-8
                          w-8
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-[#17191C]/10
                          bg-white/90
                          text-[#17191C]/40
                          transition-all
                          duration-500

                          group-hover:border-[#B12025]
                          group-hover:bg-[#B12025]
                          group-hover:text-white
                        "
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>

                    {/* Icon */}
                    <div
                      className="
                        relative
                        z-10
                        mt-9
                        flex
                        h-[52px]
                        w-[52px]
                        items-center
                        justify-center
                        rounded-full
                        bg-[#B12025]
                        text-white
                        shadow-[0_10px_30px_rgba(177,32,37,0.18)]
                        transition-all
                        duration-500

                        group-hover:scale-105

                        sm:mt-11
                        sm:h-[58px]
                        sm:w-[58px]
                      "
                    >
                      <Icon
                        className="
                          h-5
                          w-5

                          sm:h-6
                          sm:w-6
                        "
                        strokeWidth={1.8}
                      />
                    </div>

                    {/* Content */}
                    <div
                      className="
                        relative
                        z-10
                        mt-auto
                        pt-12
                      "
                    >
                      <p
                        className="
                          mb-3
                          text-[9px]
                          font-semibold
                          uppercase
                          tracking-[0.16em]
                          text-[#B12025]/75

                          sm:text-[10px]
                        "
                      >
                        {service.short}
                      </p>

                      <h3
                        className="
                          text-[22px]
                          font-semibold
                          leading-[1.05]
                          tracking-[-0.045em]
                          text-[#17191C]

                          sm:text-[27px]
                          lg:text-[25px]
                          xl:text-[27px]
                        "
                      >
                        {service.title}
                      </h3>

                      <p
                        className="
                          mt-4
                          max-w-[280px]
                          text-[11px]
                          leading-[1.75]
                          text-[#17191C]/60

                          sm:text-[13px]
                          sm:leading-[1.8]
                        "
                      >
                        {service.description}
                      </p>

                      <div
                        className="
                          mt-6
                          flex
                          items-center
                          justify-between
                          gap-3
                          border-t
                          border-[#17191C]/10
                          pt-4
                        "
                      >
                        <span
                          className="
                            text-[9px]
                            font-semibold
                            uppercase
                            tracking-[0.12em]
                            text-[#B12025]

                            sm:text-[10px]
                          "
                        >
                          {service.cue}
                        </span>

                        <ArrowRight
                          className="
                            h-4
                            w-4
                            shrink-0
                            text-[#B12025]
                            transition-transform
                            duration-500

                            group-hover:translate-x-1
                          "
                        />
                      </div>
                    </div>
                  </Link>

                  {/* Decorative service number */}
                  <span
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      -bottom-7
                      right-3
                      z-20
                      text-[44px]
                      font-semibold
                      leading-none
                      tracking-[-0.08em]
                      text-[#B12025]/[0.07]

                      sm:text-[58px]
                    "
                  >
                    0{index + 1}
                  </span>
                </div>
              );
            })}
          </div>

          {/* MOBILE INDICATOR */}

          <div
            className="
              mt-5
              flex
              items-center
              justify-center
              gap-2

              sm:hidden
            "
          >
            {services.map(
              (
                service,
                index,
              ) => (
                <span
                  key={
                    service.title
                  }
                  className={`
                    h-[3px]
                    rounded-full

                    ${
                      index ===
                      0
                        ? 'w-7 bg-[#B12025]'
                        : 'w-3 bg-[#17191C]/15'
                    }
                  `}
                />
              ),
            )}
          </div>
        </div>
      </section>

     

      {/* ===================================================
          04 — TESTIMONIAL
      =================================================== */}

      <section
        className="
          bg-[#17191C]
          px-5
          py-[65px]
          text-white

          sm:px-8
          sm:py-[110px]

          lg:px-14
          lg:py-[140px]
        "
      >
        <div
          className="
            mx-auto
            max-w-[1250px]
          "
        >
          <p
            className="
              text-[9px]
              font-bold
              uppercase
              tracking-[0.22em]
              text-white/45

              sm:text-[11px]
            "
          >
            CLIENT EXPERIENCE
          </p>

          <blockquote
            className="
              mt-7
              max-w-[1100px]
              text-[28px]
              font-semibold
              leading-[1.12]
              tracking-[-0.045em]

              sm:mt-10
              sm:text-[clamp(2.7rem,5vw,5.5rem)]
            "
          >
            &ldquo;The team
            built our new{' '}
            <span
              className="
                text-[#E75A5F]
              "
            >
              website
            </span>
            , and our staff now
            call them for help
            with{' '}
            <span
              className="
                text-[#E75A5F]
              "
            >
              laptops and
              email.
            </span>
            &rdquo;
          </blockquote>

          <div
            className="
              mt-8
              flex
              items-center
              gap-4
              border-t
              border-white/10
              pt-5

              sm:mt-12
              sm:pt-7
            "
          >
            <div
              className="
                h-2
                w-2
                rounded-full
                bg-[#B12025]
              "
            />

            <p
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.15em]
                text-white/55

                sm:text-[12px]
              "
            >
              Interior design
              studio
            </p>
          </div>
        </div>
      </section>

      {/* ===================================================
          05 — SECURITY / OWNERSHIP
      =================================================== */}

      <section
        className="
          bg-white
          px-5
          py-[65px]

          sm:px-8
          sm:py-[110px]

          lg:px-14
          lg:py-[140px]
        "
      >
        <div
          className="
            mx-auto
            max-w-[1350px]
          "
        >
          <div
            className="
              grid
              gap-4

              lg:grid-cols-2
              lg:gap-6
            "
          >
            {/* OWNERSHIP */}

            <div
              className="
                rounded-[24px]
                bg-[#B12025]
                p-6
                text-white

                sm:rounded-[32px]
                sm:p-10

                lg:p-12
              "
            >
              <p
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-white/60

                  sm:text-[11px]
                "
              >
                OWNERSHIP
              </p>

              <h2
                className="
                  mt-5
                  text-[32px]
                  font-semibold
                  leading-[1]
                  tracking-[-0.05em]

                  sm:text-[50px]
                "
              >
                Your website.
                <br />
                Your code.
              </h2>

              <p
                className="
                  mt-5
                  max-w-[500px]
                  text-[11px]
                  leading-[1.75]
                  text-white/75

                  sm:text-[14px]
                "
              >
                The code,
                domain and
                hosting
                accounts are
                in your name,
                and you have
                full access at
                all times.
              </p>

              <div
                className="
                  mt-8
                  flex
                  flex-wrap
                  gap-2
                "
              >
                {[
                  'Code',
                  'Domain',
                  'Hosting',
                ].map(
                  (item) => (
                    <span
                      key={
                        item
                      }
                      className="
                        rounded-full
                        border
                        border-white/20
                        bg-white/10
                        px-4
                        py-2
                        text-[10px]
                        font-semibold

                        sm:text-[12px]
                      "
                    >
                      {item}
                    </span>
                  ),
                )}
              </div>
            </div>

            {/* SECURITY */}

            <div
              className="
                rounded-[24px]
                bg-[#F5F5F3]
                p-6

                sm:rounded-[32px]
                sm:p-10

                lg:p-12
              "
            >
              <p
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-[#B12025]

                  sm:text-[11px]
                "
              >
                SECURITY
              </p>

              <h2
                className="
                  mt-5
                  text-[32px]
                  font-semibold
                  leading-[1]
                  tracking-[-0.05em]
                  text-[#17191C]

                  sm:text-[50px]
                "
              >
                Access only
                where it is
                needed.
              </h2>

              <div
                className="
                  mt-8
                  space-y-3
                "
              >
                {[
                  'Own login per team member',
                  'Two-factor login on accounts',
                  'Monthly security updates',
                ].map(
                  (item) => (
                    <div
                      key={
                        item
                      }
                      className="
                        flex
                        items-center
                        gap-3
                        rounded-[14px]
                        bg-white
                        p-4

                        sm:p-5
                      "
                    >
                      <span
                        className="
                          flex
                          h-8
                          w-8
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          bg-[#B12025]
                          text-white
                        "
                      >
                        <Check
                          className="
                            h-4
                            w-4
                          "
                        />
                      </span>

                      <span
                        className="
                          text-[11px]
                          font-semibold
                          text-[#17191C]

                          sm:text-[13px]
                        "
                      >
                        {item}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          06 — HOW TEAM IS SET UP
      =================================================== */}

      <section
        className="
          bg-[#F5F5F3]
          px-5
          py-[65px]

          sm:px-8
          sm:py-[110px]

          lg:px-14
          lg:py-[140px]
        "
      >
        <div
          className="
            mx-auto
            max-w-[1350px]
          "
        >
          <p
            className="
              text-[9px]
              font-bold
              uppercase
              tracking-[0.22em]
              text-[#B12025]

              sm:text-[11px]
            "
          >
            THE PROCESS
          </p>

          <h2
            className="
              mt-4
              max-w-[900px]
              text-[34px]
              font-semibold
              leading-[1.02]
              tracking-[-0.055em]
              text-[#17191C]

              sm:mt-6
              sm:text-[clamp(3rem,5vw,5.8rem)]
            "
          >
            How your IT
            services team is
            set up
          </h2>

          <p
            className="
              mt-5
              max-w-[720px]
              text-[11px]
              leading-[1.75]
              text-[#17191C]/55

              sm:text-[14px]
              sm:leading-[1.9]
            "
          >
            The biggest risk
            with outsourced IT
            services is a team
            that does not know
            your systems. These
            steps are there to
            stop that.
          </p>

          <div
            className="
              mt-10
              grid
              border-t
              border-[#17191C]/15

              sm:mt-14

              lg:grid-cols-4
            "
          >
            {process.map(
              (
                item,
                index,
              ) => (
                <article
                  key={
                    item.number
                  }
                  className={`
                    relative
                    border-b
                    border-[#17191C]/15
                    py-7

                    lg:min-h-[370px]
                    lg:border-b-0
                    lg:px-7
                    lg:py-9

                    ${
                      index <
                      process.length -
                        1
                        ? 'lg:border-r'
                        : ''
                    }
                  `}
                >
                  <span
                    className="
                      text-[10px]
                      font-semibold
                      text-[#B12025]
                    "
                  >
                    {
                      item.number
                    }
                  </span>

                  <h3
                    className="
                      mt-5
                      text-[21px]
                      font-semibold
                      leading-[1.1]
                      tracking-[-0.04em]

                      sm:text-[25px]
                    "
                  >
                    {
                      item.title
                    }
                  </h3>

                  <p
                    className="
                      mt-4
                      text-[11px]
                      leading-[1.75]
                      text-[#17191C]/55

                      sm:text-[13px]
                    "
                  >
                    {
                      item.description
                    }
                  </p>

                  {index ===
                    1 && (
                    <Link
                      href="/how-we-hire"
                      className="
                        mt-5
                        inline-flex
                        items-center
                        gap-2
                        text-[10px]
                        font-semibold
                        text-[#B12025]
                      "
                    >
                      How we hire

                      <ArrowRight
                        className="
                          h-3
                          w-3
                        "
                      />
                    </Link>
                  )}
                </article>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ===================================================
          07 — FAQ
      =================================================== */}

      <section
        className="
          bg-white
          px-5
          py-[65px]

          sm:px-8
          sm:py-[110px]

          lg:px-14
          lg:py-[140px]
        "
      >
        <div
          className="
            mx-auto
            max-w-[1200px]
          "
        >
          <p
            className="
              text-[9px]
              font-bold
              uppercase
              tracking-[0.22em]
              text-[#B12025]

              sm:text-[11px]
            "
          >
            FAQ
          </p>

          <h2
            className="
              mt-4
              max-w-[850px]
              text-[34px]
              font-semibold
              leading-[1.02]
              tracking-[-0.055em]
              text-[#17191C]

              sm:mt-6
              sm:text-[clamp(3rem,5vw,5.7rem)]
            "
          >
            Common questions
            about IT services
          </h2>

          <div
            className="
              mt-9
              border-t
              border-[#17191C]/15

              sm:mt-14
            "
          >
            {faqs.map(
              (
                item,
                index,
              ) => (
                <FAQItem
                  key={
                    item.question
                  }
                  question={
                    item.question
                  }
                  answer={
                    item.answer
                  }
                  open={
                    faqOpen ===
                    index
                  }
                  onClick={() =>
                    setFaqOpen(
                      faqOpen ===
                        index
                        ? null
                        : index,
                    )
                  }
                />
              ),
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export { CrowdCanvas };