import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * Endless horizontal strip, pure CSS (no client JS). The list renders twice
 * and slides by half its width; the copy is inert and hidden from assistive
 * tech. Pauses on hover and on keyboard focus. Under reduced motion it stops
 * and becomes a plain scrollable row.
 *
 *   <Marquee label="Past events" seconds={60}>{items.map(i => <li>…</li>)}</Marquee>
 */
export function Marquee({
  children,
  label,
  seconds = 48,
  reverse = false,
  gap = "gap-10 pr-10",
  fade = true,
  className,
  listClassName,
}: {
  /** List items (<li>). */
  children: ReactNode;
  /** Accessible name for the list. */
  label: string;
  /** Seconds per loop. Keep it 40+ so it reads as ambient. */
  seconds?: number;
  reverse?: boolean;
  /** Tailwind gap + matching right padding, so the seam is even. */
  gap?: string;
  /** Fade the left/right edges. */
  fade?: boolean;
  className?: string;
  listClassName?: string;
}) {
  const style = {
    animationDuration: `${Math.max(seconds, 40)}s`,
    animationDirection: reverse ? "reverse" : "normal",
  } as CSSProperties;
  const list = cn("flex shrink-0 items-center", gap, listClassName);
  return (
    <div
      className={cn(
        "group/marquee relative overflow-hidden motion-reduce:no-scrollbar motion-reduce:overflow-x-auto",
        fade && "fade-x",
        className,
      )}
    >
      <div
        style={style}
        className={cn(
          "flex w-max animate-[marquee_48s_linear_infinite] will-change-transform motion-reduce:animate-none",
          "group-hover/marquee:[animation-play-state:paused] group-focus-within/marquee:[animation-play-state:paused]",
        )}
      >
        <ul aria-label={label} className={list}>
          {children}
        </ul>
        <ul aria-hidden="true" inert className={cn(list, "motion-reduce:hidden")}>
          {children}
        </ul>
      </div>
    </div>
  );
}
