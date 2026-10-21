
'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import type {
  PointerEvent as ReactPointerEvent,
} from 'react';

import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  Files,
  Headset,
} from 'lucide-react';

import type {
  Category,
  Service,
} from './serviceData';

// =====================================================
// TYPES
// =====================================================

type RailProps = {
  category: Category;
  animateFlip?: boolean;
};

type CardProps = {
  service: Service;
  index: number;
  categoryId: string;
  dragging: boolean;
  suppressClickUntil: React.RefObject<number>;
  animateFlip: boolean;
};

// =====================================================
// PREMIUM SERVICE CARD
//
// NORMAL:
// White background, red icon, problem text.
//
// HOVER:
// Red background rises from the bottom.
// Problem text fades upward.
// Solution text rises into view.
//
// MOUSE LEAVE:
// Everything reverses smoothly.
//
// MOBILE:
// Tap to open or close the solution.
// =====================================================

function ServiceCard({
  service,
  index,
  categoryId,
  dragging,
  suppressClickUntil,
  animateFlip,
}: CardProps) {
  const [showSolution, setShowSolution] = useState(false);

  // Icon based on service category
  const Icon =
    categoryId === 'customer-support'
      ? Headset
      : categoryId === 'back-office'
        ? Files
        : Code2;

  // ===================================================
  // MANUAL ANIMATION SETTINGS
  //
  // Increase 720ms for slower background movement.
  // Decrease 720ms for faster background movement.
  //
  // 1.18 etc. are not required because the card
  // remains the same size while its background rises.
  // ===================================================

  const riseSpeed = animateFlip
    ? 'duration-[720ms]'
    : 'duration-[520ms]';

  const easing =
    'ease-[cubic-bezier(0.22,1,0.36,1)]';

  return (
    <button
      type="button"
      aria-expanded={showSolution}
      aria-label={`${service.title}. ${
        showSolution
          ? 'Showing solution'
          : 'Showing challenge'
      }. Hover, focus or tap to reveal the solution.`}

      // Desktop hover
      onPointerEnter={(event) => {
        if (
          event.pointerType !== 'touch' &&
          !dragging
        ) {
          setShowSolution(true);
        }
      }}

      // Reverse when mouse leaves
      onPointerLeave={(event) => {
        if (event.pointerType !== 'touch') {
          setShowSolution(false);
        }
      }}

      // Keyboard accessibility
      onFocus={() => setShowSolution(true)}
      onBlur={() => setShowSolution(false)}

      // Mobile/tablet tap
      onClick={(event) => {
        if (Date.now() < suppressClickUntil.current) {
          event.preventDefault();
          return;
        }

        if (
          !window.matchMedia(
            '(hover: hover) and (pointer: fine)'
          ).matches
        ) {
          setShowSolution((current) => !current);
        } else {
          setShowSolution(true);
        }
      }}

      className={`
        group
        relative
        block
        h-[306px]
        w-full
        overflow-hidden
        rounded-[23px]
        border
        text-left
        outline-none

        transition-[border-color,box-shadow]
        duration-500

        focus-visible:ring-2
        focus-visible:ring-[#B12025]
        focus-visible:ring-offset-2


${
  showSolution
    ? 'border-transparent shadow-[0_20px_45px_rgba(177,32,37,0.15)]'
    : 'border-[#17191C]/10 bg-white shadow-[0_8px_28px_rgba(23,25,28,0.035)]'
}

      `}
    >

      {/* =================================================
          RED BACKGROUND — RISE FROM BOTTOM

          translate-y-full = fully below card
          translate-y-0    = covers the whole card

          Change duration to adjust speed.
      ================================================= */}

      <span
        aria-hidden="true"
        className={`
          pointer-events-none
          absolute
          inset-0
          z-0
          rounded-[22px]
          bg-[#B12025]

          transition-transform
          ${riseSpeed}
          ${easing}

          motion-reduce:transition-none

          ${
            showSolution
              ? 'translate-y-0'
              : 'translate-y-full'
          }
        `}
      />

      {/* =================================================
          WHITE FRONT — PROBLEM
      ================================================= */}

      <span
        aria-hidden={showSolution}
        className={`
          absolute
          inset-0
          z-10
          flex
          flex-col

          px-6
          pb-6
          pt-6

          transition-[transform,opacity]
          duration-[430ms]
          ease-out

          motion-reduce:transition-none

          ${
            showSolution
              ? 'pointer-events-none -translate-y-5 opacity-0'
              : 'translate-y-0 opacity-100'
          }
        `}
      >

        {/* Card number and red dot */}
        <span className="flex items-center justify-between gap-2">

          <span className="text-[10px] font-semibold uppercase tracking-[.16em] text-[#17191C]/40">
            {String(index + 1).padStart(2, '0')}
            {' / '}
            {categoryId.replace(/-/g, ' ')}
          </span>

          <span
            className="h-2 w-2 shrink-0 rounded-full bg-[#B12025]"
          />
        </span>

        {/* Category icon */}
        <span className="mt-9 inline-flex text-[#B12025]">
          <Icon
            size={28}
            strokeWidth={1.7}
            aria-hidden="true"
          />
        </span>

        {/* Service name */}
        <span className="mt-4 text-[19px] font-semibold leading-tight tracking-[-.035em] text-[#17191C]">
          {service.title}
        </span>

        {/* Problem description */}
        <span className="mt-4 line-clamp-3 text-[12px] leading-[1.85] text-[#17191C]/55">
          {service.problem}
        </span>

        {/* Bottom action */}
        <span className="mt-auto flex items-center justify-between border-t border-[#17191C]/10 pt-4 text-[11px] font-semibold text-[#B12025]">

          See our solution

          <ArrowUpRight
            size={16}
            aria-hidden="true"
          />
        </span>
      </span>

      {/* =================================================
          RED BACK CONTENT — SOLUTION

          The title and description rise smoothly.

          Title delay: 130ms
          Description delay: 210ms
      ================================================= */}

      <span
        aria-hidden={!showSolution}
        className={`
          pointer-events-none
          absolute
          inset-0
          z-20
          flex
          flex-col

          px-6
          pb-6
          pt-6

          text-white

          transition-[transform,opacity]
          duration-[560ms]
          ${easing}

          motion-reduce:transition-none

          ${
            showSolution
              ? 'translate-y-0 opacity-100 delay-[90ms]'
              : 'translate-y-[48px] opacity-0 delay-0'
          }
        `}
      >

        {/* Solution header */}
        <span className="flex items-center justify-between gap-2">

          <span className="text-[10px] font-semibold uppercase tracking-[.16em] text-white/75">
            The solution
          </span>

          <Check
            size={19}
            aria-hidden="true"
          />
        </span>

        {/* Rising service heading */}
        <span
          className={`
            mt-14

            text-[19px]
            font-semibold
            leading-tight
            tracking-[-.035em]

            transition-[transform,opacity]
            duration-[580ms]
            ${easing}

            motion-reduce:transition-none

            ${
              showSolution
                ? 'translate-y-0 opacity-100 delay-[130ms]'
                : 'translate-y-6 opacity-0'
            }
          `}
        >
          {service.title}
        </span>

        {/* Rising solution description */}
        <span
          className={`
            mt-4
            line-clamp-5

            text-[12px]
            leading-[1.9]
            text-white/90

            transition-[transform,opacity]
            duration-[620ms]
            ${easing}

            motion-reduce:transition-none

            ${
              showSolution
                ? 'translate-y-0 opacity-100 delay-[210ms]'
                : 'translate-y-7 opacity-0'
            }
          `}
        >
          {service.solution}
        </span>

        {/* Back to challenge */}
        <span className="mt-auto flex items-center justify-between border-t border-white/30 pt-4 text-[11px] font-semibold">

          Back to challenge

          <ArrowRight
            size={16}
            aria-hidden="true"
          />
        </span>
      </span>
    </button>
  );
}

// =====================================================
// HORIZONTAL SERVICE RAIL
//
// Includes:
// - Responsive cards
// - Mouse drag
// - Mobile swipe
// - Next/previous arrows
// - Scroll progress indicator
// - Hover-to-reveal solution
// =====================================================

export default function ServiceRail({
  category,
  animateFlip = true,
}: RailProps) {

  const railRef = useRef<HTMLDivElement>(null);

  const dragRef = useRef<{
    startX: number;
    startScroll: number;
    moved: boolean;
  } | null>(null);

  const suppressClickUntil = useRef(0);

  const [dragging, setDragging] = useState(false);
  const [progress, setProgress] = useState(0);

  // ===================================================
  // SCROLL PROGRESS
  // ===================================================

  const updateProgress = useCallback(() => {
    const rail = railRef.current;

    if (!rail) return;

    const maxScroll =
      rail.scrollWidth - rail.clientWidth;

    setProgress(
      maxScroll > 0
        ? rail.scrollLeft / maxScroll
        : 0
    );
  }, []);

  useEffect(() => {
    const rail = railRef.current;

    if (!rail) return;

    updateProgress();

    rail.addEventListener(
      'scroll',
      updateProgress,
      { passive: true }
    );

    const resizeObserver =
      new ResizeObserver(updateProgress);

    resizeObserver.observe(rail);

    return () => {
      rail.removeEventListener(
        'scroll',
        updateProgress
      );

      resizeObserver.disconnect();
    };
  }, [updateProgress, category.id]);

  // ===================================================
  // NEXT / PREVIOUS BUTTONS
  // ===================================================

  const scrollByCard = (direction: -1 | 1) => {
    const rail = railRef.current;

    if (!rail) return;

    const firstCard =
      rail.querySelector<HTMLElement>(
        '[data-rail-card]'
      );

    const amount =
      (firstCard?.getBoundingClientRect().width ?? 340)
      + 18;

    rail.scrollBy({
      left: direction * amount,
      behavior: 'smooth',
    });
  };

  // ===================================================
  // DESKTOP MOUSE DRAG
  // ===================================================

  const onPointerDown = (
    event: ReactPointerEvent<HTMLDivElement>
  ) => {
    const rail = railRef.current;

    if (
      !rail ||
      event.pointerType !== 'mouse' ||
      event.button !== 0
    ) {
      return;
    }

    dragRef.current = {
      startX: event.clientX,
      startScroll: rail.scrollLeft,
      moved: false,
    };
  };

  const onPointerMove = (
    event: ReactPointerEvent<HTMLDivElement>
  ) => {
    const rail = railRef.current;
    const drag = dragRef.current;

    if (!rail || !drag) return;

    const distance =
      event.clientX - drag.startX;

    if (Math.abs(distance) > 7) {
      drag.moved = true;

      if (!dragging) {
        setDragging(true);
      }

      rail.scrollLeft =
        drag.startScroll - distance;
    }
  };

  const finishDragging = () => {
    if (dragRef.current?.moved) {
      suppressClickUntil.current =
        Date.now() + 180;
    }

    dragRef.current = null;
    setDragging(false);
  };

  // ===================================================
  // RENDER RAIL
  // ===================================================

  return (
    <div className="min-w-0">

      {/* Navigation buttons */}
      <div className="mb-6 flex items-center justify-end gap-2">

        <button
          type="button"
          aria-label={`Previous ${category.short} services`}
          onClick={() => scrollByCard(-1)}
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            border
            border-[#17191C]/15
            bg-white
            text-[#17191C]

            transition
            duration-300

            hover:border-[#B12025]
            hover:bg-[#B12025]
            hover:text-white

            focus-visible:outline-[#B12025]
          "
        >
          <ArrowLeft size={19} />
        </button>

        <button
          type="button"
          aria-label={`Next ${category.short} services`}
          onClick={() => scrollByCard(1)}
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            border
            border-[#17191C]/15
            bg-white
            text-[#17191C]

            transition
            duration-300

            hover:border-[#B12025]
            hover:bg-[#B12025]
            hover:text-white

            focus-visible:outline-[#B12025]
          "
        >
          <ArrowRight size={19} />
        </button>
      </div>

      {/* Horizontal scroll container */}
      <div
        ref={railRef}
        aria-label={`${category.label} services`}

        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={finishDragging}
        onPointerCancel={finishDragging}
        onPointerLeave={finishDragging}

        className={`
          flex
          gap-[18px]
          overflow-x-auto
          overscroll-x-contain
          pb-5
          pr-3

          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden

          ${
            dragging
              ? 'cursor-grabbing select-none snap-none'
              : 'cursor-grab snap-x snap-mandatory'
          }
        `}
      >
        {category.services.map(
          (service, index) => (
            <div
              data-rail-card
              key={service.title}


className="
  w-[min(84vw,322px)]
  shrink-0
  snap-start
"

            >
              <ServiceCard
                service={service}
                index={index}
                categoryId={category.id}
                dragging={dragging}
                suppressClickUntil={suppressClickUntil}
                animateFlip={animateFlip}
              />
            </div>
          )
        )}
      </div>

      {/* Red scroll-progress indicator */}
      <div
        aria-hidden="true"
        className="mt-1 h-[2px] w-full overflow-hidden bg-[#17191C]/10"
      >
        <div
          className="
            h-full
            w-full
            origin-left
            bg-[#B12025]
            transition-transform
            duration-200
          "
          style={{
            transform: `scaleX(${
              Math.min(
                1,
                Math.max(0, progress)
              )
            })`,
          }}
        />
      </div>
    </div>
  );
}
