"use client";

import {
  useEffect,
  useRef,
  useState,
  type TouchEvent,
  type WheelEvent,
} from "react";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";

interface ServicesScrollHeroProps {
  onDiscoveryClick: () => void;
}

export default function ServicesScrollHero({
  onDiscoveryClick,
}: ServicesScrollHeroProps) {
  const [progress, setProgress] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (expanded && event.deltaY < 0 && window.scrollY <= 5) {
        event.preventDefault();

        const next = Math.max(progress - Math.abs(event.deltaY) * 0.0012, 0);

        setProgress(next);

        if (next < 0.98) {
          setExpanded(false);
        }

        return;
      }

      if (!expanded) {
        event.preventDefault();

        const next = Math.min(
          Math.max(progress + event.deltaY * 0.00105, 0),
          1
        );

        setProgress(next);

        if (next >= 1) {
          setExpanded(true);
        }
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      setTouchStartY(event.touches[0].clientY);
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (!touchStartY) return;

      const currentY = event.touches[0].clientY;
      const deltaY = touchStartY - currentY;

      if (!expanded) {
        event.preventDefault();

        const next = Math.min(
          Math.max(progress + deltaY * 0.004, 0),
          1
        );

        setProgress(next);

        if (next >= 1) {
          setExpanded(true);
        }

        setTouchStartY(currentY);
      }
    };

    const handleTouchEnd = () => {
      setTouchStartY(0);
    };

    window.addEventListener(
      "wheel",
      handleWheel as unknown as EventListener,
      { passive: false }
    );

    window.addEventListener(
      "touchstart",
      handleTouchStart as unknown as EventListener,
      { passive: false }
    );

    window.addEventListener(
      "touchmove",
      handleTouchMove as unknown as EventListener,
      { passive: false }
    );

    window.addEventListener(
      "touchend",
      handleTouchEnd as unknown as EventListener
    );

    return () => {
      window.removeEventListener(
        "wheel",
        handleWheel as unknown as EventListener
      );

      window.removeEventListener(
        "touchstart",
        handleTouchStart as unknown as EventListener
      );

      window.removeEventListener(
        "touchmove",
        handleTouchMove as unknown as EventListener
      );

      window.removeEventListener(
        "touchend",
        handleTouchEnd as unknown as EventListener
      );
    };
  }, [progress, expanded, touchStartY]);

  const width = isMobile
    ? 270 + progress * 110
    : 360 + progress * 1160;

  const height = isMobile
    ? 360 + progress * 180
    : 440 + progress * 360;

  const textMove = progress * (isMobile ? 55 : 72);

  const imageScale = 1 + progress * 0.06;

  return (
    <section
      ref={heroRef}
      id="services-hero"
      className="relative min-h-[100dvh] overflow-hidden bg-[#17191C]"
    >
      {/* BACKGROUND */}

<motion.div
  className="absolute inset-0"
  animate={{
    scale: imageScale,
  }}
  transition={{ duration: 0.08 }}
>
  <video
    src="/videos/services/services-hero.mp4"
    autoPlay
    muted
    loop
    playsInline
    preload="auto"
    disablePictureInPicture
    className="h-full w-full object-cover"
  />
</motion.div>

      {/* TOP BRAND LINE */}

<motion.div
  className="absolute left-0 right-0 top-[110px] z-20 mx-auto max-w-[1440px] px-5 md:px-10"
  animate={{
    opacity: 1 - progress * 1.7,
    y: -progress * 20,
  }}
>
  <p className="text-center text-[10px] font-bold uppercase tracking-[.24em] text-[#B12025] sm:text-[12px]">
    Outsourcing services in Sri Lanka.
  </p>
</motion.div>

      {/* CENTER EXPERIENCE */}

      <div className="relative z-10 flex min-h-[100dvh] items-center justify-center px-4">
        {/* EXPANDING MEDIA */}

        <motion.div
          className="
            absolute
            left-1/2
            top-1/2
            overflow-hidden
            rounded-[26px]
            border
            border-white/15
            shadow-[0_40px_100px_rgba(0,0,0,.45)]
            sm:rounded-[34px]
          "
          style={{
            width,
            height,
            maxWidth: "96vw",
            maxHeight: "86vh",
            x: "-50%",
            y: "-50%",
          }}
        >
          <motion.div
            className="absolute inset-0"
            animate={{
              scale: imageScale,
            }}
            transition={{ duration: 0.08 }}
          >
            <Image
              src="/images/services/services-hero.jpg"
              alt="FirstNotch outsourcing services"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>

          <motion.div
            className="absolute inset-0 bg-[#17191C]"
            animate={{
              opacity: 0.54 - progress * 0.22,
            }}
          />

          <div
            aria-hidden="true"
            className="
              absolute inset-0
              bg-[linear-gradient(180deg,rgba(23,25,28,.15)_0%,rgba(23,25,28,.05)_45%,rgba(23,25,28,.65)_100%)]
            "
          />

          {/* IMAGE LABEL */}

          <motion.div
            className="absolute bottom-5 left-5 right-5 flex items-end justify-between sm:bottom-8 sm:left-8 sm:right-8"
            animate={{
              opacity: progress > 0.48 ? 1 : 0,
              y: progress > 0.48 ? 0 : 18,
            }}
          >
           

            <span className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white sm:flex">
              <ArrowUpRight size={17} />
            </span>
          </motion.div>
        </motion.div>

        {/* SPLIT HERO TITLE */}

        <div className="pointer-events-none relative z-20 flex w-full max-w-[1500px] flex-col items-center justify-center">
          <motion.div
            className="w-full text-center"
            style={{
              transform: `translateX(-${textMove}vw)`,
            }}
          >
            <h1
              className="
                whitespace-nowrap
                text-[clamp(2.4rem,10vw,4rem)]
                font-semibold
                leading-[.92]
                tracking-[-.07em]
                text-white
                sm:text-[clamp(4.5rem,8vw,8.5rem)]
              "
            >
              Hand over your
            </h1>
          </motion.div>

<motion.div
  className="mt-2 flex w-full justify-center px-4 text-center sm:mt-3"
  style={{
    transform: `translateX(${textMove}vw)`,
  }}
>
  <h2
    className="
      mx-auto
      max-w-[1050px]
      text-center
      text-[clamp(1.7rem,7vw,3.2rem)]
      font-semibold
      leading-[0.98]
      tracking-[-.055em]
      text-[#B12025]
      sm:text-[clamp(3rem,5.3vw,5.8rem)]
      sm:leading-[0.96]
    "
  >
    customer support, back office and IT work.
  </h2>
</motion.div>
        </div>

        {/* INITIAL DESCRIPTION */}

        <motion.div
          className="
            absolute
            bottom-[65px]
            left-1/2
            z-30
            w-[calc(100%-40px)]
            max-w-[520px]
            -translate-x-1/2
            text-center
          "
          animate={{
            opacity: Math.max(0, 1 - progress * 2.3),
            y: progress * 20,
          }}
        >
<p
  className="
    mx-auto
    max-w-[720px]
    text-center
    text-[11px]
    leading-[1.35]
    text-white/75
    sm:text-[14px]
    sm:leading-[1.45]
  "
>
  FirstNotch offers 16 BPO services in Sri Lanka.
  Choose one or several. A trained team of 70+ in Colombo
  works in your tools and follows your processes. Every
  piece of work gets a quality score, whether it is a
  support call or a website update.
</p>
          <div className="mt-4 flex items-center justify-center gap-2 text-[9px] font-semibold uppercase tracking-[.18em] text-white/55 sm:text-[10px]">
            <ArrowDown size={14} className="animate-bounce text-[#B12025]" />

            Scroll to explore
          </div>
        </motion.div>

        {/* EXPANDED CONTENT */}

        <motion.div
          className="
            absolute
            bottom-[38px]
            left-1/2
            z-40
            flex
            w-[calc(100%-48px)]
            max-w-[1350px]
            -translate-x-1/2
            items-end
            justify-between
            gap-8
          "
          animate={{
            opacity: progress > 0.82 ? (progress - 0.82) / 0.18 : 0,
            y: progress > 0.82 ? 0 : 20,
          }}
        >
          <div className="hidden max-w-[510px] md:block">
            <p className="text-[11px] font-semibold uppercase tracking-[.22em] text-white/55">
              Outsourcing services in Sri Lanka
            </p>

           <p className="mt-3 text-[14px] leading-7 text-white/80">
  FirstNotch offers 16 BPO services in Sri Lanka.
  Choose one or several. A trained team of 70+ in Colombo
  works in your tools and follows your processes. Every
  piece of work gets a quality score, whether it is a
  support call or a website update.
</p>
          </div>

          
        </motion.div>
      </div>
    </section>
  );
}