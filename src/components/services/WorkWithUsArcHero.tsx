"use client";

import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";

import { useEffect, useRef, useState } from "react";

import {
  ArrowDown,
  ArrowDownRight,
  ArrowUpRight,
} from "lucide-react";

/* =========================================================
   FIRSTNOTCH — WORK WITH US ARC HERO

   IMPORTANT:
   These image URLs can be used while testing.
   For production, download them and move them into:
   /public/images/work-with-us/arc/
========================================================= */

const IMAGES = [
  {
    src: "https://cdn.21st.dev/assets/mirror/8d/8d977413e33d13b57b479928aaca7fa615349b474571111cee15c6b4c34f2610.jpg",
    alt: "FirstNotch workplace",
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/ac/ac9898cfaa05a97dd2f761001df77089b2d5c9a7ef314334ed8a365066c85731.jpg",
    alt: "FirstNotch team environment",
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/43/43f7be43a5101374e8985553e60ae006fc2bbe0d0ec3bc63704dc63223ff751f.jpg",
    alt: "FirstNotch career opportunity",
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/46/469ae1c35478b9e73601eb794cea6c165f46272adedba602bc9f840297958d00.jpg",
    alt: "FirstNotch people",
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/43/43295ef5e54f2fb0feacfbea50a1ec931cd3e6035a639161d0f9cab2fd2c9883.jpg",
    alt: "FirstNotch team",
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/39/3976b74adfe9797661c579160d9d74c15796f22e8a95d403eb65fb862dfdf146.jpg",
    alt: "FirstNotch work culture",
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/57/57e96de163ac4590642aa7394a0f881da10ddfc0040f617a563c8e8b9d5e63e2.jpg",
    alt: "FirstNotch career growth",
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/7e/7e50eacbe7a777eecd57647eba3689a92231910e98f09d767e09044fde890a18.jpg",
    alt: "FirstNotch opportunities",
  },
];

/* =========================================================
   ARC CARD GENERATOR
========================================================= */

const generateInvertedArcCards = () => {
  const radiusX = 45;
  const radiusY = 35;

  const total = IMAGES.length;

  return IMAGES.map((item, index) => {
    const angle =
      Math.PI -
      (index / (total - 1)) * Math.PI;

    const x =
      Math.cos(angle) * radiusX;

    const y =
      Math.sin(angle) * radiusY + 10;

    const rotate =
      ((Math.PI / 2 - angle) * 180) /
      Math.PI;

    return {
      item,

      linearOffset: {
        x: (index - total / 2) * 5,
        y: -5,
      },

      linearRotate:
        (index - total / 2) * 2,

      target: {
        x,
        y,
        rotate,
        scale: 0.9,
        w: 14,
        h: 22,
      },

      targetSm: {
        x:
          Math.cos(angle) * 50,

        y:
          Math.sin(angle) * 40 + 20,

        rotate,

        scale: 0.85,

        w: 26,
        h: 22,
      },

      z: index + 1,
    };
  });
};

const CARDS =
  generateInvertedArcCards();

/* =========================================================
   MOTION SETTINGS
========================================================= */

const SPRING_CONFIG = {
  stiffness: 40,
  damping: 25,
  mass: 0.5,
};

const PROGRESS_SPRING = {
  stiffness: 60,
  damping: 20,
  restDelta: 0.001,
};

/* =========================================================
   POINTER PARALLAX
========================================================= */

function usePointerParallax(
  active: boolean,
  enabled: boolean
) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(
    rawX,
    SPRING_CONFIG
  );

  const y = useSpring(
    rawY,
    SPRING_CONFIG
  );

  useEffect(() => {
    if (!enabled || !active) return;

    const onMove = (
      event: PointerEvent
    ) => {
      rawX.set(
        (event.clientX /
          window.innerWidth -
          0.5) *
          2
      );

      rawY.set(
        (event.clientY /
          window.innerHeight -
          0.5) *
          2
      );
    };

    window.addEventListener(
      "pointermove",
      onMove,
      {
        passive: true,
      }
    );

    return () => {
      window.removeEventListener(
        "pointermove",
        onMove
      );
    };
  }, [
    active,
    enabled,
    rawX,
    rawY,
  ]);

  return {
    x,
    y,
  };
}

/* =========================================================
   TYPES
========================================================= */

type ArcCard =
  (typeof CARDS)[number];

interface CardProps {
  card: ArcCard;

  progress: MotionValue<number>;

  pointer: {
    x: MotionValue<number>;
    y: MotionValue<number>;
  };

  index: number;
  total: number;

  isSpreadActive: boolean;
  isMobile: boolean;
}

/* =========================================================
   ARC CARD
========================================================= */

function Card({
  card,
  progress,
  pointer,
  index,
  total,
  isSpreadActive,
  isMobile,
}: CardProps) {
  const {
    item,
    linearOffset,
    linearRotate,
  } = card;

  const activeTarget =
    isMobile
      ? card.targetSm
      : card.target;

  const depthFactor =
    0.3 +
    (index / total) * 0.7;

  /* -----------------------------
     X POSITION
  ----------------------------- */

  const x = useTransform(
    [progress, pointer.x],
    ([progressValue, pointerX]) => {
      const p =
        Number(progressValue);

      const px =
        Number(pointerX);

      const easeP =
        p < 0.5
          ? 4 * p * p * p
          : 1 -
            Math.pow(
              -2 * p + 2,
              3
            ) /
              2;

      const targetX =
        linearOffset.x +
        (activeTarget.x -
          linearOffset.x) *
          easeP;

      const finalX =
        targetX -
        px *
          3 *
          depthFactor *
          p;

      return `calc(-50% + ${finalX}vw)`;
    }
  );

  /* -----------------------------
     Y POSITION
  ----------------------------- */

  const y = useTransform(
    [progress, pointer.y],
    ([progressValue, pointerY]) => {
      const p =
        Number(progressValue);

      const py =
        Number(pointerY);

      const easeP =
        p < 0.5
          ? 4 * p * p * p
          : 1 -
            Math.pow(
              -2 * p + 2,
              3
            ) /
              2;

      const targetY =
        linearOffset.y +
        (activeTarget.y -
          linearOffset.y) *
          easeP;

      const finalY =
        targetY -
        py *
          3 *
          depthFactor *
          p;

      return `calc(-50% + ${finalY}vh)`;
    }
  );

  /* -----------------------------
     ROTATION
  ----------------------------- */

  const rotate =
    useTransform(
      progress,
      [0, 1],
      [
        linearRotate,
        activeTarget.rotate,
      ]
    );

  /* -----------------------------
     SCALE
  ----------------------------- */

  const scale =
    useTransform(
      progress,
      [0, 1],
      [
        0.7,
        activeTarget.scale,
      ]
    );

  return (
    <motion.div
      className="
        pointer-events-auto
        absolute
        left-1/2
        top-1/2
        cursor-pointer
        will-change-transform
      "
      style={{
        width: `${activeTarget.w}vw`,
        height: `${activeTarget.h}vh`,

        zIndex: card.z,

        x,
        y,
        rotate,
        scale,
      }}
      whileHover={
        isSpreadActive
          ? {
              scale:
                activeTarget.scale *
                1.12,

              rotate:
                activeTarget.rotate *
                1.03,

              zIndex: 100,

              transition:
                SPRING_CONFIG,

              boxShadow:
                "0 25px 50px -12px rgba(0,0,0,.25)",
            }
          : {
              scale: 0.75,

              rotate:
                linearRotate *
                1.08,

              transition:
                SPRING_CONFIG,
            }
      }
    >
      <div
        className="
          relative
          h-full
          w-full
          overflow-hidden
          rounded-[22px]
          bg-white
          shadow-[0_20px_60px_rgba(23,25,28,.15)]
          ring-1
          ring-[#17191C]/10
          transition-shadow
          duration-500
          hover:shadow-[0_30px_80px_rgba(23,25,28,.25)]
        "
      >
        {/* CARD GRADIENT */}

        <div
          className="
            absolute
            inset-0
            z-10
            bg-gradient-to-t
            from-black/35
            via-transparent
            to-transparent
            opacity-60
          "
        />

        {/* IMAGE */}

        <img
          src={item.src}
          alt={item.alt}
          draggable={false}
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            transition-transform
            duration-700
            hover:scale-110
          "
        />

        {/* RED DETAIL */}

        <div
          aria-hidden="true"
          className="
            absolute
            bottom-0
            left-0
            z-20
            h-[3px]
            w-full
            bg-[#B12025]
          "
        />
      </div>
    </motion.div>
  );
}

/* =========================================================
   WORK WITH US — ARC HERO
========================================================= */

export default function WorkWithUsArcHero() {
  const wrapRef =
    useRef<HTMLElement>(null);

  const reduce =
    useReducedMotion();

  const [isMobile, setIsMobile] =
    useState(false);

  const [spread, setSpread] =
    useState(false);

  /* =======================================================
     RESPONSIVE STATE
  ======================================================= */

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(
        window.innerWidth < 768
      );
    };

    handleResize();

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, []);

  /* =======================================================
     SCROLL PROGRESS
  ======================================================= */

  const {
    scrollYProgress,
  } = useScroll({
    target: wrapRef,

    offset: [
      "start start",
      "end end",
    ],
  });

  const smoothProgress =
    useSpring(
      scrollYProgress,
      PROGRESS_SPRING
    );

  const progress =
    useTransform(
      smoothProgress,
      [0.1, 0.9],
      [0, 1]
    );

  useMotionValueEvent(
    progress,
    "change",
    (value) => {
      setSpread(
        value > 0.95
      );
    }
  );

  /* =======================================================
     POINTER PARALLAX
  ======================================================= */

  const pointer =
    usePointerParallax(
      spread,
      !reduce
    );

  /* =======================================================
     TEXT ANIMATION
  ======================================================= */

  const textScale =
    useTransform(
      progress,
      [0, 1],
      [0.88, 1]
    );

  const textOpacity =
    useTransform(
      progress,
      [0.12, 0.68],
      [0, 1]
    );

  const textYOffset =
    useTransform(
      progress,
      [0, 1],
      [
        "-4vh",
        "0vh",
      ]
    );

  /* =======================================================
     INTRO INDICATOR
  ======================================================= */

  const introOpacity =
    useTransform(
      progress,
      [0, 0.2],
      [1, 0]
    );

  /* =======================================================
     HERO
  ======================================================= */

  return (
    <section
      ref={wrapRef}
      id="wu-top"
      className="
        relative
        h-[280vh]
        w-full
        bg-[#fff9f9]
        text-[#17191C]
      "
    >
      {/* =================================================
          STICKY VIEWPORT
      ================================================= */}

      <div
        className="
          sticky
          top-0
          flex
          h-[100svh]
          w-full
          items-center
          justify-center
          overflow-hidden
        "
      >
        {/* ===============================================
            BACKGROUND
        =============================================== */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            bg-[#fff9f9]
          "
        />

        {/* SUBTLE RED GLOW */}

        <motion.div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-1/2
            top-[42%]
            h-[520px]
            w-[720px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[#B12025]/[.055]
            blur-[150px]
          "
          style={{
            scale: textScale,
          }}
        />

        {/* ===============================================
            TOP LABEL
        =============================================== */}

        <div
          className="
            pointer-events-none
            absolute
            left-0
            right-0
            top-[35px]
            z-30
            mx-auto
            flex
            max-w-[1440px]
            items-center
            justify-between
            px-5
            sm:top-[45px]
            sm:px-8
            lg:px-14
          "
        >
          <p
            className="
              text-[9px]
              font-semibold
              uppercase
              tracking-[.22em]
              text-[#B12025]
              sm:text-[11px]
            "
          >
            Work with FirstNotch
          </p>

          <p
            className="
              hidden
              text-[10px]
              font-medium
              uppercase
              tracking-[.18em]
              text-[#17191C]/40
              sm:block
            "
          >
            Colombo · Sri Lanka
          </p>
        </div>

        {/* ===============================================
            MAIN HERO CONTENT
        =============================================== */}

        <motion.div
          className="
            relative
            z-[20]
            mt-[-17vh]
            flex
            w-full
            max-w-[1250px]
            flex-col
            items-center
            px-5
            text-center
            sm:px-8
            lg:px-14
          "
          style={{
            opacity:
              textOpacity,

            scale:
              textScale,

            y:
              textYOffset,
          }}
        >
          {/* MAIN HEADING */}

          <h1
            className="
              max-w-[1120px]
              text-[clamp(2.35rem,10vw,3.3rem)]
              font-semibold
              leading-[.98]
              tracking-[-.06em]
              text-[#17191C]

              sm:text-[clamp(3.5rem,6vw,7rem)]
              sm:leading-[.96]
              sm:tracking-[-.075em]
            "
          >
            Jobs in Colombo that pay a
            salary plus{" "}

            <span className="text-[#B12025]">
              monthly incentives
            </span>
          </h1>

          {/* DESCRIPTION */}

          <p
            className="
              mx-auto
              mt-5
              max-w-[690px]
              text-[11px]
              leading-[1.55]
              text-[#17191C]/65

              sm:mt-7
              sm:text-[15px]
              sm:leading-[1.65]
            "
          >
            FirstNotch is a BPO
            company with a team of
            70+ at its Colombo office.
            Staff answer customer
            calls, process data and
            build websites for client
            businesses in Sri Lanka
            and abroad.
          </p>

          {/* SECOND DESCRIPTION */}

          <p
            className="
              mx-auto
              mt-2.5
              max-w-[650px]
              text-[10px]
              leading-[1.5]
              text-[#17191C]/50

              sm:mt-3
              sm:text-[13px]
              sm:leading-[1.6]
            "
          >
            A willingness to learn
            matters more here than a
            long CV. New starters get
            training, and those who do
            well can move into senior
            roles.
          </p>

          {/* CTA BUTTONS */}

          <div
            className="
              pointer-events-auto
              mt-6
              flex
              flex-wrap
              items-center
              justify-center
              gap-2.5
              sm:mt-7
              sm:gap-3
            "
          >
            <a
              href="#roles"
              className="
                group
                inline-flex
                min-h-[48px]
                items-center
                gap-2.5
                rounded-full
                bg-[#B12025]
                px-5
                text-[11px]
                font-semibold
                text-white
                shadow-[0_14px_35px_rgba(177,32,37,.18)]
                transition
                duration-300

                hover:-translate-y-1
                hover:bg-[#961b21]

                sm:min-h-[52px]
                sm:px-6
                sm:text-[12px]
              "
            >
              See open roles

              <ArrowUpRight
                size={17}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-0.5
                  group-hover:-translate-y-0.5
                "
              />
            </a>

            <a
              href="#apply"
              className="
                group
                inline-flex
                min-h-[48px]
                items-center
                gap-2.5
                rounded-full
                border
                border-[#17191C]/15
                bg-white/70
                px-5
                text-[11px]
                font-semibold
                text-[#17191C]
                backdrop-blur-md
                transition
                duration-300

                hover:-translate-y-1
                hover:border-[#B12025]/35
                hover:bg-white

                sm:min-h-[52px]
                sm:px-6
                sm:text-[12px]
              "
            >
              How to apply

              <ArrowDownRight
                size={17}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-0.5
                  group-hover:translate-y-0.5
                "
              />
            </a>
          </div>
        </motion.div>

        {/* ===============================================
            ARC CARDS
        =============================================== */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-10
          "
        >
          {CARDS.map(
            (card, index) => (
              <Card
                key={index}
                card={card}
                progress={progress}
                pointer={pointer}
                index={index}
                total={
                  CARDS.length
                }
                isSpreadActive={
                  spread
                }
                isMobile={
                  isMobile
                }
              />
            )
          )}
        </div>

        {/* ===============================================
            SCROLL INDICATOR
        =============================================== */}

        <motion.div
          className="
            pointer-events-none
            absolute
            bottom-[25px]
            left-1/2
            z-30
            -translate-x-1/2
            text-center
            sm:bottom-[32px]
          "
          style={{
            opacity:
              introOpacity,
          }}
        >
          <div
            className="
              flex
              items-center
              justify-center
              gap-2
              text-[9px]
              font-semibold
              uppercase
              tracking-[.2em]
              text-[#17191C]/45
              sm:text-[10px]
            "
          >
            <ArrowDown
              size={14}
              className="
                animate-bounce
                text-[#B12025]
              "
            />

            Scroll to explore
          </div>
        </motion.div>

        {/* ===============================================
            BOTTOM PROGRESS
        =============================================== */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            bottom-0
            left-0
            z-40
            h-[3px]
            w-full
            bg-[#B12025]/10
          "
        >
          <motion.div
            className="
              h-full
              origin-left
              bg-[#B12025]
            "
            style={{
              scaleX:
                progress,
            }}
          />
        </div>
      </div>
    </section>
  );
}