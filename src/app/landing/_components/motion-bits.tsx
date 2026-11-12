"use client";

import { motion, useInView, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { RollingDigits } from "@/components/motion/rolling-digits";
import { useReducedMotionSafe } from "@/components/motion/use-reduced-motion";
import { cn } from "@/lib/cn";

/**
 * Scroll-linked strip of oversized outline type. It slides sideways as the
 * section scrolls past (transform only, so it stays cheap on phones).
 * Under reduced motion it sits still.
 */
export function ScrollType({
  words,
  reverse = false,
  className,
}: {
  words: string;
  reverse?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], reverse ? ["-30%", "0%"] : ["0%", "-30%"]);
  const line = Array.from({ length: 4 }, () => words).join("  ·  ");

  return (
    <div ref={ref} aria-hidden="true" className={cn("overflow-hidden select-none", className)}>
      <motion.p
        style={reduced ? undefined : { x }}
        className="font-serif text-[clamp(64px,13vw,184px)] leading-[0.95] font-bold tracking-[-0.04em] whitespace-nowrap text-transparent [-webkit-text-stroke:1px_var(--rule-strong)] md:[-webkit-text-stroke:1.5px_var(--rule-strong)]"
      >
        {line}
      </motion.p>
    </div>
  );
}

/**
 * A dollar figure whose digits tick up from $0 to the full amount, slot
 * machine style, every time it comes into view. It starts once 40% of it is
 * visible and only resets to $0 after it has fully left the screen, so small
 * scrolls never restart it mid-roll. Width stays fixed (leading zeros) so
 * nothing jumps. Reduced motion: shows the final value, no animation.
 */
export function PrizeAmount({
  amount,
  prefix = "$",
  suffix = "",
  duration = 1600,
  className,
}: {
  amount: number;
  /** "$" for cash; "" for credits, which aren't a dollar figure. */
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const visible = useInView(ref, { amount: 0.4 });
  const onScreen = useInView(ref);
  const reduced = useReducedMotionSafe();
  const [shown, setShown] = useState(0);
  const armed = useRef(true);
  const raf = useRef(0);

  // Fully off screen: re-arm and quietly reset to $0 for the next pass.
  useEffect(() => {
    if (onScreen) return;
    armed.current = true;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => setShown(0));
  }, [onScreen]);

  // 40% in view and armed: roll up once for this pass.
  useEffect(() => {
    if (!visible || !armed.current || reduced) return;
    armed.current = false;
    cancelAnimationFrame(raf.current);
    let last = -1;
    const start = performance.now();
    const STEPS = 14;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // Ease out, quantised so each digit has time to roll between steps.
      const step = Math.round((1 - Math.pow(1 - t, 3)) * STEPS);
      if (step !== last) {
        last = step;
        setShown(step === STEPS ? amount : Math.round((amount * step) / STEPS / 1000) * 1000 + ((step * 137) % 1000));
      }
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  }, [visible, reduced, amount, duration]);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const value = reduced ? amount : Math.min(shown, amount);
  const formatted = `${prefix}${value.toLocaleString("en-US", { minimumIntegerDigits: String(amount).length, useGrouping: true })}${suffix}`;
  return (
    <span ref={ref} className={className}>
      <span className="sr-only">
        {prefix}
        {amount.toLocaleString("en-US")}
        {suffix}
      </span>
      <span aria-hidden="true">
        <RollingDigits value={formatted} />
      </span>
    </span>
  );
}

/**
 * The 1 PM to 5 PM rail. Fills crimson as you scroll through the section.
 * Horizontal from md, vertical on phones. Reduced motion: drawn full.
 */
export function DayRail({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  return (
    <div ref={ref} className={cn("relative", className)}>
      {/* Track */}
      <span aria-hidden="true" className="absolute top-2 bottom-2 left-[7px] w-px bg-rule-strong md:top-[7px] md:right-0 md:bottom-auto md:left-0 md:h-px md:w-full" />
      {/* Fill: vertical on phones */}
      <motion.span
        aria-hidden="true"
        style={reduced ? undefined : { scaleY: progress }}
        className="absolute top-2 bottom-2 left-[6px] w-[3px] origin-top rounded-full bg-crimson md:hidden"
      />
      {/* Fill: horizontal from md */}
      <motion.span
        aria-hidden="true"
        style={reduced ? undefined : { scaleX: progress }}
        className="absolute top-[6px] right-0 left-0 hidden h-[3px] origin-left rounded-full bg-crimson md:block"
      />
      {children}
    </div>
  );
}
