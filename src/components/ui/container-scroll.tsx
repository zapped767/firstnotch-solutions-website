'use client';

import * as React from 'react';

import {
  HTMLMotionProps,
  MotionValue,
  Transition,
  Variants,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';

import { cn } from '@/lib/utils';

interface ContainerScrollContextValue {
  scrollYProgress: MotionValue<number>;
}

const SPRING_CONFIG: Transition = {
  type: 'spring',
  stiffness: 100,
  damping: 16,
  mass: 0.75,
  restDelta: 0.005,
};

const blurVariants: Variants = {
  hidden: { filter: 'blur(10px)', opacity: 0 },
  visible: { filter: 'blur(0px)', opacity: 1 },
};

const ContainerScrollContext = React.createContext<
  ContainerScrollContextValue | undefined
>(undefined);

function useContainerScrollContext() {
  const context = React.useContext(ContainerScrollContext);

  if (!context) {
    throw new Error(
      'useContainerScrollContext must be used within a ContainerScroll Component',
    );
  }

  return context;
}

/* =========================================================
   SCROLL WRAPPER
========================================================= */

export const ContainerScroll = ({
  children,
  className,
  style,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress: rawProgress } = useScroll({
    target: scrollRef,
    offset: ['start start', 'end end'],
  });

  // Spring smoothing = buttery movement even with mouse wheels
  const scrollYProgress = useSpring(rawProgress, {
    stiffness: 90,
    damping: 30,
    mass: 0.4,
    restDelta: 0.0005,
  });

  return (
    <ContainerScrollContext.Provider value={{ scrollYProgress }}>
      <div
        ref={scrollRef}
        className={cn('relative min-h-[120vh]', className)}
        style={style}
        {...props}
      >
        {children}
      </div>
    </ContainerScrollContext.Provider>
  );
};

ContainerScroll.displayName = 'ContainerScroll';

/* =========================================================
   STICKY AREA
========================================================= */

export const ContainerSticky = ({
  className,
  style,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn('sticky left-0 top-0 h-screen w-full overflow-hidden', className)}
      style={{
        perspective: '1600px',
        perspectiveOrigin: 'center center',
        ...style,
      }}
      {...props}
    />
  );
};

ContainerSticky.displayName = 'ContainerSticky';

/* =========================================================
   GALLERY
========================================================= */

export const GalleryContainer = ({
  children,
  className,
  style,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & HTMLMotionProps<'div'>) => {
  const { scrollYProgress } = useContainerScrollContext();

  // Gentle 3D entrance only at the very start
  const rotateX = useTransform(scrollYProgress, [0, 0.12], [14, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.12, 0.9, 1], [0.92, 1, 1, 0.97]);

  return (
    <motion.div
      className={cn(
        'relative grid w-full grid-cols-3 items-start gap-3 sm:gap-5',
        className,
      )}
      style={{
        rotateX,
        scale,
        transformOrigin: 'center top',
        ...style,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

GalleryContainer.displayName = 'GalleryContainer';

/* =========================================================
   PARALLAX COLUMN
========================================================= */

export const GalleryCol = ({
  className,
  style,
  yRange = ['0%', '-50%'],
  ...props
}: HTMLMotionProps<'div'> & { yRange?: string[] }) => {
  const { scrollYProgress } = useContainerScrollContext();

  const y = useTransform(scrollYProgress, [0, 1], yRange);

  return (
    <motion.div
      className={cn(
        'relative flex w-full flex-col gap-3 will-change-transform sm:gap-5',
        className,
      )}
      style={{ y, ...style }}
      {...props}
    />
  );
};

GalleryCol.displayName = 'GalleryCol';

/* =========================================================
   STAGGER
========================================================= */

export const ContainerStagger = React.forwardRef<
  HTMLDivElement,
  HTMLMotionProps<'div'>
>(({ className, viewport, transition, ...props }, ref) => {
  return (
    <motion.div
      ref={ref}
      className={cn('relative', className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: viewport?.once ?? true, ...viewport }}
      transition={{
        staggerChildren: transition?.staggerChildren ?? 0.2,
        ...transition,
      }}
      {...props}
    />
  );
});

ContainerStagger.displayName = 'ContainerStagger';

/* =========================================================
   ANIMATED CHILD
========================================================= */

export const ContainerAnimated = React.forwardRef<
  HTMLDivElement,
  HTMLMotionProps<'div'>
>(({ className, transition, ...props }, ref) => {
  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      variants={blurVariants}
      transition={{ ...SPRING_CONFIG, ...transition }}
      {...props}
    />
  );
});

ContainerAnimated.displayName = 'ContainerAnimated';