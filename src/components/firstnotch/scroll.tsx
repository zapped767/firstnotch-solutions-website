'use client';
import type Lenis from 'lenis';

let active: Lenis | null = null;
export function setPageScroller(instance: Lenis | null) {
  active = instance;
}
export function jumpTo(position: number) {
  if (active) active.scrollTo(position, { immediate: true });
  else window.scrollTo({ top: position, behavior: 'instant' });
}
