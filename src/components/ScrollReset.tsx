'use client';

import { useEffect } from 'react';

export default function ScrollReset() {
  useEffect(() => {
    // Disable the browser's automatic scroll restoration.
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const navigationEntries =
      performance.getEntriesByType(
        'navigation'
      ) as PerformanceNavigationTiming[];

    const isReload =
      navigationEntries.length > 0 &&
      navigationEntries[0]?.type === 'reload';

    // Only force the page to the top on a real refresh.
    // Normal Next.js navigation remains untouched.
    if (!isReload) return;

    const resetScroll = () => {
      const html =
        document.documentElement;

      const previousScrollBehavior =
        html.style.scrollBehavior;

      html.style.scrollBehavior = 'auto';

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'auto',
      });

      html.style.scrollBehavior =
        previousScrollBehavior;
    };

    resetScroll();

    const frame =
      window.requestAnimationFrame(
        resetScroll
      );

    window.addEventListener(
      'load',
      resetScroll,
      { once: true }
    );

    window.addEventListener(
      'pageshow',
      resetScroll,
      { once: true }
    );

    return () => {
      window.cancelAnimationFrame(frame);

      window.removeEventListener(
        'load',
        resetScroll
      );

      window.removeEventListener(
        'pageshow',
        resetScroll
      );
    };
  }, []);

  return null;
}