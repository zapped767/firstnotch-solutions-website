"use client";

/*
MIT License

Copyright (c) 2026 EZPZ

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import { useId, type CSSProperties } from "react";

/* =========================================================
   TYPES
========================================================= */

export interface EZPZTypeFoldProps {
  words?: readonly [string, string, string];

  background?: string;
  ink?: string;
  paper?: string;

  fontFamily?: string;

  className?: string;
  style?: CSSProperties;

  label?: string;
  decorative?: boolean;
}

/* =========================================================
   FIRSTNOTCH TYPE FOLD
========================================================= */

export default function EZPZTypeFold({
  words = ["HOW WE", "HIRE", "BETTER."],

  // FirstNotch palette
  background = "#FFFFFF",
  ink = "#B12025",
  paper = "#FFF4F4",

  fontFamily = '"Helvetica Neue", Arial, sans-serif',

  className,
  style,

  label,
  decorative = false,
}: EZPZTypeFoldProps) {
  const id = useId().replace(/:/g, "");

  const titleId = `${id}-title`;
  const letteringId = `${id}-lettering`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 1800"
      width="1440"
      height="1800"
      className={className}
      style={{
        display: "block",
        width: "100%",
        height: "auto",
        ...style,
      }}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative || undefined}
      aria-labelledby={decorative ? undefined : titleId}
      focusable="false"
    >
      {/* ACCESSIBILITY */}
      {!decorative && (
        <title id={titleId}>
          {label ?? words.join(" ")}
        </title>
      )}

      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <rect
        width="1440"
        height="1800"
        fill={background}
      />

      {/* =====================================================
          DEFINITIONS
      ===================================================== */}

      <defs>
        {/* TEXT */}
        <g
          id={letteringId}
          fontFamily={fontFamily}
          fontWeight="700"
          fill={ink}
        >
          {words.map((word, index) => (
            <text
              key={`${word}-${index}`}
              x="18"
              y={238 + index * 226}
              fontSize="270"
              textLength="1014"
              lengthAdjust="spacingAndGlyphs"
            >
              {word}
            </text>
          ))}
        </g>

        {/* CLIPPING PLANES */}
        {[0, 1, 2].map((index) => (
          <clipPath
            key={index}
            id={`${id}-clip-${index}`}
          >
            <rect
              width="350"
              height="790"
            />
          </clipPath>
        ))}
      </defs>

      {/* =====================================================
          FOLDED TYPOGRAPHIC PLANES
      ===================================================== */}

      <g
        transform="translate(0 30)"
        aria-hidden="true"
      >
        {[0, 1, 2].map((index) => {
          const skewDirection =
            index === 1 ? -0.5 : 0.5;

          const translateX =
            265 + 0.8660254 * 350 * index;

          const translateY =
            387 + (index === 1 ? 175 : 0);

          return (
            <g
              key={index}
              transform={`
                matrix(
                  .8660254
                  ${skewDirection}
                  0
                  1
                  ${translateX}
                  ${translateY}
                )
              `}
            >
              {/* PAPER */}
              <rect
                width="350"
                height="790"
                fill={paper}
              />

              {/* DEPTH / FOLD SHADOW */}
              <rect
                width="350"
                height="790"
                fill="black"
                opacity={
                  index === 0
                    ? 0.12
                    : index === 2
                      ? 0.08
                      : 0
                }
              />

              {/* CLIPPED TYPOGRAPHY */}
              <g
                clipPath={`url(#${id}-clip-${index})`}
              >
                <use
                  href={`#${letteringId}`}
                  transform={`translate(${
                    -350 * index
                  } 0)`}
                />
              </g>
            </g>
          );
        })}
      </g>
    </svg>
  );
}