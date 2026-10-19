'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { COPY, LOGOS } from './content';

const links = [
  { label: 'Services', href: '/services' },
  { label: 'How We Hire', href: '#hiring' },
  { label: 'About', href: '#about' },
  { label: 'Work With Us', href: '#careers' },
];
export default function Navbar() {
  const [open, setOpen] = useState(false);

  const button = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        button.current?.focus();
      }
    };

    const outside = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !header.current?.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    const desktop = window.matchMedia('(min-width: 1024px)');

    const closeAtDesktop = () => {
      if (desktop.matches) {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', outside);
    desktop.addEventListener('change', closeAtDesktop);

    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', outside);
      desktop.removeEventListener('change', closeAtDesktop);
    };
  }, [open]);

  return (
    <header
      ref={header}
      className="fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-white font-normal text-[#17191C]"
    >
      <div
        data-fns-progress
        aria-hidden="true"
        className="absolute left-0 top-0 h-[3px] w-full origin-left scale-x-0 bg-[#B12025]"
      />

      <div className="mx-auto flex h-[88px] max-w-[1536px] items-center justify-between px-5 sm:px-8 lg:px-14">
        <a
          href="#top"
          onClick={() => setOpen(false)}
          aria-label="FirstNotch Solutions home"
          className="flex w-[202px] items-center gap-3 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B12025]"
        >
          <Image
            src={LOGOS.red}
            alt="FirstNotch Solutions"
            width={190}
            height={67}
            className="h-auto w-[190px] object-contain"
          />
        </a>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-6 lg:flex"
        >
{links.map((link) => (
  <Link
    key={link.href}
    href={link.href}
    className="text-[13px] font-semibold transition-opacity hover:opacity-60 focus-visible:underline"
  >
    {link.label}
  </Link>
))}     </nav>

        <a
          href="#contact"
          data-fns-magnetic
          className="group hidden items-center gap-5 rounded-full bg-[#B12025] px-6 py-3.5 text-xs font-semibold text-white transition-colors hover:bg-[#17191C] sm:inline-flex"
        >
          {COPY.cta}

          <ArrowUpRight
            aria-hidden="true"
            size={17}
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none"
          />
        </a>

        <button
          ref={button}
          type="button"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          aria-controls="fns-mobile-navigation"
          onClick={() => setOpen(!open)}
          className="rounded-full border border-current p-3 lg:hidden"
        >
          {open ? (
            <X aria-hidden="true" size={20} />
          ) : (
            <Menu aria-hidden="true" size={20} />
          )}
        </button>
      </div>

      <nav
        id="fns-mobile-navigation"
        aria-label="Mobile navigation"
        hidden={!open}
        className="border-t border-black/10 bg-white px-6 py-5 text-[#17191C] lg:hidden"
      >
        {[...links, { label: COPY.cta, href: '#contact' }].map(
  (link) => (
    <Link
      key={link.href}
      href={link.href}
      onClick={() => setOpen(false)}
      className="block border-b border-black/10 py-4 text-lg font-semibold"
    >
      {link.label}
    </Link>
  ),
)}
      </nav>
    </header>
  );
}