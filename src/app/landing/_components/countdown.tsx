"use client";

import { useSyncExternalStore } from "react";

import { LiveDot } from "@/components/motion/live-dot";
import { RollingDigits } from "@/components/motion/rolling-digits";
import { cn } from "@/lib/cn";

import { BUILD_END, BUILD_START, content } from "../content";

const START = Date.parse(BUILD_START);
const END = Date.parse(BUILD_END);

function subscribe(onTick: () => void) {
  const id = window.setInterval(onTick, 1000);
  return () => window.clearInterval(id);
}

/**
 * Current time in whole seconds on the client, null on the server and during
 * hydration, so the first client render matches the server HTML.
 */
function useNowSeconds(): number | null {
  return useSyncExternalStore(
    subscribe,
    () => Math.floor(Date.now() / 1000),
    () => null,
  );
}

type Phase =
  | { kind: "pending" }
  | { kind: "before"; parts: string[] }
  | { kind: "live"; parts: string[] }
  | { kind: "done" };

const pad = (n: number) => String(n).padStart(2, "0");

function split(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return [String(Math.floor(s / 86400)), pad(Math.floor((s % 86400) / 3600)), pad(Math.floor((s % 3600) / 60)), pad(s % 60)];
}

function usePhase(): Phase {
  const now = useNowSeconds();
  if (now === null) return { kind: "pending" };
  const t = now * 1000;
  if (t < START) return { kind: "before", parts: split(START - t) };
  if (t < END) return { kind: "live", parts: split(END - t) };
  return { kind: "done" };
}

const { units, live, liveLeft, done, fallback } = content.countdown;

/** Compact countdown pill (hero, floating CTA). TPF's pinging-dot pill. */
export function CountdownPill({ label, className }: { label: string; className?: string }) {
  const phase = usePhase();
  return (
    <p
      className={cn(
        "inline-flex min-h-11 items-center gap-3 rounded-full border border-rule-strong bg-[rgba(18,26,23,0.6)] px-4 text-[13px] font-semibold text-ink backdrop-blur-md",
        className,
      )}
    >
      <LiveDot tone={phase.kind === "live" ? "crimson" : "gold"} still={phase.kind === "done"} />
      {phase.kind === "pending" ? <span className="num text-muted">{fallback}</span> : null}
      {phase.kind === "done" ? <span>{done}</span> : null}
      {phase.kind === "before" || phase.kind === "live" ? (
        <>
          <span className="eyebrow text-muted">{phase.kind === "live" ? live : label}</span>
          <span className="num flex items-baseline gap-1.5">
            {phase.parts.map((p, i) =>
              phase.kind === "live" && i === 0 ? null : (
                <span key={units[i]} className="inline-flex items-baseline">
                  <RollingDigits value={p} />
                  <span className="ml-0.5 text-[11px] text-muted">{units[i]}</span>
                </span>
              ),
            )}
            {phase.kind === "live" ? <span className="text-muted">{liveLeft}</span> : null}
          </span>
        </>
      ) : null}
    </p>
  );
}

/** Big countdown: four hairline cells of serif digits. */
export function CountdownBig({ className }: { className?: string }) {
  const phase = usePhase();
  if (phase.kind === "done") {
    return <p className={cn("font-serif text-headline font-bold text-ink", className)}>{done}</p>;
  }
  const parts = phase.kind === "pending" ? ["00", "00", "00", "00"] : phase.parts;
  const names = ["days", "hours", "mins", "secs"];
  return (
    <div className={className}>
      {phase.kind === "live" ? (
        <p className="eyebrow mb-4 flex items-center gap-2.5 text-ink">
          <LiveDot /> {live}
        </p>
      ) : null}
      <dl className="grid grid-cols-4 border-y border-rule">
        {parts.map((p, i) => (
          <div key={names[i]} className="flex flex-col gap-2 border-r border-rule py-5 pr-3 pl-3 first:pl-0 last:border-r-0 md:py-7 md:pl-6 md:first:pl-0">
            <dt className="eyebrow order-2 text-muted">{names[i]}</dt>
            <dd className="order-1 font-serif text-[clamp(40px,11vw,96px)] leading-none font-bold tracking-[-0.03em] text-ink">
              <span className={cn(phase.kind === "pending" && "opacity-0")}>
                <RollingDigits value={p} />
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
