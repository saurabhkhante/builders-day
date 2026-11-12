"use client";

import { motion } from "motion/react";

import { cn } from "@/lib/cn";

import { EASE } from "./ease";

const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

/**
 * Text whose digits roll in a clipped window when they change, like the
 * TPF countdown pill. Non-digit characters render as-is. Inherits font size
 * and colour. Screen readers get the plain value. Under reduced motion
 * MotionProvider makes the roll an instant swap.
 *
 *   <RollingDigits value="12" />
 *   <RollingDigits value={`${h}:${m}`} className="font-serif text-stat" />
 */
export function RollingDigits({ value, className }: { value: string | number; className?: string }) {
  const text = String(value);
  // Key from the right so a 9 -> 10 change keeps the units column stable.
  const chars = text.split("");
  return (
    <span className={cn("num inline-flex", className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="inline-flex">
        {chars.map((ch, i) => {
          const key = chars.length - i;
          const d = DIGITS.indexOf(ch);
          if (d === -1) {
            return (
              <span key={`c${key}`} className="whitespace-pre">
                {ch}
              </span>
            );
          }
          return <Digit key={`d${key}`} digit={d} />;
        })}
      </span>
    </span>
  );
}

function Digit({ digit }: { digit: number }) {
  return (
    <span className="relative inline-block h-[1em] leading-none [clip-path:inset(0)]">
      {/* Invisible sizer keeps the width of the widest tabular digit. */}
      <span className="invisible">0</span>
      <motion.span
        className="absolute inset-x-0 top-0 flex flex-col"
        initial={false}
        animate={{ y: `${-digit}em` }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        {DIGITS.map((n) => (
          <span key={n} className="block h-[1em] leading-none">
            {n}
          </span>
        ))}
      </motion.span>
    </span>
  );
}
