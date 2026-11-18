"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import {
  ArrowDown, ArrowRight, ArrowUpRight, BadgeCheck, Check, Crop, Download, Focus,
  Heart, MessageCircle, Pause, Play,
  Sparkles, Trophy, Users,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useGSAP } from "@gsap/react";
import "@fontsource-variable/manrope";

gsap.registerPlugin(useGSAP, ScrollTrigger, DrawSVGPlugin, MotionPathPlugin);

/* =========================================================
   STYLES (design copied from the 21st.dev Daytake page)
========================================================= */

const pageStyles = `
:root {
  font-family: "Manrope Variable", system-ui, sans-serif;
  font-synthesis: none;
  color-scheme: light;
  background: var(--page);
  color: var(--ink);
  -webkit-font-smoothing: antialiased;
}

*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; }
img { display: block; max-inline-size: 100%; }
button, input { font: inherit; }
button { color: inherit; cursor: pointer; }
button:disabled { cursor: default; }
a { color: inherit; text-decoration: none; }
:where(a, button, input):focus-visible { outline: 2px solid var(--focus); outline-offset: 4px; }

.preview-icon-button {
  display: inline-grid; place-items: center; flex: none;
  inline-size: 44px; block-size: 44px; padding: 0;
  border: 1px solid var(--line); border-radius: 50%; background: var(--page);
}
.preview-icon-button:hover:enabled { background: var(--surface); }
.preview-icon-button:disabled { opacity: .4; }
.preview-icon-button svg { inline-size: 18px; block-size: 18px; }

.preview-dialog {
  color: var(--ink); background: var(--page); border: 1px solid var(--line); padding: 0;
  width: min(760px, calc(100% - 28px)); max-height: calc(100% - 28px); overscroll-behavior: contain;
}
.preview-dialog::backdrop { background: rgb(12 12 12 / .72); }
.preview-dialog-inner { position: relative; }
.preview-close { position: absolute; z-index: 1; top: 12px; right: 12px; }

.preview-skip {
  position: fixed; top: 8px; left: 8px; z-index: 30; transform: translateY(-150%);
  color: var(--ink); background: var(--page); padding: 12px 16px;
}
.preview-skip:focus { transform: none; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { scroll-behavior: auto !important; }
}

 :root {
  scrollbar-gutter: stable;
  --page: #ffffff;
  --outer: #fff7f7;
  --ink: #17191C;
  --muted: #66676d;
  --line: #ead9da;
  --surface: #fff5f5;
  --accent: #B12025;
  --accent-ink: #ffffff;
  --focus: #B12025;
  --blue: #B12025;
  --about: #FDE7E8;
  --feature-blue: #B12025;
  --feature-violet: #cf5559;
  --feature-cyan: #8f171b;
}

html { background: var(--page); scroll-padding-top: 24px; }
body { background: var(--page); overflow-x: clip; }
::selection { background: #dcd4ff; color: #251e4a; }

.daytake {
  width: 100%;
  margin: 0;
  background: var(--page);
  overflow-x: clip;
  color: var(--ink);
}
.daytake-wrap { width: calc(100% - clamp(32px, 6vw, 112px)); max-width: 1480px; margin-inline: auto; }
  height: 34px; border-bottom: 1px solid var(--line);
  display: flex; align-items: center; justify-content: space-between;
  padding-inline: 18px; font-size: 10px; color: var(--muted);
}
.daytake-header {
  position: relative; z-index: 5; min-height: 82px;
  display: flex; justify-content: space-between; align-items: center; gap: 24px;
}
.daytake-logo { display: inline-flex; gap: 8px; align-items: center; font-size: 1.4rem; font-weight: 850; letter-spacing: -.04em; }
.daytake-logo svg { width: 29px; height: 29px; color: var(--accent); stroke-width: 2.3; }
.daytake-header nav { display: flex; align-items: center; gap: 32px; font-size: .78rem; font-weight: 700; }
.daytake-header nav a { min-height: 44px; display: grid; align-items: center; }
.daytake-header nav a:hover, .daytake-footer nav a:hover { color: var(--blue); }
.daytake-header .preview-icon-button { width: 36px; height: 36px; min-height: 44px; min-width: 44px; border: 0; background: transparent; }
.daytake-hero {
  position: relative; isolation: isolate; display: flex; align-items: center;
  min-height: clamp(560px, 46vw, 760px); overflow: clip; background: var(--page);
}
.daytake-hero-content { position: relative; z-index: 2; padding: 30px 0 100px; pointer-events: none; }
.daytake-hero-content a { pointer-events: auto; }
.daytake h1, .daytake h2 { margin: 0; font-weight: 800; letter-spacing: -.04em; text-wrap: balance; }
.daytake h1 { font-size: clamp(3rem, 5.6vw, 5.25rem); line-height: 1.05; }
.daytake h1 span, .daytake h2 span { color: var(--blue); }
.daytake h2 { font-size: clamp(2rem, 3.1vw, 3.1rem); line-height: 1.14; }
.daytake-hero p { max-width: 34ch; margin: 23px 0 29px; font-size: clamp(.96rem, 1.3vw, 1.13rem); line-height: 1.65; color: var(--muted); }
.daytake-primary {
  display: inline-flex; align-items: center; justify-content: center; gap: 15px;
  min-height: 48px; padding: 12px 24px; border: 0; border-radius: 99px;
  background: var(--accent); color: var(--accent-ink); font-size: .82rem; font-weight: 750;
  transition: box-shadow .2s, translate .2s;
}
.daytake-primary:hover { box-shadow: 0 6px 18px rgb(216 79 56 / .2); translate: 0 -1px; }
.daytake-primary svg { width: 15px; height: 15px; }
.daytake-counter { display: flex; align-items: center; gap: 12px; margin-top: 34px; }
.daytake-counter-icon { width: 39px; height: 39px; display: grid; place-items: center; border: 1px solid var(--line); border-radius: 50%; }
.daytake-counter-icon svg { width: 17px; height: 17px; color: var(--muted); }
.daytake-counter small { display: block; font-size: .66rem; color: var(--muted); margin-bottom: 3px; }
.daytake-counter strong { font-size: 1.1rem; font-weight: 800; font-variant-numeric: tabular-nums; letter-spacing: -.02em; }
.daytake-hero-foot { position: absolute; z-index: 3; left: 0; right: 0; bottom: 20px; display: flex; align-items: center; justify-content: space-between; font-size: .68rem; color: var(--muted); }
.daytake-hero-foot a { min-height: 44px; display: flex; align-items: center; gap: 10px; }
.daytake-hero-foot svg { width: 12px; height: 12px; }
.daytake-mosaic {
  --mosaic-gap: clamp(10px, 1.35vw, 20px);
  position: absolute; inset: 0 -4% 0 46%;
  display: flex; align-items: center; perspective: 1000px; pointer-events: none;
  mask-image: linear-gradient(90deg, transparent, #000 17%, #000 90%, transparent), linear-gradient(180deg, transparent, #000 19%, #000 80%, transparent);
  mask-composite: intersect;
}
.daytake-mosaic-grid {
  flex: none; width: 110%; height: 860px; display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr)); gap: var(--mosaic-gap);
  transform-style: preserve-3d; transform: rotateX(18deg) rotateY(-24deg) rotateZ(-12deg) translateZ(-150px);
  transform-origin: 50% 50%;
}
.daytake-mosaic-column { min-width: 0; overflow: visible; }
.daytake-mosaic-track { will-change: transform; }
.daytake-mosaic-set { display: grid; gap: var(--mosaic-gap); padding-bottom: var(--mosaic-gap); }
.daytake-mosaic-tile { width: 100%; aspect-ratio: .87; height: auto; object-fit: cover; border-radius: 13px; background: var(--surface); }
.daytake-mosaic::after { content: ""; position: absolute; inset: 0 auto 0 0; width: 16%; backdrop-filter: blur(8px); mask-image: linear-gradient(90deg, #000, transparent); }
.daytake-features { padding-block: clamp(54px, 6.5vw, 94px); }
.daytake-feature-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: clamp(24px, 5.8vw, 90px); }
.daytake-feature { --feature: var(--feature-blue); }
.daytake-feature:nth-child(2) { --feature: var(--feature-violet); }
.daytake-feature:nth-child(3) { --feature: var(--feature-cyan); }
.daytake-feature-icon {
  width: 58px; height: 58px; display: grid; place-items: center; border-radius: 50%; margin-bottom: 23px;
  background: var(--feature); color: #fff; box-shadow: 0 7px 18px color-mix(in srgb, var(--feature) 18%, transparent);
}
.daytake-feature-icon svg { width: 25px; height: 25px; stroke-width: 1.7; }
.daytake .daytake-feature h2 { max-width: 18ch; font-size: 1.15rem; line-height: 1.3; letter-spacing: -.025em; }
.daytake-feature p { max-width: 32ch; font-size: .82rem; line-height: 1.7; color: var(--muted); margin: 12px 0 0; }

.daytake-library { position: relative; padding: 55px 0 28px; overflow: clip; background: var(--page); }
.daytake-library-heading { text-align: center; margin-bottom: 28px; }
.daytake-library-heading p { margin: 14px 0 0; font-size: .91rem; color: var(--muted); }
.daytake-gallery { --gallery-gap: 18px; --gallery-card: clamp(190px, 20vw, 270px); padding: 20px 0; overflow: clip; }
.daytake-gallery-tilt { display: grid; grid-template-columns: minmax(0, 1fr); gap: 10px; rotate: 2deg; margin-inline: -30px; }
.daytake-gallery-lane { display: flex; overflow-x: auto; overflow-y: hidden; overflow-anchor: none; scrollbar-width: none; padding: 8px 0; overscroll-behavior-x: contain; touch-action: pan-x pan-y; }
.daytake-gallery-lane::-webkit-scrollbar { display: none; }
.daytake-gallery-group { display: flex; flex: none; gap: var(--gallery-gap); padding-right: var(--gallery-gap); }
.daytake-photo-arrival { flex: 0 0 var(--gallery-card); width: var(--gallery-card); }
.daytake-photo {
  width: 100%; aspect-ratio: 1.55; position: relative; padding: 0;
  display: block; border: 0; border-radius: 13px; background: var(--surface); overflow: hidden;
}
.daytake-photo > img { width: 100%; height: 100%; object-fit: cover; object-position: center 35%; transition: scale .45s; }
.daytake-photo:hover > img { scale: 1.035; }
.daytake-photo-badge { position: absolute; display: grid; place-items: center; border-radius: 50%; }
.daytake-category-badge { top: 12px; left: 12px; width: 27px; height: 27px; color: #B12025; background: #fffdf9; }
.daytake-category-badge svg { width: 13px; height: 13px; }
.daytake-photo-caption { position: absolute; left: 14px; bottom: 13px; max-width: 70%; color: #fff; font-size: .72rem; font-weight: 700; opacity: 0; text-shadow: 0 2px 5px rgb(0 0 0 / .7); }
.daytake-photo:hover .daytake-photo-caption, .daytake-photo:focus-visible .daytake-photo-caption { opacity: 1; }
.daytake-gallery-footer { display: flex; align-items: center; justify-content: space-between; color: var(--muted); font-size: .68rem; margin-top: 12px; }
.daytake-motion-toggle { display: inline-flex; align-items: center; gap: 7px; min-width: 64px; min-height: 44px; border: 0; background: transparent; color: var(--muted); font-size: .68rem; }
.daytake-motion-toggle:hover { color: var(--blue); }
.daytake-motion-toggle svg { width: 13px; height: 13px; }

.daytake-editorial {
  display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
  align-items: center; column-gap: clamp(32px, 5.5vw, 85px);
  padding-block: 85px; margin-block: 35px; position: relative;
}
.daytake-editorial::before {
  content: ""; position: absolute; z-index: 0; top: 80px; bottom: 90px; left: 20%; right: -5%;
  background: linear-gradient(90deg, transparent, #fff0f0 34%, #FDE7E8 72%, #fbdfe1);
  border-radius: 16px; pointer-events: none;
}
.daytake-editorial-figure { margin: 0; min-width: 0; z-index: 1; }
.daytake-editorial-stage { position: relative; isolation: isolate; aspect-ratio: 1 / 1.1; }
.daytake-editorial-media { position: absolute; inset: 0 auto auto 7%; width: 76%; height: 97%; transform-origin: center bottom; }
.daytake-editorial-photo { display: block; padding: 0; border: 0; width: 100%; height: 100%; border-radius: 24px; overflow: hidden; background: #ddd5cc; }
.daytake-editorial-photo img { width: 100%; height: 100%; object-fit: cover; }
.daytake-editorial-photo[data-full-frame="true"] img { object-fit: contain; }
.daytake-editorial-open { position: absolute; right: -18px; top: 14px; width: 56px; height: 56px; display: grid; place-items: center; border: 0; border-radius: 50%; background: var(--accent); color: var(--accent-ink); box-shadow: 0 6px 18px rgb(131 42 19 / .14); }
.daytake-editorial-open svg { width: 21px; height: 21px; }
.daytake-editorial-toolbar { position: absolute; top: 24%; left: 0; width: 43px; display: grid; padding: 5px 0; background: rgb(255 255 255 / .74); backdrop-filter: blur(14px); border-radius: 99px; box-shadow: 0 7px 20px rgb(31 24 68 / .1); }
.daytake-editorial-toolbar button, .daytake-editorial-toolbar a { display: grid; place-items: center; width: 43px; height: 39px; padding: 0; border: 0; background: transparent; color: #777184; }
.daytake-editorial-toolbar svg { width: 16px; height: 16px; }
.daytake-editorial-toolbar [aria-pressed="true"], .daytake-editorial-toolbar :is(a,button):hover { color: #B12025; }
.daytake-audio { position: absolute; z-index: 3; left: 0; bottom: 9%; width: 48%; padding: 10px 12px; border-radius: 11px; background: #fff; color: #3b5e4e; box-shadow: 0 9px 24px rgb(25 35 47 / .14); }
.daytake-waveform { display: flex; align-items: center; justify-content: space-between; gap: 2px; height: 30px; }
.daytake-waveform i { display: block; flex: 1; max-width: 3px; border-radius: 2px; background: #63bc9a; }
.daytake-waveform i:nth-child(n+19) { background: #bcd6c9; }
.daytake-audio-meta { display: flex; align-items: center; justify-content: space-between; margin-top: 5px; font-size: .52rem; font-weight: 700; }
.daytake-audio-meta > span:first-child { display: flex; gap: 5px; align-items: center; }
.daytake-audio-progress { position: absolute; left: 0; bottom: 0; width: 62%; height: 3px; background: #62b699; border-radius: 0 0 0 11px; }
.daytake-editorial-line { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
.daytake-editorial-line path { fill: none; stroke: var(--blue); stroke-width: .32; stroke-linecap: round; stroke-linejoin: round; }
.daytake-editorial-card { position: absolute; z-index: 2; width: 29%; left: 69%; text-align: left; padding: 6px; border: 0; border-radius: 10px; background: var(--page); box-shadow: 0 8px 24px rgb(35 27 60 / .13); }
.daytake-editorial-question { top: 51%; }
.daytake-editorial-result { top: 82%; left: 53%; width: 27%; }
.daytake-editorial-card img { width: 100%; height: auto; aspect-ratio: 1.85; object-fit: cover; border-radius: 6px; }
.daytake-editorial-card strong { display: block; padding: 5px 2px 2px; font-size: clamp(.57rem, .85vw, .73rem); line-height: 1.2; }
.daytake-editorial-card small { display: block; color: var(--muted); font-size: clamp(.43rem, .6vw, .52rem); padding: 1px 2px 3px; }
.daytake-mini-image { position: relative; display: block; }
.daytake-mini-image i { position: absolute; display: grid; place-items: center; width: 23px; height: 23px; right: -10px; top: 2px; border-radius: 50%; color: #fff; background: #ec7159; }
.daytake-mini-image svg { width: 9px; height: 9px; }
.daytake-editorial-figure figcaption { margin: 12px 7% 0; font-size: .62rem; color: var(--muted); }
.daytake-editorial-content { position: relative; z-index: 1; }
.daytake-editorial-content h2 { font-size: clamp(2rem, 3.55vw, 3.5rem); line-height: 1.13; }
.daytake-editorial-content > p { max-width: 38ch; margin: 22px 0 28px; font-size: .9rem; line-height: 1.7; color: var(--muted); }
.daytake-editorial-actions { display: flex; flex-wrap: wrap; gap: 20px; align-items: center; }
.daytake-watch { display: inline-flex; align-items: center; gap: 9px; padding: 0; border: 0; background: transparent; font-size: .76rem; font-weight: 600; min-height: 48px; }
.daytake-watch > span { display: grid; place-items: center; width: 38px; height: 38px; border: 1px solid var(--line); border-radius: 50%; }
.daytake-watch svg { width: 13px; height: 13px; color: var(--blue); }
.daytake-watch:hover { color: var(--blue); }
.daytake-trust { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 15px; border-top: 1px solid var(--line); margin-top: 35px; padding-top: 22px; }
.daytake-trust-item { display: flex; align-items: center; gap: 8px; font-size: .58rem; line-height: 1.55; color: var(--muted); }
.daytake-trust-item svg { width: 18px; height: 18px; flex: none; color: var(--blue); }
.daytake-trust-item:nth-child(2) svg { color: var(--accent); }
.daytake-trust-item:nth-child(3) svg { color: #8f171b; }

.daytake-people { padding: 40px 0 78px; text-align: center; overflow: clip; }
.daytake-people h2 { font-size: clamp(2rem, 3.5vw, 3.4rem); }
.daytake-people > .daytake-wrap > p { font-size: .91rem; color: var(--muted); margin: 18px 0 0; }
.daytake-portrait-field { width: min(1120px, 100%); position: relative; isolation: isolate; margin: 20px auto 6px; height: 390px; }
.daytake-portrait-line { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: -1; }
.daytake-portrait-trace { fill: none; stroke: color-mix(in srgb, var(--blue) 30%, var(--page)); stroke-width: 1.5; }
.daytake-portrait-line-phone { display: none; }
.daytake-creators { list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: repeat(6, 1fr); width: 100%; }
.daytake-creator-arrival { padding-top: 88px; }
.daytake-creator-arrival:nth-child(1) { padding-top: 118px; }
.daytake-creator-arrival:nth-child(2) { padding-top: 40px; }
.daytake-creator-arrival:nth-child(3) { padding-top: 138px; }
.daytake-creator-arrival:nth-child(4) { padding-top: 20px; }
.daytake-creator-arrival:nth-child(5) { padding-top: 118px; }
.daytake-creator-arrival:nth-child(6) { padding-top: 48px; }
.daytake-creator { display: inline-grid; justify-items: center; padding: 0; border: 0; background: transparent; color: var(--ink); border-radius: 24px; }
.daytake-creator-plate { position: relative; display: block; width: clamp(124px, 11.5vw, 164px); aspect-ratio: 1; margin-bottom: 20px; }
.daytake-creator-backplate { position: absolute; inset: 0; border-radius: 28%; transform: rotate(var(--tilt)); background: #f8dfe0; }
.daytake-creator-backplate.lavender { background: repeating-linear-gradient(35deg, #fae7e8 0 9px, #f1cfd1 9px 11px); }
.daytake-creator-backplate.pink { background: #f7d9db; }
.daytake-creator-backplate.cream { background: #f7e8e8; }
.daytake-creator-backplate.yellow { background: repeating-linear-gradient(-35deg, #fae1e2 0 9px, #f2cbcd 9px 11px); }
.daytake-creator-backplate.rose { background: #f6d5d7; }
.daytake-creator-backplate.deepred { background: repeating-linear-gradient(35deg, #f2c9cb 0 9px, #eebabc 9px 11px); }
.daytake-creator-body { position: absolute; inset: 9% 10%; border-radius: 17px; background: #fffefa; box-shadow: 0 8px 18px #3628380c; }
.daytake-creator-avatar { position: absolute; width: 38%; aspect-ratio: 1; left: 31%; top: 17%; border-radius: 50%; overflow: hidden; transform-origin: 50% 50%; }
.daytake-creator-avatar img { width: 100%; height: 100%; object-fit: cover; object-position: center 30%; }
.daytake-creator-caption { position: absolute; inset: 59% 11% auto; display: grid; justify-items: center; gap: 8px; color: #252336; }
.daytake-creator-caption strong { font-size: clamp(.6rem, .86vw, .75rem); line-height: 1.3; letter-spacing: -.015em; }
.daytake-creator-badge { display: inline-flex; align-items: center; gap: 4px; padding: 3px 8px; font-size: .55rem; font-weight: 650; border-radius: 99px; color: #6f3033; background: #f7e8e9; }
.daytake-creator-badge svg { width: 10px; height: 10px; }
.daytake-creator-specialty { font-size: .65rem; color: var(--muted); }
.daytake-creator:hover .daytake-creator-caption strong { color: #B12025; }
.daytake-particle-arrival { position: absolute; pointer-events: none; }
.daytake-particle { display: block; width: 10px; height: 10px; border-radius: 50%; background: #B12025; }
.particle-0 { left: 3%; top: 56%; }
.particle-1 { left: 29%; top: 9%; }
.particle-1 .daytake-particle { width: 15px; height: 15px; background: #cf5559; }
.particle-2 { left: 62%; top: 78%; }
.particle-2 .daytake-particle { width: 6px; height: 6px; background: #17191C; }
.particle-3 { left: 91%; top: 8%; }
.particle-3 .daytake-particle { width: 9px; height: 9px; background: #cf5559; }
.daytake-text-link { display: inline-flex; align-items: center; gap: 12px; min-height: 44px; color: var(--blue); font-size: .78rem; font-weight: 750; }
.daytake-text-link svg { width: 15px; height: 15px; }
.daytake-text-link:hover { text-decoration: underline; text-underline-offset: .3em; }
.daytake-footer { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 20px; border-top: 1px solid var(--line); padding: 30px 0 22px; }
.daytake-footer p { font-size: .7rem; color: var(--muted); margin: 8px 0; }
.daytake-footer nav { display: flex; gap: 28px; font-size: .73rem; }
.daytake-footer nav a { min-height: 44px; display: grid; align-items: center; }
.daytake .preview-dialog { width: min(760px, calc(100% - 28px)); border-radius: 16px; }
.daytake-dialog-photo { width: 100%; height: min(65vh, 570px); object-fit: contain; background: var(--surface); }
.daytake-dialog-info { display: flex; justify-content: space-between; align-items: center; gap: 18px; padding: 22px; }
.daytake-dialog-info h2 { font-size: 1.35rem; }
.daytake-dialog-info p { margin: 9px 0 0; color: var(--muted); font-size: .8rem; line-height: 1.6; }

/* FIRSTNOTCH BRAND OVERRIDES */
.daytake-editorial-content h2 span { color: #B12025 !important; }
.daytake-editorial-actions .daytake-primary { background: #B12025 !important; color: #fff !important; }
.daytake-editorial-actions .daytake-primary:hover { box-shadow: 0 8px 22px rgb(177 32 37 / .22); }
.daytake-text-link, .daytake-watch:hover, .daytake-watch svg, .daytake-header nav a:hover, .daytake-footer nav a:hover, .daytake-motion-toggle:hover { color: #B12025; }

@media (max-width: 1000px) {
  .daytake-wrap { width: calc(100% - 48px); }
  .daytake-header { min-height: 75px; }
  .daytake-hero { min-height: 510px; }
  .daytake-hero h1 { font-size: 3.5rem; }
  .daytake-hero-content { padding-bottom: 82px; }
  .daytake-mosaic { inset: 0 -18% 0 43%; }
  .daytake-mosaic-grid { height: 680px; }
  .daytake-editorial { column-gap: 32px; }
  .daytake-editorial-content h2 { font-size: 2.25rem; }
  .daytake-editorial-actions { gap: 12px; }
  .daytake-primary { padding-inline: 20px; }
  .daytake-trust { gap: 8px; }
  .daytake-trust-item { flex-direction: column; align-items: start; }
}
@media (max-width: 759px) {
  .daytake-wrap { width: calc(100% - 32px); }
    .daytake-header { min-height: 66px; gap: 8px; }
  .daytake-logo { font-size: 1.25rem; gap: 5px; }
  .daytake-logo svg { width: 25px; height: 25px; }
  .daytake-header nav { gap: 14px; font-size: .68rem; }
  .daytake-header nav a:first-child { display: none; }
  .daytake-header > .preview-icon-button { min-width: 44px; width: 44px; }
  .daytake-header > .preview-icon-button svg { width: 15px; height: 15px; }
  .daytake-hero { display: grid; align-items: start; grid-template-rows: auto 300px; min-height: 0; padding-bottom: 44px; }
  .daytake-hero-content { grid-row: 1; padding: 34px 0 0; }
  .daytake-hero h1 { font-size: clamp(2.6rem, 10.2vw, 4.2rem); line-height: 1.05; }
  .daytake-hero p { font-size: .87rem; margin: 19px 0 24px; max-width: 33ch; }
  .daytake-primary { min-height: 46px; font-size: .76rem; }
  .daytake-counter { margin-top: 23px; gap: 10px; }
  .daytake-counter-icon { width: 34px; height: 34px; }
  .daytake-counter small { font-size: .58rem; }
  .daytake-counter strong { font-size: 1rem; }
  .daytake-mosaic { grid-row: 2; position: relative; inset: auto; height: 350px; margin: -8px -14% 0 -8%; }
  .daytake-mosaic-grid { height: 650px; width: 100%; }
  .daytake-mosaic-tile { aspect-ratio: .94; border-radius: 10px; }
  .daytake-mosaic { --mosaic-gap: 10px; mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent), linear-gradient(180deg, transparent, #000 22%, #000 74%, transparent); }
  .daytake-hero-foot { font-size: .58rem; bottom: 0; }
  .daytake-features { padding-block: 40px 45px; }
  .daytake-feature-grid { grid-template-columns: 1fr; gap: 30px; }
  .daytake-feature { display: grid; grid-template-columns: 47px 1fr; gap: 5px 16px; }
  .daytake-feature-icon { width: 47px; height: 47px; grid-row: span 2; margin: 0; }
  .daytake-feature-icon svg { width: 21px; height: 21px; }
  .daytake .daytake-feature h2 { font-size: 1.02rem; max-width: none; }
  .daytake-feature p { font-size: .76rem; margin: 3px 0 0; }
  .daytake-library { padding-top: 35px; padding-bottom: 20px; }
  .daytake-library-heading { margin-bottom: 22px; }
  .daytake-library-heading h2 { font-size: clamp(1.9rem, 7.8vw, 2.6rem); }
  .daytake-library-heading p { font-size: .76rem; margin-top: 12px; }
  .daytake-gallery { --gallery-gap: 12px; --gallery-card: clamp(166px, 48vw, 245px); padding: 17px 0; }
  .daytake-gallery-tilt { gap: 5px; }
  .daytake-photo { border-radius: 11px; }
  .daytake-category-badge { width: 23px; height: 23px; top: 8px; left: 8px; }
  .daytake-category-badge svg { width: 11px; height: 11px; }
  .daytake-gallery-footer { margin-top: 5px; font-size: .6rem; }
  .daytake-editorial { grid-template-columns: 1fr; gap: 34px; padding: 45px 0; margin-block: 10px; }
  .daytake-editorial::before { inset: 20% -8px 14px; background: linear-gradient(180deg, transparent, #FDE7E8 62%); }
  .daytake-editorial-figure { max-width: 440px; width: 100%; justify-self: center; }
  .daytake-editorial-stage { aspect-ratio: 1 / 1.06; }
  .daytake-editorial-media { width: 76%; }
  .daytake-editorial-photo { border-radius: 22px; }
  .daytake-editorial-open { width: 47px; height: 47px; right: -15px; }
  .daytake-editorial-open svg { width: 18px; height: 18px; }
  .daytake-editorial-toolbar { top: 25%; width: 44px; }
  .daytake-editorial-toolbar :is(button,a) { width: 44px; height: 44px; }
  .daytake-editorial-toolbar svg { width: 14px; height: 14px; }
  .daytake-audio { padding: 8px 10px; width: 47%; }
  .daytake-waveform { height: 24px; }
  .daytake-waveform i { max-height: 24px; max-width: 2px; }
  .daytake-audio-meta { font-size: .48rem; }
  .daytake-editorial-card { padding: 5px; }
  .daytake-editorial-card strong { font-size: .58rem; }
  .daytake-editorial-card small { font-size: .44rem; }
  .daytake-editorial-content { padding: 0 8px; }
  .daytake-editorial-content h2 { font-size: 2.2rem; }
  .daytake-editorial-content > p { font-size: .83rem; margin: 18px 0 22px; }
  .daytake-editorial-actions { gap: 22px; }
  .daytake-trust { margin-top: 26px; padding-top: 20px; }
  .daytake-trust-item { flex-direction: row; align-items: center; font-size: .54rem; gap: 7px; }
  .daytake-trust-item svg { width: 16px; height: 16px; }
  .daytake-people { padding: 50px 0 40px; }
  .daytake-people h2 { font-size: 2.2rem; }
  .daytake-people > .daytake-wrap > p { font-size: .8rem; margin-top: 14px; }
  .daytake-portrait-field { width: min(420px, 100%); height: 530px; margin-top: 20px; }
  .daytake-portrait-line-wide { display: none; }
  .daytake-portrait-line-phone { display: block; }
  .daytake-creators { grid-template-columns: repeat(2, 1fr); grid-auto-rows: 225px; }
  .daytake-creator-arrival { padding-top: 24px; }
  .daytake-creator-arrival:nth-child(2) { padding-top: 80px; }
  .daytake-creator-arrival:nth-child(3) { padding-top: 12px; }
  .daytake-creator-arrival:nth-child(4) { padding-top: 66px; }
  .daytake-creator-arrival:nth-child(5) { padding-top: 12px; }
  .daytake-creator-arrival:nth-child(6) { padding-top: 66px; }
  .daytake-creator-plate { width: clamp(130px, 35vw, 155px); margin-bottom: 17px; }
  .daytake-creator-caption { gap: 6px; }
  .daytake-creator-caption strong { font-size: .61rem; }
  .daytake-creator-badge { padding: 2px 6px; font-size: .5rem; }
  .daytake-creator-specialty { font-size: .58rem; }
  .particle-1 { top: 4%; left: 52%; }
  .particle-2 { top: 44%; left: 10%; }
  .particle-3 { top: 51%; left: 87%; }
  .daytake-footer { padding-block: 25px 18px; gap: 12px; }
  .daytake-footer nav { gap: 18px; font-size: .65rem; }
  .daytake-dialog-info { padding: 17px; }
  .daytake-dialog-info h2 { font-size: 1.15rem; }
}
@media (prefers-reduced-motion: reduce) {
  .daytake-mosaic-grid { transform: rotate(-8deg); }
  .daytake-mosaic-track { will-change: auto; }
  .daytake-gallery-copy { display: none; }
  .daytake-motion-toggle { display: none; }
  .daytake-primary, .daytake-photo > img { transition: none; }
}
`;

/* =========================================================
   CONTENT (your Culture page content)
========================================================= */

type Category = "Festivals" | "Play" | "Team";

const unsplash = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;

const events: { title: string; subtitle: string; category: Category; image: string }[] = [
  { title: "Pongal", subtitle: "Gratitude & new beginnings", category: "Festivals", image: unsplash("photo-1604608672516-f1b9b1d37076") },
  { title: "Deepavali", subtitle: "Light & togetherness", category: "Festivals", image: unsplash("photo-1604423488919-1e8e0f4c4d45") },
  { title: "Vesak", subtitle: "Reflection & compassion", category: "Festivals", image: unsplash("photo-1561361513-2d000a50f0dc") },
  { title: "Halloween", subtitle: "Creativity & fun", category: "Festivals", image: unsplash("photo-1508361001413-7a9dca21d08a") },
  { title: "Cricket Day", subtitle: "One team. One game.", category: "Play", image: unsplash("photo-1531415074968-036ba1b575da") },
  { title: "Carrom Day", subtitle: "Focus. Competition. Connection.", category: "Play", image: unsplash("photo-1606092195730-5d7b9af1efc5") },
  { title: "Team Moments", subtitle: "Better together", category: "Team", image: unsplash("photo-1521737711867-e3b97375f902") },
  { title: "Office Life", subtitle: "Where ideas meet", category: "Team", image: unsplash("photo-1497366811353-6870744d04b2") },
  { title: "Team Day", subtitle: "People beyond projects", category: "Team", image: unsplash("photo-1517245386807-bb43f82c33c4") },
  { title: "Celebrations", subtitle: "Moments worth remembering", category: "Team", image: unsplash("photo-1519167758481-83f550bb49b3") },
  { title: "Teamwork", subtitle: "Different strengths. One goal.", category: "Team", image: unsplash("photo-1556761175-b413da4baf72") },
  { title: "Learning Together", subtitle: "Share. Learn. Grow.", category: "Team", image: unsplash("photo-1522071820081-009f0129c71c") },
  { title: "Good Times", subtitle: "Work with personality", category: "Team", image: unsplash("photo-1511632765486-a01980e01a18") },
  { title: "Our People", subtitle: "The heart of FirstNotch", category: "Team", image: unsplash("photo-1529156069898-49953e39b3ac") },
  { title: "Together", subtitle: "More than colleagues", category: "Team", image: unsplash("photo-1527529482837-4698179dc6ce") },
];

const categoryIcons = { Festivals: Sparkles, Play: Trophy, Team: Users };

const waves = [
  { layout: "wide", box: "0 0 1120 390", path: "M -20 190 C 60 190 66 134 140 134 S 300 234 420 234 S 582 114 700 114 S 864 214 980 214 S 1080 170 1140 170" },
  { layout: "phone", box: "0 0 400 560", path: "M -16 150 C 35 150 45 110 100 110 S 245 175 300 175 C 425 175 420 390 300 390 S 155 335 100 335 C 10 335 -5 470 50 520" },
];
const waveform = [5, 11, 18, 9, 22, 15, 8, 24, 30, 16, 23, 11, 20, 28, 16, 9, 21, 32, 19, 25, 14, 7, 15, 23, 12, 29, 18, 8, 20, 13, 6, 11];

/* =========================================================
   CULTURE PAGE
========================================================= */

export default function CulturePage() {
  const photos = events.map((event, index) => ({
    ...event,
    id: index + 1,
    width: 900,
    height: 600,
    description: `${event.title}: ${event.subtitle}`,
    src: event.image,
  }));

  type Photo = (typeof photos)[number];

  const editorial = photos[11]; // Learning Together
  const question = photos[4]; // Cricket Day
  const result = photos[5]; // Carrom Day

  const galleryRows = [
    [photos[0], photos[3], photos[6], photos[9], photos[12], photos[14], photos[4]],
    [photos[1], photos[2], photos[7], photos[10], photos[13], photos[5], photos[8]],
  ];
  const mosaic = [
    [photos[0], photos[3], photos[6], photos[9]],
    [photos[1], photos[4], photos[7], photos[10]],
    [photos[2], photos[5], photos[8], photos[11]],
  ];

  const features = [
    { title: "Respect the person.", description: "Different backgrounds, beliefs and perspectives make the team stronger.", icon: Users },
    { title: "Own the work.", description: "Take responsibility, communicate clearly and finish what you start.", icon: Focus },
    { title: "Help each other win.", description: "Knowledge gets stronger when it is shared.", icon: Sparkles },
  ];

const creators = [
  {
    photo: photos[10],
    name: "Teamwork",
    specialty: "Different strengths. One goal.",
    color: "pink",
    tilt: -7,
    href: "/culture/teamwork",
  },

  {
    photo: photos[13],
    name: "Our People",
    specialty: "The heart of FirstNotch",
    color: "lavender",
    tilt: -8,
    href: "/culture/our-people",
  },

  {
    photo: photos[8],
    name: "Team Day",
    specialty: "People beyond projects",
    color: "pink",
    tilt: 6,
    href: "/culture/team-day",
  },

  {
    photo: photos[9],
    name: "Celebrations",
    specialty: "Moments worth remembering",
    color: "cream",
    tilt: -5,
    href: "/culture/celebrations",
  },

  {
    photo: photos[14],
    name: "Together",
    specialty: "More than colleagues",
    color: "yellow",
    tilt: 8,
    href: "/culture/together",
  },

  {
    photo: photos[11],
    name: "Learning",
    specialty: "Share. Learn. Grow.",
    color: "pink",
    tilt: 7,
    href: "/culture/learning",
  },
];

  const [motionPaused, setMotionPaused] = useState(false);
  const [saved, setSaved] = useState(false);
  const [fullFrame, setFullFrame] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const hero = useRef<HTMLElement>(null);
  const gallery = useRef<HTMLDivElement>(null);
  const library = useRef<HTMLElement>(null);
  const counter = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add({
      reduce: "(prefers-reduced-motion: reduce)",
      wide: "(min-width: 760px)",
      tall: "(min-height: 650px)",
    }, context => {
      const { reduce, wide, tall } = context.conditions!;
      const select = gsap.utils.selector(root);
      if (reduce) {
        if (counter.current) counter.current.textContent = String(events.length);
        return;
      }
      const counterValue = { value: 0 };
      const intro = gsap.timeline({ defaults: { ease: "power2.out" } });
      intro.fromTo(select(".daytake-hero-cta"), { opacity: .45, backgroundColor: "#e9a6a8" },
        { opacity: 1, backgroundColor: "#B12025", duration: 1.15 }, 0)
        .to(counterValue, {
          value: events.length, duration: 1.8, ease: "power2.out",
          onUpdate: () => {
            if (counter.current) counter.current.textContent = String(Math.round(counterValue.value));
          },
        }, .1);

      // The matrix owns 3D orientation; each child track owns its opposing travel.
      const unfurl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: hero.current, start: "top top",
          end: wide && tall ? () => "+=" + Math.round(innerHeight * .7) : "bottom top",
          pin: !!(wide && tall), pinSpacing: true, scrub: .65,
          anticipatePin: 1, invalidateOnRefresh: true,
        },
      });
      unfurl.addLabel("unfurl", 0)
        .fromTo(select(".daytake-mosaic-grid"),
          { rotationX: 18, rotationY: -24, rotationZ: -12, z: -150 },
          { rotationX: 3, rotationY: -3, rotationZ: -5, z: 0, duration: 1 }, "unfurl");
      gsap.utils.toArray<HTMLElement>(".daytake-mosaic-track", root.current).forEach((track, index) => {
        unfurl.fromTo(track, { yPercent: index === 1 ? -24 : -3 },
          { yPercent: index === 1 ? -4 : -25, duration: 1 }, "unfurl");
      });

      const featureCards = select(".daytake-feature");
      const featureIcons = select(".daytake-feature-icon");
      gsap.timeline({
        defaults: { duration: .55, ease: "power3.out" },
        scrollTrigger: { trigger: select(".daytake-features")[0], start: "top 82%", once: true },
      }).fromTo(featureCards, { opacity: .3, x: wide ? 28 : 12 }, { opacity: 1, x: 0, stagger: .13 }, 0)
        .fromTo(featureIcons, { scale: .55 }, { scale: 1, stagger: .13, ease: "back.out(1.5)" }, .08);

      // Scroll entrance and the horizontal glide use different wrappers.
      const badges = gsap.timeline({ paused: true })
        .fromTo(select(".daytake-photo-badge"), { scale: 0, autoAlpha: 0 },
          { scale: 1, autoAlpha: 1, duration: .44, stagger: .018, ease: "back.out(1.45)" });
      const arrival = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: library.current, start: "top 92%", end: "top 50%",
          scrub: .45, invalidateOnRefresh: true,
          onUpdate: self => {
            if (self.progress > .96) badges.play();
          },
        },
      });
      arrival.addLabel("photos", 0);
      gsap.utils.toArray<HTMLElement>(".daytake-gallery-group", root.current).forEach(group => {
        arrival.fromTo(group.querySelectorAll(".daytake-photo-arrival"),
          { x: () => Math.min(innerWidth, 1300) * .83, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, duration: .65, stagger: .09 }, "photos");
      });
      if (tall) {
        ScrollTrigger.create({
          trigger: library.current, start: "center center",
          end: () => "+=" + Math.round(innerHeight * (wide ? .66 : .38)),
          pin: true, pinSpacing: true, anticipatePin: 1, invalidateOnRefresh: true,
        });
      }

      const editorialTimeline = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: select(".daytake-editorial")[0],
          start: "top 88%", end: wide ? "center 43%" : "top 12%",
          scrub: .45, invalidateOnRefresh: true,
        },
      });
      editorialTimeline.addLabel("grow", 0)
        .fromTo(select(".daytake-editorial-media"), { scale: .65, yPercent: 12 },
          { scale: 1, yPercent: 0, duration: .75, ease: "none" }, "grow")
        .addLabel("assemble", .42)
        .fromTo(select(".daytake-editorial-toolbar"), { x: -65, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, duration: .38 }, "assemble")
        .fromTo(select(".daytake-audio"), { y: 56, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: .4 }, "assemble+=.1")
        .fromTo(select(".daytake-editorial-question"), { x: 38, y: 26, scale: .7, autoAlpha: 0 },
          { x: 0, y: 0, scale: 1, autoAlpha: 1, duration: .43, ease: "back.out(1.1)" }, "assemble+=.14")
        .fromTo(select(".daytake-editorial-actions"), { x: 35, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, duration: .35 }, "assemble+=.15")
        .fromTo(select(".daytake-trust-item"), { x: 20, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, duration: .3, stagger: .07 }, "assemble+=.3")
        .fromTo(select(".daytake-editorial-connector"), { drawSVG: "0%" },
          { drawSVG: "100%", duration: .4, ease: "none" }, "assemble+=.38")
        .fromTo(select(".daytake-editorial-result"), { scale: .85, autoAlpha: 0 },
          { scale: 1, autoAlpha: 1, duration: .25 }, "assemble+=.66");

      // A single reversible sequence: pastel plates, inner portrait seeds,
      // white card blooms, then the outer pair. Nothing runs on an idle loop.
      const field = select(".daytake-portrait-field")[0] as HTMLElement;
      const peopleTimeline = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: select(".daytake-people")[0],
          start: "clamp(top 72%)", end: "clamp(bottom 92%)",
          scrub: .6, invalidateOnRefresh: true,
        },
      });
      peopleTimeline
        .fromTo(select(".daytake-portrait-line"), { y: 40 }, { y: 0, duration: 1.5 }, 0)
        .fromTo(select(".daytake-portrait-trace"), { drawSVG: "0%" },
          { drawSVG: "100%", duration: 1.65, ease: "none" }, .12);

      select(".daytake-creator-arrival").forEach((item: HTMLElement, index: number) => {
        const inner = index >= 1 && index <= 4;
        const side = index < 3 ? -1 : 1;
        const at = inner ? .18 + index * .07 : 1.0 + (index === 5 ? .08 : 0);
        const plate = item.querySelector(".daytake-creator-backplate");
        const avatar = item.querySelector(".daytake-creator-avatar");
        const body = item.querySelector(".daytake-creator-body");
        const caption = item.querySelector(".daytake-creator-caption");
        const travel = field.clientWidth * (wide ? .34 : .23);
        if (inner) {
          peopleTimeline.fromTo(item, { y: 110, scale: .7 },
            { y: 0, scale: 1, duration: .94 }, 0);
        } else {
          peopleTimeline.fromTo(item, { x: side * travel, y: 56, scale: .72 }, {
            motionPath: { path: [
              { x: side * travel, y: 56 },
              { x: side * travel * .43, y: -28 },
              { x: 0, y: 0 },
            ], curviness: 1.2 },
            scale: 1, duration: 1.05,
          }, .48);
        }
        peopleTimeline
          .fromTo(plate, { opacity: 0, rotation: creators[index].tilt + side * 16 },
            { opacity: 1, rotation: creators[index].tilt, duration: .85 }, inner ? 0 : .2)
          .fromTo(avatar, { scale: .1, autoAlpha: 0 },
            { scale: 1, autoAlpha: 1, duration: .46, ease: "power3.out" }, at)
          .fromTo(body, { clipPath: "circle(2% at 50% 27%)", opacity: 0 },
            { clipPath: "circle(100% at 50% 45%)", opacity: 1, duration: .48 }, at + .24)
          .fromTo(caption, { y: 8, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: .25 }, at + .47);
      });
      select(".daytake-particle-arrival").forEach((dot: HTMLElement, index: number) => {
        const direction = index % 2 ? -1 : 1;
        const reach = wide ? 135 : 45;
        peopleTimeline.fromTo(dot, { x: direction * -reach, y: 62, autoAlpha: 0 }, {
          autoAlpha: 1, duration: 1.9, ease: "none",
          motionPath: { path: [
            { x: direction * -reach, y: 62 },
            { x: direction * -reach * .2, y: -48 - index * 7 },
            { x: 0, y: 0 },
          ], curviness: 1.5 },
        }, index * .035);
      });

      // Keyboard users can reach the creator buttons before a scrub finishes.
      // Reveal the composition immediately instead of focusing a hidden seed.
      const revealFocusedCreator = (event: FocusEvent) => {
        if ((event.target as HTMLElement).matches(".daytake-creator:focus-visible")) {
          peopleTimeline.scrollTrigger?.getTween()?.progress(1);
          peopleTimeline.progress(1);
        }
      };
      field.addEventListener("focusin", revealFocusedCreator);

      let disposed = false;
      const refresh = () => { if (!disposed) ScrollTrigger.refresh(); };
      document.fonts.ready.then(refresh);
      return () => {
        disposed = true;
        field.removeEventListener("focusin", revealFocusedCreator);
      };
    });
    return () => media.revert();
  }, { scope: root });

  useEffect(() => {
    const strip = gallery.current;
    if (!strip) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const tracks = gsap.utils.toArray<HTMLDivElement>(".daytake-gallery-lane", strip).map((lane, index) => ({
        lane, group: lane.firstElementChild as HTMLElement, direction: index === 0 ? 1 : -1,
        period: 0, position: 0, rendered: 0, resumeAt: 0,
      }));
      const measure = () => {
        tracks.forEach(track => {
          const period = track.group.offsetWidth;
          if (period === track.period) return;
          track.position = track.period ? track.position / track.period * period : (track.direction === 1 ? 0 : period);
          track.period = period;
          track.lane.scrollLeft = track.position;
          track.rendered = track.lane.scrollLeft;
        });
      };
      const tick = (time: number, elapsed: number) => {
        if (document.hidden || root.current?.dataset.motionPaused === "true") return;
        const inspecting = !!strip.querySelector(":focus-visible") || strip.matches(":active");
        for (const track of tracks) {
          if (track.lane.scrollLeft !== track.rendered) {
            track.position = track.lane.scrollLeft;
            track.rendered = track.lane.scrollLeft;
            track.resumeAt = time + .8;
          }
          if (time < track.resumeAt || inspecting || !track.period) continue;
          track.position = gsap.utils.wrap(0, track.period,
            track.position + track.direction * Math.min(elapsed, 48) * .032);
          track.lane.scrollLeft = track.position;
          track.rendered = track.lane.scrollLeft;
        }
      };
      measure();
      const resize = new ResizeObserver(measure);
      tracks.forEach(track => resize.observe(track.group));
      const view = new IntersectionObserver(([entry]) => {
        gsap.ticker.remove(tick);
        if (entry.isIntersecting) gsap.ticker.add(tick);
      });
      view.observe(strip);
      return () => { resize.disconnect(); view.disconnect(); gsap.ticker.remove(tick); };
    });
    return () => media.revert();
  }, []);

  const motionControl = (
    <button className="daytake-motion-toggle" type="button"
      aria-label={motionPaused ? "Resume photo motion" : "Pause photo motion"}
      aria-pressed={motionPaused} onClick={() => setMotionPaused(value => !value)}>
      {motionPaused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
      <span>{motionPaused ? "Resume" : "Pause"}</span>
    </button>
  );

  function photoCard(photo: Photo, copy = false) {
    const Icon = categoryIcons[photo.category];
    return (
      <div className="daytake-photo-arrival" key={photo.id}>
        <div className="daytake-photo" aria-label={photo.title}>
          <img src={photo.src} alt={copy ? "" : photo.description} width={photo.width} height={photo.height} loading="lazy"
            onError={e => { e.currentTarget.style.display = "none"; }} />
          <span className="daytake-photo-badge daytake-category-badge"><Icon aria-hidden="true" /></span>
          <span className="daytake-photo-caption">{photo.title}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="daytake" ref={root} id="top" data-motion-paused={motionPaused}>
      <style>{pageStyles}</style>
      <a className="preview-skip" href="#library">Skip to photos</a>
      <header className="daytake-header daytake-wrap">
        <a className="daytake-logo" href="#top"><Sparkles aria-hidden="true" />firstnotch</a>
        <nav aria-label="Main navigation">
          <a href="#about">Our values</a><a href="#library">Moments</a><a href="#portraits">People</a>
        </nav>
      </header>

      <main>
        {/* HERO */}
        <section className="daytake-hero" ref={hero} aria-labelledby="culture-title">
          <div className="daytake-mosaic" aria-hidden="true">
            <div className="daytake-mosaic-grid">
              {mosaic.map((column, index) => (
                <div className="daytake-mosaic-column" key={index}>
                  <div className="daytake-mosaic-track">{[0, 1].map(copy => (
                    <div className="daytake-mosaic-set" key={copy}>{column.map(photo => (
                      <img key={photo.id} src={photo.src} alt="" width="358" height="358" className="daytake-mosaic-tile"
                        fetchPriority={index === 1 && copy === 0 ? "high" : "auto"}
                        onError={e => { e.currentTarget.style.display = "none"; }} />
                    ))}</div>
                  ))}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="daytake-wrap daytake-hero-content">
            <h1 id="culture-title">Different stories.<br /><span>One team.</span></h1>
            <p>Culture is not something we write on a wall. It is how we work, celebrate, compete, learn and show up for each other.</p>
            <a href="#library" className="daytake-primary daytake-hero-cta">Meet our culture <ArrowRight aria-hidden="true" /></a>
           
          </div>
          <div className="daytake-hero-foot daytake-wrap"><span>The moments between the work matter too.</span><a href="#about">Take a look <ArrowDown aria-hidden="true" /></a></div>
        </section>

        {/* VALUES */}
        <section className="daytake-features daytake-wrap" id="about" aria-label="How we show up">
          <div className="daytake-feature-grid">{features.map(({ title, description, icon: Icon }) => (
            <article className="daytake-feature" key={title}>
              <span className="daytake-feature-icon"><Icon aria-hidden="true" /></span>
              <h2>{title}</h2><p>{description}</p>
            </article>
          ))}</div>
        </section>

        {/* GALLERY */}
        <section className="daytake-library" id="library" ref={library} aria-labelledby="library-title">
          <div className="daytake-library-heading daytake-wrap">
            <h2 id="library-title">The best teams share more than <span>a workload.</span></h2>
            <p>Celebrations, games and everyday life at FirstNotch.</p>
          </div>
          <div className="daytake-gallery" ref={gallery}>
            <div className="daytake-gallery-tilt">
              {galleryRows.map((row, index) => (
                <div className="daytake-gallery-lane" key={index}
                  aria-label={index === 0 ? "First photo row" : "Second photo row"}>
                  {[0, 1, 2].map(copy => (
                    <div key={copy}
                      className={"daytake-gallery-group" + (copy ? " daytake-gallery-copy" : "")}
                      aria-hidden={copy ? "true" : undefined}>
                      {row.map(photo => photoCard(photo, !!copy))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="daytake-gallery-footer daytake-wrap"><span>We work together. We celebrate together. We grow together.</span>{motionControl}</div>
        </section>

        {/* EDITORIAL */}
        <section className="daytake-editorial daytake-wrap" aria-labelledby="culture-editorial-title">
          <figure className="daytake-editorial-figure">
            <div className="daytake-editorial-stage">
              <div className="daytake-editorial-media">
                <div className="daytake-editorial-photo" data-full-frame={fullFrame}>
                  <img src={editorial.src} alt={editorial.description} width={editorial.width} height={editorial.height} loading="lazy"
                    onError={e => { e.currentTarget.style.display = "none"; }} />
                </div>
              </div>
              <div className="daytake-editorial-toolbar" role="group" aria-label="Featured photo tools">
                <button aria-label="Show full photo" aria-pressed={fullFrame} onClick={() => setFullFrame(value => !value)}><Crop aria-hidden="true" /></button>
                <button aria-label={saved ? "Unsave featured photo" : "Save featured photo"} aria-pressed={saved} onClick={() => setSaved(value => !value)}>{saved ? <Check aria-hidden="true" /> : <Heart aria-hidden="true" />}</button>
                <a href={editorial.src} download="firstnotch-learning-together.jpg" aria-label="Download featured photo"><Download aria-hidden="true" /></a>
              </div>
              <div className="daytake-audio" aria-label="Learning Together: Share. Learn. Grow.">
                <div className="daytake-waveform" aria-hidden="true">{waveform.map((height, index) => <i key={index} style={{ height }} />)}</div>
                <div className="daytake-audio-meta"><span>Learning Together</span><span>Share. Learn. Grow.</span></div>
                <span className="daytake-audio-progress" aria-hidden="true" />
              </div>
              <svg className="daytake-editorial-line" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <path className="daytake-editorial-connector" d="M 86 61 H 94 Q 97 61 97 64 V 85 Q 97 88 94 88 H 79 M 82 86 L 79 88 L 82 90" />
              </svg>
              <div className="daytake-editorial-card daytake-editorial-question">
                <span className="daytake-mini-image"><img src={question.src} alt="" width="358" height="358" loading="lazy"
                  onError={e => { e.currentTarget.style.display = "none"; }} /><i><Trophy /></i></span>
                <strong>{question.title}</strong><small>{question.subtitle}</small>
              </div>
              <div className="daytake-editorial-card daytake-editorial-result">
                <img src={result.src} alt="" width="358" height="358" loading="lazy"
                  onError={e => { e.currentTarget.style.display = "none"; }} />
                <strong>{result.title}</strong>
              </div>
            </div>
            <figcaption>Away from desks and screens, titles disappear.</figcaption>
          </figure>
          <div className="daytake-editorial-content">
            <h2 id="culture-editorial-title">Make room<br />for <span>joy.</span></h2>
            <p>Great work and good memories can exist in the same place. From Pongal to cricket day, these moments help relationships grow beyond project meetings.</p>
            <div className="daytake-editorial-actions">
              <Link className="daytake-primary" href="/work-with-us">Work With Us <ArrowRight aria-hidden="true" /></Link>
              <a className="daytake-watch" href="#library"><span><ArrowUpRight aria-hidden="true" /></span>See Pongal</a>
            </div>
            <div className="daytake-trust">
              <div className="daytake-trust-item"><BadgeCheck aria-hidden="true" /><span>Respect<br />the person</span></div>
              <div className="daytake-trust-item"><Heart aria-hidden="true" /><span>Make room<br />for joy</span></div>
              <div className="daytake-trust-item"><MessageCircle aria-hidden="true" /><span>Communicate<br />clearly</span></div>
            </div>
          </div>
        </section>

        {/* PEOPLE */}
        <section className="daytake-people" id="portraits" aria-labelledby="culture-people-title">
          <div className="daytake-wrap">
            <h2 id="culture-people-title">Bring your whole<br />self to the <span>work.</span></h2>
            <p>We are building a team where people can grow professionally without leaving their personality, traditions or interests at the door.</p>
          </div>
          <div className="daytake-portrait-field">
            {waves.map(({ layout, box, path }) => (
              <svg key={layout}
                className={"daytake-portrait-line daytake-portrait-line-" + layout}
                viewBox={box} preserveAspectRatio="none" aria-hidden="true">
                <path className="daytake-portrait-trace" d={path} />
              </svg>
            ))}
            {[0, 1, 2, 3].map(index => (
              <span className={"daytake-particle-arrival particle-" + index} key={index} aria-hidden="true"><i className="daytake-particle" /></span>
            ))}
          <ul className="daytake-creators">
  {creators.map(
    ({ photo, name, specialty, color, tilt, href }) => (
      <li className="daytake-creator-arrival" key={name}>
        <Link
          href={href}
          className="daytake-creator"
          aria-label={`Explore ${name}`}
        >
          <span
            className={"daytake-creator-plate " + color}
            style={
              {
                "--tilt": tilt + "deg",
              } as CSSProperties
            }
          >
            <span
              className={
                "daytake-creator-backplate " + color
              }
              aria-hidden="true"
            />

            <span
              className="daytake-creator-body"
              aria-hidden="true"
            />

            <span className="daytake-creator-avatar">
              <img
                src={photo.src}
                alt={photo.description}
                width="358"
                height="358"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </span>

            <span className="daytake-creator-caption">
              <strong>{name}</strong>

              <span className="daytake-creator-badge">
                Explore
                <ArrowUpRight aria-hidden="true" />
              </span>
            </span>
          </span>

          <small className="daytake-creator-specialty">
            {specialty}
          </small>
        </Link>
      </li>
    )
  )}
</ul>
          </div>
          <Link className="daytake-text-link" href="/work-with-us">Work With Us <ArrowUpRight aria-hidden="true" /></Link>
        </section>
      </main>

      


    </div>
  );
}
