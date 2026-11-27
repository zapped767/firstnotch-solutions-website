'use client';

/* InboundShuffleGrid — the 21st.dev "Shuffle hero" image grid.
   A 4 x 4 grid of photos that re-orders itself every few seconds, each tile
   gliding to its new place. Rebuilt with GSAP Flip (already in your gsap
   package) so you do not need framer-motion.

   >>> PUT YOUR PHOTOS IN:  public/images/inbound-call-support/
   >>> then edit the list below so the file names match yours.
   Use 16 photos for a full grid. If you have fewer, they repeat to fill it.
   Square-ish photos (about 600 x 600) work best.                          */

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(Flip);


export const HERO_IMAGES: string[] = [
  'https://res.cloudinary.com/firstnotchsolutions/image/upload/f_auto,q_auto:good,w_600,c_limit/v1795774336/01.Inbound.jpg',
  'https://res.cloudinary.com/firstnotchsolutions/image/upload/f_auto,q_auto:good,w_600,c_limit/v1795774338/02.Inbound.jpg',
  'https://res.cloudinary.com/firstnotchsolutions/image/upload/f_auto,q_auto:good,w_600,c_limit/v1795774340/03.Inbound.jpg',
  'https://res.cloudinary.com/firstnotchsolutions/image/upload/f_auto,q_auto:good,w_600,c_limit/v1795774342/04.Inbound.jpg',
  'https://res.cloudinary.com/firstnotchsolutions/image/upload/f_auto,q_auto:good,w_600,c_limit/v1795774344/05.Inbound.jpg',
  'https://res.cloudinary.com/firstnotchsolutions/image/upload/f_auto,q_auto:good,w_600,c_limit/v1795774346/06.Inbound.jpg',
  'https://res.cloudinary.com/firstnotchsolutions/image/upload/f_auto,q_auto:good,w_600,c_limit/v1795774361/07.Inbound.jpg',
  'https://res.cloudinary.com/firstnotchsolutions/image/upload/f_auto,q_auto:good,w_600,c_limit/v1795774349/08.Inbound.png',
  'https://res.cloudinary.com/firstnotchsolutions/image/upload/f_auto,q_auto:good,w_600,c_limit/v1795774351/09.Inbound.jpg',
  'https://res.cloudinary.com/firstnotchsolutions/image/upload/f_auto,q_auto:good,w_600,c_limit/v1795774353/10.Inbound.jpg',
  'https://res.cloudinary.com/firstnotchsolutions/image/upload/f_auto,q_auto:good,w_600,c_limit/v1795774355/11.Inbound.jpg',
  'https://res.cloudinary.com/firstnotchsolutions/image/upload/f_auto,q_auto:good,w_600,c_limit/v1795774357/12.Inbound.jpg',
  'https://res.cloudinary.com/firstnotchsolutions/image/upload/f_auto,q_auto:good,w_600,c_limit/v1795774359/13.Inbound.jpg',
  'https://res.cloudinary.com/firstnotchsolutions/image/upload/f_auto,q_auto:good,w_600,c_limit/v1795774334/14.Inbound.jpg',
  'https://res.cloudinary.com/firstnotchsolutions/image/upload/f_auto,q_auto:good,w_600,c_limit/v1795774363/15.Inbound.jpg',
  'https://res.cloudinary.com/firstnotchsolutions/image/upload/f_auto,q_auto:good,w_600,c_limit/v1795774335/16.Inbound.jpg',
];


const SLOTS = 16;
const SHUFFLE_EVERY_MS = 3200;

type Tile = { id: number; src: string };

const useIsoLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const shuffle = <T,>(input: T[]): T[] => {
  const array = [...input];
  let current = array.length;

  while (current !== 0) {
    const random = Math.floor(Math.random() * current);
    current--;
    [array[current], array[random]] = [array[random], array[current]];
  }

  return array;
};

export default function InboundShuffleGrid({
  images = HERO_IMAGES,
  className = '',
}: {
  images?: string[];
  className?: string;
}) {
  const gridRef = useRef<HTMLDivElement>(null);
  const flipState = useRef<ReturnType<typeof Flip.getState> | null>(null);
  const visible = useRef(true);

  // Always exactly 16 tiles. Fewer photos repeat to fill the grid.
  const [tiles, setTiles] = useState<Tile[]>(() =>
    Array.from({ length: SLOTS }, (_, id) => ({
      id,
      src: images[id % Math.max(1, images.length)],
    }))
  );

  // Animate every re-order: tiles glide from their old to their new place.
  useIsoLayoutEffect(() => {
    const grid = gridRef.current;

    if (!grid || !flipState.current) return;

    Flip.from(flipState.current, {
      targets: grid.children,
      duration: 1.5,
      ease: 'power3.inOut',
      overwrite: true,
    });

    flipState.current = null;
  }, [tiles]);

  // Shuffle on a timer (not during reduced motion, hidden tab or off-screen).
  useEffect(() => {
    const grid = gridRef.current;

    if (!grid) return;

    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const io = new IntersectionObserver(
      ([entry]) => {
        visible.current = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );

    io.observe(grid);

    // Start from a shuffled order once mounted (avoids a hydration mismatch).
    setTiles((current) => shuffle(current));

    gsap.fromTo(
      grid.children,
      { opacity: 0, scale: 0.92 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.7,
        ease: 'power3.out',
        stagger: { each: 0.04, from: 'random' },
        delay: 0.2,
      }
    );

    if (reduced) {
      return () => io.disconnect();
    }

    const timer = window.setInterval(() => {
      if (document.hidden || !visible.current) return;

      flipState.current = Flip.getState(grid.children);

      setTiles((current) => shuffle(current));
    }, SHUFFLE_EVERY_MS);

    return () => {
      window.clearInterval(timer);
      io.disconnect();
      gsap.killTweensOf(grid.children);
    };
  }, []);

  return (
    <div
      ref={gridRef}
      aria-label="Photos of the FirstNotch team"
      className={`grid h-[350px] w-full grid-cols-4 grid-rows-4 gap-2 sm:h-[490px] sm:gap-2.5 lg:h-[640px] lg:w-[125%] ${className}`}>
      {tiles.map((tile) => (
        <div
          key={tile.id}
          className="relative overflow-hidden rounded-[10px] bg-[#F6E3E3] sm:rounded-[14px]"
        >
          <img
            src={tile.src}
            alt=""
            draggable={false}
            loading="lazy"
            decoding="async"
            onError={(event) => {
              // Missing file: keep the soft red tile instead of a broken icon.
              event.currentTarget.style.display = 'none';
            }}
            className="h-full w-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}