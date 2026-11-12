import { cn } from "@/lib/cn";

/**
 * Pinging status dot (2.4s loop). Crimson means live. Under reduced motion
 * the ring is hidden and the dot stays still. Server-safe.
 *
 *   <LiveDot />  <LiveDot tone="success" />  <LiveDot still />
 */
export function LiveDot({
  tone = "crimson",
  still = false,
  className,
}: {
  tone?: "crimson" | "success" | "gold" | "ink";
  still?: boolean;
  className?: string;
}) {
  const color = {
    crimson: "bg-crimson",
    success: "bg-success",
    gold: "bg-gold",
    ink: "bg-ink",
  }[tone];
  return (
    <span className={cn("relative inline-flex size-2 shrink-0", className)} aria-hidden="true">
      {still ? null : (
        <span
          className={cn(
            "absolute inset-0 rounded-full motion-safe:animate-[live-ping_2.4s_var(--ease-out-soft)_infinite] motion-reduce:hidden",
            color,
          )}
        />
      )}
      <span className={cn("relative inline-flex size-2 rounded-full", color)} />
    </span>
  );
}
