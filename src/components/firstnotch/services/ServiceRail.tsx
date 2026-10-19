
'use client';

import {
  useRef,
  useState,
  type PointerEvent,
} from 'react';

import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  Database,
  Headset,
} from 'lucide-react';

import type {
  Category,
  Service,
} from './serviceData';

// ==========================================
// INDIVIDUAL SERVICE CARD
// NORMAL HOVER — NO SPOTLIGHT / ROTATING BORDER
// ==========================================

function ServiceCard({
  service,
  category,
  index,
  animateFlip,
}: {
  service: Service;
  category: Category;
  index: number;
  animateFlip: boolean;
}) {
  const [revealed, setRevealed] = useState(false);

  const Icon =
    category.id === 'customer-support'
      ? Headset
      : category.id === 'back-office'
        ? Database
        : Code2;

  return (
    <button
      type="button"
      onClick={() => setRevealed((previous) => !previous)}
      aria-pressed={revealed}
      aria-label={`${service.title}: ${
        revealed ? 'show challenge' : 'show solution'
      }`}
      className="
        group
        relative
        block
        h-[354px]
        w-full
        cursor-pointer
        rounded-[24px]
        border
        border-[#17191C]/10
        bg-white
        text-left
        shadow-[0_8px_30px_rgba(23,25,28,0.035)]
        outline-none
        transition-[border-color,box-shadow]
        duration-200

        hover:border-[#B12025]/50
        hover:shadow-[0_12px_35px_rgba(23,25,28,0.07)]

        focus-visible:border-[#B12025]
        focus-visible:ring-2
        focus-visible:ring-[#B12025]/40

        [perspective:1200px]
      "
    >
      {/* FLIP WRAPPER */}
      <span
        className={`
          absolute
          inset-0
          block
          rounded-[23px]

          ${
            animateFlip
              ? 'transition-transform duration-700 [transform-style:preserve-3d]'
              : ''
          }

          ${
            animateFlip && revealed
              ? '[transform:rotateY(180deg)]'
              : ''
          }

          motion-reduce:transition-none
        `}
      >
        {/* ==================================
            FRONT SIDE — WHITE
        ================================== */}
        <span
          className={`
            absolute
            inset-0
            flex
            flex-col
            justify-between
            overflow-hidden
            rounded-[23px]
            bg-white
            p-7
            text-[#17191C]

            ${
              animateFlip
                ? '[backface-visibility:hidden]'
                : ''
            }

            ${
              !animateFlip && revealed
                ? 'hidden'
                : ''
            }
          `}
        >
          {/* Top Header */}
          <span className="flex items-center justify-between gap-3">
            <span className="text-[11px] font-semibold tracking-[0.14em] text-[#17191C]/40">
              {String(index + 1).padStart(2, '0')}
              {' / '}
              {category.short.toUpperCase()}
            </span>

            {/* Simple Red Dot */}
            <span className="h-[8px] w-[8px] shrink-0 rounded-full bg-[#B12025]" />
          </span>

          {/* Main Card Content */}
          <span className="block">
            <Icon
              aria-hidden="true"
              size={36}
              strokeWidth={1.4}
              className="mb-5 text-[#B12025]"
            />

            <strong className="block text-[23px] font-semibold leading-tight tracking-[-0.04em]">
              {service.title}
            </strong>

            <span className="mt-4 block text-[13px] leading-[1.8] text-[#17191C]/60">
              {service.problem}
            </span>
          </span>

          {/* Bottom Action */}
          <span className="flex items-center justify-between border-t border-[#17191C]/10 pt-4 text-[12px] font-semibold text-[#B12025]">
            See our solution

            <ArrowUpRight size={18} />
          </span>
        </span>

        {/* ==================================
            BACK SIDE — FIRSTNOTCH RED
        ================================== */}
        <span
          className={`
            absolute
            inset-0
            flex
            flex-col
            justify-between
            overflow-hidden
            rounded-[23px]
            bg-[#B12025]
            p-7
            text-white

            ${
              animateFlip
                ? '[backface-visibility:hidden] [transform:rotateY(180deg)]'
                : ''
            }

            ${
              !animateFlip && !revealed
                ? 'hidden'
                : ''
            }
          `}
        >
          {/* Solution Header */}
          <span className="flex items-center justify-between text-[11px] font-semibold tracking-[0.14em] text-white/80">
            THE SOLUTION
            <Check size={22} />
          </span>

          {/* Solution Content */}
          <span className="block">
            <strong className="block text-[23px] font-semibold leading-tight tracking-tight">
              {service.title}
            </strong>

            <span className="mt-5 block text-[14px] leading-[1.8] text-white/90">
              {service.solution}
            </span>
          </span>

          {/* Return Action */}
          <span className="flex items-center justify-between border-t border-white/25 pt-4 text-[12px] font-medium">
            Back to challenge
            <ArrowRight size={18} />
          </span>
        </span>
      </span>
    </button>
  );
}

// ==========================================
// HORIZONTAL SERVICE CARD RAIL
// ==========================================

export default function ServiceRail({
  category,
  animateFlip,
}: {
  category: Category;
  animateFlip: boolean;
}) {
  const railRef = useRef<HTMLDivElement>(null);

  const startRef = useRef<{
    x: number;
    scrollLeft: number;
  } | null>(null);

  const wasDragged = useRef(false);

  const [progress, setProgress] = useState(0);

  // ========================================
  // PREVIOUS / NEXT BUTTONS
  // ========================================

  const moveRail = (direction: -1 | 1) => {
    railRef.current?.scrollBy({
      left: direction * 390,
      behavior: 'smooth',
    });
  };

  // ========================================
  // MOUSE DRAG SUPPORT
  // ========================================

  const onPointerDown = (
    event: PointerEvent<HTMLDivElement>
  ) => {
    if (
      event.pointerType !== 'mouse' ||
      event.button !== 0 ||
      !railRef.current
    ) {
      return;
    }

    startRef.current = {
      x: event.clientX,
      scrollLeft: railRef.current.scrollLeft,
    };

    wasDragged.current = false;
  };

  const onPointerMove = (
    event: PointerEvent<HTMLDivElement>
  ) => {
    if (
      !startRef.current ||
      !railRef.current ||
      event.buttons !== 1
    ) {
      return;
    }

    const distance =
      event.clientX - startRef.current.x;

    if (Math.abs(distance) > 7) {
      wasDragged.current = true;
    }

    if (wasDragged.current) {
      railRef.current.scrollLeft =
        startRef.current.scrollLeft - distance;
    }
  };

  // ========================================
  // JSX
  // ========================================

  return (
    <div className="w-full min-w-0">

      {/* ONLY SCROLL ARROWS — NO INSTRUCTION TEXT */}
      <div className="mb-5 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => moveRail(-1)}
          aria-label={`Scroll ${category.short} left`}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[#17191C]/15 bg-white text-[#17191C] transition-colors duration-200 hover:border-[#B12025] hover:text-[#B12025]"
        >
          <ArrowLeft size={18} />
        </button>

        <button
          type="button"
          onClick={() => moveRail(1)}
          aria-label={`Scroll ${category.short} right`}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[#17191C]/15 bg-white text-[#17191C] transition-colors duration-200 hover:border-[#B12025] hover:text-[#B12025]"
        >
          <ArrowRight size={18} />
        </button>
      </div>

      {/* SIDE-SCROLLING CARDS */}
      <div
        ref={railRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={() => {
          startRef.current = null;
        }}
        onPointerLeave={() => {
          startRef.current = null;
        }}
        onClickCapture={(event) => {
          if (wasDragged.current) {
            event.preventDefault();
            event.stopPropagation();
            wasDragged.current = false;
          }
        }}
        onScroll={(event) => {
          const node = event.currentTarget;

          const maximum =
            node.scrollWidth - node.clientWidth;

          setProgress(
            maximum > 0
              ? node.scrollLeft / maximum
              : 0
          );
        }}
        className="
          flex
          snap-x
          snap-mandatory
          gap-5
          overflow-x-auto
          px-1
          pb-7
          pt-2
          overscroll-x-contain
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
        "
      >
        {category.services.map((service, index) => (
          <div
            key={service.title}
            className={`
              shrink-0
              snap-start

              ${
                index % 3 === 0
                  ? 'w-[min(88vw,440px)]'
                  : 'w-[min(86vw,375px)]'
              }
            `}
          >
            <ServiceCard
              service={service}
              category={category}
              index={index}
              animateFlip={animateFlip}
            />
          </div>
        ))}
      </div>

      {/* SCROLL PROGRESS LINE */}
      <div className="mt-1 h-[2px] overflow-hidden rounded-full bg-[#17191C]/10">
        <div
          className="h-full rounded-full bg-[#B12025] transition-[width] duration-150"
          style={{
            width: `${Math.max(
              12,
              Math.min(100, progress * 100)
            )}%`,
          }}
        />
      </div>
    </div>
  );
}
